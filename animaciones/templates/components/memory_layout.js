// Component: memory_layout
// Low-level memory addresses, hex bytes inspection, and hardware latency comparison.

window.registerComponent('memory_layout', {
  init(container, props) {
    const rows = props.rows || [
      { addr: '0x7FFE0010', hex: ['72', '65', '64', '69', '73', '5F', '6B', '76'], label: 'KEY: "redis_kv"' },
      { addr: '0x7FFE0018', hex: ['00', '00', '00', '08', '7F', 'FE', '00', '40'], label: 'POINTER -> DICT' },
      { addr: '0x7FFE0020', hex: ['FF', '00', 'C0', 'A8', '01', '0A', '1F', '90'], label: 'CLIENT TCP FD' },
      { addr: '0x7FFE0028', hex: ['01', '00', '00', '00', '00', '00', '00', '00'], label: 'EXPIRE AT (TTL)' }
    ];

    container.innerHTML = `
      <div class="comp-memory-layout">
        ${props.badge ? `<div class="scene-category" id="mlBadge">${props.badge}</div>` : ''}
        <div class="ml-title" id="mlTitle">${props.title || 'INSPECCIÓN DE MEMORIA RAM'}</div>

        <!-- Hex Dump Table -->
        <div class="ml-table" id="mlTable">
          <div class="ml-table-head">
            <span class="ml-th addr">OFFSET</span>
            <span class="ml-th bytes">BYTES (HEX DUMP)</span>
            <span class="ml-th label">INTERPRETACIÓN</span>
          </div>
          ${rows.map((row, i) => `
            <div class="ml-row" id="mlRow_${i}">
              <span class="ml-addr">${row.addr}</span>
              <div class="ml-bytes">
                ${row.hex.map((b, bi) => `<span class="byte ${bi === 0 ? 'lead' : ''}">${b}</span>`).join('')}
              </div>
              <span class="ml-label">${row.label}</span>
            </div>
          `).join('')}
        </div>

        <!-- Hardware Latency Metric Banner -->
        <div class="ml-latency" id="mlLatency">
          <div class="lat-box ram">
            <span class="lat-label">ACCESO A MEMORIA RAM</span>
            <span class="lat-val">~80 ns</span>
            <span class="lat-sub">DIRECT CACHE LINE</span>
          </div>
          <div class="lat-vs">VS</div>
          <div class="lat-box nvme">
            <span class="lat-label">LECTURA DE DISCO NVMe</span>
            <span class="lat-val">~50,000 ns</span>
            <span class="lat-sub">625x MÁS LENTO (I/O SYSTEM CALL)</span>
          </div>
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
    const titleEl = container.querySelector('#mlTitle');
    const badgeEl = container.querySelector('#mlBadge');
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

    // Table Container Entry
    const tableEl = container.querySelector('#mlTable');
    if (tableEl) {
      const dt = t - 0.15;
      if (dt < 0) {
        tableEl.style.opacity = '0';
        tableEl.style.transform = 'translateY(30px)';
      } else {
        const s = spring(dt, 24, 0.65);
        tableEl.style.opacity = (clamp(dt / 0.08, 0, 1) * exitAlpha).toFixed(3);
        tableEl.style.transform = `translateY(${((1 - s) * 30 + exitY).toFixed(1)}px)`;
      }
    }

    // Staggered rows reveal
    const rows = props.rows || [{}, {}, {}, {}];
    rows.forEach((_, i) => {
      const rowEl = container.querySelector(`#mlRow_${i}`);
      if (!rowEl) return;
      const startT = 0.28 + i * 0.12;
      const dt = t - startT;
      if (dt < 0) {
        rowEl.style.opacity = '0';
        rowEl.style.transform = 'translateX(-15px)';
      } else {
        const s = spring(dt, 26, 0.68);
        rowEl.style.opacity = (clamp(dt / 0.06, 0, 1) * exitAlpha).toFixed(3);
        rowEl.style.transform = `translateX(${((1 - s) * -15).toFixed(1)}px)`;
      }
    });

    // Hardware Latency Banner Entry
    const latEl = container.querySelector('#mlLatency');
    if (latEl) {
      const startLat = 0.28 + rows.length * 0.12 + 0.2;
      const dt = t - startLat;
      if (dt < 0) {
        latEl.style.opacity = '0';
        latEl.style.transform = 'translateY(30px) scale(0.96)';
      } else {
        const s = spring(dt, 24, 0.65);
        latEl.style.opacity = (clamp(dt / 0.08, 0, 1) * exitAlpha).toFixed(3);
        latEl.style.transform = `translateY(${((1 - s) * 30 + exitY).toFixed(1)}px) scale(${(0.96 + 0.04 * s).toFixed(3)})`;
      }
    }
  }
});
