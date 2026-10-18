// =====================================================================
// charts.js — Gráficos em SVG puro (sem bibliotecas externas)
// Tudo é renderizado como string SVG inline: funciona offline, no
// preview do navegador e no SDK static do Hugging Face Spaces.
// =====================================================================

const CH = (() => {
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function wrap(inner, w, h, cls = "") {
    return `<svg class="chart ${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" role="img">${inner}</svg>`;
  }

  function wrapText(t, max) {
    const words = String(t).split(" ");
    const lines = []; let cur = "";
    words.forEach(w => {
      if ((cur + " " + w).trim().length > max && cur) { lines.push(cur.trim()); cur = w; }
      else cur = (cur + " " + w).trim();
    });
    if (cur) lines.push(cur.trim());
    return lines;
  }

  // ---------------------------------------------------------------
  // Anel de progresso (usado para OS% e Força da evidência%)
  // ---------------------------------------------------------------
  function ring(pct, opts = {}) {
    const size = opts.size || 132, stroke = opts.stroke || 12;
    const r = (size - stroke) / 2, cx = size / 2, cy = size / 2;
    const C = 2 * Math.PI * r;
    const p = Math.max(0, Math.min(100, Number(pct) || 0));
    const dash = (p / 100) * C;
    const color = opts.color || "#1D4ED8";
    const label = opts.label || "";
    const sub = opts.sub || "";
    const valueText = opts.nullValue ? "—" : Math.round(p) + "%";
    return `
      <div class="ring-box">
        <svg class="ring" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="${esc(label)}: ${esc(valueText)}">
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(30,64,175,0.15)" stroke-width="${stroke}"></circle>
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}"
                  stroke-linecap="round" stroke-dasharray="${dash.toFixed(1)} ${(C - dash).toFixed(1)}"
                  transform="rotate(-90 ${cx} ${cy})"></circle>
          <text x="${cx}" y="${cy + (sub ? -2 : 6)}" text-anchor="middle" class="ring-value">${valueText}</text>
          ${sub ? `<text x="${cx}" y="${cy + 18}" text-anchor="middle" class="ring-sub">${esc(sub)}</text>` : ""}
        </svg>
        <div class="ring-caption">
          <strong>${esc(label)}</strong>
          ${opts.note ? `<span class="ring-note">${esc(opts.note)}</span>` : ""}
        </div>
      </div>`;
  }

  // ---------------------------------------------------------------
  // Barras horizontais
  // items: [{label, value, sub, color, badge, max?}]
  // ---------------------------------------------------------------
  function hbar(items, opts = {}) {
    const unit = opts.unit === undefined ? "%" : opts.unit;
    const max = opts.max || Math.max(1, ...items.map(i => Number(i.value) || 0));
    const W = opts.width || 620;
    const rowH = opts.rowH || 34;
    const labelW = opts.labelW || 190;
    const padTop = 6, padBottom = 18;
    const H = padTop + items.length * rowH + padBottom;
    const barArea = W - labelW - 70;

    let s = `<defs>
        <pattern id="na-hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="7" height="7" fill="rgba(30,64,175,0.10)"></rect><line x1="0" y1="0" x2="0" y2="7" stroke="#111111" stroke-width="2.4"></line>
        </pattern>
      </defs>`;
    items.forEach((it, i) => {
      const y = padTop + i * rowH;
      const na = it.na === true || it.value == null;
      const v = na ? 0 : Number(it.value) || 0;
      const w = na ? barArea : Math.max(2, (v / max) * barArea);
      const color = it.color || "#1D4ED8";
      const lines = wrapText(it.label, opts.labelChars || 30);
      const title = na
        ? `${it.label}: sem prevalência quantificada na fonte primária${it.sub ? " — " + it.sub : ""}`
        : `${it.label}: ${v.toFixed(1)}${unit}${it.sub ? " — " + it.sub : ""}`;
      const valTxt = na ? "n/d" : (opts.decimals ? v.toFixed(opts.decimals).replace(".", ",") + unit : Math.round(v) + unit);
      s += `
        <g class="hrow" data-i="${i}">
          <title>${esc(title)}</title>
          ${lines.slice(0, 2).map((ln, k) =>
            `<text x="${labelW - 10}" y="${y + rowH / 2 + (k - (Math.min(lines.length, 2) - 1) / 2) * 11 + 4}" text-anchor="end" class="hlabel">${esc(ln)}</text>`
          ).join("")}
          <rect x="${labelW}" y="${y + 7}" width="${barArea}" height="${rowH - 16}" rx="6" fill="rgba(30,64,175,0.10)"></rect>
          ${na
            ? `<rect x="${labelW}" y="${y + 7}" width="${barArea}" height="${rowH - 16}" rx="6" fill="url(#na-hatch)" opacity="0.9"></rect>`
            : `<rect x="${labelW}" y="${y + 7}" width="${w}" height="${rowH - 16}" rx="6" fill="${color}">
                <animate attributeName="width" from="0" to="${w}" dur="0.6s" fill="freeze"/>
              </rect>`}
          <text x="${labelW + w + 8}" y="${y + rowH / 2 + 4}" class="hvalue" ${na ? `fill="#57534E"` : ""}>${esc(valTxt)}</text>
          ${it.badge ? `<rect x="${W - 104}" y="${y + 8}" width="100" height="${rowH - 18}" rx="9" fill="${it.badgeColor || "#1D4ED8"}" opacity="0.16"></rect>
                       <text x="${W - 54}" y="${y + rowH / 2 + 4}" text-anchor="middle" class="hbadge" fill="${it.badgeColor || "#1E3A8A"}">${esc(it.badge)}</text>` : ""}
        </g>`;
    });

    // eixo
    s += `<line x1="${labelW}" y1="${H - padBottom + 2}" x2="${labelW + barArea}" y2="${H - padBottom + 2}" stroke="rgba(30,64,175,0.22)"></line>`;
    for (let k = 0; k <= 4; k++) {
      const t = (max / 4) * k;
      const x = labelW + (t / max) * barArea;
      const lab = (max <= 10 ? t.toFixed(1).replace(".", ",") : String(Math.round(t))) + unit;
      s += `<text x="${x}" y="${H - 4}" text-anchor="middle" class="axis">${esc(lab)}</text>`;
    }
    return wrap(s, W, H, "hbar");
  }

  // ---------------------------------------------------------------
  // Rosca (composição de tipos de publicação / classes)
  // items: [{label, value, color}]
  // ---------------------------------------------------------------
  function donut(items, opts = {}) {
    const size = opts.size || 190, stroke = opts.stroke || 30;
    const r = (size - stroke) / 2, cx = size / 2, cy = size / 2;
    const C = 2 * Math.PI * r;
    const total = items.reduce((a, b) => a + (Number(b.value) || 0), 0) || 1;
    let acc = 0, s = "";
    items.forEach(it => {
      const v = Number(it.value) || 0;
      const frac = v / total;
      const dash = frac * C;
      s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${it.color || "#2563EB"}" stroke-width="${stroke}"
              stroke-dasharray="${dash.toFixed(2)} ${(C - dash).toFixed(2)}"
              stroke-dashoffset="${(-acc * C).toFixed(2)}" transform="rotate(-90 ${cx} ${cy})">
              <title>${esc(it.label)}: ${v} (${(frac * 100).toFixed(1)}%)</title>
            </circle>`;
      acc += frac;
    });
    const center = `<text x="${cx}" y="${cy - 2}" text-anchor="middle" class="donut-total">${total}</text>
                    <text x="${cx}" y="${cy + 16}" text-anchor="middle" class="donut-label">${esc(opts.centerLabel || "estudos")}</text>`;
    const legend = items.map(it => `
      <li><span class="dot" style="background:${it.color || "#2563EB"}"></span>
          <span class="lg-label">${esc(it.label)}</span>
          <strong>${((Number(it.value) || 0) / total * 100).toFixed(0)}%</strong>
          <em>(${it.value})</em></li>`).join("");
    return `<div class="donut-wrap">
      <svg class="donut" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img">${s}${center}</svg>
      <ul class="legend">${legend}</ul>
    </div>`;
  }

  // ---------------------------------------------------------------
  // Barras agrupadas — grupos no eixo X, várias séries por grupo
  // groups: [{label, sub}]  series: [{name, color, values:[n]}]
  // ---------------------------------------------------------------
  function groupedBars(groups, series, opts = {}) {
    const W = opts.width || 760, H = opts.height || 340;
    const padL = 46, padR = 12, padT = 16, padB = 58;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const max = opts.max || Math.max(1, ...series.flatMap(s => s.values.map(v => Number(v) || 0)));
    const unit = opts.unit === undefined ? "%" : opts.unit;
    const gw = plotW / groups.length;
    const bw = Math.min(28, (gw - 12) / series.length);

    let s = "";
    for (let g = 0; g <= 4; g++) {
      const yv = (max / 4) * g, y = padT + plotH - (yv / max) * plotH;
      s += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="rgba(30,64,175,0.10)"></line>
            <text x="${padL - 8}" y="${y + 4}" text-anchor="end" class="axis">${Math.round(yv)}${unit}</text>`;
    }

    groups.forEach((grp, gi) => {
      const gx = padL + gi * gw + gw / 2;
      const totalW = bw * series.length + 4 * (series.length - 1);
      let x = gx - totalW / 2;
      series.forEach((se, si) => {
        const v = Number(se.values[gi]) || 0;
        const h = Math.max(v > 0 ? 2 : 0, (v / max) * plotH);
        const y = padT + plotH - h;
        s += `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="4" fill="${se.color}">
                <title>${esc(grp.label)} · ${esc(se.name)}: ${v}${unit}</title>
              </rect>
              <text x="${x + bw / 2}" y="${y - 4}" text-anchor="middle" class="barvalue">${Math.round(v)}</text>`;
        x += bw + 4;
      });
      wrapText(grp.label, 14).slice(0, 2).forEach((ln, k) => {
        s += `<text x="${gx}" y="${padT + plotH + 16 + k * 13}" text-anchor="middle" class="xlab">${esc(ln)}</text>`;
      });
      if (grp.sub) s += `<text x="${gx}" y="${padT + plotH + 42}" text-anchor="middle" class="xsub">${esc(grp.sub)}</text>`;
    });

    const legend = series.map(se => `<li><span class="dot" style="background:${se.color}"></span>${esc(se.name)}</li>`).join("");
    return `<div class="chart-block">${wrap(s, W, H, "grouped")}<ul class="legend legend-inline">${legend}</ul></div>`;
  }

  // ---------------------------------------------------------------
  // Barras com faixa (mín–máx) — estimativas de sobrevida
  // items: [{label, value, lo, hi, color, note}]
  // ---------------------------------------------------------------
  function rangeBars(items, opts = {}) {
    const W = opts.width || 620, rowH = 40, padTop = 8, padBottom = 24, labelW = 150;
    const H = padTop + items.length * rowH + padBottom;
    const barArea = W - labelW - 56;
    const max = opts.max || 100, unit = opts.unit === undefined ? "%" : opts.unit;
    let s = "";
    items.forEach((it, i) => {
      const y = padTop + i * rowH;
      const v = Number(it.value) || 0;
      const lo = it.lo == null ? v : Number(it.lo), hi = it.hi == null ? v : Number(it.hi);
      const xLo = labelW + (lo / max) * barArea, xHi = labelW + (hi / max) * barArea;
      const xV = labelW + (v / max) * barArea;
      s += `<g><title>${esc(it.label)}: ${v}${unit} (faixa ${lo}–${hi}${unit})${it.note ? " · " + esc(it.note) : ""}</title>
        <text x="${labelW - 10}" y="${y + rowH / 2 + 4}" text-anchor="end" class="hlabel">${esc(it.label)}</text>
        <rect x="${labelW}" y="${y + 10}" width="${barArea}" height="${rowH - 24}" rx="6" fill="rgba(30,64,175,0.10)"></rect>
        <rect x="${xLo}" y="${y + 14}" width="${Math.max(2, xHi - xLo)}" height="${rowH - 32}" rx="4" fill="${it.color || "#1D4ED8"}" opacity="0.35"></rect>
        <rect x="${labelW}" y="${y + 10}" width="${Math.max(2, xV - labelW)}" height="${rowH - 24}" rx="6" fill="${it.color || "#1D4ED8"}" opacity="0.85"></rect>
        <circle cx="${xV}" cy="${y + rowH / 2 - 2}" r="4.5" fill="#fff" stroke="${it.color || "#1D4ED8"}" stroke-width="2.5"></circle>
        <text x="${labelW + barArea + 8}" y="${y + rowH / 2 + 3}" class="hvalue">${Math.round(v)}${unit}</text>
      </g>`;
    });
    s += `<text x="${labelW}" y="${H - 6}" class="axis">0${unit}</text>
          <text x="${labelW + barArea}" y="${H - 6}" text-anchor="end" class="axis">${max}${unit} · faixa clara = intervalo estimado na literatura</text>`;
    return wrap(s, W, H, "range");
  }

  // ---------------------------------------------------------------
  // Matriz de calor (idade x grau, biomarcador x glioma)
  // rows: [labels], cols: [{label}], get(r,c) -> {value,label}
  // ---------------------------------------------------------------
  function heatmap(rows, cols, cellFn, opts = {}) {
    const cw = opts.cw || 84, ch = opts.ch || 44, labelW = opts.labelW || 150, padT = 62;
    const W = labelW + cols.length * cw + 10;
    const H = padT + rows.length * ch + 34;
    let s = "";
    cols.forEach((c, ci) => {
      const x = labelW + ci * cw + cw / 2;
      wrapText(c.label, 13).slice(0, 3).forEach((ln, k) => {
        s += `<text x="${x}" y="${padT - 34 + k * 12}" text-anchor="middle" class="xlab">${esc(ln)}</text>`;
      });
    });
    rows.forEach((r, ri) => {
      const y = padT + ri * ch;
      s += `<text x="${labelW - 10}" y="${y + ch / 2 + 4}" text-anchor="end" class="hlabel">${esc(r.label)}</text>`;
      cols.forEach((c, ci) => {
        const x = labelW + ci * cw;
        const cell = cellFn(r, c) || {};
        const v = cell.value;
        const color = (v == null) ? "rgba(30,64,175,0.06)" : opts.colorFor(v);
        const txt = (v == null) ? "—" : (cell.text != null ? cell.text : Math.round(v));
        s += `<g><title>${esc(cell.title || (r.label + " × " + c.label + ": " + txt))}</title>
          <rect x="${x + 2}" y="${y + 2}" width="${cw - 4}" height="${ch - 4}" rx="7" fill="${color}"></rect>
          <text x="${x + cw / 2}" y="${y + ch / 2 + 5}" text-anchor="middle" class="hm-value" fill="${v == null ? "#44403C" : "#FFFFFF"}">${esc(txt)}</text>
        </g>`;
      });
    });
    return wrap(s, W, H, "heatmap");
  }

  // ---------------------------------------------------------------
  // Mini barras (sparkline) para os cartões de biomarcador
  // ---------------------------------------------------------------
  function sparkbars(items, opts = {}) {
    const W = opts.width || 150, H = opts.height || 34, gap = 2;
    const max = Math.max(1, ...items.map(i => Number(i.value) || 0));
    const bw = Math.max(2, (W - gap * (items.length - 1)) / items.length);
    let s = "";
    items.forEach((it, i) => {
      const v = Number(it.value) || 0;
      const h = Math.max(1.5, (v / max) * (H - 4));
      s += `<rect x="${i * (bw + gap)}" y="${H - h}" width="${bw}" height="${h}" rx="1.5" fill="${it.color || "#1D4ED8"}" opacity="${v ? 0.9 : 0.2}">
              <title>${esc(it.label || "")}: ${Math.round(v)}${opts.unit || "%"}</title></rect>`;
    });
    return wrap(s, W, H, "spark");
  }

  // ---------------------------------------------------------------
  // Barras horizontais empilhadas (100%)
  // ---------------------------------------------------------------
  function stacked100(rows, series, opts = {}) {
    const W = opts.width || 640, rowH = opts.rowH || 40, padTop = 8, labelW = opts.labelW || 170;
    const H = padTop + rows.length * rowH + 26;
    const barArea = W - labelW - 12;
    let s = "";
    rows.forEach((r, ri) => {
      const y = padTop + ri * rowH;
      const total = series.reduce((a, se) => a + (Number(se.values[ri]) || 0), 0) || 1;
      s += `<text x="${labelW - 10}" y="${y + rowH / 2 + 4}" text-anchor="end" class="hlabel">${esc(r)}</text>`;
      let x = labelW;
      series.forEach(se => {
        const v = Number(se.values[ri]) || 0;
        const w = (v / total) * barArea;
        if (w > 0.5) {
          s += `<rect x="${x}" y="${y + 8}" width="${w}" height="${rowH - 18}" fill="${se.color}" opacity="0.9">
                  <title>${esc(r)} · ${esc(se.name)}: ${v} (${(v / total * 100).toFixed(0)}%)</title></rect>`;
          if (w > 34) s += `<text x="${x + w / 2}" y="${y + rowH / 2 + 4}" text-anchor="middle" class="stackval">${Math.round(v / total * 100)}%</text>`;
        }
        x += w;
      });
    });
    const legend = series.map(se => `<li><span class="dot" style="background:${se.color}"></span>${esc(se.name)}</li>`).join("");
    return `<div class="chart-block">${wrap(s, W, H, "stacked")}<ul class="legend legend-inline">${legend}</ul></div>`;
  }

  return { esc, wrap, ring, hbar, donut, groupedBars, rangeBars, heatmap, sparkbars, stacked100, wrapText };
})();
