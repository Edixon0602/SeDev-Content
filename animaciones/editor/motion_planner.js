// High-Retention Motion Graphics Planner (--mode motion).
//
// Builds a beat-driven, 100%-covered visual timeline over a voice-over track:
// - Beat 0 (0–1.5s): hook using one of 6 formulas selected by style_director.js
// - Visual change every 2.0s–3.5s (no dead gaps > 3.5s)
// - Hard figures promoted to dedicated data scenes
// - <= 30% moody Pixabay stock_video beats, each paired with a hud_frame overlay
// - Closing CTA beat
// - 9 real SFX with contextual placement, J/L-cut fades/trims, anti-repetition
// - Dynamic lower-centered subtitles (overBroll: true)
// - Zero AI-slop, strict copywriter.js compliance

const { clamp, roundTime } = require('./utils');
const { validatePlan, MOTION_LIMITS } = require('./plan_schema');
const {
  normalizeTerm,
  validateHeadline,
  hasBannedSlop,
  endsWithForbiddenWord,
  findTranscriptNgramOverlap,
  rewriteHeadline
} = require('./copywriter');
const { directStyle, getSfxPoolById } = require('./style_director');

const REAL_SFX_IDS = [
  'censor_beep',
  'ding_real',
  'huh_cat',
  'keyboard_meme',
  'keyboard_typing',
  'money_kaching',
  'punch_hit',
  'rizz_stinger',
  'vine_boom'
];

const NUMBER_WORDS = {
  cero: 0, un: 1, uno: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5,
  seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, medio: 0.5, media: 0.5
};

function extractHardFigures(text) {
  const raw = String(text || '');
  const results = [];
  const rx = /(\d+(?:[.,]\d+)?)\s*(%|gb|gigas?|mb|ms|s|seg(?:undos?)?|h|horas?|min(?:utos?)?|días?|dias?|meses?|años?|anos?|sistemas?|apps?|backups?|respaldos?|tablas?|usd|\$|€|k|x)\b/gi;
  for (const m of raw.matchAll(rx)) {
    const num = Number(m[1].replace(',', '.'));
    let unit = m[2].toLowerCase();
    if (/^gigas?$/.test(unit)) unit = 'GB';
    else if (/^horas?$|^h$/.test(unit)) unit = 'H';
    else if (/^seg(?:undos?)?$|^s$/.test(unit)) unit = 's';
    else if (/^min(?:utos?)?$/.test(unit)) unit = 'min';
    else if (/^ms$/.test(unit)) unit = 'ms';
    else unit = unit.toUpperCase();
    results.push({ raw: m[0], value: num, unit, display: `${m[1].replace(',', '.')} ${unit}`.trim() });
  }
  const halfMatch = /\bmedio\s+segundo\b/i.exec(raw);
  if (halfMatch) {
    results.push({ raw: halfMatch[0], value: 0.5, unit: 's', display: '0.5 s' });
  }
  return results;
}

function extractBeatSignals(text) {
  const norm = normalizeTerm(text);
  const figures = extractHardFigures(text);
  const hasRmRf = /rm\s+-rf/.test(norm);
  const hasPgDump = /pg_dump/.test(norm);
  const hasPostgres = /postgres/.test(norm);
  const hasS3 = /\bs3\b|bucket/.test(norm);
  const hasGitlab = /gitlab/.test(norm);
  const hasBackup = /backup|respald|snapshot|restaur/.test(norm);
  const hasTerminal = /terminal|servidor|copia|replica|produccion|cursor|enter|comando/.test(norm);
  const hasOutage = /borr|terror|caid|fall|vacio|perdi|sin\s+activar|no\s+sirve|no\s+existe/.test(norm);
  const hasCode = hasRmRf || hasPgDump || hasTerminal || /codigo|sql|rls|api|webhook|script/.test(norm);
  const hasCost = figures.some((f) => /h|min|\$|€|usd/i.test(f.unit)) || /cost|hora|pierd|perdi|tard|cronometr|dinero|gasto/.test(norm);
  const hasLatency = figures.some((f) => /ms|s/i.test(f.unit)) || /latencia|tard|medio\s+segundo|rapido|lento|cronometr/.test(norm);
  const hasComparison = /vs|dos\s+terminales|copia|replica|unico\s+backup|panel|marquita\s+verde|o\s+hacia/.test(norm);
  const hasPipeline = /sistema|respaldo|replicacion|flujo|despleg|restaur|cadena|cola|pipeline/.test(norm);
  const hasHierarchy = /directorio|base\s+de\s+datos|tabla|arbol|indice|maquinas/.test(norm);
  const isQuestion = /\?|\bcuando\b|\bcomo\b|\bopinan\b|\bpiensan\b|\brevisaste\b/.test(norm);
  const hasAgents = /\bagente|agentes|\bia\b|inteligencia artificial|modelo/.test(norm);
  const hasSaas = /\bsaas\b|software como servicio/.test(norm);
  const hasCustom = /custom software|a medida/.test(norm);

  let icon = 'terminal';
  if (hasRmRf || hasOutage) icon = 'malware_bug';
  if (hasBackup && !hasOutage) icon = 'zero_trust_lock';
  else if (hasPostgres || hasHierarchy) icon = 'postgres';
  else if (hasS3) icon = 'database';
  else if (hasCode) icon = 'terminal';
  else if (hasAgents) icon = 'ai_agent';
  else if (hasCustom) icon = 'custom_code';
  else if (hasSaas) icon = 'saas_cloud';
  else if (isQuestion) icon = 'comment_debate';
  else if (hasCost) icon = 'cache_bolt';

  return {
    norm,
    figures,
    hasRmRf,
    hasPgDump,
    hasPostgres,
    hasS3,
    hasGitlab,
    hasBackup,
    hasTerminal,
    hasOutage,
    hasCode,
    hasCost,
    hasLatency,
    hasComparison,
    hasPipeline,
    hasHierarchy,
    isQuestion,
    hasAgents,
    hasSaas,
    hasCustom,
    icon
  };
}

function safeEditorialCopy(candidates, transcriptText, usedSet, fallback) {
  for (const raw of candidates) {
    const clean = String(raw || '').replace(/\s+/g, ' ').trim().toUpperCase();
    if (!clean) continue;
    if (usedSet.has(clean)) continue;
    if (hasBannedSlop(clean, { checkStandalone: true })) continue;
    if (endsWithForbiddenWord(clean)) continue;
    if (findTranscriptNgramOverlap(clean, transcriptText, 4)) continue;
    const check = validateHeadline(clean, transcriptText, { allowEmpty: false, minWords: 2, maxWords: 5 });
    if (check.ok) {
      usedSet.add(clean);
      return clean;
    }
  }
  if (fallback && !usedSet.has(fallback)) {
    usedSet.add(fallback);
    return fallback;
  }
  return fallback || 'SISTEMA EN RIESGO';
}

