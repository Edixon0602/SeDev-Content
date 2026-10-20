const puppeteer = require('puppeteer-core');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

async function renderSpringSlam() {
  const templateName = 'overlay_spring_slam';
  const durationSeconds = 3.0; // EXACT 3.0 SECONDS
  const fps = 30;
  const totalFrames = 90;

  const templateFile = path.resolve(`animaciones/templates/${templateName}.html`);
  const outputDir = path.resolve('animaciones/output_clips');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const tempPngDir = path.join(outputDir, '_temp_slam_frames');
  if (fs.existsSync(tempPngDir)) fs.rmSync(tempPngDir, { recursive: true, force: true });
  fs.mkdirSync(tempPngDir, { recursive: true });

  const desktop = 'C:\\Users\\Edixon\\Desktop';
  const targetMov = path.join(desktop, 'OVERLAY_ANTHROPIC_FINAL.mov');

  console.log(`\n======================================================`);
  console.log(`💥 RENDERIZANDO OVERLAY SPRING SLAM (ENERGÉTICO, CERO NEÓN)`);
  console.log(`======================================================`);
  console.log(`• Seg 0.0 - 1.0: ¿ANTHROPIC ✦`);
  console.log(`• Seg 1.0 - 2.0: VA A PAGAR`);
  console.log(`• Seg 2.0 - 3.0: TU PRÓXIMO SALARIO? 💵`);

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
  console.log('✔ Frames PNG capturados.');

  const framePattern = path.join(tempPngDir, 'frame_%04d.png').replace(/\\/g, '/');

  // Overwrite the existing MOV on Desktop
  if (fs.existsSync(targetMov)) {
    try { fs.unlinkSync(targetMov); } catch(e) {}
  }

  console.log('Codificando a QuickTime Animation ARGB (.mov)...');
  execSync(`ffmpeg -y -framerate ${fps} -i "${framePattern}" -c:v qtrle -pix_fmt argb "${targetMov}"`, { stdio: 'ignore' });

  // Clean temp frames
  fs.rmSync(tempPngDir, { recursive: true, force: true });

  console.log(`\n======================================================`);
  console.log(`✔ LISTO: ${targetMov}`);
  console.log(`======================================================`);
}

renderSpringSlam().catch(console.error);
