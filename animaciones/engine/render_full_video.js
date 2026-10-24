const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const CacheManager = require('./cache_manager');

async function renderFullVideo(manifestRelativePath, options = {}) {
  const manifestPath = path.resolve(manifestRelativePath);
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`No se encontró el archivo de manifiesto: ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const fps = manifest.fps || 30;
  const scenes = manifest.scenes || [];
  const totalDuration = scenes.reduce((acc, s) => acc + (s.duration || 5.0), 0);

  const templateFile = path.resolve('animaciones/templates/scene_runner.html');
  const cacheDir = path.resolve('animaciones/output_clips/cache');
  const tempDir = path.resolve('animaciones/output_clips/_temp_full_video');
  const debugDir = path.resolve('animaciones/debug_frames');
  const cacheMgr = new CacheManager(cacheDir);

  if (!fs.existsSync(debugDir)) fs.mkdirSync(debugDir, { recursive: true });

  const desktop = 'C:\\Users\\Edixon\\Desktop';
  const finalOutput = manifest.output || path.join(desktop, 'VIDEO_SEDEV_60S.mp4');

  console.log(`\n======================================================`);
  console.log(`🎬 SEDEV 60S FULL VIDEO ENGINE (MODULAR & DETERMINISTA)`);
  console.log(`======================================================`);
  console.log(`• Título:    ${manifest.title}`);
  console.log(`• Duración:  ${totalDuration.toFixed(1)}s (${scenes.length} escenas @ ${fps}fps)`);
  console.log(`• Salida:    ${finalOutput}`);
  if (manifest.audio) console.log(`• Audio VO:  ${manifest.audio}`);

  // Filter scenes if --scene option is passed
  let targetScenes = scenes;
  if (options.sceneIndex !== undefined) {
    targetScenes = [scenes[options.sceneIndex]];
    console.log(`• Filtro:    Solo escena #${options.sceneIndex + 1} (${targetScenes[0].id})`);
  }

  const sceneClips = [];

  // Check cache and identify what needs rendering
  const scenesToRender = [];
  for (let i = 0; i < targetScenes.length; i++) {
    const scene = targetScenes[i];
    const componentPath = path.resolve(`animaciones/templates/components/${scene.type}.js`);
    const hash = cacheMgr.computeSceneHash(scene, templateFile, componentPath);
    const clipPath = cacheMgr.getCachePath(scene, hash);

    if (!options.noCache && cacheMgr.isCached(clipPath)) {
      console.log(`⚡ [CACHE HIT] Escena ${i + 1}/${targetScenes.length} [${scene.id}]`);
      sceneClips.push(clipPath);
    } else {
      scenesToRender.push({ index: i, scene, hash, clipPath });
    }
  }

  // If there are scenes to render, launch Puppeteer
  if (scenesToRender.length > 0) {
    console.log(`\nRenderizando ${scenesToRender.length} escena(s) con Puppeteer...`);
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--hide-scrollbars', '--disable-gpu']
    });

    const page = await browser.newPage();
    await page.evaluateOnNewDocument(() => {
      window.__PUPPETEER_CAPTURE__ = true;
    });
    await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

    const fileUrl = 'file:///' + templateFile.replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);

    for (const item of scenesToRender) {
      const { index, scene, clipPath } = item;
      const duration = scene.duration || 5.0;
      const totalFrames = Math.round(duration * fps);
      const sceneTempDir = path.join(tempDir, `scene_${scene.id}`);

      if (fs.existsSync(sceneTempDir)) fs.rmSync(sceneTempDir, { recursive: true, force: true });
      fs.mkdirSync(sceneTempDir, { recursive: true });

      console.log(`\n▶ [RENDER] Escena ${index + 1}/${targetScenes.length}: "${scene.id}" (${scene.type}, ${duration}s, ${totalFrames} frames)`);

      // Inject scene definition
      await page.evaluate((sc) => {
        window.loadScene(sc);
      }, scene);

      for (let frame = 0; frame < totalFrames; frame++) {
        const timeInSec = frame / fps;

        await page.evaluate((t) => {
          if (typeof window.renderFrame === 'function') {
            window.renderFrame(t);
          }
        }, timeInSec);

        const framePath = path.join(sceneTempDir, `frame_${String(frame).padStart(4, '0')}.png`);
        await page.screenshot({ path: framePath, type: 'png' });

        // Save midpoint frame for QA inspection
        if (frame === Math.round(totalFrames / 2)) {
          const qaPath = path.join(debugDir, `qa_${scene.id}.png`);
          fs.copyFileSync(framePath, qaPath);
        }

        if (frame % 60 === 0 || frame === totalFrames - 1) {
          process.stdout.write(`   → Frame ${frame + 1}/${totalFrames} (${timeInSec.toFixed(2)}s)\n`);
        }
      }

      // Encode scene with FFmpeg
      console.log(`   Codificando clip intermedio: ${path.basename(clipPath)}`);
      const framePattern = path.join(sceneTempDir, 'frame_%04d.png').replace(/\\/g, '/');
      execSync(`ffmpeg -y -framerate ${fps} -i "${framePattern}" -c:v libx264 -pix_fmt yuv420p -crf 17 -preset fast "${clipPath}"`, { stdio: 'ignore' });

      fs.rmSync(sceneTempDir, { recursive: true, force: true });
      sceneClips.push(clipPath);
    }

    await browser.close();
  }

  // Clean temp folder
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });

  // If rendering only a single scene, report its path
  if (options.sceneIndex !== undefined) {
    console.log(`\n✔ Escena individual renderizada: ${sceneClips[0]}`);
    return sceneClips[0];
  }

  // Final Assembly (Concat)
  console.log(`\nUniendo ${sceneClips.length} escenas con FFmpeg...`);
  const concatListFile = path.join(cacheDir, 'concat_list.txt');
  const fileLines = sceneClips.map(clip => `file '${clip.replace(/\\/g, '/')}'`).join('\n');
  fs.writeFileSync(concatListFile, fileLines, 'utf8');

  if (fs.existsSync(finalOutput)) {
    try { fs.unlinkSync(finalOutput); } catch (e) {}
  }

  if (manifest.audio && fs.existsSync(path.resolve(manifest.audio))) {
    const audioPath = path.resolve(manifest.audio);
    console.log(`Muxing audio Voice-Over: ${audioPath}`);
    execSync(`ffmpeg -y -f concat -safe 0 -i "${concatListFile}" -i "${audioPath}" -c:v copy -c:a aac -shortest "${finalOutput}"`, { stdio: 'ignore' });
  } else {
    execSync(`ffmpeg -y -f concat -safe 0 -i "${concatListFile}" -c copy "${finalOutput}"`, { stdio: 'ignore' });
  }

  console.log(`\n======================================================`);
  console.log(`✔ VÍDEO COMPLETO GENERADO CON ÉXITO:`);
  console.log(`  ${finalOutput}`);
  console.log(`======================================================\n`);

  return finalOutput;
}

// CLI Argument parsing
const args = process.argv.slice(2);
const manifestArg = args[0] || 'animaciones/manifests/ejemplo_redis_60s.json';
const options = {};

args.forEach((arg, i) => {
  if (arg === '--scene' && args[i + 1] !== undefined) {
    options.sceneIndex = parseInt(args[i + 1], 10);
  }
  if (arg === '--no-cache') {
    options.noCache = true;
  }
});

renderFullVideo(manifestArg, options).catch((err) => {
  console.error('Error renderizando vídeo:', err);
  process.exit(1);
});
