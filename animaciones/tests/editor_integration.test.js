const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const { runEditorPipeline } = require('../editor/pipeline');
const { probeMedia, runFFmpeg } = require('../editor/ffmpeg');
const { resolveChrome } = require('../editor/scene_renderer');
const { normalizeTranscript } = require('../editor/transcript');
const { groupWordsIntoSentences } = require('../editor/planner');

const ROOT = path.resolve(__dirname, '../..');
const BASE = path.join(ROOT, 'animaciones/editor_runs/_integration_fixture');
const INPUT_DIR = path.join(BASE, 'input');
const VIDEO = path.join(INPUT_DIR, 'static talking head.mp4');
const RUN_DIR = path.join(BASE, 'test run with spaces');
const FINAL = path.join(RUN_DIR, 'final output.mp4');
const TRANSCRIPT = path.join(ROOT, 'animaciones/editor/fixtures/transcript.short.json');
const PLAN = path.join(ROOT, 'animaciones/editor/fixtures/plan.short.json');

function canRunIntegration() {
  if (process.env.SEDEV_SKIP_INTEGRATION === '1') return 'SEDEV_SKIP_INTEGRATION=1';
  const ff = spawnSync(process.env.FFMPEG_PATH || 'ffmpeg', ['-version'], { encoding: 'utf8', windowsHide: true });
  if (ff.error || ff.status !== 0) return 'ffmpeg no disponible';
  try { resolveChrome(); } catch (err) { return err.message; }
  return true;
}

function ensureSyntheticVideo() {
  fs.mkdirSync(INPUT_DIR, { recursive: true });
  if (fs.existsSync(VIDEO) && fs.statSync(VIDEO).size > 1000) return;
  runFFmpeg([
    '-y',
    '-f', 'lavfi', '-i', 'smptebars=size=1080x1920:rate=30:duration=6.2',
    '-f', 'lavfi', '-i', 'sine=frequency=220:sample_rate=48000:duration=6.2',
    '-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '128k', '-shortest',
    VIDEO
  ]);
}

const silentLogger = {
  info() {},
  warn() {},
  error() {},
  stage() {}
};

const skipReason = canRunIntegration();
const skip = skipReason === true ? false : skipReason;

test('offline integration: local planner -> assets -> MP4 -> QA', { skip, timeout: 600000 }, async () => {
  ensureSyntheticVideo();
  const result = await runEditorPipeline({
    video: VIDEO,
    transcriptPath: TRANSCRIPT,
    runDir: RUN_DIR,
    out: FINAL,
    logger: silentLogger
  });
  assert.equal(result.ok, true, JSON.stringify(result.qa && result.qa.checks));
  assert.ok(fs.existsSync(FINAL));
  assert.ok(fs.existsSync(result.planPath));
  assert.ok(fs.existsSync(result.qaPath));

  const probe = probeMedia(FINAL);
  assert.equal(probe.videoCodec, 'h264');
  assert.equal(probe.pixFmt, 'yuv420p');
  assert.equal(probe.width, 1080);
  assert.equal(probe.height, 1920);
  assert.equal(probe.audioCodec, 'aac');
  assert.ok(Math.abs(probe.fps - 30) < 0.02);
  assert.ok(Math.abs(probe.duration - 6.2) < 0.35);

  const qa = JSON.parse(fs.readFileSync(result.qaPath, 'utf8'));
  assert.equal(qa.ok, true);
  const state = JSON.parse(fs.readFileSync(path.join(RUN_DIR, 'state.json'), 'utf8'));
  assert.equal(state.error, undefined);
  assert.equal(qa.checks.brollVisible, true);
  assert.equal(qa.checks.overlays, true);
  assert.equal(qa.checks.overlayAlpha, true);
  assert.ok(qa.checks.cameras === null || qa.checks.cameras === true);
  assert.equal(qa.checks.captions, true);
  assert.ok(qa.layering.brolls[0].changedBefore);
  assert.ok(qa.layering.overlays[0].changedBefore);
  if (qa.layering.cameras.length) assert.ok(qa.layering.cameras[0].filterApplied);
  assert.ok(qa.audio.sfx.every((item) => item.present && item.busRmsDb !== null));
  assert.equal(qa.checks.sfxPresent, true);
  assert.ok(qa.checks.sfxAudible === true || qa.checks.sfxAudible === null);
  assert.ok(qa.contactSheet && fs.existsSync(path.join(RUN_DIR, qa.contactSheet)));

  // The generated plan is reviewable and valid data from the local planner.
  const plan = JSON.parse(fs.readFileSync(result.planPath, 'utf8'));
  assert.ok(plan.brolls.length >= 1, 'local planner must create a B-roll when there is content');
  assert.ok(plan.overlays.length >= 1, 'local planner must create an overlay when there is content');
  assert.ok(plan.cameras.length >= 0, 'camera is optional if the transcript has no usable pause');
  assert.ok(plan.sfx.length >= 1);
  for (const overlay of plan.overlays) {
    assert.ok(Number.isFinite(overlay.semanticStart));
    assert.ok(overlay.start >= overlay.semanticStart - 0.45, `${overlay.id} starts before its spoken idea`);
    assert.ok(overlay.start <= overlay.semanticStart + 0.9, `${overlay.id} starts too late`);
  }
  for (const broll of plan.brolls) {
    assert.ok(broll.end > broll.start);
  }
  const rawTranscript = JSON.parse(fs.readFileSync(TRANSCRIPT, 'utf8'));
  const normalized = normalizeTranscript(rawTranscript, { duration: rawTranscript.meta.duration });
  const ideas = groupWordsIntoSentences(normalized.words);
  for (const broll of plan.brolls) {
    assert.ok(ideas.some((idea) => broll.start >= idea.start - 0.02 && broll.end <= idea.end + 0.05),
      `${broll.id} must stay within its source idea`);
  }
});

