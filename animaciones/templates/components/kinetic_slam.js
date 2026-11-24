// Component: kinetic_slam
// High-Contrast Editorial Kinetic Typography Hook (Zero AI-Slop).
// Beat 1  (0.00s): headline slams in, first word visible on frame 0.
// Beat 2  (0.10s): word-by-word reveal + highlight box wipe.
// Beat 3  (0.40s): strike / underline secondary beat.
// Beat 4  (0.45s): stat panel reveals, discrete slots fill on a second hit.
// Exit    (end-0.30s): deliberate slide + accent shutter.
// Text layout is dynamic: 5+ lines, long words and long stats fit, wrap or
// ellipsize without crossing the panel or canvas safe area.

window.registerComponent('kinetic_slam', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-kinetic-slam">
        <canvas id="ksCanvas" width="960" height="1360"></canvas>
        <div class="ks-icon-layer" style="position:absolute; inset:0; pointer-events:none;"></div>
      </div>
    `;
    this.canvas = container.querySelector('#ksCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.iconLayer = container.querySelector('.ks-icon-layer');
    this.icon = null;
    if (props && props.icon && window.SedevIconAnim) {
      this.icon = window.SedevIconAnim.create(this.iconLayer, {
        name: props.icon,
        size: props.iconSize || 104,
        color: props.iconColor || props.accent || '#fbbf24',
        mode: props.iconMode || 'auto',
        left: 796,
        top: 86
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
    ctx.clearRect(0, 0, 960, 1360);

    // Compress the beat clock for short scenes (min 3.6s design timeline).
    const speed = Math.min(1, Math.max(0.45, duration / 3.6));
    const at = (s) => s * speed;
    const exitStart = duration - Math.min(0.3, duration * 0.14);
    const exitDur = Math.min(0.3, duration * 0.14);
    const ex = MC ? MC.progress(t, exitStart, exitDur, 'outCubic') : clamp((t - exitStart) / exitDur, 0, 1);

    ctx.save();
    ctx.globalAlpha = clamp(1 - ex * 1.12, 0, 1);
    ctx.translate(-26 * ex, -12 * ex);

    // 1. Header.
    const badgeP = MC ? MC.progress(t, 0, 0.2, 'outCubic') : 1;
    ctx.textAlign = 'left';
    ctx.globalAlpha *= badgeP;
    ctx.fillStyle = accent;
    ctx.font = '700 16px "JetBrains Mono", monospace';
    mu.fitText(ctx, (props.badge || 'ANÁLISIS TÉCNICO').toUpperCase(), 40, 42, 680, 16, 11, '"JetBrains Mono", monospace', '700');
    ctx.globalAlpha = clamp(1 - ex * 1.12, 0, 1);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#52525b';
    ctx.font = '700 14px "JetBrains Mono", monospace';
    ctx.fillText(String(props.indexLabel || 'SLAM / 01').slice(0, 32), 920, 42);
    ctx.textAlign = 'left';

    const ruleP = MC ? MC.progress(t, 0.02, 0.3, 'outExpo') : 1;
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, 66);
    ctx.lineTo(40 + 880 * ruleP, 66);
    ctx.stroke();

    // 2. Optional animated icon frame (SVG is a DOM layer).
    if (props.icon) {
      const frameP = MC ? MC.progress(t, 0.06, 0.3, 'outQuint') : 1;
      ctx.save();
      ctx.globalAlpha *= frameP;
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(784, 76, 136, 136);
      MC.bracket(ctx, 784, 76, 136, 136, 'tl', accent, 2, 18);
      MC.bracket(ctx, 784, 76, 136, 136, 'tr', accent, 2, 18);
      MC.bracket(ctx, 784, 76, 136, 136, 'bl', accent, 2, 18);
      MC.bracket(ctx, 784, 76, 136, 136, 'br', accent, 2, 18);
      ctx.restore();
    }

    // 3. Headline: dynamic visual-line layout between header and stat panel.
    const lines = (props.lines && props.lines.length ? props.lines : [
      { text: 'EL COSTO OCULTO DE', color: '#ffffff' },
      { text: 'HACERLO A MANO', color: '#ef4444', strike: true },
      { text: 'EN TU OPERACIÓN', highlight: accent, textColor: '#050505' }
    ]).map((l) => Object.assign({}, l, { text: String(l && l.text !== undefined ? l.text : '') }));

    const statY = 728;
    const layout = MC.layoutHeadline(ctx, lines, {
      top: 214,
      bottom: statY - 34,
      maxWidth: 820,
      maxFont: 94,
      minFont: 24,
      anchorX: 480,
      weight: '900',
      fontFamily: '"Plus Jakarta Sans", sans-serif'
    });

    layout.visual.forEach((v, vi) => {
      const line = v.logical;
      const logicalIndex = v.logicalIndex;
      const lineStart = at(-0.06 + logicalIndex * 0.13 + v.chunkIndex * 0.08);
      const ly = v.baseline;
      const fSize = v.fontSize;
      const wordLayout = v.layout;
      const padX = line.highlight ? 28 : 0;
      const boxW = Math.min(880, wordLayout.width + padX * 2);
      const boxH = fSize * 1.16;

      if (line.highlight) {
        const boxP = MC ? MC.progress(t, lineStart + 0.02, 0.24, 'outExpo') : 1;
        if (boxP > 0) {
          const bh = boxH * (0.55 + 0.45 * boxP);
          ctx.fillStyle = line.highlight;
          ctx.fillRect(480 - boxW / 2, ly - boxH * 0.78, boxW * boxP, bh);
          ctx.strokeStyle = '#09090b';
          ctx.lineWidth = 3;
          if (boxP > 0.85) ctx.strokeRect(480 - boxW / 2, ly - boxH * 0.78, boxW, boxH);
        }
      }

      const color = line.highlight ? (line.textColor || '#050505') : (line.color || '#ffffff');
      const font = `900 ${fSize}px "Plus Jakarta Sans", sans-serif`;
      if (MC && wordLayout.words.length) {
        MC.drawWords(ctx, wordLayout, {
          t,
          start: lineStart + (line.highlight ? 0.03 : 0),
          stagger: 0.045,
          dur: 0.22,
          rise: Math.min(28, fSize * 0.32),
          font,
          color,
          shadowColor: line.highlight ? null : '#09090b',
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
        const sp = MC ? MC.progress(t, lineStart + 0.38, 0.18, 'outExpo') : 1;
        if (sp > 0) {
          ctx.fillStyle = line.strikeColor || danger;
          ctx.fillRect(480 - boxW / 2, ly - fSize * 0.29, boxW * sp, Math.max(8, fSize * 0.15));
        }
      } else if (logicalIndex === lines.length - 1 && !line.highlight &&
                 vi === layout.visual.length - 1) {
        const up = MC ? MC.progress(t, lineStart + 0.42, 0.2, 'outExpo') : 1;
        if (up > 0) {
          const uw = Math.min(320, Math.max(120, wordLayout.width * 0.7));
          ctx.fillStyle = line.color || accent;
          ctx.fillRect(480 - uw / 2, ly + fSize * 0.2, uw * up, 7);
        }
      }
    });

    // 4. Stat panel: fitted 2-line stat, safe subtitle and discrete slots.
    const statH = 236;
    const panelP = MC ? MC.progress(t, at(0.44), 0.34, 'outQuint') : 1;
    if (panelP > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(40, statY - 6, 880 * panelP + 8, statH + 12);
      ctx.clip();
      ctx.globalAlpha *= Math.min(1, panelP * 3);

      ctx.fillStyle = '#09090c';
      ctx.strokeStyle = danger;
      ctx.lineWidth = 1.5;
      ctx.fillRect(40, statY, 880, statH);
      ctx.strokeRect(40, statY, 880, statH);
      ctx.fillStyle = danger;
      ctx.fillRect(40, statY, 6, statH);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#fca5a5';
      ctx.font = '800 17px "JetBrains Mono", monospace';
      mu.fitText(ctx, String(props.statLabel || 'IMPACTO EN PRODUCCIÓN').toUpperCase(), 68, statY + 36, 812, 17, 11, '"JetBrains Mono", monospace', '800');

      ctx.fillStyle = '#ffffff';
      mu.fitParagraph(
        ctx,
        String(props.stat || 'CUELLO DE BOTELLA CRÍTICO').toUpperCase(),
        68, statY + 80, 812, 34, 2, 38, 18,
        '"Plus Jakarta Sans", sans-serif', '900'
      );

      const subStr = props.subtitle || 'ARQUITECTURA DE SISTEMAS Y AUTOMATIZACIÓN REAL';
      ctx.fillStyle = '#a1a1aa';
      mu.fitText(ctx, String(subStr), 68, statY + 158, 812, 18, 12, '"JetBrains Mono", monospace', '600');

      const slotsP = MC ? MC.progress(t, at(0.86), 0.52, 'outCubic') : 1;
      const filled = Math.round(slotsP * 12);
      mu.drawDiscreteSlots(ctx, 480, statY + 200, filled, 12, danger, 56, 24, 12);

      const sweep = MC ? MC.progress(t, at(0.95), 0.4, 'inOutCubic') : 1;
      if (sweep > 0 && sweep < 1) {
        ctx.fillStyle = danger;
        ctx.fillRect(40 + 880 * sweep - 4, statY - 2, 8, 6);
      }
      ctx.restore();
    }

    // 5. Beat rail: variable label count, fitted labels.
    const railY = 1074;
    const railP = MC ? MC.progress(t, 0.1, 0.42, 'outExpo') : 1;
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, railY);
    ctx.lineTo(40 + 880 * railP, railY);
    ctx.stroke();

    const beatLabels = (props.beats && props.beats.length ? props.beats : ['IMPACTO', 'TEXTO', 'EVIDENCIA', 'CIERRE']);
    const beatTimes = props.beatTimes || [0, 0.28, 0.6, 0.92];
    const markerP = MC ? MC.progress(t, 0.1, Math.max(0.5, duration - 0.4), 'linear') : clamp(t / duration, 0, 1);
    for (let i = 0; i < beatLabels.length; i++) {
      const bx = beatLabels.length === 1 ? 40 : 40 + 880 * (i / (beatLabels.length - 1));
      const reached = t >= (Number.isFinite(Number(beatTimes[i])) ? Number(beatTimes[i]) : 0) * duration * 0.95;
      ctx.fillStyle = reached ? accent : '#3f3f46';
      ctx.fillRect(bx - 1.5, railY - 7, 3, 14);
      const labelW = Math.min(152, 880 / Math.max(2, beatLabels.length) - 10);
      ctx.textAlign = i === 0 ? 'left' : i === beatLabels.length - 1 ? 'right' : 'center';
      ctx.fillStyle = reached ? '#d4d4d8' : '#52525b';
      ctx.font = '700 13px "JetBrains Mono", monospace';
      mu.fitText(ctx, String(beatLabels[i]).toUpperCase(), bx, railY + 28, labelW, 13, 9, '"JetBrains Mono", monospace', '700');
    }
    const markerX = 40 + 880 * markerP;
    ctx.fillStyle = accent;
    ctx.fillRect(markerX - 5, railY - 6, 10, 12);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#3f3f46';
    ctx.font = '700 13px "JetBrains Mono", monospace';
    ctx.fillText('SEDEV // MOTION', 920, 1160);

    if (ex > 0) {
      ctx.fillStyle = accent;
      ctx.fillRect(40, 1144, 880 * ex, 5);
    }

    ctx.restore();

    if (this.icon) {
      this.icon.update(t, { exitAt: exitStart + 0.02 });
    }
  }
});
