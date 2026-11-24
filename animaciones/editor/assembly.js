// Final assembly: base timeline + B-roll replacements + transparent overlays
// + ASS captions + voice/SFX mix. One FFmpeg process, atomic output.

const fs = require('fs');
const path = require('path');
const { ensureDir, roundTime, PROJECT_ROOT, sha256 } = require('./utils');
const { buildTimeline, buildBaseVideoGraph } = require('./camera');
const { quotedFilterPath, runFFmpeg, probeMedia, FFMPEG } = require('./ffmpeg');
const { readWavInfo } = require('./sfx_catalog');

function buildSfxInputChains(sfxInputs, lines) {
  const labels = [];
  sfxInputs.forEach((entry, i) => {
    const event = entry.event || {};
    const delayMs = Math.max(0, Math.round(Number(event.at) * 1000));
    const gain = Number(event.gainDb);
    const label = `[sfx${i}]`;
    const filters = [
      'aresample=48000',
      'aformat=sample_fmts=fltp:channel_layouts=stereo'
    ];
    const rawTrim = event.trimSec !== undefined ? Number(event.trimSec) : NaN;
    const hasTrim = Number.isFinite(rawTrim) && rawTrim > 0;
    const rawKnownDur = entry.soundDurationSec !== undefined
      ? Number(entry.soundDurationSec)
      : (event.soundDurationSec !== undefined ? Number(event.soundDurationSec) : NaN);
    const knownDur = Number.isFinite(rawKnownDur) && rawKnownDur > 0 ? rawKnownDur : null;
    const effectiveDur = hasTrim
      ? (knownDur !== null ? Math.min(rawTrim, knownDur) : rawTrim)
      : knownDur;

    if (hasTrim) {
      filters.push(`atrim=start=0:end=${roundTime(effectiveDur, 3)}`, 'asetpts=PTS-STARTPTS');
    }
    const fadeIn = event.fadeInSec !== undefined ? Number(event.fadeInSec) : NaN;
    if (Number.isFinite(fadeIn) && fadeIn > 0) {
      const safeIn = effectiveDur !== null
        ? Math.min(fadeIn, Math.max(0.01, roundTime(effectiveDur * 0.85, 3)))
        : fadeIn;
      filters.push(`afade=t=in:st=0:d=${roundTime(safeIn, 3)}`);
    }
    const fadeOut = event.fadeOutSec !== undefined ? Number(event.fadeOutSec) : NaN;
    if (Number.isFinite(fadeOut) && fadeOut > 0 && effectiveDur !== null && effectiveDur > 0.02) {
      const safeOut = Math.min(fadeOut, effectiveDur);
      const fadeOutStart = Math.max(0, roundTime(effectiveDur - safeOut, 3));
      const actualOutDur = Math.max(0.01, roundTime(effectiveDur - fadeOutStart, 3));
      filters.push(`afade=t=out:st=${fadeOutStart}:d=${actualOutDur}`);
    }
    filters.push(
      `volume=${Number.isFinite(gain) ? gain : -18}dB`,
      `adelay=${delayMs}|${delayMs}`
    );
    lines.push(`[${entry.index}:a]${filters.join(',')}${label}`);
    labels.push(label);
  });
  return labels;
}

function buildAudioGraph({ duration, sfxInputs, voiceInput = 0 }) {
  const lines = [];
  const safeDuration = roundTime(duration, 3);
  lines.push(`[${voiceInput}:a]atrim=start=0:end=${safeDuration},asetpts=PTS-STARTPTS,aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo[voice]`);
  if (!sfxInputs.length) {
    lines.push('[voice]loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000[aout]');
    return { lines, output: '[aout]' };
  }
  const labels = buildSfxInputChains(sfxInputs, lines);
  lines.push(`${labels.join('')}amix=inputs=${labels.length}:normalize=0:duration=longest[sfxbus]`);
  lines.push('[voice]asplit=2[voiceA][voiceKey]');
  lines.push('[sfxbus][voiceKey]sidechaincompress=threshold=0.22:ratio=1.25:attack=25:release=140[sfxduck]');
  lines.push('[voiceA][sfxduck]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000[aout]');
  return { lines, output: '[aout]' };
}

function buildSfxBusGraph({ duration, sfxInputs }) {
  if (!sfxInputs.length) return null;
  const lines = [];
  const labels = buildSfxInputChains(sfxInputs, lines);
  lines.push(`${labels.join('')}amix=inputs=${labels.length}:normalize=0:duration=longest,apad=whole_dur=${roundTime(duration, 3)},atrim=start=0:end=${roundTime(duration, 3)},asetpts=PTS-STARTPTS[sfxbus]`);
  return { lines, output: '[sfxbus]', filterText: `${lines.join(';\n')}\n` };
}

