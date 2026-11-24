// Transcript normalisation, validation and cache keys.
// The editor never invents words: if the provider fails, this module throws.

const fs = require('fs');
const path = require('path');
const {
  atomicWriteJson,
  ensureDir,
  isPlainObject,
  sha256,
  stableStringify,
  roundTime,
  fileStamp
} = require('./utils');

const TRANSCRIPT_VERSION = 1;

function normalizeWords(rawWords, duration) {
  if (!Array.isArray(rawWords)) return [];
  const words = [];
  for (let i = 0; i < rawWords.length; i++) {
    const entry = rawWords[i];
    if (!isPlainObject(entry)) throw new Error(`Palabra ${i} del transcript no es un objeto.`);
    const text = String(entry.word !== undefined ? entry.word : entry.text !== undefined ? entry.text : '').trim();
    if (!text) continue;
    const start = Number(entry.start);
    const end = Number(entry.end);
    if (!Number.isFinite(start) || !Number.isFinite(end)) {
      throw new Error(`Palabra "${text}" sin tiempos finitos (${entry.start}, ${entry.end}).`);
    }
    if (start < 0 || start > duration + 0.05) {
      throw new Error(`Palabra "${text}" con rango inválido ${start}-${end} (duración ${duration}).`);
    }
    let safeStart = start;
    let safeEnd = end;
    if (safeEnd < safeStart - 0.001) {
      throw new Error(`Palabra "${text}" con rango inválido ${start}-${end} (duración ${duration}).`);
    }
    if (safeEnd <= safeStart) {
      // faster-whisper can emit a zero-width word at a boundary. Repair it
      // deterministically instead of failing the whole real transcript.
      safeEnd = Math.min(duration, safeStart + 0.08);
      if (safeEnd <= safeStart) {
        safeStart = Math.max(0, duration - 0.08);
        safeEnd = duration;
      }
    }
    safeEnd = Math.min(safeEnd, duration);
    words.push({
      word: text,
      start: roundTime(safeStart),
      end: roundTime(safeEnd),
      probability: Number.isFinite(Number(entry.probability)) ? Number(entry.probability) : undefined
    });
  }
  words.sort((a, b) => (a.start - b.start) || (a.end - b.end));
  for (let i = 1; i < words.length; i++) {
    if (words[i].start < words[i - 1].start - 0.001) {
      throw new Error('Las palabras del transcript no están ordenadas por tiempo.');
    }
  }
  return words.map((w) => {
    const out = { ...w };
    if (out.probability === undefined) delete out.probability;
    return out;
  });
}

function normalizeSegments(rawSegments, words, duration) {
  const segments = [];
  if (Array.isArray(rawSegments)) {
    for (let i = 0; i < rawSegments.length; i++) {
      const entry = rawSegments[i];
      if (!isPlainObject(entry)) continue;
      const text = String(entry.text || '').trim();
      const start = Number(entry.start);
      const end = Number(entry.end);
      if (!text || !Number.isFinite(start) || !Number.isFinite(end) || end <= start) continue;
      segments.push({
        id: Number.isFinite(Number(entry.id)) ? Number(entry.id) : i,
        text,
        start: roundTime(start),
        end: roundTime(Math.min(end, duration))
      });
    }
  }
  if (!segments.length && words.length) {
    // Build a minimal segmentation from words when the provider omitted it.
    let current = null;
    for (const word of words) {
      const gap = current ? word.start - current.end : 0;
      if (!current || gap > 0.65 || /[.!?]$/.test(current.text)) {
        if (current) segments.push(current);
        current = { id: segments.length, text: word.word, start: word.start, end: word.end };
      } else {
        current.text += ` ${word.word}`;
        current.end = word.end;
      }
    }
    if (current) segments.push(current);
  }
  return segments.sort((a, b) => a.start - b.start);
}

