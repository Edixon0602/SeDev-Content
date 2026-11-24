// End-to-end orchestrator: inspect -> transcribe -> plan -> assets ->
// subtitles -> assembly -> QA. Every stage leaves reviewable artifacts.

const fs = require('fs');
const path = require('path');
const {
  atomicWriteFile,
  atomicWriteJson,
  ensureDir,
  loggerFrom,
  readJson,
  relPosix,
  runSlug,
  runPaths,
  sha256,
  sha256File,
  stableStringify,
  editorCodeFingerprint,
  PROJECT_ROOT
} = require('./utils');
const {
  assertMediaTools,
  probeMedia
} = require('./ffmpeg');
const {
  readTranscriptFile,
  writeTranscriptFile,
  normalizeTranscript,
  transcriptCacheKey,
  transcriptFingerprint
} = require('./transcript');
const {
  transcribeWithWhisper,
  resolveWhisperConfig
} = require('./whisper');
const { loadCatalog, catalogIds, getSound } = require('./sfx_catalog');
const { ensureSfxCatalogAssets } = require('./auto_sfx_fetcher');
const { resolvePlanMediaAssets } = require('./auto_image_fetcher');
const { validatePlan, planFingerprint, planStats } = require('./plan_schema');
const { planWithLocal } = require('./planner');
const { planMotionWithLocal } = require('./motion_planner');
const { planWithLlm, resolvePlannerMode } = require('./llm_planner');
const { renderAssets } = require('./assets');
const { buildAss } = require('./subtitles');
const { assembleFinal } = require('./assembly');
const { qaFinal } = require('./qa');
const { SceneRenderer } = require('./scene_renderer');
const CacheManager = require('../engine/cache_manager');

const STAGE_TOTAL = 6;

function settingsFingerprint(options, fps) {
  return sha256(stableStringify({
    mode: options.mode || 'talking_head',
    seed: options.seed !== undefined && options.seed !== null ? String(options.seed) : null,
    noSfx: !!options.noSfx,
    noCamera: !!options.noCamera,
    noCaptions: !!options.noCaptions,
    noOverlays: !!options.noOverlays,
    noBrolls: !!options.noBrolls,
    fps,
    crf: options.crf !== undefined ? options.crf : 18,
    planner: options.plannerMode || 'auto',
    whisper: resolveWhisperConfig(options.whisper || {}),
    editorCode: editorCodeFingerprint()
  })).slice(0, 16);
}

function applyControls(plan, options) {
  const copy = JSON.parse(JSON.stringify(plan));
  if (options.mode === 'motion' && !copy.mode) copy.mode = 'motion';
  if (!Array.isArray(copy.brolls)) copy.brolls = [];
  if (!Array.isArray(copy.overlays)) copy.overlays = [];
  if (!Array.isArray(copy.cameras)) copy.cameras = [];
  if (!Array.isArray(copy.sfx)) copy.sfx = [];
  if (!copy.captions || typeof copy.captions !== 'object') {
    copy.captions = { enabled: true, maxCharsPerLine: 32, maxLines: 2, minDuration: 0.8, overBroll: false, highlightWords: [] };
  }
  const forceNoCamera = options.noCamera || copy.mode === 'motion' || options.mode === 'motion';
  const removedBrolls = options.noBrolls ? copy.brolls.map((b) => ({ id: b.id, start: b.start, end: b.end })) : [];
  const removedOverlays = options.noOverlays ? copy.overlays.map((o) => ({ id: o.id, start: o.start, end: o.end })) : [];
  const removedCameras = forceNoCamera ? copy.cameras.map((c) => c.id) : [];
  if (options.noBrolls) copy.brolls = [];
  if (options.noOverlays) copy.overlays = [];
  if (forceNoCamera) copy.cameras = [];
  if (options.noSfx) {
    copy.sfx = [];
  } else {
    copy.sfx = copy.sfx.filter((sfx) => {
      const target = typeof sfx.target === 'string' ? sfx.target : '';
      if (target.startsWith('broll:') && removedBrolls.some((b) => b.id === target.slice(6))) return false;
      if (target.startsWith('overlay:') && removedOverlays.some((o) => o.id === target.slice(8))) return false;
      if (target.startsWith('camera:') && removedCameras.includes(target.slice(7))) return false;
      // Legacy plans without target: remove SFX scheduled inside a removed layer.
      if (!target && options.noBrolls && removedBrolls.some((b) => sfx.at >= b.start && sfx.at < b.end)) return false;
      if (!target && options.noOverlays && removedOverlays.some((o) => sfx.at >= o.start && sfx.at < o.end)) return false;
      return true;
    });
  }
  if (options.noCaptions) copy.captions.enabled = false;
  return copy;
}

