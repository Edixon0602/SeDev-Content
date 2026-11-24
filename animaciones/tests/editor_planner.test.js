const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const { normalizeTranscript } = require('../editor/transcript');
const { planWithLocal, pickKeyPhrase, groupWordsIntoSentences, trimTrailingStopwords, phraseAnchor, detectVariant, isLexicallyRedundant } = require('../editor/planner');
const { validateCopy } = require('../editor/copywriter');
const { loadCatalog, catalogIds } = require('../editor/sfx_catalog');
const { validatePlan, planStats } = require('../editor/plan_schema');

const ROOT = path.resolve(__dirname, '../..');
const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/transcript.sample.json'), 'utf8'));
const transcript = normalizeTranscript(raw, { duration: raw.meta.duration });
const catalog = loadCatalog();
const source = {
  video: 'C:\\Users\\Edixon\\Desktop\\Trabajo\\SeDev\\input\\toma final.mp4',
  duration: raw.meta.duration,
  width: 1080,
  height: 1920,
  fps: 30,
  hash: 'fixture'
};

test('local planner is deterministic and validates its own output', () => {
  const a = planWithLocal(transcript, source, { sfxCatalog: catalog });
  const b = planWithLocal(transcript, source, { sfxCatalog: catalog });
  assert.deepEqual(a, b);
  const validated = validatePlan(a, { duration: source.duration, sfxIds: catalogIds(catalog) });
  assert.equal(validated.version, '1');
  assert.equal(validated.source.duration, source.duration);
});

test('planner respects B-roll overlap, coverage and reading constraints', () => {
  const plan = planWithLocal(transcript, source, { sfxCatalog: catalog });
  const stats = planStats(plan);
  assert.ok(stats.brollCoverage <= 0.45);
  const brolls = plan.brolls.slice().sort((x, y) => x.start - y.start);
  for (let i = 1; i < brolls.length; i++) {
    assert.ok(brolls[i].start >= brolls[i - 1].end, 'B-rolls must not overlap');
  }
  for (const overlay of plan.overlays) {
    assert.ok(overlay.text.length <= 42);
    for (const b of brolls) {
      if (!overlay.allowOverBroll) {
        assert.equal(overlay.start < b.end && b.start < overlay.end, false, 'overlay must not sit on a B-roll without explicit permission');
      }
    }
  }
  for (const camera of plan.cameras) {
    for (const b of brolls) {
      assert.equal(camera.start < b.end && b.start < camera.end, false, 'camera must stay on talking head');
    }
    assert.ok(camera.intensity <= 0.7);
  }
});

test('planner only uses catalog SFX ids with a contextual reason', () => {
  const plan = planWithLocal(transcript, source, { sfxCatalog: catalog });
  const ids = new Set(catalogIds(catalog));
  for (const event of plan.sfx) {
    assert.ok(ids.has(event.sound), `unknown sfx ${event.sound}`);
    assert.ok(event.reason && event.reason.length > 6);
    assert.ok(event.gainDb <= 0 && event.gainDb >= -30);
  }
});

test('planner controls remove SFX, camera, captions and visual layers', () => {
  const plan = planWithLocal(transcript, source, {
    sfxCatalog: catalog,
    noSfx: true,
    noCamera: true,
    noCaptions: true,
    noBrolls: true,
    noOverlays: true
  });
  assert.equal(plan.sfx.length, 0);
  assert.equal(plan.cameras.length, 0);
  assert.equal(plan.brolls.length, 0);
  assert.equal(plan.overlays.length, 0);
  assert.equal(plan.captions.enabled, false);
  validatePlan(plan, { duration: source.duration, sfxIds: catalogIds(catalog) });
});

test('detects redundant overlay/B-roll prefixes, inclusions and stems', () => {
  assert.equal(isLexicallyRedundant('CUANDO AUTOMATIZAS', 'CUANDO AUTOMATIZAS LA FACTURACIÓN'), true);
  assert.equal(isLexicallyRedundant('LA FACTURACIÓN', 'CUANDO AUTOMATIZAS LA FACTURACIÓN'), true);
  assert.equal(isLexicallyRedundant('AUTOMATIZAR LA FACTURA', 'CUANDO AUTOMATIZAS LA FACTURACIÓN'), true);
  assert.equal(isLexicallyRedundant('EL SISTEMA RECIBE', 'CUANDO AUTOMATIZAS LA FACTURACIÓN'), false);
});

