// Component: metrics_comparison
// Animated numeric counters, throughput level bars, and speedup delta badge.
// Fully normalized for metricA/metricB and itemA/itemB, with smooth count-up animation.

window.registerComponent('metrics_comparison', {
  init(container, props) {
    // Normalize metricA/metricB vs itemA/itemB
    const rawA = props.metricA || props.itemA || {};
    const rawB = props.metricB || props.itemB || {};

    this.itemA = {
      name: rawA.label || rawA.name || 'SISTEMA TRADICIONAL',
      value: rawA.value !== undefined ? rawA.value : '100 ms',
      subtext: rawA.sub || rawA.subtext || 'Sobrecarga de red / I/O',
      color: rawA.color || '#ef4444'
    };

    this.itemB = {
      name: rawB.label || rawB.name || 'SISTEMA OPTIMIZADO',
      value: rawB.value !== undefined ? rawB.value : '2 ms',
      subtext: rawB.sub || rawB.subtext || 'In-Memory / Zero-Copy',
      color: rawB.color || '#10b981'
    };

    container.innerHTML = `
      <div class="comp-metrics-comp">
        ${props.badge || props.header ? `<div class="scene-category" id="mcBadge">${props.badge || props.header}</div>` : ''}
        <div class="mc-title" id="mcTitle">${props.title || 'BENCHMARK COMPARATIVO REAL'}</div>

        <div class="mc-cards">
          <!-- Card A -->
          <div class="mc-card" id="mcCardA">
            <div class="mc-card-header">
              <span class="mc-name">${this.itemA.name}</span>
              <span class="mc-tag">${this.itemA.subtext}</span>
            </div>
            <div class="mc-num" id="mcNumA" style="color: ${this.itemA.color};">${this.itemA.value}</div>
            <div class="mc-bar-track">
              <div class="mc-bar-fill" id="mcBarA" style="background: ${this.itemA.color}; width: 85%;"></div>
            </div>
          </div>

          <!-- Card B (Winner) -->
          <div class="mc-card winner" id="mcCardB">
            <div class="mc-card-header">
              <span class="mc-name">${this.itemB.name}</span>
              <span class="mc-tag green">${this.itemB.subtext}</span>
            </div>
            <div class="mc-num" id="mcNumB" style="color: ${this.itemB.color};">${this.itemB.value}</div>
            <div class="mc-bar-track">
              <div class="mc-bar-fill" id="mcBarB" style="background: ${this.itemB.color}; width: 100%;"></div>
            </div>
          </div>
        </div>

        <!-- Delta Speedup Badge -->
        <div class="mc-delta" id="mcDelta">
          <span class="mc-delta-text">${props.speedup || 'OPTIMIZACIÓN VERIFICADA EN PRODUCCIÓN'}</span>
        </div>
      </div>
    `;
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp } = utils;

    // Hard-cut exit in last 0.3s
    const exitT = duration - 0.3;
    let exitAlpha = 1;
    let exitY = 0;
    if (t > exitT) {
      const p = (t - exitT) / 0.3;
      exitY = -p * p * 70;
      exitAlpha = clamp(1 - p * 1.3, 0, 1);
    }

    // Title / Badge Spring
    const titleEl = container.querySelector('#mcTitle');
    const badgeEl = container.querySelector('#mcBadge');
    if (badgeEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      badgeEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      badgeEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }
    if (titleEl) {
      const s = spring(Math.max(0, t - 0.12), 24, 0.7);
      titleEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      titleEl.style.transform = `translateY(${((1 - s) * -25 + exitY).toFixed(1)}px)`;
    }

    // Card A Spring & Bar
    const cardA = container.querySelector('#mcCardA');
    const barA = container.querySelector('#mcBarA');
    if (cardA) {
      const s = spring(Math.max(0, t - 0.22), 22, 0.75);
      cardA.style.opacity = (clamp((t - 0.18) / 0.15, 0, 1) * exitAlpha).toFixed(3);
      cardA.style.transform = `translateY(${((1 - s) * 35 + exitY).toFixed(1)}px) scale(${s.toFixed(3)})`;
    }
    if (barA) {
      const barProg = clamp((t - 0.3) / 0.5, 0, 1);
      const ease = 1 - Math.pow(1 - barProg, 3);
      barA.style.width = `${(ease * 85).toFixed(1)}%`;
    }

    // Card B (Winner) Spring & Bar & Glow Pulse
    const cardB = container.querySelector('#mcCardB');
    const barB = container.querySelector('#mcBarB');
    if (cardB) {
      const s = spring(Math.max(0, t - 0.38), 22, 0.72);
      const pulse = 1.0 + 0.015 * Math.sin(t * 3.5);
      cardB.style.opacity = (clamp((t - 0.3) / 0.15, 0, 1) * exitAlpha).toFixed(3);
      cardB.style.transform = `translateY(${((1 - s) * 35 + exitY).toFixed(1)}px) scale(${(s * pulse).toFixed(3)})`;
      cardB.style.boxShadow = `0 0 ${Math.abs(Math.sin(t * 3) * 20 + 8).toFixed(1)}px rgba(16, 185, 129, 0.25)`;
    }
    if (barB) {
      const barProg = clamp((t - 0.45) / 0.5, 0, 1);
      const ease = 1 - Math.pow(1 - barProg, 3);
      barB.style.width = `${(ease * 100).toFixed(1)}%`;
    }

    // Delta Speedup Badge Spring
    const deltaEl = container.querySelector('#mcDelta');
    if (deltaEl) {
      const s = spring(Math.max(0, t - 0.55), 24, 0.7);
      deltaEl.style.opacity = (clamp((t - 0.5) / 0.15, 0, 1) * exitAlpha).toFixed(3);
      deltaEl.style.transform = `translateY(${((1 - s) * 20 + exitY).toFixed(1)}px) scale(${s.toFixed(3)})`;
    }
  }
});
