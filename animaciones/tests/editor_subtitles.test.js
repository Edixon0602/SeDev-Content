const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const { assTime, hexToAssColor, escapeAssText, groupWordsIntoCues, buildAss } = require('../editor/subtitles');
const { normalizeTranscript } = require('../editor/transcript');

const ROOT = path.resolve(__dirname, '../..');
const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/transcript.sample.json'), 'utf8'));
const transcript = normalizeTranscript(raw, { duration: raw.meta.duration });
const plan = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/plan.sample.json'), 'utf8'));

test('ASS time and color conversion are exact', () => {
  assert.equal(assTime(0), '0:00:00.00');
  assert.equal(assTime(61.23), '0:01:01.23');
  assert.equal(hexToAssColor('#d08a5a'), '&H005A8AD0');
});

test('text escaping removes override braces and normalises newlines', () => {
  assert.equal(escapeAssText('hola {\\b1} mundo\nlinea'), 'hola \\\\b1 mundo linea');
});

test('word grouping respects chars, lines and minimum duration', () => {
  const cues = groupWordsIntoCues(transcript.words, {
    maxCharsPerLine: 24,
    maxLines: 2,
    minDuration: 0.8,
    duration: raw.meta.duration
  });
  assert.ok(cues.length > 4);
  for (const cue of cues) {
    assert.ok(cue.lines.length <= 2);
    for (const line of cue.lines) assert.ok(line.length <= 24, `line too long: ${line}`);
    assert.ok(cue.end > cue.start);
    assert.ok(cue.end - cue.start >= 0.8 - 0.001);
  }
});

test('ASS contains only short two-line cues and safe bottom margins', () => {
  const ass = buildAss(transcript, plan, { duration: plan.source.duration });
  assert.match(ass, /ScriptType: v4\.00\+/);
  assert.match(ass, /PlayResX: 1080/);
  assert.match(ass, /MarginV, Encoding/);
  assert.match(ass, /,2,72,72,330,1/);
  const events = ass.split('\n').filter((line) => line.startsWith('Dialogue:'));
  assert.ok(events.length > 4);
  for (const event of events) {
    const text = event.split(',').slice(9).join(',');
    assert.ok((text.match(/\\N/g) || []).length <= 1, 'no more than two lines');
  }
});

test('captions are suppressed over fullscreen B-roll by default', () => {
  const ass = buildAss(transcript, plan, { duration: plan.source.duration });
  const brollIntervals = plan.brolls.map((b) => ({ start: b.start, end: b.end }));
  for (const line of ass.split('\n').filter((l) => l.startsWith('Dialogue:'))) {
    const match = /^Dialogue: 0,(\d+):(\d+):(\d+\.\d+),(\d+):(\d+):(\d+\.\d+),/.exec(line);
    assert.ok(match, line);
    const start = Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
    const end = Number(match[4]) * 3600 + Number(match[5]) * 60 + Number(match[6]);
    for (const b of brollIntervals) {
      assert.equal(start < b.end && b.start < end, false, `caption ${start}-${end} overlaps broll ${b.start}-${b.end}`);
    }
  }
});

test('captions over B-roll can be enabled explicitly', () => {
  const planOver = JSON.parse(JSON.stringify(plan));
  planOver.captions.overBroll = true;
  const ass = buildAss(transcript, planOver, { duration: plan.source.duration });
  assert.ok(ass.split('\n').filter((l) => l.startsWith('Dialogue:')).length > 0);
});

test('keyword highlighting is sober and uses the single accent', () => {
  const ass = buildAss(transcript, plan, { duration: plan.source.duration });
  assert.match(ass, /\{\\c&H005A8AD0&}/);
  assert.ok((ass.match(/\{\\c&H005A8AD0&\}/g) || []).length < 30);
});
