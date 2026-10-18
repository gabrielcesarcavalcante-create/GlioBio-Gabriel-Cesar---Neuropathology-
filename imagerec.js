// =====================================================================
// imagerec.js — GlioBio v2.5: análise educacional de imagem.
// Extrai descritores quantitativos (brilho, desvio, bimodalidade,
// frações escura/clara, densidade de bordas, textura GLCM, saturação)
// e compara com assinaturas visuais CURADAS por tipo de glioma
// (padrões descritos na literatura de neuroimagem e histopatologia).
// Não é diagnóstico: é estimativa de compatibilidade de padrão visual.
// =====================================================================
(function () {
  "use strict";
  function t(k) { return window.I18N ? I18N.t(k) : k; }
  function en() { return window.I18N && I18N.lang === "en"; }
  function esc(x) { return String(x == null ? "" : x).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  // f: {sd, bimod, pDark, pBright, edges, contr, homog, entropy, skew, kurt, energy, corr, aniso, ring, pvb[, sat]} — v2.8
  // Assinaturas v2.7: recalibradas ("treinadas") sobre 35 imagens reais de glioma
  // (22 RM + 15 H&E rotuladas, Wikimedia Commons): cada assinatura = média real mediana + deslocamento
  // morfológico da literatura; tolerâncias = desvios medidos no conjunto real.
  var REAL_CAL = {
    mri:   { n: 29, mean: { mean: 0.4059, sd: 0.1787, bimod: 0.6512, pDark: 0.2222, pBright: 0.0851, edges: 0.8392, contr: 0.0751, homog: 0.8228, sat: 0.0664 },
             sd:   { mean: 0.1942, sd: 0.0580, bimod: 0.2809, pDark: 0.1850, pBright: 0.1876, edges: 0.1691, contr: 0.0406, homog: 0.0649, sat: 0.0936 } },
    histo: { n: 15, mean: { mean: 0.6890, sd: 0.0914, bimod: 0.2136, pDark: 0.0054, pBright: 0.1225, edges: 0.6563, contr: 0.0594, homog: 0.7998, sat: 0.1865 },
             sd:   { mean: 0.0791, sd: 0.0337, bimod: 0.1610, pDark: 0.0147, pBright: 0.1401, edges: 0.2454, contr: 0.0321, homog: 0.0710, sat: 0.1073 } }
  };
  var SIG = [
    { entity: "Glioblastoma, IDH-wildtype", mod: "mri", f: { sd: 0.194, bimod: 0.752, pDark: 0.23, pBright: 0.088, edges: 0.847, contr: 0.089, homog: 0.82, entropy: 0.806, skew: 0.486, kurt: 2.273, energy: 0.085, corr: 0.927, aniso: 0.527, ring: 0.681, pvb: 0.034 }, why: "Assinatura treinada em 16 RM reais de GBM + literatura: padrão heterogêneo com necrose central (áreas escuras) e realce anelar irregular: alta variância, bimodalidade forte, bordas numerosas e índice anelar elevado." },
    { entity: "Astrocitoma, IDH-mutante", mod: "mri", f: { sd: 0.188, bimod: 0.648, pDark: 0.153, pBright: 0.078, edges: 0.796, contr: 0.115, homog: 0.809, entropy: 0.803, skew: 0.206, kurt: 1.732, energy: 0.086, corr: 0.936, aniso: 0.542, ring: 0.51, pvb: 0.015 }, why: "Assinatura treinada em 3 RM reais de astrocitoma IDH-mutante + literatura: lesão infiltrativa mal delimitada, relativamente homogênea e com pouco realce: variância, textura e índice anelar menores." },
    { entity: "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado", mod: "mri", f: { sd: 0.134, bimod: 0.391, pDark: 0.118, pBright: 0.087, edges: 0.739, contr: 0.081, homog: 0.801, entropy: 0.74, skew: -0.032, kurt: 2.135, energy: 0.09, corr: 0.881, aniso: 0.532, ring: 0.443, pvb: 0.032 }, why: "Assinatura treinada em 3 RM reais de oligodendroglioma + literatura: calcificações (focos muito brilhantes) e componente cístico cortical: fração clara e pvb acima da média real." },
    { entity: "Astrocitoma pilocítico", mod: "mri", f: { sd: 0.19, bimod: 0.8, pDark: 0.404, pBright: 0.158, edges: 0.695, contr: 0.094, homog: 0.825, entropy: 0.735, skew: 0.531, kurt: 1, energy: 0.113, corr: 0.944, aniso: 0.526, ring: 0.554, pvb: 0.021 }, why: "Cisto bem delimitado (grande região escura uniforme) + nódulo mural realçado: fração escura e assimetria muito acima da média real." },
    { entity: "Glioma difuso de linha média, H3 K27-alterado", mod: "mri", f: { sd: 0.1, bimod: 0.12, pDark: 0.004, pBright: 0.138, edges: 0.595, contr: 0.086, homog: 0.845, entropy: 0.715, skew: 0, kurt: 1, energy: 0.123, corr: 0.944, aniso: 0.526, ring: 0.444, pvb: 0.021 }, why: "Lesão difusa e expansiva de tronco/linha média, homogênea e com pouco realce: variância, bimodalidade e entropia mínimas." },
    { entity: "Ependimoma", mod: "mri", f: { sd: 0.17, bimod: 0.6, pDark: 0.184, pBright: 0.178, edges: 0.715, contr: 0.109, homog: 0.795, entropy: 0.795, skew: 0.231, kurt: 1, energy: 0.083, corr: 0.914, aniso: 0.526, ring: 0.604, pvb: 0.051 }, why: "Lesão intraventricular heterogênea com cistos, calcificação e sangramento: frações escura e clara acima da média." },
    { entity: "Histopatologia (H&E): glioma de alto grau", mod: "histo", f: { sd: 0.135, bimod: 0.418, pDark: 0.025, pBright: 0.025, edges: 0.909, contr: 0.107, homog: 0.709, entropy: 0.76, skew: -0.156, kurt: 1.945, energy: 0.055, corr: 0.806, aniso: 0.508, ring: 0.083, pvb: 0.009, sat: 0.301 }, why: "Assinatura treinada em 3 H&E reais de GBM + literatura: lâmina H&E hipercelular (núcleos púrpura densos), necrose e proliferação vascular: textura e entropia muito altas." },
    { entity: "Histopatologia (H&E): glioma de baixo grau", mod: "histo", f: { sd: 0.1, bimod: 0.25, pDark: 0, pBright: 0.083, edges: 0.744, contr: 0.094, homog: 0.743, entropy: 0.62, skew: 0, kurt: 1, energy: 0.114, corr: 0.827, aniso: 0.505, ring: 0.002, pvb: 0.019, sat: 0.264 }, why: "Lâmina H&E paucicelular com fundo monótono e claro: textura, entropia e assimetria mais baixas." }
  ];
  var TOL = { sd: 0.056, bimod: 0.259, pDark: 0.154, pBright: 0.178, edges: 0.209, contr: 0.038, homog: 0.06, entropy: 0.088, skew: 0.774, kurt: 2.484, energy: 0.059, corr: 0.06, aniso: 0.06, ring: 0.3, pvb: 0.06, sat: 0.091 };
  // pesos discriminativos (v2.8.1): razão variância ENTRE entidades / variância DENTRO, normalizada; medidos em 45 imagens reais
  var WDISC = {"sd": 2.09, "bimod": 2.48, "pDark": 0.51, "pBright": 0.8, "edges": 0.78, "contr": 1.45, "homog": 0.73, "entropy": 1.94, "skew": 1.61, "kurt": 0.96, "energy": 0.4, "corr": 2.03, "aniso": 0.52, "ring": 0.63, "pvb": 0.83};

  function extract(img) {
    var N = 128, cv = document.createElement("canvas");
    cv.width = N; cv.height = N;
    var cx = cv.getContext("2d", { willReadFrequently: true });
    cx.drawImage(img, 0, 0, N, N);
    var d = cx.getImageData(0, 0, N, N).data;
    var G = new Float32Array(N * N), satAll = 0;
    for (var i = 0; i < N * N; i++) {
      var r = d[i * 4] / 255, gg = d[i * 4 + 1] / 255, b = d[i * 4 + 2] / 255;
      G[i] = 0.299 * r + 0.587 * gg + 0.114 * b;
      var mx = Math.max(r, gg, b), mn = Math.min(r, gg, b);
      satAll += mx > 0 ? (mx - mn) / mx : 0;
    }
    satAll /= N * N;
    // recorta ao primeiro plano (remove fundo preto do exame)
    var x0 = N, y0 = N, x1 = -1, y1 = -1;
    for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
      if (G[y * N + x] > 0.10) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    if (x1 - x0 < 24 || y1 - y0 < 24) { x0 = 0; y0 = 0; x1 = N - 1; y1 = N - 1; }
    var W = x1 - x0 + 1, H = y1 - y0 + 1, M = W * H;
    var g = new Float32Array(M), sat = 0;
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
      var j = (y + y0) * N + (x + x0), k = y * W + x;
      g[k] = G[j];
      r = d[j * 4] / 255; gg = d[j * 4 + 1] / 255; b = d[j * 4 + 2] / 255;
      mx = Math.max(r, gg, b); mn = Math.min(r, gg, b);
      sat += mx > 0 ? (mx - mn) / mx : 0;
    }
    sat /= M;
    var mean = 0; for (i = 0; i < M; i++) mean += g[i]; mean /= M;
    var sd = 0; for (i = 0; i < M; i++) sd += (g[i] - mean) * (g[i] - mean); sd = Math.sqrt(sd / M);
    // histograma 32 bins + bimodalidade de Otsu (variância entre classes)
    var H32 = new Array(32).fill(0);
    for (i = 0; i < M; i++) H32[Math.min(31, Math.floor(g[i] * 32))]++;
    var best = 0;
    for (var t = 1; t < 32; t++) {
      var w0 = 0, m0 = 0, w1 = 0, m1 = 0;
      for (var q2 = 0; q2 < t; q2++) { w0 += H32[q2]; m0 += H32[q2] * (q2 + .5) / 32; }
      for (q2 = t; q2 < 32; q2++) { w1 += H32[q2]; m1 += H32[q2] * (q2 + .5) / 32; }
      if (!w0 || !w1) continue;
      m0 /= w0; m1 /= w1;
      var between = (w0 / M) * (w1 / M) * (m0 - m1) * (m0 - m1);
      if (between > best) best = between;
    }
    var bimod = Math.min(1, best / 0.03);
    var pDark = 0, pBright = 0, pvb = 0;
    for (i = 0; i < M; i++) { if (g[i] >= 0.10 && g[i] < 0.30) pDark++; if (g[i] > 0.82) pBright++; if (g[i] > 0.90) pvb++; }
    pDark /= M; pBright /= M; pvb /= M;
    // momentos: skewness, kurtose e entropia de Shannon (32 bins, normalizada /5)
    var m3 = 0, m4 = 0;
    for (i = 0; i < M; i++) { var dv = g[i] - mean; m3 += dv * dv * dv; m4 += dv * dv * dv * dv; }
    var skew = sd > 1e-6 ? Math.max(-3, Math.min(3, (m3 / M) / (sd * sd * sd))) : 0;
    var kurt = sd > 1e-6 ? Math.max(1, Math.min(12, (m4 / M) / (sd * sd * sd * sd))) : 3;
    var ent = 0;
    for (i = 0; i < 32; i++) { var pp = H32[i] / M; if (pp > 0) ent -= pp * Math.log(pp) / Math.LN2; }
    ent = Math.min(1, ent / 5);
    // percentis p10/p90 do recorte
    var sorted = Array.prototype.slice.call(g).sort(function (a2, b2) { return a2 - b2; });
    var p10 = sorted[Math.floor(M * 0.10)], p90 = sorted[Math.floor(M * 0.90)];
    // bordas: gradiente central médio + anisotropia (horizontal × vertical)
    var edges = 0, ne = 0, sx = 0, sy = 0;
    for (y = 2; y < H - 2; y++) for (x = 2; x < W - 2; x++) {
      k = y * W + x;
      var gx = Math.abs(g[k + 2] - g[k - 2]), gy = Math.abs(g[k + 2 * W] - g[k - 2 * W]);
      edges += gx + gy; sx += gx; sy += gy; ne++;
    }
    edges = Math.min(1, (edges / ne) / 0.25);
    var aniso = (sx + sy) > 1e-9 ? (sx - sy) / (sx + sy) : 0;
    var anisoN = (aniso + 1) / 2;
    // índice de realce anelar: fração de pixels claros com núcleo escuro a ≤4 px
    var ring = 0, nb = 0;
    for (y = 4; y < H - 4; y += 1) for (x = 4; x < W - 4; x += 1) {
      k = y * W + x;
      if (g[k] <= 0.55) continue;
      nb++;
      var found = 0;
      for (var wy = -4; wy <= 4 && !found; wy += 2) for (var wx = -4; wx <= 4; wx += 2) {
        if (g[k + wy * W + wx] < 0.25) { found = 1; break; }
      }
      ring += found;
    }
    ring = nb ? ring / nb : 0;
    // GLCM 16 níveis, offsets (1,0) e (0,1)
    var L = 16, C = new Float32Array(L * L), np = 0;
    var qq = function (v) { return Math.min(L - 1, Math.floor(v * L)); };
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
      k = y * W + x;
      if (x + 1 < W) { C[qq(g[k]) * L + qq(g[k + 1])]++; np++; }
      if (y + 1 < H) { C[qq(g[k]) * L + qq(g[k + W])]++; np++; }
    }
    for (i = 0; i < L * L; i++) C[i] /= np;
    var contr = 0, homog = 0;
    for (i = 0; i < L; i++) for (var jj = 0; jj < L; jj++) {
      var dd = (i - jj) / (L - 1);
      contr += C[i * L + jj] * dd * dd;
      homog += C[i * L + jj] / (1 + dd * dd * 64);
    }
    contr = Math.min(1, contr * 8); homog = Math.min(1, homog);
    // GLCM: energia (ASM) e correlação normalizada
    var energy = 0, mi = 0, mj = 0, si2 = 0, sj2 = 0, cij = 0;
    for (i = 0; i < L; i++) for (jj = 0; jj < L; jj++) { var cv2 = C[i * L + jj]; energy += cv2 * cv2; mi += cv2 * i; mj += cv2 * jj; }
    for (i = 0; i < L; i++) for (jj = 0; jj < L; jj++) { var cv3 = C[i * L + jj]; si2 += cv3 * (i - mi) * (i - mi); sj2 += cv3 * (jj - mj) * (jj - mj); }
    si2 = Math.sqrt(si2); sj2 = Math.sqrt(sj2);
    for (i = 0; i < L; i++) for (jj = 0; jj < L; jj++) cij += C[i * L + jj] * (i - mi) * (jj - mj);
    var corrN = (si2 > 1e-6 && sj2 > 1e-6) ? (cij / (si2 * sj2) + 1) / 2 : 0.5;
    energy = Math.min(1, energy);
    return { mean: mean, sd: sd, bimod: bimod, pDark: pDark, pBright: pBright, edges: edges, contr: contr, homog: homog, sat: sat, entropy: ent, skew: skew, kurt: kurt, energy: energy, corr: corrN, aniso: anisoN, ring: ring, pvb: pvb, p10: p10, p90: p90, crop: [x0, y0, W, H] };
  }

  function match(f) {
    var mod = f.sat > 0.22 ? "histo" : "mri";
    var scored = SIG.filter(function (s) { return s.mod === mod; }).map(function (s) {
      var d = 0, n = 0;
      Object.keys(TOL).forEach(function (k) {
        if (k === "sat") return;
        var sv = s.f[k] != null ? s.f[k] : 0;
        var wk = WDISC[k] != null ? WDISC[k] : 1;
        d += wk * Math.pow((f[k] - sv) / TOL[k], 2); n += wk;
      });
      return { s: s, sim: Math.exp(-(d / n)) };
    }).sort(function (a, b) { return b.sim - a.sim; });
    return { mod: mod, ranked: scored };
  }

  var LB = {
    mean: ["Brilho médio", "Mean brightness"], sd: ["Desvio (textura)", "Std (texture)"], bimod: ["Bimodalidade (Otsu)", "Bimodality (Otsu)"],
    pDark: ["Tecido escuro", "Dark tissue"], pBright: ["Áreas claras", "Bright areas"], edges: ["Bordas", "Edges"],
    contr: ["Contraste GLCM", "GLCM contrast"], homog: ["Homogeneidade GLCM", "GLCM homogeneity"], sat: ["Saturação de cor", "Color saturation"],
    entropy: ["Entropia de Shannon", "Shannon entropy"], skew: ["Assimetria (skew)", "Skewness"], kurt: ["Curtose", "Kurtosis"],
    energy: ["Energia GLCM (ASM)", "GLCM energy (ASM)"], corr: ["Correlação GLCM", "GLCM correlation"], aniso: ["Anisotropia H×V", "H×V anisotropy"],
    ring: ["Índice de realce anelar", "Ring-enhancement index"], pvb: ["Focos muito brilhantes", "Very bright foci"], p10: ["Percentil 10", "10th percentile"], p90: ["Percentil 90", "90th percentile"]
  };
  function lb(k) { var e = LB[k] || [k, k]; return en() ? e[1] : e[0]; }
  function fmtv(k, v) {
    if (k === "skew" || k === "kurt") return v.toFixed(2);
    if (k === "p10" || k === "p90") return v.toFixed(2);
    return (v * 100).toFixed(0) + "%";
  }
  function render() {
    var el = document.querySelector("#imagem-root"); if (!el) return;
    el.innerHTML =
      '<div class="img-drop" id="ir-drop" tabindex="0" role="button" aria-label="' + esc(t("img.drop")) + '">' + (window.ICO ? ICO("upload", "ico-lg") : "") + '<span>' + esc(t("img.drop")) + '<br><span class="hint">' + esc(t("img.dropsub")) + '</span></span></div>' +
      '<input type="file" id="ir-file" accept="image/*" hidden>' +
      '<img id="ir-preview" class="img-preview" alt="" hidden>' +
      '<div style="margin-top:10px"><button class="btn-primary" id="ir-run" type="button" disabled>' + (window.ICO ? ICO("scan") : "") + '<span>' + esc(t("img.run")) + '</span></button></div>' +
      '<div id="ir-out"></div>';
    var drop = el.querySelector("#ir-drop"), file = el.querySelector("#ir-file");
    var prev = el.querySelector("#ir-preview"), run = el.querySelector("#ir-run"), out = el.querySelector("#ir-out");
    var img = new Image();
    function setSrc(src) {
      img.onload = function () { prev.hidden = false; run.disabled = false; out.innerHTML = ""; };
      img.src = src;
    }
    function handle(f2) {
      if (!f2 || !/^image\//.test(f2.type)) return;
      var rd = new FileReader();
      rd.onload = function () { prev.src = rd.result; setSrc(rd.result); };
      rd.readAsDataURL(f2);
    }
    drop.addEventListener("click", function () { file.click(); });
    drop.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") file.click(); });
    file.addEventListener("change", function () { handle(file.files[0]); });
    ["dragover", "dragenter"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("drag"); }); });
    ["dragleave", "drop"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("drag"); }); });
    drop.addEventListener("drop", function (e) { handle(e.dataTransfer.files[0]); });

    run.addEventListener("click", function () {
      var f = extract(img);
      var r = match(f);
      var top = r.ranked[0];
      var lowConf = top.sim < 0.55;
      var cal = REAL_CAL[r.mod];
      var z = 0, zn = 0;
      Object.keys(cal.mean).forEach(function (k) { if (k === 'mean' || k === 'sat') return; z += Math.abs(f[k] - cal.mean[k]) / Math.max(cal.sd[k], .04); zn++; });
      z /= zn;
      var offReal = z > 2.0;
      out.innerHTML =
        '<div class="img-feats">' +
        '<div><strong>' + (en() ? "Detected modality:" : "Modalidade detectada:") + '</strong> ' + (r.mod === "histo" ? (en() ? "histopathology (color)" : "histopatologia (colorida)") : (en() ? "neuroimaging (grayscale)" : "neuroimagem (tons de cinza)")) + '</div>' +
        '<div><strong>' + (en() ? "Mean brightness:" : "Brilho médio:") + '</strong> ' + f.mean.toFixed(2) + ' · <strong>' + (en() ? "std:" : "desvio:") + '</strong> ' + f.sd.toFixed(2) + '</div>' +
        '<div><strong>' + (en() ? "Bimodality (Otsu):" : "Bimodalidade (Otsu):") + '</strong> ' + (f.bimod * 100).toFixed(0) + '% · <strong>' + (en() ? "edges:" : "bordas:") + '</strong> ' + (f.edges * 100).toFixed(0) + '%</div>' +
        '<div><strong>' + (en() ? "Dark areas:" : "Áreas escuras:") + '</strong> ' + (f.pDark * 100).toFixed(0) + '% · <strong>' + (en() ? "bright:" : "claras:") + '</strong> ' + (f.pBright * 100).toFixed(0) + '%</div>' +
        '<div><strong>' + (en() ? "Texture (GLCM):" : "Textura (GLCM):") + '</strong> ' + (en() ? "contrast " : "contraste ") + (f.contr * 100).toFixed(0) + '% · ' + (en() ? "homogeneity " : "homogeneidade ") + (f.homog * 100).toFixed(0) + '%</div>' +
        '<div><strong>' + (en() ? "Color saturation:" : "Saturação de cor:") + '</strong> ' + (f.sat * 100).toFixed(0) + '%</div>' +
        '<div><strong>' + lb("entropy") + ':</strong> ' + fmtv("entropy", f.entropy) + '</div>' +
        '<div><strong>' + lb("skew") + ':</strong> ' + fmtv("skew", f.skew) + '</div>' +
        '<div><strong>' + lb("kurt") + ':</strong> ' + fmtv("kurt", f.kurt) + '</div>' +
        '<div><strong>' + lb("ring") + ':</strong> ' + fmtv("ring", f.ring) + '</div>' +
        '<div><strong>' + lb("pvb") + ':</strong> ' + fmtv("pvb", f.pvb) + '</div>' +
        '<div><strong>' + lb("energy") + ':</strong> ' + fmtv("energy", f.energy) + '</div>' +
        '<div><strong>' + lb("corr") + ':</strong> ' + fmtv("corr", f.corr) + '</div>' +
        '<div><strong>' + lb("aniso") + ':</strong> ' + fmtv("aniso", f.aniso) + '</div>' +
        '<div><strong>' + lb("p10") + '–' + lb("p90") + ':</strong> ' + f.p10.toFixed(2) + '–' + f.p90.toFixed(2) + '</div>' +
        '</div>' +
        '<div class="img-contrib"><strong>' + (en() ? "Descriptors that most support the 1st place (" : "Descritores que mais sustentam o 1º lugar (") + esc(window.ENAM ? ENAM(r.ranked[0].s.entity) : r.ranked[0].s.entity) + '):</strong> ' +
        (function () {
          var sig = r.ranked[0].s.f, ks = Object.keys(TOL), out2 = [];
          ks.forEach(function (k2) { if (sig[k2] == null || f[k2] == null) return; out2.push({ k: k2, z: Math.abs(f[k2] - sig[k2]) / TOL[k2] }); });
          out2.sort(function (a2, b2) { return a2.z - b2.z; });
          return out2.slice(0, 5).map(function (o2) { return lb(o2.k) + ' (' + fmtv(o2.k, f[o2.k]) + ' ' + (en() ? "vs typical" : "vs típico") + ' ' + fmtv(o2.k, sig[o2.k]) + ')'; }).join(' · ');
        })() + '</div>' +
        (offReal ? '<div class="panel panel-warn inline" style="margin-top:12px"><p>' + (en() ? "The descriptors of this image diverge from the real reference set (26 MRIs + 9 H&E glioma images used for calibration): it may not be a valid medical exam or may have strong artifacts." : "Os descritores desta imagem divergem do conjunto real de referência (22 RM + 15 H&E de gliomas usados na calibração): ela pode não ser um exame médico válido ou ter artefatos fortes.") + '</p></div>' : "") +
        (lowConf ? '<div class="panel panel-warn inline" style="margin-top:12px"><p>' + (en() ? "Low compatibility: the visual pattern does not safely approach the typical signatures (the image may not be a medical exam or may have artifacts). Interpret only as a demonstration." : "Compatibilidade baixa: o padrão visual da imagem não se aproxima com segurança das assinaturas típicas (a imagem pode não ser um exame médico ou ter artefatos). Interprete apenas como demonstração.") + '</p></div>' : "") +
        '<div class="img-result">' + r.ranked.slice(0, 3).map(function (it, i) {
          return '<div class="img-card' + (i === 0 ? " top" : "") + '">' +
            '<h4>' + (i + 1) + 'º ' + esc(window.ENAM ? ENAM(it.s.entity) : it.s.entity) + '</h4>' +
            '<div class="img-sim">' + (it.sim * 100).toFixed(0) + '% <span style="font-size:.85rem;color:var(--ink-3)">' + esc(t("img.compat")) + '</span></div>' +
            '<div class="prio-bar" style="margin:8px 0"><i style="width:' + (it.sim * 100).toFixed(0) + '%"></i></div>' +
            '<p class="hint" style="margin:0 0 8px">' + esc(window.EWHY ? EWHY(it.s) : it.s.why) + '</p>' +
            (i === 0 ? '<button class="chip-btn ir-goto" data-ent="' + esc(window.ENAM ? ENAM(it.s.entity) : it.s.entity) + '" type="button">' + esc(t("img.goto")) + '</button>' : "") +
            '</div>';
        }).join("") + '</div>' +
        '<p class="hint" style="margin-top:10px">' + (en() ? "Visual signatures recalibrated on 35 real glioma images (26 MRI + 9 H&E, Wikimedia Commons) combined with patterns described in the literature (necrosis/ring enhancement in GBM, cyst + nodule in pilocytic, calcifications in oligodendroglioma, H&E hypercellularity in high grade). Comparison by normalized descriptor distance — no neural network, no data upload." : "Assinaturas visuais treinadas com 37 imagens reais de glioma (22 RM + 15 H&E rotuladas, Wikimedia Commons) e padrões descritos na literatura (necrose/realce anelar no GBM, cisto + nódulo no pilocítico, calcificações no oligodendroglioma, hipercelularidade H&E em alto grau). Comparação por distância normalizada dos descritores — sem rede neural e sem envio de dados.") + '</p>';
      [].slice.call(out.querySelectorAll(".ir-goto")).forEach(function (b) {
        b.addEventListener("click", function () {
          var ent = b.getAttribute("data-ent");
          if (/^Histopatologia/.test(ent)) ent = /alto grau/.test(ent) ? "Glioblastoma, IDH-wildtype" : "Astrocitoma, IDH-mutante";
          var tab = document.querySelector('.tab[data-tab="tumores"]'); if (tab) tab.click();
          var sel = document.querySelector("#entity-select");
          if (sel) { sel.value = ent; sel.dispatchEvent(new Event("change")); }
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
  document.addEventListener("gliobio:lang", render);
  window.GLIOBIO_IMG = { extract: extract, match: match, render: render };
})();
