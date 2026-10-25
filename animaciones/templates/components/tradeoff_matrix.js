// Component: tradeoff_matrix
// Side-by-side engineering tradeoff table with metric badges and dimension comparisons.

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
    const subtitle = props.subtitle || 'MONOLITH VS MICROSERVICES IN 2026';

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 34px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 480, 80);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '600 20px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 125);

    const colA = props.colA || 'MODULAR MONOLITH';
    const colB = props.colB || 'MICROSERVICES';

    // Column Headers
    ctx.fillStyle = '#10b981';
    ctx.font = '800 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(colA, 540, 210);

    ctx.fillStyle = '#ef4444';
    ctx.fillText(colB, 780, 210);

    const rows = props.rows || [
      { dim: 'Latencia Interna', a: '< 0.1ms (RAM)', b: '15-40ms (HTTP)', aGood: true },
      { dim: 'Despliegue & CI/CD', a: '1 Solo Binario', b: '12 Pipelines K8s', aGood: true },
      { dim: 'Transacciones', a: 'ACID Nativas', b: 'Saga Pattern Complejo', aGood: true },
      { dim: 'Coste Servidores', a: '$150/mes (VPS)', b: '$4,200/mes (AWS)', aGood: true },
      { dim: 'Contexto para AI', a: 'Repositorio Completo', b: 'Contexto Fragmentado', aGood: true }
    ];

    const startY = 270;
    const rowH = 115;

    rows.forEach((row, idx) => {
      const ry = startY + idx * rowH;
      const s = spring(Math.max(0, t - idx * 0.08), 22, 0.75);

      ctx.save();
      ctx.translate(480, ry);
      ctx.scale(s, s);

      // Row background
      ctx.fillStyle = idx % 2 === 0 ? '#18181b' : '#101014';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-400, -45, 800, 90, 12);
      ctx.fill();
      ctx.stroke();

      // Dimension Name (Left)
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(row.dim, -370, 6);

      // Column A Value
      ctx.textAlign = 'center';
      ctx.fillStyle = row.aGood ? '#34d399' : '#f87171';
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.fillText(row.a, 60, 6);

      // Column B Value
      ctx.fillStyle = !row.aGood ? '#34d399' : '#f87171';
      ctx.fillText(row.b, 300, 6);

      ctx.restore();
    });

    // Bottom conclusion
    const bAlpha = clamp((t - 0.45) / 0.3, 0, 1);
    if (bAlpha > 0) {
      ctx.globalAlpha = bAlpha * exitAlpha;
      ctx.fillStyle = '#101014';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(80, 890, 800, 160, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fbbf24';
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(props.verdictBadge || 'VEREDICTO DE ARQUITECTURA', 120, 940);

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 21px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(props.verdictText || 'Microservicios solo cuando equipos independientes necesitan aislar deploys.', 120, 985);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 17px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(props.verdictSub || 'Para todo lo demás, el Monolito Modular reduce costes y acelera entrega.', 120, 1018);
    }

    // CTA Banner Slot (Optional props.cta)
    if (props.cta) {
      const ctaAlpha = clamp((t - 0.5) / 0.25, 0, 1);
      ctx.globalAlpha = ctaAlpha * exitAlpha;
      ctx.fillStyle = '#18181b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(80, 1075, 800, 110, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 15px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(props.cta.badge || 'AUDITORÍA TÉCNICA // SEDEV', 110, 1115);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 19px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(props.cta.text || '¿Dudas con tu arquitectura? Enlace en mi perfil para agendar una sesión.', 110, 1150);
    }

    ctx.restore();
  }
});
