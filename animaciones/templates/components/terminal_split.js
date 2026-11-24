// Component: terminal_split
// Live Code Surgery & Side-by-Side Execution Diff.
// Act 1: Upper window executes bottleneck code & triggers red lock/latency counter.
// Act 2: Lower window actively types/reveals the engineering fix with a mechanical cursor
// and stamps real-time execution pass metrics.

window.registerComponent('terminal_split', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-term-split">
        <canvas id="splitCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#splitCanvas');
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

    const title = (props.title || 'CIRUGÍA DE CÓDIGO EN PRODUCCIÓN').toUpperCase();
    const subtitle = (props.subtitle || 'COMPARATIVA DE EJECUCIÓN EN VIVO').toUpperCase();

    // 1. Clean Header
    ctx.textAlign = 'left';
    ctx.fillStyle = '#38bdf8';
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

    const leftRaw = props.leftCode || props.leftText || '';
    const leftLines = leftRaw ? leftRaw.split('\n').filter(Boolean) : ['SELECT * FROM orders FOR UPDATE;'];
    const leftTitle = (props.leftTitle || 'IMPLEMENTACIÓN ROTA / LENTA').toUpperCase();

    const rightRaw = props.rightCode || props.rightText || '';
    const rightLines = rightRaw ? rightRaw.split('\n').filter(Boolean) : ['UPDATE orders SET status = 1 WHERE id = $1;'];
    const rightTitle = (props.rightTitle || 'SOLUCIÓN DE INGENIERÍA').toUpperCase();

    // Helper for syntax-colored code lines with live typing progression
    const drawTerminalWindow = (y, h, winTitle, lines, accentColor, statusLabel, revealProgress, isErrorWin, customFooter) => {
      ctx.fillStyle = '#09090c';
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.5;
      ctx.fillRect(boxX, y, boxW, h);
      ctx.strokeRect(boxX, y, boxW, h);

      // Top title bar
      ctx.fillStyle = '#111116';
      ctx.fillRect(boxX, y, boxW, 50);
      ctx.strokeStyle = '#27272a';
      ctx.beginPath();
      ctx.moveTo(boxX, y + 50);
      ctx.lineTo(boxX + boxW, y + 50);
      ctx.stroke();

      // Left accent square
      ctx.fillStyle = accentColor;
      ctx.fillRect(boxX + 20, y + 17, 16, 16);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 18px "JetBrains Mono", monospace';
      ctx.fillText(winTitle, boxX + 50, y + 32);

      ctx.textAlign = 'right';
      ctx.fillStyle = accentColor;
      ctx.font = '800 18px "JetBrains Mono", monospace';
      ctx.fillText(statusLabel, boxX + boxW - 24, y + 32);

      // Code lines area
      const maxLines = Math.min(5, lines.length);
      const totalChars = lines.slice(0, maxLines).reduce((acc, l) => acc + l.length, 0);
      let remainingChars = Math.floor(totalChars * clamp(revealProgress, 0, 1));

      lines.slice(0, maxLines).forEach((rawLine, idx) => {
        const lineY = y + 98 + idx * 52;
        const clean = String(rawLine).trim();

        // Line number
        ctx.textAlign = 'left';
        ctx.fillStyle = '#3f3f46';
        ctx.font = '600 18px "JetBrains Mono", monospace';
        ctx.fillText(String(idx + 1).padStart(2, '0'), boxX + 24, lineY);

        if (remainingChars <= 0) return;
        const visibleCount = Math.min(clean.length, remainingChars);
        remainingChars -= clean.length;
        let visibleStr = clean.substring(0, visibleCount);

        // Highlight background bar for key lines
        const isComment = clean.startsWith('--') || clean.startsWith('//') || clean.startsWith('#');
        if (!isComment && idx === maxLines - 2) {
          ctx.fillStyle = isErrorWin ? 'rgba(239, 68, 68, 0.10)' : 'rgba(16, 185, 129, 0.10)';
          ctx.fillRect(boxX + 64, lineY - 28, boxW - 88, 40);
          ctx.fillStyle = accentColor;
          ctx.fillRect(boxX + 64, lineY - 28, 4, 40);
        }

        // Choose syntax color
        let color = '#e4e4e7';
        if (isComment) {
          color = isErrorWin ? '#fca5a5' : '#6ee7b7';
        } else if (/^(SELECT|UPDATE|CREATE|INSERT|EXPLAIN|WHERE|SET|ON|FROM)/i.test(clean)) {
          color = '#38bdf8';
        } else if (/^(const|let|async|await|function|return|if|for)/i.test(clean)) {
          color = '#fbbf24';
        }

        ctx.fillStyle = color;
        ctx.font = '600 22px "JetBrains Mono", monospace';
        const maxCodeW = boxW - 104;
        while (ctx.measureText(visibleStr).width > maxCodeW && visibleStr.length > 0) {
          visibleStr = visibleStr.substring(0, visibleStr.length - 1);
        }
        ctx.fillText(visibleStr, boxX + 78, lineY);

        // Mechanical block cursor on the currently typing character
        if (visibleCount < clean.length || (remainingChars === 0 && revealProgress < 0.99)) {
          const curX = boxX + 78 + ctx.measureText(visibleStr).width + 4;
          ctx.fillStyle = accentColor;
          ctx.fillRect(curX, lineY - 22, 12, 26);
        }
      });

      // Bottom execution telemetry bar inside terminal
      const barY = y + h - 46;
      ctx.fillStyle = '#0d0d12';
      ctx.fillRect(boxX + 2, barY, boxW - 4, 44);
      ctx.strokeStyle = '#27272a';
      ctx.beginPath();
      ctx.moveTo(boxX, barY);
      ctx.lineTo(boxX + boxW, barY);
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = accentColor;
      ctx.font = '700 16px "JetBrains Mono", monospace';
      const bottomMsg = customFooter || (isErrorWin
        ? '✖ STATUS: CUELLO DE BOTELLA ACTIVO · CONEXIONES RETENIDAS'
        : (revealProgress >= 0.85 ? `✔ STATUS: EJECUCIÓN VERIFICADA · ${props.diffNote || 'LATENCIA MÍNIMA'}` : '▶ COMPILANDO Y APLICANDO PARCHE...'));
      ctx.fillText(bottomMsg, boxX + 24, barY + 28);
    };

    // 2. Upper Window (Problem - reveals across first 20% of scene, timer ticks up)
    const termAY = 148;
    const termAH = 405;
    const progA = clamp(t / (duration * 0.22), 0, 1);
    const liveBlockedMs = Math.min(30000, Math.round(t * 2800));
    const leftColor = props.leftColor || '#ef4444';
    const rightColor = props.rightColor || '#10b981';
    const rightIsDanger = rightColor === '#ef4444' || rightColor === '#f97316' || rightColor === '#fb6f54' || props.rightIsDanger === true;

    drawTerminalWindow(
      termAY,
      termAH,
      leftTitle,
      leftLines,
      leftColor,
      props.leftStatus || `BLOQUEO: ${liveBlockedMs}ms`,
      progA,
      true,
      props.leftFooter
    );

    // 3. Lower Window (Solution or Risk Window - starts typing at 18% -> 62% of scene)
    const termBY = 585;
    const termBH = 405;
    const progB = clamp((t - duration * 0.18) / (duration * 0.44), 0, 1);
    const sB = spring(Math.max(0, t - 0.35), 24, 0.75);

    ctx.save();
    ctx.translate(480, termBY + termBH / 2);
    ctx.scale(sB, sB);
    ctx.translate(-480, -(termBY + termBH / 2));

    drawTerminalWindow(
      termBY,
      termBH,
      rightTitle,
      rightLines,
      rightColor,
      props.rightStatus || (progB >= 0.85 ? 'PASS · 3.4ms' : 'TYPING FIX...'),
      progB,
      rightIsDanger,
      props.rightFooter
    );
    ctx.restore();

    // 4. Synchronized Word-by-Word Caption Bar
    const vo = props.voiceover || props.diffNote || '';
    if (mu && mu.drawSyncCaption) {
      mu.drawSyncCaption(ctx, vo, t, duration, { accent: progB >= 0.8 ? '#10b981' : '#fbbf24' });
    }

    ctx.restore();
  }
});
