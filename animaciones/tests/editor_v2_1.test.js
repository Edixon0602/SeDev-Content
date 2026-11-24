const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const { validatePlan, PlanValidationError, OVERLAY_STYLES, CUT_STYLES, COMPONENTS } = require('../editor/plan_schema');
const { loadCatalog, catalogIds } = require('../editor/sfx_catalog');
const { buildSfxInputChains, buildAudioGraph } = require('../editor/assembly');
const { hasOverlayVisual, hasBrollVisual, validateCopy } = require('../editor/copywriter');
const { runOverlayQA } = require('../editor/qa_overlay');
const { SceneRenderer, resolveChrome } = require('../editor/scene_renderer');
const CacheManager = require('../engine/cache_manager');
const { probeMedia } = require('../editor/ffmpeg');

const ROOT = path.resolve(__dirname, '../..');
const catalog = loadCatalog();
const sfxIds = catalogIds(catalog);
const base = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/plan.sample.json'), 'utf8'));

function clone() {
  return JSON.parse(JSON.stringify(base));
}

function canRunBrowser() {
  if (process.env.SEDEV_SKIP_INTEGRATION === '1') return 'SEDEV_SKIP_INTEGRATION=1';
  const ff = spawnSync(process.env.FFMPEG_PATH || 'ffmpeg', ['-version'], { encoding: 'utf8', windowsHide: true });
  if (ff.error || ff.status !== 0) return 'ffmpeg no disponible';
  try { resolveChrome(); } catch (err) { return err.message; }
  return true;
}

const browserReason = canRunBrowser();
const skipBrowser = browserReason === true ? false : browserReason;

test('v2.1 schema accepts minimal_banner, stat_callout, code_terminal, terminal_split, cutStyle and sfx fades', () => {
  assert.ok(OVERLAY_STYLES.includes('minimal_banner'));
  assert.ok(OVERLAY_STYLES.includes('stat_callout'));
  assert.deepEqual(CUT_STYLES, ['hard', 'j-cut', 'l-cut', 'jl-cut']);
  assert.ok(COMPONENTS.code_terminal);
  assert.ok(COMPONENTS.terminal_split);

  const plan = clone();
  plan.brolls = [
    {
      id: 'broll_code',
      start: 2.2,
      end: 5.4,
      cutStyle: 'l-cut',
      concept: 'politica rls en supabase',
      narrative: 'Mostrar politica RLS SQL.',
      component: 'code_terminal',
      props: {
        filename: 'supabase/rls.sql',
        title: 'ACTIVA RLS SIEMPRE',
        codeLines: [
          'ALTER TABLE users ENABLE ROW LEVEL SECURITY;',
          { text: 'CREATE POLICY user_own ON users', highlight: true }
        ],
        cursorLine: 2
      }
    },
    {
      id: 'broll_split',
      start: 14.2,
      end: 18.0,
      cutStyle: 'j-cut',
      concept: 'comparativa antes y despues',
      narrative: 'Comparar tabla publica contra politica segura.',
      component: 'terminal_split',
      props: {
        title: 'SIN RLS VS CON RLS',
        subtitle: 'AUDITORÍA SUPABASE',
        leftTitle: 'SIN POLÍTICA',
        rightTitle: 'CON POLÍTICA RLS',
        leftCode: 'SELECT * FROM users;',
        rightCode: 'WHERE auth.uid() = id;'
      }
    }
  ];
  plan.overlays = [
    {
      id: 'overlay_banner',
      start: 0.2,
      end: 2.0,
      style: 'minimal_banner',
      text: 'DATOS SIN LOGIN',
      icon: 'none',
      accent: '#ef4444',
      position: 'top',
      semanticStart: 0.2,
      semanticEnd: 1.8
    },
    {
      id: 'overlay_stat',
      start: 6.0,
      end: 8.0,
      style: 'stat_callout',
      text: '24.000 APPS',
      highlight: '24.000',
      subtext: 'TABLAS ABIERTAS SIN LOGIN',
      accent: '#f59e0b',
      position: 'top',
      semanticStart: 6.0,
      semanticEnd: 7.8
    }
  ];
  plan.cameras = [];
  plan.sfx = [
    {
      id: 'sfx_real_1',
      at: 1.85,
      sound: 'punch_hit',
      gainDb: -12,
      trimSec: 0.6,
      fadeInSec: 0.05,
      fadeOutSec: 0.2,
      reason: 'Puente sonoro antes de código',
      target: 'broll:broll_code'
    },
    {
      id: 'sfx_real_2',
      at: 13.8,
      sound: 'keyboard_typing',
      gainDb: -10,
      trimSec: 1.8,
      fadeInSec: 0.15,
      fadeOutSec: 0.4,
      reason: 'J-cut teclado antes del diff',
      target: 'broll:broll_split'
    }
  ];

  const validated = validatePlan(plan, { duration: 24.499, sfxIds });
  assert.equal(validated.brolls[0].cutStyle, 'l-cut');
  assert.equal(validated.brolls[1].cutStyle, 'j-cut');
  assert.equal(validated.sfx[0].trimSec, 0.6);
  assert.equal(validated.sfx[0].fadeInSec, 0.05);
  assert.equal(validated.sfx[0].fadeOutSec, 0.2);

  // Reject invalid cutStyle and out-of-range sfx trim/fade values
  const badCut = clone();
  badCut.brolls[0].cutStyle = 'crossfade';
  assert.throws(() => validatePlan(badCut, { duration: 24.499, sfxIds }), /cutStyle/);

  const badTrim = clone();
  badTrim.sfx[0].trimSec = 0.02;
  assert.throws(() => validatePlan(badTrim, { duration: 24.499, sfxIds }), /trimSec/);

  const badFadeIn = clone();
  badFadeIn.sfx[0].fadeInSec = 3.0;
  assert.throws(() => validatePlan(badFadeIn, { duration: 24.499, sfxIds }), /fadeInSec/);

  const badFadeOut = clone();
  badFadeOut.sfx[0].fadeOutSec = -0.1;
  assert.throws(() => validatePlan(badFadeOut, { duration: 24.499, sfxIds }), /fadeOutSec/);
});

