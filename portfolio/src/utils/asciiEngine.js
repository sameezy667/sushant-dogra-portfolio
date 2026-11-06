/**
 * @file asciiEngine.js
 * @description ASCII Field Engine — Living glyph lattice behind the whole page.
 *   Smoothly transforms between 5 silicon topologies:
 *     - MAINBOARD: Hero CPU SoC die with radiating pins, ambient PCB traces & packet comets
 *     - NEURAL LATTICE: Synaptic nodes, interconnect lines & traveling axon pulses
 *     - CIPHER FIELD: Cryptographic binary stream, hash noise & scanning bars
 *     - OSCILLOSCOPE: Real-time sine waveforms & measurement graticule grid
 *     - SURFACE: Mathematical liquid wave mesh
 *   Features autonomous neural ribbons, cursor vortex displacement, and shockwaves.
 * @module utils
 */

const REDUCED = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const MONO_CSS = '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace';
const RAMP = [' ', '\u00b7', ':', '-', '=', '+', '*', 'x', '#', '%', '@'];
const CHSET = new Set(RAMP);
'01o'.split('').forEach(c => CHSET.add(c));

const mulberry = (a) => function() {
  a |= 0;
  a = (a + 0x6D2B79F5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

function ihash(n) {
  n = (n ^ 61) ^ (n >>> 16);
  n = (n + (n << 3)) | 0;
  n ^= n >>> 4;
  n = Math.imul(n, 0x27d4eb2d);
  n ^= n >>> 15;
  return (n >>> 0) / 4294967296;
}

export function initAsciiField(canvasEl) {
  const cv = canvasEl;
  if (!cv) return null;
  const ctx = cv.getContext('2d');
  if (!ctx) return null;

  let vw = 0, vh = 0, dpr = 1, cols = 0, rows = 0, N = 0;
  let cellW = 10.6, cellH = 12.4, fpx = 17;
  let energy, hot, dispX, dispY, traces, cpu, neural, neuralOv, grat;
  let nodes = [], packetPaths = [];
  let SPR = new Map();
  let ribbons = [], pulses = [], packets = [], waves = [];
  let t = 0, last = 0, run = false, rafId = 0, fps = 60, curCellI = -1;
  const ptr = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 };

  const MODES = ['mainboard', 'neural', 'cipher', 'oscillo', 'surface'];
  const LABEL = {
    mainboard: 'MAINBOARD',
    neural: 'NEURAL LATTICE',
    cipher: 'CIPHER FIELD',
    oscillo: 'OSCILLOSCOPE',
    surface: 'SURFACE'
  };

  let cur = 'mainboard';
  const W = { mainboard: 1, neural: 0, cipher: 0, oscillo: 0, surface: 0 };
  const T = { mainboard: 1, neural: 0, cipher: 0, oscillo: 0, surface: 0 };
  let onMode = null;

  /* ---------- pre-rendered glyph sprites ---------- */
  function buildSprites() {
    SPR = new Map();
    // Earthy Elegance / Editorial palette: Deep Ink (#26231d) & Vibrant Amber (#d95b26)
    const colors = ['rgba(38, 35, 29, 1)', 'rgba(217, 91, 38, 1)'];
    CHSET.forEach(ch => {
      for (let ci = 0; ci < 2; ci++) {
        const sc = document.createElement('canvas');
        sc.width = Math.max(1, Math.ceil(cellW * dpr));
        sc.height = Math.max(1, Math.ceil(cellH * dpr));
        const sx = sc.getContext('2d');
        if (sx) {
          sx.scale(dpr, dpr);
          sx.font = '400 ' + fpx + 'px ' + MONO_CSS;
          sx.textAlign = 'center';
          sx.textBaseline = 'middle';
          sx.fillStyle = colors[ci];
          sx.fillText(ch, cellW / 2, cellH / 2 + 0.5);
          SPR.set(ch.charCodeAt(0) * 2 + ci, sc);
        }
      }
    });
  }

  /* ---------- static topology builders ---------- */
  function buildStatics() {
    const R = mulberry(20260206);
    traces = new Float32Array(N);
    cpu = new Float32Array(N);
    neural = new Float32Array(N);
    neuralOv = new Uint8Array(N);
    grat = new Float32Array(N);
    nodes = [];
    packetPaths = [];

    const put = (arr, x, y, v) => {
      x |= 0; y |= 0;
      if (x < 0 || x >= cols || y < 0 || y >= rows) return;
      const i = y * cols + x;
      if (arr[i] < v) arr[i] = v;
    };

    /* 1. Ambient Motherboard Traces */
    const nAmb = Math.round(cols * rows / 1500) + 10;
    for (let k = 0; k < nAmb; k++) {
      let x, y, dx, dy;
      if (R() < 0.5) {
        y = (R() * rows) | 0;
        x = R() < 0.5 ? 0 : cols - 1;
        dx = x === 0 ? 1 : -1;
        dy = 0;
      } else {
        x = (R() * cols) | 0;
        y = R() < 0.5 ? 0 : rows - 1;
        dy = y === 0 ? 1 : -1;
        dx = 0;
      }
      let runL = 6 + ((R() * 22) | 0);
      let turns = 0;
      const v = 0.15 + R() * 0.06;
      while (turns < 5) {
        for (let s = 0; s < runL; s++) {
          if (x < 0 || x >= cols || y < 0 || y >= rows) break;
          put(traces, x, y, v);
          if (R() < 0.02) put(traces, x, y, 0.34);
          x += dx; y += dy;
        }
        if (x < 0 || x >= cols || y < 0 || y >= rows) break;
        put(traces, x, y, 0.32); // via
        if (dx !== 0) {
          dy = R() < 0.5 ? 1 : -1;
          dx = 0;
        } else {
          dx = R() < 0.5 ? 1 : -1;
          dy = 0;
        }
        runL = 5 + ((R() * 16) | 0);
        turns++;
      }
    }

    /* 2. CPU SoC Die — Hero Motif */
    const cx = Math.round(cols * 0.67);
    const cy = Math.round(rows * 0.45);
    const dw = Math.max(20, Math.min(56, Math.round(cols * 0.30)));
    const dh = Math.max(12, Math.min(30, Math.round(rows * 0.44)));
    const x0 = cx - (dw >> 1);
    const y0 = cy - (dh >> 1);
    const x1 = x0 + dw - 1;
    const y1 = y0 + dh - 1;

    for (let x = x0; x <= x1; x++) {
      put(cpu, x, y0, 0.85);
      put(cpu, x, y1, 0.85);
      put(cpu, x, y0 + 2, 0.4);
      put(cpu, x, y1 - 2, 0.4);
    }
    for (let y = y0; y <= y1; y++) {
      put(cpu, x0, y, 0.85);
      put(cpu, x1, y, 0.85);
      put(cpu, x0 + 2, y, 0.4);
      put(cpu, x1 - 2, y, 0.4);
    }
    for (let y = y0 + 3; y < y1 - 2; y++) {
      for (let x = x0 + 3; x < x1 - 2; x++) {
        cpu[y * cols + x] = Math.max(cpu[y * cols + x], 0.12 + R() * 0.1);
      }
    }

    const sx1 = x0 + ((dw / 3) | 0);
    const sx2 = x0 + ((2 * dw / 3) | 0);
    const syy = y0 + ((dh / 2) | 0);
    for (let y = y0 + 3; y < y1 - 2; y++) {
      put(cpu, sx1, y, 0.3);
      put(cpu, sx2, y, 0.3);
    }
    for (let x = x0 + 3; x < x1 - 2; x++) put(cpu, x, syy, 0.3);

    const nw = Math.max(6, (dw * 0.42) | 0);
    const nh = Math.max(5, (dh * 0.42) | 0);
    const nx0 = cx - (nw >> 1);
    const ny0 = cy - (nh >> 1);
    for (let y = ny0; y < ny0 + nh; y++) {
      for (let x = nx0; x < nx0 + nw; x++) {
        const edge = (x === nx0 || x === nx0 + nw - 1 || y === ny0 || y === ny0 + nh - 1);
        put(cpu, x, y, edge ? 0.5 : 0.33);
      }
    }

    for (let b = 0; b < 6; b++) {
      const bx = x0 + 3 + ((R() * (dw - 9)) | 0);
      const by = y0 + 3 + ((R() * (dh - 9)) | 0);
      const r = 1 + ((R() * 2) | 0);
      for (let y = by - r; y <= by + r; y++) {
        for (let x = bx - r; x <= bx + r; x++) {
          if (x > x0 + 2 && x < x1 - 2 && y > y0 + 2 && y < y1 - 2) put(cpu, x, y, 0.55);
        }
      }
    }

    [[x0 - 4, y0 - 4, 1, 1], [x1 + 4, y0 - 4, -1, 1], [x0 - 4, y1 + 4, 1, -1], [x1 + 4, y1 + 4, -1, -1]].forEach(m => {
      for (let s = 1; s <= 3; s++) {
        put(cpu, m[0] + m[2] * s, m[1], 0.4);
        put(cpu, m[0], m[1] + m[3] * s, 0.4);
      }
    });

    const pin = (x, y, dx, dy) => {
      const L = dx === -1 ? 2 + ((R() * 2) | 0) : 3 + ((R() * 4) | 0);
      const path = [[x, y]];
      for (let s = 1; s <= L; s++) {
        put(cpu, x + dx * s, y + dy * s, 0.42);
        path.push([x + dx * s, y + dy * s]);
      }
      put(cpu, x + dx * L, y + dy * L, 0.6);
      if (R() < 0.4) {
        let px = x + dx * L, py = y + dy * L;
        while (px >= 0 && px < cols && py >= 0 && py < rows) {
          put(cpu, px, py, 0.18);
          path.push([px, py]);
          px += dx; py += dy;
        }
        if (path.length > 6) {
          let mx = 0;
          path.forEach(p => { mx += p[0]; });
          mx /= path.length;
          if (mx > cols * 0.5) packetPaths.push(path);
        }
      }
    };

    for (let x = x0 + 2; x <= x1 - 2; x += 2) {
      pin(x, y0, 0, -1);
      pin(x, y1, 0, 1);
    }
    for (let y = y0 + 2; y <= y1 - 2; y += 2) {
      pin(x0, y, -1, 0);
      pin(x1, y, 1, 0);
    }

    /* 3. Neural Lattice */
    const stepX = Math.max(7, (cols / 14) | 0);
    const stepY = Math.max(6, (rows / 11) | 0);
    for (let gy = 2; gy < rows - 3; gy += stepY) {
      for (let gx = 2; gx < cols - 3; gx += stepX) {
        nodes.push({ x: gx + ((R() * 3) | 0), y: gy + ((R() * 3) | 0), adj: [] });
      }
    }
    const gw = Math.max(1, Math.ceil((cols - 4) / stepX));
    const nline = (a, b) => {
      const L = Math.max(1, Math.hypot(b.x - a.x, b.y - a.y));
      for (let s = 0; s <= L; s++) {
        const x = Math.round(a.x + (b.x - a.x) * s / L);
        const y = Math.round(a.y + (b.y - a.y) * s / L);
        put(neural, x, y, 0.16);
      }
    };
    nodes.forEach((n, ii) => {
      const right = ii + 1, down = ii + gw;
      if (right < nodes.length && (right % gw) !== 0) {
        n.adj.push(right);
        nline(n, nodes[right]);
      }
      if (down < nodes.length) {
        n.adj.push(down);
        nline(n, nodes[down]);
      }
    });
    nodes.forEach(n => {
      if (n.x >= 0 && n.x < cols && n.y >= 0 && n.y < rows) {
        const i = n.y * cols + n.x;
        neural[i] = 0.6;
        neuralOv[i] = 111; // 'o'
      }
    });

    /* 4. Oscilloscope Graticule */
    for (let x = 0; x < cols; x += 6) for (let y = 0; y < rows; y++) put(grat, x, y, 0.09);
    for (let y = 0; y < rows; y += 5) for (let x = 0; x < cols; x++) put(grat, x, y, 0.09);
    for (let y = 0; y < rows; y += 5) for (let x = 0; x < cols; x += 6) put(grat, x, y, 0.2);

    if (vw < 640) {
      for (let i = 0; i < N; i++) cpu[i] *= 0.6;
    }
  }

  /* ---------- dynamic stamping helpers ---------- */
  function stampE(x, y, e, h) {
    x = Math.round(x); y = Math.round(y);
    if (x < 0 || x >= cols || y < 0 || y >= rows) return;
    const i = y * cols + x;
    if (energy[i] < e) energy[i] = e;
    if (h !== undefined && hot[i] < h) hot[i] = h;
  }

  function newPulse() {
    const a = (Math.random() * nodes.length) | 0;
    const adj = nodes[a].adj;
    const b = adj.length ? adj[(Math.random() * adj.length) | 0] : ((Math.random() * nodes.length) | 0);
    return { a, b, u: 0, L: Math.max(1, Math.hypot(nodes[b].x - nodes[a].x, nodes[b].y - nodes[a].y)) };
  }

  /* ---------- simulation update step ---------- */
  function step(now) {
    const dtMs = Math.max(1, now - last);
    const dt = Math.min(0.05, dtMs / 1000);
    last = now;
    t += dt;
    fps += (1000 / dtMs - fps) * 0.08;
    const dE = Math.pow(0.93, dt * 60), dH = Math.pow(0.86, dt * 60);
    for (let i = 0; i < N; i++) {
      energy[i] *= dE;
      hot[i] *= dH;
    }
    dispX.fill(0);
    dispY.fill(0);
    curCellI = -1;

    /* Neural Ribbons */
    const small = vw < 640;
    const zx0 = small ? cols * 0.06 : cols * 0.03;
    const zx1 = small ? cols * 0.86 : cols * 0.52;
    const zy0 = rows * 0.05;
    const zy1 = rows * 0.97;
    for (const r of ribbons) {
      const ang = t * 0.35 + r.s + Math.sin(t * 0.7 + r.s * 1.7) * 1.3;
      let ax = Math.cos(ang) * 30, ay = Math.sin(ang) * 30;
      if (W.mainboard > 0.5 && r.x > zx0 && r.x < zx1 && r.y > zy0 && r.y < zy1) {
        const dl = r.x - zx0, dr = zx1 - r.x, du = r.y - zy0, dd = zy1 - r.y;
        const m = Math.min(dl, dr, du, dd);
        if (m === du) ay -= 80;
        else if (m === dd) ay += 80;
        else if (m === dl) ax -= 80;
        else ax += 80;
      }
      if (r.x < 8) ax += (8 - r.x) * 9;
      if (r.x > cols - 8) ax -= (r.x - (cols - 8)) * 9;
      if (r.y < 6) ay += (6 - r.y) * 9;
      if (r.y > rows - 6) ay -= (r.y - (rows - 6)) * 9;
      r.vx += ax * dt;
      r.vy += ay * dt;
      const sp = Math.hypot(r.vx, r.vy) || 0.001;
      if (sp > 15) { r.vx *= 15 / sp; r.vy *= 15 / sp; }
      if (sp < 6) { r.vx *= 6 / sp; r.vy *= 6 / sp; }
      r.x = Math.min(cols - 1, Math.max(0, r.x + r.vx * dt));
      r.y = Math.min(rows - 1, Math.max(0, r.y + r.vy * dt));
      stampE(r.x, r.y, 0.95, 0.85);
    }

    /* Mainboard Packets */
    if (W.mainboard > 0.35) {
      if (packets.length < 4 && packetPaths.length && Math.random() < dt * 0.8) {
        packets.push({ p: packetPaths[(Math.random() * packetPaths.length) | 0], s: 0 });
      }
      for (let k = packets.length - 1; k >= 0; k--) {
        const pk = packets[k];
        pk.s += dt * 16;
        const i0 = pk.s | 0;
        if (i0 >= pk.p.length - 1) { packets.splice(k, 1); continue; }
        stampE(pk.p[i0][0], pk.p[i0][1], 0.9, 0.8);
        stampE(pk.p[i0 + 1][0], pk.p[i0 + 1][1], 0.35, 0.25);
      }
    } else {
      packets.length = 0;
    }

    /* Neural Pulses */
    if (W.neural > 0.35 && nodes.length) {
      while (pulses.length < 6) pulses.push(newPulse());
      for (const pu of pulses) {
        pu.u += dt * 6 / pu.L;
        if (pu.u >= 1) {
          pu.a = pu.b;
          const adj = nodes[pu.a].adj;
          pu.b = adj.length ? adj[(Math.random() * adj.length) | 0] : ((Math.random() * nodes.length) | 0);
          pu.u = 0;
          pu.L = Math.max(1, Math.hypot(nodes[pu.b].x - nodes[pu.a].x, nodes[pu.b].y - nodes[pu.a].y));
        }
        const A = nodes[pu.a], B = nodes[pu.b];
        stampE(A.x + (B.x - A.x) * pu.u, A.y + (B.y - A.y) * pu.u, 0.78, 0.6);
      }
    } else {
      pulses.length = 0;
    }

    /* Cursor Vortex */
    if (ptr.tx > -1e3) {
      ptr.x += (ptr.tx - ptr.x) * 0.14;
      ptr.y += (ptr.ty - ptr.y) * 0.14;
    } else {
      ptr.x = ptr.tx;
      ptr.y = ptr.ty;
    }
    const cxm = ptr.x / cellW, cym = ptr.y / cellH, RR = 6.5;
    if (cxm > -20 && cxm < cols + 20) {
      const x0 = Math.max(0, (cxm - RR) | 0), x1 = Math.min(cols - 1, Math.ceil(cxm + RR));
      const y0 = Math.max(0, (cym - RR) | 0), y1 = Math.min(rows - 1, Math.ceil(cym + RR));
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const dx = x - cxm, dy = y - cym, d = Math.hypot(dx, dy);
          if (d > RR) continue;
          const f = 1 - d / RR, i = y * cols + x;
          if (energy[i] < f * 0.5) energy[i] = f * 0.5;
          if (hot[i] < f * 0.42) hot[i] = f * 0.42;
          if (d > 0.35) {
            const mag = f * f * 1.6 * cellW;
            dispX[i] += -dy / d * mag - dx / d * f * 0.45 * cellW;
            dispY[i] += dx / d * mag - dy / d * f * 0.45 * cellW;
          }
        }
      }
      curCellI = (Math.round(cym)) * cols + Math.round(cxm);
      if (curCellI >= 0 && curCellI < N) { energy[curCellI] = 1; hot[curCellI] = 1; }
    }

    /* Shockwaves */
    for (let k = waves.length - 1; k >= 0; k--) {
      const w = waves[k];
      w.r += dt * 26;
      w.a *= Math.pow(0.35, dt);
      if (w.a < 0.04 || w.r > cols + rows) { waves.splice(k, 1); continue; }
      const band = 1.7;
      const x0 = Math.max(0, (w.x - w.r - band) | 0), x1 = Math.min(cols - 1, Math.ceil(w.x + w.r + band));
      const y0 = Math.max(0, (w.y - w.r - band) | 0), y1 = Math.min(rows - 1, Math.ceil(w.y + w.r + band));
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const dx = x - w.x, dy = y - w.y, d = Math.hypot(dx, dy);
          const off = Math.abs(d - w.r);
          if (off >= band) continue;
          const kk = (1 - off / band) * w.a, i = y * cols + x;
          if (energy[i] < kk * 0.6) energy[i] = kk * 0.6;
          if (hot[i] < kk * 0.4) hot[i] = kk * 0.4;
          if (d > 0.3) {
            const m = kk * 2 * cellW;
            dispX[i] += dx / d * m;
            dispY[i] += dy / d * m;
          }
        }
      }
    }
  }

  /* ---------- frame rendering ---------- */
  function draw() {
    ctx.clearRect(0, 0, vw, vh);
    for (const m of MODES) W[m] += (T[m] - W[m]) * 0.09;

    const wM = W.mainboard, wN = W.neural, wC = W.cipher, wO = W.oscillo, wV = W.surface;
    const traceW = 0.7 * wM + 0.4 * wN + 0.26 * wC + 0.12 * wO + 0.08 * wV;
    const tick = (t * 2.5) | 0;
    const barY = rows * (0.5 + 0.3 * Math.sin(t * 0.5));
    const kSet = new Set([
      (Math.sin(t * 0.21) * 0.5 + 0.5) * cols | 0,
      (Math.sin(t * 0.17 + 2) * 0.5 + 0.5) * cols | 0,
      (Math.sin(t * 0.13 + 4) * 0.5 + 0.5) * cols | 0
    ]);
    const neuralDom = wN > 0.5;
    const RL = RAMP.length;

    for (let y = 0; y < rows; y++) {
      const yy = y * cellH;
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        let e = traceW * traces[i] + wM * cpu[i] + wN * neural[i] + wO * grat[i] + energy[i];
        let hotv = hot[i];
        let ch = 0;

        // Surface Mode wave calculations
        if (wV > 0.02) {
          const h = Math.sin(x * 0.13 + t * 0.6) * Math.cos(y * 0.17 - t * 0.42) + 0.5 * Math.sin((x * 0.5 + y) * 0.11 + t * 0.8);
          const v = Math.max(0, h) * 0.5 * wV;
          e += v;
          if (v > 0.34) hotv += (v - 0.34) * 1.2;
        }

        // Oscilloscope Mode sine waveforms
        if (wO > 0.02) {
          const y1 = rows * 0.5 + rows * 0.14 * Math.sin(x * 0.055 + t * 1.1) + rows * 0.05 * Math.sin(x * 0.21 - t * 0.6);
          const d1 = Math.abs(y - y1);
          if (d1 < 0.8) {
            e += 0.8 * wO;
            hotv += 0.65 * wO;
          } else if (d1 < 2) {
            e += 0.32 * wO * (2 - d1);
          }
          const y2 = rows * 0.52 + rows * 0.1 * Math.sin(x * 0.08 - t * 0.8 + 2.1);
          if (Math.abs(y - y2) < 0.6) e += 0.42 * wO;
        }

        // Cipher Mode binary and hash sweeps
        if (wC > 0.02) {
          const n = ihash(x * 374761393 + y * 668265263 + tick * 974634);
          if (n < 0.055) {
            e += 0.25 * wC;
            ch = (((n * 1e4) | 0) & 1) ? 49 : 48; // '1' or '0'
          }
          if (Math.abs(y - barY) < 1.4 && n > 0.6) e += 0.16 * wC;
          if (kSet.has(x) && n < 0.4) {
            e += 0.22 * wC;
            hotv += 0.18 * wC;
            ch = 49;
          }
        }

        if (neuralDom && neuralOv[i]) ch = neuralOv[i];
        if (i === curCellI) ch = 64; // '@' under cursor
        if (e < 0.08) continue;

        const ee = e > 1 ? 1 : e;
        if (!ch) {
          let idx = (ee * RL) | 0;
          if (idx > RL - 1) idx = RL - 1;
          ch = RAMP[idx].charCodeAt(0);
        }
        if (ch === 32) continue;

        const spr = SPR.get(ch * 2 + (hotv > 0.22 ? 1 : 0));
        if (!spr) continue;

        // High-contrast, vivid rendering: glyphs are clearly visible across all modes,
        // while the frosted glass cards provide complete clarity for reading
        ctx.globalAlpha = Math.min(0.92, 0.32 + ee * 0.68);
        ctx.drawImage(spr, x * cellW + dispX[i], yy + dispY[i], cellW, cellH);
      }
    }
    ctx.globalAlpha = 1;
  }

  function loop(now) {
    if (!run) return;
    step(now);
    draw();
    rafId = requestAnimationFrame(loop);
  }

  /* ---------- public lifecycle methods ---------- */
  function resize() {
    vw = window.innerWidth;
    vh = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(vw * dpr);
    cv.height = Math.round(vh * dpr);
    cv.style.width = vw + 'px';
    cv.style.height = vh + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const small = vw < 640;
    cellW = small ? 9.4 : 10.6;
    cellH = small ? 11 : 12.4;
    fpx = Math.round(cellW * 1.6);
    cols = Math.ceil(vw / cellW) + 1;
    rows = Math.ceil(vh / cellH) + 1;
    N = cols * rows;

    energy = new Float32Array(N);
    hot = new Float32Array(N);
    dispX = new Float32Array(N);
    dispY = new Float32Array(N);

    buildSprites();
    buildStatics();

    ribbons = [];
    for (let i = 0; i < 3; i++) ribbons.push({ x: Math.random() * cols, y: Math.random() * rows, vx: 0, vy: 0, s: i * 2.1 });
    pulses = [];
    packets = [];
    waves = [];

    if (!run) draw();
  }

  function start() {
    if (run || REDUCED) return;
    run = true;
    last = performance.now();
    rafId = requestAnimationFrame(loop);
    setTimeout(() => {
      waves.push({ x: cols / 2, y: rows / 2, r: 1, a: 0.9 });
    }, 700);
  }

  function stop() {
    run = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  function setMode(m) {
    if (!T.hasOwnProperty(m)) return;
    cur = m;
    MODES.forEach(k => { T[k] = k === m ? 1 : 0; });
    if (onMode) onMode(m);
    if (!run) draw();
  }

  function refresh() {
    buildSprites();
    draw();
  }

  function onPointerMove(e) {
    ptr.tx = e.clientX;
    ptr.ty = e.clientY;
  }

  function onPointerDown(e) {
    ptr.tx = e.clientX;
    ptr.ty = e.clientY;
    waves.push({ x: e.clientX / cellW, y: e.clientY / cellH, r: 1, a: 1 });
    if (waves.length > 6) waves.shift();
  }

  function onPointerOut(e) {
    if (!e.relatedTarget) {
      ptr.tx = -1e4;
      ptr.ty = -1e4;
    }
  }

  function onVisChange() {
    if (document.hidden) stop();
    else start();
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  document.addEventListener('pointerout', onPointerOut);
  document.addEventListener('visibilitychange', onVisChange);

  // Boot
  resize();
  start();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => refresh());
  }

  return {
    resize,
    start,
    stop,
    setMode,
    refresh,
    draw,
    get mode() { return cur; },
    info: () => ({ cols, rows, fps: Math.round(fps), t }),
    labels: LABEL,
    cycle() {
      const i = MODES.indexOf(cur);
      setMode(MODES[(i + 1) % MODES.length]);
    },
    onMode(fn) { onMode = fn; },
    destroy() {
      stop();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerout', onPointerOut);
      document.removeEventListener('visibilitychange', onVisChange);
    }
  };
}