function segmentTranscriptIntoBeats(words, duration) {
  const safeDur = roundTime(Number(duration), 3);
  if (!Array.isArray(words) || !words.length) {
    return [{ start: 0, end: safeDur, text: 'RESUMEN TÉCNICO', words: [] }];
  }

  // First split at natural pauses/sentences/clauses, keeping each chunk <= 3.25s.
  const rawBeats = [];
  let cur = [];

  const flush = () => {
    if (!cur.length) return;
    rawBeats.push({
      start: cur[0].start,
      end: cur[cur.length - 1].end,
      text: cur.map((w) => w.word).join(' ').replace(/\s+([.,;:!?])/g, '$1').trim(),
      words: cur.slice()
    });
    cur = [];
  };

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (cur.length) {
      const prevWord = String(cur[cur.length - 1].word || '');
      const gap = w.start - cur[cur.length - 1].end;
      const span = w.end - cur[0].start;
      const isHookCutoff = rawBeats.length === 0 && span >= 1.25 && (gap > 0.08 || /[,.;:!?]$/.test(prevWord) || cur.length >= 6);
      const sentenceEnd = /[.!?]$/.test(prevWord) && cur.length >= 2;
      const clausePause = /[,;:]$/.test(prevWord) && span >= 1.9 && cur.length >= 4;
      const tooLong = span >= 3.15 && cur.length >= 4;
      const hardGap = gap >= 0.38 && cur.length >= 3;
      if (isHookCutoff || sentenceEnd || clausePause || tooLong || hardGap) {
        flush();
      }
    }
    cur.push(w);
  }
  flush();

  // Merge tiny beats (< 1.15s) with neighbor so every scene is readable.
  const merged = [];
  for (let i = 0; i < rawBeats.length; i++) {
    const beat = rawBeats[i];
    const len = beat.end - beat.start;
    if (merged.length > 0 && len < 1.15 && (beat.end - merged[merged.length - 1].start) <= 3.45) {
      const prev = merged[merged.length - 1];
      prev.end = beat.end;
      prev.words.push(...beat.words);
      prev.text = `${prev.text} ${beat.text}`.trim();
    } else {
      merged.push({ ...beat, words: beat.words.slice() });
    }
  }

  // Ensure beat count <= MOTION_LIMITS.maxBrolls (24) by merging smallest adjacent pairs.
  while (merged.length > MOTION_LIMITS.maxBrolls) {
    let bestIdx = 1;
    let bestSpan = Infinity;
    for (let i = 1; i < merged.length - 1; i++) {
      const span = merged[i + 1].end - merged[i].start;
      if (span < bestSpan) {
        bestSpan = span;
        bestIdx = i;
      }
    }
    const a = merged[bestIdx];
    const b = merged[bestIdx + 1];
    merged.splice(bestIdx, 2, {
      start: a.start,
      end: b.end,
      text: `${a.text} ${b.text}`.trim(),
      words: [...a.words, ...b.words]
    });
  }

  // Split any remaining beat > 3.4s if we still have budget <= 24.
  let splitGuard = 0;
  while (splitGuard++ < 12 && merged.length < MOTION_LIMITS.maxBrolls) {
    const longIdx = merged.findIndex((b) => (b.end - b.start) > 3.40 && b.words.length >= 4);
    if (longIdx < 0) break;
    const target = merged[longIdx];
    const midTime = (target.start + target.end) / 2;
    let splitWordIdx = Math.floor(target.words.length / 2);
    let bestDist = Infinity;
    for (let k = 2; k < target.words.length - 1; k++) {
      const dist = Math.abs(target.words[k].start - midTime);
      if (dist < bestDist) {
        bestDist = dist;
        splitWordIdx = k;
      }
    }
    const leftWords = target.words.slice(0, splitWordIdx);
    const rightWords = target.words.slice(splitWordIdx);
    if (leftWords.length >= 2 && rightWords.length >= 2) {
      merged.splice(longIdx, 1,
        {
          start: leftWords[0].start,
          end: leftWords[leftWords.length - 1].end,
          text: leftWords.map((w) => w.word).join(' ').trim(),
          words: leftWords
        },
        {
          start: rightWords[0].start,
          end: rightWords[rightWords.length - 1].end,
          text: rightWords.map((w) => w.word).join(' ').trim(),
          words: rightWords
        }
      );
    } else {
      break;
    }
  }

  // Make beats contiguous [0 .. safeDur] for 100% visual coverage.
  const timeline = merged.map((b) => ({ ...b }));
  timeline[0].start = 0;
  for (let i = 0; i < timeline.length - 1; i++) {
    const mid = roundTime((timeline[i].end + timeline[i + 1].start) / 2, 3);
    const boundary = clamp(mid, timeline[i].start + 0.85, timeline[i + 1].end - 0.85);
    timeline[i].end = roundTime(boundary, 3);
    timeline[i + 1].start = roundTime(boundary, 3);
  }
  timeline[timeline.length - 1].end = safeDur;

  // Enforce hook beat <= 2.4s so hook is squarely inside 0-1.5s opening window.
  if (timeline.length >= 2 && timeline[0].end > 2.4) {
    const newEnd = timeline[1].end - 1.5 <= 3.35 ? 1.5 : 2.1;
    timeline[0].end = newEnd;
    timeline[1].start = newEnd;
  }

  // Split any beat > 3.35s AFTER contiguous clamping while respecting maxBrolls (24).
  let postSplitGuard = 0;
  while (postSplitGuard++ < 16 && timeline.length < MOTION_LIMITS.maxBrolls) {
    const longIdx = timeline.findIndex((b) => (b.end - b.start) > 3.35);
    if (longIdx < 0) break;
    const target = timeline[longIdx];
    const targetMid = roundTime((target.start + target.end) / 2, 3);
    let splitTime = targetMid;
    let leftWords = [];
    let rightWords = [];
    if (target.words && target.words.length >= 4) {
      let splitWordIdx = Math.floor(target.words.length / 2);
      let bestDist = Infinity;
      for (let k = 2; k < target.words.length - 1; k++) {
        const wt = target.words[k].start;
        if (wt - target.start < 0.9 || target.end - wt < 0.9) continue;
        const dist = Math.abs(wt - targetMid);
        if (dist < bestDist) {
          bestDist = dist;
          splitWordIdx = k;
        }
      }
      leftWords = target.words.slice(0, splitWordIdx);
      rightWords = target.words.slice(splitWordIdx);
      const candidateTime = roundTime((leftWords[leftWords.length - 1].end + rightWords[0].start) / 2, 3);
      if (candidateTime - target.start >= 0.9 && target.end - candidateTime >= 0.9) {
        splitTime = candidateTime;
      }
    } else {
      leftWords = (target.words || []).filter((w) => (w.start + w.end) / 2 <= targetMid);
      rightWords = (target.words || []).filter((w) => (w.start + w.end) / 2 > targetMid);
    }
    const leftText = leftWords.length ? leftWords.map((w) => w.word).join(' ').trim() : target.text;
    const rightText = rightWords.length ? rightWords.map((w) => w.word).join(' ').trim() : target.text;
    timeline.splice(longIdx, 1,
      { start: target.start, end: splitTime, text: leftText, words: leftWords },
      { start: splitTime, end: target.end, text: rightText, words: rightWords }
    );
  }

  return timeline;
}

