// Component: metrics_comparison
// Animated numeric counters, throughput level bars, and speedup delta badge.

window.registerComponent('metrics_comparison', {
  init(container, props) {
    const itemA = props.itemA || { name: 'SISTEMA TRADICIONAL', value: 4800, max: 120000, color: '#71717a' };
    const itemB = props.itemB || { name: 'REDIS IN-MEMORY', value: 118500, max: 120000, color: '#10b981' };

    container.innerHTML = `
      <div class="comp-metrics-comp">
        ${props.badge ? `<div class="scene-category" id="mcBadge">${props.badge}</div>` : ''}
        <div class="mc-title" id="mcTitle">${props.title || 'THROUGHPUT REAL (REQ/SEC)'}</div>

        <div class="mc-cards">
          <!-- Card A -->
          <div class="mc-card" id="mcCardA">
            <div class="mc-card-header">
              <span class="mc-name">${itemA.name}</span>
              <span class="mc-tag">${itemA.subtext || 'DISK BOUND'}</span>
            </div>
            <div class="mc-num" id="mcNumA" style="color: ${itemA.color};">0</div>
            <div class="mc-bar-track">
              <div class="mc-bar-fill" id="mcBarA" style="background: ${itemA.color}; width: 0%;"></div>
            </div>
          </div>

          <!-- Card B (Winner) -->
          <div class="mc-card winner" id="mcCardB">
            <div class="mc-card-header">
              <span class="mc-name">${itemB.name}</span>
              <span class="mc-tag green">${itemB.subtext || 'IN-MEMORY'}</span>
            </div>
            <div class="mc-num" id="mcNumB" style="color: ${itemB.color};">0</div>
            <div class="mc-bar-track">
              <div class="mc-bar-fill" id="mcBarB" style="background: ${itemB.color}; width: 0%;"></div>
            </div>
          </div>
        </div>

        <!-- Delta Speedup Badge (Solid Editorial Block) -->
        <div class="mc-delta" id="mcDelta">
          <span class="mc-delta-text">${props.speedup || '24.6x MÁS RÁPIDO'}</span>
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

    // Title / Badge
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
      titleEl.style.transform = `translateY(${((1 - s) * -15 + exitY).toFixed(1)}px)`;
    }

    // Card A Entry
    const cardA = container.querySelector('#mcCardA');
    if (cardA) {
      const dt = t - 0.25;
      if (dt < 0) {
        cardA.style.opacity = '0';
        cardA.style.transform = 'translateY(30px)';
      } else {
        const s = spring(dt, 24, 0.65);
        cardA.style.opacity = (clamp(dt / 0.08, 0, 1) * exitAlpha).toFixed(3);
        cardA.style.transform = `translateY(${((1 - s) * 30 + exitY).toFixed(1)}px)`;
      }
    }

    // Card B Entry
    const cardB = container.querySelector('#mcCardB');
    if (cardB) {
      const dt = t - 0.45;
      if (dt < 0) {
        cardB.style.opacity = '0';
        cardB.style.transform = 'translateY(30px)';
      } else {
        const s = spring(dt, 24, 0.65);
        cardB.style.opacity = (clamp(dt / 0.08, 0, 1) * exitAlpha).toFixed(3);
        cardB.style.transform = `translateY(${((1 - s) * 30 + exitY).toFixed(1)}px)`;
      }
    }

    // Numeric counter animation & Bar Fill
    const itemA = props.itemA || { value: 4800, max: 120000 };
    const itemB = props.itemB || { value: 118500, max: 120000 };

    const countProgressA = clamp((t - 0.35) / 1.0, 0, 1);
    const easeA = 1 - Math.pow(1 - countProgressA, 3);
    const curValA = Math.round(itemA.value * easeA);
    const numA = container.querySelector('#mcNumA');
    const barA = container.querySelector('#mcBarA');
    if (numA) numA.innerText = curValA.toLocaleString() + ' req/s';
    if (barA) barA.style.width = ((curValA / itemA.max) * 100).toFixed(1) + '%';

    const countProgressB = clamp((t - 0.55) / 1.2, 0, 1);
    const easeB = 1 - Math.pow(1 - countProgressB, 3);
    const curValB = Math.round(itemB.value * easeB);
    const numB = container.querySelector('#mcNumB');
    const barB = container.querySelector('#mcBarB');
    if (numB) numB.innerText = curValB.toLocaleString() + ' req/s';
    if (barB) barB.style.width = ((curValB / itemB.max) * 100).toFixed(1) + '%';

    // Delta Speedup Badge Entry
    const deltaEl = container.querySelector('#mcDelta');
    if (deltaEl) {
      const dtDelta = t - 1.8;
      if (dtDelta < 0) {
        deltaEl.style.opacity = '0';
        deltaEl.style.transform = 'scale(0.7) translateY(20px)';
      } else {
        const s = spring(dtDelta, 25, 0.62);
        deltaEl.style.opacity = (clamp(dtDelta / 0.08, 0, 1) * exitAlpha).toFixed(3);
        deltaEl.style.transform = `scale(${(0.7 + 0.3 * s).toFixed(3)}) translateY(${exitY.toFixed(1)}px)`;
      }
    }
  }
});
