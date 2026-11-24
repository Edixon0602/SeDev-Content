const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const { applyControls, settingsFingerprint, planInputKey } = require('../editor/pipeline');
const { validatePlan } = require('../editor/plan_schema');
const { loadCatalog, catalogIds } = require('../editor/sfx_catalog');
const { normalizeTranscript } = require('../editor/transcript');

const ROOT = path.resolve(__dirname, '../..');
const plan = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/plan.sample.json'), 'utf8'));
const catalog = loadCatalog();

test('CLI controls remove associated SFX when a layer is disabled', () => {
  const targeted = JSON.parse(JSON.stringify(plan));
  targeted.sfx[0].target = `broll:${targeted.brolls[0].id}`;
  targeted.sfx[1].target = `broll:${targeted.brolls[1].id}`;
  targeted.sfx[2].target = `overlay:${targeted.overlays[0].id}`;
  const withoutBrolls = applyControls(targeted, { noBrolls: true });
  assert.equal(withoutBrolls.brolls.length, 0);
  assert.equal(withoutBrolls.sfx.length, 1);
  assert.equal(withoutBrolls.sfx[0].target, `overlay:${targeted.overlays[0].id}`);
  const withoutOverlays = applyControls(targeted, { noOverlays: true });
  assert.equal(withoutOverlays.overlays.length, 0);
  assert.equal(withoutOverlays.sfx.length, 2);
  assert.ok(withoutOverlays.sfx.every((sfx) => sfx.target.startsWith('broll:')));
});

test('CLI controls mask plan layers before validation', () => {
  const masked = applyControls(plan, {
    noSfx: true,
    noCamera: true,
    noCaptions: true,
    noOverlays: true,
    noBrolls: true
  });
  assert.equal(masked.sfx.length, 0);
  assert.equal(masked.cameras.length, 0);
  assert.equal(masked.overlays.length, 0);
  assert.equal(masked.brolls.length, 0);
  assert.equal(masked.captions.enabled, false);
  const validated = validatePlan(masked, { duration: plan.source.duration, sfxIds: catalogIds(catalog) });
  assert.equal(validated.brolls.length, 0);
});

test('settings fingerprint changes with controls and whisper config', () => {
  const base = settingsFingerprint({}, 30);
  assert.notEqual(base, settingsFingerprint({ noSfx: true }, 30));
  assert.notEqual(base, settingsFingerprint({ noCaptions: true }, 30));
  assert.notEqual(base, settingsFingerprint({ whisper: { model: 'medium' } }, 30));
  assert.notEqual(base, settingsFingerprint({}, 24));
  assert.notEqual(settingsFingerprint({ crf: 0 }, 30), settingsFingerprint({ crf: 18 }, 30));
});

test('plan input key reacts to transcript and planner mode', () => {
  const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/transcript.sample.json'), 'utf8'));
  const transcript = normalizeTranscript(raw, { duration: raw.meta.duration });
  const options = {};
  const local = planInputKey(transcript, options, null);
  const llm = planInputKey(transcript, options, { model: 'm' });
  assert.notEqual(local, llm);
  const changed = JSON.parse(JSON.stringify(transcript));
  changed.words[0].word = 'Cambiada';
  assert.notEqual(local, planInputKey(changed, options, null));
});
