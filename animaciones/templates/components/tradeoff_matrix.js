// Component: tradeoff_matrix
// Side-by-side engineering tradeoff table with metric badges and dimension comparisons.
// Zero text overflow, three clean dedicated columns, auto-wrapping text.

window.registerComponent('tradeoff_matrix', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-tradeoff-matrix">
        ${props.header ? `<div class="scene-category" id="matrixHeader">${props.header}</div>` : ''}
        <canvas id="matrixCanvas" width="960" height="1300"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#matrixCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp } = utils;
    const mu = window.motionUtils;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 960, 1300);

    // Hard cut exit
    const exitT = duration - 0.3;
    let exitAlpha = 1;
    let exitY = 0;
    if (t > exitT) {
      const p = (t - exitT) / 0.3;
      exitY = -p * p * 60;
      exitAlpha = clamp(1 - p * 1.3, 0, 1);
    }

    const headerEl = container.querySelector('#matrixHeader');
    if (headerEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      headerEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      headerEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;
    ctx.translate(0, exitY);

    const title = props.title || 'ARCHITECTURAL TRADEOFF MATRIX';
    const subtitle = props.subtitle || 'ANÁLISIS COMPARATIVO DE INGENIERÍA';

    // Auto-fit Title and Subtitle
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    if (mu) {
      mu.fitText(ctx, title, 480, 65, 840, 32, 22, '"Plus Jakarta Sans", sans-serif', '800');
    } else {
      ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(title, 480, 65);
    }

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 17px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 102);

    const colA = props.colA || 'OPCIÓN A (RECOMENDADA)';
    const colB = props.colB || 'OPCIÓN B (CONVENCIONAL)';

    // Column Headers in Table (Y = 175)
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#a1a1aa';
    ctx.fillText('CRITERIO TÉCNICO', 90, 175);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#10b981';
    ctx.fillText(colA, 520, 175);

    ctx.fillStyle = '#ef4444';
    ctx.fillText(colB, 770, 175);

    const rows = props.rows || [
      { dim: 'Latencia Interna', a: '< 0.1ms (RAM)', b: '15-40ms (HTTP)', aGood: true },
      { dim: 'Despliegue & CI/CD', a: '1 Solo Binario', b: '12 Pipelines K8s', aGood: true },
      { dim: 'Transacciones', a: 'ACID Nativas', b: 'Saga Pattern', aGood: true }
    ];

    const startY = 240;
    const rowH = 100;

    rows.forEach((row, idx) => {
      const ry = startY + idx * rowH;
      const s = spring(Math.max(0, t - idx * 0.08), 22, 0.75);

      ctx.save();
      ctx.translate(480, ry);
      ctx.scale(s, s);

      // Row background
      ctx.fillStyle = idx % 2 === 0 ? '#121216' : '#0d0d10';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-410, -42, 820, 84, 12);
      ctx.fill();
      ctx.stroke();

      // Column 1: Dimension Name (Dedicated zone: x = -385 to -140)
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
      if (mu) {
        mu.wrapText(ctx, row.dim, -385, -10, 240, 22, 2);
      } else {
        ctx.fillText(row.dim, -385, 5);
      }

      // Column 2: Option A (Dedicated zone centered at x = 40, width = 230)
      ctx.textAlign = 'center';
      ctx.fillStyle = row.aGood ? '#10b981' : '#f87171';
      ctx.font = '700 14px "JetBrains Mono", monospace';
      if (mu) {
        mu.wrapText(ctx, row.a, 40, -10, 220, 20, 2);
      } else {
        ctx.fillText(row.a, 40, 5);
      }

      // Column 3: Option B (Dedicated zone centered at x = 290, width = 230)
      ctx.fillStyle = !row.aGood ? '#10b981' : '#f87171';
      if (mu) {
        mu.wrapText(ctx, row.b, 290, -10, 220, 20, 2);
      } else {
        ctx.fillText(row.b, 290, 5);
      }

      ctx.restore();
    });

    // Bottom Conclusion / CTA
    const bAlpha = clamp((t - 0.45) / 0.3, 0, 1);
    if (bAlpha > 0) {
      ctx.globalAlpha = bAlpha * exitAlpha;
      ctx.fillStyle = '#111116';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(70, 830, 820, 210, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 14px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      const ctaBadge = (props.cta && props.cta.badge) || 'DECISIÓN ARQUITECTÓNICA BASADA EN DATOS';
      ctx.fillText(ctaBadge, 105, 875);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
      const ctaTitle = (props.cta && props.cta.text) || 'Elige la simplicidad antes de que la complejidad sature a tu equipo.';
      if (mu) {
        mu.wrapText(ctx, ctaTitle, 105, 915, 750, 30, 3);
      } else {
        ctx.fillText(ctaTitle, 105, 915);
      }

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 15px "JetBrains Mono", monospace';
      ctx.fillText('Agenda tu sesión de auditoría técnica en el enlace del perfil.', 105, 995);
    }

    ctx.restore();
  }
});
