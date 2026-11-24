#!/usr/bin/env node
// Deterministic multi-layer DSP SFX synthesis. Every file is generated from pure
// math with a fixed seed, so the library is reproducible and has zero external
// provenance concerns. Output: animaciones/editor/sfx/*.wav (48 kHz, mono, PCM16).

const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 48000;

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rand() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function writeWav(file, samples) {
  const count = samples.length;
  const buffer = Buffer.alloc(44 + count * 2);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + count * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(count * 2, 40);
  for (let i = 0; i < count; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(clamped * 32767), 44 + i * 2);
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buffer);
}

function softClip(x, drive = 1.4) {
  return Math.tanh(x * drive) / Math.tanh(drive);
}

function normalize(samples, peak = 0.72) {
  let max = 0;
  for (const sample of samples) max = Math.max(max, Math.abs(sample));
  if (max < 1e-9) return samples;
  return samples.map((s) => (s / max) * peak);
}

function fadeEdges(samples, fadeSamples = 64) {
  const n = samples.length;
  const f = Math.min(fadeSamples, Math.floor(n / 4));
  for (let i = 0; i < f; i++) {
    const g = i / f;
    samples[i] *= g;
    samples[n - 1 - i] *= g;
  }
  return samples;
}

// --- Original 5 base sounds (enhanced peak/clarity) -----------------------

function synthWhoosh() {
  const dur = 0.62;
  const n = Math.round(dur * SAMPLE_RATE);
  const rand = mulberry32(0x5e0d1);
  const out = new Float64Array(n);
  let low = 0;
  let high = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const p = t / dur;
    const white = rand() * 2 - 1;
    const cutoff = 0.045 + 0.25 * Math.sin(Math.PI * p) ** 2;
    low += cutoff * (white - low);
    high = white - low;
    const env = Math.sin(Math.PI * Math.min(1, p * 1.05)) ** 1.5 * Math.exp(-p * 0.75);
    const body = Math.sin(2 * Math.PI * (180 + 290 * p) * t) * 0.12 * env;
    out[i] = (low * 0.88 + high * 0.16) * env + body;
  }
  return fadeEdges(normalize(Array.from(out), 0.74), 220);
}

function synthTick() {
  const dur = 0.11;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 44);
    const click = Math.exp(-t * 160) * (i < 6 ? (i % 2 ? -1 : 1) * 0.42 : 0);
    out[i] = (Math.sin(2 * Math.PI * 1720 * t) * 0.55 + Math.sin(2 * Math.PI * 2580 * t) * 0.22) * env + click;
  }
  return fadeEdges(normalize(Array.from(out), 0.68), 8);
}

function synthImpact() {
  const dur = 0.72;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const rand = mulberry32(0x1a9c3);
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const freq = 96 - 44 * Math.min(1, t / 0.45);
    phase += (2 * Math.PI * freq) / SAMPLE_RATE;
    const env = Math.exp(-t * 5.2);
    const thump = softClip(Math.sin(phase) * 0.92 * env, 1.5);
    const transient = (rand() * 2 - 1) * Math.exp(-t * 52) * 0.28;
    out[i] = thump + transient;
  }
  return fadeEdges(normalize(Array.from(out), 0.78), 96);
}

function synthPaper() {
  const dur = 0.46;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const rand = mulberry32(0x77aa2);
  let low = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const p = t / dur;
    const white = rand() * 2 - 1;
    low += 0.16 * (white - low);
    const band = white - low;
    const grain = 0.5 + 0.5 * Math.sin(2 * Math.PI * 13 * t);
    const env = Math.sin(Math.PI * Math.min(1, p * 1.15)) ** 2;
    out[i] = (band * 0.78 + low * 0.25) * env * grain;
  }
  return fadeEdges(normalize(Array.from(out), 0.64), 160);
}

function synthChime() {
  const dur = 0.78;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 3.2);
    const a = Math.sin(2 * Math.PI * 880 * t) * 0.45;
    const b = Math.sin(2 * Math.PI * 1320 * t + 0.3) * 0.28;
    const c = Math.sin(2 * Math.PI * 1760 * t + 0.7) * 0.16;
    out[i] = (a + b + c) * env;
  }
  return fadeEdges(normalize(Array.from(out), 0.68), 96);
}

