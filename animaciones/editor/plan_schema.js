// Editorial plan contract. The plan is data, never free-form model prose:
// every event is checked for finite times, ordering, overlaps, density,
// readable durations, known SFX ids, non-repeating consecutive SFX, and
// serializable props before any render.

const { isPlainObject, roundTime, clamp, stableStringify } = require('./utils');
const { validateCopy, hasOverlayVisual, hasBrollVisual } = require('./copywriter');

const PLAN_VERSION = '1';
const MODES = ['talking_head', 'motion'];
const TRANSITIONS = ['cut', 'whip', 'flash'];

const LIMITS = Object.freeze({
  maxBrolls: 6,
  maxOverlays: 12,
  maxCameras: 14,
  maxSfx: 20,
  minBrollDuration: 1.2,
  maxBrollDuration: 6.0,
  minOverlayDuration: 0.9,
  maxOverlayDuration: 4.5,
  maxOverlayChars: 48,
  maxConceptChars: 90,
  maxNarrativeChars: 180,
  maxCameraCoverage: 0.35,
  maxBrollCoverage: 0.45,
  minBrollGap: 0.2,
  minOverlayGap: 0.15,
  minCameraGap: 0.35,
  minSfxGap: 0.35,
  overlayReadingCharsPerSec: 22,
  minCaptionDuration: 0.45
});

const MOTION_LIMITS = Object.freeze({
  maxBrolls: 24,
  maxOverlays: 24,
  maxCameras: 0,
  maxSfx: 32,
  minBrollDuration: 0.8,
  maxBrollDuration: 6.0,
  minOverlayDuration: 0.8,
  maxOverlayDuration: 5.0,
  maxCameraCoverage: 0,
  maxBrollCoverage: 1.0,
  maxStockCoverage: 0.32,
  minBrollGap: 0,
  minOverlayGap: 0.1,
  minSfxGap: 0.35,
  minCaptionDuration: 0.35
});

