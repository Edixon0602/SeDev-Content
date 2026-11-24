// Component: memory_layout
// Mechanical Memory, Pointer & Data Structure Inspector.
// Features active address scanning head, byte/slot inspection, and synchronized captions.

window.registerComponent('memory_layout', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-memory-layout">
        <canvas id="mlCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#mlCanvas');
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

    const title = (props.title || 'INSPECCIÓN DE ESTRUCTURA Y MEMORIA').toUpperCase();
    const subtitle = (props.badge || props.header || 'AUDITORÍA INTERNA DE SISTEMA').toUpperCase();

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

    const rawItems = props.items || props.rows || [
      { addr: '0x004A10', name: 'PUNTERO / NODO 01', value: 'Acceso directo en memoria sin bloqueo' },
      { addr: '0x004A50', name: 'PUNTERO / NODO 02', value: 'Validación estricta de esquema y tipos' },
      { addr: '0x004A90', name: 'PUNTERO / NODO 03', value: 'Despacho determinista en < 2ms' }
    ];

    const items = rawItems.slice(0, 3);
    // Active scanner index cycles / progresses across the 3 blocks
    const scanIdx = Math.min(items.length - 1, Math.floor((t / (duration * 0.72)) * items.length));

    items.forEach((item, idx) => {
      const cardY = 152 + idx * 204;
      const cardH = 180;
      const s = spring(Math.max(0, t - 0.1 - idx * 0.14), 24, 0.75);
      const isScanned = idx === scanIdx;
      const isDone = idx < scanIdx;

      ctx.save();
      ctx.translate(480, cardY + cardH / 2);
      ctx.scale(s, s);
      ctx.translate(-480, -(cardY + cardH / 2));

      const accent = isScanned ? '#fbbf24' : (isDone ? '#10b981' : '#3f3f46');

      ctx.fillStyle = '#09090c';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.fillRect(boxX, cardY, boxW, cardH);
      ctx.strokeRect(boxX, cardY, boxW, cardH);

      ctx.fillStyle = accent;
      ctx.fillRect(boxX, cardY, 6, cardH);

      // Top row: Address Tag + Status
      ctx.fillStyle = '#141418';
      ctx.fillRect(boxX + 24, cardY + 20, 230, 38);
      ctx.strokeStyle = '#27272a';
      ctx.strokeRect(boxX + 24, cardY + 20, 230, 38);

      ctx.textAlign = 'left';
      ctx.fillStyle = accent;
      ctx.font = '800 17px "JetBrains Mono", monospace';
      ctx.fillText(String(item.addr || `OFFSET 0${idx + 1}`), boxX + 38, cardY + 45);

      ctx.fillStyle = '#ffffff';
      if (mu) {
        mu.fitText(ctx, String(item.name || ''), boxX + 274, cardY + 46, boxW - 430, 26, 18, '"Plus Jakarta Sans", sans-serif', '800');
      }

      ctx.textAlign = 'right';
      ctx.fillStyle = accent;
      ctx.font = '700 15px "JetBrains Mono", monospace';
      ctx.fillText(isScanned ? '▶ INSPECCIONANDO' : (isDone ? '✔ VERIFICADO' : 'EN COLA'), boxX + boxW - 24, cardY + 44);

      // Value / Diagnostic description
      ctx.textAlign = 'left';
      ctx.fillStyle = '#d4d4d8';
      if (mu) {
        mu.fitText(ctx, String(item.value || item.label || ''), boxX + 24, cardY + 105, boxW - 48, 23, 17, '"JetBrains Mono", monospace', '600');
      }

      // Bottom byte slots strip inside card
      const byteCount = 16;
      const bW = 44;
      const bGap = 8;
      for (let b = 0; b < byteCount; b++) {
        const bx = boxX + 24 + b * (bW + bGap);
        const by = cardY + 130;
        const activeByte = isDone || (isScanned && b <= ((t * 18) % byteCount));
        ctx.fillStyle = activeByte ? accent : '#18181b';
        ctx.fillRect(bx, by, bW, 24);
      }

      ctx.restore();
    });

    // 3. Resolution Architecture Summary Strip (y = 776..995)
    const resY = 776;
    const resH = 216;
    const resS = spring(Math.max(0, t - 0.5), 22, 0.75);

    ctx.save();
    ctx.translate(480, resY + resH / 2);
    ctx.scale(resS, resS);
    ctx.translate(-480, -(resY + resH / 2));

    ctx.fillStyle = '#07130e';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.fillRect(boxX, resY, boxW, resH);
    ctx.strokeRect(boxX, resY, boxW, resH);

    ctx.fillStyle = '#10b981';
    ctx.fillRect(boxX, resY, 6, resH);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#10b981';
    ctx.font = '800 17px "JetBrains Mono", monospace';
    ctx.fillText('CONCLUSIÓN TÉCNICA', boxX + 28, resY + 42);

    ctx.fillStyle = '#ffffff';
    const resTitle = props.resolutionTitle || 'CONTROL DIRECTO SOBRE DATOS Y CONEXIONES';
    if (mu) {
      mu.fitText(ctx, resTitle, boxX + 28, resY + 96, boxW - 56, 36, 22, '"Plus Jakarta Sans", sans-serif', '900');
    }

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 19px "JetBrains Mono", monospace';
    const resSub = props.resolutionSub || 'Cero capas fantasma · Ejecución determinista en producción';
    if (mu) {
      mu.fitText(ctx, resSub, boxX + 28, resY + 142, boxW - 56, 20, 15, '"JetBrains Mono", monospace', '600');
    }

    if (mu && mu.drawDiscreteSlots) {
      const slotsFilled = Math.min(12, Math.floor(clamp(t / (duration * 0.85), 0, 1) * 12));
      mu.drawDiscreteSlots(ctx, 480, resY + 180, slotsFilled, 12, '#10b981', 56, 20, 12);
    }

    ctx.restore();

    // 4. Synchronized Word-by-Word Caption Bar
    const vo = props.voiceover || '';
    if (mu && mu.drawSyncCaption) {
      mu.drawSyncCaption(ctx, vo, t, duration, { accent: '#10b981' });
    }

    ctx.restore();
  }
});
