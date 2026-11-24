const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const {
  llmConfigFromEnv,
  endpointFor,
  buildPrompt,
  planWithLlm,
  resolvePlannerMode,
  LlmPlannerError
} = require('../editor/llm_planner');
const { normalizeTranscript } = require('../editor/transcript');
const { loadCatalog } = require('../editor/sfx_catalog');

const ROOT = path.resolve(__dirname, '../..');
const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/transcript.sample.json'), 'utf8'));
const transcript = normalizeTranscript(raw, { duration: raw.meta.duration });
const planTemplate = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/plan.sample.json'), 'utf8'));
const catalog = loadCatalog();
const source = {
  video: 'C:\\videos\\toma final.mp4',
  duration: planTemplate.source.duration,
  width: 1080,
  height: 1920,
  fps: 30,
  hash: 'fixture'
};

test('LLM config is environment-driven with no hardcoded key', () => {
  assert.equal(llmConfigFromEnv({}), null);
  assert.equal(llmConfigFromEnv({ SEDEV_LLM_BASE_URL: 'http://x' }), null);
  const cfg = llmConfigFromEnv({
    SEDEV_LLM_BASE_URL: 'http://127.0.0.1:1234/v1/',
    SEDEV_LLM_MODEL: 'local-model',
    SEDEV_LLM_TIMEOUT_MS: '5000'
  });
  assert.equal(cfg.baseUrl, 'http://127.0.0.1:1234/v1/');
  assert.equal(cfg.apiKey, '');
  assert.equal(cfg.timeoutMs, 5000);
  assert.equal(endpointFor('http://127.0.0.1:1234/v1/'), 'http://127.0.0.1:1234/v1/chat/completions');
  assert.equal(endpointFor('http://127.0.0.1:1234/v1/chat/completions'), 'http://127.0.0.1:1234/v1/chat/completions');
});

test('planner auto mode resolves local when the LLM is not configured', () => {
  assert.equal(resolvePlannerMode('auto', {}).mode, 'local');
  assert.equal(resolvePlannerMode('local', { SEDEV_LLM_BASE_URL: 'x', SEDEV_LLM_MODEL: 'y' }).mode, 'local');
  assert.throws(() => resolvePlannerMode('llm', {}), LlmPlannerError);
});

test('prompt includes the strict contract, duration and SFX ids', () => {
  const prompt = buildPrompt({ transcript, source, sfxCatalog: catalog });
  assert.match(prompt, /Devuelve SOLO JSON válido/);
  assert.match(prompt, /editorial_explainer/);
  assert.match(prompt, /soft_whoosh/);
  assert.match(prompt, new RegExp(source.duration.toFixed(3)));
  assert.match(prompt, /No inventes datos/);
});

test('LLM adapter accepts a valid plan through an injected fetch', async () => {
  let calls = 0;
  const fetchImpl = async (url, init) => {
    calls++;
    assert.match(url, /\/chat\/completions$/);
    const body = JSON.parse(init.body);
    assert.equal(body.model, 'local-model');
    assert.equal(init.headers.Authorization, undefined);
    return {
      ok: true,
      json: async () => ({
        choices: [{ message: { content: JSON.stringify(planTemplate) } }]
      })
    };
  };
  const plan = await planWithLlm({
    transcript,
    source,
    config: { baseUrl: 'http://127.0.0.1:1234/v1', model: 'local-model', apiKey: '', timeoutMs: 5000, temperature: 0.2 },
    sfxCatalog: catalog,
    fetchImpl
  });
  assert.equal(calls, 1);
  assert.equal(plan.brolls.length, 2);
  assert.equal(plan.source.duration, source.duration);
});

test('LLM invalid JSON and invalid plans are rejected, never rendered', async () => {
  const config = { baseUrl: 'http://127.0.0.1:1234/v1', model: 'm', apiKey: '', timeoutMs: 1000, temperature: 0.2 };
  await assert.rejects(() => planWithLlm({
    transcript,
    source,
    config,
    sfxCatalog: catalog,
    fetchImpl: async () => ({ ok: true, json: async () => ({ choices: [{ message: { content: 'not json' } }] }) })
  }), LlmPlannerError);

  const badPlan = JSON.parse(JSON.stringify(planTemplate));
  badPlan.brolls[0].end = source.duration + 10;
  await assert.rejects(() => planWithLlm({
    transcript,
    source,
    config,
    sfxCatalog: catalog,
    fetchImpl: async () => ({ ok: true, json: async () => ({ choices: [{ message: { content: JSON.stringify(badPlan) } }] }) })
  }), /validación/);
});

test('LLM HTTP errors surface without a fallback MP4', async () => {
  await assert.rejects(() => planWithLlm({
    transcript,
    source,
    config: { baseUrl: 'http://127.0.0.1:1234/v1', model: 'm', apiKey: '', timeoutMs: 1000, temperature: 0.2 },
    sfxCatalog: catalog,
    fetchImpl: async () => ({ ok: false, status: 503, text: async () => 'unavailable' })
  }), /503/);
});
