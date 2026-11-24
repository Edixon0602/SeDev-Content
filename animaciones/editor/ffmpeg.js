// Thin, shell-free wrappers around ffmpeg/ffprobe.
// Arguments are always passed as an array (never interpolated into a shell),
// so spaces, accents and parentheses in Windows paths stay safe.

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { ensureDir, toPosix } = require('./utils');

const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';
const FFPROBE = process.env.FFPROBE_PATH || 'ffprobe';

function run(bin, args, options = {}) {
  const result = spawnSync(bin, args, {
    cwd: options.cwd,
    env: process.env,
    encoding: options.encoding === null ? null : 'utf8',
    maxBuffer: options.maxBuffer || 128 * 1024 * 1024,
    timeout: options.timeout || 0,
    windowsHide: true
  });
  if (result.error) {
    if (result.error.code === 'ENOENT') {
      throw new Error(`No se encontró ${bin}. Instala FFmpeg o define ${bin === FFPROBE ? 'FFPROBE_PATH' : 'FFMPEG_PATH'}.`);
    }
    throw result.error;
  }
  return result;
}

function runFFmpeg(args, options = {}) {
  const result = run(FFMPEG, ['-hide_banner', '-loglevel', options.loglevel || 'error', ...args], options);
  if (result.status !== 0) {
    const detail = (result.stderr || '').trim() || `exit code ${result.status}`;
    throw new Error(`ffmpeg falló: ${detail}`);
  }
  return result;
}

function runFFprobe(args, options = {}) {
  const result = run(FFPROBE, args, options);
  if (result.status !== 0) {
    throw new Error(`ffprobe falló: ${(result.stderr || '').trim() || `exit code ${result.status}`}`);
  }
  return result;
}

