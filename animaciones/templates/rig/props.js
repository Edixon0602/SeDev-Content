// Procedural Minimalist Props
// Clean vector items: smartphone with live notification pills, desk, laptop, thermal receipt

(function(global) {
  const Props = {
    // 1. Smartphone with Screen & Message Pills
    drawPhone(ctx, x, y, options = {}) {
      const {
        scale = 1.0,
        rotation = 0,
        buzz = 0, // vibration shake intensity
        screenContent = 'notification',
        notificationTitle = 'ALERTA DE CAÍDA',
        notificationText = 'Checkout 503: 47 minutos sin ventas ($3,520)',
        notificationCount = 8
      } = options;

      const shakeX = buzz > 0 ? (Math.random() - 0.5) * buzz * 8 : 0;
      const shakeY = buzz > 0 ? (Math.random() - 0.5) * buzz * 8 : 0;

      ctx.save();
      ctx.translate(x + shakeX, y + shakeY);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);

      const pw = 200;
      const ph = 380;

      // Soft Grounding Contact Shadow on Desk
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.beginPath();
      ctx.ellipse(0, ph / 2 + 4, pw * 0.52, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      // Phone Case (Dark Obsidian Bezel)
      ctx.fillStyle = '#09090b';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(-pw / 2, -ph / 2, pw, ph, 28);
      ctx.fill();
      ctx.stroke();

      // Screen Surface
      const sw = pw - 16;
      const sh = ph - 16;
      ctx.fillStyle = '#121217';
      ctx.beginPath();
      ctx.roundRect(-sw / 2, -sh / 2, sw, sh, 22);
      ctx.fill();

      // Status Bar (Clock & Icons)
      ctx.fillStyle = '#71717a';
      ctx.font = '700 11px "JetBrains Mono", monospace';
      ctx.fillText('02:14 AM', -sw / 2 + 16, -sh / 2 + 24);

      // Battery Pill
      ctx.strokeStyle = '#71717a';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(sw / 2 - 32, -sh / 2 + 15, 18, 10);
      ctx.fillStyle = '#ef4444'; // Low battery red
      ctx.fillRect(sw / 2 - 30, -sh / 2 + 17, 5, 6);

      // Notification Card (Emergency Alert in Red/Amber)
      if (screenContent === 'notification') {
        const nw = sw - 24;
        const nh = 130;
        const ny = -30;

        ctx.fillStyle = 'rgba(239, 68, 68, 0.16)';
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-nw / 2, ny, nw, nh, 12);
        ctx.fill();
        ctx.stroke();

        // Notification Header
        ctx.fillStyle = '#f87171';
        ctx.font = '800 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`▲ ${notificationTitle}`, -nw / 2 + 12, ny + 24);

        // Badge Count
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(nw / 2 - 16, ny + 20, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.font = '800 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(`${notificationCount}`, nw / 2 - 16, ny + 24);

        // Body Text
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
        
        // Multi-line wrap
        const words = notificationText.split(' ');
        let line = '';
        let lineY = ny + 54;
        words.forEach(w => {
          if (ctx.measureText(line + w).width > nw - 24) {
            ctx.fillText(line, -nw / 2 + 12, lineY);
            line = w + ' ';
            lineY += 18;
          } else {
            line += w + ' ';
          }
        });
        if (line) ctx.fillText(line, -nw / 2 + 12, lineY);
      }

      ctx.restore();
    },

    // 2. Desk Surface
    drawDesk(ctx, y = 1450, options = {}) {
      const { deskColor = '#131318', edgeColor = '#27272a' } = options;
      ctx.save();
      // Desk Base
      ctx.fillStyle = deskColor;
      ctx.fillRect(0, y, 1080, 1920 - y);

      // Desk Top Edge Rim Line
      ctx.strokeStyle = edgeColor;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1080, y);
      ctx.stroke();

      // Subtle shadow below rim
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillRect(0, y, 1080, 12);
      ctx.restore();
    },

    // 3. Laptop Computer with Screen for Data Embedding
    drawLaptop(ctx, x, y, options = {}) {
      const { scale = 1.0, screenWidth = 420, screenHeight = 260 } = options;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      // Screen Lid
      ctx.fillStyle = '#09090b';
      ctx.strokeStyle = '#3f3f46';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(-screenWidth / 2, -screenHeight, screenWidth, screenHeight, [12, 12, 2, 2]);
      ctx.fill();
      ctx.stroke();

      // Base / Keyboard Deck
      const baseW = screenWidth * 1.15;
      const baseH = 22;
      ctx.fillStyle = '#1c1c22';
      ctx.strokeStyle = '#3f3f46';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(-baseW / 2, 0, baseW, baseH, [2, 2, 8, 8]);
      ctx.fill();
      ctx.stroke();

      // Trackpad indent
      ctx.fillStyle = '#141418';
      ctx.fillRect(-45, 4, 90, 12);

      ctx.restore();
    }
  };

  global.RigProps = Props;
})(typeof window !== 'undefined' ? window : global);
