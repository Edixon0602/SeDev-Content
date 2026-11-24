// Component: lava_entropy_viz
// Visual de entropía física: muro de lámparas de lava, cámara de captura,
// flujo de bits y CSPRNG. Determinista, sin loops accidentales.
// Estética SeDev: obsidiana mate, trazos ortogonales, ámbar/esmeralda.

window.registerComponent('lava_entropy_viz', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-lava-entropy">
        <canvas id="levCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#levCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp } = utils;
    const mu = window.motionUtils;
    const ctx = this.ctx;
    const W = 960;
    const H = 1360;

    ctx.clearRect(0, 0, W, H);

    const exitT = duration - 0.3;
    let exitAlpha = 1;
    if (t > exitT) {
      exitAlpha = clamp(1 - ((t - exitT) / 0.3) * 1.35, 0, 1);
    }

    const hexToRgba = (hex, alpha) => {
      const h = hex.replace('#', '');
      const r = parseInt(h.substring(0, 2), 16);
      const g = parseInt(h.substring(2, 4), 16);
      const b = parseInt(h.substring(4, 6), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    const roundRect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    // ---------------------------------------------------------
    // 0. Fondo: obsidiana + retícula + viñeta
    // ---------------------------------------------------------
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(255,255,255,0.032)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y <= H; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    const vignette = ctx.createRadialGradient(W / 2, H / 2, 120, W / 2, H / 2, 760);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.72)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);

    // ---------------------------------------------------------
    // 1. Header
    // ---------------------------------------------------------
    ctx.save();
    ctx.globalAlpha = clamp(t / 0.25, 0, 1) * exitAlpha;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fbbf24';
    ctx.font = '700 15px "JetBrains Mono", monospace';
    ctx.fillText('ENTROPÍA FÍSICA // CLOUDFLARE', 48, 54);

    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(48, 78);
    ctx.lineTo(912, 78);
    ctx.stroke();
    ctx.restore();

    // ---------------------------------------------------------
    // 2. Título
    // ---------------------------------------------------------
    const titleS = spring(Math.max(0, t - 0.08), 26, 0.68);
    ctx.save();
    ctx.globalAlpha = clamp((t - 0.05) / 0.2, 0, 1) * exitAlpha;
    ctx.translate(48, 168);
    ctx.scale(titleS, titleS);
    ctx.textAlign = 'left';

    ctx.font = '900 86px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#09090b';
    ctx.fillText('100 LÁMPARAS', 3, 5);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('100 LÁMPARAS', 0, 0);

    ctx.font = '900 86px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('DE LAVA', 0, 92);
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = clamp((t - 0.45) / 0.3, 0, 1) * exitAlpha;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#71717a';
    ctx.font = '600 16px "JetBrains Mono", monospace';
    ctx.fillText('10% DEL TRÁFICO DE INTERNET // SAN FRANCISCO', 48, 306);
    ctx.restore();

    // ---------------------------------------------------------
    // 3. Muro de lámparas
    // ---------------------------------------------------------
    const lamps = props.lamps || [
      { color: '#f59e0b', phase: 0.0 },
      { color: '#10b981', phase: 1.7 },
      { color: '#38bdf8', phase: 3.1 },
      { color: '#f472b6', phase: 4.6 }
    ];
    const lampXs = [128, 282, 436, 590];
    const lampW = 108;
    const lampH = 408;
    const baseY = 884;

    const drawLamp = (cx, color, phase, lampIndex) => {
      const appear = clamp((t - 0.35 - lampIndex * 0.09) / 0.5, 0, 1);
      if (appear <= 0) return;
      const s = spring(Math.max(0, t - 0.35 - lampIndex * 0.09), 22, 0.72);

      ctx.save();
      ctx.globalAlpha = appear * exitAlpha;
      ctx.translate(cx, baseY);
      ctx.scale(s, s);

      // Halo ambiental
      const halo = ctx.createRadialGradient(0, -lampH * 0.55, 10, 0, -lampH * 0.55, 190);
      halo.addColorStop(0, hexToRgba(color, 0.20));
      halo.addColorStop(0.55, hexToRgba(color, 0.06));
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(0, -lampH * 0.55, 190, 0, Math.PI * 2);
      ctx.fill();

      // Silueta de vidrio
      const glassPath = () => {
        ctx.beginPath();
        ctx.moveTo(-17, -lampH);
        ctx.lineTo(17, -lampH);
        ctx.lineTo(17, -lampH + 26);
        ctx.bezierCurveTo(42, -lampH + 36, 52, -lampH + 78, 52, -lampH + 114);
        ctx.lineTo(52, -54);
        ctx.quadraticCurveTo(52, -6, 0, -6);
        ctx.quadraticCurveTo(-52, -6, -52, -54);
        ctx.lineTo(-52, -lampH + 114);
        ctx.bezierCurveTo(-52, -lampH + 78, -42, -lampH + 36, -17, -lampH + 26);
        ctx.closePath();
      };

      // Líquido base
      glassPath();
      ctx.fillStyle = hexToRgba(color, 0.075);
      ctx.fill();

      // Burbujas / blobs (clip al vidrio)
      ctx.save();
      glassPath();
      ctx.clip();
      ctx.globalCompositeOperation = 'lighter';

      for (let k = 0; k < 7; k++) {
        const prog = ((t * 0.16 + phase * 0.13 + k * 0.14 + lampIndex * 0.07) % 1);
        const by = -46 - prog * (lampH - 120);
        const bx = Math.sin(t * 0.62 + k * 2.1 + phase) * 30;
        const r = 18 + 12 * (0.5 + 0.5 * Math.sin(k * 2.7 + phase));
        const alpha = Math.sin(prog * Math.PI) * 0.85;

        const blob = ctx.createRadialGradient(bx, by, 0, bx, by, r * 2.6);
        blob.addColorStop(0, hexToRgba(color, alpha));
        blob.addColorStop(0.35, hexToRgba(color, alpha * 0.55));
        blob.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = blob;
        ctx.beginPath();
        ctx.arc(bx, by, r * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Contorno de vidrio + brillo
      glassPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.22)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-30, -lampH + 130);
      ctx.lineTo(-30, -80);
      ctx.strokeStyle = 'rgba(255,255,255,0.10)';
      ctx.lineWidth = 5;
      ctx.stroke();

      // Base metálica
      ctx.fillStyle = '#111114';
      ctx.strokeStyle = '#2a2a31';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-44, -8);
      ctx.lineTo(44, -8);
      ctx.lineTo(52, 18);
      ctx.lineTo(-52, 18);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#1b1b21';
      ctx.fillRect(-36, -14, 72, 8);

      ctx.restore();
    };

    lamps.forEach((lamp, i) => drawLamp(lampXs[i], lamp.color, lamp.phase, i));

    // ---------------------------------------------------------
    // 4. Cámara de captura
    // ---------------------------------------------------------
    const camX = 718;
    const camY = 372;
    const camW = 190;
    const camH = 132;
    const camS = spring(Math.max(0, t - 0.7), 24, 0.7);

    ctx.save();
    ctx.globalAlpha = clamp((t - 0.65) / 0.25, 0, 1) * exitAlpha;
    ctx.translate(camX + camW / 2, camY + camH / 2);
    ctx.scale(camS, camS);
    ctx.translate(-(camX + camW / 2), -(camY + camH / 2));

    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = '#3f3f46';
    ctx.lineWidth = 2;
    roundRect(camX, camY, camW, camH, 4);
    ctx.fill();
    ctx.stroke();

    // Esquinas de encuadre
    ctx.strokeStyle = '#71717a';
    ctx.lineWidth = 3;
    const corner = 18;
    [[camX + 12, camY + 12, 1, 1], [camX + camW - 12, camY + 12, -1, 1],
     [camX + 12, camY + camH - 12, 1, -1], [camX + camW - 12, camY + camH - 12, -1, -1]]
      .forEach(([x, y, sx, sy]) => {
        ctx.beginPath();
        ctx.moveTo(x, y + sy * corner);
        ctx.lineTo(x, y);
        ctx.lineTo(x + sx * corner, y);
        ctx.stroke();
      });

    // Lente
    const lensX = camX + 62;
    const lensY = camY + 68;
    ctx.beginPath();
    ctx.arc(lensX, lensY, 25, 0, Math.PI * 2);
    ctx.fillStyle = '#050505';
    ctx.fill();
    ctx.strokeStyle = '#52525b';
    ctx.lineWidth = 2;
    ctx.stroke();

    const lensGrad = ctx.createRadialGradient(lensX - 7, lensY - 7, 2, lensX, lensY, 24);
    lensGrad.addColorStop(0, 'rgba(16,185,129,0.55)');
    lensGrad.addColorStop(0.4, 'rgba(16,185,129,0.12)');
    lensGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = lensGrad;
    ctx.beginPath();
    ctx.arc(lensX, lensY, 24, 0, Math.PI * 2);
    ctx.fill();

    // REC
    const blink = Math.floor(t * 2.6) % 2 === 0;
    ctx.beginPath();
    ctx.arc(camX + 150, camY + 24, 5, 0, Math.PI * 2);
    ctx.fillStyle = blink ? '#ef4444' : '#3f3f46';
    ctx.fill();
    ctx.textAlign = 'left';
    ctx.fillStyle = blink ? '#ef4444' : '#52525b';
    ctx.font = '700 10px "JetBrains Mono", monospace';
    ctx.fillText('REC', camX + 160, camY + 27);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 10px "JetBrains Mono", monospace';
    ctx.fillText('CAM 01', camX + 14, camY + 22);
    ctx.restore();

    // Haz de captura
    ctx.save();
    ctx.globalAlpha = clamp((t - 1.1) / 0.4, 0, 1) * exitAlpha * 0.45;
    const beam = ctx.createLinearGradient(0, camY + camH, 0, 760);
    beam.addColorStop(0, 'rgba(16,185,129,0.35)');
    beam.addColorStop(1, 'rgba(16,185,129,0)');
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(camX + 70, camY + camH);
    ctx.lineTo(camX + 110, camY + camH);
    ctx.lineTo(camX + 150, 780);
    ctx.lineTo(camX + 30, 780);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // ---------------------------------------------------------
    // 5. Flujo de bits
    // ---------------------------------------------------------
    ctx.save();
    ctx.globalAlpha = exitAlpha;
    const streamTop = 520;
    const streamBottom = 770;
    for (let i = 0; i < 22; i++) {
      const speed = 72 + (i % 6) * 16;
      const y = streamTop + ((t * speed + i * 41) % (streamBottom - streamTop));
      const x = camX + 62 + Math.sin(i * 2.3 + t * 1.8) * 38;
      const a = Math.sin(((y - streamTop) / (streamBottom - streamTop)) * Math.PI);
      ctx.globalAlpha = clamp(a, 0, 1) * exitAlpha * 0.9;
      ctx.fillStyle = i % 3 === 0 ? '#fbbf24' : '#10b981';
      ctx.font = '600 12px "JetBrains Mono", monospace';
      ctx.fillText(i % 2 === 0 ? '0' : '1', x, y);
    }
    ctx.restore();

    // ---------------------------------------------------------
    // 6. CSPRNG
    // ---------------------------------------------------------
    const boxX = 688;
    const boxY = 800;
    const boxW = 224;
    const boxH = 154;
    const boxS = spring(Math.max(0, t - 1.35), 24, 0.72);

    ctx.save();
    ctx.globalAlpha = clamp((t - 1.3) / 0.25, 0, 1) * exitAlpha;
    ctx.translate(boxX + boxW / 2, boxY + boxH / 2);
    ctx.scale(boxS, boxS);
    ctx.translate(-(boxX + boxW / 2), -(boxY + boxH / 2));

    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    roundRect(boxX, boxY, boxW, boxH, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 14px "JetBrains Mono", monospace';
    ctx.fillText('CSPRNG', boxX + 18, boxY + 30);

    // Candado junto al título
    if (t > 2.8) {
      const lockX = boxX + boxW - 32;
      const lockY = boxY + 22;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(lockX + 5, lockY, 5, Math.PI, 0);
      ctx.stroke();
      ctx.fillStyle = '#10b981';
      ctx.fillRect(lockX - 2, lockY, 14, 11);
    }

    ctx.fillStyle = '#52525b';
    ctx.font = '600 10px "JetBrains Mono", monospace';
    ctx.fillText('CÁMARA → BITS', boxX + 18, boxY + 48);

    // Barra de progreso
    const fill = clamp((t - 1.7) / 1.5, 0, 1);
    ctx.fillStyle = '#1b1b21';
    ctx.fillRect(boxX + 18, boxY + 64, boxW - 36, 8);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(boxX + 18, boxY + 64, (boxW - 36) * fill, 8);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 10px "JetBrains Mono", monospace';
    ctx.fillText('256 BITS DE ENTROPÍA', boxX + 18, boxY + 96);

    // Token en dos líneas para no desbordar la caja
    const tokenLines = ['9F2C 7A41', 'E8B3 D6C0'];
    const tokenFlat = tokenLines.join(' ');
    const tokenChars = Math.floor(clamp((t - 3.0) / 1.2, 0, 1) * tokenFlat.length);
    let consumed = 0;

    ctx.fillStyle = '#e4e4e7';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    tokenLines.forEach((line, i) => {
      const visible = Math.max(0, Math.min(line.length, tokenChars - consumed));
      if (visible > 0) {
        ctx.fillText(line.substring(0, visible), boxX + 18, boxY + 120 + i * 22);
      }
      consumed += line.length + 1;
    });

    // Cursor mecánico mientras se escribe el token
    if (tokenChars > 0 && tokenChars < tokenFlat.length && Math.floor(t * 8) % 2 === 0) {
      ctx.fillStyle = '#10b981';
      ctx.fillRect(boxX + 18 + 16 * (tokenChars % 9), boxY + 104 + Math.floor(tokenChars / 9) * 22, 8, 16);
    }
    ctx.restore();

    // ---------------------------------------------------------
    // 7. Cierre / caption
    // ---------------------------------------------------------
    const capS = spring(Math.max(0, t - 4.3), 22, 0.7);
    ctx.save();
    ctx.globalAlpha = clamp((t - 4.2) / 0.25, 0, 1) * exitAlpha;
    ctx.translate(48, 1080);
    ctx.scale(capS, capS);
    ctx.textAlign = 'left';

    ctx.font = '900 44px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#09090b';
    ctx.fillText('LAS BURBUJAS', 3, 5);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('LAS BURBUJAS', 0, 0);

    ctx.fillStyle = '#fbbf24';
    ctx.fillText('NUNCA SE REPITEN.', 0, 52);

    ctx.fillStyle = '#71717a';
    ctx.font = '600 15px "JetBrains Mono", monospace';
    ctx.fillText('POR ESO SON ENTROPÍA.', 0, 92);
    ctx.restore();

    // Footer
    ctx.save();
    ctx.globalAlpha = clamp((t - 0.5) / 0.3, 0, 1) * exitAlpha;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#3f3f46';
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.fillText('SEDEV // INGENIERÍA QUE SE ENTIENDE', 48, 1302);

    const pct = Math.floor(clamp((t - 0.2) / 0.8, 0, 1) * 100);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#27272a';
    ctx.fillText(`${String(pct).padStart(3, ' ')}%`, 912, 1302);
    ctx.restore();

    // Línea inferior de progreso
    ctx.save();
    ctx.globalAlpha = exitAlpha * 0.8;
    ctx.fillStyle = '#18181b';
    ctx.fillRect(48, 1318, 864, 2);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(48, 1318, 864 * clamp(t / duration, 0, 1), 2);
    ctx.restore();
  }
});
