// Component: kinetic_hook
// Dynamic kinetic typography hook with varied layouts ('impact', 'stat', 'editorial').
// Auto-sizing font based on character length to ensure zero text clipping.

window.registerComponent('kinetic_hook', {
  init(container, props) {
    const layout = props.layout || 'editorial';

    if (layout === 'stat') {
      container.innerHTML = `
        <div class="comp-kinetic-hook layout-stat">
          ${props.badge ? `<div class="scene-category" id="khBadge">${props.badge}</div>` : ''}
          <div class="kh-stat-num" id="khStatNum" style="font-size: 110px; font-weight: 900; letter-spacing: -4px; color: ${props.statColor || '#10b981'}; font-family: 'JetBrains Mono', monospace; line-height: 1;">
            ${props.statValue || '0ms'}
          </div>
          <div class="kh-stat-label" id="khStatLabel" style="font-size: 32px; font-weight: 800; color: #ffffff; text-transform: uppercase; margin-top: 14px;">
            ${props.statLabel || props.title || 'MÉTRICA REAL'}
          </div>
          ${props.subtitle ? `<div class="kh-subtitle" id="khSub" style="margin-top: 20px; font-size: 18px; color: #71717a; font-family: 'JetBrains Mono', monospace;">${props.subtitle}</div>` : ''}
        </div>
      `;
      return;
    }

    if (layout === 'impact') {
      const lines = props.lines || [];
      container.innerHTML = `
        <div class="comp-kinetic-hook layout-impact">
          ${props.badge ? `<div class="scene-category" id="khBadge">${props.badge}</div>` : ''}
          <div class="kh-lines" id="khLines" style="display:flex; flex-direction:column; gap: 14px;">
            ${lines.map((line, i) => {
              const len = (line.text || '').length;
              const fSize = len > 18 ? '72px' : (len > 14 ? '84px' : '96px');
              return `
                <div class="kh-line" id="khLine_${i}" style="font-size: ${fSize}; font-weight: 900; letter-spacing: -2px; line-height: 1.05; text-transform: uppercase; color: ${line.color || '#ffffff'}; word-break: break-word;">
                  ${line.text}
                </div>
              `;
            }).join('')}
          </div>
          ${props.subtitle ? `<div class="kh-subtitle" id="khSub" style="margin-top: 28px; font-size: 19px; color: #71717a; font-family: 'JetBrains Mono', monospace;">${props.subtitle}</div>` : ''}
        </div>
      `;
      return;
    }

    // Default 'editorial'
    const lines = props.lines || [];
    const hasIcon = Boolean(props.icon);
    container.innerHTML = `
      <div class="comp-kinetic-hook layout-editorial">
        ${props.badge ? `<div class="scene-category" id="khBadge">${props.badge}</div>` : ''}
        ${hasIcon ? `
          <div class="kh-icon-wrap" id="khIcon" style="margin-bottom: 24px;">
            ${this.getIconSVG(props.icon)}
          </div>
        ` : ''}
        <div class="kh-lines" id="khLines">
          ${lines.map((line, i) => {
            const len = (line.text || '').length;
            const fSize = len > 20 ? '62px' : (len > 15 ? '72px' : '82px');
            return `
              <div class="kh-line" id="khLine_${i}" style="font-size: ${fSize}; font-weight: 900; letter-spacing: -2px; line-height: 1.05; text-transform: uppercase; color: ${line.color || '#ffffff'}; word-break: break-word;">
                ${line.text}
              </div>
            `;
          }).join('')}
        </div>
        ${props.subtitle ? `<div class="kh-subtitle" id="khSub" style="margin-top: 22px; font-size: 19px; color: #a1a1aa; font-family: 'JetBrains Mono', monospace;">${props.subtitle}</div>` : ''}
      </div>
    `;
  },

  getIconSVG(type) {
    if (typeof window.getSeDevIcon === 'function') {
      return window.getSeDevIcon(type, 90, null, 'glow');
    }
    return '';
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp } = utils;

    // Hard-cut exit in last 0.3s
    const exitT = duration - 0.3;
    let exitY = 0;
    let exitAlpha = 1;
    if (t > exitT) {
      const p = (t - exitT) / 0.3;
      exitY = -p * p * 80;
      exitAlpha = clamp(1 - p * 1.3, 0, 1);
    }

    // Badge spring
    const badge = container.querySelector('#khBadge');
    if (badge) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      badge.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      badge.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    // Icon spring with subtle hover float
    const icon = container.querySelector('#khIcon');
    if (icon) {
      const s = spring(Math.max(0, t - 0.1), 22, 0.65);
      const floatY = Math.sin(t * 3) * 4;
      icon.style.opacity = (clamp((t - 0.05) / 0.1, 0, 1) * exitAlpha).toFixed(3);
      icon.style.transform = `scale(${s.toFixed(3)}) translateY(${(floatY + exitY).toFixed(1)}px)`;
    }

    // Stat Number spring
    const statNum = container.querySelector('#khStatNum');
    if (statNum) {
      const s = spring(Math.max(0, t - 0.12), 20, 0.6);
      statNum.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      statNum.style.transform = `scale(${s.toFixed(3)}) translateY(${exitY.toFixed(1)}px)`;
    }

    // Stat Label spring
    const statLabel = container.querySelector('#khStatLabel');
    if (statLabel) {
      const s = spring(Math.max(0, t - 0.25), 24, 0.7);
      statLabel.style.opacity = (clamp((t - 0.2) / 0.1, 0, 1) * exitAlpha).toFixed(3);
      statLabel.style.transform = `translateY(${((1 - s) * 20 + exitY).toFixed(1)}px)`;
    }

    // Lines staggered cascade
    const lines = container.querySelectorAll('.kh-line');
    lines.forEach((line, i) => {
      const startT = 0.15 + i * 0.12;
      const dt = t - startT;
      if (dt < 0) {
        line.style.opacity = '0';
        line.style.transform = 'translateY(40px)';
      } else {
        const s = spring(dt, 24, 0.65);
        line.style.opacity = (clamp(dt / 0.08, 0, 1) * exitAlpha).toFixed(3);
        line.style.transform = `translateY(${((1 - s) * 40 + exitY).toFixed(1)}px) scale(${s.toFixed(3)})`;
      }
    });

    // Subtitle spring
    const sub = container.querySelector('#khSub');
    if (sub) {
      const s = spring(Math.max(0, t - 0.45), 22, 0.7);
      sub.style.opacity = (clamp((t - 0.4) / 0.15, 0, 1) * exitAlpha).toFixed(3);
      sub.style.transform = `translateY(${((1 - s) * 20 + exitY).toFixed(1)}px)`;
    }
  }
});
