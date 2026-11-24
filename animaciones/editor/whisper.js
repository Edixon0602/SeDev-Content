// Isolated faster-whisper integration.
//
// The Python environment lives inside the repository:
//   animaciones/editor/.venv
//   animaciones/editor/.models
// If it is missing we throw with exact setup instructions. We never fabricate
// a transcript and never fall back to a cloud API.

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { ensureDir, fileStamp, PROJECT_ROOT, atomicWriteJson } = require('./utils');
const {
  normalizeTranscript,
  transcriptCacheKey,
  loadCachedTranscript,
  saveCachedTranscript
} = require('./transcript');
const { extractAudio, probeMedia } = require('./ffmpeg');

const DEFAULT_MODEL = 'small';
const DEFAULT_COMPUTE_TYPE = 'int8';

function resolveWhisperConfig(options = {}) {
  return {
    model: options.model || process.env.SEDEV_WHISPER_MODEL || DEFAULT_MODEL,
    language: options.language || process.env.SEDEV_WHISPER_LANGUAGE || 'auto',
    computeType: options.computeType || process.env.SEDEV_WHISPER_COMPUTE_TYPE || DEFAULT_COMPUTE_TYPE,
    beamSize: Number(options.beamSize || process.env.SEDEV_WHISPER_BEAM || 5),
    vad: options.vad !== false,
    device: options.device || process.env.SEDEV_WHISPER_DEVICE || 'cpu'
  };
}

function editorRoot(root = PROJECT_ROOT) {
  return path.join(root, 'animaciones', 'editor');
}

function whisperPaths(root = PROJECT_ROOT, overrides = {}) {
  const base = editorRoot(root);
  const venvDir = overrides.venvDir || path.join(base, '.venv');
  const isWin = process.platform === 'win32';
  return {
    root,
    base,
    venvDir,
    python: overrides.python || (isWin
      ? path.join(venvDir, 'Scripts', 'python.exe')
      : path.join(venvDir, 'bin', 'python')),
    modelDir: overrides.modelDir || path.join(base, '.models'),
    script: path.join(base, 'python', 'transcribe.py'),
    requirements: path.join(base, 'python', 'requirements.txt')
  };
}

function setupInstructions(paths) {
  return [
    'faster-whisper no está disponible en el entorno aislado del proyecto.',
    `Entorno esperado: ${paths.venvDir}`,
    'Instalación (una sola vez, dentro del proyecto):',
    '  npm run edit:setup',
    'Después, la primera transcripción descargará el modelo en:',
    `  ${paths.modelDir}`,
    'También puedes aportar un transcript existente con --transcript <ruta.json>.'
  ].join('\n');
}

function getWhisperStatus(options = {}) {
  const paths = whisperPaths(options.root || PROJECT_ROOT, options);
  const pythonExists = fs.existsSync(paths.python);
  if (!pythonExists) {
    return {
      available: false,
      reason: 'missing-venv',
      paths,
      python: paths.python,
      instructions: setupInstructions(paths)
    };
  }
  const check = spawnSync(paths.python, ['-c', 'import faster_whisper'], {
    encoding: 'utf8',
    timeout: options.timeoutMs || 30000,
    windowsHide: true
  });
  if (check.status !== 0) {
    return {
      available: false,
      reason: 'missing-module',
      paths,
      python: paths.python,
      detail: (check.stderr || check.stdout || '').trim(),
      instructions: setupInstructions(paths)
    };
  }
  return { available: true, reason: 'ok', paths, python: paths.python };
}

function transcribeWithWhisper({ videoPath, duration, runDir, options = {}, logger = console }) {
  const config = resolveWhisperConfig(options);
  const paths = whisperPaths(options.root || PROJECT_ROOT, options.paths || {
    venvDir: options.venvDir,
    python: options.python,
    modelDir: options.modelDir
  });
  const key = transcriptCacheKey({ videoPath, stat: fileStamp(videoPath), config });
  const globalCache = options.globalCacheDir || path.join(editorRoot(options.root || PROJECT_ROOT), '.cache', 'transcripts');

  if (!options.force && options.useCache !== false) {
    const cached = loadCachedTranscript(globalCache, key, { duration, source: 'faster-whisper', provider: 'faster-whisper' });
    if (cached) {
      logger.info(`Transcript en caché: ${path.join(globalCache, `${key}.json`)}`);
      return { transcript: cached, cached: true, cacheKey: key, provider: 'faster-whisper' };
    }
  }

  const status = getWhisperStatus({ ...options, ...paths });
  if (!status.available) {
    const err = new Error(status.instructions);
    err.code = 'WHISPER_UNAVAILABLE';
    err.status = status;
    throw err;
  }

  ensureDir(paths.modelDir);
  ensureDir(path.join(runDir, 'source'));
  const audioPath = path.join(runDir, 'source', 'audio_16k.wav');
  logger.info('Extrayendo audio mono 16 kHz para ASR...');
  extractAudio(videoPath, audioPath, { channels: 1, sampleRate: 16000 });

  const rawOutput = path.join(runDir, 'source', 'whisper_raw.json');
  const args = [
    paths.script,
    '--audio', audioPath,
    '--output', rawOutput,
    '--model', config.model,
    '--model-dir', paths.modelDir,
    '--language', config.language,
    '--compute-type', config.computeType,
    '--device', config.device,
    '--beam-size', String(config.beamSize)
  ];
  if (config.vad) args.push('--vad');

  logger.info(`Transcribiendo con faster-whisper (${config.model}, ${config.computeType}, ${config.device})...`);
  const result = spawnSync(paths.python, args, {
    cwd: PROJECT_ROOT,
    env: {
      ...process.env,
      HF_HOME: path.join(paths.base, '.cache', 'hf'),
      HF_HUB_DISABLE_SYMLINKS_WARNING: '1'
    },
    encoding: 'utf8',
    timeout: options.timeoutMs || 0,
    maxBuffer: 64 * 1024 * 1024,
    windowsHide: true
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const detail = `${(result.stderr || '').trim()}\n${(result.stdout || '').trim()}`.trim();
    throw new Error(`faster-whisper falló (exit ${result.status}).\n${detail}`);
  }
  if (!fs.existsSync(rawOutput)) {
    throw new Error('faster-whisper terminó sin producir JSON de transcripción.');
  }
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(rawOutput, 'utf8'));
  } catch (err) {
    throw new Error(`La salida de faster-whisper no es JSON válido: ${err.message}`);
  }
  const transcript = normalizeTranscript(raw, {
    duration,
    source: 'faster-whisper',
    provider: 'faster-whisper',
    language: config.language === 'auto' ? undefined : config.language
  });
  transcript.meta = {
    ...(transcript.meta || {}),
    cacheKey: key,
    model: config.model,
    computeType: config.computeType,
    device: config.device,
    beamSize: config.beamSize
  };
  const stored = saveCachedTranscript(globalCache, key, transcript);
  logger.info(`Transcripción completada: ${transcript.words.length} palabras, ${transcript.segments.length} segmentos.`);
  return { transcript: stored, cached: false, cacheKey: key, provider: 'faster-whisper' };
}

function writeRawTranscriptForDebug(runDir, transcript) {
  return atomicWriteJson(path.join(runDir, 'source', 'transcript_normalized.json'), transcript);
}

module.exports = {
  DEFAULT_MODEL,
  DEFAULT_COMPUTE_TYPE,
  editorRoot,
  whisperPaths,
  getWhisperStatus,
  resolveWhisperConfig,
  transcribeWithWhisper,
  writeRawTranscriptForDebug,
  probeMedia
};
