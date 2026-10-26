// Component: connection_pool_viz
// Concurrency & pooling visualizer: 1,000 client streams multiplexed by PgBouncer into 20 Postgres backend processes.
// Zero text overflow, active packet particles, and pulsating worker LEDs.

window.registerComponent('connection_pool_viz', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-conn-pool">
        ${props.badge ? `<div class="scene-category" id="cpBadge">${props.badge}</div>` : ''}
        <canvas id="poolCanvas" width="960" height="1300"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#poolCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp, lerp } = utils;
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

    const badgeEl = container.querySelector('#cpBadge');
    if (badgeEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      badgeEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      badgeEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;
    ctx.translate(0, exitY);

    const title = props.title || 'CONNECTION POOLING EN PRODUCCIÓN';
    const subtitle = props.subtitle || 'PGBOUNCER: 1.000 CLIENTES => 20 PROCESOS POSTGRES';

    // Auto-fit Title and Subtitle
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    if (mu) {
      mu.fitText(ctx, title, 480, 65, 840, 32, 22, '"Plus Jakarta Sans", sans-serif', '800');
    } else {
      ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(title, 480, 65);
    }

    ctx.fillStyle = '#06b6d4';
    ctx.font = '700 17px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 102);

    // 1. Left Section: Clients
    const clW = 210;
    const clY = 150;
    const clH = 590;

    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(60, clY, clW, clH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.font = '800 15px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('1.000 CLIENTES', 165, clY + 34);
    ctx.fillStyle = '#71717a';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillText('HTTP Requests', 165, clY + 54);

    for (let i = 0; i < 16; i++) {
      const cy = clY + 80 + i * 30;
      ctx.fillStyle = '#1b1b22';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(75, cy, 180, 22, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Conn: fd_${i + 104}`, 90, cy + 15);

      ctx.fillStyle = (i % 3 === 0) ? '#10b981' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(238, cy + 11, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Middle Section: PgBouncer Pooler
    const pbW = 260;
    const pbX = 350;
    ctx.fillStyle = '#10141a';
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(pbX, clY, pbW, clH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#06b6d4';
    ctx.font = '800 17px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('PGBOUNCER', pbX + pbW / 2, clY + 34);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 12px "JetBrains Mono", monospace';
    ctx.fillText('TRANSACTION POOLING', pbX + pbW / 2, clY + 56);

    ctx.fillStyle = '#141c24';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(pbX + 18, clY + 80, pbW - 36, 480, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 11px "JetBrains Mono", monospace';
    ctx.fillText('COLA DE TRANSACCIONES FIFO', pbX + pbW / 2, clY + 110);

    // Particles from Clients to PgBouncer
    for (let p = 0; p < 7; p++) {
      const pt = (t * 1.6 + p * 0.4) % 1;
      const px = lerp(270, pbX + 18, pt);
      const py = clY + 140 + p * 60;
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Right Section: Postgres Engine
    const pgW = 230;
    const pgX = 670;
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(pgX, clY, pgW, clH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 15px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('POSTGRES SERVER', pgX + pgW / 2, clY + 34);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillText('20 Workers Fijos', pgX + pgW / 2, clY + 54);

    for (let w = 0; w < 9; w++) {
      const wy = clY + 80 + w * 52;
      ctx.fillStyle = '#0c1a16';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(pgX + 18, wy, pgW - 36, 42, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = '700 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Worker #${w + 1}`, pgX + 28, wy + 20);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 10px "JetBrains Mono", monospace';
      ctx.fillText(`RAM: 10 MB (Shared)`, pgX + 28, wy + 34);

      // Pulsing active LED
      const ledPulse = Math.sin(t * 4 + w) > 0;
      ctx.fillStyle = ledPulse ? '#10b981' : '#064e3b';
      ctx.beginPath();
      ctx.arc(pgX + pgW - 35, wy + 21, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Particles from PgBouncer to Postgres
    for (let p = 0; p < 4; p++) {
      const pt = (t * 2.2 + p * 0.6) % 1;
      const px = lerp(pbX + pbW - 18, pgX + 18, pt);
      const py = clY + 140 + p * 110;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Bottom Comparison Card (Zero overflow with wrapText)
    ctx.fillStyle = '#09151e';
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(60, 780, 840, 190, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#06b6d4';
    ctx.font = '900 20px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('EL COSTO DE UN FORK() EN LINUX ELIMINADO', 90, 825);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    const sumC1 = 'Sin pool: 1.000 clientes crean 1.000 procesos => 10 GB RAM consumidos en context switching.';
    if (mu) {
      mu.wrapText(ctx, sumC1, 90, 865, 780, 26, 2);
    } else {
      ctx.fillText(sumC1, 90, 865);
    }

    ctx.fillStyle = '#10b981';
    ctx.font = '700 15px "JetBrains Mono", monospace';
    const sumC2 = 'Con PgBouncer: 1.000 peticiones se despachan con solo 200 MB de RAM y 0 ms de espera.';
    if (mu) {
      mu.wrapText(ctx, sumC2, 90, 925, 780, 24, 2);
    } else {
      ctx.fillText(sumC2, 90, 925);
    }

    ctx.restore();
  }
});
