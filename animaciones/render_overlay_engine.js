const puppeteer = require('puppeteer-core');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

async function renderOverlayEngine(
  templateName = 'overlay_word_by_word',
  outputMovName = 'OVERLAY_ANTHROPIC_FINAL.mov',
  durationSeconds = 3.0,
  fps = 30
) {
  const totalFrames = Math.round(durationSeconds * fps);
  const templateFile = path.resolve(`animaciones/templates/${templateName}.html`);
  const outputDir = path.resolve('animaciones/output_clips');
  const debugDir = path.resolve('animaciones/debug_frames');
  const tempPngDir = path.join(outputDir, '_temp_engine_frames');

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(debugDir)) fs.mkdirSync(debugDir, { recursive: true });
  if (fs.existsSync(tempPngDir)) fs.rmSync(tempPngDir, { recursive: true, force: true });
  fs.mkdirSync(tempPngDir, { recursive: true });

  const desktop = 'C:\\Users\\Edixon\\Desktop';
  const targetMov = path.join(desktop, outputMovName);

  console.log(`\n======================================================`);
  console.log(`🎬 SEDEV OVERLAY ENGINE - RENDER DETERMINISTA (NO-LOOP)`);
  console.log(`======================================================`);
  console.log(`• Plantilla: ${templateName}.html`);
  console.log(`• Duración:  ${durationSeconds.toFixed(1)}s (${totalFrames} frames @ ${fps}fps)`);
  console.log(`• Destino:   ${targetMov}`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--hide-scrollbars', '--disable-gpu']
  });

  const page = await browser.newPage();
  // Lock out any internal requestAnimationFrame loops so frame time is 100% deterministic
  await page.evaluateOnNewDocument(() => {
    window.__PUPPETEER_CAPTURE__ = true;
  });

  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const fileUrl = 'file:///' + templateFile.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);

  const qaFrames = new Set([
    Math.round(0.4 * fps),
    Math.round(1.2 * fps),
    Math.round(1.9 * fps),
    Math.round(2.4 * fps)
  ]);

  for (let frame = 0; frame < totalFrames; frame++) {
    const timeInSec = frame / fps;

    await page.evaluate((t) => {
      if (typeof window.renderFrame === 'function') {
        window.renderFrame(t);
      }
    }, timeInSec);

    const frameFile = path.join(tempPngDir, `frame_${String(frame).padStart(4, '0')}.png`);
    await page.screenshot({
      path: frameFile,
      type: 'png',
      omitBackground: true
    });

    if (qaFrames.has(frame)) {
      const qaPath = path.join(debugDir, `qa_frame_${String(frame).padStart(3, '0')}.png`);
      fs.copyFileSync(frameFile, qaPath);
    }

    if (frame % 30 === 0 || frame === totalFrames - 1) {
      process.stdout.write(`   → Frame ${frame + 1}/${totalFrames} (${timeInSec.toFixed(2)}s)\n`);
    }
  }

  await browser.close();

  const framePattern = path.join(tempPngDir, 'frame_%04d.png').replace(/\\/g, '/');

  if (fs.existsSync(targetMov)) {
    try { fs.unlinkSync(targetMov); } catch (e) {}
  }

  console.log('Codificando QuickTime Animation ARGB (.mov)...');
  execSync(`ffmpeg -y -framerate ${fps} -i "${framePattern}" -c:v qtrle -pix_fmt argb "${targetMov}"`, { stdio: 'ignore' });

  fs.rmSync(tempPngDir, { recursive: true, force: true });
  console.log(`✔ Render completado: ${targetMov}`);
}

const args = process.argv.slice(2);
renderOverlayEngine(
  args[0] || 'overlay_word_by_word',
  args[1] || 'OVERLAY_ANTHROPIC_FINAL.mov',
  parseFloat(args[2] || '3.0'),
  parseInt(args[3] || '30', 10)
).catch(console.error);
