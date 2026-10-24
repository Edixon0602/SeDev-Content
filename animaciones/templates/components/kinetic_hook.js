// Component: kinetic_hook
// High-impact editorial kinetic typography with spring physics and bespoke vector icon.

window.registerComponent('kinetic_hook', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-kinetic-hook">
        ${props.badge ? `<div class="kh-badge" id="khBadge">${props.badge}</div>` : ''}
        <div class="kh-icon-wrap" id="khIcon">
          ${this.getIconSVG(props.icon || 'lightning')}
        </div>
        <div class="kh-lines" id="khLines">
          ${(props.lines || []).map((line, i) => `
            <div class="kh-line" id="khLine_${i}" style="color: ${line.color || '#ffffff'};">
              ${line.text}
            </div>
          `).join('')}
        </div>
        ${props.subtitle ? `<div class="kh-subtitle" id="khSub">${props.subtitle}</div>` : ''}
      </div>
    `;
  },

  getIconSVG(type) {
    if (type === 'lightning') {
      return `
        <svg viewBox="0 0 100 100" width="100" height="100">
          <rect x="8" y="8" width="84" height="84" rx="24" fill="#121214" stroke="#27272a" stroke-width="3"/>
          <path id="khBolt" d="M54 18 L32 52 H48 L44 82 L70 46 H52 Z" fill="#fbbf24" stroke="#09090b" stroke-width="2.5" stroke-linejoin="round"/>
        </svg>
      `;
    } else if (type === 'memory') {
      return `
        <svg viewBox="0 0 100 100" width="100" height="100">
          <rect x="8" y="8" width="84" height="84" rx="24" fill="#121214" stroke="#27272a" stroke-width="3"/>
          <rect x="24" y="24" width="52" height="52" rx="10" fill="none" stroke="#38bdf8" stroke-width="3"/>
          <circle cx="50" cy="50" r="10" fill="#38bdf8"/>
          <line x1="38" y1="18" x2="38" y2="24" stroke="#38bdf8" stroke-width="3"/>
          <line x1="62" y1="18" x2="62" y2="24" stroke="#38bdf8" stroke-width="3"/>
          <line x1="38" y1="76" x2="38" y2="82" stroke="#38bdf8" stroke-width="3"/>
          <line x1="62" y1="76" x2="62" y2="82" stroke="#38bdf8" stroke-width="3"/>
        </svg>
      `;
    }
    // Default rocket / speed icon
    return `
      <svg viewBox="0 0 100 100" width="100" height="100">
        <rect x="8" y="8" width="84" height="84" rx="24" fill="#121214" stroke="#27272a" stroke-width="3"/>
        <path d="M50 20 L68 46 H58 V78 H42 V46 H32 Z" fill="#10b981" stroke="#09090b" stroke-width="2.5"/>
      </svg>
    `;
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
      const dt = t - 0.08;
      if (dt < 0) {
        badgeEl.style.opacity = '0';
        badgeEl.style.transform = 'translateY(-20px)';
      } else {
        const s = spring(dt, 26, 0.65);
        badgeEl.style.opacity = (clamp(dt / 0.06, 0, 1) * exitAlpha).toFixed(3);
        badgeEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
      }
    }

    // Icon
    const iconEl = container.querySelector('#khIcon');
    if (iconEl) {
      const dt = t - 0.16;
      if (dt < 0) {
        iconEl.style.opacity = '0';
        iconEl.style.transform = 'scale(0.5) rotate(-15deg)';
      } else {
        const s = spring(dt, 25, 0.62);
        const op = clamp(dt / 0.08, 0, 1) * exitAlpha;
        const scale = 0.5 + 0.5 * s;
        const rot = (1 - s) * -15;
        iconEl.style.opacity = op.toFixed(3);
        iconEl.style.transform = `scale(${scale.toFixed(3)}) rotate(${rot.toFixed(1)}deg) translateY(${exitY.toFixed(1)}px)`;

        // Icon micro animation (subtle pulse)
        const bolt = iconEl.querySelector('#khBolt');
        if (bolt) {
          const shift = Math.sin(t * 8) * 3;
          bolt.style.transform = `translateY(${shift.toFixed(1)}px)`;
        }
      }
    }

    // Lines (staggered spring entrance)
    (props.lines || []).forEach((_, i) => {
      const lineEl = container.querySelector(`#khLine_${i}`);
      if (!lineEl) return;
      const startTime = 0.30 + i * 0.22;
      const dt = t - startTime;
      if (dt < 0) {
        lineEl.style.opacity = '0';
        lineEl.style.transform = 'translateY(50px) scale(0.85)';
      } else {
        const s = spring(dt, 24, 0.62);
        const op = clamp(dt / 0.08, 0, 1) * exitAlpha;
        const ty = (1 - s) * 50 + exitY;
        const scale = 0.85 + 0.15 * s;
        lineEl.style.opacity = op.toFixed(3);
        lineEl.style.transform = `translateY(${ty.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      }
    });

    // Subtitle
    const subEl = container.querySelector('#khSub');
    if (subEl) {
      const startSub = 0.30 + (props.lines || []).length * 0.22;
      const dt = t - startSub;
      if (dt < 0) {
        subEl.style.opacity = '0';
      } else {
        const s = spring(dt, 22, 0.7);
        subEl.style.opacity = (clamp(dt / 0.12, 0, 1) * exitAlpha).toFixed(3);
        subEl.style.transform = `translateY(${((1 - s) * 20 + exitY).toFixed(1)}px)`;
      }
    }
  }
});
