const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const { validatePlan, planStats, PlanValidationError } = require('../editor/plan_schema');
const { loadCatalog, catalogIds } = require('../editor/sfx_catalog');

const ROOT = path.resolve(__dirname, '../..');
const catalog = loadCatalog();
const sfxIds = catalogIds(catalog);
const duration = 24.499;
const base = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/plan.sample.json'), 'utf8'));

function clone() {
  return JSON.parse(JSON.stringify(base));
}

test('valid fixture plan passes strict validation and is ordered', () => {
  const plan = validatePlan(clone(), { duration, sfxIds });
  assert.equal(plan.brolls.length, 2);
  assert.equal(plan.overlays.length, 2);
  assert.equal(plan.cameras.length, 2);
  assert.equal(plan.sfx.length, 3);
  assert.ok(plan.brolls[0].start <= plan.brolls[1].start);
  assert.ok(plan.sfx[0].at <= plan.sfx[1].at);
  const stats = planStats(plan);
  assert.equal(stats.brolls, 2);
  assert.ok(stats.brollCoverage <= 0.45);
});

test('rejects non-finite or inverted times', () => {
  const bad = clone();
  bad.brolls[0].end = Number.NaN;
  assert.throws(() => validatePlan(bad, { duration, sfxIds }), PlanValidationError);

  const inverted = clone();
  inverted.overlays[0].end = inverted.overlays[0].start;
  assert.throws(() => validatePlan(inverted, { duration, sfxIds }), PlanValidationError);
});

test('rejects events outside the real duration', () => {
  const bad = clone();
  bad.brolls[1].end = duration + 2;
  assert.throws(() => validatePlan(bad, { duration, sfxIds }), /fuera de la duración/);

  const late = clone();
  late.sfx[0].at = duration + 1;
  assert.throws(() => validatePlan(late, { duration, sfxIds }), /fuera de la duración/);
});

test('rejects overlapping B-rolls and overlays', () => {
  const overlapBroll = clone();
  overlapBroll.brolls[1].start = overlapBroll.brolls[0].end - 0.2;
  assert.throws(() => validatePlan(overlapBroll, { duration, sfxIds }), /se solapa/);

  const overlapOverlay = clone();
  overlapOverlay.overlays[1].start = overlapOverlay.overlays[0].end - 0.1;
  assert.throws(() => validatePlan(overlapOverlay, { duration, sfxIds }), /se solapa/);
});

test('rejects overlays over fullscreen B-roll without explicit permission', () => {
  const bad = clone();
  bad.overlays[0].start = 2.4;
  bad.overlays[0].end = 3.4;
  delete bad.overlays[0].allowOverBroll;
  assert.throws(() => validatePlan(bad, { duration, sfxIds }), /allowOverBroll/);

  bad.overlays[0].allowOverBroll = true;
  const ok = validatePlan(bad, { duration, sfxIds });
  assert.equal(ok.overlays[0].allowOverBroll, true);
});

test('rejects cameras over B-roll and excessive camera density', () => {
  const bad = clone();
  bad.cameras[0].start = 3.0;
  bad.cameras[0].end = 4.0;
  assert.throws(() => validatePlan(bad, { duration, sfxIds }), /B-roll/);

  const dense = clone();
  dense.cameras = [
    { id: 'c1', start: 9.0, end: 12.0, type: 'push', intensity: 0.5 },
    { id: 'c2', start: 16.0, end: 19.0, type: 'pull', intensity: 0.5 },
    { id: 'c3', start: 20.0, end: 23.0, type: 'pan', intensity: 0.5 }
  ];
  assert.throws(() => validatePlan(dense, { duration, sfxIds }), /cobertura de cámara/);
});

test('rejects unknown SFX ids, negative gains and missing reasons', () => {
  const unknown = clone();
  unknown.sfx[0].sound = 'not_in_catalog';
  assert.throws(() => validatePlan(unknown, { duration, sfxIds }), /no existe en el catálogo/);

  const gain = clone();
  gain.sfx[0].gainDb = 4;
  assert.throws(() => validatePlan(gain, { duration, sfxIds }), /gainDb/);

  const reason = clone();
  delete reason.sfx[0].reason;
  assert.throws(() => validatePlan(reason, { duration, sfxIds }), /justificación/);
});

test('rejects unsupported components and props', () => {
  const component = clone();
  component.brolls[0].component = 'freeform_html';
  assert.throws(() => validatePlan(component, { duration, sfxIds }), /component no permitido/);

  const prop = clone();
  prop.brolls[0].props.telemetry = 'fake';
  assert.throws(() => validatePlan(prop, { duration, sfxIds }), /no está permitido/);

  const variant = clone();
  variant.brolls[0].props.variant = 'dashboard';
  assert.throws(() => validatePlan(variant, { duration, sfxIds }), /variant/);
});

