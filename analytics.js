// =====================================================================
// analytics.js — Cálculos derivados (porcentagens em relação aos estudos)
// Usa DATA e STUDIES de data.js (inalterados) + knowledge.js/biomarkers.js
//
// Regras de cálculo (documentadas na interface em "Como calculamos"):
//  • OS%  = média dos escores os_level (1–5) dos estudos que reportam
//           desfecho quantitativo, normalizada para 100 (nível 5 = 100%).
//           Cobertura = % de estudos da entidade com escore disponível.
//  • Evidência% = média do nível de evidência de cada estudo da entidade
//           (curado quando existe; senão derivado do tipo de publicação),
//           normalizada para 100. Considera TODOS os estudos indexados.
// =====================================================================

const ANALYTICS = (() => {

  // Base consolidada: data.js (STUDIES) + expansão v2.1 (STUDIES_EXTRA)
  const STUDY_DB = (typeof STUDIES_ALL !== "undefined") ? STUDIES_ALL : STUDIES;

  // ---------------- nível de evidência por tipo de publicação ----------------
  const DESIGN_SCORES = [
    { re: /meta-analysis/i, score: 5.0, tag: "Meta-análise" },
    { re: /randomized controlled trial/i, score: 5.0, tag: "Ensaio randomizado" },
    { re: /clinical trial, phase iii/i, score: 4.8, tag: "Ensaio fase III" },
    { re: /systematic review/i, score: 4.5, tag: "Revisão sistemática" },
    { re: /multicenter study/i, score: 4.2, tag: "Estudo multicêntrico" },
    { re: /clinical trial/i, score: 4.0, tag: "Ensaio clínico" },
    { re: /comparative study|clinical study/i, score: 3.5, tag: "Estudo comparativo" },
    { re: /scoping review/i, score: 1.6, tag: "Scoping review" },
    { re: /review/i, score: 2.0, tag: "Revisão narrativa" },
    { re: /case reports/i, score: 1.5, tag: "Relato de caso" },
    { re: /letter/i, score: 1.0, tag: "Carta/comentário" },
    { re: /journal article/i, score: 2.5, tag: "Artigo original" }
  ];

  function designScore(s) {
    const types = s.publication_types || "";
    let best = null;
    DESIGN_SCORES.forEach(d => {
      if (d.re.test(types) && (!best || d.score > best.score)) best = d;
    });
    if (!best) best = { score: 2.0, tag: "Sem tipo indexado" };
    // bônus se o estudo já foi verificado com desfecho quantitativo
    const verified = /verificado/i.test(s.data_status || "");
    return { score: verified ? Math.min(5, best.score + 0.5) : best.score, tag: best.tag, verified };
  }

  function hasDesfecho(s) {
    if (!s) return false;
    if (s.desfecho === 1) return true;
    if (typeof s.os_level === "number" || typeof s.hr === "number") return true;
    const t = Array.isArray(s.publication_types) ? s.publication_types.join(" ") : String(s.publication_types || "");
    return /meta-analysis|systematic review|randomized controlled trial|clinical trial|multicenter study|controlled clinical trial/i.test(t);
  }

  function compositionCategory(s) {
    const t = s.publication_types || "";
    if (/meta-analysis|systematic review|randomized controlled trial|clinical trial|multicenter study/i.test(t)) return "Ensaio / meta-análise";
    if (/scoping review|review/i.test(t)) return "Revisão (narrativa)";
    if (/case reports/i.test(t)) return "Relato de caso";
    if (/letter/i.test(t)) return "Carta / comentário";
    return "Artigo original (sem desfecho agregado)";
  }

  const COMP_COLORS = {
    "Ensaio / meta-análise": "#15803D",
    "Revisão (narrativa)": "#1D4ED8",
    "Relato de caso": "#B45309",
    "Carta / comentário": "#6D28D9",
    "Artigo original (sem desfecho agregado)": "#64748B"
  };

  // ---------------- métricas por entidade ----------------
  function entityMetrics(entity) {
    const studies = STUDY_DB.filter(s => s.entity === entity);
    const rows = DATA.filter(r => r.entity === entity);
    const meta = ENTITY_META[entity] || {};
    const n = studies.length;

    // --- Sobrevida global (OS) ---
    const withOS = studies.filter(s => typeof s.os_level === "number");
    const osMean = withOS.length ? withOS.reduce((a, s) => a + s.os_level, 0) / withOS.length : null;
    const osPct = osMean == null ? null : (osMean / 5) * 100;
    const osCoverage = n ? (withOS.length / n) * 100 : 0;

    // --- Força da evidência (SOMENTE estudos com desfecho agregado: meta-análises/SR/ensaios) ---
    const desfecho = studies.filter(hasDesfecho);
    const evScores = desfecho.map(s => {
      if (typeof s.evidence_level === "number") return { v: s.evidence_level, src: "curado" };
      return { v: designScore(s).score, src: "derivado" };
    });
    const evMean = evScores.length ? evScores.reduce((a, b) => a + b.v, 0) / evScores.length : null;
    const evPct = evMean == null ? null : (evMean / 5) * 100;
    const curatedCount = evScores.filter(e => e.src === "curado").length;

    // --- composição por tipo de estudo ---
    const comp = {};
    studies.forEach(s => {
      const c = compositionCategory(s);
      comp[c] = (comp[c] || 0) + 1;
    });
    const composition = Object.entries(comp)
      .map(([label, value]) => ({ label, value, color: COMP_COLORS[label] || "#64748B" }))
      .sort((a, b) => b.value - a.value);

    // --- números ---
    const numericN = studies.filter(s => typeof s.n_patients === "number");
    const hrRow = studies.find(s => typeof s.hr === "number");
    const pending = studies.filter(s => /pendente/i.test(s.data_status || "")).length;
    const na = studies.filter(s => /não aplicável|nao aplicavel/i.test(s.data_status || "")).length;
    const verified = studies.filter(s => /verificado/i.test(s.data_status || "")).length;

    // --- biomarcadores detectados no texto da base ---
    const biomarkers = biomarkersOfEntity(entity);

    // --- distribuição anatômica ---
    const locations = meta.locations || {};

    return {
      entity, meta, rows, studies,
      nStudies: n,
      osPct, osCoverage, osCount: withOS.length, osMean,
      osStudies: withOS.map(s => ({ study: s.study, os: s.os_level, ev: s.evidence_level, hr: s.hr, url: s.pubmed_url })),
      evPct, evCurated: curatedCount, evCoverage: n ? (verified / n) * 100 : 0, verified,
      nDesfecho: desfecho.length, nStudiesAll: n,
      composition,
      nPatients: numericN.reduce((a, s) => a + s.n_patients, 0),
      nStudiesWithData: numericN.length,
      hr: hrRow ? hrRow.hr : null,
      ci: hrRow ? `${fmt(hrRow.ci_low)}–${fmt(hrRow.ci_high)}` : null,
      hrStudy: hrRow ? hrRow.study : null,
      hrUrl: hrRow ? hrRow.pubmed_url : null,
      pending, na,
      biomarkers,
      locations,
      survival: meta.survival || null,
      os5y: meta.survival ? parseOs5y(meta.survival.os5y) : { num: null, label: "" },
      grade: meta.grade || "—",
      gradeNum: meta.gradeNum,
      ageTypical: meta.ageTypical || "—",
      familyLabel: meta.familyLabel || "—",
      plain: meta.plain || "",
      locationNote: meta.locationNote || "",
      studiesList: studies
    };
  }

  function fmt(v) { return typeof v === "number" ? Number(v).toFixed(2).replace(".", ",") : "—"; }

  // Converte rótulos como ">95%", "<5%", "50–75%", "~50%" em um número representativo.
  // Usa a mediana da faixa; ">" fica no próprio valor; "<" usa 80% do valor.
  function parseOs5y(str) {
    if (!str) return { num: null, label: str || "" };
    const nums = String(str).match(/\d+(?:[.,]\d+)?/g);
    if (!nums) return { num: null, label: str };
    const v = nums.map(n => parseFloat(n.replace(",", ".")));
    let num;
    if (/^>/.test(str.trim())) num = v[v.length - 1];
    else if (/^</.test(str.trim())) num = Math.max(0.5, v[0] * 0.8);
    else if (v.length >= 2) num = (v[0] + v[1]) / 2;
    else num = v[0];
    return { num: Math.round(num), label: str };
  }

  // ---------------- detecção de biomarcadores ----------------
  function biomarkerHits(text) {
    return BIOMARKERS.filter(b => b.match.some(re => re.test(text)));
  }

  function biomarkersOfEntity(entity) {
    const row = DATA.find(r => r.entity === entity);
    if (!row) return [];
    const text = [row.biomarker, row.state, row.direction].join(" ; ");
    const hits = biomarkerHits(text);
    return hits.map(b => {
      const a = (b.assoc || []).find(x => x.entity === entity);
      return {
        biomarker: b,
        pct: a ? a.pct : null,
        level: a ? a.level : "catalogado",
        note: a ? a.note : "Mencionado na base como marcador da entidade (prevalência não publicada na fonte primária)",
        sourceText: row.biomarker
      };
    }).sort((x, y) => (y.pct == null ? -1 : y.pct) - (x.pct == null ? -1 : x.pct));
  }

  // ---------------- associação biomarcador -> gliomas ----------------
  function entitiesForBiomarker(bid) {
    const b = BIOMARKERS.find(x => x.id === bid);
    if (!b) return [];
    // associações curadas + qualquer entidade da base cujo texto mencione o marcador
    const map = new Map();
    (b.assoc || []).forEach(a => map.set(a.entity, { ...a }));
    DATA.forEach(r => {
      const text = [r.biomarker, r.state].join(" ; ");
      if (b.match.some(re => re.test(text)) && !map.has(r.entity)) {
        map.set(r.entity, { entity: r.entity, pct: null, level: "catalogado", note: "Presente na descrição da entidade na base (prevalência não quantificada na fonte primária)" });
      }
    });
    return [...map.values()].sort((a, b2) => (b2.pct == null ? -1 : b2.pct) - (a.pct == null ? -1 : a.pct));
  }

  // Associação combinada de vários biomarcadores:
  // P(pelo menos um) = 1 - Π(1 - p_i)  (suposição de independência, documentada)
  function entitiesForBiomarkers(bids) {
    const perBio = bids.map(id => ({ id, list: entitiesForBiomarker(id) }));
    const agg = new Map();
    perBio.forEach(({ id, list }) => {
      list.forEach(a => {
        if (a.pct == null) return;
        if (!agg.has(a.entity)) agg.set(a.entity, { entity: a.entity, p: 0, items: [], levels: [] });
        const rec = agg.get(a.entity);
        const p = a.pct / 100;
        rec.items.push({ id, pct: a.pct, level: a.level, note: a.note });
        rec.levels.push(a.level);
        rec.p = 1 - (1 - rec.p) * (1 - p);
      });
    });
    // entidades sem prevalência quantificada entram como "catalogado" (sem %)
    perBio.forEach(({ id, list }) => {
      list.forEach(a => {
        if (a.pct != null || agg.has(a.entity)) return;
        agg.set(a.entity, { entity: a.entity, p: null, items: [{ id, pct: null, level: a.level, note: a.note }], levels: [a.level] });
      });
    });
    return [...agg.values()]
      .map(r => ({ ...r, pct: r.p == null ? null : Math.round(r.p * 1000) / 10 }))
      .sort((a, b) => (b.pct == null ? -1 : b.pct) - (a.pct == null ? -1 : a.pct));
  }

  // ---------------- métricas globais ----------------
  function globalMetrics() {
    const all = STUDY_DB;
    const n = all.length;
    const withOS = all.filter(s => typeof s.os_level === "number");
    const osMean = withOS.length ? withOS.reduce((a, s) => a + s.os_level, 0) / withOS.length : null;
    const allD = all.filter(hasDesfecho);
    const ev = allD.map(s => (typeof s.evidence_level === "number") ? s.evidence_level : designScore(s).score);
    const evMean = ev.reduce((a, b) => a + b, 0) / (ev.length || 1);
    const comp = {};
    all.forEach(s => { const c = compositionCategory(s); comp[c] = (comp[c] || 0) + 1; });
    const status = { verificado: 0, pendente: 0, "não aplicável": 0 };
    all.forEach(s => {
      if (/verificado/i.test(s.data_status || "")) status.verificado++;
      else if (/pendente/i.test(s.data_status || "")) status.pendente++;
      else status["não aplicável"]++;
    });
    return {
      nStudies: n,
      nEntities: new Set(DATA.map(r => r.entity)).size,
      nBiomarkers: BIOMARKERS.length,
      nPatients: all.filter(s => typeof s.n_patients === "number").reduce((a, s) => a + s.n_patients, 0),
      osPct: osMean == null ? null : (osMean / 5) * 100,
      osCount: withOS.length,
      evPct: (evMean / 5) * 100, nDesfecho: allD.length,
      composition: Object.entries(comp).map(([label, value]) => ({ label, value, color: COMP_COLORS[label] || "#64748B" })).sort((a, b) => b.value - a.value),
      status
    };
  }

  // ---------------- prognóstico: idade x grau ----------------
  function gradeKey(meta) {
    if (!meta || meta.gradeNum == null) return "ng";
    const g = String(meta.grade || "");
    if (/não|nao/.test(g)) return "ng";
    if (/^4/.test(g) || /–4|-4/.test(g)) return "g4";
    if (meta.gradeNum >= 4) return "g4";
    if (meta.gradeNum === 3) return "g3";
    if (meta.gradeNum === 2) return "g2";
    return "g1";
  }

  function prognosisMatrix() {
    const cells = {};
    AGE_BANDS.forEach(ab => {
      GRADE_BASELINES.forEach(g => {
        const f = (AGE_FACTORS[g.id] || {})[ab.id] || 1;
        const v = Math.max(0.4, Math.min(99, g.base * f));
        const lo = Math.max(0.3, Math.min(99, g.lo * f * 0.95));
        const hi = Math.max(lo + 0.5, Math.min(99, g.hi * Math.min(1.05, f * 1.02)));
        cells[g.id + "|" + ab.id] = { value: Math.round(v), lo: Math.round(lo), hi: Math.round(hi) };
      });
    });
    return cells;
  }

  function entitiesByGrade(gid) {
    return Object.keys(ENTITY_META)
      .filter(e => gradeKey(ENTITY_META[e]) === gid)
      .sort((a, b) => a.localeCompare(b, "pt-BR"));
  }

  function ageBandOfEntity(entity) {
    const meta = ENTITY_META[entity] || {};
    const map = { pediatrico: "0-14", lactente: "0-14", adolescente: "15-39", adulto: "40-64", "adulto-idoso": "65-74" };
    return map[meta.ageBand] || "40-64";
  }

  // ---------------- distribuição anatômica ----------------
  function regionConcentration(entityList) {
    const acc = {};
    BRAIN_REGIONS.forEach(r => { acc[r.id] = 0; });
    entityList.forEach(e => {
      const m = ENTITY_META[e];
      if (!m) return;
      Object.entries(m.locations || {}).forEach(([rid, w]) => { if (acc[rid] != null) acc[rid] += w; });
    });
    const total = Object.values(acc).reduce((a, b) => a + b, 0) || 1;
    const max = Math.max(...Object.values(acc), 0.0001);
    return BRAIN_REGIONS
      .map(r => ({ region: r, w: acc[r.id], pct: (acc[r.id] / total) * 100, t: acc[r.id] / max }))
      .sort((a, b) => b.w - a.w);
  }

  return {
    designScore, compositionCategory, entityMetrics, globalMetrics, hasDesfecho,
    biomarkerHits, biomarkersOfEntity, entitiesForBiomarker, entitiesForBiomarkers,
    prognosisMatrix, gradeKey, entitiesByGrade, ageBandOfEntity, regionConcentration, fmt, parseOs5y
  };
})();
