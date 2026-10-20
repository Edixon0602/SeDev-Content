const puppeteer = require('puppeteer-core');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

async function renderDefinitive() {
  const templateName = 'overlay_trending_kinetic';
  const durationSeconds = 3.0; // EXACTLY 3.0 SECONDS
  const fps = 30;
  const totalFrames = Math.round(durationSeconds * fps); // 90 frames

  const templateFile = path.resolve(`animaciones/templates/${templateName}.html`);
  const outputDir = path.resolve('animaciones/output_clips');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const tempPngDir = path.join(outputDir, '_temp_kinetic_frames');
  if (fs.existsSync(tempPngDir)) fs.rmSync(tempPngDir, { recursive: true, force: true });
  fs.mkdirSync(tempPngDir, { recursive: true });

  console.log(`\n======================================================`);
  console.log(`🚀 RENDERIZANDO OVERLAY DEFINITIVO 3.0s (TRENDING KINETIC)`);
  console.log(`======================================================`);
  console.log(`• Duración exacta: ${durationSeconds} segundos (${totalFrames} frames a ${fps}fps)`);
  console.log(`• Estilo: Masked Slide-Up + Snappy Overshoot + High-Contrast Viral Pill`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--hide-scrollbars', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const fileUrl = 'file:///' + templateFile.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'load' });

  console.log('1. Capturando frames transparentes con canal alfa puro...');
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

    if (frame % 25 === 0 || frame === totalFrames - 1) {
      process.stdout.write(`   → Captura: ${Math.floor((frame / (totalFrames - 1)) * 100)}%\n`);
    }
  }

  await browser.close();
  console.log('✔ Todos los fotogramas fueron capturados.');

  const framePattern = path.join(tempPngDir, 'frame_%04d.png').replace(/\\/g, '/');
  const desktop = 'C:\\Users\\Edixon\\Desktop';

  // Output 1: QuickTime Animation RLE (.mov)
  const movOutput = path.join(desktop, 'sedev_overlay_anthropic.mov');
  console.log('2. Codificando QuickTime Animation con Canal Alfa (.mov)...');
  execSync(`ffmpeg -y -framerate ${fps} -i "${framePattern}" -c:v qtrle -pix_fmt argb "${movOutput}"`, { stdio: 'ignore' });
  console.log(`   ✔ MOV generado: ${movOutput}`);

  // Output 2: WebM VP9 with Alpha (.webm)
  const webmOutput = path.join(desktop, 'sedev_overlay_anthropic.webm');
  console.log('3. Codificando WebM VP9 con Canal Alfa (.webm)...');
  execSync(`ffmpeg -y -framerate ${fps} -i "${framePattern}" -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 3M "${webmOutput}"`, { stdio: 'ignore' });
  console.log(`   ✔ WebM generado: ${webmOutput}`);

  // Output 3: Chroma Green MP4 (.mp4)
  const chromaOutput = path.join(desktop, 'sedev_overlay_anthropic_chroma.mp4');
  console.log('4. Codificando versión Chroma Green MP4 (#00FF00)...');
  execSync(`ffmpeg -y -f lavfi -i color=c=0x00FF00:s=1080x1920:r=${fps} -framerate ${fps} -i "${framePattern}" -filter_complex "[0:v][1:v]overlay=shortest=1[out]" -map "[out]" -c:v libx264 -pix_fmt yuv420p -preset fast -t 3.0 "${chromaOutput}"`, { stdio: 'ignore' });
  console.log(`   ✔ Chroma MP4 generado: ${chromaOutput}`);

  // Output 4: Video de Demostración compuesto sobre fondo dinámico
  const demoOutput = path.join(desktop, 'demostracion_3segundos.mp4');
  console.log('5. Generando demostración de 3 segundos para ver con doble clic...');
  execSync(`ffmpeg -y -f lavfi -i testsrc=size=1080x1920:rate=${fps} -framerate ${fps} -i "${framePattern}" -filter_complex "[0:v]trim=duration=3.0[bg];[bg][1:v]overlay=shortest=1[out]" -map "[out]" -c:v libx264 -pix_fmt yuv420p -preset fast -t 3.0 "${demoOutput}"`, { stdio: 'ignore' });
  console.log(`   ✔ Demostración lista: ${demoOutput}`);

  // Clean temp files
  fs.rmSync(tempPngDir, { recursive: true, force: true });

  console.log(`\n======================================================`);
  console.log(`✨ LISTO EN EL ESCRITORIO (3.0 SEGUNDOS EXACTOS)`);
  console.log(`======================================================`);
}

renderDefinitive().catch(console.error);