const COMPONENTS = Object.freeze({
  editorial_explainer: {
    variants: ['transform', 'comparison', 'flow', 'cause', 'detail'],
    props: {
      variant: { type: 'enum', values: ['transform', 'comparison', 'flow', 'cause', 'detail'], required: true },
      kicker: { type: 'string', max: 32 },
      headline: { type: 'string', max: 64, required: true },
      support: { type: 'string', max: 96 },
      accent: { type: 'hex' },
      ground: { type: 'enum', values: ['graphite', 'ivory'] },
      figure: { type: 'string', max: 16 },
      label: { type: 'string', max: 24 },
      icon: { type: 'string', max: 40 },
      leftLabel: { type: 'string', max: 40 },
      rightLabel: { type: 'string', max: 40 },
      leftIcon: { type: 'string', max: 40 },
      rightIcon: { type: 'string', max: 40 },
      imageQuery: { type: 'string', max: 160 },
      image: { type: 'string', max: 512 },
      logos: { type: 'stringArray', maxItems: 6, itemMax: 40 },
      items: { type: 'stringArray', maxItems: 4, itemMax: 48 },
      trend: { type: 'enum', values: ['up', 'down', 'flat'] }
    }
  },
  architecture_flow: {
    props: {
      header: { type: 'string', max: 48 },
      layout: { type: 'enum', values: ['vertical', 'horizontal', 'split'] },
      nodes: { type: 'array', maxItems: 8 },
      edges: { type: 'array', maxItems: 10 },
      badge: { type: 'string', max: 48 }
    }
  },
  metrics_comparison: {
    props: {
      badge: { type: 'string', max: 48 },
      title: { type: 'string', max: 64, required: true },
      metricA: { type: 'object' },
      metricB: { type: 'object' },
      delta: { type: 'string', max: 48 }
    }
  },
  versus_race: {
    props: {
      title: { type: 'string', max: 64, required: true },
      subtitle: { type: 'string', max: 64 },
      laneA: { type: 'object' },
      laneB: { type: 'object' },
      winnerBadge: { type: 'string', max: 48 },
      loserBadge: { type: 'string', max: 48 },
      leftMetricLabel: { type: 'string', max: 32 },
      rightMetricLabel: { type: 'string', max: 32 },
      footerLeft: { type: 'string', max: 72 },
      footerRight: { type: 'string', max: 72 }
    }
  },
  kinetic_hook: {
    props: {
      badge: { type: 'string', max: 48 },
      header: { type: 'string', max: 48 },
      lines: { type: 'array', maxItems: 4, required: true },
      subtitle: { type: 'string', max: 80 },
      icon: { type: 'string', max: 40 },
      accent: { type: 'hex' },
      boxBadge: { type: 'string', max: 48 },
      boxTag: { type: 'string', max: 32 },
      detail: { type: 'string', max: 180 },
      footerText: { type: 'string', max: 64 },
      statusText: { type: 'string', max: 32 },
      ctaKeyword: { type: 'string', max: 32 },
      ctaNote: { type: 'string', max: 160 }
    }
  },
  code_terminal: {
    props: {
      filename: { type: 'string', max: 64 },
      title: { type: 'string', max: 64, required: true },
      badge: { type: 'string', max: 48 },
      codeLines: { type: 'array', maxItems: 14, required: true },
      cursorLine: { type: 'number', min: 1, max: 30 }
    }
  },
  terminal_split: {
    props: {
      title: { type: 'string', max: 64, required: true },
      subtitle: { type: 'string', max: 64 },
      leftTitle: { type: 'string', max: 48 },
      rightTitle: { type: 'string', max: 48 },
      leftCode: { type: 'string', max: 600 },
      rightCode: { type: 'string', max: 600 },
      leftStatus: { type: 'string', max: 48 },
      rightStatus: { type: 'string', max: 48 },
      leftFooter: { type: 'string', max: 96 },
      rightFooter: { type: 'string', max: 96 },
      diffNote: { type: 'string', max: 96 },
      leftColor: { type: 'hex' },
      rightColor: { type: 'hex' }
    }
  },
  stock_video: {
    props: {
      videoQuery: { type: 'string', max: 160, required: true },
      sourcePreference: { type: 'enum', values: ['auto', 'pexels', 'pixabay'] },
      tone: { type: 'enum', values: ['natural', 'dim', 'moody'] },
      headline: { type: 'string', max: 64 }
    }
  },
  hook_impact: {
    props: {
      badge: { type: 'string', max: 48 },
      indexLabel: { type: 'string', max: 32 },
      kicker: { type: 'string', max: 48 },
      subtitle: { type: 'string', max: 48 },
      lines: { type: 'array', maxItems: 5, required: true },
      icon: { type: 'string', max: 40 },
      iconColor: { type: 'hex' },
      iconMode: { type: 'enum', values: ['auto', 'draw', 'assemble', 'pulse', 'orbit'] },
      accent: { type: 'hex' },
      danger: { type: 'hex' },
      metric: { type: 'object' },
      note: { type: 'string', max: 140 },
      tags: { type: 'stringArray', maxItems: 8, itemMax: 32 },
      beats: { type: 'stringArray', maxItems: 6, itemMax: 24 },
      beatTimes: { type: 'array', maxItems: 6 },
      cameraMode: { type: 'string', max: 24 },
      voiceover: { type: 'string', max: 400 }
    }
  },
  cost_ticker: {
    props: {
      title: { type: 'string', max: 64, required: true },
      subtitle: { type: 'string', max: 80 },
      cloudCost: { type: 'number', min: 0, max: 100000000 },
      initialCost: { type: 'number', min: 0, max: 100000000 },
      breakdown: { type: 'array', maxItems: 4 },
      bareMetalCost: { type: 'string', max: 32 },
      takeaway: { type: 'string', max: 96 },
      accent: { type: 'hex' },
      cameraMode: { type: 'string', max: 24 },
      voiceover: { type: 'string', max: 400 }
    }
  },
  disaster_monitor: {
    props: {
      title: { type: 'string', max: 64, required: true },
      subtitle: { type: 'string', max: 80 },
      crashTime: { type: 'number', min: 0, max: 60 },
      crashedStatus: { type: 'string', max: 80 },
      healthyStatus: { type: 'string', max: 80 },
      latencyNormal: { type: 'number', min: 0, max: 1000000 },
      latencyCrash: { type: 'number', min: 0, max: 10000000 },
      logs: { type: 'array', maxItems: 4 },
      takeaway: { type: 'string', max: 96 },
      accent: { type: 'hex' },
      cameraMode: { type: 'string', max: 24 },
      voiceover: { type: 'string', max: 400 }
    }
  },
  latency_scale: {
    props: {
      title: { type: 'string', max: 64, required: true },
      subtitle: { type: 'string', max: 80 },
      tiers: { type: 'array', maxItems: 5 },
      bannerBadge: { type: 'string', max: 64 },
      conclusion: { type: 'string', max: 160 },
      conclusionSub: { type: 'string', max: 96 },
      accent: { type: 'hex' },
      cameraMode: { type: 'string', max: 24 },
      voiceover: { type: 'string', max: 400 }
    }
  },
  network_pipeline: {
    props: {
      title: { type: 'string', max: 64, required: true },
      subtitle: { type: 'string', max: 80 },
      stages: { type: 'array', maxItems: 4 },
      conclusion: { type: 'string', max: 160 },
      takeaway: { type: 'string', max: 96 },
      accent: { type: 'hex' },
      cameraMode: { type: 'string', max: 24 },
      voiceover: { type: 'string', max: 400 }
    }
  },
  tradeoff_matrix: {
    props: {
      title: { type: 'string', max: 64, required: true },
      subtitle: { type: 'string', max: 80 },
      colA: { type: 'string', max: 32 },
      colB: { type: 'string', max: 32 },
      rows: { type: 'array', maxItems: 4 },
      cta: { type: 'object' },
      conclusionBadge: { type: 'string', max: 64 },
      conclusion: { type: 'string', max: 160 },
      takeaway: { type: 'string', max: 96 },
      accent: { type: 'hex' },
      cameraMode: { type: 'string', max: 24 },
      voiceover: { type: 'string', max: 400 }
    }
  },
  tree_hierarchy: {
    props: {
      title: { type: 'string', max: 64, required: true },
      complexity: { type: 'string', max: 80 },
      subtitle: { type: 'string', max: 80 },
      nodes: { type: 'array', maxItems: 8 },
      conclusionBadge: { type: 'string', max: 64 },
      conclusion: { type: 'string', max: 160 },
      takeaway: { type: 'string', max: 96 },
      accent: { type: 'hex' },
      cameraMode: { type: 'string', max: 24 },
      voiceover: { type: 'string', max: 400 }
    }
  }
});

