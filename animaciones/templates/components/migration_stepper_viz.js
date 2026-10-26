// Component: migration_stepper_viz
// Zero-downtime database schema migration & blue-green deployment stepper (Expand & Contract pattern).

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
    const { spring, clamp, lerp } = utils;
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

    // Header
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 34px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 480, 70);

    ctx.fillStyle = '#10b981';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 105);

    // 4 Progressive Step Cards
    const steps = [
      { num: '01', name: 'EXPAND', desc: 'ALTER TABLE ADD COLUMN nullable', color: '#38bdf8', activeT: 0.1 },
      { num: '02', name: 'DUAL WRITE', desc: 'App escribe en columna vieja y nueva', color: '#fbbf24', activeT: 1.0 },
      { num: '03', name: 'BACKFILL', desc: 'Worker batch migra filas históricas', color: '#a855f7', activeT: 2.0 },
      { num: '04', name: 'CONTRACT', desc: 'Drop columna antigua con 0s bloqueo', color: '#10b981', activeT: 3.0 }
    ];

    const stepW = 190;
    const stepY = 160;

    steps.forEach((st, idx) => {
      const sx = 80 + idx * 205;
      const isReached = (t >= st.activeT);
      const isCurrent = isReached && (idx === steps.length - 1 || t < steps[idx + 1].activeT);

      ctx.fillStyle = isCurrent ? '#16222b' : (isReached ? '#141418' : '#0e0e12');
      ctx.strokeStyle = isCurrent ? st.color : (isReached ? '#3f3f46' : '#27272a');
      ctx.lineWidth = isCurrent ? 2.5 : 1.5;
      ctx.beginPath();
      ctx.roundRect(sx, stepY, stepW, 110, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isReached ? st.color : '#52525b';
      ctx.font = '900 18px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(st.num, sx + 16, stepY + 36);

      ctx.fillStyle = isReached ? '#ffffff' : '#71717a';
      ctx.font = '800 14px "JetBrains Mono", monospace';
      ctx.fillText(st.name, sx + 16, stepY + 62);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 10px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(st.desc, sx + 16, stepY + 86, stepW - 32);
    });

    // Database Table Schema Visualizer (Center Box)
    const tbY = 310;
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, tbY, 800, 500, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('POSTGRES TABLE: "users"', 110, tbY + 40);

    // Columns Display
    const cols = [
      { name: 'id', type: 'BIGINT PRIMARY KEY', status: 'LOCKED / INMUTABLE', color: '#71717a' },
      { name: 'full_name', type: 'VARCHAR(255)', status: (t < 3.0 ? 'LEGACY (ACTIVA)' : 'DROPPED SAFELY'), color: (t < 3.0 ? '#fbbf24' : '#ef4444') },
      { name: 'first_name', type: 'VARCHAR(128)', status: (t >= 0.1 ? 'NUEVA (NULLABLE)' : 'PENDIENTE'), color: (t >= 0.1 ? '#10b981' : '#3f3f46') },
      { name: 'last_name', type: 'VARCHAR(128)', status: (t >= 0.1 ? 'NUEVA (NULLABLE)' : 'PENDIENTE'), color: (t >= 0.1 ? '#10b981' : '#3f3f46') }
    ];

    cols.forEach((c, ci) => {
      const cy = tbY + 80 + ci * 85;
      ctx.fillStyle = '#1c1c22';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(110, cy, 740, 65, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 16px "JetBrains Mono", monospace';
      ctx.fillText(c.name, 135, cy + 38);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 13px "JetBrains Mono", monospace';
      ctx.fillText(c.type, 340, cy + 38);

      ctx.fillStyle = c.color;
      ctx.font = '700 12px "JetBrains Mono", monospace';
      ctx.fillText(c.status, 620, cy + 38);
    });

    // Bottom Summary Card
    const s = spring(Math.max(0, t - 1.2), 20, 0.7);
    ctx.fillStyle = '#0b1d16';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 850, 800, 150, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '900 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('NUNCA HAGAS ALTER TABLE A CIEGAS', 110, 890);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Un ALTER TABLE bloquea lecturas y escrituras en tablas con millones de registros.', 110, 925);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText('Con Expand & Contract: 0 bloqueos exclusivos, 0 caídas y rollback instantáneo garantizado.', 110, 960);

    ctx.restore();
  }
});
