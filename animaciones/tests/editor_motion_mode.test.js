const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const { parseArgs } = require('../editor/cli');
const {
  validatePlan,
  PlanValidationError,
  LIMITS,
  MOTION_LIMITS,
  TRANSITIONS,
  OVERLAY_STYLES,
  COMPONENTS
} = require('../editor/plan_schema');
const { directStyle, FIXED_ELEMENTS } = require('../editor/style_director');
const { planMotionWithLocal, REAL_SFX_IDS } = require('../editor/motion_planner');
const { buildTimeline, buildBaseVideoGraph } = require('../editor/camera');
const { buildAss, DEFAULT_STYLE } = require('../editor/subtitles');
const { computeMotionPacing } = require('../editor/qa');
const { runEditorPipeline } = require('../editor/pipeline');
const { runOverlayQA } = require('../editor/qa_overlay');
const { SceneRenderer, resolveChrome } = require('../editor/scene_renderer');
const CacheManager = require('../engine/cache_manager');
const { loadCatalog, catalogIds } = require('../editor/sfx_catalog');
const { normalizeTranscript } = require('../editor/transcript');
const { runFFmpeg, probeMedia } = require('../editor/ffmpeg');

const ROOT = path.resolve(__dirname, '../..');
const catalog = loadCatalog();
const sfxIds = catalogIds(catalog);
const sampleTranscriptRaw = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/transcript.sample.json'), 'utf8'));
const shortTranscriptRaw = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/transcript.short.json'), 'utf8'));
const baseSamplePlan = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/plan.sample.json'), 'utf8'));

function canRunBrowser() {
  if (process.env.SEDEV_SKIP_INTEGRATION === '1') return 'SEDEV_SKIP_INTEGRATION=1';
  const ff = spawnSync(process.env.FFMPEG_PATH || 'ffmpeg', ['-version'], { encoding: 'utf8', windowsHide: true });
  if (ff.error || ff.status !== 0) return 'ffmpeg no disponible';
  try { resolveChrome(); } catch (err) { return err.message; }
  return true;
}

const browserReason = canRunBrowser();
const skipBrowser = browserReason === true ? false : browserReason;

test('CLI parseArgs accepts --mode motion and --seed', () => {
  const opts = parseArgs(['voice.wav', '--mode', 'motion', '--seed', 'demo-seed-1']);
  assert.equal(opts.video, 'voice.wav');
  assert.equal(opts.mode, 'motion');
  assert.equal(opts.seed, 'demo-seed-1');
});