test('QA rejects missing layers, captions, SFX bus and camera evidence', { skip, timeout: 180000 }, async () => {
  const { qaFinal } = require('../editor/qa');
  const { runPaths } = require('../editor/utils');
  const negDir = path.join(BASE, 'qa_negative');
  const negFinal = path.join(negDir, 'plain.mp4');
  fs.mkdirSync(negDir, { recursive: true });
  runFFmpeg([
    '-y',
    '-f', 'lavfi', '-i', 'color=c=0x203040:s=1080x1920:r=30:d=2.5',
    '-f', 'lavfi', '-i', 'sine=frequency=220:sample_rate=48000:duration=2.5',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-shortest', negFinal
  ]);
  const transcript = JSON.parse(fs.readFileSync(TRANSCRIPT, 'utf8'));
  const plan = {
    version: '1',
    source: { video: 'negative fixture', duration: 2.5, width: 1080, height: 1920, fps: 30, hash: 'negative' },
    transcript: { language: 'es', text: transcript.text },
    captions: { enabled: true, maxCharsPerLine: 30, maxLines: 2, minDuration: 0.8, overBroll: false, highlightWords: [] },
    brolls: [{ id: 'missing_broll', start: 0.4, end: 1.2, concept: 'x', narrative: 'x', component: 'editorial_explainer', props: { variant: 'transform', headline: 'X' } }],
    overlays: [{ id: 'missing_overlay', start: 1.2, end: 1.8, text: 'FALTA', position: 'top' }],
    cameras: [{ id: 'missing_camera', start: 0.2, end: 0.9, type: 'push', intensity: 0.5 }],
    sfx: [{ id: 'missing_sfx', at: 0.4, sound: 'soft_whoosh', gainDb: -20, reason: 'test' }]
  };
  const run = runPaths(negFinal, { runDir: negDir });
  const report = qaFinal({
    finalPath: negFinal, plan, run, transcript: null,
    overlayFiles: [], sfxFiles: [], sfxBus: null, assembly: null,
    videoPath: negFinal, logger: silentLogger
  });
  assert.equal(report.ok, false);
  assert.equal(report.checks.overlayAssets, false);
  assert.equal(report.checks.overlays, false);
  assert.equal(report.checks.brollVisible, false);
  assert.equal(report.checks.cameras, false);
  assert.equal(report.checks.sfxAudible, false);
  assert.equal(report.checks.sfxPresent, false);
  assert.equal(report.checks.captions, false);
  assert.notEqual(report.layering.brolls[0].sourceDiff, true);
  assert.notEqual(report.layering.overlays[0].sourceDiff, true);
  assert.notEqual(report.layering.cameras[0].sourceDiff, true);
});


test('ASS/FFmpeg assembly survives apostrophe and Unicode Windows paths', { skip, timeout: 180000 }, async () => {
  ensureSyntheticVideo();
  const pathDir = path.join(BASE, "editor's rún");
  const result = await runEditorPipeline({
    video: VIDEO,
    transcriptPath: TRANSCRIPT,
    planPath: PLAN,
    allowFixturePlan: true,
    noBrolls: true,
    noOverlays: true,
    runDir: pathDir,
    out: path.join(pathDir, 'final.mp4'),
    logger: silentLogger
  });
  assert.equal(result.ok, true);
  assert.ok(fs.existsSync(result.finalPath));
  const qa = JSON.parse(fs.readFileSync(result.qaPath, 'utf8'));
  assert.equal(qa.ok, true);
  assert.ok(qa.checks.captions === true || qa.checks.captions === null);
});

