// Component: tree_hierarchy
// Renders balanced B-Trees, LSM-Trees, ASTs, and indexing trees with real-time traversal search.

window.registerComponent('tree_hierarchy', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-tree-hier">
        ${props.header ? `<div class="scene-category" id="treeHeader">${props.header}</div>` : ''}
        <canvas id="treeCanvas" width="960" height="1300"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#treeCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp, lerp } = utils;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 960, 1300);

    // Hard cut exit
    const exitT = duration - 0.3;
    let exitAlpha = 1;
    let exitY = 0;
    if (t > exitT) {
      const p = (t - exitT) / 0.3;
      exitY = -p * p * 60;
      exitAlpha = clamp(1 - p * 1.3, 0, 1);
    }

    const headerEl = container.querySelector('#treeHeader');
    if (headerEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      headerEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      headerEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;
    ctx.translate(0, exitY);

    const title = props.title || 'B-TREE INDEX TRAVERSAL';
    const complexity = props.complexity || 'COMPLEXITY: O(log N) -> 3 HOPS';
    
    // Title card
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 36px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, 480, 80);

    ctx.fillStyle = '#10b981';
    ctx.font = '600 20px "JetBrains Mono", monospace';
    ctx.fillText(complexity, 480, 125);

    // Default 3-level tree nodes if not provided
    const nodes = props.nodes || [
      { id: 'root', label: '[KEY: 500]', x: 480, y: 240, level: 0 },
      { id: 'n1', label: '[100 - 300]', x: 240, y: 520, level: 1, parent: 'root' },
      { id: 'n2', label: '[600 - 900]', x: 720, y: 520, level: 1, parent: 'root' },
      { id: 'leaf1', label: 'LEAF #1 (120)', x: 120, y: 840, level: 2, parent: 'n1' },
      { id: 'leaf2', label: 'TARGET: 245', x: 360, y: 840, level: 2, parent: 'n1', target: true },
      { id: 'leaf3', label: 'LEAF #3 (680)', x: 600, y: 840, level: 2, parent: 'n2' },
      { id: 'leaf4', label: 'LEAF #4 (910)', x: 840, y: 840, level: 2, parent: 'n2' }
    ];

    // Traversal progress
    const traversalSpeed = t / Math.max(1, duration - 1.0);
    const activeLevel = Math.min(2, Math.floor(traversalSpeed * 3));

    // 1. Draw connecting branches
    nodes.forEach(node => {
      if (!node.parent) return;
      const parentNode = nodes.find(n => n.id === node.parent);
      if (!parentNode) return;

      const isPath = (node.target || node.id === 'n1') && traversalSpeed > 0.2;

      ctx.beginPath();
      ctx.moveTo(parentNode.x, parentNode.y + 35);
      ctx.lineTo(node.x, node.y - 35);
      ctx.strokeStyle = isPath ? '#10b981' : '#27272a';
      ctx.lineWidth = isPath ? 4 : 2;
      ctx.stroke();

      // Traveling pulse packet along active branch
      if (isPath) {
        const pulseT = (t * 2) % 1;
        const px = lerp(parentNode.x, node.x, pulseT);
        const py = lerp(parentNode.y + 35, node.y - 35, pulseT);
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 2. Draw nodes
    nodes.forEach((node, i) => {
      const isTarget = node.target;
      const isTraversed = node.level <= activeLevel && (node.id === 'root' || node.id === 'n1' || isTarget);
      const isHit = isTarget && traversalSpeed > 0.65;

      const scale = spring(Math.max(0, t - node.level * 0.15), 20, 0.7);

      ctx.save();
      ctx.translate(node.x, node.y);
      ctx.scale(scale, scale);

      // Node background box
      const bw = node.level === 2 ? 210 : 220;
      const bh = 70;
      ctx.fillStyle = isHit ? '#064e3b' : isTraversed ? '#1e293b' : '#101014';
      ctx.strokeStyle = isHit ? '#10b981' : isTraversed ? '#38bdf8' : '#27272a';
      ctx.lineWidth = isHit ? 3.5 : 2;

      ctx.beginPath();
      ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 12);
      ctx.fill();
      ctx.stroke();

      // Node text
      ctx.fillStyle = isHit ? '#a7f3d0' : isTraversed ? '#ffffff' : '#94a3b8';
      ctx.font = '700 18px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, 0, 0);

      // Status indicator tag
      if (isHit) {
        ctx.fillStyle = '#10b981';
        ctx.font = '800 13px "JetBrains Mono", monospace';
        ctx.fillText('✔ EXACT MATCH (0.2ms)', 0, bh / 2 + 20);
      }

      ctx.restore();
    });

    // Bottom info box
    const cardAlpha = clamp((t - 0.4) / 0.3, 0, 1);
    if (cardAlpha > 0) {
      ctx.globalAlpha = cardAlpha * exitAlpha;
      ctx.fillStyle = '#18181b';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(80, 1020, 800, 180, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(props.footerBadge || 'VENTAJA TÉCNICA // B-TREE EN NVMe', 120, 1070);

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(props.footerText || '10 Millones de filas indexadas requieren solo 3 lecturas de página en disco.', 120, 1120);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(props.footerSubtext || 'Cero escaneos secuenciales. Búsquedas binarias predecibles en O(log N).', 120, 1155);
    }

    ctx.restore();
  }
});