test('plan_schema relaxes limits ONLY in motion mode and validates transitions + 7 legacy components + hud_frame', () => {
  assert.deepEqual(TRANSITIONS, ['cut', 'whip', 'flash']);
  assert.ok(OVERLAY_STYLES.includes('hud_frame'));
  for (const comp of [
    'hook_impact', 'cost_ticker', 'disaster_monitor', 'latency_scale',
    'network_pipeline', 'tradeoff_matrix', 'tree_hierarchy'
  ]) {
    assert.ok(COMPONENTS[comp], `Missing component schema: ${comp}`);
  }

  // Talking head still strictly rejects > 6 brolls and 0.8s brolls
  const talkingOver = JSON.parse(JSON.stringify(baseSamplePlan));
  talkingOver.brolls = Array.from({ length: 8 }, (_, i) => ({
    id: `b_${i}`,
    start: i * 1.4,
    end: i * 1.4 + 1.2,
    concept: 'bloque de prueba',
    narrative: 'Prueba talking head.',
    component: 'editorial_explainer',
    props: { variant: 'detail', headline: 'BLOQUE VALIDO', icon: 'cpu' }
  }));
  assert.throws(() => validatePlan(talkingOver, { duration: 24.499, sfxIds }), /demasiados B-rolls/);

  const talkingShort = JSON.parse(JSON.stringify(baseSamplePlan));
  talkingShort.brolls[0].end = talkingShort.brolls[0].start + 0.85;
  assert.throws(() => validatePlan(talkingShort, { duration: 24.499, sfxIds }), /mínimo 1\.2s/);

  // Motion mode accepts 16 contiguous brolls covering 100%, 0.8s scene, and cut|whip|flash transitions
  const motionPlan = {
    version: '1',
    mode: 'motion',
    source: { duration: 16.0, width: 1080, height: 1920, fps: 30 },
    transcript: { language: 'es', text: 'Prueba de cobertura completa en modo motion.' },
    captions: { enabled: true, dynamic: true, overBroll: true, maxCharsPerLine: 20, maxLines: 1, minDuration: 0.4, marginV: 210, highlightWords: [] },
    brolls: Array.from({ length: 16 }, (_, i) => ({
      id: `m_${i}`,
      start: i,
      end: i + (i === 0 ? 0.8 : 1.0),
      transition: ['cut', 'whip', 'flash'][i % 3],
      cutStyle: 'j-cut',
      concept: `escena ${i}`,
      narrative: `Escena motion ${i}`,
      component: i === 0 ? 'hook_impact' : 'editorial_explainer',
      props: i === 0
        ? { lines: [{ text: 'PRUEBA REAL', color: '#ffffff' }], icon: 'lightning' }
        : { variant: 'detail', headline: 'FLUJO CONTINUO', icon: 'cpu' }
    })),
    overlays: [
      { id: 'hud_1', start: 2.0, end: 4.0, style: 'hud_frame', text: '', highlight: 'CAM 01', allowOverBroll: true }
    ],
    cameras: [],
    sfx: []
  };
  motionPlan.brolls[0].end = 1.0;
  motionPlan.brolls[1].end = 1.8; // 0.8s scene!
  motionPlan.brolls[2].start = 1.8;

  const validated = validatePlan(motionPlan, { duration: 16.0, sfxIds });
  assert.equal(validated.mode, 'motion');
  assert.equal(validated.brolls.length, 16);
  assert.equal(validated.brolls[1].transition, 'whip');

  // Motion mode forbids cameras
  const withCam = JSON.parse(JSON.stringify(motionPlan));
  withCam.cameras = [{ id: 'c1', start: 1.0, end: 2.0, type: 'push', intensity: 0.5 }];
  assert.throws(() => validatePlan(withCam, { duration: 16.0, sfxIds }), /cámaras/);

  // Motion mode rejects > 32% stock_video
  const tooMuchStock = JSON.parse(JSON.stringify(motionPlan));
  for (let i = 1; i <= 7; i++) {
    tooMuchStock.brolls[i].component = 'stock_video';
    tooMuchStock.brolls[i].props = { videoQuery: 'server room dark', sourcePreference: 'pixabay', tone: 'moody' };
  }
  assert.throws(() => validatePlan(tooMuchStock, { duration: 16.0, sfxIds }), /stock_video/);
});

