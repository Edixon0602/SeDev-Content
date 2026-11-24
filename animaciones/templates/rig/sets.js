// Procedural Sets & Environments
// Minimalist, high-contrast settings (Office at night, Meeting table, Split reality)

(function(global) {
  const Sets = {
    draw(ctx, width, height, t, setType = 'oficina_noche') {
      ctx.save();

      if (setType === 'oficina_noche') {
        // Deep obsidian base
        ctx.fillStyle = '#060608';
        ctx.fillRect(0, 0, width, height);

        // Moody night window with subtle Venetian blind slats (placed cleanly on right wall below header)
        const winX = 760;
        const winY = 400;
        const winW = 260;
        const winH = 460;

        // Window frame
        ctx.strokeStyle = '#18181b';
        ctx.lineWidth = 4;
        ctx.strokeRect(winX, winY, winW, winH);

        // Soft city moonlight through window
        const winGrad = ctx.createLinearGradient(winX, winY, winX, winY + winH);
        winGrad.addColorStop(0, 'rgba(30, 58, 138, 0.22)'); // Midnight blue
        winGrad.addColorStop(1, 'rgba(15, 23, 42, 0.05)');
        ctx.fillStyle = winGrad;
        ctx.fillRect(winX, winY, winW, winH);

        // Blind slats
        ctx.strokeStyle = 'rgba(24, 24, 27, 0.85)';
        ctx.lineWidth = 3;
        for (let y = winY + 28; y < winY + winH; y += 36) {
          ctx.beginPath();
          ctx.moveTo(winX, y);
          ctx.lineTo(winX + winW, y);
          ctx.stroke();
        }

        // Ambient desk light cone (warm amber glow on character work area)
        const lampX = 420;
        const lampY = 960;
        const lightGrad = ctx.createRadialGradient(lampX, lampY, 60, lampX, lampY, 650);
        lightGrad.addColorStop(0, 'rgba(251, 191, 36, 0.15)'); // Warm amber spot
        lightGrad.addColorStop(0.7, 'rgba(251, 191, 36, 0.03)');
        lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = lightGrad;
        ctx.beginPath();
        ctx.arc(lampX, lampY, 650, 0, Math.PI * 2);
        ctx.fill();

        // Floor / Wall junction line
        ctx.strokeStyle = '#18181b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 1260);
        ctx.lineTo(width, 1260);
        ctx.stroke();
      }

      ctx.restore();
    }
  };

  global.RigSets = Sets;
})(typeof window !== 'undefined' ? window : global);