test('omits a redundant overlay when no non-redundant idea exists', () => {
  const words = [
    { word: 'Automatizar', start: 0.2, end: 0.7 },
    { word: 'la', start: 0.75, end: 0.95 },
    { word: 'factura', start: 1.0, end: 1.5 },
    { word: 'ahorra', start: 1.6, end: 2.1 },
    { word: 'tiempo.', start: 2.2, end: 2.8 }
  ];
  const oneIdea = normalizeTranscript({
    language: 'es',
    text: 'Automatizar la factura ahorra tiempo.',
    words,
    segments: [{ id: 0, text: 'Automatizar la factura ahorra tiempo.', start: 0.2, end: 2.8 }]
  }, { duration: 6.2 });
  const plan = planWithLocal(oneIdea, { ...source, duration: 6.2 }, { sfxCatalog: catalog });
  assert.ok(plan.brolls.length >= 1);
  assert.equal(plan.overlays.length, 0, 'no overlay should duplicate the only B-roll idea');
  validatePlan(plan, { duration: 6.2, sfxIds: catalogIds(catalog) });
});

test('planner overlay text stays aligned with its spoken idea', () => {
  const plan = planWithLocal(transcript, source, { sfxCatalog: catalog });
  const ideas = groupWordsIntoSentences(transcript.words);
  for (const overlay of plan.overlays) {
    assert.ok(Number.isFinite(overlay.semanticStart), `${overlay.id} needs semanticStart`);
    assert.ok(Number.isFinite(overlay.semanticEnd), `${overlay.id} needs semanticEnd`);
    const idea = ideas.find((item) => overlay.semanticStart >= item.start - 0.05 && overlay.semanticEnd <= item.end + 0.05);
    assert.ok(idea, `${overlay.id} semantic window must stay within a spoken idea`);
    assert.ok(overlay.start >= overlay.semanticStart - 0.45, `${overlay.id} starts too early (${overlay.start} vs ${overlay.semanticStart})`);
    assert.ok(overlay.start <= overlay.semanticStart + 0.9, `${overlay.id} starts too late`);
    assert.ok(overlay.end >= overlay.semanticEnd - 0.2, `${overlay.id} does not cover its spoken window`);
    if (overlay.allowOverBroll) assert.ok(plan.brolls.some((b) => overlay.start < b.end && b.start < overlay.end));
  }
  const copy = validateCopy(plan, { strict: true, transcriptText: transcript.text });
  assert.equal(copy.ok, true, JSON.stringify(copy.errors));
});

test('B-roll never crosses into the next idea', () => {
  const plan = planWithLocal(transcript, source, { sfxCatalog: catalog });
  const ideas = groupWordsIntoSentences(transcript.words);
  for (const broll of plan.brolls) {
    const containing = ideas.find((idea) => broll.start >= idea.start - 0.02 && broll.end <= idea.end + 0.05);
    assert.ok(containing, `${broll.id} crosses an idea boundary: ${broll.start}-${broll.end}`);
  }
});

test('detects sequential explanations as flow', () => {
  assert.equal(
    detectVariant('Primero entra la petición, luego pasa al worker y finalmente sale.'),
    'flow'
  );
  assert.equal(
    detectVariant('El proceso entra, encuentra su paso y sale.'),
    'flow'
  );
});

test('sentence grouping and key phrase extraction stay readable', () => {
  const ideas = groupWordsIntoSentences(transcript.words);
  assert.ok(ideas.length >= 4);
  const phrase = pickKeyPhrase('El sistema recibe el pago, verifica los datos y emite la factura.');
  assert.ok(phrase.length <= 54);
  assert.ok(!/,$/.test(phrase));
  assert.equal(trimTrailingStopwords('LA DIFERENCIA NO ESTÁ EN'), 'LA DIFERENCIA');
});

test('short talking heads get a conservative plan', () => {
  const shortRaw = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/transcript.short.json'), 'utf8'));
  const short = normalizeTranscript(shortRaw, { duration: shortRaw.meta.duration });
  const plan = planWithLocal(short, { ...source, duration: shortRaw.meta.duration }, { sfxCatalog: catalog });
  validatePlan(plan, { duration: shortRaw.meta.duration, sfxIds: catalogIds(catalog) });
  assert.ok(plan.brolls.length >= 1, 'short clip with content needs a visual support');
  assert.ok(plan.overlays.length >= 1, 'short clip with content needs an overlay');
  assert.ok(plan.cameras.length <= 1);
  assert.ok(plan.sfx.every((entry) => typeof entry.target === 'string'));
});

