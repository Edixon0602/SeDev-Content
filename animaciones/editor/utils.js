// Shared, dependency-free helpers for the automated editor.
// Everything here must stay deterministic and Windows-path safe.

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function atomicWriteFile(file, data) {
  const dir = path.dirname(file);
  ensureDir(dir);
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, data);
  try {
    fs.renameSync(tmp, file);
  } catch (err) {
    try { fs.unlinkSync(tmp); } catch (cleanup) { /* best effort */ }
    throw err;
  }
  return file;
}

function atomicWriteJson(file, value) {
  return atomicWriteFile(file, `${JSON.stringify(value, null, 2)}\n`);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function sha256File(file) {
  const hash = crypto.createHash('sha256');
  const fd = fs.openSync(file, 'r');
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  try {
    let read = 0;
    while ((read = fs.readSync(fd, buffer, 0, buffer.length, null)) > 0) {
      hash.update(buffer.subarray(0, read));
    }
  } finally {
    fs.closeSync(fd);
  }
  return hash.digest('hex');
}

function fileStamp(file) {
  const stat = fs.statSync(file);
  return { size: stat.size, mtimeMs: stat.mtimeMs, path: path.resolve(file) };
}

function slugify(value, maxLength = 48) {
  const ascii = String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  let out = ascii.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (out.length > maxLength) out = out.slice(0, maxLength).replace(/-+$/g, '');
  return out || 'video';
}

// A run is tied to the absolute input path as well as its name, so two files
// called "toma final.mp4" in different folders never share artifacts.
function runSlug(videoPath) {
  const abs = path.resolve(videoPath);
  const base = path.basename(abs, path.extname(abs));
  const suffix = sha256(abs.replace(/\\/g, '/')).slice(0, 8);
  return `${slugify(base)}_${suffix}`;
}

function runPaths(videoPath, options = {}) {
  const root = options.projectRoot || PROJECT_ROOT;
  const slug = options.slug || runSlug(videoPath);
  const runDir = options.runDir
    ? path.resolve(options.runDir)
    : path.join(root, 'animaciones', 'editor_runs', slug);
  return {
    projectRoot: root,
    slug,
    runDir,
    sourceDir: path.join(runDir, 'source'),
    transcript: path.join(runDir, 'transcript.json'),
    plan: path.join(runDir, 'edit_plan.json'),
    state: path.join(runDir, 'state.json'),
    manifestsDir: path.join(runDir, 'manifests'),
    assetsDir: path.join(runDir, 'assets'),
    rendersDir: path.join(runDir, 'renders'),
    subtitles: path.join(runDir, 'subtitles.ass'),
    mixDir: path.join(runDir, 'mix'),
    tempDir: path.join(runDir, 'mix', '_temp'),
    cacheDir: options.cacheDir || path.join(root, 'animaciones', 'output_clips', 'cache', 'editor'),
    globalTranscriptCache: path.join(root, 'animaciones', 'editor', '.cache', 'transcripts'),
    final: options.final ? path.resolve(options.final) : path.join(runDir, 'final.mp4'),
    qa: path.join(runDir, 'qa_report.json'),
    qaFrames: path.join(runDir, 'qa', 'frames')
  };
}

function roundTime(value, decimals = 3) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

function roundToFrame(value, fps) {
  const frames = Math.max(1, Math.round(Number(value) * Number(fps)));
  return roundTime(frames / Number(fps), 6);
}

function toPosix(file) {
  return String(file).replace(/\\/g, '/');
}

function relPosix(from, to) {
  return toPosix(path.relative(from, to));
}

function isPlainObject(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

// Stable JSON for hashes: object keys are sorted at every depth.
function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }
  if (isPlainObject(value)) {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function stripJsonFences(text) {
  let out = String(text || '').trim();
  const fenced = /^```(?:json)?\s*([\s\S]*?)\s*```$/i.exec(out);
  if (fenced) out = fenced[1].trim();
  // Some providers wrap the object in prose despite instructions.
  if (!out.startsWith('{')) {
    const first = out.indexOf('{');
    const last = out.lastIndexOf('}');
    if (first >= 0 && last > first) out = out.slice(first, last + 1);
  }
  return out;
}

function clamp(value, min, max) {
  const n = Number(value);
  if (!Number.isFinite(n)) return min;
  return n < min ? min : n > max ? max : n;
}

function loggerFrom(prefix) {
  const tag = prefix ? `[${prefix}]` : '[editor]';
  return {
    info: (msg) => console.log(`${tag} ${msg}`),
    warn: (msg) => console.warn(`${tag} ${msg}`),
    error: (msg) => console.error(`${tag} ${msg}`),
    stage: (n, total, msg) => console.log(`\n${tag} (${n}/${total}) ${msg}`)
  };
}

const EDITOR_HASH_FILES = [
  'utils.js', 'cli.js', 'pipeline.js', 'planner.js', 'llm_planner.js', 'plan_schema.js',
  'assets.js', 'scene_renderer.js', 'camera.js', 'subtitles.js', 'assembly.js',
  'qa.js', 'sfx_catalog.js', 'ffmpeg.js', 'transcript.js', 'whisper.js',
  'auto_image_fetcher.js', 'auto_sfx_fetcher.js'
];

// Behavioural fingerprint for asset/resume caches. Any change to the editor
// render/assembly code invalidates cached assets and stale resumes, even when
// the manifest itself did not change.
function editorCodeFingerprint() {
  const hash = crypto.createHash('sha256');
  for (const relative of EDITOR_HASH_FILES) {
    const file = path.join(__dirname, relative);
    hash.update(`\n<<${relative}>>\n`);
    try {
      hash.update(fs.readFileSync(file));
    } catch (err) {
      hash.update('\u0000missing-editor-file');
    }
  }
  return hash.digest('hex').slice(0, 16);
}

module.exports = {
  PROJECT_ROOT,
  ensureDir,
  atomicWriteFile,
  atomicWriteJson,
  readJson,
  sha256,
  sha256File,
  fileStamp,
  slugify,
  runSlug,
  runPaths,
  roundTime,
  roundToFrame,
  toPosix,
  relPosix,
  isPlainObject,
  stableStringify,
  stripJsonFences,
  clamp,
  loggerFrom,
  editorCodeFingerprint
};
