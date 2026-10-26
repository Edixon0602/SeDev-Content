// Component: kinetic_hook
// Dynamic kinetic typography supporting 3 distinct styles:
// 1. 'impact': Massive staggered typography (no icons, zero clutter)
// 2. 'stat': Giant quantitative shock counter ($14,800, 50,000 req/s, 0ms)
// 3. 'editorial': Sharp, high-contrast headline statement (optional clean icon)

window.registerComponent('kinetic_hook', {
  init(container, props) {
    const layout = props.layout || (props.stat ? 'stat' : (props.icon ? 'editorial' : 'impact'));

    if (layout === 'stat') {
      container.innerHTML = `
        <div class="comp-kinetic-hook layout-stat">
          ${props.badge ? `<div class="scene-category" id="khBadge">${props.badge}</div>` : ''}
          <div class="kh-stat-val" id="khStat" style="color: ${props.statColor || '#fbbf24'}; font-size: 110px; font-weight: 900; letter-spacing: -3px; font-family: 'JetBrains Mono', monospace; line-height: 1;">
            ${props.stat}
          </div>
          <div class="kh-stat-label" id="khStatLabel" style="font-size: 38px; font-weight: 800; color: #ffffff; text-transform: uppercase; margin-top: 24px; letter-spacing: -1px; max-width: 850px;">
            ${props.statLabel || ''}
          </div>
          ${props.subtitle ? `<div class="kh-subtitle" id="khSub" style="margin-top: 20px; font-size: 19px; color: #71717a; font-family: 'JetBrains Mono', monospace;">${props.subtitle}</div>` : ''}
        </div>
      `;
      return;
    }

    if (layout === 'impact') {
      container.innerHTML = `
        <div class="comp-kinetic-hook layout-impact">
          ${props.badge ? `<div class="scene-category" id="khBadge">${props.badge}</div>` : ''}
          <div class="kh-lines" id="khLines" style="display:flex; flex-direction:column; gap: 14px;">
            ${(props.lines || []).map((line, i) => `
              <div class="kh-line" id="khLine_${i}" style="font-size: 96px; font-weight: 900; letter-spacing: -3px; line-height: 1.02; text-transform: uppercase; color: ${line.color || '#ffffff'};">
                ${line.text}
              </div>
            `).join('')}
          </div>
          ${props.subtitle ? `<div class="kh-subtitle" id="khSub" style="margin-top: 30px; font-size: 20px; color: #71717a; font-family: 'JetBrains Mono', monospace;">${props.subtitle}</div>` : ''}
        </div>
      `;
      return;
    }

    // Default 'editorial' with optional icon
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
          ${(props.lines || []).map((line, i) => `
            <div class="kh-line" id="khLine_${i}" style="font-size: 80px; font-weight: 900; letter-spacing: -2px; line-height: 1.05; text-transform: uppercase; color: ${line.color || '#ffffff'};">
              ${line.text}
            </div>
          `).join('')}
        </div>
        ${props.subtitle ? `<div class="kh-subtitle" id="khSub" style="margin-top: 22px; font-size: 19px; color: #a1a1aa; font-family: 'JetBrains Mono', monospace;">${props.subtitle}</div>` : ''}
      </div>
    `;
  },

  getIconSVG(type) {
    if (typeof window.getSeDevIcon === 'function') {
      return window.getSeDevIcon(type, 90);
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

    // Badge
    const badgeEl = container.querySelector('#khBadge');
    if (badgeEl) {
      const dt = t - 0.05;
      if (dt < 0) {
        badgeEl.style.opacity = '0';
        badgeEl.style.transform = 'translateY(-20px)';
      } else {
        const s = spring(dt, 26, 0.65);
        badgeEl.style.opacity = (clamp(dt / 0.06, 0, 1) * exitAlpha).toFixed(3);
        badgeEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
      }
    }

    // Stat Value & Label
    const statEl = container.querySelector('#khStat');
    const statLabelEl = container.querySelector('#khStatLabel');
    if (statEl) {
      const dt = t - 0.12;
      if (dt < 0) {
        statEl.style.opacity = '0';
        statEl.style.transform = 'scale(0.8) translateY(30px)';
      } else {
        const s = spring(dt, 24, 0.6);
        const op = clamp(dt / 0.08, 0, 1) * exitAlpha;
        const scale = 0.8 + 0.2 * s;
        statEl.style.opacity = op.toFixed(3);
        statEl.style.transform = `scale(${scale.toFixed(3)}) translateY(${((1 - s) * 30 + exitY).toFixed(1)}px)`;
      }
    }
    if (statLabelEl) {
      const dt = t - 0.25;
      if (dt < 0) {
        statLabelEl.style.opacity = '0';
        statLabelEl.style.transform = 'translateY(20px)';
      } else {
        const s = spring(dt, 22, 0.65);
        statLabelEl.style.opacity = (clamp(dt / 0.08, 0, 1) * exitAlpha).toFixed(3);
        statLabelEl.style.transform = `translateY(${((1 - s) * 20 + exitY).toFixed(1)}px)`;
      }
    }

    // Icon (only if present)
    const iconEl = container.querySelector('#khIcon');
    if (iconEl) {
      const dt = t - 0.14;
      if (dt < 0) {
        iconEl.style.opacity = '0';
        iconEl.style.transform = 'scale(0.6)';
      } else {
        const s = spring(dt, 25, 0.65);
        const op = clamp(dt / 0.08, 0, 1) * exitAlpha;
        const scale = 0.6 + 0.4 * s;
        iconEl.style.opacity = op.toFixed(3);
        iconEl.style.transform = `scale(${scale.toFixed(3)}) translateY(${exitY.toFixed(1)}px)`;
      }
    }

    // Lines (staggered spring entrance)
    (props.lines || []).forEach((_, i) => {
      const lineEl = container.querySelector(`#khLine_${i}`);
      if (!lineEl) return;
      const startTime = 0.15 + i * 0.18;
      const dt = t - startTime;
      if (dt < 0) {
        lineEl.style.opacity = '0';
        lineEl.style.transform = 'translateY(40px) scale(0.9)';
      } else {
        const s = spring(dt, 25, 0.62);
        const op = clamp(dt / 0.08, 0, 1) * exitAlpha;
        const ty = (1 - s) * 40 + exitY;
        const scale = 0.9 + 0.1 * s;
        lineEl.style.opacity = op.toFixed(3);
        lineEl.style.transform = `translateY(${ty.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      }
    });

    // Subtitle
    const subEl = container.querySelector('#khSub');
    if (subEl) {
      const dt = t - 0.45;
      if (dt < 0) {
        subEl.style.opacity = '0';
      } else {
        const s = spring(dt, 22, 0.7);
        subEl.style.opacity = (clamp(dt / 0.1, 0, 1) * exitAlpha).toFixed(3);
        subEl.style.transform = `translateY(${((1 - s) * 15 + exitY).toFixed(1)}px)`;
      }
    }
  }
});