const OVERLAY_POSITIONS = ['top', 'middle', 'bottom', 'top-right', 'top-left'];
const OVERLAY_STYLES = ['editorial', 'hook_kinetic', 'image_card', 'logo_grid', 'icon_pop', 'split_card', 'cta_debate', 'minimal_banner', 'stat_callout', 'hud_frame'];
const CUT_STYLES = ['hard', 'j-cut', 'l-cut', 'jl-cut'];
const CAMERA_TYPES = ['push', 'pull', 'pan', 'punch'];
const ID_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;

class PlanValidationError extends Error {
  constructor(errors) {
    super(`Plan de edición inválido:\n- ${errors.join('\n- ')}`);
    this.name = 'PlanValidationError';
    this.errors = errors;
  }
}

function isStrictNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function intervalsOverlap(aStart, aEnd, bStart, bEnd, tolerance = 0.001) {
  return aStart < bEnd - tolerance && bStart < aEnd - tolerance;
}

function jsonDepth(value, depth = 0) {
  if (depth > 8) return depth;
  if (Array.isArray(value)) {
    let max = depth;
    for (const item of value) max = Math.max(max, jsonDepth(item, depth + 1));
    return max;
  }
  if (value && typeof value === 'object') {
    let max = depth;
    for (const key of Object.keys(value)) max = Math.max(max, jsonDepth(value[key], depth + 1));
    return max;
  }
  return depth;
}

function checkSerializable(value, label, errors, maxBytes = 4096) {
  let json;
  try {
    json = JSON.stringify(value);
  } catch (err) {
    errors.push(`${label} no es serializable a JSON`);
    return;
  }
  if (json === undefined) {
    errors.push(`${label} no es serializable a JSON`);
    return;
  }
  if (Buffer.byteLength(json, 'utf8') > maxBytes) {
    errors.push(`${label} supera ${maxBytes} bytes`);
  }
  if (jsonDepth(value) > 4) {
    errors.push(`${label} anida demasiado (máximo 4 niveles)`);
  }
}

function validateProps(component, props, label, errors) {
  if (!isPlainObject(props)) {
    errors.push(`${label} debe ser un objeto`);
    return;
  }
  checkSerializable(props, label, errors);
  const schema = COMPONENTS[component].props;
  for (const [key] of Object.entries(props)) {
    if (key === '__proto__' || key === 'prototype' || key === 'constructor') {
      errors.push(`${label}.${key} es una clave peligrosa`);
      continue;
    }
    if (!schema[key]) {
      errors.push(`${label}.${key} no está permitido por el contrato de ${component}`);
    }
  }
  for (const [key, rule] of Object.entries(schema)) {
    const value = props[key];
    if (value === undefined || value === null || value === '') {
      const visualOnlyHeadline = component === 'editorial_explainer' && key === 'headline' && hasBrollVisual(props);
      if (rule.required && !visualOnlyHeadline) errors.push(`${label}.${key} es obligatorio`);
      continue;
    }
    if (rule.type === 'string') {
      if (typeof value !== 'string') errors.push(`${label}.${key} debe ser string`);
      else if (value.length > rule.max) errors.push(`${label}.${key} supera ${rule.max} caracteres`);
    } else if (rule.type === 'enum') {
      if (typeof value !== 'string' || !rule.values.includes(value)) {
        errors.push(`${label}.${key} debe ser uno de: ${rule.values.join(', ')}`);
      }
    } else if (rule.type === 'hex') {
      if (typeof value !== 'string' || !/^#[0-9a-f]{6}$/i.test(value)) {
        errors.push(`${label}.${key} debe ser un color #rrggbb`);
      }
    } else if (rule.type === 'stringArray') {
      if (!Array.isArray(value)) {
        errors.push(`${label}.${key} debe ser un array de strings`);
      } else {
        if (rule.maxItems && value.length > rule.maxItems) {
          errors.push(`${label}.${key} admite máximo ${rule.maxItems} elementos`);
        }
        for (const item of value) {
          if (typeof item !== 'string' || (rule.itemMax && item.length > rule.itemMax)) {
            errors.push(`${label}.${key} contiene un elemento inválido`);
            break;
          }
        }
      }
    } else if (rule.type === 'array') {
      if (!Array.isArray(value)) errors.push(`${label}.${key} debe ser un array`);
      else if (rule.maxItems && value.length > rule.maxItems) {
        errors.push(`${label}.${key} admite máximo ${rule.maxItems} elementos`);
      }
    } else if (rule.type === 'object') {
      if (!isPlainObject(value)) errors.push(`${label}.${key} debe ser un objeto`);
    } else if (rule.type === 'number') {
      if (!isStrictNumber(value)) errors.push(`${label}.${key} debe ser un número finito`);
      else if ((rule.min !== undefined && value < rule.min) || (rule.max !== undefined && value > rule.max)) {
        errors.push(`${label}.${key} fuera de rango (${rule.min}..${rule.max})`);
      }
    }
  }
  if (typeof props.variant === 'string' && props.variant !== props.variant.toLowerCase()) {
    errors.push(`${label}.variant debe ir en minúsculas`);
  }
}

