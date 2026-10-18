// =====================================================================
// ui.js — Camada de interface do painel
// Liga o HTML aos dados (data.js), à camada clínica (knowledge.js,
// biomarkers.js), aos cálculos (analytics.js) e aos gráficos (charts.js).
// =====================================================================

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const E = CH.esc;

const GLOSSARY = [
  ["Glioma", "Tumor que nasce nas células de suporte do sistema nervoso (a glia). Inclui astrocitomas, oligodendrogliomas, glioblastomas e vários tumores raros."],
  ["Biomarcador", "Alteração no DNA (ou padrão químico do DNA) que identifica o tumor, indica como ele tende a se comportar e pode apontar um tratamento específico."],
  ["OS (sobrevida global)", "Tempo entre o diagnóstico e o óbito por qualquer causa. É o desfecho mais usado para medir benefício em oncologia."],
  ["Sobrevida mediana", "O ponto em que metade dos pacientes de um grupo ainda está viva. Não é uma previsão individual."],
  ["HR (hazard ratio)", "Razão de risco. HR 0,50 = metade do risco no grupo comparado; HR 2,00 = o dobro do risco. HR 1,00 = sem diferença."],
  ["IC95%", "Intervalo de confiança de 95%: faixa onde provavelmente está o valor real. Se o IC do HR cruza 1,00, o resultado não é estatisticamente significativo."],
  ["Grau OMS", "Classificação de 1 a 4 que estima a agressividade do tumor. Na OMS CNS5 (2021) o grau também pode ser definido por alterações moleculares."],
  ["Força da evidência", "Quão confiável é o conjunto de estudos: calculada SOMENTE sobre estudos com desfecho agregado (meta-análises, revisões sistemáticas e ensaios clínicos), que pesam mais do que revisões narrativas e relatos."],
  ["Prognóstico × preditivo", "Prognóstico: indica o desfecho esperado independentemente do tratamento. Preditivo: indica se um tratamento específico tende a funcionar melhor."],
  ["Classe de metilação", "“Impressão digital” química do DNA do tumor, comparada com milhares de casos conhecidos. Hoje é o método mais preciso para classificar tumores raros."]
];

// =====================================================================
// Navegação por abas
// =====================================================================
const ENon = () => window.I18N && I18N.lang === "en";
const TRm = () => (window.TR && TR.misc) || {};
function ENTLOC(ent) {
  const m = (typeof ENTITY_META !== "undefined" ? ENTITY_META[ent] : null) || {};
  const e = window.TR && TR.ent && TR.ent[ent];
  return ENon() && e ? Object.assign({}, m, { plain: e.plain, familyLabel: e.fam, ageTypical: e.age }) : m;
}
function BLOC(b) {
  const e = window.TR && TR.bio && TR.bio[b.id];
  if (!ENon() || !e) return b;
  return Object.assign({}, b, { name: e.name || b.name, plain: e.plain, test: e.test, description: e.desc, effectLabel: (TR.effectLabels || {})[b.effect] || b.effectLabel });
}
function EFFL(b) { return (ENon() && TR.effectLabels && TR.effectLabels[b.effect]) || b.effectLabel || ""; }
function KL(c) { return (ENon() && TRm().klassMap && TRm().klassMap[c]) || c; }
function LVLP(x) { return (ENon() && TRm().levelLbl && TRm().levelLbl[x]) || x; }
const TABS = ["inicio", "biomarcadores", "tumores", "graficos", "mapa3d", "lacunas", "imagem", "fila", "agente", "perguntar", "sobre"];
let vizApi = null;

function gotoTab(name, opts = {}) {
  if (!TABS.includes(name)) name = "inicio";
  if (window.AUTH && !AUTH.allowed(name) && !window.__GLIOBIO_FORCE_TAB) { AUTH.openLock(name); return; }
  window.__GLIOBIO_FORCE_TAB = false;
  $$(".tab").forEach(t => {
    const on = t.dataset.tab === name;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on ? "true" : "false");
  });
  $$(".tab-panel").forEach(p => p.classList.toggle("active", p.id === "panel-" + name));
  if (name === "mapa3d" && vizApi) setTimeout(() => vizApi.resize(), 60);
  if (name === "lacunas" && window.GLIOBIO_GAPS) GLIOBIO_GAPS.render();
  if (!opts.noScroll) window.scrollTo({ top: 0, behavior: "smooth" });
}

function paintIcons(rootEl) {
  (rootEl || document).querySelectorAll("[data-ico]").forEach(el => {
    if (!el.dataset.icoDone) { el.innerHTML = window.ICO ? ICO(el.getAttribute("data-ico")) : ""; el.dataset.icoDone = "1"; }
  });
}
function initTabs() {
  paintIcons(document);
  $$(".tab, .nav-link").forEach(t => t.addEventListener("click", () => gotoTab(t.dataset.tab)));
  $$("[data-goto]").forEach(b => b.addEventListener("click", () => gotoTab(b.dataset.goto)));

  // --- idioma PT/EN ---
  const lp = $("#lang-pt"), le = $("#lang-en");
  function syncLang() {
    const l = (window.I18N && I18N.lang) || "pt";
    if (lp) lp.classList.toggle("active", l === "pt");
    if (le) le.classList.toggle("active", l === "en");
    const ln = $("#lang-note"); if (ln) ln.hidden = l !== "en";
    $$(".nav-item.gated").forEach(n => n.classList.toggle("authed", !!(window.AUTH && AUTH.session())));
  }
  if (lp) lp.addEventListener("click", () => I18N.set("pt"));
  if (le) le.addEventListener("click", () => I18N.set("en"));
  var burger = $("#nav-burger");
    if (burger) burger.addEventListener("click", function () { var on = document.body.classList.toggle("nav-open"); burger.setAttribute("aria-expanded", on ? "true" : "false"); });
    document.addEventListener("gliobio:lang", () => {
    syncLang();
    try {
      renderInicio(); renderBmPicker(); renderSparkGrid(); renderPrognosis(); renderSobre();
      const sel2 = $("#entity-select"); if (sel2 && sel2.options.length) renderEntityAnalysis(sel2.value);
      if (window.GLIOBIO_GAPS) GLIOBIO_GAPS.render();
    } catch (e) { }
    if (window.GLIOBIO_IMG && GLIOBIO_IMG.render) GLIOBIO_IMG.render();
    if (window.AUTH) AUTH.paintSidebar();
  });
  if (window.I18N) I18N.apply();
  syncLang();

  // --- sessão do médico ---
  document.addEventListener("gliobio:auth", () => {
    const s = window.AUTH && AUTH.session();
    const ab = document.querySelector("#agent-body"), lk = document.querySelector("#agent-lock");
    if (ab) ab.style.display = s ? "" : "none";
    if (lk) { lk.innerHTML = ""; lk.hidden = true; }
    if (s && window.GLIOBIO_FILA) GLIOBIO_FILA.render();
    if (!s) {
      const act = document.querySelector(".nav-item.active");
      if (act && window.AUTH && !AUTH.allowed(act.dataset.tab)) AUTH.openLock(act.dataset.tab);
    }
    syncLang();
  });
  // estado inicial das áreas protegidas
  if (window.AUTH && !AUTH.session()) {
    const ab = document.querySelector("#agent-body");
    if (ab) ab.style.display = "none";
  }
}

