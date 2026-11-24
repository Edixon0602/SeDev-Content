// SeDev Motion Core — shared deterministic animation primitives.
// Every helper is a pure function of t / progress; no wall-clock time,
// no unseeded randomness. Loaded before motion_utils.js as window.MotionCore.

(function () {
  const finite = (v, fallback) => (Number.isFinite(Number(v)) ? Number(v) : fallback);

  const EASE = {
    linear: (x) => x,
    inQuad: (x) => x * x,
    outQuad: (x) => 1 - (1 - x) * (1 - x),
    inOutQuad: (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2),
    outCubic: (x) => 1 - Math.pow(1 - x, 3),
    inOutCubic: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
    outQuart: (x) => 1 - Math.pow(1 - x, 4),
    inOutQuart: (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2),
    outQuint: (x) => 1 - Math.pow(1 - x, 5),
    outExpo: (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
    inOutExpo: (x) => {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      return x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
    },
    inOutSine: (x) => -(Math.cos(Math.PI * x) - 1) / 2,
    outCirc: (x) => Math.sqrt(1 - Math.pow(x - 1, 2)),
    outBack: (x) => {
      const c1 = 1.4;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    },
    smoothstep: (x) => x * x * (3 - 2 * x)
  };

  const MC = {
    ease: EASE,

    clamp01(v) {
      const x = finite(v, 0);
      return x < 0 ? 0 : x > 1 ? 1 : x;
    },

    clamp(v, min, max) {
      const x = finite(v, 0);
      const lo = finite(min, 0);
      const hi = finite(max, lo);
      return x < lo ? lo : x > hi ? hi : x;
    },

    lerp(a, b, p) {
      return finite(a, 0) + (finite(b, 0) - finite(a, 0)) * finite(p, 0);
    },

    invLerp(a, b, v) {
      const aa = finite(a, 0);
      const bb = finite(b, aa);
      return aa === bb ? 0 : (finite(v, aa) - aa) / (bb - aa);
    },

    mapRange(v, inMin, inMax, outMin, outMax) {
      return this.lerp(outMin, outMax, this.clamp01(this.invLerp(inMin, inMax, v)));
    },

    // Normalized, clamped and eased progress between two absolute times.
    // Non-finite input degrades to a safe 0 (no NaN in any transform).
    progress(t, start, dur, easeName = 'outCubic') {
      const fn = EASE[easeName] || EASE.outCubic;
      const tt = finite(t, 0);
      const ss = finite(start, 0);
      const dd = finite(dur, 0);
      if (dd <= 0) return tt >= ss ? 1 : 0;
      return fn(this.clamp01((tt - ss) / dd));
    },

    // Real wrapping with hard character breaks for words without spaces.
    splitTextToWidth(ctx, text, maxWidth) {
      const raw = String(text === undefined || text === null ? '' : text).trim();
      if (!raw) return [];
      const limit = finite(maxWidth, 0);
      if (limit <= 0) return [raw];
      const fits = (s) => ctx.measureText(s).width <= limit;
      if (fits(raw)) return [raw];

      const words = raw.split(/\s+/);
      const lines = [];
      let line = '';
      const flush = () => {
        if (line) {
          lines.push(line);
          line = '';
        }
      };

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (fits(word)) {
          const test = line ? line + ' ' + word : word;
          if (fits(test)) {
            line = test;
          } else {
            flush();
            line = word;
          }
        } else {
          flush();
          let chunk = '';
          for (const ch of word) {
            const test = chunk + ch;
            if (chunk && !fits(test)) {
              lines.push(chunk);
              chunk = ch;
            } else {
              chunk = test;
            }
          }
          line = chunk;
        }
      }
      flush();
      return lines.length ? lines : [raw];
    },

    ellipsizeText(ctx, text, maxWidth) {
      const raw = String(text === undefined || text === null ? '' : text);
      const limit = finite(maxWidth, 0);
      if (limit <= 0) return '';
      if (ctx.measureText(raw).width <= limit) return raw;
      const ell = '…';
      if (ctx.measureText(ell).width > limit) return '';
      let out = raw;
      while (out.length > 0 && ctx.measureText(out + ell).width > limit) {
        out = out.slice(0, -1);
      }
      return out.length ? out + ell : ell;
    },

    // Shapes logical headline lines into visual lines that always fit.
    // Returns { fontSize, lineH, visual[] } with word layouts and baselines.
    layoutHeadline(ctx, lines, opts = {}) {
      const maxWidth = finite(opts.maxWidth, 860);
      const top = finite(opts.top, 200);
      const bottom = finite(opts.bottom, 640);
      const anchorX = finite(opts.anchorX, 480);
      const maxFont = finite(opts.maxFont, 104);
      const minFont = finite(opts.minFont, 22);
      const weight = opts.weight || '900';
      const family = opts.fontFamily || '"Plus Jakarta Sans", sans-serif';
      const logical = (lines || []).map((l) => Object.assign({}, l, {
        text: String(l && l.text !== undefined && l.text !== null ? l.text : '').toUpperCase()
      }));
      if (!logical.length) return { fontSize: minFont, lineH: 0, visual: [], top, bottom };

      let fontSize = Math.min(maxFont, Math.max(minFont, ((bottom - top) / logical.length) * 0.62));
      let visual = [];

      for (let iter = 0; iter < 5; iter++) {
        ctx.font = `${weight} ${fontSize}px ${family}`;
        visual = [];
        for (let li = 0; li < logical.length; li++) {
          const logicalLine = logical[li];
          // A highlight is one logical unit: never split it into two boxes.
          // It is shrunk per line later if it does not fit at the base size.
          const keepWhole = logicalLine.keepWhole === true || !!logicalLine.highlight;
          const chunks = keepWhole
            ? [logicalLine.text]
            : this.splitTextToWidth(ctx, logicalLine.text, maxWidth);
          for (let ci = 0; ci < chunks.length; ci++) {
            visual.push({
              text: chunks[ci],
              logical: logicalLine,
              logicalIndex: li,
              chunkIndex: ci,
              chunkCount: chunks.length
            });
          }
        }
        const lineH = (bottom - top) / Math.max(1, visual.length);
        const target = Math.min(maxFont, Math.max(minFont, lineH * 0.62));
        if (Math.abs(target - fontSize) < 0.6) break;
        fontSize = target;
      }

      const lineH = (bottom - top) / Math.max(1, visual.length);
      // Never let glyph height exceed the line slot (prevents overlap with 7+ lines).
      fontSize = Math.min(fontSize, Math.max(12, lineH * 0.88));
      const firstBaseline = top + lineH * 0.78;

      for (let i = 0; i < visual.length; i++) {
        const v = visual[i];
        let lineFont = fontSize;
        // line.fontSize is a safe upper bound / preference, never an overflow.
        const requested = Number(v.logical.fontSize);
        if (Number.isFinite(requested) && requested > 0) lineFont = Math.min(lineFont, requested);

        if (v.logical.keepWhole === true || v.logical.highlight) {
          ctx.font = `${weight} ${lineFont}px ${family}`;
          let guard = 0;
          while (ctx.measureText(v.text).width > maxWidth && lineFont > 10 && guard < 120) {
            lineFont -= 1;
            guard++;
            ctx.font = `${weight} ${lineFont}px ${family}`;
          }
          if (ctx.measureText(v.text).width > maxWidth) {
            // Absolute last resort for pathological copy: keep bounds safe.
            v.text = this.ellipsizeText(ctx, v.text, maxWidth);
          }
        }

        v.baseline = firstBaseline + i * lineH;
        v.fontSize = lineFont;
        v.lineH = lineH;
        v.layout = this.layoutWords(ctx, v.text, `${weight} ${lineFont}px ${family}`, 'center', anchorX);
      }
      return { fontSize, lineH, visual, top, bottom };
    },

    // Waits for every declared local face before the first paint.
    ensureFonts() {
      if (typeof document === 'undefined' || !document.fonts) {
        return Promise.resolve({ ok: true, missing: [], reason: 'no-font-api' });
      }
      const specs = [
        '500 17px "JetBrains Mono"',
        '600 22px "JetBrains Mono"',
        '700 16px "JetBrains Mono"',
        '800 24px "JetBrains Mono"',
        '900 66px "JetBrains Mono"',
        '700 94px "Plus Jakarta Sans"',
        '800 94px "Plus Jakarta Sans"',
        '900 94px "Plus Jakarta Sans"'
      ];
      return Promise.all(specs.map((s) => document.fonts.load(s).catch(() => null)))
        .then(() => {
          const missing = specs.filter((s) => !document.fonts.check(s));
          return { ok: missing.length === 0, missing, reason: missing.length ? 'missing-faces' : 'ok' };
        });
    },

    // One-shot impact envelope: 0 before the hit, decays after it.
    beat(t, at, decay = 9) {
      const tt = finite(t, 0);
      const aa = finite(at, 0);
      const dd = Math.max(0.001, finite(decay, 9));
      if (tt < aa) return 0;
      return Math.exp(-(tt - aa) * dd);
    },

    // Continuous deterministic oscillator in 0..1 (no randomness).
    pulse(t, hz = 1, phase = 0) {
      return 0.5 + 0.5 * Math.sin((finite(t, 0) * finite(hz, 1) + finite(phase, 0)) * Math.PI * 2);
    },

    // Returns a deterministic PRNG seeded with an integer.
    seeded(seed = 1) {
      let a = (seed >>> 0) || 1;
      return function () {
        a |= 0;
        a = (a + 0x6D2B79F5) | 0;
        let x = Math.imul(a ^ (a >>> 15), 1 | a);
        x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
        return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
      };
    },

    // Entry descriptor, consumed by components that want uniform motion.
    enter(t, start, dur, opts = {}) {
      const p = this.progress(t, start, dur, opts.ease || 'outQuint');
      return {
        p,
        alpha: p,
        x: (opts.x || 0) * (1 - p),
        y: (opts.y || 0) * (1 - p),
        scale: opts.scaleFrom === undefined ? 1 : this.lerp(opts.scaleFrom, 1, p),
        rot: (opts.rotFrom || 0) * (1 - p)
      };
    },

    // Exit descriptor. Returns zeroed values before the exit window.
    exit(t, start, dur, opts = {}) {
      const p = this.progress(t, start, dur, opts.ease || 'outCubic');
      return {
        p,
        alpha: 1 - p,
        x: (opts.x || 0) * p,
        y: (opts.y || 0) * p,
        scale: opts.scaleTo === undefined ? 1 : this.lerp(1, opts.scaleTo, p)
      };
    },

    // Scene-level fade in/out that never overshoots.
    envelope(t, duration, opts = {}) {
      const inDur = opts.inDur === undefined ? 0.18 : opts.inDur;
      const outDur = opts.outDur === undefined ? 0.26 : opts.outDur;
      const inP = this.progress(t, 0, inDur, opts.inEase || 'outCubic');
      const outP = this.progress(t, Math.max(0, duration - outDur), outDur, opts.outEase || 'outCubic');
      return { alpha: this.clamp01(inP * (1 - outP)), inP, outP };
    },

    // Text layout split by words so components can stagger reveals.
    layoutWords(ctx, text, font, align, anchorX) {
      ctx.save();
      ctx.font = font;
      ctx.textAlign = 'left';
      const raw = String(text === undefined || text === null ? '' : text).trim();
      const words = raw.length ? raw.split(/\s+/) : [];
      const spaceW = ctx.measureText(' ').width;
      const items = [];
      let total = 0;
      for (let i = 0; i < words.length; i++) {
        const w = ctx.measureText(words[i]).width;
        items.push({ text: words[i], width: w });
        total += w + (i < words.length - 1 ? spaceW : 0);
      }
      let x = align === 'center' ? anchorX - total / 2 : align === 'right' ? anchorX - total : anchorX;
      for (let i = 0; i < items.length; i++) {
        items[i].x = x;
        x += items[i].width + spaceW;
      }
      ctx.restore();
      return { width: total, words: items, spaceWidth: spaceW };
    },

    // Draws a word-staggered line. `anchorY` is the text baseline.
    drawWords(ctx, layout, opts = {}) {
      const t = opts.t || 0;
      const start = opts.start === undefined ? 0 : opts.start;
      const stagger = opts.stagger === undefined ? 0.055 : opts.stagger;
      const dur = opts.dur === undefined ? 0.24 : opts.dur;
      const rise = opts.rise === undefined ? 26 : opts.rise;
      const alpha = opts.alpha === undefined ? 1 : opts.alpha;
      const anchorY = opts.anchorY || 0;
      ctx.save();
      ctx.textAlign = 'left';
      ctx.font = opts.font;
      for (let i = 0; i < layout.words.length; i++) {
        const w = layout.words[i];
        const p = this.progress(t, start + i * stagger, dur, opts.ease || 'outQuint');
        if (p <= 0) continue;
        const dy = (1 - p) * rise;
        ctx.save();
        ctx.globalAlpha = ctx.globalAlpha * alpha * p;
        if (opts.shadowColor) {
          ctx.fillStyle = opts.shadowColor;
          ctx.fillText(w.text, w.x, anchorY + dy + (opts.shadowOffsetY || 0));
        }
        ctx.fillStyle = opts.color || '#ffffff';
        ctx.fillText(w.text, w.x, anchorY + dy);
        ctx.restore();
      }
      ctx.restore();
      return this.progress(t, start, dur + Math.max(0, layout.words.length - 1) * stagger, 'linear');
    },

    // Canvas path primitives used by several components.
    dashedLine(ctx, x1, y1, x2, y2, p, color, width = 1.5) {
      const q = this.clamp01(p);
      if (q <= 0) return;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(this.lerp(x1, x2, q), this.lerp(y1, y2, q));
      ctx.stroke();
      ctx.restore();
    },

    // Draws a polyline progressively (length-accurate).
    strokePath(ctx, points, p, color, width = 1.5, dash) {
      const q = this.clamp01(p);
      if (q <= 0 || !points || points.length < 2) return;
      let total = 0;
      const segs = [];
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        const len = Math.hypot(b.x - a.x, b.y - a.y);
        segs.push({ a, b, len });
        total += len;
      }
      let remaining = total * q;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      if (dash) ctx.setLineDash(dash);
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < segs.length; i++) {
        const s = segs[i];
        if (remaining >= s.len) {
          ctx.lineTo(s.b.x, s.b.y);
          remaining -= s.len;
        } else if (remaining > 0) {
          const r = remaining / s.len;
          ctx.lineTo(this.lerp(s.a.x, s.b.x, r), this.lerp(s.a.y, s.b.y, r));
          remaining = 0;
          break;
        } else {
          break;
        }
      }
      ctx.stroke();
      ctx.restore();
    },

    // Returns the point at normalized position p along a polyline.
    pointOnPath(points, p) {
      if (!points || points.length === 0) return { x: 0, y: 0 };
      if (points.length === 1) return { x: points[0].x, y: points[0].y };
      const total = this.pathLength(points);
      let remaining = this.clamp01(p) * total;
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        const len = Math.hypot(b.x - a.x, b.y - a.y);
        if (remaining <= len) {
          const r = len === 0 ? 0 : remaining / len;
          return { x: this.lerp(a.x, b.x, r), y: this.lerp(a.y, b.y, r) };
        }
        remaining -= len;
      }
      return { x: points[points.length - 1].x, y: points[points.length - 1].y };
    },

    pathLength(points) {
      let total = 0;
      for (let i = 1; i < (points || []).length; i++) {
        total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
      }
      return total;
    },

    // Progressive arc (angles in radians).
    arc(ctx, cx, cy, radius, startAngle, endAngle, p, color, width = 3) {
      const q = this.clamp01(p);
      if (q <= 0) return;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, this.lerp(startAngle, endAngle, q));
      ctx.stroke();
      ctx.restore();
    },

    // Draws an L-shaped bracket (mechanical framing element).
    bracket(ctx, x, y, w, h, corner, color, width = 2, arm = 22) {
      const hx = corner.indexOf('r') >= 0;
      const hy = corner.indexOf('b') >= 0;
      const ax = hx ? x + w : x;
      const ay = hy ? y + h : y;
      const armX = hx ? ax - arm : ax + arm;
      const armY = hy ? ay - arm : ay + arm;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(armX, ay);
      ctx.lineTo(ax, ay);
      ctx.lineTo(ax, armY);
      ctx.stroke();
      ctx.restore();
    }
  };

  MC.easeOut = MC.ease.outCubic;
  window.MotionCore = MC;
})();