test('copywriter ignores icon "none" and validates code_terminal, terminal_split and stat_callout', () => {
  assert.equal(hasOverlayVisual({ icon: 'none' }), false);
  assert.equal(hasOverlayVisual({ icon: 'custom_code' }), true);
  assert.equal(hasBrollVisual({ icon: 'none', leftIcon: 'none', rightIcon: 'none' }), false);
  assert.equal(hasBrollVisual({ leftIcon: 'none', rightIcon: 'ai_agent' }), true);

  const goodPlan = {
    transcript: { text: 'Texto base sin solapamiento' },
    overlays: [
      { id: 'o1', style: 'stat_callout', text: '24.000', highlight: '24.000', subtext: 'APPS ABIERTAS' }
    ],
    brolls: [
      {
        id: 'b1',
        component: 'code_terminal',
        props: {
          title: 'ACTIVA RLS SIEMPRE',
          filename: 'rls.sql',
          codeLines: ['ALTER TABLE users ENABLE ROW LEVEL SECURITY;']
        }
      },
      {
        id: 'b2',
        component: 'terminal_split',
        props: {
          title: 'SIN RLS VS CON RLS',
          subtitle: 'POSTGRES SECURITY',
          leftTitle: 'SIN POLÍTICA',
          rightTitle: 'CON POLÍTICA',
          leftCode: 'SELECT * FROM users;',
          rightCode: 'WHERE auth.uid() = id;'
        }
      }
    ]
  };
  const ok = validateCopy(goodPlan, { strict: false });
  assert.equal(ok.ok, true, JSON.stringify(ok.errors));

  const slopStat = {
    transcript: { text: 'Texto base' },
    overlays: [
      { id: 'o1', style: 'stat_callout', text: '24.000 APPS', subtext: 'MERCADO TECH' }
    ],
    brolls: []
  };
  const bad = validateCopy(slopStat, { strict: false });
  assert.equal(bad.ok, false);
});

test('buildSfxInputChains constructs atrim/afade filters safely without negative start times', () => {
  const lines = [];
  const labels = buildSfxInputChains([
    {
      index: 1,
      soundDurationSec: 2.4,
      event: { at: 1.5, gainDb: -12, trimSec: 1.2, fadeInSec: 0.25, fadeOutSec: 0.4 }
    },
    {
      index: 2,
      soundDurationSec: 0.3,
      event: { at: 4.0, gainDb: -10, fadeInSec: 0.1, fadeOutSec: 0.8 }
    },
    {
      index: 3,
      event: { at: 7.0, gainDb: -15 }
    }
  ], lines);

  assert.deepEqual(labels, ['[sfx0]', '[sfx1]', '[sfx2]']);
  assert.match(lines[0], /atrim=start=0:end=1\.2/);
  assert.match(lines[0], /afade=t=in:st=0:d=0\.25/);
  assert.match(lines[0], /afade=t=out:st=0\.8:d=0\.4/);
  assert.match(lines[0], /adelay=1500\|1500\[sfx0\]/);

  // Short WAV with larger requested fadeOut must clamp st >= 0
  assert.match(lines[1], /afade=t=out:st=0:d=0\.3/);
  assert.ok(!lines.some((l) => /st=-/.test(l)));

  // Legacy SFX without trim/fade works identically
  assert.equal(lines[2], '[3:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,volume=-15dB,adelay=7000|7000[sfx2]');

  const graph = buildAudioGraph({
    duration: 10,
    sfxInputs: [{ index: 1, soundDurationSec: 1.2, event: { at: 1.0, gainDb: -12, trimSec: 0.9, fadeOutSec: 0.2 } }]
  });
  assert.ok(graph.lines.some((l) => l.includes('atrim=start=0:end=0.9') && l.includes('afade=t=out:st=0.7:d=0.2')));
});