test('rejects unreadable overlays, excessive characters and caption limits', () => {
  const short = clone();
  short.overlays[0].text = 'UNA FRASE DEMASIADO LARGA PARA LEERSE EN MEDIO SEGUNDO';
  short.overlays[0].end = short.overlays[0].start + 0.5;
  assert.throws(() => validatePlan(short, { duration, sfxIds }), /caracteres|leerse/);

  const caps = clone();
  caps.captions.maxLines = 9;
  assert.throws(() => validatePlan(caps, { duration, sfxIds }), /captions.maxLines/);
});

test('rejects non-serializable or deeply nested props', () => {
  const bad = clone();
  bad.brolls[0].props.headline = 'OK';
  bad.brolls[0].props.support = { nested: { deep: { deeper: { tooDeep: true } } } };
  assert.throws(() => validatePlan(bad, { duration, sfxIds }), /anida|debe ser string/);
});

test('rejects source duration mismatch', () => {
  const bad = clone();
  bad.source.duration = duration + 5;
  assert.throws(() => validatePlan(bad, { duration, sfxIds }), /no coincide/);
});

test('rejects unsafe or duplicated event ids', () => {
  const unsafe = clone();
  unsafe.brolls[0].id = '../escape';
  assert.throws(() => validatePlan(unsafe, { duration, sfxIds }), /id debe usar/);

  const duplicate = clone();
  duplicate.overlays[0].id = duplicate.brolls[0].id;
  assert.throws(() => validatePlan(duplicate, { duration, sfxIds }), /duplicado/);
});

test('malformed numeric/type fields fail as PlanValidationError without coercion', () => {
  for (const value of [null, true, '2.0', {}, []]) {
    const bad = clone();
    bad.brolls[0].start = value;
    assert.throws(() => validatePlan(bad, { duration, sfxIds }), PlanValidationError, `start=${JSON.stringify(value)}`);
  }
  const source = clone();
  source.source.duration = '24.499';
  assert.throws(() => validatePlan(source, { duration, sfxIds }), PlanValidationError);

  const captions = clone();
  captions.captions.maxCharsPerLine = '32';
  assert.throws(() => validatePlan(captions, { duration, sfxIds }), PlanValidationError);

  const sfx = clone();
  sfx.sfx[0].gainDb = null;
  assert.throws(() => validatePlan(sfx, { duration, sfxIds }), PlanValidationError);
});

test('malformed variant, target and dangerous props are rejected', () => {
  const variant = clone();
  variant.brolls[0].props.variant = { bad: true };
  assert.throws(() => validatePlan(variant, { duration, sfxIds }), PlanValidationError);

  const target = clone();
  target.sfx[0].target = 'broll:../escape';
  assert.throws(() => validatePlan(target, { duration, sfxIds }), /target/);

  const dangerous = clone();
  Object.defineProperty(dangerous.brolls[0].props, '__proto__', {
    value: { polluted: true },
    enumerable: true,
    configurable: true,
    writable: true
  });
  assert.throws(() => validatePlan(dangerous, { duration, sfxIds }), /peligrosa/);
});

test('v2 schema forbids consecutive identical SFX and accepts rich overlay/broll/punch fields', () => {
  const repeatedSfx = clone();
  repeatedSfx.sfx = [
    { id: 'sfx_a', at: 1.0, sound: 'soft_whoosh', gainDb: -15, reason: 'primero' },
    { id: 'sfx_b', at: 2.5, sound: 'soft_whoosh', gainDb: -15, reason: 'segundo consecutivo' }
  ];
  assert.throws(() => validatePlan(repeatedSfx, { duration, sfxIds }), /sfx consecutivo repite el mismo sonido/);

  const rich = clone();
  rich.brolls[0].props = {
    ...rich.brolls[0].props,
    icon: 'market_trend_down',
    leftLabel: 'ANTES',
    rightLabel: 'DESPUÉS',
    leftIcon: 'saas_cloud',
    rightIcon: 'ai_agent',
    trend: 'down',
    logos: ['salesforce', 'hubspot']
  };
  rich.overlays[0] = {
    ...rich.overlays[0],
    style: 'logo_grid',
    badge: 'SAAS',
    subtext: 'Base instalada',
    icon: 'saas_cloud',
    logos: ['salesforce', 'hubspot', 'notion', 'slack'],
    imageQuery: 'enterprise saas'
  };
  rich.cameras[0].type = 'punch';
  const validated = validatePlan(rich, { duration, sfxIds });
  assert.equal(validated.cameras[0].type, 'punch');
  assert.equal(validated.overlays[0].style, 'logo_grid');
  assert.equal(validated.brolls[0].props.leftLabel, 'ANTES');
});
