// =====================================================================
// Glioma Biomarker Analyst — versão Static (HTML/CSS/JS puro)
// Porta fiel da lógica do notebook Python (pandas + TF-IDF + sklearn)
// para rodar inteiramente no navegador, sem backend.
// =====================================================================

// ---------------------------------------------------------------
// Utilidades de texto (equivalente a strip_accents="unicode" do sklearn)
// ---------------------------------------------------------------
function stripAccents(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalize(s) {
  return stripAccents(String(s || "").toLowerCase());
}

function tokenize(s) {
  const clean = normalize(s).replace(/[^a-z0-9\s]/g, " ");
  return clean.split(/\s+/).filter(Boolean);
}

// n-gramas (1,2) — mesmo ngram_range usado no TfidfVectorizer original
function ngrams(tokens, nMin = 1, nMax = 2) {
  const grams = [];
  for (let n = nMin; n <= nMax; n++) {
    for (let i = 0; i + n <= tokens.length; i++) {
      grams.push(tokens.slice(i, i + n).join(" "));
    }
  }
  return grams;
}

// ---------------------------------------------------------------
// TF-IDF + similaridade de cosseno, implementado em JS puro
// (substitui TfidfVectorizer + cosine_similarity do scikit-learn)
// ---------------------------------------------------------------
const SEARCH_FIELDS = [
  "entity", "synonyms", "biomarker", "role",
  "outcome", "age_group", "treatment_context"
];

function buildSearchText(row) {
  return SEARCH_FIELDS.map((f) => row[f] || "").join(" ");
}

class TfidfIndex {
  constructor(rows) {
    this.rows = rows;
    this.docsGrams = rows.map((r) => ngrams(tokenize(buildSearchText(r))));
    this.vocab = new Map(); // termo -> índice
    this.df = []; // document frequency por termo

    this.docsGrams.forEach((grams) => {
      const seen = new Set();
      grams.forEach((g) => {
        if (!this.vocab.has(g)) {
          this.vocab.set(g, this.vocab.size);
          this.df.push(0);
        }
        seen.add(g);
      });
      seen.forEach((g) => {
        this.df[this.vocab.get(g)] += 1;
      });
    });

    const N = rows.length;
    this.idf = this.df.map((d) => Math.log((1 + N) / (1 + d)) + 1);
    this.docVectors = this.docsGrams.map((grams) => this._vectorize(grams));
    this.docNorms = this.docVectors.map((v) => this._norm(v));
  }

  _vectorize(grams) {
    const counts = new Map();
    grams.forEach((g) => {
      if (!this.vocab.has(g)) return;
      counts.set(g, (counts.get(g) || 0) + 1);
    });
    const vec = new Map();
    counts.forEach((tf, g) => {
      const idx = this.vocab.get(g);
      vec.set(idx, tf * this.idf[idx]);
    });
    return vec;
  }

  _norm(vec) {
    let sum = 0;
    vec.forEach((v) => (sum += v * v));
    return Math.sqrt(sum) || 1;
  }

  _cosine(vecA, normA, vecB, normB) {
    let dot = 0;
    const [small, large] = vecA.size < vecB.size ? [vecA, vecB] : [vecB, vecA];
    small.forEach((val, key) => {
      if (large.has(key)) dot += val * large.get(key);
    });
    return dot / (normA * normB);
  }

  query(text, topK = 5) {
    const qGrams = ngrams(tokenize(text));
    const qVec = this._vectorize(qGrams);
    const qNorm = this._norm(qVec);

    const scores = this.rows.map((row, i) => ({
      row,
      score: this._cosine(qVec, qNorm, this.docVectors[i], this.docNorms[i]),
    }));

    scores.sort((a, b) => b.score - a.score);
    return scores.slice(0, topK);
  }
}

const searchIndex = new TfidfIndex(DATA);

// ---------------------------------------------------------------
// Reconhecimento de intenção e entidade (porta da CÉLULA 4)
// ---------------------------------------------------------------
function detectIntent(question) {
  const q = normalize(question);
  let best = "general";
  let bestScore = 0;

  Object.entries(INTENTS).forEach(([intent, words]) => {
    const score = words.reduce((acc, w) => acc + (q.includes(normalize(w)) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  });

  return bestScore === 0 ? "general" : best;
}

function detectEntity(question) {
  const q = normalize(question);
  const aliases = Object.keys(ENTITY_ALIASES).sort((a, b) => b.length - a.length);
  for (const alias of aliases) {
    if (q.includes(normalize(alias))) {
      return ENTITY_ALIASES[alias];
    }
  }
  return null;
}

function detectAgeGroup(question) {
  const q = normalize(question);
  const has = (arr) => arr.some((x) => q.includes(normalize(x)));

  if (has(["crianca", "criancas", "pediatrico", "pediatrica"])) return "crianças";
  if (has(["adulto jovem", "jovens", "adolescente"])) return "adultos jovens";
  if (has(["idoso", "idosos", "70 anos", "75 anos"])) return "idosos";
  if (q.includes("adulto")) return "adultos";
  return null;
}

// ---------------------------------------------------------------
// Motor de resposta (porta das CÉLULAS 5 e 6)
// ---------------------------------------------------------------
function uniqueBy(rows, key) {
  const seen = new Set();
  const out = [];
  rows.forEach((r) => {
    if (!seen.has(r[key])) {
      seen.add(r[key]);
      out.push(r);
    }
  });
  return out;
}

function answerBiomarkers(entity, ageGroup) {
  let rows = DATA;
  if (entity) rows = rows.filter((r) => r.entity === entity);
  if (ageGroup) {
    const filtered = rows.filter((r) => normalize(r.age_group).includes(normalize(ageGroup)));
    if (filtered.length) rows = filtered;
  }
  if (!rows.length) return ["Não encontrei registros suficientes para esse perfil."];

  rows = uniqueBy(rows, "biomarker");
  return [
    "Principais biomarcadores encontrados:",
    ...rows.map((r) => `• ${r.biomarker} — ${r.role}; associação: ${r.direction}.`),
  ];
}

const PROGNOSIS_RANKING = [
  ["Oligodendroglioma IDH-mutante 1p/19q-codeletado", "Muito favorável relativamente aos principais gliomas difusos adultos"],
  ["Astrocitoma IDH-mutante", "Geralmente mais favorável que glioblastoma IDH-wildtype"],
  ["Pilocytic astrocytoma", "Geralmente favorável, dependendo sobretudo de localização e ressecção"],
  ["Glioblastoma IDH-wildtype", "Prognóstico desfavorável; MGMT methylation identifica subgrupo relativamente mais favorável"],
  ["Diffuse hemispheric glioma H3 G34-mutant", "Agressivo, principalmente em crianças/adultos jovens"],
  ["Diffuse midline glioma H3 K27-altered", "Muito desfavorável"],
];

function answerPrognosis(entity) {
  if (entity) {
    let rows = DATA.filter((r) => r.entity === entity);
    if (!rows.length) return ["Não há dados suficientes para essa entidade."];
    rows = uniqueBy(rows, "biomarker");
    return [
      `Prognóstico associado a: ${entity}`,
      ...rows.map((r) => `• ${r.biomarker}: ${r.direction}; ${r.outcome}.`),
      "A interpretação deve incluir idade, grau, localização, extensão de ressecção e tratamento.",
    ];
  }

  return [
    "Ranking qualitativo do conjunto de dados (não é uma meta-análise):",
    ...PROGNOSIS_RANKING.map(([name, note], i) => `${i + 1}. ${name} — ${note}.`),
    "O ranking é apenas comparativo entre entidades e não representa prognóstico individual.",
  ];
}

function answerTreatment(entity) {
  let rows = entity ? DATA.filter((r) => r.entity === entity) : DATA;
  if (!rows.length) return ["Não encontrei evidências estruturadas suficientes."];

  const seen = new Set();
  const filtered = [];
  rows.forEach((r) => {
    const key = r.entity + "||" + r.biomarker;
    if (!seen.has(key)) {
      seen.add(key);
      filtered.push(r);
    }
  });

  return [
    "Contextos terapêuticos encontrados:",
    ...filtered.map((r) => `• ${r.entity} / ${r.biomarker}: ${r.treatment_context}.`),
    "O sistema não deve declarar um tratamento como 'melhor' para um paciente individual sem dados clínicos completos.",
  ];
}

function ask(question) {
  const intent = detectIntent(question);
  const entity = detectEntity(question);
  const ageGroup = detectAgeGroup(question);

  if (normalize(question).includes("melhor prognostico")) {
    return answerPrognosis(entity, ageGroup);
  }
  if (intent === "biomarkers") return answerBiomarkers(entity, ageGroup);
  if (intent === "prognosis") return answerPrognosis(entity, ageGroup);
  if (intent === "treatment") return answerTreatment(entity);

  const results = searchIndex.query(question, 5).filter((r) => r.score > 0);
  if (!results.length) {
    return ["Não encontrei evidências relacionadas a essa pergunta na base atual."];
  }
  return [
    "Evidências mais relacionadas à pergunta:",
    ...results.map((r) => `• ${r.row.entity} — ${r.row.biomarker}: ${r.row.outcome} (similaridade ${r.score.toFixed(2)}).`),
  ];
}

// ---------------------------------------------------------------
// Gerador de relatório "ANÁLISE" (porta da CÉLULA 2B / render_analysis)
// ---------------------------------------------------------------
const LEVEL_LABELS = { 1: "Muito baixa", 2: "Baixa", 3: "Moderada", 4: "Alta", 5: "Muito alta" };

function average(nums) {
  const valid = nums.filter((n) => typeof n === "number" && !Number.isNaN(n));
  if (!valid.length) return null;
  return Math.round(valid.reduce((a, b) => a + b, 0) / valid.length);
}

function formatBR(num, digits = 2) {
  return Number(num).toFixed(digits).replace(".", ",");
}

function renderAnalysis(entity) {
  const studyRows = STUDIES.filter((s) => s.entity === entity);
  const bioRows = DATA.filter((r) => r.entity === entity);

  if (!studyRows.length && !bioRows.length) {
    return { empty: true, message: `Não há dados suficientes na base para "${entity}".` };
  }

  const osLevel = average(studyRows.map((s) => s.os_level));
  const evLevel = average(studyRows.map((s) => s.evidence_level));

  const nStudies = studyRows.length;
  // soma apenas os estudos com n_patients numérico verificado; os demais (string
  // descritiva ou null) entram na contagem de "não verificados", não em nPatients
  const numericN = studyRows.filter((s) => typeof s.n_patients === "number");
  const nPatients = numericN.reduce((acc, s) => acc + s.n_patients, 0);
  const nStudiesWithData = numericN.length;

  const hrRow = studyRows.find((s) => typeof s.hr === "number");
  const pendingCount = studyRows.filter((s) => s.data_status && s.data_status.startsWith("pendente")).length;
  const notApplicableCount = studyRows.filter((s) => s.data_status && s.data_status.startsWith("não aplicável")).length;

  const idhRow = bioRows.find((r) => normalize(r.biomarker).includes("idh"));
  const codelRow = bioRows.find((r) => /1p\/19q|codeletion|codelec/i.test(normalize(r.biomarker)));

  const outcomes = uniqueBy(bioRows, "biomarker").map((r) => r.outcome);

  return {
    empty: false,
    entity,
    idh: idhRow ? idhRow.state : "não aplicável / não informado",
    codel: codelRow ? codelRow.state : "não aplicável / não informado",
    osLevel,
    osLabel: osLevel ? LEVEL_LABELS[osLevel] : "Não avaliável nesta base",
    evLevel,
    evLabel: evLevel ? LEVEL_LABELS[evLevel] : "Não avaliável nesta base",
    nStudies,
    nStudiesWithData,
    nPatients,
    pendingCount,
    notApplicableCount,
    hr: hrRow ? formatBR(hrRow.hr) : null,
    ci: hrRow ? `${formatBR(hrRow.ci_low)}–${formatBR(hrRow.ci_high)}` : null,
    studies: studyRows.map((s) => s.study),
    conclusion: outcomes.slice(0, 2).join(" ") + (outcomes.length > 2 ? "…" : ""),
  };
}

function allEntities() {
  return [...new Set(DATA.map((r) => r.entity))].sort((a, b) => a.localeCompare(b, "pt-BR"));
}
