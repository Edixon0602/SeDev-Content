// Component: architecture_flow
// Mechanical engineering architecture simulator (Dieter Rams / Linear style).
// Event-driven (no constant looping):
//   phase A (0.18s)  nodes unlock one by one with a clipped mechanical reveal
//   phase B (0.50s)  orthogonal rails draw on, discrete packets travel once
//   phase C (28%)    surge: extra packets + queue pressure
//   phase D (58%)    resolution: feedback ack returns, final node locks green
// Layouts and props are unchanged: vertical | horizontal | split.

window.registerComponent('architecture_flow', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-arch-flow" style="position:relative;">
        <div class="scene-category" id="archHeader" style="position:absolute; left:0; top:-44px; margin:0; opacity:0;"></div>
        <canvas id="archCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#archCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.headerEl = container.querySelector('#archHeader');
    if (this.headerEl) {
      this.headerEl.textContent = props && props.header ? String(props.header).toUpperCase() : '';
      if (!props || !props.header) this.headerEl.style.display = 'none';
    }
  },

  render(container, t, duration, props, utils) {
    const { clamp, lerp } = utils;
    const MC = window.MotionCore;
    const mu = window.motionUtils;
    const ctx = this.ctx;
    props = props && typeof props === 'object' ? props : {};
    duration = Number.isFinite(Number(duration)) && Number(duration) > 0 ? Number(duration) : 5;
    t = Number.isFinite(Number(t)) ? Number(t) : 0;
    ctx.clearRect(0, 0, 960, 1360);

    const exitDur = Math.min(0.25, duration * 0.12);
    const exitStart = duration - exitDur;
    const exitP = MC ? MC.progress(t, exitStart, exitDur, 'outCubic') : clamp((t - exitStart) / exitDur, 0, 1);

    ctx.save();
    ctx.globalAlpha = clamp(1 - exitP * 1.35, 0, 1);

    const title = String(props.title || 'ARQUITECTURA DE FLUJO').toUpperCase();
    const subtitle = String(props.subtitle || props.header || 'EJECUCIÓN MECÁNICA DETERMINISTA').toUpperCase();

    // --- Event timeline (clamped so short scenes always reach resolution) --
    const tNodes = 0.18;
    const nodeStep = 0.13;
    const tRails = 0.5;
    const tFlow = 0.82;
    const tResolve = clamp(duration * 0.58, 1.35, Math.max(1.4, duration - exitDur - 0.35));
    const tSurge = clamp(duration * 0.28, tFlow + 0.25, Math.max(tFlow + 0.3, tResolve - 0.3));
    const tAck = tResolve + 0.2;
    const isSurge = t >= tSurge && t < tResolve;
    const isSteady = t >= tResolve;

    // Header DOM (legacy compatibility) + canvas subtitle.
    if (this.headerEl) {
      const hp = MC ? MC.progress(t, 0, 0.2, 'outCubic') : 1;
      this.headerEl.style.opacity = (hp * (1 - exitP)).toFixed(3);
      this.headerEl.style.transform = `translateY(${((1 - hp) * -20 - exitP * 16).toFixed(1)}px)`;
    }

    // --- Header -----------------------------------------------------------
    const headP = MC ? MC.progress(t, 0, 0.2, 'outCubic') : 1;
    ctx.save();
    ctx.globalAlpha *= headP;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fbbf24';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    mu.fitText(ctx, subtitle, 40, 42, 880, 16, 11, '"JetBrains Mono", monospace', '700');

    ctx.fillStyle = '#ffffff';
    mu.fitText(ctx, title, 40, 92, 880, 42, 24, '"Plus Jakarta Sans", sans-serif', '900');
    ctx.restore();

    const ruleP = MC ? MC.progress(t, 0.04, 0.3, 'outExpo') : 1;
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, 118);
    ctx.lineTo(40 + 880 * ruleP, 118);
    ctx.stroke();

    // --- Shared helpers ---------------------------------------------------
    const nodeProgress = (idx) => MC ? MC.progress(t, tNodes + idx * nodeStep, 0.42, 'outQuint') : (t >= tNodes + idx * nodeStep ? 1 : 0);

    const revealNode = (idx, px, py, pw, ph, draw) => {
      const p = nodeProgress(idx);
      if (p <= 0) return;
      ctx.save();
      ctx.globalAlpha *= p;
      if (p < 0.999) {
        ctx.beginPath();
        ctx.rect(px - pw / 2 - 2, py - ph / 2 - 2, (pw + 4) * p, ph + 4);
        ctx.clip();
      }
      draw();
      ctx.restore();
    };

    // One-shot packet: exists only while travelling, never loops.
    const packet = (x1, y1, x2, y2, start, travel, color, size = 16) => {
      const p = (t - start) / travel;
      if (p < 0 || p > 1) return;
      const e = MC ? MC.ease.inOutCubic(p) : p;
      const px = lerp(x1, x2, e);
      const py = lerp(y1, y2, e);
      ctx.fillStyle = color;
      ctx.fillRect(px - size / 2, py - size / 2, size, size);
    };

    const railP = (idx) => MC ? MC.progress(t, tRails + idx * 0.09, 0.34, 'outCubic') : (t >= tRails + idx * 0.09 ? 1 : 0);

    const drawResolvePulse = (px, py, pw, ph) => {
      const rp = MC ? MC.progress(t, tResolve + 0.08, 0.5, 'outCubic') : 1;
      if (rp <= 0 || rp >= 1) return;
      ctx.save();
      ctx.globalAlpha *= (1 - rp) * 0.9;
      ctx.strokeStyle = props.finalColor || '#10b981';
      ctx.lineWidth = 2;
      const grow = 26 * rp;
      ctx.strokeRect(px - pw / 2 - grow, py - ph / 2 - grow, pw + grow * 2, ph + grow * 2);
      ctx.restore();
    };

    // --- Layouts ----------------------------------------------------------
    const rawNodes = Array.isArray(props.nodes) && props.nodes.length ? props.nodes : [
      { id: 'in', label: 'INGESTA DE EVENTOS', sublabel: '1,200 REQ/S ENTRANTES', color: '#ffffff' },
      { id: 'worker', label: 'COLA + WORKER POOL', sublabel: 'BUFFER CONTROLADO EN RAM', color: '#fbbf24' },
      { id: 'db', label: 'BASE DE DATOS / API', sublabel: 'ESCRITURA ATÓMICA (3.2ms)', color: '#10b981' }
    ];
    const layoutMode = props.layout || 'vertical';
    const cx = 480;
    const finalColor = props.finalColor || '#10b981';
    const inactiveColor = '#3f3f46';

    if (layoutMode === 'horizontal') {
      const hNodes = rawNodes.slice(0, 4);
      if (rawNodes.length > 4) {
        throw new Error(`architecture_flow horizontal soporta máximo 4 nodos (recibidos ${rawNodes.length}). Usa layout vertical o divide la escena.`);
      }
      const colH = 380;
      const colY = 390;
      const gap = 30;
      const colW = (880 - gap * (hNodes.length - 1)) / hNodes.length;
      const colCenters = hNodes.map((_, i) => 40 + colW / 2 + i * (colW + gap));

      for (let i = 0; i < hNodes.length - 1; i++) {
        const x1 = colCenters[i] + colW / 2;
        const x2 = colCenters[i + 1] - colW / 2;
        MC.strokePath(ctx, [{ x: x1, y: colY }, { x: x2, y: colY }], railP(i), '#3f3f46', 2);

        const start = tFlow + i * 0.12;
        packet(x1 + 8, colY, x2 - 8, colY, start, 0.55, isSteady ? finalColor : '#fbbf24');
        packet(x1 + 8, colY, x2 - 8, colY, start + 0.28, 0.55, isSteady ? finalColor : '#fbbf24', 12);
        if (i === 0 && t >= tSurge) {
          packet(x1 + 8, colY, x2 - 8, colY, tSurge + 0.05, 0.45, '#fbbf24', 12);
        }
      }

      // Feedback loop draws on only at resolution, then a single ack returns.
      const loopP = MC ? MC.progress(t, tResolve - 0.1, 0.45, 'inOutCubic') : (t >= tResolve - 0.1 ? 1 : 0);
      const lastCol = hNodes.length - 1;
      const loopPath = hNodes.length > 1 ? [
        { x: colCenters[lastCol], y: colY - colH / 2 },
        { x: colCenters[lastCol], y: 165 },
        { x: colCenters[0], y: 165 },
        { x: colCenters[0], y: colY - colH / 2 }
      ] : null;
      if (loopPath) {
        MC.strokePath(ctx, loopPath, loopP, isSteady ? finalColor : '#f59e0b', 1.5, [8, 6]);

        if (t >= tAck) {
          const ackP = clamp((t - tAck) / 0.55, 0, 1);
          if (ackP < 1) {
            const pt = MC.pointOnPath(loopPath, MC.ease.inOutCubic(ackP));
            ctx.fillStyle = finalColor;
            ctx.fillRect(pt.x - 6, pt.y - 6, 12, 12);
          }
        }
      }

      hNodes.forEach((n, idx) => {
        const colColor = (idx === hNodes.length - 1 && isSteady) ? finalColor : (n.color || '#38bdf8');
        revealNode(idx, colCenters[idx], colY, colW, colH, () => {
          ctx.fillStyle = '#09090c';
          ctx.strokeStyle = colColor;
          ctx.lineWidth = 1.5;
          ctx.fillRect(colCenters[idx] - colW / 2, colY - colH / 2, colW, colH);
          ctx.strokeRect(colCenters[idx] - colW / 2, colY - colH / 2, colW, colH);
          ctx.fillStyle = colColor;
          ctx.fillRect(colCenters[idx] - colW / 2, colY - colH / 2, colW, 8);

          ctx.textAlign = 'left';
          ctx.fillStyle = colColor;
          ctx.font = '800 15px "JetBrains Mono", monospace';
          ctx.fillText(`STAGE 0${idx + 1}`, colCenters[idx] - colW / 2 + 20, colY - colH / 2 + 42);

          ctx.fillStyle = '#ffffff';
          ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
          if (mu) {
            mu.wrapText(ctx, String(n.label || '').toUpperCase(), colCenters[idx] - colW / 2 + 20, colY - colH / 2 + 86, colW - 40, 26, 3);
          }

          ctx.fillStyle = '#a1a1aa';
          ctx.font = '600 14px "JetBrains Mono", monospace';
          if (mu) {
            mu.wrapText(ctx, String(n.sublabel || n.sub || ''), colCenters[idx] - colW / 2 + 20, colY - colH / 2 + 195, colW - 40, 22, 3);
          }

          for (let b = 0; b < 4; b++) {
            const by = colY + colH / 2 - 110 + b * 22;
            const threshold = tNodes + idx * nodeStep + 0.3 + b * 0.06;
            const activeB = t >= threshold;
            ctx.fillStyle = activeB ? colColor : '#18181b';
            ctx.fillRect(colCenters[idx] - colW / 2 + 20, by, (colW - 40) * (activeB ? 1 : 0.35), 12);
          }
        });
        if (idx === hNodes.length - 1) drawResolvePulse(colCenters[idx], colY, colW, colH);
      });
    } else if (layoutMode === 'split') {
      if (rawNodes.length > 4) {
        throw new Error(`architecture_flow split soporta máximo 4 nodos (recibidos ${rawNodes.length}). Usa layout vertical.`);
      }
      const topNode = rawNodes[0] || { label: 'INGESTA', sublabel: 'CLASIFICADOR' };
      const midA = rawNodes[1] || { label: 'RUTA RÁPIDA / CACHÉ', sublabel: 'HIT EN MEMORIA' };
      const midB = rawNodes[2] || { label: 'WORKER / PROCESO', sublabel: 'EJECUCIÓN VALIDADA' };

      const pos = [
        { x: 480, y: 230, w: 680, h: 110, data: topNode, col: '#38bdf8', tag: 'ROUTER' },
        { x: 250, y: 475, w: 400, h: 150, data: midA, col: '#fbbf24', tag: 'BRANCH A' },
        { x: 710, y: 475, w: 400, h: 150, data: midB, col: finalColor, tag: 'BRANCH B' },
        { x: 480, y: 715, w: 680, h: 110, data: { label: 'SALIDA CONSOLIDADA · 0 ERRORES', sublabel: 'ENTREGA DETERMINISTA VERIFICADA' }, col: finalColor, tag: 'OUTPUT' }
      ];

      MC.strokePath(ctx, [
        { x: 480, y: 285 }, { x: 480, y: 345 }, { x: 250, y: 345 }, { x: 250, y: 400 }
      ], railP(0), inactiveColor, 1.5);
      MC.strokePath(ctx, [
        { x: 480, y: 345 }, { x: 710, y: 345 }, { x: 710, y: 400 }
      ], railP(1), inactiveColor, 1.5);
      MC.strokePath(ctx, [
        { x: 250, y: 550 }, { x: 250, y: 610 }, { x: 480, y: 610 }, { x: 480, y: 660 }
      ], railP(2), inactiveColor, 1.5);
      MC.strokePath(ctx, [
        { x: 710, y: 550 }, { x: 710, y: 610 }, { x: 480, y: 610 }
      ], railP(3), inactiveColor, 1.5);

      packet(250, 345, 250, 610, tFlow + 0.05, 0.62, '#fbbf24', 14);
      packet(710, 345, 710, 610, tFlow + 0.2, 0.62, finalColor, 14);
      if (t >= tSurge) packet(250, 345, 250, 610, tSurge + 0.1, 0.5, '#fbbf24', 12);

      pos.forEach((item, idx) => {
        revealNode(idx, item.x, item.y, item.w, item.h, () => {
          if (mu && mu.drawMechanicalNode) {
            mu.drawMechanicalNode(
              ctx,
              item.x,
              item.y,
              item.w,
              item.h,
              String(item.data.label || '').toUpperCase(),
              String(item.data.sublabel || item.data.sub || ''),
              item.col,
              item.tag
            );
          }
        });
        if (idx === pos.length - 1) drawResolvePulse(item.x, item.y, item.w, item.h);
      });
    } else {
      if (rawNodes.length > 6) {
        throw new Error(`architecture_flow vertical soporta máximo 6 nodos (recibidos ${rawNodes.length}). Divide la arquitectura en dos escenas.`);
      }
      const nodesCount = Math.max(1, rawNodes.length);
      const startY = 230;
      const endY = nodesCount > 4 ? 770 : 740;
      const stepY = nodesCount > 1 ? (endY - startY) / (nodesCount - 1) : 0;

      const nodes = rawNodes.map((n, i) => {
        const node = n && typeof n === 'object' ? n : {};
        const customY = Number(node.y);
        return {
          ...node,
          y: Number.isFinite(customY) ? clamp(customY, 150, 770) : startY + i * stepY,
          color: node.color || (i === 0 ? '#ffffff' : i === nodesCount - 1 ? finalColor : '#fbbf24')
        };
      });

      const nodeW = 720;
      const nodeH = nodesCount > 4 ? Math.max(84, Math.min(116, stepY - 16)) : 116;

      // Collision/safety validation: explicit failure instead of overlapping boxes.
      const MIN_NODE_GAP = 10;
      for (let i = 0; i < nodes.length; i++) {
        const top = nodes[i].y - nodeH / 2;
        const bottom = nodes[i].y + nodeH / 2;
        if (top < 150 || bottom > 830) {
          throw new Error(`architecture_flow: nodo ${i} fuera del área segura (y=${nodes[i].y}, alto=${nodeH}). Rango permitido: 150–830.`);
        }
        if (i > 0) {
          const dy = nodes[i].y - nodes[i - 1].y;
          if (dy < nodeH + MIN_NODE_GAP) {
            throw new Error(`architecture_flow: nodos ${i - 1} y ${i} se solapan (Δy=${dy}px, mínimo ${nodeH + MIN_NODE_GAP}px). Ajusta node.y o reduce el número de nodos.`);
          }
        }
      }

      // Rails draw on before any packet is allowed to travel.
      for (let i = 0; i < nodes.length - 1; i++) {
        const y1 = nodes[i].y + nodeH / 2;
        const y2 = nodes[i + 1].y - nodeH / 2;
        MC.strokePath(ctx, [{ x: cx, y: y1 }, { x: cx, y: y2 }], railP(i), inactiveColor, 1.5);

        const start = tFlow + i * 0.12;
        const color = isSteady ? finalColor : '#fbbf24';
        packet(cx, y1 + 14, cx, y2 - 14, start, 0.6, color, 16);
        packet(cx, y1 + 14, cx, y2 - 14, start + 0.3, 0.6, color, 12);
        if (i === 0 && t >= tSurge) {
          packet(cx, y1 + 14, cx, y2 - 14, tSurge + 0.05, 0.45, '#fbbf24', 12);
        }
      }

      // Feedback/ack wire: draws at resolution, one ack packet returns once.
      if (nodes.length >= 2) {
        const topY = nodes[0].y;
        const botY = nodes[nodes.length - 1].y;
        const wireX = cx - nodeW / 2 - 36;
        const wireP = MC ? MC.progress(t, tResolve - 0.1, 0.45, 'inOutCubic') : (t >= tResolve - 0.1 ? 1 : 0);
        const wirePath = [
          { x: cx - nodeW / 2, y: botY },
          { x: wireX, y: botY },
          { x: wireX, y: topY },
          { x: cx - nodeW / 2, y: topY }
        ];
        MC.strokePath(ctx, wirePath, wireP, isSteady ? finalColor : '#f59e0b', 1.5, [8, 6]);

        if (t >= tAck) {
          const ackP = clamp((t - tAck) / 0.55, 0, 1);
          if (ackP < 1) {
            const pt = MC.pointOnPath(wirePath, MC.ease.inOutCubic(ackP));
            ctx.fillStyle = finalColor;
            ctx.fillRect(pt.x - 6, pt.y - 6, 12, 12);
          }
        }
      }

      nodes.forEach((node, idx) => {
        const activeStroke = (idx === nodes.length - 1 && isSteady) ? finalColor : node.color;
        const badge = node.status || (idx === 0 ? 'INFLOW' : (idx === nodes.length - 1 ? (isSteady ? 'STEADY · OK' : 'SYNCING') : 'BUFFER'));
        revealNode(idx, cx, node.y, nodeW, nodeH, () => {
          if (mu && mu.drawMechanicalNode) {
            mu.drawMechanicalNode(
              ctx,
              cx,
              node.y,
              nodeW,
              nodeH,
              String(node.label || '').toUpperCase(),
              String(node.sublabel || node.sub || ''),
              activeStroke,
              badge
            );
          }
        });
        if (idx === nodes.length - 1) {
          drawResolvePulse(cx, node.y, nodeW, nodeH);
        }
      });
    }

    // --- Queue panel: event-driven fill, then a discrete drain -------------
    const bufY = 915;
    const maxSlots = 8;
    let filledSlots = 0;
    if (t >= tFlow) {
      if (t < tSurge) {
        filledSlots = Math.round((MC ? MC.progress(t, tFlow, 0.5, 'outCubic') : 1) * 5);
      } else if (t < tResolve) {
        filledSlots = 5 + Math.round((MC ? MC.progress(t, tSurge, 0.45, 'outCubic') : 1) * 3);
      } else {
        const drain = MC ? MC.progress(t, tResolve, 0.55, 'inOutCubic') : 1;
        filledSlots = Math.round(lerp(8, 3, drain));
      }
    }
    const slotColor = isSteady ? finalColor : '#f59e0b';

    const panelP = MC ? MC.progress(t, 0.34, 0.32, 'outQuint') : 1;
    if (panelP > 0) {
      ctx.save();
      ctx.globalAlpha *= panelP;
      ctx.beginPath();
      ctx.rect(40, 838, 880 * panelP + 2, 154);
      ctx.clip();
      ctx.fillStyle = '#0a0a0d';
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1.5;
      ctx.fillRect(40, 840, 880, 150);
      ctx.strokeRect(40, 840, 880, 150);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.fillText('COLA DE EJECUCIÓN EN MEMORIA (SLOTS DISCRETOS)', 68, 874);

      ctx.textAlign = 'right';
      ctx.fillStyle = slotColor;
      ctx.fillText(
        isSteady ? `ESTADO ESTABLE: ${filledSlots}/${maxSlots} SLOTS` : (isSurge ? `PICO DE ENTRADA: ${filledSlots}/${maxSlots} SLOTS` : `LLENADO: ${filledSlots}/${maxSlots} SLOTS`),
        892,
        874
      );

      if (mu && mu.drawDiscreteSlots) {
        mu.drawDiscreteSlots(ctx, 480, bufY + 26, filledSlots, maxSlots, slotColor, 82, 54, 14);
      }
      ctx.restore();
    }

    // --- Resolution accent label ------------------------------------------
    const resolvedP = MC ? MC.progress(t, tResolve, 0.4, 'outQuint') : (t >= tResolve ? 1 : 0);
    if (resolvedP > 0) {
      ctx.save();
      ctx.globalAlpha *= resolvedP;
      ctx.textAlign = 'right';
      ctx.fillStyle = finalColor;
      ctx.font = '800 14px "JetBrains Mono", monospace';
      ctx.fillText('✔ FLUJO CONTROLADO', 920, 1018);
      ctx.restore();
    }

    const vo = props.voiceover || props.takeaway || '';
    if (mu && mu.drawSyncCaption) {
      mu.drawSyncCaption(ctx, vo, t, duration, { accent: isSteady ? finalColor : '#fbbf24' });
    }

    ctx.restore();
  }
});
