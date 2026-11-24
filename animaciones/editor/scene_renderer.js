// Browser renderer for editor assets. Reuses the existing deterministic
// scene_runner and overlay engine, the shared CacheManager and FFmpeg.
//
// One Chromium instance is shared by all assets of a run. Each cached clip is
// re-probed before being accepted; a corrupt cache entry is rendered again.

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const { ensureDir, PROJECT_ROOT, editorCodeFingerprint } = require('./utils');
const { encodePngSequence, probeMedia } = require('./ffmpeg');

const SCENE_TEMPLATE = path.join(PROJECT_ROOT, 'animaciones/templates/scene_runner.html');
const OVERLAY_TEMPLATE = path.join(PROJECT_ROOT, 'animaciones/templates/overlay_editorial.html');

function resolveChrome(explicit) {
  if (explicit) return explicit;
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = process.platform === 'win32'
    ? [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe')
    ]
    : process.platform === 'darwin'
      ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
      : ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
  const found = candidates.find((candidate) => candidate && fs.existsSync(candidate));
  if (!found) {
    throw new Error('No se encontró Chrome. Define CHROME_PATH apuntando al ejecutable de Chrome/Chromium.');
  }
  return found;
}

class SceneRenderer {
  constructor(options = {}) {
    this.chromePath = resolveChrome(options.chromePath);
    this.tempRoot = options.tempRoot || path.resolve('animaciones/editor_runs/_temp');
    this.logger = options.logger || console;
    this.browser = null;
    this.scenePage = null;
    this.overlayPage = null;
    this.errors = [];
  }

  attachDiagnostics(page, label) {
    page.on('console', (msg) => {
      if (msg.type() === 'error') this.errors.push(`${label} console: ${msg.text()}`);
    });
    page.on('pageerror', (err) => this.errors.push(`${label} pageerror: ${err.toString()}`));
    page.on('requestfailed', (req) => {
      if (!/^data:/i.test(req.url())) {
        this.errors.push(`${label} requestfailed: ${req.url()} (${req.failure() && req.failure().errorText})`);
      }
    });
  }

  assertClean(label) {
    if (this.errors.length) {
      const detail = this.errors.splice(0).join(' | ');
      throw new Error(`${label}: ${detail}`);
    }
  }

