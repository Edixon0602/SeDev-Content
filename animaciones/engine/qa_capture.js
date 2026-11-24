#!/usr/bin/env node
// QA capture harness for the SeDev motion engine.
// - loads a real manifest scene in scene_runner.html
// - captures deterministic times (opening, beats, settle, close)
// - fails on page errors / console errors / failed requests
// - checks real drawn canvas bounds (instrumented) and DOM bounds, not just
//   documentElement scroll sizes (overflow:hidden hides those)
// - verifies the detector itself with a synthetic out-of-canvas probe
// - verifies font availability before the first render
// - verifies frame determinism on repeated renders and a page reload
//
// Usage:
//   node animaciones/engine/qa_capture.js animaciones/manifests/demo_motion_hook.json
//   node animaciones/engine/qa_capture.js <manifest> --scene 0 --times 0.1,0.5,2.2
//   npm run qa:demo

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const DEFAULTS = {
  chrome: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  outDir: 'animaciones/debug_frames/qa_motion',
  report: 'animaciones/debug_frames/qa_motion_report.json'
};

const CANVAS_SAFE_MARGIN = 6;
const IGNORED_COMPONENTS = new Set(['stage_scene', 'stage_3d_scene']);

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = { manifest: args[0] || 'animaciones/manifests/demo_motion_hook.json' };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--scene') opts.scene = parseInt(args[i + 1], 10);
    if (args[i] === '--times') opts.times = args[i + 1].split(',').map(Number).filter(Number.isFinite);
    if (args[i] === '--out') opts.outDir = args[i + 1];
    if (args[i] === '--report') opts.report = args[i + 1];
    if (args[i] === '--no-reload') opts.noReload = true;
  }
  return opts;
}

function defaultTimes(duration) {
  const fractions = [0.02, 0.1, 0.26, 0.5, 0.78, 0.96];
  return Array.from(new Set(fractions.map((f) => Math.min(duration - 0.01, Math.max(0, +(duration * f).toFixed(2))))));
}

// Analyzes instrumented canvas bounds against the real component canvas and
// a small safe margin. Returns per-item diagnostics.
function analyzeBounds(items, scene) {
  const issues = [];
  if (!Array.isArray(items)) return issues;
  for (const item of items) {
    if (!item || IGNORED_COMPONENTS.has(item.component)) continue;
    const cw = Number(item.canvasW) || 960;
    const ch = Number(item.canvasH) || 1360;
    const left = Number(item.x);
    const top = Number(item.y);
    const right = left + Number(item.w);
    const bottom = top + Number(item.h);
    if (![left, top, right, bottom].every(Number.isFinite)) {
      issues.push({ scene: scene.id, reason: 'non-finite-bounds', item });
      continue;
    }
    if (left < -CANVAS_SAFE_MARGIN || top < -CANVAS_SAFE_MARGIN ||
        right > cw + CANVAS_SAFE_MARGIN || bottom > ch + CANVAS_SAFE_MARGIN) {
      issues.push({
        scene: scene.id,
        reason: 'canvas-overflow',
        component: item.component,
        kind: item.kind,
        text: item.text || null,
        bounds: { x: item.x, y: item.y, w: item.w, h: item.h },
        canvas: { w: cw, h: ch }
      });
    }
  }
  return issues;
}

