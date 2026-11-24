// Component: tree_hierarchy
// B-Tree Index & Dependency Hierarchy Traversal Simulator.
// Features orthogonal node branches, square pointer packets descending to leaf nodes,
// and word-by-word synchronized captions.

window.registerComponent('tree_hierarchy', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-tree-hier">
        <canvas id="treeCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#treeCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp, lerp } = utils;
    const mu = window.motionUtils;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 960, 1360);

    const exitT = duration - 0.25;
    let exitAlpha = 1;
    if (t > exitT) {
      exitAlpha = clamp(1 - ((t - exitT) / 0.25) * 1.4, 0, 1);
    }

    ctx.save();
    ctx.globalAlpha = exitAlpha;

    const title = (props.title || 'BÚSQUEDA LOGARÍTMICA EN ÁRBOL B-TREE').toUpperCase();
    const subtitle = (props.complexity || props.subtitle || 'ACCESO O(LOG N) EN 3 SALTOS DE PÁGINA').toUpperCase();

    // 1. Clean Header
    ctx.textAlign = 'left';
    ctx.fillStyle = '#10b981';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 40, 42);

    ctx.fillStyle = '#ffffff';
    if (mu) {
      mu.fitText(ctx, title, 40, 92, 880, 40, 24, '"Plus Jakarta Sans", sans-serif', '900');
    }

    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, 118);
    ctx.lineTo(920, 118);
    ctx.stroke();

    const nodes = props.nodes || [
      { id: 'root', label: 'ROOT PAGE [0x01] · KEY_RANGE: 1..100,000', sub: 'Salto #1 en RAM (0.02ms)', x: 480, y: 235, w: 680, color: '#38bdf8' },
      { id: 'b1', label: 'BRANCH A [1..50K]', sub: 'Rama descartada', x: 245, y: 455, w: 390, parent: 'root', color: '#3f3f46', activePath: false },
      { id: 'b2', label: 'BRANCH B [50K..100K]', sub: 'Salto #2 seleccionado', x: 715, y: 455, w: 390, parent: 'root', color: '#fbbf24', activePath: true },
      { id: 'l1', label: 'LEAF PAGE [0x8F] · HIT EXACTO', sub: 'Fila localizada en 1.8ms sin escanear tabla', x: 715, y: 675, w: 390, parent: 'b2', color: '#10b981', activePath: true },
      { id: 'l0', label: 'FULL SCAN EVITADO', sub: '99,997 filas ignoradas', x: 245, y: 675, w: 390, parent: 'b1', color: '#3f3f46', activePath: false }
    ];

    // 2. Orthogonal Branches & Active Search Packet
    nodes.forEach(node => {
      if (!node.parent) return;
      const parentNode = nodes.find(n => n.id === node.parent);
      if (!parentNode) return;

      const isHot = node.activePath !== false;
      ctx.strokeStyle = isHot ? node.color : '#27272a';
      ctx.lineWidth = isHot ? 2.5 : 1.5;
      ctx.beginPath();
      ctx.moveTo(parentNode.x, parentNode.y + 48);
      ctx.lineTo(parentNode.x, (parentNode.y + node.y) / 2);
      ctx.lineTo(node.x, (parentNode.y + node.y) / 2);
      ctx.lineTo(node.x, node.y - 48);
      ctx.stroke();

      if (isHot) {
        const pulseT = ((t * 1.6) % 1);
        const px = lerp(parentNode.x, node.x, pulseT);
        const py = lerp(parentNode.y + 48, node.y - 48, pulseT);
        ctx.fillStyle = node.color;
        ctx.fillRect(px - 7, py - 7, 14, 14);
      }
    });

    // 3. Draw Mechanical Tree Nodes
    nodes.forEach((node, i) => {
      const s = spring(Math.max(0, t - i * 0.1), 24, 0.75);
      ctx.save();
      ctx.translate(node.x, node.y);
      ctx.scale(s, s);

      const w = node.w || 380;
      const h = 96;
      ctx.fillStyle = '#09090c';
      ctx.strokeStyle = node.color || '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.strokeRect(-w / 2, -h / 2, w, h);

      ctx.fillStyle = node.color || '#38bdf8';
      ctx.fillRect(-w / 2, -h / 2, 8, h);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      if (mu) {
        mu.fitText(ctx, node.label, -w / 2 + 24, -8, w - 44, 18, 13, '"JetBrains Mono", monospace', '800');
      }

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '600 14px "JetBrains Mono", monospace';
      ctx.fillText(node.sub || 'Página indexada en RAM', -w / 2 + 24, 24);

      ctx.restore();
    });

    // 4. Bottom Summary Box (y = 795..995)
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.fillRect(40, 795, 880, 200);
    ctx.strokeRect(40, 795, 880, 200);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(40, 795, 8, 200);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#10b981';
    ctx.font = '800 16px "JetBrains Mono", monospace';
    ctx.fillText(props.conclusionBadge || 'DIAGNÓSTICO ESTRUCTURAL', 70, 838);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    const sum = props.conclusion || 'En vez de leer 500,000 filas una por una, el árbol B-Tree salta directo al bloque exacto en 3 lecturas.';
    if (mu) {
      mu.wrapText(ctx, sum, 70, 882, 820, 30, 2);
    }

    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText(props.takeaway || '✔ DE 4,200ms (SEQ SCAN) A 1.8ms (INDEX ONLY SCAN)', 70, 964);

    // 5. Synchronized Word-by-Word Caption Bar
    if (mu && mu.drawSyncCaption) {
      mu.drawSyncCaption(ctx, props.voiceover || '', t, duration, { accent: '#10b981' });
    }

    ctx.restore();
  }
});
