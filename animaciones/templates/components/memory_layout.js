// Component: memory_layout
// Low-level memory addresses, hex bytes inspection, and hardware latency comparison.
// Fully normalized for rows and items with zero overflow.

window.registerComponent('memory_layout', {
  init(container, props) {
    const rawRows = props.rows || (props.items ? props.items.map(it => ({
      addr: it.addr || '0x7FFF00',
      hex: ['00', '04', 'A2', 'FF', '10', '00', '00', '00'],
      label: `${it.name}: ${it.value || ''}`
    })) : [
      { addr: '0x7FFE0010', hex: ['72', '65', '64', '69', '73', '5F', '6B', '76'], label: 'KEY: "redis_kv"' },
      { addr: '0x7FFE0018', hex: ['00', '00', '00', '08', '7F', 'FE', '00', '40'], label: 'POINTER -> DICT' },
      { addr: '0x7FFE0020', hex: ['FF', '00', 'C0', 'A8', '01', '0A', '1F', '90'], label: 'CLIENT TCP FD' }
    ]);

    container.innerHTML = `
      <div class="comp-memory-layout">
        ${props.badge || props.header ? `<div class="scene-category" id="mlBadge">${props.badge || props.header}</div>` : ''}
        <div class="ml-title" id="mlTitle">${props.title || 'INSPECCIÓN DE MEMORIA RAM'}</div>

        <!-- Hex Dump Table -->
        <div class="ml-table" id="mlTable">
          <div class="ml-table-head">
            <span class="ml-th addr">OFFSET</span>
            <span class="ml-th bytes">BYTES (HEX DUMP)</span>
            <span class="ml-th label">INTERPRETACIÓN</span>
          </div>
          ${rawRows.map((row, i) => `
            <div class="ml-row" id="mlRow_${i}">
              <span class="ml-addr">${row.addr}</span>
              <div class="ml-bytes">
                ${(row.hex || ['00','00','00','00']).map((b, bi) => `<span class="byte ${bi === 0 ? 'lead' : ''}">${b}</span>`).join('')}
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
    this.rowCount = rawRows.length;
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
    for (let i = 0; i < (this.rowCount || 4); i++) {
      const rowEl = container.querySelector(`#mlRow_${i}`);
      if (!rowEl) continue;
      const startT = 0.28 + i * 0.1;
      const dt = t - startT;
      if (dt < 0) {
        rowEl.style.opacity = '0';
        rowEl.style.transform = 'translateX(-20px)';
      } else {
        const s = spring(dt, 22, 0.7);
        rowEl.style.opacity = (clamp(dt / 0.08, 0, 1) * exitAlpha).toFixed(3);
        rowEl.style.transform = `translateX(${((1 - s) * -20).toFixed(1)}px)`;
      }
    }

    // Latency Box Entry
    const latEl = container.querySelector('#mlLatency');
    if (latEl) {
      const dt = t - 0.6;
      if (dt < 0) {
        latEl.style.opacity = '0';
        latEl.style.transform = 'translateY(40px)';
      } else {
        const s = spring(dt, 20, 0.7);
        latEl.style.opacity = (clamp(dt / 0.08, 0, 1) * exitAlpha).toFixed(3);
        latEl.style.transform = `translateY(${((1 - s) * 40 + exitY).toFixed(1)}px)`;
      }
    }
  }
});
