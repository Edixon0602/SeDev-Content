// Automatic SFX resolver & FFmpeg normalizer.
// Guarantees all 21 base catalog WAVs exist offline via deterministic synthesis,
// and can fetch + normalize open CC0 audio assets when requested online, with
// strict 6s timeout and deterministic offline fallback when SEDEV_FORCE_OFFLINE=1.

const fs = require('fs');
const path = require('path');
const { ensureDir, sha256, PROJECT_ROOT } = require('./utils');
const { runFFmpeg } = require('./ffmpeg');
const { loadCatalog, getSound, readWavInfo, DEFAULT_CATALOG } = require('./sfx_catalog');
const { generate, SOUNDS, SAMPLE_RATE, writeWav, normalize, fadeEdges, mulberry32 } = require('./sfx/generate_sfx');

const DEFAULT_SFX_CACHE = path.join(PROJECT_ROOT, 'animaciones', 'editor', '.cache', 'sfx');
const REQUEST_TIMEOUT_MS = 6000;

function isForceOffline(options = {}) {
  return Boolean(options.forceOffline || process.env.SEDEV_FORCE_OFFLINE === '1');
}

function normalizeAudioToWav(inputFile, outWav) {
  ensureDir(path.dirname(outWav));
  const staging = `${outWav}.norm.tmp.wav`;
  try {
    runFFmpeg([
      '-y',
      '-i', inputFile,
      '-vn',
      '-map_metadata', '-1',
      '-fflags', '+bitexact',
      '-flags:a', '+bitexact',
      '-af', 'silenceremove=start_periods=1:start_threshold=-45dB,loudnorm=I=-16:TP=-1.5,aresample=48000,aformat=sample_fmts=s16:channel_layouts=mono',
      '-ac', '1',
      '-ar', String(SAMPLE_RATE),
      '-c:a', 'pcm_s16le',
      staging
    ]);
    const info = readWavInfo(staging);
    if (info.sampleRate !== SAMPLE_RATE || info.channels !== 1 || info.bitsPerSample !== 16) {
      throw new Error(`Formato WAV normalizado inválido: ${JSON.stringify(info)}`);
    }
    fs.renameSync(staging, outWav);
    return { file: outWav, info };
  } finally {
    if (fs.existsSync(staging)) {
      try { fs.unlinkSync(staging); } catch (err) { /* best effort */ }
    }
  }
}

function synthesizeDeterministicTagWav(query, outWav) {
  const seed = parseInt(sha256(String(query || 'sfx')).slice(0, 8), 16) || 0x12345;
  const rand = mulberry32(seed);
  const lower = String(query || '').toLowerCase();
  const dur = /boom|impact|riser|whoosh/.test(lower) ? 0.55 : 0.22;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const baseFreq = 260 + (seed % 900);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const p = t / dur;
    const white = rand() * 2 - 1;
    lp += 0.18 * (white - lp);
    const env = Math.min(1, t / 0.008) * Math.exp(-p * 4.5);
    const tone = Math.sin(2 * Math.PI * (baseFreq * (1 - 0.35 * p)) * t);
    out[i] = (tone * 0.7 + lp * 0.3) * env;
  }
  writeWav(outWav, fadeEdges(normalize(Array.from(out), 0.72), 48));
  return outWav;
}

