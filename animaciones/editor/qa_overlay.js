// Dedicated browser QA for overlay_editorial: real bounds/clipping, alpha at
// read/close, fonts and console/network errors. It does not touch the scene
// runner; it exercises the same standalone template used by the editor.

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const { ensureDir, atomicWriteJson, relPosix, PROJECT_ROOT } = require('./utils');
const { alphaAverage } = require('./ffmpeg');
const { resolveChrome, OVERLAY_TEMPLATE } = require('./scene_renderer');

const DEFAULT_SAMPLES = [
  { text: 'UNA SOLA LÍNEA', position: 'top', duration: 1.8 },
  { text: 'LA DIFERENCIA ESTÁ DENTRO', position: 'middle', duration: 2.0 },
  { text: 'ACCIÓN · CAUSA · EFECTO', position: 'bottom', duration: 1.8 }
];

async function runOverlayQA(options = {}) {
  const outDir = path.resolve(options.outDir || path.join(PROJECT_ROOT, 'animaciones/debug_frames/editorial_overlay'));
  const reportPath = path.resolve(options.reportPath || path.join(outDir, 'qa_overlay_report.json'));
  const samples = options.samples || DEFAULT_SAMPLES;
  ensureDir(outDir);
  const errors = [];
  const report = {
    version: 1,
    ok: false,
    template: path.basename(OVERLAY_TEMPLATE),
    fonts: null,
    samples: [],
    errors
  };
  let browser = null;
  try {
    browser = await puppeteer.launch({
      executablePath: resolveChrome(options.chromePath),
      headless: 'new',
      args: ['--hide-scrollbars', '--allow-file-access-from-files', '--font-render-hinting=none']
    });
    const page = await browser.newPage();
    page.on('pageerror', (err) => errors.push(`pageerror: ${err.toString()}`));
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`console: ${msg.text()}`); });
    page.on('requestfailed', (req) => {
      if (!/^data:/i.test(req.url())) errors.push(`requestfailed: ${req.url()} (${req.failure() && req.failure().errorText})`);
    });
    await page.evaluateOnNewDocument(() => {
      window.__PUPPETEER_CAPTURE__ = true;
      window.__QA_INSTRUMENT__ = true;
    });
    await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
    await page.goto('file:///' + OVERLAY_TEMPLATE.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
    report.fonts = await page.evaluate(async () => window.MotionCore.ensureFonts());
    if (!report.fonts.ok) errors.push(`fonts: ${JSON.stringify(report.fonts)}`);

    for (let index = 0; index < samples.length; index++) {
      const sample = samples[index];
      const scene = {
        duration: Number(sample.duration),
        props: {
          ...sample,
          text: sample.text,
          position: sample.position,
          accent: sample.accent || '#d08a5a'
        }
      };
      await page.evaluate(async (sc) => window.setupOverlay(sc), scene);
      const times = [0.08, scene.duration / 2, Math.max(0.1, scene.duration - 0.05), scene.duration];
      const captures = [];
      let boundsBox = null;
      let nonEmptyBounds = false;
      for (let t = 0; t < times.length; t++) {
        const time = times[t];
        await page.evaluate((time) => {
          if (window.__QA_RESET__) window.__QA_RESET__();
          if (window.__QA_SET_COMPONENT__) window.__QA_SET_COMPONENT__('overlay_editorial');
          window.renderFrame(time);
        }, time);
        const bounds = await page.evaluate(() => (window.__QA_BOUNDS__ || []).slice());
        if (t === 1) {
          nonEmptyBounds = bounds.length > 0;
          for (const b of bounds) {
            const x = Number(b.x) || 0;
            const y = Number(b.y) || 0;
            const w = Number(b.w) || 0;
            const h = Number(b.h) || 0;
            boundsBox = boundsBox || { minX: x, minY: y, maxX: x + w, maxY: y + h };
            boundsBox.minX = Math.min(boundsBox.minX, x);
            boundsBox.minY = Math.min(boundsBox.minY, y);
            boundsBox.maxX = Math.max(boundsBox.maxX, x + w);
            boundsBox.maxY = Math.max(boundsBox.maxY, y + h);
          }
        }
        const file = path.join(outDir, `${String(index + 1).padStart(2, '0')}_${t}_${time.toFixed(2).replace('.', 'p')}.png`);
        await page.screenshot({ path: file, type: 'png', omitBackground: true });
        captures.push({
          time,
          file: relPosix(PROJECT_ROOT, file),
          alpha: alphaAverage(file, 0)
        });
      }
      const mid = captures[1];
      const last = captures[captures.length - 1];
      const boundsOk = nonEmptyBounds && boundsBox &&
        boundsBox.minX >= -6 && boundsBox.minY >= -6 &&
        boundsBox.maxX <= 1080 + 6 && boundsBox.maxY <= 1920 + 6;
      const alphaOk = mid.alpha !== null && mid.alpha > 1 && last.alpha !== null && last.alpha < 1;
      report.samples.push({
        text: sample.text,
        position: sample.position,
        duration: scene.duration,
        bounds: { count: nonEmptyBounds ? 'non-empty' : 'empty', box: boundsBox, ok: !!boundsOk },
        alpha: { mid: mid.alpha, last: last.alpha, ok: alphaOk },
        captures,
        ok: boundsOk && alphaOk
      });
    }
    report.ok = errors.length === 0 && report.fonts.ok && report.samples.every((sample) => sample.ok);
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
  runOverlayQA(process.argv[2] ? { outDir: process.argv[2] } : undefined)
    .then((report) => {
      console.log(`Overlay QA: ${report.ok ? 'OK' : 'FALLÓ'} · ${report.samples.length} samples`);
      if (!report.ok) process.exit(1);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { runOverlayQA, DEFAULT_SAMPLES };
