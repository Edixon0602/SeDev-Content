// Component: versus_race
// Mechanical Side-by-Side Execution Race & Discrete Packet Throughput Simulator.
// Lane A dispatches discrete work blocks at millisecond speed; Lane B stalls on I/O or locks.

window.registerComponent('versus_race', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-versus-race">
        <canvas id="vrCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#vrCanvas');
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

    const title = (props.title || 'BENCHMARK DE EJECUCIÓN REAL').toUpperCase();
    const subtitle = (props.subtitle || 'COMPARATIVA BAJO CARGA CONCURRENTE').toUpperCase();

    // 1. Clean Header
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fbbf24';
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

    const raceStartT = props.raceStart !== undefined ? props.raceStart : 0.35;
    const isRacing = t >= raceStartT;
    const raceElapsed = isRacing ? (t - raceStartT) : 0;

    const sideA = props.sideA || props.laneA || {
      name: 'ARQUITECTURA OPTIMIZADA',
      tag: 'EJECUCIÓN DIRECTA SIN BLOQUEOS',
      targetMs: 3.4,
      displayTime: '3.4ms',
      memory: '3.2 MB',
      cacheMisses: '0.1%',
      speedup: '120x MÁS RÁPIDO'
    };

    const sideB = props.sideB || props.laneB || {
      name: 'ENFOQUE TRADICIONAL LENTO',
      tag: 'CUELLO DE BOTELLA EN COLA',
      targetMs: 18400,
      displayTime: '18,400ms',
      memory: '240 MB',
      cacheMisses: 'TABLE LOCK',
      bottleneck: 'TIMEOUT / BLOQUEO'
    };

    const fastDuration = Math.max(1.4, duration * 0.26);
    const progressA = isRacing ? clamp(raceElapsed / fastDuration, 0, 1) : 0;
    const finishedA = progressA >= 1;

    const slowDuration = Math.max(3.8, duration - 0.8);
    const progressB = isRacing ? clamp(raceElapsed / slowDuration, 0, 0.36) : 0; // Stalls around 36%!

    const laneX = 40;
    const laneW = 880;

    const drawRaceLane = (y, h, side, progress, isWinnerLane, finished) => {
      const accent = isWinnerLane ? '#10b981' : '#ef4444';
      ctx.fillStyle = '#09090c';
      ctx.strokeStyle = finished ? accent : (isWinnerLane ? '#27272a' : '#ef4444');
      ctx.lineWidth = 1.5;
      ctx.fillRect(laneX, y, laneW, h);
      ctx.strokeRect(laneX, y, laneW, h);

      // Left vertical status bar
      ctx.fillStyle = accent;
      ctx.fillRect(laneX, y, 6, h);

      // Top badge
      ctx.textAlign = 'left';
      ctx.fillStyle = accent;
      ctx.font = '800 16px "JetBrains Mono", monospace';
      ctx.fillText(
        isWinnerLane ? 'ARQUITECTURA OPTIMIZADA' : 'ENFOQUE TRADICIONAL',
        laneX + 28,
        y + 38
      );

      // Name & Tag
      ctx.fillStyle = '#ffffff';
      if (mu) {
        mu.fitText(ctx, side.name, laneX + 28, y + 84, laneW - 320, 36, 22, '"Plus Jakarta Sans", sans-serif', '900');
      }
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 18px "JetBrains Mono", monospace';
      ctx.fillText(side.tag || '', laneX + 28, y + 114);

      // Stopwatch on right
      ctx.textAlign = 'right';
      ctx.fillStyle = accent;
      ctx.font = '900 54px "JetBrains Mono", monospace';
      let clockStr = '0.0ms';
      if (isRacing) {
        if (isWinnerLane) {
          const val = finished ? side.targetMs : (side.targetMs * progress);
          clockStr = finished ? side.displayTime : `${val.toFixed(1)}ms`;
        } else {
          const val = Math.min(side.targetMs || 15000, Math.round(raceElapsed * 3800));
          clockStr = `${val.toLocaleString()}ms`;
        }
      }
      ctx.fillText(clockStr, laneX + laneW - 28, y + 88);

      // Discrete 12-Slot Mechanical Packet Track (y + 142)
      const slotCount = 12;
      const trackX = laneX + 28;
      const trackW = laneW - 56;
      const gap = 8;
      const slotW = (trackW - gap * (slotCount - 1)) / slotCount;
      const slotH = 44;
      const slotY = y + 140;

      const activeSlots = isWinnerLane
        ? Math.round(progress * slotCount)
        : Math.min(4, Math.floor(progress * slotCount));

      for (let i = 0; i < slotCount; i++) {
        const sx = trackX + i * (slotW + gap);
        ctx.strokeStyle = '#27272a';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(sx, slotY, slotW, slotH);

        if (i < activeSlots) {
          ctx.fillStyle = accent;
          ctx.fillRect(sx + 3, slotY + 3, slotW - 6, slotH - 6);
        } else if (!isWinnerLane && i === activeSlots && isRacing) {
          // Stalled blinking block in loser lane
          const blink = Math.floor(t * 6) % 2 === 0;
          ctx.fillStyle = blink ? '#ef4444' : '#3f1111';
          ctx.fillRect(sx + 3, slotY + 3, slotW - 6, slotH - 6);
        }
      }

      // Bottom Telemetry Strip inside Lane
      const specY = y + 212;
      const specH = 112;
      ctx.fillStyle = '#0d0d12';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.fillRect(trackX, specY, trackW, specH);
      ctx.strokeRect(trackX, specY, trackW, specH);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#71717a';
      ctx.font = '700 15px "JetBrains Mono", monospace';
      ctx.fillText('RECURSOS / RAM', trackX + 24, specY + 36);
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 26px "JetBrains Mono", monospace';
      ctx.fillText(side.memory || '4 MB', trackX + 24, specY + 78);

      ctx.fillStyle = '#71717a';
      ctx.font = '700 15px "JetBrains Mono", monospace';
      ctx.fillText('ESTADO EN PRODUCCIÓN', trackX + 235, specY + 36);
      ctx.fillStyle = accent;
      ctx.font = '800 26px "JetBrains Mono", monospace';
      ctx.fillText(side.cacheMisses || 'OK', trackX + 235, specY + 78);

      // Stamp on Right
      if (finishedA) {
        const stampW = 320;
        const stampH = 60;
        const stampX = trackX + trackW - stampW - 20;
        const stampY = specY + 26;

        ctx.fillStyle = accent;
        ctx.fillRect(stampX, stampY, stampW, stampH);

        ctx.fillStyle = '#050505';
        ctx.font = '900 19px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        const stampTxt = isWinnerLane
          ? `✔ ${side.speedup || 'ÓPTIMO'}`
          : `✖ ${side.bottleneck || 'BLOQUEADO'}`;
        ctx.fillText(stampTxt, stampX + stampW / 2, stampY + 37);
      }
    };

    // 2. Render Winner Lane (y = 148)
    drawRaceLane(148, 355, sideA, progressA, true, finishedA);

    // 3. Render Loser Lane (y = 540)
    drawRaceLane(540, 355, sideB, progressB, false, false);

    // 4. Live Throughput Counter Strip (y = 925..995)
    ctx.fillStyle = '#0a0a0d';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.fillRect(laneX, 922, laneW, 74);
    ctx.strokeRect(laneX, 922, laneW, 74);

    const opsCompleted = Math.min(500, Math.floor(t * 145));
    ctx.textAlign = 'left';
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText(`OPERACIONES PROCESADAS EN VIVO: ${opsCompleted} / 500`, laneX + 28, 966);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#10b981';
    ctx.fillText(`0 ERRORES · 0 FILAS BLOQUEADAS`, laneX + laneW - 28, 966);

    // 5. Synchronized Word-by-Word Caption Bar
    const vo = props.voiceover || props.takeaway || '';
    if (mu && mu.drawSyncCaption) {
      mu.drawSyncCaption(ctx, vo, t, duration, { accent: finishedA ? '#10b981' : '#fbbf24' });
    }

    ctx.restore();
  }
});
