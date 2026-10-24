// Component: architecture_flow
// Clean engineering architecture diagram with discrete nodes, queues, and packet rails.

window.registerComponent('architecture_flow', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-arch-flow">
        ${props.header ? `<div class="scene-category" id="archHeader">${props.header}</div>` : ''}
        <canvas id="archCanvas" width="960" height="1300"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#archCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp } = utils;
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

    const headerEl = container.querySelector('#archHeader');
    if (headerEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      headerEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      headerEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;
    ctx.translate(0, exitY);

    const nodes = props.nodes || [
      { id: 'clients', label: 'CLIENT REQUESTS', sublabel: '10,000 CONCURRENT CONNS', color: '#38bdf8', y: 160 },
      { id: 'eventloop', label: 'SINGLE-THREADED EVENT LOOP', sublabel: 'I/O MULTIPLEXING (epoll/kqueue)', color: '#fbbf24', y: 520 },
      { id: 'storage', label: 'IN-MEMORY KEY-VALUE STORE', sublabel: 'DIRECT RAM ACCESS (O(1))', color: '#10b981', y: 880 }
    ];

    // 1. Draw Connecting Rails
    for (let i = 0; i < nodes.length - 1; i++) {
      const y1 = nodes[i].y + 55;
      const y2 = nodes[i + 1].y - 55;
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(480, y1);
      ctx.lineTo(480, y2);
      ctx.stroke();

      // Flow direction arrows
      const arrowY = y1 + (y2 - y1) * 0.5;
      ctx.fillStyle = '#3f3f46';
      ctx.beginPath();
      ctx.moveTo(473, arrowY - 6);
      ctx.lineTo(480, arrowY + 4);
      ctx.lineTo(487, arrowY - 6);
      ctx.closePath();
      ctx.fill();
    }

    // 2. Animate Traveling Packets
    const packetProgress = (t * 1.5) % 1;
    const packetY1 = (nodes[0].y + 60) + packetProgress * (nodes[1].y - nodes[0].y - 120);
    const packetY2 = (nodes[1].y + 60) + ((packetProgress + 0.4) % 1) * (nodes[2].y - nodes[1].y - 120);

    [packetY1, packetY2].forEach((py, idx) => {
      ctx.fillStyle = idx === 0 ? '#38bdf8' : '#10b981';
      ctx.fillRect(474, py - 12, 12, 24);
      ctx.strokeStyle = '#050505';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(474, py - 12, 12, 24);
    });

    // 3. Draw Nodes with Spring Entry
    nodes.forEach((node, idx) => {
      const dt = t - (0.15 + idx * 0.2);
      if (dt < 0) return;
      const s = spring(dt, 24, 0.65);
      const scale = 0.8 + 0.2 * s;
      const alpha = clamp(dt / 0.08, 0, 1);

      ctx.save();
      ctx.globalAlpha = alpha * exitAlpha;
      ctx.translate(480, node.y);
      ctx.scale(scale, scale);

      const w = 620, h = 110;
      // Background Box
      ctx.fillStyle = '#0f0f11';
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.strokeStyle = node.color || '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.strokeRect(-w / 2, -h / 2, w, h);

      // Status indicator light
      ctx.fillStyle = node.color || '#ffffff';
      ctx.beginPath();
      ctx.arc(-w / 2 + 30, 0, 6, 0, Math.PI * 2);
      ctx.fill();

      // Node label
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(node.label, -w / 2 + 55, -8);

      // Node sublabel
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 16px "JetBrains Mono", monospace';
      ctx.fillText(node.sublabel, -w / 2 + 55, 24);

      ctx.restore();
    });

    // 4. Middle Buffer Slots (between node 0 and 1)
    const queueSlots = props.queueSlots || 6;
    const activeSlots = Math.min(queueSlots, Math.floor(((t * 2) % queueSlots) + 1));
    const startX = 480 - (queueSlots * 24) / 2;
    const qY = 340;

    for (let i = 0; i < queueSlots; i++) {
      const sx = startX + i * 24;
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1;
      ctx.strokeRect(sx, qY - 14, 18, 28);
      if (i < activeSlots) {
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(sx + 2, qY - 12, 14, 24);
      }
    }
    ctx.fillStyle = '#71717a';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('NON-BLOCKING EVENT QUEUE', 480, qY + 32);

    ctx.restore();
  }
});