async function main() {
  const opts = parseArgs(process.argv);
  const manifestPath = path.resolve(opts.manifest);
  if (!fs.existsSync(manifestPath)) throw new Error(`Manifest not found: ${manifestPath}`);
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const scenes = manifest.scenes || [];
  const targets = opts.scene !== undefined ? [scenes[opts.scene]] : scenes;
  if (targets.some((s) => !s)) throw new Error('Invalid --scene index');

  const outDir = path.resolve(opts.outDir || DEFAULTS.outDir);
  const reportPath = path.resolve(opts.report || DEFAULTS.report);
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: DEFAULTS.chrome,
    headless: 'new',
    args: ['--hide-scrollbars', '--allow-file-access-from-files', '--font-render-hinting=none']
  });

  const report = {
    manifest: path.basename(manifestPath),
    generatedAt: new Date().toISOString(),
    fonts: null,
    scenes: [],
    errors: [],
    determinism: null,
    overflow: [],
    domOverflow: [],
    detectorSelfTest: null,
    ok: false
  };

  const page = await browser.newPage();
  page.on('pageerror', (err) => report.errors.push(`pageerror: ${err.toString()}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') report.errors.push(`console: ${msg.text()}`);
  });
  page.on('requestfailed', (req) => {
    if (!/^data:/i.test(req.url())) {
      report.errors.push(`requestfailed: ${req.url()} (${req.failure() && req.failure().errorText})`);
    }
  });
  await page.evaluateOnNewDocument(() => {
    window.__PUPPETEER_CAPTURE__ = true;
    window.__QA_INSTRUMENT__ = true;
  });
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const runnerUrl = 'file:///' + path.resolve('animaciones/templates/scene_runner.html').replace(/\\/g, '/');
  await page.goto(runnerUrl, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);

  // Explicit font proof before the first scene render.
  report.fonts = await page.evaluate(async () => {
    if (!window.MotionCore || typeof window.MotionCore.ensureFonts !== 'function') {
      return { ok: false, missing: ['MotionCore.ensureFonts'], reason: 'missing-core' };
    }
    return await window.MotionCore.ensureFonts();
  });
  if (!report.fonts.ok) {
    report.errors.push(`fonts: ${JSON.stringify(report.fonts)}`);
  }

  const collectDiagnostics = async () => page.evaluate(() => {
    const stage = document.getElementById('stage');
    const stageContent = document.getElementById('stageContent');
    const sr = stage ? stage.getBoundingClientRect() : null;
    const selector = 'canvas, .sedev-icon-anim, #archHeader, .scene-category';
    const els = stageContent ? Array.from(stageContent.querySelectorAll(selector)) : [];
    const domItems = [];
    for (const el of els) {
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) < 0.01) continue;
      const r = el.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) continue;
      domItems.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || '',
        className: String(el.className || ''),
        x: r.left,
        y: r.top,
        w: r.width,
        h: r.height
      });
    }
    return {
      docW: document.documentElement.scrollWidth,
      docH: document.documentElement.scrollHeight,
      stageW: stage ? stage.clientWidth : 0,
      stageH: stage ? stage.clientHeight : 0,
      stageRect: sr ? { x: sr.left, y: sr.top, w: sr.width, h: sr.height } : null,
      canvasBounds: (window.__QA_LAST_BOUNDS__ || []).slice(),
      domItems
    };
  });

  const capture = async (scene, times, suffix) => {
    const files = [];
    const samples = [];
    const overflow = [];
    const domOverflow = [];
    for (const time of times) {
      await page.evaluate((t) => window.renderFrame(t), time);
      const diagnostics = await collectDiagnostics();
      const boundsIssues = analyzeBounds(diagnostics.canvasBounds, scene).map((issue) => Object.assign(issue, { time }));
      overflow.push(...boundsIssues);

      if (diagnostics.docW > 1080 || diagnostics.docH > 1920 ||
          diagnostics.stageW !== 1080 || diagnostics.stageH !== 1920) {
        overflow.push({
          scene: scene.id,
          time,
          reason: 'document-overflow',
          doc: { w: diagnostics.docW, h: diagnostics.docH },
          stage: { w: diagnostics.stageW, h: diagnostics.stageH }
        });
      }

      const sr = diagnostics.stageRect;
      const localDom = [];
      for (const d of diagnostics.domItems) {
        if (!sr) continue;
        if (d.x < sr.x - 2 || d.y < sr.y - 2 ||
            d.x + d.w > sr.x + sr.w + 2 || d.y + d.h > sr.y + sr.h + 2) {
          localDom.push({ scene: scene.id, time, reason: 'dom-outside-stage', element: d, stage: sr });
        }
      }
      domOverflow.push(...localDom);

      const name = `${manifest.slug || 'manifest'}_${scene.id}_t${time.toFixed(2).replace('.', 'p')}${suffix || ''}.png`;
      const file = path.join(outDir, name);
      await page.screenshot({ path: file, type: 'png' });
      files.push(path.relative(process.cwd(), file).replace(/\\/g, '/'));

      samples.push({
        time,
        canvasItems: diagnostics.canvasBounds.length,
        domItems: diagnostics.domItems.length,
        overflow: boundsIssues,
        domOverflow: localDom
      });
    }
    return { files, samples, overflow, domOverflow };
  };

  // First render on a brand-new page, before any other scene has run.
  const dScene = targets[0];
  const dTime = Math.min(1.2, (dScene.duration || 5) - 0.4);
  await page.evaluate(async (sc) => { await window.loadScene(sc); }, dScene);
  await page.evaluate(() => window.renderFrame(0.02));
  const firstRenderA = await page.screenshot({ type: 'png' });
  fs.writeFileSync(path.join(outDir, '_first_render_a.png'), firstRenderA);

  for (let i = 0; i < targets.length; i++) {
    const scene = targets[i];
    const duration = scene.duration || 5.0;
    const times = opts.times && opts.times.length ? opts.times : defaultTimes(duration);
    await page.evaluate(async (sc) => { await window.loadScene(sc); }, scene);
    const sceneFonts = await page.evaluate(async () => window.MotionCore.ensureFonts());
    if (!sceneFonts.ok) report.errors.push(`fonts[${scene.id}]: ${JSON.stringify(sceneFonts)}`);

    const cap = await capture(scene, times);
    report.overflow.push(...cap.overflow);
    report.domOverflow.push(...cap.domOverflow);

    report.scenes.push({
      id: scene.id,
      type: scene.type,
      duration,
      times,
      captures: cap.files,
      fonts: sceneFonts,
      samples: cap.samples
    });
    const totalBounds = cap.samples.reduce((acc, s) => acc + s.canvasItems, 0);
    const totalDom = cap.samples.reduce((acc, s) => acc + s.domItems, 0);
    console.log(`✔ ${scene.id} (${scene.type}) → ${times.map((t) => t.toFixed(2)).join('s, ')}s · ${totalBounds} bounds · ${totalDom} DOM · ${cap.overflow.length + cap.domOverflow.length} issues`);
  }

  // Detector self-test: overflow injected only at an intermediate beat must be
  // flagged at exactly that time and not at the clean times.
  await page.evaluate(async (sc) => { await window.loadScene(sc); }, dScene);
  const probeTimes = [0.1, Math.min(1.2, (dScene.duration || 5) - 0.4), Math.max(0.2, (dScene.duration || 5) - 0.3)];
  const probeFlags = [];
  for (let pi = 0; pi < probeTimes.length; pi++) {
    const time = probeTimes[pi];
    const probe = pi === 1;
    const items = await page.evaluate(({ time, probe }) => {
      window.renderFrame(time);
      if (probe && window.__QA_SET_COMPONENT__) {
        window.__QA_SET_COMPONENT__('__probe__');
        const canvas = document.createElement('canvas');
        canvas.width = 960;
        canvas.height = 1360;
        const ctx = canvas.getContext('2d');
        ctx.font = '700 40px "JetBrains Mono", monospace';
        ctx.fillText('PROBE-OVERFLOW', 930, 1340);
        window.__QA_LAST_BOUNDS__ = (window.__QA_BOUNDS__ || []).slice();
      }
      return (window.__QA_LAST_BOUNDS__ || []).slice();
    }, { time, probe });
    const issues = analyzeBounds(items, dScene).map((issue) => Object.assign(issue, { time }));
    if (issues.length) probeFlags.push({ time, probe, issues });
  }
  const flaggedTimes = probeFlags.filter((p) => p.issues && p.issues.length && p.probe).map((p) => p.time);
  const cleanTimes = probeTimes.filter((t) => !flaggedTimes.includes(t));
  const unexpectedCleanIssues = probeFlags.filter((p) => !p.probe && p.issues.length);
  report.detectorSelfTest = {
    detected: flaggedTimes.length === 1 && unexpectedCleanIssues.length === 0,
    probeTimes,
    flaggedTimes,
    cleanTimes,
    unexpectedCleanIssues,
    results: probeFlags
  };

  // Determinism: same t twice, then once again after a full reload.
  await page.evaluate(async (sc) => { await window.loadScene(sc); }, dScene);
  await page.evaluate((t) => window.renderFrame(t), dTime);
  const shotA = await page.screenshot({ type: 'png' });
  await page.evaluate((t) => window.renderFrame(t), dTime);
  const shotB = await page.screenshot({ type: 'png' });
  let reloadEqual = true;
  let firstRenderEqual = true;
  let shotC = null;
  let shotFirstB = null;
  if (!opts.noReload) {
    await page.reload({ waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async (sc) => { await window.loadScene(sc); }, dScene);
    await page.evaluate(() => window.renderFrame(0.02));
    shotFirstB = await page.screenshot({ type: 'png' });
    firstRenderEqual = firstRenderA.equals(shotFirstB);
    await page.evaluate((t) => window.renderFrame(t), dTime);
    shotC = await page.screenshot({ type: 'png' });
    reloadEqual = shotA.equals(shotC);
  }
  fs.writeFileSync(path.join(outDir, '_determinism_a.png'), shotA);
  if (shotC) fs.writeFileSync(path.join(outDir, '_determinism_reload.png'), shotC);
  if (shotFirstB) fs.writeFileSync(path.join(outDir, '_first_render_reload.png'), shotFirstB);
  report.determinism = {
    scene: dScene.id,
    time: dTime,
    repeatedRenderEqual: shotA.equals(shotB),
    reloadEqual,
    firstRenderEqual
  };

  await browser.close();

  const fontsOk = Boolean(report.fonts && report.fonts.ok);
  const detectorOk = Boolean(report.detectorSelfTest && report.detectorSelfTest.detected);
  report.ok = report.errors.length === 0 && report.overflow.length === 0 &&
    report.domOverflow.length === 0 && fontsOk && detectorOk &&
    report.determinism.repeatedRenderEqual && report.determinism.reloadEqual &&
    report.determinism.firstRenderEqual;
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  console.log(`\nCaptures: ${outDir}`);
  console.log(`Report:   ${reportPath}`);
  console.log(`Fonts:    ${fontsOk ? 'OK' : 'FAIL'} ${JSON.stringify(report.fonts && report.fonts.missing)}`);
  console.log(`Detector: ${detectorOk ? 'OK (synthetic overflow flagged)' : 'FAIL'}`);
  console.log(`Determinism: repeat=${report.determinism.repeatedRenderEqual} reload=${report.determinism.reloadEqual} first=${report.determinism.firstRenderEqual}`);
  if (report.overflow.length) console.error('Canvas overflow:', report.overflow.slice(0, 12));
  if (report.domOverflow.length) console.error('DOM overflow:', report.domOverflow.slice(0, 12));
  if (report.errors.length) console.error('Errors:', report.errors.slice(0, 12));
  if (!report.ok) process.exit(1);
  console.log('✔ QA captures OK (fonts, canvas bounds, DOM bounds, detector, determinism).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