function inspectInput(videoPath, options = {}) {
  if (!fs.existsSync(videoPath)) throw new Error(`No existe la entrada: ${videoPath}`);
  const probe = probeMedia(videoPath);
  const isMotion = options.mode === 'motion';
  if (!isMotion && !probe.hasVideo) throw new Error('La entrada no tiene pista de vídeo.');
  if (!probe.hasAudio) {
    throw new Error(isMotion
      ? 'La entrada no tiene pista de audio; el modo motion necesita un voice-over.'
      : 'La entrada no tiene pista de audio; el editor necesita la voz del talking head.');
  }
  if (!Number.isFinite(probe.duration) || probe.duration < 2) {
    throw new Error(`Duración inválida (${probe.duration}s); se espera una entrada de al menos 2s.`);
  }
  if (!isMotion && (!probe.width || !probe.height)) throw new Error('Resolución de entrada inválida.');
  const width = probe.hasVideo && probe.width ? probe.width : 1080;
  const height = probe.hasVideo && probe.height ? probe.height : 1920;
  const fps = Number(options.fps || (probe.hasVideo && probe.fps) || 30);
  if (!Number.isFinite(fps) || fps < 12 || fps > 60) throw new Error(`FPS inválido: ${fps}`);
  return { ...probe, width, height, outputFps: fps };
}

function loadState(run) {
  if (!fs.existsSync(run.state)) return null;
  try { return readJson(run.state); } catch (err) { return null; }
}

function saveState(run, state) {
  state.updatedAt = new Date().toISOString();
  atomicWriteJson(run.state, state);
}

function stageTranscript({ videoPath, probe, run, options, logger, state }) {
  logger.stage(2, STAGE_TOTAL, 'Transcripción');
  const expectedConfig = resolveWhisperConfig(options.whisper || {});
  const expectedKey = transcriptCacheKey({ videoPath, config: expectedConfig });

  // Explicit transcript for offline review/tests; no ASR call.
  if (options.transcriptPath) {
    const transcript = readTranscriptFile(options.transcriptPath, {
      duration: probe.duration,
      source: 'external-transcript',
      provider: 'external'
    });
    transcript.meta = { ...(transcript.meta || {}), external: true, cacheKey: `external:${sha256File(options.transcriptPath).slice(0, 16)}` };
    writeTranscriptFile(run.transcript, transcript);
    logger.info(`Transcript externo validado: ${options.transcriptPath}`);
    state.transcript = { cacheKey: transcript.meta.cacheKey, provider: 'external' };
    saveState(run, state);
    return { transcript, cached: false, provider: 'external', cacheKey: transcript.meta.cacheKey };
  }

  if (options.resume && !options.force && fs.existsSync(run.transcript)) {
    try {
      const transcript = readTranscriptFile(run.transcript, { duration: probe.duration });
      const key = transcript.meta && transcript.meta.cacheKey;
      if (key === expectedKey || (key && String(key).startsWith('external:'))) {
        logger.info(`Transcript reutilizado (resume): ${run.transcript}`);
        state.transcript = { cacheKey: key, provider: transcript.provider || 'cached' };
        saveState(run, state);
        return { transcript, cached: true, provider: transcript.provider, cacheKey: key };
      }
    } catch (err) {
      logger.warn(`El transcript previo no es válido (${err.message}); se vuelve a transcribir.`);
    }
  }

  if (typeof options.transcribe === 'function') {
    const produced = options.transcribe({ videoPath, duration: probe.duration, runDir: run.runDir, logger });
    const raw = produced && produced.transcript ? produced.transcript : produced;
    const transcript = normalizeTranscript(raw, {
      duration: probe.duration,
      source: 'injected',
      provider: 'injected'
    });
    transcript.meta = { ...(transcript.meta || {}), cacheKey: expectedKey };
    writeTranscriptFile(run.transcript, transcript);
    state.transcript = { cacheKey: expectedKey, provider: 'injected' };
    saveState(run, state);
    return { transcript, cached: false, provider: 'injected', cacheKey: expectedKey };
  }

  const result = transcribeWithWhisper({
    videoPath,
    duration: probe.duration,
    runDir: run.runDir,
    options: {
      ...(options.whisper || {}),
      force: !!options.force,
      root: options.projectRoot || PROJECT_ROOT
    },
    logger
  });
  const transcript = result.transcript;
  writeTranscriptFile(run.transcript, transcript);
  state.transcript = { cacheKey: result.cacheKey, provider: result.provider };
  saveState(run, state);
  return result;
}

