const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');
const { execSync } = require('child_process');

const manifestsDir = path.resolve('animaciones/manifests');

async function renderStandaloneBrolls(manifestPaths, options = {}) {
  const force = options.force || process.argv.includes('--force');
  const templateFile = path.resolve('animaciones/templates/scene_runner.html');
  const tempDir = path.resolve('animaciones/output_clips/_temp_brolls');
  const outBaseDir = path.resolve('animaciones/output_clips/sedev_brolls');
  if (!fs.existsSync(outBaseDir)) fs.mkdirSync(outBaseDir, { recursive: true });

  console.log(`\n======================================================`);
  console.log(`🎬 INICIANDO MOTOR DE RENDERIZADO DE B-ROLLS (SEDEV)`);
  console.log(`   Total de piezas en lote: ${manifestPaths.length}`);
  console.log(`   Modo sobreescritura forzada: ${force ? 'SÍ' : 'NO (Skip si ya existe)'}`);
  console.log(`======================================================`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: [
      '--hide-scrollbars',
      '--allow-file-access-from-files',
      '--enable-webgl',
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--enable-unsafe-swiftshader'
    ]
  });

  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    window.__PUPPETEER_CAPTURE__ = true;
  });
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const fileUrl = 'file:///' + templateFile.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);

  const totalExported = [];

  for (let pIdx = 0; pIdx < manifestPaths.length; pIdx++) {
    const fullManifestPath = path.resolve(manifestPaths[pIdx]);
    if (!fs.existsSync(fullManifestPath)) {
      console.warn(`[WARN] No existe manifiesto: ${fullManifestPath}`);
      continue;
    }

    const manifest = JSON.parse(fs.readFileSync(fullManifestPath, 'utf8'));
    const pieceDir = path.join(outBaseDir, manifest.slug);
    if (!fs.existsSync(pieceDir)) fs.mkdirSync(pieceDir, { recursive: true });

    console.log(`\n------------------------------------------------------`);
    console.log(`📌 [PIEZA ${pIdx + 1}/${manifestPaths.length}] ${manifest.title}`);
    console.log(`   Directorio: ${pieceDir}`);
    console.log(`------------------------------------------------------`);

    const brolls = manifest.brolls || [];
    const fps = manifest.fps || 30;

    for (let bIdx = 0; bIdx < brolls.length; bIdx++) {
      const broll = brolls[bIdx];
      const outFile = path.join(pieceDir, `${broll.id}.mp4`);

      if (!force && fs.existsSync(outFile) && fs.statSync(outFile).size > 10000) {
        console.log(`   ⏩ [SKIP] Ya existe "${broll.id}.mp4" (${(fs.statSync(outFile).size / 1024).toFixed(1)} KB)`);
        totalExported.push(outFile);
        continue;
      }

      const duration = broll.duration || 8.0;
      const totalFrames = Math.round(duration * fps);
      const sceneTempDir = path.join(tempDir, `${manifest.slug}_${broll.id}`);

      if (fs.existsSync(sceneTempDir)) fs.rmSync(sceneTempDir, { recursive: true, force: true });
      fs.mkdirSync(sceneTempDir, { recursive: true });

      const theme = (broll.props && broll.props.theme) || 'dark';
      console.log(`   ▶ [B-ROLL ${bIdx + 1}/${brolls.length}] "${broll.id}.mp4" (${broll.type}, ${duration}s, Tema: ${theme})`);

      await page.evaluate(async (sc, meta) => {
        window.__SCENE_META__ = meta;
        if (typeof window.loadScene === 'function') {
          await window.loadScene(sc);
        }
      }, broll, { slug: manifest.slug, title: manifest.title, category: manifest.category, theme });

      for (let frame = 0; frame < totalFrames; frame++) {
        const timeInSec = frame / fps;
        await page.evaluate((t) => {
          if (typeof window.renderFrame === 'function') {
            window.renderFrame(t);
          }
        }, timeInSec);

        const framePath = path.join(sceneTempDir, `frame_${String(frame).padStart(4, '0')}.png`);
        await page.screenshot({ path: framePath, type: 'png' });

        if (frame % 75 === 0 || frame === totalFrames - 1) {
          process.stdout.write(`      → Frame ${frame + 1}/${totalFrames} (${timeInSec.toFixed(2)}s)\n`);
        }
      }

      console.log(`      Codificando MP4 suelto con ffmpeg...`);
      const framePattern = path.join(sceneTempDir, 'frame_%04d.png').replace(/\\/g, '/');
      execSync(`ffmpeg -y -framerate ${fps} -i "${framePattern}" -c:v libx264 -pix_fmt yuv420p -crf 17 -preset fast "${outFile}"`, { stdio: 'ignore' });

      fs.rmSync(sceneTempDir, { recursive: true, force: true });
      totalExported.push(outFile);
      console.log(`      ✔ Generado: ${path.basename(outFile)}`);
    }
  }

  await browser.close();
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });

  console.log(`\n======================================================`);
  console.log(`🎉 FINALIZADO: ${totalExported.length} B-ROLLS LISTOS EN animaciones/output_clips/sedev_brolls/`);
  console.log(`======================================================\n`);

  return totalExported;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const target = args[0] || 'all';

  let manifestsToRender = [];
  if (target === 'all') {
    const files = fs.readdirSync(manifestsDir)
      .filter(f => f.startsWith('sedev_') && f.endsWith('.json'))
      .sort((a, b) => {
        const numA = parseInt(a.match(/sedev_(\d+)/)?.[1] || '0', 10);
        const numB = parseInt(b.match(/sedev_(\d+)/)?.[1] || '0', 10);
        return numA - numB;
      });
    manifestsToRender = files.map(f => path.join(manifestsDir, f));
  } else {
    manifestsToRender = [path.resolve(target)];
  }

  renderStandaloneBrolls(manifestsToRender).catch(err => {
    console.error('Error renderizando B-Rolls:', err);
    process.exit(1);
  });
} else {
  module.exports = renderStandaloneBrolls;
}
