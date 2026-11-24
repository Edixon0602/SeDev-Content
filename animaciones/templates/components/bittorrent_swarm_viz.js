// Component: bittorrent_swarm_viz
// Visceral Distributed Network Topology & Game-Theoretic Swarm Engine
// Visualizes the P2P Mesh Network, Tit-for-Tat algorithm, active packet routing,
// bandwidth metrics, and dynamic Choking / Unchoking of peers.

window.registerComponent('bittorrent_swarm_viz', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-bt-swarm">
        <canvas id="btCanvas" width="960" height="1360"></canvas>
      </div>
    `;
    this.canvas = container.querySelector('#btCanvas');
    this.ctx = this.canvas.getContext('2d');
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp, lerp } = utils;
    const mu = window.motionUtils;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 960, 1360);

    const title = (props.title || 'ENJAMBRE P2P: DINÁMICA DE RED Y TIT-FOR-TAT').toUpperCase();
    const subtitle = (props.subtitle || 'TOPOLOGÍA DESCENTRALIZADA SIN SERVIDOR CENTRAL').toUpperCase();

    // 1. Clean Monospace Header
    ctx.textAlign = 'left';
    ctx.fillStyle = '#10b981';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText(subtitle, 40, 42);

    ctx.fillStyle = '#ffffff';
    if (mu) {
      mu.fitText(ctx, title, 40, 92, 880, 38, 24, '"Plus Jakarta Sans", sans-serif', '900');
    }

    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, 118);
    ctx.lineTo(920, 118);
    ctx.stroke();

    const boxX = 40;
    const boxW = 880;

    // Phase transition: t < 4.0s is mesh handshake & discovery; t >= 4.0s activates Tit-for-Tat choking/unchoking
    const isTitForTatActive = t >= (duration * 0.42);

    // 2. High-Impact Status Banner
    const statusY = 140;
    const statusH = 76;
    const accentColor = isTitForTatActive ? '#10b981' : '#38bdf8';
    ctx.fillStyle = '#0a0a0f';
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1.5;
    ctx.fillRect(boxX, statusY, boxW, statusH);
    ctx.strokeRect(boxX, statusY, boxW, statusH);
    ctx.fillStyle = accentColor;
    ctx.fillRect(boxX, statusY, 6, statusH);

    ctx.textAlign = 'left';
    ctx.fillStyle = accentColor;
    ctx.font = '800 17px "JetBrains Mono", monospace';
    const bannerTitle = isTitForTatActive
      ? 'ALGORITMO TIT-FOR-TAT ACTIVO: PRIORIZA AL QUE MÁS ANCHO DE BANDA APORTA'
      : 'DESCUBRIMIENTO DISTRIBUIDO: PEERS CONECTADOS POR TABLA DHT (SIN TRACKER)';
    ctx.fillText(bannerTitle, boxX + 24, statusY + 34);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    const bannerSub = isTitForTatActive
      ? 'Peer egoísta (Free-rider) detectado -> Estrangulado (CHOKED). Velocidad asignada a los colaboradores.'
      : 'Cada nodo descarga bloques de varios peers en simultáneo y los retransmite de inmediato.';
    ctx.fillText(bannerSub, boxX + 24, statusY + 58);

    // 3. Central Swarm Network Stage (y = 240..980, height = 740)
    const stageY = 240;
    const stageH = 740;
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.fillRect(boxX, stageY, boxW, stageH);
    ctx.strokeRect(boxX, stageY, boxW, stageH);

    // Subtle radial grid in stage
    const cx = boxX + boxW / 2;
    const cy = stageY + stageH / 2 - 20;

    ctx.strokeStyle = '#141419';
    ctx.lineWidth = 1;
    [100, 200, 300].forEach(r => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // 8 Specialized Peers in Swarm Orbit
    const peers = [
      { id: 'SEED_ALPHA', role: 'SEED', percent: '100%', up: '18.4 MB/s', down: '--', state: 'OPTIMISTIC', color: '#10b981' },
      { id: 'LEECHER_01', role: 'PEER', percent: '78%', up: '12.1 MB/s', down: '15.6 MB/s', state: 'UNCHOKED', color: '#38bdf8' },
      { id: 'LEECHER_02', role: 'PEER', percent: '64%', up: '9.4 MB/s', down: '11.8 MB/s', state: 'UNCHOKED', color: '#38bdf8' },
      { id: 'FREE_RIDER', role: 'LEECH', percent: '12%', up: '0.0 MB/s', down: isTitForTatActive ? '0.2 MB/s' : '4.5 MB/s', state: isTitForTatActive ? 'CHOKED' : 'EVALUATING', color: isTitForTatActive ? '#ef4444' : '#fbbf24' },
      { id: 'SEED_BETA', role: 'SEED', percent: '100%', up: '22.0 MB/s', down: '--', state: 'SEEDING', color: '#10b981' },
      { id: 'LEECHER_04', role: 'PEER', percent: '45%', up: '8.7 MB/s', down: '9.2 MB/s', state: 'UNCHOKED', color: '#38bdf8' },
      { id: 'LEECHER_05', role: 'PEER', percent: '89%', up: '14.5 MB/s', down: '18.0 MB/s', state: 'UNCHOKED', color: '#38bdf8' },
      { id: 'LEECHER_06', role: 'PEER', percent: '31%', up: '6.2 MB/s', down: '7.5 MB/s', state: 'UNCHOKED', color: '#38bdf8' }
    ];

    const numPeers = peers.length;
    const orbitRadius = 240;
    const peerCoords = [];

    for (let i = 0; i < numPeers; i++) {
      const ang = (i / numPeers) * Math.PI * 2 - Math.PI / 2;
      peerCoords.push({
        x: cx + Math.cos(ang) * orbitRadius,
        y: cy + Math.sin(ang) * orbitRadius
      });
    }

    // Draw Dynamic Inter-Peer Mesh Cables
    for (let i = 0; i < numPeers; i++) {
      for (let j = i + 1; j < numPeers; j++) {
        const isFreeRiderLink = (i === 3 || j === 3);
        const isLinkChoked = isTitForTatActive && isFreeRiderLink;

        ctx.strokeStyle = isLinkChoked ? 'rgba(239, 68, 68, 0.15)' : 'rgba(39, 39, 42, 0.6)';
        ctx.lineWidth = isLinkChoked ? 1 : 1.5;
        ctx.beginPath();
        ctx.moveTo(peerCoords[i].x, peerCoords[i].y);
        ctx.lineTo(peerCoords[j].x, peerCoords[j].y);
        ctx.stroke();

        // Flying data packets along active, unchoked mesh cables
        if (!isLinkChoked && (i + j) % 2 === 0) {
          const speed = (i * 0.4 + j * 0.2 + 1.8);
          const p = (t * speed) % 1;
          const px = lerp(peerCoords[i].x, peerCoords[j].x, p);
          const py = lerp(peerCoords[i].y, peerCoords[j].y, p);

          ctx.fillStyle = (i === 0 || i === 4) ? '#10b981' : '#38bdf8';
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Draw Center Swarm Nexus Telemetry
    const hubW = 260;
    const hubH = 110;
    ctx.fillStyle = '#0e0e13';
    ctx.strokeStyle = isTitForTatActive ? '#10b981' : '#38bdf8';
    ctx.lineWidth = 2;
    ctx.fillRect(cx - hubW / 2, cy - hubH / 2, hubW, hubH);
    ctx.strokeRect(cx - hubW / 2, cy - hubH / 2, hubW, hubH);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#71717a';
    ctx.font = '700 12px "JetBrains Mono", monospace';
    ctx.fillText('ANCHO DE BANDA GLOBAL', cx, cy - 26);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 28px "JetBrains Mono", monospace';
    const liveSpeed = (450 + Math.sin(t * 3) * 35 + (isTitForTatActive ? 750 : 0)).toFixed(0);
    ctx.fillText(`${liveSpeed} MB/s`, cx, cy + 8);

    ctx.fillStyle = isTitForTatActive ? '#10b981' : '#fbbf24';
    ctx.font = '800 12px "JetBrains Mono", monospace';
    ctx.fillText(isTitForTatActive ? '✔ EFICIENCIA: 98.4% (SIN CUELLO)' : '⚡ ENJAMBRE ACELERANDO...', cx, cy + 34);

    // Draw Peer Nodes with Individual Status Badges
    peers.forEach((peer, idx) => {
      const { x, y } = peerCoords[idx];
      const isChoked = peer.state === 'CHOKED';

      // Outer glow ring
      ctx.fillStyle = isChoked ? '#1f0c0f' : '#0c1015';
      ctx.strokeStyle = peer.color;
      ctx.lineWidth = isChoked ? 2 : 2.5;
      ctx.beginPath();
      ctx.arc(x, y, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Node label
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(peer.id, x, y - 8);

      // Sub-label (Role & progress)
      ctx.fillStyle = peer.color;
      ctx.font = '700 11px "JetBrains Mono", monospace';
      ctx.fillText(peer.role === 'SEED' ? 'SEED 100%' : `${peer.percent}`, x, y + 8);

      // Up/Down rate pill below node
      ctx.fillStyle = isChoked ? '#ef4444' : '#18181f';
      ctx.strokeStyle = isChoked ? '#ef4444' : '#27272a';
      ctx.lineWidth = 1;
      const pillW = 86;
      const pillH = 20;
      ctx.fillRect(x - pillW / 2, y + 26, pillW, pillH);
      ctx.strokeRect(x - pillW / 2, y + 26, pillW, pillH);

      ctx.fillStyle = isChoked ? '#ffffff' : '#a1a1aa';
      ctx.font = '700 10px "JetBrains Mono", monospace';
      ctx.fillText(isChoked ? 'CHOKED' : `↑${peer.up}`, x, y + 40);
    });

    // 4. Bottom Engineering Analysis Panel (y = 1000..1280)
    const botY = 1000;
    const botH = 280;
    ctx.fillStyle = '#09090c';
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.fillRect(boxX, botY, boxW, botH);
    ctx.strokeRect(boxX, botY, boxW, botH);

    // Telemetry Columns
    const colW = (boxW - 48) / 3;

    // Col 1: Tit-for-Tat Rule
    ctx.fillStyle = '#111116';
    ctx.fillRect(boxX + 16, botY + 16, colW, botH - 32);
    ctx.strokeStyle = '#10b981';
    ctx.strokeRect(boxX + 16, botY + 16, colW, botH - 32);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#10b981';
    ctx.font = '800 14px "JetBrains Mono", monospace';
    ctx.fillText('1. REGLA TIT-FOR-TAT', boxX + 32, botY + 48);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Incentivo de Juego:', boxX + 32, botY + 80);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillText('Si subes a 20 MB/s,', boxX + 32, botY + 108);
    ctx.fillText('el enjambre te da', boxX + 32, botY + 130);
    ctx.fillText('prioridad máxima.', boxX + 32, botY + 152);
    ctx.fillStyle = '#10b981';
    ctx.fillText('Premio: Máx velocidad.', boxX + 32, botY + 190);

    // Col 2: Anti Free-Riding
    ctx.fillStyle = '#111116';
    ctx.fillRect(boxX + 24 + colW, botY + 16, colW, botH - 32);
    ctx.strokeStyle = '#ef4444';
    ctx.strokeRect(boxX + 24 + colW, botY + 16, colW, botH - 32);

    ctx.fillStyle = '#ef4444';
    ctx.font = '800 14px "JetBrains Mono", monospace';
    ctx.fillText('2. ANTI FREE-RIDER', boxX + 40 + colW, botY + 48);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Estrangulamiento:', boxX + 40 + colW, botY + 80);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillText('Si limitas tu subida', boxX + 40 + colW, botY + 108);
    ctx.fillText('a 0 KB/s, los peers', boxX + 40 + colW, botY + 130);
    ctx.fillText('te marcan CHOKED.', boxX + 40 + colW, botY + 152);
    ctx.fillStyle = '#ef4444';
    ctx.fillText('Castigo: Tu bajada muere.', boxX + 40 + colW, botY + 190);

    // Col 3: Scalability Paradox
    ctx.fillStyle = '#111116';
    ctx.fillRect(boxX + 32 + colW * 2, botY + 16, colW, botH - 32);
    ctx.strokeStyle = '#38bdf8';
    ctx.strokeRect(boxX + 32 + colW * 2, botY + 16, colW, botH - 32);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 14px "JetBrains Mono", monospace';
    ctx.fillText('3. LA PARADOJA P2P', boxX + 48 + colW * 2, botY + 48);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Escala Invertida:', boxX + 48 + colW * 2, botY + 80);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillText('En HTTP: más gente', boxX + 48 + colW * 2, botY + 108);
    ctx.fillText('= servidor colapsado.', boxX + 48 + colW * 2, botY + 130);
    ctx.fillText('En P2P: más gente', boxX + 48 + colW * 2, botY + 160);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('= MÁS rápido para todos.', boxX + 48 + colW * 2, botY + 190);

  }
});
