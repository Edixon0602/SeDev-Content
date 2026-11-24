// Deterministic Style Director for SeDev Motion Mode.
//
// Derives controlled visual/audio variations from an explicit --seed or the
// SHA-256 hash of the input voice-over audio, while keeping brand invariants
// (typography, 0px hard shadows, telemetry grid, matte #050505 base) fixed.
// Persists recent selections in animaciones/editor/.state/style_history.json
// so consecutive videos never repeat the combination of the last 2 renders.

const path = require('path');
const fs = require('fs');
const { atomicWriteJson, ensureDir, readJson, sha256, sha256File } = require('./utils');

const DEFAULT_HISTORY_PATH = path.join(__dirname, '.state', 'style_history.json');

const FIXED_ELEMENTS = Object.freeze({
  fonts: Object.freeze({
    display: 'Plus Jakarta Sans',
    mono: 'JetBrains Mono'
  }),
  hardShadow: true,
  shadowBlurPx: 0,
  gridTelemetry: true,
  baseMatte: '#050505'
});

const ACCENTS = Object.freeze([
  Object.freeze({ id: 'emerald', name: 'esmeralda', hex: '#10b981' }),
  Object.freeze({ id: 'amber', name: 'ámbar', hex: '#f59e0b' }),
  Object.freeze({ id: 'cyan', name: 'cian', hex: '#06b6d4' }),
  Object.freeze({ id: 'violet', name: 'violeta', hex: '#a855f7' }),
  Object.freeze({ id: 'coral', name: 'coral', hex: '#fb6f54' })
]);

const GROUNDS = Object.freeze(['matte', 'graphite', 'ivory']);

const COMPONENT_VARIANTS = Object.freeze([
  'editorial_focus',
  'telemetry_cards',
  'terminal_data',
  'architecture_mix'
]);

const TRANSITIONS = Object.freeze(['cut', 'whip', 'flash']);

const SUBTITLE_POSITIONS = Object.freeze([
  Object.freeze({ id: 'low', marginV: 210, alignment: 2 }),
  Object.freeze({ id: 'lower', marginV: 175, alignment: 2 }),
  Object.freeze({ id: 'balanced', marginV: 245, alignment: 2 })
]);

const HOOK_FORMULAS = Object.freeze([
  'cifra',
  'pregunta',
  'contradiccion',
  'error_absurdo',
  'antes_despues',
  'cuenta_atras'
]);

const SFX_POOLS = Object.freeze([
  Object.freeze({
    id: 'impact_heavy',
    hook: ['vine_boom', 'punch_hit', 'censor_beep'],
    data: ['vine_boom', 'money_kaching', 'ding_real'],
    code: ['keyboard_typing', 'keyboard_meme', 'punch_hit'],
    alert: ['censor_beep', 'huh_cat', 'vine_boom'],
    transition: ['punch_hit', 'rizz_stinger', 'keyboard_meme'],
    cta: ['ding_real', 'rizz_stinger', 'punch_hit']
  }),
  Object.freeze({
    id: 'tech_tactile',
    hook: ['punch_hit', 'keyboard_meme', 'vine_boom'],
    data: ['ding_real', 'money_kaching', 'vine_boom'],
    code: ['keyboard_typing', 'keyboard_meme', 'censor_beep'],
    alert: ['censor_beep', 'vine_boom', 'huh_cat'],
    transition: ['keyboard_meme', 'punch_hit', 'rizz_stinger'],
    cta: ['ding_real', 'rizz_stinger', 'money_kaching']
  }),
  Object.freeze({
    id: 'punchy_editorial',
    hook: ['rizz_stinger', 'punch_hit', 'vine_boom'],
    data: ['money_kaching', 'vine_boom', 'ding_real'],
    code: ['keyboard_meme', 'keyboard_typing', 'punch_hit'],
    alert: ['huh_cat', 'censor_beep', 'vine_boom'],
    transition: ['rizz_stinger', 'punch_hit', 'ding_real'],
    cta: ['ding_real', 'huh_cat', 'rizz_stinger']
  })
]);

const GROUND_PALETTES = Object.freeze({
  matte: Object.freeze({ bgHex: '#050505', cardHex: '#0d0d11', gridRgba: '0x27272a@0.28' }),
  graphite: Object.freeze({ bgHex: '#101012', cardHex: '#18181c', gridRgba: '0x3f3f46@0.26' }),
  ivory: Object.freeze({ bgHex: '#050505', cardHex: '#ece7dd', gridRgba: '0x27272a@0.26', explainerGround: 'ivory' })
});

