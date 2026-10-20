const puppeteer = require('puppeteer-core');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

async function renderVideo(templateName = 'p08_backpressure', durationSeconds = 8.0, fps = 30) {
  const templateFile = path.resolve(`animaciones/templates/${templateName}.html`);
  if (!fs.existsSync(templateFile)) {
    console.error(`Error: Template not found at ${templateFile}`);
    process.exit(1);
  }

  const outputDir = path.resolve('animaciones/output_clips');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = path.join(outputDir, `${templateName}.mp4`);
  const totalFrames = Math.round(durationSeconds * fps);

  console.log(`\n========================================`);
  console.log(`🎬 INICIANDO RENDERIZADO DE VIDEO`);
  console.log(`========================================`);
  console.log(`• Template:    ${templateName}.html`);
  console.log(`• Resolución:  1080 x 1920 (Vertical 9:16)`);
  console.log(`• Duración:    ${durationSeconds} segundos`);
  console.log(`• FPS:         ${fps} fps (${totalFrames} cuadros totales)`);
  console.log(`• Destino:     ${outputFile}\n`);

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

  console.log('2. Cargando template HTML...');
  const fileUrl = 'file:///' + templateFile.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'load' });

  console.log('3. Inicializando codificador FFmpeg (H.264)...');
  const ffmpegArgs = [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-r', String(fps),
    '-i', '-',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'fast',
    '-b:v', '10M',
    outputFile
  ];

  const ffmpeg = spawn('ffmpeg', ffmpegArgs, { stdio: ['pipe', 'ignore', 'pipe'] });

  ffmpeg.stderr.on('data', (data) => {
    // Keep error logs if needed
  });

  console.log('4. Grabando cuadros frame-by-frame...');
  const startTime = Date.now();
  let lastPct = -1;

  for (let frame = 0; frame < totalFrames; frame++) {
    const timeInSec = frame / fps;

    // Advance animation clock in browser
    await page.evaluate((t) => {
      if (typeof window.renderFrame === 'function') {
        window.renderFrame(t);
      }
    }, timeInSec);

    // Capture frame buffer
    const buffer = await page.screenshot({ type: 'jpeg', quality: 95 });

    // Stream buffer into ffmpeg stdin
    const canContinue = ffmpeg.stdin.write(buffer);
    if (!canContinue) {
      await new Promise(resolve => ffmpeg.stdin.once('drain', resolve));
    }

    const pct = Math.floor((frame / totalFrames) * 100);
    if (pct % 10 === 0 && pct !== lastPct) {
      process.stdout.write(`   → Progreso: ${pct}% (${frame}/${totalFrames} cuadros)\n`);
      lastPct = pct;
    }
  }

  console.log('5. Finalizando codificación de video...');
  ffmpeg.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg falló con código ${code}`));
    });
  });

  await browser.close();

  // Also copy directly to Desktop for instantaneous preview
  const desktopPath = path.join('C:\\Users\\Edixon\\Desktop', `${templateName}.mp4`);
  try {
    fs.copyFileSync(outputFile, desktopPath);
  } catch (err) {
    // Ignore if desktop path differs
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const stats = fs.statSync(outputFile);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

  console.log(`\n========================================`);
  console.log(`✅ ¡VIDEO GENERADO EXITOSAMENTE!`);
  console.log(`========================================`);
  console.log(`• Proyecto:  ${outputFile}`);
  console.log(`• Escritorio:${desktopPath}`);
  console.log(`• Tamaño:    ${sizeMb} MB`);
  console.log(`• Tiempo:    ${totalTime} segundos de render`);
  console.log(`• Estado:    Listo para importar en CapCut, Premiere o DaVinci`);
  console.log(`========================================\n`);

  return outputFile;
}

const templateArg = process.argv[2] || 'p08_backpressure';
const durationArg = parseFloat(process.argv[3]) || 8.0;
const fpsArg = parseInt(process.argv[4]) || 30;

renderVideo(templateArg, durationArg, fpsArg).catch(err => {
  console.error('Error fatal durante el render:', err);
  process.exit(1);
});
