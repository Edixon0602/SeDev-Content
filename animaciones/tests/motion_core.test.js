const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadMotionCore() {
  const file = path.resolve(__dirname, '../templates/components/motion_core.js');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
  return sandbox.window.MotionCore;
}

const MC = loadMotionCore();

test('motion core is exposed', () => {
  assert.ok(MC, 'window.MotionCore should exist');
  assert.ok(MC.ease.outQuint, 'easing table should be populated');
});

test('clamp / lerp / mapRange are exact', () => {
  assert.equal(MC.clamp01(-1), 0);
  assert.equal(MC.clamp01(2), 1);
  assert.equal(MC.lerp(10, 20, 0.25), 12.5);
  assert.equal(MC.mapRange(5, 0, 10, 100, 200), 150);
});

test('all easings start at 0 and end at 1, within tolerance', () => {
  for (const [name, fn] of Object.entries(MC.ease)) {
    assert.ok(Math.abs(fn(0)) < 1e-9, `${name}(0) should be 0`);
    assert.ok(Math.abs(fn(1) - 1) < 1e-9, `${name}(1) should be 1`);
  }
});

test('progress clamps before and after its window', () => {
  assert.equal(MC.progress(-1, 0, 0.5), 0);
  assert.equal(MC.progress(0.25, 0, 0.5, 'linear'), 0.5);
  assert.equal(MC.progress(9, 0, 0.5), 1);
  assert.equal(MC.progress(0.1, 0.1, 0, 'linear'), 1);
  assert.equal(MC.progress(0.09, 0.1, 0, 'linear'), 0);
});

test('impact beat decays and stays zero before the hit', () => {
  assert.equal(MC.beat(0.4, 0.5), 0);
  assert.equal(MC.beat(0.5, 0.5), 1);
  assert.ok(MC.beat(0.9, 0.5) < MC.beat(0.6, 0.5));
});

test('seeded RNG is deterministic and bounded', () => {
  const a = MC.seeded(42);
  const b = MC.seeded(42);
  const c = MC.seeded(43);
  const seqA = [a(), a(), a(), a()];
  const seqB = [b(), b(), b(), b()];
  const seqC = [c(), c(), c(), c()];
  assert.deepEqual(seqA, seqB, 'same seed must produce the same sequence');
  assert.notDeepEqual(seqA, seqC, 'different seed must change the sequence');
  for (const v of seqA) assert.ok(v >= 0 && v < 1);
});

test('enter and exit envelopes are bounded', () => {
  const e0 = MC.enter(0, 0.2, 0.3, { x: 20, scaleFrom: 0.8 });
  assert.equal(e0.alpha, 0);
  assert.equal(e0.x, 20);
  const e1 = MC.enter(1, 0.2, 0.3, { x: 20, scaleFrom: 0.8 });
  assert.equal(e1.alpha, 1);
  assert.equal(e1.x, 0);
  assert.equal(e1.scale, 1);

  const x0 = MC.exit(0.5, 1, 0.3, { y: 12 });
  assert.equal(x0.alpha, 1);
  assert.equal(x0.y, 0);
  const x1 = MC.exit(2, 1, 0.3, { y: 12 });
  assert.equal(x1.alpha, 0);
  assert.equal(x1.y, 12);
});

test('scene envelope never overshoots 0..1', () => {
  for (let t = 0; t <= 5; t += 0.05) {
    const env = MC.envelope(t, 5, { inDur: 0.2, outDur: 0.3 });
    assert.ok(env.alpha >= 0 && env.alpha <= 1);
  }
});

test('pointOnPath follows polyline length', () => {
  const pts = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }];
  assert.equal(MC.pathLength(pts), 20);
  assert.deepEqual(MC.pointOnPath(pts, 0), { x: 0, y: 0 });
  assert.deepEqual(MC.pointOnPath(pts, 0.5), { x: 10, y: 0 });
  assert.deepEqual(MC.pointOnPath(pts, 1), { x: 10, y: 10 });
});

