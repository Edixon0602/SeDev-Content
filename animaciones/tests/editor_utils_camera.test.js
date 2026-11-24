const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  slugify,
  runSlug,
  runPaths,
  roundToFrame,
  stableStringify,
  stripJsonFences,
  atomicWriteJson,
  readJson
} = require('../editor/utils');
const { escapeFilterPath, quotedFilterPath } = require('../editor/ffmpeg');
const { buildTimeline, cameraZoomPan, buildBaseVideoGraph } = require('../editor/camera');

const ROOT = path.resolve(__dirname, '../..');

test('slug and run names handle Windows paths with spaces and accents', () => {
  const video = 'C:\\Users\\Edixon\\Desktop\\Trabajo\\SeDev\\input\\Mi Vídeo Final (v2).MP4';
  assert.equal(slugify('Mi Vídeo Final (v2)'), 'mi-video-final-v2');
  const a = runSlug(video);
  const b = runSlug(video);
  assert.equal(a, b);
  assert.match(a, /^mi-video-final-v2_[0-9a-f]{8}$/);
  assert.notEqual(a, runSlug(video.replace('Final', 'Final2')));
});

test('runPaths stays inside the project run directory and mirrors the plan layout', () => {
  const paths = runPaths('C:\\videos\\toma final.mp4', { projectRoot: ROOT });
  assert.ok(paths.runDir.startsWith(path.join(ROOT, 'animaciones', 'editor_runs')));
  assert.equal(path.basename(paths.transcript), 'transcript.json');
  assert.equal(path.basename(paths.plan), 'edit_plan.json');
  assert.equal(path.basename(paths.subtitles), 'subtitles.ass');
  assert.equal(path.basename(paths.qa), 'qa_report.json');
  assert.equal(path.basename(paths.final), 'final.mp4');
});

test('atomic JSON writes are readable and replace old content', () => {
  const dir = path.join(ROOT, 'animaciones/editor_runs/_utils_check');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'state.json');
  try {
    atomicWriteJson(file, { a: 1 });
    assert.deepEqual(readJson(file), { a: 1 });
    atomicWriteJson(file, { a: 2 });
    assert.deepEqual(readJson(file), { a: 2 });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('stable stringify and fence stripping are deterministic', () => {
  assert.equal(stableStringify({ b: 1, a: 2 }), '{"a":2,"b":1}');
  assert.equal(stripJsonFences('```json\n{"a":1}\n```'), '{"a":1}');
  assert.equal(stripJsonFences('texto antes {"a":1} texto después'), '{"a":1}');
  assert.equal(roundToFrame(1.02, 30), 1.033333);
});

test('FFmpeg filter paths escape colons and quotes', () => {
  const file = 'C:\\Users\\Edixon\\Desktop\\Trabajo\\SeDev\\animaciones\\output clips\\a:b "c".png';
  const escaped = escapeFilterPath(file);
  assert.ok(escaped.includes('C\\:'));
  assert.ok(escaped.includes('/'));
  assert.ok(quotedFilterPath(file).startsWith("'"));
});

test('timeline splits at B-roll and camera boundaries without overlap', () => {
  const plan = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/plan.sample.json'), 'utf8'));
  const segments = buildTimeline({ duration: plan.source.duration, brolls: plan.brolls, cameras: plan.cameras });
  assert.ok(segments.length >= 5);
  for (let i = 1; i < segments.length; i++) {
    assert.ok(segments[i].start >= segments[i - 1].end - 0.001);
  }
  const brollSeconds = segments.filter((s) => s.kind === 'broll').reduce((sum, s) => sum + s.duration, 0);
  const expected = plan.brolls.reduce((sum, b) => sum + (b.end - b.start), 0);
  assert.ok(Math.abs(brollSeconds - expected) < 0.01);
  for (const segment of segments) {
    if (segment.kind === 'broll') assert.ok(!segment.camera);
  }
});

test('camera filters are finite, bounded and moderate', () => {
  for (const type of ['push', 'pull', 'pan']) {
    const filter = cameraZoomPan({ type, intensity: 0.55, focusX: 0.4 }, 30, 2.0);
    assert.match(filter, /zoompan/);
    assert.match(filter, /s=1080x1920/);
    assert.ok(!/NaN|Infinity|undefined/.test(filter));
    const amount = Number((/1\+([0-9.]+)/.exec(filter) || [])[1] || 0);
    assert.ok(amount <= 0.05, `${type} zoom too strong: ${amount}`);
  }
  const punch = cameraZoomPan({ type: 'punch', intensity: 0.5 }, 30, 1.2);
  assert.match(punch, /zoompan=z='1\.1100'/);
  assert.match(punch, /ih\*0\.36/);
  assert.match(punch, /s=1080x1920/);
  assert.equal(cameraZoomPan(null, 30, 2), null);
});

test('base video graph orders talk and B-roll segments chronologically', () => {
  const plan = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/plan.sample.json'), 'utf8'));
  const segments = buildTimeline({ duration: plan.source.duration, brolls: plan.brolls, cameras: plan.cameras });
  const index = {};
  plan.brolls.forEach((event, i) => { index[event.id] = i + 1; });
  const graph = buildBaseVideoGraph({ segments, brollInputIndex: index, fps: 30 });
  assert.ok(graph.lineCount || graph.lines.length > 0);
  assert.match(graph.lines.join('\n'), /concat=n=\d+:v=1:a=0\[basev\]/);
  assert.equal(graph.order.length, segments.length);
  for (let i = 1; i < graph.order.length; i++) {
    assert.ok(graph.order[i].start >= graph.order[i - 1].end - 0.001);
  }
});