// --- New 16 High-Retention Editing Sounds ---------------------------------

function synthHookImpact() {
  const dur = 0.75;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const rand = mulberry32(0x88101);
  let phase = 0;
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const freq = 130 * Math.exp(-t * 5.8) + 42;
    phase += (2 * Math.PI * freq) / SAMPLE_RATE;
    const sub = softClip(Math.sin(phase) * Math.exp(-t * 4.2), 1.7);
    const punch = Math.sin(2 * Math.PI * (240 - 140 * Math.min(1, t / 0.08)) * t) * Math.exp(-t * 28) * 0.5;
    const white = rand() * 2 - 1;
    lp += 0.22 * (white - lp);
    const air = lp * Math.exp(-t * 8.5) * 0.35;
    out[i] = sub * 0.78 + punch + air;
  }
  return fadeEdges(normalize(Array.from(out), 0.82), 64);
}

function synthCinematicBoom() {
  const dur = 0.95;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const rand = mulberry32(0x41202);
  let phase = 0;
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const freq = 64 - 30 * Math.min(1, t / 0.75);
    phase += (2 * Math.PI * freq) / SAMPLE_RATE;
    const body = softClip((Math.sin(phase) + 0.25 * Math.sin(phase * 2)) * Math.exp(-t * 3.1), 1.6);
    const noise = rand() * 2 - 1;
    lp += 0.08 * (noise - lp);
    const rumble = lp * Math.exp(-t * 3.6) * 0.42;
    const click = (rand() * 2 - 1) * Math.exp(-t * 90) * 0.32;
    out[i] = body * 0.8 + rumble + click;
  }
  return fadeEdges(normalize(Array.from(out), 0.8), 96);
}

function synthBassDropClean() {
  const dur = 0.68;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const freq = 145 * Math.exp(-t * 6.5) + 38;
    phase += (2 * Math.PI * freq) / SAMPLE_RATE;
    const env = Math.min(1, t / 0.006) * Math.exp(-t * 4.8);
    const wave = softClip(Math.sin(phase) * 0.9 + Math.sin(phase * 0.5) * 0.15, 1.35);
    out[i] = wave * env;
  }
  return fadeEdges(normalize(Array.from(out), 0.78), 64);
}

function synthPopSpring() {
  const dur = 0.20;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const p = t / dur;
    const freq = 340 + 720 * (1 - Math.exp(-t * 28));
    phase += (2 * Math.PI * freq) / SAMPLE_RATE;
    const env = Math.min(1, t / 0.004) * Math.exp(-t * 14);
    const harm = Math.sin(phase * 2) * 0.28 * Math.exp(-p * 4);
    out[i] = softClip((Math.sin(phase) * 0.88 + harm) * env, 1.4);
  }
  return fadeEdges(normalize(Array.from(out), 0.88), 24);
}

function synthCardSnap() {
  const dur = 0.18;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const rand = mulberry32(0x9a31c);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const white = rand() * 2 - 1;
    lp += 0.35 * (white - lp);
    const snap = (white - lp) * Math.exp(-t * 36) * 0.65;
    const body = Math.sin(2 * Math.PI * (440 - 180 * Math.min(1, t / 0.06)) * t) * Math.exp(-t * 15) * 0.82;
    out[i] = softClip(snap + body, 1.5);
  }
  return fadeEdges(normalize(Array.from(out), 0.88), 16);
}

function synthUiPopDouble() {
  const dur = 0.26;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const hit = (tLocal, baseFreq) => {
    if (tLocal < 0) return 0;
    const f = baseFreq + 420 * (1 - Math.exp(-tLocal * 35));
    return Math.sin(2 * Math.PI * f * tLocal) * Math.min(1, tLocal / 0.004) * Math.exp(-tLocal * 28);
  };
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    out[i] = hit(t, 440) * 0.75 + hit(t - 0.085, 620) * 0.85;
  }
  return fadeEdges(normalize(Array.from(out), 0.74), 24);
}

function synthStickerSlap() {
  const dur = 0.20;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const rand = mulberry32(0x3f29a);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const white = rand() * 2 - 1;
    lp += 0.28 * (white - lp);
    const slap = (white * 0.55 + lp * 0.45) * Math.exp(-t * 48);
    const thud = Math.sin(2 * Math.PI * (240 * Math.exp(-t * 18) + 95) * t) * Math.exp(-t * 24) * 0.75;
    out[i] = slap * 0.55 + thud;
  }
  return fadeEdges(normalize(Array.from(out), 0.74), 24);
}

