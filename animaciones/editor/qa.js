// Post-render QA. It measures the real MP4 and the real overlay alpha; it
// never marks a run as successful based on the plan alone.

const fs = require('fs');
const path = require('path');
const { atomicWriteJson, ensureDir, relPosix, sha256File } = require('./utils');
const {
  probeMedia,
  extractFrame,
  alphaAverage,
  audioRmsDb,
  frameVariance,
  escapeConcatPath,
  run,
  FFMPEG,
  runFFmpeg
} = require('./ffmpeg');

function makeContactSheet(images, outFile, columns = 3) {
  if (!images.length) return null;
  ensureDir(path.dirname(outFile));
  const listFile = outFile.replace(/\.jpg$/i, '.txt');
  const cols = Math.max(1, Math.min(columns, images.length));
  const rows = Math.max(1, Math.ceil(images.length / cols));
  const lines = [];
  for (const image of images) {
    lines.push(`file '${escapeConcatPath(image)}'`);
    lines.push('duration 1');
  }
  lines.push(`file '${escapeConcatPath(images[images.length - 1])}'`);
  fs.writeFileSync(listFile, lines.join('\n'), 'utf8');
  try {
    runFFmpeg([
      '-y', '-f', 'concat', '-safe', '0', '-i', listFile,
      '-vf', `scale=270:480:force_original_aspect_ratio=decrease,pad=270:480:(ow-iw)/2:(oh-ih)/2:color=0x111111,tile=${cols}x${rows}:padding=8:margin=8`,
      '-frames:v', '1', '-vsync', '0', outFile
    ]);
    return outFile;
  } finally {
    if (fs.existsSync(listFile)) {
      try { fs.unlinkSync(listFile); } catch (err) { /* best effort */ }
    }
  }
}

function collectFrameTimes(plan, duration) {
  const points = [];
  const add = (time, label) => {
    const t = Math.max(0, Math.min(duration - 0.05, Number(time)));
    if (Number.isFinite(t)) points.push({ time: t, label });
  };
  add(0.08, 'opening');
  for (const broll of plan.brolls || []) {
    add(broll.start - 0.2, `before_${broll.id}`);
    add((broll.start + broll.end) / 2, `during_${broll.id}`);
    add(broll.end + 0.2, `after_${broll.id}`);
  }
  for (const overlay of plan.overlays || []) {
    add(overlay.start - 0.15, `overlay_before_${overlay.id}`);
    add((overlay.start + overlay.end) / 2, `overlay_${overlay.id}`);
    add(overlay.end + 0.15, `overlay_after_${overlay.id}`);
  }
  for (const camera of plan.cameras || []) {
    add(camera.start - 0.12, `camera_before_${camera.id}`);
    add((camera.start + camera.end) / 2, `camera_during_${camera.id}`);
    add(camera.end + 0.12, `camera_after_${camera.id}`);
  }
  add(duration - 0.12, 'close');
  const seen = new Set();
  return points.filter((point) => {
    if (seen.has(point.label)) return false;
    seen.add(point.label);
    return true;
  });
}

function inAnyInterval(time, intervals) {
  return (intervals || []).some((event) => time >= event.start && time < event.end);
}

function normalizeToken(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]/gu, '');
}

function findTranscriptAnchor(words, text) {
  if (!Array.isArray(words) || !text) return null;
  const target = String(text).split(/\s+/).map(normalizeToken).filter(Boolean);
  if (!target.length) return null;
  const normalized = words.map((word) => normalizeToken(word.word));
  let best = null;
  for (let i = 0; i + target.length <= normalized.length; i++) {
    let hit = true;
    for (let j = 0; j < target.length; j++) {
      if (normalized[i + j] !== target[j]) { hit = false; break; }
    }
    if (hit) {
      best = {
        start: words[i].start,
        end: words[i + target.length - 1].end
      };
      break;
    }
  }
  if (best) return best;
  for (let i = 0; i < normalized.length; i++) {
    if (normalized[i] === target[0]) {
      return { start: words[i].start, end: words[Math.min(words.length - 1, i + target.length - 1)].end };
    }
  }
  return null;
}

