// Component: kinetic_hook
// Editorial Engineering Takeaway & Soft-Pull CTA ("Vender sin Vender").
// Renders crisp vector typography, discrete diagnostic CTA box, and synchronized captions.

window.registerComponent('kinetic_hook', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-kinetic-hook">
        <canvas id="khCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#khCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp } = utils;
    const mu = window.motionUtils;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 960, 1360);

    const exitT = duration - 0.25;
    let exitAlpha = 1;
    if (t > exitT) {
      exitAlpha = clamp(1 - ((t - exitT) / 0.25) * 1.4, 0, 1);
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;

    const badge = (props.header || props.boxBadge || props.badge || 'CRITERIO DE INGENIERÍA // SEDEV').toUpperCase();
    const accent = props.accent || '#10b981';

    // 1. Clean Header
    ctx.textAlign = 'left';
    ctx.fillStyle = accent;
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText(badge, 40, 42);

    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, 68);
    ctx.lineTo(920, 68);
    ctx.stroke();

    // 2. Main Editorial Lines
    const lines = props.lines || [
      { text: 'MENOS PARCHES MANUALES', color: '#ffffff' },
      { text: 'MÁS INGENIERÍA PROPIA', color: accent }
    ];

    const startY = 250;
    const lineStep = 140;

    lines.forEach((line, idx) => {
      const startT = 0.08 + idx * 0.14;
      if (t < startT) return;
      const s = spring(t - startT, 24, 0.7);
      const ly = startY + idx * lineStep;

      ctx.save();
      ctx.translate(480, ly);
      ctx.scale(s, s);

      ctx.textAlign = 'center';
      ctx.fillStyle = line.color || (idx === 0 ? '#ffffff' : accent);
      if (mu) {
        mu.fitText(ctx, String(line.text || '').toUpperCase(), 0, 0, 860, 82, 36, '"Plus Jakarta Sans", sans-serif', '900');
      }
      ctx.restore();
    });

    // 3. Contextual Telemetry Box OR Explicit DM CTA Box (never force out-of-context DM spam)
    const isExplicitDmCta = Boolean(props.ctaKeyword || props.ctaNote || (!props.lines && !props.subtitle));
    const ctaY = 580;
    const ctaH = 390;
    const ctaS = spring(Math.max(0, t - 0.35), 22, 0.72);

    ctx.save();
    ctx.translate(480, ctaY + ctaH / 2);
    ctx.scale(ctaS, ctaS);
    ctx.translate(-480, -(ctaY + ctaH / 2));

    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.5;
    ctx.fillRect(40, ctaY, 880, ctaH);
    ctx.strokeRect(40, ctaY, 880, ctaH);

    ctx.fillStyle = accent;
    ctx.fillRect(40, ctaY, 6, ctaH);

    // Top row inside Box
    ctx.textAlign = 'left';
    ctx.fillStyle = accent;
    ctx.font = '800 18px "JetBrains Mono", monospace';
    const boxBadge = isExplicitDmCta
      ? 'DIAGNÓSTICO TÉCNICO DIRECTO'
      : String(props.boxBadge || 'IMPACTO MEDIDO EN PRODUCCIÓN').toUpperCase();
    ctx.fillText(boxBadge, 72, ctaY + 48);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#71717a';
    ctx.fillText(String(props.boxTag || 'SEDEV // TELEMETRY').toUpperCase(), 892, ctaY + 48);

    // Subtitle / Engineering headline inside card
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    const subText = props.subtitle || 'ARQUITECTURA A MEDIDA · AUTOMATIZACIÓN · IA CONECTADA';
    if (mu) {
      mu.fitText(ctx, String(subText).toUpperCase(), 72, ctaY + 112, 816, 30, 18, '"Plus Jakarta Sans", sans-serif', '800');
    }

    if (isExplicitDmCta) {
      const kw = props.ctaKeyword || 'AUDITORÍA';
      const ctaNote = props.ctaNote || '¿Tienes este cuello de botella en tu operación? Lo revisamos por mensaje privado.';

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 21px "JetBrains Mono", monospace';
      if (mu) {
        mu.wrapText(ctx, ctaNote, 72, ctaY + 168, 816, 32, 2);
      }

      const pillY = ctaY + 260;
      const pillW = 816;
      const pillH = 88;
      ctx.fillStyle = accent;
      ctx.fillRect(72, pillY, pillW, pillH);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#050505';
      ctx.font = '900 26px "JetBrains Mono", monospace';
      ctx.fillText(`▶ DM / COMENTA: "${kw}"`, 104, pillY + 54);

      ctx.textAlign = 'right';
      ctx.font = '800 18px "JetBrains Mono", monospace';
      ctx.fillText('RESPUESTA TÉCNICA 1:1 →', 856, pillY + 52);
    } else {
      const detailText = props.detail || props.voiceover || 'Cada cifra expuesta corresponde a un evento medido en producción.';
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 21px "JetBrains Mono", monospace';
      if (mu) {
        mu.wrapText(ctx, detailText, 72, ctaY + 168, 816, 32, 2);
      }

      const pillY = ctaY + 260;
      const pillW = 816;
      const pillH = 88;
      ctx.fillStyle = '#111116';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.fillRect(72, pillY, pillW, pillH);
      ctx.strokeRect(72, pillY, pillW, pillH);

      ctx.fillStyle = accent;
      ctx.fillRect(72, pillY, 8, pillH);

      const footerText = String(props.footerText || subText || badge).toUpperCase();
      ctx.textAlign = 'left';
      ctx.fillStyle = '#f2ede4';
      ctx.font = '800 22px "JetBrains Mono", monospace';
      ctx.fillText(footerText.slice(0, 38), 104, pillY + 53);

      ctx.textAlign = 'right';
      ctx.fillStyle = accent;
      ctx.font = '800 18px "JetBrains Mono", monospace';
      ctx.fillText(String(props.statusText || 'DATO VERIFICADO').toUpperCase(), 856, pillY + 52);
    }

    ctx.restore();

    // 4. Synchronized Word-by-Word Caption Bar
    const vo = props.voiceover || '';
    if (mu && mu.drawSyncCaption) {
      mu.drawSyncCaption(ctx, vo, t, duration, { accent });
    }

    ctx.restore();
  }
});
