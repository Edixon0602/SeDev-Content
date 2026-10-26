// Component: quantization_weights_viz
// AI LLM tensor quantization (FP16 -> 4-bit GGUF) & Model Context Protocol (MCP) agent harness visualizer.
// Zero text overflow, active JSON-RPC pulse packets, and live shifting tensor weights.

window.registerComponent('quantization_weights_viz', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-quant-weights">
        ${props.badge ? `<div class="scene-category" id="qwBadge">${props.badge}</div>` : ''}
        <canvas id="quantCanvas" width="960" height="1300"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#quantCanvas');
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

    const badgeEl = container.querySelector('#qwBadge');
    if (badgeEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      badgeEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      badgeEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;
    ctx.translate(0, exitY);

    const mode = props.mode || 'quant';
    const title = props.title || 'CUANTIZACIÓN DE MODELOS LLM';
    const subtitle = props.subtitle || 'DE FP16 (16 BITS) A GGUF (4 BITS) EN HARDWARE LOCAL';

    // Auto-fit Title and Subtitle
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    if (mu) {
      mu.fitText(ctx, title, 480, 65, 840, 32, 22, '"Plus Jakarta Sans", sans-serif', '800');
    } else {
      ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(title, 480, 65);
    }

    ctx.fillStyle = '#a855f7';
    ctx.font = '700 17px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 102);

    if (mode === 'mcp') {
      this.renderMCP(ctx, t, duration, props, utils);
    } else {
      this.renderQuant(ctx, t, duration, props, utils);
    }

    ctx.restore();
  },

  // Tensor Quantization: FP16 to INT4
  renderQuant(ctx, t, duration, props, utils) {
    const mu = window.motionUtils;
    const boxY = 150;
    const boxH = 490;

    // Left: FP16
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, boxY, 385, boxH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('FLOAT16 (ORIGINAL)', 105, boxY + 36);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillText('16 bits por parámetro', 105, boxY + 60);

    // FP16 Memory Bar
    ctx.fillStyle = '#1c1c22';
    ctx.beginPath();
    ctx.roundRect(105, boxY + 80, 335, 24, 6);
    ctx.fill();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(105, boxY + 80, 335, 24, 6);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 11px "JetBrains Mono", monospace';
    ctx.fillText('VRAM: 16.0 GB (Inviable en GPU local)', 115, boxY + 96);

    for (let r = 0; r < 5; r++) {
      const my = boxY + 125 + r * 68;
      ctx.fillStyle = '#1a1a20';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(105, my, 335, 54, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#71717a';
      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.fillText(`Tensor[${r}]:`, 120, my + 20);

      ctx.fillStyle = '#ef4444';
      ctx.font = '700 12px "JetBrains Mono", monospace';
      ctx.fillText(`+0.4819  -0.1294  +0.9841`, 120, my + 40);
    }

    // Right: INT4
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(495, boxY, 385, boxH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('INT4 GGUF (CUANTIZADO)', 520, boxY + 36);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillText('4 bits por parámetro + Escala α', 520, boxY + 60);

    // INT4 Memory Bar
    ctx.fillStyle = '#1c1c22';
    ctx.beginPath();
    ctx.roundRect(520, boxY + 80, 335, 24, 6);
    ctx.fill();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.roundRect(520, boxY + 80, 335 * (4.2 / 16.0), 24, 6);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 11px "JetBrains Mono", monospace';
    ctx.fillText('VRAM: 4.2 GB (74% REDUCCIÓN)', 530, boxY + 96);

    for (let r = 0; r < 5; r++) {
      const my = boxY + 125 + r * 68;
      ctx.fillStyle = '#0f241d';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(520, my, 335, 54, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.fillText(`Block[${r}] α=0.082:`, 535, my + 20);

      ctx.fillStyle = '#10b981';
      ctx.font = '700 12px "JetBrains Mono", monospace';
      ctx.fillText(`[ 6 ] [ -2 ] [ 12 ] [ -1 ] (Nibbles)`, 535, my + 40);
    }

    // Bottom Summary (Zero overflow with wrapText)
    ctx.fillStyle = '#14221a';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 780, 800, 190, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '900 20px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('99.1% RETENCIÓN CON CERO LATENCIA', 105, 825);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    const sumQ1 = 'Permite ejecutar modelos de 70B parámetros en MacBooks y servidores económicos.';
    if (mu) {
      mu.wrapText(ctx, sumQ1, 105, 865, 750, 26, 2);
    } else {
      ctx.fillText(sumQ1, 105, 865);
    }

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 15px "JetBrains Mono", monospace';
    const sumQ2 = 'Elimina el pago recurrente de APIs de OpenAI y garantiza total soberanía de datos.';
    if (mu) {
      mu.wrapText(ctx, sumQ2, 105, 925, 750, 24, 2);
    } else {
      ctx.fillText(sumQ2, 105, 925);
    }
  },

  // Model Context Protocol (MCP) Agent Harness
  renderMCP(ctx, t, duration, props, utils) {
    const mu = window.motionUtils;
    const ay = 150;
    ctx.fillStyle = '#181822';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(280, ay, 400, 115, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#a855f7';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('AGENT HARNESS (ORQUESTADOR)', 480, ay + 38);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Protocolo Universal Model Context Protocol (MCP)', 480, ay + 65);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 11px "JetBrains Mono", monospace';
    ctx.fillText('JSON-RPC sobre Stdio / SSE Transport', 480, ay + 90);

    const tools = [
      { name: 'FILESYSTEM MCP', desc: 'Acceso determinista a código', color: '#10b981', x: 80, y: 320 },
      { name: 'POSTGRES MCP', desc: 'Inspección de esquemas y queries', color: '#38bdf8', x: 500, y: 320 },
      { name: 'TERMINAL MCP', desc: 'Ejecución y captura de logs en vivo', color: '#fbbf24', x: 80, y: 470 },
      { name: 'GITHUB MCP', desc: 'Creación de PRs y code review', color: '#ec4899', x: 500, y: 470 }
    ];

    tools.forEach(tl => {
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(480, ay + 115);
      ctx.lineTo(tl.x + 190, tl.y);
      ctx.stroke();

      // Traveling pulse along connection
      const pulseT = ((t * 1.8) % 1);
      const px = utils.lerp(480, tl.x + 190, pulseT);
      const py = utils.lerp(ay + 115, tl.y, pulseT);
      ctx.fillStyle = tl.color;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#141418';
      ctx.strokeStyle = tl.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(tl.x, tl.y, 380, 115, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = tl.color;
      ctx.font = '800 15px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(tl.name, tl.x + 20, tl.y + 35);

      ctx.fillStyle = '#ffffff';
      ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(tl.desc, tl.x + 20, tl.y + 65);

      ctx.fillStyle = '#71717a';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText('Schema validado por JSON-Schema', tl.x + 20, tl.y + 92);
    });

    // Bottom Summary
    ctx.fillStyle = '#1c1428';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 780, 800, 190, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#a855f7';
    ctx.font = '900 20px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('EL PROMPTING INFORMAL HA MUERTO', 105, 825);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    const sumMcp1 = 'La IA ahora interactúa con herramientas reales a través de contratos estrictos tipados.';
    if (mu) {
      mu.wrapText(ctx, sumMcp1, 105, 865, 750, 26, 2);
    } else {
      ctx.fillText(sumMcp1, 105, 865);
    }

    ctx.fillStyle = '#10b981';
    ctx.font = '700 15px "JetBrains Mono", monospace';
    const sumMcp2 = 'MCP estandariza las integraciones de agentes eliminando wrappers propietarios.';
    if (mu) {
      mu.wrapText(ctx, sumMcp2, 105, 925, 750, 24, 2);
    } else {
      ctx.fillText(sumMcp2, 105, 925);
    }
  }
});