test('reviewed plan requires a matching source.hash unless explicitly a fixture', { skip, timeout: 120000 }, async () => {
  ensureSyntheticVideo();
  const dir = path.join(BASE, 'hash_mismatch');
  fs.mkdirSync(dir, { recursive: true });
  const badPlan = JSON.parse(fs.readFileSync(PLAN, 'utf8'));
  badPlan.source.hash = 'stale-hash';
  const badPlanPath = path.join(dir, 'stale.plan.json');
  fs.writeFileSync(badPlanPath, JSON.stringify(badPlan, null, 2));
  const out = path.join(dir, 'must-not-exist.mp4');
  if (fs.existsSync(out)) fs.unlinkSync(out);
  await assert.rejects(() => runEditorPipeline({
    video: VIDEO,
    transcriptPath: TRANSCRIPT,
    planPath: badPlanPath,
    runDir: dir,
    out,
    logger: silentLogger
  }), /source\.hash/);
  assert.equal(fs.existsSync(out), false);
});

test('CRF 0 is preserved in settings and output', { skip, timeout: 180000 }, async () => {
  ensureSyntheticVideo();
  const dir = path.join(BASE, 'crf_zero');
  const result = await runEditorPipeline({
    video: VIDEO,
    transcriptPath: TRANSCRIPT,
    planPath: PLAN,
    allowFixturePlan: true,
    noBrolls: true,
    noOverlays: true,
    crf: 0,
    runDir: dir,
    out: path.join(dir, 'final.mp4'),
    logger: silentLogger
  });
  assert.equal(result.ok, true);
  const state = JSON.parse(fs.readFileSync(path.join(dir, 'state.json'), 'utf8'));
  assert.equal(state.settings.crf, 0);
  assert.ok(fs.existsSync(result.finalPath));
});

test('--out cannot overwrite the input video', { skip, timeout: 60000 }, async () => {
  await assert.rejects(() => runEditorPipeline({
    video: VIDEO,
    out: VIDEO,
    logger: silentLogger
  }), /--out no puede ser el mismo archivo/);
});

test('--force with --resume re-runs ASR while keeping the reviewed plan', { skip, timeout: 180000 }, async () => {
  ensureSyntheticVideo();
  const dir = path.join(BASE, 'force_resume');
  const rawTranscript = JSON.parse(fs.readFileSync(TRANSCRIPT, 'utf8'));
  let calls = 0;
  const transcribe = () => {
    calls++;
    return rawTranscript;
  };
  const first = await runEditorPipeline({
    video: VIDEO,
    transcribe,
    planPath: PLAN,
    allowFixturePlan: true,
    noBrolls: true,
    noOverlays: true,
    runDir: dir,
    out: path.join(dir, 'final.mp4'),
    logger: silentLogger
  });
  assert.equal(first.ok, true);
  assert.equal(calls, 1);
  const second = await runEditorPipeline({
    video: VIDEO,
    transcribe,
    planPath: PLAN,
    allowFixturePlan: true,
    noBrolls: true,
    noOverlays: true,
    resume: true,
    force: true,
    runDir: dir,
    out: path.join(dir, 'final.mp4'),
    logger: silentLogger
  });
  assert.equal(second.ok, true);
  assert.equal(calls, 2, '--force must bypass the resume transcript');
});

test('invalid plan fails before rendering and never creates a fake MP4', { skip, timeout: 120000 }, async () => {
  ensureSyntheticVideo();
  const badDir = path.join(BASE, 'invalid_run');
  fs.mkdirSync(badDir, { recursive: true });
  const badPlan = JSON.parse(fs.readFileSync(PLAN, 'utf8'));
  badPlan.brolls[0].end = badPlan.source.duration + 5;
  const badPlanPath = path.join(badDir, 'invalid.plan.json');
  fs.writeFileSync(badPlanPath, JSON.stringify(badPlan, null, 2));
  const fakeFinal = path.join(badDir, 'must-not-exist.mp4');
  if (fs.existsSync(fakeFinal)) fs.unlinkSync(fakeFinal);
  await assert.rejects(() => runEditorPipeline({
    video: VIDEO,
    transcriptPath: TRANSCRIPT,
    planPath: badPlanPath,
    allowFixturePlan: true,
    runDir: badDir,
    out: fakeFinal,
    logger: silentLogger
  }), /fuera de la duración|Plan de edición inválido/);
  assert.equal(fs.existsSync(fakeFinal), false);
});