function buildAssemblyGraph({
  duration,
  plan,
  fps = 30,
  width = 1080,
  height = 1920,
  brollInputIndex = {},
  overlayInputs = [],
  sfxInputs = [],
  assPath = null,
  voiceInput = 0
}) {
  const timeline = buildTimeline({
    duration,
    brolls: plan.brolls || [],
    cameras: plan.cameras || []
  });
  const base = buildBaseVideoGraph({ segments: timeline, brollInputIndex, fps, width, height });
  const lines = base.lines.slice();
  let videoLabel = base.output;

  overlayInputs.forEach((entry, i) => {
    const event = entry.event;
    const local = `[ov${i}]`;
    const out = i === overlayInputs.length - 1 ? '[vov]' : `[vov${i}]`;
    lines.push(`[${entry.index}:v]setpts=PTS+${roundTime(event.start, 3)}/TB,format=rgba${local}`);
    lines.push(`${videoLabel}${local}overlay=x=0:y=0:enable='between(t,${roundTime(event.start, 3)},${roundTime(event.end, 3)})':format=auto:eof_action=pass${out}`);
    videoLabel = out;
  });

  if (assPath && fs.existsSync(assPath)) {
    const fontsDir = path.join(PROJECT_ROOT, 'animaciones/assets/fonts');
    const fontsOption = fs.existsSync(fontsDir) ? `:fontsdir=${quotedFilterPath(fontsDir)}` : '';
    lines.push(`${videoLabel}ass=filename=${quotedFilterPath(assPath)}${fontsOption}[vout]`);
    videoLabel = '[vout]';
  }

  const audio = buildAudioGraph({ duration, sfxInputs, voiceInput });
  lines.push(...audio.lines);
  const cameraIds = Array.from(new Set(base.order
    .filter((segment) => segment.kind === 'talk' && segment.camera)
    .map((segment) => segment.camera)));
  return {
    filterText: `${lines.join(';\n')}\n`,
    videoLabel,
    audioLabel: audio.output,
    timeline,
    segmentCount: base.segmentCount,
    order: base.order,
    cameraFilters: {
      ids: cameraIds,
      count: base.order.filter((segment) => segment.kind === 'talk' && segment.camera).length
    }
  };
}

