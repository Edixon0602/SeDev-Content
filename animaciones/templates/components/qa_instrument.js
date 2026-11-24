// QA-only canvas instrumentation. Loaded by scene_runner.html but inactive
// unless window.__QA_INSTRUMENT__ was set before page scripts execute.
//
// Conservative but real measurements:
// - text, rects, images and paths (moveTo/lineTo/rect/arc/curves + fill/stroke)
// - respects globalAlpha=0 and transparent fill/stroke styles
// - respects the current clip region (tracked from rect/path + clip()/save()/restore())
// - applies the current canvas transform
// Limitations: Path2D arguments to fill(path)/stroke(path) have no accessible
// bounds, so they are skipped; partial arc angles use the full circle bbox
// (conservative). This is documented in README.

(function () {
  if (!window.__QA_INSTRUMENT__ || typeof CanvasRenderingContext2D === 'undefined') return;

  const proto = CanvasRenderingContext2D.prototype;
  const originals = {
    fillText: proto.fillText,
    strokeText: proto.strokeText,
    fillRect: proto.fillRect,
    strokeRect: proto.strokeRect,
    drawImage: proto.drawImage,
    fill: proto.fill,
    stroke: proto.stroke,
    clip: proto.clip,
    save: proto.save,
    restore: proto.restore,
    beginPath: proto.beginPath,
    moveTo: proto.moveTo,
    lineTo: proto.lineTo,
    rect: proto.rect,
    arc: proto.arc,
    ellipse: proto.ellipse,
    quadraticCurveTo: proto.quadraticCurveTo,
    bezierCurveTo: proto.bezierCurveTo
  };

  window.__QA_SET_COMPONENT__ = function (name) {
    window.__QA_COMPONENT__ = String(name || 'unknown');
  };
  window.__QA_RESET__ = function () {
    window.__QA_BOUNDS__ = [];
  };

  function styleAlpha(style) {
    if (typeof style !== 'string') return 1; // gradients/patterns
    const s = style.trim().toLowerCase();
    if (s === 'transparent') return 0;
    const rgba = /^rgba?\(([^)]+)\)$/.exec(s);
    if (rgba) {
      const parts = rgba[1].split(',').map((v) => v.trim());
      return parts.length >= 4 ? Number(parts[3]) : 1;
    }
    const hsla = /^hsla?\(([^)]+)\)$/.exec(s);
    if (hsla) {
      const parts = hsla[1].split(',').map((v) => v.trim());
      return parts.length >= 4 ? Number(parts[3]) : 1;
    }
    const hex8 = /^#[0-9a-f]{8}$/.exec(s);
    if (hex8) return parseInt(s.slice(7, 9), 16) / 255;
    const hex4 = /^#[0-9a-f]{4}$/.exec(s);
    if (hex4) return parseInt(s.slice(4, 5) + s.slice(4, 5), 16) / 255;
    return 1;
  }

  function visible(ctx, style) {
    return Number.isFinite(Number(ctx.globalAlpha)) && Number(ctx.globalAlpha) > 0.01 && styleAlpha(style) > 0.01;
  }

  function pathBounds(ctx) {
    return ctx.__qaPath || null;
  }

  function resetPath(ctx) {
    ctx.__qaPath = null;
  }

  function addPoint(ctx, x, y) {
    if (![x, y].every(Number.isFinite)) return;
    if (!ctx.__qaPath) ctx.__qaPath = { minX: x, minY: y, maxX: x, maxY: y };
    else {
      ctx.__qaPath.minX = Math.min(ctx.__qaPath.minX, x);
      ctx.__qaPath.minY = Math.min(ctx.__qaPath.minY, y);
      ctx.__qaPath.maxX = Math.max(ctx.__qaPath.maxX, x);
      ctx.__qaPath.maxY = Math.max(ctx.__qaPath.maxY, y);
    }
  }

  function transformBounds(ctx, b) {
    let m = null;
    try { m = ctx.getTransform(); } catch (err) { m = null; }
    if (!m) return b;
    const pts = [
      { x: b.minX, y: b.minY },
      { x: b.maxX, y: b.minY },
      { x: b.minX, y: b.maxY },
      { x: b.maxX, y: b.maxY }
    ].map((p) => ({ x: m.a * p.x + m.c * p.y + m.e, y: m.b * p.x + m.d * p.y + m.f }));
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    return {
      minX: Math.min.apply(null, xs),
      minY: Math.min.apply(null, ys),
      maxX: Math.max.apply(null, xs),
      maxY: Math.max.apply(null, ys)
    };
  }

  function intersect(a, b) {
    if (!b) return a;
    const out = {
      minX: Math.max(a.minX, b.minX),
      minY: Math.max(a.minY, b.minY),
      maxX: Math.min(a.maxX, b.maxX),
      maxY: Math.min(a.maxY, b.maxY)
    };
    return out.maxX >= out.minX && out.maxY >= out.minY ? out : null;
  }

  function record(ctx, kind, b, meta) {
    if (!b || !window.__QA_BOUNDS__) {
      if (!window.__QA_BOUNDS__) window.__QA_BOUNDS__ = [];
      if (!b) return;
    }
    if (![b.minX, b.minY, b.maxX, b.maxY].every(Number.isFinite)) return;
    if (ctx.canvas && ctx.canvas.id === 'stageBgCanvas') return;

    let canvasBounds = transformBounds(ctx, b);
    canvasBounds = intersect(canvasBounds, ctx.__qaClip || null);
    if (!canvasBounds) return;

    window.__QA_BOUNDS__.push(Object.assign({
      kind,
      component: window.__QA_COMPONENT__ || 'unknown',
      x: Math.round(canvasBounds.minX * 100) / 100,
      y: Math.round(canvasBounds.minY * 100) / 100,
      w: Math.round((canvasBounds.maxX - canvasBounds.minX) * 100) / 100,
      h: Math.round((canvasBounds.maxY - canvasBounds.minY) * 100) / 100,
      canvasW: ctx.canvas ? ctx.canvas.width : 0,
      canvasH: ctx.canvas ? ctx.canvas.height : 0
    }, meta || {}));
  }

  function fontSize(ctx) {
    const m = /(\d+(?:\.\d+)?)px/.exec(ctx.font || '');
    return m ? parseFloat(m[1]) : 16;
  }

  // --- clip and path state ------------------------------------------------
  proto.save = function () {
    if (!this.__qaClipStack) this.__qaClipStack = [];
    this.__qaClipStack.push(this.__qaClip || null);
    return originals.save.apply(this, arguments);
  };

  proto.restore = function () {
    const stack = this.__qaClipStack || [];
    this.__qaClip = stack.length ? stack.pop() : null;
    return originals.restore.apply(this, arguments);
  };

  proto.beginPath = function () {
    resetPath(this);
    return originals.beginPath.apply(this, arguments);
  };

  proto.moveTo = function (x, y) {
    addPoint(this, x, y);
    return originals.moveTo.apply(this, arguments);
  };

  proto.lineTo = function (x, y) {
    addPoint(this, x, y);
    return originals.lineTo.apply(this, arguments);
  };

  proto.rect = function (x, y, w, h) {
    if ([x, y, w, h].every(Number.isFinite)) {
      addPoint(this, x, y);
      addPoint(this, x + w, y);
      addPoint(this, x, y + h);
      addPoint(this, x + w, y + h);
    }
    return originals.rect.apply(this, arguments);
  };

  proto.arc = function (cx, cy, r) {
    if ([cx, cy, r].every(Number.isFinite)) {
      addPoint(this, cx - r, cy - r);
      addPoint(this, cx + r, cy + r);
    }
    return originals.arc.apply(this, arguments);
  };

  proto.ellipse = function (cx, cy, rx, ry) {
    if ([cx, cy, rx, ry].every(Number.isFinite)) {
      addPoint(this, cx - rx, cy - ry);
      addPoint(this, cx + rx, cy + ry);
    }
    return originals.ellipse.apply(this, arguments);
  };

  proto.quadraticCurveTo = function (cpx, cpy, x, y) {
    addPoint(this, cpx, cpy);
    addPoint(this, x, y);
    return originals.quadraticCurveTo.apply(this, arguments);
  };

  proto.bezierCurveTo = function (c1x, c1y, c2x, c2y, x, y) {
    addPoint(this, c1x, c1y);
    addPoint(this, c2x, c2y);
    addPoint(this, x, y);
    return originals.bezierCurveTo.apply(this, arguments);
  };

  proto.clip = function () {
    if (arguments[0] && typeof Path2D !== 'undefined' && arguments[0] instanceof Path2D) {
      return originals.clip.apply(this, arguments);
    }
    const pb = pathBounds(this);
    if (pb) {
      let cb = transformBounds(this, pb);
      this.__qaClip = intersect(cb, this.__qaClip || null);
      if (!this.__qaClip) this.__qaClip = { minX: 0, minY: 0, maxX: -1, maxY: -1 };
    }
    return originals.clip.apply(this, arguments);
  };

  // --- draw recording -----------------------------------------------------
  proto.fillText = function (text, x, y, maxWidth) {
    if (!visible(this, this.fillStyle)) return originals.fillText.apply(this, arguments);
    const fs = fontSize(this);
    let w = this.measureText(String(text)).width;
    if (maxWidth !== undefined && Number.isFinite(Number(maxWidth))) w = Math.min(w, Number(maxWidth));
    let x0 = x;
    if (this.textAlign === 'center') x0 = x - w / 2;
    else if (this.textAlign === 'right' || this.textAlign === 'end') x0 = x - w;
    record(this, 'text', { minX: x0, minY: y - fs * 0.8, maxX: x0 + w, maxY: y + fs * 0.28 }, {
      text: String(text).slice(0, 72), font: this.font
    });
    return originals.fillText.apply(this, arguments);
  };

  proto.strokeText = function (text, x, y, maxWidth) {
    if (!visible(this, this.strokeStyle)) return originals.strokeText.apply(this, arguments);
    const fs = fontSize(this);
    let w = this.measureText(String(text)).width;
    if (maxWidth !== undefined && Number.isFinite(Number(maxWidth))) w = Math.min(w, Number(maxWidth));
    let x0 = x;
    if (this.textAlign === 'center') x0 = x - w / 2;
    else if (this.textAlign === 'right' || this.textAlign === 'end') x0 = x - w;
    record(this, 'strokeText', { minX: x0, minY: y - fs * 0.8, maxX: x0 + w, maxY: y + fs * 0.28 }, {
      text: String(text).slice(0, 72), font: this.font
    });
    return originals.strokeText.apply(this, arguments);
  };

  proto.fillRect = function (x, y, w, h) {
    if (visible(this, this.fillStyle) && [x, y, w, h].every(Number.isFinite)) {
      record(this, 'fillRect', {
        minX: Math.min(x, x + w), minY: Math.min(y, y + h),
        maxX: Math.max(x, x + w), maxY: Math.max(y, y + h)
      });
    }
    return originals.fillRect.apply(this, arguments);
  };

  proto.strokeRect = function (x, y, w, h) {
    if (visible(this, this.strokeStyle) && [x, y, w, h].every(Number.isFinite)) {
      const pad = (Number(this.lineWidth) || 1) / 2;
      record(this, 'strokeRect', {
        minX: Math.min(x, x + w) - pad, minY: Math.min(y, y + h) - pad,
        maxX: Math.max(x, x + w) + pad, maxY: Math.max(y, y + h) + pad
      });
    }
    return originals.strokeRect.apply(this, arguments);
  };

  proto.fill = function () {
    if (arguments[0] && typeof Path2D !== 'undefined' && arguments[0] instanceof Path2D) {
      return originals.fill.apply(this, arguments);
    }
    if (!visible(this, this.fillStyle)) return originals.fill.apply(this, arguments);
    const b = pathBounds(this);
    if (b) record(this, 'fillPath', b);
    return originals.fill.apply(this, arguments);
  };

  proto.stroke = function () {
    if (arguments[0] && typeof Path2D !== 'undefined' && arguments[0] instanceof Path2D) {
      return originals.stroke.apply(this, arguments);
    }
    if (!visible(this, this.strokeStyle)) return originals.stroke.apply(this, arguments);
    const b = pathBounds(this);
    if (b) {
      const pad = (Number(this.lineWidth) || 1) / 2;
      record(this, 'strokePath', {
        minX: b.minX - pad, minY: b.minY - pad,
        maxX: b.maxX + pad, maxY: b.maxY + pad
      });
    }
    return originals.stroke.apply(this, arguments);
  };

  proto.drawImage = function () {
    const a = arguments;
    if (a.length >= 9) {
      record(this, 'drawImage', { minX: a[5], minY: a[6], maxX: a[5] + a[7], maxY: a[6] + a[8] });
    } else if (a.length >= 5) {
      record(this, 'drawImage', { minX: a[1], minY: a[2], maxX: a[1] + a[3], maxY: a[2] + a[4] });
    } else if (a[0]) {
      record(this, 'drawImage', { minX: 0, minY: 0, maxX: a[0].width || 0, maxY: a[0].height || 0 });
    }
    return originals.drawImage.apply(this, arguments);
  };
})();
