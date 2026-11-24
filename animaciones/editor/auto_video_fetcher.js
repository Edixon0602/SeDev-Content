// Automatic stock B-roll video resolver for Pexels & Pixabay APIs.
//
// Sources:
//   - Pexels Video API  (PEXELS_API_KEY)  — prefers portrait 9:16 HD MP4
//   - Pixabay Video API (PIXABAY_API_KEY) — fallback / secondary stock pool
//
// Enforces timeouts, validates MP4 probes, normalizes to 1080x1920 @ 30fps
// (no audio stream, optional subtle editorial grade), and caches by SHA-256.
// When offline or without API keys, signals fallback cleanly so the pipeline
// renders a local editorial B-roll instead of failing.

const fs = require('fs');
const path = require('path');
const { ensureDir, sha256, loadEnvFile, roundTime, PROJECT_ROOT } = require('./utils');
const { runFFmpeg, probeMedia } = require('./ffmpeg');

const DEFAULT_VIDEO_CACHE = path.join(PROJECT_ROOT, 'animaciones', 'editor', '.cache', 'brolls');
const API_TIMEOUT_MS = 6000;
const DOWNLOAD_TIMEOUT_MS = 20000;

function isForceOffline(options = {}) {
  return Boolean(options.forceOffline || process.env.SEDEV_FORCE_OFFLINE === '1');
}

function resolveApiKeys(options = {}) {
  if (options.loadEnv !== false) {
    loadEnvFile(options.projectRoot || PROJECT_ROOT);
  }
  return {
    pexelsKey: String(options.pexelsKey !== undefined ? options.pexelsKey : (process.env.PEXELS_API_KEY || '')).trim(),
    pixabayKey: String(options.pixabayKey !== undefined ? options.pixabayKey : (process.env.PIXABAY_API_KEY || '')).trim()
  };
}

function scoreCandidate({ width, height, duration, requiredDuration }) {
  let score = 0;
  const w = Number(width) || 0;
  const h = Number(height) || 0;
  const dur = Number(duration) || 0;
  if (h >= w && h > 0) score += 100; // Prefer portrait for 9:16
  if (w >= 720 && h >= 1080) score += 40;
  else if (w >= 540 && h >= 720) score += 20;
  else if (w < 480) score -= 50;
  if (dur >= requiredDuration) score += 35;
  else if (dur > 0) score -= 20;
  // Prefer ~1080p over huge 4K downloads
  if (w > 0) score -= Math.abs(1080 - w) / 200;
  return score;
}

function pickBestPexelsCandidate(payload, requiredDuration) {
  const videos = Array.isArray(payload && payload.videos) ? payload.videos : [];
  let best = null;
  for (const video of videos) {
    const files = Array.isArray(video && video.video_files) ? video.video_files : [];
    for (const file of files) {
      if (!file || !file.link) continue;
      const type = String(file.file_type || '').toLowerCase();
      if (type && !type.includes('mp4')) continue;
      const candidate = {
        provider: 'pexels',
        id: video.id,
        url: file.link,
        width: Number(file.width) || 0,
        height: Number(file.height) || 0,
        duration: Number(video.duration) || 0
      };
      candidate.score = scoreCandidate({ ...candidate, requiredDuration });
      if (!best || candidate.score > best.score) best = candidate;
    }
  }
  return best;
}

function pickBestPixabayCandidate(payload, requiredDuration) {
  const hits = Array.isArray(payload && payload.hits) ? payload.hits : [];
  let best = null;
  for (const hit of hits) {
    const variants = hit && hit.videos ? Object.values(hit.videos) : [];
    for (const variant of variants) {
      if (!variant || !variant.url) continue;
      const candidate = {
        provider: 'pixabay',
        id: hit.id,
        url: variant.url,
        width: Number(variant.width) || 0,
        height: Number(variant.height) || 0,
        duration: Number(hit.duration) || 0
      };
      candidate.score = scoreCandidate({ ...candidate, requiredDuration });
      if (!best || candidate.score > best.score) best = candidate;
    }
  }
  return best;
}

