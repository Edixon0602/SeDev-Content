// Central Motion Graphics Utilities & Atmospheric Background Engine
// Eliminates static holds, text overflows, and repetitive flat backgrounds.

(function() {
  const CATEGORY_PALETTES = {
    'ARQUITECTURA DE SOFTWARE': { primary: '#38bdf8', secondary: '#0284c7', glow: 'rgba(56, 189, 248, 0.14)', name: 'ARQUITECTURA' },
    'BASES DE DATOS': { primary: '#10b981', secondary: '#059669', glow: 'rgba(16, 185, 129, 0.14)', name: 'DATA ENGINE' },
    'DATA ENGINEERING': { primary: '#fbbf24', secondary: '#d97706', glow: 'rgba(251, 191, 36, 0.14)', name: 'ANALYTICS' },
    'SISTEMAS Y REDES': { primary: '#f97316', secondary: '#c2410c', glow: 'rgba(249, 115, 22, 0.14)', name: 'SYSTEMS' },
    'INTELIGENCIA ARTIFICIAL': { primary: '#a855f7', secondary: '#7c3aed', glow: 'rgba(168, 85, 247, 0.16)', name: 'AI CORE' },
    'CALIDAD DE SOFTWARE & TESTING': { primary: '#ec4899', secondary: '#be185d', glow: 'rgba(236, 72, 153, 0.14)', name: 'QUALITY' },
    'BASES DE DATOS & IA': { primary: '#06b6d4', secondary: '#0891b2', glow: 'rgba(6, 182, 212, 0.14)', name: 'VECTOR DB' },
    'LENGUAJES & RENDIMIENTO': { primary: '#f97316', secondary: '#ea580c', glow: 'rgba(249, 115, 22, 0.15)', name: 'RUST CORE' },
    'CIBERSEGURIDAD & DEVOPS': { primary: '#ef4444', secondary: '#b91c1c', glow: 'rgba(239, 68, 68, 0.14)', name: 'SECURITY' },
    'DEVOPS & CLOUD': { primary: '#38bdf8', secondary: '#0284c7', glow: 'rgba(56, 189, 248, 0.14)', name: 'BARE METAL' },
    'AI INFRASTRUCTURE & OPEN WEIGHTS': { primary: '#a855f7', secondary: '#9333ea', glow: 'rgba(168, 85, 247, 0.16)', name: 'INFERENCE' },
    'REDES & PROTOCOLOS WEB': { primary: '#06b6d4', secondary: '#0284c7', glow: 'rgba(6, 182, 212, 0.14)', name: 'NETWORKS' },
    'RUNTIMES JAVASCRIPT': { primary: '#fbbf24', secondary: '#ca8a04', glow: 'rgba(251, 191, 36, 0.14)', name: 'RUNTIMES' },
    'ESTRUCTURAS DE DATOS & DB INTERNALS': { primary: '#10b981', secondary: '#059669', glow: 'rgba(16, 185, 129, 0.14)', name: 'STRUCTURES' },
    'COMPILACIÓN & RUNTIMES': { primary: '#6366f1', secondary: '#4f46e5', glow: 'rgba(99, 102, 241, 0.15)', name: 'WASMTIME' },
    'FRONTEND ARCHITECTURE & WEB PERFORMANCE': { primary: '#38bdf8', secondary: '#0284c7', glow: 'rgba(56, 189, 248, 0.14)', name: 'FRONTEND' },
    'BASES DE DATOS & ESCALABILIDAD': { primary: '#06b6d4', secondary: '#0891b2', glow: 'rgba(6, 182, 212, 0.14)', name: 'SCALABILITY' },
    'ESTRUCTURAS DE DATOS PROBABILÍSTICAS': { primary: '#a855f7', secondary: '#7e22ce', glow: 'rgba(168, 85, 247, 0.15)', name: 'BLOOM' },
    'SISTEMAS DE CACHÉ & ALTA DISPONIBILIDAD': { primary: '#10b981', secondary: '#047857', glow: 'rgba(16, 185, 129, 0.14)', name: 'CACHING' },
    'BASES DE DATOS & OPERACIONES EN VIVO': { primary: '#10b981', secondary: '#059669', glow: 'rgba(16, 185, 129, 0.14)', name: 'OPERATIONS' }
  };

  const DEFAULT_PALETTE = { primary: '#38bdf8', secondary: '#0284c7', glow: 'rgba(56, 189, 248, 0.12)', name: 'ENGINEERING' };

  const motionUtils = {
    // 1. Text Wrapping with Clamping (Prevents horizontal overflow)
    wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
      if (!text) return y;
      const words = String(text).split(' ');
      let line = '';
      let currentY = y;
      let linesCount = 0;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + (line ? ' ' : '') + words[n];
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, currentY);
          line = words[n];
          currentY += lineHeight;
          linesCount++;
          if (linesCount >= maxLines - 1) {
            // Last line: append ellipsis if words remain
            const rest = words.slice(n).join(' ');
            let truncLine = rest;
            while (ctx.measureText(truncLine + '...').width > maxWidth && truncLine.length > 0) {
              truncLine = truncLine.substring(0, truncLine.length - 1);
            }
            ctx.fillText(truncLine + '...', x, currentY);
            return currentY + lineHeight;
          }
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, currentY);
      return currentY + lineHeight;
    },

    // 2. Dynamic Auto-Fitting Font Size (Never overflows title bounds)
    fitText(ctx, text, x, y, maxWidth, maxFontSize, minFontSize, fontStack, weight = '800') {
      if (!text) return;
      let size = maxFontSize;
      ctx.font = `${weight} ${size}px ${fontStack}`;
      while (ctx.measureText(text).width > maxWidth && size > minFontSize) {
        size -= 2;
        ctx.font = `${weight} ${size}px ${fontStack}`;
      }
      ctx.fillText(text, x, y);
    },

    // 3. Atmospheric Background Renderer (1080x1920 Full Bleed)
    renderBackdrop(ctx, width, height, t, meta = {}) {
      const category = meta.category || 'ARQUITECTURA DE SOFTWARE';
      const pal = CATEGORY_PALETTES[category] || DEFAULT_PALETTE;

      // Base Obsidian Background
      ctx.fillStyle = '#070709';
      ctx.fillRect(0, 0, width, height);

      // Living Atmospheric Glow Orb 1 (Top-Right)
      const pulse1 = 0.85 + 0.15 * Math.sin(t * 1.6);
      const radGlow1 = ctx.createRadialGradient(850, 320, 20, 850, 320, 680 * pulse1);
      radGlow1.addColorStop(0, pal.glow);
      radGlow1.addColorStop(0.5, 'rgba(15, 18, 25, 0.4)');
      radGlow1.addColorStop(1, 'transparent');
      ctx.fillStyle = radGlow1;
      ctx.fillRect(0, 0, width, height);

      // Living Atmospheric Glow Orb 2 (Bottom-Left)
      const pulse2 = 0.85 + 0.15 * Math.cos(t * 1.3);
      const radGlow2 = ctx.createRadialGradient(220, 1550, 20, 220, 1550, 640 * pulse2);
      radGlow2.addColorStop(0, pal.glow);
      radGlow2.addColorStop(0.5, 'rgba(10, 14, 20, 0.3)');
      radGlow2.addColorStop(1, 'transparent');
      ctx.fillStyle = radGlow2;
      ctx.fillRect(0, 0, width, height);

      // Precision Dot Matrix Grid (48px spacing)
      const gridOffset = (t * 6) % 48;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      for (let x = 40; x < width - 40; x += 48) {
        for (let y = 140; y < height - 140; y += 48) {
          ctx.beginPath();
          ctx.arc(x, y + gridOffset * 0.15, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Technical Corner Crosshairs [+]
      const corners = [
        { x: 50, y: 80 },
        { x: width - 50, y: 80 },
        { x: 50, y: height - 80 },
        { x: width - 50, y: height - 80 }
      ];
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      corners.forEach(c => {
        ctx.beginPath();
        ctx.moveTo(c.x - 8, c.y); ctx.lineTo(c.x + 8, c.y);
        ctx.moveTo(c.x, c.y - 8); ctx.lineTo(c.x, c.y + 8);
        ctx.stroke();
      });

      // Top Broadcast Telemetry Header
      ctx.fillStyle = pal.primary;
      ctx.beginPath();
      ctx.arc(65, 80, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '700 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(pal.name, 80, 84);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#52525b';
      const secStr = t.toFixed(2).padStart(5, '0');
      ctx.fillText(`REC ● 00:${secStr} // 60FPS`, width - 65, 84);

      // Thin Header Divider Line with Center Notch
      ctx.strokeStyle = '#1f1f23';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(50, 105);
      ctx.lineTo(width - 50, 105);
      ctx.stroke();

      // Bottom Broadcast Telemetry
      ctx.strokeStyle = '#1f1f23';
      ctx.beginPath();
      ctx.moveTo(50, height - 105);
      ctx.lineTo(width - 50, height - 105);
      ctx.stroke();

      // Bottom Audio Spectrum Pulse (7 Bars)
      for (let b = 0; b < 7; b++) {
        const barH = 4 + Math.abs(Math.sin(t * 3.5 + b * 0.8)) * 14;
        ctx.fillStyle = b === 3 ? pal.primary : '#27272a';
        ctx.fillRect(width / 2 - 35 + b * 10, height - 90 - barH / 2, 4, barH);
      }

      ctx.textAlign = 'left';
      ctx.fillStyle = '#52525b';
      ctx.font = '600 12px "JetBrains Mono", monospace';
      ctx.fillText('HARDWARE TELEMETRY // REAL-TIME', 50, height - 88);

      ctx.textAlign = 'right';
      ctx.fillText('STABILITY: 99.99%', width - 50, height - 88);
    },

    // 4. Shimmer Effect along Rectangles
    drawShimmer(ctx, x, y, w, h, t, color = 'rgba(255, 255, 255, 0.08)') {
      const pos = ((t * 0.8) % 2) - 0.5; // -0.5 to 1.5
      const grad = ctx.createLinearGradient(x + w * pos, y, x + w * (pos + 0.3), y + h);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.5, color);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);
    }
  };

  window.motionUtils = motionUtils;
})();