test('minimal_banner, stat_callout and iconless overlays pass bounds and alpha QA', { skip: skipBrowser, timeout: 180000 }, async () => {
  const outDir = path.join(ROOT, 'animaciones/debug_frames/editorial_overlay_v21_test');
  const samples = [
    { style: 'minimal_banner', text: 'ACTIVA RLS SIEMPRE', subtext: 'ROW LEVEL SECURITY', accent: '#38bdf8', position: 'top', duration: 1.6 },
    { style: 'stat_callout', text: '24.000 APPS', highlight: '24.000', subtext: 'TABLAS SIN PROTECCIÓN', accent: '#ef4444', position: 'top', duration: 1.6 },
    { style: 'hook_kinetic', text: '¿DATOS SIN LOGIN?', highlight: 'SIN LOGIN', icon: 'none', accent: '#10b981', position: 'top', duration: 1.6 },
    { style: 'icon_pop', text: 'LLAVE PÚBLICA EN NAVEGADOR', icon: 'none', accent: '#f59e0b', position: 'bottom', duration: 1.6 },
    { style: 'split_card', text: 'ANTES VS DESPUÉS', items: [{ label: 'SIN RLS', icon: 'none' }, { label: 'CON RLS', icon: 'none' }], position: 'bottom', duration: 1.6 },
    { style: 'cta_debate', text: '¿YA REVISASTE TUS BACKUPS?', icon: 'none', accent: '#fbbf24', position: 'bottom', duration: 1.6 }
  ];
  const report = await runOverlayQA({
    outDir,
    reportPath: path.join(outDir, 'qa_overlay_v21_report.json'),
    samples
  });
  assert.equal(report.ok, true, JSON.stringify({ errors: report.errors, samples: report.samples.map((s) => ({ text: s.text, bounds: s.bounds, alpha: s.alpha })) }));
  assert.equal(report.samples.length, 6);
});

test('code_terminal and terminal_split load fonts/styles and render cleanly in SceneRenderer', { skip: skipBrowser, timeout: 180000 }, async () => {
  const runRoot = path.join(ROOT, 'animaciones/editor_runs/_v21_render_check');
  const cacheManager = new CacheManager(path.join(runRoot, 'cache'), { projectRoot: ROOT });
  const renderer = new SceneRenderer({ tempRoot: path.join(runRoot, 'temp'), logger: { info() {}, warn() {}, error() {} } });
  try {
    const out1 = path.join(runRoot, 'code_terminal.mp4');
    const res1 = await renderer.renderSceneToMp4({
      id: 'check_ct',
      type: 'code_terminal',
      duration: 1.4,
      theme: 'dark',
      props: {
        filename: 'supabase/policy.sql',
        title: 'POLÍTICA RLS EN POSTGRES',
        codeLines: [
          'ALTER TABLE users ENABLE ROW LEVEL SECURITY;',
          { text: 'CREATE POLICY own_rows ON users', highlight: true },
          '  FOR SELECT USING (auth.uid() = id);'
        ],
        cursorLine: 2
      }
    }, out1, { fps: 30, cacheManager, noCache: true, captureDir: path.join(runRoot, 'frames'), captureTimes: [{ time: 0.7, label: 'mid' }] });
    assert.ok(fs.existsSync(res1.file));
    assert.equal(probeMedia(res1.file).videoCodec, 'h264');

    const out2 = path.join(runRoot, 'terminal_split.mp4');
    const res2 = await renderer.renderSceneToMp4({
      id: 'check_ts',
      type: 'terminal_split',
      duration: 1.4,
      theme: 'dark',
      props: {
        title: 'REPLICA VS PRODUCCIÓN',
        subtitle: 'INCIDENTE GITLAB 2017',
        leftTitle: 'TERMINAL PRODUCCIÓN',
        rightTitle: 'RESTORE VERIFICADO',
        leftCode: 'rm -rf /var/opt/gitlab/postgresql/data',
        rightCode: 'pg_restore --clean --dbname=gitlabhq'
      }
    }, out2, { fps: 30, cacheManager, noCache: true, captureDir: path.join(runRoot, 'frames'), captureTimes: [{ time: 0.7, label: 'mid' }] });
    assert.ok(fs.existsSync(res2.file));
    assert.equal(probeMedia(res2.file).videoCodec, 'h264');
  } finally {
    await renderer.close();
  }
});
