// Optional LLM planner adapter. It is provider-agnostic (OpenAI-compatible
// chat completions) and only reads configuration from the environment:
//   SEDEV_LLM_BASE_URL   e.g. http://127.0.0.1:11434/v1
//   SEDEV_LLM_MODEL      e.g. qwen2.5:14b
//   SEDEV_LLM_API_KEY    optional (local servers may not need one)
//   SEDEV_LLM_TIMEOUT_MS optional
// No key is hardcoded and no request happens unless this adapter is selected.

const { stripJsonFences, isPlainObject } = require('./utils');
const { validatePlan, LIMITS, COMPONENTS, OVERLAY_STYLES, CAMERA_TYPES } = require('./plan_schema');

class LlmPlannerError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'LlmPlannerError';
    this.cause = options.cause;
    this.details = options.details;
  }
}

function llmConfigFromEnv(env = process.env) {
  const baseUrl = String(env.SEDEV_LLM_BASE_URL || '').trim();
  const model = String(env.SEDEV_LLM_MODEL || '').trim();
  if (!baseUrl || !model) return null;
  const timeout = Number(env.SEDEV_LLM_TIMEOUT_MS);
  return {
    baseUrl,
    model,
    apiKey: String(env.SEDEV_LLM_API_KEY || '').trim(),
    timeoutMs: Number.isFinite(timeout) && timeout > 0 ? timeout : 120000,
    temperature: Number.isFinite(Number(env.SEDEV_LLM_TEMPERATURE)) ? Number(env.SEDEV_LLM_TEMPERATURE) : 0.2
  };
}

function endpointFor(baseUrl) {
  const clean = String(baseUrl).replace(/\/+$/, '');
  return /\/chat\/completions$/i.test(clean) ? clean : `${clean}/chat/completions`;
}