function parseFps(text) {
  const raw = String(text || '');
  const match = /^(\d+)\/(\d+)$/.exec(raw);
  if (match) {
    const den = Number(match[2]);
    return den ? Number(match[1]) / den : 0;
  }
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

function probeMedia(file) {
  const result = runFFprobe([
    '-v', 'error',
    '-show_entries', 'stream=index,codec_type,codec_name,width,height,r_frame_rate,avg_frame_rate,pix_fmt,sample_rate,channels:format=duration,size',
    '-of', 'json',
    file
  ]);
  let data;
  try {
    data = JSON.parse(result.stdout);
  } catch (err) {
    throw new Error(`ffprobe devolvió JSON inválido para ${file}`);
  }
  const streams = Array.isArray(data.streams) ? data.streams : [];
  const video = streams.find((s) => s.codec_type === 'video');
  const audio = streams.find((s) => s.codec_type === 'audio');
  const duration = Number(data.format && data.format.duration);
  const fps = video ? (parseFps(video.r_frame_rate) || parseFps(video.avg_frame_rate)) : 0;
  return {
    file: path.resolve(file),
    duration: Number.isFinite(duration) ? duration : 0,
    size: Number(data.format && data.format.size) || (fs.existsSync(file) ? fs.statSync(file).size : 0),
    hasVideo: !!video,
    hasAudio: !!audio,
    videoCodec: video ? video.codec_name : null,
    audioCodec: audio ? audio.codec_name : null,
    width: video ? Number(video.width) : 0,
    height: video ? Number(video.height) : 0,
    fps,
    pixFmt: video ? video.pix_fmt : null,
    sampleRate: audio ? Number(audio.sample_rate) : 0,
    channels: audio ? Number(audio.channels) : 0
  };
}

function assertMediaTools() {
  const ff = run(FFMPEG, ['-version']);
  if (ff.status !== 0) throw new Error('FFmpeg no responde. Revisa FFMPEG_PATH.');
  const fp = run(FFPROBE, ['-version']);
  if (fp.status !== 0) throw new Error('FFprobe no responde. Revisa FFPROBE_PATH.');
}

function extractAudio(video, outWav, options = {}) {
  ensureDir(path.dirname(outWav));
  const staging = `${outWav}.tmp.wav`;
  try {
    runFFmpeg([
      '-y',
      '-i', video,
      '-vn',
      '-ac', String(options.channels || 1),
      '-ar', String(options.sampleRate || 16000),
      '-c:a', 'pcm_s16le',
      staging
    ]);
    fs.renameSync(staging, outWav);
  } finally {
    if (fs.existsSync(staging)) {
      try { fs.unlinkSync(staging); } catch (err) { /* best effort */ }
    }
  }
  return outWav;
}

function extractFrame(video, timeSec, outPng) {
  ensureDir(path.dirname(outPng));
  const staging = outPng.replace(/\.png$/i, '.tmp.png');
  try {
    runFFmpeg([
      '-y',
      '-ss', String(Math.max(0, Number(timeSec) || 0)),
      '-i', video,
      '-frames:v', '1',
      '-update', '1',
      staging
    ]);
    fs.renameSync(staging, outPng);
  } finally {
    if (fs.existsSync(staging)) {
      try { fs.unlinkSync(staging); } catch (err) { /* best effort */ }
    }
  }
  return outPng;
}

function encodePngSequence(framePattern, outFile, options = {}) {
  ensureDir(path.dirname(outFile));
  const fps = Number(options.fps || 30);
  const duration = Number(options.duration || 0);
  const ext = path.extname(outFile).toLowerCase();
  const staging = outFile.replace(new RegExp(`${ext}$`, 'i'), `.tmp${ext}`);
  const args = ['-y', '-framerate', String(fps), '-i', framePattern];
  if (duration > 0) args.push('-t', String(duration));
  if (options.alpha) {
    args.push('-c:v', 'qtrle', '-pix_fmt', 'argb');
  } else {
    args.push('-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', String(options.crf !== undefined ? options.crf : 17), '-preset', options.preset || 'fast');
  }
  args.push(staging);
  try {
    runFFmpeg(args);
    fs.renameSync(staging, outFile);
  } finally {
    if (fs.existsSync(staging)) {
      try { fs.unlinkSync(staging); } catch (err) { /* best effort */ }
    }
  }
  return outFile;
}

// Path used inside a filter_complex graph. FFmpeg filter syntax needs the
// colon escaped; quotes and backslashes are normalised so Windows paths with
// spaces work when the whole argument is single quoted.
function escapeFilterPath(file) {
  const posix = toPosix(path.resolve(file))
    .replace(/\\/g, '\\\\')
    .replace(/:/g, '\\:')
    .replace(/'/g, "\\'");
  return posix;
}

function quotedFilterPath(file) {
  return `'${escapeFilterPath(file)}'`;
}

function escapeConcatPath(file) {
  return toPosix(path.resolve(file)).replace(/'/g, "'\\''");
}

function alphaAverage(file, timeSec) {
  const result = run(FFMPEG, [
    '-hide_banner', '-loglevel', 'error',
    '-ss', String(Math.max(0, Number(timeSec) || 0)),
    '-i', file,
    '-frames:v', '1',
    '-vf', 'alphaextract,format=gray',
    '-f', 'rawvideo', '-'
  ], { encoding: null, maxBuffer: 32 * 1024 * 1024 });
  if (result.status !== 0) {
    throw new Error(`ffmpeg alphaextract falló: ${String(result.stderr || '').trim()}`);
  }
  const buffer = result.stdout || Buffer.alloc(0);
  if (!buffer.length) return null;
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) sum += buffer[i];
  return sum / buffer.length;
}

function audioRmsDb(file, startSec, durationSec) {
  const start = Math.max(0, Number(startSec) || 0);
  const end = start + Math.max(0.05, Number(durationSec) || 0.1);
  const result = run(FFMPEG, [
    '-hide_banner', '-loglevel', 'error',
    '-i', file,
    '-vn',
    '-af', `atrim=start=${start}:end=${end},aresample=48000`,
    '-ac', '1', '-ar', '48000', '-f', 's16le', '-'
  ], { encoding: null, maxBuffer: 64 * 1024 * 1024 });
  if (result.status !== 0) return null;
  const buffer = result.stdout || Buffer.alloc(0);
  if (!buffer.length) return -120;
  let sum = 0;
  const samples = Math.floor(buffer.length / 2);
  for (let i = 0; i < samples; i++) {
    const value = buffer.readInt16LE(i * 2) / 32768;
    sum += value * value;
  }
  if (!samples || sum <= 0) return -120;
  return 20 * Math.log10(Math.sqrt(sum / samples));
}

function frameVariance(file) {
  const result = run(FFMPEG, [
    '-hide_banner', '-loglevel', 'error',
    '-i', file,
    '-frames:v', '1',
    '-vf', 'format=gray',
    '-f', 'rawvideo', '-'
  ], { encoding: null, maxBuffer: 32 * 1024 * 1024 });
  if (result.status !== 0) return null;
  const buffer = result.stdout || Buffer.alloc(0);
  if (!buffer.length) return null;
  let sum = 0;
  let sumSq = 0;
  for (let i = 0; i < buffer.length; i++) {
    const value = buffer[i] / 255;
    sum += value;
    sumSq += value * value;
  }
  const mean = sum / buffer.length;
  return sumSq / buffer.length - mean * mean;
}

function probeQuick(file) {
  try {
    return probeMedia(file);
  } catch (err) {
    return null;
  }
}

module.exports = {
  FFMPEG,
  FFPROBE,
  run,
  runFFmpeg,
  runFFprobe,
  parseFps,
  probeMedia,
  assertMediaTools,
  extractAudio,
  extractFrame,
  encodePngSequence,
  escapeFilterPath,
  quotedFilterPath,
  escapeConcatPath,
  alphaAverage,
  audioRmsDb,
  frameVariance,
  probeQuick
};