function buildHookScene(beat, allSignals, style, transcriptText, usedHeadlines) {
  const accent = style.accent.hex;
  const formula = style.hookFormula;
  const firstFig = allSignals.figures[0] || (beat.signals && beat.signals.figures && beat.signals.figures[0]) || null;
  const isIncident = allSignals.hasGitlab || allSignals.hasRmRf || allSignals.hasBackup || allSignals.hasOutage;
  const rwHook = rewriteHeadline({ text: beat.text, role: 'hook', usedHeadlines, transcriptText });
  const baseHeadline = rwHook.text || safeEditorialCopy(
    isIncident
      ? ['BORRADO EN PRODUCCIÓN', 'RESPALDOS SIN PRUEBAS', 'UN ERROR CRÍTICO']
      : ['CERO PASOS MANUALES', 'FLUJO SIN ESPERAS', 'EL COSTE INVISIBLE'],
    transcriptText, usedHeadlines, isIncident ? 'BORRADO EN PRODUCCIÓN' : 'CERO PASOS MANUALES'
  );

  if (formula === 'error_absurdo' && (allSignals.hasRmRf || allSignals.hasCode)) {
    const title = safeEditorialCopy(
      isIncident
        ? ['COMANDO EN SERVIDOR EQUIVOCADO', 'UN RM -RF FATAL', 'TERMINAL SIN RETORNO']
        : ['PROCESO MANUAL ROTO', 'CUELLO DE BOTELLA', 'ERROR EN FLUJO'],
      transcriptText, usedHeadlines, isIncident ? 'UN RM -RF FATAL' : 'ERROR EN FLUJO'
    );
    return {
      component: 'code_terminal',
      props: {
        filename: allSignals.hasGitlab ? 'prod-db-01.internal' : 'workflow-runner.ts',
        title,
        codeLines: isIncident
          ? [
              '# ssh root@prod-db-01',
              { text: 'rm -rf ./postgresql/data', highlight: true },
              '# datos eliminados en vivo'
            ]
          : [
              '// proceso manual bloqueado',
              { text: 'await emitInvoice(payment);', highlight: true },
              '// ejecucion automatica'
            ],
        cursorLine: 2,
      },
      overlayText: safeEditorialCopy(
        isIncident ? ['ERROR IRREVERSIBLE', 'PRODUCCIÓN BORRADA'] : ['SIN PASOS MANUALES', 'EJECUCIÓN DIRECTA'],
        transcriptText, usedHeadlines, isIncident ? 'ERROR IRREVERSIBLE' : 'SIN PASOS MANUALES'
      ),
      sfxCategory: 'code'
    };
  }

  if (formula === 'antes_despues') {
    const title = safeEditorialCopy(
      isIncident
        ? ['RÉPLICA VS PRODUCCIÓN', 'COPIA VS SERVIDOR REAL']
        : ['MANUAL VS AUTOMÁTICO', 'ESPERA VS FLUJO'],
      transcriptText, usedHeadlines, isIncident ? 'RÉPLICA VS PRODUCCIÓN' : 'MANUAL VS AUTOMÁTICO'
    );
    if (isIncident && (allSignals.hasCode || allSignals.hasTerminal)) {
      return {
        component: 'terminal_split',
        props: {
          title,
          subtitle: 'DOS TERMINALES ACTIVAS',
          leftTitle: 'ENTORNO RÉPLICA',
          rightTitle: 'PRODUCCIÓN ACTIVA',
          leftCode: 'rm -rf /tmp/replica_old',
          rightCode: 'rm -rf /var/db/prod_data',
          leftStatus: 'ENTORNO AISLADO',
          rightStatus: 'FOCO ACTIVO · PROD',
          leftFooter: '✖ TERMINAL INACTIVA · SIN RIESGO REAL',
          rightFooter: '⚠ BORRADO EN PRODUCCIÓN ACTIVA',
          diffNote: 'CURSOR EQUIVOCADO EN PRODUCCIÓN',
          leftColor: '#f59e0b',
          rightColor: '#ef4444'
        },
        overlayText: null,
        sfxCategory: 'hook'
      };
    }
    return {
      component: 'editorial_explainer',
      props: {
        variant: 'comparison',
        ground: style.ground === 'ivory' ? 'ivory' : 'graphite',
        accent,
        headline: title,
        leftLabel: isIncident ? 'ENTORNO COPIA' : 'TAREA MANUAL',
        rightLabel: isIncident ? 'DATOS REALES' : 'FLUJO AUTO',
        leftIcon: 'server_rack',
        rightIcon: isIncident ? 'malware_bug' : 'cache_bolt',
      },
      overlayText: null,
      sfxCategory: 'hook'
    };
  }

  if (formula === 'contradiccion') {
    const headline = safeEditorialCopy(
      isIncident
        ? ['PANEL VERDE ENGAÑOSO', 'RESPALDO SIN RESTORE']
        : ['PAUSA INVISIBLE COSTOSA', 'CERO FRICCIÓN OPERATIVA'],
      transcriptText, usedHeadlines, isIncident ? 'RESPALDO SIN RESTORE' : 'CERO FRICCIÓN OPERATIVA'
    );
    return {
      component: 'editorial_explainer',
      props: {
        variant: 'comparison',
        ground: style.ground === 'ivory' ? 'ivory' : 'graphite',
        accent,
        headline,
        leftLabel: isIncident ? 'PANEL EN VERDE' : 'PAUSA DIARIA',
        rightLabel: isIncident ? 'BACKUP VACÍO' : 'FLUJO CONTINUO',
        leftIcon: isIncident ? 'zero_trust_lock' : 'malware_bug',
        rightIcon: isIncident ? 'cloud_slash' : 'cache_bolt',
      },
      overlayText: null,
      sfxCategory: 'alert'
    };
  }

  if (formula === 'pregunta') {
    const qLine = /\?/.test(baseHeadline)
      ? baseHeadline
      : safeEditorialCopy(
          isIncident
            ? ['¿TUS BACKUPS RESPONDEN?', '¿PROBASTE EL RESTORE?']
            : ['¿CUÁNTO CUESTA ESPERAR?', '¿SIGUES COPIANDO DATOS?'],
          transcriptText, usedHeadlines, isIncident ? '¿TUS BACKUPS RESPONDEN?' : '¿CUÁNTO CUESTA ESPERAR?'
        );
    return {
      component: 'kinetic_hook',
      props: {
        header: isIncident ? 'ALERTA EN PRODUCCIÓN' : 'ANÁLISIS DE FLUJO',
        lines: [
          { text: qLine, color: '#ffffff' },
          { text: firstFig ? `${firstFig.display} EN JUEGO` : 'REVISA TU FLUJO', color: accent }
        ],
        subtitle: isIncident ? 'AUDITORÍA DE RESILIENCIA' : 'ARQUITECTURA DE FLUJO',
        boxBadge: isIncident ? 'DATO CRÍTICO EN PRODUCCIÓN' : 'FLUJO OPERATIVO',
        detail: isIncident
          ? 'Un comando sin verificación y un backup pasivo multiplican el impacto.'
          : 'Cada pausa manual acumula latencia invisible en el flujo.',
        footerText: firstFig ? `${firstFig.display} EN JUEGO` : (isIncident ? 'RESPALDO NO PROBADO' : 'FLUJO SIN AUTOMATIZAR'),
        statusText: 'DATO MEDIDO',
        accent,
        icon: beat.signals.icon || 'lightning',
      },
      overlayText: null,
      sfxCategory: 'hook'
    };
  }

  if (formula === 'cuenta_atras' && isIncident) {
    const title = safeEditorialCopy(
      ['MEDIO SEGUNDO TARDE', 'CERO BACKUPS ACTIVOS', 'CAÍDA EN CASCADA'],
      transcriptText, usedHeadlines, 'MEDIO SEGUNDO TARDE'
    );
    return {
      component: 'disaster_monitor',
      props: {
        title,
        subtitle: 'IMPACTO INMEDIATO EN PRODUCCIÓN',
        crashTime: 0.35,
        crashedStatus: 'DATOS ELIMINADOS · SIN RESPALDO',
        healthyStatus: 'COMANDO EJECUTADO',
        latencyNormal: 12,
        latencyCrash: 18000,
        accent,
      },
      overlayText: null,
      sfxCategory: 'alert'
    };
  }

  // 'cifra' (or cuenta_atras fallback on non-incident transcripts)
  if (firstFig) {
    return {
      component: 'hook_impact',
      props: {
        subtitle: isIncident ? 'IMPACTO CRÍTICO' : 'MÉTRICA MEDIDA',
        lines: [
          { text: `${firstFig.display}`, color: '#ffffff' },
          { text: baseHeadline, highlight: accent, textColor: '#050505' }
        ],
        icon: beat.signals.icon || 'lightning',
        accent,
        metric: {
          from: 0,
          value: Number.isFinite(firstFig.value) ? firstFig.value : 1,
          suffix: ` ${firstFig.unit}`,
          label: isIncident ? 'DATOS DE PRODUCCIÓN AFECTADOS' : 'IMPACTO DIRECTO MEDIDO'
        },
        note: isIncident ? 'Una terminal equivocada dispara el incidente.' : 'Cada paso medido elimina esperas.',
        tags: isIncident ? ['PRODUCCIÓN', 'SIN RESTORE', 'ALERTA P0'] : ['AUTOMÁTICO', 'SIN ESPERAS', 'MEDIDO'],
      },
      overlayText: null,
      sfxCategory: 'hook'
    };
  }

  return {
    component: 'kinetic_hook',
    props: {
      header: isIncident ? 'IMPACTO OPERATIVO' : 'ARQUITECTURA EDITORIAL',
      lines: [
        { text: baseHeadline, color: '#ffffff' },
        { text: isIncident ? 'CONTROL EN PRODUCCIÓN' : 'SIN FRICCIÓN', color: accent }
      ],
      subtitle: isIncident ? 'VERIFICACIÓN REAL DE RESPALDOS' : 'ARQUITECTURA EDITORIAL',
      boxBadge: 'DIAGNÓSTICO DEL SISTEMA',
      detail: isIncident
        ? 'Validar el restore en servidor limpio evita pérdidas irreversibles.'
        : 'Medir latencias reales elimina cuellos de botella ocultos.',
      footerText: isIncident ? 'RESTORE VERIFICADO' : 'EJECUCIÓN DIRECTA',
      statusText: 'TELEMETRÍA',
      accent,
      icon: beat.signals.icon || 'lightning',
    },
    overlayText: null,
    sfxCategory: 'hook'
  };
}

