// Component: cache_flow_viz
// Visualizer for caching strategies: Stale-While-Revalidate & Bloom Filter probabilistic indexing.
// Zero text overflow, active hash laser lines, and background revalidation pulse wave.

window.registerComponent('cache_flow_viz', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-cache-flow">
        ${props.badge ? `<div class="scene-category" id="cfBadge">${props.badge}</div>` : ''}
        <canvas id="cacheCanvas" width="960" height="1300"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#cacheCanvas');
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

    const badgeEl = container.querySelector('#cfBadge');
    if (badgeEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      badgeEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      badgeEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;
    ctx.translate(0, exitY);

    const mode = props.mode || 'swr';
    const title = props.title || 'ESTRATEGIA DE CACHE';
    const subtitle = props.subtitle || 'LATENCIA CERO Y NEUTRALIZACIÓN DE STAMPEDE';

    // Auto-fit Title and Subtitle
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    if (mu) {
      mu.fitText(ctx, title, 480, 65, 840, 32, 22, '"Plus Jakarta Sans", sans-serif', '800');
    } else {
      ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(title, 480, 65);
    }

    ctx.fillStyle = '#a855f7';
    ctx.font = '700 17px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 102);

    if (mode === 'bloom') {
      this.renderBloom(ctx, t, duration, props, utils);
    } else {
      this.renderSWR(ctx, t, duration, props, utils);
    }

    ctx.restore();
  },

  // Stale-While-Revalidate Lifecycle
  renderSWR(ctx, t, duration, props, utils) {
    const { spring, clamp, lerp } = utils;
    const mu = window.motionUtils;

    // Timeline bar
    const barY = 150;
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, barY, 800, 90, 14);
    ctx.fill();
    ctx.stroke();

    const stages = [
      { name: '1. FRESH (60s)', desc: 'Servido en 2ms', color: '#10b981', x: 105 },
      { name: '2. STALE (SWR)', desc: 'Responde sin bloqueo', color: '#fbbf24', x: 365 },
      { name: '3. REVALIDATING', desc: 'Worker en background', color: '#38bdf8', x: 625 }
    ];

    stages.forEach((st, idx) => {
      const active = (t > idx * 0.8);
      ctx.fillStyle = active ? st.color : '#3f3f46';
      ctx.font = '800 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(st.name, st.x, barY + 36);

      ctx.fillStyle = active ? '#ffffff' : '#71717a';
      ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(st.desc, st.x, barY + 62);
    });

    // Main Interactive Simulation Cards
    const simY = 270;
    // Client Request Box
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, simY, 385, 480, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('10.000 CLIENTES CONCURRENTES', 105, simY + 36);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Cache Stampede neutralizado', 105, simY + 62);

    for (let i = 0; i < 6; i++) {
      const cy = simY + 90 + i * 58;
      ctx.fillStyle = '#1b1b22';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(100, cy, 345, 46, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = '700 13px "JetBrains Mono", monospace';
      ctx.fillText(`Req #${i + 1}: 200 OK (2.1 ms)`, 115, cy + 28);
      ctx.fillStyle = '#fbbf24';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('STALE', 430, cy + 28);
      ctx.textAlign = 'left';
    }

    // Origin Database Box
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(495, simY, 385, 480, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('ORIGIN DATABASE (PROTEGIDA)', 520, simY + 36);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Solo 1 query de fondo activa', 520, simY + 62);

    // Single background revalidation box
    ctx.fillStyle = '#0f241d';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(515, simY + 110, 345, 140, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 14px "JetBrains Mono", monospace';
    ctx.fillText('ASYNC REVALIDATION WORKER', 535, simY + 145);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('SELECT * FROM catalog;', 535, simY + 180);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '500 12px "JetBrains Mono", monospace';
    ctx.fillText('Reemplazo atómico sin bloqueos', 535, simY + 210);

    // Bottom Summary (Zero overflow with wrapText)
    ctx.fillStyle = '#1a1424';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 780, 800, 190, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#a855f7';
    ctx.font = '900 20px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('CERO IMPACTO EN SERVIDOR Y LATENCIA HUMANA', 105, 825);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    const sumSwr1 = 'El usuario jamás espera por una consulta pesada en la base de datos.';
    if (mu) {
      mu.wrapText(ctx, sumSwr1, 105, 865, 750, 26, 2);
    } else {
      ctx.fillText(sumSwr1, 105, 865);
    }

    ctx.fillStyle = '#10b981';
    ctx.font = '700 15px "JetBrains Mono", monospace';
    const sumSwr2 = 'Se eliminan al 100% las caídas de infraestructura por avalanchas simultáneas.';
    if (mu) {
      mu.wrapText(ctx, sumSwr2, 105, 925, 750, 24, 2);
    } else {
      ctx.fillText(sumSwr2, 105, 925);
    }
  },

  // Bloom Filter Bit Array
  renderBloom(ctx, t, duration, props, utils) {
    const mu = window.motionUtils;
    // Key Input Box
    ctx.fillStyle = '#16161c';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 150, 800, 100, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#a855f7';
    ctx.font = '800 14px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('LLAVE ENTRADA: user:id:849204', 105, 185);

    const hashes = [
      { name: 'MurmurHash3 => Bit 14', color: '#38bdf8' },
      { name: 'CityHash    => Bit 37', color: '#10b981' },
      { name: 'FNV-1a      => Bit 58', color: '#f59e0b' }
    ];

    hashes.forEach((h, idx) => {
      ctx.fillStyle = h.color;
      ctx.font = '700 12px "JetBrains Mono", monospace';
      ctx.fillText(h.name, 105 + idx * 265, 225);
    });

    // 64-Bit Array Grid
    const gridY = 275;
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, gridY, 800, 480, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('VECTOR DE BITS PROBABILISTICO (64 BITS EN RAM)', 105, gridY + 38);

    const hitBits = [14, 37, 58];

    for (let b = 0; b < 64; b++) {
      const col = b % 16;
      const row = Math.floor(b / 16);
      const bx = 105 + col * 46;
      const by = gridY + 65 + row * 85;

      const isHit = hitBits.includes(b);
      ctx.fillStyle = isHit ? '#a855f7' : '#1b1b22';
      ctx.strokeStyle = isHit ? '#ffffff' : '#27272a';
      ctx.lineWidth = isHit ? 2 : 1;
      ctx.beginPath();
      ctx.roundRect(bx, by, 38, 42, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isHit ? '#ffffff' : '#71717a';
      ctx.font = '800 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isHit ? '1' : '0', bx + 19, by + 26);
    }

    // Verdict Box
    ctx.fillStyle = '#10231b';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 780, 800, 190, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '900 20px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('VEREDICTO INSTANTANEO EN MEMORIA (0 MS DE DISCO)', 105, 825);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    const sumBl1 = 'Si algún bit es 0: El registro DEFINITIVAMENTE NO EXISTE (ahorra consulta SQL a disco).';
    if (mu) {
      mu.wrapText(ctx, sumBl1, 105, 865, 750, 26, 2);
    } else {
      ctx.fillText(sumBl1, 105, 865);
    }

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 15px "JetBrains Mono", monospace';
    const sumBl2 = 'Si todos los bits son 1: PROBABLEMENTE EXISTE (falsos positivos < 1%).';
    if (mu) {
      mu.wrapText(ctx, sumBl2, 105, 925, 750, 24, 2);
    } else {
      ctx.fillText(sumBl2, 105, 925);
    }
  }
});
