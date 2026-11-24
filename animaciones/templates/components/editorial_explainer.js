// Component: editorial_explainer
//
// Concrete editorial visual compositions: real SeDev icons, labeled nodes,
// trend charts, optional resolved images/logos, graphite/ivory grounds, and
// clean deterministic motion across early -> settle -> close.

window.registerComponent('editorial_explainer', {
  iconDataUri(name, color) {
    if (!name || name === 'none') return null;
    if (typeof window.getSeDevIcon !== 'function') return null;
    let svg = window.getSeDevIcon(name, 140, color || '#d08a5a', 'raw');
    if (!/xmlns=/.test(svg)) {
      svg = svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
    }
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  },

  loadImg(src) {
    return new Promise((resolve) => {
      if (!src) return resolve(null);
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  },

  async init(container, props) {
    container.innerHTML = `
      <canvas id="editorialExplainerCanvas" width="1080" height="1920"
        style="position:absolute;top:0;left:0;width:1080px;height:1920px;display:block;"></canvas>
    `;
    this.canvas = container.querySelector('#editorialExplainerCanvas');
    this.ctx = this.canvas.getContext('2d');
    const safeProps = props || {};
    this.grain = this.makeGrain(160, Number(safeProps.seed) || 20261119);
    const pal = this.palette(safeProps);

    const variant = safeProps.variant || 'transform';
    const defaultMainIcon = {
      transform: 'cache_bolt',
      comparison: 'scale_balance',
      flow: 'mcp_protocol',
      cause: 'market_trend_down',
      detail: 'custom_code'
    }[variant] || 'cpu';

    const mainIconName = safeProps.icon === 'none' ? '' : (safeProps.icon || defaultMainIcon);
    const leftIconName = safeProps.leftIcon === 'none'
      ? ''
      : (safeProps.leftIcon || (variant === 'comparison' ? 'saas_cloud' : variant === 'flow' ? 'saas_cloud' : 'server_rack'));
    const rightIconName = safeProps.rightIcon === 'none'
      ? ''
      : (safeProps.rightIcon || (variant === 'comparison' ? 'ai_agent' : variant === 'flow' ? 'ai_agent' : 'custom_code'));

    const [mainIcon, leftIcon, rightIcon, resolvedImage, resolvedLogos] = await Promise.all([
      mainIconName ? this.loadImg(this.iconDataUri(mainIconName, pal.accent)) : Promise.resolve(null),
      leftIconName ? this.loadImg(this.iconDataUri(leftIconName, pal.muted)) : Promise.resolve(null),
      rightIconName ? this.loadImg(this.iconDataUri(rightIconName, pal.accent)) : Promise.resolve(null),
      this.loadImg(safeProps._resolvedImage || ''),
      Promise.all((Array.isArray(safeProps._resolvedLogos) ? safeProps._resolvedLogos : []).slice(0, 4).map(async (l) => ({
        ...l,
        img: await this.loadImg(l.dataUri)
      })))
    ]);

    this.assets = { mainIcon, leftIcon, rightIcon, resolvedImage, resolvedLogos };
  },

  makeGrain(size, seed) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const image = ctx.createImageData(size, size);
    const MC = window.MotionCore;
    const rand = MC && MC.seeded ? MC.seeded(seed) : (() => { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; })();
    for (let i = 0; i < image.data.length; i += 4) {
      const v = 120 + Math.floor(rand() * 135);
      image.data[i] = v;
      image.data[i + 1] = v;
      image.data[i + 2] = v;
      image.data[i + 3] = 26;
    }
    ctx.putImageData(image, 0, 0);
    return canvas;
  },

  palette(props) {
    const ivory = props && props.ground === 'ivory';
    return ivory ? {
      ground: 'ivory',
      bg: '#ece7dd',
      bgDeep: '#ddd6c8',
      cardBg: '#f6f2ea',
      cardDeep: '#e5ded1',
      ink: '#171614',
      muted: '#5f5a52',
      line: 'rgba(23,22,20,0.22)',
      hair: 'rgba(23,22,20,0.14)',
      shadow: '#c8bfaf',
      grainAlpha: 0.10,
      accent: props.accent || '#b85f42'
    } : {
      ground: 'graphite',
      bg: '#101012',
      bgDeep: '#08080a',
      cardBg: '#18181c',
      cardDeep: '#111114',
      ink: '#f2ede4',
      muted: '#a39d94',
      line: 'rgba(242,237,228,0.22)',
      hair: 'rgba(242,237,228,0.12)',
      shadow: '#060608',
      grainAlpha: 0.14,
      accent: props.accent || '#d08a5a'
    };
  },

  clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; },
  smooth(a, b, v) { const p = this.clamp01((v - a) / Math.max(0.0001, b - a)); return p * p * (3 - 2 * p); },
  lerp(a, b, p) { return a + (b - a) * p; },
  easeOut(p) { return p >= 1 ? 1 : 1 - Math.pow(1 - p, 3); },

  roundRect(ctx, x, y, w, h, r) {
    const radius = Math.max(0, Math.min(r, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  },

  drawCard(ctx, palette, x, y, w, h, opts = {}) {
    const r = opts.radius !== undefined ? opts.radius : 18;
    const bg = opts.bg || palette.cardBg;
    const border = opts.border || palette.hair;
    const bw = opts.borderWidth || 2;
    ctx.save();
    ctx.fillStyle = palette.shadow;
    this.roundRect(ctx, x, y + 6, w, h, r);
    ctx.fill();
    ctx.fillStyle = bg;
    this.roundRect(ctx, x, y, w, h, r);
    ctx.fill();
    ctx.strokeStyle = border;
    ctx.lineWidth = bw;
    this.roundRect(ctx, x, y, w, h, r);
    ctx.stroke();
    ctx.restore();
  },

  drawImageCover(ctx, img, x, y, w, h, r) {
    if (!img || !img.width || !img.height) return;
    ctx.save();
    this.roundRect(ctx, x, y, w, h, r);
    ctx.clip();
    const imgAspect = img.width / img.height;
    const boxAspect = w / h;
    let dw = w, dh = h, dx = x, dy = y;
    if (imgAspect > boxAspect) {
      dw = h * imgAspect;
      dx = x - (dw - w) / 2;
    } else {
      dh = w / imgAspect;
      dy = y - (dh - h) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  },

  drawBackground(ctx, palette) {
    ctx.fillStyle = palette.bg;
    ctx.fillRect(0, 0, 1080, 1920);

    const light = ctx.createRadialGradient(360, 540, 40, 360, 640, 1180);
    light.addColorStop(0, palette.ground === 'ivory' ? 'rgba(255,255,250,0.55)' : 'rgba(255,246,232,0.075)');
    light.addColorStop(0.55, palette.ground === 'ivory' ? 'rgba(255,255,250,0.16)' : 'rgba(255,246,232,0.018)');
    light.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, 1080, 1920);

    if (this.grain) {
      const pattern = ctx.createPattern(this.grain, 'repeat');
      if (pattern) {
        ctx.save();
        ctx.globalAlpha = palette.grainAlpha * 0.34;
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, 1080, 1920);
        ctx.restore();
      }
    }
  },

  drawHeader(ctx, palette, props, t) {
    const MC = window.MotionCore;
    const rawHeadline = String(props.headline || '').trim();
    const headline = rawHeadline.toUpperCase().replace(/\s+VS\s+/g, ' vs ');

    if (headline) {
      const layout = MC ? MC.layoutHeadline(ctx, [{ text: headline }], {
        top: 230,
        bottom: 610,
        maxWidth: 880,
        maxFont: 102,
        minFont: 50,
        anchorX: 540,
        weight: '700'
      }) : null;
      if (layout && layout.visual.length) {
        ctx.save();
        ctx.textAlign = 'left';
        ctx.fillStyle = palette.ink;
        for (let i = 0; i < layout.visual.length; i++) {
          const line = layout.visual[i];
          const start = 0.04 + i * 0.055;
          const p = MC ? MC.progress(t, start, 0.38, 'outQuint') : this.clamp01((t - start) / 0.38);
          if (p <= 0) continue;
          ctx.save();
          ctx.globalAlpha = p;
          ctx.font = `700 ${line.fontSize}px "Plus Jakarta Sans", sans-serif`;
          ctx.fillText(line.text, 96, line.baseline + (1 - p) * 22);
          ctx.restore();
        }
        ctx.restore();
      }
    }
  },

  drawFigure(ctx, palette, props, t) {
    if (!props.figure) return;
    const MC = window.MotionCore;
    const p = MC ? MC.progress(t, 0.30, 0.38, 'outCubic') : this.clamp01((t - 0.30) / 0.38);
    if (p <= 0) return;
    ctx.save();
    ctx.globalAlpha = 0.95 * p;
    ctx.fillStyle = palette.accent;
    ctx.textAlign = 'right';
    ctx.font = '700 84px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(String(props.figure), 984, 708 + (1 - p) * 14);
    if (props.label) {
      ctx.globalAlpha = 0.72 * p;
      ctx.fillStyle = palette.muted;
      ctx.font = '700 22px "JetBrains Mono", monospace';
      ctx.fillText(String(props.label).toUpperCase(), 984, 742);
    }
    ctx.restore();
  },

  drawTransform(ctx, palette, props, t, duration) {
    const MC = window.MotionCore;
    const items = Array.isArray(props.items) && props.items.length
      ? props.items.slice(0, 3)
      : (props.leftLabel ? [props.leftLabel] : ['ESTADO ANTERIOR']);
    const pEnter = MC ? MC.progress(t, duration * 0.06, duration * 0.42, 'outCubic') : this.clamp01(t / (duration * 0.42));
    const pConverge = MC ? MC.progress(t, duration * 0.46, duration * 0.44, 'inOutCubic') : this.clamp01((t - duration * 0.46) / (duration * 0.44));

    const leftX = 96;
    const rightX = 564;
    const cardW = 420;

    // Left stack: discrete steps (vertically balanced for 1, 2, or 3 items)
    const hasLeftIcon = !!(this.assets && this.assets.leftIcon);
    const leftBaseY = items.length === 1 ? 929 : items.length === 2 ? 854 : 780;
    items.forEach((label, i) => {
      const itemP = MC ? MC.progress(t, 0.06 + i * 0.08, duration * 0.28, 'outCubic') : pEnter;
      if (itemP <= 0) return;
      const y = leftBaseY + i * 150 + (1 - itemP) * 24;
      ctx.save();
      ctx.globalAlpha = itemP * (1 - pConverge * 0.25);
      this.drawCard(ctx, palette, leftX, y, cardW, 122, { radius: 16 });
      if (hasLeftIcon) {
        ctx.drawImage(this.assets.leftIcon, leftX + 20, y + 29, 64, 64);
      } else {
        ctx.fillStyle = palette.muted;
        ctx.fillRect(leftX + 22, y + 36, 6, 50);
      }
      ctx.fillStyle = palette.ink;
      ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(String(label).toUpperCase().slice(0, hasLeftIcon ? 18 : 22), hasLeftIcon ? leftX + 104 : leftX + 46, y + 70);
      ctx.restore();
    });

    // Connector beam
    const beamP = MC ? MC.progress(t, duration * 0.28, duration * 0.36, 'outCubic') : pConverge;
    if (beamP > 0) {
      ctx.save();
      ctx.strokeStyle = palette.accent;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(leftX + cardW + 10, 990);
      ctx.lineTo(leftX + cardW + 10 + (rightX - leftX - cardW - 20) * beamP, 990);
      ctx.stroke();
      ctx.restore();
    }

    // Right unified target card
    const targetY = 810;
    const targetH = 380;
    const hasRightVisual = !!(this.assets && (this.assets.resolvedImage || this.assets.mainIcon));
    ctx.save();
    ctx.globalAlpha = 0.25 + 0.75 * Math.max(pEnter * 0.5, pConverge);
    this.drawCard(ctx, palette, rightX, targetY, cardW, targetH, {
      radius: 22,
      border: palette.accent,
      borderWidth: 3
    });
    if (this.assets && this.assets.resolvedImage) {
      this.drawImageCover(ctx, this.assets.resolvedImage, rightX + 24, targetY + 24, cardW - 48, 190, 14);
    } else if (this.assets && this.assets.mainIcon) {
      ctx.drawImage(this.assets.mainIcon, rightX + cardW / 2 - 68, targetY + 64, 136, 136);
    } else {
      ctx.fillStyle = palette.accent;
      ctx.fillRect(rightX + cardW / 2 - 36, targetY + 116, 72, 6);
    }
    ctx.fillStyle = palette.ink;
    ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      String(props.rightLabel || 'FLUJO ÚNICO').toUpperCase().slice(0, 18),
      rightX + cardW / 2,
      hasRightVisual ? (targetY + 286) : (targetY + 196)
    );

    // Closing progress lock bar
    const lockP = this.smooth(0.60, 0.94, t / Math.max(0.001, duration));
    ctx.fillStyle = palette.hair;
    ctx.fillRect(rightX + 36, targetY + 340, cardW - 72, 6);
    ctx.fillStyle = palette.accent;
    ctx.fillRect(rightX + 36, targetY + 340, (cardW - 72) * lockP, 6);
    ctx.restore();
  },

  drawFittedCardTitle(ctx, text, cx, baseY, maxWidth, maxFont = 34, minFont = 24) {
    const clean = String(text || '').toUpperCase().trim();
    if (!clean) return;
    const MC = window.MotionCore;
    let size = maxFont;
    let lines = [clean];
    while (size >= minFont) {
      ctx.font = `800 ${size}px "Plus Jakarta Sans", sans-serif`;
      lines = MC ? MC.splitTextToWidth(ctx, clean, maxWidth) : [clean];
      const widest = lines.reduce((m, l) => Math.max(m, ctx.measureText(l).width), 0);
      if (lines.length <= 2 && widest <= maxWidth) break;
      size -= 2;
    }
    const lineH = size * 1.12;
    const startY = lines.length === 1 ? baseY : baseY - lineH * 0.35;
    ctx.font = `800 ${size}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    lines.slice(0, 2).forEach((line, idx) => {
      ctx.fillText(line, cx, startY + idx * lineH);
    });
  },

  drawComparison(ctx, palette, props, t, duration) {
    const MC = window.MotionCore;
    const leftP = MC ? MC.progress(t, duration * 0.06, duration * 0.34, 'outCubic') : this.clamp01(t / (duration * 0.34));
    const rightP = MC ? MC.progress(t, duration * 0.24, duration * 0.38, 'outCubic') : this.clamp01((t - duration * 0.24) / (duration * 0.38));
    const closeSettle = this.smooth(0.65, 0.95, t / Math.max(0.001, duration));

    const leftLabel = String(props.leftLabel || 'ANTES').toUpperCase();
    const rightLabel = String(props.rightLabel || 'AHORA').toUpperCase();
    const items = Array.isArray(props.items) ? props.items : [];
    const allLogos = this.assets && Array.isArray(this.assets.resolvedLogos) ? this.assets.resolvedLogos : [];
    const splitLogos = allLogos.length >= 4;
    const leftLogos = splitLogos ? allLogos.slice(0, 2) : [];
    const rightLogos = splitLogos ? allLogos.slice(2, 4) : allLogos.slice(0, 3);

    const colW = 424;
    const colH = 520;
    const leftX = 96;
    const rightX = 560;
    const topY = 740;

    // Left Card
    const hasLeftIcon = !!(this.assets && this.assets.leftIcon);
    const hasRightIcon = !!(this.assets && this.assets.rightIcon);
    ctx.save();
    ctx.globalAlpha = leftP;
    const ly = topY + (1 - leftP) * 28;
    this.drawCard(ctx, palette, leftX, ly, colW, colH, { radius: 22 });
    if (hasLeftIcon) {
      ctx.drawImage(this.assets.leftIcon, leftX + colW / 2 - 64, ly + 48, 128, 128);
    }
    ctx.fillStyle = palette.ink;
    this.drawFittedCardTitle(ctx, leftLabel, leftX + colW / 2, ly + (hasLeftIcon ? 236 : 112), colW - 44, 34, 24);

    const leftBodyY = ly + (hasLeftIcon ? 318 : 210);
    if (leftLogos.length) {
      const lxStart = leftX + (colW - (leftLogos.length * 124)) / 2;
      leftLogos.forEach((l, idx) => {
        const bx = lxStart + idx * 124 + 8;
        const by = leftBodyY;
        this.drawCard(ctx, palette, bx, by, 108, 114, { radius: 14, bg: palette.bgDeep });
        if (l.img) ctx.drawImage(l.img, bx + 26, by + 16, 56, 56);
        ctx.fillStyle = palette.muted;
        ctx.font = '700 14px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(String(l.name || l.slug || '').slice(0, 10), bx + 54, by + 94);
      });
    } else {
      [0.85, 0.65, 0.45].forEach((ratio, idx) => {
        const by = leftBodyY + idx * (hasLeftIcon ? 50 : 62);
        ctx.fillStyle = palette.hair;
        ctx.fillRect(leftX + 42, by, colW - 84, 16);
        ctx.fillStyle = palette.muted;
        ctx.fillRect(leftX + 42, by, (colW - 84) * ratio * leftP, 16);
      });
    }
    if (items[0]) {
      ctx.fillStyle = palette.muted;
      ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(items[0]).slice(0, 26), leftX + colW / 2, ly + colH - 28);
    }
    ctx.restore();

    // Right Card
    ctx.save();
    ctx.globalAlpha = Math.max(0.15, rightP);
    const ry = topY + (1 - rightP) * 28 - closeSettle * 10;
    this.drawCard(ctx, palette, rightX, ry, colW, colH, {
      radius: 22,
      border: palette.accent,
      borderWidth: 3
    });
    if (hasRightIcon) {
      ctx.drawImage(this.assets.rightIcon, rightX + colW / 2 - 64, ry + 48, 128, 128);
    }
    ctx.fillStyle = palette.ink;
    this.drawFittedCardTitle(ctx, rightLabel, rightX + colW / 2, ry + (hasRightIcon ? 236 : 112), colW - 44, 34, 24);

    const rightBodyY = ry + (hasRightIcon ? 318 : 210);
    if (rightLogos.length) {
      const rxStart = rightX + (colW - (rightLogos.length * 124)) / 2;
      rightLogos.forEach((l, idx) => {
        const bx = rxStart + idx * 124 + 8;
        const by = rightBodyY;
        this.drawCard(ctx, palette, bx, by, 108, 114, { radius: 14, bg: palette.bgDeep, border: palette.accent, borderWidth: 1.5 });
        if (l.img) ctx.drawImage(l.img, bx + 26, by + 16, 56, 56);
        ctx.fillStyle = palette.ink;
        ctx.font = '700 14px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(String(l.name || l.slug || '').slice(0, 10), bx + 54, by + 94);
      });
    } else {
      [0.95, 0.90, 0.88].forEach((ratio, idx) => {
        const by = rightBodyY + idx * (hasRightIcon ? 50 : 62);
        ctx.fillStyle = palette.hair;
        ctx.fillRect(rightX + 42, by, colW - 84, 16);
        ctx.fillStyle = palette.accent;
        ctx.fillRect(rightX + 42, by, (colW - 84) * ratio * rightP * (0.85 + 0.15 * closeSettle), 16);
      });
    }
    if (items[1]) {
      ctx.fillStyle = palette.ink;
      ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(items[1]).slice(0, 26), rightX + colW / 2, ry + colH - 28);
    }
    ctx.restore();
  },

  drawFlow(ctx, palette, props, t, duration) {
    const MC = window.MotionCore;
    const nodes = [
      { label: String(props.leftLabel || 'ORIGEN').toUpperCase(), icon: this.assets && this.assets.leftIcon, x: 96, y: 780 },
      { label: String(props.items && props.items[0] ? props.items[0] : 'PROCESO').toUpperCase(), icon: this.assets && this.assets.mainIcon, x: 96, y: 980 },
      { label: String(props.rightLabel || 'DESTINO').toUpperCase(), icon: this.assets && this.assets.rightIcon, x: 96, y: 1180 }
    ];
    const hasAnyIcon = nodes.some((n) => !!n.icon);
    const spineX = hasAnyIcon ? 210 : 156;
    const cardW = 888;
    const cardH = 148;

    // Vertical spine connecting the 3 concrete stages
    const spineP = MC ? MC.progress(t, duration * 0.12, duration * 0.56, 'outCubic') : this.clamp01(t / duration);
    ctx.save();
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(spineX, 854);
    ctx.lineTo(spineX, 854 + 400 * spineP);
    ctx.stroke();
    ctx.restore();

    nodes.forEach((node, idx) => {
      const start = duration * (0.06 + idx * 0.18);
      const p = MC ? MC.progress(t, start, duration * 0.30, 'outCubic') : this.clamp01((t - start) / (duration * 0.30));
      const active = this.smooth(start + 0.1, duration * 0.92, t);
      ctx.save();
      ctx.globalAlpha = Math.max(0.12, p);
      this.drawCard(ctx, palette, node.x, node.y + (1 - p) * 20, cardW, cardH, {
        radius: 20,
        border: idx === nodes.length - 1 ? palette.accent : palette.hair,
        borderWidth: idx === nodes.length - 1 ? 3 : 2
      });
      if (node.icon) {
        ctx.drawImage(node.icon, node.x + 28, node.y + 30 + (1 - p) * 20, 88, 88);
      } else {
        ctx.fillStyle = idx === nodes.length - 1 ? palette.accent : palette.muted;
        ctx.beginPath();
        ctx.arc(spineX, node.y + cardH / 2 + (1 - p) * 20, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = palette.ink;
      ctx.font = '700 38px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(node.label.slice(0, hasAnyIcon ? 26 : 30), hasAnyIcon ? node.x + 146 : node.x + 104, node.y + 86 + (1 - p) * 20);

      // Animated status indicator on right
      ctx.fillStyle = idx === nodes.length - 1 ? palette.accent : palette.muted;
      ctx.beginPath();
      ctx.arc(node.x + cardW - 48, node.y + cardH / 2 + (1 - p) * 20, 10 + 4 * active, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Traveling signal dot along spine in closing beat
    const pulseP = this.smooth(0.30, 0.95, t / Math.max(0.001, duration));
    if (pulseP > 0) {
      const py = this.lerp(854, 1254, pulseP);
      ctx.save();
      ctx.fillStyle = palette.accent;
      ctx.beginPath();
      ctx.arc(spineX, py, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  },

  drawCause(ctx, palette, props, t, duration) {
    const MC = window.MotionCore;
    const isDown = props.trend !== 'up';
    const cardX = 96;
    const cardY = 740;
    const cardW = 888;
    const cardH = 390;

    const enterP = MC ? MC.progress(t, 0.04, duration * 0.24, 'outCubic') : this.clamp01(t / (duration * 0.24));
    const drawP = MC ? MC.progress(t, duration * 0.12, duration * 0.72, 'outCubic') : this.clamp01((t - duration * 0.12) / (duration * 0.72));
    const effectP = MC ? MC.progress(t, duration * 0.16, duration * 0.28, 'outCubic') : this.clamp01((t - duration * 0.16) / (duration * 0.28));
    const settleP = this.smooth(0.55, 0.94, t / Math.max(0.001, duration));

    // Chart / visual panel
    ctx.save();
    ctx.globalAlpha = enterP;
    this.drawCard(ctx, palette, cardX, cardY, cardW, cardH, { radius: 22, border: palette.accent, borderWidth: 2.5 });

    // Grid lines inside chart
    ctx.strokeStyle = palette.hair;
    ctx.lineWidth = 1.5;
    for (let g = 1; g <= 3; g++) {
      const gy = cardY + g * 90;
      ctx.beginPath();
      ctx.moveTo(cardX + 36, gy);
      ctx.lineTo(cardX + cardW - 36, gy);
      ctx.stroke();
    }

    // Icon in top-right of chart
    if (this.assets && this.assets.mainIcon) {
      ctx.drawImage(this.assets.mainIcon, cardX + cardW - 130, cardY + 26, 96, 96);
    }

    // Animated trend polyline
    const pts = isDown
      ? [
          { x: cardX + 60, y: cardY + 140 },
          { x: cardX + 260, y: cardY + 158 },
          { x: cardX + 460, y: cardY + 215 },
          { x: cardX + 650, y: cardY + 295 },
          { x: cardX + 820, y: cardY + 340 }
        ]
      : [
          { x: cardX + 60, y: cardY + 335 },
          { x: cardX + 260, y: cardY + 300 },
          { x: cardX + 460, y: cardY + 235 },
          { x: cardX + 650, y: cardY + 175 },
          { x: cardX + 820, y: cardY + 125 }
        ];

    if (MC && drawP > 0) {
      MC.strokePath(ctx, pts, drawP, palette.accent, 11);
      const head = MC.pointOnPath(pts, drawP);
      ctx.fillStyle = palette.accent;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 15 + 5 * settleP, 0, Math.PI * 2);
      ctx.fill();
      if (settleP > 0.05) {
        ctx.save();
        ctx.globalAlpha = 0.35 * (1 - settleP * 0.5);
        ctx.strokeStyle = palette.accent;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 20 + 26 * settleP, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }
    ctx.restore();

    // Lower 2 concise comparison cards (no decorative labels)
    const rowY = 1170;
    const subW = 424;
    const subH = 140;
    const hasLeftIcon = !!(this.assets && this.assets.leftIcon);
    const hasRightIcon = !!(this.assets && this.assets.rightIcon);
    ctx.save();
    ctx.globalAlpha = Math.max(0.15, drawP);
    this.drawCard(ctx, palette, 96, rowY, subW, subH, { radius: 18 });
    if (hasLeftIcon) ctx.drawImage(this.assets.leftIcon, 120, rowY + 34, 72, 72);
    ctx.textAlign = hasLeftIcon ? 'left' : 'center';
    ctx.fillStyle = palette.ink;
    ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(String(props.leftLabel || 'SAAS NUEVO ↓').toUpperCase().slice(0, hasLeftIcon ? 18 : 22), hasLeftIcon ? 210 : (96 + subW / 2), rowY + 80);
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = Math.max(0.1, effectP);
    const ey = rowY + (1 - effectP) * 26;
    this.drawCard(ctx, palette, 560, ey, subW, subH, { radius: 18, border: palette.accent, borderWidth: 3 });
    if (hasRightIcon) ctx.drawImage(this.assets.rightIcon, 584, ey + 34, 72, 72);
    ctx.textAlign = hasRightIcon ? 'left' : 'center';
    ctx.fillStyle = palette.ink;
    ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(String(props.rightLabel || 'INCUMBENTES =').toUpperCase().slice(0, hasRightIcon ? 18 : 22), hasRightIcon ? 674 : (560 + subW / 2), ey + 80);
    ctx.fillStyle = palette.accent;
    ctx.fillRect(584, ey + subH - 12, (subW - 48) * settleP, 5);
    ctx.restore();
  },

  drawDetail(ctx, palette, props, t, duration) {
    const MC = window.MotionCore;
    const labelFallback = [props.leftLabel, props.rightLabel].filter(Boolean);
    const items = Array.isArray(props.items) && props.items.length
      ? props.items.slice(0, 3)
      : (labelFallback.length ? labelFallback : ['INTERFAZ', 'FLUJO ACTIVO', 'DATOS']);
    const p = MC ? MC.progress(t, 0.06, duration * 0.48, 'outCubic') : this.clamp01(t / (duration * 0.48));
    const settle = this.smooth(0.60, 0.95, t / Math.max(0.001, duration));

    const containerX = 96;
    const containerY = 776;
    const containerW = 888;
    const containerH = 564;
    const hasVisual = !!(this.assets && (this.assets.resolvedImage || this.assets.mainIcon));

    ctx.save();
    ctx.globalAlpha = Math.max(0.15, p);
    this.drawCard(ctx, palette, containerX, containerY, containerW, containerH, { radius: 24 });

    if (this.assets && this.assets.resolvedImage) {
      this.drawImageCover(ctx, this.assets.resolvedImage, containerX + 32, containerY + 32, 320, 220, 16);
    } else if (this.assets && this.assets.mainIcon) {
      this.drawCard(ctx, palette, containerX + 32, containerY + 32, 220, 220, { radius: 18, bg: palette.bgDeep });
      ctx.drawImage(this.assets.mainIcon, containerX + 78, containerY + 78, 128, 128);
    }

    if (props.label) {
      const detailX = this.assets && this.assets.resolvedImage
        ? containerX + 382
        : (hasVisual ? containerX + 286 : containerX + 36);
      ctx.fillStyle = palette.ink;
      ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(
        String(props.label).toUpperCase().slice(0, hasVisual ? 22 : 34),
        detailX,
        hasVisual ? (containerY + 148) : (containerY + 84)
      );
    }

    // Architectural layer cards
    const layersTop = hasVisual ? (containerY + 284) : (props.label ? containerY + 132 : containerY + 64);
    const layerStep = hasVisual ? 92 : 128;
    const layerH = hasVisual ? 74 : 98;
    items.forEach((layer, idx) => {
      const lp = MC ? MC.progress(t, 0.14 + idx * 0.12, duration * 0.30, 'outCubic') : p;
      const ly = layersTop + idx * layerStep;
      const active = idx === items.length - 1 ? settle : 0;
      ctx.save();
      ctx.globalAlpha = lp;
      this.drawCard(ctx, palette, containerX + 32, ly, containerW - 64, layerH, {
        radius: 14,
        bg: palette.bgDeep,
        border: active > 0.2 ? palette.accent : palette.hair,
        borderWidth: active > 0.2 ? 2.5 : 1.5
      });
      ctx.fillStyle = palette.accent;
      ctx.fillRect(containerX + 52, ly + (layerH - 34) / 2, 10, 34);
      ctx.fillStyle = palette.ink;
      ctx.font = '600 26px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(String(layer).toUpperCase().slice(0, 36), containerX + 80, ly + layerH / 2 + 9);
      ctx.restore();
    });

    ctx.restore();
  },

  render(container, t, duration, props) {
    const ctx = this.ctx;
    const safeProps = props || {};
    const palette = this.palette(safeProps);
    const variant = ['transform', 'comparison', 'flow', 'cause', 'detail'].includes(safeProps.variant)
      ? safeProps.variant
      : 'transform';

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, 1080, 1920);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, 1080, 1920);
    ctx.clip();

    this.drawBackground(ctx, palette);
    this.drawHeader(ctx, palette, safeProps, t);
    this.drawFigure(ctx, palette, safeProps, t);

    if (variant === 'transform') this.drawTransform(ctx, palette, safeProps, t, duration);
    else if (variant === 'comparison') this.drawComparison(ctx, palette, safeProps, t, duration);
    else if (variant === 'flow') this.drawFlow(ctx, palette, safeProps, t, duration);
    else if (variant === 'cause') this.drawCause(ctx, palette, safeProps, t, duration);
    else this.drawDetail(ctx, palette, safeProps, t, duration);

    const settle = window.MotionCore ? window.MotionCore.progress(t, 0, Math.min(1.2, duration * 0.35), 'outCubic') : this.clamp01(t / 1);
    ctx.save();
    ctx.globalAlpha = 0.018 * settle;
    ctx.fillStyle = palette.ink;
    ctx.fillRect(0, 0, 1080, 1920);
    ctx.restore();

    ctx.restore();
  }
});