function buildPrompt({ transcript, source, sfxCatalog }) {
  const duration = Number(source.duration);
  const sounds = sfxCatalog ? sfxCatalog.sounds.map((s) => ({ id: s.id, category: s.category, tags: s.tags, gainDb: s.defaultGainDb })) : [];
  const schemaExample = {
    version: '1',
    source: {
      video: '<ruta>',
      duration,
      width: source.width || 1080,
      height: source.height || 1920,
      fps: source.fps || 30,
      hash: source.hash || null
    },
    transcript: { language: transcript.language, text: transcript.text.slice(0, 1200) },
    captions: {
      enabled: true,
      maxCharsPerLine: 32,
      maxLines: 2,
      minDuration: 0.8,
      overBroll: false,
      highlightWords: ['palabra', 'clave']
    },
    brolls: [{
      id: 'broll_1',
      start: 8.95,
      end: 12.2,
      concept: 'freno de nuevo saas',
      narrative: 'Mostrar tendencia descendente de nuevo SaaS frente a incumbentes.',
      component: 'editorial_explainer',
      props: {
        variant: 'cause',
        headline: 'MENOS SAAS NUEVO',
        accent: '#b85f42',
        ground: 'ivory',
        icon: 'market_trend_down',
        trend: 'down',
        leftLabel: 'SAAS NUEVO ↓',
        rightLabel: 'INCUMBENTES =',
        imageQuery: 'software market decline dark minimal'
      }
    }],
    overlays: [
      {
        id: 'overlay_1',
        start: 0.05,
        end: 2.5,
        style: 'hook_kinetic',
        text: '¿EL FIN DEL SAAS?',
        highlight: 'EL SAAS',
        icon: 'cloud_slash',
        accent: '#10b981',
        position: 'top',
        semanticStart: 0.0,
        semanticEnd: 2.4
      },
      {
        id: 'overlay_2',
        start: 4.36,
        end: 7.1,
        style: 'logo_grid',
        text: 'LOS GIGANTES SE QUEDAN',
        logos: ['salesforce', 'hubspot', 'notion', 'slack'],
        accent: '#d08a5a',
        position: 'top',
        semanticStart: 4.36,
        semanticEnd: 6.8
      }
    ],
    cameras: [
      { id: 'camera_1', start: 0.05, end: 1.4, type: 'push', intensity: 0.52 },
      { id: 'camera_2', start: 4.36, end: 5.7, type: 'punch', intensity: 0.5 }
    ],
    sfx: [
      { id: 'sfx_1', at: 0.05, sound: 'hook_impact', gainDb: -13, reason: 'Impacto inicial del hook' },
      { id: 'sfx_2', at: 4.38, sound: 'card_snap', gainDb: -14, reason: 'Entrada de logos SaaS' },
      { id: 'sfx_3', at: 8.97, sound: 'soft_whoosh', gainDb: -15, reason: 'Entrada del B-roll de tendencia' }
    ]
  };

  return [
    'Eres un editor de vídeo editorial de alta retención para talking heads tecnológicos en vertical 1080x1920.',
    'Devuelve SOLO JSON válido, sin markdown, sin explicaciones.',
    'Reglas duras:',
    `- Duración total: ${duration.toFixed(3)} s. Todo tiempo es absoluto y debe quedar dentro de [0, ${duration.toFixed(3)}].`,
    '- Hook obligatorio en t = 0.05 s (overlay style "hook_kinetic" + icon + cámara push/punch + SFX de impacto).',
    '- Cadencia de retención: evento visual (overlay o B-roll) cada 2.0 s – 3.5 s como máximo, sin huecos muertos largos.',
    '- No inventes datos, cifras ni telemetría. Usa solo lo que aparece en la transcripción.',
    '- REGLA DE COPY EDITORIAL: cero badges, kickers, pills ni frases de relleno (PROHIBIDO incluir campos badge, kicker, support o subtext).',
    '- Cada headline de B-roll y cada texto de overlay debe ser una REESCRITURA EDITORIAL de 2 a 5 palabras en español natural (nunca cortes fragmentos literales del transcript ni copies 4+ palabras seguidas).',
    '- PROHIBIDO terminar titulares con auxiliares, artículos, preposiciones o conjunciones (vayan, va, van, puedan, de, la, el, los, que, a, y, hacia).',
    '- PROHIBIDO vocabulario genérico (MERCADO TECH, BASE INSTALADA, CAMBIO EN INDUSTRIA, CLAVE, DEBATE, OPCIÓN 01, OPCIÓN 02, TENDENCIA, CAUSA, EFECTO).',
    '- B-rolls: mínimo 1.2 s y máximo 4.2 s cada uno. No se solapan. Usa iconos reales (leftIcon, rightIcon, icon), etiquetas cortas (leftLabel, rightLabel, items), logos o imageQuery.',
    `- Componentes permitidos: ${Object.keys(COMPONENTS).join(', ')} (preferencia: editorial_explainer).`,
    `- Variantes válidas de editorial_explainer: ${COMPONENTS.editorial_explainer.variants.join(', ')}.`,
    `- Overlays: texto corto (<= ${LIMITS.maxOverlayChars} caracteres), no se solapan y no tapan el rostro (top o bottom). Estilos válidos: ${OVERLAY_STYLES.join(', ')}.`,
    `- Cámara: solo sobre talking head, tipos válidos: ${CAMERA_TYPES.join(', ')} ("punch" hace jump-cut 1.11x al tercio superior), intensidad 0.4-0.7, cobertura total <= 35%, no cae sobre B-roll.`,
    '- SFX: solo IDs del catálogo. Ganancia entre -30 y 0 dB (recomendado -13 a -16 dB). No caen a menos de 0.35 s entre sí y PROHIBIDO repetir el mismo sound ID de forma consecutiva.',
    '- Captions: frases cortas, 1-2 líneas, máximo 2. No tapar B-roll (overBroll=false).',
    `- Límites globales: B-roll <= ${LIMITS.maxBrolls}, overlays <= ${LIMITS.maxOverlays}, cámaras <= ${LIMITS.maxCameras}, SFX <= ${LIMITS.maxSfx}.`,
    '',
    'Catálogo SFX local (usa solo estos id):',
    JSON.stringify(sounds),
    '',
    'Contrato JSON de referencia (misma forma, valores adaptados a la transcripción):',
    JSON.stringify(schemaExample, null, 2),
    '',
    'Transcripción con timestamps de palabra:',
    JSON.stringify({
      language: transcript.language,
      text: transcript.text,
      segments: transcript.segments.map((s) => ({ start: s.start, end: s.end, text: s.text })),
      words: transcript.words.map((w) => ({ word: w.word, start: w.start, end: w.end }))
    })
  ].join('\n');
}

