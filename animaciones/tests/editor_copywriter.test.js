const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const {
  rewriteHeadline,
  validateHeadline,
  validateCopy,
  findTranscriptNgramOverlap,
  hasBannedSlop,
  endsWithForbiddenWord
} = require('../editor/copywriter');
const { validatePlan, PlanValidationError } = require('../editor/plan_schema');
const { buildPrompt } = require('../editor/llm_planner');
const { loadCatalog, catalogIds } = require('../editor/sfx_catalog');

const ROOT = path.resolve(__dirname, '../..');
const basePlan = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/plan.sample.json'), 'utf8'));
const catalog = loadCatalog();
const sfxIds = catalogIds(catalog);

function clonePlan() {
  return JSON.parse(JSON.stringify(basePlan));
}

test('copywriter covers all 6 semantic intents with natural 2-5 word headlines', () => {
  const cases = [
    {
      role: 'hook',
      text: '¿Ustedes creen que vamos a ver la desaparición de los SaaS?',
      expectedIntent: 'disappearance_question',
      expectedText: '¿EL FIN DEL SAAS?'
    },
    {
      role: 'overlay',
      text: 'Yo no creo que los SaaS grandes vayan a desaparecer de la noche a la mañana.',
      expectedIntent: 'incumbent_persistence',
      expectedText: 'LOS GIGANTES SE QUEDAN'
    },
    {
      role: 'broll',
      variant: 'cause',
      text: 'Va a mermar mucho la creación de nuevo software como servicio.',
      expectedIntent: 'creation_decline',
      expectedText: 'MENOS SAAS NUEVO'
    },
    {
      role: 'broll',
      variant: 'comparison',
      text: 'La industria se va a inclinar hacia los agentes como servicio o hacia el custom software.',
      expectedIntent: 'comparison_ab',
      expectedText: 'AGENTES vs SOFTWARE A MEDIDA'
    },
    {
      role: 'overlay',
      text: 'hacia el custom software como servicio',
      expectedIntent: 'industry_shift',
      expectedText: 'SOFTWARE A MEDIDA'
    },
    {
      role: 'cta',
      text: 'pero ¿qué opinan ustedes como ven en el mercado?',
      expectedIntent: 'audience_cta',
      expectedText: '¿TÚ QUÉ OPINAS?'
    }
  ];

  for (const c of cases) {
    const res = rewriteHeadline({ text: c.text, role: c.role, variant: c.variant, transcriptText: c.text });
    assert.equal(res.intent, c.expectedIntent, `intent mismatch for ${c.text}`);
    assert.equal(res.text, c.expectedText);
    const check = validateHeadline(res.text, c.text);
    assert.equal(check.ok, true, JSON.stringify(check.errors));
  }
});

test('copywriter falls back to icon-only rather than slicing raw transcript fragments', () => {
  const unmatched = 'Hoy hablamos de algo completamente distinto sin entidad';
  const res = rewriteHeadline({ text: unmatched, role: 'overlay', transcriptText: unmatched });
  assert.equal(res.iconOnly, true);
  assert.equal(res.text, '');
  assert.equal(res.intent, null);
});

test('copy validator rejects banned slop vocabulary, trailing stopwords, 4-gram copies and bad lengths', () => {
  for (const slop of [
    'MERCADO TECH',
    'BASE INSTALADA',
    'CAMBIO EN INDUSTRIA',
    'CLAVE',
    'DEBATE',
    'OPCIÓN 01',
    'OPCIÓN 02',
    'TENDENCIA',
    'Ecosistema SaaS enterprise',
    'Deja tu opinión en comentarios',
    'CAUSA',
    'EFECTO'
  ]) {
    assert.ok(hasBannedSlop(slop), `expected slop rejection for "${slop}"`);
  }

  for (const truncated of [
    'LOS SAAS GRANDES VAYAN',
    'EL MERCADO VA',
    'CAMINO HACIA',
    'LA CREACIÓN DE',
    'SISTEMAS QUE',
    'VENTA Y'
  ]) {
    assert.ok(endsWithForbiddenWord(truncated), `expected trailing word rejection for "${truncated}"`);
    assert.equal(validateHeadline(truncated).ok, false);
  }

  const transcript = 'Yo no creo que los SaaS grandes vayan a desaparecer de la noche a la mañana';
  assert.ok(findTranscriptNgramOverlap('CREO QUE LOS SAAS', transcript, 4));
  assert.equal(validateHeadline('CREO QUE LOS SAAS', transcript).ok, false);

  assert.equal(validateHeadline('SOLO').ok, false);
  assert.equal(validateHeadline('UNO DOS TRES CUATRO CINCO SEIS').ok, false);
  assert.equal(validateHeadline('', transcript, { allowEmpty: true }).ok, true);
});

test('plan_schema rejects slop, trailing auxiliaries, 4-gram copies and bad word counts', () => {
  const slopPlan = clonePlan();
  slopPlan.overlays[0].badge = 'MERCADO TECH';
  assert.throws(() => validatePlan(slopPlan, { duration: 24.499, sfxIds }), PlanValidationError);

  const truncatedPlan = clonePlan();
  truncatedPlan.overlays[0].text = 'LOS SAAS GRANDES VAYAN';
  assert.throws(() => validatePlan(truncatedPlan, { duration: 24.499, sfxIds }), /truncada|auxiliar/);

  const ngramPlan = clonePlan();
  ngramPlan.overlays[0].text = 'TRES PASOS MANUALES DESAPARECEN';
  assert.throws(() => validatePlan(ngramPlan, { duration: 24.499, sfxIds }), /4\+ palabras/);

  const longPlan = clonePlan();
  longPlan.brolls[0].props.headline = 'UNO DOS TRES CUATRO CINCO SEIS';
  assert.throws(() => validatePlan(longPlan, { duration: 24.499, sfxIds }), /palabras/);

  const iconOnlyPlan = clonePlan();
  iconOnlyPlan.overlays[0] = {
    id: 'overlay_1',
    start: 1.9,
    end: 3.6,
    style: 'icon_pop',
    text: '',
    icon: 'custom_code',
    position: 'top',
    allowOverBroll: true
  };
  const validIconOnly = validatePlan(iconOnlyPlan, { duration: 24.499, sfxIds });
  assert.equal(validIconOnly.overlays[0].text, '');
});

test('validateCopy strict mode forbids badge, kicker, support and subtext', () => {
  const plan = clonePlan();
  const res = validateCopy(plan, { strict: true });
  assert.equal(res.ok, false);
  assert.ok(res.errors.some((e) => e.includes('kicker') || e.includes('support')));
});

test('llm_planner prompt enforces zero slop and editorial headline rules', () => {
  const prompt = buildPrompt({
    transcript: { language: 'es', text: 'Prueba', segments: [], words: [] },
    source: { duration: 15, width: 1080, height: 1920, fps: 30 },
    sfxCatalog: catalog
  });
  assert.match(prompt, /REESCRITURA EDITORIAL de 2 a 5 palabras/);
  assert.match(prompt, /PROHIBIDO incluir campos badge, kicker, support o subtext/);
  assert.doesNotMatch(prompt, /"badge":\s*"MERCADO TECH"/);
  assert.doesNotMatch(prompt, /"kicker":\s*"IMPACTO EN MERCADO"/);
});
