// Component: network_pipeline
// Visualizes packet transit, kernel filtering (eBPF), SSE event streams, and proxy hops.

window.registerComponent('network_pipeline', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-net-pipe">
        ${props.header ? `<div class="scene-category" id="netHeader">${props.header}</div>` : ''}
        <canvas id="netCanvas" width="960" height="1300"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#netCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp, lerp } = utils;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 960, 1300);

    // Hard cut exit
    const exitT = duration - 0.3;
    let exitAlpha = 1;
    let exitY = 0;
    if (t > exitT) {
      const p = (t - exitT) / 0.3;
      exitY = -p * p * 60;
      exitAlpha = clamp(1 - p * 1.3, 0, 1);
    }

    const headerEl = container.querySelector('#netHeader');
    if (headerEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      headerEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      headerEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;
    ctx.translate(0, exitY);

    const title = props.title || 'NETWORK TRANSIT PIPELINE';
    const subtitle = props.subtitle || 'ZERO-COPY KERNEL PACKET FILTERING';

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 36px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 480, 80);

    ctx.fillStyle = '#06b6d4';
    ctx.font = '600 20px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 125);

    const stages = props.stages || [
      { id: 'client', label: 'CLIENT HTTP/2', sub: 'TLS 1.3 ESTABLISHED', y: 220, color: '#38bdf8' },
      { id: 'kernel', label: 'LINUX KERNEL (eBPF)', sub: 'BYTECODE INSPECTION (0.01ms)', y: 520, color: '#f59e0b' },
      { id: 'backend', label: 'APPLICATION RUNTIME', sub: 'ZERO-COPY SOCKET READ', y: 820, color: '#10b981' }
    ];

    // 1. Draw connecting data highway pipes
    for (let i = 0; i < stages.length - 1; i++) {
      const yStart = stages[i].y + 55;
      const yEnd = stages[i + 1].y - 55;

      // Pipe background
      ctx.fillStyle = '#101014';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(430, yStart, 100, yEnd - yStart, 8);
      ctx.fill();
      ctx.stroke();

      // Moving packets inside pipe
      const numPackets = 4;
      for (let p = 0; p < numPackets; p++) {
        const pProgress = ((t * 1.5 + (p / numPackets)) % 1);
        const py = lerp(yStart + 10, yEnd - 10, pProgress);
        
        ctx.fillStyle = stages[i].color;
        ctx.beginPath();
        ctx.roundRect(445, py, 70, 18, 4);
        ctx.fill();

        ctx.fillStyle = '#09090b';
        ctx.font = '800 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('DATA', 480, py + 9);
      }
    }

    // 2. Draw stage cards
    stages.forEach((stage, i) => {
      const s = spring(Math.max(0, t - i * 0.12), 22, 0.72);
      ctx.save();
      ctx.translate(480, stage.y);
      ctx.scale(s, s);

      ctx.fillStyle = '#18181b';
      ctx.strokeStyle = stage.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(-380, -48, 760, 96, 14);
      ctx.fill();
      ctx.stroke();

      // Left stage icon pill
      ctx.fillStyle = stage.color;
      ctx.beginPath();
      ctx.arc(-330, 0, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#09090b';
      ctx.font = '900 14px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${i + 1}`, -330, 0);

      // Label & Sublabel
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(stage.label, -290, -8);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 16px "JetBrains Mono", monospace';
      ctx.fillText(stage.sub, -290, 22);

      // Right-side telemetry metric
      ctx.textAlign = 'right';
      ctx.fillStyle = stage.color;
      ctx.font = '700 18px "JetBrains Mono", monospace';
      ctx.fillText(stage.metric || '0.04ms p99', 340, 6);

      ctx.restore();
    });

    // Bottom telemetry terminal
    const bAlpha = clamp((t - 0.4) / 0.3, 0, 1);
    if (bAlpha > 0) {
      ctx.globalAlpha = bAlpha * exitAlpha;
      ctx.fillStyle = '#09090b';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(80, 960, 800, 220, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#71717a';
      ctx.font = '700 14px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('TELEMETRY CONSOLE // REAL-TIME KERNEL EVENTS', 110, 1000);

      const logs = props.logs || [
        { time: '00:00.012', event: 'PACKET_INSPECT', detail: 'eBPF tail-call passed // Zero socket buffer copy', color: '#10b981' },
        { time: '00:00.018', event: 'FLOW_ROUTED', detail: 'Direct memory mapping to backend worker thread', color: '#38bdf8' },
        { time: '00:00.024', event: 'RESPONSE_STREAM', detail: 'HTTP/2 multiplexed frame dispatched (Chunk 64KB)', color: '#fbbf24' }
      ];

      logs.forEach((l, idx) => {
        const ly = 1045 + idx * 42;
        ctx.fillStyle = '#52525b';
        ctx.font = '600 14px "JetBrains Mono", monospace';
        ctx.fillText(l.time, 110, ly);

        ctx.fillStyle = l.color;
        ctx.font = '700 14px "JetBrains Mono", monospace';
        ctx.fillText(`[${l.event}]`, 230, ly);

        ctx.fillStyle = '#d4d4d8';
        ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(l.detail, 420, ly);
      });
    }

    ctx.restore();
  }
});
