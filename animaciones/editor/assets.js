// Plan -> SeDev manifests/scenes -> rendered assets.
// Manifests are written per asset so an edit can be reviewed or re-rendered
// with the existing engine without re-running transcription/planning.

const path = require('path');
const { atomicWriteJson, ensureDir, roundTime } = require('./utils');
const { probeMedia } = require('./ffmpeg');
const { resolvePlanMediaAssets } = require('./auto_image_fetcher');

function sanitizeId(value) {
  return String(value || 'asset').replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 64) || 'asset';
}

function brollScene(event, fps, resolved = {}) {
  const duration = roundTime(event.end - event.start);
  const props = {
    ...(event.props || {}),
    cameraMode: 'steady'
  };
  if (resolved.image) props._resolvedImage = resolved.image;
  if (resolved.logos) props._resolvedLogos = resolved.logos;
  return {
    id: sanitizeId(event.id),
    type: event.component || 'editorial_explainer',
    duration,
    theme: event.props && event.props.ground === 'ivory' ? 'light' : 'dark',
    props
  };
}

function overlayScene(event, resolved = {}) {
  const duration = roundTime(event.end - event.start);
  const props = {
    style: event.style || 'editorial',
    text: event.text,
    accent: event.accent || '#d08a5a',
    position: event.position || 'middle'
  };
  if (event.icon) props.icon = event.icon;
  if (event.badge) props.badge = event.badge;
  if (event.subtext) props.subtext = event.subtext;
  if (event.highlight) props.highlight = event.highlight;
  if (event.items) props.items = event.items;
  if (event.logos) props.logos = event.logos;
  if (resolved.image) props._resolvedImage = resolved.image;
  if (resolved.logos) props._resolvedLogos = resolved.logos;
  return {
    id: sanitizeId(event.id),
    type: 'overlay_editorial',
    duration,
    props
  };
}

function stripHeavyDataUris(scene) {
  if (!scene || !scene.props) return scene;
  const props = { ...scene.props };
  if (props._resolvedImage) props._resolvedImage = '[resolved-data-uri]';
  if (Array.isArray(props._resolvedLogos)) {
    props._resolvedLogos = props._resolvedLogos.map((l) => ({ slug: l.slug, name: l.name, source: l.source }));
  }
  return { ...scene, props };
}

function buildBrollManifest(plan, scene, meta = {}) {
  const cleanScene = stripHeavyDataUris(scene);
  return {
    slug: meta.slug || 'editorial_run',
    title: meta.title || `B-roll ${scene.id}`,
    category: 'EDITORIAL',
    fps: Number(meta.fps || 30),
    output: meta.output || '',
    scenes: [cleanScene],
    brolls: [cleanScene]
  };
}

function buildOverlayManifest(plan, scene, meta = {}) {
  return {
    slug: meta.slug || 'editorial_run',
    title: meta.title || `Overlay ${scene.id}`,
    fps: Number(meta.fps || 30),
    alpha: true,
    overlay: stripHeavyDataUris(scene)
  };
}

function writeAssetManifests(plan, run, options = {}) {
  ensureDir(run.manifestsDir);
  const fps = Number(options.fps || 30);
  const meta = { slug: run.slug, fps };
  const resolvedMedia = options.resolvedMedia || { brolls: new Map(), overlays: new Map() };
  const entries = [];
  for (const event of plan.brolls || []) {
    const resolved = resolvedMedia.brolls ? (resolvedMedia.brolls.get(event.id) || {}) : {};
    const scene = brollScene(event, fps, resolved);
    const file = path.join(run.manifestsDir, `broll_${sanitizeId(event.id)}.json`);
    const output = path.join(run.rendersDir, `broll_${sanitizeId(event.id)}.mp4`);
    atomicWriteJson(file, buildBrollManifest(plan, scene, { ...meta, output }));
    entries.push({ kind: 'broll', event, scene, manifest: file, output });
  }
  for (const event of plan.overlays || []) {
    const resolved = resolvedMedia.overlays ? (resolvedMedia.overlays.get(event.id) || {}) : {};
    const scene = overlayScene(event, resolved);
    const file = path.join(run.manifestsDir, `overlay_${sanitizeId(event.id)}.json`);
    const output = path.join(run.rendersDir, `overlay_${sanitizeId(event.id)}.mov`);
    atomicWriteJson(file, buildOverlayManifest(plan, scene, meta));
    entries.push({ kind: 'overlay', event, scene, manifest: file, output });
  }
  return entries;
}

async function renderAssets(plan, run, options = {}) {
  const fps = Number(options.fps || 30);
  const renderer = options.renderer;
  const cacheManager = options.cacheManager;
  const logger = options.logger || console;
  if (!renderer || !cacheManager) throw new Error('renderAssets requiere renderer y cacheManager.');

  ensureDir(run.rendersDir);
  ensureDir(run.assetsDir);
  const resolvedMedia = options.resolvedMedia || await resolvePlanMediaAssets(plan, run, {
    logger,
    noCache: !!options.noCache,
    forceOffline: options.forceOffline !== undefined ? options.forceOffline : process.env.SEDEV_FORCE_OFFLINE === '1'
  });
  const entries = writeAssetManifests(plan, run, { fps, resolvedMedia });
  const results = [];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const label = entry.kind === 'broll'
      ? `B-roll ${i + 1}/${entries.length} · ${entry.scene.id}`
      : `Overlay ${i + 1}/${entries.length} · ${entry.scene.id}`;
    logger.info(`${label} (${entry.scene.duration}s)`);
    let result;
    if (entry.kind === 'broll') {
      result = await renderer.renderSceneToMp4(entry.scene, entry.output, {
        fps,
        cacheManager,
        noCache: options.noCache,
        crf: options.crf,
        captureDir: options.captureDir,
        captureTimes: [
          { time: Math.min(0.15, entry.scene.duration * 0.1), label: 'start' },
          { time: entry.scene.duration * 0.55, label: 'settle' },
          { time: Math.max(0, entry.scene.duration - 0.1), label: 'close' }
        ],
        meta: {
          slug: run.slug,
          title: `SeDev editorial · ${entry.scene.id}`,
          category: 'EDITORIAL',
          theme: entry.scene.theme
        }
      });
    } else {
      result = await renderer.renderOverlayToMov(entry.scene, entry.output, {
        fps,
        cacheManager,
        noCache: options.noCache
      });
    }
    const probe = probeMedia(entry.output);
    if (!probe.hasVideo || probe.duration < entry.scene.duration - 0.12) {
      throw new Error(`Asset ${entry.scene.id} incompleto: ${probe.duration}s < ${entry.scene.duration}s`);
    }
    results.push({ ...entry, ...result, probe });
    logger.info(`  ${result.cached ? 'cache' : 'render'} · ${entry.output} (${probe.duration.toFixed(2)}s)`);
  }
  return results;
}

module.exports = {
  sanitizeId,
  brollScene,
  overlayScene,
  buildBrollManifest,
  buildOverlayManifest,
  writeAssetManifests,
  renderAssets
};