function planInputKey(transcript, planOptions, config) {
  return sha256(stableStringify({
    mode: planOptions.mode || 'talking_head',
    seed: planOptions.seed !== undefined && planOptions.seed !== null ? String(planOptions.seed) : null,
    transcript: transcriptFingerprint(transcript),
    duration: transcript.meta && transcript.meta.duration,
    controls: {
      noSfx: !!planOptions.noSfx,
      noCamera: !!planOptions.noCamera,
      noCaptions: !!planOptions.noCaptions,
      noOverlays: !!planOptions.noOverlays,
      noBrolls: !!planOptions.noBrolls
    },
    planner: planOptions.plannerMode,
    model: config ? config.model : null
  })).slice(0, 24);
}

async function stagePlan({ transcript, probe, run, options, logger, state, catalog }) {
  logger.stage(3, STAGE_TOTAL, 'Plan editorial');
  const requestedMode = options.mode || 'talking_head';
  const source = {
    video: path.resolve(options.video),
    duration: probe.duration,
    width: probe.width,
    height: probe.height,
    fps: probe.outputFps,
    hash: state.video.hash
  };
  const sfxIds = catalogIds(catalog);

  // A reviewed plan always wins; controls still mask disabled layers.
  if (options.planPath) {
    if (!fs.existsSync(options.planPath)) throw new Error(`No existe el plan indicado: ${options.planPath}`);
    let raw;
    try {
      raw = readJson(options.planPath);
    } catch (err) {
      throw new Error(`El plan indicado no es JSON válido: ${err.message}`);
    }
    const declaredHash = raw.source && raw.source.hash;
    if (!options.allowFixturePlan) {
      if (!declaredHash || typeof declaredHash !== 'string') {
        throw new Error('El plan revisado no declara source.hash; usa --allow-fixture-plan solo para fixtures/tests.');
      }
      if (declaredHash !== state.video.hash) {
        throw new Error('source.hash del plan no coincide con la entrada actual. Vuelve a planificar o usa --allow-fixture-plan solo para fixtures/tests.');
      }
    }
    const effectiveMode = raw.mode || requestedMode;
    const controlled = applyControls(raw, { ...options, mode: effectiveMode });
    const plan = validatePlan(controlled, {
      duration: probe.duration,
      sfxIds,
      videoPath: options.video,
      mode: effectiveMode,
      allowLegacyCopy: !!options.allowFixturePlan
    });
    // The measured input is authoritative even for a hand-reviewed plan.
    plan.source = {
      ...plan.source,
      video: path.resolve(options.video),
      duration: probe.duration,
      width: probe.width,
      height: probe.height,
      fps: probe.outputFps,
      hash: state.video.hash
    };
    atomicWriteJson(run.plan, plan);
    logger.info(`Plan revisado cargado y validado: ${options.planPath}`);
    state.plan = { inputKey: `external:${sha256(planFingerprint(plan)).slice(0, 16)}`, hash: sha256(planFingerprint(plan)), source: 'external' };
    saveState(run, state);
    return plan;
  }

  const resolved = resolvePlannerMode(options.plannerMode || 'auto', options.env || process.env);
  const key = planInputKey(transcript, options, resolved.config);

  if (options.resume && fs.existsSync(run.plan) && state.plan && state.plan.inputKey === key) {
    try {
      const existing = applyControls(readJson(run.plan), options);
      const plan = validatePlan(existing, { duration: probe.duration, sfxIds, videoPath: options.video, mode: requestedMode });
      logger.info(`Plan reutilizado (resume): ${run.plan}`);
      state.plan = { ...state.plan, hash: sha256(planFingerprint(plan)) };
      saveState(run, state);
      return plan;
    } catch (err) {
      logger.warn(`El plan previo no es válido (${err.message}); se vuelve a planificar.`);
    }
  }

  const planOptions = {
    mode: requestedMode,
    seed: options.seed,
    audioHash: state.video.hash,
    recordStyleHistory: options.recordStyleHistory !== false,
    styleHistoryPath: options.styleHistoryPath,
    noSfx: !!options.noSfx,
    noCamera: requestedMode === 'motion' ? true : !!options.noCamera,
    noCaptions: !!options.noCaptions,
    noOverlays: !!options.noOverlays,
    noBrolls: !!options.noBrolls,
    plannerMode: resolved.mode,
    sfxCatalog: catalog,
    maxBrolls: options.maxBrolls,
    maxOverlays: options.maxOverlays,
    maxCameras: options.maxCameras
  };
  let plan;
  if (typeof options.planFn === 'function') {
    plan = options.planFn(transcript, source, { ...planOptions, config: resolved.config });
    plan = validatePlan(applyControls(plan, options), { duration: probe.duration, sfxIds, videoPath: options.video, mode: requestedMode });
  } else if (requestedMode === 'motion') {
    logger.info(`Planificando en modo motion (seed=${options.seed || state.video.hash.slice(0, 16)})...`);
    plan = planMotionWithLocal(transcript, source, planOptions);
    plan = validatePlan(applyControls(plan, options), {
      duration: probe.duration,
      sfxIds,
      videoPath: options.video,
      mode: 'motion',
      strictCopy: true,
      transcriptText: transcript.text
    });
  } else if (resolved.mode === 'llm') {
    logger.info(`Planificando con LLM (${resolved.config.model}) en ${resolved.config.baseUrl}`);
    plan = await planWithLlm({
      transcript,
      source,
      config: resolved.config,
      sfxCatalog: catalog,
      fetchImpl: options.fetchImpl
    });
    plan = validatePlan(applyControls(plan, options), { duration: probe.duration, sfxIds, videoPath: options.video });
  } else {
    logger.info('Planificando con planner determinista local (sin red).');
    plan = planWithLocal(transcript, source, planOptions);
    plan = validatePlan(applyControls(plan, options), { duration: probe.duration, sfxIds, videoPath: options.video });
  }
  atomicWriteJson(run.plan, plan);
  state.plan = { inputKey: key, hash: sha256(planFingerprint(plan)), source: resolved.mode };
  saveState(run, state);
  const stats = planStats(plan);
  logger.info(`Plan validado: ${stats.brolls} B-roll(s), ${stats.overlays} overlay(s), ${stats.cameras} cámara(s), ${stats.sfx} SFX.`);
  return plan;
}

