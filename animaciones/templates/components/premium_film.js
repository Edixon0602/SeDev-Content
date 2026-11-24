// Component: premium_film
// A 30s editorial brand film on a single 1080x1920 canvas.
//
// One protagonist: a thick ceramic rope. It begins as a dense knot, untangles
// under studio light and resolves into a single ring standing on a plaster
// floor. A terracotta band is the only accent; it becomes the detail shot and
// the match cut to the wide.
//
// Renderer: deterministic software-shaded tube (flat-shaded quads with a
// camera-relative 3-point light rig). No WebGL, no external assets.
// Every value is a pure function of t. Seeded PRNG only at init.

window.registerComponent('premium_film', {
  init(container, props) {
    container.innerHTML = `
      <canvas id="premiumFilmCanvas" width="1080" height="1920"
        style="position:absolute;top:0;left:0;width:1080px;height:1920px;display:block;"></canvas>
    `;
    this.canvas = container.querySelector('#premiumFilmCanvas');
    this.ctx = this.canvas.getContext('2d');

    this.grainTile = this.makeNoiseTile(180, 20261113);

    // The tube is drawn into a transparent buffer and composited once with a
    // sub-pixel blur. This softens flat-shaded quad banding without paying the
    // cost of a filter on thousands of individual fills.
    this.tubeCanvas = document.createElement('canvas');
    this.tubeCanvas.width = 1080;
    this.tubeCanvas.height = 1920;
    this.tubeCtx = this.tubeCanvas.getContext('2d');

    // Geometry constants.
    this.R = 315;          // final ring radius
    this.TUBE = 52;        // rope thickness
    this.KNOT_SCALE = 150; // trefoil scale
    this.U_SEG = 440;      // along the rope
    this.V_SEG = 128;      // around the rope
    this.ACCENT_U = 0.90;  // terracotta band position on the final ring
    this.ACCENT_W = 0.115;

    // Camera basis cache (recomputed per frame).
    this._lastFont = '';
    return Promise.resolve();
  },

  makeNoiseTile(size, seed) {
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const g = c.getContext('2d');
    const img = g.createImageData(size, size);
    let s = seed >>> 0;
    for (let i = 0; i < img.data.length; i += 4) {
      s = (s * 1664525 + 1013904223) >>> 0;
      const v = (s >>> 24) & 255;
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
      img.data[i + 3] = 16 + ((s >>> 16) & 22);
    }
    g.putImageData(img, 0, 0);
    return c;
  },

  // ---------- deterministic helpers ----------
  clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; },
  smooth(a, b, v) {
    const p = this.clamp01((v - a) / Math.max(0.0001, b - a));
    return p * p * (3 - 2 * p);
  },
  lerp(a, b, p) { return a + (b - a) * p; },
  easeOutExpo(p) { return p >= 1 ? 1 : 1 - Math.pow(2, -10 * p); },
  springSettle(p) {
    if (p <= 0) return 0;
    if (p >= 1) return 1;
    return 1 - Math.exp(-7 * p) * Math.cos(12 * p);
  },

  font(size, weight) {
    return `${weight || 500} ${size}px "Plus Jakarta Sans", sans-serif`;
  },

  chapterAt(t) {
    const cuts = [4.30, 8.35, 12.40, 16.95, 21.95, 26.35];
    let i = 0;
    while (i < cuts.length && t >= cuts[i]) i++;
    return i;
  },

  // ---------- shape ----------
  morphAmp(t) {
    if (t < 4.30) return 1;
    if (t < 8.35) {
      // Tension: the knot pulls against itself but cannot resolve.
      return 1 - 0.035 * this.smooth(5.0, 6.2, t) + 0.02 * Math.sin(t * 0.9);
    }
    if (t < 12.40) {
      const p = this.smooth(8.55, 12.30, t);
      return this.lerp(0.985, 0.40, p);
    }
    if (t < 16.95) {
      // Last quarter-turn and a clean lock.
      const p = this.springSettle(this.clamp01((t - 12.52) / 1.05));
      return this.lerp(0.40, 0.0, p);
    }
    return 0;
  },

  // Raw centerline in local space (before group transform).
  curvePoint(u, amp, phase) {
    const kx = (Math.sin(u) + 2 * Math.sin(2 * u)) * this.KNOT_SCALE;
    const ky = (Math.cos(u) - 2 * Math.cos(2 * u)) * this.KNOT_SCALE;
    const kz = -Math.sin(3 * u + phase) * 0.9 * this.KNOT_SCALE;
    const cx = Math.cos(u) * this.R;
    const cy = Math.sin(u) * this.R;
    const cz = 0;
    // A gentle breathing scale keeps the knot alive without looking rubbery.
    const a = amp;
    return [
      this.lerp(cx, kx, a),
      this.lerp(cy, ky, a),
      this.lerp(cz, kz, a)
    ];
  },

  groupTransform(t, ch) {
    // Lean and turn the sculpture in space. During the first four chapters the
    // object floats; from the wide chapter on it stands on the floor.
    const onFloor = ch >= 4;
    const groupY = onFloor ? 363 : 0;
    let lean = 0.03;
    let spin = 0.0;
    let tiltX = 0.0;
    if (ch === 0) { lean = 0.04; spin = -0.28 + this.smooth(0, 4.3, t) * 0.16; }
    else if (ch === 1) { lean = 0.02; spin = -0.1 - this.smooth(4.3, 8.35, t) * 0.3; }
    else if (ch === 2) { lean = 0.0; spin = -0.36 + this.smooth(8.35, 12.4, t) * 0.34; }
    else if (ch === 3) { lean = 0.02; spin = 0.0; }
    else if (ch === 4) { lean = 0.115; spin = 0.30; tiltX = -0.055; }
    else if (ch === 5) { lean = 0.20; spin = 0.66; tiltX = -0.03; }
    else { lean = 0.085; spin = 0.26; tiltX = -0.05; }
    return { groupY, lean, spin, tiltX };
  },

  toWorld(p, g) {
    // Rotate around X (tilt back), Z (lean) and Y (turn), then lift.
    let x = p[0], y = p[1], z = p[2];
    const cx = Math.cos(g.tiltX), sx = Math.sin(g.tiltX);
    let y1 = y * cx - z * sx;
    let z1 = y * sx + z * cx;
    const cz = Math.cos(g.lean), sz = Math.sin(g.lean);
    let x2 = x * cz - y1 * sz;
    let y2 = x * sz + y1 * cz;
    const cy = Math.cos(g.spin), sy = Math.sin(g.spin);
    let x3 = x2 * cy + z1 * sy;
    let z3 = -x2 * sy + z1 * cy;
    return [x3, y2 + g.groupY, z3];
  },

  cameraAt(t, ch) {
    let yaw = -0.35, pitch = 0.14, zoom = 0.95, cx = 540, cy = 1100, ty = 0;
    let tx = 0, tz = 0;
    if (ch === 0) {
      const p = this.smooth(0, 4.3, t);
      yaw = -0.40 + p * 0.12;
      pitch = 0.18 - p * 0.02;
      zoom = 0.92 + p * 0.20;
      cy = 1120 - p * 40;
      ty = 8 + p * 18;
    } else if (ch === 1) {
      const p = this.smooth(4.3, 8.35, t);
      yaw = -0.22 - p * 0.26;
      pitch = 0.25 - p * 0.03;
      zoom = 0.86 + p * 0.05;
      cy = 1010 - p * 26;
      ty = 10;
    } else if (ch === 2) {
      const p = this.smooth(8.35, 12.4, t);
      yaw = 0.28 + p * 0.34;
      pitch = 0.34 - p * 0.08;
      zoom = 1.0 + p * 0.18;
      cy = 985 + p * 8;
      cx = 516;
      ty = 15;
    } else if (ch === 3) {
      const p = this.smooth(12.4, 16.95, t);
      yaw = 0.04 + p * 0.10;
      pitch = 0.16 - p * 0.02;
      zoom = 1.98 + p * 0.12;
      // Track the terracotta detail as the shape resolves.
      const amp = this.morphAmp(t);
      const pt = this.curvePoint(this.ACCENT_U * Math.PI * 2, amp, 0);
      const g = this.groupTransform(t, ch);
      const w = this.toWorld(pt, g);
      tx = w[0]; ty = w[1]; tz = w[2];
      cy = 1000;
      // lock impact
      const kick = t >= 13.46 ? Math.exp(-(t - 13.46) * 10) : 0;
      cy += Math.sin((t - 13.46) * 36) * 8 * kick;
      cx += Math.cos((t - 13.46) * 29) * 5 * kick;
    } else if (ch === 4) {
      const p = this.smooth(16.95, 21.95, t);
      yaw = -0.34 + p * 0.46;
      pitch = 0.15 + p * 0.02;
      zoom = 1.08 + p * 0.03;
      cx = 684;
      cy = 1080;
      ty = 385;
    } else if (ch === 5) {
      const p = this.smooth(21.95, 26.35, t);
      // Low, almost floor-level camera: the ring becomes architecture.
      yaw = 0.52 - p * 0.12;
      pitch = -0.035 + p * 0.012;
      zoom = 1.14 + p * 0.04;
      cx = 588 + p * 20;
      cy = 1050 - p * 14;
      ty = 392;
    } else {
      const p = this.smooth(26.35, 30.0, t);
      yaw = 0.25 + p * 0.10;
      pitch = 0.11;
      zoom = 0.72 + p * 0.03;
      cx = 656;
      cy = 1128;
      ty = 398;
    }
    // Barely-there drift: the frame is alive, never shaky.
    yaw += Math.sin(t * 0.29) * 0.008;
    pitch += Math.cos(t * 0.23) * 0.004;
    return { yaw, pitch, zoom, cx, cy, tx, ty, tz, f: 3600 };
  },

  cameraBasis(cam) {
    const cyw = Math.cos(cam.yaw), syw = Math.sin(cam.yaw);
    const cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    const view = { x: syw * cp, y: sp, z: cyw * cp };       // object -> camera
    const right = { x: cyw, y: 0, z: -syw };
    const up = {
      x: -syw * sp,
      y: cp,
      z: -cyw * sp
    };
    return { view, right, up };
  },

  projectWorld(p, cam, basis) {
    const dx = p[0] - cam.tx;
    const dy = p[1] - cam.ty;
    const dz = p[2] - cam.tz;
    const depth = dx * basis.view.x + dy * basis.view.y + dz * basis.view.z;
    const persp = cam.f / Math.max(500, cam.f - depth);
    const sx = cam.cx + (dx * basis.right.x + dy * basis.right.y + dz * basis.right.z) * cam.zoom * persp;
    const sy = cam.cy - (dx * basis.up.x + dy * basis.up.y + dz * basis.up.z) * cam.zoom * persp;
    return { x: sx, y: sy, depth };
  },

  // ---------- tube renderer ----------
  drawRope(out, t, ch, cam) {
    const amp = this.morphAmp(t);
    const g = this.groupTransform(t, ch);
    const phase = ch === 2 ? this.smooth(8.35, 12.4, t) * 0.85 : (ch >= 3 ? 0.85 : 0);
    const basis = this.cameraBasis(cam);
    const U = this.U_SEG, V = this.V_SEG;
    const dark = ch === 1 || ch === 5;
    const ctx = this.tubeCtx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, 1080, 1920);
    ctx.beginPath();
    ctx.rect(0, 0, 1080, 1920);
    ctx.clip();

    // Build rings of vertices (world space).
    const rings = [];
    const centers = [];
    for (let i = 0; i < U; i++) {
      const u = (i / U) * Math.PI * 2;
      const p = this.curvePoint(u, amp, phase);
      const w = this.toWorld(p, g);
      centers.push(w);
      rings.push({ u, w, pts: [] });
    }
    // Tangents and a parallel-transported frame. A per-ring reference vector
    // flips when the tangent goes vertical and leaves a visible seam in the
    // tube, so the frame is carried around the loop instead.
    const tangents = [];
    for (let i = 0; i < U; i++) {
      const prev = centers[(i - 1 + U) % U];
      const next = centers[(i + 1) % U];
      let tx = next[0] - prev[0], ty = next[1] - prev[1], tz = next[2] - prev[2];
      const tl = Math.hypot(tx, ty, tz) || 1;
      tangents.push([tx / tl, ty / tl, tz / tl]);
    }
    // Seed normal perpendicular to the first tangent.
    let n0 = [0, 1, 0];
    if (Math.abs(tangents[0][1]) > 0.9) n0 = [1, 0, 0];
    let nx = tangents[0][1] * n0[2] - tangents[0][2] * n0[1];
    let ny = tangents[0][2] * n0[0] - tangents[0][0] * n0[2];
    let nz = tangents[0][0] * n0[1] - tangents[0][1] * n0[0];
    let nl = Math.hypot(nx, ny, nz) || 1;
    nx /= nl; ny /= nl; nz /= nl;

    const frames = [];
    let fnx = nx, fny = ny, fnz = nz;
    const rotFrame = (nx0, ny0, nz0, tp, tc) => {
      let ax = tp[1] * tc[2] - tp[2] * tc[1];
      let ay = tp[2] * tc[0] - tp[0] * tc[2];
      let az = tp[0] * tc[1] - tp[1] * tc[0];
      const al = Math.hypot(ax, ay, az);
      if (al < 1e-7) return [nx0, ny0, nz0];
      ax /= al; ay /= al; az /= al;
      const ang = Math.acos(Math.max(-1, Math.min(1, tp[0] * tc[0] + tp[1] * tc[1] + tp[2] * tc[2])));
      const ca = Math.cos(ang), sa = Math.sin(ang), va = 1 - ca;
      const dot = nx0 * ax + ny0 * ay + nz0 * az;
      const crx = ay * nz0 - az * ny0;
      const cry = az * nx0 - ax * nz0;
      const crz = ax * ny0 - ay * nx0;
      return [
        nx0 * ca + crx * sa + ax * dot * va,
        ny0 * ca + cry * sa + ay * dot * va,
        nz0 * ca + crz * sa + az * dot * va
      ];
    };
    const ortho = (v, tc) => {
      const d = v[0] * tc[0] + v[1] * tc[1] + v[2] * tc[2];
      let x = v[0] - tc[0] * d, y = v[1] - tc[1] * d, z = v[2] - tc[2] * d;
      const l = Math.hypot(x, y, z) || 1;
      return [x / l, y / l, z / l];
    };

    for (let i = 0; i < U; i++) {
      if (i > 0) {
        const r = rotFrame(fnx, fny, fnz, tangents[i - 1], tangents[i]);
        fnx = r[0]; fny = r[1]; fnz = r[2];
      }
      const n = ortho([fnx, fny, fnz], tangents[i]);
      fnx = n[0]; fny = n[1]; fnz = n[2];
      const tc = tangents[i];
      const b = [
        tc[1] * n[2] - tc[2] * n[1],
        tc[2] * n[0] - tc[0] * n[2],
        tc[0] * n[1] - tc[1] * n[0]
      ];
      frames.push({ n, b });
    }

    // The transported frame does not close exactly on a knot; distribute the
    // residual twist across the loop instead of pinching it into one seam.
    const seedN = frames[0].n;
    const closeRaw = rotFrame(frames[U - 1].n[0], frames[U - 1].n[1], frames[U - 1].n[2], tangents[U - 1], tangents[0]);
    const closeN = ortho(closeRaw, tangents[0]);
    const t0 = tangents[0];
    const cx0 = closeN[1] * seedN[2] - closeN[2] * seedN[1];
    const cy0 = closeN[2] * seedN[0] - closeN[0] * seedN[2];
    const cz0 = closeN[0] * seedN[1] - closeN[1] * seedN[0];
    const theta = Math.atan2(cx0 * t0[0] + cy0 * t0[1] + cz0 * t0[2],
      closeN[0] * seedN[0] + closeN[1] * seedN[1] + closeN[2] * seedN[2]);

    for (let i = 0; i < U; i++) {
      const tc = tangents[i];
      const n0f = frames[i].n;
      const ang = theta * (i / U);
      let ax = tc[0], ay = tc[1], az = tc[2];
      const ca = Math.cos(ang), sa = Math.sin(ang), va = 1 - ca;
      const dot = n0f[0] * ax + n0f[1] * ay + n0f[2] * az;
      const crx = ay * n0f[2] - az * n0f[1];
      const cry = az * n0f[0] - ax * n0f[2];
      const crz = ax * n0f[1] - ay * n0f[0];
      const n = [
        n0f[0] * ca + crx * sa + ax * dot * va,
        n0f[1] * ca + cry * sa + ay * dot * va,
        n0f[2] * ca + crz * sa + az * dot * va
      ];
      const b = [
        tc[1] * n[2] - tc[2] * n[1],
        tc[2] * n[0] - tc[0] * n[2],
        tc[0] * n[1] - tc[1] * n[0]
      ];
      const base = centers[i];
      // Whole turns of the subtle thickness variation keep the loop sealed.
      const radius = this.TUBE * (1 + 0.035 * Math.sin((i / U) * Math.PI * 6 + 0.6));
      for (let j = 0; j <= V; j++) {
        const a = (j / V) * Math.PI * 2;
        const c = Math.cos(a), s = Math.sin(a);
        const wx = base[0] + (n[0] * c + b[0] * s) * radius;
        const wy = base[1] + (n[1] * c + b[1] * s) * radius;
        const wz = base[2] + (n[2] * c + b[2] * s) * radius;
        // World normal = cross-section radial direction.
        const wnx = n[0] * c + b[0] * s;
        const wny = n[1] * c + b[1] * s;
        const wnz = n[2] * c + b[2] * s;
        rings[i].pts.push({
          w: [wx, wy, wz],
          s: this.projectWorld([wx, wy, wz], cam, basis),
          n: [wnx, wny, wnz]
        });
      }
    }

    // Close the tube seamlessly.
    rings.push(rings[0]);

    // Collect camera-facing quads, painter-sorted far to near.
    const quads = [];
    for (let i = 0; i < U; i++) {
      const accent = this.isAccent(i / U);
      for (let j = 0; j < V; j++) {
        const a = rings[i].pts[j];
        const b = rings[i].pts[j + 1];
        const c = rings[i + 1].pts[j + 1];
        const d = rings[i + 1].pts[j];
        const nx = (a.n[0] + b.n[0] + c.n[0] + d.n[0]) * 0.25;
        const ny = (a.n[1] + b.n[1] + c.n[1] + d.n[1]) * 0.25;
        const nz = (a.n[2] + b.n[2] + c.n[2] + d.n[2]) * 0.25;
        const facing = nx * basis.view.x + ny * basis.view.y + nz * basis.view.z;
        if (facing <= 0.015) continue;
        // Camera-space normal for stable studio lighting.
        const cnx = nx * basis.right.x + ny * basis.right.y + nz * basis.right.z;
        const cny = nx * basis.up.x + ny * basis.up.y + nz * basis.up.z;
        const cnz = facing;
        const color = this.shade(cnx, cny, cnz, accent, dark);
        const depth = (a.s.depth + b.s.depth + c.s.depth + d.s.depth) * 0.25;
        quads.push({ a, b, c, d, color, depth });
      }
    }
    quads.sort((q1, q2) => q1.depth - q2.depth);

    // Draw. Expand each quad a hair to kill hairline seams.
    for (let k = 0; k < quads.length; k++) {
      const q = quads[k];
      const mx = (q.a.s.x + q.b.s.x + q.c.s.x + q.d.s.x) * 0.25;
      const my = (q.a.s.y + q.b.s.y + q.c.s.y + q.d.s.y) * 0.25;
      const pts = [q.a.s, q.b.s, q.c.s, q.d.s];
      ctx.beginPath();
      for (let n = 0; n < 4; n++) {
        const p = pts[n];
        const dx = p.x - mx, dy = p.y - my;
        const l = Math.hypot(dx, dy) || 1;
        const kk = (l + 0.55) / l;
        const x = mx + dx * kk;
        const y = my + dy * kk;
        if (n === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = q.color;
      ctx.fill();
      // Same-color hairline stroke seals the seams between adjacent quads.
      ctx.strokeStyle = q.color;
      ctx.lineWidth = 0.9;
      ctx.stroke();
    }

    out.save();
    out.filter = 'blur(0.55px)';
    out.drawImage(this.tubeCanvas, 0, 0);
    out.restore();
  },

  isAccent(u) {
    let d = u - this.ACCENT_U;
    if (d < -0.5) d += 1;
    if (d > 0.5) d -= 1;
    return Math.abs(d) < this.ACCENT_W / 2;
  },

  shade(nx, ny, nz, accent, dark) {
    // Camera-relative three-point rig. Broad, soft specular: glazed ceramic,
    // not chrome. The rim stays subtle so the silhouette reads as mass.
    const key = Math.max(0, nx * -0.48 + ny * 0.70 + nz * 0.56);
    const fill = Math.max(0, nx * 0.62 + ny * 0.05 + nz * 0.34);
    const rimBase = Math.max(0, nx * 0.66 + ny * 0.16 - nz * 0.64);
    const rim = Math.pow(rimBase, 2.2);
    const spec = Math.pow(Math.max(0, nx * -0.30 + ny * 0.52 + nz * 0.80), 20);

    if (accent) {
      if (dark) {
        const r = 108 * (0.10 + key * 0.30 + fill * 0.08) + 214 * rim * 0.75 + spec * 34;
        const g = 52 * (0.10 + key * 0.26 + fill * 0.06) + 116 * rim * 0.75 + spec * 23;
        const b = 34 * (0.10 + key * 0.22) + 72 * rim * 0.75 + spec * 16;
        return `rgb(${Math.min(255, r) | 0},${Math.min(255, g) | 0},${Math.min(255, b) | 0})`;
      }
      const base = 0.30 + key * 0.56 + fill * 0.12;
      const r = 202 * base + 26 * rim + spec * 52;
      const g = 96 * base + 16 * rim + spec * 40;
      const b = 60 * base + 11 * rim + spec * 30;
      return `rgb(${Math.min(255, r) | 0},${Math.min(255, g) | 0},${Math.min(255, b) | 0})`;
    }

    if (dark) {
      const base = 0.10 + key * 0.24 + fill * 0.06;
      const r = 240 * base + 244 * rim * 0.92 + spec * 74;
      const g = 232 * base + 168 * rim * 0.92 + spec * 60;
      const b = 218 * base + 118 * rim * 0.92 + spec * 46;
      return `rgb(${Math.min(255, r) | 0},${Math.min(255, g) | 0},${Math.min(255, b) | 0})`;
    }

    const base = 0.255 + key * 0.56 + fill * 0.13;
    const r = 243 * base + spec * 46 + rim * 8;
    const g = 236 * base + spec * 40 + rim * 5;
    const b = 224 * base + spec * 32 + rim * 3;
    return `rgb(${Math.min(255, r) | 0},${Math.min(255, g) | 0},${Math.min(255, b) | 0})`;
  },

  // ---------- backdrop, floor, shadow ----------
  drawBackdrop(ctx, t, ch, cam, basis) {
    let top, bottom, pool, poolAlpha;
    if (ch === 1) {
      top = '#171412'; bottom = '#080706';
      pool = 'rgba(172,98,56,0.22)'; poolAlpha = 0.9;
    } else if (ch === 5) {
      top = '#12100e'; bottom = '#050504';
      pool = 'rgba(184,106,62,0.26)'; poolAlpha = 1;
    } else if (ch === 2) {
      top = '#f0ece4'; bottom = '#ded7ca';
      pool = 'rgba(255,252,245,0.85)'; poolAlpha = 1;
    } else if (ch === 3) {
      top = '#f6f0e5'; bottom = '#e4dbcc';
      pool = 'rgba(255,251,242,0.9)'; poolAlpha = 1;
    } else {
      top = '#f5efe4'; bottom = '#e0d6c6';
      pool = 'rgba(255,252,246,0.9)'; poolAlpha = 1;
    }

    const g = ctx.createLinearGradient(0, 0, 0, 1920);
    g.addColorStop(0, top);
    g.addColorStop(1, bottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 1080, 1920);

    const px = ch === 1 ? 760 : ch === 5 ? 820 : 340;
    const py = ch === 1 ? 1200 : ch === 5 ? 1250 : 360;
    const rad = ctx.createRadialGradient(px, py, 30, px, py, 980);
    rad.addColorStop(0, pool);
    rad.addColorStop(0.5, pool.replace(/[\d.]+\)$/, '0.13)'));
    rad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.save();
    ctx.globalAlpha = poolAlpha;
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, 1080, 1920);
    ctx.restore();

    const onFloor = ch >= 4;
    if (onFloor) {
      const floorScreen = this.projectWorld([0, 0, 0], cam, basis);
      const floorY = Math.min(1740, Math.max(1180, floorScreen.y));
      const fg = ctx.createLinearGradient(0, floorY, 0, 1920);
      if (ch === 5) {
        fg.addColorStop(0, '#151210');
        fg.addColorStop(1, '#070605');
      } else if (ch === 6) {
        fg.addColorStop(0, '#e8dece');
        fg.addColorStop(1, '#d8cdbb');
      } else {
        fg.addColorStop(0, '#e9dfcf');
        fg.addColorStop(1, '#d8ccba');
      }
      ctx.fillStyle = fg;
      ctx.fillRect(0, floorY, 1080, 1920 - floorY);
      ctx.strokeStyle = ch === 5 ? 'rgba(255,205,160,0.10)' : 'rgba(92,80,63,0.15)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(0, floorY + 0.5);
      ctx.lineTo(1080, floorY + 0.5);
      ctx.stroke();
    }

    // Studio sweep in the wide shots, never a gradient-on-a-slide.
    let sweep = 0;
    if (ch === 4) sweep = this.smooth(17.8, 18.7, t) * (1 - this.smooth(20.1, 21.2, t));
    if (ch === 6) sweep = this.smooth(28.2, 28.9, t) * (1 - this.smooth(29.5, 30, t));
    if (sweep > 0.001) {
      const sx = this.lerp(180, 1100, this.smooth(17.8, 21.4, t));
      const sg = ctx.createLinearGradient(sx - 420, 0, sx + 420, 0);
      sg.addColorStop(0, 'rgba(255,248,232,0)');
      sg.addColorStop(0.5, 'rgba(255,248,232,0.13)');
      sg.addColorStop(1, 'rgba(255,248,232,0)');
      ctx.save();
      ctx.globalCompositeOperation = 'soft-light';
      ctx.globalAlpha = sweep;
      ctx.fillStyle = sg;
      ctx.fillRect(0, 0, 1080, 1920);
      ctx.restore();
    }
  },

  drawFloorShadow(ctx, t, ch, cam, basis) {
    if (ch < 4) return;
    const floor = this.projectWorld([0, 0, 0], cam, basis);
    const zoom = cam.zoom;
    const dark = ch === 5;
    ctx.save();
    ctx.translate(floor.x + 104 * zoom, floor.y - 8);
    ctx.rotate(0.10);
    ctx.scale(1, 0.16);
    ctx.shadowColor = dark ? 'rgba(0,0,0,0.55)' : 'rgba(54,40,26,0.52)';
    ctx.shadowBlur = 46;
    ctx.strokeStyle = dark ? 'rgba(0,0,0,0.42)' : 'rgba(54,40,26,0.34)';
    ctx.lineWidth = this.TUBE * 2.1 * zoom;
    ctx.beginPath();
    ctx.arc(0, 0, this.R * zoom * 0.98, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Soft ambient pool under the sculpture.
    ctx.save();
    ctx.translate(floor.x + 60, floor.y + 8);
    ctx.scale(1, 0.20);
    const amb = ctx.createRadialGradient(0, 0, 20, 0, 0, 430 * zoom);
    amb.addColorStop(0, dark ? 'rgba(0,0,0,0.42)' : 'rgba(56,42,28,0.30)');
    amb.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = amb;
    ctx.beginPath();
    ctx.arc(0, 0, 430 * zoom, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // ---------- typography ----------
  measure(text, size, weight, spacing) {
    const ctx = this.ctx;
    ctx.save();
    ctx.font = this.font(size, weight);
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${spacing || 0}px`;
    const w = ctx.measureText(text).width;
    ctx.restore();
    return w;
  },

  text(text, opts) {
    const ctx = this.ctx;
    const size = opts.size || 64;
    const weight = opts.weight || 500;
    const spacing = opts.spacing || 0;
    const align = opts.align || 'left';
    const p = this.easeOutExpo(this.clamp01(opts.p === undefined ? 1 : opts.p));
    if (p <= 0.001) return;
    const rise = (1 - p) * (opts.rise === undefined ? size * 0.3 : opts.rise);
    const y = opts.y + rise;
    ctx.save();
    ctx.font = this.font(size, weight);
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${spacing}px`;
    ctx.textAlign = align;
    ctx.globalAlpha = (opts.alpha === undefined ? 1 : opts.alpha) * Math.min(1, p * 1.35);
    ctx.fillStyle = opts.color || '#171410';
    const w = ctx.measureText(text).width;
    const left = align === 'right' ? opts.x - w : align === 'center' ? opts.x - w / 2 : opts.x;
    ctx.fillText(text, opts.x, y);
    ctx.restore();
  },

  richLine(parts, opts) {
    const ctx = this.ctx;
    const size = opts.size;
    const spacing = opts.spacing || 0;
    const p = this.easeOutExpo(this.clamp01(opts.p === undefined ? 1 : opts.p));
    if (p <= 0.001) return;
    ctx.save();
    ctx.font = this.font(size, opts.weight || 500);
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${spacing}px`;
    let total = 0;
    for (const part of parts) total += ctx.measureText(part.text).width;
    let x = opts.align === 'right' ? opts.x - total : opts.x;
    const y = opts.y + (1 - p) * size * 0.3;
    ctx.globalAlpha = Math.min(1, p * 1.35);
    for (const part of parts) {
      ctx.fillStyle = part.color;
      ctx.fillText(part.text, x, y);
      x += ctx.measureText(part.text).width;
    }
    ctx.restore();
  },

  drawType(ctx, t, ch) {
    const ink = '#171410';
    const ash = '#776e60';
    const bone = '#f3ecdf';
    const terra = '#b45632';
    const terraDark = '#d68a61';

    if (ch === 0) {
      const ct = t;
      this.text('Todo', { x: 104, y: 318, size: 108, weight: 500, spacing: -1.8, color: ink,
        p: this.smooth(0.30, 0.98, ct) });
      this.text('está aquí.', { x: 104, y: 428, size: 108, weight: 500, spacing: -1.8, color: ink,
        p: this.smooth(0.46, 1.14, ct) });
      this.text('solo enredado.', { x: 108, y: 512, size: 30, weight: 500, spacing: 0.2, color: ash,
        p: this.smooth(1.35, 2.05, ct) });
    } else if (ch === 1) {
      const ct = t - 4.30;
      this.text('Tirar', { x: 100, y: 1532, size: 136, weight: 500, spacing: -3, color: bone,
        p: this.smooth(0.55, 1.25, ct) });
      this.richLine([
        { text: 'no lo ', color: bone },
        { text: 'desata.', color: terraDark }
      ], { x: 100, y: 1672, size: 136, weight: 500, spacing: -3, p: this.smooth(0.72, 1.42, ct) });
    } else if (ch === 2) {
      const ct = t - 8.35;
      this.text('Hay que', { x: 972, y: 1428, size: 92, weight: 500, spacing: -1.6, color: ink,
        align: 'right', p: this.smooth(0.72, 1.42, ct) });
      this.text('soltar.', { x: 972, y: 1532, size: 92, weight: 500, spacing: -1.6, color: ink,
        align: 'right', p: this.smooth(0.90, 1.60, ct) });
    } else if (ch === 3) {
      const ct = t - 12.40;
      this.text('Se', { x: 100, y: 352, size: 104, weight: 500, spacing: -2.0, color: ink,
        p: this.smooth(0.42, 1.08, ct) });
      this.text('desata.', { x: 100, y: 454, size: 104, weight: 500, spacing: -2.0, color: ink,
        p: this.smooth(0.58, 1.24, ct) });
    } else if (ch === 4) {
      const ct = t - 16.95;
      this.text('Las mismas', { x: 104, y: 392, size: 84, weight: 500, spacing: -1.4, color: ink,
        p: this.smooth(0.45, 1.17, ct) });
      this.text('piezas.', { x: 104, y: 486, size: 84, weight: 500, spacing: -1.4, color: ink,
        p: this.smooth(0.61, 1.33, ct) });
      const p2 = this.smooth(2.05, 2.80, ct);
      this.text('Otra forma.', { x: 104, y: 660, size: 84, weight: 500, spacing: -1.4, color: terra, p: p2 });
      if (p2 > 0.01) {
        ctx.save();
        ctx.globalAlpha = p2 * 0.9;
        ctx.fillStyle = 'rgba(180,86,50,0.55)';
        ctx.fillRect(104, 698, 88 * p2, 2);
        ctx.restore();
      }
    } else if (ch === 5) {
      const ct = t - 21.95;
      this.text('El ruido', { x: 100, y: 1568, size: 104, weight: 500, spacing: -2.2, color: bone,
        p: this.smooth(0.36, 1.06, ct) });
      this.text('se calla.', { x: 100, y: 1680, size: 104, weight: 500, spacing: -2.2, color: bone,
        p: this.smooth(0.54, 1.24, ct) });
    } else {
      const ct = t - 26.35;
      this.text('Simple.', { x: 100, y: 486, size: 218, weight: 500, spacing: -5.2, color: ink,
        p: this.smooth(0.34, 1.16, ct) });
      const pb = this.smooth(1.9, 2.5, ct);
      if (pb > 0.001) {
        ctx.save();
        ctx.globalAlpha = pb;
        ctx.fillStyle = terra;
        ctx.fillRect(106, 1590, 52, 2.5);
        ctx.restore();
        this.text('SeDev', { x: 104, y: 1678, size: 54, weight: 700, spacing: 0.4, color: ink, p: pb });
        this.text('software que se siente simple', { x: 106, y: 1730, size: 28, weight: 500, spacing: 0.2, color: ash, p: pb });
      }
    }
  },

  drawGrainAndGrade(ctx, t, ch) {
    const dark = ch === 1 || ch === 5;
    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.globalAlpha = dark ? 0.095 : 0.058;
    const pat = ctx.createPattern(this.grainTile, 'repeat');
    if (pat) {
      ctx.fillStyle = pat;
      ctx.fillRect(0, 0, 1080, 1920);
    }
    ctx.restore();

    const vig = ctx.createRadialGradient(540, 900, 420, 540, 960, 1180);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(0.72, dark ? 'rgba(0,0,0,0.20)' : 'rgba(38,28,16,0.05)');
    vig.addColorStop(1, dark ? 'rgba(0,0,0,0.58)' : 'rgba(38,28,16,0.17)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, 1080, 1920);
  },

  render(container, t, duration, props, utils) {
    const ctx = this.ctx;
    const ch = this.chapterAt(t);
    const cam = this.cameraAt(t, ch);
    const basis = this.cameraBasis(cam);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, 1080, 1920);
    ctx.save();
    // The frame is the frame: everything is clipped to the stage.
    ctx.beginPath();
    ctx.rect(0, 0, 1080, 1920);
    ctx.clip();

    this.drawBackdrop(ctx, t, ch, cam, basis);
    this.drawFloorShadow(ctx, t, ch, cam, basis);

    ctx.__premiumFirst = true;
    this.drawRope(ctx, t, ch, cam);
    ctx.__premiumFirst = false;

    this.drawType(ctx, t, ch);
    this.drawGrainAndGrade(ctx, t, ch);

    // Cut transitions are bridged by a short exposure lift, the way a studio
    // film cuts between lighting setups. Object, color and grain stay put.
    const cuts = [4.30, 8.35, 12.40, 16.95, 21.95, 26.35];
    for (const c of cuts) {
      const d = t - c;
      if (d >= 0 && d < 0.18) {
        const a = 0.14 * Math.pow(1 - d / 0.18, 2.4);
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = '#fff8ec';
        ctx.fillRect(0, 0, 1080, 1920);
        ctx.restore();
      }
    }

    // The film ends on the poster frame, not on a fade. The last visible idea
    // is the object, the word and the mark in a single held composition.
    ctx.restore();
  }
});
