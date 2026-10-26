// Component: kernel_sandbox_viz
// Privilege rings & sandboxing visualizer: Ring 3 (Userspace) vs Ring 0 (Kernel) & eBPF/Wasm line-rate interception.

window.registerComponent('kernel_sandbox_viz', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-kernel-sandbox">
        ${props.badge ? `<div class="scene-category" id="ksBadge">${props.badge}</div>` : ''}
        <canvas id="kernelCanvas" width="960" height="1300"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#kernelCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp, lerp } = utils;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 960, 1300);

    // Hard-cut exit in last 0.3s
    const exitT = duration - 0.3;
    let exitAlpha = 1;
    let exitY = 0;
    if (t > exitT) {
      const p = (t - exitT) / 0.3;
      exitY = -p * p * 60;
      exitAlpha = clamp(1 - p * 1.3, 0, 1);
    }

    const badgeEl = container.querySelector('#ksBadge');
    if (badgeEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      badgeEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      badgeEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;
    ctx.translate(0, exitY);

    const title = props.title || 'AISLAMIENTO EN KERNEL DE LINUX';
    const subtitle = props.subtitle || 'RING 3 (USERSPACE) VS RING 0 (eBPF / KERNEL)';

    // Header
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 34px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 480, 70);

    ctx.fillStyle = '#f59e0b';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 480, 105);

    // 1. Ring 3: Userspace Region
    const topY = 160;
    const topH = 260;
    ctx.fillStyle = '#141418';
    ctx.strokeStyle = '#3f3f46';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, topY, 800, topH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#71717a';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('RING 3: USERSPACE (APLICACIONES & CONTENEDORES)', 110, topY + 40);

    // Node A: App
    ctx.fillStyle = '#1c1c22';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(110, topY + 70, 340, 150, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('NODO APLICACIÓN (NODE / GO / PYTHON)', 130, topY + 110);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillText('Proceso aislado sin acceso directo a HW', 130, topY + 140);
    ctx.fillText('Memoria virtual mapeada por el SO', 130, topY + 165);
    ctx.fillText('Requiere syscall para I/O de red', 130, topY + 190);

    // Node B: Legacy Sidecar (Kubernetes)
    ctx.fillStyle = '#1c1c22';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(490, topY + 70, 360, 150, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.font = '800 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SIDECAR PROXY (ENVOY / ISTIO)', 510, topY + 110);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillText('Sobrecarga de CPU: 15-25%', 510, topY + 140);
    ctx.fillText('Doble salto de red en loopback', 510, topY + 165);
    ctx.fillText('Duplica el consumo de RAM', 510, topY + 190);

    // 2. Syscall Barrier (The Red Line of Context Switch)
    const midY = 460;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 6]);
    ctx.beginPath();
    ctx.moveTo(80, midY);
    ctx.lineTo(880, midY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#ef4444';
    ctx.font = '800 14px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('FRONTERA DE SYSCALL (PENALIZACIÓN CONTEXT SWITCH: ~1.500 ns)', 480, midY - 12);

    // 3. Ring 0: Kernel Space Region
    const btmY = 490;
    const btmH = 320;
    ctx.fillStyle = '#0f1712';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(80, btmY, 800, btmH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '800 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('RING 0: KERNEL DE LINUX & HOOKS eBPF / WASM', 110, btmY + 40);

    // eBPF JIT Verifier Box
    ctx.fillStyle = '#14251c';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(110, btmY + 65, 740, 220, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('eBPF IN-KERNEL VIRTUAL MACHINE', 135, btmY + 105);

    // Hooks in kernel
    const hooks = [
      { name: 'XDP (eXpress Data Path)', desc: 'Intercepción en driver de tarjeta NIC a velocidad de cable', lat: '12 ns' },
      { name: 'TC (Traffic Control)', desc: 'Enrutamiento y filtrado de paquetes antes de la pila TCP', lat: '24 ns' },
      { name: 'kprobe / kretprobe', desc: 'Telemetría de llamadas al sistema sin modificar código fuente', lat: '18 ns' }
    ];

    hooks.forEach((h, hi) => {
      const hy = btmY + 125 + hi * 48;
      ctx.fillStyle = '#10b981';
      ctx.font = '700 13px "JetBrains Mono", monospace';
      ctx.fillText(`• ${h.name}`, 135, hy + 20);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 12px "JetBrains Mono", monospace';
      ctx.fillText(`${h.desc}`, 380, hy + 20);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 12px "JetBrains Mono", monospace';
      ctx.fillText(h.lat, 800, hy + 20);
    });

    // 4. Comparison Summary Card
    const s = spring(Math.max(0, t - 1.2), 20, 0.7);
    ctx.fillStyle = '#17150c';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(80, 850, 800, 150, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.font = '900 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('BYPASS TOTAL DEL USERSPACE', 110, 890);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Los paquetes de red se procesan en microsegundos dentro del kernel.', 110, 925);
    ctx.fillStyle = '#10b981';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText('Elimina sidecars, reduce la latencia en un 80% y garantiza seguridad verificada por bytecode.', 110, 960);

    ctx.restore();
  }
});
