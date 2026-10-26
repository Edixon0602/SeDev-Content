// Component: storage_engine_viz
// Visualizer for database storage engines: LSM-Trees, Columnar Parquet, B-Trees & Vector HNSW.
// Zero text overflow, active pulse packets, and dynamic particle animations.

window.registerComponent('storage_engine_viz', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-storage-engine">
        ${props.badge ? `<div class="scene-category" id="seBadge">${props.badge}</div>` : ''}
        <canvas id="storageCanvas" width="960" height="1300"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#storageCanvas');
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

    const badgeEl = container.querySelector('#seBadge');
    if (badgeEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      badgeEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      badgeEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;
    ctx.translate(0, exitY);

    const mode = props.mode || 'lsm';
    const title = props.title || 'MOTOR DE ALMACENAMIENTO';
    const subtitle = props.subtitle || 'ESTRUCTURA DE MEMORIA Y DISCO';

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

    if (mode === 'columnar') {
      this.renderColumnar(ctx, t, duration, props, utils);
    } else if (mode === 'btree') {
      this.renderBTree(ctx, t, duration, props, utils);
    } else if (mode === 'hnsw') {
      this.renderHNSW(ctx, t, duration, props, utils);
    } else {
      this.renderLSM(ctx, t, duration, props, utils);
    }

    ctx.restore();
  },

  // LSM-Tree: MemTable (RAM) -> Flush to SSTable (Disk) -> Compaction
  renderLSM(ctx, t, duration, props, utils) {
    const { spring, clamp, lerp } = utils;
    const mu = window.motionUtils;

    // 1. RAM Region Header
    ctx.fillStyle = '#10b981';
    ctx.font = '800 15px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('MEMORIA RAM (VOLATIL, O(1) WRITES)', 80, 160);

    // MemTable Box
    const s1 = spring(Math.max(0, t - 0.2), 20, 0.75);
    ctx.fillStyle = '#121216';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, 180, 800, 210, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('ACTIVE MEMTABLE (SKIPLIST / RED-BLACK TREE)', 105, 218);

    // Incoming write keys animation
    const keys = [
      { k: 'user:102', v: '{"active":true}', t: 0.3 },
      { k: 'order:941', v: '{"total":180}', t: 0.8 },
      { k: 'metric:cpu', v: '{"usage":84.2}', t: 1.3 },
      { k: 'token:x91', v: '{"exp":1762}', t: 1.8 }
    ];

    keys.forEach((item, idx) => {
      if (t >= item.t) {
        const entrySpring = spring(Math.max(0, t - item.t), 24, 0.7);
        const y = 245 + idx * 34;

        ctx.fillStyle = '#1a1a20';
        ctx.strokeStyle = '#27272a';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(105, y, 750 * entrySpring, 28, 6);
        ctx.fill();
        ctx.stroke();

        if (entrySpring > 0.4) {
          ctx.fillStyle = '#10b981';
          ctx.font = '700 13px "JetBrains Mono", monospace';
          ctx.fillText(`+ PUT ${item.k} => ${item.v}`, 125, y + 19);
        }
      }
    });

    // 2. Flush arrow to disk with animated particle stream
    const flushT = spring(Math.max(0, t - 2.2), 22, 0.7);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(480, 400);
    ctx.lineTo(480, 400 + 80 * flushT);
    ctx.stroke();
    ctx.setLineDash([]);

    if (t > 2.2) {
      // Flowing particle
      const pY = lerp(400, 480, (t * 2) % 1);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(480, pY, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '800 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ASYNCHRONOUS FLUSH (WRITE BUFFER FULL)', 480, 445);
    }

    // 3. Disk NVMe Region
    ctx.fillStyle = '#a855f7';
    ctx.font = '800 15px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('DISCO NVMe PERSISTENTE (IMMUTABLE SSTABLES)', 80, 515);

    // SSTable L0
    ctx.fillStyle = '#121218';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, 535, 385, 230, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 17px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('LEVEL 0 SSTABLE', 105, 570);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('Secuencia inmutable en disco', 105, 598);
    ctx.fillText('Filtro Bloom embebido O(1)', 105, 624);

    // SSTable L1
    ctx.fillStyle = '#121218';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(495, 535, 385, 230, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 17px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('LEVEL 1 (COMPACTADO)', 520, 570);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('Rangos sin solapamiento', 520, 598);
    ctx.fillText('Merge-Sort ordenado por claves', 520, 624);

    // Compaction indicator
    if (t > 2.8) {
      const compP = (t - 2.8) * 3;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(490, 650, 18 + Math.sin(compP) * 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('MERGE', 490, 654);
    }

    // 4. Bottom Summary Banner (Zero overflow with wrapText)
    ctx.fillStyle = '#0d1815';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 800, 800, 170, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 15px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('BENEFICIO DE ARQUITECTURA LSM', 110, 840);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 20px "Plus Jakarta Sans", sans-serif';
    const sum = 'Zero random I/O: Todas las escrituras son secuenciales en memoria.';
    if (mu) {
      mu.wrapText(ctx, sum, 110, 875, 740, 28, 2);
    } else {
      ctx.fillText(sum, 110, 875);
    }

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.fillText('Multiplica la vida útil del SSD NVMe al eliminar la amplificación de escritura.', 110, 935);
  },

  // Columnar (Parquet / DuckDB)
  renderColumnar(ctx, t, duration, props, utils) {
    const { spring } = utils;
    const mu = window.motionUtils;
    const colY = 160;
    const colH = 590;

    // Left: Row-Oriented
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, colY, 385, colH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('ROW-ORIENTED (POSTGRES)', 105, colY + 36);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Escanea registros completos de disco', 105, colY + 62);

    for (let r = 0; r < 5; r++) {
      const y = colY + 95 + r * 90;
      ctx.fillStyle = '#1a1a20';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(100, y, 345, 70, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#71717a';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText(`Row #${r + 1} (Offset 0x${(r * 256).toString(16).toUpperCase()})`, 115, y + 24);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`[ID] [NAME] [TOTAL] [CREATED_AT]`, 115, y + 50);
    }

    // Right: Columnar (DuckDB)
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(495, colY, 385, colH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('COLUMNAR (DUCKDB / PARQUET)', 520, colY + 36);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SIMD vectorizado sobre 1 columna', 520, colY + 62);

    const cols = [
      { name: 'TOTAL (F64)', color: '#38bdf8', active: true },
      { name: 'ID (Int64)', color: '#71717a', active: false },
      { name: 'DATE (I32)', color: '#71717a', active: false }
    ];

    cols.forEach((c, ci) => {
      const cx = 515 + ci * 115;
      ctx.fillStyle = c.active ? '#09271e' : '#18181f';
      ctx.strokeStyle = c.active ? '#10b981' : '#27272a';
      ctx.lineWidth = c.active ? 2 : 1;
      ctx.beginPath();
      ctx.roundRect(cx, colY + 95, 105, 460, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = c.color;
      ctx.font = '700 12px "JetBrains Mono", monospace';
      ctx.fillText(c.name, cx + 8, colY + 125);

      for (let i = 0; i < 7; i++) {
        const vy = colY + 155 + i * 45;
        ctx.fillStyle = c.active ? '#10b981' : '#3f3f46';
        ctx.font = '700 13px "JetBrains Mono", monospace';
        ctx.fillText(c.active ? `${(12.5 + i * 4.2).toFixed(1)}` : `...`, cx + 20, vy + 20);
      }
    });

    // Summary Card
    ctx.fillStyle = '#0f241d';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 800, 800, 170, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '900 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('94% MENOS I/O EN AGREGACIONES', 480, 845);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    const sumCol = 'CPU ejecuta instrucciones AVX-512 directamente sobre arreglos contiguos en RAM.';
    if (mu) {
      mu.wrapText(ctx, sumCol, 480, 885, 740, 26, 2);
    } else {
      ctx.fillText(sumCol, 480, 885);
    }
  },

  // BTree mode
  renderBTree(ctx, t, duration, props, utils) {
    const mu = window.motionUtils;
    ctx.fillStyle = '#18181b';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(330, 180, 300, 80, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ROOT PAGE (4 KB BLOCK)', 480, 215);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText('[ 20 | 50 | 80 ]', 480, 245);

    const pages = [
      { x: 80, y: 360, label: 'LEAF A: [5..19]', color: '#10b981' },
      { x: 380, y: 360, label: 'LEAF B: [21..49]', color: '#fbbf24' },
      { x: 680, y: 360, label: 'LEAF C (SPLIT): [51..79]', color: '#ef4444' }
    ];

    pages.forEach(p => {
      ctx.strokeStyle = '#3f3f46';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(480, 260);
      ctx.lineTo(p.x + 100, p.y);
      ctx.stroke();

      ctx.fillStyle = '#141418';
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, 200, 90, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = p.color;
      ctx.font = '700 13px "JetBrains Mono", monospace';
      ctx.fillText(p.label, p.x + 100, p.y + 40);
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText('Disk Pointer 0x' + (p.x * 4).toString(16), p.x + 100, p.y + 68);
    });

    // Summary
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 800, 800, 170, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '900 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('OPTIMIZADO PARA LECTURAS ALEATORIAS O(log N)', 480, 845);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    const sumBt = 'Árbol balanceado ideal para búsquedas puntuales por clave primaria.';
    if (mu) {
      mu.wrapText(ctx, sumBt, 480, 885, 740, 26, 2);
    } else {
      ctx.fillText(sumBt, 480, 885);
    }
  },

  // HNSW Vector Graph
  renderHNSW(ctx, t, duration, props, utils) {
    const mu = window.motionUtils;
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, 170, 800, 580, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ec4899';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('HNSW (HIERARCHICAL NAVIGABLE SMALL WORLD GRAPH)', 105, 210);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Búsqueda por similitud de cosenos en memoria con salto logarítmico', 105, 235);

    const nodes = [
      { x: 220, y: 350, label: 'v1' },
      { x: 380, y: 300, label: 'v2' },
      { x: 540, y: 410, label: 'v3 (Match)' },
      { x: 700, y: 330, label: 'v4' },
      { x: 300, y: 520, label: 'v5' },
      { x: 620, y: 580, label: 'v6' }
    ];

    ctx.strokeStyle = '#3f3f46';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if ((i + j) % 2 === 1) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Active path
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(220, 350);
    ctx.lineTo(380, 300);
    ctx.lineTo(540, 410);
    ctx.stroke();

    // Pulse packet moving along search path
    const pT = (t * 1.5) % 2;
    let px = 220, py = 350;
    if (pT < 1) {
      px = utils.lerp(220, 380, pT);
      py = utils.lerp(350, 300, pT);
    } else {
      px = utils.lerp(380, 540, pT - 1);
      py = utils.lerp(300, 410, pT - 1);
    }
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fill();

    nodes.forEach(n => {
      ctx.fillStyle = n.label.includes('Match') ? '#ec4899' : '#27272a';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(n.label.split(' ')[0], n.x, n.y + 4);
    });

    // Summary
    ctx.fillStyle = '#260a1c';
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 800, 800, 170, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ec4899';
    ctx.font = '900 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('BÚSQUEDA VECTORIAL IN-PROCESS EN POSTGRES', 480, 845);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    const sumHnsw = '99% recall con latencia < 5ms sin necesidad de bases vectoriales externas.';
    if (mu) {
      mu.wrapText(ctx, sumHnsw, 480, 885, 740, 26, 2);
    } else {
      ctx.fillText(sumHnsw, 480, 885);
    }
  }
});
