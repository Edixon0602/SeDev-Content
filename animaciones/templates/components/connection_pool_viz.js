// Component: connection_pool_viz
// Concurrency & pooling visualizer: 3-Act Mechanical Simulation
// Phase 1 (0% -> 35%): Direct Connections Overload (100/100 Postgres slots full, clients rejected with 503).
// Phase 2 (35% -> 68%): PgBouncer Transaction Pooler engages & multiplexes FIFO queue.
// Phase 3 (68% -> 100%): 1,500+ concurrent clients served by 20 calm workers in 0.8ms (0 errors).

window.registerComponent('connection_pool_viz', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-conn-pool">
        <canvas id="poolCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#poolCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp, lerp } = utils;
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
    const isPhase1 = pRatio < 0.36; // Direct Crash
    const isPhase2 = pRatio >= 0.36 && pRatio < 0.68; // Multiplexing engagement
    const isPhase3 = pRatio >= 0.68; // Steady state 1,500 users OK

    const title = (props.title || '1,000 USUARIOS VS LÍMITE DE 100 CONEXIONES').toUpperCase();
    const subtitle = (props.subtitle || 'MULTIPLEXACIÓN EN MODO TRANSACCIÓN').toUpperCase();

    // 1. Clean Header
    ctx.textAlign = 'left';
    ctx.fillStyle = '#06b6d4';
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

    // 2. Top Phase Status Strip (y = 140..216)
    const statusAccent = isPhase1 ? '#ef4444' : (isPhase2 ? '#fbbf24' : '#10b981');
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = statusAccent;
    ctx.lineWidth = 1.5;
    ctx.fillRect(40, 140, 880, 74);
    ctx.strokeRect(40, 140, 880, 74);
    ctx.fillStyle = statusAccent;
    ctx.fillRect(40, 140, 6, 74);

    ctx.textAlign = 'left';
    ctx.fillStyle = statusAccent;
    ctx.font = '800 18px "JetBrains Mono", monospace';
    const phaseBanner = isPhase1
      ? '✖ SIN POOLER: 100/100 SOCKETS OCUPADOS · RECHAZANDO TRÁFICO (ERR 500)'
      : (isPhase2
        ? '⚡ ACTIVANDO PGBOUNCER: ENCOLANDO TRANSACCIONES EN RAM (2ms/QUERY)'
        : '✔ MODO TRANSACCIÓN ACTIVO: 1,500 CLIENTES -> 20 WORKERS REALES (0% ERROR)');
    ctx.fillText(phaseBanner, 66, 184);

    const clY = 236;
    const clH = 540;

    // 3. Left Column: Concurrent Clients (x = 40, w = 240)
    const clX = 40;
    const clW = 240;
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = isPhase1 ? '#ef4444' : '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.fillRect(clX, clY, clW, clH);
    ctx.strokeRect(clX, clY, clW, clH);

    ctx.textAlign = 'left';
    ctx.fillStyle = isPhase1 ? '#ef4444' : '#38bdf8';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.fillText('TRÁFICO ENTRADA', clX + 20, clY + 34);

    const activeUsers = isPhase1 ? 312 : (isPhase2 ? Math.round(lerp(312, 1500, (pRatio - 0.36) / 0.32)) : 1500);
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 28px "JetBrains Mono", monospace';
    ctx.fillText(`${activeUsers} REQ/S`, clX + 20, clY + 70);

    for (let i = 0; i < 12; i++) {
      const cy = clY + 94 + i * 35;
      const isRejected = isPhase1 && i >= 4;
      ctx.fillStyle = isRejected ? '#1f0b0e' : '#111116';
      ctx.strokeStyle = isRejected ? '#ef4444' : '#27272a';
      ctx.lineWidth = 1;
      ctx.fillRect(clX + 18, cy, clW - 36, 27);
      ctx.strokeRect(clX + 18, cy, clW - 36, 27);

      ctx.fillStyle = isRejected ? '#fca5a5' : '#d4d4d8';
      ctx.font = '600 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`req_${1040 + i * 7}`, clX + 28, cy + 18);

      ctx.textAlign = 'right';
      ctx.fillStyle = isRejected ? '#ef4444' : '#10b981';
      ctx.font = '800 11px "JetBrains Mono", monospace';
      ctx.fillText(isRejected ? '503 DROP' : '200 OK', clX + clW - 26, cy + 18);
    }

    // 4. Center Column: PgBouncer Multiplexer (x = 340, w = 280)
    const pbX = 340;
    const pbW = 280;
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = isPhase1 ? '#3f3f46' : '#06b6d4';
    ctx.lineWidth = isPhase1 ? 1.5 : 2;
    ctx.fillRect(pbX, clY, pbW, clH);
    ctx.strokeRect(pbX, clY, pbW, clH);

    ctx.textAlign = 'center';
    ctx.fillStyle = isPhase1 ? '#ef4444' : '#06b6d4';
    ctx.font = '800 17px "JetBrains Mono", monospace';
    ctx.fillText(isPhase1 ? 'CONEXIÓN DIRECTA' : 'PGBOUNCER POOLER', pbX + pbW / 2, clY + 34);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '700 13px "JetBrains Mono", monospace';
    ctx.fillText(isPhase1 ? '1 CLIENTE = 1 PROCESO OS' : 'COLA TRANSACCIONAL FIFO', pbX + pbW / 2, clY + 58);

    // Inner multiplexer chamber
    ctx.fillStyle = '#0d1117';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.fillRect(pbX + 20, clY + 80, pbW - 40, 340);
    ctx.strokeRect(pbX + 20, clY + 80, pbW - 40, 340);

    // Draw discrete FIFO transaction slots inside PgBouncer
    for (let r = 0; r < 6; r++) {
      const sy = clY + 100 + r * 52;
      const slotActive = isPhase1 ? true : ((Math.floor(t * 8) + r) % 3 !== 0);
      const slotCol = isPhase1 ? '#ef4444' : (slotActive ? '#06b6d4' : '#1e293b');
      ctx.fillStyle = '#111822';
      ctx.strokeStyle = slotCol;
      ctx.lineWidth = 1.5;
      ctx.fillRect(pbX + 36, sy, pbW - 72, 38);
      ctx.strokeRect(pbX + 36, sy, pbW - 72, 38);

      ctx.textAlign = 'left';
      ctx.fillStyle = isPhase1 ? '#fca5a5' : '#e2e8f0';
      ctx.font = '700 12px "JetBrains Mono", monospace';
      ctx.fillText(
        isPhase1 ? `LOCK WAIT #${r + 1} (IDLE IN TX)` : `TX_SLOT_0${r + 1} · LEASE: 1.8ms`,
        pbX + 48,
        sy + 24
      );
    }

    // Bottom metric inside center column
    ctx.textAlign = 'center';
    ctx.fillStyle = isPhase1 ? '#ef4444' : '#10b981';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.fillText(isPhase1 ? 'COLA BLOQUEADA' : 'RATIO DE REUSO: 75:1', pbX + pbW / 2, clY + 462);
    ctx.fillStyle = '#71717a';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText(isPhase1 ? 'Agotamiento de descriptores' : 'Cero fork() por petición', pbX + pbW / 2, clY + 492);

    // 5. Right Column: PostgreSQL Server (x = 680, w = 240)
    const pgX = 680;
    const pgW = 240;
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = isPhase1 ? '#ef4444' : '#10b981';
    ctx.lineWidth = 1.5;
    ctx.fillRect(pgX, clY, pgW, clH);
    ctx.strokeRect(pgX, clY, pgW, clH);

    ctx.textAlign = 'left';
    ctx.fillStyle = isPhase1 ? '#ef4444' : '#10b981';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.fillText('POSTGRES ENGINE', pgX + 20, clY + 34);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 24px "JetBrains Mono", monospace';
    ctx.fillText(isPhase1 ? '100/100 FULL' : '20 WORKERS OK', pgX + 20, clY + 68);

    for (let w = 0; w < 8; w++) {
      const wy = clY + 94 + w * 52;
      const busy = ((Math.floor(t * 10) + w) % 2 === 0);
      ctx.fillStyle = isPhase1 ? '#220a0d' : '#0b1914';
      ctx.strokeStyle = isPhase1 ? '#ef4444' : '#10b981';
      ctx.lineWidth = 1.5;
      ctx.fillRect(pgX + 18, wy, pgW - 36, 40);
      ctx.strokeRect(pgX + 18, wy, pgW - 36, 40);

      ctx.textAlign = 'left';
      ctx.fillStyle = isPhase1 ? '#fca5a5' : '#10b981';
      ctx.font = '800 12px "JetBrains Mono", monospace';
      ctx.fillText(`PID_${4200 + w}`, pgX + 28, wy + 17);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText(isPhase1 ? 'RAM: 14MB (STUCK)' : 'RAM: 8MB · 0.8ms', pgX + 28, wy + 33);

      // Square mechanical status LED
      ctx.fillStyle = isPhase1 ? '#ef4444' : (busy ? '#10b981' : '#064e3b');
      ctx.fillRect(pgX + pgW - 36, wy + 14, 10, 10);
    }

    // 6. Mechanical Orthogonal Packet Streams Between Columns
    for (let p = 0; p < 6; p++) {
      const pt = (t * 2.2 + p * 0.18) % 1;
      const px1 = lerp(clX + clW, pbX, pt);
      const py1 = clY + 115 + p * 68;
      ctx.fillStyle = isPhase1 ? '#ef4444' : '#38bdf8';
      ctx.fillRect(px1 - 5, py1 - 5, 10, 10);
    }

    for (let p = 0; p < 4; p++) {
      const pt = (t * 2.8 + p * 0.25) % 1;
      const px2 = lerp(pbX + pbW, pgX, pt);
      const py2 = clY + 140 + p * 95;
      ctx.fillStyle = isPhase1 ? '#ef4444' : '#10b981';
      ctx.fillRect(px2 - 6, py2 - 6, 12, 12);
    }

    // 7. Bottom Telemetry Comparison Panel (y = 800..995)
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = isPhase1 ? '#ef4444' : '#06b6d4';
    ctx.lineWidth = 1.5;
    ctx.fillRect(40, 800, 880, 195);
    ctx.strokeRect(40, 800, 880, 195);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#06b6d4';
    ctx.font = '800 17px "JetBrains Mono", monospace';
    ctx.fillText('CONEXIÓN DIRECTA VS PGBOUNCER', 68, 840);

    // Metric Row 1 (Direct - struck through in Phase 3)
    ctx.fillStyle = isPhase3 ? '#71717a' : '#ef4444';
    const lineDirect = '✖ SIN POOLER: 100 clientes = 1.2 GB RAM · Cliente #101 recibe Error 500';
    if (mu) {
      mu.fitText(ctx, lineDirect, 68, 890, 824, 18, 13, '"JetBrains Mono", monospace', '700');
    } else {
      ctx.font = '700 17px "JetBrains Mono", monospace';
      ctx.fillText(lineDirect, 68, 890);
    }
    if (isPhase3) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(68, 884);
      ctx.lineTo(860, 884);
      ctx.stroke();
    }

    // Metric Row 2 (PgBouncer Winner)
    ctx.fillStyle = '#10b981';
    const linePooler = '✔ CON PGBOUNCER: 1,500 clientes = 180 MB RAM · Latencia P99: 2.1ms';
    if (mu) {
      mu.fitText(ctx, linePooler, 68, 948, 824, 19, 14, '"JetBrains Mono", monospace', '800');
    } else {
      ctx.font = '800 18px "JetBrains Mono", monospace';
      ctx.fillText(linePooler, 68, 948);
    }

    // 8. Synchronized Word-by-Word Caption Bar
    if (mu && mu.drawSyncCaption) {
      mu.drawSyncCaption(ctx, props.voiceover || '', t, duration, { accent: statusAccent });
    }

    ctx.restore();
  }
});