function extractContent(responseJson) {
  const choice = responseJson && Array.isArray(responseJson.choices) ? responseJson.choices[0] : null;
  const content = choice && choice.message ? choice.message.content : null;
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.map((part) => (typeof part === 'string' ? part : part && part.text ? part.text : '')).join('');
  }
  if (responseJson && typeof responseJson.response === 'string') return responseJson.response;
  throw new LlmPlannerError('La respuesta del LLM no contiene texto en choices[0].message.content.');
}

async function planWithLlm({ transcript, source, config, sfxCatalog, fetchImpl }) {
  if (!config || !config.baseUrl || !config.model) {
    throw new LlmPlannerError('Planner LLM sin configurar. Define SEDEV_LLM_BASE_URL y SEDEV_LLM_MODEL, o usa --planner local.');
  }
  const doFetch = fetchImpl || globalThis.fetch;
  if (typeof doFetch !== 'function') throw new LlmPlannerError('Este runtime no expone fetch; usa el planner local.');
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), config.timeoutMs) : null;
  let response;
  try {
    response = await doFetch(endpointFor(config.baseUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {})
      },
      body: JSON.stringify({
        model: config.model,
        temperature: config.temperature,
        stream: false,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'Devuelve únicamente JSON válido que cumpla el contrato.' },
          { role: 'user', content: buildPrompt({ transcript, source, sfxCatalog }) }
        ]
      }),
      signal: controller ? controller.signal : undefined
    });
  } catch (err) {
    if (timer) clearTimeout(timer);
    throw new LlmPlannerError(`No se pudo contactar con el planner LLM: ${err.message}`, { cause: err });
  }
  if (timer) clearTimeout(timer);
  if (!response || !response.ok) {
    const status = response ? response.status : 'sin respuesta';
    let detail = '';
    try { detail = await response.text(); } catch (err) { detail = ''; }
    throw new LlmPlannerError(`El planner LLM respondió ${status}. ${detail.slice(0, 500)}`);
  }
  let payload;
  try {
    payload = await response.json();
  } catch (err) {
    throw new LlmPlannerError(`Respuesta del LLM no es JSON: ${err.message}`, { cause: err });
  }
  const content = extractContent(payload);
  let rawPlan;
  try {
    rawPlan = JSON.parse(stripJsonFences(content));
  } catch (err) {
    throw new LlmPlannerError(`El LLM devolvió JSON inválido: ${err.message}`, { details: content.slice(0, 800) });
  }
  if (!isPlainObject(rawPlan)) throw new LlmPlannerError('El LLM devolvió un plan que no es un objeto.');
  // Always overwrite source metadata with measured values; the model cannot
  // widen the duration or pretend a different video.
  rawPlan.source = { ...(rawPlan.source || {}), ...source, duration: source.duration };
  try {
    return validatePlan(rawPlan, {
      duration: source.duration,
      sfxIds: sfxCatalog ? sfxCatalog.sounds.map((s) => s.id) : undefined,
      videoPath: source.video
    });
  } catch (err) {
    throw new LlmPlannerError(`El plan del LLM no pasó la validación: ${err.message}`, { cause: err, details: err.errors });
  }
}

function resolvePlannerMode(requested, env = process.env) {
  if (requested === 'local') return { mode: 'local', config: null };
  if (requested === 'llm') {
    const config = llmConfigFromEnv(env);
    if (!config) throw new LlmPlannerError('--planner llm requiere SEDEV_LLM_BASE_URL y SEDEV_LLM_MODEL.');
    return { mode: 'llm', config };
  }
  const config = llmConfigFromEnv(env);
  return { mode: config ? 'llm' : 'local', config };
}

module.exports = {
  LlmPlannerError,
  llmConfigFromEnv,
  endpointFor,
  buildPrompt,
  extractContent,
  planWithLlm,
  resolvePlannerMode
};
