#!/usr/bin/env node
// QA + render for the transparent word-by-word overlay.
// Produces a real qtrle/argb MOV inside animaciones/output_clips, captures
// start/impact/read/close stills and verifies alpha, frame count, fonts,
// page errors and that the last frame does not retain a ghost loop.

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const TEMPLATE = args[0] || 'overlay_word_by_word';
const DURATION = Number(args[1] || 3.2);
const FPS = Number(args[2] || 30);
const ROOT = process.cwd();
const TEMPLATE_FILE = path.resolve(`animaciones/templates/${TEMPLATE}.html`);
const OUT_DIR = path.resolve('animaciones/output_clips');
const DEBUG_DIR = path.resolve('animaciones/debug_frames/overlay_v2');
const TEMP_DIR = path.join(OUT_DIR, `_temp_${TEMPLATE}_qa`);
const MOV_PATH = path.join(OUT_DIR, `${TEMPLATE}.mov`);
const REPORT_PATH = path.resolve('animaciones/debug_frames/overlay_v2_report.json');

function run(cmd, cmdArgs, opts = {}) {
  const res = spawnSync(cmd, cmdArgs, { encoding: null, maxBuffer: 64 * 1024 * 1024, ...opts });
  if (res.error) throw res.error;
  return res;
}

function avgAlphaAt(file, timeSec) {
  const res = run('ffmpeg', [
    '-hide_banner', '-loglevel', 'error',
    '-ss', String(timeSec), '-i', file,
    '-frames:v', '1',
    '-vf', 'alphaextract,format=gray',
    '-f', 'rawvideo', '-'
  ]);
  if (res.status !== 0 || !res.stdout || !res.stdout.length) return null;
  let sum = 0;
  for (let i = 0; i < res.stdout.length; i++) sum += res.stdout[i];
  return sum / res.stdout.length;
}

function probe(file) {
  const res = run('ffprobe', [
    '-v', 'error',
    '-show_entries', 'stream=codec_name,pix_fmt,width,height,nb_frames,r_frame_rate:format=duration',
    '-of', 'json', file
  ]);
  if (res.status !== 0) throw new Error(`ffprobe falló: ${res.stderr.toString()}`);
  return JSON.parse(res.stdout.toString());
}

