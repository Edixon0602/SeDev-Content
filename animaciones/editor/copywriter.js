// Semantic copywriter & copy validator for SeDev Video Editor v2.
//
// Translates transcript ideas into concise (2-5 words), natural Spanish
// editorial headlines based on detected entities and rhetorical intent.
// Never slices raw transcript clauses and never emits decorative AI-slop
// badges, kickers, pills, or redundant support/subtext lines.

const { isPlainObject } = require('./utils');

const TRAILING_FORBIDDEN_WORDS = new Set([
  // Articles & determiners
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'lo',
  'este', 'esta', 'estos', 'estas', 'ese', 'esa', 'esos', 'esas',
  'su', 'sus', 'mi', 'mis', 'tu', 'tus',
  // Prepositions & contractions
  'a', 'al', 'ante', 'bajo', 'cabe', 'con', 'contra', 'de', 'del',
  'desde', 'durante', 'en', 'entre', 'hacia', 'hasta', 'mediante',
  'para', 'por', 'segun', 'sin', 'sobre', 'tras',
  // Conjunctions & relatives
  'y', 'e', 'o', 'u', 'ni', 'pero', 'sino', 'aunque', 'porque',
  'pues', 'que', 'quien', 'cual', 'como', 'cuando', 'donde', 'si', 'mientras',
  // Auxiliary / modal / incomplete verbs
  'va', 'vas', 'van', 'vamos', 'vais', 'vaya', 'vayas', 'vayan', 'vayamos',
  'puede', 'puedes', 'pueden', 'podemos', 'pueda', 'puedan', 'podria', 'podrian',
  'ser', 'es', 'son', 'sea', 'sean', 'era', 'eran', 'fue', 'fueron',
  'estar', 'esta', 'estan', 'esten', 'estaba', 'estaban',
  'haber', 'ha', 'han', 'he', 'hemos', 'haya', 'hayan', 'habia', 'habian',
  'tener', 'tiene', 'tienen', 'tenga', 'tengan',
  'hacer', 'hace', 'hacen', 'haga', 'hagan',
  'ir', 'iba', 'iban', 'empezar', 'empieza', 'empiezan', 'mermar',
  'se', 'me', 'te', 'nos', 'os', 'le', 'les'
]);

const BANNED_SLOP_PHRASES = [
  'mercado tech',
  'base instalada',
  'cambio en industria',
  'cambio de modelo',
  'idea clave',
  'debate en comentarios',
  'opcion 01',
  'opcion 02',
  'ecosistema saas enterprise',
  'ecosistema tech',
  'deja tu opinion en comentarios',
  'deja tu postura abajo',
  'evidencia visual',
  'sistema unificado',
  'arquitectura interna',
  'desglose tecnico',
  'curva de creacion',
  'curva de impacto',
  'via a',
  'via b',
  'nuevo paradigma',
  'cambio en mercado'
];

const BANNED_STANDALONE_LABELS = new Set([
  'clave',
  'debate',
  'tendencia',
  'causa',
  'efecto',
  'comparacion',
  'vs',
  'mercado tech',
  'base instalada',
  'cambio en industria',
  'opcion 01',
  'opcion 02'
]);

const LEGACY_SUBTEXT_SLOP = [
  'ecosistema saas enterprise',
  'deja tu opinion en comentarios',
  'deja tu postura abajo',
  'mercado tech',
  'cambio en industria',
  'opcion 01',
  'opcion 02'
];