async function fetchAndNormalizeUrl(url, outWav, options = {}) {
  if (isForceOffline(options)) {
    throw new Error('SEDEV_FORCE_OFFLINE=1 impide peticiones externas de SFX');
  }
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  if (typeof fetchImpl !== 'function') {
    throw new Error('fetch no disponible en este runtime');
  }
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutMs = Number(options.timeoutMs || REQUEST_TIMEOUT_MS);
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  const rawTmp = `${outWav}.download.tmp`;
  try {
    const response = await fetchImpl(url, {
      method: 'GET',
      signal: controller ? controller.signal : undefined
    });
    if (!response || !response.ok) {
      throw new Error(`HTTP ${response ? response.status : 'sin respuesta'}`);
    }
    const contentType = String(response.headers && response.headers.get ? response.headers.get('content-type') : '').toLowerCase();
    if (contentType && !/(audio|octet-stream|wav|mpeg|ogg|mp4)/i.test(contentType)) {
      throw new Error(`Content-Type inválido para audio: ${contentType}`);
    }
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 128) throw new Error('Archivo de audio descargado demasiado pequeño');
    ensureDir(path.dirname(rawTmp));
    fs.writeFileSync(rawTmp, bytes);
    return normalizeAudioToWav(rawTmp, outWav);
  } finally {
    if (timer) clearTimeout(timer);
    if (fs.existsSync(rawTmp)) {
      try { fs.unlinkSync(rawTmp); } catch (err) { /* best effort */ }
    }
  }
}

function ensureSfxCatalogAssets(catalogPath = DEFAULT_CATALOG) {
  const sfxDir = path.dirname(path.resolve(catalogPath));
  const missing = SOUNDS.some((entry) => !fs.existsSync(path.join(sfxDir, entry.file)));
  if (missing) {
    generate(sfxDir);
  }
  return loadCatalog(catalogPath);
}

function matchCatalogByQuery(catalog, query) {
  const direct = getSound(catalog, query);
  if (direct) return direct;
  const q = String(query || '').toLowerCase().trim();
  if (!q) return null;
  const tokens = q.split(/[\s,_-]+/).filter(Boolean);
  let best = null;
  let bestScore = 0;
  for (const sound of catalog.sounds) {
    let score = 0;
    const hay = [sound.id, sound.category, ...(sound.tags || [])].join(' ').toLowerCase();
    for (const token of tokens) {
      if (hay.includes(token)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = sound;
    }
  }
  return bestScore > 0 ? best : null;
}

async function resolveSfx(idOrQuery, options = {}) {
  const catalog = options.catalog || ensureSfxCatalogAssets(options.catalogPath || DEFAULT_CATALOG);
  const matched = matchCatalogByQuery(catalog, idOrQuery);
  if (matched && fs.existsSync(matched.file)) {
    return {
      id: matched.id,
      file: matched.file,
      defaultGainDb: matched.defaultGainDb,
      source: 'catalog',
      fallback: false
    };
  }

  const cacheDir = options.cacheDir || DEFAULT_SFX_CACHE;
  ensureDir(cacheDir);
  const key = sha256(String(idOrQuery || 'sfx')).slice(0, 20);
  const cachedFile = path.join(cacheDir, `${key}.wav`);
  if (!options.noCache && fs.existsSync(cachedFile)) {
    try {
      const info = readWavInfo(cachedFile);
      if (info.sampleRate === SAMPLE_RATE && info.channels === 1 && info.bitsPerSample === 16) {
        return { id: String(idOrQuery), file: cachedFile, defaultGainDb: -14, source: 'cache', fallback: false };
      }
    } catch (err) { /* re-resolve */ }
  }

  if (options.url && !isForceOffline(options)) {
    try {
      await fetchAndNormalizeUrl(options.url, cachedFile, options);
      return { id: String(idOrQuery), file: cachedFile, defaultGainDb: -14, source: 'remote', fallback: false };
    } catch (err) {
      if (options.logger && options.logger.warn) {
        options.logger.warn(`Auto-SFX fallback para "${idOrQuery}": ${err.message}`);
      }
    }
  }

  synthesizeDeterministicTagWav(idOrQuery, cachedFile);
  return { id: String(idOrQuery), file: cachedFile, defaultGainDb: -14, source: 'synth_fallback', fallback: true };
}

module.exports = {
  DEFAULT_SFX_CACHE,
  REQUEST_TIMEOUT_MS,
  normalizeAudioToWav,
  fetchAndNormalizeUrl,
  ensureSfxCatalogAssets,
  matchCatalogByQuery,
  resolveSfx
};
