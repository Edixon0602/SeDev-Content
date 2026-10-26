// Component: cache_flow_viz
// Visualizer for caching strategies: Stale-While-Revalidate & Bloom Filter probabilistic indexing.

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

    const mode = props.mode || 'swr'; // 'swr' | 'bloom'
    const title = props.title || 'ESTRATEGIA DE CACHE';
    const subtitle = props.subtitle || 'LATENCIA CERO Y NEUTRALIZACIÓN DE STAMPEDE';

    // Header
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 34px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 480, 70);

    ctx.fillStyle = '#a855f7';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 105);

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

    // Timeline bar
    const barY = 170;
    ctx.fillStyle = '#18181b';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, barY, 800, 100, 14);
    ctx.fill();
    ctx.stroke();

    // 3 Status Stages: FRESH -> STALE -> REVALIDATING
    const stages = [
      { name: '1. FRESH (max-age=60s)', desc: 'Servido desde Edge/RAM en 2ms', color: '#10b981', x: 100, w: 240 },
      { name: '2. STALE (stale-while-revalidate)', desc: 'Retorna al cliente sin bloquear', color: '#fbbf24', x: 360, w: 240 },
      { name: '3. REVALIDATING', desc: 'Worker en background actualiza BD', color: '#38bdf8', x: 620, w: 240 }
    ];

    stages.forEach((st, idx) => {
      const active = (t > idx * 1.0);
      ctx.fillStyle = active ? st.color : '#3f3f46';
      ctx.font = '800 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(st.name, st.x, barY + 40);

      ctx.fillStyle = active ? '#ffffff' : '#71717a';
      ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(st.desc, st.x, barY + 68);
    });

    // Main Interactive Simulation Cards
    const simY = 310;
    // Client Request Box
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, simY, 380, 500, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('10.000 CLIENTES CONCURRENTES', 110, simY + 40);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Cache Stampede neutralizado', 110, simY + 70);

    for (let i = 0; i < 6; i++) {
      const cy = simY + 110 + i * 60;
      ctx.fillStyle = '#1c1c22';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(105, cy, 330, 48, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = '700 13px "JetBrains Mono", monospace';
      ctx.fillText(`Req #${i + 1}: 200 OK (2.1 ms)`, 125, cy + 30);
      ctx.fillStyle = '#fbbf24';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText('STALE SERVED', 330, cy + 30);
    }

    // Origin Database Box (Protected)
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(500, simY, 380, 500, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('ORIGIN DATABASE (PROTEGIDA)', 530, simY + 40);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Solo 1 query de fondo en ejecución', 530, simY + 70);

    // Single background revalidation box
    ctx.fillStyle = '#0f241d';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(525, simY + 130, 330, 140, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 14px "JetBrains Mono", monospace';
    ctx.fillText('ASYNC REVALIDATION WORKER', 545, simY + 170);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('SELECT * FROM catalog;', 545, simY + 205);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '500 12px "JetBrains Mono", monospace';
    ctx.fillText('Atomic Cache Replacement', 545, simY + 235);

    // Bottom Summary
    const s = spring(Math.max(0, t - 1.2), 20, 0.7);
    ctx.fillStyle = '#1a1424';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 850, 800, 150, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#a855f7';
    ctx.font = '900 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('CERO IMPACTO EN SERVIDOR Y LATENCIA HUMANA', 110, 890);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('El usuario jamás espera por una consulta pesada en la base de datos.', 110, 925);
    ctx.fillStyle = '#10b981';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText('Se eliminan al 100% las caídas de infraestructura por avalanchas simultáneas.', 110, 960);
  },

  // Bloom Filter Bit Array
  renderBloom(ctx, t, duration, props, utils) {
    const { spring, clamp } = utils;

    // Key Input Box
    ctx.fillStyle = '#18181b';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, 170, 800, 110, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#a855f7';
    ctx.font = '800 14px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('LLAVE ENTRADA: user:id:849204', 110, 205);

    // 3 Hash Functions
    const hashes = [
      { name: 'MurmurHash3(key) => Bit 14', color: '#38bdf8' },
      { name: 'CityHash(key)      => Bit 37', color: '#10b981' },
      { name: 'FNV-1a(key)        => Bit 58', color: '#f59e0b' }
    ];

    hashes.forEach((h, idx) => {
      ctx.fillStyle = h.color;
      ctx.font = '700 13px "JetBrains Mono", monospace';
      ctx.fillText(h.name, 110 + idx * 270, 250);
    });

    // 64-Bit Array Grid
    const gridY = 320;
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, gridY, 800, 480, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('VECTOR DE BITS PROBABILISTICO (64 BITS EN RAM)', 110, gridY + 45);

    const hitBits = [14, 37, 58];

    // Draw 64 bit cells (8 rows x 8 cols)
    for (let b = 0; b < 64; b++) {
      const col = b % 16;
      const row = Math.floor(b / 16);
      const bx = 110 + col * 46;
      const by = gridY + 80 + row * 85;

      const isHit = hitBits.includes(b);
      ctx.fillStyle = isHit ? '#a855f7' : '#1c1c22';
      ctx.strokeStyle = isHit ? '#ffffff' : '#27272a';
      ctx.lineWidth = isHit ? 2 : 1;
      ctx.beginPath();
      ctx.roundRect(bx, by, 38, 42, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isHit ? '#ffffff' : '#71717a';
      ctx.font = '800 14px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isHit ? '1' : '0', bx + 19, by + 26);
    }

    // Verdict Box
    const s = spring(Math.max(0, t - 1.2), 20, 0.7);
    ctx.fillStyle = '#10231b';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 850, 800, 150, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '900 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('VEREDICTO INSTANTANEO EN MEMORIA (0 MS DE DISCO)', 110, 890);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Si algún bit es 0: El registro DEFINITIVAMENTE NO EXISTE (ahorra consulta SQL a disco).', 110, 925);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText('Si todos los bits son 1: PROBABLEMENTE EXISTE (falsos positivos < 1%).', 110, 960);
  }
});
