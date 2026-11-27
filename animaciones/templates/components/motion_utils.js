// Central Motion Graphics Utilities, Mechanical Primitives & Synchronized Caption Engine
// Strictly enforces Zero AI-Slop (matte #050505 background, crisp 1.5px vector lines,
// discrete mechanical motion, and real-time word-by-word synchronized captions).

(function() {
  const motionUtils = {
    // 1. Text wrapping with hard character breaks, max lines and ellipsis.
    // Never draws a line wider than maxWidth (even for single long words).
    wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
      const MC = window.MotionCore;
      if (!text) return y;
      const raw = String(text);
      const lines = MC
        ? MC.splitTextToWidth(ctx, raw, maxWidth)
        : [raw];
      const maxL = Math.max(1, maxLines | 0);
      let out = lines;
      if (lines.length > maxL) {
        out = lines.slice(0, maxL);
        const rest = lines.slice(maxL - 1).join(' ');
        out[maxL - 1] = MC ? MC.ellipsizeText(ctx, rest, maxWidth) : rest;
      }
      let currentY = y;
      for (let i = 0; i < out.length; i++) {
        ctx.fillText(out[i], x, currentY);
        currentY += lineHeight;
      }
      return currentY;
    },

    // 2. Dynamic Auto-Fitting Font Size (never overflows title bounds).
    fitText(ctx, text, x, y, maxWidth, maxFontSize, minFontSize, fontStack, weight = '800') {
      if (!text) return 0;
      const MC = window.MotionCore;
      const raw = String(text);
      const limit = Number.isFinite(Number(maxWidth)) ? Number(maxWidth) : 0;
      let size = Number.isFinite(Number(maxFontSize)) ? Number(maxFontSize) : 24;
      const minSize = Number.isFinite(Number(minFontSize)) ? Number(minFontSize) : 12;
      ctx.font = `${weight} ${size}px ${fontStack}`;
      while (ctx.measureText(raw).width > limit && size > minSize) {
        size = Math.max(minSize, size - 2);
        ctx.font = `${weight} ${size}px ${fontStack}`;
      }
      let out = raw;
      if (ctx.measureText(out).width > limit) {
        out = MC ? MC.ellipsizeText(ctx, raw, limit) : raw;
      }
      ctx.fillText(out, x, y);
      return ctx.measureText(out).width;
    },

    // 2b. Multi-line fitted paragraph. Chooses the largest size that fits in
    // maxLines, hard-breaks long words and ellipsizes only as a last resort.
    fitParagraph(ctx, text, x, y, maxWidth, lineHeight, maxLines, maxFontSize, minFontSize, fontStack, weight = '900') {
      const MC = window.MotionCore;
      const raw = String(text === undefined || text === null ? '' : text);
      const limit = Number.isFinite(Number(maxWidth)) ? Number(maxWidth) : 300;
      const linesAllowed = Math.max(1, maxLines | 0);
      const maxSize = Number.isFinite(Number(maxFontSize)) ? Number(maxFontSize) : 40;
      const minSize = Number.isFinite(Number(minFontSize)) ? Number(minFontSize) : 18;
      let size = maxSize;
      let lines = [];
      while (size >= minSize) {
        ctx.font = `${weight} ${size}px ${fontStack}`;
        lines = MC ? MC.splitTextToWidth(ctx, raw, limit) : [raw];
        if (lines.length <= linesAllowed) break;
        size -= 2;
      }
      if (!lines.length) lines = [raw];
      if (lines.length > linesAllowed) {
        lines = lines.slice(0, linesAllowed);
        const rest = lines.slice(linesAllowed - 1).join(' ');
        lines[linesAllowed - 1] = MC ? MC.ellipsizeText(ctx, rest, limit) : rest;
      }
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + i * lineHeight);
      }
      return { lines, size, width: Math.max(...lines.map((l) => ctx.measureText(l).width)) };
    },

    // 3. Clean Technical Backdrops (Zero Watermarks, Zero Fake Labels, Zero Slop)
    renderBackdrop(ctx, width, height, t, meta = {}) {
      const theme = meta.theme || 'dark';
      const ground = meta.ground || '';
      if (ground === 'ivory') {
        ctx.fillStyle = '#ece7dd';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(23, 22, 20, 0.06)';
        ctx.lineWidth = 1;
        const grid = 80;
        for (let x = 0; x < width; x += grid) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += grid) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }
        return;
      }
      if (ground === 'graphite') {
        ctx.fillStyle = '#101012';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(63, 63, 70, 0.18)';
        ctx.lineWidth = 1;
        const grid = 80;
        for (let x = 0; x < width; x += grid) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += grid) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }
        return;
      }
      if (theme === 'light') {
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(203, 213, 225, 0.4)';
        ctx.lineWidth = 1;
        const grid = 64;
        for (let x = 0; x < width; x += grid) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += grid) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }
      } else if (theme === 'blueprint') {
        ctx.fillStyle = '#07111e';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
        ctx.lineWidth = 1;
        const grid = 64;
        for (let x = 0; x < width; x += grid) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += grid) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }
      } else {
        ctx.fillStyle = '#050508';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(39, 39, 42, 0.25)';
        ctx.lineWidth = 1;
        const grid = 80;
        for (let x = 0; x < width; x += grid) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += grid) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }
      }
    },

    // 4. Subtitle Bar Disabled (User adds external subtitles in post-production)
    drawSyncCaption() {},

    // 5. Mechanical Node Primitive (Crisp orthogonal box, 1.5px stroke)
    drawMechanicalNode(ctx, x, y, w, h, label, sublabel, strokeColor = '#ffffff', statusBadge = '') {
      const nx = x - w / 2;
      const ny = y - h / 2;

      ctx.save();
      ctx.fillStyle = '#0a0a0d';
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;
      ctx.fillRect(nx, ny, w, h);
      ctx.strokeRect(nx, ny, w, h);

      // Left status bar
      ctx.fillStyle = strokeColor;
      ctx.fillRect(nx, ny, 6, h);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      const labelY = y - (sublabel ? 6 : -8);
      const badgeSpace = statusBadge ? Math.min(96, Math.max(48, w * 0.24)) : 0;
      const labelMaxW = Math.max(40, w - 48 - badgeSpace);
      ctx.font = '800 22px "JetBrains Mono", monospace';

      let wrappedLabel = null;
      if (ctx.measureText(label).width > labelMaxW && label.indexOf(' ') > 0) {
        const words = label.split(' ');
        let best = null;
        for (let i = 1; i < words.length; i++) {
          const l1 = words.slice(0, i).join(' ');
          const l2 = words.slice(i).join(' ');
          const score = Math.max(ctx.measureText(l1).width, ctx.measureText(l2).width);
          if (!best || score < best.score) best = { l1, l2, score };
        }
        if (best && best.score <= labelMaxW) wrappedLabel = best;
      }

      if (wrappedLabel) {
        ctx.fillText(wrappedLabel.l1, nx + 24, labelY - 12);
        ctx.fillText(wrappedLabel.l2, nx + 24, labelY + 12);
      } else {
        this.fitText(ctx, label, nx + 24, labelY, labelMaxW, 24, 12, '"JetBrains Mono", monospace', '800');
      }

      if (sublabel) {
        ctx.fillStyle = strokeColor === '#ffffff' ? '#a1a1aa' : strokeColor;
        ctx.font = '500 17px "JetBrains Mono", monospace';
        this.fitText(ctx, sublabel, nx + 24, y + (wrappedLabel ? 36 : 24), w - 48, 17, 11, '"JetBrains Mono", monospace', '500');
      }

      if (statusBadge) {
        ctx.textAlign = 'right';
        ctx.fillStyle = strokeColor;
        ctx.font = '700 16px "JetBrains Mono", monospace';
        ctx.fillText(statusBadge, nx + w - 20, y - 6);
      }
      ctx.restore();
    },

    // 6. Discrete Queue Slots Primitive (1/6 .. 6/6 slots)
    drawDiscreteSlots(ctx, x, y, current, max, color = '#ffffff', slotW = 48, slotH = 56, spacing = 10) {
      const totalW = max * slotW + (max - 1) * spacing;
      const startX = x - totalW / 2;
      ctx.save();
      for (let i = 0; i < max; i++) {
        const sx = startX + i * (slotW + spacing);
        ctx.strokeStyle = '#27272a';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(sx, y - slotH / 2, slotW, slotH);
        if (i < current) {
          ctx.fillStyle = color;
          ctx.fillRect(sx + 4, y - slotH / 2 + 4, slotW - 8, slotH - 8);
        }
      }
      ctx.restore();
    },

    // 7. Dynamic Rolling Counter (Eased Number Interpolator)
    counterRoll(startVal, endVal, progress, options = {}) {
      const p = Math.max(0, Math.min(1, progress));
      const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      const current = startVal + (endVal - startVal) * ease;
      const decimals = options.decimals !== undefined ? options.decimals : 0;
      const prefix = options.prefix || '';
      const suffix = options.suffix || '';
      const separator = options.thousandSeparator !== undefined ? options.thousandSeparator : ',';

      const parts = current.toFixed(decimals).split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return `${prefix}${parts.join('.')}${suffix}`;
    },

    // 8. Camera Screen Shake Calculator (for crashes, errors, impact beats)
    getScreenShake(t, triggerTime, duration = 0.35, maxIntensity = 12) {
      const tt = Number.isFinite(Number(t)) ? Number(t) : 0;
      const at = Number.isFinite(Number(triggerTime)) ? Number(triggerTime) : 0;
      const dur = Math.max(0.001, Number.isFinite(Number(duration)) ? Number(duration) : 0.35);
      const maxI = Number.isFinite(Number(maxIntensity)) ? Number(maxIntensity) : 0;
      if (tt < at || tt > at + dur) return { x: 0, y: 0, rot: 0 };
      const elapsed = tt - at;
      const progress = elapsed / dur;
      const decay = Math.exp(-progress * 7.5);
      const freq = 42;
      const x = Math.sin(elapsed * freq) * maxI * decay;
      const y = Math.cos(elapsed * freq * 1.3) * (maxI * 0.6) * decay;
      return { x, y, rot: 0 };
    },

    // 9. No-Op Compatibility Stubs (Neutralizes legacy neon scanlines & sonar rings)
    drawScanline() {},
    drawPulseRing(ctx, cx, cy, t, baseRadius = 10, maxRadius = 24, color = '#ef4444') {
      // Crisp mechanical square indicator instead of blurry sonar ring
      const blink = Math.floor(t * 4) % 2 === 0;
      if (!blink) return;
      ctx.save();
      ctx.strokeStyle = color.includes('rgba') ? '#ef4444' : color;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cx - 14, cy - 14, 28, 28);
      ctx.restore();
    },

    // 10. Intelligent Camera Director (zero nauseating bounce, quantized steps)
    // Narrative modes, all deterministic and clamped to safe framing limits:
    //   steady | push | pull_out | impact | shake_impact | focus_pan | ratchet_push
    // Configurable via props.cameraMode, cameraIntensity, impactTimes/impactTime,
    // focusX/focusY and pushAmount. Legacy props (crashTime) keep working.
    calculateCamera(t, duration, props = {}, sceneType = '') {
      const MC = window.MotionCore;
      const safeT = Number.isFinite(Number(t)) ? Number(t) : 0;
      const safeDuration = Number.isFinite(Number(duration)) && Number(duration) > 0 ? Number(duration) : 5;
      props = props && typeof props === 'object' ? props : {};
      sceneType = typeof sceneType === 'string' ? sceneType : '';
      t = safeT;
      duration = safeDuration;
      const mode = props.cameraMode || (
        sceneType === 'terminal_split' || sceneType === 'code_terminal' || sceneType === 'memory_layout' ? 'steady' :
        sceneType === 'disaster_monitor' ? 'shake_impact' :
        sceneType === 'kinetic_slam' ? 'ratchet_push' :
        'steady'
      );

      const clamp = (v, lo, hi) => {
        const n = Number.isFinite(Number(v)) ? Number(v) : 0;
        return n < lo ? lo : n > hi ? hi : n;
      };
      const finiteNum = (v, fallback) => (Number.isFinite(Number(v)) ? Number(v) : fallback);
      const intensity = clamp(finiteNum(props.cameraIntensity, 1), 0, 1.6);
      const dur = Math.max(0.5, duration || 5);
      let x = 0;
      let y = 0;
      let rot = 0;
      let scale = 1.0;

      if (mode === 'impact' || mode === 'shake_impact') {
        const fallbackBeat = mode === 'shake_impact' ? 1.0 : 0.15;
        const beats = Array.isArray(props.impactTimes)
          ? props.impactTimes
          : [props.impactTime !== undefined ? props.impactTime : (props.crashTime !== undefined ? props.crashTime : fallbackBeat)];
        let punch = 0;
        for (let i = 0; i < beats.length; i++) {
          const at = Number(beats[i]);
          if (!Number.isFinite(at)) continue;
          const sh = this.getScreenShake(t, at, 0.34, 9 * intensity);
          x += sh.x;
          y += sh.y;
          const b = MC ? MC.beat(t, at, 13) : (t >= at ? 1 : 0);
          if (b > punch) punch = b;
        }
        scale += 0.014 * punch * intensity;
      } else if (mode === 'push' || mode === 'push_in') {
        const pr = MC ? MC.progress(t, 0, dur, 'inOutSine') : clamp(t / dur, 0, 1);
        const amount = finiteNum(props.pushAmount, 0.035);
        scale = 1 + amount * intensity * pr;
        y = -10 * intensity * pr;
      } else if (mode === 'pull_out') {
        const pr = MC ? MC.progress(t, 0, dur, 'inOutSine') : clamp(t / dur, 0, 1);
        const amount = finiteNum(props.pushAmount, 0.04);
        scale = 1 + amount * intensity * (1 - pr);
      } else if (mode === 'focus_pan') {
        const pr = MC ? MC.progress(t, 0.08, Math.max(0.6, dur - 0.4), 'inOutCubic') : clamp(t / dur, 0, 1);
        const fx = clamp(props.focusX !== undefined ? props.focusX : 0, -1, 1);
        const fy = clamp(props.focusY !== undefined ? props.focusY : 0, -1, 1);
        x = fx * 26 * intensity * pr;
        y = fy * 34 * intensity * pr;
        scale = 1 + 0.022 * intensity * pr;
      } else if (mode === 'ratchet_push') {
        const steps = Array.isArray(props.ratchetBeats) ? props.ratchetBeats : [0.35, 0.9, 1.5];
        let reached = 0;
        for (let i = 0; i < steps.length; i++) {
          reached += MC ? MC.progress(t, Number(steps[i]), 0.16, 'outCubic') : (t >= steps[i] ? 1 : 0);
        }
        const amount = finiteNum(props.pushAmount, 0.014);
        scale = 1 + Math.min(0.06, reached * amount) * intensity;
      }

      // Safe framing: no visible empty borders, no motion-sickness rotation.
      return {
        x: clamp(x, -48, 48),
        y: clamp(y, -64, 64),
        rot: clamp(rot, -1.5, 1.5),
        scale: clamp(scale, 1.0, 1.12)
      };
    }
  };

  window.motionUtils = motionUtils;
})();