function createPrng(seedStr) {
  const hex = sha256(String(seedStr));
  let state = parseInt(hex.slice(0, 8), 16) >>> 0;
  if (state === 0) state = 0x9e3779b9;
  return function next() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickFrom(list, rand) {
  return list[Math.floor(rand() * list.length) % list.length];
}

function resolveSeed(options = {}) {
  if (options.seed !== undefined && options.seed !== null && String(options.seed).trim() !== '') {
    return String(options.seed).trim();
  }
  if (options.audioHash && String(options.audioHash).trim()) {
    return `audio:${String(options.audioHash).trim().slice(0, 16)}`;
  }
  if (options.videoPath && fs.existsSync(options.videoPath)) {
    return `audio:${sha256File(options.videoPath).slice(0, 16)}`;
  }
  return 'default:sedev-motion';
}

function readStyleHistory(historyPath = DEFAULT_HISTORY_PATH) {
  if (!historyPath || !fs.existsSync(historyPath)) {
    return { version: 1, entries: [] };
  }
  try {
    const raw = readJson(historyPath);
    if (raw && Array.isArray(raw.entries)) {
      return { version: 1, entries: raw.entries };
    }
  } catch (err) {
    // Ignore corrupt history and start clean.
  }
  return { version: 1, entries: [] };
}

function styleSignature(style) {
  return [
    style.accent.id,
    style.ground,
    style.componentVariant,
    style.transition,
    style.subtitlePosition.id,
    style.hookFormula,
    style.sfxPool
  ].join('|');
}

function buildCandidate(seed, attempt) {
  const rand = createPrng(`${seed}::attempt:${attempt}`);
  const accent = pickFrom(ACCENTS, rand);
  const ground = pickFrom(GROUNDS, rand);
  const componentVariant = pickFrom(COMPONENT_VARIANTS, rand);
  const transition = pickFrom(TRANSITIONS, rand);
  const subtitlePosition = pickFrom(SUBTITLE_POSITIONS, rand);
  const hookFormula = pickFrom(HOOK_FORMULAS, rand);
  const poolObj = pickFrom(SFX_POOLS, rand);
  const style = {
    seed,
    accent: { id: accent.id, name: accent.name, hex: accent.hex },
    ground,
    groundPalette: { ...GROUND_PALETTES[ground] },
    componentVariant,
    transition,
    subtitlePosition: { ...subtitlePosition },
    hookFormula,
    sfxPool: poolObj.id,
    fixed: {
      fonts: { ...FIXED_ELEMENTS.fonts },
      hardShadow: FIXED_ELEMENTS.hardShadow,
      shadowBlurPx: FIXED_ELEMENTS.shadowBlurPx,
      gridTelemetry: FIXED_ELEMENTS.gridTelemetry,
      baseMatte: FIXED_ELEMENTS.baseMatte
    }
  };
  style.signature = styleSignature(style);
  return style;
}

function directStyle(options = {}) {
  const seed = resolveSeed(options);
  const historyPath = options.historyPath !== undefined ? options.historyPath : DEFAULT_HISTORY_PATH;
  const history = options.ignoreHistory ? { version: 1, entries: [] } : readStyleHistory(historyPath);
  const entries = Array.isArray(history.entries) ? history.entries : [];

  // Same seed always yields the exact same style if already recorded.
  if (!options.ignoreHistory && !options.ignoreExistingSeed) {
    const existing = entries.find((e) => e && e.seed === seed && e.style);
    if (existing) {
      return existing.style;
    }
  }

  // Last 2 distinct renders (excluding current seed for determinism).
  const recentOther = entries.filter((e) => e && e.seed !== seed).slice(-2);
  const recentSignatures = new Set(recentOther.map((e) => e.signature));
  const recentAccents = new Set(recentOther.map((e) => e.accentId));
  const recentPair = new Set(recentOther.map((e) => `${e.accentId}:${e.ground}`));
  const lastEntry = recentOther.length ? recentOther[recentOther.length - 1] : null;

  let chosen = null;
  // Pass 1: avoid repeating full signature, recent accent, and last hookFormula.
  for (let attempt = 0; attempt < 48; attempt++) {
    const cand = buildCandidate(seed, attempt);
    if (recentSignatures.has(cand.signature)) continue;
    if (recentAccents.has(cand.accent.id)) continue;
    if (lastEntry && lastEntry.hookFormula === cand.hookFormula) continue;
    if (lastEntry && lastEntry.ground === cand.ground && recentOther.length >= 1) continue;
    chosen = cand;
    break;
  }
  // Pass 2: relax ground/hook constraint, keep accent+ground pair & signature unique.
  if (!chosen) {
    for (let attempt = 0; attempt < 48; attempt++) {
      const cand = buildCandidate(seed, attempt);
      if (recentSignatures.has(cand.signature)) continue;
      if (recentPair.has(`${cand.accent.id}:${cand.ground}`)) continue;
      chosen = cand;
      break;
    }
  }
  // Pass 3: guarantee signature differs from last 2 renders.
  if (!chosen) {
    for (let attempt = 0; attempt < 64; attempt++) {
      const cand = buildCandidate(seed, attempt);
      if (!recentSignatures.has(cand.signature)) {
        chosen = cand;
        break;
      }
    }
  }
  if (!chosen) chosen = buildCandidate(seed, 0);

  if (options.record && historyPath) {
    const nextEntries = entries.filter((e) => e && e.seed !== seed);
    nextEntries.push({
      seed,
      signature: chosen.signature,
      accentId: chosen.accent.id,
      ground: chosen.ground,
      componentVariant: chosen.componentVariant,
      transition: chosen.transition,
      subtitlePositionId: chosen.subtitlePosition.id,
      hookFormula: chosen.hookFormula,
      sfxPool: chosen.sfxPool,
      recordedAt: new Date().toISOString(),
      style: chosen
    });
    ensureDir(path.dirname(historyPath));
    atomicWriteJson(historyPath, { version: 1, entries: nextEntries.slice(-24) });
  }

  return chosen;
}

function getSfxPoolById(poolId) {
  return SFX_POOLS.find((p) => p.id === poolId) || SFX_POOLS[0];
}

module.exports = {
  DEFAULT_HISTORY_PATH,
  FIXED_ELEMENTS,
  ACCENTS,
  GROUNDS,
  COMPONENT_VARIANTS,
  TRANSITIONS,
  SUBTITLE_POSITIONS,
  HOOK_FORMULAS,
  SFX_POOLS,
  GROUND_PALETTES,
  resolveSeed,
  readStyleHistory,
  styleSignature,
  directStyle,
  getSfxPoolById
};