function normalizeTranscript(raw, options = {}) {
  if (!isPlainObject(raw)) throw new Error('El transcript debe ser un objeto JSON.');
  const duration = Number(options.duration);
  if (!Number.isFinite(duration) || duration <= 0) {
    throw new Error('normalizeTranscript requiere una duración de vídeo válida.');
  }
  let rawWords = raw.words;
  if (!Array.isArray(rawWords) || rawWords.length === 0) {
    rawWords = [];
    if (Array.isArray(raw.segments)) {
      for (const segment of raw.segments) {
        if (segment && Array.isArray(segment.words)) rawWords.push(...segment.words);
      }
    }
  }
  const words = normalizeWords(rawWords, duration);
  if (options.requireWords !== false && words.length === 0) {
    throw new Error('El transcript no contiene palabras con tiempos; el editor necesita timestamps por palabra.');
  }
  const segments = normalizeSegments(raw.segments, words, duration);
  if (options.requireSegments !== false && segments.length === 0) {
    throw new Error('El transcript no contiene segmentos utilizables.');
  }
  const language = String(raw.language || raw.detected_language || options.language || '').trim() || 'und';
  const derivedText = (segments.length ? segments.map((s) => s.text).join(' ') : words.map((w) => w.word).join(' ')).trim();
  const text = String(raw.text || derivedText).trim() || derivedText;
  if (!text) throw new Error('El transcript está vacío.');
  return {
    version: TRANSCRIPT_VERSION,
    language,
    text,
    segments,
    words,
    source: String(options.source || raw.source || 'unknown'),
    provider: String(options.provider || raw.provider || 'unknown'),
    createdBy: 'animaciones/editor/transcript.js',
    meta: {
      ...(isPlainObject(raw.meta) ? raw.meta : {}),
      duration: roundTime(duration),
      wordCount: words.length,
      segmentCount: segments.length
    }
  };
}

function transcriptFingerprint(transcript) {
  return sha256(stableStringify({
    language: transcript.language,
    text: transcript.text,
    segments: transcript.segments,
    words: transcript.words
  }));
}

function transcriptCacheKey({ videoPath, stat, config = {} }) {
  const stamp = stat || fileStamp(videoPath);
  return sha256(stableStringify({
    version: TRANSCRIPT_VERSION,
    path: path.resolve(videoPath).replace(/\\/g, '/'),
    size: stamp.size,
    mtimeMs: Math.round(Number(stamp.mtimeMs) || 0),
    model: config.model || 'small',
    language: config.language || 'auto',
    computeType: config.computeType || 'int8',
    beamSize: config.beamSize || 5,
    vad: config.vad !== false
  })).slice(0, 24);
}

function readTranscriptFile(file, options = {}) {
  if (!fs.existsSync(file)) throw new Error(`No existe el transcript: ${file}`);
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
  } catch (err) {
    throw new Error(`Transcript JSON inválido (${file}): ${err.message}`);
  }
  const existingMeta = isPlainObject(raw.meta) ? raw.meta : {};
  return normalizeTranscript(raw, {
    duration: options.duration || existingMeta.duration,
    requireWords: options.requireWords !== false,
    source: options.source || raw.source,
    provider: options.provider || raw.provider,
    language: options.language
  });
}

function writeTranscriptFile(file, transcript) {
  atomicWriteJson(file, transcript);
  return file;
}

function loadCachedTranscript(cacheDir, cacheKey, options = {}) {
  const file = path.join(cacheDir, `${cacheKey}.json`);
  if (!fs.existsSync(file)) return null;
  try {
    const raw = JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
    if (raw.meta && raw.meta.cacheKey && raw.meta.cacheKey !== cacheKey) return null;
    return normalizeTranscript(raw, {
      duration: options.duration || (raw.meta && raw.meta.duration),
      source: options.source || raw.source,
      provider: options.provider || raw.provider
    });
  } catch (err) {
    return null;
  }
}

function saveCachedTranscript(cacheDir, cacheKey, transcript) {
  ensureDir(cacheDir);
  const copy = JSON.parse(JSON.stringify(transcript));
  copy.meta = { ...(copy.meta || {}), cacheKey };
  atomicWriteJson(path.join(cacheDir, `${cacheKey}.json`), copy);
  return copy;
}

module.exports = {
  TRANSCRIPT_VERSION,
  normalizeTranscript,
  readTranscriptFile,
  writeTranscriptFile,
  transcriptFingerprint,
  transcriptCacheKey,
  loadCachedTranscript,
  saveCachedTranscript
};