function assembleFinal({
  videoPath,
  plan,
  run,
  fps = 30,
  width = 1080,
  height = 1920,
  brollFiles = [],
  overlayFiles = [],
  sfxFiles = [],
  assPath = null,
  output = null,
  crf = 18,
  logger = console
}) {
  if (!fs.existsSync(videoPath)) throw new Error(`No existe el vídeo de entrada: ${videoPath}`);
  const sourceProbe = probeMedia(videoPath);
  if (!sourceProbe.hasAudio) throw new Error('El vídeo de entrada no tiene pista de audio; el editor necesita la voz.');
  const duration = Number(plan.source && plan.source.duration);
  if (!Number.isFinite(duration) || duration <= 0) throw new Error('El plan no tiene source.duration válida.');
  if (brollFiles.length !== (plan.brolls || []).length) throw new Error('brollFiles no coincide con el plan.');
  if (overlayFiles.length !== (plan.overlays || []).length) throw new Error('overlayFiles no coincide con el plan.');
  if (sfxFiles.length !== (plan.sfx || []).length) throw new Error('sfxFiles no coincide con el plan.');
  for (const file of [...brollFiles, ...overlayFiles, ...sfxFiles]) {
    if (!fs.existsSync(file)) throw new Error(`Falta un asset de montaje: ${file}`);
  }

  const finalOutput = path.resolve(output || run.final);
  ensureDir(path.dirname(finalOutput));
  const staging = finalOutput.replace(/\.mp4$/i, '') + '.editing.mp4';
  ensureDir(run.tempDir);
  // The ASS filter uses FFmpeg's single-quoted option syntax. A path with an
  // apostrophe is valid on Windows but not safely representable in that
  // grammar, so libass reads a hash-named copy from a known-safe directory.
  let effectiveAssPath = assPath;
  let safeAssCopy = null;
  let safeAssCleanup = false;
  if (assPath && fs.existsSync(assPath) && assPath.includes("'")) {
    const safeDir = path.join(PROJECT_ROOT, 'animaciones', 'editor_runs', '_filter_assets');
    ensureDir(safeDir);
    safeAssCopy = path.join(safeDir, `${sha256(path.resolve(assPath)).slice(0, 16)}.ass`);
    fs.copyFileSync(assPath, safeAssCopy);
    effectiveAssPath = safeAssCopy;
    safeAssCleanup = true;
  }
  const graphFile = path.join(run.tempDir, `assembly_${process.pid}.txt`);
  const brollInputIndex = {};
  const inputs = [videoPath];
  (plan.brolls || []).forEach((event, i) => {
    brollInputIndex[event.id] = 1 + i;
    inputs.push(brollFiles[i]);
  });
  const overlayBase = 1 + plan.brolls.length;
  const overlayInputs = (plan.overlays || []).map((event, i) => ({ index: overlayBase + i, event }));
  overlayFiles.forEach((file) => inputs.push(file));
  const sfxDurations = sfxFiles.map((file) => {
    try {
      return readWavInfo(file).duration;
    } catch (err) {
      try {
        const p = probeMedia(file);
        return Number.isFinite(p.duration) && p.duration > 0 ? p.duration : null;
      } catch (probeErr) {
        return null;
      }
    }
  });
  const sfxBase = overlayBase + plan.overlays.length;
  const sfxInputs = (plan.sfx || []).map((event, i) => ({
    index: sfxBase + i,
    event,
    soundDurationSec: sfxDurations[i]
  }));
  sfxFiles.forEach((file) => inputs.push(file));

  const graph = buildAssemblyGraph({
    duration,
    plan,
    fps,
    width,
    height,
    brollInputIndex,
    overlayInputs,
    sfxInputs,
    assPath: effectiveAssPath
  });
  ensureDir(path.dirname(graphFile));
  fs.writeFileSync(graphFile, graph.filterText, 'utf8');

  let sfxBus = null;
  let busGraphFile = null;
  if (sfxInputs.length) {
    ensureDir(run.mixDir);
    sfxBus = path.join(run.mixDir, 'sfx_bus.wav');
    busGraphFile = path.join(run.tempDir, `sfx_bus_${process.pid}.txt`);
    const busGraph = buildSfxBusGraph({
      duration,
      sfxInputs: plan.sfx.map((event, i) => ({
        index: i,
        event,
        soundDurationSec: sfxDurations[i]
      }))
    });
    fs.writeFileSync(busGraphFile, busGraph.filterText, 'utf8');
    const busArgs = ['-y'];
    for (const file of sfxFiles) busArgs.push('-i', file);
    busArgs.push('-filter_complex_script', busGraphFile, '-map', busGraph.output,
      '-t', String(duration), '-ac', '2', '-ar', '48000', sfxBus);
    try {
      runFFmpeg(busArgs, { timeout: 0, maxBuffer: 64 * 1024 * 1024 });
    } finally {
      if (fs.existsSync(busGraphFile)) {
        try { fs.unlinkSync(busGraphFile); } catch (err) { /* best effort */ }
      }
    }
  }

  const args = ['-y'];
  for (const input of inputs) args.push('-i', input);
  args.push(
    '-filter_complex_script', graphFile,
    '-map', graph.videoLabel,
    '-map', graph.audioLabel,
    '-t', String(duration),
    '-r', String(fps),
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', String(crf),
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-ar', '48000',
    '-movflags', '+faststart',
    staging
  );

  logger.info(`Montando ${inputs.length} inputs en un único FFmpeg (${graph.segmentCount} segmentos de vídeo)...`);
  try {
    runFFmpeg(args, { timeout: 0, maxBuffer: 256 * 1024 * 1024 });
    const probe = probeMedia(staging);
    if (!probe.hasVideo || !probe.hasAudio) throw new Error('El MP4 de staging no contiene vídeo y audio.');
    if (Math.abs(probe.duration - duration) > 0.35) {
      throw new Error(`Duración del montaje ${probe.duration}s no coincide con ${duration}s.`);
    }
    // Rename only after the staging file has been verified.
    fs.renameSync(staging, finalOutput);
    return {
      file: finalOutput,
      probe,
      graphFile,
      timeline: graph.timeline,
      segmentCount: graph.timeline.length,
      cameraFilters: graph.cameraFilters,
      sfxBus
    };
  } finally {
    if (fs.existsSync(staging)) {
      try { fs.unlinkSync(staging); } catch (err) { /* best effort */ }
    }
    if (fs.existsSync(graphFile)) {
      try { fs.unlinkSync(graphFile); } catch (err) { /* best effort */ }
    }
    if (safeAssCleanup && safeAssCopy && fs.existsSync(safeAssCopy)) {
      try { fs.unlinkSync(safeAssCopy); } catch (err) { /* best effort */ }
    }
  }
}

module.exports = {
  FFMPEG,
  buildSfxInputChains,
  buildAudioGraph,
  buildSfxBusGraph,
  buildAssemblyGraph,
  assembleFinal
};
