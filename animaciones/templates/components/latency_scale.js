// Component: latency_scale
// Visualizes hardware logarithmic latency tiers (CPU vs RAM vs NVMe vs Network).
// Zero text overflow, safe vertical spacing, animated particle tips.

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
    const mu = window.motionUtils;
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

    const title = props.title || 'ESCALA DE LATENCIA DE HARDWARE';
    const subtitle = props.subtitle || 'EL COSTE OCULTO DEL SALTO DE RED';

    // Auto-fit Title and Subtitle
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    if (mu) {
      mu.fitText(ctx, title, 480, 65, 840, 32, 22, '"Plus Jakarta Sans", sans-serif', '800');
    } else {
      ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(title, 480, 65);
    }

    ctx.fillStyle = '#f59e0b';
    ctx.font = '700 17px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 102);

    const tiers = props.tiers || [
      { name: 'CPU L1 CACHE', latency: '0.5 ns', ratio: 0.04, color: '#38bdf8', human: '1 segundo en escala humana' },
      { name: 'MEMORIA RAM (DDR5)', latency: '80 ns', ratio: 0.14, color: '#10b981', human: '3.3 minutos humanos' },
      { name: 'DISCO SSD NVMe', latency: '50 µs', ratio: 0.38, color: '#a855f7', human: '2.3 días de espera' },
      { name: 'SQLITE LOCAL EMBEBIDO', latency: '0.02 ms', ratio: 0.52, color: '#fbbf24', human: '4.6 días humanos' },
      { name: 'SALTO DE RED (CLOUD / RDS)', latency: '15 ms', ratio: 1.0, color: '#ef4444', human: '11.8 meses (!)' }
    ];

    const startY = 175;
    const gap = 120;

    tiers.forEach((tier, i) => {
      const ty = startY + i * gap;
      const s = spring(Math.max(0, t - i * 0.1), 20, 0.75);

      ctx.save();
      ctx.translate(80, ty);
      ctx.scale(s, s);

      // Label & Time
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(tier.name, 0, 0);

      ctx.textAlign = 'right';
      ctx.fillStyle = tier.color;
      ctx.font = '700 18px "JetBrains Mono", monospace';
      ctx.fillText(tier.latency, 800, 0);

      // Bar container
      ctx.fillStyle = '#16161b';
      ctx.beginPath();
      ctx.roundRect(0, 14, 800, 32, 6);
      ctx.fill();

      // Filled active bar with cubic easing
      const barProg = clamp(t / (0.35 + i * 0.12), 0, 1);
      const easeBar = 1 - Math.pow(1 - barProg, 3);
      const barW = Math.max(25, 800 * tier.ratio * easeBar);

      ctx.fillStyle = tier.color;
      ctx.beginPath();
      ctx.roundRect(0, 14, barW, 32, 6);
      ctx.fill();

      // Animated tip spark
      if (barProg < 1.0) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(barW, 30, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Human analogy label
      ctx.textAlign = 'left';
      ctx.fillStyle = '#71717a';
      ctx.font = '600 13px "JetBrains Mono", monospace';
      ctx.fillText(tier.human, 0, 68);

      ctx.restore();
    });

    // Bottom Conclusion Card (Positioned safely at Y = 820 to 1030)
    const cAlpha = clamp((t - 0.45) / 0.3, 0, 1);
    if (cAlpha > 0) {
      ctx.globalAlpha = cAlpha * exitAlpha;
      ctx.fillStyle = '#111116';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(70, 800, 820, 210, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.font = '800 14px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(props.bannerBadge || 'CONCLUSIÓN DE ARQUITECTURA', 105, 845);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
      const conclusion = props.conclusion || 'Hacer una query por red es 150.000 veces más lento que acceder a memoria RAM.';
      if (mu) {
        mu.wrapText(ctx, conclusion, 105, 885, 750, 30, 2);
      } else {
        ctx.fillText(conclusion, 105, 885);
      }

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
      const sub = props.conclusionSub || 'Mantener datos calientes en el mismo proceso elimina los cuellos de botella de red.';
      if (mu) {
        mu.wrapText(ctx, sub, 105, 955, 750, 24, 2);
      } else {
        ctx.fillText(sub, 105, 955);
      }
    }

    ctx.restore();
  }
});
