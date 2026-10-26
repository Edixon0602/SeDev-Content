// Component: architecture_flow
// Clean engineering architecture diagram with discrete nodes, queues, and packet rails.
// Zero text overflow, dynamic node counts (supports 2, 3, 4+ nodes), and safe particle rails.

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

    const headerEl = container.querySelector('#archHeader');
    if (headerEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      headerEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      headerEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;
    ctx.translate(0, exitY);

    const title = props.title || 'DIAGRAMA DE ARQUITECTURA';
    const subtitle = props.subtitle || 'FLUJO DE DATOS Y LÍMITES DE DOMINIO';

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

    const rawNodes = props.nodes || [
      { id: 'clients', label: 'CLIENT REQUESTS', sublabel: '10,000 CONCURRENT CONNS', color: '#38bdf8' },
      { id: 'eventloop', label: 'SINGLE-THREADED EVENT LOOP', sublabel: 'I/O MULTIPLEXING (epoll)', color: '#fbbf24' },
      { id: 'storage', label: 'IN-MEMORY KEY-VALUE STORE', sublabel: 'DIRECT RAM ACCESS (O(1))', color: '#10b981' }
    ];

    const count = rawNodes.length;
    const startY = 200;
    const totalSpan = 600;

    const nodes = rawNodes.map((n, idx) => ({
      ...n,
      y: n.y !== undefined ? n.y : (startY + idx * Math.floor(totalSpan / Math.max(1, count - 1))),
      color: n.color || (idx === 0 ? '#38bdf8' : idx === 1 ? '#fbbf24' : '#10b981')
    }));

    // 1. Draw Connecting Rails & Traveling Packets
    for (let i = 0; i < nodes.length - 1; i++) {
      const y1 = nodes[i].y + 50;
      const y2 = nodes[i + 1].y - 50;

      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(480, y1);
      ctx.lineTo(480, y2);
      ctx.stroke();

      // Traveling pulse packet
      const packetProgress = ((t * 1.6 + i * 0.35) % 1);
      const py = lerp(y1 + 10, y2 - 10, packetProgress);

      ctx.fillStyle = nodes[i].color;
      ctx.beginPath();
      ctx.arc(480, py, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Draw Nodes with Spring Entry
    nodes.forEach((node, idx) => {
      const s = spring(Math.max(0, t - idx * 0.15), 22, 0.72);
      ctx.save();
      ctx.translate(480, node.y);
      ctx.scale(s, s);

      const w = 680, h = 96;

      ctx.fillStyle = '#121216';
      ctx.strokeStyle = node.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, 14);
      ctx.fill();
      ctx.stroke();

      // Left Accent Pill
      ctx.fillStyle = node.color;
      ctx.fillRect(-w / 2, -h / 2 + 16, 6, h - 32);

      // Label & Sublabel
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(node.label, 0, -8);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 13px "JetBrains Mono", monospace';
      ctx.fillText(node.sublabel || node.sub || '', 0, 22);

      ctx.restore();
    });

    // 3. Bottom Summary
    const bAlpha = clamp((t - 0.45) / 0.3, 0, 1);
    if (bAlpha > 0) {
      ctx.globalAlpha = bAlpha * exitAlpha;
      ctx.fillStyle = '#111116';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(70, 840, 820, 180, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 14px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('AISLAMIENTO DE LÍMITES ARQUITECTÓNICOS', 105, 885);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
      const sumArch = 'Módulos independientes comunicándose a través de interfaces explícitas en RAM.';
      if (mu) {
        mu.wrapText(ctx, sumArch, 105, 925, 750, 28, 2);
      } else {
        ctx.fillText(sumArch, 105, 925);
      }

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 14px "JetBrains Mono", monospace';
      ctx.fillText('Garantiza mantenibilidad a largo plazo sin sobrecarga de microservicios.', 105, 985);
    }

    ctx.restore();
  }
});