// =====================================================================
// Aba Início
// =====================================================================
function renderInicio() {
  const g = ANALYTICS.globalMetrics();
  const T = window.I18N ? I18N.t : (k => k);
  $("#badge-entities").textContent = `${g.nEntities} ${T("badge.ent")}`;
  $("#badge-studies").textContent = `${g.nStudies} ${T("badge.stud")}`;
  $("#badge-biomarkers").textContent = `${g.nBiomarkers} ${T("badge.bio")}`;
  const nMeta = (typeof STUDIES_META !== "undefined") ? STUDIES_META.length : 0;
  const bm = document.querySelector("#badge-meta");
  if (bm) bm.textContent = `${nMeta} ${T("badge.meta")}`;
  const nIA = (typeof STUDIES_AI !== "undefined") ? STUDIES_AI.length : 0;
  const nIAMeta = (typeof STUDIES_AI !== "undefined") ? STUDIES_AI.filter(x => x.ai_meta).length : 0;
  const bia = document.querySelector("#badge-ia");
  if (bia) bia.textContent = `${nIA} ${T("badge.ai")}`;

  const stats = [
    { n: g.nEntities, l: T("home.stats.ent"), c: "" },
    { n: g.nStudies, l: T("home.stats.studies"), c: "green" },
    { n: g.nBiomarkers, l: T("home.stats.bio"), c: "violet" },
    { n: (typeof BRAIN_REGIONS !== "undefined" ? BRAIN_REGIONS.length : "—"), l: T("home.stats.reg"), c: "amber" },
    { n: g.evPct ? Math.round(g.evPct) + "%" : "—", l: T("home.stats.ev"), c: "" },
    { n: g.nDesfecho != null ? g.nDesfecho : "—", l: T("home.stats.desf"), c: "green" },
    { n: g.osCount, l: T("home.stats.os"), c: "green" },
    { n: nMeta, l: T("home.stats.meta"), c: "violet" },
    { n: nIA, l: T("home.stats.ia"), c: "blue" }
  ];
  $("#stat-grid").innerHTML = stats.map(s =>
    `<div class="stat ${s.c}"><span class="num">${E(s.n)}</span><span class="num-label">${E(s.l)}</span></div>`).join("");

  $("#global-composition").innerHTML = CH.donut(g.composition, { centerLabel: "estudos", size: 180 });

  $("#glossary").innerHTML = (ENon() && window.TR ? TR.gloss : GLOSSARY).map(([t, d]) =>
    `<div class="gloss-item"><b>${E(t)}</b><span>${E(d)}</span></div>`).join("");
}

// =====================================================================
// Aba Biomarcadores
// =====================================================================
const BM_CLASSES = ["Diagnóstico", "Prognóstico", "Preditivo", "Classificação molecular"];
let bmClassFilter = new Set();
let bmSearch = "";

function renderBmPicker() {
  $("#bm-class-filter").innerHTML = BM_CLASSES.map(c =>
    `<button class="chip-btn" data-class="${E(c)}">${E(KL(c))}</button>`).join("");
  $$("#bm-class-filter .chip-btn").forEach(b => b.addEventListener("click", () => {
    const c = b.dataset.class;
    if (bmClassFilter.has(c)) { bmClassFilter.delete(c); b.classList.remove("on"); }
    else { bmClassFilter.add(c); b.classList.add("on"); }
    drawBmPicker();
  }));

  $("#bm-search").addEventListener("input", e => { bmSearch = e.target.value.trim().toLowerCase(); drawBmPicker(); });
  $$("[data-preset]").forEach(b => b.addEventListener("click", () => applyPreset(b.dataset.preset)));
  drawBmPicker();
}

function bmMatchesFilters(b) {
  if (bmClassFilter.size && !b.klass.some(k => bmClassFilter.has(k))) return false;
  if (!bmSearch) return true;
  const hay = (b.name + " " + b.short + " " + b.plain + " " + b.id).toLowerCase();
  return hay.includes(bmSearch);
}