async function fetchJsonWithTimeout(url, headers, timeoutMs, fetchImpl) {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    const response = await fetchImpl(url, {
      method: 'GET',
      headers,
      signal: controller ? controller.signal : undefined
    });
    if (!response || !response.ok) {
      throw new Error(`HTTP ${response ? response.status : 'sin respuesta'}`);
    }
    return await response.json();
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function downloadFileWithTimeout(url, outFile, timeoutMs, fetchImpl) {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    const response = await fetchImpl(url, {
      method: 'GET',
      signal: controller ? controller.signal : undefined
    });
    if (!response || !response.ok) {
      throw new Error(`HTTP ${response ? response.status : 'sin respuesta'}`);
    }
    const contentType = String(response.headers && response.headers.get ? response.headers.get('content-type') : '').toLowerCase();
    if (contentType && /text\/html|application\/json/i.test(contentType)) {
      throw new Error(`Content-Type inválido para vídeo: ${contentType}`);
    }
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 8192) {
      throw new Error('Archivo de vídeo descargado demasiado pequeño');
    }
    ensureDir(path.dirname(outFile));
    fs.writeFileSync(outFile, bytes);
    return outFile;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function normalizeStockVideo(rawFile, outMp4, options = {}) {
  const duration = roundTime(Number(options.duration || 3), 3);
  const fps = Number(options.fps || 30);
  const width = Number(options.width || 1080);
  const height = Number(options.height || 1920);
  const tone = options.tone || 'natural';

  const probe = probeMedia(rawFile);
  if (!probe.hasVideo || !Number.isFinite(probe.duration) || probe.duration < 0.6) {
    throw new Error(`Clip stock inválido o demasiado corto: ${rawFile}`);
  }

  const filters = [
    `scale=${width}:${height}:force_original_aspect_ratio=increase`,
    `crop=${width}:${height}`,
    `fps=${fps}`,
    'setsar=1'
  ];
  if (tone === 'dim') {
    filters.push('eq=brightness=-0.06:contrast=1.06');
  } else if (tone === 'moody') {
    filters.push('eq=brightness=-0.14:contrast=1.12:saturation=0.78');
  }
  filters.push('format=yuv420p');

  ensureDir(path.dirname(outMp4));
  const staging = `${outMp4}.norm.tmp.mp4`;
  try {
    const args = ['-y'];
    if (probe.duration < duration) {
      args.push('-stream_loop', '-1');
    }
    args.push(
      '-i', rawFile,
      '-t', String(duration),
      '-an',
      '-vf', filters.join(','),
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '18',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      staging
    );
    runFFmpeg(args, { timeout: 60000, maxBuffer: 64 * 1024 * 1024 });
    const outProbe = probeMedia(staging);
    if (!outProbe.hasVideo || outProbe.duration < duration - 0.12) {
      throw new Error(`Stock normalizado incompleto (${outProbe.duration}s < ${duration}s)`);
    }
    fs.renameSync(staging, outMp4);
    return { file: outMp4, probe: outProbe };
  } finally {
    if (fs.existsSync(staging)) {
      try { fs.unlinkSync(staging); } catch (err) { /* best effort */ }
    }
  }
}

async function resolveStockVideoAsset(event, options = {}) {
  const logger = options.logger || console;
  const props = (event && event.props) || {};
  const query = String(props.videoQuery || (event && event.concept) || '').trim();
  const duration = roundTime(Number(event.end - event.start), 3);
  const fps = Number(options.fps || 30);
  const width = Number(options.width || 1080);
  const height = Number(options.height || 1920);
  const tone = props.tone || 'natural';
  const sourcePreference = props.sourcePreference || 'auto';

  if (!query) {
    return { ok: false, fallback: true, reason: 'missing-query' };
  }

  const cacheDir = options.cacheDir || DEFAULT_VIDEO_CACHE;
  ensureDir(cacheDir);
  const cacheKey = sha256(JSON.stringify({ query: query.toLowerCase(), sourcePreference, duration, fps, width, height, tone })).slice(0, 24);
  const cacheFile = path.join(cacheDir, `${cacheKey}.mp4`);

  if (!options.noCache && fs.existsSync(cacheFile) && fs.statSync(cacheFile).size > 8192) {
    try {
      const probe = probeMedia(cacheFile);
      if (probe.hasVideo && probe.videoCodec === 'h264' && probe.duration >= duration - 0.12) {
        return { ok: true, file: cacheFile, cached: true, provider: 'cache', probe };
      }
    } catch (err) {
      // Fall through to re-fetch
    }
    try { fs.unlinkSync(cacheFile); } catch (err) { /* best effort */ }
  }

  if (isForceOffline(options)) {
    return { ok: false, fallback: true, reason: 'force-offline' };
  }

  const fetchImpl = options.fetchImpl || globalThis.fetch;
  if (typeof fetchImpl !== 'function') {
    return { ok: false, fallback: true, reason: 'no-fetch' };
  }

  const { pexelsKey, pixabayKey } = resolveApiKeys(options);
  const providers = [];
  if (sourcePreference === 'pexels') {
    if (pexelsKey) providers.push('pexels');
  } else if (sourcePreference === 'pixabay') {
    if (pixabayKey) providers.push('pixabay');
  } else {
    if (pexelsKey) providers.push('pexels');
    if (pixabayKey) providers.push('pixabay');
  }

  if (!providers.length) {
    return { ok: false, fallback: true, reason: 'missing-api-keys' };
  }

  const rawTmp = path.join(cacheDir, `${cacheKey}.${process.pid}.raw.mp4`);
  try {
    for (const provider of providers) {
      try {
        let candidate = null;
        if (provider === 'pexels') {
          const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&orientation=portrait&per_page=8`;
          const payload = await fetchJsonWithTimeout(url, { Authorization: pexelsKey }, Number(options.apiTimeoutMs || API_TIMEOUT_MS), fetchImpl);
          candidate = pickBestPexelsCandidate(payload, duration);
        } else if (provider === 'pixabay') {
          const url = `https://pixabay.com/api/videos/?key=${encodeURIComponent(pixabayKey)}&q=${encodeURIComponent(query)}&per_page=8&safesearch=true`;
          const payload = await fetchJsonWithTimeout(url, {}, Number(options.apiTimeoutMs || API_TIMEOUT_MS), fetchImpl);
          candidate = pickBestPixabayCandidate(payload, duration);
        }

        if (!candidate || !candidate.url) continue;

        await downloadFileWithTimeout(candidate.url, rawTmp, Number(options.downloadTimeoutMs || DOWNLOAD_TIMEOUT_MS), fetchImpl);
        const normalized = normalizeStockVideo(rawTmp, cacheFile, { duration, fps, width, height, tone });
        return {
          ok: true,
          file: normalized.file,
          cached: false,
          provider: candidate.provider,
          videoId: candidate.id,
          probe: normalized.probe
        };
      } catch (err) {
        if (logger && typeof logger.warn === 'function') {
          logger.warn(`Stock B-roll (${provider}) falló para "${query}": ${err.message}`);
        }
      }
    }
    return { ok: false, fallback: true, reason: 'no-stock-results' };
  } finally {
    if (fs.existsSync(rawTmp)) {
      try { fs.unlinkSync(rawTmp); } catch (err) { /* best effort */ }
    }
  }
}

module.exports = {
  DEFAULT_VIDEO_CACHE,
  resolveApiKeys,
  pickBestPexelsCandidate,
  pickBestPixabayCandidate,
  normalizeStockVideo,
  resolveStockVideoAsset
};