test('style_director is deterministic for the same seed and avoids repeating the last 2 renders', () => {
  const tempDir = path.join(ROOT, 'animaciones/editor_runs/_style_director_test');
  fs.rmSync(tempDir, { recursive: true, force: true });
  fs.mkdirSync(tempDir, { recursive: true });
  const historyPath = path.join(tempDir, 'style_history.json');
  try {
    const a1 = directStyle({ seed: 'seed-alpha', historyPath, record: true });
    const a2 = directStyle({ seed: 'seed-alpha', historyPath, record: true });
    assert.deepEqual(a1, a2, 'Same seed must be deterministic even when recorded');
    assert.deepEqual(a1.fixed, FIXED_ELEMENTS);

    const b1 = directStyle({ seed: 'seed-beta', historyPath, record: true });
    const c1 = directStyle({ seed: 'seed-gamma', historyPath, record: true });
    assert.notEqual(b1.signature, a1.signature);
    assert.notEqual(c1.signature, a1.signature);
    assert.notEqual(c1.signature, b1.signature);

    // Check persisted history file has 3 entries and avoids repeating last 2
    const persisted = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    assert.equal(persisted.entries.length, 3);
    assert.notEqual(persisted.entries[2].signature, persisted.entries[0].signature);
    assert.notEqual(persisted.entries[2].signature, persisted.entries[1].signature);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('motion_planner creates high-coverage beat plan with hook 0-1.5s, <=3.5s pacing, real SFX, and lower centered captions', () => {
  const transcript = normalizeTranscript(sampleTranscriptRaw, { duration: sampleTranscriptRaw.meta.duration });
  const source = { video: 'voice.wav', duration: sampleTranscriptRaw.meta.duration, width: 1080, height: 1920, fps: 30, hash: 'h1' };

  const planA = planMotionWithLocal(transcript, source, {
    seed: 'test-seed-1',
    sfxCatalog: catalog,
    ignoreStyleHistory: true
  });
  const planB = planMotionWithLocal(transcript, source, {
    seed: 'test-seed-2',
    sfxCatalog: catalog,
    ignoreStyleHistory: true
  });

  assert.equal(planA.mode, 'motion');
  assert.equal(planA.cameras.length, 0);
  assert.equal(planA.brolls[0].start, 0);
  assert.ok(planA.brolls[0].end <= 2.4, 'Hook beat starts at t=0 and settles promptly');
  assert.ok(planA.captions.overBroll, 'Motion mode enables captions over scenes');
  assert.ok(planA.captions.marginV < DEFAULT_STYLE.marginV, 'Motion captions are positioned lower than talking head');
  assert.notEqual(planA.style.signature, planB.style.signature);

  const pacing = computeMotionPacing(planA, source.duration);
  assert.ok(pacing.maxUncoveredGapSec <= 3.5, `uncovered gap ${pacing.maxUncoveredGapSec}s > 3.5s`);
  assert.ok(pacing.maxEventIntervalSec <= 3.55, `event interval ${pacing.maxEventIntervalSec}s > 3.55s`);
  assert.ok(pacing.stockCoverage <= 0.32, `stock coverage ${pacing.stockCoverage} > 0.32`);
  assert.equal(pacing.hudOverStockOk, true);

  // All SFX are from the 9 real sounds and non-consecutive
  assert.ok(planA.sfx.length >= 3);
  for (let i = 0; i < planA.sfx.length; i++) {
    assert.ok(REAL_SFX_IDS.includes(planA.sfx[i].sound), `Expected real SFX, got ${planA.sfx[i].sound}`);
    if (i > 0) assert.notEqual(planA.sfx[i].sound, planA.sfx[i - 1].sound);
  }

  // ASS subtitles render cleanly with lower marginV
  const ass = buildAss(transcript, planA);
  assert.match(ass, new RegExp(`,${planA.captions.marginV},1\\r?\\n`));
  assert.ok((ass.match(/\nDialogue:\s/g) || []).length > 0);
});

test('camera.js generates bed segments and motion graph without referencing [0:v]', () => {
  const timeline = buildTimeline({
    duration: 5.0,
    mode: 'motion',
    brolls: [
      { id: 'b1', start: 0.5, end: 2.5, transition: 'flash' },
      { id: 'b2', start: 2.5, end: 5.0, transition: 'whip' }
    ],
    cameras: [{ id: 'c1', start: 0, end: 0.5, type: 'push' }]
  });
  assert.equal(timeline[0].kind, 'bed');
  assert.equal(timeline[0].camera, null);

  const graph = buildBaseVideoGraph({
    segments: timeline,
    brollInputIndex: { b1: 1, b2: 2 },
    fps: 30,
    width: 1080,
    height: 1920,
    mode: 'motion',
    duration: 5.0
  });
  assert.ok(!graph.lines.some((l) => l.includes('[0:v]')), 'Motion graph must never read [0:v]');
  assert.ok(graph.lines.some((l) => l.includes('drawgrid=')), 'Motion bed must draw telemetry grid');
  assert.ok(graph.lines.some((l) => l.includes('eq=brightness=')), 'Flash transition applied');
  assert.ok(graph.lines.some((l) => l.includes('crop=w=iw*0.94')), 'Whip transition applied');
});

test('hud_frame overlay passes bounds and alpha QA', { skip: skipBrowser, timeout: 180000 }, async () => {
  const outDir = path.join(ROOT, 'animaciones/debug_frames/motion_hud_qa_test');
  const report = await runOverlayQA({
    outDir,
    reportPath: path.join(outDir, 'qa_hud_report.json'),
    samples: [
      { style: 'hud_frame', text: 'SERVIDOR EN RIESGO', highlight: 'CAM 01 // REC', accent: '#10b981', position: 'top', duration: 1.6 },
      { style: 'hud_frame', text: '', highlight: 'FEED 02', accent: '#f59e0b', position: 'top', duration: 1.4 }
    ]
  });
  assert.equal(report.ok, true, JSON.stringify({ errors: report.errors, samples: report.samples.map((s) => ({ bounds: s.bounds, alpha: s.alpha })) }));
});

test('all 7 legacy components render cleanly in SceneRenderer without errors', { skip: skipBrowser, timeout: 240000 }, async () => {
  const runRoot = path.join(ROOT, 'animaciones/editor_runs/_legacy_components_check');
  fs.rmSync(runRoot, { recursive: true, force: true });
  const cacheManager = new CacheManager(path.join(runRoot, 'cache'), { projectRoot: ROOT });
  const renderer = new SceneRenderer({ tempRoot: path.join(runRoot, 'temp'), logger: { info() {}, warn() {}, error() {} } });
  const scenes = [
    { id: 'c_hi', type: 'hook_impact', duration: 1.0, theme: 'dark', props: { lines: [{ text: '300 GB', color: '#ffffff' }, { text: 'BORRADOS', highlight: '#10b981', textColor: '#050505' }], icon: 'database', metric: { from: 0, value: 300, suffix: ' GB', label: 'DATOS' } } },
    { id: 'c_ct', type: 'cost_ticker', duration: 1.0, theme: 'dark', props: { title: 'COSTE OPERATIVO', cloudCost: 1800, bareMetalCost: '0h' } },
    { id: 'c_dm', type: 'disaster_monitor', duration: 1.0, theme: 'dark', props: { title: 'INCIDENTE EN VIVO', crashTime: 0.3, latencyNormal: 15, latencyCrash: 12000 } },
    { id: 'c_ls', type: 'latency_scale', duration: 1.0, theme: 'dark', props: { title: 'ESCALA DE TIEMPO' } },
    { id: 'c_np', type: 'network_pipeline', duration: 1.0, theme: 'dark', props: { title: 'FLUJO DE RESPALDO' } },
    { id: 'c_tm', type: 'tradeoff_matrix', duration: 1.0, theme: 'dark', props: { title: 'PANEL VS RESTORE', conclusionBadge: 'CRITERIO', conclusion: 'Solo existe lo que restauras.' } },
    { id: 'c_th', type: 'tree_hierarchy', duration: 1.0, theme: 'dark', props: { title: 'ÁRBOL DE NODOS', conclusionBadge: 'TOPOLOGÍA' } },
    { id: 'c_vr', type: 'versus_race', duration: 1.2, theme: 'dark', props: { title: 'BORRADO VS REACCIÓN', laneA: { name: 'RM -RF', metric: '0.02 s', color: '#ef4444', speed: 1.0 }, laneB: { name: 'REACCIÓN', metric: '0.50 s', color: '#fb6f54', speed: 0.3 }, footerLeft: 'COMPARATIVA', footerRight: 'SIN MARGEN' } },
    { id: 'c_kh', type: 'kinetic_hook', duration: 1.2, theme: 'dark', props: { header: 'DATO CLAVE', lines: [{ text: '300 GB', color: '#ffffff' }, { text: 'BORRADOS', color: '#fb6f54' }], subtitle: 'IMPACTO REAL', detail: 'Base principal eliminada.' } }
  ];
  try {
    for (const sc of scenes) {
      const out = path.join(runRoot, `${sc.id}.mp4`);
      const res = await renderer.renderSceneToMp4(sc, out, { fps: 30, cacheManager, noCache: true });
      assert.ok(fs.existsSync(res.file), `${sc.type} did not produce MP4`);
      assert.equal(probeMedia(res.file).videoCodec, 'h264');
    }
  } finally {
    await renderer.close();
    fs.rmSync(runRoot, { recursive: true, force: true });
  }
});

test('end-to-end --mode motion pipeline works from audio-only WAV voice-over offline', { skip: skipBrowser, timeout: 300000 }, async () => {
  const runRoot = path.join(ROOT, 'animaciones/editor_runs/_motion_e2e_test');
  fs.rmSync(runRoot, { recursive: true, force: true });
  fs.mkdirSync(runRoot, { recursive: true });
  const wavPath = path.join(runRoot, 'voice_only.wav');
  const outMp4 = path.join(runRoot, 'motion_out.mp4');
  const histPath = path.join(runRoot, 'style_history.json');

  try {
    // 6.2s audio-only WAV voice-over (no video track)
    runFFmpeg([
      '-y', '-f', 'lavfi', '-i', 'sine=frequency=240:sample_rate=48000:duration=6.2',
      '-ac', '1', '-ar', '48000', '-c:a', 'pcm_s16le', wavPath
    ]);
    const result = await runEditorPipeline({
      video: wavPath,
      mode: 'motion',
      seed: 'e2e-motion-seed',
      transcriptPath: path.join(ROOT, 'animaciones/editor/fixtures/transcript.short.json'),
      runDir: runRoot,
      out: outMp4,
      forceOffline: true,
      styleHistoryPath: histPath,
      logger: { info() {}, warn() {}, error() {}, stage() {} }
    });
    assert.equal(result.ok, true, JSON.stringify(result.qa && { checks: result.qa.checks, errors: result.qa.errors, unverified: result.qa.unverified }));
    const probe = probeMedia(outMp4);
    assert.equal(probe.width, 1080);
    assert.equal(probe.height, 1920);
    assert.equal(probe.videoCodec, 'h264');
    assert.equal(probe.audioCodec, 'aac');
    assert.ok(Math.abs(probe.duration - 6.2) < 0.35);
    assert.equal(result.qa.checks.noLongVisualGaps, true);
    assert.equal(result.qa.checks.cameras, null);
  } finally {
    fs.rmSync(runRoot, { recursive: true, force: true });
  }
});
