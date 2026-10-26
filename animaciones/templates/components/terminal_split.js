// Component: terminal_split
// Dual terminal split executing parallel commands, benchmarks, or side-by-side event logs.

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
    const { spring, clamp } = utils;
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

    const title = props.title || 'PARALLEL BENCHMARK EXECUTION';
    const subtitle = props.subtitle || 'COMPARING RUNTIMES IN REAL-TIME';

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 34px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 480, 80);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '600 20px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 125);

    const termA = props.termA || {
      title: 'NODE.JS 22 (npm install)',
      color: '#ef4444',
      cmd: 'npm install --prefer-offline',
      status: 'Resolviendo 1,420 dependencias...',
      time: '34.8s',
      lines: [
        'added 1420 packages in 34.82s',
        '24 vulnerabilities found (1 high)',
        'postinstall scripts executed (8 warnings)'
      ]
    };

    const termB = props.termB || {
      title: 'BUN 1.2 (bun install)',
      color: '#10b981',
      cmd: 'bun install',
      status: 'Caché global verificada en memoria',
      time: '0.42s',
      lines: [
        'saved lockfile bun.lockb',
        'installed 1420 packages in 420ms',
        'Zero postinstall friction // Isolated runtime'
      ]
    };

    // Draw Terminal A (Top)
    const sA = spring(Math.max(0, t - 0.08), 22, 0.75);
    ctx.save();
    ctx.translate(480, 340);
    ctx.scale(sA, sA);

    ctx.fillStyle = '#0e0e11';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-420, -140, 840, 280, 14);
    ctx.fill();
    ctx.stroke();

    // Terminal A Header
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.roundRect(-420, -140, 840, 48, [14, 14, 0, 0]);
    ctx.fill();

    // Window dots
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(-395, -116, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(-375, -116, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10b981';
    ctx.beginPath(); ctx.arc(-355, -116, 6, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = termA.color;
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(termA.title, -330, -110);

    ctx.fillStyle = '#ef4444';
    ctx.textAlign = 'right';
    ctx.fillText(termA.time, 395, -110);

    // Terminal A Body
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'left';
    ctx.font = '600 17px "JetBrains Mono", monospace';
    ctx.fillText(`$ ${termA.cmd}`, -390, -60);

    termA.lines.forEach((line, i) => {
      ctx.fillStyle = i === termA.lines.length - 1 ? '#a1a1aa' : '#71717a';
      ctx.fillText(`  ${line}`, -390, -15 + i * 36);
    });
    ctx.restore();

    // Draw Terminal B (Bottom)
    const sB = spring(Math.max(0, t - 0.2), 22, 0.75);
    ctx.save();
    ctx.translate(480, 680);
    ctx.scale(sB, sB);

    ctx.fillStyle = '#0e0e11';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-420, -140, 840, 280, 14);
    ctx.fill();
    ctx.stroke();

    // Terminal B Header
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.roundRect(-420, -140, 840, 48, [14, 14, 0, 0]);
    ctx.fill();

    // Window dots
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(-395, -116, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(-375, -116, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10b981';
    ctx.beginPath(); ctx.arc(-355, -116, 6, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = termB.color;
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(termB.title, -330, -110);

    ctx.fillStyle = '#10b981';
    ctx.textAlign = 'right';
    ctx.fillText(termB.time, 395, -110);

    // Terminal B Body
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'left';
    ctx.font = '600 17px "JetBrains Mono", monospace';
    ctx.fillText(`$ ${termB.cmd}`, -390, -60);

    termB.lines.forEach((line, i) => {
      ctx.fillStyle = i === termB.lines.length - 1 ? '#34d399' : '#a1a1aa';
      ctx.fillText(`  ${line}`, -390, -15 + i * 36);
    });
    ctx.restore();

    // Bottom Result Summary Card
    const cardAlpha = clamp((t - 0.4) / 0.3, 0, 1);
    if (cardAlpha > 0) {
      ctx.globalAlpha = cardAlpha * exitAlpha;
      ctx.fillStyle = '#18181b';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(60, 860, 840, 160, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(props.summaryBadge || 'FACTOR DE RENDIMIENTO: 80X', 100, 910);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(props.summaryText || 'Bun elimina la sobrecarga de V8 y optimiza syscalls en Zig.', 100, 955);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(props.summarySub || 'Menos tiempo esperando CI/CD significa más velocidad de entrega.', 100, 990);
    }

    // CTA Banner Slot (Optional props.cta)
    if (props.cta) {
      const ctaAlpha = clamp((t - 0.5) / 0.25, 0, 1);
      ctx.globalAlpha = ctaAlpha * exitAlpha;
      ctx.fillStyle = '#101014';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(60, 1050, 840, 120, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 15px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(props.cta.badge || 'AUDITORÍA DE RENDIMIENTO (Link en bio)', 100, 1090);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(props.cta.text || 'Audito tu stack y optimizo tiempos de CI/CD. Link en mi perfil.', 100, 1130);
    }

    ctx.restore();
  }
});
