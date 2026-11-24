// Component: talking_head_cue
// Minimalist on-screen cue card for A-Roll (Face to Camera recording)
// Displays framing guide, scene goal, and camera prompt

window.registerComponent('talking_head_cue', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-talking-head">
        <canvas id="thCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#thCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp } = utils;
    const mu = window.motionUtils;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 960, 1360);

    const title = (props.title || 'GRABACIÓN A CÁMARA · A-ROLL').toUpperCase();
    const prompt = (props.prompt || 'MIRA DIRECTAMENTE AL LENTE Y HABLA CON NATURALIDAD').toUpperCase();

    // 1. Header
    ctx.textAlign = 'left';
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText('SEDEV STUDIO // TOMA FRONTAL', 40, 42);

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

    // 2. Camera Viewfinder Box (Central framing guide)
    const boxX = 80;
    const boxY = 220;
    const boxW = 800;
    const boxH = 820;

    ctx.fillStyle = '#0a0a0d';
    ctx.strokeStyle = '#3f3f46';
    ctx.lineWidth = 2;
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    // Corner targeting brackets
    const cLen = 40;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;

    // Top-left
    ctx.beginPath();
    ctx.moveTo(boxX + cLen, boxY);
    ctx.lineTo(boxX, boxY);
    ctx.lineTo(boxX, boxY + cLen);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(boxX + boxW - cLen, boxY);
    ctx.lineTo(boxX + boxW, boxY);
    ctx.lineTo(boxX + boxW, boxY + cLen);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(boxX, boxY + boxH - cLen);
    ctx.lineTo(boxX, boxY + boxH);
    ctx.lineTo(boxX + cLen, boxY + boxH);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(boxX + boxW - cLen, boxY + boxH);
    ctx.lineTo(boxX + boxW, boxY + boxH);
    ctx.lineTo(boxX + boxW, boxY + boxH - cLen);
    ctx.stroke();

    // Red recording pulse indicator
    const blink = Math.floor(t * 2) % 2 === 0;
    if (blink) {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(boxX + 40, boxY + 40, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#ef4444';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('REC // TOMA FRONTAL', boxX + 60, boxY + 46);

    // Center icon & prompt
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 68px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('👤', 480, boxY + 360);

    ctx.fillStyle = '#fbbf24';
    ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('HABLA A CÁMARA', 480, boxY + 440);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 18px "JetBrains Mono", monospace';
    ctx.fillText(prompt, 480, boxY + 480);

    // Progress bar inside box
    const prog = clamp(t / duration, 0, 1);
    ctx.fillStyle = '#18181b';
    ctx.fillRect(boxX + 60, boxY + boxH - 80, boxW - 120, 16);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(boxX + 60, boxY + boxH - 80, (boxW - 120) * prog, 16);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#71717a';
    ctx.font = '700 14px "JetBrains Mono", monospace';
    ctx.fillText(`TIEMPO RESTANTE EN ESTE BLOQUE: ${(duration - t).toFixed(1)}s`, 480, boxY + boxH - 45);
  }
});