function buildContextualScene(beat, idx, total, style, transcriptText, usedHeadlines, state, allSignals = null) {
  const sig = beat.signals;
  const accent = style.accent.hex;
  const isIvoryTurn = style.ground === 'ivory' && idx % 2 === 0;
  const ground = isIvoryTurn ? 'ivory' : 'graphite';
  const explainerAccent = ground === 'ivory' ? '#b85f42' : accent;
  const globalSig = allSignals || sig;
  const isIncident = globalSig.hasGitlab || globalSig.hasRmRf || globalSig.hasBackup || globalSig.hasOutage || globalSig.hasPgDump || globalSig.hasS3;
  const variantBias = style.componentVariant || 'editorial_focus';

  // Closing CTA beat
  if (idx === total - 1) {
    const rw = rewriteHeadline({ text: beat.text, role: 'cta', usedHeadlines, transcriptText });
    const ctaHeadline = rw.text || safeEditorialCopy(
      isIncident
        ? ['PRUEBA TU RESTORE HOY', '¿CUÁNDO PROBASTE RESTORE?', '¿TÚ QUÉ OPINAS?']
        : ['MIDE CADA PASO HOY', 'ELIMINA LO QUE SOBRA', '¿TÚ QUÉ OPINAS?'],
      transcriptText, usedHeadlines, isIncident ? 'PRUEBA TU RESTORE HOY' : 'ELIMINA LO QUE SOBRA'
    );
    return {
      component: 'editorial_explainer',
      props: {
        variant: 'transform',
        ground,
        accent: explainerAccent,
        headline: ctaHeadline,
        leftLabel: isIncident ? 'SOLO PANEL' : 'PASO MANUAL',
        rightLabel: isIncident ? 'RESTORE PROBADO' : 'FLUJO DIRECTO',
        leftIcon: isIncident ? 'cloud_slash' : 'server_rack',
        rightIcon: isIncident ? 'zero_trust_lock' : 'cache_bolt',
      },
      ctaOverlay: false,
      sfxCategory: 'cta'
    };
  }

  // Hard figure dedicated scene
  if (sig.figures.length > 0 && !state.usedComponents.has(`fig:${idx}`)) {
    const fig = sig.figures[0];
    if (sig.hasLatency || /segundo|tard|cronomet/i.test(sig.norm)) {
      const title = safeEditorialCopy(
        isIncident ? ['MEDIO SEGUNDO DE REACCIÓN', 'TIEMPO REAL DE RESTORE'] : ['RESPUESTA EN SEGUNDOS', 'ESCALA DE TIEMPO'],
        transcriptText, usedHeadlines, isIncident ? 'TIEMPO REAL DE RESTORE' : 'RESPUESTA EN SEGUNDOS'
      );
      return {
        component: 'latency_scale',
        props: {
          title,
          subtitle: isIncident ? 'LATENCIA HUMANA VS EJECUCIÓN' : 'FLUJO AUTOMÁTICO VS ESPERA',
          tiers: isIncident
            ? [
                { name: 'EJECUCIÓN RM -RF', latency: '0.02 s', ratio: 0.08, color: '#ef4444', human: 'Borrado instantáneo en disco' },
                { name: 'REACCIÓN HUMANA', latency: '0.50 s', ratio: 0.35, color: '#f59e0b', human: 'Medio segundo tarde tras Enter' },
                { name: 'RESTORE VERIFICADO', latency: '18.0 h', ratio: 0.95, color: accent, human: 'Recuperación completa bajo presión' }
              ]
            : [
                { name: 'VALIDACIÓN AUTOMÁTICA', latency: '0.12 s', ratio: 0.12, color: accent, human: 'Pago verificado sin esperas' },
                { name: 'EMISIÓN DE FACTURA', latency: '0.45 s', ratio: 0.28, color: '#38bdf8', human: 'Documento generado al instante' },
                { name: 'PAUSA MANUAL DIARIA', latency: '3,600 s', ratio: 0.95, color: '#ef4444', human: 'Una hora perdida cada día' }
              ],
          conclusion: isIncident
            ? 'Automatizar pruebas de restore reduce el tiempo de recuperación.'
            : 'Automatizar el flujo elimina pausas invisibles cada día.',
          conclusionSub: isIncident
            ? '✔ UN BORRADO TARDA MILISEGUNDOS · EL RESTORE NECESITA PRUEBAS'
            : '✔ AUTOMATIZACIÓN EN EVENTOS SIN BLOQUEOS',
          accent,
        },
        sfxCategory: 'data'
      };
    }

    if (sig.hasCost || /caid|perdi|horas/i.test(sig.norm)) {
      const title = safeEditorialCopy(
        isIncident ? ['IMPACTO DE LA CAÍDA', 'COSTE DEL INCIDENTE'] : ['COSTE DE LA PAUSA', 'HORAS PERDIDAS'],
        transcriptText, usedHeadlines, isIncident ? 'COSTE DEL INCIDENTE' : 'HORAS PERDIDAS'
      );
      const isMonetary = /\$|€|usd|dolar|euro|precio/i.test(fig.raw || sig.norm);
      const useTicker = isMonetary && (variantBias === 'telemetry_cards' || idx % 2 === 0) && state.lastComponent !== 'cost_ticker';
      return {
        component: useTicker ? 'cost_ticker' : 'metrics_comparison',
        props: useTicker
          ? {
              title,
              subtitle: isIncident ? 'IMPACTO OPERATIVO EN PRODUCCIÓN' : 'COSTE OPERATIVO DIARIO',
              cloudCost: Math.max(6, Math.round(fig.value * 100)),
              initialCost: 0,
              bareMetalCost: '0h pérdida',
              takeaway: isIncident ? 'EL RESTORE PROBADO EVITA HORAS CAÍDOS' : 'EL FLUJO AUTOMÁTICO RECUPERA CADA HORA',
              accent,
            }
          : {
              title,
              delta: `${fig.display} DE IMPACTO`,
              metricA: { name: isIncident ? 'SERVICIO CAÍDO' : 'PAUSA MANUAL', value: fig.display, subtext: 'COSTE ACUMULADO', color: '#ef4444', percent: 90 },
              metricB: { name: 'FLUJO AUTOMÁTICO', value: '0 MIN', subtext: 'EJECUCIÓN INMEDIATA', color: accent, percent: 18 }
            },
        sfxCategory: 'alert'
      };
    }

    const rw = rewriteHeadline({ text: beat.text, role: 'broll', usedHeadlines, transcriptText });
    const headline = rw.text || safeEditorialCopy(
      isIncident ? ['CINCO RESPALDOS CAÍDOS', 'DATOS SIN PROTECCIÓN'] : ['FACTURACIÓN SIN ESPERAS', 'DATO EN PRODUCCIÓN'],
      transcriptText, usedHeadlines, isIncident ? 'DATOS SIN PROTECCIÓN' : 'FACTURACIÓN SIN ESPERAS'
    );
    return {
      component: 'editorial_explainer',
      props: {
        variant: 'detail',
        ground,
        accent: explainerAccent,
        headline,
        figure: fig.display,
        label: 'DATO MEDIDO',
        icon: sig.icon,
      },
      sfxCategory: 'data'
    };
  }

  // Code / Terminal beats (incident or technical flow)
  if ((sig.hasRmRf || sig.hasPgDump || sig.hasTerminal) && variantBias !== 'editorial_focus') {
    if (sig.hasComparison && state.lastComponent !== 'terminal_split') {
      const title = safeEditorialCopy(
        ['CURSOR EN SERVIDOR EQUIVOCADO', 'RÉPLICA VS PRODUCCIÓN', 'DOS TERMINALES ACTIVAS'],
        transcriptText, usedHeadlines, 'DOS TERMINALES ACTIVAS'
      );
      return {
        component: 'terminal_split',
        props: {
          title,
          subtitle: 'AISLAMIENTO DE ENTORNOS',
          leftTitle: 'RÉPLICA SEGURA',
          rightTitle: 'PRODUCCIÓN CRÍTICA',
          leftCode: 'pg_basebackup --host=replica',
          rightCode: 'rm -rf /var/lib/postgresql/*',
          leftStatus: 'RÉPLICA AISLADA',
          rightStatus: 'FOCO ACTIVO · PROD',
          leftFooter: '✔ BACKUP AISLADO · SIN IMPACTO EN PROD',
          rightFooter: '⚠ BORRADO DIRECTO EN PRODUCCIÓN',
          diffNote: 'CURSOR EQUIVOCADO EN PRODUCCIÓN',
          leftColor: '#38bdf8',
          rightColor: '#ef4444'
        },
        sfxCategory: 'code'
      };
    }
    const title = safeEditorialCopy(
      ['PG_DUMP FALLANDO EN SILENCIO', 'COMANDO SIN CONFIRMACIÓN', 'ERROR EN TERMINAL'],
      transcriptText, usedHeadlines, 'ERROR EN TERMINAL'
    );
    return {
      component: 'code_terminal',
      props: {
        filename: sig.hasPgDump ? 'cron_pg_dump.log' : 'prod-db-01.sh',
        title,
        codeLines: sig.hasPgDump
          ? [
              'pg_dump: version mismatch (9.6 vs 9.2)',
              { text: 'ERROR: silent backup failure', highlight: true },
              'exit code 1 // 0 bytes written'
            ]
          : [
              'ssh root@prod-db-01',
              { text: 'rm -rf /var/opt/gitlab/data', highlight: true },
              '^C // too late'
            ],
        cursorLine: 2
      },
      sfxCategory: 'code'
    };
  }

  // Comparison / Tradeoff Matrix
  if (sig.hasComparison && state.lastComponent !== 'tradeoff_matrix') {
    const title = safeEditorialCopy(
      isIncident
        ? ['PANEL VERDE VS RESTORE', 'ILUSIÓN VS REALIDAD', 'RESPALDO REAL EN SERVIDOR']
        : ['FLUJO CONTINUO VS ATASCO', 'AUTOMÁTICO VS MANUAL'],
      transcriptText, usedHeadlines, isIncident ? 'PANEL VERDE VS RESTORE' : 'AUTOMÁTICO VS MANUAL'
    );
    return {
      component: 'tradeoff_matrix',
      props: {
        title,
        subtitle: isIncident ? 'VERIFICACIÓN DE BACKUPS' : 'COMPARATIVA DE FLUJO',
        colA: isIncident ? 'RESTORE REAL' : 'FLUJO AUTO',
        colB: isIncident ? 'SOLO PANEL VERDE' : 'TAREA MANUAL',
        rows: isIncident
          ? [
              { dim: 'Integridad SQL', a: 'Probada en frío', b: 'Sin verificar', aGood: true },
              { dim: 'Tiempo de despliegue', a: 'Cronometrado', b: 'Desconocido', aGood: true },
              { dim: 'Snapshots nube', a: 'Activos por nodo', b: 'Deshabilitados', aGood: true }
            ]
          : [
              { dim: 'Validación de pago', a: 'Inmediata', b: 'Revisión manual', aGood: true },
              { dim: 'Emisión de factura', a: 'Sin esperas', b: 'Pausa diaria', aGood: true }
            ],
        conclusionBadge: isIncident ? 'CRITERIO OPERATIVO // BACKUPS' : 'CRITERIO DE INGENIERÍA',
        conclusion: isIncident
          ? 'Solo existe el respaldo que despliegas y restauras con éxito en frío.'
          : 'Un flujo automatizado elimina pausas manuales y errores evitables.',
        takeaway: isIncident ? '✔ SOLO SIRVE EL BACKUP QUE RESTAURAS' : '✔ FLUJO SIN ATASCOS',
        accent,
      },
      sfxCategory: 'data'
    };
  }

  // Pipeline / S3 / Flow
  if ((sig.hasPipeline || sig.hasS3) && state.lastComponent !== 'network_pipeline') {
    const title = safeEditorialCopy(
      isIncident
        ? ['CADENA DE RESPALDO ROTA', 'FLUJO DE RESTAURACIÓN', 'RESPALDOS SIN ACTIVAR']
        : ['FLUJO DE COBRO CONTINUO', 'PROCESO SIN ATASCOS'],
      transcriptText, usedHeadlines, isIncident ? 'CADENA DE RESPALDO ROTA' : 'PROCESO SIN ATASCOS'
    );
    return {
      component: 'network_pipeline',
      props: {
        title,
        subtitle: isIncident ? 'AUDITORÍA DE INFRAESTRUCTURA' : 'PIPELINE AUTOMATIZADO',
        stages: isIncident
          ? [
              { name: 'PG_DUMP AUTOMÁTICO', tag: 'Fallo silencioso por versión', metric: 'ERR', color: '#ef4444' },
              { name: 'BUCKET S3 REMOTO', tag: '0 objetos sincronizados', metric: 'VACÍO', color: '#f59e0b' },
              { name: 'SNAPSHOTS EN NUBE', tag: 'No habilitados en nodos DB', metric: 'OFF', color: accent }
            ]
          : [
              { name: 'RECEPCIÓN DE PAGO', tag: 'Evento validado al instante', metric: '0.2 s', color: accent },
              { name: 'VERIFICACIÓN DE DATOS', tag: 'Esquema comprobado en RAM', metric: '0.4 s', color: '#38bdf8' },
              { name: 'EMISIÓN DE FACTURA', tag: 'Entrega automática sin pausas', metric: 'OK', color: '#10b981' }
            ],
        takeaway: isIncident ? '✖ 5 CAPAS FALLANDO AL MISMO TIEMPO' : '✔ FLUJO CONTINUO SIN INTERVENCIÓN',
        conclusion: isIncident
          ? 'Ninguna capa de respaldo tenía copias válidas disponibles.'
          : 'Cada etapa procesa y valida el flujo automáticamente.',
        accent
      },
      sfxCategory: isIncident ? 'alert' : 'transition'
    };
  }

  // Hierarchy / DB structure
  if (sig.hasHierarchy && state.lastComponent !== 'tree_hierarchy') {
    const title = safeEditorialCopy(
      ['ARQUITECTURA DE RESPALDOS', 'BASE PRINCIPAL EN RIESGO', 'NODOS SIN RÉPLICA'],
      transcriptText, usedHeadlines, 'BASE PRINCIPAL EN RIESGO'
    );
    return {
      component: 'tree_hierarchy',
      props: {
        title,
        complexity: 'TOPOLOGÍA DE PRODUCCIÓN',
        nodes: [
          { id: 'root', label: 'BASE PRINCIPAL PRODUCCIÓN', sub: 'Nodo crítico', x: 480, y: 235, w: 660, color: accent },
          { id: 'b1', label: 'PG_DUMP CRON', sub: 'Fallo de versión', x: 245, y: 455, w: 380, parent: 'root', color: '#ef4444', activePath: false },
          { id: 'b2', label: 'BUCKET S3 / SNAPSHOT', sub: 'Sin datos activos', x: 715, y: 455, w: 380, parent: 'root', color: '#f59e0b', activePath: true },
          { id: 'l1', label: 'RESTORE VERIFICADO', sub: 'Única garantía real', x: 715, y: 675, w: 380, parent: 'b2', color: '#10b981', activePath: true }
        ],
        conclusionBadge: 'TOPOLOGÍA DE PRODUCCIÓN',
        conclusion: 'El comando se ejecutó en el nodo principal en lugar de la réplica.',
        takeaway: '✔ VERIFICA CADA NODO CON RESTORE EN FRÍO',
        accent
      },
      sfxCategory: 'transition'
    };
  }

  // Outage / Incident monitor
  if (sig.hasOutage && state.lastComponent !== 'disaster_monitor') {
    const title = safeEditorialCopy(
      ['PRODUCCIÓN SIN DATOS', 'INCIDENTE EN SERVIDOR', 'CAÍDA SIN RESPALDO'],
      transcriptText, usedHeadlines, 'INCIDENTE EN SERVIDOR'
    );
    return {
      component: 'disaster_monitor',
      props: {
        title,
        subtitle: 'TELEMETRÍA DE INCIDENTE',
        crashTime: 0.4,
        crashedStatus: 'PÉRDIDA CRÍTICA · RESTORE REQUERIDO',
        healthyStatus: 'CLUSTER MONITORIZADO',
        latencyNormal: 18,
        latencyCrash: 14200,
        accent
      },
      sfxCategory: 'alert'
    };
  }

  // Default: rich editorial_explainer
  const rw = rewriteHeadline({ text: beat.text, role: 'broll', usedHeadlines, transcriptText });
  const headline = rw.text || safeEditorialCopy(
    isIncident
      ? ['VERIFICA TUS RESPALDOS', 'PRUEBA EL RESTORE', 'CONTROL DE PRODUCCIÓN']
      : ['FLUJO SIN ESPERAS', 'MEDIR Y SIMPLIFICAR', 'CERO FRICCIÓN OPERATIVA'],
    transcriptText, usedHeadlines, isIncident ? 'VERIFICA TUS RESPALDOS' : 'MEDIR Y SIMPLIFICAR'
  );
  return {
    component: 'editorial_explainer',
    props: {
      variant: sig.hasComparison ? 'comparison' : sig.hasPipeline ? 'flow' : 'detail',
      ground,
      accent: explainerAccent,
      headline,
      icon: sig.icon,
      leftLabel: isIncident ? 'SIN PRUEBAS' : 'TAREA MANUAL',
      rightLabel: isIncident ? 'CON RESTORE' : 'FLUJO AUTO',
      leftIcon: isIncident ? 'malware_bug' : 'server_rack',
      rightIcon: isIncident ? 'zero_trust_lock' : 'cache_bolt',
    },
    sfxCategory: 'transition'
  };
}