async function stageAssets({ plan, probe, run, options, logger, state }) {
  logger.stage(4, STAGE_TOTAL, 'Generación de assets');
  ensureDir(run.assetsDir);
  ensureDir(run.rendersDir);
  ensureDir(run.manifestsDir);
  if (!plan.brolls.length && !plan.overlays.length) {
    logger.info('El plan no pide assets visuales; se omite el render.');
    state.assets = { count: 0 };
    saveState(run, state);
    return [];
  }
  const cacheManager = new CacheManager(run.cacheDir, { projectRoot: options.projectRoot || PROJECT_ROOT });
  const resolvedMedia = await resolvePlanMediaAssets(plan, run, {
    logger,
    noCache: !!options.noCache,
    forceOffline: options.forceOffline !== undefined ? options.forceOffline : process.env.SEDEV_FORCE_OFFLINE === '1'
  });
  const renderer = new SceneRenderer({
    chromePath: options.chromePath,
    tempRoot: run.tempDir,
    logger
  });
  try {
    const results = await renderAssets(plan, run, {
      fps: probe.outputFps,
      renderer,
      cacheManager,
      resolvedMedia,
      noCache: !!options.noCache,
      crf: options.crf !== undefined ? options.crf : 18,
      captureDir: path.join(run.qaFrames, 'assets'),
      logger
    });
    state.assets = { count: results.length, rendered: results.filter((r) => !r.cached).length, cached: results.filter((r) => r.cached).length };
    saveState(run, state);
    return results;
  } finally {
    await renderer.close();
  }
}

