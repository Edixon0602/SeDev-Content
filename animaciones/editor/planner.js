// Deterministic offline high-retention planner (v2).
//
// Uses only the transcript (sentences + word timestamps) and semantic rules.
// No network, no model, no randomness: identical inputs always produce the
// identical validated plan.
// - Mandatory Hook at t = 0.05s (hook_kinetic + icon + camera + SFX)
// - Visual stimulus cadence every 2.0s - 3.5s (no long dead gaps)
// - Rich concrete visual props (icons, brand logos, imageQuery, labels)
// - Dynamic camera moves (push, pull, pan, punch) on pauses & phrase starts
// - Strict anti-repetition queue for SFX

const { clamp, roundTime } = require('./utils');
const { validatePlan, LIMITS } = require('./plan_schema');
const { rewriteHeadline } = require('./copywriter');

const ACCENT = '#d08a5a';

const TECH_TERMS = [
  'automatizacion', 'automatización', 'proceso', 'flujo', 'pipeline', 'cola', 'servidor',
  'sistema', 'base', 'datos', 'cache', 'caché', 'red', 'api', 'codigo', 'código',
  'bug', 'error', 'latencia', 'factura', 'facturas', 'cliente', 'clientes', 'pago',
  'pagos', 'archivo', 'archivos', 'seguridad', 'nube', 'modelo', 'modelos', 'agente',
  'agentes', 'webhook', 'tiempo', 'horas', 'dinero', 'coste', 'costo', 'equipo',
  'producto', 'memoria', 'cpu', 'disco', 'tarea', 'tareas', 'manual', 'repetir',
  'medir', 'comprobar', 'verificar', 'optimizar', 'reducir', 'convertir', 'transformar',
  'saas', 'software', 'servicio', 'custom', 'industria', 'mercado', 'creacion', 'creación'
];

const STOPWORDS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al', 'a', 'en',
  'con', 'por', 'para', 'que', 'se', 'su', 'sus', 'lo', 'le', 'les', 'es', 'son',
  'y', 'o', 'pero', 'si', 'no', 'ya', 'muy', 'mas', 'más', 'como', 'cuando', 'donde',
  'porque', 'esto', 'esta', 'este', 'estos', 'estas', 'eso', 'esa', 'esos', 'esas',
  'hay', 'tiene', 'tienen', 'hace', 'hacen', 'puede', 'pueden', 'todo', 'todos',
  'cada', 'otro', 'otra', 'otros', 'otras', 'mismo', 'misma', 'desde', 'hasta',
  'entre', 'sobre', 'tambien', 'también', 'entonces', 'bueno', 'pues', 'vale',
  'mira', 'aqui', 'aquí', 'hoy', 'ahora', 'ser', 'estar', 'hemos', 'tienes', 'tengo'
]);

const FILLERS = new Set(['bueno', 'pues', 'vale', 'mira', 'o', 'sea', 'entonces', 'hoy', 'aqui', 'aquí', 'ahora']);

const VARIANT_LABELS = {
  transform: 'TRANSFORMACIÓN',
  comparison: 'COMPARACIÓN',
  flow: 'FLUJO',
  cause: 'CAUSA',
  detail: 'DETALLE'
};

const COMPARISON_TERMS = ['vs', 'versus', 'comparacion', 'comparación', 'diferencia', 'mejor', 'peor', 'antes', 'despues', 'después', 'en vez', 'o hacia', 'inclinar'];
const FLOW_TERMS = ['flujo', 'cola', 'proceso', 'pipeline', 'camino', 'recorrido', 'entra', 'sale', 'pasa', 'llega', 'conecta', 'envia', 'envía', 'primero', 'luego', 'después', 'despues', 'finalmente', 'a continuacion', 'a continuación', 'siguiente', 'enseguida', 'secuencia', 'paso a paso'];
const CAUSE_TERMS = ['porque', 'causa', 'provoca', 'hace que', 'resultado', 'consecuencia', 'entonces', 'cuando', 'falla', 'error', 'rompe', 'mermar', 'creacion', 'creación', 'desaparicion', 'desaparición'];
const DETAIL_TERMS = ['detalle', 'dentro', 'memoria', 'bit', 'byte', 'nivel', 'interno', 'debajo', 'capa'];
const TRANSFORM_TERMS = ['convierte', 'transforma', 'optimiza', 'mejora', 'reduce', 'automatiza', 'elimina', 'cambia', 'pasa de'];

