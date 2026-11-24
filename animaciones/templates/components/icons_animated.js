// SeDev Animated Icon Layer
// Reuses the static SVG catalog in icons_sedev.js and animates each shape
// deterministically from t: draw-on stroke reveal, staggered assembly,
// controlled breathing, or a short rotational settle. No CSS animation,
// no random values, no timers — every frame is a pure function of t.

(function () {
  const MC = window.MotionCore;
  const MODES = ['draw', 'assemble', 'draw', 'pulse', 'orbit'];

  function nameHash(name) {
    let h = 2166136261;
    const s = String(name || '');
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function clearDash(el) {
    el.style.removeProperty('stroke-dasharray');
    el.style.removeProperty('stroke-dashoffset');
    el.style.removeProperty('fill-opacity');
    el.style.removeProperty('opacity');
    el.style.removeProperty('transform');
  }

  function create(container, options) {
    const o = Object.assign({
      name: 'lightning',
      size: 104,
      color: '#fbbf24',
      mode: 'auto',
      start: 0.02,
      dur: 0.48,
      exitDur: 0.24,
      left: 0,
      top: 0,
      rotate: 0,
      shadow: false
    }, options || {});

    const resolvedMode = o.mode === 'auto' ? MODES[nameHash(o.name) % MODES.length] : o.mode;
    const wrap = document.createElement('div');
    wrap.className = 'sedev-icon-anim';
    wrap.style.cssText = [
      'position:absolute',
      `left:${o.left}px`,
      `top:${o.top}px`,
      `width:${o.size}px`,
      `height:${o.size}px`,
      'pointer-events:none',
      'transform-origin:50% 50%',
      o.shadow ? 'filter:drop-shadow(0 5px 0 rgba(9,9,11,0.9))' : '',
      'z-index:3'
    ].filter(Boolean).join(';');

    wrap.innerHTML = window.getSeDevIcon(o.name, o.size, o.color, 'raw');
    container.appendChild(wrap);

    const svg = wrap.querySelector('svg');
    if (!svg) {
      return { el: wrap, mode: resolvedMode, update() {}, destroy() { wrap.remove(); } };
    }
    svg.style.overflow = 'visible';

    const shapes = Array.from(svg.querySelectorAll('path,rect,circle,ellipse,line,polyline,polygon'));
    const labels = Array.from(svg.querySelectorAll('text'));
    const parts = shapes.map((el, i) => {
      let len = 0;
      try {
        if (typeof el.getTotalLength === 'function') len = el.getTotalLength();
      } catch (e) { len = 0; }
      return {
        el,
        i,
        len: Math.max(1, len),
        fill: el.getAttribute('fill'),
        stroke: el.getAttribute('stroke'),
        isLine: /line|polyline/i.test(el.tagName),
        dash: el.getAttribute('stroke-dasharray'),
        dashOffset: el.getAttribute('stroke-dashoffset')
      };
    });
    const total = Math.max(1, parts.length);

    function restore(part) {
      const el = part.el;
      el.style.removeProperty('stroke-dasharray');
      el.style.removeProperty('stroke-dashoffset');
      el.style.removeProperty('fill-opacity');
      el.style.removeProperty('opacity');
      el.style.removeProperty('transform');
      if (part.dash) el.style.setProperty('stroke-dasharray', part.dash);
      if (part.dashOffset) el.style.setProperty('stroke-dashoffset', part.dashOffset);
    }

    function update(t, ctx) {
      const opts = ctx || {};
      const exitAt = opts.exitAt === undefined ? Infinity : opts.exitAt;
      const p = MC.progress(t, o.start, o.dur, 'outQuint');
      const ex = exitAt === Infinity ? 0 : MC.progress(t, exitAt, o.exitDur, 'outCubic');

      wrap.style.opacity = String(MC.clamp01(p) * (1 - ex));
      const scale = (0.9 + 0.1 * p) * (1 - ex * 0.06);

      let rotate = o.rotate;
      if (resolvedMode === 'orbit') rotate += (1 - p) * -14;
      if (resolvedMode === 'pulse') {
        const breath = Math.sin((t - o.start) * Math.PI * 2 * 1.15) * 0.018 * p;
        wrap.style.transform = `translateY(${(1 - p) * 10 - ex * 10}px) scale(${scale * (1 + breath)}) rotate(${rotate}deg)`;
      } else {
        wrap.style.transform = `translateY(${(1 - p) * 10 - ex * 10}px) scale(${scale}) rotate(${rotate}deg)`;
      }

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const el = part.el;
        const pp = MC.clamp01((p - (i / total) * 0.42) / 0.58);

        if (p >= 0.999) {
          restore(part);
          continue;
        }

        if (resolvedMode === 'draw') {
          const hasStroke = part.stroke && part.stroke !== 'none';
          const hasFill = part.fill && part.fill !== 'none';
          el.style.opacity = '1';
          if (hasStroke && part.len > 0) {
            el.style.setProperty('stroke-dasharray', `${part.len} ${part.len}`);
            el.style.setProperty('stroke-dashoffset', String(part.len * (1 - pp)));
          } else if (!part.isLine) {
            el.style.setProperty('opacity', String(MC.clamp01(pp * 1.4)));
          }
          if (hasFill) {
            el.style.setProperty('fill-opacity', String(MC.clamp01((pp - 0.45) / 0.55)));
          }
        } else if (resolvedMode === 'assemble') {
          const local = MC.clamp01((p - (i / total) * 0.55) / 0.45);
          el.style.opacity = String(local);
          if (!part.isLine) {
            const s = 0.55 + 0.45 * local;
            el.style.transformBox = 'fill-box';
            el.style.transformOrigin = 'center';
            el.style.transform = `scale(${s})`;
          } else {
            el.style.transform = `translateY(${(1 - local) * 6}px)`;
          }
        } else {
          // pulse / orbit: uniform fade-in with a tiny per-part settle.
          el.style.opacity = String(pp);
          if (!part.isLine && pp < 1) {
            el.style.transformBox = 'fill-box';
            el.style.transformOrigin = 'center';
            el.style.transform = `scale(${0.92 + 0.08 * pp})`;
          }
        }
      }

      for (let j = 0; j < labels.length; j++) {
        const el = labels[j];
        if (p >= 0.999) {
          clearDash(el);
          continue;
        }
        const lp = MC.clamp01((p - 0.25) / 0.75);
        el.style.opacity = String(lp);
        el.style.transform = `translateY(${(1 - lp) * 4}px)`;
        el.style.transformBox = 'fill-box';
        el.style.transformOrigin = 'center';
      }
    }

    return {
      el: wrap,
      mode: resolvedMode,
      update,
      destroy() {
        if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      }
    };
  }

  window.SedevIconAnim = {
    create,
    modes: MODES.slice(),
    resolveMode(name, mode) {
      return mode && mode !== 'auto' ? mode : MODES[nameHash(name) % MODES.length];
    }
  };
})();
