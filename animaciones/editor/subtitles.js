// ASS subtitle generation from word timestamps.
// Rules: one or two short lines, safe bottom margin, sober keyword accent,
// no captions over fullscreen B-roll unless the plan explicitly opts in.

const { roundTime } = require('./utils');

const DEFAULT_STYLE = {
  fontName: 'Plus Jakarta Sans',
  fontSize: 56,
  primary: '#f2ede4',
  accent: '#d08a5a',
  outline: '#101010',
  back: '#101010',
  marginL: 72,
  marginR: 72,
  marginV: 330,
  outlineWidth: 4,
  shadow: 1.4
};

function hexToAssColor(hex, alpha = '00') {
  const match = /^#?([0-9a-f]{6})$/i.exec(String(hex || '').trim());
  const value = match ? match[1] : 'ffffff';
  const r = value.slice(0, 2);
  const g = value.slice(2, 4);
  const b = value.slice(4, 6);
  return `&H${alpha}${b}${g}${r}`.toUpperCase();
}

function assTime(seconds) {
  const total = Math.max(0, Number(seconds) || 0);
  const centis = Math.round(total * 100);
  const h = Math.floor(centis / 360000);
  const m = Math.floor((centis % 360000) / 6000);
  const s = Math.floor((centis % 6000) / 100);
  const cs = centis % 100;
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
}

function escapeAssText(text) {
  return String(text === undefined || text === null ? '' : text)
    .replace(/\r?\n/g, ' ')
    .replace(/[{}]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeWord(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/^[^a-z0-9áéíóúüñ]+|[^a-z0-9áéíóúüñ]+$/gi, '')
    .trim();
}

function wordInsideIntervals(word, intervals) {
  const mid = (Number(word.start) + Number(word.end)) / 2;
  return intervals.some((interval) => mid >= interval.start && mid < interval.end);
}

function splitLongWord(word, maxChars) {
  if (word.length <= maxChars) return [word];
  const chunks = [];
  for (let i = 0; i < word.length; i += maxChars) chunks.push(word.slice(i, i + maxChars));
  return chunks;
}

function groupWordsIntoCues(words, options = {}) {
  const maxChars = Math.max(8, Number(options.maxCharsPerLine) || 32);
  const maxLines = Math.max(1, Number(options.maxLines) || 2);
  const minDuration = Math.max(0.2, Number(options.minDuration) || 0.8);
  const maxGap = Number.isFinite(Number(options.maxGap)) ? Number(options.maxGap) : 0.72;
  const maxCueDuration = Number.isFinite(Number(options.maxCueDuration)) ? Number(options.maxCueDuration) : 4.4;
  const readingCps = Math.max(8, Number(options.readingCharsPerSecond) || 18);

  const cues = [];
  let current = null;

  function closeCurrent() {
    if (current && current.words.length) cues.push(current);
    current = null;
  }

  function startCue(word) {
    current = { start: word.start, end: word.end, words: [], lines: [] };
  }

  function appendWord(word) {
    const text = escapeAssText(word.word);
    if (!text) return;
    if (!current) startCue(word);
    const chunks = splitLongWord(text, maxChars);
    for (const chunk of chunks) {
      const lines = current.lines;
      const last = lines.length ? lines[lines.length - 1] : '';
      if (!last) {
        lines.push(chunk);
      } else if (last.length + 1 + chunk.length <= maxChars) {
        lines[lines.length - 1] = `${last} ${chunk}`;
      } else if (lines.length < maxLines) {
        lines.push(chunk);
      } else {
        closeCurrent();
        startCue(word);
        current.lines.push(chunk);
      }
    }
    current.words.push(word);
    current.end = word.end;
  }

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const gap = current ? word.start - current.end : 0;
    const wouldExceed = current && (word.end - current.start) > maxCueDuration;
    const punctuationBreak = current && /[.!?]$/.test(String(current.words[current.words.length - 1].word || '')) &&
      current.words.length >= 2 && word.start - current.end > 0.05;
    if (current && (gap > maxGap || wouldExceed || punctuationBreak)) closeCurrent();
    appendWord(word);
  }
  closeCurrent();

  // Ensure readable minimum duration and never bleed into the next cue.
  for (let i = 0; i < cues.length; i++) {
    const cue = cues[i];
    const textLength = cue.lines.join(' ').length;
    const required = Math.max(minDuration, Math.min(3.2, textLength / readingCps));
    const target = cue.start + required;
    const limit = i + 1 < cues.length ? cues[i + 1].start - 0.03 : Number(options.duration) || Infinity;
    cue.end = Math.min(Math.max(cue.end, target), Math.max(cue.end, limit));
    if (limit > cue.start && cue.end > limit) cue.end = limit;
    if (cue.end <= cue.start) cue.end = cue.start + 0.25;
    cue.start = roundTime(cue.start);
    cue.end = roundTime(cue.end);
    cue.text = cue.lines.join('\\N');
  }
  return cues;
}

