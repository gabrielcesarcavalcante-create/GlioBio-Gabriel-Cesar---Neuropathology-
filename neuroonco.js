// =====================================================================
// neuroonco.js — NeuroOnco-Agent
// Agente especialista determinístico de neuro-oncologia molecular que
// roda 100% no navegador (a plataforma é static: sem backend, sem chaves).
// Implementa o pipeline do prompt original:
//   PASSO 1 extração de entidades clínicas  -> extractCase()
//   PASSO 2 diagnóstico integrado WHO 2021  -> diagnose()
//   PASSO 3 perfil de risco/prognóstico     -> prognosis()
//   PASSO 4 plano terapêutico em 2 colunas  -> therapyPlan()
//   PASSO 5 ensaios clínicos elegíveis      -> trials()
//   PASSO 6 explicabilidade (XAI)           -> xai()
// Regras críticas respeitadas: nunca substitui o médico; disclaimer
// obrigatório; sinaliza dados ausentes; não inventa ensaios (NCT reais);
// prioriza aprovação regulatória; ajusta pediatria (SIOP/COG); alerta
// interações com anticonvulsivantes.
// =====================================================================

const NEUROONCO = (() => {

  // ------------------------------------------------------------------
  // PASSO 1 — Extração de entidades clínicas
  // ------------------------------------------------------------------
  const LOC_PATTERNS = [
    ["frontal", /frontal/i], ["temporal", /temporal/i], ["parietal", /parietal/i],
    ["occipital", /occipital/i], ["insular", /insul/i], ["tálamo", /t[áa]lamo|thalamic/i],
    ["gânglios da base", /g[âa]nglios da base|basal ganglia/i],
    ["corpo caloso", /corpo caloso|callosal/i],
    ["tronco cerebral/ponte", /ponte|pons|tronco encef[áa]lico|brainstem/i],
    ["cerebelo", /cerebel|cerebell/i], ["medula espinhal", /medula espinhal|spinal cord|medular/i],
    ["região selar/3º ventrículo", /terceiro ventr[íi]culo|3[oº] ventr[íi]culo|hipot[áa]lamo|quiasma/i],
    ["4º ventrículo", /quarto ventr[íi]culo|4[oº] ventr[íi]culo/i],
    ["leptomeninges", /leptomening|meníngea difusa|meningea difusa/i]
  ];

  function midline(locs) {
    return locs.some(l => /tálamo|tronco|ponte|medula espinhal|3º ventrículo|4º ventrículo/.test(l));
  }
  function hemispheric(locs) {
    return locs.some(l => /frontal|temporal|parietal|occipital|insular/.test(l));
  }

  function extractCase(text) {
    const t = String(text || "");
    const F = [];
    const add = (campo, valor, conf, raw) => { if (valor != null) F.push({ campo, valor, conf, raw: raw || "" }); };

    // idade
    let m = t.match(/(\d{1,2})\s*anos/i) || t.match(/idade[:\s]*\.?(\d{1,2})/i);
    const idade = m ? parseInt(m[1], 10) : null;
    add("Idade", idade != null ? idade + " anos" : null, "alta", m ? m[0] : "");
    // sexo
    m = t.match(/sexo\s*(feminino|masculino)/i) || t.match(/\b(mulher|homem)\b/i);
    add("Sexo", m ? (m[1].match(/feminino|mulher/i) ? "Feminino" : "Masculino") : null, m && /sexo/i.test(m[0]) ? "alta" : "média", m ? m[0] : "");
    // KPS / ECOG
    m = t.match(/KPS\s*[:=]?\s*(\d{2,3})/i) || t.match(/Karnofsky\s*[:=]?\s*(\d{2,3})/i);
    add("Desempenho (KPS)", m ? m[1] + "%" : null, "alta", m ? m[0] : "");
    m = t.match(/ECOG\s*[:=]?\s*([0-4])/i);
    add("Desempenho (ECOG)", m ? "ECOG " + m[1] : null, "alta", m ? m[0] : "");
    // localização
    const locs = LOC_PATTERNS.filter(([, re]) => re.test(t)).map(([n]) => n);
    add("Localização (imagem)", locs.length ? locs.join(", ") : null, "média", locs.join("; "));
    // tamanho
    m = t.match(/(\d[.,]\d)\s*cm/i);
    add("Maior diâmetro", m ? m[1].replace(",", ".") + " cm" : null, "alta", m ? m[0] : "");
    // sintomas
    const symp = [];
    if (/crise|convuls|epilep/i.test(t)) symp.push("crises epilépticas");
    if (/cefal/i.test(t)) symp.push("cefaleia");
    if(/d[ée]ficit motor|hemipares|paresia/i.test(t)) symp.push("déficit motor");
    if (/hipertens[ãa]o intracraniana|v[ôo]mito|papiledema/i.test(t)) symp.push("sinais de HIC");
    if (/cogni|mem[óo]ria|comportamento/i.test(t)) symp.push("alteração cognitiva/comportamental");
    add("Sintomas", symp.length ? symp.join(", ") : null, "média", symp.join("; "));
    m = t.match(/h[áa]\s+(\d+)\s*(meses|semanas|anos)/i) || t.match(/evolu[çc][ãa]o de\s+(\d+)\s*(meses|semanas|anos)/i);
    add("Tempo de evolução", m ? m[1] + " " + m[2] : null, "média", m ? m[0] : "");
    // status cirúrgico
    let surg = null;
    if (/ressec[çc][ãa]o (total|completa|gross total)|GTR|ressecado totalmente/i.test(t)) surg = "Ressecção total (GTR)";
    else if (/ressec[çc][ãa]o (parcial|subtotal|incompleta)|STR|bi[óo]psia.*ressec/i.test(t)) surg = "Ressecção parcial/subtotal";
    else if (/bi[óo]psia/i.test(t)) surg = "Biópsia apenas";
    add("Status cirúrgico", surg, surg ? "alta" : "média", "");
    // imagem (com tratamento de negação: "sem realce", "sem necrose")
    const tImg = t.replace(/\b(sem|n[ãa]o apresenta|n[ãa]o h[áa]|aus[êe]ncia de)\s+(necrose|realce[^.;,]*|capta[çc][ãa]o[^.;,]*|enhancement)/gi, " ");
    const img = [];
    if (/necrose/i.test(tImg)) img.push("necrose");
    if (/realce|capta[çc][ãa]o de contraste|enhancement/i.test(tImg)) img.push("realce ao contraste");
    if (/edema/i.test(tImg)) img.push("edema perilesional");
    if (/perfus[ãa]o|rCBV/i.test(tImg)) img.push("alteração de perfusão");
    if (/espectroscopia/i.test(tImg)) img.push("espectroscopia alterada");
    add("Achados de RM", img.length ? img.join(", ") : null, "média", img.join("; "));
    // biomarcadores
    const bio = {};
    m = t.match(/IDH\s*(1|2)?\s*(mutad[oa]|mutante|positiv[oa])/i);
    const idhWt = /IDH\s*(wildtype|wild-type|selvagem|n[ãa]o mutad[oa])/i.test(t);
    if (m) bio.IDH = "mutado"; else if (idhWt) bio.IDH = "wildtype";
    add("IDH1/IDH2", bio.IDH || null, "alta", "");
    m = t.match(/MGMT\s*(metilad[oa])/i);
    const mgmtUn = /MGMT\s*(n[ãa]o metilad[oa]|unmethylated)/i.test(t);
    if (m) bio.MGMT = "metilado"; else if (mgmtUn) bio.MGMT = "não metilado";
    add("MGMT (promotor)", bio.MGMT || null, "alta", "");
    m = t.match(/1p\/?19q\s*(codeletad[oa]|codele[çc][ãa]o|positiv[oa])/i) || t.match(/codele[çc][ãa]o\s*(de\s*)?1p\/?19q/i);
    const codelNo = /1p\/?19q\s*(n[ãa]o codeletad[oa]|sem codele[çc][ãa]o|integras)/i.test(t);
    if (m) bio.CODEL = "codeletado"; else if (codelNo) bio.CODEL = "não codeletado";
    add("Codeleção 1p/19q", bio.CODEL || null, "alta", "");
    m = t.match(/ATRX\s*(perdid[oa]|perda|loss|ausente)/i);
    const atrxR = /ATRX\s*(retid[oa]|preservad[oa]|retained)/i.test(t);
    if (m) bio.ATRX = "perdido"; else if (atrxR) bio.ATRX = "retido";
    add("ATRX", bio.ATRX || null, "alta", "");
    m = t.match(/TERT\s*(promoter\s*)?(mutad[oa]|mutante)/i);
    if (m) bio.TERT = "mutado";
    add("TERT promoter", bio.TERT || null, "alta", "");
    m = t.match(/EGFR\s*(amplificad[oa]|amplifica[çc][ãa]o)/i) || t.match(/EGFRvIII/i);
    if (m) bio.EGFR = /vIII/i.test(m[0]) ? "amplificado + vIII" : "amplificado";
    add("EGFR", bio.EGFR || null, "alta", "");
    m = t.match(/CDKN2A\/?B?\s*(dele[çc][ãa]o\s*)?(homozig[óo]tica|homozigous|bial[ée]lica)/i);
    if (m) bio.CDKN2AB = "deleção homozigótica";
    add("CDKN2A/B", bio.CDKN2AB || null, "alta", "");
    m = t.match(/BRAF\s*V600E/i);
    const brafFus = /KIAA1549|fus[ãa]o\s*(de\s*)?BRAF|BRAF\s*fus/i.test(t);
    if (m) bio.BRAF = "V600E"; else if (brafFus) bio.BRAF = "fusão (KIAA1549::BRAF)";
    add("BRAF", bio.BRAF || null, "alta", "");
    m = t.match(/H3\s*K27M|K27M/i);
    const g34 = /H3\s*G34|G34R|G34V/i.test(t);
    if (m) bio.H3 = "K27M"; else if (g34) bio.H3 = "G34R/V";
    add("Histona H3", bio.H3 || null, "alta", "");
    m = t.match(/fus[ãa]o\s*(NTRK|ALK|ROS1|MET)|NTRK\s*(fundido|fus[ãa]o)/i);
    if (m) bio.FUSAO_RTK = (m[1] || "RTK").toUpperCase();
    add("Fusão RTK (NTRK/ALK/ROS1/MET)", bio.FUSAO_RTK || null, "alta", "");
    m = t.match(/TMB\s*(alto|high)|(\d+(\.\d+)?)\s*mut\/?Mb/i);
    if (m) bio.TMB = "alto";
    add("TMB", bio.TMB || null, "média", "");
    m = t.match(/MSI-H|instabilidade de microssat[ée]lites|dMMR|MMR\s*deficiente/i);
    if (m) bio.MSI = "MSI-H / dMMR";
    add("MMR/MSI", bio.MSI || null, "alta", "");
    // contexto
    m = t.match(/\bSUS\b|rede p[úu]blica|sistema [úu]nico/i);
    const priv = /particular|privad[oa]|suplementar|conv[êe]nio|plano de sa[úu]de/i.test(t);
    add("Contexto de acesso", m ? "SUS / rede pública" : (priv ? "Rede privada/suplementar" : null), "média", "");
    // tratamentos prévios / recidiva
    m = t.match(/recidiva|recorrente|progress[ãa]o|pr[ée]-tratad|temozolomida pr[ée]via|ap[óo]s Stupp/i);
    add("Situação", m ? "Recidiva / progressão após tratamento prévio" : "Doença recém-diagnosticada (assumido)", m ? "média" : "—", "");
    // anticonvulsivantes
    m = t.match(/fenito[íi]na|carbamazepina|fenobarbital/i);
    add("Anticonvulsivante indutor enzimático", m ? m[0] : null, "alta", "");

    return { fields: F, bio, idade, locs, surg, priv: priv, sus: !!m && !priv, recidiva: /recidiva|recorrente|progress[ãa]o/i.test(t) };
  }

  // ------------------------------------------------------------------
  // PASSO 2 — Diagnóstico integrado (WHO 2021/CNS5)
  // ------------------------------------------------------------------
  function diagnose(c) {
    const b = c.bio, out = { dx: null, grade: null, rules: [], missing: [], pediatric: c.idade != null && c.idade < 18 };

    const need = (cond, label) => { if (!cond) out.missing.push(label); };

    if (b.IDH == null) need(false, "IDH1/IDH2 (imunohistoquímica R132H + sequenciamento)");
    if (b.IDH === "mutado" && b.CODEL == null && b.ATRX == null) need(false, "Codeleção 1p/19q e/ou ATRX (para separar oligodendroglioma de astrocitoma)");
    if (b.IDH === "wildtype" && !b.TERT && !b.EGFR && !out.pediatric) need(false, "TERT promoter, EGFR e/ou CNV (+7/−10) para confirmar glioblastoma IDH-wildtype");

    if (out.pediatric || (c.idade != null && c.idade <= 25 && (b.H3 || midline(c.locs)))) {
      if (b.H3 === "K27M" || (midline(c.locs) && b.H3 == null && out.pediatric)) {
        out.dx = "Glioma difuso de linha média, H3 K27-alterado"; out.grade = 4;
        out.rules.push("OMS CNS5: alteração H3 K27 (K27M, EZHIP ou perda de H3K27me3) em tumor difuso de linha média define a entidade e atribui grau 4 independentemente da histologia.");
        if (b.H3 == null) out.rules.push("Nota: marcador H3 não informado — inferido pela localização de linha média em paciente pediátrico; confirmar por IHC H3K27M/H3K27me3.");
      } else if (b.H3 === "G34R/V") {
        out.dx = "Glioma hemisférico difuso, H3 G34-mutante"; out.grade = 4;
        out.rules.push("OMS CNS5: mutação H3-3A G34R/V em glioma difuso hemisférico de criança/adulto jovem define entidade de grau 4.");
      } else if (c.idade != null && c.idade <= 3 && hemispheric(c.locs) && b.FUSAO_RTK) {
        out.dx = "Glioma hemisférico infantil, tipo infantil"; out.grade = "não atribuído";
        out.rules.push("OMS CNS5: glioma hemisférico de alto grau celular no lactente com fusão de RTK (NTRK/ROS1/ALK/MET); grau definitivo não atribuído por falta de dados prospectivos.");
      } else if (/cerebelo/.test(c.locs.join(" ")) && b.BRAF === "fusão (KIAA1549::BRAF)") {
        out.dx = "Astrocitoma pilocítico"; out.grade = 1;
        out.rules.push("OMS CNS5: tumor circunscrito cerebelar com fusão KIAA1549::BRAF = astrocitoma pilocítico, grau 1.");
      } else if (b.BRAF === "V600E" && hemispheric(c.locs)) {
        out.dx = "Astrocitoma pleomórfico xanthoastrocytoma (hipótese)"; out.grade = 2;
        out.rules.push("Tumor cortical superficial com BRAF V600E sugere PXA (grau 2; anaplásico = 3); confirmar por histologia + classe de metilação.");
      } else if (out.pediatric && b.IDH === "wildtype") {
        out.dx = "Glioma difuso pediátrico (baixo ou alto grau) — subclassificação pendente"; out.grade = "indefinido";
        out.rules.push("Em crianças, gliomas difusos IDH-wildtype exigem painel MAPK/H3 e classe de metilação para subclassificação (OMS CNS5).");
      }
    }

    if (!out.dx && b.IDH === "mutado") {
      if (b.CODEL === "codeletado") {
        out.dx = "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado";
        out.grade = /anaplas|grau 3|mitoses|microvascular/i.test(JSON.stringify(c.fields)) ? 3 : 2;
        out.rules.push("OMS CNS5: IDH mutado + codeleção 1p/19q de braços inteiros = oligodendroglioma; grau 2 ou 3 pela histologia (anaplasia).");
      } else {
        out.dx = "Astrocitoma, IDH-mutante";
        out.grade = b.CDKN2AB ? 4 : (/grau 3|anaplas/i.test(JSON.stringify(c.fields)) ? 3 : 2);
        out.rules.push("OMS CNS5: IDH mutado com ATRX perdido/TP53 mutado e sem codeleção = astrocitoma IDH-mutante.");
        if (b.CDKN2AB) out.rules.push("cIMPACT-NOW 5 / OMS CNS5: deleção homozigótica de CDKN2A/B em astrocitoma IDH-mutante atribui grau 4 mesmo sem necrose ou proliferação microvascular.");
        else out.rules.push("Sem deleção homozigótica de CDKN2A/B informada: grau 2–3 depende da histologia; recomendo avaliar CDKN2A/B por CNV.");
      }
    }

    if (!out.dx && b.IDH === "wildtype" && !out.pediatric) {
      const crit = [];
      if (b.TERT) crit.push("TERT promoter mutado");
      if (b.EGFR) crit.push("amplificação de EGFR");
      if (/necrose|microvascular|mitoses/i.test(JSON.stringify(c.fields))) crit.push("critérios histológicos de alto grau");
      if (crit.length || /glioblastoma|GBM/i.test(JSON.stringify(c.fields))) {
        out.dx = "Glioblastoma, IDH-wildtype"; out.grade = 4;
        out.rules.push("OMS CNS5 / cIMPACT-NOW 3: glioma difuso astrocítico IDH-wildtype com TERT mutado, amplificação de EGFR ou +7/−10 (ou necrose/proliferação microvascular) = glioblastoma grau 4." + (crit.length ? " Critérios presentes: " + crit.join(", ") + "." : ""));
      } else {
        out.dx = "Glioma difuso astrocítico, IDH-wildtype — classificação molecular incompleta"; out.grade = "provável 4 (confirmar)";
        out.rules.push("IDH-wildtype sem critérios moleculares completos: solicitar TERT, EGFR e CNV (+7/−10); se positivos, glioblastoma grau 4.");
      }
    }

    if (!out.dx) {
      out.dx = "Diagnóstico integrado não concluído"; out.grade = "—";
      out.rules.push("Dados moleculares insuficientes para aplicar as regras da OMS CNS5. Complete o painel mínimo antes de qualquer decisão terapêutica.");
    }
    return out;
  }

  // ------------------------------------------------------------------
  // PASSO 3 — Prognóstico
  // ------------------------------------------------------------------
  const PROG = {
    "Glioblastoma, IDH-wildtype": { med: "14,6 meses com RT+temozolomida (Stupp); ~8–9 meses em registros populacionais", mod: [["MGMT metilado", "+", "mediana ~18–22 meses"], ["Idade < 50 anos", "+", "HR 1,0 (referência)"], ["Idade 60–69", "−", "HR ≈ 3,5"], ["Idade ≥ 70", "−", "HR ≈ 4,8"], ["Ressecção total", "+", "benefício consistente"], ["KPS ≥ 70", "+", "permite protocolo completo"]], src: "Stupp NEJM 2005; Hegi NEJM 2005; Cancers 2022;14:3161" },
    "Astrocitoma, IDH-mutante": { med: "Grau 2: ~7–8 anos · Grau 3: ~4–6 anos · Grau 4: ~5,5 anos", mod: [["CDKN2A/B homozigótico", "−", "define grau 4"], ["Ressecção ampla", "+", "fator modificável principal"], ["Idade jovem", "+", ""], ["MGMT metilado (G-CIMP)", "+", "menos discriminativo neste grupo"]], src: "Coeses moleculares (Sci Rep 2025); CATNON (Lancet Oncol 2021)" },
    "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado": { med: "Com RT+PCV: mediana ~14,7 anos", mod: [["Codeleção 1p/19q", "+", "prediz benefício duradouro de RT+PCV"], ["Grau 2", "+", ""], ["Ressecção ampla", "+", ""]], src: "Buckner NEJM 2016 (RTOG 9402); EORTC 26951" },
    "Glioma difuso de linha média, H3 K27-alterado": { med: "~9–12 meses", mod: [["K27M", "−", ""], ["Localização pontina", "−", ""], ["Resposta inicial à RT", "+", "paliativa/temporária"]], src: "NCI PDQ; coortes DIPG/DMG" },
    "Glioma hemisférico difuso, H3 G34-mutante": { med: "~1–2 anos", mod: [["Ressecção máxima", "+", ""], ["RT adjuvante", "+", ""]], src: "OMS CNS5; séries DHG" },
    "Glioma hemisférico infantil, tipo infantil": { med: "Relativamente favorável; respostas duradouras com inibidores de TRK/ALK/ROS1 quando há fusão", mod: [["Fusão RTK acionável", "+", ""], ["Idade < 1 ano", "−", "evitar RT"]], src: "Dunker JCO 2021; NCI PDQ" },
    "Astrocitoma pilocítico": { med: "Sobrevida em 10 anos > 90–95%; ressecção completa costuma ser curativa", mod: [["Ressecção total", "+", ""], ["Localização hipotalâmica", "−", "morbidade/endocrinopatia"]], src: "CBTRUS; NCI PDQ" },
    "Astrocitoma pleomórfico xanthoastrocytoma (hipótese)": { med: "Grau 2: sobrevida em 5 anos ~70–80%", mod: [["BRAF V600E", "+", "alvo acionável"], ["Anaplasia/CDKN2A-B", "−", ""]], src: "OMS CNS5; séries de PXA" },
    "default": { med: "Depende da entidade e do grau — consulte a aba 'Análise por tumor'", mod: [], src: "Base interna" }
  };

  function prognosis(d, c) {
    const p = PROG[d.dx] || PROG["default"];
    const good = [], bad = [];
    const push = (arr, s) => { if (s && !arr.includes(s)) arr.push(s); };
    d.mod = p.mod;
    if (c.idade != null) { if (c.idade < 50) push(good, "Idade < 50 anos"); else if (c.idade >= 65) push(bad, "Idade ≥ 65 anos"); }
    const kps = (c.fields.find(f => f.campo.startsWith("Desempenho (KPS)")) || {}).valor;
    if (kps) { parseInt(kps, 10) >= 70 ? push(good, "KPS " + kps) : push(bad, "KPS " + kps + " (limita protocolo completo)"); }
    const ecog = (c.fields.find(f => f.campo.startsWith("Desempenho (ECOG)")) || {}).valor;
    if (ecog) { /0|1/.test(ecog) ? push(good, ecog) : push(bad, ecog); }
    if (c.surg === "Ressecção total (GTR)") push(good, "Ressecção total");
    if (c.surg === "Biópsia apenas") push(bad, "Somente biópsia (doença residual volumosa)");
    if (c.bio.MGMT === "metilado") push(good, "MGMT metilado");
    if (c.bio.MGMT === "não metilado") push(bad, "MGMT não metilado (menor benefício de alquilantes)");
    if (c.bio.CDKN2AB) push(bad, "Deleção homozigótica de CDKN2A/B");
    if (c.bio.CODEL === "codeletado") push(good, "Codeleção 1p/19q");
    if (c.recidiva) push(bad, "Doença recidivada/progressiva");
    return { med: p.med, good, bad, src: p.src };
  }

  // ------------------------------------------------------------------
  // PASSO 4 — Plano terapêutico em duas colunas
  // ------------------------------------------------------------------
  function targetedOptions(c, d) {
    const b = c.bio, opts = [];
    if (b.IDH === "mutado" && (d.grade === 2 || d.grade === 3) && c.surg && c.surg !== "Ressecção total (GTR)")
      opts.push({ drug: "Vorasidenib (inibidor de IDH1/2 mutante)", why: "Bloqueia a produção de 2-hidroxiglutarato pelo enzyme mutante, retardando progressão e a necessidade de RT/QT.", ev: "INDIGO trial, NEJM 2023 (FDA 2024)", level: "1B", sus: "NÃO incorporado ao SUS — considerar ensaio clínico, programa de acesso ou judicialização" });
    if (b.BRAF === "V600E")
      opts.push({ drug: "Dabrafenibe + Trametinibe", why: "Inibição dupla de BRAF V600E e MEK produz respostas objetivas duradouras.", ev: "ROAR (NCT02034114); NEJM 2022 (pLGG)", level: "2A", sus: "Não padronizado no SUS; via judicialização/ensaios" });
    if (b.BRAF === "fusão (KIAA1549::BRAF)")
      opts.push({ drug: "Tovorafenib (inibidor de RAF tipo II) ou inibidor de MEK (selumetinibe/trametinibe)", why: "Fusões de BRAF mantêm o domínio quinase ativo dependente de upstream; inibidores de 1ª geração podem ativar paradoxalmente a via.", ev: "FIREFLY-1 (NCT04775485, FDA 2024); selumetinibe NEJM 2020", level: "2A", sus: "Não disponível no SUS; ensaios/programas de acesso" });
    if (b.FUSAO_RTK)
      opts.push({ drug: "Larotrectinibe / Entrectinibe (NTRK) ou inibidor específico da fusão (ALK/ROS1/MET)", why: "Inibidores de TRK/RTK são agnósticos de tumor, com respostas altas e duradouras em fusões.", ev: "NAVIGATE (NCT02576431); STARTRK-2 (NCT02568267)", level: "2A", sus: "Não incorporado ao SUS para glioma; judicialização/ensaios" });
    if (b.MGMT === "metilado")
      opts.push({ drug: "Temozolomida (benefício preditivo comprovado)", why: "Silenciamento de MGMT impede o reparo das lesões alquilantes, aumentando a eficácia da TMZ.", ev: "Hegi NEJM 2005", level: "1A", sus: "Disponível no SUS para GBM (CEAF/PCDT vigente — confirmar critérios)" });
    if (b.MGMT === "não metilado" && d.dx && d.dx.startsWith("Glioblastoma"))
      opts.push({ drug: "Considerar lomustina, regimes alternativos ou ensaio clínico (benefício de TMZ incerto)", why: "Sem silenciamento de MGMT, o reparo de DNA reduz o efeito dos alquilantes.", ev: "Hegi NEJM 2005; NCCN v2025", level: "2A", sus: "Lomustina disponível em centros de referência; ensaios priorizados" });
    if (b.TMB === "alto" || b.MSI)
      opts.push({ drug: "Pembrolizumabe (off-label, considerar)", why: "Tumores MSI-H/dMMR ou com TMB alto respondem a bloqueio de PD-1.", ev: "KEYNOTE-158 (NCT02628067); aprovação agnóstica FDA", level: "2B", sus: "Off-label no SUS para glioma; avaliar judicialização" });
    if (b.EGFR && /vIII/.test(b.EGFR))
      opts.push({ drug: "Ensaios com vacinas/ADCs anti-EGFRvIII (ex.: rindopepimut, depatux-m) — histórico/verificar atividade", why: "EGFRvIII é neoantígeno de superfície ausente em tecido normal.", ev: "Ensaios ACT IV/ReACT (resultados negativos) — verificar novos desenhos", level: "3", sus: "Somente ensaio clínico" });
    return opts;
  }

  function therapyPlan(c, d) {
    const b = c.bio, rows = [];
    const gbm = d.dx && d.dx.startsWith("Glioblastoma");
    const oligo = d.dx && d.dx.startsWith("Oligodendroglioma");
    const astro = d.dx && d.dx.startsWith("Astrocitoma, IDH-mutante");
    const ped = d.pediatric;
    const elderly = c.idade != null && c.idade >= 65;
    const lowKPS = (() => { const f = c.fields.find(x => x.campo.startsWith("Desempenho (KPS)")); return f ? parseInt(f.valor, 10) < 70 : false; })();

    rows.push({
      etapa: "Cirurgia",
      ideal: "Ressecção máxima segura com mapeamento cortical/monitorização quando eloquente; 5-ALA para guiar ressecção em GBM; repetir imagem em 24–72 h.",
      sus: "Ressecção/biópsia disponível na rede; 5-ALA e mapeamento avançado limitados a poucos centros de referência (HC-FMUSP, INCA, A.C.Camargo, HB-Brasília)."
    });
    rows.push({
      etapa: "Radioterapia",
      ideal: gbm ? "60 Gy/30 frações (IMRT/VMAT) concomitante a TMZ; hipofracionado 40 Gy/15 fx se ≥ 65 anos ou KPS baixo."
        : oligo || astro ? (d.grade >= 3 ? "59,4–60 Gy/30 fx com QT concomitante/adjuvante conforme protocolo" : "Observar ou RT 50,4–54 Gy/28–30 fx conforme risco/residual")
        : ped ? "Evitar RT em < 3 anos; quando indicada, conformacional com proteção de estruturas nobres (SIOP/COG)."
        : "Conformacional/IMRT conforme entidade e grau.",
      sus: "RT 3D-CRT amplamente disponível; IMRT/VMAT em centros de referência; hipofracionamento (40 Gy/15 fx ou 25 Gy/5 fx em idosos frágeis) é prática aceita e custo-efetiva."
    });
    rows.push({
      etapa: "QT 1ª linha",
      ideal: gbm ? "Protocolo Stupp: TMZ 75 mg/m²/dia concomitante + 6–12 ciclos adjuvantes (150–200 mg/m² 5/28 d); considerar dose-densa em recidiva."
        : oligo ? "RT + PCV (procarbazina, lomustina, vincristina) — benefício de longo prazo em 1p/19q-codeletado."
        : astro ? (d.grade >= 3 ? "RT + TMZ adjuvante (CATNON demonstrou benefício no grau 3)" : "Observação ou RT+PCV/TMZ conforme risco")
        : ped ? "Quimioterapia conforme protocolo SIOP/COG; evitar RT em lactentes."
        : "Conforme entidade histológica e grau molecular.",
      sus: gbm ? "Temozolomida disponível no SUS para GBM (CEAF/PCDT vigente — confirmar critérios e fase de tratamento)."
        : oligo ? "PCV de difícil reprodução no SUS (procarbazina sem fornecimento regular); lomustina em centros de referência; TMZ como alternativa prática amplamente usada."
        : astro ? "TMZ disponível em centros de referência para graus 3–4; graus 2 de baixo risco podem ser observados."
        : ped ? "Protocolos pediátricos em centros de referência (SIOP/COG adaptados)."
        : "Conforme PCDT/CEAF vigente e protocolo do centro de referência.",
    });
    const tg = targetedOptions(c, d);
    rows.push({
      etapa: "Terapia-alvo / imunoterapia",
      ideal: tg.length ? tg.map(t => t.drug).join(" · ") : "Sem alvo acionável identificado com o painel informado.",
      sus: tg.length ? tg.map(t => t.sus).join(" · ") : "—",
      _tg: tg
    });
    rows.push({
      etapa: (gbm ? "TTFields + 2ª linha" : "2ª linha e além"),
      ideal: gbm ? "Tumor Treating Fields (Optune) com TMZ de manutenção; na progressão: bevacizumabe, lomustina, regorafenibe ou ensaio clínico."
        : "Na progressão: reoperação se exequível, re-irradiação, lomustina/bevacizumabe ou ensaio clínico conforme perfil.",
      sus: gbm ? "TTFields NÃO disponível no SUS. Bevacizumabe não incorporado para glioma — acesso por judicialização em alguns estados na recidiva; lomustina em centros de referência."
        : "Bevacizumabe via judicialização (recidiva); lomustina e re-irradiação em centros de referência."
    });
    return rows;
  }

  // ------------------------------------------------------------------
  // PASSO 5 — Ensaios clínicos (NCT reais; nunca inventar)
  // ------------------------------------------------------------------
  const TRIALS = [
    { nct: "NCT03774823", name: "INDIGO", phase: "Fase 3", drug: "Vorasidenib", tags: ["IDH-mut", "grau2"], status: "Concluído, positivo — approval FDA 2024", crit: "Glioma IDH-mutante grau 2, pós-cirurgia, sem RT/QT prévia" },
    { nct: "NCT04775485", name: "FIREFLY-1", phase: "Fase 2", drug: "Tovorafenib", tags: ["BRAF-fusao", "ped"], status: "Concluído, positivo — approval FDA 2024", crit: "Glioma pediátrico de baixo grau com alteração de BRAF/fusão ou RAF1" },
    { nct: "NCT02034114", name: "ROAR", phase: "Fase 2", drug: "Dabrafenibe + Trametinibe", tags: ["BRAF-V600E"], status: "Concluído, positivo — approval FDA 2022", crit: "Tumores raros com BRAF V600E, incluindo gliomas de alto grau" },
    { nct: "NCT02576431", name: "NAVIGATE", phase: "Fase 2", drug: "Larotrectinibe", tags: ["NTRK"], status: "Concluído — approval FDA 2018 (tumores NTRK)", crit: "Tumor sólido com fusão de NTRK1/2/3" },
    { nct: "NCT02568267", name: "STARTRK-2", phase: "Fase 2", drug: "Entrectinibe", tags: ["NTRK", "ROS1", "ALK"], status: "Concluído — approval FDA 2019 (tumores NTRK)", crit: "Tumor sólido com fusão NTRK/ROS1/ALK" },
    { nct: "NCT02628067", name: "KEYNOTE-158", phase: "Fase 2", drug: "Pembrolizumabe", tags: ["MSI", "TMB"], status: "Concluído — approval FDA (MSI-H/TMB-alto)", crit: "Tumor MSI-H/dMMR ou TMB alto previamente tratado" },
    { nct: "NCT00626912", name: "CATNON", phase: "Fase 3", drug: "TMZ adjuvante/concomitante", tags: ["astro-g3"], status: "Concluído — base de diretriz EANO 2024", crit: "Astrocitoma anaplásico 1p/19q não codeletado" },
    { nct: "NCT00887198", name: "CODEL", phase: "Fase 3", drug: "RT ± TMZ", tags: ["oligo"], status: "Concluído — base de diretriz NCCN v2025", crit: "Oligodendroglioma 1p/19q-codeletado" },
    { nct: "NCT00916409", name: "EF-14", phase: "Fase 3", drug: "TTFields + temozolomida", tags: ["gbm-new"], status: "Concluído, positivo — approval FDA 2015", crit: "Glioblastoma recém-diagnosticado após RT/QT concomitante" },
    { nct: "NCT01290939", name: "EORTC 26101", phase: "Fase 2", drug: "Bevacizumabe + lomustina", tags: ["gbm-rec"], status: "Concluído — base para uso em recidiva", crit: "Glioblastoma em primeira recidiva" }
  ];

  function trialsFor(c, d) {
    const b = c.bio, tags = [];
    if (b.IDH === "mutado") tags.push("IDH-mut");
    if (d.grade === 2) tags.push("grau2");
    if (b.BRAF === "V600E") tags.push("BRAF-V600E");
    if (b.BRAF === "fusão (KIAA1549::BRAF)") tags.push("BRAF-fusao");
    if (b.FUSAO_RTK === "NTRK") tags.push("NTRK");
    if (["ALK", "ROS1"].includes(b.FUSAO_RTK)) tags.push(b.FUSAO_RTK);
    if (b.MSI || b.TMB) tags.push("MSI", "TMB");
    if (d.dx && d.dx.startsWith("Oligodendroglioma")) tags.push("oligo");
    if (d.dx && d.dx.startsWith("Astrocitoma, IDH-mutante") && d.grade === 3) tags.push("astro-g3");
    if (d.dx && d.dx.startsWith("Glioblastoma") && c.recidiva) tags.push("gbm-rec");
    if (d.dx && d.dx.startsWith("Glioblastoma") && !c.recidiva && !d.pediatric) tags.push("gbm-new");
    if (d.pediatric) tags.push("ped");
    const hits = TRIALS.filter(t => t.tags.some(x => tags.includes(x)));
    return hits.slice(0, 5);
  }

  // ------------------------------------------------------------------
  // PASSO 6 — Explicabilidade
  // ------------------------------------------------------------------
  function xai(c, d, rows) {
    const out = [];
    const gbm = d.dx && d.dx.startsWith("Glioblastoma");
    if (gbm) {
      out.push({ rec: "RT + temozolomida (Stupp)", why: "TMZ causa lesões O6-metilguanina; a RT soma dano de DNA duplo-fita. Sem MGMT funcional (promotor metilado), o tumor não repara o dano.", ev: "Stupp et al., NEJM 2005; Hegi et al., NEJM 2005", level: "1A", contra: c.bio.MGMT === "não metilado" ? "Benefício reduzido com MGMT não metilado — ainda assim padrão em pacientes aptos; ponderar ensaio clínico" : (c.idade != null && c.idade >= 70 ? "Em ≥ 70 anos ou KPS baixo, preferir RT hipofracionada ± TMZ (benefício mantido no subgrupo MGMT metilado)" : "Mielossupressão grau 3–4; pneumonite rara") });
      out.push({ rec: "TTFields (Optune)", why: "Campos elétricos alternados perturbam o fuso mitótico em células em divisão.", ev: "EF-14 (NCT00916409), JAMA 2017", level: "1B", contra: "Indisponível no SUS; dermatite de contato; exige adesão ≥ 18 h/dia" });
    }
    if (d.dx && d.dx.startsWith("Oligodendroglioma"))
      out.push({ rec: "RT + PCV", why: "A codeleção 1p/19q marca tumores com sensibilidade duradoura a alquilantes; o benefício emerge após 8–10 anos.", ev: "RTOG 9402 (Buckner NEJM 2016); EORTC 26951 (Cairncross JCO 2014)", level: "1A", contra: "Mielotoxicidade cumulativa; procarbazina indisponível no SUS — adaptar regime" });
    if (d.dx && d.dx.startsWith("Astrocitoma, IDH-mutante") && d.grade === 3)
      out.push({ rec: "TMZ adjuvante após RT", why: "No grau 3 IDH-mutante 1p/19q não codeletado, a TMZ adjuvante melhorou OS.", ev: "CATNON, Lancet Oncol 2021", level: "1B", contra: "Grau 2 de baixo risco: benefício não estabelecido" });
    (rows.find(r => r.etapa === "Terapia-alvo / imunoterapia")._tg || []).forEach(t =>
      out.push({ rec: t.drug, why: t.why, ev: t.ev, level: t.level, contra: t.sus }));
    const anticonv = c.fields.find(f => f.campo.startsWith("Anticonvulsivante"));
    if (anticonv)
      out.push({ rec: "Revisar anticonvulsivante indutor enzimático", why: "Fenitoína/carbamazepina/fenobarbital induzem CYP3A4 e reduzem a exposição de várias terapias-alvo (inibidores de BRAF/MEK, TRK).", ev: "Interações farmacocinéticas documentadas; NCCN v2025", level: "2A", contra: "Preferir levetiracetam ou lacosamida quando possível" });
    return out;
  }

  // ------------------------------------------------------------------
  // Orquestração
  // ------------------------------------------------------------------
  function run(text) {
    const c = extractCase(text);
    const d = diagnose(c);
    const pr = prognosis(d, c);
    const rows = therapyPlan(c, d);
    const tr = trialsFor(c, d);
    const xx = xai(c, d, rows);
    const alerts = [];
    if (d.missing.length) alerts.push("Dados moleculares críticos ausentes: " + d.missing.join("; ") + ". O diagnóstico integrado não pode ser concluído com segurança sem estes exames.");
    if (c.idade != null && c.idade < 18) alerts.push("Paciente pediátrico: protocolos devem seguir diretrizes SIOP/COG; evitar radioterapia em < 3 anos sempre que exequível.");
    if (c.idade != null && c.idade >= 65) alerts.push("Idoso: considerar RT hipofracionada (40 Gy/15 fx ou 25 Gy/5 fx) e avaliar MGMT para decidir por TMZ isolada.");
    const kps = (c.fields.find(f => f.campo.startsWith("Desempenho (KPS)")) || {}).valor;
    if (kps && parseInt(kps, 10) < 70) alerts.push("KPS < 70: benefício de tratamento intensivo incerto; priorizar suporte, RT hipofracionada ou ensaio clínico.");
    const anticonv = c.fields.find(f => f.campo.startsWith("Anticonvulsivante"));
    if (anticonv) alerts.push("Em uso de " + anticonv.valor + ": indutor de CYP3A4 — revisar antes de iniciar terapia-alvo.");
    if (c.bio.MGMT === "não metilado" && d.dx && d.dx.startsWith("Glioblastoma")) alerts.push("MGMT não metilado: benefício limitado de alquilantes; ensaio clínico deve ser priorizado desde a 1ª linha.");
    const susCtx = c.fields.find(f => f.campo === "Contexto de acesso");
    if (susCtx && /SUS/.test(susCtx.valor)) alerts.push("Contexto SUS: verifique PCDT/CEAF vigente e centros de referência (INCA-RJ, HC-FMUSP, A.C.Camargo-SP, HC-UFMG, Hospital de Base de Brasília) antes de prescrever terapias não incorporadas.");
    alerts.push("Esta análise é gerada por IA e deve ser validada por um neuro-oncologista. Não constitui prescrição médica.");

    const next = [];
    d.missing.forEach(x => next.push("Solicitar: " + x));
    if (!c.fields.some(f => f.campo === "Status cirúrgico")) next.push("Definir e registrar a extensão de ressecção (biópsia × parcial × total) com imagem pós-operatória.");
    if (!c.fields.some(f => f.campo.startsWith("Desempenho"))) next.push("Registrar KPS ou ECOG para estratificação de protocolo.");
    next.push("Discutir o caso em Tumor Board multidisciplinar (neurocirurgia, neuro-oncologia, radioterapia, neuropatologia).");
    if (tr.length) next.push("Checar elegibilidade e centros ativos dos ensaios listados em ClinicalTrials.gov e ReBEC.");
    next.push("Documentar consentimento e plano de seguimento com RM a cada 2–3 meses no primeiro ano.");

    return { case: c, dx: d, prog: pr, rows, trials: tr, xai: xx, alerts, next };
  }

  return { run, extractCase, diagnose, TRIALS };
})();