function assDialogueCount(file) {
  if (!file || !fs.existsSync(file)) return 0;
  const text = fs.readFileSync(file, 'utf8');
  return (text.match(/^Dialogue:\s/gm) || []).length;
}

function framesDiffer(a, b) {
  if (!a || !b || !fs.existsSync(a) || !fs.existsSync(b)) return false;
  return sha256File(a) !== sha256File(b);
}

function frameSimilarity(a, b) {
  if (!a || !b || !fs.existsSync(a) || !fs.existsSync(b)) return null;
  const result = run(FFMPEG, [
    '-hide_banner', '-loglevel', 'info',
    '-i', a, '-i', b,
    '-lavfi', '[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920[a];[1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920[b];[a][b]ssim',
    '-f', 'null', '-'
  ], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  const match = /All:([0-9.]+)/.exec(`${result.stderr || ''}${result.stdout || ''}`);
  return result.status === 0 && match ? Number(match[1]) : null;
}

function sourceChanged(sourceFrame, finalFrame) {
  const similarity = frameSimilarity(sourceFrame, finalFrame);
  return similarity !== null && similarity < 0.985;
}

function qaFinal({
  finalPath,
  plan,
  run,
  transcript = null,
  overlayFiles = [],
  sfxFiles = [],
  sfxBus = null,
  assembly = null,
  videoPath = null,
  fps = 30,
  logger = console
}) {
  const duration = Number(plan.source && plan.source.duration);
  const report = {
    version: 2,
    ok: false,
    final: path.resolve(finalPath),
    plan: {
      duration,
      brolls: (plan.brolls || []).length,
      overlays: (plan.overlays || []).length,
      cameras: (plan.cameras || []).length,
      sfx: (plan.sfx || []).length
    },
    probe: null,
    checks: {},
    notApplicable: [],
    unverified: [],
    limitations: [],
    overlayAlpha: [],
    layering: { brolls: [], overlays: [], cameras: [] },
    captions: null,
    audio: {},
    frames: [],
    contactSheet: null,
    errors: []
  };
  const markNotApplicable = (name) => {
    report.checks[name] = null;
    report.notApplicable.push(name);
  };
  try {
    if (!fs.existsSync(finalPath)) throw new Error('No existe el MP4 final.');
    const probe = probeMedia(finalPath);
    report.probe = probe;
    report.checks.exists = true;
    report.checks.size = probe.size > 10000;
    report.checks.videoCodec = probe.videoCodec === 'h264';
    report.checks.pixFmt = probe.pixFmt === 'yuv420p';
    report.checks.dimensions = probe.width === 1080 && probe.height === 1920;
    report.checks.fps = Math.abs(probe.fps - fps) < 0.02;
    report.checks.duration = Math.abs(probe.duration - duration) <= 0.35;
    report.checks.audioCodec = probe.audioCodec === 'aac';
    report.checks.audioStream = probe.hasAudio === true;

    // Overlay assets are checked for real alpha, never assumed from the plan.
    if ((plan.overlays || []).length === 0) {
      markNotApplicable('overlayAssets');
      markNotApplicable('overlayAlpha');
    } else {
      const expected = plan.overlays.length;
      if (overlayFiles.length !== expected) {
        report.checks.overlayAssets = false;
        report.unverified.push('overlay assets: el número de renders no coincide con el plan');
      }
      for (let i = 0; i < overlayFiles.length; i++) {
        const entry = overlayFiles[i];
        const file = typeof entry === 'string' ? entry : entry.file;
        const event = typeof entry === 'string' ? plan.overlays[i] : entry.event;
        const item = { id: event ? event.id : null, file: path.basename(file), ok: false };
        try {
          const probeOverlay = probeMedia(file);
          item.codec = probeOverlay.videoCodec;
          item.pixFmt = probeOverlay.pixFmt;
          item.duration = probeOverlay.duration;
          const mid = event ? (event.end - event.start) / 2 : Math.max(0.1, probeOverlay.duration / 2);
          item.alphaMid = alphaAverage(file, mid);
          const lastTime = Math.max(0, probeOverlay.duration - (1 / (probeOverlay.fps || 30)));
          item.alphaLast = alphaAverage(file, lastTime);
          item.ok = probeOverlay.videoCodec === 'qtrle' && probeOverlay.pixFmt === 'argb' &&
            item.alphaMid !== null && item.alphaMid > 1.0 &&
            item.alphaLast !== null && item.alphaLast < 1;
        } catch (err) {
          item.error = err.message;
        }
        report.overlayAlpha.push(item);
      }
      report.checks.overlayAssets = overlayFiles.length === expected && report.overlayAlpha.every((item) => item.ok);
      report.checks.overlayAlpha = report.checks.overlayAssets;
    }

    // Audio: voice present, SFX bus present, final window active, delta/control.
    const voiceDb = audioRmsDb(finalPath, Math.min(0.4, Math.max(0, duration - 0.6)), 0.35);
    report.audio.voiceRmsDb = voiceDb;
    report.checks.voicePresent = voiceDb !== null && voiceDb > -45;
    if ((plan.sfx || []).length === 0) {
      markNotApplicable('sfxPresent');
      markNotApplicable('sfxAudible');
    } else {
      if (!sfxBus || !fs.existsSync(sfxBus)) {
        report.checks.sfxPresent = false;
        report.checks.sfxAudible = false;
        report.unverified.push('sfx: falta el stem de QA sfx_bus.wav');
      }
      report.audio.sfx = [];
      for (let i = 0; i < (plan.sfx || []).length; i++) {
        const event = plan.sfx[i];
        const db = audioRmsDb(finalPath, event.at, 0.16);
        const controlDb = audioRmsDb(finalPath, Math.max(0, event.at - 0.3), 0.16);
        const busDb = sfxBus && fs.existsSync(sfxBus) ? audioRmsDb(sfxBus, event.at, 0.18) : null;
        const sourceFile = sfxFiles[i];
        let inputDb = null;
        if (sourceFile && fs.existsSync(sourceFile)) {
          const windows = [0.05, 0.15, 0.3].map((window) => audioRmsDb(sourceFile, 0, window)).filter((value) => value !== null);
          inputDb = windows.length ? Math.max(...windows) : null;
        }
        const deltaDb = db !== null && controlDb !== null ? Number((db - controlDb).toFixed(2)) : null;
        const present = busDb !== null && busDb > -48 && inputDb !== null && inputDb > -45 && db !== null && db > -45;
        // Positive delta over a local control is the only signal we call
        // "audible". A voice with different dynamics can mask a perfectly
        // valid SFX; that remains explicitly masked-by-voice, never audible.
        const audible = present && deltaDb !== null && deltaDb > 0.05;
        const item = {
          id: event.id,
          sound: event.sound,
          at: event.at,
          rmsDb: db,
          controlDb,
          busRmsDb: busDb,
          deltaDb,
          inputRmsDb: inputDb,
          present,
          audible,
          audibleIsolation: !present ? 'missing' : audible ? 'measured' : 'masked-by-voice'
        };
        if (present && !audible) {
          report.limitations.push(`sfx:${event.id}: presente en el stem y en la mezcla, pero el delta contra la voz no permite aislar audibilidad`);
        }
        report.audio.sfx.push(item);
      }
      if (report.checks.sfxPresent !== false) {
        report.checks.sfxPresent = report.audio.sfx.every((item) => item.present);
      }
      if (report.checks.sfxAudible !== false) {
        if (!report.audio.sfx.some((item) => item.present)) {
          report.checks.sfxAudible = false;
        } else if (!report.audio.sfx.every((item) => item.present)) {
          report.checks.sfxAudible = false;
        } else if (report.audio.sfx.every((item) => item.audible)) {
          report.checks.sfxAudible = true;
        } else {
          report.checks.sfxAudible = null;
        }
      }
    }

    ensureDir(run.qaFrames);
    const captured = [];
    for (const point of collectFrameTimes(plan, duration)) {
      const file = path.join(run.qaFrames, `${String(captured.length + 1).padStart(2, '0')}_${point.label}.png`);
      try {
        extractFrame(finalPath, point.time, file);
        captured.push({ label: point.label, time: point.time, file });
      } catch (err) {
        report.errors.push(`frame ${point.label}: ${err.message}`);
      }
    }
    report.frames = captured.map((item) => ({
      label: item.label,
      time: item.time,
      file: relPosix(run.runDir, item.file)
    }));
    try {
      const sheet = makeContactSheet(captured.map((item) => item.file), path.join(run.runDir, 'qa', 'contact_sheet.jpg'), 3);
      report.contactSheet = sheet ? relPosix(run.runDir, sheet) : null;
    } catch (err) {
      report.errors.push(`contact sheet: ${err.message}`);
    }
    const frameByLabel = new Map(captured.map((item) => [item.label, item.file]));

    // B-roll: before/during/after must differ, the asset must cover it, and
    // the frame must differ from the original source at the same time.
    if ((plan.brolls || []).length === 0) {
      markNotApplicable('brollVisible');
    } else {
      for (const broll of plan.brolls) {
        const before = frameByLabel.get(`before_${broll.id}`);
        const during = frameByLabel.get(`during_${broll.id}`);
        const after = frameByLabel.get(`after_${broll.id}`);
        const changedBefore = framesDiffer(before, during);
        const changedAfter = framesDiffer(during, after);
        let sourceDuring = null;
        let sourceDiff = null;
        if (videoPath && fs.existsSync(videoPath) && during) {
          try {
            sourceDuring = path.join(run.qaFrames, `source_broll_${broll.id}.png`);
            extractFrame(videoPath, (broll.start + broll.end) / 2, sourceDuring);
            sourceDiff = sourceChanged(sourceDuring, during);
          } catch (err) {
            sourceDiff = null;
          }
        }
        if (sourceDiff !== true) report.unverified.push(`broll:${broll.id}: no se pudo comparar contra la fuente en el mismo tiempo`);
        report.layering.brolls.push({
          id: broll.id,
          before: before ? relPosix(run.runDir, before) : null,
          during: during ? relPosix(run.runDir, during) : null,
          after: after ? relPosix(run.runDir, after) : null,
          sourceDiff,
          changedBefore,
          changedAfter,
          verified: changedBefore && changedAfter && sourceDiff === true
        });
      }
      report.checks.brollVisible = report.layering.brolls.every((item) => item.verified);
    }

    // Overlay: asset alpha + before/during/after evidence + source comparison.
    if ((plan.overlays || []).length === 0) {
      markNotApplicable('overlays');
    } else {
      for (const overlay of plan.overlays) {
        const before = frameByLabel.get(`overlay_before_${overlay.id}`);
        const during = frameByLabel.get(`overlay_${overlay.id}`);
        const after = frameByLabel.get(`overlay_after_${overlay.id}`);
        const changedBefore = framesDiffer(before, during);
        const changedAfter = framesDiffer(during, after);
        let sourceDiff = null;
        let alignment = null;
        if (transcript && Array.isArray(transcript.words)) {
          const matched = findTranscriptAnchor(transcript.words, overlay.text);
          const semanticStart = typeof overlay.semanticStart === 'number' && Number.isFinite(overlay.semanticStart)
            ? overlay.semanticStart
            : (matched && matched.start);
          const semanticEnd = typeof overlay.semanticEnd === 'number' && Number.isFinite(overlay.semanticEnd)
            ? overlay.semanticEnd
            : (matched && matched.end);
          const startOk = typeof semanticStart === 'number' && overlay.start >= semanticStart - 0.45 && overlay.start <= semanticStart + 0.9;
          const endOk = typeof semanticEnd === 'number' && overlay.end >= semanticEnd - 0.2;
          const hasMetadata = typeof overlay.semanticStart === 'number' && Number.isFinite(overlay.semanticStart) &&
            typeof overlay.semanticEnd === 'number' && Number.isFinite(overlay.semanticEnd);
          const textOk = matched !== null || hasMetadata;
          alignment = {
            matchedStart: matched ? matched.start : null,
            matchedEnd: matched ? matched.end : null,
            semanticStart: Number.isFinite(semanticStart) ? semanticStart : null,
            semanticEnd: Number.isFinite(semanticEnd) ? semanticEnd : null,
            offset: matched ? Number((overlay.start - matched.start).toFixed(3)) : null,
            ok: !!(startOk && endOk && textOk)
          };
        }
        if (!alignment || !alignment.ok) {
          report.unverified.push(`overlay:${overlay.id}: texto no alineado con su idea/ventana hablada`);
        }
        if (videoPath && fs.existsSync(videoPath) && during) {
          try {
            const sourceFrame = path.join(run.qaFrames, `source_overlay_${overlay.id}.png`);
            extractFrame(videoPath, (overlay.start + overlay.end) / 2, sourceFrame);
            sourceDiff = sourceChanged(sourceFrame, during);
          } catch (err) {
            sourceDiff = null;
          }
        }
        const asset = report.overlayAlpha.find((item) => item.id === overlay.id);
        if (sourceDiff !== true) report.unverified.push(`overlay:${overlay.id}: no se pudo comparar contra la fuente en el mismo tiempo`);
        report.layering.overlays.push({
          id: overlay.id,
          asset: asset ? asset.ok : false,
          alignment,
          before: before ? relPosix(run.runDir, before) : null,
          during: during ? relPosix(run.runDir, during) : null,
          after: after ? relPosix(run.runDir, after) : null,
          sourceDiff,
          changedBefore,
          changedAfter,
          verified: !!(asset && asset.ok) && changedBefore && changedAfter && sourceDiff === true && !!(alignment && alignment.ok)
        });
      }
      report.checks.overlays = report.layering.overlays.every((item) => item.verified);
    }

    // Camera: filter construction evidence + before/during/after frames.
    if ((plan.cameras || []).length === 0) {
      markNotApplicable('cameras');
    } else {
      const appliedIds = new Set(assembly && assembly.cameraFilters ? assembly.cameraFilters.ids : []);
      const brollIntervals = plan.brolls || [];
      const overlayIntervals = plan.overlays || [];
      for (const camera of plan.cameras) {
        const before = frameByLabel.get(`camera_before_${camera.id}`);
        const during = frameByLabel.get(`camera_during_${camera.id}`);
        const after = frameByLabel.get(`camera_after_${camera.id}`);
        const beforeSafe = !inAnyInterval(camera.start - 0.12, brollIntervals) && !inAnyInterval(camera.start - 0.12, overlayIntervals);
        const duringSafe = !inAnyInterval((camera.start + camera.end) / 2, brollIntervals) && !inAnyInterval((camera.start + camera.end) / 2, overlayIntervals);
        const afterSafe = !inAnyInterval(camera.end + 0.12, brollIntervals) && !inAnyInterval(camera.end + 0.12, overlayIntervals);
        const changedBefore = beforeSafe ? framesDiffer(before, during) : null;
        const changedAfter = afterSafe ? framesDiffer(during, after) : null;
        let sourceVariance = null;
        let sourceTexture = null;
        let sourceDiff = null;
        if (videoPath && fs.existsSync(videoPath)) {
          try {
            const sourceFrame = path.join(run.qaFrames, `source_camera_${camera.id}.png`);
            extractFrame(videoPath, (camera.start + camera.end) / 2, sourceFrame);
            sourceVariance = frameVariance(sourceFrame);
            sourceTexture = sourceVariance !== null && sourceVariance >= 0.005;
            sourceDiff = during && duringSafe ? sourceChanged(sourceFrame, during) : null;
          } catch (err) {
            sourceVariance = null;
            sourceTexture = null;
            sourceDiff = null;
          }
        }
        const filterApplied = appliedIds.has(camera.id);
        if (sourceTexture === false) {
          report.unverified.push(`camera:${camera.id}: fuente sin textura suficiente para probar el zoom/pan`);
        } else if (sourceTexture === null) {
          report.unverified.push(`camera:${camera.id}: no se pudo medir textura de la fuente`);
        }
        if (sourceDiff !== true) report.unverified.push(`camera:${camera.id}: no se pudo comparar contra la fuente en el mismo tiempo`);
        if (!duringSafe) report.unverified.push(`camera:${camera.id}: la ventana de cámara no está aislada de otras capas`);
        if (!beforeSafe && !afterSafe) {
          report.limitations.push(`camera:${camera.id}: sin frames de control; se valida con frame aislado + SSIM contra la fuente`);
        }
        if (!afterSafe) {
          report.limitations.push(`camera:${camera.id}: frame after descartado por caer sobre otra capa`);
        }
        report.layering.cameras.push({
          id: camera.id,
          filterApplied,
          sourceVariance,
          sourceTexture,
          sourceDiff,
          beforeSafe,
          duringSafe,
          afterSafe,
          before: before ? relPosix(run.runDir, before) : null,
          during: during ? relPosix(run.runDir, during) : null,
          after: afterSafe && after ? relPosix(run.runDir, after) : null,
          changedBefore,
          changedAfter,
          verified: filterApplied && duringSafe && sourceTexture === true && sourceDiff === true
        });
      }
      report.checks.cameras = report.layering.cameras.every((item) => item.verified);
    }

    // Captions: applicable only when enabled and there are words outside B-roll.
    const captionsEnabled = !plan.captions || plan.captions.enabled !== false;
    if (!captionsEnabled) {
      markNotApplicable('captions');
    } else if (!transcript || !Array.isArray(transcript.words)) {
      report.checks.captions = false;
      report.unverified.push('captions: falta el transcript para saber si hay talking-head hablado');
    } else {
      const brolls = plan.brolls || [];
      const talkWords = transcript.words.filter((word) => !inAnyInterval((word.start + word.end) / 2, brolls));
      const dialogueCount = assDialogueCount(run.subtitles);
      report.captions = { enabled: true, dialogueCount, talkWordCount: talkWords.length };
      if (talkWords.length === 0) {
        markNotApplicable('captions');
      } else {
        report.checks.captions = dialogueCount > 0;
      }
    }

    report.ok = Object.values(report.checks).every((value) => value === true || value === null) &&
      report.errors.length === 0 && report.unverified.length === 0;
  } catch (err) {
    report.errors.push(err.message);
    report.ok = false;
  }
  ensureDir(run.runDir);
  atomicWriteJson(run.qa, report);
  logger.info(`QA: ${report.ok ? 'OK' : 'FALLÓ'} · ${run.qa}`);
  if (!report.ok) {
    logger.warn(`Checks: ${JSON.stringify(report.checks)}`);
    if (report.errors.length) logger.warn(`Errores QA: ${report.errors.join(' | ')}`);
    if (report.unverified.length) logger.warn(`Sin verificar: ${report.unverified.join(' | ')}`);
  }
  return report;
}

module.exports = {
  makeContactSheet,
  collectFrameTimes,
  assDialogueCount,
  framesDiffer,
  qaFinal
};
