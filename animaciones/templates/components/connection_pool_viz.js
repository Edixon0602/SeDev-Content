// Component: connection_pool_viz
// Concurrency & pooling visualizer: 1,000 client streams multiplexed by PgBouncer into 20 Postgres backend processes.

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

    // Header
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 34px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 480, 70);

    ctx.fillStyle = '#06b6d4';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 105);

    // 1. Left Section: Clients
    const clW = 220;
    const clY = 160;
    const clH = 650;

    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(60, clY, clW, clH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('1.000 CLIENTES', 170, clY + 36);
    ctx.fillStyle = '#71717a';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillText('HTTP Requests', 170, clY + 58);

    // Render client dots
    for (let i = 0; i < 18; i++) {
      const cy = clY + 90 + i * 30;
      ctx.fillStyle = '#1c1c22';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(80, cy, 180, 22, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Conn: fd_${i + 104}`, 95, cy + 15);

      // Status dot
      ctx.fillStyle = (i % 3 === 0) ? '#10b981' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(245, cy + 11, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Middle Section: PgBouncer Pooler
    const pbW = 260;
    const pbX = 350;
    ctx.fillStyle = '#12161f';
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(pbX, clY, pbW, clH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#06b6d4';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('PGBOUNCER', pbX + pbW / 2, clY + 36);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 13px "JetBrains Mono", monospace';
    ctx.fillText('TRANSACTION POOLING', pbX + pbW / 2, clY + 60);

    // Queue slots in PgBouncer
    ctx.fillStyle = '#181f2a';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(pbX + 20, clY + 90, pbW - 40, 520, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 12px "JetBrains Mono", monospace';
    ctx.fillText('COLA DE TRANSACCIONES FIFO', pbX + pbW / 2, clY + 120);

    // Particles moving from Clients to PgBouncer
    for (let p = 0; p < 8; p++) {
      const pt = (t * 1.5 + p * 0.4) % 1;
      const px = lerp(280, pbX + 20, pt);
      const py = clY + 150 + p * 55;
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Right Section: Postgres Engine
    const pgW = 240;
    const pgX = 660;
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(pgX, clY, pgW, clH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('POSTGRES SERVER', pgX + pgW / 2, clY + 36);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillText('20 Workers Fijos', pgX + pgW / 2, clY + 58);

    // Backend process slots
    for (let w = 0; w < 10; w++) {
      const wy = clY + 90 + w * 52;
      ctx.fillStyle = '#0c1a16';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(pgX + 20, wy, pgW - 40, 42, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = '700 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Worker #${w + 1}`, pgX + 32, wy + 20);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.fillText(`RAM: 10 MB (Shared)`, pgX + 32, wy + 34);
    }

    // Particles moving from PgBouncer to Postgres
    for (let p = 0; p < 4; p++) {
      const pt = (t * 2.2 + p * 0.6) % 1;
      const px = lerp(pbX + pbW - 20, pgX + 20, pt);
      const py = clY + 160 + p * 110;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Bottom Comparison Card
    const s = spring(Math.max(0, t - 1.2), 20, 0.7);
    ctx.fillStyle = '#09151e';
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(60, 850, 840, 150, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#06b6d4';
    ctx.font = '900 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('EL COSTO DE UN FORK() EN LINUX ELIMINADO', 90, 890);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Sin pool: 1.000 clientes crean 1.000 procesos => 10 GB RAM consumidos en context switching.', 90, 925);
    ctx.fillStyle = '#10b981';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText('Con PgBouncer: 1.000 peticiones se despachan con solo 200 MB de RAM y 0 ms de espera.', 90, 960);

    ctx.restore();
  }
});
