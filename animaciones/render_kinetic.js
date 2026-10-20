const puppeteer = require('puppeteer-core');
const path = require('path');
const { spawn, execSync } = require('child_process');
const fs = require('fs');

async function renderKinetic() {
  const templateName = 'overlay_kinetic_anthropic';
  const durationSeconds = 3.2;
  const fps = 30;
  const totalFrames = Math.round(durationSeconds * fps);

  const templateFile = path.resolve(`animaciones/templates/${templateName}.html`);
  const outputDir = path.resolve('animaciones/output_clips');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const tempPngDir = path.join(outputDir, '_temp_frames');
  if (fs.existsSync(tempPngDir)) fs.rmSync(tempPngDir, { recursive: true, force: true });
  fs.mkdirSync(tempPngDir, { recursive: true });

  console.log(`\n======================================================`);
  console.log(`🎬 RENDERIZANDO OVERLAY KINETIC PURO (ZERO AI-SLOP, CERO CARDS)`);
  console.log(`======================================================`);
  console.log(`• Duración: ${durationSeconds}s (${totalFrames} frames)`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--hide-scrollbars', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const fileUrl = 'file:///' + templateFile.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'load' });

  console.log('1. Extrayendo fotogramas con transparencia real (RGBA)...');
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

    if (frame % 20 === 0) {
      process.stdout.write(`   → Captura: ${Math.floor((frame / totalFrames) * 100)}%\n`);
    }
  }

  await browser.close();
  console.log('✔ Todos los fotogramas PNG con canal alfa fueron guardados.');

  const framePattern = path.join(tempPngDir, 'frame_%04d.png').replace(/\\/g, '/');

  // 1. QuickTime Animation RLE (.mov) with ARGB - Gold standard for Premiere & CapCut PC
  const movQtrle = path.join(outputDir, `${templateName}.mov`);
  const desktopMov = path.join('C:\\Users\\Edixon\\Desktop', `${templateName}.mov`);
  console.log('2. Codificando QuickTime Animation RLE con canal alfa (.mov)...');
  execSync(`ffmpeg -y -framerate ${fps} -i "${framePattern}" -c:v qtrle -pix_fmt argb "${movQtrle}"`, { stdio: 'ignore' });
  fs.copyFileSync(movQtrle, desktopMov);
  console.log(`   ✔ MOV generado: ${desktopMov}`);

  // 2. WebM VP9 with Alpha (.webm) - Native CapCut PC transparency
  const webmOutput = path.join(outputDir, `${templateName}.webm`);
  const desktopWebm = path.join('C:\\Users\\Edixon\\Desktop', `${templateName}.webm`);
  console.log('3. Codificando WebM VP9 con canal alfa (.webm)...');
  execSync(`ffmpeg -y -framerate ${fps} -i "${framePattern}" -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 2M "${webmOutput}"`, { stdio: 'ignore' });
  fs.copyFileSync(webmOutput, desktopWebm);
  console.log(`   ✔ WebM generado: ${desktopWebm}`);

  // 3. Chroma Key Green MP4 (.mp4) - 100% foolproof fallback for mobile / basic editors
  const chromaMp4 = path.join(outputDir, `${templateName}_chroma.mp4`);
  const desktopChroma = path.join('C:\\Users\\Edixon\\Desktop', `${templateName}_chroma.mp4`);
  console.log('4. Codificando versión Chroma Green MP4 (#00FF00) como respaldo...');
  execSync(`ffmpeg -y -f lavfi -i color=c=0x00FF00:s=1080x1920:r=${fps} -framerate ${fps} -i "${framePattern}" -filter_complex "[0:v][1:v]overlay=shortest=1[out]" -map "[out]" -c:v libx264 -pix_fmt yuv420p -preset fast "${chromaMp4}"`, { stdio: 'ignore' });
  fs.copyFileSync(chromaMp4, desktopChroma);
  console.log(`   ✔ Chroma MP4 generado: ${desktopChroma}`);

  // 4. Test Composite Video to prove transparency over sample video
  const testProof = path.join(outputDir, `proof_transparency.mp4`);
  const desktopProof = path.join('C:\\Users\\Edixon\\Desktop', `demostracion_transparencia.mp4`);
  console.log('5. Generando demostración compuesta sobre fondo de prueba en video...');
  // Create a gradient test background and overlay our MOV on top to prove transparency!
  execSync(`ffmpeg -y -f lavfi -i testsrc=size=1080x1920:rate=${fps} -i "${movQtrle}" -filter_complex "[0:v]trim=duration=3.2[bg];[bg][1:v]overlay[out]" -map "[out]" -c:v libx264 -pix_fmt yuv420p -t 3.2 "${testProof}"`, { stdio: 'ignore' });
  fs.copyFileSync(testProof, desktopProof);
  console.log(`   ✔ Demostración compuesta generada: ${desktopProof}`);

  // Clean temp frames
  fs.rmSync(tempPngDir, { recursive: true, force: true });

  console.log(`\n======================================================`);
  console.log(`✨ LISTO: ARCHIVOS EN ESCRITORIO`);
  console.log(`======================================================`);
  console.log(`📁 1. ${desktopMov} (QuickTime con Alpha Real)`);
  console.log(`📁 2. ${desktopWebm} (WebM con Alpha Real)`);
  console.log(`📁 3. ${desktopChroma} (MP4 Chroma Green #00FF00)`);
  console.log(`📁 4. ${desktopProof} (Video de prueba que demuestra que el fondo se ve 100%)`);
}

renderKinetic().catch(console.error);