function drawBmPicker() {
  const list = BIOMARKERS.filter(bmMatchesFilters);
  $("#bm-picker").innerHTML = list.map(b => {
    const sel = selectedBiomarkers().includes(b.id);
    return `<label class="bm-card ${sel ? "sel" : ""}">
      <input type="checkbox" value="${E(b.id)}" ${sel ? "checked" : ""}>
      <span>
        <span class="bm-name">${E(b.name)}</span>
        <span class="bm-classes">${b.klass.map(k => `<span class="tag" style="background:${BIOMARKER_CLASS_COLORS[k] || "#EDE9DA"}">${E(KL(k))}</span>`).join("")}</span>
        <span class="bm-plain">${E(BLOC(b).plain)}</span>
      </span>
    </label>`;
  }).join("") || `<p class="hint">Nenhum biomarcador encontrado com esses filtros.</p>`;

  $$("#bm-picker input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", () => {
      cb.closest(".bm-card").classList.toggle("sel", cb.checked);
      renderBiomarkerAnalysis();
    });
  });
}

function selectedBiomarkers() {
  return $$("#bm-picker input[type=checkbox]:checked").map(c => c.value);
}

function setSelected(ids) {
  bmSearch = ""; $("#bm-search").value = ""; bmClassFilter.clear();
  $$("#bm-class-filter .chip-btn").forEach(b => b.classList.remove("on"));
  drawBmPicker();
  $$("#bm-picker input[type=checkbox]").forEach(cb => {
    cb.checked = ids.includes(cb.value);
    cb.closest(".bm-card").classList.toggle("sel", cb.checked);
  });
}

function applyPreset(p) {
  const presets = {
    "idh-codel": ["idh12", "codel", "tert", "atrx", "tp53"],
    "mgmt": ["mgmt"],
    "alvos": ["brafv600e", "kiaa1549braf", "fgfr", "ntrk", "rtkfusions", "tsc_mtor", "mapk", "nf1"],
    "histonas": ["h3k27", "h3g34", "histone_h3", "ezhip", "h3k27me3"],
    "limpar": []
  };
  setSelected(presets[p] || []);
  renderBiomarkerAnalysis();
}

function assocChartItems(list, opts = {}) {
  return list.map(a => ({
    label: a.entity,
    value: a.pct,
    na: a.pct == null,
    color: BIOMARKER_LEVEL_COLOR[a.level] || "#4C7DF0",
    badge: LVLP((BIOMARKER_LEVEL_LABEL[a.level] || a.level || "").replace(" da entidade", "").replace(" / critério de exclusão", "")),
    badgeColor: BIOMARKER_LEVEL_COLOR[a.level] || "#57534E",
    sub: a.note
  }));
}

function renderBiomarkerAnalysis() {
  const ids = selectedBiomarkers();
  const out = $("#bm-output");
  if (!ids.length) {
    out.innerHTML = `<div class="panel panel-warn inline"><p>${ICO("plus")} <strong>Selecione pelo menos um biomarcador</strong> acima para gerar a análise: quais gliomas estão mais associados (em %), os gráficos comparativos e a descrição clínica completa de cada um.</p></div>`;
    return;
  }

  const selected = ids.map(id => BIOMARKERS.find(b => b.id === id)).filter(Boolean);
  const agg = ANALYTICS.entitiesForBiomarkers(ids);
  const quant = agg.filter(a => a.pct != null);

  // ---- bloco 1: associação combinada ----
  let html = `<div class="panel">
    <h2>Gliomas mais associados ${selected.length > 1 ? `aos ${selected.length} biomarcadores selecionados` : `a <em>${E(selected[0].name)}</em>`}</h2>`;

  if (selected.length > 1) {
    html += `<p class="lead">Porcentagem estimada de tumores daquela entidade que apresentam <strong>pelo menos um</strong> dos biomarcadores selecionados
      (modelo <code>1 − Π(1 − pᵢ)</code>, assumindo independência entre as alterações — veja a ressalva no rodapé).</p>`;
  } else {
    html += `<p class="lead">${ENon() ? `Typical percentage of tumors of that entity carrying <strong>${E(selected[0].name)}</strong>, per the literature. Dashed bars = marker cited in the base but without quantified prevalence in the primary source.` : `Porcentagem típica de tumores daquela entidade que apresentam <strong>${E(selected[0].name)}</strong>, segundo a literatura. Barras tracejadas = marcador citado na base, mas sem prevalência quantificada na fonte primária.`}</p>`;
  }

  html += `<div class="scroll-x">${CH.hbar(assocChartItems(agg), { labelW: 215, labelChars: 34, rowH: 36, width: 720 })}</div>`;

  if (selected.length > 1 && quant.length) {
    const rows = quant.slice(0, 10).map(a => a.entity);
    html += `<h3>Tabela de associação detalhada</h3>
      <div class="scroll-x"><table class="assoc-table">
        <thead><tr><th>Glioma</th>${selected.map(b => `<th>${E(b.short)}</th>`).join("")}<th>Pelo menos um</th></tr></thead>
        <tbody>${rows.map(e => {
          const rec = agg.find(a => a.entity === e);
          return `<tr><td><strong>${E(e)}</strong></td>
            ${selected.map(b => {
              const it = (rec.items || []).find(i => i.id === b.id);
              return `<td class="pct" style="color:${it ? (BIOMARKER_LEVEL_COLOR[it.level] || "#57534E") : "#57534E"}">${it && it.pct != null ? it.pct + "%" : (it ? "citado" : "—")}</td>`;
            }).join("")}
            <td class="pct">${rec.pct != null ? rec.pct + "%" : "—"}</td></tr>`;
        }).join("")}</tbody></table></div>`;
  }
  html += `</div>`;

  // ---- bloco 2: um cartão por biomarcador (gráfico + descrição no final) ----
  html += selected.map(b => renderBiomarkerDetail(b)).join("");

  html += `<div class="panel panel-warn inline"><p><strong>Ressalvas:</strong> as porcentagens são prevalências típicas reportadas na literatura (OMS CNS5, EANO, NCI PDQ, TCGA e coortes moleculares) e variam entre séries, populações e métodos laboratoriais (por exemplo, o cutoff de metilação de MGMT). A combinação de vários biomarcadores assume independência entre as alterações, o que nem sempre é verdadeiro — mutações como IDH e TP53/ATRX costumam ocorrer juntas. Este conteúdo é educativo e não substitui avaliação médica.</p></div>`;

  out.innerHTML = html;
}

function renderBiomarkerDetail(b) {
  const list = ANALYTICS.entitiesForBiomarker(b.id);
  const inBase = DATA.filter(r => b.match.some(re => re.test([r.biomarker, r.state].join(" ; ")))).map(r => r.entity);
  const effectCls = "effect-" + (b.effect || "neutro");

  return `<article class="bm-detail" id="bm-${E(b.id)}">
    <div class="bm-detail-head">
      <div>
        <h3>${E(b.name)}</h3>
        <div class="klasses">${b.klass.map(k => `<span class="tag" style="background:${BIOMARKER_CLASS_COLORS[k] || "#EDE9DA"}">${E(k)}</span>`).join("")}</div>
      </div>
      <span class="effect-chip ${effectCls}">${E(EFFL(b))}</span>
    </div>
    <div class="bm-detail-body">
      <div class="plain-box"><b>${ENon() ? "In plain language:" : "Em linguagem simples:"}</b> ${E(BLOC(b).plain)}</div>

      <div>
        <span class="metric-title">Gliomas associados e frequência típica (%)</span>
        <div class="scroll-x">${CH.hbar(assocChartItems(list), { labelW: 215, labelChars: 34, rowH: 34, width: 700 })}</div>
      </div>

      <div class="scroll-x"><table class="assoc-table">
        <thead><tr><th style="width:34%">Glioma (OMS CNS5)</th><th style="width:12%">Frequência</th><th style="width:16%">Papel</th><th>Observação</th></tr></thead>
        <tbody>${list.map(a => `<tr>
          <td><strong>${E(a.entity)}</strong></td>
          <td class="pct" style="color:${BIOMARKER_LEVEL_COLOR[a.level] || "#57534E"}">${a.pct == null ? "n/d" : "≈" + a.pct + "%"}</td>
          <td><span class="tag" style="background:${(window.BIOMARKER_LEVEL_SOFT||{})[a.level] || "#EDE9DA"}">${E(LVLP(BIOMARKER_LEVEL_LABEL[a.level] || a.level))}</span></td>
          <td>${E(a.note || "")}</td></tr>`).join("")}</tbody></table></div>

      <dl class="kv">
        <dt>${ENon() ? "How it is tested" : "Como é detectado"}</dt><dd>${E(BLOC(b).test)}</dd>
        <dt>Entidades na base</dt><dd>${inBase.length ? inBase.map(e => E(e)).join(" · ") : "—"}</dd>
        <dt>${ENon() ? "Effect" : "Efeito"}</dt><dd>${E(EFFL(b))}</dd>
      </dl>

      <div class="desc-box">
        <span class="metric-title">${ICO("doc")} ${ENon() ? TRm().bmDescTitle : "Descrição do biomarcador"}</span>
        <p style="margin-top:8px">${E(BLOC(b).description)}</p>
      </div>

      <div>
        <span class="metric-title">Referências</span>
        <ul class="ref-list" style="margin-top:6px">${(b.refs || []).map(r => `<li>${E(r)}</li>`).join("")}</ul>
      </div>
    </div>
  </article>`;
}

function openBiomarker(id) {
  gotoTab("biomarcadores");
  const ids = new Set(selectedBiomarkers());
  ids.add(id);
  $$("#bm-picker input[type=checkbox]").forEach(cb => {
    if (cb.value === id) { cb.checked = true; cb.closest(".bm-card").classList.add("sel"); }
  });
  renderBiomarkerAnalysis();
  setTimeout(() => {
    const t = $("#bm-" + id);
    if (t) { t.scrollIntoView({ behavior: "smooth", block: "start" }); t.style.boxShadow = "0 0 0 3px #a9cdf2"; setTimeout(() => t.style.boxShadow = "", 1600); }
  }, 120);
}

// =====================================================================
// Aba Análise por tumor
// =====================================================================
function osColor(p) { return p == null ? "#57534E" : p >= 70 ? "#15803D" : p >= 40 ? "#B45309" : "#B91C1C"; }
function evColor(p) { return p == null ? "#57534E" : p >= 70 ? "#1D4ED8" : p >= 45 ? "#6D28D9" : "#B45309"; }

function populateEntitySelect() {
  const sel = $("#entity-select");
  allEntities().forEach(ent => {
    const o = document.createElement("option");
    o.value = ent; o.textContent = ENAM(ent);
    sel.appendChild(o);
  });
  const vsel = $("#viz-entity");
  if (vsel) allEntities().forEach(ent => {
    const o = document.createElement("option");
    o.value = ent; o.textContent = ent;
    vsel.appendChild(o);
  });
}

function coverageBar(text, pct) {
  return `<div class="cov-bar"><div class="cov-track"><span class="cov-fill" style="width:${Math.max(2, pct)}%"></span></div><span>${E(text)}</span></div>`;
}

function renderEntityAnalysis(entity) {
  const m = ANALYTICS.entityMetrics(entity);
  const el = $("#analysis-output");
  const row = DATA.find(r => r.entity === entity) || {};

  const idhRow = m.rows.find(r => /idh/i.test(r.biomarker || ""));
  const codelRow = m.rows.find(r => /1p\/19q|codele/i.test(r.biomarker || ""));

  // --- biomarcadores da entidade ---
  const bmItems = m.biomarkers.map(x => ({
    label: x.biomarker.name,
    value: x.pct,
    na: x.pct == null,
    color: BIOMARKER_LEVEL_COLOR[x.level] || "#4C7DF0",
    badge: LVLP((BIOMARKER_LEVEL_LABEL[x.level] || x.level || "catalogado").replace(" da entidade", "").replace(" / critério de exclusão", "")),
    badgeColor: BIOMARKER_LEVEL_COLOR[x.level] || "#57534E",
    sub: x.note
  }));

  // --- regiões ---
  const regRows = ANALYTICS.regionConcentration([entity]).filter(r => r.w > 0.001).slice(0, 8);
  const regItems = regRows.map(r => ({
    label: r.region.label, value: Math.round(r.pct * 10) / 10,
    color: window.heatColor(r.t), sub: r.region.desc
  }));

  const metaList = (typeof STUDIES_META !== "undefined" ? STUDIES_META : [])
    .filter(r => r.entity === entity)
    .sort((a, b) => (b.year || 0) - (a.year || 0));
  const metaHtml = metaList.slice(0, 12).map(s => `<li>
      <span class="st-year">${E(s.year || "—")}</span>
      <span><a href="${E(s.pubmed_url)}" target="_blank" rel="noopener">${E(s.study)}</a>
        <span class="hint" style="display:block;font-size:.8rem">${E(s.journal || "")}${(s.tags && s.tags.length) ? " · " + E(s.tags.join(", ")) : ""}</span></span>
      <span class="status-pill status-verificado">meta-análise</span></li>`).join("");

  const aiList = (typeof STUDIES_AI !== "undefined" ? STUDIES_AI : [])
    .filter(r => r.entity === entity)
    .sort((a, b) => (b.ai_meta - a.ai_meta) || ((b.year || 0) - (a.year || 0)));
  const aiHtml = aiList.slice(0, 12).map(s => `<li>
      <span class="st-year">${E(s.year || "—")}</span>
      <span><a href="${E(s.pubmed_url)}" target="__blank" rel="noopener">${E(s.study)}</a>
        <span class="hint" style="display:block;font-size:.8rem">${E(s.journal || "")}${(s.tags && s.tags.length) ? " · " + E(s.tags.join(", ")) : ""}</span></span>
      <span class="status-pill ${s.ai_meta ? "status-verificado" : "status-pendente"}">${s.ai_meta ? "meta-análise IA" : "estudo IA"}</span></li>`).join("");

  const studiesHtml = m.studiesList.map(s => {
    let pill = `<span class="status-pill status-na">sem desfecho</span>`;
    if (/verificado/i.test(s.data_status || "")) pill = `<span class="status-pill status-verificado">${ENon() ? "verified" : "verificado"}</span>`;
    else if (/pendente/i.test(s.data_status || "")) pill = `<span class="status-pill status-pendente">${ENon() ? "pending" : "pendente"}</span>`;
    const hrTxt = typeof s.hr === "number" ? ` · HR ${ANALYTICS.fmt(s.hr)} (IC95% ${ANALYTICS.fmt(s.ci_low)}–${ANALYTICS.fmt(s.ci_high)})` : "";
    const osTxt = typeof s.os_level === "number" ? ` · OS nível ${s.os_level}/5` : "";
    return `<li>
      <span class="st-year">${E(s.year || "—")}</span>
      <span>${s.pubmed_url ? `<a href="${E(s.pubmed_url)}" target="_blank" rel="noopener">${E(s.study)}</a>` : E(s.study)}
        <span class="hint" style="display:block;font-size:.8rem">${E(s.publication_types || "")}${osTxt}${hrTxt}</span></span>
      ${pill}</li>`;
  }).join("");

  el.innerHTML = `<article class="analysis-card">
    <div class="analysis-head">
      <span class="analysis-eyebrow">Análise consolidada · OMS CNS5</span>
      <h3>${E(ENAM(entity))}</h3>
      <p class="analysis-plain">${E(ENTLOC(entity).plain || m.plain || row.outcome || "")}</p>
      <div class="analysis-meta">
        <span class="meta-chip">${ICO("user")} ${E(ENTLOC(entity).familyLabel)}</span>
        <span class="meta-chip">${ICO("chart")} ${ENon() ? "WHO grade:" : "Grau OMS:"} ${E(ST(m.grade))}</span>
        <span class="meta-chip">${ICO("info")} ${E(ENTLOC(entity).ageTypical)}</span>
        <span class="meta-chip">IDH: ${E(ST(idhRow ? idhRow.state : "não informado"))}</span>
        <span class="meta-chip">1p/19q: ${E(ST(codelRow ? codelRow.state : "não aplicável"))}</span>
      </div>
    </div>

    <div class="analysis-body">

      <div class="metric-block">
        <span class="metric-title">${ENon() ? "Overall survival (OS) and evidence strength — as percentage of studies" : "Sobrevida global (OS) e força da evidência — em porcentagem dos estudos"}</span>
        <div class="rings-row">
          ${CH.ring(m.os5y.num, { size: 190, stroke: 16,
            label: ENon() ? "5-year overall survival (OS)" : "Sobrevida global em 5 anos (OS)", color: survColor(m.os5y.num == null ? 0 : m.os5y.num),
            nullValue: m.os5y.num == null,
            sub: m.os5y.num == null ? "sem estimativa" : (m.os5y.num >= 70 ? "favorável" : m.os5y.num >= 30 ? "intermediária" : "reservada"),
            note: `Estimativa da literatura para esta entidade (${E(m.os5y.label || "n/d")}). Fonte: ${E(m.survival ? m.survival.src : "—")}. Média de grupos grandes, não previsão individual.`
          })}
          ${CH.ring(m.osPct, { size: 190, stroke: 16,
            label: ENon() ? "OS — level reported by studies" : "OS — nível reportado pelos estudos", color: "#2f6fb5",
            nullValue: m.osPct == null,
            sub: m.osPct == null ? "sem dado" : ("nível " + ANALYTICS.fmt(m.osMean) + " de 5"),
            note: m.osPct == null
              ? "Nenhum estudo indexado desta entidade reporta escore de OS verificado nesta base."
              : `Escala qualitativa 1–5 da sobrevida relatada pelo(s) ${m.osCount} estudo(s) verificado(s), normalizada em 100% — não é uma probabilidade de sobrevivência.`
          })}
          ${CH.ring(m.evPct, { size: 190, stroke: 16,
            label: ENon() ? "Evidence strength" : "Força da evidência", color: evColor(m.evPct),
            nullValue: m.evPct == null,
            sub: m.evPct == null ? "sem estudos" : (m.evPct >= 70 ? "alta" : m.evPct >= 45 ? "moderada" : "baixa"),
            note: `Média do nível de evidência dos ${m.nStudies} estudos indexados (${m.evCurated} curado(s) manualmente, ${m.nStudies - m.evCurated} derivado(s) do tipo de publicação), normalizada em 100%.`
          })}
          <div style="flex:1 1 260px;min-width:240px;display:grid;gap:12px;align-content:center">
            ${coverageBar(ENon() ? `OS: ${m.osCount} of ${m.nStudies} studies report a quantitative outcome (${Math.round(m.osCoverage)}%)` : `OS: ${m.osCount} de ${m.nStudies} estudos reportam desfecho quantitativo (${Math.round(m.osCoverage)}%)`, m.osCoverage)}
            ${coverageBar(ENon() ? `Manual verification completed in ${m.verified} of ${m.nStudies} studies (${Math.round(m.evCoverage)}%)` : `Verificação manual concluída em ${m.verified} de ${m.nStudies} estudos (${Math.round(m.evCoverage)}%)`, m.evCoverage)}
            ${coverageBar(ENon() ? `Studies without aggregated outcome (reviews, reports, molecular articles): ${m.na} of ${m.nStudies} (${Math.round(m.na / Math.max(1, m.nStudies) * 100)}%)` : `Estudos sem desfecho agregado (revisões, relatos, artigos moleculares): ${m.na} de ${m.nStudies} (${Math.round(m.na / Math.max(1, m.nStudies) * 100)}%)`, m.na / Math.max(1, m.nStudies) * 100)}
          </div>
        </div>
      </div>

      <div class="two-col">
        <div>
          <span class="metric-title">${ENon() ? `Composition of the ${m.nStudies} indexed studies` : `Composição dos ${m.nStudies} estudos indexados`}</span>
          ${CH.donut(m.composition, { centerLabel: "estudos", size: 170 })}
        </div>
        <div>
          <span class="metric-title">Números da base</span>
          <div class="analysis-numbers" style="margin-top:8px">
            <div><span class="num">${m.nStudies}</span><span class="num-label">estudos indexados</span></div>
            <div><span class="num">${m.nPatients || "—"}</span><span class="num-label">pacientes (em ${m.nStudiesWithData} estudo(s) com n verificado)</span></div>
            <div><span class="num">${m.hr != null ? ANALYTICS.fmt(m.hr) : "n/d"}</span><span class="num-label">HR${m.ci ? ` · IC95% ${m.ci}` : " · não reportado"}</span></div>
            <div><span class="num">${m.pending}</span><span class="num-label">estudos pendentes de verificação</span></div>
          </div>
          ${m.hr != null ? `<p class="hint" style="margin-top:8px">HR extraído de: ${E(m.hrStudy || "")}${m.hrUrl ? ` · <a href="${E(m.hrUrl)}" target="_blank" rel="noopener">PubMed</a>` : ""}</p>` : ""}
        </div>
      </div>

      ${m.survival ? `<div class="plain-box"><b>${ENon() ? "Literature reference (not derived from the indexed studies):" : "Referência da literatura (não derivada dos estudos indexados):"}</b> ${E(m.survival.text)} · sobrevida estimada em 5 anos: ${E(m.survival.os5y)} · <span style="color:#46536a">fonte: ${E(m.survival.src)}</span></div>` : ""}

      ${(m.pending || m.na) ? `<p class="analysis-caveat">${m.pending ? `${m.pending} estudo(s) ainda pendente(s) de verificação de HR/IC95% e OS. ` : ""}${m.na ? `${m.na} estudo(s) são revisões, relatos de caso ou artigos moleculares/de imagem, que normalmente não reportam HR ou IC95% em nível populacional — servem como referência mecanística e bibliográfica.` : ""}</p>` : ""}

      <div>
        <span class="metric-title">Biomarcadores desta entidade (frequência típica)</span>
        <p class="hint" style="margin:4px 0 6px">Clique no nome para abrir a descrição completa do biomarcador.</p>
        <div class="scroll-x">${bmItems.length ? CH.hbar(bmItems, { labelW: 190, labelChars: 28, rowH: 34, width: 700 }) : `<p class="hint">Nenhum biomarcador mapeado.</p>`}</div>
        <div class="ent-chips">${m.biomarkers.map(x => `<button class="chip-btn tiny" data-openbm="${E(x.biomarker.id)}">${E(x.biomarker.name)}</button>`).join("")}</div>
      </div>

      <div>
        <span class="metric-title">Onde este tumor costuma se concentrar</span>
        <p class="hint" style="margin:4px 0 6px">${E(m.locationNote)}</p>
        <div class="scroll-x">${regItems.length ? CH.hbar(regItems, { labelW: 190, labelChars: 28, rowH: 32, width: 700, decimals: 1 }) : `<p class="hint">Sem distribuição registrada.</p>`}</div>
        <div class="ent-chips">
          <button class="chip-btn" data-viz-entity="${E(entity)}">${ICO("brain")} Ver no mapa 3D</button>
        </div>
      </div>

      <div>
        <span class="metric-title">Estudos indexados (${m.nStudies})</span>
        <ul class="study-list" style="margin-top:8px">${studiesHtml || "<li>Nenhum estudo indexado para esta entidade.</li>"}</ul>
      </div>

      <div>
        <span class="metric-title">${ICO("flask")} Meta-análises e revisões sistemáticas específicas desta entidade (${metaList.length})</span>
        <p class="hint" style="margin:4px 0 6px">Coletadas diretamente do PubMed (E-utilities). ${ENon() ? "Each title links to the original PMID; no meta-analysis was invented." : "Cada título linka ao PMID original; nenhuma meta-análise foi inventada."}</p>
        <ul class="study-list" style="margin-top:4px">${metaHtml || (ENon() ? "<li>No meta-analysis with this entity in the title — general glioma meta-analyses remain counted in the global metrics.</li>" : "<li>Nenhuma meta-análise com esta entidade no título — as meta-análises gerais de gliomas permanecem contadas nas métricas globais.</li>")}</ul>
      </div>

      <div>
        <span class="metric-title">${ICO("scan")} Inteligência Artificial aplicada a esta entidade (${aiList.length})</span>
        <p class="hint" style="margin:4px 0 6px">Estudos reais do PubMed sobre IA, aprendizado de máquina, radiômica e modelos de linguagem nesta entidade — meta-análises/revisões de IA listadas primeiro. ${ENon() ? "Each title links to the original PMID; no study was invented." : "Cada título linka ao PMID original; nenhum estudo foi inventado."}</p>
        <ul class="study-list" style="margin-top:4px">${aiHtml || (ENon() ? "<li>No AI study with this entity in the title — the global AI-study total appears on the Home tab.</li>" : "<li>Nenhum estudo de IA com esta entidade no título — o total global de estudos de IA aparece na aba Início.</li>")}</ul>
      </div>

      <div class="analysis-conclusion">
        <h4 style="margin:0;color:#1f8a63">Conclusão</h4>
        <p>${E(m.meta.prognosis || row.direction || "")} ${E(row.treatment_context || "")}</p>
      </div>

      <details class="how-calc">
        <summary>Como estes números foram calculados?</summary>
        <ul>
          <li><strong>Sobrevida em 5 anos (anel 1)</strong> = estimativa de sobrevida relativa em 5 anos para a entidade, extraída da literatura (ensaio/registro/coorte citados em “Referência da literatura”). É uma média de grupo, não uma previsão individual.</li>
          <li><strong>OS — nível reportado pelos estudos (anel 2)</strong> = média dos campos <code>os_level</code> (escala qualitativa 1–5 da sobrevida relatada) dos estudos verificados desta entidade, normalizada em 100%. Não é uma probabilidade de sobrevivência: um valor alto indica que o(s) estudo(s) relataram sobrevida relativamente favorável naquele contexto. A barra de cobertura mostra quantos estudos entraram no cálculo.</li>
          <li><strong>Força da evidência %</strong> = média do nível de evidência calculada <em>somente sobre os ${m.nDesfecho != null ? m.nDesfecho : 0} estudos com desfecho agregado</em> (meta-análises, revisões sistemáticas, ECRs/ensaios clínicos/multicêntricos) entre os ${m.nStudies} indexados — artigos sem desfecho (modelos de IA, revisões narrativas, relatos) ficam fora para preservar a veracidade do indicador. Usa o <code>evidence_level</code> curado quando existe; caso contrário, deriva do tipo de publicação (meta-análise/ECR = 5; revisão sistemática = 4,5; multicêntrico = 4,2), com +0,5 quando verificado manualmente.</li>
          <li><strong>Frequência dos biomarcadores</strong> = prevalência típica da alteração naquela entidade, segundo OMS CNS5, EANO, NCI PDQ e coortes moleculares (varia entre séries).</li>
          <li><strong>Concentração anatômica</strong> = peso relativo das localizações típicas descritas na literatura; o percentual é a participação de cada região no total da entidade.</li>
        </ul>
      </details>
    </div>
  </article>`;

  $$("[data-openbm]", el).forEach(b => b.addEventListener("click", () => openBiomarker(b.dataset.openbm)));
  $$("[data-viz-entity]", el).forEach(b => b.addEventListener("click", () => showEntityIn3D(b.dataset.vizEntity)));
}

function showEntityIn3D(entity) {
  gotoTab("mapa3d");
  const vsel = $("#viz-entity");
  vsel.value = entity;
  $("#viz-mode").value = "";
  if (vizApi) vizApi.setSelection({ mode: "entity", entity });
}

// =====================================================================
// Aba Gráficos
// =====================================================================
function survColor(v) {
  const stops = [[0, [153, 27, 27]], [20, [180, 83, 9]], [45, [161, 98, 7]], [70, [21, 128, 61]], [100, [20, 83, 45]]];
  let a = stops[0], b = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) if (v >= stops[i][0] && v <= stops[i + 1][0]) { a = stops[i]; b = stops[i + 1]; break; }
  const f = (v - a[0]) / ((b[0] - a[0]) || 1);
  const c = [0, 1, 2].map(k => Math.round(a[1][k] + (b[1][k] - a[1][k]) * f));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

function renderSparkGrid() {
  const grid = $("#spark-grid");
  grid.innerHTML = BIOMARKERS.map(b => {
    const list = (b.assoc || []).filter(a => a.pct != null).sort((x, y) => y.pct - x.pct).slice(0, 8);
    const items = list.map(a => ({
      value: a.pct, color: BIOMARKER_LEVEL_COLOR[a.level] || "#4C7DF0",
      label: `${a.entity} — ≈${a.pct}%`
    }));
    const top = list[0];
    return `<button class="spark-card" data-openbm="${E(b.id)}">
      <span class="sc-name">${E(BLOC(b).name)}</span>
      <span class="bm-classes">${b.klass.map(k => `<span class="tag" style="background:${BIOMARKER_CLASS_COLORS[k] || "#EDE9DA"}">${E(KL(k))}</span>`).join("")}</span>
      ${items.length ? CH.sparkbars(items, { width: 168, height: 30 }) : `<span class="sc-sub">${ENon() ? "no quantified prevalence" : "sem prevalência quantificada"}</span>`}
      <span class="sc-sub">${top ? (ENon() ? `Strongest association: ${E((window.ENAM ? (TR.names[top.entity] || top.entity) : top.entity).split(",")[0])} (≈${top.pct}%)` : `Maior associação: ${E(top.entity.split(",")[0])} (≈${top.pct}%)`) : E(BLOC(b).plain.slice(0, 68) + "…")}</span>
    </button>`;
  }).join("");
  $$("[data-openbm]", grid).forEach(b => b.addEventListener("click", () => openBiomarker(b.dataset.openbm)));

  $("#bmgrid-filter").innerHTML = BM_CLASSES.map(c => `<button class="chip-btn" data-gclass="${E(c)}">${E(KL(c))}</button>`).join("") +
    `<button class="chip-btn" data-gclass="">${ENon() ? "All" : "Todos"}</button>`;
  $$("[data-gclass]").forEach(b => b.addEventListener("click", () => {
    const c = b.dataset.gclass;
    $$("[data-gclass]").forEach(x => x.classList.toggle("on", x === b));
    $$("#spark-grid .spark-card").forEach(card => {
      const bid = card.dataset.openbm;
      const bm = BIOMARKERS.find(x => x.id === bid);
      card.style.display = (!c || bm.klass.includes(c)) ? "" : "none";
    });
  }));
}

function renderPrognosis() {
  const cells = ANALYTICS.prognosisMatrix();
  const cols = GRADE_BASELINES.map(g => ({ label: g.label, id: g.id }));

  $("#heatmap-age-grade").innerHTML = CH.heatmap(
    AGE_BANDS.map(a => ({ label: a.label, id: a.id, note: a.note })),
    cols,
    (r, c) => {
      const cell = cells[c.id + "|" + r.id];
      const g = GRADE_BASELINES.find(x => x.id === c.id);
      return {
        value: cell.value,
        text: cell.value + "%",
        title: `${r.label} × ${g.label}: sobrevida estimada em 5 anos ≈ ${cell.value}% (faixa ${cell.lo}–${cell.hi}%). ${g.note}. Fonte: ${g.src}`
      };
    },
    { colorFor: survColor, cw: 96, ch: 46, labelW: 158 }
  );

  $("#heatmap-method").innerHTML = `
    <ul>
      <li><strong>Base por grau</strong> (sobrevida relativa em 5 anos): grau 1 ≈ ${GRADE_BASELINES[0].base}% · grau 2 ≈ ${GRADE_BASELINES[1].base}% · grau 3 ≈ ${GRADE_BASELINES[2].base}% · grau 4 ≈ ${GRADE_BASELINES[3].base}% · sem grau definido ≈ ${GRADE_BASELINES[4].base}%.</li>
      <li><strong>Ajuste por idade</strong>: multiplicador calibrado nas cifras publicadas de sobrevida em 5 anos do glioblastoma por faixa etária — 20,1% (0–14 anos), 28,5% (15–39), ~8% (40–64), 2,4% (65–74) e 1,1% (75+). Em graus baixos o efeito da idade é pequeno; no grau 4 é determinante.</li>
      <li><strong>Resultado</strong> = base × fator de idade, limitado a 0,4–99%. As faixas vêm da dispersão entre entidades do mesmo grau.</li>
      <li>São <strong>estimativas educacionais</strong> de grupos, não previsões individuais, e não derivam de dados de pacientes desta base.</li>
    </ul>`;

  $("#grade-range-chart").innerHTML = CH.rangeBars(
    GRADE_BASELINES.map(g => ({ label: g.label, value: g.base, lo: g.lo, hi: g.hi, color: g.color, note: g.src })),
    { labelW: 128, width: 560 }
  );

  $("#age-hr-chart").innerHTML = `<span class="metric-title">Risco relativo (HR) por idade — glioblastoma</span>` + CH.hbar(
    AGE_HR_GBM.map(a => ({
      label: a.band, value: a.hr, badge: a.label,
      color: a.hr >= 3 ? "#c9443f" : a.hr >= 1.5 ? "#c07a19" : "#1f8a63",
      sub: `IC95% ${ANALYTICS.fmt(a.lo)}–${ANALYTICS.fmt(a.hi)}`
    })),
    { unit: "×", max: 5.4, labelW: 110, width: 560, decimals: 2 }
  );

  $("#age-os-chart").innerHTML = `<span class="metric-title" style="display:block;margin-top:16px">Mediana de sobrevida global por idade — glioblastoma (meses)</span>` + CH.hbar(
    AGE_OS_GBM.map(a => ({
      label: a.band + " anos", value: a.os, color: a.os >= 20 ? "#1f8a63" : a.os >= 12 ? "#c07a19" : "#c9443f", sub: a.note
    })),
    { unit: " meses", max: 30, labelW: 110, width: 560, decimals: 1 }
  );

  $("#grade-entities").innerHTML = GRADE_BASELINES.map(g => {
    const ents = ANALYTICS.entitiesByGrade(g.id);
    return `<div class="grade-block">
      <h4 style="color:${g.color}">${E(g.label)} <span class="hint" style="font-weight:400">· sobrevida estimada em 5 anos ≈ ${g.base}% (${g.lo}–${g.hi}%)</span></h4>
      <p class="gb-note">${E(g.note)} · <strong>Fonte:</strong> ${E(g.src)}</p>
      <div class="ent-chips">${ents.length ? ents.map(e => `<button class="chip-btn tiny" data-ent="${E(e)}">${E(e)}</button>`).join(" ") : `<span class="hint">Nenhuma entidade desta base classificada neste grupo.</span>`}</div>
    </div>`;
  }).join("");
  $$("#grade-entities [data-ent]").forEach(b => b.addEventListener("click", () => {
    gotoTab("tumores");
    $("#entity-select").value = b.dataset.ent;
    renderEntityAnalysis(b.dataset.ent);
  }));
}

// =====================================================================
// Aba Mapa 3D
// =====================================================================
function initViz() {
  const ents = allEntities();
  vizApi = initBrainViz($("#brain-viz"), {
    regions: BRAIN_REGIONS,
    entities: ents,
    onJumpEntity: (e) => { gotoTab("tumores"); $("#entity-select").value = e; renderEntityAnalysis(e); }
  });

  const mode = $("#viz-mode"), vsel = $("#viz-entity");
  function apply() {
    if (vsel.value) { mode.value = ""; vizApi.setSelection({ mode: "entity", entity: vsel.value }); }
    else if (mode.value === "all") vizApi.setSelection({ mode: "all" });
    else if (mode.value.startsWith("family:")) vizApi.setSelection({ mode: "family", family: mode.value.slice(7) });
  }
  mode.addEventListener("change", () => { vsel.value = ""; apply(); });
  vsel.addEventListener("change", apply);
}

// =====================================================================
// Aba Perguntar (usa app.js)
// =====================================================================
function askEN(l) {
  if (!ENon() || !window.TR) return l;
  return l
    .replace("Evidências mais relacionadas à pergunta:", TR.ask.heading)
    .replace("Não encontrei evidências relacionadas a essa pergunta na base atual.", TR.ask.none)
    .replace("(similaridade ", "(" + TR.ask.sim + " ")
    .replace("Não há dados suficientes na base para", TR.ask.nodata);
}
function renderAskResult(lines) {
  const out = $("#ask-output");
  out.innerHTML = `<div class="result-lines">${lines.map((l, i) =>
    `<p class="${i === 0 && !l.startsWith("•") ? "result-heading" : "result-line"}">${E(askEN(l))}</p>`).join("")}</div>`;
}

function initAsk() {
  $("#ask-form").addEventListener("submit", e => {
    e.preventDefault();
    const q = $("#ask-input").value.trim();
    if (!q) return;
    renderAskResult(ask(q));
  });
  $$("[data-ask]").forEach(b => b.addEventListener("click", () => {
    $("#ask-input").value = b.dataset.ask;
    renderAskResult(ask(b.dataset.ask));
  }));
}


// =====================================================================
// Aba NeuroOnco-Agent
// =====================================================================
const AGENT_CASES = [
  "Homem, 62 anos, KPS 80, cefaleia e crise focal há 2 meses. RM: lesão frontal esquerda de 4,8 cm com realce em anel, necrose central e edema perilesional. Ressecção subtotal. Imunohistoquímica e molecular: IDH wildtype, MGMT metilado, TERT promoter mutado, EGFR amplificado, sem codeleção 1p/19q, ATRX retido. Usa fenitoína para controle de crises. Atendido pelo SUS.",
  "Mulher, 34 anos, ECOG 0, crises parciais complexas há 1 ano. RM: lesão temporal direita de 3,5 cm, sem realce e sem necrose. Ressecção total. Molecular: IDH1 mutado, codeleção 1p/19q presente, TERT promoter mutado, MGMT metilado, CDKN2A/B sem deleção homozigótica, ATRX retido. Rede privada.",
  "Criança, 7 anos, cefaleia matinal, vômitos e paralisia do VI nervo craniano há 3 semanas. RM: lesão expansiva difusa de ponte, sem realce e sem necrose. Biópsia: H3 K27M positivo, perda de H3K27me3. KPS 60. Sem tratamento prévio. Atendida pelo SUS."
];

function agentSection(title, bodyHtml) {
  return `<section class="agent-sec"><h3>${title}</h3><div class="sec-body">${bodyHtml}</div></section>`;
}

function renderAgentResult(r) {
  const c = r.case, d = r.dx;
  const out = $("#agent-output");
  const parts = [];

  if (d.missing.length) {
    parts.push(`<div class="missing-banner"><strong>${ICO("alert")} ${ENon() ? "Critical data missing — request from the physician before critical decisions:" : "Dados críticos ausentes — solicite ao médico antes de decisões críticas:"}</strong>
      <ul>${d.missing.map(m => `<li>${E(AGF(m))}</li>`).join("")}</ul></div>`);
  }

  // FICHA
  parts.push(agentSection(`${ICO("doc")} ${ENon() ? TRm().fichaT : "FICHA DO PACIENTE (extraída pelo agente)"}`,
    `<table class="ficha-table"><thead><tr><th>${ENon() ? "Field" : "Campo"}</th><th>${ENon() ? "Extracted value" : "Valor extraído"}</th><th>${ENon() ? "Confidence" : "Confiança"}</th></tr></thead>
     <tbody>${c.fields.map(f => `<tr><td><strong>${E(AGF(f.campo))}</strong></td><td>${E(AGT(f.valor))}</td><td class="conf-${E(f.conf)}">${E(AGT(f.conf))}</td></tr>`).join("") || `<tr><td colspan="3">Nenhum dado estruturado reconhecido no texto.</td></tr>`}</tbody></table>`));

  // DIAGNÓSTICO
  parts.push(agentSection(`${ICO("flask")} ${ENon() ? TRm().diagT : "DIAGNÓSTICO INTEGRADO WHO 2021"}`,
    `<p class="prog-med"><strong>${E(d.dx)}</strong>${d.grade ? ` — grau <strong>${E(String(d.grade))}</strong>` : ""}</p>
     <ul class="rules-list">${d.rules.map(x => `<li>${E(AGT(x))}</li>`).join("")}</ul>`));

  // PROGNÓSTICO
  parts.push(agentSection(`${ICO("chart")} ${ENon() ? TRm().progT : "PROGNÓSTICO ESTIMADO"}`,
    `<div class="prog-box">
       <p class="prog-med"><strong>${ENon() ? "Reference median survival:" : "Sobrevida mediana de referência:"}</strong> ${E(AGT(r.prog.med))}</p>
       <div class="factor-chips">
         ${r.prog.good.map(g => `<span class="factor good">+ ${E(AGT(g))}</span>`).join("")}
         ${r.prog.bad.map(g => `<span class="factor bad">− ${E(AGT(g))}</span>`).join("")}
       </div>
       <p class="hint" style="margin:0">${ENon() ? "Sources: " : "Fontes: "}${E(AGT(r.prog.src))}${ENon() ? ". Group estimates — not an individual prediction." : ". Estimativas de grupo — não constituem previsão individual."}</p>
     </div>`));

  // PLANO
  parts.push(agentSection(`${ICO("stetho")} ${ENon() ? TRm().planT : "PLANO TERAPÊUTICO (referência internacional × realidade SUS)"}`,
    `<table class="plan-table"><thead><tr><th>${ENon() ? "Step" : "Etapa"}</th><th>${ENon() ? "Ideal protocol (international)" : "Protocolo ideal (internacional)"}</th><th>${ENon() ? "Realistic protocol (SUS/Brazil)" : "Protocolo realista (SUS/Brasil)"}</th></tr></thead>
     <tbody>${r.rows.map(row => `<tr><td>${E(AGT(row.etapa))}</td><td class="ideal">${E(AGT(row.ideal))}</td><td class="sus">${E(AGT(row.sus))}</td></tr>`).join("")}</tbody></table>`));

  // ENSAIOS
  parts.push(agentSection(`${ICO("flask")} ${ENon() ? TRm().trialsT : "ENSAIOS CLÍNICOS SUGERIDOS"}`,
    r.trials.length
      ? `<p class="hint">Catálogo curado de ensaios que definiram o padrão de cuidado para este perfil. Para ensaios <b>ativos em recrutamento</b>, verificar sempre <a href="https://clinicaltrials.gov" target="_blank" rel="noopener">ClinicalTrials.gov</a> e <a href="https://ensaiosclinicos.gov.br" target="_blank" rel="noopener">ReBEC</a> — esta ferramenta nunca inventa ensaios nem status de recrutamento.</p><ul class="trial-list">${r.trials.map(t => `<li><b>${E(t.name)}</b> (${E(t.nct)}) · ${E(t.phase)} · ${E(AGT(t.drug))}${t.status ? ` · <span class="level-pill">${E(t.status)}</span>` : ""}<br><span class="hint">${ENon() ? "Primary endpoint: " : "Critério principal: "}${E(AGT(t.crit))} — verificar centros brasileiros ativos em <a href="https://clinicaltrials.gov/study/${E(t.nct)}" target="_blank" rel="noopener">ClinicalTrials.gov</a> e na ReBEC.</span></li>`).join("")}</ul>`
      : `<p class="hint">${ENon() ? "No trial in the internal catalog matches the reported profile. Check eligibility directly on " : "Nenhum ensaio do catálogo interno coincide com o perfil informado. Verificar elegibilidade diretamente em "}<a href="https://clinicaltrials.gov" target="_blank" rel="noopener">ClinicalTrials.gov</a> ${ENon() ? "and" : "e"} <a href="https://ensaiosclinicos.gov.br" target="_blank" rel="noopener">${ENon() ? "ReBEC/Brazilian Platform" : "ReBEC/Plataforma Brasil"}</a>${ENon() ? "." : "."}</p>`));

  // XAI
  parts.push(agentSection(`${ICO("brain")} ${ENon() ? TRm().xaiT : "EXPLICABILIDADE DAS DECISÕES"}`,
    r.xai.map(x => `<div class="xai-card">
      <p class="xai-rec">${E(AGT(x.rec))} <span class="level-pill">${ENon() ? "Level" : "Nível"} ${E(x.level)}</span></p>
      <dl class="kv">
        <dt>${ENon() ? "Why" : "Por quê"}</dt><dd>${E(AGT(x.why))}</dd>
        <dt>${ENon() ? "Evidence" : "Evidência"}</dt><dd>${E(AGT(x.ev))}</dd>
        <dt>${ENon() ? "Contraindications" : "Contra-indicações"}</dt><dd>${E(AGT(x.contra || "—"))}</dd>
      </dl></div>`).join("") || `<p class="hint">${ENon() ? "No additional recommendations to explain." : "Sem recomendações adicionais a explicar."}</p>`));

  // ALERTAS
  parts.push(agentSection(`${ICO("alert")} ${ENon() ? TRm().alertsT : "ALERTAS E CONTRA-INDICAÇÕES"}`,
    `<ul class="alert-ul">${r.alerts.map(a => `<li>${E(AGT(a))}</li>`).join("")}</ul>`));

  // PRÓXIMOS PASSOS
  parts.push(agentSection(`${ICO("check")} ${ENon() ? TRm().nextT : "PRÓXIMOS PASSOS RECOMENDADOS"}`,
    `<ul class="next-ul">${r.next.map(n => `<li>${E(AGT(n))}</li>`).join("")}</ul>`));

  parts.push(`<div class="disclaimer-final">${ICO("alert")} Esta análise é gerada por IA e deve ser validada por um neuro-oncologista. Não constitui prescrição médica.</div>`);

  out.innerHTML = parts.join("");
}

function initAgent() {
  const ta = $("#agent-input");
  $$("[data-case]").forEach(b => b.addEventListener("click", () => {
    ta.value = b.dataset.case === "clear" ? "" : (ENon() && window.TR.cases ? TR.cases[+b.dataset.case] : AGENT_CASES[+b.dataset.case]);
    ta.focus();
  }));
  $("#agent-run").addEventListener("click", () => {
    const txt = ta.value.trim();
    if (!txt) { $("#agent-output").innerHTML = `<div class="missing-banner">${ENon() ? "Describe the case (or click an example case) before analyzing." : "Descreva o caso (ou clique em um caso de exemplo) antes de analisar."}</div>`; return; }
    renderAgentResult(NEUROONCO.run(txt));
  });
}

// =====================================================================
// Aba Sobre
// =====================================================================
function renderSobre() {
  const M = ENon() ? [
    ["Original data preserved", "<code>data.js</code> and <code>app.js</code> remain byte-identical to the uploads; every new capability lives in additive files."],
    ["Overall survival (OS) in %", "two distinct numbers: (1) the estimated 5-year relative survival for the entity, from the literature; and (2) the share of indexed studies reporting a quantitative outcome."],
    ["Evidence strength in %", "per-study evidence level (curated or derived from publication type), averaged <em>only over studies with aggregated outcomes</em>."],
    ["Biomarker → glioma association", "typical prevalence of the alteration in each entity (WHO CNS5, EANO, NCI PDQ, TCGA, molecular cohorts)."],
    ["Prognosis age × grade", "5-year relative survival estimated as (grade base) × (age factor), calibrated on published figures."],
    ["3D map", "per-entity location weights from WHO CNS5, NCI PDQ and neuroimaging series; custom renderer on the real fsaverage mesh."],
    ["Natural-language search", "TF-IDF with (1,2)-grams and cosine similarity, reimplemented in pure JavaScript."]
  ] : [
    ["Dados originais preservados", "<code>data.js</code> e <code>app.js</code> permanecem byte-idênticos aos originais; toda capacidade nova vive em arquivos aditivos."],
    ["Sobrevida global (OS) em %", "dois números distintos: (1) a sobrevida relativa estimada em 5 anos para a entidade, extraída da literatura; e (2) a fração dos estudos indexados com desfecho quantitativo."],
    ["Força da evidência em %", "nível de evidência por estudo (curado ou derivado do tipo de publicação), média <em>somente sobre os estudos com desfecho agregado</em>."],
    ["Associação biomarcador → glioma", "prevalência típica da alteração em cada entidade (OMS CNS5, EANO, NCI PDQ, TCGA, coortes moleculares)."],
    ["Prognóstico idade × grau", "sobrevida relativa em 5 anos estimada por (base do grau) × (fator de idade), calibrado em cifras publicadas."],
    ["Mapa 3D", "pesos de localização por entidade definidos a partir de OMS CNS5, NCI PDQ e séries de neuroimagem; renderização própria sobre a malha real fsaverage."],
    ["Busca em linguagem natural", "TF-IDF com n-gramas (1,2) e similaridade de cosseno, reimplementado em JavaScript puro."]
  ];
  $("#method-box").innerHTML = "<ul>" + M.map(x => `<li><strong>${x[0]}</strong> — ${x[1]}</li>`).join("") + "</ul>";

  $("#sources-list").innerHTML = SOURCES.map((s, i9) =>
    `<li><b>${E(s.tag)}</b> — ${E(ENon() && s.en ? s.en : s.text)} ${s.url ? `<a href="${E(s.url)}" target="_blank" rel="noopener">${E(s.url)}</a>` : ""}</li>`).join("");
}

// =====================================================================
// Boot
// =====================================================================
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  populateEntitySelect();
  renderInicio();
  renderBmPicker();
  applyPreset("idh-codel");
  renderSparkGrid();
  renderPrognosis();
  initViz();
  initAgent();
  initAsk();
  renderSobre();

  const sel = $("#entity-select");
  if (sel.options.length) renderEntityAnalysis(sel.value);
  $("#analyze-btn").addEventListener("click", () => renderEntityAnalysis(sel.value));
  sel.addEventListener("change", () => renderEntityAnalysis(sel.value));
});
