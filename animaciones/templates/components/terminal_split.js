// Component: terminal_split
// Dual terminal split executing parallel commands, benchmarks, or side-by-side event logs.
// Fully normalized for leftTitle/leftText/rightTitle/rightText and termA/termB, with zero overflow.

window.registerComponent('terminal_split', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-term-split">
        ${props.header ? `<div class="scene-category" id="termSplitHeader">${props.header}</div>` : ''}
        <canvas id="splitCanvas" width="960" height="1300"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#splitCanvas');
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

    const headerEl = container.querySelector('#termSplitHeader');
    if (headerEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      headerEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      headerEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;
    ctx.translate(0, exitY);

    const title = props.title || 'PARALLEL EXECUTION';
    const subtitle = props.subtitle || 'INSPECCIÓN EN TIEMPO REAL';

    // Auto-fit Title and Subtitle
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

    // Normalize Terminal Data (support both termA/termB and leftTitle/leftText/rightTitle/rightText)
    const termA = props.termA || {
      title: props.leftTitle || 'TERMINAL A',
      color: '#38bdf8',
      cmd: props.leftCmd || (props.leftText ? props.leftText.split('\n')[0] : 'npx audit'),
      time: props.leftTime || '0.04s',
      lines: props.leftText ? props.leftText.split('\n').slice(1) : ['Procesando tarea...', 'Estado verificado']
    };

    const termB = props.termB || {
      title: props.rightTitle || 'TERMINAL B',
      color: '#10b981',
      cmd: props.rightCmd || (props.rightText ? props.rightText.split('\n')[0] : 'cargo check'),
      time: props.rightTime || '0.01s',
      lines: props.rightText ? props.rightText.split('\n').slice(1) : ['Compilación nativa', '0 advertencias']
    };

    // Helper for terminal line syntax coloring
    const drawTerminalLines = (lines, startX, startY, maxW) => {
      lines.forEach((line, i) => {
        const clean = String(line).trim();
        if (clean.startsWith('$') || clean.startsWith('>')) {
          ctx.fillStyle = '#38bdf8';
          ctx.font = '700 15px "JetBrains Mono", monospace';
        } else if (clean.startsWith('✔')) {
          ctx.fillStyle = '#10b981';
          ctx.font = '700 15px "JetBrains Mono", monospace';
        } else if (clean.startsWith('✖') || clean.toLowerCase().includes('error')) {
          ctx.fillStyle = '#ef4444';
          ctx.font = '700 15px "JetBrains Mono", monospace';
        } else if (clean.startsWith('•')) {
          ctx.fillStyle = '#06b6d4';
          ctx.font = '600 15px "JetBrains Mono", monospace';
        } else {
          ctx.fillStyle = '#a1a1aa';
          ctx.font = '500 14px "JetBrains Mono", monospace';
        }

        // Truncate if line exceeds terminal width
        let txt = clean;
        while (ctx.measureText(txt).width > maxW && txt.length > 0) {
          txt = txt.substring(0, txt.length - 1);
        }
        ctx.fillText(txt, startX, startY + i * 32);
      });
    };

    // 1. Draw Terminal A (Top)
    const sA = spring(Math.max(0, t - 0.08), 22, 0.75);
    ctx.save();
    ctx.translate(480, 270);
    ctx.scale(sA, sA);

    ctx.fillStyle = '#0d0d10';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-420, -110, 840, 230, 14);
    ctx.fill();
    ctx.stroke();

    // Shimmer sweep across Terminal A
    if (mu) mu.drawShimmer(ctx, -420, -110, 840, 230, t, 'rgba(56, 189, 248, 0.04)');

    // Header A
    ctx.fillStyle = '#16161b';
    ctx.beginPath();
    ctx.roundRect(-420, -110, 840, 42, [14, 14, 0, 0]);
    ctx.fill();

    // Window controls
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(-395, -89, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(-377, -89, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10b981'; ctx.beginPath(); ctx.arc(-359, -89, 5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = termA.color;
    ctx.font = '700 15px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(termA.title, -335, -84);

    ctx.fillStyle = '#71717a';
    ctx.textAlign = 'right';
    ctx.fillText(termA.time || 'ACTIVE', 395, -84);

    // Terminal A Body
    ctx.textAlign = 'left';
    const cursorA = (Math.floor(t * 3) % 2 === 0) ? '_' : ' ';
    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 15px "JetBrains Mono", monospace';
    ctx.fillText(termA.cmd.startsWith('$') ? `${termA.cmd} ${cursorA}` : `$ ${termA.cmd} ${cursorA}`, -390, -42);

    drawTerminalLines(termA.lines, -390, -8, 770);
    ctx.restore();

    // 2. Draw Terminal B (Bottom)
    const sB = spring(Math.max(0, t - 0.22), 22, 0.75);
    ctx.save();
    ctx.translate(480, 560);
    ctx.scale(sB, sB);

    ctx.fillStyle = '#0d0d10';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-420, -110, 840, 230, 14);
    ctx.fill();
    ctx.stroke();

    // Shimmer sweep across Terminal B
    if (mu) mu.drawShimmer(ctx, -420, -110, 840, 230, t + 0.5, 'rgba(16, 185, 129, 0.04)');

    // Header B
    ctx.fillStyle = '#16161b';
    ctx.beginPath();
    ctx.roundRect(-420, -110, 840, 42, [14, 14, 0, 0]);
    ctx.fill();

    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(-395, -89, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(-377, -89, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10b981'; ctx.beginPath(); ctx.arc(-359, -89, 5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = termB.color;
    ctx.font = '700 15px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(termB.title, -335, -84);

    ctx.fillStyle = '#10b981';
    ctx.textAlign = 'right';
    ctx.fillText(termB.time || 'COMPLETED', 395, -84);

    // Terminal B Body
    ctx.textAlign = 'left';
    const cursorB = (Math.floor(t * 3.5) % 2 === 0) ? '_' : ' ';
    ctx.fillStyle = '#10b981';
    ctx.font = '700 15px "JetBrains Mono", monospace';
    ctx.fillText(termB.cmd.startsWith('$') ? `${termB.cmd} ${cursorB}` : `$ ${termB.cmd} ${cursorB}`, -390, -42);

    drawTerminalLines(termB.lines, -390, -8, 770);
    ctx.restore();

    // 3. Bottom Summary / CTA Card (Positioned safely at Y = 730 to 1100)
    const cardAlpha = clamp((t - 0.4) / 0.3, 0, 1);
    if (cardAlpha > 0) {
      ctx.globalAlpha = cardAlpha * exitAlpha;
      ctx.fillStyle = '#111116';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(60, 720, 840, 240, 16);
      ctx.fill();
      ctx.stroke();

      const badge = props.header || props.summaryBadge || 'RESULTADO VERIFICADO';
      ctx.fillStyle = '#10b981';
      ctx.font = '800 14px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(badge, 95, 765);

      const sumTitle = props.summaryText || props.title || 'OPTIMIZACIÓN Y ARQUITECTURA LIMPIA';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
      if (mu) {
        mu.wrapText(ctx, sumTitle, 95, 805, 760, 30, 2);
      } else {
        ctx.fillText(sumTitle, 95, 805);
      }

      const sumSub = props.summarySub || '• Soluciones de alto rendimiento diseñadas para durar en producción.\n• Enlace en el perfil para agendar sesión o auditoría técnica.';
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
      if (mu) {
        mu.wrapText(ctx, sumSub, 95, 875, 760, 24, 3);
      } else {
        ctx.fillText(sumSub, 95, 875);
      }
    }

    ctx.restore();
  }
});