async function main() {
  if (!fs.existsSync(TEMPLATE_FILE)) throw new Error(`Template not found: ${TEMPLATE_FILE}`);
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(DEBUG_DIR, { recursive: true });
  if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  const errors = [];
  const report = {
    template: TEMPLATE,
    duration: DURATION,
    fps: FPS,
    frames: 0,
    mov: path.relative(ROOT, MOV_PATH).replace(/\\/g, '/'),
    captures: [],
    fonts: null,
    alpha: {},
    probe: null,
    errors,
    ok: false
  };

  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--hide-scrollbars', '--allow-file-access-from-files', '--font-render-hinting=none']
  });

  const page = await browser.newPage();
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.toString()}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
  });
  page.on('requestfailed', (req) => {
    if (!/^data:/i.test(req.url())) {
      errors.push(`requestfailed: ${req.url()} (${req.failure() && req.failure().errorText})`);
    }
  });
  await page.evaluateOnNewDocument(() => { window.__PUPPETEER_CAPTURE__ = true; });
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const fileUrl = 'file:///' + TEMPLATE_FILE.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  report.fonts = await page.evaluate(async () => {
    if (!window.MotionCore || typeof window.MotionCore.ensureFonts !== 'function') {
      return { ok: false, missing: ['MotionCore.ensureFonts'], reason: 'missing-core' };
    }
    return await window.MotionCore.ensureFonts();
  });
  if (!report.fonts.ok) errors.push(`fonts: ${JSON.stringify(report.fonts)}`);

  const totalFrames = Math.round(DURATION * FPS);
  const captureTimes = { start: 0.08, impact: 1.12, wipe: 0.82, read: 1.55, close: DURATION - 0.12 };
  // Map each label to its nearest real frame and drop duplicates caused by
  // tolerance rounding (one file per frame, one label per frame).
  const captureByFrame = new Map();
  for (const [label, time] of Object.entries(captureTimes)) {
    const frameIdx = Math.min(totalFrames - 1, Math.max(0, Math.round(time * FPS)));
    if (!captureByFrame.has(frameIdx)) captureByFrame.set(frameIdx, label);
  }
  report.captureTimes = captureTimes;
  report.captureFrames = Object.fromEntries(Array.from(captureByFrame.entries()).map(([f, l]) => [l, f]));

  for (let frame = 0; frame < totalFrames; frame++) {
    const t = frame / FPS;
    await page.evaluate((time) => window.renderFrame(time), t);
    const frameFile = path.join(TEMP_DIR, `frame_${String(frame).padStart(4, '0')}.png`);
    await page.screenshot({ path: frameFile, type: 'png', omitBackground: true });

    if (captureByFrame.has(frame)) {
      const label = captureByFrame.get(frame);
      const qaFile = path.join(DEBUG_DIR, `${TEMPLATE}_${label}.png`);
      fs.copyFileSync(frameFile, qaFile);
      report.captures.push(path.relative(ROOT, qaFile).replace(/\\/g, '/'));
    }
  }

  // Last frame must be fully transparent.
  await page.evaluate((time) => window.renderFrame(time), DURATION);
  const lastFile = path.join(DEBUG_DIR, `${TEMPLATE}_last.png`);
  await page.screenshot({ path: lastFile, type: 'png', omitBackground: true });
  report.captures.push(path.relative(ROOT, lastFile).replace(/\\/g, '/'));

  await browser.close();

  const pattern = path.join(TEMP_DIR, 'frame_%04d.png').replace(/\\/g, '/');
  if (fs.existsSync(MOV_PATH)) fs.unlinkSync(MOV_PATH);
  const enc = run('ffmpeg', [
    '-y', '-hide_banner', '-loglevel', 'error',
    '-framerate', String(FPS), '-i', pattern,
    '-c:v', 'qtrle', '-pix_fmt', 'argb', MOV_PATH
  ]);
  if (enc.status !== 0) throw new Error(`ffmpeg qtrle falló: ${enc.stderr.toString()}`);
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });

  report.frames = totalFrames;
  report.probe = probe(MOV_PATH);
  report.alpha.read = avgAlphaAt(MOV_PATH, captureTimes.read);
  report.alpha.impact = avgAlphaAt(MOV_PATH, captureTimes.impact);
  const lastFrameTime = Math.max(0, (totalFrames - 1) / FPS);
  report.alpha.last = avgAlphaAt(MOV_PATH, lastFrameTime);
  report.alpha.close = avgAlphaAt(MOV_PATH, captureTimes.close);
  report.lastPngAlpha = avgAlphaAt(lastFile, 0);

  const stream = report.probe.streams && report.probe.streams[0] || {};
  const duration = Number(report.probe.format && report.probe.format.duration);
  const fpsText = String(stream.r_frame_rate || '');
  const fpsMatch = /^(\d+)\/(\d+)$/.exec(fpsText);
  const actualFps = fpsMatch ? Number(fpsMatch[1]) / Number(fpsMatch[2]) : NaN;
  const framesOk = Number(stream.nb_frames) === totalFrames && Math.abs(duration - DURATION) < 0.12;
  const codecOk = stream.codec_name === 'qtrle' && stream.pix_fmt === 'argb';
  const dimsOk = Number(stream.width) === 1080 && Number(stream.height) === 1920;
  const fpsOk = Math.abs(actualFps - FPS) < 0.01;
  const alphaOk = report.alpha.read !== null && report.alpha.read > 4 &&
    report.alpha.impact !== null && report.alpha.impact > 4 &&
    report.alpha.last !== null && report.alpha.last < 1;
  const lastPngOk = report.lastPngAlpha !== null && report.lastPngAlpha < 1;

  report.width = Number(stream.width);
  report.height = Number(stream.height);
  report.fps = Number.isFinite(actualFps) ? actualFps : null;
  report.ok = errors.length === 0 && report.fonts.ok && framesOk && codecOk &&
    dimsOk && fpsOk && alphaOk && lastPngOk;
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');

  console.log(`MOV:      ${MOV_PATH}`);
  console.log(`Codec:    ${stream.codec_name}/${stream.pix_fmt} ${stream.width}x${stream.height} @ ${stream.r_frame_rate}`);
  console.log(`Checks:   frames=${framesOk} codec=${codecOk} dims=${dimsOk} fps=${fpsOk}`);
  console.log(`Frames:   ${stream.nb_frames}/${totalFrames} · duration ${duration}s`);
  console.log(`Fonts:    ${report.fonts.ok ? 'OK' : 'FAIL'}`);
  console.log(`Alpha:    impact=${report.alpha.impact} read=${report.alpha.read} close=${report.alpha.close} last=${report.alpha.last} lastPng=${report.lastPngAlpha}`);
  console.log(`Captures: ${DEBUG_DIR}`);
  if (errors.length) console.error('Errors:', errors);
  if (!report.ok) process.exit(1);
  console.log('✔ Overlay QA OK (qtrle/argb, real alpha, no ghost last frame).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
