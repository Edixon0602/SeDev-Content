// Component: bittorrent_file_slicer_viz
// Visceral Mechanical File Shredder / Merkle Hasher
// Visualizes a massive monolithic file (e.g. 50GB ISO) getting sliced into discrete,
// SHA-1 cryptographic blocks with real hexadecimal hashes, verification ticks,
// and corrupted block rejection.

window.registerComponent('bittorrent_file_slicer_viz', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-bt-slicer">
        <canvas id="slicerCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#slicerCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp, lerp } = utils;
    const mu = window.motionUtils;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 960, 1360);

    const title = (props.title || 'DESPIECE CRIPTOGRÁFICO DE ARCHIVO').toUpperCase();
    const subtitle = (props.subtitle || 'SHARDING SHA-1: 50 GB -> 200,000 BLOQUES DE 256 KB').toUpperCase();

    // 1. Clean Monospace Header
    ctx.textAlign = 'left';
    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 40, 42);

    ctx.fillStyle = '#ffffff';
    if (mu) {
      mu.fitText(ctx, title, 40, 92, 880, 38, 24, '"Plus Jakarta Sans", sans-serif', '900');
    }

    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, 118);
    ctx.lineTo(920, 118);
    ctx.stroke();

    const boxX = 40;
    const boxW = 880;

    // 2. Monolithic File Capsule (Upper Area: y = 145..315)
    const fileY = 145;
    const fileH = 170;
    ctx.fillStyle = '#0a0a0f';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.fillRect(boxX, fileY, boxW, fileH);
    ctx.strokeRect(boxX, fileY, boxW, fileH);

    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(boxX, fileY, 6, fileH);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('VIDEO_4K_MASTER.ISO', boxX + 28, fileY + 45);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.fillText('50.0 GB · TAMAÑO TOTAL', boxX + boxW - 28, fileY + 45);

    // Monolithic progress bar getting cut by vertical laser slicers
    const barX = boxX + 28;
    const barY = fileY + 70;
    const barW = boxW - 56;
    const barH = 50;

    ctx.fillStyle = '#18181f';
    ctx.fillRect(barX, barY, barW, barH);
    ctx.strokeStyle = '#27272a';
    ctx.strokeRect(barX, barY, barW, barH);

    // Dynamic laser slicer cutting the block into segments
    const numSlices = 14;
    const sliceProgress = clamp(t / (duration * 0.45), 0, 1);
    const activeSlices = Math.floor(sliceProgress * numSlices);

    for (let s = 0; s < numSlices; s++) {
      const sx = barX + (s / numSlices) * barW;
      const sw = barW / numSlices - 3;
      const isCut = s < activeSlices;

      ctx.fillStyle = isCut ? '#0284c7' : '#27272a';
      ctx.fillRect(sx, barY + 4, sw, barH - 8);

      if (isCut) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`P_${s}`, sx + sw / 2, barY + 30);
      }
    }

    // Laser Blade Head indicator
    if (sliceProgress < 1) {
      const laserX = barX + sliceProgress * barW;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(laserX, barY - 10);
      ctx.lineTo(laserX, barY + barH + 10);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = '800 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('✂ LASER CUTTER', laserX, barY - 16);
    }

    ctx.textAlign = 'left';
    ctx.fillStyle = '#71717a';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText(`STATUS: DIVIDIENDO EN 200,000 PARTES INDEPENDIENTES (SHA-1 VERIFIED)`, barX, fileY + 150);

    // 3. Cryptographic Chunk Registry Table (y = 335..1050)
    const tableY = 335;
    const tableH = 715;
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.fillRect(boxX, tableY, boxW, tableH);
    ctx.strokeRect(boxX, tableY, boxW, tableH);

    // Table Header Bar
    ctx.fillStyle = '#111116';
    ctx.fillRect(boxX, tableY, boxW, 52);
    ctx.strokeStyle = '#27272a';
    ctx.beginPath();
    ctx.moveTo(boxX, tableY + 52);
    ctx.lineTo(boxX + boxW, tableY + 52);
    ctx.stroke();

    ctx.font = '800 14px "JetBrains Mono", monospace';
    ctx.fillStyle = '#a1a1aa';
    ctx.textAlign = 'left';
    ctx.fillText('BLOQUE', boxX + 24, tableY + 32);
    ctx.fillText('OFFSET EN DISCO', boxX + 160, tableY + 32);
    ctx.fillText('HASH CRIPTOGRÁFICO SHA-1 (20 BYTES)', boxX + 380, tableY + 32);
    ctx.textAlign = 'right';
    ctx.fillText('ESTADO', boxX + boxW - 24, tableY + 32);

    // 8 Detailed Block Rows
    const mockBlocks = [
      { id: 'BLOCK #0001', offset: '0x00000000..0x00040000', hash: '7b2a9f18c4e0981d3f458e0a1b2c3d4e5f6a7b8c', ok: true },
      { id: 'BLOCK #0002', offset: '0x00040000..0x00080000', hash: 'a1b2c3d4e5f60718293a4b5c6d7e8f9a0b1c2d3e', ok: true },
      { id: 'BLOCK #0003', offset: '0x00080000..0x000C0000', hash: '4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a', ok: true },
      { id: 'BLOCK #0004', offset: '0x000C0000..0x00100000', hash: '9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d', ok: false }, // Corrupted byte!
      { id: 'BLOCK #0005', offset: '0x00100000..0x00140000', hash: '0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e', ok: true },
      { id: 'BLOCK #0006', offset: '0x00140000..0x00180000', hash: '2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b', ok: true },
      { id: 'BLOCK #0007', offset: '0x00180000..0x001C0000', hash: '8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a', ok: true },
      { id: 'BLOCK #0008', offset: '0x001C0000..0x00200000', hash: '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d', ok: true }
    ];

    const rowH = 78;
    mockBlocks.forEach((blk, idx) => {
      const ry = tableY + 54 + idx * rowH;
      const rowT = 0.3 + idx * (duration * 0.08);
      if (t < rowT) return;

      const isCorrupted = !blk.ok;
      const isVerified = t > rowT + 0.4;

      ctx.fillStyle = isCorrupted && isVerified ? '#1f0d11' : (idx % 2 === 0 ? '#0d0d12' : '#09090c');
      ctx.fillRect(boxX + 2, ry, boxW - 4, rowH - 4);
      ctx.strokeStyle = isCorrupted && isVerified ? '#ef4444' : '#18181f';
      ctx.strokeRect(boxX + 2, ry, boxW - 4, rowH - 4);

      // Status indicator bar
      ctx.fillStyle = isCorrupted && isVerified ? '#ef4444' : (isVerified ? '#10b981' : '#fbbf24');
      ctx.fillRect(boxX + 4, ry, 5, rowH - 4);

      ctx.textAlign = 'left';
      ctx.font = '800 15px "JetBrains Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(blk.id, boxX + 24, ry + 34);

      ctx.font = '600 13px "JetBrains Mono", monospace';
      ctx.fillStyle = '#71717a';
      ctx.fillText(blk.offset, boxX + 160, ry + 34);

      // Animated Hash verification typewriter
      ctx.fillStyle = isCorrupted && isVerified ? '#fca5a5' : '#38bdf8';
      ctx.font = '600 12px "JetBrains Mono", monospace';
      const hashStr = blk.hash;
      const charProgress = clamp((t - rowT) / 0.4, 0, 1);
      const visibleChars = Math.floor(charProgress * hashStr.length);
      ctx.fillText(hashStr.substring(0, visibleChars), boxX + 380, ry + 34);

      // Status pill badge
      ctx.textAlign = 'right';
      if (!isVerified) {
        ctx.fillStyle = '#fbbf24';
        ctx.font = '800 13px "JetBrains Mono", monospace';
        ctx.fillText('⏳ VERIFICANDO', boxX + boxW - 24, ry + 34);
      } else if (isCorrupted) {
        ctx.fillStyle = '#ef4444';
        ctx.font = '800 13px "JetBrains Mono", monospace';
        ctx.fillText('✖ CHECKSUM FAIL', boxX + boxW - 24, ry + 26);
        ctx.fillStyle = '#f87171';
        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.fillText('Re-pidiendo solo 256KB', boxX + boxW - 24, ry + 46);
      } else {
        ctx.fillStyle = '#10b981';
        ctx.font = '800 13px "JetBrains Mono", monospace';
        ctx.fillText('✔ SHA-1 VÁLIDO', boxX + boxW - 24, ry + 34);
      }
    });

    // 4. Bottom Engineering Takeaway
    const botY = 1070;
    ctx.fillStyle = '#0a0a0f';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.fillRect(boxX, botY, boxW, 80);
    ctx.strokeRect(boxX, botY, boxW, 80);

    ctx.fillStyle = '#10b981';
    ctx.fillRect(boxX, botY, 6, 80);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('EL SECRETO DE LA RESILIENCIA:', boxX + 24, botY + 34);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 14px "JetBrains Mono", monospace';
    ctx.fillText('Si se corta la conexión, no vuelves a bajar 50 GB: solo reintentas el bloque roto de 256 KB.', boxX + 24, botY + 58);
  }
});