function validateEventTimes(event, label, duration, errors) {
  const start = event.start;
  const end = event.end;
  if (!isStrictNumber(start) || !isStrictNumber(end)) {
    errors.push(`${label} start/end deben ser números finitos (no null, boolean ni string)`);
    return null;
  }
  if (start < 0 || end > duration + 0.001) {
    errors.push(`${label} fuera de la duración (${start}-${end} vs 0-${duration})`);
  }
  if (end <= start) errors.push(`${label} necesita end > start`);
  return { start: roundTime(start), end: roundTime(end) };
}

function validateOverlayExtraFields(event, label, errors) {
  if (event.style !== undefined) {
    if (typeof event.style !== 'string' || !OVERLAY_STYLES.includes(event.style)) {
      errors.push(`${label}.style debe ser uno de: ${OVERLAY_STYLES.join(', ')}`);
    }
  }
  const stringBounds = [
    ['icon', 40],
    ['image', 512],
    ['imageQuery', 160],
    ['badge', 48],
    ['subtext', 96],
    ['highlight', 32]
  ];
  for (const [key, max] of stringBounds) {
    if (event[key] !== undefined) {
      if (typeof event[key] !== 'string') errors.push(`${label}.${key} debe ser string`);
      else if (event[key].length > max) errors.push(`${label}.${key} supera ${max} caracteres`);
    }
  }
  if (event.logos !== undefined) {
    if (!Array.isArray(event.logos) || event.logos.length > 6 || event.logos.some((l) => typeof l !== 'string' || l.length > 40)) {
      errors.push(`${label}.logos debe ser un array de hasta 6 slugs válidos`);
    }
  }
  if (event.items !== undefined) {
    if (!Array.isArray(event.items) || event.items.length > 4) {
      errors.push(`${label}.items debe ser un array de hasta 4 elementos`);
    } else {
      for (const item of event.items) {
        if (typeof item === 'string') {
          if (item.length > 48) errors.push(`${label}.items supera 48 caracteres`);
        } else if (isPlainObject(item)) {
          checkSerializable(item, `${label}.items`, errors, 1024);
          if (typeof item.label !== 'string' || !item.label.trim() || item.label.length > 48) {
            errors.push(`${label}.items[].label debe ser string válido (<= 48 chars)`);
          }
        } else {
          errors.push(`${label}.items contiene un elemento inválido`);
        }
      }
    }
  }
}

