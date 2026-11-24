// Component: latency_scale
// Logarithmic Hardware & System Latency Scale Visualizer (CPU -> RAM -> NVMe -> Network -> SaaS/Polling).
// Features progressive bar fills, mechanical playhead markers, and real-time synchronized captions.

window.registerComponent('latency_scale', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-lat-scale">
        <canvas id="latCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#latCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp } = utils;
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

    const title = (props.title || 'ESCALA REAL DE LATENCIA DE SISTEMAS').toUpperCase();
    const subtitle = (props.subtitle || 'COMPARATIVA DE VELOCIDAD POR ORDEN DE MAGNITUD').toUpperCase();

    // 1. Clean Header
    ctx.textAlign = 'left';
    ctx.fillStyle = '#f59e0b';
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

    const tiers = props.tiers || [
      { name: 'MEMORIA RAM / ÍNDICE B-TREE', latency: '0.08 ms', ratio: 0.06, color: '#10b981', human: 'Lectura directa por puntero sin bloqueo' },
      { name: 'WEBSOCKET PUSH EN VIVO', latency: '2.4 ms', ratio: 0.16, color: '#38bdf8', human: 'Evento entregado en el mismo milisegundo' },
      { name: 'WORKER ASÍNCRONO EN VPS', latency: '12.0 ms', ratio: 0.30, color: '#a855f7', human: 'Procesamiento en segundo plano con cola' },
      { name: 'HTTP POLLING / N+1 QUERIES', latency: '1,850 ms', ratio: 0.68, color: '#f59e0b', human: 'Saturación de sockets y espera acumulada' },
      { name: 'FULL TABLE SCAN / BLOQUEO', latency: '14,200 ms', ratio: 1.0, color: '#ef4444', human: 'Timeout en cascada y caída de checkout' }
    ];

    const startY = 155;
    const rowH = 122;

    tiers.slice(0, 5).forEach((tier, i) => {
      const ty = startY + i * rowH;
      const s = spring(Math.max(0, t - i * 0.09), 22, 0.76);

      ctx.save();
      ctx.translate(480, ty + 48);
      ctx.scale(s, s);
      ctx.translate(-480, -(ty + 48));

      ctx.fillStyle = '#09090c';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.fillRect(40, ty, 880, 106);
      ctx.strokeRect(40, ty, 880, 106);

      // Left color marker
      ctx.fillStyle = tier.color;
      ctx.fillRect(40, ty, 6, 106);

      // Tier Name & Latency Value
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(tier.name, 66, ty + 32);

      ctx.textAlign = 'right';
      ctx.fillStyle = tier.color;
      ctx.font = '900 22px "JetBrains Mono", monospace';
      ctx.fillText(tier.latency, 896, ty + 32);

      // Bar Track
      const trackX = 66;
      const trackY = ty + 44;
      const trackW = 830;
      const trackH = 24;
      ctx.fillStyle = '#121217';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1;
      ctx.fillRect(trackX, trackY, trackW, trackH);
      ctx.strokeRect(trackX, trackY, trackW, trackH);

      // Progressive Bar Fill
      const barProg = clamp((t - i * 0.15) / (duration * 0.55), 0, 1);
      const easeBar = 1 - Math.pow(1 - barProg, 3);
      const fillW = Math.max(18, trackW * tier.ratio * easeBar);

      ctx.fillStyle = tier.color;
      ctx.fillRect(trackX + 2, trackY + 2, fillW - 4, trackH - 4);

      // Mechanical square marker at tip
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(trackX + fillW - 6, trackY - 2, 8, trackH + 4);

      // Explanation Subtext
      ctx.textAlign = 'left';
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 13px "JetBrains Mono", monospace';
      ctx.fillText(tier.human, 66, ty + 90);

      ctx.restore();
    });

    // Bottom Conclusion Box (y = 785..995)
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.fillRect(40, 785, 880, 210);
    ctx.strokeRect(40, 785, 880, 210);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(40, 785, 8, 210);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#f59e0b';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.fillText(props.bannerBadge || 'DIAGNÓSTICO DE ÓRDENES DE MAGNITUD', 70, 828);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    const conclusion = props.conclusion || 'La diferencia entre leer un índice en memoria y escanear disco bajo bloqueo es de 10,000x.';
    if (mu) {
      mu.wrapText(ctx, conclusion, 70, 872, 820, 30, 2);
    }

    ctx.fillStyle = '#10b981';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText(props.conclusionSub || '✔ DIFERENCIA MEDIDA EN PRODUCCIÓN', 70, 960);

    // Synchronized Word-by-Word Caption Bar
    if (mu && mu.drawSyncCaption) {
      mu.drawSyncCaption(ctx, props.voiceover || '', t, duration, { accent: '#f59e0b' });
    }

    ctx.restore();
  }
});
