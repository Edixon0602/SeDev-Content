// Component: network_pipeline
// Multi-hop Network & Event Stream Pipeline Visualizer.
// Features orthogonal data conduits, discrete square packets in transit,
// per-stage latency telemetry, and word-by-word synchronized captions.

window.registerComponent('network_pipeline', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-network-pipeline">
        <canvas id="pipelineCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#pipelineCanvas');
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

    const title = (props.title || 'TUBERÍA DE EVENTOS EN TIEMPO REAL').toUpperCase();
    const subtitle = (props.subtitle || 'TRANSMISIÓN SIN BLOQUEOS EXTREMO A EXTREMO').toUpperCase();

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

    const rawStages = props.stages || [
      { name: 'WEBHOOK / STREAM ENTRADA', tag: 'Recepción no bloqueante + firma HMAC', metric: '0.8 ms', color: '#38bdf8' },
      { name: 'VALIDADOR / FILTRO ESQUEMA', tag: 'Contrato tipado en memoria sin I/O', metric: '1.4 ms', color: '#fbbf24' },
      { name: 'DESPACHO TRANSACCIONAL', tag: 'Confirmación atómica e idempotente', metric: '2.9 ms', color: '#10b981' }
    ];

    const defaultColors = ['#38bdf8', '#fbbf24', '#10b981', '#a855f7'];
    const totalStages = Math.min(4, rawStages.length);
    const startY = 225;
    const totalSpan = 480;

    const stages = rawStages.slice(0, 4).map((st, i) => ({
      label: (st.label || st.name || `ETAPA 0${i + 1}`).toUpperCase(),
      sub: st.sub || st.tag || 'Canal activo',
      metric: st.metric || `${(1.1 + i * 0.9).toFixed(1)} ms`,
      color: st.color || defaultColors[i % defaultColors.length],
      y: startY + i * Math.floor(totalSpan / Math.max(1, totalStages - 1))
    }));

    // 2. Orthogonal Data Pipes with Traveling Square Frames
    for (let i = 0; i < stages.length - 1; i++) {
      const yStart = stages[i].y + 54;
      const yEnd = stages[i + 1].y - 54;
      const pipeH = yEnd - yStart;

      ctx.fillStyle = '#09090c';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.fillRect(420, yStart, 120, pipeH);
      ctx.strokeRect(420, yStart, 120, pipeH);

      const numPackets = 2;
      for (let p = 0; p < numPackets; p++) {
        const pProgress = ((t * 1.8 + (p / numPackets)) % 1);
        const py = lerp(yStart + 10, yEnd - 28, pProgress);

        ctx.fillStyle = stages[i].color;
        ctx.fillRect(434, py, 92, 20);

        ctx.fillStyle = '#050505';
        ctx.font = '900 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`FRAME_0${p + 1}`, 480, py + 14);
      }
    }

    // 3. Stage Mechanical Cards
    stages.forEach((stage, i) => {
      const s = spring(Math.max(0, t - i * 0.12), 24, 0.74);
      ctx.save();
      ctx.translate(480, stage.y);
      ctx.scale(s, s);

      ctx.fillStyle = '#09090c';
      ctx.strokeStyle = stage.color;
      ctx.lineWidth = 1.5;
      ctx.fillRect(-440, -54, 880, 108);
      ctx.strokeRect(-440, -54, 880, 108);

      // Left stage index block
      ctx.fillStyle = stage.color;
      ctx.fillRect(-440, -54, 72, 108);

      ctx.fillStyle = '#050505';
      ctx.font = '900 24px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`0${i + 1}`, -404, 8);

      // Stage Title & Subtitle
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      if (mu) {
        mu.fitText(ctx, stage.label, -342, -8, 560, 22, 16, '"Plus Jakarta Sans", sans-serif', '800');
      }

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 15px "JetBrains Mono", monospace';
      ctx.fillText(stage.sub, -342, 24);

      // Right Metric Box
      ctx.fillStyle = '#111116';
      ctx.strokeStyle = stage.color;
      ctx.lineWidth = 1.5;
      ctx.fillRect(250, -30, 164, 60);
      ctx.strokeRect(250, -30, 164, 60);

      ctx.textAlign = 'center';
      ctx.fillStyle = stage.color;
      ctx.font = '900 20px "JetBrains Mono", monospace';
      ctx.fillText(stage.metric, 332, 8);

      ctx.restore();
    });

    // 4. Bottom Telemetry Summary Box (y = 795..995)
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.5;
    ctx.fillRect(40, 795, 880, 200);
    ctx.strokeRect(40, 795, 880, 200);
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(40, 795, 8, 200);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#06b6d4';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.fillText('FLUJO SIN BLOQUEOS', 70, 838);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    const log1 = props.conclusion || 'Cada etapa procesa y libera el evento en milisegundos sin retener sockets abiertos.';
    if (mu) {
      mu.wrapText(ctx, log1, 70, 882, 820, 30, 2);
    }

    ctx.fillStyle = '#10b981';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText(props.takeaway || '✔ THROUGHPUT SOSTENIDO · 0 PÉRDIDA DE PAQUETES', 70, 964);

    // 5. Synchronized Word-by-Word Caption Bar
    if (mu && mu.drawSyncCaption) {
      mu.drawSyncCaption(ctx, props.voiceover || '', t, duration, { accent: '#06b6d4' });
    }

    ctx.restore();
  }
});