function synthCameraPunch() {
  const dur = 0.24;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const rand = mulberry32(0x6b14e);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const p = t / dur;
    const white = rand() * 2 - 1;
    lp += (0.08 + 0.18 * Math.sin(Math.PI * p)) * (white - lp);
    const air = lp * Math.sin(Math.PI * p) ** 1.2 * Math.exp(-p * 0.9);
    const sub = Math.sin(2 * Math.PI * (150 - 70 * p) * t) * Math.exp(-t * 11) * 0.68;
    out[i] = softClip(air * 0.72 + sub, 1.5);
  }
  return fadeEdges(normalize(Array.from(out), 0.88), 48);
}

function synthShutterClick() {
  const dur = 0.14;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const rand = mulberry32(0x2c8d4);
  const burst = (tl, freq) => {
    if (tl < 0) return 0;
    const noise = (rand() * 2 - 1) * Math.exp(-tl * 130);
    const metal = Math.sin(2 * Math.PI * freq * tl) * Math.exp(-tl * 95);
    return noise * 0.6 + metal * 0.4;
  };
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    out[i] = burst(t, 2850) * 0.8 + burst(t - 0.042, 3400) * 0.9;
  }
  return fadeEdges(normalize(Array.from(out), 0.72), 16);
}

function synthWhipPan() {
  const dur = 0.34;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const rand = mulberry32(0x91e7b);
  let lp1 = 0;
  let lp2 = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const p = t / dur;
    const white = rand() * 2 - 1;
    const c = 0.08 + 0.42 * Math.sin(Math.PI * p) ** 2;
    lp1 += c * (white - lp1);
    lp2 += 0.05 * (lp1 - lp2);
    const band = lp1 - lp2 * 0.7;
    const env = Math.sin(Math.PI * p) ** 1.3;
    const tone = Math.sin(2 * Math.PI * (240 + 520 * Math.sin(Math.PI * p)) * t) * 0.15 * env;
    out[i] = band * env + tone;
  }
  return fadeEdges(normalize(Array.from(out), 0.74), 96);
}

function synthGlitchTech() {
  const dur = 0.28;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const rand = mulberry32(0x50fa3);
  const stepSamples = 240;
  let held = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const gate = ((Math.floor(t / 0.045) % 2) === 0 || t < 0.08) ? 1 : 0.45;
    if (i % stepSamples === 0) {
      held = 800 + Math.floor(rand() * 14) * 220;
    }
    const fm = Math.sin(2 * Math.PI * held * t + 2.2 * Math.sin(2 * Math.PI * 190 * t));
    const noise = (rand() * 2 - 1) * 0.25;
    const env = Math.exp(-t * 5.8) * gate;
    out[i] = softClip((fm * 0.8 + noise) * env, 1.6);
  }
  return fadeEdges(normalize(Array.from(out), 0.88), 48);
}

function synthDataBurst() {
  const dur = 0.32;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const freqs = [987.77, 1318.51, 1567.98, 2093.0];
  const step = 0.055;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const idx = Math.min(freqs.length - 1, Math.floor(t / step));
    const local = t - idx * step;
    const f = freqs[idx];
    const env = Math.min(1, local / 0.004) * Math.exp(-local * 18) * Math.exp(-t * 2.2);
    out[i] = (Math.sin(2 * Math.PI * f * t) * 0.75 + Math.sin(2 * Math.PI * f * 2 * t) * 0.2) * env;
  }
  return fadeEdges(normalize(Array.from(out), 0.68), 48);
}

function synthKeyboardBurst() {
  const dur = 0.42;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const rand = mulberry32(0x7c331);
  const hits = [0.005, 0.075, 0.145, 0.21, 0.29];
  const freqs = [1450, 1680, 1520, 1790, 1380];
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    let v = 0;
    for (let h = 0; h < hits.length; h++) {
      const dt = t - hits[h];
      if (dt >= 0 && dt < 0.06) {
        const click = (rand() * 2 - 1) * Math.exp(-dt * 150) * 0.55;
        const cap = Math.sin(2 * Math.PI * freqs[h] * dt) * Math.exp(-dt * 95) * 0.45;
        const thock = Math.sin(2 * Math.PI * 290 * dt) * Math.exp(-dt * 65) * 0.5;
        v += click + cap + thock;
      }
    }
    out[i] = v;
  }
  return fadeEdges(normalize(Array.from(out), 0.70), 32);
}