function renderCueText(cue, highlightWords, options = {}) {
  const accentHex = options.accentColor || DEFAULT_STYLE.accent;
  const accent = hexToAssColor(accentHex);
  const primary = hexToAssColor(options.primaryColor || DEFAULT_STYLE.primary);
  const isDynamic = options.dynamic === true;
  const popPrefix = isDynamic
    ? '{\\fscx90\\fscy90\\t(0,70,\\fscx105\\fscy105)\\t(70,135,\\fscx100\\fscy100)}'
    : '';
  const body = cue.lines.map((line) => line.split(/\s+/).map((word) => {
    const key = normalizeWord(word);
    if (highlightWords.has(key)) {
      return isDynamic
        ? `{\\c${accent}&\\b1}${word}{\\c${primary}&}`
        : `{\\c${accent}&}${word}{\\c${primary}&}`;
    }
    return word;
  }).join(' ')).join('\\N');
  return `${popPrefix}${body}`;
}

function buildAss(transcript, plan, options = {}) {
  const captions = plan && plan.captions ? plan.captions : {};
  if (captions.enabled === false || options.enabled === false) return '';
  const duration = Number(options.duration || (plan.source && plan.source.duration) || 0);
  if (!transcript || !Array.isArray(transcript.words)) throw new Error('buildAss requiere palabras del transcript.');
  const isMotion = Boolean(plan && plan.mode === 'motion');
  const isDynamic = captions.dynamic === true || options.dynamic === true || (isMotion && captions.dynamic !== false);
  const brolls = Array.isArray(plan.brolls) ? plan.brolls : [];
  const overBroll = captions.overBroll !== undefined ? captions.overBroll === true : isMotion;
  const words = transcript.words.filter((word) => overBroll || !wordInsideIntervals(word, brolls));
  const highlightWords = new Set((captions.highlightWords || []).map(normalizeWord).filter(Boolean));
  const cues = groupWordsIntoCues(words, {
    maxCharsPerLine: isDynamic ? Math.min(20, captions.maxCharsPerLine || 20) : captions.maxCharsPerLine,
    maxLines: isDynamic ? 1 : captions.maxLines,
    minDuration: isDynamic ? Math.min(0.45, captions.minDuration || 0.45) : captions.minDuration,
    maxCueDuration: isDynamic ? 1.6 : 4.4,
    maxGap: isDynamic ? 0.35 : 0.72,
    duration
  });
  // Never let a cue bleed into a fullscreen B-roll, even by a few frames.
  let filteredCues = cues;
  if (!overBroll && brolls.length) {
    filteredCues = [];
    for (const cue of cues) {
      let start = cue.start;
      let end = cue.end;
      for (const b of brolls) {
        if (start < b.start && end > b.start) end = Math.min(end, b.start - 0.02);
        if (start >= b.start && start < b.end) start = b.end + 0.02;
      }
      if (end - start >= 0.2 && end > start) filteredCues.push({ ...cue, start, end });
    }
  }
  const motionMarginV = Number.isFinite(Number(captions.marginV))
    ? Number(captions.marginV)
    : (plan && plan.style && plan.style.subtitlePosition && Number(plan.style.subtitlePosition.marginV)) || 210;
  const style = {
    ...DEFAULT_STYLE,
    ...(isDynamic ? {
      fontSize: isMotion ? 62 : 66,
      primary: '#ffffff',
      accent: captions.accentColor || (plan && plan.style && plan.style.accent && plan.style.accent.hex) || '#10b981',
      outline: '#09090b',
      back: '#09090b',
      outlineWidth: 6,
      shadow: 2.5,
      marginV: isMotion ? motionMarginV : (Number.isFinite(Number(captions.marginV)) ? Number(captions.marginV) : 350)
    } : {}),
    ...(options.style || {})
  };
  const primary = hexToAssColor(style.primary);
  const outline = hexToAssColor(style.outline);
  const back = hexToAssColor(style.back, '66');
  const header = [
    '[Script Info]',
    'ScriptType: v4.00+',
    'PlayResX: 1080',
    'PlayResY: 1920',
    'WrapStyle: 2',
    'ScaledBorderAndShadow: yes',
    '',
    '[V4+ Styles]',
    'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
    `Style: Editorial,${style.fontName},${style.fontSize},${primary},${hexToAssColor(style.accent)},${outline},${back},-1,0,0,0,100,100,0.4,0,1,${style.outlineWidth},${style.shadow},2,${style.marginL},${style.marginR},${style.marginV},1`,
    '',
    '[Events]',
    'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text'
  ];
  const events = filteredCues.map((cue) => {
    const text = renderCueText(cue, highlightWords, {
      dynamic: isDynamic,
      accentColor: style.accent,
      primaryColor: style.primary
    });
    return `Dialogue: 0,${assTime(cue.start)},${assTime(cue.end)},Editorial,,0,0,0,,${text}`;
  });
  return `${header.join('\n')}\n${events.join('\n')}\n`;
}

module.exports = {
  DEFAULT_STYLE,
  assTime,
  hexToAssColor,
  escapeAssText,
  groupWordsIntoCues,
  buildAss,
  normalizeWord
};
