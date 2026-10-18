// =====================================================================
// gaps.js — GlioBio v2.8: Lacunas médicas em neuro-oncologia.
// (1) Lacunas MEDIDAS na base: cobertura de desfecho agregado por
//     entidade (entidades com 0 estudos com desfecho = lacuna de
//     evidência), força da evidência baixa, ausência de OS reportado.
// (2) Lacunas CURADAS da literatura/trial landscape (tratamento,
//     diagnóstico, acesso, pediátrico), bilíngues.
// =====================================================================
(function () {
  "use strict";
  function t(k) { return window.I18N ? I18N.t(k) : k; }
  function en() { return window.I18N && I18N.lang === "en"; }
  function esc(x) { return String(x == null ? "" : x).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  var CURATED = [
    { cat: "tratamento", ent: "Glioma difuso de linha média, H3 K27-alterado",
      pt: ["Sem tratamento curativo", "A radioterapia permanece o único padrão com benefício transitório; nenhuma terapia sistêmica (ONC201, imunoterapia, inibidores epigenéticos) mostrou ganho de sobrevida em ensaio randomizado. A letalidade em <24 meses é quase universal."],
      en: ["No curative treatment", "Radiotherapy remains the only standard with transient benefit; no systemic therapy (ONC201, immunotherapy, epigenetic inhibitors) has shown survival gain in a randomized trial. Lethality within 24 months is nearly universal."],
      ref: "ENSAYOS: PNOC007/ONC201 (fase II, sem OS maduro); revisão EANO-SNO 2023 de DMG." },
    { cat: "tratamento", ent: "Glioblastoma, IDH-wildtype",
      pt: ["Recorrência quase universal e poucas opções pós-progressão", "Após Stupp (RT+TMZ), nenhum regime de resgate melhora OS de forma consistente; imunoterapia e antiangiogênicos falharam em populações não selecionadas. TTFields e re-irradiação têm benefício modesto."],
      en: ["Near-universal recurrence and few post-progression options", "After Stupp (RT+TMZ), no salvage regimen consistently improves OS; immunotherapy and antiangiogenics failed in unselected populations. TTFields and re-irradiation offer modest benefit."],
      ref: "EF-14 (TTFields, NCT00916409); KEYNOTE-158/CheckMate; metanálises da base (bloco de metas do GBM)." },
    { cat: "evidencia", ent: "Astrocitoma de alto grau com características piloides",
      pt: ["Zero estudos com desfecho agregado na base", "Entidade descrita apenas por metilação (2021): não há ensaio clínico, meta-análise ou série com sobrevida agregada indexada — condutas extrapoladas de astrocitomas de alto grau."],
      en: ["Zero studies with aggregated outcomes in the base", "Entity described only by methylation (2021): no indexed clinical trial, meta-analysis or series with aggregated survival — management extrapolated from high-grade astrocytomas."],
      ref: "Coleta v2.6 no PubMed (PT=trial/meta/SR): 0 registros para HGAP." },
    { cat: "evidencia", ent: "Glioma hemisférico infantil, tipo infantil",
      pt: ["Sem ensaios dedicados", "Tumor raríssimo definido por fusões de RTK: as evidências são relatos/séries pequenas; inibidores de fusão são usados off-label com base em respostas individuais."],
      en: ["No dedicated trials", "Ultra-rare fusion-defined tumor: evidence is limited to reports/small series; fusion inhibitors are used off-label based on individual responses."],
      ref: "Coleta v2.6: 0 estudos com desfecho; séries de casos (PMIDs do bloco da entidade)." },
    { cat: "evidencia", ent: "Tumor glioneuronal mixoide",
      pt: ["Entidade sem dados de desfecho", "Descrita na CNS5 a partir de séries moleculares; história natural e melhor manejo ainda não quantificados."],
      en: ["Entity without outcome data", "Described in CNS5 from molecular series; natural history and optimal management remain unquantified."],
      ref: "Coleta v2.6: 0 estudos com desfecho agregado." },
    { cat: "diagnostico", ent: null,
      pt: ["Acesso desigual à classificação molecular completa", "Painéis de metilação, sequenciamento de fusões e IDH/1p19q não estão disponíveis em grande parte dos centros brasileiros (SUS), levando a sub-classificação e exclusão de terapias-alvo."],
      en: ["Unequal access to complete molecular classification", "Methylation arrays, fusion sequencing and IDH/1p19q testing are unavailable in most Brazilian public centers (SUS), causing under-classification and exclusion from targeted therapies."],
      ref: "PCDT/SUS gliomas; diretrizes EANO vs. prática nacional (seção SUS do Dr.Gliou)." },
    { cat: "diagnostico", ent: null,
      pt: ["Sem biomarcador sanguíneo validado", "Não existe teste sanguíneo (ctDNA/proteína) validado para diagnóstico ou monitoramento de glioma; toda decisão depende de tecido/biópsia."],
      en: ["No validated blood biomarker", "No blood test (ctDNA/protein) is validated for glioma diagnosis or monitoring; every decision depends on tissue/biopsy."],
      ref: "Revisões de ctDNA em glioma (bloco de IA/meta-análises da base)." },
    { cat: "acesso", ent: "Glioblastoma, IDH-wildtype",
      pt: ["Tecnologias com benefício aprovado indisponíveis no SUS", "TTFields (EF-14) e, em parte, testes moleculares completos e re-irradiação não são incorporados rotineiramente no SUS, criando dupla carga de desigualdade."],
      en: ["Approved-benefit technologies unavailable in the public system", "TTFields (EF-14) and, partly, complete molecular testing and re-irradiation are not routinely incorporated in Brazil's SUS, creating a double burden of inequality."],
      ref: "EF-14 (NCT00916409); PCDT gliomas SUS; coluna SUS do plano terapêutico do Dr.Gliou." },
    { cat: "acesso", ent: null,
      pt: ["Terapias-alvo aprovadas fora do alcance", "Inibidores de TRK (larotrectinibe), BRAF/MEK (dabrafenibe+trametinibe) e everolimo (SEGA/TSC) existem, mas o acesso público é judicializado e heterogêneo no Brasil."],
      en: ["Approved targeted therapies out of reach", "TRK inhibitors (larotrectinib), BRAF/MEK (dabrafenib+trametinib) and everolimus (SEGA/TSC) exist, but public access in Brazil requires litigation and is heterogeneous."],
      ref: "STARTRK/ROAR/FEXIST; PCDT e Conitec (decisões de incorporação)." },
    { cat: "pediatrico", ent: "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
      pt: ["Ensaios pediátricos escassos e extrapolação adulta", "A maioria das condutas pediátricas deriva de protocolos SIOP/COG com amostras pequenas; subgrupos moleculares (MYCN, RTK) ainda não têm terapia específica testada em fase III."],
      en: ["Scarce pediatric trials and adult extrapolation", "Most pediatric management derives from SIOP/COG protocols with small samples; molecular subgroups (MYCN, RTK) still lack phase-III-tested specific therapy."],
      ref: "Protocolos SIOP-E / COG; coleta v2.6 (22 estudos MAPK-pediátricos, 0 para este subgrupo)." },
    { cat: "pediatrico", ent: "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
      pt: ["Inibidores de MEK/BRAF ainda não são primeira linha pública", "Ensaios (TONE/FNLC) mostram superioridade sobre quimioterapia, mas a incorporação no SUS é inexistente; crianças seguem expostas a toxicidade de carbo/vincristina."],
      en: ["MEK/BRAF inhibitors are still not public first-line", "Trials (TONE/FNLC) show superiority over chemotherapy, but SUS incorporation is absent; children remain exposed to carbo/vincristine toxicity."],
      ref: "TONE (selumetinib), FNLC1704 (dabrafenib/trametinib); PCDT SUS." },
    { cat: "tratamento", ent: "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
      pt: ["Sequência e desescalonamento indefinidos", "RTOG 9402/CODEL provam benefício de RT+PCV, mas a melhor sequência (PCV vs. TMZ; desescalonar RT em baixo risco) segue sem resposta randomizada."],
      en: ["Sequence and de-escalation undefined", "RTOG 9402/CODEL prove RT+PCV benefit, but the best sequence (PCV vs TMZ; RT de-escalation in low risk) remains without randomized answer."],
      ref: "RTOG 9402, CODEL, INDIGO (IDH-mut); meta-análises do bloco da entidade." },
    { cat: "evidencia", ent: null,
      pt: ["Viés de publicação e desfechos não reportados", "79% dos 10.941 estudos indexados não trazem desfecho agregado; o indicador de força da evidência (77%) existe justamente para tornar essa lacuna visível."],
      en: ["Publication bias and unreported outcomes", "79% of the 10,941 indexed studies carry no aggregated outcome; the evidence-strength indicator (77%) exists precisely to make this gap visible."],
      ref: "Métrica própria v2.6 (aba Início e Análise por tumor)." },
    { cat: "tratamento", ent: "Astrocitoma, IDH-mutante",
      pt: ["Vorasidenibe: acesso e duração de resposta em aberto", "O INDIGO mudou o paradigma em G2 residual, mas dados de longo prazo, sequência pós-progressão e acesso público permanecem lacunas."],
      en: ["Vorasidenib: access and durability open", "INDIGO changed the paradigm in residual G2, but long-term data, post-progression sequencing and public access remain gaps."],
      ref: "INDIGO (NEJM 2023); bloco de meta-análises da entidade." }
  ];
  var CATS = {
    tratamento: { pt: "Tratamento", en: "Treatment" }, evidencia: { pt: "Evidência", en: "Evidence" },
    diagnostico: { pt: "Diagnóstico", en: "Diagnosis" }, acesso: { pt: "Acesso", en: "Access" },
    pediatrico: { pt: "Pediátrico", en: "Pediatric" }
  };

  function computed() {
    var ents = (typeof ENTITY_META !== "undefined") ? Object.keys(ENTITY_META) : [];
    return ents.map(function (e) {
      var m = ANALYTICS.entityMetrics(e);
      var cov = m.nStudies ? (m.nDesfecho / m.nStudies) * 100 : 0;
      return { ent: e, n: m.nStudies, nDesf: m.nDesfecho, cov: cov, ev: m.evPct || 0, os: m.osCount || 0 };
    }).sort(function (a, b) { return a.cov - b.cov || a.ev - b.ev; });
  }

  function render() {
    var el = document.querySelector("#gaps-root"); if (!el) return;
    var comp = computed();
    var zeros = comp.filter(function (c) { return c.nDesf === 0; });
    var items = comp.map(function (c) {
      return { label: (window.ENAM ? ENAM(c.ent) : c.ent), value: Math.round(c.cov), max: 100, sub: (en() ? c.nDesf + "/" + c.n + " outcome studies · evidence " : c.nDesf + "/" + c.n + " estudos com desfecho · evidência ") + Math.round(c.ev) + "%", color: c.nDesf === 0 ? "#F87171" : c.cov < 5 ? "#C9A227" : "#4C7DF0" };
    });
    el.innerHTML =
      '<div class="panel" style="padding:16px">' +
      '<h3 style="margin:0 0 6px">' + (en() ? "Measured gaps: aggregated-outcome coverage per entity" : "Lacunas medidas: cobertura de desfecho agregado por entidade") + '</h3>' +
      '<p class="hint" style="margin:0 0 10px">' + (en() ?
        "Share of indexed studies per entity that carry an aggregated outcome (meta-analysis/SR/trial or curated OS/HR). Entities at 0% have NO study capable of feeding the evidence-strength indicator — the most objective evidence gap in the base." :
        "Fração dos estudos indexados por entidade que traz desfecho agregado (meta-análise/SR/ensaio ou OS/HR curado). Entidades em 0% NÃO têm nenhum estudo capaz de alimentar o indicador de força da evidência — a lacuna mais objetiva da base.") + '</p>' +
      CH.hbar(items, { unit: "%" }) +
      '<p class="hint" style="margin:8px 0 0">' + (en() ?
        ("Entities with zero aggregated outcomes: " + (zeros.length ? zeros.map(function (z) { return z.ent; }).join(" · ") : "none") + ".") :
        ("Entidades com zero desfecho agregado: " + (zeros.length ? zeros.map(function (z) { return z.ent; }).join(" · ") : "nenhuma") + ".")) + '</p>' +
      '</div>' +
      '<h3 style="margin:18px 0 8px">' + (en() ? "Curated gaps of neuro-oncology (literature & trial landscape)" : "Lacunas curadas da neuro-oncologia (literatura e cenário de ensaios)") + '</h3>' +
      '<div class="gap-grid">' + CURATED.map(function (g) {
        var d = en() ? g.en : g.pt;
        return '<div class="gap-card gap-' + g.cat + '">' +
          '<span class="gap-cat">' + esc((CATS[g.cat] || {})[en() ? "en" : "pt"] || g.cat) + '</span>' +
          '<h4>' + esc(d[0]) + '</h4>' +
          (g.ent ? '<p class="gap-ent">' + esc(g.ent) + '</p>' : '') +
          '<p>' + esc(d[1]) + '</p>' +
          '<p class="hint gap-ref">' + esc(g.ref) + '</p>' +
          '</div>';
      }).join("") + '</div>';
  }

  document.addEventListener("gliobio:lang", render);
  window.GLIOBIO_GAPS = { render: render, computed: computed };
})();
