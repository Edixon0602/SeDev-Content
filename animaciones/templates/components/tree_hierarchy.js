// Component: tree_hierarchy
// Renders balanced B-Trees, dependency trees, ASTs, and indexing hierarchies.
// Fully normalized for both props.items and props.nodes with dynamic auto-layout.

window.registerComponent('tree_hierarchy', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-tree-hier">
        ${props.header || props.badge ? `<div class="scene-category" id="treeHeader">${props.header || props.badge}</div>` : ''}
        <canvas id="treeCanvas" width="960" height="1300"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#treeCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp, lerp } = utils;
    const mu = window.motionUtils;
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

    const title = props.title || 'ÁRBOL JERÁRQUICO';
    const complexity = props.complexity || props.subtitle || 'ANÁLISIS DE DEPENDENCIAS Y NIVELES';

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    if (mu) {
      mu.fitText(ctx, title, 480, 65, 840, 32, 22, '"Plus Jakarta Sans", sans-serif', '800');
    } else {
      ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(title, 480, 65);
    }

    ctx.fillStyle = '#10b981';
    ctx.font = '700 17px "JetBrains Mono", monospace';
    ctx.fillText(complexity, 480, 102);

    // Normalize Nodes (support props.items as well as props.nodes)
    let nodes = [];
    if (props.nodes) {
      nodes = props.nodes;
    } else if (props.items) {
      // Auto-layout items into a clean tree
      const rootItem = props.items.find(it => it.level === 0) || props.items[0];
      const children = props.items.filter(it => it !== rootItem);

      nodes.push({
        id: 'root',
        label: rootItem.name || rootItem.label,
        x: 480,
        y: 240,
        level: 0,
        color: '#38bdf8'
      });

      const count = children.length;
      children.forEach((c, idx) => {
        const xStep = 720 / Math.max(1, count - 1);
        const xPos = count === 1 ? 480 : (120 + idx * xStep);
        nodes.push({
          id: `child_${idx}`,
          label: c.name || c.label,
          x: xPos,
          y: 540,
          level: 1,
          parent: 'root',
          color: idx === 1 ? '#ef4444' : '#fbbf24'
        });
      });
    } else {
      // Default fallback
      nodes = [
        { id: 'root', label: 'ROOT [KEY: 500]', x: 480, y: 240, level: 0, color: '#38bdf8' },
        { id: 'n1', label: 'BRANCH [100 - 300]', x: 240, y: 520, level: 1, parent: 'root', color: '#10b981' },
        { id: 'n2', label: 'BRANCH [600 - 900]', x: 720, y: 520, level: 1, parent: 'root', color: '#fbbf24' }
      ];
    }

    // 1. Draw Connecting Branches
    nodes.forEach(node => {
      if (!node.parent) return;
      const parentNode = nodes.find(n => n.id === node.parent);
      if (!parentNode) return;

      ctx.beginPath();
      ctx.moveTo(parentNode.x, parentNode.y + 40);
      ctx.lineTo(node.x, node.y - 40);
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Traveling pulse packet
      const pulseT = ((t * 1.5) % 1);
      const px = lerp(parentNode.x, node.x, pulseT);
      const py = lerp(parentNode.y + 40, node.y - 40, pulseT);
      ctx.fillStyle = node.color || '#10b981';
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Draw Nodes
    nodes.forEach((node, i) => {
      const s = spring(Math.max(0, t - i * 0.12), 22, 0.75);
      ctx.save();
      ctx.translate(node.x, node.y);
      ctx.scale(s, s);

      const w = node.level === 0 ? 360 : 260;
      const h = 80;

      ctx.fillStyle = '#121216';
      ctx.strokeStyle = node.color || '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, 12);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 15px "JetBrains Mono", monospace';

      // Auto-wrap label inside node
      if (mu) {
        mu.wrapText(ctx, node.label, 0, -10, w - 24, 20, 2);
      } else {
        ctx.fillText(node.label, 0, 5);
      }

      ctx.restore();
    });

    // 3. Bottom Summary
    const bAlpha = clamp((t - 0.4) / 0.3, 0, 1);
    if (bAlpha > 0) {
      ctx.globalAlpha = bAlpha * exitAlpha;
      ctx.fillStyle = '#111116';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(60, 860, 840, 180, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = '800 14px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('ANÁLISIS DE JERARQUÍA Y COMPLEJIDAD', 95, 905);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
      const sum = props.conclusion || 'Consolidar estructuras reduce la duplicación de dependencias y el gasto de memoria.';
      if (mu) {
        mu.wrapText(ctx, sum, 95, 945, 760, 28, 2);
      } else {
        ctx.fillText(sum, 95, 945);
      }

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 15px "JetBrains Mono", monospace';
      ctx.fillText('Estructura balanceada: O(log N) de profundidad máxima', 95, 1005);
    }

    ctx.restore();
  }
});
