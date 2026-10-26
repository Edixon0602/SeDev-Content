// Component: migration_stepper_viz
// Zero-downtime database schema migration & blue-green deployment stepper (Expand & Contract pattern).
// Zero text squishing, clean 2-line step descriptions, and active stage glowing pulse.

window.registerComponent('migration_stepper_viz', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-migration-stepper">
        ${props.badge ? `<div class="scene-category" id="msBadge">${props.badge}</div>` : ''}
        <canvas id="migrationCanvas" width="960" height="1300"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#migrationCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp } = utils;
    const mu = window.motionUtils;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 960, 1300);

    // Hard-cut exit in last 0.3s
    const exitT = duration - 0.3;
    let exitAlpha = 1;
    let exitY = 0;
    if (t > exitT) {
      const p = (t - exitT) / 0.3;
      exitY = -p * p * 60;
      exitAlpha = clamp(1 - p * 1.3, 0, 1);
    }

    const badgeEl = container.querySelector('#msBadge');
    if (badgeEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      badgeEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      badgeEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;
    ctx.translate(0, exitY);

    const title = props.title || 'MIGRACIÓN ZERO-DOWNTIME';
    const subtitle = props.subtitle || 'PATRÓN EXPAND & CONTRACT EN PRODUCCIÓN';

    // Auto-fit Title and Subtitle
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    if (mu) {
      mu.fitText(ctx, title, 480, 65, 840, 32, 22, '"Plus Jakarta Sans", sans-serif', '800');
    } else {
      ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(title, 480, 65);
    }

    ctx.fillStyle = '#10b981';
    ctx.font = '700 17px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 102);

    // 4 Progressive Step Cards
    const steps = [
      { num: '01', name: 'EXPAND', line1: 'ALTER TABLE ADD', line2: 'Columna nullable', color: '#38bdf8', activeT: 0.1 },
      { num: '02', name: 'DUAL WRITE', line1: 'App escribe en', line2: 'Vieja y nueva', color: '#fbbf24', activeT: 1.0 },
      { num: '03', name: 'BACKFILL', line1: 'Worker por lotes', line2: 'Migra histórico', color: '#a855f7', activeT: 2.0 },
      { num: '04', name: 'CONTRACT', line1: 'Drop columna vieja', line2: '0s de bloqueo', color: '#10b981', activeT: 3.0 }
    ];

    const stepW = 190;
    const stepY = 150;

    steps.forEach((st, idx) => {
      const sx = 80 + idx * 205;
      const isReached = (t >= st.activeT);
      const isCurrent = isReached && (idx === steps.length - 1 || t < steps[idx + 1].activeT);

      ctx.fillStyle = isCurrent ? '#16222b' : (isReached ? '#141418' : '#0e0e12');
      ctx.strokeStyle = isCurrent ? st.color : (isReached ? '#3f3f46' : '#27272a');
      ctx.lineWidth = isCurrent ? 2.5 : 1.5;
      ctx.beginPath();
      ctx.roundRect(sx, stepY, stepW, 115, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isReached ? st.color : '#52525b';
      ctx.font = '900 16px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(st.num, sx + 14, stepY + 30);

      ctx.fillStyle = isReached ? '#ffffff' : '#71717a';
      ctx.font = '800 13px "JetBrains Mono", monospace';
      ctx.fillText(st.name, sx + 14, stepY + 54);

      // Clean 2-line rendering without horizontal squishing
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(st.line1, sx + 14, stepY + 78);
      ctx.fillText(st.line2, sx + 14, stepY + 96);
    });

    // Database Table Schema Visualizer (Center Box)
    const tbY = 295;
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, tbY, 800, 460, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('POSTGRES TABLE: "users"', 105, tbY + 36);

    const cols = [
      { name: 'id', type: 'BIGINT PRIMARY KEY', status: 'INMUTABLE', color: '#71717a' },
      { name: 'full_name', type: 'VARCHAR(255)', status: (t < 3.0 ? 'LEGACY (ACTIVA)' : 'DROPPED SAFELY'), color: (t < 3.0 ? '#fbbf24' : '#ef4444') },
      { name: 'first_name', type: 'VARCHAR(128)', status: (t >= 0.1 ? 'NUEVA (NULLABLE)' : 'PENDIENTE'), color: (t >= 0.1 ? '#10b981' : '#3f3f46') },
      { name: 'last_name', type: 'VARCHAR(128)', status: (t >= 0.1 ? 'NUEVA (NULLABLE)' : 'PENDIENTE'), color: (t >= 0.1 ? '#10b981' : '#3f3f46') }
    ];

    cols.forEach((c, ci) => {
      const cy = tbY + 65 + ci * 92;
      ctx.fillStyle = '#1b1b22';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(105, cy, 750, 72, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 15px "JetBrains Mono", monospace';
      ctx.fillText(c.name, 125, cy + 42);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 13px "JetBrains Mono", monospace';
      ctx.fillText(c.type, 330, cy + 42);

      ctx.fillStyle = c.color;
      ctx.font = '700 12px "JetBrains Mono", monospace';
      ctx.fillText(c.status, 630, cy + 42);
    });

    // Bottom Summary Card (Zero overflow with wrapText)
    ctx.fillStyle = '#0b1d16';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 780, 800, 190, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '900 20px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('NUNCA HAGAS ALTER TABLE A CIEGAS', 105, 825);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    const sumMig1 = 'Un ALTER TABLE bloquea lecturas y escrituras en tablas con millones de filas.';
    if (mu) {
      mu.wrapText(ctx, sumMig1, 105, 865, 750, 26, 2);
    } else {
      ctx.fillText(sumMig1, 105, 865);
    }

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 15px "JetBrains Mono", monospace';
    const sumMig2 = 'Con Expand & Contract: 0 bloqueos exclusivos, 0 caídas y rollback instantáneo garantizado.';
    if (mu) {
      mu.wrapText(ctx, sumMig2, 105, 925, 750, 24, 2);
    } else {
      ctx.fillText(sumMig2, 105, 925);
    }

    ctx.restore();
  }
});