function normalizeTerm(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function tokenizeNormalizedWords(value) {
  return normalizeTerm(value)
    .replace(/[¿¡.,;:!?()[\]{}"“”«»…↓↑=·•/\\|+_-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function countHeadlineWords(text) {
  const clean = String(text || '')
    .replace(/[¿¡.,;:!?()[\]{}"“”«»…↓↑=·•]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!clean) return 0;
  return clean.split(' ').filter(Boolean).length;
}

function extractEntities(text) {
  const norm = normalizeTerm(text);
  const hasAgents = /\bagente(?:s)?\b|\bagentes\s+ia\b|\bia\b|inteligencia artificial|\bmodelo(?:s)?\b/.test(norm);
  const hasCustom = /custom\s+software|software\s+a\s+medida|\ba\s+medida\b/.test(norm);
  const hasSaas = /\bsaas\b/.test(norm) || (/software\s+como\s+servicio/.test(norm) && !hasAgents && !hasCustom);
  const hasBilling = /facturaci|factura/.test(norm);
  const hasAutomation = /automatiz/.test(norm);
  const hasFlow = /\bflujo\b|\bpipeline\b|\bcola\b|\bsistema\b/.test(norm);
  const hasPayments = /\bpago(?:s)?\b|\bcobro(?:s)?\b/.test(norm);
  const hasTime = /\bhora(?:s)?\b|\btiempo\b|\bpausa\b/.test(norm);
  const hasIndustry = /\bindustria\b|\bmercado\b|\bsector\b|\bgrandes\b|\bgigantes\b/.test(norm);

  const list = [];
  if (hasSaas) list.push({ key: 'saas', label: 'SAAS', article: 'EL SAAS', short: 'SAAS' });
  if (hasAgents) list.push({ key: 'agents', label: 'AGENTES IA', article: 'LOS AGENTES', short: 'AGENTES' });
  if (hasCustom) list.push({ key: 'custom', label: 'SOFTWARE A MEDIDA', article: 'EL SOFTWARE A MEDIDA', short: 'SOFTWARE A MEDIDA' });
  if (hasBilling) list.push({ key: 'billing', label: 'FACTURACIÓN', article: 'LA FACTURACIÓN', short: 'FACTURACIÓN' });
  if (hasAutomation) list.push({ key: 'automation', label: 'AUTOMATIZACIÓN', article: 'LA AUTOMATIZACIÓN', short: 'AUTOMATIZACIÓN' });
  if (hasPayments) list.push({ key: 'payments', label: 'PAGOS', article: 'LOS PAGOS', short: 'PAGOS' });
  if (hasFlow) list.push({ key: 'flow', label: 'FLUJO', article: 'EL FLUJO', short: 'FLUJO' });
  if (hasTime) list.push({ key: 'time', label: 'TIEMPO', article: 'EL TIEMPO', short: 'TIEMPO' });
  if (hasIndustry) list.push({ key: 'industry', label: 'MERCADO', article: 'EL MERCADO', short: 'MERCADO' });

  return {
    hasSaas,
    hasAgents,
    hasCustom,
    hasBilling,
    hasAutomation,
    hasFlow,
    hasPayments,
    hasTime,
    hasIndustry,
    list,
    primary: list[0] || null
  };
}

const INTENT_TABLE = [
  {
    id: 'disappearance_question',
    match(norm, entities, role) {
      const hasEnd = /desapar|\bfin\b|morir|muere|extingu|acaba/.test(norm);
      const hasQuestionCue = /\?|\bcreen\b|\bpiensan\b|\bvamos a ver\b/.test(norm);
      if (role === 'cta') return false;
      return hasEnd && (hasQuestionCue || role === 'hook');
    },
    templates(entities) {
      if (entities.hasSaas) {
        return ['¿EL FIN DEL SAAS?', '¿DESAPARECE EL SAAS?', '¿ADIÓS AL SAAS?'];
      }
      if (entities.primary) {
        return [
          `¿EL FIN DE ${entities.primary.label}?`,
          `¿DESAPARECE ${entities.primary.article}?`,
          `¿ADIÓS A ${entities.primary.label}?`
        ];
      }
      return ['¿EL FIN DEL MODELO?', '¿CAMBIA TODO AHORA?'];
    }
  },
  {
    id: 'incumbent_persistence',
    match(norm) {
      const hasIncumbent = /\bgrandes\b|\bincumbentes\b|\bgigantes\b|\blideres\b|\bconsolidad/.test(norm);
      const hasPersist = /no\s+creo|no\s+van|no\s+vayan|quedan|resisten|siguen|noche\s+a\s+la\s+manana|permanec/.test(norm);
      return hasIncumbent && hasPersist;
    },
    templates() {
      return ['LOS GIGANTES SE QUEDAN', 'LOS GRANDES RESISTEN', 'NO CAEN TAN FÁCIL'];
    }
  },
  {
    id: 'creation_decline',
    match(norm) {
      const hasDrop = /mermar|caer|\bcae\b|bajar|\bbaja\b|frenar|freno|reduc|menos/.test(norm);
      const hasNew = /creacion|nuevo|nueva|nuevos|nuevas|lanzamiento|empezar/.test(norm);
      return hasDrop && hasNew;
    },
    templates(entities) {
      if (entities.hasSaas || /software/.test(entities.rawNorm || '')) {
        return ['MENOS SAAS NUEVO', 'FRENO AL SAAS NUEVO', 'CAE EL SAAS NUEVO'];
      }
      if (entities.primary) {
        return [`MENOS ${entities.primary.short} NUEVO`, `CAE ${entities.primary.article}`];
      }
      return ['MENOS CREACIÓN NUEVA', 'FRENO EN EL MERCADO'];
    }
  },
  {
    id: 'comparison_ab',
    match(norm, entities) {
      if (entities.hasAgents && entities.hasCustom) return true;
      const hasContrast = /\bvs\b|\bversus\b|o\s+hacia|comparaci|diferencia|en\s+vez\s+de/.test(norm);
      return hasContrast && entities.list.length >= 2;
    },
    templates(entities) {
      if (entities.hasAgents && entities.hasCustom) {
        return ['AGENTES vs SOFTWARE A MEDIDA', 'AGENTES O A MEDIDA', 'NUEVO RUMBO EN SOFTWARE'];
      }
      if (entities.list.length >= 2) {
        const a = entities.list[0].short;
        const b = entities.list[1].short;
        return [`${a} vs ${b}`, `${a} O ${b}`];
      }
      return ['DOS CAMINOS DISTINTOS', 'EL NUEVO EQUILIBRIO'];
    }
  },
  {
    id: 'industry_shift',
    match(norm, entities) {
      const hasShift = /inclinar|girar|giro|migrar|cambiar|rumbo|\bhacia\b/.test(norm);
      return hasShift && (entities.hasCustom || entities.hasAgents || entities.hasIndustry);
    },
    templates(entities) {
      if (entities.hasCustom) {
        return ['SOFTWARE A MEDIDA', 'GIRO A MEDIDA', 'SOLUCIONES A MEDIDA'];
      }
      if (entities.hasAgents) {
        return ['GIRO A AGENTES IA', 'AUGE DE AGENTES IA', 'RUMBO A AGENTES IA'];
      }
      return ['EL MERCADO GIRA', 'NUEVO RUMBO DIGITAL', 'GIRO DEL SECTOR'];
    }
  },
  {
    id: 'audience_cta',
    match(norm, entities, role) {
      const hasAsk = /\?|\bopinan\b|\bpiensan\b|\bustedes\b|\bcomo ven\b|\bque harian\b/.test(norm);
      return role === 'cta' ? hasAsk || true : hasAsk;
    },
    templates() {
      return ['¿TÚ QUÉ OPINAS?', '¿CÓMO LO VES?', '¿QUÉ PIENSAS TÚ?'];
    }
  },
  {
    id: 'automation_savings',
    match(norm, entities) {
      return entities.hasAutomation && (/ahorra|tiempo|desaparec|manual|paso/.test(norm));
    },
    templates(entities) {
      if (entities.hasBilling) {
        return ['FACTURACIÓN SIN ESPERAS', 'CERO PASOS MANUALES', 'MENOS TAREA MANUAL'];
      }
      return ['CERO PASOS MANUALES', 'MENOS TAREA MANUAL', 'AHORRO DE TIEMPO'];
    }
  },
  {
    id: 'flow_pipeline',
    match(norm) {
      return /recibe|verifica|emite|entra|sale|\bflujo\b|atasca|pipeline|\bcola\b/.test(norm);
    },
    templates(entities) {
      if (entities.hasPayments || entities.hasBilling) {
        return ['FLUJO DE COBRO', 'COBRO EN SEGUNDOS', 'FLUJO SIN FRENOS'];
      }
      return ['FLUJO SIN FRENOS', 'PROCESO EN MARCHA', 'FLUJO CONTINUO'];
    }
  },
  {
    id: 'cost_bottleneck',
    match(norm) {
      return /pausa|invisible|costaba|cuesta|cuello|lento|\bhora\b/.test(norm);
    },
    templates() {
      return ['EL COSTE INVISIBLE', 'HORAS PERDIDAS', 'FRENO OPERATIVO'];
    }
  },
  {
    id: 'optimization_cleanup',
    match(norm) {
      return /medimos|medir|eliminamos|sobra|optimiz|simplific/.test(norm);
    },
    templates() {
      return ['MEDIR Y SIMPLIFICAR', 'SOLO LO ESENCIAL', 'CERO FRICCIÓN'];
    }
  },
  {
    id: 'security_exposure',
    match(norm) {
      return /https|sin\s+cifrar|texto\s+plano|rls|puerta\s+abierta|sin\s+login|api\s+key|secreto|vulnerabilidad|parche/.test(norm);
    },
    templates(normOrEntities) {
      const raw = (normOrEntities && normOrEntities.rawNorm) || '';
      if (/php|https|tls/.test(raw)) {
        return ['¿HTTPS SIN CIFRADO?', 'TRÁFICO EN TEXTO PLANO', 'ACTUALIZA TU PHP'];
      }
      if (/supabase|lovable|rls|24\.?664/.test(raw)) {
        return ['24.664 APPS ABIERTAS', 'DATOS SIN LOGIN', 'ACTIVA RLS SIEMPRE'];
      }
      return ['PUERTA ABIERTA EN API', 'SECRETOS AL DESCUBIERTO', 'BLINDA EL BACKEND'];
    }
  },
  {
    id: 'incident_outage',
    match(norm) {
      return /300\s*gb|rm\s+-rf|gitlab|s3|cloudflare|crowdstrike|toyota|pantallazo|caida|outage|backup|restore/.test(norm);
    },
    templates(normOrEntities) {
      const raw = (normOrEntities && normOrEntities.rawNorm) || '';
      if (/300\s*gb|gitlab|backup|restore/.test(raw)) {
        return ['300 GB BORRADOS', '5 BACKUPS FALLIDOS', 'PRUEBA EL RESTORE'];
      }
      if (/cloudflare|regex/.test(raw)) {
        return ['UN REGEX TUMBÓ CLOUDFLARE', 'CPU AL 100%', 'LÍMITE AL REGEX'];
      }
      return ['FALLO EN PRODUCCIÓN', 'EL PUNTO CIEGO', 'RESILIENCIA REAL'];
    }
  },
  {
    id: 'market_ram_perf',
    match(norm) {
      return /anthropic|ipo|bolsa|valkey|redis|skiplist|dram|ram|leaderboard/.test(norm);
    },
    templates(normOrEntities) {
      const raw = (normOrEntities && normOrEntities.rawNorm) || '';
      if (/anthropic|ipo|bolsa/.test(raw)) {
        return ['¿DESPLOME EN ANTHROPIC?', 'SOBRE EL PRECIO IPO', 'CAÍDA DEL SECTOR IA'];
      }
      if (/valkey|redis|skiplist|leaderboard/.test(raw)) {
        return ['¿PAGAS RAM DE MÁS?', 'SKIPLIST vs ÁRBOL B+', 'MENOS GASTO EN RAM'];
      }
      return ['LA MEMORIA COBRA MÁS', 'EL COSTE EN RAM', 'MIDE TU CONSUMO'];
    }
  }
];

function findTranscriptNgramOverlap(candidateText, transcriptText, ngramSize = 4) {
  if (!candidateText || !transcriptText) return null;
  const candTokens = tokenizeNormalizedWords(candidateText);
  const transTokens = tokenizeNormalizedWords(transcriptText);
  if (candTokens.length < ngramSize || transTokens.length < ngramSize) return null;
  const transJoined = ` ${transTokens.join(' ')} `;
  for (let i = 0; i <= candTokens.length - ngramSize; i++) {
    const slice = candTokens.slice(i, i + ngramSize).join(' ');
    if (transJoined.includes(` ${slice} `)) return slice;
  }
  return null;
}

function hasBannedSlop(text, options = {}) {
  const norm = normalizeTerm(text).replace(/[·•|]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!norm) return null;
  for (const phrase of BANNED_SLOP_PHRASES) {
    if (norm.includes(phrase)) return phrase;
  }
  if (options.checkStandalone !== false && BANNED_STANDALONE_LABELS.has(norm)) {
    return norm;
  }
  return null;
}

function endsWithForbiddenWord(text) {
  const tokens = tokenizeNormalizedWords(text);
  if (!tokens.length) return null;
  const last = tokens[tokens.length - 1];
  return TRAILING_FORBIDDEN_WORDS.has(last) ? last : null;
}

function validateHeadline(text, transcriptText = '', options = {}) {
  const errors = [];
  const raw = String(text === undefined || text === null ? '' : text).trim();
  if (!raw) {
    if (options.allowEmpty) return { ok: true, errors: [] };
    errors.push('el titular está vacío sin respaldo visual');
    return { ok: false, errors };
  }
  if (/[\r\n]/.test(raw)) errors.push('el titular no puede tener saltos de línea');

  const wc = countHeadlineWords(raw);
  const minWords = options.minWords !== undefined ? options.minWords : 2;
  const maxWords = options.maxWords !== undefined ? options.maxWords : 5;
  if (!options.skipWordCount && (wc < minWords || wc > maxWords)) {
    errors.push(`titular "${raw}" tiene ${wc} palabras (requiere ${minWords}-${maxWords})`);
  }

  const slop = hasBannedSlop(raw, { checkStandalone: true });
  if (slop) {
    errors.push(`titular "${raw}" contiene vocabulario prohibido ("${slop}")`);
  }

  const trailing = endsWithForbiddenWord(raw);
  if (trailing) {
    errors.push(`titular "${raw}" termina en palabra truncada/auxiliar ("${trailing}")`);
  }

  if (transcriptText) {
    const overlap = findTranscriptNgramOverlap(raw, transcriptText, 4);
    if (overlap) {
      errors.push(`titular "${raw}" copia literalmente 4+ palabras del transcript ("${overlap}")`);
    }
  }

  return { ok: errors.length === 0, errors };
}

function hasOverlayVisual(overlay) {
  if (!overlay || !isPlainObject(overlay)) return false;
  const hasIcon = Boolean(overlay.icon && overlay.icon !== 'none');
  return Boolean(
    hasIcon ||
    (Array.isArray(overlay.logos) && overlay.logos.length) ||
    overlay.image ||
    overlay.imageQuery ||
    (Array.isArray(overlay.items) && overlay.items.length)
  );
}

function hasBrollVisual(props) {
  if (!props || !isPlainObject(props)) return false;
  const hasIcon = Boolean(props.icon && props.icon !== 'none');
  const hasLeftIcon = Boolean(props.leftIcon && props.leftIcon !== 'none');
  const hasRightIcon = Boolean(props.rightIcon && props.rightIcon !== 'none');
  return Boolean(
    hasIcon ||
    hasLeftIcon ||
    hasRightIcon ||
    (Array.isArray(props.logos) && props.logos.length) ||
    props.image ||
    props.imageQuery
  );
}

function validateCopy(plan, options = {}) {
  const errors = [];
  const strict = options.strict !== false;
  const transcriptText = String(
    options.transcriptText !== undefined
      ? options.transcriptText
      : (plan && plan.transcript && plan.transcript.text) || ''
  );

  const overlays = Array.isArray(plan && plan.overlays) ? plan.overlays : [];
  overlays.forEach((overlay, idx) => {
    const label = `overlays[${idx}]`;
    if (!isPlainObject(overlay)) return;
    if (strict) {
      for (const forbidden of ['badge', 'kicker', 'support', 'subtext']) {
        if (overlay[forbidden] !== undefined && String(overlay[forbidden]).trim() !== '') {
          errors.push(`${label}.${forbidden} prohibido (cero badges/kickers/subtext)`);
        }
      }
    } else {
      for (const field of ['badge', 'kicker']) {
        if (overlay[field]) {
          const slop = hasBannedSlop(overlay[field], { checkStandalone: true });
          if (slop) errors.push(`${label}.${field} contiene slop prohibido ("${slop}")`);
        }
      }
      if (overlay.subtext && typeof overlay.subtext === 'string') {
        const normSub = normalizeTerm(overlay.subtext);
        const subSlop = LEGACY_SUBTEXT_SLOP.find((p) => normSub.includes(p));
        if (subSlop) errors.push(`${label}.subtext contiene slop prohibido ("${subSlop}")`);
        if (overlay.style === 'stat_callout' || overlay.style === 'minimal_banner') {
          const extraSlop = hasBannedSlop(overlay.subtext, { checkStandalone: true });
          if (extraSlop) errors.push(`${label}.subtext contiene slop prohibido ("${extraSlop}")`);
        }
      }
    }
    const isStatCallout = overlay.style === 'stat_callout';
    const res = validateHeadline(overlay.text, transcriptText, {
      allowEmpty: hasOverlayVisual(overlay),
      minWords: !strict && isStatCallout ? 1 : 2,
      skipWordCount: !!options.allowLegacyCopy
    });
    for (const err of res.errors) errors.push(`${label}: ${err}`);

    if (Array.isArray(overlay.items)) {
      overlay.items.forEach((item, ii) => {
        const itemLabel = typeof item === 'string' ? item : item && item.label;
        if (itemLabel) {
          const slop = hasBannedSlop(itemLabel, { checkStandalone: true });
          if (slop) errors.push(`${label}.items[${ii}] contiene slop ("${slop}")`);
          const trailing = endsWithForbiddenWord(itemLabel);
          if (trailing) errors.push(`${label}.items[${ii}] termina en "${trailing}"`);
        }
        if (strict && isPlainObject(item) && item.sublabel) {
          errors.push(`${label}.items[${ii}].sublabel prohibido`);
        }
      });
    }
  });

  const brolls = Array.isArray(plan && plan.brolls) ? plan.brolls : [];
  brolls.forEach((broll, idx) => {
    const label = `brolls[${idx}].props`;
    const props = broll && broll.props;
    if (!isPlainObject(props)) return;
    const comp = broll && broll.component;
    const usesTitle = comp === 'code_terminal' || comp === 'terminal_split' || comp === 'metrics_comparison' || comp === 'versus_race';
    if (strict) {
      for (const forbidden of ['kicker', 'support', 'badge', 'subtext']) {
        if (props[forbidden] !== undefined && String(props[forbidden]).trim() !== '') {
          errors.push(`${label}.${forbidden} prohibido (cero kickers/support)`);
        }
      }
    } else {
      for (const field of ['kicker', 'badge']) {
        if (props[field]) {
          const slop = hasBannedSlop(props[field], { checkStandalone: true });
          if (slop) errors.push(`${label}.${field} contiene slop prohibido ("${slop}")`);
        }
      }
      if (props.support && typeof props.support === 'string') {
        const normSup = normalizeTerm(props.support);
        const supSlop = LEGACY_SUBTEXT_SLOP.find((p) => normSup.includes(p));
        if (supSlop) errors.push(`${label}.support contiene slop prohibido ("${supSlop}")`);
      }
    }
    if (usesTitle) {
      const hasPayload = Boolean(
        (Array.isArray(props.codeLines) && props.codeLines.length) ||
        props.leftCode || props.rightCode || props.metricA || props.metricB || props.laneA || props.laneB
      );
      if (props.title) {
        const res = validateHeadline(props.title, transcriptText, {
          allowEmpty: true,
          minWords: 2,
          maxWords: 7,
          skipWordCount: !!options.allowLegacyCopy
        });
        for (const err of res.errors) errors.push(`${label}.title: ${err}`);
      } else if (!hasPayload && !hasBrollVisual(props)) {
        errors.push(`${label}: falta title o payload visual`);
      }
      for (const side of ['leftTitle', 'rightTitle', 'subtitle']) {
        if (props[side]) {
          const slop = hasBannedSlop(props[side], { checkStandalone: true });
          if (slop) errors.push(`${label}.${side} contiene slop ("${slop}")`);
        }
      }
    } else if (comp === 'architecture_flow' || comp === 'kinetic_hook') {
      const titleText = props.header || (Array.isArray(props.lines) && props.lines.map((l) => typeof l === 'string' ? l : l && l.text).filter(Boolean).join(' '));
      if (!titleText && !hasBrollVisual(props)) {
        errors.push(`${label}: falta contenido visual`);
      }
    } else {
      const res = validateHeadline(props.headline, transcriptText, {
        allowEmpty: hasBrollVisual(props),
        skipWordCount: !!options.allowLegacyCopy
      });
      for (const err of res.errors) errors.push(`${label}: ${err}`);
    }

    for (const side of ['leftLabel', 'rightLabel']) {
      if (props[side]) {
        const slop = hasBannedSlop(props[side], { checkStandalone: true });
        if (slop) errors.push(`${label}.${side} contiene slop ("${slop}")`);
        const trailing = endsWithForbiddenWord(props[side]);
        if (trailing) errors.push(`${label}.${side} termina en "${trailing}"`);
      }
    }
  });

  return { ok: errors.length === 0, errors };
}

function rewriteHeadline({ text, role = 'overlay', variant = null, usedHeadlines = new Set(), transcriptText = '' } = {}) {
  const norm = normalizeTerm(text);
  const entities = extractEntities(text);
  entities.rawNorm = norm;

  const matches = [];
  for (const intent of INTENT_TABLE) {
    if (intent.id === 'audience_cta' && role !== 'cta') {
      const hasExplicitAsk = /\?|\bopinan\b|\bpiensan\b|\bustedes\b|\bcomo ven\b/.test(norm);
      if (!hasExplicitAsk) continue;
    }
    if (intent.match(norm, entities, role)) {
      matches.push(intent);
    }
  }

  // Prioritize role-appropriate intents when multiple match.
  if (role === 'cta') {
    matches.sort((a, b) => (a.id === 'audience_cta' ? -1 : b.id === 'audience_cta' ? 1 : 0));
  } else if (role === 'broll' && variant === 'comparison') {
    matches.sort((a, b) => (a.id === 'comparison_ab' ? -1 : b.id === 'comparison_ab' ? 1 : 0));
  } else if (role === 'broll' && variant === 'cause') {
    matches.sort((a, b) => (a.id === 'creation_decline' ? -1 : b.id === 'creation_decline' ? 1 : 0));
  }

  for (const intent of matches) {
    const candidates = intent.templates(entities);
    for (const cand of candidates) {
      const clean = String(cand).replace(/\s+/g, ' ').trim();
      if (usedHeadlines.has(clean)) continue;
      const check = validateHeadline(clean, transcriptText, { allowEmpty: false });
      if (check.ok) {
        return { text: clean, intent: intent.id, entities, iconOnly: false };
      }
    }
  }

  // Fallback: if no intent matches or all templates were already used,
  // use visual/icon only (never slice raw transcript text).
  return { text: '', intent: null, entities, iconOnly: true };
}

module.exports = {
  TRAILING_FORBIDDEN_WORDS,
  BANNED_SLOP_PHRASES,
  BANNED_STANDALONE_LABELS,
  INTENT_TABLE,
  normalizeTerm,
  tokenizeNormalizedWords,
  countHeadlineWords,
  extractEntities,
  findTranscriptNgramOverlap,
  hasBannedSlop,
  endsWithForbiddenWord,
  hasOverlayVisual,
  hasBrollVisual,
  validateHeadline,
  validateCopy,
  rewriteHeadline
};