function stageSubtitles({ transcript, plan, run, logger, state }) {
  logger.stage(5, STAGE_TOTAL, 'Subtítulos ASS');
  if (!plan.captions || plan.captions.enabled === false) {
    logger.info('Subtítulos desactivados por el plan.');
    state.subtitles = { enabled: false };
    saveState(run, state);
    return null;
  }
  const ass = buildAss(transcript, plan, { duration: plan.source.duration });
  if (!/\nDialogue:\s/.test(ass)) {
    logger.warn('No quedaron palabras para subtitular fuera de los B-rolls.');
  }
  atomicWriteFile(run.subtitles, ass);
  const cues = (ass.match(/\nDialogue:\s/g) || []).length;
  logger.info(`subtitles.ass escrito (${cues} cues).`);
  state.subtitles = { enabled: true, cues };
  saveState(run, state);
  return run.subtitles;
}

async function runEditorPipeline(options = {}) {
  const logger = options.logger || loggerFrom('editor');
  const videoPath = options.video ? path.resolve(options.video) : '';
  if (!videoPath) throw new Error('Falta la ruta del vídeo. Uso: npm run edit:auto -- <video> [opciones]');
  if (!fs.existsSync(videoPath)) throw new Error(`No existe el vídeo: ${videoPath}`);
  if (options.out && path.resolve(options.out) === videoPath) {
    throw new Error('--out no puede ser el mismo archivo que la entrada.');
  }

  logger.stage(1, STAGE_TOTAL, 'Inspección de entrada');
  assertMediaTools();
  const probe = inspectInput(videoPath, options);
  if (probe.hasVideo && probe.width > probe.height && options.mode !== 'motion') {
    logger.warn('La entrada es horizontal; se recortará a 1080x1920.');
  }
  const run = runPaths(videoPath, {
    runDir: options.runDir,
    final: options.out,
    projectRoot: options.projectRoot || PROJECT_ROOT
  });
  for (const dir of [run.runDir, run.sourceDir, run.manifestsDir, run.assetsDir, run.rendersDir, run.mixDir, path.dirname(run.qaFrames)]) {
    ensureDir(dir);
  }
  const sourceHash = sha256File(videoPath);
  const stat = fs.statSync(videoPath);
  logger.info(`Entrada: ${videoPath}`);
  logger.info(`${probe.width}x${probe.height} · ${probe.outputFps.toFixed(2)} fps · ${probe.duration.toFixed(2)}s · video=${probe.videoCodec || 'bed-motion'} audio=${probe.audioCodec}`);
  logger.info(`Run: ${run.runDir}`);
  logger.info(`Salida: ${run.final}`);

  let state = loadState(run) || {
    version: 1,
    slug: run.slug,
    video: { path: videoPath, size: stat.size, mtimeMs: stat.mtimeMs, duration: probe.duration, hash: sourceHash },
    settings: { fingerprint: settingsFingerprint(options, probe.outputFps) },
    stages: {},
    status: 'running'
  };
  if (options.resume && state.video && state.video.hash && state.video.hash !== sourceHash) {
    throw new Error('La entrada cambió desde la ejecución anterior. Quita --resume o usa otro run-dir.');
  }
  if (options.resume && state.settings && state.settings.fingerprint && state.settings.fingerprint !== settingsFingerprint(options, probe.outputFps)) {
    throw new Error('Las opciones cambiaron desde la ejecución anterior. Quita --resume para aplicar los nuevos controles.');
  }
  state.status = 'running';
  delete state.error;
  state.video = { path: videoPath, size: stat.size, mtimeMs: stat.mtimeMs, duration: probe.duration, hash: sourceHash };
  state.settings = { fingerprint: settingsFingerprint(options, probe.outputFps), crf: options.crf !== undefined ? options.crf : 18 };
  saveState(run, state);

  const catalog = options.sfxCatalogPath
    ? loadCatalog(options.sfxCatalogPath)
    : ensureSfxCatalogAssets();
  try {
    const transcriptResult = stageTranscript({ videoPath, probe, run, options, logger, state });
    const transcript = transcriptResult.transcript;

    const plan = await stagePlan({ transcript, probe, run, options, logger, state, catalog });
    if (options.planOnly) {
      state.status = 'plan-only';
      saveState(run, state);
      logger.info('Modo --plan-only: se detiene antes de renderizar.');
      logger.info(`Transcript: ${run.transcript}`);
      logger.info(`Plan:       ${run.plan}`);
      return {
        ok: true,
        planOnly: true,
        runDir: run.runDir,
        transcriptPath: run.transcript,
        planPath: run.plan,
        plan,
        transcript,
        stats: planStats(plan)
      };
    }

    const assets = await stageAssets({ plan, probe, run, options, logger, state });
    const assPath = stageSubtitles({ transcript, plan, run, logger, state });

    logger.stage(6, STAGE_TOTAL, 'Montaje y mezcla');
    const byId = new Map(assets.map((entry) => [entry.event.id, entry.file]));
    const brollFiles = plan.brolls.map((event) => byId.get(event.id));
    const overlayFiles = plan.overlays.map((event) => byId.get(event.id));
    const sfxFiles = plan.sfx.map((event) => {
      const sound = getSound(catalog, event.sound);
      if (!sound) throw new Error(`SFX inexistente en catálogo: ${event.sound}`);
      return sound.file;
    });
    for (const file of [...brollFiles, ...overlayFiles]) {
      if (!file || !fs.existsSync(file)) throw new Error('Un asset visual del plan no se generó correctamente.');
    }
    const assembly = assembleFinal({
      videoPath,
      plan,
      run,
      fps: probe.outputFps,
      width: 1080,
      height: 1920,
      brollFiles,
      overlayFiles,
      sfxFiles,
      assPath,
      output: run.final,
      crf: options.crf !== undefined ? options.crf : 18,
      logger
    });
    state.stages.assembly = { file: relPosix(run.runDir, assembly.file), segments: assembly.segmentCount };
    saveState(run, state);

    logger.info('QA final...');
    const overlayEntries = assets.filter((entry) => entry.kind === 'overlay').map((entry) => ({ file: entry.file, event: entry.event }));
    const qa = qaFinal({
      finalPath: assembly.file,
      plan,
      run,
      transcript,
      overlayFiles: overlayEntries,
      sfxFiles,
      sfxBus: assembly.sfxBus,
      assembly,
      videoPath,
      fps: probe.outputFps,
      logger
    });
    state.status = qa.ok ? 'completed' : 'qa-failed';
    if (qa.ok) delete state.error;
    state.qa = { ok: qa.ok, file: relPosix(run.runDir, run.qa), checks: qa.checks };
    saveState(run, state);

    logger.info(`Final: ${assembly.file}`);
    if (qa.contactSheet) logger.info(`Hoja de contactos: ${path.join(run.runDir, qa.contactSheet)}`);
    return {
      ok: qa.ok,
      runDir: run.runDir,
      transcriptPath: run.transcript,
      planPath: run.plan,
      finalPath: assembly.file,
      qaPath: run.qa,
      qa,
      plan,
      transcript,
      assets,
      stats: planStats(plan)
    };
  } catch (err) {
    state.status = 'failed';
    state.error = err.message;
    try { saveState(run, state); } catch (stateErr) { /* never mask the original error */ }
    throw err;
  }
}

module.exports = {
  STAGE_TOTAL,
  applyControls,
  inspectInput,
  planInputKey,
  settingsFingerprint,
  runEditorPipeline
};
