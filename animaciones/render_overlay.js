const puppeteer = require('puppeteer-core');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

async function renderOverlay(templateName = 'overlay_anthropic_salario', durationSeconds = 4.5, fps = 30) {
  const templateFile = path.resolve(`animaciones/templates/${templateName}.html`);
  if (!fs.existsSync(templateFile)) {
    console.error(`Error: Template not found at ${templateFile}`);
    process.exit(1);
  }

  const outputDir = path.resolve('animaciones/output_clips');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputMov = path.join(outputDir, `${templateName}.mov`);
  const outputWebm = path.join(outputDir, `${templateName}.webm`);
  const desktopMov = path.join('C:\\Users\\Edixon\\Desktop', `${templateName}.mov`);
  const desktopWebm = path.join('C:\\Users\\Edixon\\Desktop', `${templateName}.webm`);

  const totalFrames = Math.round(durationSeconds * fps);

  console.log(`\n======================================================`);
  console.log(`🎬 INICIANDO RENDERIZADO DE OVERLAY TRANSPARENTE (ALPHA)`);
  console.log(`======================================================`);
  console.log(`• Template:    ${templateName}.html`);
  console.log(`• Resolución:  1080 x 1920 (Vertical 9:16)`);
  console.log(`• Duración:    ${durationSeconds} segundos`);
  console.log(`• FPS:         ${fps} fps (${totalFrames} cuadros totales)`);
  console.log(`• Formato 1:   Apple ProRes 4444 (.mov) [Canal Alfa Nativo]`);
  console.log(`• Formato 2:   WebM VP9 (.webm) [Transparente Ligero]`);
  console.log(`• Destino:     ${outputMov}\n`);

  console.log('1. Lanzando navegador Chrome...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--hide-scrollbars'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  console.log('2. Cargando template HTML con fondo transparente...');
  const fileUrl = 'file:///' + templateFile.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'load' });

  // Ensure background is fully transparent
  await page.evaluate(() => {
    document.body.style.background = 'transparent';
    document.documentElement.style.background = 'transparent';
  });

  console.log('3. Inicializando FFmpeg para Apple ProRes 4444 (yuva444p10le)...');
  const ffmpegMovArgs = [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'png',
    '-r', String(fps),
    '-i', '-',
    '-c:v', 'prores_ks',
    '-profile:v', '4', // 4 = ProRes 4444 with Alpha
    '-pix_fmt', 'yuva444p10le',
    outputMov
  ];

  const ffmpegMov = spawn('ffmpeg', ffmpegMovArgs, { stdio: ['pipe', 'ignore', 'pipe'] });

  console.log('4. Grabando cuadros PNG con canal alfa frame-by-frame...');
  const startTime = Date.now();
  let lastPct = -1;

  for (let frame = 0; frame < totalFrames; frame++) {
    const timeInSec = frame / fps;

    // Advance animation clock
    await page.evaluate((t) => {
      if (typeof window.renderFrame === 'function') {
        window.renderFrame(t);
      }
    }, timeInSec);

    // Capture transparent PNG
    const buffer = await page.screenshot({
      type: 'png',
      omitBackground: true
    });

    // Stream buffer into ffmpeg stdin
    const canContinue = ffmpegMov.stdin.write(buffer);
    if (!canContinue) {
      await new Promise(resolve => ffmpegMov.stdin.once('drain', resolve));
    }

    const pct = Math.floor((frame / totalFrames) * 100);
    if (pct % 15 === 0 && pct !== lastPct) {
      process.stdout.write(`   → Progreso ProRes: ${pct}% (${frame}/${totalFrames} frames)\n`);
      lastPct = pct;
    }
  }

  console.log('5. Finalizando codificación ProRes 4444...');
  ffmpegMov.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpegMov.on('close', (code) => {
      if (code === 0) {
        console.log(`   ✔ ProRes 4444 (.mov) generado con éxito.`);
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });
  });

  await browser.close();

  // Also convert the transparent MOV to WebM VP9 (super fast direct transcode)
  console.log('6. Generando versión WebM con canal alfa para máxima compatibilidad...');
  await new Promise((resolve) => {
    const ffmpegWebm = spawn('ffmpeg', [
      '-y',
      '-i', outputMov,
      '-c:v', 'libvpx-vp9',
      '-pix_fmt', 'yuva420p',
      '-b:v', '2M',
      outputWebm
    ], { stdio: 'ignore' });

    ffmpegWebm.on('close', () => {
      console.log(`   ✔ WebM transparente generado con éxito.`);
      resolve();
    });
  });

  // Also generate a quick MP4 preview on dark background so Windows Media Player can play it directly
  const outputPreviewMp4 = path.join(outputDir, `${templateName}_preview.mp4`);
  const desktopPreviewMp4 = path.join('C:\\Users\\Edixon\\Desktop', `${templateName}_preview.mp4`);

  console.log('7. Generando MP4 de previsualización rápida para reproductor de Windows...');
  await new Promise((resolve) => {
    const ffmpegMp4 = spawn('ffmpeg', [
      '-y',
      '-f', 'lavfi', '-i', 'color=c=0x0a0a0c:s=1080x1920:r=30',
      '-i', outputMov,
      '-filter_complex', '[0:v][1:v]overlay=shortest=1[out]',
      '-map', '[out]',
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-preset', 'fast',
      outputPreviewMp4
    ], { stdio: 'ignore' });

    ffmpegMp4.on('close', () => {
      console.log(`   ✔ MP4 de vista previa generado con éxito.`);
      resolve();
    });
  });

  // Copy files to Desktop
  fs.copyFileSync(outputMov, desktopMov);
  fs.copyFileSync(outputWebm, desktopWebm);
  fs.copyFileSync(outputPreviewMp4, desktopPreviewMp4);

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n======================================================`);
  console.log(`✨ OVERLAYS LISTOS EN ESCRITORIO Y WORKSPACE (${totalTime}s)`);
  console.log(`======================================================`);
  console.log(`1. [EDITOR PRO] ProRes 4444 (Alpha nativo):`);
  console.log(`   📁 ${desktopMov}`);
  console.log(`2. [LIGERO] WebM con Alpha:`);
  console.log(`   📁 ${desktopWebm}`);
  console.log(`3. [PREVIEW] MP4 para ver con doble clic:`);
  console.log(`   📁 ${desktopPreviewMp4}`);
}

renderOverlay('overlay_anthropic_salario', 4.5, 30).catch(console.error);
