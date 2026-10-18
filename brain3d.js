// =====================================================================
// brain3d.js — Visualizador 3D anatômico da distribuição dos gliomas
// v3: malha triangular realista renderizada em WebGL puro (sem libs):
//     • hemisférios com giros/sulcos procedurais, fissura inter-hemisférica,
//       fissura lateral (Sylvius), lobos temporais e occipitais modelados;
//     • cerebelo com fólias e vérnis; tronco (mesencéfalo/ponte/bulbo) e medula;
//     • iluminação Phong + specular + rim-light + oclusão de sulcos;
//     • CLIQUE em qualquer ponto → região anatômica → painel com
//       FUNÇÕES da área, deficits típicos e neoplasias que ali ocorrem;
//     • fallback automático para renderer 2D (canvas) sem WebGL.
// Coordenadas (mm, referência tipo Talairach/AC):
//   x+ = esquerda | y+ = anterior | z+ = superior
// =====================================================================

(function () {
  function RLOC(r) {
    const e = (window.I18N && I18N.lang === "en" && window.TR && TR.reg[r.id]) || null;
    return e ? Object.assign({}, r, e) : r;
  }
  // ---------------- utilidades de cor ----------------
  const HEAT_STOPS = [
    [0.00, [59, 130, 246]],
    [0.30, [21, 128, 61]],
    [0.55, [161, 98, 7]],
    [0.78, [180, 83, 9]],
    [1.00, [153, 27, 27]]
  ];
  function heatColor(t, alpha) {
    t = Math.max(0, Math.min(1, t));
    let a = HEAT_STOPS[0], b = HEAT_STOPS[HEAT_STOPS.length - 1];
    for (let i = 0; i < HEAT_STOPS.length - 1; i++) {
      if (t >= HEAT_STOPS[i][0] && t <= HEAT_STOPS[i + 1][0]) { a = HEAT_STOPS[i]; b = HEAT_STOPS[i + 1]; break; }
    }
    const f = (t - a[0]) / ((b[0] - a[0]) || 1);
    const c = [0, 1, 2].map(k => Math.round(a[1][k] + (b[1][k] - a[1][k]) * f));
    return alpha == null ? `rgb(${c[0]},${c[1]},${c[2]})` : `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
  }
  function makeSprite(rgb) {
    const n = 28, cv = document.createElement("canvas");
    cv.width = cv.height = n;
    const g = cv.getContext("2d");
    const grd = g.createRadialGradient(n / 2, n / 2, 0, n / 2, n / 2, n / 2);
    grd.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},1)`);
    grd.addColorStop(0.55, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.85)`);
    grd.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`);
    g.fillStyle = grd; g.fillRect(0, 0, n, n);
    return cv;
  }
  function shadeSprite(rgb, k) { return makeSprite(rgb.map(v => Math.max(0, Math.min(255, Math.round(v * k))))); }

  // ---------------- ruído procedural (giros/sulcos) ----------------
  function hash3(x, y, z) {
    let h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
    return h - Math.floor(h);
  }
  function vnoise(x, y, z) {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const xf = x - xi, yf = y - yi, zf = z - zi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
    const l = (a, b, t) => a + (b - a) * t;
    const c000 = hash3(xi, yi, zi), c100 = hash3(xi + 1, yi, zi), c010 = hash3(xi, yi + 1, zi), c110 = hash3(xi + 1, yi + 1, zi);
    const c001 = hash3(xi, yi, zi + 1), c101 = hash3(xi + 1, yi, zi + 1), c011 = hash3(xi, yi + 1, zi + 1), c111 = hash3(xi + 1, yi + 1, zi + 1);
    return l(l(l(c000, c100, u), l(c010, c110, u), v), l(l(c001, c101, u), l(c011, c111, u), v), w);
  }
  function fbm(x, y, z) {
    return 0.55 * vnoise(x, y, z) + 0.28 * vnoise(x * 2.1, y * 2.1, z * 2.1) + 0.17 * vnoise(x * 4.3, y * 4.3, z * 4.3);
  }
  // padrão de giros: cristas alongadas (ruído anisotrópico "ridged")
  function gyri(x, y, z) {
    const q1 = fbm(x * 0.055 + 3.1, y * 0.075, z * 0.065);
    const q2 = fbm(x * 0.09 - 7.7, y * 0.06 + 2.2, z * 0.11);
    const r1 = 1 - Math.abs(2 * q1 - 1);
    const r2 = 1 - Math.abs(2 * q2 - 1);
    return (0.62 * r1 + 0.38 * r2) - 0.62;
  }

  // ---------------- geometria ----------------
  const REGION_IDX = {};
  function regionIndex(regions) { regions.forEach((r, i) => { REGION_IDX[r.id] = i; }); }

  function buildMesh(regions) {
    regionIndex(regions);
    const pos = [], nrm = [], base = [], heat = [], ao = [], reg = [], idx = [];
    const COL = {
      cortex: [0.870, 0.690, 0.620], cerebellum: [0.810, 0.600, 0.540],
      stem: [0.840, 0.690, 0.620], cord: [0.870, 0.760, 0.700]
    };

    function pushGrid(grid, rows, cols, regionOf, colorOf) {
      const baseI = pos.length / 3;
      for (let i = 0; i <= rows; i++) {
        for (let j = 0; j <= cols; j++) {
          const p = grid[i][j].p;
          pos.push(p[0], p[1], p[2]);
          nrm.push(grid[i][j].n[0], grid[i][j].n[1], grid[i][j].n[2]);
          const c = colorOf(grid[i][j], i, j);
          base.push(c[0], c[1], c[2]);
          heat.push(0); ao.push(grid[i][j].ao); reg.push(regionOf(grid[i][j], i, j));
        }
      }
      const W = cols + 1;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const a = baseI + i * W + j, b = a + 1, c = a + W, d = c + 1;
          idx.push(a, c, b, b, c, d);
        }
      }
    }

    function normalsFromGrid(grid, rows, cols, center) {
      const C0 = center || [0, 2, 24];
      for (let i = 0; i <= rows; i++) {
        for (let j = 0; j <= cols; j++) {
          const i0 = Math.max(0, i - 1), i1 = Math.min(rows, i + 1);
          const j0 = Math.max(0, j - 1), j1 = Math.min(cols, j + 1);
          const du = sub(grid[i1][j].p, grid[i0][j].p), dv = sub(grid[i][j1].p, grid[i][j0].p);
          let n = cross(du, dv);
          const L = Math.hypot(n[0], n[1], n[2]) || 1;
          n = [n[0] / L, n[1] / L, n[2] / L];
          // orienta para fora (produto com vetor radial a partir do centro aproximado)
          const rad = [grid[i][j].p[0] - C0[0], grid[i][j].p[1] - C0[1], grid[i][j].p[2] - C0[2]];
          if (n[0] * rad[0] + n[1] * rad[1] + n[2] * rad[2] < 0) n = [-n[0], -n[1], -n[2]];
          grid[i][j].n = n;
        }
      }
    }
    function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
    function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    const smooth = t => t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);

    // ---------- cérebro (hemisférios cerebrais) ----------
    const ROWS = 72, COLS = 108;
    const cg = [];
    for (let i = 0; i <= ROWS; i++) {
      const row = [];
      const th = Math.PI * i / ROWS;             // 0 = polo superior
      for (let j = 0; j <= COLS; j++) {
        const ph = 2 * Math.PI * j / COLS;
        const dx = Math.sin(th) * Math.cos(ph), dy = Math.sin(th) * Math.sin(ph), dz = Math.cos(th);
        let x = dx * 68, y = dy * 84, z = dz * 56;
        let aoV = 1;
        // proeminência frontal e afinamento occipital
        if (y > 30) y *= 1.05;
        if (y < -40) { const k = 1 - 0.20 * smooth((-y - 40) / 44); x *= k; }
        // lobo temporal (bulbo infero-lateral)
        if (z < -6 && Math.abs(x) > 18) { z *= 1.18; x *= 1.08; }
        if (z < -10 && y > 18) y *= 1.06;   // polo temporal anterior
        // base achatada
        if (z < -14) z = -14 + (z + 14) * 0.72;
        // giros e sulcos procedurais
        let disp = 4.3 * gyri(x, y, z) + 1.1 * (1 - Math.abs(2 * fbm(x * 0.16 + 9.2, y * 0.13, z * 0.19) - 1));
        // fissura inter-hemisférica (sulco profundo na linha média)
        const mid = Math.exp(-(x * x) / 28) * smooth((z - 4) / 26);
        disp -= 12.0 * mid;
        // fissura lateral (Sylvius)
        const sylv = Math.exp(-Math.pow((z + 8 + 0.16 * y) / 8, 2)) * smooth((Math.abs(x) - 34) / 20) * smooth((28 - Math.abs(x)) / -6 + 1);
        disp -= 7.5 * Math.exp(-Math.pow((z + 8 + 0.16 * y) / 7, 2)) * smooth((Math.abs(x) - 34) / 18);
        // sulco central (ligeiramente oblíquo)
        const cent = Math.exp(-Math.pow((y - 8 + 0.35 * (z - 20)) / 5.5, 2)) * smooth((Math.abs(x) - 12) / 26) * smooth((z + 2) / 18);
        disp -= 3.2 * cent;
        // sulco parieto-occipital
        const po = Math.exp(-Math.pow((y + 46) / 6, 2)) * smooth((z - 0) / 22) * smooth((Math.abs(x) - 8) / 20);
        disp -= 2.8 * po;
        aoV = Math.max(0.45, Math.min(1.18, 1 + disp * 0.10));
        const k = 1 + disp / 62;
        row.push({ p: [x * k + 0, y * k + 2, z * k + 24], n: [dx, dy, dz], ao: aoV, kind: 0, xyz: [x, y, z] });
      }
      cg.push(row);
    }
    normalsFromGrid(cg, ROWS, COLS, [0, 2, 24]);
    pushGrid(cg, ROWS, COLS,
      g => {
        const [x, y, z] = g.xyz;
        const ax = Math.abs(x);
        if (z < -12 && ax > 26 && y < 14) return REGION_IDX.temporal;
        if (y < -44) return REGION_IDX.occipital;
        // ínsula: fundo da fissura lateral
        if (ax > 36 && ax < 62 && z > -20 && z < 4 && y > -22 && y < 16) return REGION_IDX.insula;
        if (y > 10) return REGION_IDX.frontal;
        return REGION_IDX.parietal;
      },
      () => COL.cortex);

    // ---------- cerebelo (fólias + vérnis) ----------
    const CR = 46, CC = 34;
    const cbg = [];
    for (let i = 0; i <= CR; i++) {
      const row = [];
      const th = Math.PI * i / CR;
      for (let j = 0; j <= CC; j++) {
        const ph = 2 * Math.PI * j / CC;
        const dx = Math.sin(th) * Math.cos(ph), dy = Math.sin(th) * Math.sin(ph), dz = Math.cos(th);
        let x = dx * 46, y = dy * 30, z = dz * 24;
        if (y > 4) y *= 0.80;                    // face anterior achatada (contra o tronco)
        let disp = 0.45 * Math.sin(z * 3.2) + 1.25 * gyri(x * 0.9, y * 0.9, z * 0.9);
        disp -= 2.0 * Math.exp(-(x * x) / 22);   // vérnis (sulco mediano posterior)
        disp -= 1.5 * Math.exp(-Math.pow((z - 8) / 2.6, 2)); // fissura prima
        const k = 1 + disp / 40;
        row.push({ p: [x * k * 0.96, y * k - 54, z * k - 26], n: [dx, dy, dz], ao: Math.max(0.6, 1 + disp * 0.09), kind: 1, xyz: [x, y, z] });
      }
      cbg.push(row);
    }
    normalsFromGrid(cbg, CR, CC, [0, -60, -30]);
    pushGrid(cbg, CR, CC, () => REGION_IDX.cerebellum, () => COL.cerebellum);

    // ---------- tronco encefálico + medula ----------
    const path = [
      [0, -26, -2, 9.5, "midbrain"], [0, -32, -8, 10.5, "midbrain"],
      [0, -38, -14, 12.0, "pons"], [0, -44, -21, 10.5, "pons"],
      [0, -49, -28, 8.4, "medulla"], [0, -53, -36, 7.2, "medulla"],
      [0, -55, -44, 7.4, "spinal_cord"], [0, -56, -58, 6.8, "spinal_cord"], [0, -56, -70, 6.2, "spinal_cord"]
    ];
    const SEG = 22, RINGS = 7;
    const bg2 = [];
    const STEPS = (path.length - 1) * RINGS;
    for (let s = 0; s <= STEPS; s++) {
      const t = s / STEPS;
      const ft = t * (path.length - 1);
      const i0 = Math.min(path.length - 2, Math.floor(ft)), f = ft - i0;
      const a = path[i0], b = path[i0 + 1];
      const cx = a[0] + (b[0] - a[0]) * f, cy = a[1] + (b[1] - a[1]) * f, cz = a[2] + (b[2] - a[2]) * f;
      const rad = a[3] + (b[3] - a[3]) * f;
      const rid = f < 0.5 ? a[4] : b[4];
      let ty = b[1] - a[1], tz = b[2] - a[2];
      const tl = Math.hypot(ty, tz) || 1; ty /= tl; tz /= tl;
      const vy = tz, vz = -ty;   // anel perpendicular à tangente (u=X, v=T×X)
      const row = [];
      for (let j = 0; j <= SEG; j++) {
        const ph = 2 * Math.PI * j / SEG;
        const cph = Math.cos(ph), sph = Math.sin(ph);
        const bulge = rid === "pons" ? 1 + 0.12 * Math.max(0, -sph) : 1;  // ventre da ponte anterior
        const nx = cph, nyy = sph * vy, nzz = sph * vz;
        row.push({ p: [cx + nx * rad * bulge, cy + nyy * rad, cz + nzz * rad * 0.95], n: [nx, nyy, nzz], ao: 1, kind: 2, rid });
      }
      bg2.push(row);
    }
    pushGrid(bg2, bg2.length - 1, SEG, g => REGION_IDX[g.rid] != null ? REGION_IDX[g.rid] : REGION_IDX.pons, () => COL.stem);

    return {
      pos: new Float32Array(pos), nrm: new Float32Array(nrm), base: new Float32Array(base),
      heat: new Float32Array(heat), ao: new Float32Array(ao), reg: new Float32Array(reg),
      idx: (pos.length / 3 > 65535 ? new Uint32Array(idx) : new Uint16Array(idx)),
      nIdx: idx.length, nVert: pos.length / 3
    };
  }

  // ---------------- matrizes 4x4 mínimas ----------------
  function mPersp(fovy, asp, n, f) {
    const t = 1 / Math.tan(fovy / 2);
    return [t / asp, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) / (n - f), -1, 0, 0, 2 * f * n / (n - f), 0];
  }
  function mMul(a, b) {
    const o = new Array(16).fill(0);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
      o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
    }
    return o;
  }
  function mRotZ(a) { const c = Math.cos(a), s = Math.sin(a); return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }
  function mRotX(a) { const c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]; }
  function mTrans(x, y, z) { return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]; }
  function m3of(m) { return [m[0], m[1], m[2], m[4], m[5], m[6], m[8], m[9], m[10]]; }

  // ---------------- shaders ----------------
  const VS = `
    attribute vec3 aPos; attribute vec3 aNrm; attribute vec3 aBase;
    attribute float aHeat; attribute float aAO; attribute float aReg;
    uniform mat4 uVP; uniform mat4 uView; uniform mat3 uN;
    uniform float uHeat; uniform float uSelId; uniform float uSelOn;
    varying vec3 vBase; varying vec3 vN; varying vec3 vV; varying float vAO;
    vec3 heatRamp(float tIn){
      float t = tIn * 0.70;
      vec3 c0=vec3(0.231,0.510,0.965), c1=vec3(0.082,0.502,0.380), c2=vec3(0.631,0.384,0.027),
           c3=vec3(0.706,0.325,0.035), c4=vec3(0.600,0.106,0.106);
      vec3 c = mix(c0,c1,smoothstep(0.0,0.45,t));
      c = mix(c,c2,smoothstep(0.45,0.62,t));
      c = mix(c,c3,smoothstep(0.62,0.80,t));
      c = mix(c,c4,smoothstep(0.80,0.95,t));
      return c;
    }
    void main(){
      vec4 vp = uView * vec4(aPos,1.0);
      vV = normalize(-vp.xyz);
      vN = normalize(uN * aNrm);
      vec3 b = mix(vec3(0.87,0.84,0.77), aBase, 0.22);
      if (uHeat > 0.001 && aHeat > 0.002) b = mix(b, heatRamp(aHeat), uHeat * 0.72);
      float sel = (abs(aReg - uSelId) < 0.5) ? uSelOn : 0.0;
      b += sel * vec3(0.16, 0.13, 0.05);
      vBase = b; vAO = aAO;
      gl_Position = uVP * vec4(aPos,1.0);
    }`;
  const FS = `
    precision mediump float;
    varying vec3 vBase; varying vec3 vN; varying vec3 vV; varying float vAO;
    uniform vec3 uLight;
    void main(){
      vec3 N = normalize(vN);
      vec3 L = normalize(uLight);
      float dif = max(dot(N, L), 0.0);
      float back = max(dot(N, normalize(vec3(0.4,0.5,-0.6))), 0.0) * 0.12;
      vec3 R = reflect(-L, N);
      float spec = pow(max(dot(R, normalize(vV)), 0.0), 26.0) * 0.22;
      float rim = pow(1.0 - max(dot(N, normalize(vV)), 0.0), 3.0) * 0.16;
      vec3 col = vBase * (0.30 + 0.92 * dif + back) * vAO;
      col += spec * vec3(1.0, 0.98, 0.95);
      col += rim * vec3(0.14, 0.18, 0.26);
      gl_FragColor = vec4(col, 1.0);
    }`;
  const VS_PICK = `
    attribute vec3 aPos; attribute float aReg;
    uniform mat4 uVP;
    varying float vR;
    void main(){ vR = aReg; gl_Position = uVP * vec4(aPos,1.0); }`;
  const FS_PICK = `
    precision mediump float;
    varying float vR;
    void main(){ gl_FragColor = vec4((vR + 1.0)/255.0, 0.0, 0.0, 1.0); }`;

  // ---------------- widget ----------------
  function initBrainViz(container, opts) {
    opts = opts || {};
    const regions = opts.regions || BRAIN_REGIONS;
    const entities = opts.entities || [];
    const regionById = {};
    regions.forEach(r => { regionById[r.id] = r; });
    const DEEP = ["thalamus", "basal_ganglia", "hypothalamus", "corpus_callosum", "septum", "lat_ventricle", "third_ventricle", "fourth_ventricle"];

    container.innerHTML = `
      <div class="viz-layout">
        <div class="viz-stage">
          <div class="viz-toolbar">
            <div class="viz-presets">
              <button type="button" data-view="left" class="chip-btn" title="Ver o lado esquerdo do paciente">Lado esquerdo</button>
              <button type="button" data-view="right" class="chip-btn">Lado direito</button>
              <button type="button" data-view="front" class="chip-btn">Frente</button>
              <button type="button" data-view="top" class="chip-btn">De cima</button>
              <button type="button" data-view="back" class="chip-btn">De trás</button>
            </div>
            <div class="viz-toggles">
              <label class="switch"><input type="checkbox" id="viz-auto" checked><span>Girar</span></label>
              <label class="switch"><input type="checkbox" id="viz-heat" checked><span>Mapa de calor</span></label>
              <label class="switch"><input type="checkbox" id="viz-labels" checked><span>Rótulos</span></label>
              <label class="switch"><input type="checkbox" id="viz-anchors"><span>Todas as regiões</span></label>
              <span class="viz-hint">arraste para girar · scroll para zoom · <strong>clique numa área para ver funções e tumores</strong></span>
            </div>
          </div>
          <div class="viz-canvas-wrap">
            <canvas id="viz-canvas"></canvas>
            <canvas id="viz-overlay"></canvas>
            <div id="viz-tooltip" class="viz-tooltip" hidden></div>
          </div>
          <div class="viz-scale">
            <span>baixa concentração</span>
            <div class="scale-bar"></div>
            <span>alta concentração</span>
            <span class="scale-note">· cor/sobreposição = frequência relativa descrita na literatura</span>
          </div>
        </div>
        <aside class="viz-side">
          <h4>Onde os gliomas se concentram</h4>
          <p class="viz-side-hint">Clique no modelo 3D (ou na lista) para ver <strong>as funções da área</strong> e as neoplasias que ali ocorrem.</p>
          <ul id="viz-region-list" class="region-list"></ul>
          <div id="viz-region-detail" class="region-detail"></div>
        </aside>
      </div>`;

    const canvas = container.querySelector("#viz-canvas");
    const overlay = container.querySelector("#viz-overlay");
    const octx = overlay.getContext("2d");
    const ctxMain = canvas.getContext("2d");          // canvas visível (2D): recebe o blit do WebGL
    const glCanvas = document.createElement("canvas"); // canvas offscreen para WebGL
    const tooltip = container.querySelector("#viz-tooltip");
    const regionList = container.querySelector("#viz-region-list");
    const regionDetail = container.querySelector("#viz-region-detail");
    let mesh = buildMesh(regions);      // procedural inicial; trocada pela malha real (fsaverage) quando decodificada

    let W = 0, H = 0, dpr = 1;
    let yaw = 2.40, pitch = -1.15, dist = 372, focal = 620;  // órbita: yaw=azimute, pitch=negativo=acima do horizonte
    let auto = true, showLabels = true, showAnchors = false, heatOn = true;
    let selection = { mode: "all" };
    let highlightRegion = null, hoverRegion = null;
    let dragging = false, lastX = 0, lastY = 0;

    // ---------- WebGL ----------
    let gl = null, prog = null, pickProg = null, bufs = {}, heatBuf = null, pickFBO = null, pickTex = null;
    let uVP = null, uView = null, uN = null, uLight = null, uHeat = null, uSelId = null, uSelOn = null, uPickVP = null;
    let extUint32 = null;
    try {
      gl = glCanvas.getContext("webgl", { antialias: true, alpha: false, preserveDrawingBuffer: true }) ||
           glCanvas.getContext("experimental-webgl", { antialias: true, alpha: false });
    } catch (e) { gl = null; }
    if (gl) {
      extUint32 = gl.getExtension("OES_element_index_uint");
      const compile = (type, src) => {
        const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl = null; return null; }
        return s;
      };
      const link = (vs, fs) => {
        const p = gl.createProgram(); gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p);
        if (!gl.getProgramParameter(p, gl.LINK_STATUS)) { gl = null; return null; }
        return p;
      };
      let vs = compile(gl.VERTEX_SHADER, VS), fs = compile(gl.FRAGMENT_SHADER, FS);
      if (gl) prog = link(vs, fs);
      if (gl) {
        vs = compile(gl.VERTEX_SHADER, VS_PICK); fs = compile(gl.FRAGMENT_SHADER, FS_PICK);
        pickProg = link(vs, fs);
      }
      if (gl && prog && pickProg) {
        bufs.pos = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bufs.pos); gl.bufferData(gl.ARRAY_BUFFER, mesh.pos, gl.STATIC_DRAW);
        bufs.nrm = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bufs.nrm); gl.bufferData(gl.ARRAY_BUFFER, mesh.nrm, gl.STATIC_DRAW);
        bufs.base = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bufs.base); gl.bufferData(gl.ARRAY_BUFFER, mesh.base, gl.STATIC_DRAW);
        bufs.ao = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bufs.ao); gl.bufferData(gl.ARRAY_BUFFER, mesh.ao, gl.STATIC_DRAW);
        bufs.reg = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bufs.reg); gl.bufferData(gl.ARRAY_BUFFER, mesh.reg, gl.STATIC_DRAW);
        heatBuf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, heatBuf); gl.bufferData(gl.ARRAY_BUFFER, mesh.heat, gl.DYNAMIC_DRAW);
        bufs.idx = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufs.idx); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.idx, gl.STATIC_DRAW);
        uVP = gl.getUniformLocation(prog, "uVP"); uView = gl.getUniformLocation(prog, "uView");
        uN = gl.getUniformLocation(prog, "uN"); uLight = gl.getUniformLocation(prog, "uLight");
        uHeat = gl.getUniformLocation(prog, "uHeat"); uSelId = gl.getUniformLocation(prog, "uSelId"); uSelOn = gl.getUniformLocation(prog, "uSelOn");
        uPickVP = gl.getUniformLocation(pickProg, "uVP");
        gl.enable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE);
        gl.clearColor(0.965, 0.953, 0.918, 1.0);
      } else gl = null;
    }
    let useGL = !!gl;

    // ---------- malha anatômica REAL (superfície pial fsaverage, FreeSurfer) ----------
    // Substitui a malha procedural pelos vértices reais assim que o blob gzip é decodificado.
    // Mantém picking, heat, rótulos, presets e demais funcionalidades (mesmos buffers GL).
    function bboxOf(arr, scale) {
      let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9, z0 = 1e9, z1 = -1e9;
      for (let i = 0; i < arr.length; i += 3) {
        const x = arr[i] * (scale || 1), y = arr[i + 1] * (scale || 1), z = arr[i + 2] * (scale || 1);
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
        if (z < z0) z0 = z; if (z > z1) z1 = z;
      }
      return { x0, x1, y0, y1, z0, z1 };
    }
    function loadRealMesh() {
      if (!useGL || typeof BRAIN_MESH_GZ !== "string" || typeof DecompressionStream === "undefined") return;
      try {
        const bin = atob(BRAIN_MESH_GZ);
        const gz = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) gz[i] = bin.charCodeAt(i);
        new Response(new Blob([gz]).stream().pipeThrough(new DecompressionStream("gzip")))
          .arrayBuffer().then(function (ab) {
            const dv = new DataView(ab);
            const nV = dv.getUint32(0, true), nT = dv.getUint32(4, true);
            const use32 = dv.getUint8(8) === 1, Q = dv.getUint32(12, true) || 8;
            let o = 16;
            const pq = new Int16Array(ab, o, nV * 3); o += nV * 6;
            const nq = new Int8Array(ab, o, nV * 3);  o += nV * 3;
            const bc = new Uint8Array(ab, o, nV * 3); o += nV * 3;
            const aq = new Uint8Array(ab, o, nV);     o += nV;
            const rq = new Uint8Array(ab, o, nV);     o += nV;
            const iq = use32 ? new Uint32Array(ab, o, nT * 3) : new Uint16Array(ab, o, nT * 3);
            // alinha bbox da malha real ao bbox da malha procedural (âncoras/rótulos calibrados)
            const bp = bboxOf(mesh.pos, 1), br = bboxOf(pq, 1 / Q);
            const sx = (bp.x1 - bp.x0) / (br.x1 - br.x0), sy = (bp.y1 - bp.y0) / (br.y1 - br.y0), sz = (bp.z1 - bp.z0) / (br.z1 - br.z0);
            const cxr = (br.x0 + br.x1) / 2, cxp = (bp.x0 + bp.x1) / 2;
            const cyr = (br.y0 + br.y1) / 2, cyp = (bp.y0 + bp.y1) / 2;
            const czr = (br.z0 + br.z1) / 2, czp = (bp.z0 + bp.z1) / 2;
            const pos = new Float32Array(nV * 3), nrm = new Float32Array(nV * 3), base = new Float32Array(nV * 3);
            const ao = new Float32Array(nV), reg = new Float32Array(nV), heat = new Float32Array(nV);
            for (let i = 0; i < nV; i++) {
              pos[i * 3]     = (pq[i * 3] / Q - cxr) * sx + cxp;
              pos[i * 3 + 1] = (pq[i * 3 + 1] / Q - cyr) * sy + cyp;
              pos[i * 3 + 2] = (pq[i * 3 + 2] / Q - czr) * sz + czp;
              nrm[i * 3] = nq[i * 3] / 127; nrm[i * 3 + 1] = nq[i * 3 + 1] / 127; nrm[i * 3 + 2] = nq[i * 3 + 2] / 127;
              base[i * 3] = bc[i * 3] / 255; base[i * 3 + 1] = bc[i * 3 + 1] / 255; base[i * 3 + 2] = bc[i * 3 + 2] / 255;
              ao[i] = aq[i] / 255; reg[i] = rq[i];
            }
            const idx = use32 ? new Uint32Array(iq) : new Uint16Array(iq);
            gl.bindBuffer(gl.ARRAY_BUFFER, bufs.pos);  gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, bufs.nrm);  gl.bufferData(gl.ARRAY_BUFFER, nrm, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, bufs.base); gl.bufferData(gl.ARRAY_BUFFER, base, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, bufs.ao);   gl.bufferData(gl.ARRAY_BUFFER, ao, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, bufs.reg);  gl.bufferData(gl.ARRAY_BUFFER, reg, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, heatBuf);   gl.bufferData(gl.ARRAY_BUFFER, heat, gl.DYNAMIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufs.idx); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
            mesh = { pos: pos, nrm: nrm, base: base, heat: heat, ao: ao, reg: reg, idx: idx, nIdx: nT * 3, nVert: nV, real: true };
            if (dist === 372) dist = 348;   // enquadra a malha real um pouco mais perto
            pushHeat();
          }).catch(function () { /* mantém malha procedural */ });
      } catch (e) { /* mantém malha procedural */ }
    }
    let fallback = useGL ? null : buildFallback();
    glCanvas.addEventListener("webglcontextlost", e => {
      e.preventDefault();
      useGL = false;
      if (!fallback) fallback = buildFallback();
    });

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.max(280, Math.floor(rect.width));
      H = Math.max(300, Math.floor(rect.height || 420));
      [canvas, overlay].forEach(cv => {
        cv.width = W * dpr; cv.height = H * dpr;
        cv.style.width = W + "px"; cv.style.height = H + "px";
      });
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);
      focal = Math.min(W, H) * 1.55;
      if (useGL) {
        const gdpr = Math.min(1.5, dpr);
        glCanvas.width = Math.floor(W * gdpr); glCanvas.height = Math.floor(H * gdpr);
        gl.viewport(0, 0, glCanvas.width, glCanvas.height);
        // FBO de picking 1x N? usamos do tamanho do canvas (menor escala p/ perf)
        const pw = Math.max(64, Math.floor(W / 2)), ph = Math.max(64, Math.floor(H / 2));
        if (!pickTex) pickTex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, pickTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, pw, ph, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        if (!pickFBO) pickFBO = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, pickFBO);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, pickTex, 0);
        const rb = gl.createRenderbuffer(); gl.bindRenderbuffer(gl.RENDERBUFFER, rb);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, pw, ph);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, rb);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        pickFBO.w = pw; pickFBO.h = ph;
      } else if (fallback) fallback.resize();
    }

    function matrices() {
      const view = mMul(mTrans(0, 0, -dist), mMul(mRotX(pitch), mRotZ(yaw)));
      const proj = mPersp(0.92, W / H, 40, 1400);
      return { view, vp: mMul(proj, view), n: m3of(mMul(mRotX(pitch), mRotZ(yaw))) };
    }
    function project(p) {
      const c = Math.cos(yaw), s = Math.sin(yaw);
      const x1 = c * p[0] - s * p[1];
      const y1 = s * p[0] + c * p[1];
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      const y2 = cp * y1 - sp * p[2];
      const z2 = sp * y1 + cp * p[2];
      const depth = Math.max(40, dist - z2);
      const sc = focal / depth;
      return { x: W / 2 + x1 * sc, y: H / 2 - y2 * sc, s: sc, depth, y2: z2 };
    }

    // ---------------- pesos por região ----------------
    function currentWeights() {
      const acc = {};
      regions.forEach(r => { acc[r.id] = 0; });
      let nEnt = 0;
      entities.forEach(e => {
        const meta = ENTITY_META[e];
        if (!meta) return;
        let include = false;
        if (selection.mode === "all") include = true;
        else if (selection.mode === "entity") include = (e === selection.entity);
        else if (selection.mode === "family") include = (meta.family === selection.family);
        if (!include) return;
        nEnt++;
        Object.entries(meta.locations || {}).forEach(([rid, w]) => { if (acc[rid] != null) acc[rid] += w; });
      });
      const total = Object.values(acc).reduce((a, b) => a + b, 0);
      const maxW = Math.max(...Object.values(acc), 0.0001);
      const out = {};
      Object.entries(acc).forEach(([rid, w]) => { out[rid] = { w, pct: total ? (w / total) * 100 : 0, t: w / maxW }; });
      return { out, nEnt, total };
    }
    let cached = null;
    function weights() { return cached || (cached = currentWeights()); }

    function pushHeat() {
      const w = weights();
      for (let v = 0; v < mesh.nVert; v++) {
        const rid = regions[Math.round(mesh.reg[v])];
        mesh.heat[v] = rid ? (w.out[rid.id] || { t: 0 }).t : 0;
      }
      if (useGL) { gl.bindBuffer(gl.ARRAY_BUFFER, heatBuf); gl.bufferSubData(gl.ARRAY_BUFFER, 0, mesh.heat); }
    }

    // ---------------- render GL ----------------
    let selPulse = 0;
    function drawGL() {
      const m = matrices();
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniformMatrix4fv(uVP, false, new Float32Array(m.vp));
      gl.uniformMatrix4fv(uView, false, new Float32Array(m.view));
      gl.uniformMatrix3fv(uN, false, new Float32Array(m.n));
      gl.uniform3f(uLight, -0.42, -0.52, 0.74);
      gl.uniform1f(uHeat, heatOn ? 1 : 0);
      const selIdx = highlightRegion != null ? (REGION_IDX[highlightRegion] != null ? REGION_IDX[highlightRegion] : -1) : -1;
      gl.uniform1f(uSelId, selIdx);
      gl.uniform1f(uSelOn, selIdx >= 0 ? 0.5 + 0.5 * Math.sin(selPulse) : 0);
      const bind = (name, buf, size) => {
        const loc = gl.getAttribLocation(prog, name);
        gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      };
      bind("aPos", bufs.pos, 3); bind("aNrm", bufs.nrm, 3); bind("aBase", bufs.base, 3);
      bind("aHeat", heatBuf, 1); bind("aAO", bufs.ao, 1); bind("aReg", bufs.reg, 1);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufs.idx);
      const type = mesh.idx instanceof Uint32Array ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;
      if (mesh.idx instanceof Uint32Array && !extUint32) return;
      gl.drawElements(gl.TRIANGLES, mesh.nIdx, type, 0);
    }

    function pickRegion(mx, my) {
      if (!useGL) return null;
      const m = matrices();
      gl.bindFramebuffer(gl.FRAMEBUFFER, pickFBO);
      gl.viewport(0, 0, pickFBO.w, pickFBO.h);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(pickProg);
      gl.uniformMatrix4fv(uPickVP, false, new Float32Array(m.vp));
      const lp = gl.getAttribLocation(pickProg, "aPos"), lr = gl.getAttribLocation(pickProg, "aReg");
      gl.bindBuffer(gl.ARRAY_BUFFER, bufs.pos); gl.enableVertexAttribArray(lp); gl.vertexAttribPointer(lp, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, bufs.reg); gl.enableVertexAttribArray(lr); gl.vertexAttribPointer(lr, 1, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufs.idx);
      const type = mesh.idx instanceof Uint32Array ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;
      gl.drawElements(gl.TRIANGLES, mesh.nIdx, type, 0);
      const px = new Uint8Array(4);
      const sx = Math.max(0, Math.min(pickFBO.w - 1, Math.floor(mx / W * pickFBO.w)));
      const sy = Math.max(0, Math.min(pickFBO.h - 1, Math.floor((1 - my / H) * pickFBO.h)));
      gl.readPixels(sx, sy, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, glCanvas.width, glCanvas.height);
      const id = Math.round(px[0]) - 1;
      return id >= 0 && regions[id] ? regions[id].id : null;
    }

    // ---------------- overlay 2D (hotspots profundos, rótulos, bússola) ----------------
    function drawOverlay() {
      octx.clearRect(0, 0, W, H);
      const w = weights();
      const items = [];
      regions.forEach(r => {
        const isDeep = DEEP.includes(r.id);
        if (!isDeep && !(r.shell)) return;
        const info = w.out[r.id] || { w: 0, pct: 0, t: 0 };
        const isHot = info.w > 0.001;
        if (!isHot && !showAnchors) return;
        if (r.shell) {
          if (!isHot) return;
          const pr = project([0, 0, 20]);
          items.push({ depth: 9999, kind: 2, x: pr.x, y: pr.y, r: 128 * pr.s, t: info.t, a: 0.04 + 0.10 * info.t, pct: info.pct, region: r, isHot: true });
          return;
        }
        const pr = project(r.c);
        const facing = pr.y2 > 0 ? 1 : 0.42;
        const size = (isHot ? 8 + 24 * info.t : 5) * pr.s;
        items.push({ depth: pr.depth - 0.6, kind: 1, x: pr.x, y: pr.y, r: size, t: info.t, a: isHot ? (0.28 + 0.44 * facing) : 0.18, region: r, pct: info.pct, isHot, highlight: highlightRegion === r.id || hoverRegion === r.id });
      });
      items.sort((a, b) => b.depth - a.depth);
      items.forEach(it => {
        if (it.kind === 2) {
          octx.globalAlpha = heatOn ? it.a : it.a * 0.5;
          const g = octx.createRadialGradient(it.x, it.y, it.r * 0.6, it.x, it.y, it.r);
          g.addColorStop(0, heatColor(it.t, 0));
          g.addColorStop(0.82, heatColor(it.t, 0.55));
          g.addColorStop(1, heatColor(it.t, 0));
          octx.fillStyle = g;
          octx.beginPath(); octx.ellipse(it.x, it.y, it.r, it.r * 0.94, 0, 0, Math.PI * 2); octx.fill();
        } else {
          octx.globalAlpha = it.a;
          const g = octx.createRadialGradient(it.x, it.y, 0, it.x, it.y, it.r);
          const col = it.isHot ? heatColor(it.t) : "rgba(206,200,186,1)";
          g.addColorStop(0, it.isHot ? heatColor(Math.min(1, it.t + 0.25), 1) : col);
          g.addColorStop(0.5, col);
          g.addColorStop(1, it.isHot ? heatColor(it.t, 0) : "rgba(206,200,186,0)");
          octx.fillStyle = g;
          octx.beginPath(); octx.arc(it.x, it.y, it.r, 0, Math.PI * 2); octx.fill();
          if (it.highlight) {
            octx.globalAlpha = 0.95; octx.strokeStyle = "#1D4ED8"; octx.lineWidth = 2;
            octx.beginPath(); octx.arc(it.x, it.y, it.r + 4, 0, Math.PI * 2); octx.stroke();
          }
          it.screen = { x: it.x, y: it.y, r: it.r };
        }
      });
      octx.globalAlpha = 1;

      // rótulos: mistura hotspots profundos + regiões corticais com peso
      if (showLabels) {
        octx.font = "600 11.5px Georgia, 'Times New Roman', serif";
        octx.textAlign = "center";
        const labelItems = items.filter(i => i.kind === 1 && i.isHot && i.pct >= 3.0).map(i => ({ x: i.screen.x, y: i.screen.y, pct: i.pct, region: i.region }));
        if (useGL) {
          const w2 = weights();
          ["frontal", "parietal", "temporal", "occipital", "cerebellum", "insula"].forEach(rid => {
            const info = w2.out[rid];
            if (!info || info.pct < 3.0) return;
            const r = regionById[rid];
            const pr = project(r.c);
            if (pr.y2 < -6) return;   // só face visível
            labelItems.push({ x: pr.x, y: pr.y, pct: info.pct, region: r });
          });
        }
        const placedPills = [];
        labelItems.sort((a, b) => b.pct - a.pct).slice(0, 9).forEach(it => {
          const vx = (it.x - W / 2) / (W / 2), vy = (it.y - H / 2) / (H / 2);
          const dx = 20 + Math.abs(vx) * 46 * (vx >= 0 ? 1 : -1) * 0.6;
          let dy = -16 - Math.abs(vy) * 26;
          const label = `${RLOC(it.region).short} · ${Math.round(it.pct)}%`;
          const wEst = octx.measureText(label).width + 16;
          let lx0 = it.x + dx - wEst / 2, ly0 = it.y + dy - 13;
          let guard = 0;
          while (guard++ < 24 && placedPills.some(r => lx0 < r.x + r.w && lx0 + wEst > r.x && ly0 < r.y + r.h && ly0 + 18 > r.y)) { ly0 += 20; dy += 20; }
          placedPills.push({ x: lx0, y: ly0, w: wEst, h: 18 });
          const wpx = octx.measureText(label).width + 12;
          const lx = Math.max(wpx / 2 + 6, Math.min(W - wpx / 2 - 6, it.x + dx * 0.55));
          const ly = Math.max(20, Math.min(H - 12, it.y + dy));
          octx.globalAlpha = 0.95;
          octx.strokeStyle = "rgba(30,64,175,0.55)"; octx.lineWidth = 1;
          octx.beginPath(); octx.moveTo(it.x, it.y); octx.lineTo(lx, ly); octx.stroke();
          octx.fillStyle = "rgba(255,253,246,0.95)";
          roundRect(octx, lx - wpx / 2, ly - 13, wpx, 17, 8); octx.fill();
          octx.strokeStyle = "rgba(30,64,175,0.40)"; roundRect(octx, lx - wpx / 2, ly - 13, wpx, 17, 8); octx.stroke();
          octx.fillStyle = "#111111";
          octx.fillText(label, lx, ly - 1);
        });
        octx.globalAlpha = 1; octx.textAlign = "start";
      }
      drawCompass();
      return items;
    }

    function roundRect(c, x, y, w, h, r) {
      c.beginPath();
      c.moveTo(x + r, y); c.lineTo(x + w - r, y); c.quadraticCurveTo(x + w, y, x + w, y + r);
      c.lineTo(x + w, y + h - r); c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      c.lineTo(x + r, y + h); c.quadraticCurveTo(x, y + h, x, y + h - r);
      c.lineTo(x, y + r); c.quadraticCurveTo(x, y, x + r, y);
      c.closePath();
    }
    function drawCompass() {
      const o = { x: 44, y: H - 40 }, L = 22;
      const axes = [
        { v: [1, 0, 0], lab: "E" }, { v: [-1, 0, 0], lab: "D" },
        { v: [0, 1, 0], lab: "A" }, { v: [0, -1, 0], lab: "P" },
        { v: [0, 0, 1], lab: "S" }
      ];
      octx.font = "600 10px Inter, system-ui, sans-serif";
      octx.globalAlpha = 0.75;
      axes.forEach(a => {
        const p0 = project([0, 0, 0]);
        const p1 = project([a.v[0] * L * 2.4, a.v[1] * L * 2.4, a.v[2] * L * 2.4]);
        const dx = p1.x - p0.x, dy = p1.y - p0.y;
        const n = Math.hypot(dx, dy) || 1;
        octx.strokeStyle = "#5B74A8"; octx.lineWidth = 1.4;
        octx.beginPath(); octx.moveTo(o.x, o.y); octx.lineTo(o.x + dx / n * L, o.y + dy / n * L); octx.stroke();
        octx.fillStyle = "#3F3F3F";
        octx.fillText(a.lab, o.x + dx / n * (L + 8) - 3, o.y + dy / n * (L + 8) + 3);
      });
      octx.globalAlpha = 1;
    }

    // ---------------- fallback 2D (sem WebGL) ----------------
    function buildFallback() {
      const ctx2 = ctxMain;
      let brain = null;
      function build() {
        const structures = [];
        const fib = n => {
          const pts = [], ga = Math.PI * (3 - Math.sqrt(5));
          for (let i = 0; i < n; i++) {
            const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(Math.max(0, 1 - y * y)), th = ga * i;
            pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
          }
          return pts;
        };
        const pts = [];
        fib(5200).forEach(([ux, uy, uz]) => {
          let x = ux * 68, y = uy * 84, z = uz * 56;
          const mid = Math.exp(-(x * x) / 60);
          if (z > 4) z -= 11 * mid * Math.min(1, (z - 4) / 40);
          if (z < -6) z *= 0.82;
          if (y < -40) { const k = 1 - 0.2 * Math.min(1, (-y - 40) / 44); x *= k; }
          if (y > 30) y *= 1.05;
          const bump = 1 + 0.02 * gyri(x, y, z);
          if (z < -10 && Math.abs(x) > 18) z *= 1.08;
          x *= bump; y *= bump; z *= bump;
          pts.push({ p: [x, y + 2, z + 24], n: [ux, uz, uy], c: 0 });
        });
        structures.push({ pts, base: [226, 196, 184], r: 1.45 });
        const cpts = [];
        fib(1500).forEach(([ux, uy, uz]) => {
          let x = ux * 44, y = uy * 30, z = uz * 26;
          const stria = 1 + 0.05 * Math.sign(z) * Math.sin(Math.abs(z) * 1.2);
          x *= stria; y *= stria;
          if (y > 6) y *= 0.88;
          cpts.push({ p: [x, y - 64, z - 34], n: [ux, uz, uy], c: 1 });
        });
        structures.push({ pts: cpts, base: [214, 180, 170], r: 1.4 });
        const bpts = [];
        const path = [[0, -26, -2], [0, -38, -14], [0, -49, -28], [0, -55, -46], [0, -56, -80]];
        for (let i = 0; i < path.length - 1; i++) {
          const a = path[i], b = path[i + 1];
          for (let t = 0; t < 1; t += 0.06) {
            const cx = a[0] + (b[0] - a[0]) * t, cy = a[1] + (b[1] - a[1]) * t, cz = a[2] + (b[2] - a[2]) * t;
            const rad = 10 - 4 * (i / (path.length - 1)) - 1.5 * t;
            for (let k = 0; k < 12; k++) {
              const th = (k / 12) * Math.PI * 2;
              bpts.push({ p: [cx + Math.cos(th) * rad, cy, cz + Math.sin(th) * rad], n: [Math.cos(th), 0, Math.sin(th)], c: 2 });
            }
          }
        }
        structures.push({ pts: bpts, base: [220, 192, 182], r: 1.5 });
        structures.forEach(st => { st.sprites = [0, 1, 2, 3, 4, 5].map(i => shadeSprite(st.base, 0.5 + i * 0.12)); });
        return { structures };
      }
      const LW = [-0.42, -0.52, 0.74];
      return {
        resize() { ctx2.setTransform(dpr, 0, 0, dpr, 0, 0); },
        draw() {
          if (!brain) brain = build();
          ctx2.clearRect(0, 0, W, H);
          const bg = ctx2.createLinearGradient(0, 0, 0, H);
          bg.addColorStop(0, "#F6F2E6"); bg.addColorStop(0.55, "#F1ECDD"); bg.addColorStop(1, "#EDE7D5");
          ctx2.fillStyle = bg; ctx2.fillRect(0, 0, W, H);
          const items = [];
          brain.structures.forEach(st => {
            st.pts.forEach(pt => {
              const pr = project(pt.p);
              const d = Math.max(0, pt.n[0] * LW[0] + pt.n[1] * LW[1] + pt.n[2] * LW[2]);
              const li = Math.min(5, Math.floor(d * 5.2));
              items.push({ depth: pr.depth, x: pr.x, y: pr.y, r: st.r * pr.s * 1.5, sprite: st.sprites[li] });
            });
          });
          items.sort((a, b) => b.depth - a.depth);
          items.forEach(it => ctx2.drawImage(it.sprite, it.x - it.r, it.y - it.r, it.r * 2, it.r * 2));
        }
      };
    }

    // ---------------- interação ----------------
    function hitHotspot(mx, my) {
      const w = weights();
      let best = null;
      regions.forEach(r => {
        if (!DEEP.includes(r.id)) return;
        const info = w.out[r.id] || { w: 0 };
        const active = info.w > 0.001 || showAnchors;
        if (!active) return;
        const pr = project(r.c);
        const t = info.w > 0.001 ? info.t : 0;
        const size = (info.w > 0.001 ? 8 + 24 * t : 6) * pr.s;
        const d = Math.hypot(pr.x - mx, pr.y - my);
        if (d < Math.max(11, size * 0.75) && (!best || pr.depth < best.pr.depth)) best = { r, pr, info };
      });
      return best;
    }
    function pickAt(mx, my) {
      const hs = hitHotspot(mx, my);
      if (hs) return hs.r.id;
      if (useGL) return pickRegion(mx, my);
      return null;
    }
    function pointerPos(e) {
      const rect = canvas.getBoundingClientRect();
      const src = e.touches ? e.touches[0] : e;
      return { x: src.clientX - rect.left, y: src.clientY - rect.top };
    }

    canvas.addEventListener("pointerdown", e => {
      dragging = true; canvas.setPointerCapture(e.pointerId);
      const p = pointerPos(e); lastX = p.x; lastY = p.y;
      auto = false; const cb = container.querySelector("#viz-auto"); if (cb) cb.checked = false;
    });
    canvas.addEventListener("pointermove", e => {
      const p = pointerPos(e);
      if (dragging) {
        yaw += (p.x - lastX) * 0.008;
        pitch = Math.max(-2.2, Math.min(-0.05, pitch + (p.y - lastY) * 0.007));
        lastX = p.x; lastY = p.y;
        tooltip.hidden = true;
      } else {
        const rid = pickAt(p.x, p.y);
        hoverRegion = rid;
        canvas.style.cursor = rid ? "pointer" : "grab";
        if (rid) {
          const w = weights();
          const r = regionById[rid];
          const info = w.out[rid] || { pct: 0 };
          tooltip.hidden = false;
          tooltip.style.left = Math.min(W - 240, p.x + 14) + "px";
          tooltip.style.top = (p.y + 12) + "px";
          tooltip.innerHTML = `<strong>${CH.esc(RLOC(r).label)}</strong>
            <span>${Math.round(info.pct)}% da concentração total · clique para funções e tumores</span>
            <em>${CH.esc(RLOC(r).func || RLOC(r).desc || "")}</em>`;
        } else tooltip.hidden = true;
      }
    });
    canvas.addEventListener("pointerup", e => {
      const p = pointerPos(e);
      const moved = Math.hypot(p.x - lastX, p.y - lastY);
      if (moved < 3) {
        const rid = pickAt(p.x, p.y);
        if (rid) setHighlight(rid === highlightRegion ? null : rid);
        else setHighlight(null);
      }
      dragging = false;
    });
    canvas.addEventListener("pointerleave", () => { dragging = false; tooltip.hidden = true; hoverRegion = null; });
    canvas.addEventListener("wheel", e => {
      e.preventDefault();
      dist = Math.max(170, Math.min(760, dist + e.deltaY * 0.35));
    }, { passive: false });
    let pinch = null;
    canvas.addEventListener("touchstart", e => {
      if (e.touches.length === 2) {
        const a = e.touches[0], b = e.touches[1];
        pinch = { d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), dist };
      }
    }, { passive: true });
    canvas.addEventListener("touchmove", e => {
      if (e.touches.length === 2 && pinch) {
        e.preventDefault();
        const a = e.touches[0], b = e.touches[1];
        const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
        dist = Math.max(170, Math.min(760, pinch.dist * (pinch.d / Math.max(1, d))));
      }
    }, { passive: false });
    canvas.addEventListener("touchend", () => { pinch = null; });

    container.querySelectorAll(".viz-presets .chip-btn").forEach(b => b.addEventListener("click", () => setView(b.dataset.view)));
    container.querySelector("#viz-auto").addEventListener("change", e => { auto = e.target.checked; });
    container.querySelector("#viz-labels").addEventListener("change", e => { showLabels = e.target.checked; });
    container.querySelector("#viz-anchors").addEventListener("change", e => { showAnchors = e.target.checked; });
    container.querySelector("#viz-heat").addEventListener("change", e => { heatOn = e.target.checked; });

    function setView(v) {
      auto = false; container.querySelector("#viz-auto").checked = false;
      const views = {
        left: { yaw: Math.PI / 2, pitch: -1.39 }, right: { yaw: -Math.PI / 2, pitch: -1.39 },
        front: { yaw: Math.PI, pitch: -1.39 }, back: { yaw: 0, pitch: -1.39 },
        top: { yaw: 0, pitch: -0.12 }, reset: { yaw: 2.40, pitch: -1.15 }
      };
      const t = views[v] || views.reset;
      animateTo(t.yaw, t.pitch);
    }
    function animateTo(ty, tp) {
      const sy = yaw, sp = pitch, t0 = performance.now();
      (function step(now) {
        const k = Math.min(1, (now - t0) / 450);
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        yaw = sy + (ty - sy) * e; pitch = sp + (tp - sp) * e;
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    }

    // ---------------- painel lateral (funções + neoplasias) ----------------
    function setHighlight(id) {
      highlightRegion = id;
      renderRegionList();
      renderRegionDetail();
    }
    function renderRegionList() {
      const w = weights();
      const rows = regions.filter(r => !r.shell)
        .map(r => ({ r, info: w.out[r.id] || { w: 0, pct: 0, t: 0 } }))
        .sort((a, b) => b.info.w - a.info.w);
      const top = rows.filter(x => x.info.w > 0.001).slice(0, 12);
      regionList.innerHTML = top.map(({ r, info }) => `
        <li class="${highlightRegion === r.id ? "active" : ""}" data-region="${r.id}">
          <span class="rg-dot" style="background:${heatColor(info.t)}"></span>
          <span class="rg-name">${CH.esc(RLOC(r).short)}</span>
          <span class="rg-track"><span class="rg-fill" style="width:${Math.max(3, info.pct)}%;background:${heatColor(info.t)}"></span></span>
          <span class="rg-pct">${info.pct.toFixed(1)}%</span>
        </li>`).join("") || `<li class="empty">Nenhuma região com concentração registrada para esta seleção.</li>`;
      regionList.querySelectorAll("li[data-region]").forEach(li => {
        li.addEventListener("click", () => setHighlight(li.dataset.region === highlightRegion ? null : li.dataset.region));
      });
    }
    function renderRegionDetail() {
      const rid = highlightRegion;
      if (!rid) {
        const w = weights();
        regionDetail.innerHTML = `<p class="rd-note">${selection.mode === "all"
          ? `Mostrando a distribuição combinada de <strong>${w.nEnt}</strong> entidades catalogadas. Escolha um tumor específico no seletor acima para ver apenas o padrão dele.`
          : ""}</p>
          <p class="rd-note"><strong>Dica:</strong> clique diretamente sobre o cérebro, o cerebelo ou o tronco para abrir a ficha da área — com as funções normais e o que um tumor ali pode causar.</p>`;
        return;
      }
      const r = regionById[rid];
      const w = weights();
      const info = w.out[rid] || { pct: 0, t: 0 };
      const ents = entities.filter(e => ENTITY_META[e] && (ENTITY_META[e].locations || {})[rid])
        .map(e => ({ e, w: (ENTITY_META[e].locations || {})[rid] }))
        .sort((a, b) => b.w - a.w);
      const maxE = ents.length ? ents[0].w : 1;
      regionDetail.innerHTML = `
        <h5>${CH.esc(RLOC(r).label)} <span class="rd-pct">${info.pct.toFixed(1)}%</span></h5>
        <p class="rd-func"><strong>${window.ICO?ICO("brain"):""} ${(window.I18N&&I18N.lang==="en")?"Functions of this area:":"Funções desta área:"}</strong> ${CH.esc(RLOC(r).func || RLOC(r).desc || "")}</p>
        <p class="rd-def"><strong>${window.ICO?ICO("alert"):""} ${(window.I18N&&I18N.lang==="en")?"If a neoplasm grows here:":"Se uma neoplasia cresce aqui:"}</strong> ${CH.esc(RLOC(r).deficit || "—")}</p>
        <p class="rd-group"><strong>Compartimento:</strong> ${CH.esc(REGION_GROUP_LABEL[r.group] || r.group)}</p>
        <p class="rd-ents"><strong>Neoplasias que ocorrem nesta área</strong> (peso relativo na literatura):</p>
        <ul class="rd-ent-list">${ents.length ? ents.slice(0, 8).map(({ e, w: ew }) => `
          <li><button type="button" class="chip-btn tiny" data-jump="${CH.esc(e)}">${CH.esc(e)}</button>
          <span class="rd-ent-bar"><span style="width:${Math.round(ew / maxE * 100)}%"></span></span></li>`).join("") : "<li>—</li>"}</ul>`;
      regionDetail.querySelectorAll("[data-jump]").forEach(b => {
        b.addEventListener("click", () => { if (opts.onJumpEntity) opts.onJumpEntity(b.dataset.jump); });
      });
    }

    // ---------------- API pública ----------------
    function setSelection(sel) { selection = sel; cached = null; pushHeat(); renderRegionList(); renderRegionDetail(); }
    function refresh() { cached = null; pushHeat(); renderRegionList(); renderRegionDetail(); }

    let last = 0;
    function loop(ts) {
      if (auto) yaw += 0.0035;
      selPulse = (ts || 0) / 260;
      if (ts - last > 30) {
        if (useGL) {
          drawGL();
          ctxMain.setTransform(1, 0, 0, 1, 0, 0);
          ctxMain.drawImage(glCanvas, 0, 0, canvas.width, canvas.height);
        } else if (fallback) {
          ctxMain.setTransform(dpr, 0, 0, dpr, 0, 0);
          fallback.draw();
        }
        drawOverlay();
        last = ts;
      }
      requestAnimationFrame(loop);
    loadRealMesh();
    }

    resize();
    window.addEventListener("resize", () => resize());
    pushHeat();
    renderRegionList(); renderRegionDetail();
    requestAnimationFrame(loop);

    window.__VIZ = {
      gl: () => gl, prog: () => prog, pickProg: () => pickProg,
      get mesh() { return mesh; }, realMesh: () => !!(mesh && mesh.real),
      matrices, draw: drawGL, pick: pickRegion, useGL: () => useGL,
      project, state: () => ({ yaw, pitch, dist, W, H }),
      setPose: (y, p) => { yaw = y; pitch = p; auto = false; }
    };
    return { setSelection, refresh, setView, resize, weights: () => (cached = currentWeights()), webgl: useGL };
  }

  window.initBrainViz = initBrainViz;
  window.heatColor = heatColor;
})();
