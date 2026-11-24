const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const MODE = (process.argv[2] || 'all').toLowerCase();
if (!['scene', 'player', 'all'].includes(MODE)) {
  console.error('Uso: node qa_verify_v2_engine.js [scene|player|all]');
  process.exit(2);
}

(async () => {
  const debugDir = path.resolve('animaciones/debug_frames');
  if (!fs.existsSync(debugDir)) fs.mkdirSync(debugDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--hide-scrollbars', '--allow-file-access-from-files', '--font-render-hinting=none']
  });

  const result = { player: null, scene: null };

  if (MODE === 'player' || MODE === 'all') {
    const playerErrors = [];
    try {
      const playerPage = await browser.newPage();
      playerPage.on('pageerror', err => playerErrors.push(err.toString()));
      await playerPage.setViewport({ width: 1600, height: 960, deviceScaleFactor: 1 });
      const playerUrl = 'file:///' + path.resolve('animaciones/player.html').replace(/\\/g, '/');
      await playerPage.goto(playerUrl, { waitUntil: 'networkidle0' });
      await playerPage.evaluate(() => document.fonts.ready);

      await playerPage.evaluate(() => { selectVideo(0); seek(2.8); });
      await new Promise(r => setTimeout(r, 250));
      await playerPage.screenshot({ path: path.join(debugDir, 'qa_v2_player_p01.png') });

      await playerPage.evaluate(() => { selectVideo(2); seek(14.2); });
      await new Promise(r => setTimeout(r, 250));
      await playerPage.screenshot({ path: path.join(debugDir, 'qa_v2_player_p03_code.png') });

      await playerPage.evaluate(() => { selectVideo(11); seek(2.5); });
      await new Promise(r => setTimeout(r, 250));
      await playerPage.screenshot({ path: path.join(debugDir, 'qa_v2_player_p12_mem.png') });

      await playerPage.evaluate(() => { selectVideo(12); seek(36.5); });
      await new Promise(r => setTimeout(r, 250));
      await playerPage.screenshot({ path: path.join(debugDir, 'qa_v2_player_p13_cta.png') });

      result.player = { ok: playerErrors.length === 0, errors: playerErrors };
    } catch (err) {
      result.player = { ok: false, errors: playerErrors.concat([err.message]) };
    }
  }

  if (MODE === 'scene' || MODE === 'all') {
    const errors = [];
    try {
      const runnerPage = await browser.newPage();
      runnerPage.on('pageerror', err => errors.push(err.toString()));
      runnerPage.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
      await runnerPage.evaluateOnNewDocument(() => { window.__PUPPETEER_CAPTURE__ = true; });
      await runnerPage.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

      const runnerUrl = 'file:///' + path.resolve('animaciones/templates/scene_runner.html').replace(/\\/g, '/');
      await runnerPage.goto(runnerUrl, { waitUntil: 'networkidle0' });
      await runnerPage.evaluate(() => document.fonts.ready);
      const fonts = await runnerPage.evaluate(async () => window.MotionCore.ensureFonts());
      if (!fonts.ok) errors.push(`fonts: ${JSON.stringify(fonts)}`);

      const manifest = JSON.parse(fs.readFileSync(path.resolve('animaciones/manifests/demo_motion_hook.json'), 'utf8'));

      await runnerPage.evaluate(sc => window.loadScene(sc), manifest.scenes[0]);
      await runnerPage.evaluate(() => window.renderFrame(0.12));
      await runnerPage.screenshot({ path: path.join(debugDir, 'qa_v2_hook_open.png') });
      await runnerPage.evaluate(() => window.renderFrame(1.2));
      await runnerPage.screenshot({ path: path.join(debugDir, 'qa_v2_hook_beats.png') });
      await runnerPage.evaluate(() => window.renderFrame(4.3));
      await runnerPage.screenshot({ path: path.join(debugDir, 'qa_v2_hook_close.png') });

      await runnerPage.evaluate(sc => window.loadScene(sc), manifest.scenes[2]);
      await runnerPage.evaluate(() => window.renderFrame(1.2));
      await runnerPage.screenshot({ path: path.join(debugDir, 'qa_v2_arch_inflow.png') });
      await runnerPage.evaluate(() => window.renderFrame(2.6));
      await runnerPage.screenshot({ path: path.join(debugDir, 'qa_v2_arch_surge.png') });
      await runnerPage.evaluate(() => window.renderFrame(4.4));
      await runnerPage.screenshot({ path: path.join(debugDir, 'qa_v2_arch_resolved.png') });

      result.scene = { ok: errors.length === 0, errors, fonts };
    } catch (err) {
      result.scene = { ok: false, errors: errors.concat([err.message]) };
    }
  }

  await browser.close();

  if (result.player) {
    if (result.player.ok) console.log('✔ verify:player OK');
    else console.error('✖ verify:player FALLÓ:', result.player.errors.slice(0, 6));
  }
  if (result.scene) {
    if (result.scene.ok) console.log('✔ verify:scene OK (fonts + 0 errores de consola)');
    else console.error('✖ verify:scene FALLÓ:', result.scene.errors.slice(0, 6));
  }

  const allOk = (!result.player || result.player.ok) && (!result.scene || result.scene.ok);
  if (MODE === 'all') {
    if (allOk) console.log('✔ VERIFY GLOBAL OK');
    else {
      console.error('✖ VERIFY GLOBAL FALLÓ. Usa verify:scene para el motor y revisa verify:player por separado.');
      process.exit(1);
    }
  } else if (!allOk) {
    process.exit(1);
  }
})();
