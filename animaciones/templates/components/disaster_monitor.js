// Component: disaster_monitor
// Production Incident & Bottleneck Telemetry Simulator.
// Features progressive waveform plotting across the entire scene duration,
// discrete connection pool slot exhaustion, and live sequential log streaming.

window.registerComponent('disaster_monitor', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-disaster-monitor">
        <canvas id="dmCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#dmCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { clamp, lerp } = utils;
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

    const crashTime = props.crashTime !== undefined ? props.crashTime : Math.max(0.8, duration * 0.14);
    const isCrashed = t >= crashTime;
    const crashProgress = isCrashed ? clamp((t - crashTime) / (duration * 0.25), 0, 1) : 0;

    const title = (props.title || 'DIAGNÓSTICO DE INCIDENTE EN VIVO').toUpperCase();
    const subtitle = (props.subtitle || 'SATURACIÓN DE CONEXIONES & TIMEOUT').toUpperCase();

    // 1. Clean Header
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ef4444';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 40, 42);

    ctx.fillStyle = '#ffffff';
    if (mu) {
      mu.fitText(ctx, title, 40, 92, 880, 42, 26, '"Plus Jakarta Sans", sans-serif', '900');
    }

    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, 118);
    ctx.lineTo(920, 118);
    ctx.stroke();

    const boxX = 40;
    const boxW = 880;

    // 2. Status Banner + Discrete Connection Slots (y = 144..264)
    const bannerY = 144;
    const bannerH = 120;
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = isCrashed ? '#ef4444' : '#27272a';
    ctx.lineWidth = 1.5;
    ctx.fillRect(boxX, bannerY, boxW, bannerH);
    ctx.strokeRect(boxX, bannerY, boxW, bannerH);

    ctx.fillStyle = isCrashed ? '#ef4444' : '#10b981';
    ctx.fillRect(boxX, bannerY, 6, bannerH);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 21px "JetBrains Mono", monospace';
    const statusText = isCrashed
      ? (props.crashedStatus || 'ALERTA P0: 503 SERVICE UNAVAILABLE · POOL AGOTADO')
      : (props.healthyStatus || 'SISTEMA EN LÍNEA · PROCESANDO FLUJO');
    if (mu) {
      mu.fitText(ctx, statusText, boxX + 28, bannerY + 42, boxW - 56, 21, 15, '"JetBrains Mono", monospace', '800');
    }

    // Discrete Pool Slots inside Banner
    const totalSlots = 14;
    const usedSlots = isCrashed ? Math.min(totalSlots, 4 + Math.floor(crashProgress * 10)) : 3;
    if (mu && mu.drawDiscreteSlots) {
      mu.drawDiscreteSlots(ctx, 480, bannerY + 84, usedSlots, totalSlots, isCrashed ? '#ef4444' : '#10b981', 48, 28, 10);
    }

    // 3. Two Metric Cards (y = 284..468)
    const metricsY = 284;
    const cardW = 428;
    const cardH = 180;
    const cardGap = 24;

    const cards = [
      {
        label: 'LATENCIA P99 EN RESPUESTA',
        valStart: props.latencyNormal || 24,
        valEnd: props.latencyCrash || 12840,
        unit: 'ms',
        tag: isCrashed ? '▲ TIMEOUT EN CASCADA' : '● RESPUESTA NOMINAL'
      },
      {
        label: 'TASA DE RECHAZO / ERROR',
        valStart: 0.0,
        valEnd: 98.4,
        unit: '%',
        decimals: 1,
        tag: isCrashed ? '▲ PETICIONES REBOTADAS' : '● 0% PÉRDIDA'
      }
    ];

    cards.forEach((card, idx) => {
      const cx = boxX + idx * (cardW + cardGap);
      ctx.fillStyle = '#09090c';
      ctx.strokeStyle = isCrashed ? '#ef4444' : '#27272a';
      ctx.lineWidth = 1.5;
      ctx.fillRect(cx, metricsY, cardW, cardH);
      ctx.strokeRect(cx, metricsY, cardW, cardH);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.fillText(card.label, cx + 24, metricsY + 38);

      const valDisplay = mu
        ? mu.counterRoll(card.valStart, card.valEnd, crashProgress, {
            decimals: card.decimals || 0,
            suffix: card.unit,
            thousandSeparator: ','
          })
        : `${card.valEnd}${card.unit}`;

      ctx.fillStyle = isCrashed ? '#ef4444' : '#ffffff';
      ctx.font = '900 58px "JetBrains Mono", monospace';
      ctx.fillText(valDisplay, cx + 24, metricsY + 114);

      ctx.fillStyle = isCrashed ? '#fca5a5' : '#10b981';
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.fillText(card.tag, cx + 24, metricsY + 154);
    });

    // 4. Progressive Real-Time Waveform Plot (y = 484..744)
    const chartY = 484;
    const chartH = 260;
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.fillRect(boxX, chartY, boxW, chartH);
    ctx.strokeRect(boxX, chartY, boxW, chartH);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#71717a';
    ctx.font = '700 15px "JetBrains Mono", monospace';
    ctx.fillText('TIEMPO DE RESPUESTA BAJO CARGA', boxX + 24, chartY + 34);

    // Grid lines
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = 1;
    for (let g = 1; g <= 3; g++) {
      const ly = chartY + 45 + g * 50;
      ctx.beginPath();
      ctx.moveTo(boxX + 24, ly);
      ctx.lineTo(boxX + boxW - 24, ly);
      ctx.stroke();
    }

    // Progressive waveform drawn up to current time ratio
    const plotBottom = chartY + chartH - 28;
    const plotTop = chartY + 68;
    const maxPoints = 48;
    const activePoints = Math.max(4, Math.floor(clamp(t / (duration * 0.85), 0.1, 1) * maxPoints));

    ctx.beginPath();
    let lastPx = boxX + 28;
    let lastPy = plotBottom - 20;
    for (let p = 0; p < activePoints; p++) {
      const px = boxX + 28 + (p / (maxPoints - 1)) * (boxW - 56);
      let py = plotBottom - 22;
      if (p < 16) {
        py = plotBottom - 22 - Math.sin(p * 0.9) * 8;
      } else {
        const spike = clamp((p - 16) / 10, 0, 1);
        const jitter = ((p * 7) % 5) * 3;
        py = plotBottom - 22 - spike * (plotBottom - plotTop - 16) + jitter;
      }
      if (p === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
      lastPx = px;
      lastPy = py;
    }
    ctx.strokeStyle = isCrashed ? '#ef4444' : '#38bdf8';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Mechanical playhead square at tip of waveform
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(lastPx - 6, lastPy - 6, 12, 12);

    // 5. Live Streaming Production Logs Panel (y = 764..1004)
    const logY = 764;
    const logH = 240;
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.fillRect(boxX, logY, boxW, logH);
    ctx.strokeRect(boxX, logY, boxW, logH);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#71717a';
    ctx.font = '700 15px "JetBrains Mono", monospace';
    ctx.fillText('REGISTRO DEL SERVIDOR', boxX + 24, logY + 34);

    const logs = props.logs || [
      { time: '00:01.2', level: 'WARN', text: 'Cola de peticiones superando umbral de latencia', color: '#fbbf24' },
      { time: '00:02.4', level: 'ERR', text: 'Bloqueo de fila detectado en transacción activa', color: '#ef4444' },
      { time: '00:03.8', level: 'CRIT', text: 'Pool de conexiones saturado (100/100 en espera)', color: '#f87171' }
    ];

    logs.slice(0, 3).forEach((log, idx) => {
      const logAppearT = 0.25 + idx * (duration * 0.22);
      if (t < logAppearT) return;

      const rowY = logY + 78 + idx * 54;
      ctx.fillStyle = '#111116';
      ctx.fillRect(boxX + 24, rowY - 28, boxW - 48, 42);

      const badgeColor = log.color || (idx === 0 ? '#fbbf24' : '#ef4444');
      ctx.fillStyle = badgeColor;
      ctx.fillRect(boxX + 24, rowY - 28, 6, 42);

      ctx.textAlign = 'left';
      ctx.font = '700 17px "JetBrains Mono", monospace';
      ctx.fillStyle = '#71717a';
      ctx.fillText(`[${log.time || 'LIVE'}]`, boxX + 44, rowY - 2);

      ctx.fillStyle = badgeColor;
      ctx.fillText(log.level || 'ERR', boxX + 165, rowY - 2);

      ctx.fillStyle = '#e4e4e7';
      if (mu) {
        mu.fitText(ctx, log.text || '', boxX + 235, rowY - 2, boxW - 275, 18, 14, '"JetBrains Mono", monospace', '600');
      }
    });

    // 6. Synchronized Word-by-Word Caption Bar
    const vo = props.voiceover || props.takeaway || '';
    if (mu && mu.drawSyncCaption) {
      mu.drawSyncCaption(ctx, vo, t, duration, { accent: '#ef4444' });
    }

    ctx.restore();
  }
});
