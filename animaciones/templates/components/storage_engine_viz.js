// Component: storage_engine_viz
// Visualizer for database storage engines: LSM-Trees, Columnar Parquet, B-Trees & Vector HNSW.

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

    const mode = props.mode || 'lsm'; // 'lsm' | 'columnar' | 'btree' | 'hnsw'
    const title = props.title || 'MOTOR DE ALMACENAMIENTO';
    const subtitle = props.subtitle || 'ESTRUCTURA DE MEMORIA Y DISCO';

    // Header
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 34px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 480, 70);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 105);

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
    const { spring, clamp } = utils;

    // 1. RAM Region Header
    ctx.fillStyle = '#10b981';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('MEMORIA RAM (VOLATIL, O(1) WRITES)', 80, 170);

    // MemTable Box
    const s1 = spring(Math.max(0, t - 0.2), 20, 0.75);
    ctx.fillStyle = '#121216';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(80, 190, 800, 220, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('ACTIVE MEMTABLE (SKIPLIST / RED-BLACK TREE)', 110, 230);

    // Incoming write keys animation
    const keys = [
      { k: 'user:102', v: '{"active":true}', t: 0.4 },
      { k: 'order:941', v: '{"total":180}', t: 0.9 },
      { k: 'metric:cpu', v: '{"usage":84.2}', t: 1.4 },
      { k: 'token:x91', v: '{"exp":1762}', t: 1.9 }
    ];

    keys.forEach((item, idx) => {
      const entrySpring = spring(Math.max(0, t - item.t), 24, 0.7);
      if (t >= item.t) {
        const y = 260 + idx * 36;
        ctx.fillStyle = '#1c1c22';
        ctx.strokeStyle = '#27272a';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(110, y, 740 * entrySpring, 30, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#10b981';
        ctx.font = '700 14px "JetBrains Mono", monospace';
        ctx.fillText(`+ PUT ${item.k} => ${item.v}`, 130, y + 20);
      }
    });

    // 2. Flush arrow to disk
    const flushT = spring(Math.max(0, t - 2.4), 22, 0.7);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(480, 420);
    ctx.lineTo(480, 420 + 90 * flushT);
    ctx.stroke();
    ctx.setLineDash([]);

    if (t > 2.5) {
      ctx.fillStyle = '#f59e0b';
      ctx.font = '800 14px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ASYNCHRONOUS FLUSH (WRITE BUFFER FULL)', 480, 470);
    }

    // 3. Disk NVMe Region
    ctx.fillStyle = '#a855f7';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('DISCO NVMe PERSISTENTE (IMMUTABLE SSTABLES)', 80, 540);

    // SSTable L0
    const s2 = spring(Math.max(0, t - 2.7), 20, 0.75);
    ctx.fillStyle = '#14141a';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(80, 560, 380, 250, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('LEVEL 0 SSTABLE', 110, 600);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('Secuencia inmutable en disco', 110, 625);
    ctx.fillText('Índice Bloom Filter embebido', 110, 650);

    // SSTable L1
    ctx.fillStyle = '#14141a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(500, 560, 380, 250, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('LEVEL 1 (COMPACTADO)', 530, 600);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('Rangos de claves sin solapamiento', 530, 625);
    ctx.fillText('Merge-Sort ordenado en bloques', 530, 650);

    // Compaction animation indicator
    if (t > 3.2) {
      const compP = (t - 3.2) * 2;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(490, 685, 20 + Math.sin(compP) * 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('MERGE', 490, 690);
    }

    // Bottom Summary Banner
    const s3 = spring(Math.max(0, t - 3.5), 22, 0.7);
    ctx.fillStyle = '#0c1a16';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 860, 800, 140, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('BENEFICIO DE ARQUITECTURA LSM', 110, 900);
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Zero random I/O: Todas las escrituras son secuenciales (Append-Only).', 110, 935);
    ctx.fillStyle = '#71717a';
    ctx.font = '500 15px "JetBrains Mono", monospace';
    ctx.fillText('Multiplica la vida útil del SSD NVMe al eliminar la amplificación de escritura.', 110, 965);
  },

  // Columnar: Row-Oriented vs Columnar (DuckDB / Parquet)
  renderColumnar(ctx, t, duration, props, utils) {
    const { spring, clamp } = utils;

    // Row-Oriented vs Columnar side-by-side
    const colW = 380;
    const colY = 170;
    const colH = 650;

    // Left: Row Oriented (Postgres / MySQL)
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, colY, colW, colH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('ROW-ORIENTED (POSTGRES)', 110, colY + 40);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Escanea registros completos de disco', 110, colY + 70);

    for (let r = 0; r < 5; r++) {
      const y = colY + 110 + r * 95;
      ctx.fillStyle = '#1c1c22';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(100, y, 340, 75, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#71717a';
      ctx.font = '600 12px "JetBrains Mono", monospace';
      ctx.fillText(`Row #${r + 1} (Offset 0x${(r * 256).toString(16).toUpperCase()})`, 115, y + 25);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`[ID] [NAME] [TOTAL] [CREATED_AT]`, 115, y + 55);
    }

    // Right: Columnar (DuckDB / Parquet)
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(500, colY, colW, colH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('COLUMNAR (DUCKDB / PARQUET)', 530, colY + 40);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SIMD vectorizado sobre 1 columna', 530, colY + 70);

    // Columns
    const cols = [
      { name: 'TOTAL (Float64)', color: '#38bdf8', active: true },
      { name: 'ID (Int64)', color: '#71717a', active: false },
      { name: 'DATE (Int32)', color: '#71717a', active: false }
    ];

    cols.forEach((c, ci) => {
      const cx = 525 + ci * 110;
      ctx.fillStyle = c.active ? '#082f25' : '#1c1c22';
      ctx.strokeStyle = c.active ? '#10b981' : '#27272a';
      ctx.lineWidth = c.active ? 2 : 1;
      ctx.beginPath();
      ctx.roundRect(cx, colY + 110, 100, 480, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = c.color;
      ctx.font = '700 11px "JetBrains Mono", monospace';
      ctx.fillText(c.name, cx + 10, colY + 140);

      // Vector elements
      for (let i = 0; i < 8; i++) {
        const vy = colY + 170 + i * 48;
        ctx.fillStyle = c.active ? '#10b981' : '#3f3f46';
        ctx.font = '700 13px "JetBrains Mono", monospace';
        ctx.fillText(c.active ? `${(12.5 + i * 4.2).toFixed(1)}` : `...`, cx + 25, vy + 20);
      }
    });

    // Speedup badge bottom
    const s = spring(Math.max(0, t - 1.5), 20, 0.7);
    ctx.fillStyle = '#0f241d';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 860, 800, 140, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '900 24px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('94% MENOS I/O EN AGREGACIONES', 480, 915);
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('CPU ejecuta instrucciones AVX-512 directamente sobre arreglos contiguos en RAM.', 480, 955);
  },

  // B-Tree Node Splits
  renderBTree(ctx, t, duration, props, utils) {
    const { spring } = utils;
    // Root Node
    ctx.fillStyle = '#18181b';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(330, 200, 300, 80, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ROOT PAGE (4 KB BLOCK)', 480, 235);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText('[ 20 | 50 | 80 ]', 480, 265);

    // Child Pages
    const pages = [
      { x: 80, y: 380, label: 'LEAF A: [5..19]', color: '#10b981' },
      { x: 380, y: 380, label: 'LEAF B: [21..49]', color: '#fbbf24' },
      { x: 680, y: 380, label: 'LEAF C (SPLIT): [51..79]', color: '#ef4444' }
    ];

    pages.forEach(p => {
      ctx.strokeStyle = '#3f3f46';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(480, 280);
      ctx.lineTo(p.x + 100, p.y);
      ctx.stroke();

      ctx.fillStyle = '#141418';
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, 200, 100, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = p.color;
      ctx.font = '700 13px "JetBrains Mono", monospace';
      ctx.fillText(p.label, p.x + 100, p.y + 45);
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText('Disk Pointer 0x' + (p.x * 4).toString(16), p.x + 100, p.y + 75);
    });

    // Summary
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 860, 800, 140, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '900 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('OPTIMIZADO PARA LECTURAS ALEATORIAS O(log N)', 480, 915);
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Árbol balanceado ideal para búsquedas puntuales por clave primaria.', 480, 955);
  },

  // HNSW Vector Graph
  renderHNSW(ctx, t, duration, props, utils) {
    const { spring } = utils;
    ctx.fillStyle = '#18181b';
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(80, 180, 800, 640, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ec4899';
    ctx.font = '800 20px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('HNSW (HIERARCHICAL NAVIGABLE SMALL WORLD GRAPH)', 110, 230);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Búsqueda por similitud de cosenos en memoria con salto logarítmico', 110, 260);

    // Draw graph nodes
    const nodes = [
      { x: 220, y: 380, label: 'v1' },
      { x: 380, y: 320, label: 'v2' },
      { x: 540, y: 440, label: 'v3 (Query Match)' },
      { x: 700, y: 360, label: 'v4' },
      { x: 300, y: 560, label: 'v5' },
      { x: 620, y: 620, label: 'v6' }
    ];

    // Edges
    ctx.strokeStyle = '#3f3f46';
    ctx.lineWidth = 2;
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
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(220, 380);
    ctx.lineTo(380, 320);
    ctx.lineTo(540, 440);
    ctx.stroke();

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
      ctx.fillText(n.label.split(' ')[0], n.x, n.y + 5);
    });

    // Summary
    ctx.fillStyle = '#260a1c';
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 860, 800, 140, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ec4899';
    ctx.font = '900 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('BÚSQUEDA VECTORIAL IN-PROCESS EN POSTGRES', 480, 915);
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('99% recall con latencia < 5ms sin necesidad de bases vectoriales externas.', 480, 955);
  }
});
