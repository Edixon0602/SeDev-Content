#!/usr/bin/env node
// Motion QA for editorial_explainer: verifies that each scene really evolves
// between early, settle and close instead of freezing after its entrance.
// Uses real browser screenshots and FFmpeg SSIM, not canvas mocks.

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const puppeteer = require('puppeteer-core');

const { ensureDir, atomicWriteJson, relPosix, PROJECT_ROOT } = require('./utils');
const { resolveChrome, SCENE_TEMPLATE } = require('./scene_renderer');
const { makeContactSheet } = require('./qa');

function ssim(a, b) {
  const result = spawnSync('ffmpeg', [
    '-hide_banner', '-loglevel', 'info',
    '-i', a, '-i', b,
    '-lavfi', 'ssim', '-f', 'null', '-'
  ], { encoding: 'utf8', windowsHide: true, maxBuffer: 16 * 1024 * 1024 });
  const text = `${result.stderr || ''}${result.stdout || ''}`;
  const match = /All:([0-9.]+)/.exec(text);
  if (result.status !== 0 || !match) throw new Error(`ssim falló entre ${path.basename(a)} y ${path.basename(b)}: ${text.slice(-300)}`);
  return Number(match[1]);
}

async function runEditorialMotionQA(options = {}) {
  const manifestPath = path.resolve(options.manifest || path.join(PROJECT_ROOT, 'animaciones/manifests/editorial_explainer_demo.json'));
  const outDir = path.resolve(options.outDir || path.join(PROJECT_ROOT, 'animaciones/debug_frames/editorial_motion'));
  const reportPath = path.resolve(options.reportPath || path.join(outDir, 'qa_motion_report.json'));
  const threshold = Number(options.threshold || 0.0015);
  ensureDir(outDir);
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const errors = [];
  const report = {
    version: 1,
    ok: false,
    manifest: relPosix(PROJECT_ROOT, manifestPath),
    threshold,
    scenes: [],
    errors
  };
  let browser = null;
  try {
    browser = await puppeteer.launch({
      executablePath: resolveChrome(options.chromePath),
      headless: 'new',
      args: ['--hide-scrollbars', '--allow-file-access-from-files', '--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--font-render-hinting=none']
    });
    const page = await browser.newPage();
    page.on('pageerror', (err) => errors.push(`pageerror: ${err.toString()}`));
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`console: ${msg.text()}`); });
    page.on('requestfailed', (req) => {
      if (!/^data:/i.test(req.url())) errors.push(`requestfailed: ${req.url()} (${req.failure() && req.failure().errorText})`);
    });
    await page.evaluateOnNewDocument(() => { window.__PUPPETEER_CAPTURE__ = true; });
    await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
    await page.goto('file:///' + SCENE_TEMPLATE.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
    const fonts = await page.evaluate(async () => window.MotionCore.ensureFonts());
    if (!fonts.ok) throw new Error(`Fuentes no disponibles: ${JSON.stringify(fonts)}`);

    for (let i = 0; i < manifest.scenes.length; i++) {
      const scene = manifest.scenes[i];
      await page.evaluate(async (sc, meta) => {
        window.__SCENE_META__ = meta;
        await window.loadScene(sc);
      }, scene, { slug: manifest.slug, title: manifest.title, category: 'EDITORIAL', theme: 'dark' });
      const sceneFonts = await page.evaluate(async () => window.MotionCore.ensureFonts());
      if (!sceneFonts.ok) throw new Error(`Fuentes no listas en ${scene.id}: ${JSON.stringify(sceneFonts)}`);
      const times = {
        early: Math.max(0.05, scene.duration * 0.12),
        settle: scene.duration * 0.52,
        close: scene.duration * 0.88
      };
      const captures = {};
      for (const [label, time] of Object.entries(times)) {
        await page.evaluate((t) => window.renderFrame(t), time);
        const file = path.join(outDir, `${scene.id}_${label}.png`);
        await page.screenshot({ path: file, type: 'png' });
        captures[label] = file;
      }
      const earlySettle = ssim(captures.early, captures.settle);
      const settleClose = ssim(captures.settle, captures.close);
      report.scenes.push({
        id: scene.id,
        earlySettle: Number(earlySettle.toFixed(5)),
        settleClose: Number(settleClose.toFixed(5)),
        diffEarlySettle: Number((1 - earlySettle).toFixed(5)),
        diffSettleClose: Number((1 - settleClose).toFixed(5)),
        captures: Object.fromEntries(Object.entries(captures).map(([k, v]) => [k, relPosix(PROJECT_ROOT, v)])),
        ok: (1 - earlySettle) >= threshold && (1 - settleClose) >= threshold
      });
    }
    const allCaptures = report.scenes.flatMap((scene) => Object.values(scene.captures));
    if (allCaptures.length) {
      try {
        const sheet = makeContactSheet(allCaptures, path.join(outDir, 'contact_sheet.jpg'), 5);
        report.contactSheet = sheet ? relPosix(PROJECT_ROOT, sheet) : null;
      } catch (err) {
        errors.push(`contact sheet: ${err.message}`);
      }
    }
    report.ok = errors.length === 0 && report.scenes.every((scene) => scene.ok);
  } catch (err) {
    errors.push(err.message);
    report.ok = false;
  } finally {
    if (browser) {
      try { await browser.close(); } catch (err) { /* already closed */ }
    }
  }
  atomicWriteJson(reportPath, report);
  return report;
}

if (require.main === module) {
  runEditorialMotionQA(process.argv[2] ? { manifest: process.argv[2] } : undefined)
    .then((report) => {
      console.log(`Editorial motion QA: ${report.ok ? 'OK' : 'FALLÓ'} · ${report.scenes.length} escenas`);
      for (const scene of report.scenes) {
        console.log(`  ${scene.id}: early/settle=${scene.diffEarlySettle} settle/close=${scene.diffSettleClose} ${scene.ok ? 'OK' : 'FAIL'}`);
      }
      if (!report.ok) process.exit(1);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { runEditorialMotionQA, ssim };