test('planner camera moves attach to transcript pause boundaries when available', () => {
  const words = [
    { word: 'Empezamos', start: 0.1, end: 0.5 },
    { word: 'con', start: 0.5, end: 0.7 },
    { word: 'una', start: 0.7, end: 0.9 },
    { word: 'idea.', start: 0.9, end: 1.3 },
    { word: 'Después', start: 3.0, end: 3.4 },
    { word: 'viene', start: 3.4, end: 3.7 },
    { word: 'el', start: 3.7, end: 3.8 },
    { word: 'cierre.', start: 3.8, end: 4.3 }
  ];
  const synthetic = normalizeTranscript({ language: 'es', text: 'Empezamos con una idea. Después viene el cierre.', words, segments: [{ id: 0, text: 'Empezamos con una idea.', start: 0.1, end: 1.3 }, { id: 1, text: 'Después viene el cierre.', start: 3.0, end: 4.3 }] }, { duration: 5 });
  const plan = planWithLocal(synthetic, { ...source, duration: 5 }, { sfxCatalog: catalog });
  assert.ok(plan.cameras.length >= 1);
  assert.ok(plan.cameras[0].start >= 1.0 && plan.cameras[0].start <= 2.6, `camera should land near the pause, got ${plan.cameras[0].start}`);
});

test('v2 retention planner generates hook at 0.05s, <=3.5s visual gaps, rich overlays, cameras and distinct SFX', () => {
  const realPath = path.join(ROOT, 'animaciones/editor_runs/talking_head_real_sedev/transcript.json');
  if (!fs.existsSync(realPath)) return;
  const realRaw = JSON.parse(fs.readFileSync(realPath, 'utf8'));
  const realTranscript = normalizeTranscript(realRaw, { duration: realRaw.meta.duration });
  const plan = planWithLocal(realTranscript, { ...source, duration: realRaw.meta.duration }, { sfxCatalog: catalog });
  assert.ok(plan.overlays.length >= 4);
  assert.equal(plan.overlays[0].start, 0.05);
  assert.equal(plan.overlays[0].style, 'hook_kinetic');
  assert.ok(plan.overlays.some((o) => o.style === 'logo_grid'));
  assert.ok(plan.overlays.some((o) => o.style === 'cta_debate'));
  assert.ok(plan.cameras.length >= 3);
  assert.ok(plan.cameras.some((c) => c.type === 'punch'));
  const distinctSfx = new Set(plan.sfx.map((s) => s.sound));
  assert.ok(distinctSfx.size >= 5, `expected >= 5 distinct SFX, got ${distinctSfx.size}`);
  for (let i = 1; i < plan.sfx.length; i++) {
    assert.notEqual(plan.sfx[i].sound, plan.sfx[i - 1].sound);
  }
  const visuals = [...plan.brolls, ...plan.overlays].sort((a, b) => a.start - b.start);
  let prevEnd = 0;
  for (const v of visuals) {
    assert.ok(v.start - prevEnd <= 3.5, `visual gap ${prevEnd} -> ${v.start} exceeds 3.5s`);
    prevEnd = Math.max(prevEnd, v.end);
  }
  assert.ok(realRaw.meta.duration - prevEnd <= 3.5, `trailing gap ${prevEnd} -> ${realRaw.meta.duration} exceeds 3.5s`);
  const copy = validateCopy(plan, { strict: true, transcriptText: realTranscript.text });
  assert.equal(copy.ok, true, JSON.stringify(copy.errors));
  assert.equal(plan.overlays[0].text, '¿EL FIN DEL SAAS?');
  assert.equal(plan.overlays.find((o) => o.style === 'logo_grid').text, 'LOS GIGANTES SE QUEDAN');
  assert.equal(plan.overlays.find((o) => o.style === 'cta_debate').text, '¿TÚ QUÉ OPINAS?');
  assert.equal(plan.brolls[0].props.headline, 'MENOS SAAS NUEVO');
  assert.equal(plan.brolls[1].props.headline, 'AGENTES vs SOFTWARE A MEDIDA');
});