function synthCounterTick() {
  const dur = 0.12;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 58);
    out[i] = (Math.sin(2 * Math.PI * 2340 * t) * 0.6 + Math.sin(2 * Math.PI * 3510 * t) * 0.35) * env;
  }
  return fadeEdges(normalize(Array.from(out), 0.68), 16);
}

function synthRiserShort() {
  const dur = 0.72;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  const rand = mulberry32(0x11d4a);
  let lp = 0;
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const p = t / dur;
    const white = rand() * 2 - 1;
    const c = 0.08 + 0.36 * (p * p);
    lp += c * (white - lp);
    const freq = 220 + 780 * (p * p);
    phase += (2 * Math.PI * freq) / SAMPLE_RATE;
    const env = (0.38 + 0.62 * (p ** 0.9)) * (p > 0.90 ? (1 - p) / 0.10 : 1);
    out[i] = (lp * 0.6 + Math.sin(phase) * 0.4) * env;
  }
  return fadeEdges(normalize(Array.from(out), 0.76), 64);
}

function synthNotificationDing() {
  const dur = 0.62;
  const n = Math.round(dur * SAMPLE_RATE);
  const out = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const a = Math.sin(2 * Math.PI * 1046.5 * t) * Math.exp(-t * 3.8) * 0.65;
    const b = t >= 0.065 ? Math.sin(2 * Math.PI * 1567.98 * (t - 0.065)) * Math.exp(-(t - 0.065) * 3.4) * 0.72 : 0;
    const shimmer = t >= 0.065 ? Math.sin(2 * Math.PI * 3135.96 * (t - 0.065)) * Math.exp(-(t - 0.065) * 6.5) * 0.2 : 0;
    out[i] = softClip(a + b + shimmer, 1.35);
  }
  return fadeEdges(normalize(Array.from(out), 0.88), 48);
}

const SOUNDS = [
  { file: 'soft_whoosh.wav', synth: synthWhoosh },
  { file: 'ui_tick.wav', synth: synthTick },
  { file: 'low_impact.wav', synth: synthImpact },
  { file: 'paper_turn.wav', synth: synthPaper },
  { file: 'digital_chime.wav', synth: synthChime },
  { file: 'hook_impact.wav', synth: synthHookImpact },
  { file: 'cinematic_boom.wav', synth: synthCinematicBoom },
  { file: 'bass_drop_clean.wav', synth: synthBassDropClean },
  { file: 'pop_spring.wav', synth: synthPopSpring },
  { file: 'card_snap.wav', synth: synthCardSnap },
  { file: 'ui_pop_double.wav', synth: synthUiPopDouble },
  { file: 'sticker_slap.wav', synth: synthStickerSlap },
  { file: 'camera_punch.wav', synth: synthCameraPunch },
  { file: 'shutter_click.wav', synth: synthShutterClick },
  { file: 'whip_pan.wav', synth: synthWhipPan },
  { file: 'glitch_tech.wav', synth: synthGlitchTech },
  { file: 'data_burst.wav', synth: synthDataBurst },
  { file: 'keyboard_burst.wav', synth: synthKeyboardBurst },
  { file: 'counter_tick.wav', synth: synthCounterTick },
  { file: 'riser_short.wav', synth: synthRiserShort },
  { file: 'notification_ding.wav', synth: synthNotificationDing }
];

function generate(outDir = __dirname) {
  fs.mkdirSync(outDir, { recursive: true });
  const written = [];
  for (const sound of SOUNDS) {
    const file = path.join(outDir, sound.file);
    writeWav(file, sound.synth());
    written.push(file);
  }
  return written;
}

if (require.main === module) {
  const written = generate(process.argv[2] ? path.resolve(process.argv[2]) : undefined);
  for (const file of written) console.log(`✔ ${file}`);
}

module.exports = {
  generate,
  SOUNDS,
  SAMPLE_RATE,
  writeWav,
  normalize,
  fadeEdges,
  mulberry32
};
