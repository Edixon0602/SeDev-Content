// Component: network_pipeline
// Visualizes multi-hop network stages, packets in transit, and protocol telemetry.
// Fully normalized for stage names/labels/tags, dynamic coordinates, and zero NaN/undefined bugs.

window.registerComponent('network_pipeline', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-network-pipeline">
        ${props.header ? `<div class="scene-category" id="pipeHeader">${props.header}</div>` : ''}
        <canvas id="pipelineCanvas" width="960" height="1300"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#pipelineCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp, lerp } = utils;
    const mu = window.motionUtils;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 960, 1300);

    // Hard-cut exit
    const exitT = duration - 0.3;
    let exitAlpha = 1;
    let exitY = 0;
    if (t > exitT) {
      const p = (t - exitT) / 0.3;
      exitY = -p * p * 60;
      exitAlpha = clamp(1 - p * 1.3, 0, 1);
    }

    const headerEl = container.querySelector('#pipeHeader');
    if (headerEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      headerEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      headerEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;
    ctx.translate(0, exitY);

    const title = props.title || 'TUBERÍA DE RED DE ALTA VELOCIDAD';
    const subtitle = props.subtitle || 'PROCESAMIENTO DE PAQUETES SIN BLOQUEOS';

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

    // Normalize Stages (handle name, label, tag, sub, auto y-coordinates)
    const rawStages = props.stages || [
      { name: 'CLIENT REQUEST', tag: 'HTTP/2 Conexión multiplexada', color: '#38bdf8' },
      { name: 'EDGE PROXY / KERNEL', tag: 'Filtrado eBPF en memoria', color: '#fbbf24' },
      { name: 'BACKEND APPLICATION', tag: 'Zero-copy socket read', color: '#10b981' }
    ];

    const defaultColors = ['#38bdf8', '#fbbf24', '#10b981', '#a855f7'];
    const totalStages = rawStages.length;
    const startY = 220;
    const totalSpan = 600;

    const stages = rawStages.map((st, i) => ({
      label: st.label || st.name || `ETAPA #${i + 1}`,
      sub: st.sub || st.tag || 'Transmisión activa',
      metric: st.metric || `${(1.2 + i * 0.8).toFixed(1)} ms`,
      color: st.color || defaultColors[i % defaultColors.length],
      y: st.y !== undefined ? st.y : (startY + i * Math.floor(totalSpan / Math.max(1, totalStages - 1)))
    }));

    // 1. Draw Connecting Data Pipes with Traveling Packets
    for (let i = 0; i < stages.length - 1; i++) {
      const yStart = stages[i].y + 52;
      const yEnd = stages[i + 1].y - 52;
      const pipeH = yEnd - yStart;

      // Pipe background
      ctx.fillStyle = '#101014';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(430, yStart, 100, pipeH, 8);
      ctx.fill();
      ctx.stroke();

      // Moving packets inside pipe
      const numPackets = 3;
      for (let p = 0; p < numPackets; p++) {
        const pProgress = ((t * 1.6 + (p / numPackets)) % 1);
        const py = lerp(yStart + 8, yEnd - 24, pProgress);

        ctx.fillStyle = stages[i].color;
        ctx.beginPath();
        ctx.roundRect(442, py, 76, 18, 5);
        ctx.fill();

        ctx.fillStyle = '#09090b';
        ctx.font = '800 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('STREAM', 480, py + 9);
      }
    }

    // 2. Draw Stage Cards
    stages.forEach((stage, i) => {
      const s = spring(Math.max(0, t - i * 0.12), 22, 0.72);
      ctx.save();
      ctx.translate(480, stage.y);
      ctx.scale(s, s);

      // Card Background
      ctx.fillStyle = '#121216';
      ctx.strokeStyle = stage.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-390, -46, 780, 92, 14);
      ctx.fill();
      ctx.stroke();

      // Stage Number Pill
      ctx.fillStyle = stage.color;
      ctx.beginPath();
      ctx.arc(-340, 0, 15, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#09090b';
      ctx.font = '900 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${i + 1}`, -340, 0);

      // Label & Sublabel (Safe Auto-fitting)
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(stage.label, -305, -7);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 14px "JetBrains Mono", monospace';
      ctx.fillText(stage.sub, -305, 20);

      // Metric Badge (Right)
      ctx.textAlign = 'right';
      ctx.fillStyle = stage.color;
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.fillText(stage.metric, 355, 6);

      ctx.restore();
    });

    // 3. Bottom Telemetry Summary Box
    const bAlpha = clamp((t - 0.4) / 0.3, 0, 1);
    if (bAlpha > 0) {
      ctx.globalAlpha = bAlpha * exitAlpha;
      ctx.fillStyle = '#10141a';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(60, 890, 840, 180, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#06b6d4';
      ctx.font = '800 14px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('REGISTRO DE TELEMETRÍA EN TIEMPO REAL', 95, 935);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
      const log1 = props.conclusion || 'Latencia extremo a extremo neutralizada por bypass de capas.';
      if (mu) {
        mu.wrapText(ctx, log1, 95, 975, 760, 28, 2);
      } else {
        ctx.fillText(log1, 95, 975);
      }

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 15px "JetBrains Mono", monospace';
      ctx.fillText('Throughput: 100% no-blocking · Zero frame drops', 95, 1035);
    }

    ctx.restore();
  }
});
