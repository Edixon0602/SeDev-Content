// Component: tradeoff_matrix
// 3-Column Engineering Decision Matrix & Architectural Benchmark Table.
// Features row-by-row mechanical scanning, strike-through on anti-patterns in Phase 3,
// crisp 1.5px orthogonal borders, and word-by-word synchronized captions.

window.registerComponent('tradeoff_matrix', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-tradeoff-matrix">
        <canvas id="matrixCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#matrixCanvas');
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

    const pRatio = t / duration;
    const isResolved = pRatio >= 0.65;

    const title = (props.title || 'MATRIZ DE DECISIÓN ARQUITECTÓNICA').toUpperCase();
    const subtitle = (props.subtitle || 'COMPARATIVA TÉCNICA EN PRODUCCIÓN').toUpperCase();

    // 1. Clean Header
    ctx.textAlign = 'left';
    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 40, 42);

    ctx.fillStyle = '#ffffff';
    if (mu) {
      mu.fitText(ctx, title, 40, 92, 880, 40, 24, '"Plus Jakarta Sans", sans-serif', '900');
    }

    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, 118);
    ctx.lineTo(920, 118);
    ctx.stroke();

    const colA = (props.colA || 'ARQUITECTURA SEDEV').toUpperCase();
    const colB = (props.colB || 'ENFOQUE TRADICIONAL').toUpperCase();

    // 2. Table Column Header Bar (y = 145..205)
    ctx.fillStyle = '#0d0d12';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.fillRect(40, 145, 880, 60);
    ctx.strokeRect(40, 145, 880, 60);

    ctx.font = '800 15px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#a1a1aa';
    ctx.fillText('DIMENSIÓN TÉCNICA', 64, 181);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#10b981';
    ctx.fillText(`✔ ${colA}`, 495, 181);

    ctx.fillStyle = '#ef4444';
    ctx.fillText(`✖ ${colB}`, 775, 181);

    const rows = props.rows || [
      { dim: 'Latencia entre Módulos', a: '0.01ms (Llamada en RAM)', b: '35ms (HTTP + Serialización)', aGood: true },
      { dim: 'Integridad de Datos', a: 'Transacción ACID Nativa', b: 'Eventual / Sagas Complejas', aGood: true },
      { dim: 'Tiempo de Despliegue', a: '1 Binario en 40 segundos', b: '14 Pipelines CI/CD lentos', aGood: true },
      { dim: 'Costo Operativo Mensual', a: '$24/mes (VPS Dedicado)', b: '$840/mes (Cluster + NAT)', aGood: true }
    ];

    const startY = 225;
    const rowH = 135;
    const activeScanRow = Math.floor((t * 1.8) % rows.length);

    rows.slice(0, 4).forEach((row, idx) => {
      const ry = startY + idx * rowH;
      const s = spring(Math.max(0, t - idx * 0.1), 24, 0.76);
      const isScanned = (idx === activeScanRow);

      ctx.save();
      ctx.translate(480, ry + 56);
      ctx.scale(s, s);
      ctx.translate(-480, -(ry + 56));

      ctx.fillStyle = isScanned ? '#11161d' : '#09090c';
      ctx.strokeStyle = isScanned ? '#38bdf8' : '#27272a';
      ctx.lineWidth = isScanned ? 2 : 1.5;
      ctx.fillRect(40, ry, 880, 116);
      ctx.strokeRect(40, ry, 880, 116);

      // Left indicator bar
      ctx.fillStyle = isScanned ? '#38bdf8' : '#10b981';
      ctx.fillRect(40, ry, 6, 116);

      // Vertical column dividers
      ctx.strokeStyle = '#1f1f26';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(350, ry);
      ctx.lineTo(350, ry + 116);
      ctx.moveTo(640, ry);
      ctx.lineTo(640, ry + 116);
      ctx.stroke();

      // Column 1: Dimension Name
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
      if (mu) {
        mu.wrapText(ctx, row.dim, 64, ry + 48, 265, 24, 2);
      }

      // Column 2: Winner Option A
      ctx.textAlign = 'center';
      ctx.fillStyle = '#10b981';
      ctx.font = '800 16px "JetBrains Mono", monospace';
      if (mu) {
        mu.wrapText(ctx, row.a, 495, ry + 48, 255, 22, 2);
      }

      // Column 3: Loser Option B (with strike-through in Phase 3)
      ctx.fillStyle = isResolved ? '#71717a' : '#ef4444';
      ctx.font = '700 15px "JetBrains Mono", monospace';
      if (mu) {
        mu.wrapText(ctx, row.b, 780, ry + 48, 245, 22, 2);
      }
      if (isResolved) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(665, ry + 54);
        ctx.lineTo(895, ry + 54);
        ctx.stroke();
      }

      ctx.restore();
    });

    // 3. Bottom Verdict Banner (y = 785..995)
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = isResolved ? '#10b981' : '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.fillRect(40, 785, 880, 210);
    ctx.strokeRect(40, 785, 880, 210);

    ctx.fillStyle = isResolved ? '#10b981' : '#38bdf8';
    ctx.fillRect(40, 785, 8, 210);

    ctx.textAlign = 'left';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    const ctaBadge = props.conclusionBadge || (props.cta && props.cta.badge) || 'CONCLUSIÓN OPERATIVA';
    ctx.fillText(ctaBadge, 70, 828);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 23px "Plus Jakarta Sans", sans-serif';
    const ctaTitle = (props.cta && props.cta.text) || props.conclusion || 'La arquitectura correcta reduce costos operativos y multiplica la velocidad de entrega.';
    if (mu) {
      mu.wrapText(ctx, ctaTitle, 70, 872, 820, 30, 2);
    }

    ctx.fillStyle = '#10b981';
    ctx.font = '700 17px "JetBrains Mono", monospace';
    ctx.fillText(props.takeaway || '✔ CRITERIO VALIDADO EN PRODUCCIÓN', 70, 962);

    // 4. Synchronized Word-by-Word Caption Bar
    if (mu && mu.drawSyncCaption) {
      mu.drawSyncCaption(ctx, props.voiceover || '', t, duration, { accent: isResolved ? '#10b981' : '#38bdf8' });
    }

    ctx.restore();
  }
});