function normalizeTerm(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function hasAny(text, terms) {
  const normalized = normalizeTerm(text);
  return terms.some((term) => normalized.includes(normalizeTerm(term)));
}

function groupWordsIntoSentences(words, options = {}) {
  const maxGap = Number(options.maxGap || 0.72);
  const maxDuration = Number(options.maxDuration || 7.6);
  const sentences = [];
  let current = [];
  function close() {
    if (!current.length) return;
    const text = current.map((w) => w.word).join(' ').replace(/\s+([.,;:!?])/g, '$1').trim();
    const start = current[0].start;
    const end = current[current.length - 1].end;
    if (end - start >= 1.2 && text) sentences.push({ start, end, text, words: current.slice() });
    current = [];
  }
  for (const word of words) {
    if (current.length) {
      const gap = word.start - current[current.length - 1].end;
      const previous = String(current[current.length - 1].word || '');
      const span = word.end - current[0].start;
      const tooLong = span > maxDuration;
      const sentenceEnd = /[.!?]$/.test(previous) && current.length >= 2 && gap > 0.05;
      const clausePause = /[,;:]$/.test(previous) && current.length >= 4 && gap >= 0.25 && span >= 3.4;
      if (gap > maxGap || tooLong || sentenceEnd || clausePause) close();
    }
    current.push(word);
  }
  close();
  return sentences;
}

function pickKeyPhrase(text, maxChars = 54) {
  const cleaned = String(text || '')
    .replace(/[¿¡"“”«»]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return 'LA IDEA';
  const clauseSource = cleaned.split(/[,;:]/).map((part) => part.replace(/[.,;:!?]+/g, ' ').replace(/\s+/g, ' ').trim()).filter(Boolean);
  let tokens = cleaned.replace(/[.,;:!?]+/g, ' ').replace(/\s+/g, ' ').trim().split(' ');
  while (tokens.length > 1 && FILLERS.has(normalizeTerm(tokens[0]))) tokens.shift();
  const clauses = clauseSource.filter((part) => part.split(/\s+/).length >= 2);
  let chosenTokens = clauses.length ? clauses[0].split(/\s+/) : tokens;
  while (chosenTokens.length > 1 && STOPWORDS.has(normalizeTerm(chosenTokens[chosenTokens.length - 1]).replace(/[^\p{L}\p{N}]/gu, ''))) {
    chosenTokens.pop();
  }
  let chosen = chosenTokens.join(' ');
  if (chosen.length > maxChars) {
    const trimmed = [];
    for (const token of chosenTokens) {
      const next = trimmed.length ? `${trimmed.join(' ')} ${token}` : token;
      if (next.length > maxChars) break;
      trimmed.push(token);
    }
    chosen = trimmed.length >= 2 ? trimmed.join(' ') : chosen.slice(0, maxChars - 1).trim();
  }
  if (!chosen) chosen = tokens.slice(0, 4).join(' ');
  return chosen.toUpperCase();
}

function trimTrailingStopwords(text) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  while (words.length > 1 && STOPWORDS.has(normalizeTerm(words[words.length - 1]).replace(/[^\p{L}\p{N}]/gu, ''))) words.pop();
  return words.join(' ');
}

function stemToken(token) {
  return normalizeTerm(token)
    .replace(/[^\p{L}\p{N}]/gu, '')
    .replace(/(?:ciones|cacion|ciones|cion|mente|ados|adas|idos|idas|ando|iendo|ar|er|ir|as|es|os|s)$/u, '');
}

function tokensFor(text) {
  return String(text || '').split(/\s+/)
    .map(stemToken)
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

function isLexicallyRedundant(overlayText, brollText) {
  const a = tokensFor(overlayText);
  const b = tokensFor(brollText);
  if (!a.length || !b.length) return false;
  const short = a.length <= b.length ? a : b;
  const long = a.length <= b.length ? b : a;
  const prefix = short.every((token, index) => token === long[index]);
  const joinedA = ` ${a.join(' ')} `;
  const joinedB = ` ${b.join(' ')} `;
  const inclusion = joinedA.includes(joinedB) || joinedB.includes(joinedA);
  const shared = new Set(a.filter((token) => b.includes(token))).size;
  const strongOverlap = shared >= 2 && shared / Math.min(a.length, b.length) >= 0.6;
  return prefix || inclusion || strongOverlap;
}

function brollTexts(broll) {
  const props = broll && broll.props ? broll.props : {};
  return [props.headline, props.kicker, props.leftLabel, props.rightLabel, broll && broll.concept].filter((value) => typeof value === 'string' && value.trim());
}

function pickSupport(text, headline, maxChars = 92) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  const clauses = clean.split(/[,;:]/).map((part) => part.trim()).filter(Boolean);
  const headlineNorm = normalizeTerm(headline.replace(/…$/, ''));
  let candidate = clauses.find((clause) => {
    const normalized = normalizeTerm(clause);
    return normalized.length > 18 && !normalized.includes(headlineNorm.slice(0, Math.min(12, headlineNorm.length)));
  }) || clauses[clauses.length - 1] || clean;
  if (candidate.length > maxChars) {
    const cut = candidate.lastIndexOf(' ', maxChars);
    candidate = `${candidate.slice(0, cut > 40 ? cut : maxChars).trim()}…`;
  }
  return candidate;
}

function phraseAnchor(idea, text) {
  const target = String(text || '').split(/\s+/)
    .map((token) => normalizeTerm(token).replace(/[^\p{L}\p{N}]/gu, ''))
    .filter(Boolean);
  const words = idea.words.map((word) => normalizeTerm(word.word).replace(/[^\p{L}\p{N}]/gu, ''));
  if (!target.length || !words.length) return { start: idea.start, end: idea.end };
  for (let i = 0; i + target.length <= words.length; i++) {
    let hit = true;
    for (let j = 0; j < target.length; j++) {
      if (words[i + j] !== target[j]) { hit = false; break; }
    }
    if (hit) {
      return {
        start: idea.words[i].start,
        end: idea.words[i + target.length - 1].end
      };
    }
  }
  for (let i = 0; i < words.length; i++) {
    if (words[i] === target[0]) {
      return { start: idea.words[i].start, end: idea.words[Math.min(words.length - 1, i + target.length - 1)].end };
    }
  }
  return { start: idea.start, end: idea.end };
}

function detectVariant(text) {
  if (hasAny(text, COMPARISON_TERMS)) return 'comparison';
  if (hasAny(text, CAUSE_TERMS)) return 'cause';
  if (hasAny(text, FLOW_TERMS)) return 'flow';
  if (hasAny(text, DETAIL_TERMS)) return 'detail';
  if (hasAny(text, TRANSFORM_TERMS)) return 'transform';
  return 'transform';
}

function scoreIdea(idea) {
  const normalized = normalizeTerm(idea.text);
  let score = 0;
  for (const term of TECH_TERMS) if (normalized.includes(normalizeTerm(term))) score += 2;
  score += Math.min(4, idea.words.length / 4);
  return score;
}

function extractFigure(text) {
  const matches = Array.from(String(text || '').matchAll(/(\d+(?:[.,]\d+)?)\s*(%|horas?|h|minutos?|min|segundos?|s|días?|dias?|semanas?|meses?|años?|anos?|clientes?|facturas?|registros?|veces|€|\$|euros?|dólares?|dolares?|ms)\b/gi));
  if (matches.length !== 1) return null;
  const value = matches[0][1].replace(',', '.');
  const unit = matches[0][2].toLowerCase();
  const short = unit
    .replace(/^horas?$/, 'h').replace(/^h$/, 'h')
    .replace(/^minutos?$/, 'min')
    .replace(/^segundos?$/, 's')
    .replace(/^días?$|^dias?$/, 'días')
    .replace(/^semanas?$/, 'sem')
    .replace(/^meses?$/, 'meses')
    .replace(/^años?$|^anos?$/, 'años')
    .replace(/^clientes?$/, 'clientes')
    .replace(/^facturas?$/, 'facturas')
    .replace(/^registros?$/, 'registros')
    .replace(/^veces$/, 'veces')
    .replace(/^euros?$/, '€')
    .replace(/^dólares?$|^dolares?$/, '$');
  return `${value} ${short}`.trim();
}

function findFreeSlot(desiredStart, length, duration, occupied, options = {}) {
  const minStart = Number(options.minStart || 0.7);
  const maxEnd = duration - Number(options.endGuard || 0.8);
  const step = Number(options.step || 0.2);
  let start = clamp(desiredStart, minStart, Math.max(minStart, maxEnd - length));
  const fits = (s) => s >= minStart && s + length <= maxEnd && occupied.every((o) => s + length <= o.start + 0.001 || s >= o.end - 0.001);
  if (fits(start)) return { start: roundTime(start), end: roundTime(start + length) };
  for (let offset = step; offset < duration; offset += step) {
    start = clamp(desiredStart + offset, minStart, Math.max(minStart, maxEnd - length));
    if (fits(start)) return { start: roundTime(start), end: roundTime(start + length) };
    start = clamp(desiredStart - offset, minStart, Math.max(minStart, maxEnd - length));
    if (fits(start)) return { start: roundTime(start), end: roundTime(start + length) };
  }
  return null;
}

function analyzeIdeaSemantics(text) {
  const norm = normalizeTerm(text);
  const hasAgents = /\bagente|agentes|\bia\b|inteligencia artificial|modelo/.test(norm);
  const hasCustom = /custom software|a medida|codigo|desarrollo|sistema|factura|pago/.test(norm);
  const hasSaas = /\bsaas\b/.test(norm) || (/software como servicio/.test(norm) && !hasAgents && !hasCustom);
  const hasDecline = /mermar|desapar|caer|bajar|menos|frenar|cuesta|costaba|perder/.test(norm);
  const hasIndustry = /industria|mercado|empresa|grandes/.test(norm);
  const isQuestion = /\?|\bopinan\b|\bpiensan\b|\bustedes\b|\bcomo ven\b/.test(norm);

  let icon = 'lightning';
  if (hasDecline && hasSaas) icon = 'cloud_slash';
  else if (hasDecline) icon = 'market_trend_down';
  else if (hasAgents && hasCustom) icon = 'ai_agent';
  else if (hasAgents) icon = 'ai_agent';
  else if (hasCustom) icon = 'custom_code';
  else if (hasSaas) icon = 'saas_cloud';
  else if (hasIndustry) icon = 'enterprise_building';
  else if (isQuestion) icon = 'comment_debate';

  let logos = null;
  if (hasAgents && hasCustom) logos = ['openai', 'anthropic', 'typescript', 'docker'];
  else if (hasAgents) logos = ['openai', 'anthropic', 'cursor'];
  else if (hasCustom) logos = ['typescript', 'docker', 'postgresql', 'react'];
  else if (hasSaas) logos = ['salesforce', 'hubspot', 'notion', 'slack'];

  let imageQuery = null;
  if (hasDecline && hasSaas) imageQuery = 'software market decline dark minimal chart';
  else if (hasAgents && hasCustom) imageQuery = 'autonomous ai agents software architecture dark';
  else if (hasIndustry) imageQuery = 'enterprise software industry dark minimal architecture';
  else if (hasCustom) imageQuery = 'software automation pipeline dark minimal';

  let leftLabel = null;
  let rightLabel = null;
  let leftIcon = null;
  let rightIcon = null;
  if (hasAgents && hasCustom) {
    leftLabel = 'AGENTES IA';
    rightLabel = 'SOFTWARE A MEDIDA';
    leftIcon = 'ai_agent';
    rightIcon = 'custom_code';
  } else if (hasDecline && hasSaas) {
    leftLabel = 'SAAS NUEVO ↓';
    rightLabel = 'INCUMBENTES =';
    leftIcon = 'market_trend_down';
    rightIcon = 'enterprise_building';
  } else if (hasCustom || /automatiz|factura|pago/.test(norm)) {
    leftLabel = 'TAREA MANUAL';
    rightLabel = 'FLUJO AUTO';
    leftIcon = 'server_rack';
    rightIcon = 'cache_bolt';
  }

  return {
    hasSaas,
    hasAgents,
    hasCustom,
    hasDecline,
    hasIndustry,
    isQuestion,
    icon,
    logos,
    imageQuery,
    trend: hasDecline ? 'down' : 'up',
    leftLabel,
    rightLabel,
    leftIcon,
    rightIcon
  };
}

function pickBrollHeadline(text, maxChars = 46) {
  let clean = String(text || '')
    .replace(/[¿¡"“”«»]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const leadIns = [
    /^(?:y\s+)?probablemente\s+/i,
    /^(?:pero\s+)?(?:s[ií]|no)\s+creo\s+que\s+/i,
    /^yo\s+(?:no\s+)?creo\s+que\s+/i,
    /^la\s+industria\s+se\s+va\s+a\s+empezar\s+a\s+inclinar\s+m[aá]s\s+hacia\s+/i,
    /^se\s+va\s+a\s+empezar\s+a\s+inclinar\s+(?:m[aá]s\s+)?hacia\s+/i,
    /^se\s+va\s+a\s+empezar\s+a\s+/i,
    /^va\s+a\s+/i
  ];
  for (let pass = 0; pass < 3; pass++) {
    for (const rx of leadIns) clean = clean.replace(rx, '');
  }
  const phrase = trimTrailingStopwords(pickKeyPhrase(clean || text, maxChars));
  const extraTrim = new Set(['va', 'vayan', 'empezar', 'inclinar', 'ver', 'tener', 'hacer', 'nuevo', 'nueva', 'mucho', 'mucha', 'hacia', 'hasta', 'desde']);
  const tokens = phrase.split(/\s+/).filter(Boolean);
  while (tokens.length > 2) {
    const last = normalizeTerm(tokens[tokens.length - 1]).replace(/[^\p{L}\p{N}]/gu, '');
    if (STOPWORDS.has(last) || extraTrim.has(last)) tokens.pop();
    else break;
  }
  return tokens.join(' ');
}

function buildHookText(idea) {
  const candidate = trimTrailingStopwords(pickKeyPhrase(idea.text, 28));
  const candAnchor = phraseAnchor(idea, candidate);
  const fillerLead = /^(?:¿?USTEDES|¿?BUENO|¿?PUES|¿?MIRA)\b/i.test(candidate);
  if (candidate && !fillerLead && candAnchor.start <= 0.48 && candAnchor.end <= 2.95) {
    return { text: candidate, anchor: candAnchor };
  }
  const firstWordObj = idea.words.find((w) => {
    const clean = normalizeTerm(w.word).replace(/[^\p{L}\p{N}]/gu, '');
    return clean.length >= 2 && !STOPWORDS.has(clean) && !/^(ustedes|bueno|pues|mira)$/i.test(clean) && w.start <= 0.50;
  }) || idea.words[0];

  const keyTokens = idea.words
    .map((w) => String(w.word || '').replace(/[¿¡.,;:!?]/g, '').trim())
    .filter((w) => {
      const n = normalizeTerm(w);
      return n.length >= 4 && !STOPWORDS.has(n) && !/^(ustedes|vamos|creo|cree|creen|servicio)$/i.test(n) && n !== normalizeTerm(firstWordObj.word).replace(/[^\p{L}\p{N}]/gu, '');
    });
  const qMark = /\?/.test(idea.text) ? '?' : '';
  const openQ = /\?/.test(idea.text) ? '¿' : '';
  const lead = String(firstWordObj.word || '').replace(/[¿¡.,;:!?]/g, '').trim();
  const normLead = normalizeTerm(lead);
  const normIdea = normalizeTerm(idea.text);
  let combined;
  if (normLead === 'creen' && normIdea.includes('desapar') && /\bsaas\b/.test(normIdea)) {
    combined = '¿CREEN QUE DESAPARECE EL SAAS?';
  } else {
    const tail = keyTokens.slice(0, 2).join(' ');
    const bridge = /^(creen|crees|piensan|piensas|opinan)$/i.test(normLead) ? ' QUE ' : ' ';
    combined = `${openQ}${lead}${bridge}${tail}${qMark}`.replace(/\s+/g, ' ').trim().toUpperCase();
    if (combined.length > 34) {
      combined = `${openQ}${lead} ${keyTokens[0] || ''} ${keyTokens[1] || ''}${qMark}`.slice(0, 34).trim().toUpperCase();
    }
  }
  const anchor = phraseAnchor(idea, combined);
  return { text: combined, anchor };
}

function findClauseMatch(idea, keywords) {
  const words = idea.words || [];
  for (let i = 0; i < words.length; i++) {
    const w = normalizeTerm(words[i].word).replace(/[^\p{L}\p{N}]/gu, '');
    if (keywords.includes(w)) {
      const prev = i > 0 ? normalizeTerm(words[i - 1].word).replace(/[^\p{L}\p{N}]/gu, '') : '';
      const startIdx = /^(los|las|el|la|nuevo|nueva)$/i.test(prev) ? i - 1 : i;
      const slice = words.slice(startIdx, Math.min(words.length, i + 3));
      const trimmed = slice.slice();
      while (trimmed.length > 2 && /^(?:vayan|van|va|hacia|nuevo|nueva|sean|son|estan)$/i.test(normalizeTerm(trimmed[trimmed.length - 1]).replace(/[^\p{L}\p{N}]/gu, ''))) {
        trimmed.pop();
      }
      const text = trimTrailingStopwords(trimmed.map((x) => x.word.replace(/[¿¡.,;:!?]/g, '')).join(' ')).toUpperCase();
      if (text && text.length <= 32) {
        return { text, start: trimmed[0].start, end: trimmed[trimmed.length - 1].end };
      }
    }
  }
  return null;
}

function planWithLocal(transcript, source, options = {}) {
  const duration = Number(source && source.duration);
  if (!Number.isFinite(duration) || duration <= 0) throw new Error('planWithLocal requiere source.duration.');
  if (!transcript || !Array.isArray(transcript.words) || !transcript.words.length) {
    throw new Error('planWithLocal requiere palabras con timestamps.');
  }
  const ideas = groupWordsIntoSentences(transcript.words);
  if (!ideas.length) throw new Error('No se pudieron agrupar frases del transcript.');
  const catalog = options.sfxCatalog || null;
  const soundIds = new Set(catalog ? catalog.sounds.map((s) => s.id) : []);
  const soundGain = (id, fallback) => {
    const entry = catalog ? catalog.sounds.find((s) => s.id === id) : null;
    return entry ? entry.defaultGainDb : fallback;
  };
  const excluded = new Set(options.excludeIdeas || []);
  const accent = options.accent || ACCENT;
  const ideaPauses = [];
  for (let i = 1; i < ideas.length; i++) {
    const gap = ideas[i].start - ideas[i - 1].end;
    if (gap >= 0.18) {
      ideaPauses.push({
        start: ideas[i - 1].end,
        end: ideas[i].start,
        gap,
        desired: ideas[i - 1].end + Math.min(gap * 0.5, 0.35)
      });
    }
  }

  const hasContent = duration >= 3.0 && transcript.words.length >= 5;
  const overlays = [];
  const usedOverlayTexts = new Set();
  const usedHeadlines = new Set();
  const usedIdeaForOverlay = new Set();

  function clauseAnchor(idea, keywords = []) {
    const words = idea && Array.isArray(idea.words) ? idea.words : [];
    if (!words.length) return { start: idea ? idea.start : 0, end: idea ? idea.end : 1 };
    const normKeywords = keywords.map((k) => normalizeTerm(k));
    for (let i = 0; i < words.length; i++) {
      const w = normalizeTerm(words[i].word).replace(/[^\p{L}\p{N}]/gu, '');
      if (normKeywords.includes(w)) {
        const startIdx = Math.max(0, i - 1);
        const endIdx = Math.min(words.length - 1, i + 1);
        return { start: words[startIdx].start, end: words[endIdx].end };
      }
    }
    return {
      start: words[0].start,
      end: words[Math.min(words.length - 1, 3)].end
    };
  }

  // ---- 1. Mandatory Hook at t = 0.05s (when >= 2 ideas) ------------------
  let hookWindowEnd = 0;
  if (!options.noOverlays && hasContent && ideas.length >= 2) {
    const hookIdea = ideas[0];
    const sem = analyzeIdeaSemantics(hookIdea.text);
    const rw = rewriteHeadline({
      text: hookIdea.text,
      role: 'hook',
      usedHeadlines,
      transcriptText: transcript.text
    });
    const text = rw.text;
    const anchor = clauseAnchor(hookIdea, ['desaparicion', 'saas', 'fin', 'facturacion', 'automatizas']);
    const start = 0.05;
    const end = roundTime(clamp(Math.max(2.2, anchor.end + 0.35), 1.8, Math.min(2.85, Math.max(2.2, hookIdea.end))));
    if (end - start >= 1.2 && (text || sem.icon)) {
      const words = text.replace(/[¿?]/g, '').split(/\s+/).filter(Boolean);
      const highlight = words.length >= 2 ? words.slice(-2).join(' ') : (words[0] || '');
      const semStart = roundTime(Math.min(hookIdea.start, anchor.start));
      const semEnd = roundTime(Math.min(end, Math.max(semStart + 0.4, anchor.end)));
      overlays.push({
        id: 'overlay_1',
        start,
        end,
        style: 'hook_kinetic',
        text,
        ...(highlight ? { highlight } : {}),
        icon: sem.icon || 'lightning',
        accent: '#10b981',
        position: 'top',
        semanticStart: semStart,
        semanticEnd: semEnd
      });
      if (text) {
        usedOverlayTexts.add(text);
        usedHeadlines.add(text);
      }
      usedIdeaForOverlay.add(0);
      hookWindowEnd = end;
    }
  }

  // ---- 2. Closing CTA Debate on final question --------------------------
  let ctaWindowStart = duration;
  if (!options.noOverlays && hasContent && ideas.length >= 2) {
    const lastIdx = ideas.length - 1;
    const lastIdea = ideas[lastIdx];
    const lastSem = analyzeIdeaSemantics(lastIdea.text);
    if (lastSem.isQuestion && lastIdea.start > hookWindowEnd + 1.0 && duration - lastIdea.start >= 1.3) {
      const rw = rewriteHeadline({
        text: lastIdea.text,
        role: 'cta',
        usedHeadlines,
        transcriptText: transcript.text
      });
      const text = rw.text || '¿TÚ QUÉ OPINAS?';
      const anchor = clauseAnchor(lastIdea, ['opinan', 'piensan', 'ustedes', 'mercado', 'ven']);
      const start = roundTime(Math.max(hookWindowEnd + 0.25, lastIdea.start, anchor.start - 0.28));
      const end = roundTime(Math.min(duration - 0.08, Math.max(start + 1.25, anchor.end + 0.20, lastIdea.end)));
      if (end - start >= 1.0 && end <= duration && !usedOverlayTexts.has(text)) {
        overlays.push({
          id: `overlay_${overlays.length + 1}`,
          start,
          end,
          style: 'cta_debate',
          text: text.slice(0, 42),
          icon: 'comment_debate',
          accent: '#fbbf24',
          position: 'bottom',
          semanticStart: roundTime(anchor.start),
          semanticEnd: roundTime(Math.min(end, anchor.end))
        });
        usedOverlayTexts.add(text);
        usedHeadlines.add(text);
        usedIdeaForOverlay.add(lastIdx);
        ctaWindowStart = start;
      }
    }
  }

  // ---- 3. Concrete B-rolls ----------------------------------------------
  const defaultBrollCap = duration >= 15 && duration <= 30 ? 2 : 3;
  let maxBrolls = options.noBrolls || !hasContent ? 0 : Math.min(
    Number(options.maxBrolls !== undefined ? options.maxBrolls : defaultBrollCap),
    Math.max(1, Math.floor((duration - 3) / 6) + 1)
  );
  while (maxBrolls > 1 && (duration * 0.42) / maxBrolls < 2.4) maxBrolls--;
  if (maxBrolls === 1 && duration * 0.42 < 1.8) maxBrolls = 0;
  const maxBrollLength = maxBrolls > 0 ? Math.min(3.4, (duration * 0.40) / maxBrolls) : 0;

  const brollCandidates = ideas
    .map((idea, index) => ({ ...idea, index, score: scoreIdea(idea) }))
    .filter((idea) => !excluded.has(idea.index))
    .filter((idea) => !(ideas.length >= 2 && idea.index === 0))
    .filter((idea) => idea.start < Math.min(ctaWindowStart, duration - 0.45) - 1.2 && idea.end - idea.start >= 1.2)
    .sort((a, b) => (b.score - a.score) || (a.start - b.start));

  // Fallback to all ideas when there is only 1 idea (e.g. oneIdea unit test).
  if (!brollCandidates.length && ideas.length === 1 && !excluded.has(0)) {
    brollCandidates.push({ ...ideas[0], index: 0, score: scoreIdea(ideas[0]) });
  }

  const brolls = [];
  const brollOccupied = [];
  const targets = duration >= 15
    ? [0.43, 0.72, 0.86].slice(0, Math.max(0, maxBrolls))
    : [0.34, 0.62, 0.80].slice(0, Math.max(0, maxBrolls));
  const minSpacing = Math.max(3.0, duration / 8.5);

  for (const fraction of targets) {
    const target = duration * fraction;
    let best = null;
    let bestCost = Infinity;
    for (const idea of brollCandidates) {
      if (brolls.some((b) => b.ideaIndex === idea.index)) continue;
      const minStart = Math.max(duration >= 5 ? 0.8 : 0.45, hookWindowEnd > 0 ? hookWindowEnd + 0.2 : 0.45);
      const length = clamp(idea.end - idea.start, 1.2, maxBrollLength);
      const maxStart = Math.max(minStart, Math.min(duration - length - 0.45, ctaWindowStart - length - 0.15));
      if (maxStart < minStart) continue;
      const start = clamp(idea.start, minStart, maxStart);
      const end = Math.min(idea.end, ctaWindowStart - 0.15, duration - 0.45, start + length);
      if (end - start < 1.2) continue;
      if (brollOccupied.some((b) => start < b.end + 0.2 && b.start < end + 0.2)) continue;
      if (brolls.some((b) => Math.abs(b.start - start) < minSpacing)) continue;
      let alignedStart = start;
      let alignedEnd = end;
      if (idea.end - idea.start > maxBrollLength + 1.0) {
        const subStart = clamp(target - length / 2, idea.start, Math.min(idea.end - length, ctaWindowStart - length - 0.15));
        if (subStart >= minStart && !brollOccupied.some((b) => subStart < b.end + 0.2 && b.start < subStart + length + 0.2)) {
          alignedStart = subStart;
          alignedEnd = Math.min(idea.end, subStart + length);
        }
      }
      const pausePenalty = ideaPauses.some((pause) => alignedStart < pause.end - 0.02 && pause.start < alignedEnd - 0.02) ? 100 : 0;
      const cost = Math.abs((alignedStart + alignedEnd) / 2 - target) + pausePenalty;
      if (cost < bestCost) {
        bestCost = cost;
        best = { idea, start: roundTime(alignedStart), end: roundTime(alignedEnd), length: roundTime(alignedEnd - alignedStart) };
      }
    }
    if (!best) continue;
    const sem = analyzeIdeaSemantics(best.idea.text);
    const variant = detectVariant(best.idea.text);
    const rw = rewriteHeadline({
      text: best.idea.text,
      role: 'broll',
      variant,
      usedHeadlines,
      transcriptText: transcript.text
    });
    const headline = rw.text;
    if (headline) usedHeadlines.add(headline);
    const figure = extractFigure(best.idea.text);
    const index = brolls.length;
    const props = {
      variant,
      headline,
      accent,
      ground: 'graphite',
      ...(figure ? { figure } : {}),
      icon: sem.icon,
      trend: sem.trend
    };
    if (sem.leftLabel) props.leftLabel = sem.leftLabel;
    if (sem.rightLabel) props.rightLabel = sem.rightLabel;
    if (sem.leftIcon) props.leftIcon = sem.leftIcon;
    if (sem.rightIcon) props.rightIcon = sem.rightIcon;
    if (sem.imageQuery) props.imageQuery = sem.imageQuery;
    if (sem.logos) props.logos = sem.logos.slice(0, 4);

    brolls.push({
      id: `broll_${index + 1}`,
      ideaIndex: best.idea.index,
      intent: rw.intent,
      start: best.start,
      end: best.end,
      concept: (headline || variant).toLowerCase().slice(0, 90),
      narrative: `Explicar visualmente «${(headline || variant).toLowerCase()}» con iconos, etiquetas y comparativa real.`,
      component: 'editorial_explainer',
      props
    });
    brollOccupied.push({ start: best.start, end: best.end });
  }
  brolls.sort((a, b) => a.start - b.start);
  brolls.forEach((b, idx) => {
    const ground = idx % 2 === 0 ? 'ivory' : 'graphite';
    b.props.ground = ground;
    b.props.accent = ground === 'ivory' ? '#b85f42' : accent;
  });

  // ---- 4. High-Retention Intermediate Overlays (no >3.5s dead gaps) -------
  const maxOverlays = options.noOverlays || !hasContent
    ? 0
    : Math.min(LIMITS.maxOverlays, Number(options.maxOverlays !== undefined ? options.maxOverlays : Math.max(3, Math.ceil(duration / 3.4))));

  function addOverlayForIdea(idea, preferredStyle, forcedStart = null, optionsOverlay = {}) {
    if (overlays.length >= maxOverlays) return false;
    const sem = analyzeIdeaSemantics(idea.text);
    const rw = rewriteHeadline({
      text: idea.text,
      role: 'overlay',
      usedHeadlines,
      transcriptText: transcript.text
    });
    if (optionsOverlay.requireIntent && !rw.text) return false;

    let style = preferredStyle || 'icon_pop';
    let extra = { icon: sem.icon };
    let anchorKeywords = ['saas', 'grandes', 'software', 'agentes', 'custom', 'medida', 'industria', 'mercado', 'factura', 'flujo', 'tiempo'];

    if (!preferredStyle && sem.hasSaas && sem.logos && !overlays.some((o) => o.style === 'logo_grid')) {
      style = 'logo_grid';
      extra = {
        logos: sem.logos.slice(0, 4),
        icon: 'saas_cloud',
        position: 'top'
      };
      anchorKeywords = ['saas', 'grandes', 'software'];
    } else if (!preferredStyle && sem.hasAgents && sem.hasCustom && !overlays.some((o) => o.style === 'split_card')) {
      style = 'split_card';
      extra = {
        items: [
          { label: 'AGENTES IA', icon: 'ai_agent', accent: '#38bdf8' },
          { label: 'SOFTWARE A MEDIDA', icon: 'custom_code', accent: '#10b981' }
        ],
        icon: 'ai_agent',
        position: 'bottom'
      };
      anchorKeywords = ['custom', 'software', 'agentes'];
    } else if (!preferredStyle && rw.text && sem.imageQuery && !overlays.some((o) => o.style === 'image_card')) {
      style = 'image_card';
      extra = {
        imageQuery: sem.imageQuery,
        icon: sem.icon,
        position: 'top'
      };
      anchorKeywords = ['industria', 'mercado', 'sistema', 'factura', 'pausa', 'hora'];
    } else {
      extra = {
        icon: sem.icon || 'lightning',
        position: overlays.length % 2 === 0 ? 'top' : 'bottom'
      };
    }

    const text = rw.text;
    if (text && usedOverlayTexts.has(text)) return false;
    if (!text && !extra.icon && !(extra.logos && extra.logos.length)) return false;

    const anchor = clauseAnchor(idea, anchorKeywords);
    let start = roundTime(forcedStart !== null ? clamp(forcedStart, Math.max(0.3, anchor.start - 0.35), anchor.start + 0.75) : anchor.start);
    let length = Math.max(1.8, Math.min(2.6, (anchor.end - anchor.start) + 0.85));
    if (start < 0.3) start = roundTime(0.3);
    let end = roundTime(Math.min(duration - 0.2, start + length));
    if (end - start < 1.1) return false;

    const overlappingBroll = brolls.find((b) => start < b.end && b.start < end);
    if (overlappingBroll) {
      if (text && brollTexts(overlappingBroll).some((title) => isLexicallyRedundant(text, title))) return false;
      if (idea.end > overlappingBroll.end + 1.1) {
        const shifted = roundTime(overlappingBroll.end + 0.12);
        const shiftedEnd = roundTime(Math.min(duration - 0.2, Math.max(idea.end, shifted + 1.9), shifted + 2.1));
        if (shiftedEnd - shifted >= 1.2 && shifted <= anchor.start + 0.85) {
          start = shifted;
          end = shiftedEnd;
        }
      } else if (idea.start < overlappingBroll.start - 1.2 && (!forcedStart || forcedStart < overlappingBroll.start)) {
        const shiftedStart = roundTime(Math.max(0.3, idea.start));
        const shiftedEnd = roundTime(Math.min(overlappingBroll.start - 0.15, shiftedStart + 2.2));
        if (shiftedEnd - shiftedStart >= 1.2 && shiftedStart >= anchor.start - 0.4) {
          start = shiftedStart;
          end = shiftedEnd;
        }
      }
    }

    const finalBrollOverlap = brolls.find((b) => start < b.end && b.start < end);
    if (finalBrollOverlap && (!text || brollTexts(finalBrollOverlap).some((title) => isLexicallyRedundant(text, title)))) {
      return false;
    }
    if (overlays.some((o) => start < o.end + 0.15 && o.start < end + 0.15)) return false;

    const semStart = roundTime(clamp(anchor.start, Math.max(0, start - 0.85), start + 0.4));
    const semEnd = roundTime(Math.min(end + 0.15, Math.max(semStart + 0.25, anchor.end)));

    overlays.push({
      id: `overlay_${overlays.length + 1}`,
      start,
      end,
      style,
      text,
      accent,
      ...extra,
      position: finalBrollOverlap ? 'bottom' : (extra.position || 'top'),
      semanticStart: semStart,
      semanticEnd: semEnd,
      ...(finalBrollOverlap ? { allowOverBroll: true } : {})
    });
    if (text) {
      usedOverlayTexts.add(text);
      usedHeadlines.add(text);
    }
    return true;
  }

  // First pass: cover any remaining non-B-roll ideas.
  if (!options.noOverlays && hasContent && ideas.length >= 2) {
    for (let i = 1; i < ideas.length; i++) {
      if (usedIdeaForOverlay.has(i)) continue;
      if (brolls.some((b) => b.ideaIndex === i)) continue;
      const idea = ideas[i];
      const fullyCoveredByBroll = brolls.some((b) => b.start <= idea.start + 0.2 && b.end >= idea.end - 0.2);
      if (fullyCoveredByBroll) continue;
      if (addOverlayForIdea(idea, null)) usedIdeaForOverlay.add(i);
    }

    // Second pass: scan for any gap > 3.35s between visual events and fill if an idea spans it.
    let guard = 0;
    while (guard++ < 6 && overlays.length < maxOverlays) {
      const events = [...brolls, ...overlays]
        .map((e) => ({ start: e.start, end: e.end }))
        .sort((a, b) => a.start - b.start);
      let largestGap = null;
      let prevEnd = 0;
      for (const ev of events) {
        if (ev.start - prevEnd > 3.35) {
          largestGap = { start: prevEnd, end: ev.start, len: ev.start - prevEnd };
          break;
        }
        prevEnd = Math.max(prevEnd, ev.end);
      }
      if (!largestGap && duration - prevEnd > 3.35) {
        largestGap = { start: prevEnd, end: duration, len: duration - prevEnd };
      }
      if (!largestGap) break;

      const mid = (largestGap.start + largestGap.end) / 2;
      const matchingIdea = ideas.find((idea) => idea.end > largestGap.start + 0.4 && idea.start < largestGap.end - 0.4);
      if (!matchingIdea) break;

      // Pick a sub-phrase spoken inside the gap window if possible.
      const gapWords = matchingIdea.words.filter((w) => w.start >= largestGap.start - 0.2 && w.end <= largestGap.end + 0.3);
      if (gapWords.length >= 3) {
        const subIdea = {
          ...matchingIdea,
          start: gapWords[0].start,
          end: gapWords[gapWords.length - 1].end,
          text: gapWords.map((w) => w.word).join(' '),
          words: gapWords
        };
        if (!addOverlayForIdea(subIdea, 'icon_pop', Math.max(largestGap.start + 0.2, Math.min(mid - 0.8, subIdea.start)))) {
          break;
        }
      } else {
        if (!addOverlayForIdea(matchingIdea, 'icon_pop', largestGap.start + 0.2)) break;
      }
    }

    // Third pass: if an idea spans past a B-roll with a distinct new editorial intent, add a clean card after it.
    if (overlays.length < maxOverlays) {
      for (const b of brolls) {
        const idea = ideas[b.ideaIndex];
        if (!idea || idea.end - b.end < 1.4) continue;
        const tailWords = idea.words.filter((w) => w.start >= b.end - 0.1);
        if (tailWords.length >= 3) {
          const tailIdea = {
            ...idea,
            start: tailWords[0].start,
            end: tailWords[tailWords.length - 1].end,
            text: tailWords.map((w) => w.word).join(' '),
            words: tailWords
          };
          addOverlayForIdea(tailIdea, 'icon_pop', b.end + 0.15, { requireIntent: true });
        }
      }
    }
  } else if (!options.noOverlays && hasContent && ideas.length === 1 && !brolls.some((b) => b.ideaIndex === 0)) {
    addOverlayForIdea(ideas[0], 'icon_pop');
  }

  overlays.sort((a, b) => a.start - b.start);

  // ---- 5. Dynamic Camera Moves (pauses + phrase starts, push/punch/pull/pan) ----
  const cameras = [];
  if (!options.noCamera && hasContent) {
    const maxCameraTotal = duration * 0.32;
    let cameraTotal = 0;
    const maxCameras = Number(options.maxCameras !== undefined ? options.maxCameras : Math.max(3, Math.min(8, Math.floor(duration / 4.2))));

    const tryAddCamera = (start, end, type, intensity = 0.55, focusX = undefined, allowOverOverlay = false) => {
      if (cameras.length >= maxCameras) return false;
      const s = roundTime(Math.max(0.05, start));
      const e = roundTime(Math.min(duration - 0.15, end));
      const len = e - s;
      if (len < 0.80 || len > 1.7) return false;
      if (cameraTotal + len > maxCameraTotal) return false;
      if (brolls.some((b) => s < b.end + 0.05 && b.start < e + 0.05)) return false;
      if (!allowOverOverlay && overlays.some((o) => s < o.end + 0.02 && o.start < e + 0.02)) return false;
      if (cameras.some((c) => s < c.end + 0.38 && c.start < e + 0.38)) return false;
      cameras.push({
        id: `camera_${cameras.length + 1}`,
        start: s,
        end: e,
        type,
        intensity,
        ...(type === 'pan' ? { focusX: focusX !== undefined ? focusX : 0.35 } : {})
      });
      cameraTotal += len;
      return true;
    };

    // Priority 1: genuine transcript pauses (>= 0.75s) so pause-based tests remain aligned.
    const longPauses = ideaPauses
      .filter((pause) => pause.gap >= 0.75)
      .slice()
      .sort((a, b) => (b.gap - a.gap) || (a.start - b.start));
    const pauseTypes = ['push', 'pull', 'pan'];
    longPauses.forEach((pause, idx) => {
      const len = Math.min(1.5, pause.gap);
      const start = pause.start + (pause.gap - len) / 2;
      tryAddCamera(start, start + len, pauseTypes[idx % pauseTypes.length], 0.55, idx % 2 ? -0.4 : 0.4, true);
    });

    // Priority 2: find all clean talking-head gaps (free of both B-rolls and overlays) >= 0.9s.
    const visualBlocks = [...brolls, ...overlays]
      .map((ev) => ({ start: ev.start, end: ev.end }))
      .sort((a, b) => a.start - b.start);
    const mergedBlocks = [];
    for (const blk of visualBlocks) {
      if (!mergedBlocks.length || blk.start > mergedBlocks[mergedBlocks.length - 1].end) {
        mergedBlocks.push({ ...blk });
      } else {
        mergedBlocks[mergedBlocks.length - 1].end = Math.max(mergedBlocks[mergedBlocks.length - 1].end, blk.end);
      }
    }
    const freeTalkWindows = [];
    let cursor = 0.05;
    for (const blk of mergedBlocks) {
      if (blk.start - cursor >= 0.96) freeTalkWindows.push({ start: cursor, end: blk.start });
      cursor = Math.max(cursor, blk.end);
    }
    if (duration - 0.15 - cursor >= 0.96) freeTalkWindows.push({ start: cursor, end: duration - 0.15 });

    const dynamicTypes = ['push', 'punch', 'punch', 'pull', 'pan'];
    freeTalkWindows.forEach((win, idx) => {
      const winLen = win.end - win.start;
      const len = clamp(Math.min(1.40, winLen - 0.14), 0.82, 1.40);
      const start = win.start + 0.07;
      const type = idx === freeTalkWindows.length - 1 && freeTalkWindows.length >= 2 ? 'pull' : dynamicTypes[idx % dynamicTypes.length];
      tryAddCamera(start, start + len, type, type === 'punch' ? 0.52 : 0.55, idx % 2 ? 0.38 : -0.38);
      if (winLen >= 2.65 && cameras.length < maxCameras) {
        const secondStart = start + len + 0.42;
        const secondLen = clamp(Math.min(1.15, win.end - secondStart - 0.07), 0.82, 1.15);
        if (secondStart + secondLen <= win.end - 0.06) {
          tryAddCamera(secondStart, secondStart + secondLen, 'punch', 0.52);
        }
      }
    });

    cameras.sort((a, b) => a.start - b.start);
  }

  // ---- 6. SFX with Strict Anti-Repetition Queue -------------------------
  const sfx = [];
  if (!options.noSfx && catalog) {
    let lastSound = null;
    const usedCounts = new Map();

    const pickDistinctSound = (candidates) => {
      const valid = candidates.filter((id) => soundIds.has(id));
      if (!valid.length) return null;
      const nonConsecutive = valid.filter((id) => id !== lastSound);
      const pool = nonConsecutive.length ? nonConsecutive : valid;
      pool.sort((a, b) => (usedCounts.get(a) || 0) - (usedCounts.get(b) || 0));
      return pool[0];
    };

    const pushSfx = (candidates, at, reason, target) => {
      const sound = pickDistinctSound(candidates);
      if (!sound) return;
      const time = roundTime(at);
      if (!Number.isFinite(time) || time < 0 || time >= duration - 0.05) return;
      if (sfx.some((entry) => Math.abs(entry.at - time) < 0.42)) return;
      sfx.push({
        id: `sfx_${sfx.length + 1}`,
        at: time,
        sound,
        gainDb: soundGain(sound, -14),
        reason: reason.slice(0, 140),
        target
      });
      lastSound = sound;
      usedCounts.set(sound, (usedCounts.get(sound) || 0) + 1);
    };

    const timelineEvents = [
      ...overlays.map((o) => ({ kind: 'overlay', at: o.start + 0.01, event: o })),
      ...brolls.map((b) => ({ kind: 'broll', at: b.start + 0.02, event: b })),
      ...cameras.filter((c) => c.type === 'punch').map((c) => ({ kind: 'camera', at: c.start, event: c }))
    ].sort((a, b) => a.at - b.at);

    for (const item of timelineEvents) {
      if (item.kind === 'overlay') {
        const o = item.event;
        const labelText = (o.text || o.icon || o.style || 'visual').toLowerCase();
        if (o.style === 'hook_kinetic') {
          pushSfx(['hook_impact', 'cinematic_boom', 'bass_drop_clean', 'low_impact'], o.start, `Impacto de hook inicial «${labelText}»`, `overlay:${o.id}`);
        } else if (o.style === 'cta_debate') {
          pushSfx(['notification_ding', 'digital_chime', 'pop_spring'], o.start, `Cierre CTA de debate «${labelText}»`, `overlay:${o.id}`);
        } else if (o.style === 'logo_grid') {
          pushSfx(['card_snap', 'sticker_slap', 'pop_spring', 'ui_tick'], o.start, `Entrada de cluster de logos «${labelText}»`, `overlay:${o.id}`);
        } else if (o.style === 'image_card') {
          pushSfx(['shutter_click', 'card_snap', 'pop_spring', 'ui_tick'], o.start, `Entrada de tarjeta visual «${labelText}»`, `overlay:${o.id}`);
        } else if (o.style === 'split_card') {
          pushSfx(['ui_pop_double', 'keyboard_burst', 'data_burst', 'ui_tick'], o.start, `Comparativa en pantalla «${labelText}»`, `overlay:${o.id}`);
        } else {
          pushSfx(['pop_spring', 'ui_tick', 'counter_tick', 'card_snap'], o.start, `Aparición del overlay «${labelText}»`, `overlay:${o.id}`);
        }
      } else if (item.kind === 'broll') {
        const b = item.event;
        const bLabel = (b.props.headline || b.props.variant || 'escena').toLowerCase();
        const entryPool = b.props.variant === 'cause'
          ? ['riser_short', 'bass_drop_clean', 'whip_pan', 'soft_whoosh']
          : b.props.variant === 'comparison'
            ? ['whip_pan', 'glitch_tech', 'data_burst', 'soft_whoosh']
            : ['soft_whoosh', 'whip_pan', 'paper_turn', 'riser_short'];
        pushSfx(entryPool, b.start + 0.02, `Entrada de B-roll: ${bLabel}`, `broll:${b.id}`);
        if (b.props.variant === 'cause' && b.end - b.start >= 2.2) {
          pushSfx(['low_impact', 'bass_drop_clean', 'counter_tick'], b.start + Math.min(1.1, (b.end - b.start) * 0.45), `Énfasis visual en ${bLabel}`, `broll:${b.id}`);
        }
      } else if (item.kind === 'camera') {
        const c = item.event;
        pushSfx(['camera_punch', 'whip_pan', 'ui_tick'], c.start, `Jump-cut dinámico de cámara`, `camera:${c.id}`);
      }
    }
  }

  // ---- 7. Captions ------------------------------------------------------
  const highlightSource = [];
  for (const broll of brolls) highlightSource.push(...broll.props.headline.split(/\s+/));
  for (const overlay of overlays) highlightSource.push(...overlay.text.split(/\s+/));
  const highlightWords = Array.from(new Set(
    highlightSource
      .map((w) => w.replace(/[^\p{L}\p{N}]/gu, ''))
      .filter((w) => w.length >= 4)
      .slice(0, 6)
  ));

  const plan = {
    version: '1',
    source: {
      video: source.video || '',
      duration,
      width: source.width,
      height: source.height,
      fps: source.fps,
      hash: source.hash
    },
    transcript: {
      language: transcript.language,
      text: transcript.text.slice(0, 4000)
    },
    captions: {
      enabled: options.noCaptions !== true,
      maxCharsPerLine: 32,
      maxLines: 2,
      minDuration: 0.8,
      overBroll: false,
      highlightWords
    },
    brolls: brolls.map(({ ideaIndex, intent, ...event }) => event),
    overlays,
    cameras: options.noCamera ? [] : cameras,
    sfx: options.noSfx ? [] : sfx
  };

  if (options.validate === false) return plan;
  return validatePlan(plan, {
    duration,
    sfxIds: catalog ? Array.from(soundIds) : undefined,
    strictCopy: true,
    transcriptText: transcript.text
  });
}

module.exports = {
  ACCENT,
  TECH_TERMS,
  groupWordsIntoSentences,
  pickKeyPhrase,
  pickSupport,
  trimTrailingStopwords,
  isLexicallyRedundant,
  brollTexts,
  tokensFor,
  stemToken,
  detectVariant,
  extractFigure,
  findFreeSlot,
  phraseAnchor,
  analyzeIdeaSemantics,
  planWithLocal
};
