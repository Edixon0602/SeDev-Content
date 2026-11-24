// Timeline and camera filter construction.
// B-rolls replace talking-head intervals. Camera moves are only applied to
// talking-head segments, split at event boundaries so no transition leaks.

const { clamp, roundTime } = require('./utils');

function uniqueSorted(values, epsilon = 0.0005) {
  const sorted = values.slice().sort((a, b) => a - b);
  const out = [];
  for (const value of sorted) {
    if (!out.length || Math.abs(value - out[out.length - 1]) > epsilon) out.push(value);
  }
  return out;
}

function findBrollAt(time, brolls) {
  return brolls.find((event) => time >= event.start && time < event.end) || null;
}

function findCameraAt(time, cameras) {
  return cameras.find((event) => time >= event.start && time < event.end) || null;
}

function buildTimeline({ duration, brolls = [], cameras = [] }) {
  const safeDuration = Number(duration);
  if (!Number.isFinite(safeDuration) || safeDuration <= 0) throw new Error('buildTimeline requiere duración válida.');
  const cuts = [0, safeDuration];
  for (const event of brolls) {
    cuts.push(clamp(event.start, 0, safeDuration), clamp(event.end, 0, safeDuration));
  }
  for (const event of cameras) {
    cuts.push(clamp(event.start, 0, safeDuration), clamp(event.end, 0, safeDuration));
  }
  const points = uniqueSorted(cuts).filter((p) => p >= 0 && p <= safeDuration);
  const segments = [];
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];
    if (end - start < 0.002) continue;
    const mid = (start + end) / 2;
    const broll = findBrollAt(mid, brolls);
    const camera = broll ? null : findCameraAt(mid, cameras);
    segments.push({
      start: roundTime(start),
      end: roundTime(end),
      duration: roundTime(end - start),
      kind: broll ? 'broll' : 'talk',
      broll: broll ? broll.id : null,
      camera: camera ? camera.id : null,
      cameraEvent: camera,
      brollEvent: broll
    });
  }
  return segments;
}

function cameraZoomPan(camera, fps, segmentDuration) {
  if (!camera) return null;
  const frames = Math.max(2, Math.round(Number(segmentDuration) * Number(fps)));
  const intensity = clamp(camera.intensity === undefined ? 0.5 : camera.intensity, 0, 1);
  const denom = Math.max(1, frames - 1);
  const type = camera.type;
  if (type === 'push') {
    const amount = (0.04 * intensity).toFixed(4);
    return `zoompan=z='1+${amount}*on/${denom}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=${fps}`;
  }
  if (type === 'pull') {
    const amount = (0.04 * intensity).toFixed(4);
    return `zoompan=z='1+${amount}*(1-on/${denom})':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=${fps}`;
  }
  if (type === 'pan') {
    const fx = clamp(camera.focusX === undefined ? 0.35 : camera.focusX, -1, 1);
    const amp = (22 * intensity * (fx === 0 ? 0.35 : Math.sign(fx) || 1)).toFixed(2);
    const zoomAmount = (0.022 * intensity).toFixed(4);
    return `zoompan=z='1+${zoomAmount}':x='iw/2-(iw/zoom/2)+(${amp})*(on/${denom}-0.5)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=${fps}`;
  }
  if (type === 'punch') {
    const zoom = (1.09 + 0.04 * intensity).toFixed(4);
    return `zoompan=z='${zoom}':x='iw/2-(iw/zoom/2)':y='ih*0.36-(ih/zoom*0.36)':d=1:s=1080x1920:fps=${fps}`;
  }
  throw new Error(`Tipo de cámara no soportado: ${type}`);
}

function scaleFilter(width = 1080, height = 1920, fps = 30) {
  return `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height},fps=${fps},setsar=1,format=yuv420p`;
}

function talkFilter(segment, fps, width, height) {
  const parts = [
    `trim=start=${segment.start}:end=${segment.end}`,
    'setpts=PTS-STARTPTS',
    scaleFilter(width, height, fps)
  ];
  const zoom = cameraZoomPan(segment.cameraEvent, fps, segment.duration);
  if (zoom) parts.push(zoom);
  return parts.join(',');
}

function brollFilter(segment, fps, width, height) {
  return [
    `trim=start=0:end=${segment.duration}`,
    'setpts=PTS-STARTPTS',
    scaleFilter(width, height, fps)
  ].join(',');
}

// Builds the concat base graph. `brollInputIndex` maps event id -> ffmpeg input
// number (input 0 is always the talking head).
function buildBaseVideoGraph({ segments, brollInputIndex, fps = 30, width = 1080, height = 1920 }) {
  const talk = segments.filter((s) => s.kind === 'talk');
  const lines = [];
  const chainLabels = [];
  if (talk.length) {
    if (talk.length > 1) {
      const labels = talk.map((_, i) => `[tksrc${i}]`).join('');
      lines.push(`[0:v]split=${talk.length}${labels}`);
      talk.forEach((segment, i) => {
        const out = `[tk${i}]`;
        lines.push(`[tksrc${i}]${talkFilter(segment, fps, width, height)}${out}`);
        chainLabels.push({ label: out, segment });
      });
    } else {
      const out = '[tk0]';
      lines.push(`[0:v]${talkFilter(talk[0], fps, width, height)}${out}`);
      chainLabels.push({ label: out, segment: talk[0] });
    }
  }
  let brollCount = 0;
  for (const segment of segments) {
    if (segment.kind !== 'broll') continue;
    const input = brollInputIndex[segment.broll];
    if (!Number.isInteger(input)) throw new Error(`Falta input para el B-roll ${segment.broll}`);
    const out = `[br${brollCount++}]`;
    lines.push(`[${input}:v]${brollFilter(segment, fps, width, height)}${out}`);
    chainLabels.push({ label: out, segment });
  }
  // Restore chronological order.
  chainLabels.sort((a, b) => a.segment.start - b.segment.start);
  if (chainLabels.length === 1) {
    return { lines, output: chainLabels[0].label, segmentCount: 1, order: [chainLabels[0].segment] };
  }
  const concatInputs = chainLabels.map((entry) => entry.label).join('');
  lines.push(`${concatInputs}concat=n=${chainLabels.length}:v=1:a=0[basev]`);
  return { lines, output: '[basev]', segmentCount: chainLabels.length, order: chainLabels.map((e) => e.segment) };
}

module.exports = {
  uniqueSorted,
  buildTimeline,
  cameraZoomPan,
  scaleFilter,
  talkFilter,
  brollFilter,
  buildBaseVideoGraph
};
