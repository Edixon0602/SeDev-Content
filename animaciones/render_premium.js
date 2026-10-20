const puppeteer = require('puppeteer-core');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

async function renderPremium() {
  const templateName = 'overlay_premium_linear';
  const durationSeconds = 3.0; // EXACT 3.0 SECONDS
  const fps = 30;
  const totalFrames = 90;

  const templateFile = path.resolve(`animaciones/templates/${templateName}.html`);
  const outputDir = path.resolve('animaciones/output_clips');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const tempPngDir = path.join(outputDir, '_temp_premium_frames');
  if (fs.existsSync(tempPngDir)) fs.rmSync(tempPngDir, { recursive: true, force: true });
  fs.mkdirSync(tempPngDir, { recursive: true });

  const desktop = 'C:\\Users\\Edixon\\Desktop';
  const targetMov = path.join(desktop, 'OVERLAY_ANTHROPIC_FINAL.mov');

  console.log(`\n======================================================`);
  console.log(`✨ RENDERIZANDO OVERLAY LINEAR PREMIUM 3.0s`);
  console.log(`======================================================`);
  console.log(`• Estilo: Linear / Apple Blur-Dissolve (Sin AI-Slop)`);
  console.log(`• Duración: 3.0s (${totalFrames} frames)`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--hide-scrollbars', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const fileUrl = 'file:///' + templateFile.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'load' });

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

    if (frame % 30 === 0 || frame === totalFrames - 1) {
      process.stdout.write(`   → Captura: ${(frame / 30).toFixed(1)}s / 3.0s\n`);
    }
  }

  await browser.close();
  console.log('✔ Frames capturados.');

  const framePattern = path.join(tempPngDir, 'frame_%04d.png').replace(/\\/g, '/');

  // If old file exists on Desktop, delete it first
  if (fs.existsSync(targetMov)) {
    try { fs.unlinkSync(targetMov); } catch(e) {}
  }

  console.log('Codificando archivo final .mov con canal alfa (argb)...');
  execSync(`ffmpeg -y -framerate ${fps} -i "${framePattern}" -c:v qtrle -pix_fmt argb "${targetMov}"`, { stdio: 'ignore' });

  // Clean temp frames
  fs.rmSync(tempPngDir, { recursive: true, force: true });

  console.log(`\n======================================================`);
  console.log(`✔ ARCHIVO FINAL GENERADO: ${targetMov}`);
  console.log(`======================================================`);
}

renderPremium().catch(console.error);
