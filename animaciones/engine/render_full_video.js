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
  const fps = Number(manifest.fps || 30);
  if (!Number.isFinite(fps) || fps < 1 || fps > 60) {
    throw new Error(`fps inválido en ${manifestPath}: ${manifest.fps}`);
  }
  const scenes = manifest.scenes || [];
  const totalDuration = scenes.reduce((acc, s) => acc + (s.duration || 5.0), 0);

  // Mirror JSON to JS so player.html loads without CORS when opened via file://
  const jsManifestPath = manifestPath.replace(/\.json$/i, '.js');
  fs.writeFileSync(jsManifestPath, `window.__DEFAULT_MANIFEST__ = ${JSON.stringify(manifest, null, 2)};\n`, 'utf8');

  const templateFile = path.resolve('animaciones/templates/scene_runner.html');
  const manifestBase = path.basename(manifestPath, path.extname(manifestPath));
  const cacheDir = path.resolve('animaciones/output_clips/cache');
  const tempDir = path.resolve(`animaciones/output_clips/_temp_${manifestBase}`);
  const debugDir = path.resolve('animaciones/debug_frames');
  const cacheMgr = new CacheManager(cacheDir);
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });

  if (!fs.existsSync(debugDir)) fs.mkdirSync(debugDir, { recursive: true });

  const defaultOutDir = path.resolve('animaciones/output_clips');
  const finalOutput = path.resolve(manifest.output || path.join(defaultOutDir, 'VIDEO_SEDEV_60S.mp4'));
  const stagingOutput = finalOutput.replace(/\.mp4$/i, '') + '.rendering.mp4';
  const outputDir = path.dirname(finalOutput);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // Never let a previous successful MP4 masquerade as the result of a failed run.
  if (options.sceneIndex === undefined) {
    for (const stale of [finalOutput, stagingOutput]) {
      if (fs.existsSync(stale)) {
        try { fs.unlinkSync(stale); } catch (err) { /* best effort */ }
      }
    }
  }

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

  // Preserve scene order even when some clips come from cache and others are rendered.
  const sceneClips = new Array(targetScenes.length);

  // Check cache and identify what needs rendering
  const scenesToRender = [];
  for (let i = 0; i < targetScenes.length; i++) {
    const scene = targetScenes[i];
    const componentPath = path.resolve(`animaciones/templates/components/${scene.type}.js`);
    const hash = cacheMgr.computeSceneHash(scene, templateFile, componentPath, [], {
      fps,
      engine: 'scene_runner',
      template: 'scene_runner'
    });
    const clipPath = cacheMgr.getCachePath(scene, hash);

    if (!options.noCache && cacheMgr.isCached(clipPath)) {
      console.log(`⚡ [CACHE HIT] Escena ${i + 1}/${targetScenes.length} [${scene.id}]`);
      sceneClips[i] = clipPath;
    } else {
      scenesToRender.push({ index: i, scene, hash, clipPath });
    }
  }

  // If there are scenes to render, launch Puppeteer
  if (scenesToRender.length > 0) {
    console.log(`\nRenderizando ${scenesToRender.length} escena(s) con Puppeteer...`);
    let browser = null;
    try {
    browser = await puppeteer.launch({
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
    const renderErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        renderErrors.push(`console: ${msg.text()}`);
        console.error('   [PAGE CONSOLE ERROR]', msg.text());
      } else {
        console.log('   [PAGE LOG]', msg.text());
      }
    });
    page.on('pageerror', err => {
      renderErrors.push(`pageerror: ${err.toString()}`);
      console.error('   [PAGE ERROR]', err.toString());
    });
    page.on('requestfailed', req => {
      if (!/^data:/i.test(req.url())) {
        renderErrors.push(`requestfailed: ${req.url()} (${req.failure() && req.failure().errorText})`);
      }
    });
    const assertClean = (label) => {
      if (renderErrors.length) {
        browser.close().catch(() => {});
        throw new Error(`${label}: ${renderErrors.join(' | ')}`);
      }
    };
    await page.evaluateOnNewDocument(() => {
      window.__PUPPETEER_CAPTURE__ = true;
    });
    await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

    const fileUrl = 'file:///' + templateFile.replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    const initialFonts = await page.evaluate(async () => {
      if (!window.MotionCore || typeof window.MotionCore.ensureFonts !== 'function') {
        return { ok: false, missing: ['MotionCore.ensureFonts'], reason: 'missing-core' };
      }
      return await window.MotionCore.ensureFonts();
    });
    if (!initialFonts.ok) {
      throw new Error(`Fuentes locales no disponibles antes del primer render: ${JSON.stringify(initialFonts)}`);
    }
    assertClean('Carga inicial');

    for (const item of scenesToRender) {
      const { index, scene, clipPath } = item;
      const duration = Number(scene.duration || 5.0);
      if (!Number.isFinite(duration) || duration < 1.0) {
        throw new Error(`Escena "${scene.id}" con duración inválida (${scene.duration}). Mínimo 1.0s.`);
      }
      const totalFrames = Math.round(duration * fps);
      const sceneTempDir = path.join(tempDir, `scene_${scene.id}`);

      if (fs.existsSync(sceneTempDir)) fs.rmSync(sceneTempDir, { recursive: true, force: true });
      fs.mkdirSync(sceneTempDir, { recursive: true });

      // Deterministic QA captures: opening, first/second beats, settle, close.
      const captureFrames = Array.from(new Set(
        [0.03, 0.16, 0.5, 0.8, 0.96].map((f) => Math.min(totalFrames - 1, Math.round(f * (totalFrames - 1))))
      ));

      console.log(`\n▶ [RENDER] Escena ${index + 1}/${targetScenes.length}: "${scene.id}" (${scene.type}, ${duration}s, ${totalFrames} frames)`);

      // Inject scene definition and wait for assets (3D models, textures, Draco)
      await page.evaluate(async (sc) => {
        if (typeof window.loadScene === 'function') {
          await window.loadScene(sc);
        }
      }, scene);
      const sceneFonts = await page.evaluate(async () => window.MotionCore.ensureFonts());
      if (!sceneFonts.ok) {
        throw new Error(`Fuentes no listas en escena "${scene.id}": ${JSON.stringify(sceneFonts)}`);
      }
      assertClean(`Escena ${scene.id} (carga)`);

      for (let frame = 0; frame < totalFrames; frame++) {
        const timeInSec = frame / fps;

        await page.evaluate((t) => {
          if (typeof window.renderFrame === 'function') {
            window.renderFrame(t);
          }
        }, timeInSec);
        if (renderErrors.length) assertClean(`Escena ${scene.id} frame ${frame}`);

        const framePath = path.join(sceneTempDir, `frame_${String(frame).padStart(4, '0')}.png`);
        await page.screenshot({ path: framePath, type: 'png' });

        // Deterministic QA stills at multiple times (not only the midpoint).
        if (captureFrames.includes(frame)) {
          const timeTag = timeInSec.toFixed(2).replace('.', 'p');
          const qaPath = path.join(debugDir, `qa_${manifestBase}_${scene.id}_t${timeTag}.png`);
          fs.copyFileSync(framePath, qaPath);
        }
        if (frame === Math.round(totalFrames / 2)) {
          const qaPath = path.join(debugDir, `qa_${manifestBase}_${scene.id}.png`);
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
      sceneClips[item.index] = clipPath;
      assertClean(`Escena ${scene.id} (encode)`);
    }

    } finally {
      if (browser && browser.connected) {
        try { await browser.close(); } catch (err) { /* already closed */ }
      }
      if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }

  const orderedClips = sceneClips.filter(Boolean);

  // If rendering only a single scene, report its path
  if (options.sceneIndex !== undefined) {
    console.log(`\n✔ Escena individual renderizada: ${orderedClips[0]}`);
    return orderedClips[0];
  }

  // Final Assembly (Concat)
  console.log(`\nUniendo ${orderedClips.length} escenas con FFmpeg...`);
  const concatListFile = path.join(cacheDir, `concat_${manifestBase}.txt`);
  const fileLines = orderedClips.map(clip => `file '${clip.replace(/\\/g, '/')}'`).join('\n');
  fs.writeFileSync(concatListFile, fileLines, 'utf8');

  try {
    if (manifest.audio && fs.existsSync(path.resolve(manifest.audio))) {
      const audioPath = path.resolve(manifest.audio);
      console.log(`Muxing audio Voice-Over: ${audioPath}`);
      execSync(`ffmpeg -y -f concat -safe 0 -i "${concatListFile}" -i "${audioPath}" -c:v copy -c:a aac -shortest "${stagingOutput}"`, { stdio: 'ignore' });
    } else {
      execSync(`ffmpeg -y -f concat -safe 0 -i "${concatListFile}" -c copy "${stagingOutput}"`, { stdio: 'ignore' });
    }
    fs.renameSync(stagingOutput, finalOutput);
  } finally {
    if (fs.existsSync(stagingOutput)) {
      try { fs.unlinkSync(stagingOutput); } catch (err) { /* best effort */ }
    }
  }

  // Generate synchronized voiceover teleprompter script
  generateVoiceoverScript(manifest, finalOutput);

  console.log(`\n======================================================`);
  console.log(`✔ VÍDEO COMPLETO GENERADO CON ÉXITO:`);
  console.log(`  ${finalOutput}`);
  console.log(`======================================================\n`);

  return finalOutput;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function generateVoiceoverScript(manifest, finalOutput) {
  const baseName = path.basename(finalOutput, path.extname(finalOutput));
  const scriptLocalPath = path.resolve(`animaciones/manifests/guion_${baseName.toLowerCase()}.md`);

  let accumulated = 0;
  const rows = [];
  const fullTextBlocks = [];
  let totalWords = 0;

  (manifest.scenes || []).forEach((scene, i) => {
    const start = accumulated;
    const dur = scene.duration || 5.0;
    const end = start + dur;
    accumulated = end;

    const vo = scene.voiceover || '(Sin locución asignada)';
    const cue = scene.visual_cue || scene.props?.title || scene.id;
    const words = vo.split(/\s+/).filter(Boolean).length;
    totalWords += words;
    const wps = (words / dur).toFixed(1);

    rows.push(`| \`${formatTime(start)} - ${formatTime(end)}\` | ${dur.toFixed(1)}s | ${cue} | *"${vo}"* | ${words} (${wps} pal/s) |`);
    if (scene.voiceover) {
      fullTextBlocks.push(scene.voiceover);
    }
  });

  const totalDuration = accumulated;
  const avgWps = (totalWords / (totalDuration || 1)).toFixed(2);

  const md = `# 🎙️ Guion de Locución Sincronizado
**Título:** ${manifest.title}  
**Duración Total:** ${totalDuration.toFixed(1)}s (${manifest.scenes.length} cortes)  
**Total de Palabras:** ${totalWords} palabras (promedio: ${avgWps} palabras/segundo - ritmo óptimo)  
**Vídeo Asociado:** \`${path.basename(finalOutput)}\`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
${rows.join('\n')}

---

## 📜 Texto Completo para Teleprompter / TTS (Copiar y Pegar)

${fullTextBlocks.join('\n\n')}

---
*Generado automáticamente por SeDev Full-Video Engine*
`;

  fs.writeFileSync(scriptLocalPath, md, 'utf8');
  console.log(`🎙️ Guion de locución sincronizado generado:`);
  console.log(`  → ${scriptLocalPath}`);
}

if (require.main === module) {
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
} else {
  module.exports = renderFullVideo;
}
