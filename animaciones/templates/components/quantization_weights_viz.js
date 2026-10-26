// Component: quantization_weights_viz
// AI LLM tensor quantization (FP16 -> 4-bit GGUF) & Model Context Protocol (MCP) agent harness visualizer.

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

    const mode = props.mode || 'quant'; // 'quant' | 'mcp'
    const title = props.title || 'CUANTIZACIÓN DE MODELOS LLM';
    const subtitle = props.subtitle || 'DE FP16 (16 BITS) A GGUF (4 BITS) EN HARDWARE LOCAL';

    // Header
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 34px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 480, 70);

    ctx.fillStyle = '#a855f7';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 105);

    if (mode === 'mcp') {
      this.renderMCP(ctx, t, duration, props, utils);
    } else {
      this.renderQuant(ctx, t, duration, props, utils);
    }

    ctx.restore();
  },

  // Tensor Quantization: FP16 to INT4
  renderQuant(ctx, t, duration, props, utils) {
    const { spring, clamp } = utils;

    const boxY = 170;
    // Left: FP16 (Unquantized)
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, boxY, 380, 500, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('FLOAT16 (ORIGINAL)', 110, boxY + 40);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('16 bits por parámetro', 110, boxY + 68);

    // FP16 Memory Bar
    ctx.fillStyle = '#1c1c22';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(110, boxY + 95, 320, 24, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(110, boxY + 95, 320, 24, 6);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 12px "JetBrains Mono", monospace';
    ctx.fillText('VRAM: 16.0 GB (Inviable en GPU local)', 120, boxY + 112);

    // Weight float matrix
    for (let r = 0; r < 5; r++) {
      const my = boxY + 145 + r * 65;
      ctx.fillStyle = '#1c1c22';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(110, my, 320, 52, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#71717a';
      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.fillText(`Tensor[${r}]:`, 125, my + 20);

      ctx.fillStyle = '#ef4444';
      ctx.font = '700 12px "JetBrains Mono", monospace';
      ctx.fillText(`+0.48192  -0.12948  +0.98412`, 125, my + 40);
    }

    // Right: INT4 (Quantized Q4_K_M)
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(500, boxY, 380, 500, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('INT4 GGUF (CUANTIZADO)', 530, boxY + 40);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('4 bits por parámetro + Escala α', 530, boxY + 68);

    // INT4 Memory Bar
    ctx.fillStyle = '#1c1c22';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(530, boxY + 95, 320, 24, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.roundRect(530, boxY + 95, 320 * (4.2 / 16.0), 24, 6);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 12px "JetBrains Mono", monospace';
    ctx.fillText('VRAM: 4.2 GB (74% REDUCCIÓN)', 540, boxY + 112);

    // Weight nibble blocks
    for (let r = 0; r < 5; r++) {
      const my = boxY + 145 + r * 65;
      ctx.fillStyle = '#0f241d';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(530, my, 320, 52, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.fillText(`Block[${r}] α=0.082:`, 545, my + 20);

      ctx.fillStyle = '#10b981';
      ctx.font = '700 12px "JetBrains Mono", monospace';
      ctx.fillText(`[ 6 ] [ -2 ] [ 12 ] [ -1 ] (Nibbles)`, 545, my + 40);
    }

    // Bottom Summary
    const s = spring(Math.max(0, t - 1.2), 20, 0.7);
    ctx.fillStyle = '#14221a';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 850, 800, 150, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '900 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('99.1% RETENCIÓN DE INTELIGENCIA CON CERO LATENCIA', 110, 890);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Permite ejecutar modelos de 70B parámetros en MacBooks y servidores económicos.', 110, 925);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText('Elimina el pago recurrente de APIs de OpenAI y garantiza total soberanía de datos.', 110, 960);
  },

  // Model Context Protocol (MCP) Agent Harness
  renderMCP(ctx, t, duration, props, utils) {
    const { spring } = utils;

    // Center Agent Harness Box
    const ay = 180;
    ctx.fillStyle = '#181822';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(280, ay, 400, 130, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#a855f7';
    ctx.font = '800 20px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('AGENT HARNESS (ORQUESTADOR)', 480, ay + 45);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Protocolo Universal Model Context Protocol (MCP)', 480, ay + 75);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 12px "JetBrains Mono", monospace';
    ctx.fillText('JSON-RPC sobre Stdio / SSE Transport', 480, ay + 100);

    // MCP Tools Grid (Connected to Harness)
    const tools = [
      { name: 'FILESYSTEM MCP', desc: 'Acceso determinista a código', color: '#10b981', x: 80, y: 390 },
      { name: 'POSTGRES MCP', desc: 'Inspección de esquemas y queries', color: '#38bdf8', x: 500, y: 390 },
      { name: 'TERMINAL MCP', desc: 'Ejecución y captura de logs en vivo', color: '#fbbf24', x: 80, y: 560 },
      { name: 'GITHUB MCP', desc: 'Creación de PRs y code review', color: '#ec4899', x: 500, y: 560 }
    ];

    tools.forEach(tl => {
      // Connecting line
      ctx.strokeStyle = '#3f3f46';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(480, ay + 130);
      ctx.lineTo(tl.x + 190, tl.y);
      ctx.stroke();

      ctx.fillStyle = '#141418';
      ctx.strokeStyle = tl.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(tl.x, tl.y, 380, 120, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = tl.color;
      ctx.font = '800 16px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(tl.name, tl.x + 24, tl.y + 40);

      ctx.fillStyle = '#ffffff';
      ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(tl.desc, tl.x + 24, tl.y + 70);

      ctx.fillStyle = '#71717a';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText('Herramienta con schema validado por JSON-Schema', tl.x + 24, tl.y + 95);
    });

    // Bottom Summary
    const s = spring(Math.max(0, t - 1.2), 20, 0.7);
    ctx.fillStyle = '#1c1428';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 850, 800, 150, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#a855f7';
    ctx.font = '900 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('EL PROMPTING INFORMAL HA MUERTO', 110, 890);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('La IA ahora interactúa con herramientas reales a través de contratos estrictos tipados.', 110, 925);
    ctx.fillStyle = '#10b981';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText('MCP estandariza las integraciones de agentes eliminando wrappers propietarios.', 110, 960);
  }
});
