const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const {
  normalizeTranscript,
  transcriptCacheKey,
  transcriptFingerprint,
  loadCachedTranscript,
  saveCachedTranscript
} = require('../editor/transcript');
const { getWhisperStatus, transcribeWithWhisper } = require('../editor/whisper');

const ROOT = path.resolve(__dirname, '../..');
const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/transcript.sample.json'), 'utf8'));

test('transcript normalisation preserves words and rejects missing timestamps', () => {
  const transcript = normalizeTranscript(raw, { duration: raw.meta.duration });
  assert.equal(transcript.language, 'es');
  assert.ok(transcript.words.length >= 20);
  assert.ok(transcript.segments.length >= 4);
  for (const word of transcript.words) {
    assert.ok(Number.isFinite(word.start) && Number.isFinite(word.end));
    assert.ok(word.end > word.start);
  }
  assert.throws(() => normalizeTranscript({ segments: [], words: [] }, { duration: 10 }), /palabras/);
  assert.throws(() => normalizeTranscript({
    segments: [],
    words: [{ word: 'hola', start: NaN, end: 1 }]
  }, { duration: 10 }), /finitos/);
});

test('repairs zero-width ASR timestamps without inventing words', () => {
  const repaired = normalizeTranscript({
    language: 'es',
    text: 'se va a empezar a inclinar',
    words: [
      { word: 'se', start: 0.0, end: 0.2 },
      { word: 'empezar', start: 0.2, end: 0.2 },
      { word: 'inclinar', start: 0.2, end: 0.6 }
    ],
    segments: [{ id: 0, text: 'se va a empezar a inclinar', start: 0, end: 0.6 }]
  }, { duration: 1 });
  const word = repaired.words.find((entry) => entry.word === 'empezar');
  assert.ok(word.end > word.start);
  assert.equal(word.word, 'empezar');
});

test('transcript cache keys react to file, model and language changes', () => {
  const stat = { size: 100, mtimeMs: 123456 };
  const baseKey = transcriptCacheKey({ videoPath: 'C:\\videos\\toma final.mp4', stat, config: { model: 'small', language: 'es' } });
  assert.equal(baseKey.length, 24);
  assert.notEqual(baseKey, transcriptCacheKey({ videoPath: 'C:\\videos\\toma final.mp4', stat: { ...stat, mtimeMs: 123457 }, config: { model: 'small', language: 'es' } }));
  assert.notEqual(baseKey, transcriptCacheKey({ videoPath: 'C:\\videos\\toma final.mp4', stat, config: { model: 'medium', language: 'es' } }));
  assert.notEqual(baseKey, transcriptCacheKey({ videoPath: 'C:\\videos\\toma final.mp4', stat, config: { model: 'small', language: 'en' } }));
  assert.notEqual(baseKey, transcriptCacheKey({ videoPath: 'C:\\videos\\otra.mp4', stat, config: { model: 'small', language: 'es' } }));
});

test('transcript cache round-trips and detects a different key', () => {
  const dir = path.join(ROOT, 'animaciones/editor_runs/_transcript_check');
  fs.mkdirSync(dir, { recursive: true });
  try {
    const transcript = normalizeTranscript(raw, { duration: raw.meta.duration });
    saveCachedTranscript(dir, 'abcdef', transcript);
    const loaded = loadCachedTranscript(dir, 'abcdef', { duration: raw.meta.duration });
    assert.ok(loaded);
    assert.equal(transcriptFingerprint(loaded), transcriptFingerprint(transcript));
    assert.equal(loadCachedTranscript(dir, 'other', { duration: raw.meta.duration }), null);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('missing ASR environment fails honestly with setup instructions', () => {
  const missing = getWhisperStatus({ venvDir: path.join(ROOT, 'animaciones/editor_runs/_no_venv'), python: path.join(ROOT, 'animaciones/editor_runs/_no_venv/python.exe') });
  assert.equal(missing.available, false);
  assert.match(missing.instructions, /npm run edit:setup/);
  const runDir = path.join(ROOT, 'animaciones/editor_runs/_no_venv_run');
  fs.mkdirSync(runDir, { recursive: true });
  const fakeVideo = path.join(runDir, 'fake video.mp4');
  fs.writeFileSync(fakeVideo, Buffer.from('not a real video'));
  try {
    assert.throws(() => transcribeWithWhisper({
      videoPath: fakeVideo,
      duration: 10,
      runDir,
      logger: { info() {}, warn() {}, error() {} },
      options: {
        venvDir: path.join(ROOT, 'animaciones/editor_runs/_no_venv'),
        python: path.join(ROOT, 'animaciones/editor_runs/_no_venv/python.exe')
      }
    }), /edit:setup/);
  } finally {
    fs.rmSync(runDir, { recursive: true, force: true });
  }
});