function makeMeasureCtx() {
  let size = 20;
  return {
    get font() { return `700 ${size}px Fake`; },
    set font(value) {
      const m = /(\d+(?:\.\d+)?)px/.exec(String(value));
      if (m) size = parseFloat(m[1]);
    },
    measureText(text) {
      return { width: String(text).length * size * 0.58 };
    },
    textAlign: 'left',
    save() {},
    restore() {},
    fillText() {}
  };
}

test('non-finite inputs degrade to safe defaults', () => {
  assert.ok(Number.isFinite(MC.progress(NaN, 0, 1)));
  assert.ok(Number.isFinite(MC.progress(1, NaN, 1)));
  assert.equal(MC.lerp(NaN, 10, 0.5), 5);
  assert.equal(MC.clamp(NaN, 0, 1), 0);
  assert.equal(MC.beat(NaN, 0.5), 0);
  assert.ok(Number.isFinite(MC.pulse(NaN)));
  assert.ok(Number.isFinite(MC.mapRange(NaN, 0, 1, 0, 10)));
});

test('splitTextToWidth hard-breaks a long word without losing content', () => {
  const ctx = makeMeasureCtx();
  ctx.font = '900 60px Fake';
  const word = 'SUPERCALIFRAGILISTICEXPIALIDOSO';
  const lines = MC.splitTextToWidth(ctx, word, 300);
  assert.ok(lines.length > 1);
  assert.equal(lines.join(''), word);
  for (const line of lines) {
    assert.ok(ctx.measureText(line).width <= 300, `${line} exceeds 300px`);
  }
});

test('ellipsizeText never exceeds maxWidth', () => {
  const ctx = makeMeasureCtx();
  ctx.font = '900 60px Fake';
  const out = MC.ellipsizeText(ctx, 'A'.repeat(80), 300);
  assert.ok(ctx.measureText(out).width <= 300);
  assert.ok(out.endsWith('…'));
});

test('layoutHeadline fits 5 lines and long words inside the safe area', () => {
  const ctx = makeMeasureCtx();
  const lines = [
    { text: 'OPTIMIZAR' },
    { text: 'EL FLUJO DE' },
    { text: 'FACTURACIÓN', highlight: '#fbbf24' },
    { text: 'SUPERCALIFRAGILISTICEXPIALIDOSO' },
    { text: 'CADA DÍA' }
  ];
  const layout = MC.layoutHeadline(ctx, lines, {
    top: 208,
    bottom: 688,
    maxWidth: 820,
    maxFont: 104,
    minFont: 24,
    anchorX: 480
  });
  assert.ok(layout.visual.length >= 5);
  assert.ok(layout.fontSize >= 12);
  for (const v of layout.visual) {
    assert.ok(v.layout.width <= 820, `"${v.text}" exceeds 820px`);
    assert.ok(v.baseline >= 208 && v.baseline <= 688, `baseline ${v.baseline} outside safe area`);
  }
});

test('highlight logical lines stay as one visual unit and respect line.fontSize', () => {
  const ctx = makeMeasureCtx();
  const layout = MC.layoutHeadline(ctx, [
    { text: 'TU LOGIN ES UNA' },
    { text: 'LÁMPARA DE LAVA', highlight: '#fbbf24' }
  ], {
    top: 220,
    bottom: 620,
    maxWidth: 820,
    maxFont: 94,
    minFont: 24,
    anchorX: 480
  });
  const highlightLines = layout.visual.filter((v) => v.logical.highlight);
  assert.equal(highlightLines.length, 1, 'highlight must remain a single visual line');
  assert.ok(highlightLines[0].layout.width <= 820);

  const sized = MC.layoutHeadline(ctx, [
    { text: 'LINEA PEQUEÑA', fontSize: 40 }
  ], {
    top: 220,
    bottom: 620,
    maxWidth: 820,
    maxFont: 94,
    minFont: 24,
    anchorX: 480
  });
  assert.ok(sized.visual[0].fontSize <= 40, 'line.fontSize must cap the line size');
  assert.ok(sized.visual[0].layout.width <= 820);
});
