// Component: latency_scale
// Visualizes hardware logarithmic latency tiers (CPU vs RAM vs NVMe vs Network RDS).

window.registerComponent('latency_scale', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-lat-scale">
        ${props.header ? `<div class="scene-category" id="latHeader">${props.header}</div>` : ''}
        <canvas id="latCanvas" width="960" height="1300"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#latCanvas');
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

    const headerEl = container.querySelector('#latHeader');
    if (headerEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      headerEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      headerEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;
    ctx.translate(0, exitY);

    const title = props.title || 'HARDWARE LATENCY GAP';
    const subtitle = props.subtitle || 'THE COST OF LEAVING THE PROCESS';

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 36px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 480, 80);

    ctx.fillStyle = '#f59e0b';
    ctx.font = '600 20px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 125);

    const tiers = props.tiers || [
      { name: 'CPU L1 CACHE', latency: '0.5 ns', ratio: 0.04, color: '#38bdf8', human: '1 segundo humano' },
      { name: 'RAM (DDR5 BUS)', latency: '100 ns', ratio: 0.14, color: '#10b981', human: '3.3 minutos' },
      { name: 'NVMe SSD I/O', latency: '100 µs', ratio: 0.38, color: '#a855f7', human: '2.3 días' },
      { name: 'LOCAL SQLITE DB', latency: '0.2 ms', ratio: 0.52, color: '#fbbf24', human: '4.6 días' },
      { name: 'AWS RDS (NETWORK HOP)', latency: '15 ms', ratio: 1.0, color: '#ef4444', human: '11.8 meses (!)' }
    ];

    const startY = 220;
    const gap = 145;

    tiers.forEach((tier, i) => {
      const ty = startY + i * gap;
      const s = spring(Math.max(0, t - i * 0.1), 20, 0.75);

      ctx.save();
      ctx.translate(80, ty);
      ctx.scale(s, s);

      // Label & Time
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(tier.name, 0, 0);

      ctx.textAlign = 'right';
      ctx.fillStyle = tier.color;
      ctx.font = '700 22px "JetBrains Mono", monospace';
      ctx.fillText(tier.latency, 800, 0);

      // Bar container
      ctx.fillStyle = '#18181b';
      ctx.beginPath();
      ctx.roundRect(0, 16, 800, 36, 8);
      ctx.fill();

      // Filled active bar
      const barProg = clamp(t / (0.4 + i * 0.15), 0, 1);
      const easeBar = 1 - Math.pow(1 - barProg, 3);
      const barW = Math.max(30, 800 * tier.ratio * easeBar);

      ctx.fillStyle = tier.color;
      ctx.beginPath();
      ctx.roundRect(0, 16, barW, 36, 8);
      ctx.fill();

      // Human analogy label
      ctx.textAlign = 'left';
      ctx.fillStyle = '#71717a';
      ctx.font = '600 14px "JetBrains Mono", monospace';
      ctx.fillText(`Escala equivalente: ${tier.human}`, 0, 75);

      ctx.restore();
    });

    // Conclusion banner
    const cAlpha = clamp((t - 0.5) / 0.3, 0, 1);
    if (cAlpha > 0) {
      ctx.globalAlpha = cAlpha * exitAlpha;
      ctx.fillStyle = '#101014';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(80, 990, 800, 180, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(props.bannerBadge || 'ANÁLISIS DE RENDIMIENTO EN HARDWARE', 120, 1040);

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(props.conclusion || 'Hacer una query a RDS por red es 150.000x más lento que leer RAM.', 120, 1090);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 17px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(props.conclusionSub || 'Mantener la base in-process elimina el 90% de la latencia de tu backend.', 120, 1125);
    }

    ctx.restore();
  }
});
