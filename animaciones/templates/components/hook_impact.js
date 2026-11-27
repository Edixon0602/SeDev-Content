// Component: hook_impact
// High-impact 3.5–5s vertical hook. Composition, not decoration:
//   beat 1 (0.00s)  accent kicker wipe + headline slam
//   beat 2 (0.10s)  word-staggered headline + highlight box
//   beat 3 (0.44s)  metric card border draws on, animated vector icon enters
//   beat 4 (0.80s)  numeric counter, signal bars, proof ticks
//   exit            accent shutter + content slide
// Text layout is dynamic: 5+ lines, long words, long metrics and extra tags
// wrap, fit or ellipsize without leaving the canvas or covering the card.

window.registerComponent('hook_impact', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-hook-impact">
        <canvas id="hiCanvas" width="960" height="1360"></canvas>
        <div class="hi-icon-layer" style="position:absolute; inset:0; pointer-events:none;"></div>
      </div>
    `;
    this.canvas = container.querySelector('#hiCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.iconLayer = container.querySelector('.hi-icon-layer');
    this.icon = null;
    if (props && props.icon && window.SedevIconAnim) {
      this.icon = window.SedevIconAnim.create(this.iconLayer, {
        name: props.icon,
        size: 126,
        color: props.iconColor || props.accent || '#fbbf24',
        mode: props.iconMode || 'auto',
        start: 0.44,
        left: 85,
        top: 748
      });
    }
  },

  render(container, t, duration, props, utils) {
    const { clamp } = utils;
    const MC = window.MotionCore;
    const mu = window.motionUtils;
    const ctx = this.ctx;
    props = props && typeof props === 'object' ? props : {};
    duration = Number.isFinite(Number(duration)) && Number(duration) > 0 ? Number(duration) : 5;
    t = Number.isFinite(Number(t)) ? Number(t) : 0;
    const accent = props.accent || '#fbbf24';
    const danger = props.danger || '#ef4444';
    const editorial = props.editorial === true;
    const isIvory = props.ground === 'ivory';
    const pal = isIvory ? {
      ink: '#171614',
      muted: '#5f5a52',
      subtle: '#8a8275',
      cardBg: '#f6f2ea',
      border: '#cfc7b8',
      tagBg: '#e5ded1',
      textShadow: null
    } : {
      ink: '#ffffff',
      muted: '#d4d4d8',
      subtle: '#52525b',
      cardBg: '#09090c',
      border: '#3f3f46',
      tagBg: '#27272a',
      textShadow: '#09090b'
    };
    const speed = Math.min(1, Math.max(0.45, duration / 4.0));
    const at = (s) => s * speed;
    ctx.clearRect(0, 0, 960, 1360);

    const exitStart = duration - Math.min(0.3, duration * 0.14);
    const exitDur = Math.min(0.3, duration * 0.14);
    const ex = MC ? MC.progress(t, exitStart, exitDur, 'outCubic') : clamp((t - exitStart) / exitDur, 0, 1);

    ctx.save();
    ctx.globalAlpha = clamp(1 - ex * 1.12, 0, 1);
    ctx.translate(-30 * ex, -14 * ex);

    // --- Header -----------------------------------------------------------
    const headP = MC ? MC.progress(t, 0, 0.2, 'outCubic') : 1;
    const badgeText = editorial ? String(props.badge || '').trim() : (props.badge || 'TELEMETRÍA // SEDEV');
    const indexText = editorial ? String(props.indexLabel || '').trim() : String(props.indexLabel || '01 / SIGNAL');
    if (badgeText || indexText) {
      ctx.save();
      ctx.globalAlpha *= headP;
      if (badgeText) {
        ctx.textAlign = 'left';
        ctx.fillStyle = accent;
        ctx.font = '700 16px "JetBrains Mono", monospace';
        mu.fitText(ctx, badgeText.toUpperCase(), 40, 42, 660, 16, 11, '"JetBrains Mono", monospace', '700');
      }
      if (indexText) {
        ctx.textAlign = 'right';
        ctx.fillStyle = pal.subtle;
        ctx.font = '700 14px "JetBrains Mono", monospace';
        ctx.fillText(indexText.slice(0, 32), 920, 42);
      }
      ctx.restore();
    }

    const ruleP = MC ? MC.progress(t, 0.02, 0.28, 'outExpo') : 1;
    ctx.strokeStyle = pal.border;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, 64);
    ctx.lineTo(40 + 880 * ruleP, 64);
    ctx.stroke();

    // --- Composition frame (skipped in clean editorial mode) --------------
    const frameP = !editorial && MC ? MC.progress(t, 0.06, 0.4, 'outQuint') : 0;
    if (frameP > 0) {
      ctx.save();
      ctx.globalAlpha *= frameP;
      const ax = 40, ay = 110, bx = 920, by = 1200;
      MC.bracket(ctx, ax, ay, bx - ax, by - ay, 'tl', '#27272a', 1.5, 22);
      MC.bracket(ctx, ax, ay, bx - ax, by - ay, 'tr', '#27272a', 1.5, 22);
      MC.bracket(ctx, ax, ay, bx - ax, by - ay, 'bl', '#27272a', 1.5, 22);
      MC.bracket(ctx, ax, ay, bx - ax, by - ay, 'br', '#27272a', 1.5, 22);
      ctx.restore();
    }

    // --- Kicker wipe ------------------------------------------------------
    const kicker = String(props.kicker || props.subtitle || 'IMPACTO DIRECTO').toUpperCase();
    const barP = MC ? MC.progress(t, 0.03, 0.22, 'outExpo') : 1;
    if (barP > 0) {
      ctx.fillStyle = accent;
      ctx.fillRect(40, 128, 6, 50 * barP);
    }
    const kickerWipe = MC ? MC.progress(t, 0.07, 0.3, 'outExpo') : 1;
    if (kickerWipe > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(64, 128, 760 * kickerWipe, 56);
      ctx.clip();
      ctx.textAlign = 'left';
      ctx.fillStyle = pal.muted;
      ctx.font = '700 26px "JetBrains Mono", monospace';
      mu.fitText(ctx, kicker, 64, 166, 750, 26, 14, '"JetBrains Mono", monospace', '700');
      ctx.restore();
    }

    // --- Headline ---------------------------------------------------------
    const lines = (props.lines && props.lines.length ? props.lines : [
      { text: '3 HORAS', color: '#ffffff' },
      { text: 'POR FACTURA', highlight: accent, textColor: '#050505' }
    ]).map((l) => Object.assign({}, l, { text: String(l && l.text !== undefined ? l.text : '') }));

    const cardY = 716;
    const layout = MC.layoutHeadline(ctx, lines, {
      top: 208,
      bottom: cardY - 28,
      maxWidth: 820,
      maxFont: 104,
      minFont: 24,
      anchorX: 480,
      weight: '900',
      fontFamily: '"Plus Jakarta Sans", sans-serif'
    });

    layout.visual.forEach((v, vi) => {
      const line = v.logical;
      const logicalIndex = v.logicalIndex;
      const lineStart = at(-0.05 + logicalIndex * 0.13 + v.chunkIndex * 0.08);
      const ly = v.baseline;
      const fSize = v.fontSize;
      const wordLayout = v.layout;
      const padX = line.highlight ? 28 : 0;
      const boxW = Math.min(880, wordLayout.width + padX * 2);
      const boxH = fSize * 1.16;

      if (line.highlight) {
        const boxP = MC ? MC.progress(t, lineStart + 0.02, 0.24, 'outExpo') : 1;
        if (boxP > 0) {
          ctx.fillStyle = line.highlight;
          ctx.fillRect(480 - boxW / 2, ly - boxH * 0.78, boxW * boxP, boxH * (0.6 + 0.4 * boxP));
          ctx.strokeStyle = '#09090b';
          ctx.lineWidth = 3;
          if (boxP > 0.85) ctx.strokeRect(480 - boxW / 2, ly - boxH * 0.78, boxW, boxH);
        }
      }

      const color = line.highlight ? (line.textColor || '#050505') : (line.color || pal.ink);
      const font = `900 ${fSize}px "Plus Jakarta Sans", sans-serif`;
      if (MC && wordLayout.words.length) {
        MC.drawWords(ctx, wordLayout, {
          t,
          start: lineStart + (line.highlight ? 0.03 : 0),
          stagger: 0.05,
          dur: 0.23,
          rise: Math.min(32, fSize * 0.34),
          font,
          color,
          shadowColor: line.highlight ? null : pal.textShadow,
          shadowOffsetY: Math.max(3, fSize * 0.07),
          anchorY: ly
        });
      } else {
        ctx.textAlign = 'center';
        ctx.fillStyle = color;
        ctx.font = font;
        ctx.fillText(v.text, 480, ly);
      }

      if (line.strike) {
        const sp = MC ? MC.progress(t, lineStart + 0.4, 0.18, 'outExpo') : 1;
        if (sp > 0) {
          ctx.fillStyle = line.strikeColor || danger;
          ctx.fillRect(480 - boxW / 2, ly - fSize * 0.29, boxW * sp, Math.max(8, fSize * 0.15));
        }
      }
    });

    // --- Left measure rule ------------------------------------------------
    const measureP = MC ? MC.progress(t, 0.12, 0.46, 'outCubic') : 1;
    if (measureP > 0) {
      ctx.save();
      ctx.globalAlpha *= 0.85;
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(40, 286);
      ctx.lineTo(40, 286 + 330 * measureP);
      ctx.stroke();
      for (let i = 0; i < 3; i++) {
        const ty = 300 + i * 100;
        const tp = MC ? MC.progress(t, 0.24 + i * 0.09, 0.2, 'outCubic') : 1;
        if (tp <= 0) continue;
        ctx.fillStyle = i === 2 ? accent : '#52525b';
        ctx.fillRect(34, ty, 12 * tp, 3);
      }
      ctx.restore();
    }

    // --- Metric card ------------------------------------------------------
    const cardX = 40, cardW = 880, cardH = 226;
    const cardP = MC ? MC.progress(t, at(0.44), 0.4, 'outQuint') : 1;
    if (cardP > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(cardX - 2, cardY - 4, cardW * cardP + 4, cardH + 8);
      ctx.clip();

      ctx.fillStyle = pal.cardBg;
      ctx.fillRect(cardX, cardY, cardW, cardH);
      MC.strokePath(ctx, [
        { x: cardX, y: cardY },
        { x: cardX + cardW, y: cardY },
        { x: cardX + cardW, y: cardY + cardH },
        { x: cardX, y: cardY + cardH },
        { x: cardX, y: cardY }
      ], cardP, pal.border, 1.5);
      ctx.fillStyle = accent;
      ctx.fillRect(cardX, cardY, 6, cardH * cardP);

      const ringP = MC ? MC.progress(t, at(0.68), 0.5, 'outCubic') : 1;
      if (props.icon) {
        ctx.strokeStyle = pal.border;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(72, 735, 152, 152);
        if (ringP > 0) {
          MC.arc(ctx, 148, 811, 86, -Math.PI * 0.5, -Math.PI * 0.5 + Math.PI * 2, ringP, accent, 2);
          ctx.fillStyle = accent;
          const ang = -Math.PI * 0.5 + Math.PI * 2 * ringP;
          ctx.fillRect(148 + Math.cos(ang) * 86 - 4, 811 + Math.sin(ang) * 86 - 4, 8, 8);
        }
      }

      const metric = props.metric || { from: 0, value: 3, suffix: 'H', label: 'TIEMPO MANUAL POR FACTURA' };
      const countP = MC ? MC.progress(t, at(0.8), 0.65, 'outExpo') : 1;
      if (countP > 0) {
        const from = Number.isFinite(Number(metric.from)) ? Number(metric.from) : 0;
        const value = Number.isFinite(Number(metric.value)) ? Number(metric.value) : 3;
        const shown = from + (value - from) * countP;
        const decimals = Number.isFinite(Number(metric.decimals)) ? Number(metric.decimals) : 0;
        let num = decimals ? shown.toFixed(decimals) : String(Math.round(shown));
        if (metric.thousands) num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        ctx.textAlign = 'left';
        ctx.fillStyle = pal.ink;
        ctx.font = '900 66px "JetBrains Mono", monospace';
        mu.fitText(ctx, `${metric.prefix || ''}${num}${metric.suffix || ''}`, 266, 812, 370, 66, 30, '"JetBrains Mono", monospace', '900');

        ctx.fillStyle = pal.muted;
        ctx.font = '600 16px "JetBrains Mono", monospace';
        mu.fitText(ctx, String(metric.label || '').toUpperCase(), 270, 850, 380, 16, 11, '"JetBrains Mono", monospace', '600');
      }

      if (!editorial) {
        const barBase = 900;
        for (let i = 0; i < 5; i++) {
          const bp = MC ? MC.progress(t, at(1.06 + i * 0.07), 0.22, 'outQuint') : 1;
          const bh = (34 + i * 16) * bp;
          ctx.fillStyle = i === 4 ? accent : '#52525b';
          ctx.fillRect(700 + i * 36, barBase - bh, 18, bh);
        }
        ctx.textAlign = 'right';
        ctx.fillStyle = '#52525b';
        ctx.font = '700 12px "JetBrains Mono", monospace';
        ctx.fillText('SEÑAL / 05', 880, 924);
      }

      const sweep = MC ? MC.progress(t, at(1.2), 0.36, 'inOutCubic') : 1;
      if (sweep > 0 && sweep < 1) {
        ctx.fillStyle = accent;
        ctx.fillRect(cardX + cardW * sweep - 4, cardY - 2, 8, 6);
      }
      ctx.restore();
    }

    // --- Support note -----------------------------------------------------
    const note = String(props.note || 'Un webhook de 400 ms reemplaza la tarea completa.');
    const noteP = MC ? MC.progress(t, at(0.95), 0.32, 'outQuint') : 1;
    if (noteP > 0) {
      ctx.save();
      ctx.globalAlpha *= noteP;
      ctx.translate(0, (1 - noteP) * 12);
      ctx.textAlign = 'left';
      ctx.fillStyle = pal.muted;
      ctx.font = '600 22px "JetBrains Mono", monospace';
      mu.fitParagraph(ctx, note, 40, 1008, 880, 29, 2, 22, 14, '"JetBrains Mono", monospace', '600');
      ctx.restore();
    }

    // --- Proof tags: grid with real fitting (up to 2 rows) ----------------
    let tags = Array.isArray(props.tags) && props.tags.length ? props.tags.map(String) : ['WEBHOOK', 'IDEMPOTENTE', '0 EXCEL'];
    if (tags.length > 8) {
      const extra = tags.length - 7;
      tags = tags.slice(0, 7).concat([`+${extra} MÁS`]);
    }
    const perRow = Math.min(4, Math.max(1, tags.length));
    const rows = Math.ceil(tags.length / perRow);
    const gapX = 10;
    const gapY = 8;
    const tagH = 42;
    const tagW = (880 - gapX * (perRow - 1)) / perRow;
    const tagStartY = 1056;
    for (let i = 0; i < tags.length; i++) {
      const row = Math.floor(i / perRow);
      const col = i % perRow;
      const rowCount = Math.min(perRow, tags.length - row * perRow);
      const rowOffset = (880 - (tagW * rowCount + gapX * (rowCount - 1))) / 2;
      const tp = MC ? MC.progress(t, at(1.15) + row * 0.08 + col * 0.05, 0.24, 'outQuint') : 1;
      if (tp <= 0) continue;
      const tx = 40 + rowOffset + col * (tagW + gapX);
      const ty = tagStartY + row * (tagH + gapY);
      ctx.save();
      ctx.globalAlpha *= tp;
      ctx.fillStyle = pal.tagBg;
      ctx.fillRect(tx, ty, tagW * tp, tagH);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(tx, ty, tagW * tp, tagH);
      ctx.fillStyle = accent;
      ctx.font = '800 14px "JetBrains Mono", monospace';
      ctx.fillText('✓', tx + 12, ty + 27);
      ctx.fillStyle = pal.ink;
      ctx.font = '700 14px "JetBrains Mono", monospace';
      mu.fitText(ctx, tags[i].toUpperCase(), tx + 34, ty + 27, tagW - 46, 14, 9, '"JetBrains Mono", monospace', '700');
      ctx.restore();
    }

    // --- Beat rail (hidden in clean editorial mode unless opted-in) ------
    if (!editorial || props.showBeatRail) {
      const railY = 1176;
      const railP = MC ? MC.progress(t, 0.1, 0.42, 'outExpo') : 1;
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(40, railY);
      ctx.lineTo(40 + 880 * railP, railY);
      ctx.stroke();

      const beatLabels = (props.beats && props.beats.length ? props.beats : ['IMPACTO', 'TEXTO', 'MÉTRICA', 'PRUEBA', 'CIERRE']);
      const beatTimes = props.beatTimes || [0, 0.12, 0.34, 0.6, 0.86];
      const markerP = MC ? MC.progress(t, 0.05, Math.max(0.5, duration - 0.35), 'linear') : clamp(t / duration, 0, 1);
      for (let i = 0; i < beatLabels.length; i++) {
        const bx = beatLabels.length === 1 ? 40 : 40 + 880 * (i / (beatLabels.length - 1));
        const reached = markerP >= (Number.isFinite(Number(beatTimes[i])) ? Number(beatTimes[i]) : 0);
        ctx.fillStyle = reached ? accent : '#3f3f46';
        ctx.fillRect(bx - 1.5, railY - 7, 3, 14);
        const labelW = Math.min(150, 880 / Math.max(2, beatLabels.length) - 8);
        ctx.textAlign = i === 0 ? 'left' : i === beatLabels.length - 1 ? 'right' : 'center';
        ctx.fillStyle = reached ? '#d4d4d8' : '#52525b';
        ctx.font = '700 12px "JetBrains Mono", monospace';
        mu.fitText(ctx, String(beatLabels[i]).toUpperCase(), bx, railY + 26, labelW, 12, 8, '"JetBrains Mono", monospace', '700');
      }
      ctx.fillStyle = accent;
      ctx.fillRect(40 + 880 * markerP - 5, railY - 6, 10, 12);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#3f3f46';
      ctx.font = '700 13px "JetBrains Mono", monospace';
      ctx.fillText('SEDEV // MOTION', 920, 1250);
    }

    if (ex > 0) {
      ctx.fillStyle = accent;
      ctx.fillRect(40, 1234, 880 * ex, 5);
    }
    ctx.restore();

    if (this.icon) {
      this.icon.update(t, { exitAt: exitStart + 0.02 });
    }
  }
});
