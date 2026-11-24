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

    const badge = (props.badge || 'CRITERIO DE INGENIERÍA // SEDEV').toUpperCase();

    // 1. Clean Header
    ctx.textAlign = 'left';
    ctx.fillStyle = '#10b981';
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
      { text: 'MÁS INGENIERÍA PROPIA', color: '#10b981' }
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
      ctx.fillStyle = line.color || (idx === 0 ? '#ffffff' : '#10b981');
      if (mu) {
        mu.fitText(ctx, String(line.text || '').toUpperCase(), 0, 0, 860, 82, 36, '"Plus Jakarta Sans", sans-serif', '900');
      }
      ctx.restore();
    });

    // 3. Soft-Pull Diagnostic Action Box ("Vender sin vender") (y = 570..970)
    const ctaY = 580;
    const ctaH = 390;
    const ctaS = spring(Math.max(0, t - 0.35), 22, 0.72);

    ctx.save();
    ctx.translate(480, ctaY + ctaH / 2);
    ctx.scale(ctaS, ctaS);
    ctx.translate(-480, -(ctaY + ctaH / 2));

    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.fillRect(40, ctaY, 880, ctaH);
    ctx.strokeRect(40, ctaY, 880, ctaH);

    ctx.fillStyle = '#10b981';
    ctx.fillRect(40, ctaY, 6, ctaH);

    // Top row inside CTA Box
    ctx.textAlign = 'left';
    ctx.fillStyle = '#10b981';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.fillText('DIAGNÓSTICO TÉCNICO DIRECTO', 72, ctaY + 48);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#71717a';
    ctx.fillText('SEDEV', 892, ctaY + 48);

    // Subtitle / Engineering principle
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    const subText = props.subtitle || 'ARQUITECTURA A MEDIDA · AUTOMATIZACIÓN · IA CONECTADA';
    if (mu) {
      mu.fitText(ctx, subText, 72, ctaY + 112, 816, 30, 18, '"Plus Jakarta Sans", sans-serif', '800');
    }

    // Soft CTA Keyword / Action Pill inside Box
    const kw = props.ctaKeyword || 'AUDITORÍA';
    const ctaNote = props.ctaNote || '¿Tienes este cuello de botella en tu operación? Lo revisamos por mensaje privado.';

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 21px "JetBrains Mono", monospace';
    if (mu) {
      mu.wrapText(ctx, ctaNote, 72, ctaY + 168, 816, 32, 2);
    }

    // Crisp Mechanical Keyword Stamp
    const pillY = ctaY + 260;
    const pillW = 816;
    const pillH = 88;
    ctx.fillStyle = '#10b981';
    ctx.fillRect(72, pillY, pillW, pillH);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#050505';
    ctx.font = '900 26px "JetBrains Mono", monospace';
    ctx.fillText(`▶ DM / COMENTA: "${kw}"`, 104, pillY + 54);

    ctx.textAlign = 'right';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.fillText('RESPUESTA TÉCNICA 1:1 →', 856, pillY + 52);

    ctx.restore();

    // 4. Synchronized Word-by-Word Caption Bar
    const vo = props.voiceover || '';
    if (mu && mu.drawSyncCaption) {
      mu.drawSyncCaption(ctx, vo, t, duration, { accent: '#10b981' });
    }

    ctx.restore();
  }
});
