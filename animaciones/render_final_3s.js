const puppeteer = require('puppeteer-core');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

async function renderFinal3s() {
  const templateName = 'overlay_final_3s';
  const durationSeconds = 3.0; // EXACTLY 3.0 SECONDS
  const fps = 30;
  const totalFrames = 90; // 3.0 * 30 = 90 frames

  const templateFile = path.resolve(`animaciones/templates/${templateName}.html`);
  const outputDir = path.resolve('animaciones/output_clips');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const tempPngDir = path.join(outputDir, '_temp_final_3s');
  if (fs.existsSync(tempPngDir)) fs.rmSync(tempPngDir, { recursive: true, force: true });
  fs.mkdirSync(tempPngDir, { recursive: true });

  console.log(`\n======================================================`);
  console.log(`🎬 RENDERIZANDO OVERLAY 3.0s ORDENADO (UNA SOLA PASADA)`);
  console.log(`======================================================`);
  console.log(`• Seg 0.0 - 1.0: ¿ANTHROPIC ✦`);
  console.log(`• Seg 1.0 - 2.0: VA A PAGAR`);
  console.log(`• Seg 2.0 - 3.0: TU PRÓXIMO SALARIO? 💵`);
  console.log(`• Total frames: ${totalFrames} frames`);

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
      process.stdout.write(`   → Captura: Segundo ${(frame / 30).toFixed(1)}s / 3.0s\n`);
    }
  }

  await browser.close();
  console.log('✔ 90 fotogramas con canal alfa guardados.');

  const framePattern = path.join(tempPngDir, 'frame_%04d.png').replace(/\\/g, '/');
  const desktop = 'C:\\Users\\Edixon\\Desktop';

  // Output 1: QuickTime Animation RLE (.mov)
  const movOutput = path.join(desktop, 'OVERLAY_ANTHROPIC_3S.mov');
  console.log('1. Generando QuickTime Animation ARGB con canal alfa...');
  execSync(`ffmpeg -y -framerate ${fps} -i "${framePattern}" -c:v qtrle -pix_fmt argb "${movOutput}"`, { stdio: 'ignore' });
  console.log(`   ✔ MOV: ${movOutput}`);

  // Output 2: WebM VP9 with Alpha (.webm)
  const webmOutput = path.join(desktop, 'OVERLAY_ANTHROPIC_3S.webm');
  console.log('2. Generando WebM VP9 con canal alfa...');
  execSync(`ffmpeg -y -framerate ${fps} -i "${framePattern}" -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 3M "${webmOutput}"`, { stdio: 'ignore' });
  console.log(`   ✔ WebM: ${webmOutput}`);

  // Output 3: Chroma Green MP4 (.mp4)
  const chromaOutput = path.join(desktop, 'OVERLAY_ANTHROPIC_3S_CHROMA.mp4');
  console.log('3. Generando versión Chroma Green #00FF00...');
  execSync(`ffmpeg -y -f lavfi -i color=c=0x00FF00:s=1080x1920:r=${fps} -framerate ${fps} -i "${framePattern}" -filter_complex "[0:v][1:v]overlay=shortest=1[out]" -map "[out]" -c:v libx264 -pix_fmt yuv420p -preset fast -t 3.0 "${chromaOutput}"`, { stdio: 'ignore' });
  console.log(`   ✔ Chroma MP4: ${chromaOutput}`);

  // Output 4: Demo Preview MP4 (sobre fondo gris oscuro con rejilla suave)
  const demoOutput = path.join(desktop, 'DEMO_PREVIEW_3S.mp4');
  console.log('4. Generando video de previsualización para Windows...');
  execSync(`ffmpeg -y -f lavfi -i color=c=0x121216:s=1080x1920:r=${fps} -framerate ${fps} -i "${framePattern}" -filter_complex "[0:v][1:v]overlay=shortest=1[out]" -map "[out]" -c:v libx264 -pix_fmt yuv420p -preset fast -t 3.0 "${demoOutput}"`, { stdio: 'ignore' });
  console.log(`   ✔ Demo MP4: ${demoOutput}`);

  // Clean temp files
  fs.rmSync(tempPngDir, { recursive: true, force: true });

  console.log(`\n======================================================`);
  console.log(`✨ RENDERIZADO COMPLETADO EN ESCRITORIO (3.0s EXACTOS)`);
  console.log(`======================================================`);
}

renderFinal3s().catch(console.error);