function buildStockQuery(beat) {
  const norm = beat.signals.norm;
  if (/developer|desarrollador|terminal|codigo|enter|teclado/.test(norm)) {
    return 'software developer typing terminal dark office';
  }
  if (/gitlab|2017|ingeniero|oficina/.test(norm)) {
    return 'engineer working server room dark moody';
  }
  if (/nube|s3|snapshot|servidor|maquina/.test(norm)) {
    return 'data center server rack dark lights';
  }
  return 'programmer laptop screen dark studio';
}

function planMotionWithLocal(transcript, source, options = {}) {
  const duration = Number(source && source.duration);
  if (!Number.isFinite(duration) || duration <= 0) {
    throw new Error('planMotionWithLocal requiere source.duration.');
  }
  if (!transcript || !Array.isArray(transcript.words) || !transcript.words.length) {
    throw new Error('planMotionWithLocal requiere palabras con timestamps.');
  }

  const style = directStyle({
    seed: options.seed,
    audioHash: options.audioHash || (source && source.hash),
    videoPath: source && source.video,
    historyPath: options.styleHistoryPath,
    record: options.recordStyleHistory === true,
    ignoreHistory: options.ignoreStyleHistory === true
  });

  const beats = segmentTranscriptIntoBeats(transcript.words, duration).map((beat) => ({
    ...beat,
    signals: extractBeatSignals(beat.text)
  }));

  const allSignals = extractBeatSignals(transcript.text || beats.map((b) => b.text).join(' '));
  const usedHeadlines = new Set();
  const usedOverlayTexts = new Set();
  const maxStockSeconds = duration * 0.28; // Strictly <= ~30%
  let stockSecondsUsed = 0;

  // Pick up to 2-3 candidate beats for moody Pixabay stock_video (never hook, never CTA, never hard-figure beats)
  const stockCandidates = [];
  for (let i = 1; i < beats.length - 1; i++) {
    const b = beats[i];
    const len = b.end - b.start;
    if (b.signals.figures.length > 0) continue;
    if (b.signals.hasRmRf || b.signals.hasPgDump) continue;
    if (len < 1.2 || len > 3.5) continue;
    stockCandidates.push(i);
  }
  const stockIndices = new Set();
  const stockSpacing = Math.max(2, Math.floor(beats.length / 4));
  let lastStockIdx = -99;
  for (const idx of stockCandidates) {
    if (idx - lastStockIdx < stockSpacing) continue;
    const len = beats[idx].end - beats[idx].start;
    if (stockSecondsUsed + len <= maxStockSeconds && stockIndices.size < 4) {
      stockIndices.add(idx);
      stockSecondsUsed += len;
      lastStockIdx = idx;
    }
  }

  const brolls = [];
  const overlays = [];
  const transitionCycle = [style.transition, 'cut', 'whip', 'flash'];
  const cutCycles = ['j-cut', 'l-cut', 'jl-cut', 'hard'];
  const plannerState = { lastComponent: null, usedComponents: new Set() };

  for (let i = 0; i < beats.length; i++) {
    const beat = beats[i];
    const start = roundTime(beat.start, 3);
    const end = roundTime(beat.end, 3);
    const len = roundTime(end - start, 3);
    const transition = i === 0 ? 'cut' : transitionCycle[i % transitionCycle.length];
    const cutStyle = i === 0 ? 'hard' : cutCycles[i % cutCycles.length];

    if (stockIndices.has(i)) {
      const videoQuery = buildStockQuery(beat);
      const hudLabel = safeEditorialCopy(
        ['ENTORNO DE PRODUCCIÓN', 'EJECUCIÓN EN VIVO', 'ESTADO DEL SERVIDOR', 'SISTEMA BAJO CARGA'],
        transcript.text,
        usedOverlayTexts,
        'ESTADO DEL SERVIDOR'
      );
      brolls.push({
        id: `broll_${i + 1}`,
        start,
        end,
        cutStyle,
        transition,
        concept: `stock moody: ${videoQuery}`.slice(0, 90),
        narrative: `Clip Pixabay moody con marco HUD de telemetría sobre «${hudLabel.toLowerCase()}».`,
        component: 'stock_video',
        props: {
          videoQuery,
          sourcePreference: 'pixabay',
          tone: 'moody',
          headline: hudLabel
        },
        _sfxCategory: 'transition'
      });

      overlays.push({
        id: `overlay_${overlays.length + 1}`,
        start: roundTime(start + 0.02, 3),
        end: roundTime(Math.max(start + 0.9, end - 0.02), 3),
        style: 'hud_frame',
        text: hudLabel,
        highlight: `CAM 0${(i % 4) + 1} // REC`,
        accent: style.accent.hex,
        position: 'top',
        allowOverBroll: true,
        semanticStart: start,
        semanticEnd: end
      });
      plannerState.lastComponent = 'stock_video';
      continue;
    }

    const built = i === 0
      ? buildHookScene(beat, allSignals, style, transcript.text, usedHeadlines, i)
      : buildContextualScene(beat, i, beats.length, style, transcript.text, usedHeadlines, plannerState, allSignals);

    const headlineOrTitle = built.props.headline || built.props.title || (built.props.lines && built.props.lines.map((l) => l.text).join(' ')) || built.component;
    brolls.push({
      id: `broll_${i + 1}`,
      start,
      end,
      cutStyle,
      transition,
      concept: String(headlineOrTitle).toLowerCase().slice(0, 90),
      narrative: `Escena motion (${built.component}) para el beat ${i + 1}: «${String(headlineOrTitle).toLowerCase().slice(0, 80)}».`,
      component: built.component,
      props: built.props,
      _sfxCategory: built.sfxCategory || 'transition'
    });
    plannerState.lastComponent = built.component;

    if (built.overlayText && !usedOverlayTexts.has(built.overlayText) && len >= 1.2) {
      usedOverlayTexts.add(built.overlayText);
      overlays.push({
        id: `overlay_${overlays.length + 1}`,
        start: roundTime(start + 0.08, 3),
        end: roundTime(Math.min(end - 0.05, start + 1.45), 3),
        style: 'minimal_banner',
        text: built.overlayText,
        accent: style.accent.hex,
        position: 'top',
        allowOverBroll: true,
        semanticStart: start,
        semanticEnd: end
      });
    } else if (built.ctaOverlay && len >= 1.4 && !usedOverlayTexts.has('¿Y TÚ QUÉ HARÍAS?')) {
      const ctaText = safeEditorialCopy(['¿Y TÚ QUÉ HARÍAS?', '¿PROBASTE EL RESTORE?'], transcript.text, usedOverlayTexts, '¿Y TÚ QUÉ HARÍAS?');
      overlays.push({
        id: `overlay_${overlays.length + 1}`,
        start: roundTime(start + 0.15, 3),
        end: roundTime(end - 0.05, 3),
        style: 'cta_debate',
        text: ctaText,
        icon: 'comment_debate',
        accent: style.accent.hex,
        position: 'top',
        allowOverBroll: true,
        semanticStart: start,
        semanticEnd: end
      });
    }
  }

  // ---- Pacing Safety Pass: ensure no > 3.4s interval without a visual event ----
  for (let i = 0; i < brolls.length && overlays.length < MOTION_LIMITS.maxOverlays; i++) {
    const b = brolls[i];
    if ((b.end - b.start) <= 3.35) continue;
    const hasInnerOverlay = overlays.some((o) => o.start > b.start + 0.4 && o.start < b.end - 0.4);
    if (hasInnerOverlay) continue;
    const oStart = roundTime((b.start + b.end) / 2 - 0.5, 3);
    const oEnd = roundTime(Math.min(b.end - 0.05, oStart + 1.15), 3);
    if (oEnd - oStart >= 0.85 && !overlays.some((o) => oStart < o.end + 0.12 && o.start < oEnd + 0.12)) {
      overlays.push({
        id: `overlay_${overlays.length + 1}`,
        start: oStart,
        end: oEnd,
        style: 'icon_pop',
        text: '',
        icon: 'lightning',
        accent: style.accent.hex,
        position: 'top',
        allowOverBroll: true,
        semanticStart: oStart,
        semanticEnd: oEnd
      });
    }
  }

  // ---- SFX Scheduling with 9 Real Sounds + J/L-Cuts + Anti-Repetition ----
  const catalog = options.sfxCatalog || null;
  const availableIds = new Set(catalog ? catalog.sounds.map((s) => s.id) : REAL_SFX_IDS);
  const poolObj = getSfxPoolById(style.sfxPool);
  const sfx = [];
  if (!options.noSfx) {
    let lastSound = null;
    const usedCounts = new Map();
    const minSfxGap = 0.48;

    const pickRealSound = (category) => {
      const catCandidates = (poolObj[category] || REAL_SFX_IDS).filter((id) => availableIds.has(id));
      const allValid = REAL_SFX_IDS.filter((id) => availableIds.has(id));
      const basePool = catCandidates.length ? catCandidates : allValid;
      // Rotate through unused real SFX first so diverse real sounds appear across the timeline.
      const nonConsecutive = basePool.filter((id) => id !== lastSound);
      const pool = nonConsecutive.length ? nonConsecutive : allValid.filter((id) => id !== lastSound);
      pool.sort((a, b) => (usedCounts.get(a) || 0) - (usedCounts.get(b) || 0));
      return pool[0] || allValid[0];
    };

    const gainFor = (id) => {
      const entry = catalog ? catalog.sounds.find((s) => s.id === id) : null;
      return entry ? clamp(entry.defaultGainDb, -16, -9) : -12;
    };

    for (let i = 0; i < brolls.length && sfx.length < MOTION_LIMITS.maxSfx; i++) {
      const b = brolls[i];
      const cat = b._sfxCategory || 'transition';
      const sound = pickRealSound(cat);
      if (!sound) continue;

      // J-cut pre-laps into the previous beat; L-cut tails over the cut.
      let at = b.start + 0.02;
      let trimSec;
      let fadeInSec;
      let fadeOutSec;

      if (i === 0) {
        at = 0.02;
        trimSec = 0.75;
        fadeInSec = 0.02;
        fadeOutSec = 0.25;
      } else if (b.cutStyle === 'j-cut') {
        at = Math.max(0.1, roundTime(b.start - 0.22, 3));
        trimSec = sound.includes('keyboard') ? 1.35 : 0.72;
        fadeInSec = 0.12;
        fadeOutSec = 0.26;
      } else if (b.cutStyle === 'l-cut') {
        at = roundTime(b.start + 0.05, 3);
        trimSec = sound.includes('keyboard') ? 1.45 : 0.85;
        fadeInSec = 0.04;
        fadeOutSec = 0.35;
      } else if (b.cutStyle === 'jl-cut') {
        at = Math.max(0.1, roundTime(b.start - 0.14, 3));
        trimSec = 0.90;
        fadeInSec = 0.10;
        fadeOutSec = 0.32;
      } else {
        at = roundTime(b.start + 0.02, 3);
        trimSec = 0.55;
        fadeInSec = 0.02;
        fadeOutSec = 0.18;
      }

      if (at >= duration - 0.08) continue;
      if (sfx.some((s) => Math.abs(s.at - at) < minSfxGap)) continue;
      if (lastSound === sound) continue;

      sfx.push({
        id: `sfx_${sfx.length + 1}`,
        at: roundTime(at, 3),
        sound,
        gainDb: gainFor(sound),
        ...(trimSec !== undefined ? { trimSec } : {}),
        ...(fadeInSec !== undefined ? { fadeInSec } : {}),
        ...(fadeOutSec !== undefined ? { fadeOutSec } : {}),
        reason: `${b.cutStyle} en ${b.component}: ${b.concept.slice(0, 60)}`,
        target: `broll:${b.id}`
      });
      lastSound = sound;
      usedCounts.set(sound, (usedCounts.get(sound) || 0) + 1);
    }
  }

  // ---- Dynamic Centered Lower Captions ----------------------------------
  const highlightTokens = [];
  for (const b of brolls) {
    const label = b.props.headline || b.props.title || '';
    for (const w of String(label).split(/\s+/)) {
      const clean = w.replace(/[^\p{L}\p{N}]/gu, '');
      if (clean.length >= 4) highlightTokens.push(clean);
    }
  }
  const highlightWords = Array.from(new Set(highlightTokens)).slice(0, 12);

  const plan = {
    version: '1',
    mode: 'motion',
    style,
    source: {
      video: source.video || '',
      duration: roundTime(duration, 3),
      width: source.width || 1080,
      height: source.height || 1920,
      fps: source.fps || 30,
      hash: source.hash
    },
    transcript: {
      language: transcript.language,
      text: String(transcript.text || '').slice(0, 4000)
    },
    captions: {
      enabled: options.noCaptions !== true,
      dynamic: true,
      overBroll: true,
      maxCharsPerLine: 20,
      maxLines: 1,
      minDuration: 0.40,
      marginV: style.subtitlePosition.marginV,
      accentColor: style.accent.hex,
      highlightWords
    },
    brolls: brolls.map(({ _sfxCategory, ...rest }) => rest),
    overlays,
    cameras: [],
    sfx
  };

  if (options.validate === false) return plan;
  return validatePlan(plan, {
    duration,
    sfxIds: catalog ? Array.from(availableIds) : undefined,
    strictCopy: true,
    transcriptText: transcript.text
  });
}

module.exports = {
  REAL_SFX_IDS,
  extractHardFigures,
  extractBeatSignals,
  segmentTranscriptIntoBeats,
  planMotionWithLocal
};