  async start() {
    if (this.browser) return;
    ensureDir(this.tempRoot);
    this.logger.info(`Chromium: ${this.chromePath}`);
    this.browser = await puppeteer.launch({
      executablePath: this.chromePath,
      headless: 'new',
      args: [
        '--hide-scrollbars',
        '--allow-file-access-from-files',
        '--enable-webgl',
        '--use-gl=angle',
        '--use-angle=swiftshader',
        '--enable-unsafe-swiftshader',
        '--font-render-hinting=none'
      ]
    });
    this.scenePage = await this.browser.newPage();
    this.attachDiagnostics(this.scenePage, 'scene');
    await this.scenePage.evaluateOnNewDocument(() => { window.__PUPPETEER_CAPTURE__ = true; });
    await this.scenePage.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
    await this.scenePage.goto('file:///' + SCENE_TEMPLATE.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
    const fonts = await this.scenePage.evaluate(async () => {
      if (!window.MotionCore || typeof window.MotionCore.ensureFonts !== 'function') {
        return { ok: false, missing: ['MotionCore.ensureFonts'] };
      }
      return window.MotionCore.ensureFonts();
    });
    if (!fonts.ok) throw new Error(`Fuentes no disponibles en scene_runner: ${JSON.stringify(fonts)}`);
    this.assertClean('Carga de scene_runner');
  }

  async getOverlayPage() {
    if (this.overlayPage) return this.overlayPage;
    ensureDir(this.tempRoot);
    this.overlayPage = await this.browser.newPage();
    this.attachDiagnostics(this.overlayPage, 'overlay');
    await this.overlayPage.evaluateOnNewDocument(() => { window.__PUPPETEER_CAPTURE__ = true; });
    await this.overlayPage.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
    await this.overlayPage.goto('file:///' + OVERLAY_TEMPLATE.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
    const fonts = await this.overlayPage.evaluate(async () => {
      if (!window.MotionCore || typeof window.MotionCore.ensureFonts !== 'function') {
        return { ok: false, missing: ['MotionCore.ensureFonts'] };
      }
      return window.MotionCore.ensureFonts();
    });
    if (!fonts.ok) throw new Error(`Fuentes no disponibles en overlay_editorial: ${JSON.stringify(fonts)}`);
    this.assertClean('Carga de overlay_editorial');
    return this.overlayPage;
  }

  cachePathFor(cacheManager, scene, hash, extension) {
    return path.join(cacheManager.cacheDir, `${scene.id}_${hash}${extension}`);
  }

  hashFor(cacheManager, scene, templateFile, componentFile, fps, engine, crf) {
    return cacheManager.computeSceneHash(scene, templateFile, componentFile, [], {
      fps,
      engine,
      crf: crf !== undefined ? crf : 17,
      editorCode: editorCodeFingerprint()
    });
  }

  async renderSceneToMp4(scene, outFile, options = {}) {
    await this.start();
    const fps = Number(options.fps || 30);
    const cacheManager = options.cacheManager;
    if (!cacheManager) throw new Error('renderSceneToMp4 requiere cacheManager.');
    const componentFile = path.join(PROJECT_ROOT, `animaciones/templates/components/${scene.type}.js`);
    if (!fs.existsSync(componentFile)) throw new Error(`No existe el componente ${scene.type} (${componentFile})`);
    const hash = this.hashFor(cacheManager, scene, SCENE_TEMPLATE, componentFile, fps, 'scene_runner', options.crf);
    const cacheFile = this.cachePathFor(cacheManager, scene, hash, '.mp4');
    ensureDir(path.dirname(outFile));

    if (!options.noCache && fs.existsSync(cacheFile) && fs.statSync(cacheFile).size > 1000) {
      const probe = probeMedia(cacheFile);
      if (probe.hasVideo && probe.videoCodec === 'h264' && probe.duration >= Number(scene.duration) - 0.12) {
        fs.copyFileSync(cacheFile, outFile);
        this.assertClean(`Cache ${scene.id}`);
        return { file: outFile, cached: true, hash };
      }
      try { fs.unlinkSync(cacheFile); } catch (err) { /* best effort */ }
    }

    ensureDir(path.dirname(cacheFile));
    const tempDir = path.join(this.tempRoot, `scene_${scene.id}_${hash}`);
    if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
    ensureDir(tempDir);

    try {
      const meta = options.meta || {};
      await this.scenePage.evaluate(async (sc, m) => {
        window.__SCENE_META__ = m;
        if (typeof window.loadScene === 'function') await window.loadScene(sc);
      }, scene, meta);
      const fonts = await this.scenePage.evaluate(async () => window.MotionCore.ensureFonts());
      if (!fonts.ok) throw new Error(`Fuentes no listas en ${scene.id}: ${JSON.stringify(fonts)}`);
      this.assertClean(`Carga de escena ${scene.id}`);

      const totalFrames = Math.max(1, Math.round(Number(scene.duration) * fps));
      const captureFrames = new Map();
      if (Array.isArray(options.captureTimes)) {
        for (const item of options.captureTimes) {
          const frame = Math.min(totalFrames - 1, Math.max(0, Math.round(Number(item.time) * fps)));
          if (!captureFrames.has(frame)) captureFrames.set(frame, item.label);
        }
      }
      const captures = [];
      for (let frame = 0; frame < totalFrames; frame++) {
        const time = frame / fps;
        await this.scenePage.evaluate((t) => window.renderFrame(t), time);
        if (this.errors.length) this.assertClean(`Frame ${frame} de ${scene.id}`);
        const frameFile = path.join(tempDir, `frame_${String(frame).padStart(4, '0')}.png`);
        await this.scenePage.screenshot({ path: frameFile, type: 'png' });
        if (captureFrames.has(frame) && options.captureDir) {
          ensureDir(options.captureDir);
          const label = captureFrames.get(frame);
          const captureFile = path.join(options.captureDir, `${scene.id}_${label}.png`);
          fs.copyFileSync(frameFile, captureFile);
          captures.push(captureFile);
        }
      }

      const pattern = path.join(tempDir, 'frame_%04d.png');
      encodePngSequence(pattern, cacheFile, { fps, duration: scene.duration, crf: options.crf !== undefined ? options.crf : 17 });
      const probe = probeMedia(cacheFile);
      if (!probe.hasVideo || probe.duration < Number(scene.duration) - 0.12) {
        throw new Error(`El clip ${scene.id} no cubre la duración asignada (${probe.duration}s < ${scene.duration}s).`);
      }
      fs.copyFileSync(cacheFile, outFile);
      this.assertClean(`Encode de ${scene.id}`);
      return { file: outFile, cached: false, hash, captures };
    } finally {
      if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }

  async renderOverlayToMov(scene, outFile, options = {}) {
    await this.start();
    const page = await this.getOverlayPage();
    const fps = Number(options.fps || 30);
    const cacheManager = options.cacheManager;
    if (!cacheManager) throw new Error('renderOverlayToMov requiere cacheManager.');
    const hash = this.hashFor(cacheManager, scene, OVERLAY_TEMPLATE, OVERLAY_TEMPLATE, fps, 'overlay_editorial', options.crf);
    const cacheFile = this.cachePathFor(cacheManager, scene, hash, '.mov');
    ensureDir(path.dirname(outFile));

    if (!options.noCache && fs.existsSync(cacheFile) && fs.statSync(cacheFile).size > 1000) {
      const probe = probeMedia(cacheFile);
      if (probe.hasVideo && probe.videoCodec === 'qtrle' && probe.pixFmt === 'argb' && probe.duration >= Number(scene.duration) - 0.12) {
        fs.copyFileSync(cacheFile, outFile);
        this.assertClean(`Cache overlay ${scene.id}`);
        return { file: outFile, cached: true, hash };
      }
      try { fs.unlinkSync(cacheFile); } catch (err) { /* best effort */ }
    }

    ensureDir(path.dirname(cacheFile));
    const tempDir = path.join(this.tempRoot, `overlay_${scene.id}_${hash}`);
    if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
    ensureDir(tempDir);

    try {
      await page.evaluate(async (sc) => {
        if (typeof window.setupOverlay !== 'function') throw new Error('overlay_editorial no expone setupOverlay');
        await window.setupOverlay(sc);
      }, scene);
      this.assertClean(`Carga de overlay ${scene.id}`);
      const totalFrames = Math.max(1, Math.round(Number(scene.duration) * fps));
      for (let frame = 0; frame < totalFrames; frame++) {
        await page.evaluate((t) => window.renderFrame(t), frame / fps);
        if (this.errors.length) this.assertClean(`Frame ${frame} de overlay ${scene.id}`);
        const frameFile = path.join(tempDir, `frame_${String(frame).padStart(4, '0')}.png`);
        await page.screenshot({ path: frameFile, type: 'png', omitBackground: true });
      }
      const pattern = path.join(tempDir, 'frame_%04d.png');
      encodePngSequence(pattern, cacheFile, { fps, duration: scene.duration, alpha: true });
      const probe = probeMedia(cacheFile);
      if (!probe.hasVideo || probe.duration < Number(scene.duration) - 0.12) {
        throw new Error(`El overlay ${scene.id} no cubre la duración asignada.`);
      }
      fs.copyFileSync(cacheFile, outFile);
      this.assertClean(`Encode de overlay ${scene.id}`);
      return { file: outFile, cached: false, hash };
    } finally {
      if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }

  async close() {
    if (this.browser) {
      try { await this.browser.close(); } catch (err) { /* already closed */ }
    }
    this.browser = null;
    this.scenePage = null;
    this.overlayPage = null;
  }
}

module.exports = {
  SceneRenderer,
  resolveChrome,
  SCENE_TEMPLATE,
  OVERLAY_TEMPLATE
};