function validatePlan(plan, options = {}) {
  const errors = [];
  if (!isPlainObject(plan)) throw new PlanValidationError(['el plan debe ser un objeto JSON']);
  const duration = Number(options.duration !== undefined ? options.duration : plan.source && plan.source.duration);
  if (!Number.isFinite(duration) || duration <= 0) {
    throw new PlanValidationError(['falta una duración de fuente válida']);
  }
  const rawMode = plan.mode !== undefined ? plan.mode : (options.mode || 'talking_head');
  if (typeof rawMode !== 'string' || !MODES.includes(rawMode)) {
    errors.push(`mode inválido: ${rawMode} (esperado ${MODES.join(' o ')})`);
  }
  const isMotion = rawMode === 'motion';
  const limits = isMotion
    ? { ...LIMITS, ...MOTION_LIMITS, ...(options.limits || {}) }
    : { ...LIMITS, ...(options.limits || {}) };
  const sfxIds = options.sfxIds ? new Set(options.sfxIds) : null;

  const normalized = {
    version: String(plan.version || PLAN_VERSION),
    ...(isMotion || plan.mode !== undefined ? { mode: isMotion ? 'motion' : 'talking_head' } : {}),
    ...(isPlainObject(plan.style) ? { style: { ...plan.style } } : {}),
    source: isPlainObject(plan.source) ? { ...plan.source } : {},
    transcript: isPlainObject(plan.transcript) ? { ...plan.transcript } : {},
    captions: {},
    brolls: [],
    overlays: [],
    cameras: [],
    sfx: []
  };
  if (plan.style !== undefined) {
    if (!isPlainObject(plan.style)) errors.push('style debe ser un objeto');
    else checkSerializable(plan.style, 'style', errors, 4096);
  }

  if (plan.version !== undefined && String(plan.version) !== PLAN_VERSION) {
    errors.push(`version de plan no soportada: ${plan.version} (esperado ${PLAN_VERSION})`);
  }
  if (!isPlainObject(plan.source)) {
    errors.push('source debe ser un objeto');
  } else {
    if (!isStrictNumber(plan.source.duration) || plan.source.duration <= 0) {
      errors.push('source.duration debe ser un número finito > 0 (no string/null/boolean)');
    } else if (Math.abs(plan.source.duration - duration) > 0.25) {
      errors.push(`source.duration (${plan.source.duration}) no coincide con el vídeo (${duration})`);
    }
    for (const key of ['width', 'height', 'fps']) {
      if (plan.source[key] !== undefined && (!isStrictNumber(plan.source[key]) || plan.source[key] <= 0)) {
        errors.push(`source.${key} debe ser un número finito > 0`);
      }
    }
    if (plan.source.hash !== undefined && typeof plan.source.hash !== 'string') {
      errors.push('source.hash debe ser string');
    }
  }

  for (const key of ['brolls', 'overlays', 'cameras', 'sfx']) {
    if (!Array.isArray(plan[key])) errors.push(`${key} debe ser un array`);
  }
  if (errors.length) throw new PlanValidationError(errors);

  if (plan.brolls.length > limits.maxBrolls) errors.push(`demasiados B-rolls (${plan.brolls.length} > ${limits.maxBrolls})`);
  if (plan.overlays.length > limits.maxOverlays) errors.push(`demasiados overlays (${plan.overlays.length} > ${limits.maxOverlays})`);
  if (plan.cameras.length > limits.maxCameras) errors.push(`demasiadas cámaras (${plan.cameras.length} > ${limits.maxCameras})`);
  if (plan.sfx.length > limits.maxSfx) errors.push(`demasiados SFX (${plan.sfx.length} > ${limits.maxSfx})`);

  const ids = new Set();
  const brollIntervals = [];

  plan.brolls.forEach((event, index) => {
    const label = `brolls[${index}]`;
    if (!isPlainObject(event)) { errors.push(`${label} no es objeto`); return; }
    const times = validateEventTimes(event, label, duration, errors);
    if (!times) return;
    const { start, end } = times;
    const len = end - start;
    if (len < limits.minBrollDuration) errors.push(`${label} dura ${len.toFixed(2)}s; mínimo ${limits.minBrollDuration}s`);
    if (len > limits.maxBrollDuration) errors.push(`${label} dura ${len.toFixed(2)}s; máximo ${limits.maxBrollDuration}s`);
    if (!event.id || typeof event.id !== 'string') errors.push(`${label}.id es obligatorio`);
    else if (!ID_PATTERN.test(event.id)) errors.push(`${label}.id debe usar letras, números, guion o guion bajo (máx. 64)`);
    else if (ids.has(event.id)) errors.push(`${label}.id duplicado: ${event.id}`);
    ids.add(event.id);
    if (!event.concept || typeof event.concept !== 'string') errors.push(`${label}.concept es obligatorio`);
    else if (event.concept.length > limits.maxConceptChars) errors.push(`${label}.concept supera ${limits.maxConceptChars} caracteres`);
    if (!event.narrative || typeof event.narrative !== 'string') errors.push(`${label}.narrative (intención) es obligatorio`);
    else if (event.narrative.length > limits.maxNarrativeChars) errors.push(`${label}.narrative supera ${limits.maxNarrativeChars} caracteres`);
    if (!event.component || !COMPONENTS[event.component]) {
      errors.push(`${label}.component no permitido: ${event.component}`);
    } else {
      validateProps(event.component, event.props, `${label}.props`, errors);
    }
    if (event.cutStyle !== undefined && (typeof event.cutStyle !== 'string' || !CUT_STYLES.includes(event.cutStyle))) {
      errors.push(`${label}.cutStyle debe ser uno de: ${CUT_STYLES.join(', ')}`);
    }
    if (event.transition !== undefined && (typeof event.transition !== 'string' || !TRANSITIONS.includes(event.transition))) {
      errors.push(`${label}.transition debe ser uno de: ${TRANSITIONS.join(', ')}`);
    }
    for (const previous of brollIntervals) {
      if (intervalsOverlap(start, end, previous.start, previous.end)) {
        errors.push(`${label} se solapa con otro B-roll`);
      }
    }
    brollIntervals.push({ start, end });
    normalized.brolls.push({ ...event, start, end });
  });

  let brollTotal = 0;
  let stockTotal = 0;
  for (const b of normalized.brolls) {
    brollTotal += b.end - b.start;
    if (b.component === 'stock_video') stockTotal += b.end - b.start;
  }
  if (duration > 0 && brollTotal / duration > limits.maxBrollCoverage) {
    errors.push(`cobertura de B-roll ${(brollTotal / duration * 100).toFixed(0)}% > ${(limits.maxBrollCoverage * 100)}%`);
  }
  if (isMotion && duration > 0 && limits.maxStockCoverage && stockTotal / duration > limits.maxStockCoverage) {
    errors.push(`cobertura de stock_video en modo motion ${(stockTotal / duration * 100).toFixed(0)}% > ${(limits.maxStockCoverage * 100).toFixed(0)}%`);
  }

  const overlayIntervals = [];
  plan.overlays.forEach((event, index) => {
    const label = `overlays[${index}]`;
    if (!isPlainObject(event)) { errors.push(`${label} no es objeto`); return; }
    const times = validateEventTimes(event, label, duration, errors);
    if (!times) return;
    const { start, end } = times;
    const len = end - start;
    if (!event.id || typeof event.id !== 'string') errors.push(`${label}.id es obligatorio`);
    else if (!ID_PATTERN.test(event.id)) errors.push(`${label}.id debe usar letras, números, guion o guion bajo (máx. 64)`);
    else if (ids.has(event.id)) errors.push(`${label}.id duplicado: ${event.id}`);
    ids.add(event.id);
    if (event.text !== undefined && typeof event.text !== 'string') {
      errors.push(`${label}.text debe ser string`);
    } else if (!event.text && !hasOverlayVisual(event)) {
      errors.push(`${label}.text es obligatorio`);
    } else if (typeof event.text === 'string') {
      if (event.text.length > limits.maxOverlayChars) errors.push(`${label}.text supera ${limits.maxOverlayChars} caracteres`);
      if (/[\r\n]/.test(event.text)) errors.push(`${label}.text no puede tener saltos de línea`);
    }
    if (event.position !== undefined && (!OVERLAY_POSITIONS.includes(event.position) || typeof event.position !== 'string')) {
      errors.push(`${label}.position debe ser ${OVERLAY_POSITIONS.join(', ')}`);
    }
    if (event.accent !== undefined && (typeof event.accent !== 'string' || !/^#[0-9a-f]{6}$/i.test(event.accent))) {
      errors.push(`${label}.accent debe ser #rrggbb`);
    }
    if (event.allowOverBroll !== undefined && typeof event.allowOverBroll !== 'boolean') {
      errors.push(`${label}.allowOverBroll debe ser booleano`);
    }
    validateOverlayExtraFields(event, label, errors);
    for (const key of ['semanticStart', 'semanticEnd']) {
      if (event[key] !== undefined && (!isStrictNumber(event[key]) || event[key] < 0 || event[key] > duration + 0.001)) {
        errors.push(`${label}.${key} debe ser un número dentro de la duración`);
      }
    }
    if (isStrictNumber(event.semanticStart) && isStrictNumber(event.semanticEnd) && event.semanticEnd <= event.semanticStart) {
      errors.push(`${label}.semanticEnd debe ser mayor que semanticStart`);
    }
    const reading = clamp(String(event.text || '').trim().length / limits.overlayReadingCharsPerSec, limits.minOverlayDuration, limits.maxOverlayDuration);
    if (len < reading) errors.push(`${label} dura ${len.toFixed(2)}s; necesita ${reading.toFixed(2)}s para leerse`);
    for (const previous of overlayIntervals) {
      if (intervalsOverlap(start, end, previous.start, previous.end)) errors.push(`${label} se solapa con otro overlay`);
    }
    if (!event.allowOverBroll) {
      for (const b of brollIntervals) {
        if (intervalsOverlap(start, end, b.start, b.end)) {
          errors.push(`${label} cae sobre un B-roll sin allowOverBroll: true`);
        }
      }
    }
    overlayIntervals.push({ start, end });
    normalized.overlays.push({ ...event, start, end });
  });

  // Cameras only operate on talking-head intervals and must leave air.
  let cameraTotal = 0;
  plan.cameras.forEach((event, index) => {
    const label = `cameras[${index}]`;
    if (!isPlainObject(event)) { errors.push(`${label} no es objeto`); return; }
    const times = validateEventTimes(event, label, duration, errors);
    if (!times) return;
    const { start, end } = times;
    const len = end - start;
    if (len < 0.8) errors.push(`${label} dura ${len.toFixed(2)}s; mínimo 0.8s`);
    if (!event.id || typeof event.id !== 'string') errors.push(`${label}.id es obligatorio`);
    else if (!ID_PATTERN.test(event.id)) errors.push(`${label}.id debe usar letras, números, guion o guion bajo (máx. 64)`);
    else if (ids.has(event.id)) errors.push(`${label}.id duplicado: ${event.id}`);
    ids.add(event.id);
    if (!CAMERA_TYPES.includes(event.type)) errors.push(`${label}.type debe ser ${CAMERA_TYPES.join(', ')}`);
    const intensity = event.intensity === undefined ? 0.5 : event.intensity;
    if (!isStrictNumber(intensity) || intensity < 0 || intensity > 1) errors.push(`${label}.intensity debe ser un número entre 0 y 1`);
    if (event.focusX !== undefined && (!isStrictNumber(event.focusX) || Math.abs(event.focusX) > 1)) {
      errors.push(`${label}.focusX debe ser un número entre -1 y 1`);
    }
    if (event.focusY !== undefined && (!isStrictNumber(event.focusY) || Math.abs(event.focusY) > 1)) {
      errors.push(`${label}.focusY debe ser un número entre -1 y 1`);
    }
    for (const b of brollIntervals) {
      if (intervalsOverlap(start, end, b.start, b.end)) errors.push(`${label} cae sobre un B-roll (la cámara solo aplica al talking head)`);
    }
    for (const previous of normalized.cameras) {
      if (intervalsOverlap(start, end, previous.start, previous.end)) errors.push(`${label} se solapa con otra cámara`);
      else if (start > previous.end && start - previous.end < limits.minCameraGap) errors.push(`${label} demasiado cerca de otra cámara`);
    }
    cameraTotal += len;
    normalized.cameras.push({ ...event, start, end, intensity });
  });
  if (duration > 0 && cameraTotal / duration > limits.maxCameraCoverage) {
    errors.push(`cobertura de cámara ${(cameraTotal / duration * 100).toFixed(0)}% > ${(limits.maxCameraCoverage * 100)}%`);
  }

  plan.sfx.forEach((event, index) => {
    const label = `sfx[${index}]`;
    if (!isPlainObject(event)) { errors.push(`${label} no es objeto`); return; }
    const at = event.at;
    if (!isStrictNumber(at) || at < 0 || at >= duration) errors.push(`${label}.at debe ser un número finito dentro de la duración (fuera de la duración)`);
    if (!event.id || typeof event.id !== 'string') errors.push(`${label}.id es obligatorio`);
    else if (!ID_PATTERN.test(event.id)) errors.push(`${label}.id debe usar letras, números, guion o guion bajo (máx. 64)`);
    else if (ids.has(event.id)) errors.push(`${label}.id duplicado: ${event.id}`);
    ids.add(event.id);
    if (!event.sound || typeof event.sound !== 'string') errors.push(`${label}.sound es obligatorio`);
    if (sfxIds && !sfxIds.has(event.sound)) errors.push(`${label}.sound no existe en el catálogo: ${event.sound}`);
    const gain = event.gainDb === undefined ? -15 : event.gainDb;
    if (!isStrictNumber(gain) || gain < -30 || gain > 0) errors.push(`${label}.gainDb debe ser un número entre -30 y 0`);
    if (event.trimSec !== undefined && (!isStrictNumber(event.trimSec) || event.trimSec < 0.1 || event.trimSec > 6.0)) {
      errors.push(`${label}.trimSec debe ser un número entre 0.1 y 6.0`);
    }
    if (event.fadeInSec !== undefined && (!isStrictNumber(event.fadeInSec) || event.fadeInSec < 0 || event.fadeInSec > 2.0)) {
      errors.push(`${label}.fadeInSec debe ser un número entre 0 y 2.0`);
    }
    if (event.fadeOutSec !== undefined && (!isStrictNumber(event.fadeOutSec) || event.fadeOutSec < 0 || event.fadeOutSec > 2.0)) {
      errors.push(`${label}.fadeOutSec debe ser un número entre 0 y 2.0`);
    }
    if (!event.reason || typeof event.reason !== 'string') errors.push(`${label}.reason (justificación) es obligatorio`);
    else if (event.reason.length > 140) errors.push(`${label}.reason supera 140 caracteres`);
    if (event.target !== undefined) {
      if (typeof event.target !== 'string' || !/^(broll|overlay|camera):[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/.test(event.target)) {
        errors.push(`${label}.target debe ser broll:<id>, overlay:<id> o camera:<id>`);
      } else {
        const [kind, targetId] = event.target.split(':');
        const pool = kind === 'broll' ? normalized.brolls : kind === 'overlay' ? normalized.overlays : normalized.cameras;
        if (!pool.some((entry) => entry.id === targetId)) {
          errors.push(`${label}.target apunta a un evento inexistente: ${event.target}`);
        }
      }
    }
    for (const previous of normalized.sfx) {
      if (Math.abs(at - previous.at) < limits.minSfxGap) errors.push(`${label} demasiado cerca de otro SFX (${limits.minSfxGap}s)`);
    }
    normalized.sfx.push({ ...event, at: roundTime(at), gainDb: gain });
  });

  // Forbid consecutive identical sfx.sound IDs in chronological playback order.
  const chronologicalSfx = normalized.sfx.slice().sort((a, b) => a.at - b.at);
  for (let i = 1; i < chronologicalSfx.length; i++) {
    if (chronologicalSfx[i].sound && chronologicalSfx[i].sound === chronologicalSfx[i - 1].sound) {
      errors.push(`sfx consecutivo repite el mismo sonido (${chronologicalSfx[i].sound} en ${chronologicalSfx[i - 1].id} y ${chronologicalSfx[i].id})`);
    }
  }

  const captions = plan.captions;
  if (!isPlainObject(captions)) {
    errors.push('captions debe ser un objeto');
  } else {
    if (typeof captions.enabled !== 'boolean') errors.push('captions.enabled debe ser booleano');
    const maxChars = captions.maxCharsPerLine === undefined ? 32 : captions.maxCharsPerLine;
    const maxLines = captions.maxLines === undefined ? 2 : captions.maxLines;
    const minDuration = captions.minDuration === undefined ? 0.8 : captions.minDuration;
    if (!isStrictNumber(maxChars) || maxChars < 18 || maxChars > 50) errors.push('captions.maxCharsPerLine debe ser un número entre 18 y 50');
    if (typeof maxLines !== 'number' || !Number.isInteger(maxLines) || maxLines < 1 || maxLines > 3) errors.push('captions.maxLines debe ser un entero 1..3');
    if (!isStrictNumber(minDuration) || minDuration < limits.minCaptionDuration || minDuration > 3) {
      errors.push(`captions.minDuration debe ser un número entre ${limits.minCaptionDuration} y 3`);
    }
    if (captions.overBroll !== undefined && typeof captions.overBroll !== 'boolean') errors.push('captions.overBroll debe ser booleano');
    if (captions.dynamic !== undefined && typeof captions.dynamic !== 'boolean') errors.push('captions.dynamic debe ser booleano');
    if (captions.marginV !== undefined && (!isStrictNumber(captions.marginV) || captions.marginV < 80 || captions.marginV > 700)) {
      errors.push('captions.marginV debe ser un número entre 80 y 700');
    }
    if (captions.accentColor !== undefined && (typeof captions.accentColor !== 'string' || !/^#[0-9a-f]{6}$/i.test(captions.accentColor))) {
      errors.push('captions.accentColor debe ser #rrggbb');
    }
    if (captions.highlightWords !== undefined) {
      if (!Array.isArray(captions.highlightWords)) errors.push('captions.highlightWords debe ser un array');
      else if (captions.highlightWords.length > 16) errors.push('captions.highlightWords admite máximo 16 palabras');
      else if (captions.highlightWords.some((w) => typeof w !== 'string' || w.length > 24)) errors.push('captions.highlightWords contiene palabras inválidas');
    }
    normalized.captions = {
      enabled: captions.enabled !== false,
      maxCharsPerLine: maxChars,
      maxLines,
      minDuration,
      overBroll: captions.overBroll === true,
      ...(captions.dynamic !== undefined ? { dynamic: captions.dynamic === true } : {}),
      ...(captions.marginV !== undefined ? { marginV: captions.marginV } : {}),
      ...(captions.accentColor ? { accentColor: captions.accentColor } : {}),
      highlightWords: Array.isArray(captions.highlightWords) ? captions.highlightWords.map(String) : []
    };
  }

  const copyCheck = validateCopy(normalized, {
    strict: options.strictCopy === true,
    allowLegacyCopy: !!options.allowLegacyCopy,
    transcriptText: options.transcriptText !== undefined
      ? options.transcriptText
      : (normalized.transcript && normalized.transcript.text) || ''
  });
  if (!copyCheck.ok) {
    errors.push(...copyCheck.errors);
  }

  if (errors.length) throw new PlanValidationError(errors);

  // Stable ordering makes plan diffs and resume hashes meaningful.
  normalized.brolls.sort((a, b) => a.start - b.start);
  normalized.overlays.sort((a, b) => a.start - b.start);
  normalized.cameras.sort((a, b) => a.start - b.start);
  normalized.sfx.sort((a, b) => a.at - b.at);
  normalized.source = {
    ...normalized.source,
    duration: roundTime(duration),
    video: normalized.source.video || options.videoPath || '',
    width: Number(normalized.source.width) || undefined,
    height: Number(normalized.source.height) || undefined,
    fps: Number(normalized.source.fps) || undefined,
    hash: normalized.source.hash ? String(normalized.source.hash) : undefined
  };
  for (const key of Object.keys(normalized.source)) {
    if (normalized.source[key] === undefined) delete normalized.source[key];
  }
  normalized.transcript = {
    language: normalized.transcript.language ? String(normalized.transcript.language) : undefined,
    text: normalized.transcript.text ? String(normalized.transcript.text).slice(0, 20000) : undefined
  };
  for (const key of Object.keys(normalized.transcript)) {
    if (normalized.transcript[key] === undefined) delete normalized.transcript[key];
  }
  return normalized;
}

function planFingerprint(plan) {
  return stableStringify(plan);
}

function planStats(plan) {
  const brollSeconds = (plan.brolls || []).reduce((sum, e) => sum + (e.end - e.start), 0);
  const stockSeconds = (plan.brolls || []).filter((e) => e.component === 'stock_video').reduce((sum, e) => sum + (e.end - e.start), 0);
  const overlaySeconds = (plan.overlays || []).reduce((sum, e) => sum + (e.end - e.start), 0);
  const cameraSeconds = (plan.cameras || []).reduce((sum, e) => sum + (e.end - e.start), 0);
  const duration = Number(plan.source && plan.source.duration) || 1;
  return {
    mode: plan.mode || 'talking_head',
    duration: roundTime(duration),
    brolls: (plan.brolls || []).length,
    overlays: (plan.overlays || []).length,
    cameras: (plan.cameras || []).length,
    sfx: (plan.sfx || []).length,
    brollCoverage: roundTime(brollSeconds / duration),
    stockCoverage: roundTime(stockSeconds / duration),
    overlayCoverage: roundTime(overlaySeconds / duration),
    cameraCoverage: roundTime(cameraSeconds / duration),
    captions: !!(plan.captions && plan.captions.enabled)
  };
}

module.exports = {
  PLAN_VERSION,
  MODES,
  TRANSITIONS,
  LIMITS,
  MOTION_LIMITS,
  COMPONENTS,
  OVERLAY_POSITIONS,
  OVERLAY_STYLES,
  CUT_STYLES,
  CAMERA_TYPES,
  PlanValidationError,
  validatePlan,
  planFingerprint,
  planStats,
  intervalsOverlap
};
