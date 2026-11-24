// Component: cost_ticker
// Mechanical ROI & Operational Cost Ledger (3 Active Phases).
// Phase 1: Bleed breakdown & proportional drain bars.
// Phase 2: Vector strike-through cut of waste.
// Phase 3: Custom engineering replacement & net ROI calculation.

window.registerComponent('cost_ticker', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-cost-ticker">
        <canvas id="ctCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#ctCanvas');
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

    const title = (props.title || 'AUDITORÍA DE IMPACTO FINANCIERO').toUpperCase();
    const subtitle = (props.subtitle || 'COSTO OPERATIVO OCULTO VS ARQUITECTURA PROPIA').toUpperCase();

    // 1. Clean Header
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fbbf24';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 40, 42);

    ctx.fillStyle = '#ffffff';
    if (mu) {
      mu.fitText(ctx, title, 40, 92, 880, 42, 26, '"Plus Jakarta Sans", sans-serif', '900');
    }

    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, 118);
    ctx.lineTo(920, 118);
    ctx.stroke();

    const boxX = 40;
    const boxW = 880;
    const isResolved = t >= duration * 0.48;

    // 2. Upper Box: Financial Bleed / Inefficient Cost (y = 148..388)
    const boxY = 148;
    const boxH = 235;
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(boxX, boxY, 6, boxH);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#fca5a5';
    ctx.font = '800 17px "JetBrains Mono", monospace';
    ctx.fillText('GASTO OPERATIVO ACTUAL', boxX + 28, boxY + 40);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#ef4444';
    ctx.fillText(isResolved ? '✖ REEMPLAZADO' : '▲ DRENAJE ACTIVO', boxX + boxW - 28, boxY + 40);

    const targetCost = props.cloudCost !== undefined ? props.cloudCost : 1940;
    const startCost = props.initialCost !== undefined ? props.initialCost : 0;
    const rollProgress = clamp(t / (duration * 0.30), 0, 1);

    const displayAmount = mu
      ? mu.counterRoll(startCost, targetCost, rollProgress, { prefix: '$', decimals: 0, thousandSeparator: ',' })
      : `$${targetCost}`;

    ctx.textAlign = 'left';
    ctx.fillStyle = isResolved ? '#71717a' : '#ffffff';
    ctx.font = '900 88px "JetBrains Mono", monospace';
    ctx.fillText(displayAmount, boxX + 28, boxY + 145);

    // Strike-through line over the bloated cost when resolved in Act 2
    if (isResolved) {
      const strikeP = clamp((t - duration * 0.48) / 0.25, 0, 1);
      const amtW = ctx.measureText(displayAmount).width;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(boxX + 24, boxY + 112, (amtW + 16) * strikeP, 10);
    }

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 19px "JetBrains Mono", monospace';
    ctx.fillText('PÉRDIDA ACUMULADA POR INEFICIENCIA / SUSCRIPCIONES / CAÍDAS', boxX + 28, boxY + 202);

    // 3. Itemized Breakdown Rows with Mechanical Fill Bars (y = 408..688)
    const defaultItems = [
      { name: 'Suscripciones SaaS / Tareas limitadas', cost: '$420/mes', sub: 'Límites de ejecución y caídas silenciosas', color: '#ef4444' },
      { name: 'Trabajo manual repetitivo en equipo', cost: '$1,100/mes', sub: 'Horas humanas copiando datos entre sistemas', color: '#fbbf24' }
    ];
    const items = (props.breakdown || defaultItems).slice(0, 2);

    items.forEach((item, idx) => {
      const itemY = 408 + idx * 140;
      const itemH = 122;
      const itemP = clamp((t - 0.3 - idx * 0.2) / 0.8, 0, 1);

      ctx.fillStyle = '#09090c';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.fillRect(boxX, itemY, boxW, itemH);
      ctx.strokeRect(boxX, itemY, boxW, itemH);

      ctx.fillStyle = item.color || '#ef4444';
      ctx.fillRect(boxX, itemY, 6, itemH);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      if (mu) {
        mu.fitText(ctx, item.name, boxX + 28, itemY + 44, boxW - 280, 28, 20, '"Plus Jakarta Sans", sans-serif', '800');
      }

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 17px "JetBrains Mono", monospace';
      ctx.fillText(item.sub || '', boxX + 28, itemY + 78);

      // Proportional drain bar at bottom of card
      ctx.fillStyle = '#18181b';
      ctx.fillRect(boxX + 28, itemY + 96, boxW - 56, 8);
      ctx.fillStyle = item.color || '#ef4444';
      ctx.fillRect(boxX + 28, itemY + 96, (boxW - 56) * itemP * (idx === 0 ? 0.78 : 0.55), 8);

      ctx.textAlign = 'right';
      ctx.fillStyle = item.color || '#ef4444';
      ctx.font = '900 32px "JetBrains Mono", monospace';
      ctx.fillText(item.cost, boxX + boxW - 28, itemY + 62);
    });

    // 4. Lower Box: The Engineering Fix & Net ROI (y = 708..990)
    const fixY = 708;
    const fixH = 282;
    const fixS = spring(Math.max(0, t - 0.6), 22, 0.75);

    ctx.save();
    ctx.translate(480, fixY + fixH / 2);
    ctx.scale(fixS, fixS);
    ctx.translate(-480, -(fixY + fixH / 2));

    ctx.fillStyle = '#07130e';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.fillRect(boxX, fixY, boxW, fixH);
    ctx.strokeRect(boxX, fixY, boxW, fixH);

    ctx.fillStyle = '#10b981';
    ctx.fillRect(boxX, fixY, 6, fixH);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#10b981';
    ctx.font = '800 17px "JetBrains Mono", monospace';
    ctx.fillText('SOLUCIÓN DE INGENIERÍA A MEDIDA', boxX + 28, fixY + 42);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#34d399';
    ctx.fillText('✔ CERO LÍMITES DE TASA', boxX + boxW - 28, fixY + 42);

    const bmCost = props.bareMetalCost || '$6/mes';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#10b981';
    ctx.font = '900 82px "JetBrains Mono", monospace';
    ctx.fillText(bmCost, boxX + 28, fixY + 142);

    ctx.fillStyle = '#e4e4e7';
    ctx.font = '700 20px "JetBrains Mono", monospace';
    ctx.fillText(props.takeaway || 'CÓDIGO PROPIO · 100% AUDITADO · RETORNO INMEDIATO', boxX + 28, fixY + 195);

    // Discrete ROI Verification Slots
    if (mu && mu.drawDiscreteSlots) {
      const activeRoiSlots = Math.min(10, Math.floor(clamp((t - 0.8) / (duration * 0.7), 0, 1) * 10));
      mu.drawDiscreteSlots(ctx, 480, fixY + 240, activeRoiSlots, 10, '#10b981', 70, 28, 12);
    }

    ctx.restore();

    // 5. Synchronized Word-by-Word Caption Bar
    const vo = props.voiceover || props.takeaway || '';
    if (mu && mu.drawSyncCaption) {
      mu.drawSyncCaption(ctx, vo, t, duration, { accent: isResolved ? '#10b981' : '#fbbf24' });
    }

    ctx.restore();
  }
});
