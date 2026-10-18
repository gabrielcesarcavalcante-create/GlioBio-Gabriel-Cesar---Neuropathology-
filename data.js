// Dados: base de biomarcadores e estudos de glioma.
// STUDIES atualizado: 'data_status' indica se hr/ci/os_level foram verificados,
// estão pendentes de verificação prioritária, ou não se aplicam (tipo de publicação).
// Ver README para a lista de PMIDs pendentes e o método de verificação usado.

const DATA = [
 {
  "entity": "Astrocitoma, IDH-mutante",
  "synonyms": "astrocytoma IDH-mutant astrocitoma difuso IDH",
  "age_group": "adultos",
  "biomarker": "IDH1/IDH2; TP53; ATRX; CDKN2A/B",
  "state": "IDH mutado; TP53 alterado; perda de ATRX; CDKN2A/B homozigoticamente deletado quando presente",
  "role": "classificação, prognóstico e estratificação de grau",
  "direction": "IDH mutado geralmente favorável; CDKN2A/B bialélico desfavorável",
  "outcome": "A combinação IDH-mutante/TP53-alterado/ATRX-perdido define o espectro astrocitário; deleção homozigótica CDKN2A/B é marcador de pior prognóstico e pode elevar o grau integrado.",
  "treatment_context": "Interpretar com grau WHO, idade, extensão de ressecção e tratamento; no grau 3, TMZ adjuvante demonstrou benefício no CATNON.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "astrocytoma IDH mutant TP53 ATRX CDKN2A meta-analysis",
  "pmid": "26061753; 34797757",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=astrocytoma+IDH+mutant+TP53+ATRX+CDKN2A+meta-analysis",
  "pubmed_records": [
   {
    "pmid": "37743331",
    "title": "[Astrocytoma, IDH-Mutant].",
    "year": "2023",
    "pubtype": [
     "Journal Article",
     "Review",
     "English Abstract"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37743331/"
   },
   {
    "pmid": "40939590",
    "title": "Protein-based classification reveals an immune-hot subtype in IDH mutant astrocytoma with worse prognosis.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40939590/"
   },
   {
    "pmid": "40830455",
    "title": "Evolutionary trajectories of IDH-mutant astrocytoma identify molecular grading markers related to cell cycling.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40830455/"
   },
   {
    "pmid": "38653236",
    "title": "Integrative spatial analysis reveals a multi-layered organization of glioblastoma.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't",
     "Research Support, N.I.H., Extramural"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38653236/"
   },
   {
    "pmid": "33216206",
    "title": "Primary mismatch repair deficient IDH-mutant astrocytoma (PMMRDIA) is a distinct type with a poor prognosis.",
    "year": "2021",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/33216206/"
   },
   {
    "pmid": "29687258",
    "title": "Novel, improved grading system(s) for IDH-mutant astrocytic gliomas.",
    "year": "2018",
    "pubtype": [
     "Journal Article",
     "Multicenter Study",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/29687258/"
   },
   {
    "pmid": "38981438",
    "title": "Multi-scale signaling and tumor evolution in high-grade gliomas.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Research Support, N.I.H., Extramural",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38981438/"
   },
   {
    "pmid": "41821581",
    "title": "Vebreltinib for Previously Treated Astrocytoma, IDH-Mutant, Grade 4, and Glioblastoma, IDH Wild-Type with PTPRZ1-MET Fusion Gene: A Multicenter, Phase III Randomized, Open-Label Trial.",
    "year": "2026",
    "pubtype": [
     "Journal Article",
     "Multicenter Study",
     "Randomized Controlled Trial",
     "Clinical Trial, Phase III"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41821581/"
   },
   {
    "pmid": "35644621",
    "title": "Grading of IDH-mutant astrocytoma using diffusion, susceptibility and perfusion-weighted imaging.",
    "year": "2022",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35644621/"
   },
   {
    "pmid": "33692446",
    "title": "Molecular landscape of IDH-mutant primary astrocytoma Grade IV/glioblastomas.",
    "year": "2021",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/33692446/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
  "synonyms": "oligodendroglioma IDH 1p 19q codeleted",
  "age_group": "adultos",
  "biomarker": "IDH1/IDH2; codeleção 1p/19q; TERT promoter; CIC; FUBP1",
  "state": "IDH mutado e codeleção 1p/19q obrigatórios; TERT frequentemente mutado",
  "role": "diagnóstico, prognóstico e predição terapêutica",
  "direction": "geralmente favorável; codeleção prediz benefício duradouro de RT+PCV",
  "outcome": "A codeleção 1p/19q é requisito molecular da entidade e associa-se a sobrevida prolongada; ensaios RTOG 9402 e EORTC 26951 sustentam RT+PCV.",
  "treatment_context": "Decisão depende do risco clínico; RT+PCV possui evidência de benefício de longo prazo, e TMZ é alternativa usada em alguns cenários.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "oligodendroglioma 1p 19q codeletion RTOG 9402 EORTC 26951",
  "pmid": "23047005; 24096639",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=oligodendroglioma+1p+19q+codeletion+RTOG+9402+EORTC+26951",
  "pubmed_records": [
   {
    "pmid": "38724526",
    "title": "Glioma.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38724526/"
   },
   {
    "pmid": "38564040",
    "title": "Oligodendroglioma, IDH-mutant and 1p/19q-codeleted-prognostic factors, standard of care and chemotherapy, and future perspectives with neoadjuvant strategy.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38564040/"
   },
   {
    "pmid": "32678879",
    "title": "CODEL: phase III study of RT, RT + TMZ, or TMZ for newly diagnosed 1p/19q codeleted oligodendroglioma. Analysis from the initial study design.",
    "year": "2021",
    "pubtype": [
     "Clinical Trial, Phase III",
     "Journal Article",
     "Randomized Controlled Trial",
     "Research Support, N.I.H., Extramural"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/32678879/"
   },
   {
    "pmid": "39356975",
    "title": "Survival Outcomes Associated With First-Line Procarbazine, CCNU, and Vincristine or Temozolomide in Combination With Radiotherapy in IDH-Mutant 1p/19q-Codeleted Grade 3 Oligodendroglioma.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39356975/"
   },
   {
    "pmid": "37812786",
    "title": "Brainstem oligodendroglioma, IDH-mutant, and 1P/19Q-codeleted: A potential diagnostic pitfall.",
    "year": "2023",
    "pubtype": [
     "Letter"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37812786/"
   },
   {
    "pmid": "35562130",
    "title": "A review of adult-type diffuse gliomas in the WHO CNS5 classification with special reference to Astrocytoma, IDH-mutant and Oligodendroglioma, IDH-mutant and 1p/19q codeleted.",
    "year": "2022",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35562130/"
   },
   {
    "pmid": "40448901",
    "title": "Unlocking new horizons: advances in treating IDH-mutant, 1p/19q-codeleted oligodendrogliomas.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40448901/"
   },
   {
    "pmid": "41299137",
    "title": "Loss of global DNA hypermethylation is prognostic in IDH-mutant and 1p/19q-codeleted oligodendrogliomas.",
    "year": "2025",
    "pubtype": [
     "Letter"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41299137/"
   },
   {
    "pmid": "37743332",
    "title": "[Oligodendroglioma, IDH Mutation and 1p/19q Codeletion].",
    "year": "2023",
    "pubtype": [
     "English Abstract",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37743332/"
   },
   {
    "pmid": "36006639",
    "title": "World Health Organization 2021 Classification of Central Nervous System Tumors and Implications for Therapy for Adult-Type Gliomas: A Review.",
    "year": "2022",
    "pubtype": [
     "Review",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/36006639/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Glioblastoma, IDH-wildtype",
  "synonyms": "glioblastoma GBM IDH wildtype",
  "age_group": "adultos e idosos",
  "biomarker": "MGMT promoter; EGFR amplification/EGFRvIII; TERT promoter; +7/−10; chr 10 loss",
  "state": "MGMT metilado ou não; EGFR/TERT/+7−10 frequentemente alterados",
  "role": "classificação, prognóstico e predição de alquilante",
  "direction": "MGMT metilado favorável/preditivo; EGFR amplification e +7/−10 apoiam biologia agressiva",
  "outcome": "Em adultos, alterações moleculares podem definir GBM mesmo sem necrose/microvascularidade; MGMT metilado associa-se a maior benefício relativo da temozolomida.",
  "treatment_context": "RT+TMZ é padrão em pacientes elegíveis; em idosos, idade, estado funcional e MGMT orientam regimes hipofracionados.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "glioblastoma MGMT methylation temozolomide meta-analysis EGFR TERT",
  "pmid": "15758010; 28296618",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=glioblastoma+MGMT+methylation+temozolomide+meta-analysis+EGFR+TERT",
  "pubmed_records": [
   {
    "pmid": "15758010",
    "title": "MGMT gene silencing and benefit from temozolomide in glioblastoma.",
    "year": "2005",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/15758010/"
   },
   {
    "pmid": "39531875",
    "title": "Deciphering glioblastoma: Unveiling imaging markers for predicting MGMT promoter methylation status.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39531875/"
   },
   {
    "pmid": "34467991",
    "title": "MGMT promoter methylation testing to predict overall survival in people with glioblastoma treated with temozolomide: a comprehensive meta-analysis based on a Cochrane Systematic Review.",
    "year": "2021",
    "pubtype": [
     "Journal Article",
     "Meta-Analysis",
     "Research Support, Non-U.S. Gov't",
     "Systematic Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/34467991/"
   },
   {
    "pmid": "30189035",
    "title": "MGMT promoter methylation status testing to guide therapy for glioblastoma: refining the approach based on emerging evidence and current challenges.",
    "year": "2019",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/30189035/"
   },
   {
    "pmid": "35806153",
    "title": "MGMT and Whole-Genome DNA Methylation Impacts on Diagnosis, Prognosis and Therapy of Glioblastoma Multiforme.",
    "year": "2022",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35806153/"
   },
   {
    "pmid": "30317322",
    "title": "The significance of MGMT methylation in Glioblastoma Multiforme prognosis.",
    "year": "2018",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/30317322/"
   },
   {
    "pmid": "23608672",
    "title": "MGMT promoter methylation and glioblastoma prognosis: a systematic review and meta-analysis.",
    "year": "2013",
    "pubtype": [
     "Journal Article",
     "Meta-Analysis",
     "Systematic Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/23608672/"
   },
   {
    "pmid": "28266716",
    "title": "The prognostic value of MGMT promoter methylation in glioblastoma: A meta-analysis of clinical trials.",
    "year": "2018",
    "pubtype": [
     "Journal Article",
     "Meta-Analysis",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/28266716/"
   },
   {
    "pmid": "38520591",
    "title": "Predominance of MGMT promoter methylation among Pakistani glioblastoma patients.",
    "year": "2024",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38520591/"
   },
   {
    "pmid": "25586425",
    "title": "Assessing MGMT methylation status and its current impact on treatment in glioblastoma.",
    "year": "2015",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/25586425/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Glioma difuso de linha média, H3 K27-alterado",
  "synonyms": "diffuse midline glioma H3 K27-altered H3K27M DIPG",
  "age_group": "crianças e adultos",
  "biomarker": "H3-3A/HIST1H3B/C K27M; EZHIP; perda H3K27me3",
  "state": "alteração H3 K27 ou perda epigenética de H3K27me3",
  "role": "diagnóstico e prognóstico",
  "direction": "muito desfavorável",
  "outcome": "É uma entidade molecular de alto grau, frequentemente com localização pontina, talâmica ou medular; a sobrevida costuma ser curta e a disseminação pode ocorrer.",
  "treatment_context": "Radioterapia permanece componente central; quimioterapia e terapias epigenéticas/dirigidas são investigacionais.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "diffuse midline glioma H3 K27 altered systematic review survival",
  "pmid": "28384726; 30209378",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=diffuse+midline+glioma+H3+K27+altered+systematic+review+survival",
  "pubmed_records": [
   {
    "pmid": "35567713",
    "title": "Adult diffuse midline gliomas H3 K27-altered: review of a redefined entity.",
    "year": "2022",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35567713/"
   },
   {
    "pmid": "37589388",
    "title": "A review of current therapeutics targeting the mitochondrial protease ClpP in diffuse midline glioma, H3 K27-altered.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Review",
     "Research Support, Non-U.S. Gov't",
     "Research Support, N.I.H., Extramural"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37589388/"
   },
   {
    "pmid": "38102230",
    "title": "H3 K27M-altered glioma and diffuse intrinsic pontine glioma: Semi-systematic review of treatment landscape and future directions.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38102230/"
   },
   {
    "pmid": "38792513",
    "title": "H3(K27)-Altered Diffuse Glioma of the Spinal Cord in Adult Patients: A Qualitative Systematic Review and Peculiarity of Radiological Findings.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38792513/"
   },
   {
    "pmid": "37897190",
    "title": "Bench-to-bedside investigations of H3 K27-altered diffuse midline glioma: drug targets and potential pharmacotherapies.",
    "year": "2023",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37897190/"
   },
   {
    "pmid": "36867241",
    "title": "H3 K27-altered diffuse midline glioma presenting as massive cerebellopontine hemorrhage.",
    "year": "2023",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/36867241/"
   },
   {
    "pmid": "38066305",
    "title": "A new subtype of diffuse midline glioma, H3 K27 and BRAF/FGFR1 co-altered: a clinico-radiological and histomolecular characterisation.",
    "year": "2023",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38066305/"
   },
   {
    "pmid": "36534421",
    "title": "Paediatric-type diffuse high-grade gliomas in the 5th CNS WHO Classification.",
    "year": "2022",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/36534421/"
   },
   {
    "pmid": "37444588",
    "title": "Molecular Characterization and Treatment Approaches for Pediatric H3 K27-Altered Diffuse Midline Glioma: Integrated Systematic Review of Individual Clinical Trial Participant Data.",
    "year": "2023",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37444588/"
   },
   {
    "pmid": "40354758",
    "title": "Adult H3 K27-altered, H3.3 K27-mutant diffuse midline glioma affecting the conus medullaris: illustrative case.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40354758/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Glioma hemisférico difuso, H3 G34-mutante",
  "synonyms": "diffuse hemispheric glioma H3 G34-mutant H3G34R V",
  "age_group": "crianças, adolescentes e adultos jovens",
  "biomarker": "H3-3A G34R/G34V; ATRX; TP53; PDGFRA",
  "state": "H3 G34R/V, frequentemente com perda ATRX e mutação TP53",
  "role": "diagnóstico e estratificação de risco",
  "direction": "agressivo",
  "outcome": "Tumor hemisférico de alto grau em pacientes jovens, com sobrevida inferior à de gliomas IDH-mutantes; prognóstico varia com idade, ressecção e perfil molecular.",
  "treatment_context": "Não há regime padronizado específico; manejo costuma combinar ressecção máxima segura, radioterapia e quimioterapia conforme idade.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "diffuse hemispheric glioma H3 G34 mutant systematic review",
  "pmid": "29691832; 37625672",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=diffuse+hemispheric+glioma+H3+G34+mutant+systematic+review",
  "pubmed_records": [
   {
    "pmid": "40402198",
    "title": "Diffuse hemispheric glioma, H3 G34-mutant: defining the clinical picture through a single institution case series and literature analysis.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40402198/"
   },
   {
    "pmid": "34632671",
    "title": "Neuroimaging features of diffuse hemispheric glioma, H3 G34-mutant: A case series and systematic review.",
    "year": "2022",
    "pubtype": [
     "Journal Article",
     "Systematic Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/34632671/"
   },
   {
    "pmid": "38613587",
    "title": "Epigenetics to clinicopathological features: a bibliometric analysis of H3 G34-mutant diffuse hemispheric glioma literature.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38613587/"
   },
   {
    "pmid": "40813437",
    "title": "A review of diffuse hemispheric glioma, H3 G34-mutant disease development, DNA repair, microenvironment, and treatments on the horizon.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40813437/"
   },
   {
    "pmid": "39759262",
    "title": "A scoping review of diffuse hemispheric glioma, H3 G34-mutant: Epigenetic and molecular profiles, clinicopathology, and treatment avenues.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Scoping Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39759262/"
   },
   {
    "pmid": "34056608",
    "title": "Characteristics of diffuse hemispheric gliomas, H3 G34-mutant in adults.",
    "year": "2021",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/34056608/"
   },
   {
    "pmid": "40638885",
    "title": "Anatomic Staging of H3 G34-Mutant Diffuse Hemispheric Glioma.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40638885/"
   },
   {
    "pmid": "40696267",
    "title": "Diffuse Hemispheric Glioma, H3 G34-Mutant With Prominent Perivascular Invasion in a Middle-Aged Man: A Case Report and Literature Review of Middle-Aged and Elderly Cases.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Case Reports",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40696267/"
   },
   {
    "pmid": "37056711",
    "title": "Pediatric diffuse hemispheric glioma H3 G34-mutant with gains of the BRAF locus: An illustrative case.",
    "year": "2023",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37056711/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 9
 },
 {
  "entity": "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
  "synonyms": "pediatric-type diffuse low-grade glioma MAPK altered",
  "age_group": "crianças e adolescentes",
  "biomarker": "BRAF V600E; FGFR1; NTRK; MYB/MYBL1; MAPK pathway",
  "state": "alteração ativadora da via MAPK",
  "role": "classificação e alvo terapêutico",
  "direction": "variável; alvo acionável quando identificado",
  "outcome": "A alteração molecular separa subgrupos biologicamente distintos e pode orientar terapia dirigida em doença recorrente ou não ressecável.",
  "treatment_context": "Cirurgia é central; inibidores BRAF/MEK ou outros agentes dirigidos dependem da alteração e de aprovação/protocolo.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "pediatric low grade glioma BRAF V600E MAPK molecular clinical study",
  "pmid": "27348214; 32205001",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=pediatric+low+grade+glioma+BRAF+V600E+MAPK+molecular+clinical+study",
  "pubmed_records": [
   {
    "pmid": "41198334",
    "title": "Pediatric-Type Diffuse Low Grade Glioma.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41198334/"
   },
   {
    "pmid": "38926169",
    "title": "Pediatric-type diffuse low-grade gliomas.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38926169/"
   },
   {
    "pmid": "35218102",
    "title": "The 2021 WHO Classification of Tumors of the Central Nervous System: An update on pediatric low-grade gliomas and glioneuronal tumors.",
    "year": "2022",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35218102/"
   },
   {
    "pmid": "38466086",
    "title": "Comprehensive analysis of MYB/MYBL1-altered pediatric-type diffuse low-grade glioma.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Research Support, N.I.H., Extramural",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38466086/"
   },
   {
    "pmid": "37920791",
    "title": "Review on neuroimaging in pediatric-type diffuse low-grade gliomas.",
    "year": "2023",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37920791/"
   },
   {
    "pmid": "40861626",
    "title": "Pediatric-Type Diffuse Low-Grade Gliomas: A Subgroup Defined by Peculiar Molecular Features and Distinct Prognostic Outcomes.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40861626/"
   },
   {
    "pmid": "35562133",
    "title": "Pediatric-type diffuse low grade gliomas: Histomolecular profile and practical approach to their integrated diagnosis according to the WHO CNS5 classification.",
    "year": "2022",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35562133/"
   },
   {
    "pmid": "39440342",
    "title": "Recent updates in pediatric diffuse glioma classification: insights and conclusions from the WHO 5(th) edition.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39440342/"
   },
   {
    "pmid": "40668344",
    "title": "Illuminating radiogenomic signatures in pediatric-type diffuse gliomas: insights into molecular, clinical, and imaging correlations. Part II: low-grade group.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40668344/"
   },
   {
    "pmid": "41591436",
    "title": "Pediatric low-grade epilepsy-associated tumors (LEATS): neuroimaging review and genetics update.",
    "year": "2026",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41591436/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
  "synonyms": "pediatric-type diffuse high-grade glioma H3 wildtype IDH wildtype",
  "age_group": "crianças e adolescentes",
  "biomarker": "PDGFRA amplification/mutation; EGFR; MYCN; CDKN2A/B; methylation class",
  "state": "heterogêneo; alterações de RTK/MAPK, MYCN ou supressores tumorais",
  "role": "classificação molecular e prognóstico",
  "direction": "desfavorável, dependente da classe de metilação",
  "outcome": "Não é equivalente ao GBM adulto; a classe epigenética e alterações driver são essenciais para prognóstico e inclusão em ensaios.",
  "treatment_context": "Tratamento multimodal e protocolos pediátricos; terapias alvo são investigacionais ou dependentes de alteração acionável.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "pediatric high-grade glioma H3 wildtype IDH wildtype molecular classification",
  "pmid": "29535246; 33741927",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=pediatric+high-grade+glioma+H3+wildtype+IDH+wildtype+molecular+classification",
  "pubmed_records": [
   {
    "pmid": "40887057",
    "title": "cIMPACT-NOW update 11: Proposal on adaptation of diagnostic criteria for IDH- and H3-wildtype diffuse high-grade gliomas and for posterior fossa ependymal tumors.",
    "year": "2026",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40887057/"
   },
   {
    "pmid": "37743339",
    "title": "[Pediatric-Type Diffuse High-Grade Gliomas].",
    "year": "2023",
    "pubtype": [
     "English Abstract",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37743339/"
   },
   {
    "pmid": "39558399",
    "title": "Diffuse pediatric high-grade glioma of methylation-based RTK2A and RTK2B subclasses present distinct radiological and histomolecular features including Gliomatosis cerebri phenotype.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39558399/"
   },
   {
    "pmid": "38605367",
    "title": "Pediatric-type high-grade gliomas with PDGFRA amplification in adult patients with Li-Fraumeni syndrome: clinical and molecular characterization of three cases.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38605367/"
   },
   {
    "pmid": "42295620",
    "title": "Diffuse pediatric-type high-grade glioma, H3-wildtype and IDH-wildtype, of the adult cerebellum: a report of 2 cases.",
    "year": "2026",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/42295620/"
   },
   {
    "pmid": "37875973",
    "title": "Refinement of diagnostic criteria for pediatric-type diffuse high-grade glioma, IDH- and H3-wildtype, MYCN-subtype including histopathology, TP53, MYCN and ID2 status.",
    "year": "2023",
    "pubtype": [
     "Letter"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37875973/"
   },
   {
    "pmid": "41036308",
    "title": "Single-Cell Profiling of Pediatric High-Grade Gliomas Reveals OPC-Like Subpopulations Driving Tumorigenic Lineage Transitions.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41036308/"
   },
   {
    "pmid": "39273062",
    "title": "Emerging and Biological Concepts in Pediatric High-Grade Gliomas.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Review",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39273062/"
   },
   {
    "pmid": "40853542",
    "title": "Illuminating radiogenomic signatures in pediatric-type diffuse gliomas: insights into molecular, clinical, and imaging correlations. Part I: high-grade group.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40853542/"
   },
   {
    "pmid": "41798129",
    "title": "Pediatric high-grade gliomas, H3-wildtype, IDH-wildtype: Refining diagnostic criteria and exploring clinical associations.",
    "year": "2026",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41798129/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Glioma hemisférico infantil, tipo infantil",
  "synonyms": "infant-type hemispheric glioma IHG ALK NTRK ROS1 MET",
  "age_group": "lactentes e crianças pequenas",
  "biomarker": "ALK; NTRK1/2/3; ROS1; MET fusions",
  "state": "fusão/rearranjo de receptor tirosina-quinase",
  "role": "diagnóstico e alvo terapêutico",
  "direction": "pode ser acionável; prognóstico heterogêneo",
  "outcome": "Entidade definida por fusões de RTK e curso clínico variável; respostas a inibidores dirigidos foram descritas em tumores com fusão correspondente.",
  "treatment_context": "Testar fusões por RNA-seq ou método validado quando possível; terapia dirigida deve considerar idade e acesso regulatório.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "infant-type hemispheric glioma ALK NTRK ROS1 MET fusion",
  "pmid": "32612231",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=infant-type+hemispheric+glioma+ALK+NTRK+ROS1+MET+fusion",
  "pubmed_records": [
   {
    "pmid": "38394779",
    "title": "An Infant-Type Hemispheric Glioma With SOX5::ALK: A Novel Fusion.",
    "year": "2024",
    "pubtype": [
     "Case Reports",
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38394779/"
   },
   {
    "pmid": "35404193",
    "title": "Infant-Type Hemispheric Glioma in a Chinese Girl: A Newly Defined Entity.",
    "year": "2023",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35404193/"
   },
   {
    "pmid": "41213248",
    "title": "Infant-Type Hemispheric Gliomas: A Review of Clinical, Radiologic, Histopathologic, and Molecular Features.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41213248/"
   },
   {
    "pmid": "41206756",
    "title": "A systematic study of molecular diagnosis, treatment, and prognosis in infant-type hemispheric glioma: An individual patient data meta-analysis of 164 patients.",
    "year": "2026",
    "pubtype": [
     "Journal Article",
     "Meta-Analysis"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41206756/"
   },
   {
    "pmid": "41122676",
    "title": "Challenges in diagnostics and treatment of infant-type hemispheric gliomas.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41122676/"
   },
   {
    "pmid": "42701716",
    "title": "Infant-Type Hemispheric Glioma With NTRK Fusion Responds to Larotrectinib.",
    "year": "2026",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/42701716/"
   },
   {
    "pmid": "37000961",
    "title": "Lorlatinib for ALK-fused, infant-type hemispheric glioma with lung metastasis: a case report.",
    "year": "2023",
    "pubtype": [
     "Case Reports",
     "Research Support, Non-U.S. Gov't",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37000961/"
   },
   {
    "pmid": "36910660",
    "title": "Case report: ATIC-ALK fusion in infant-type hemispheric glioma and response to lorlatinib.",
    "year": "2023",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/36910660/"
   },
   {
    "pmid": "36973207",
    "title": "[Infant-type hemispheric glioma with EEF1G-ROS1 fusion: report of a case].",
    "year": "2023",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/36973207/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 9
 },
 {
  "entity": "Astrocitoma pilocítico",
  "synonyms": "pilocytic astrocytoma PA KIAA1549 BRAF",
  "age_group": "crianças e adultos jovens",
  "biomarker": "KIAA1549::BRAF; BRAF V600E; NF1; MAPK",
  "state": "ativação da via MAPK, frequentemente fusão KIAA1549::BRAF",
  "role": "diagnóstico, prognóstico e alvo terapêutico",
  "direction": "geralmente favorável, condicionado à localização e ressecção",
  "outcome": "A maioria apresenta evolução prolongada após ressecção; tumores em vias ópticas, hipotálamo ou tronco podem ser crônicos e exigir tratamento sistêmico.",
  "treatment_context": "Ressecção quando segura; inibidores MEK/BRAF em doença progressiva selecionada.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "pilocytic astrocytoma KIAA1549 BRAF fusion outcome study",
  "pmid": "20651406; 22457737",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=pilocytic+astrocytoma+KIAA1549+BRAF+fusion+outcome+study",
  "pubmed_records": [
   {
    "pmid": "38733671",
    "title": "Evaluation of KIAA1549::BRAF fusions and clinicopathological insights of pilocytic astrocytomas.",
    "year": "2024",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38733671/"
   },
   {
    "pmid": "36786200",
    "title": "Pilocytic astrocytoma harboring a novel GNAI3-BRAF fusion.",
    "year": "2023",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/36786200/"
   },
   {
    "pmid": "36520196",
    "title": "Rare adult pilocytic astrocytoma of the septum pellucidum with novel RIN2::BRAF fusion.",
    "year": "2023",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/36520196/"
   },
   {
    "pmid": "33641074",
    "title": "Concomitant KIAA1549-BRAF fusion and IDH mutation in Pediatric spinal cord astrocytoma: a case report and literature review.",
    "year": "2021",
    "pubtype": [
     "Case Reports",
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/33641074/"
   },
   {
    "pmid": "26948364",
    "title": "Pilocytic astrocytomas.",
    "year": "2016",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/26948364/"
   },
   {
    "pmid": "32164789",
    "title": "Pediatric low-grade glioma in the era of molecular diagnostics.",
    "year": "2020",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/32164789/"
   },
   {
    "pmid": "38371226",
    "title": "The potential of liquid biopsy for detection of the KIAA1549-BRAF fusion in circulating tumor DNA from children with pilocytic astrocytoma.",
    "year": "2024",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38371226/"
   },
   {
    "pmid": "31329636",
    "title": "Detection of the KIAA1549-BRAF fusion gene in cells forming microvascular proliferations in pilocytic astrocytoma.",
    "year": "2019",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/31329636/"
   },
   {
    "pmid": "33626378",
    "title": "SNP-based detection of allelic imbalance: A novel approach for identifying KIAA1549-BRAF fusion in pilocytic astrocytoma using DNA sequencing.",
    "year": "2021",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/33626378/"
   },
   {
    "pmid": "26083571",
    "title": "KIAA1549: BRAF Gene Fusion and FGFR1 Hotspot Mutations Are Prognostic Factors in Pilocytic Astrocytomas.",
    "year": "2015",
    "pubtype": [
     "Journal Article",
     "Research Support, N.I.H., Extramural",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/26083571/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Astrocitoma de alto grau com características piloides",
  "synonyms": "high-grade astrocytoma with piloid features HGAP",
  "age_group": "adultos",
  "biomarker": "MAPK alteration; CDKN2A/B deletion; ATRX loss; methylation class",
  "state": "classe de metilação HGAP com alterações MAPK e perda frequente de ATRX/CDKN2A/B",
  "role": "diagnóstico integrado e prognóstico",
  "direction": "intermediário a desfavorável; heterogêneo",
  "outcome": "A classe de metilação identifica tumores antes agrupados de modo inconsistente; alteração CDKN2A/B e características clínicas podem modificar risco.",
  "treatment_context": "Manejo semelhante ao de glioma de alto grau conforme idade, ressecção e contexto; evidência terapêutica específica é limitada.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "high-grade astrocytoma with piloid features methylation CDKN2A MAPK",
  "pmid": "33741926",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=high-grade+astrocytoma+with+piloid+features+methylation+CDKN2A+MAPK",
  "pubmed_records": [
   {
    "pmid": "40270074",
    "title": "High-grade astrocytoma with piloid features: a single-institution case series and literature review.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40270074/"
   },
   {
    "pmid": "40183620",
    "title": "High-grade astrocytoma with piloid features: case report and systematic review.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Systematic Review",
     "Case Reports",
     "English Abstract"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40183620/"
   },
   {
    "pmid": "39848278",
    "title": "High-Grade Astrocytoma With Piloid Features: Case Series and Review of a Recently Described Brain Tumor Entity.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Review",
     "Case Reports"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39848278/"
   },
   {
    "pmid": "40921096",
    "title": "High-grade astrocytoma with piloid features resected with an exoscopic supracerebellar infratentorial approach: illustrative case.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40921096/"
   },
   {
    "pmid": "41549586",
    "title": "Pediatric High-Grade Astrocytoma With Piloid Features: A Comprehensive Literature Review.",
    "year": "2026",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41549586/"
   },
   {
    "pmid": "39380837",
    "title": "High-grade astrocytoma with piloid features: MRI findings associated with a novel entity.",
    "year": "2024",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39380837/"
   },
   {
    "pmid": "39467315",
    "title": "High-grade astrocytoma with piloid features in the conus medullaris: a rare presentation of a new World Health Organization diagnosis. Illustrative case.",
    "year": "2024",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39467315/"
   },
   {
    "pmid": "38485198",
    "title": "High-Grade Astrocytoma with Piloid Features: A Dual Institutional Review of Imaging Findings of a Novel Entity.",
    "year": "2024",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38485198/"
   },
   {
    "pmid": "29564591",
    "title": "Anaplastic astrocytoma with piloid features, a novel molecular class of IDH wildtype glioma with recurrent MAPK pathway, CDKN2A/B and ATRX alterations.",
    "year": "2018",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/29564591/"
   },
   {
    "pmid": "40041064",
    "title": "High-grade astrocytoma with piloid features: A case report and review of literature.",
    "year": "2025",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40041064/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Astrocitoma pleomórfico xanthoastrocytoma",
  "synonyms": "pleomorphic xanthoastrocytoma PXA BRAF V600E",
  "age_group": "adolescentes e adultos jovens",
  "biomarker": "BRAF V600E; CDKN2A/B deletion; CDKN2A loss; methylation class",
  "state": "BRAF V600E frequente; CDKN2A/B pode estar deletado",
  "role": "diagnóstico, prognóstico e alvo terapêutico",
  "direction": "grau 2 geralmente mais favorável; anaplasia/CDKN2A/B pioram risco",
  "outcome": "A classificação integrada diferencia PXA de entidades morfologicamente semelhantes; deleção CDKN2A/B e anaplasia associam-se a comportamento mais agressivo.",
  "treatment_context": "Cirurgia é principal; inibição BRAF/MEK pode ser considerada em doença BRAF V600E progressiva.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "pleomorphic xanthoastrocytoma BRAF V600E CDKN2A prognosis",
  "pmid": "24717857; 29466892",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=pleomorphic+xanthoastrocytoma+BRAF+V600E+CDKN2A+prognosis",
  "pubmed_records": [
   {
    "pmid": "32348888",
    "title": "Cerebellar Pleomorphic Xanthoastrocytoma with BRAF V600E Mutation.",
    "year": "2020",
    "pubtype": [
     "Case Reports",
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/32348888/"
   },
   {
    "pmid": "35618235",
    "title": "Impact of Grade on Survival in Pleomorphic Xanthoastrocytoma and Low Prevalence of BRAF V600E Mutation.",
    "year": "2022",
    "pubtype": [
     "Journal Article",
     "Review",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35618235/"
   },
   {
    "pmid": "38784952",
    "title": "BRAF V600E in a preclinical model of pleomorphic Xanthoastrocytoma: Analysis of the tumor microenvironment and immune cell infiltration dynamics in vivo.",
    "year": "2024",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38784952/"
   },
   {
    "pmid": "34838156",
    "title": "Dabrafenib plus trametinib in patients with BRAF(V600E)-mutant low-grade and high-grade glioma (ROAR): a multicentre, open-label, single-arm, phase 2, basket trial.",
    "year": "2022",
    "pubtype": [
     "Clinical Trial, Phase II",
     "Journal Article",
     "Multicenter Study",
     "Research Support, N.I.H., Extramural",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/34838156/"
   },
   {
    "pmid": "36977615",
    "title": "Pleomorphic xanthoastrocytoma in the brainstem with BRAF V600E mutation: A case report.",
    "year": "2023",
    "pubtype": [
     "Case Reports",
     "Letter"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/36977615/"
   },
   {
    "pmid": "37401109",
    "title": "MRI characteristics predict BRAF V600E status in gangliogliomas and pleomorphic xanthoastrocytomas and provide survival prognostication.",
    "year": "2024",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37401109/"
   },
   {
    "pmid": "39160463",
    "title": "Noninvasive prediction of BRAF V600E mutation status of pleomorphic xanthoastrocytomas with MRI morphologic features and diffusion-weighted imaging.",
    "year": "2024",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39160463/"
   },
   {
    "pmid": "36351333",
    "title": "BRAF/MEK Dual Inhibitors Therapy in Progressive and Anaplastic Pleomorphic Xanthoastrocytoma: Case Series and Literature Review.",
    "year": "2022",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/36351333/"
   },
   {
    "pmid": "39640311",
    "title": "Drug-resistant BRAF V600E-mutant recurrent pleomorphic xanthoastrocytoma, CNS WHO Grade 3 successfully resolved with incidental discontinuation of combined BRAF and MEK inhibitor therapy.",
    "year": "2024",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39640311/"
   },
   {
    "pmid": "26314551",
    "title": "The distribution of BRAF gene fusions in solid tumors and response to targeted therapy.",
    "year": "2016",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/26314551/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
  "synonyms": "PLNTY polymorphous low-grade neuroepithelial tumor young",
  "age_group": "crianças, adolescentes e adultos jovens",
  "biomarker": "FGFR2/FGFR3 fusion; BRAF V600E; CDKN2A/B",
  "state": "alteração MAPK, principalmente fusão FGFR ou BRAF V600E",
  "role": "diagnóstico e alvo terapêutico",
  "direction": "geralmente indolente; recorrência depende de ressecção",
  "outcome": "Tumor associado a epilepsia e frequentemente calcificado; a fusão/alteração MAPK é útil para classificação em conjunto com histologia e metilação.",
  "treatment_context": "Ressecção costuma controlar a doença; terapia dirigida é excepcional e baseada em progressão molecularmente definida.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "PLNTY FGFR2 FGFR3 BRAF molecular study",
  "pmid": "30054260; 31451536",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=PLNTY+FGFR2+FGFR3+BRAF+molecular+study",
  "pubmed_records": [
   {
    "pmid": "38974443",
    "title": "Polymorphous Low-Grade Neuroepithelial Tumor of the Young (PLNTY): Scoping Review of Case Reports and Case Series.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Scoping Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38974443/"
   },
   {
    "pmid": "37796295",
    "title": "Polymorphous low-grade neuroepithelial tumour of young (PLNTY): the new kid on the block.",
    "year": "2024",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37796295/"
   },
   {
    "pmid": "40837310",
    "title": "Polymorphous low-grade neuroepithelial tumor of the young.",
    "year": "2025",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40837310/"
   },
   {
    "pmid": "34363682",
    "title": "Polymorphous Low-Grade Neuroepithelial Tumor of the Young (PLNTY): Molecular Profiling Confirms Frequent MAPK Pathway Activation.",
    "year": "2021",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/34363682/"
   },
   {
    "pmid": "35785835",
    "title": "[Clinicopathological features of polymorphous low-grade neuroepithelial tumor of the young].",
    "year": "2022",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35785835/"
   },
   {
    "pmid": "36894761",
    "title": "Radiological and surgical aspects of polymorphous low-grade neuroepithelial tumor of the young (PLNTY).",
    "year": "2023",
    "pubtype": [
     "Meta-Analysis",
     "Case Reports",
     "Journal Article",
     "Systematic Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/36894761/"
   },
   {
    "pmid": "37811183",
    "title": "Polymorphous Low-Grade Neuroepithelial Tumor of the Young (PLNTY): A Newly Described Entity of Special Radiological Significance.",
    "year": "2023",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37811183/"
   },
   {
    "pmid": "41393974",
    "title": "Polymorphous low-grade neuroepithelial tumor of the young: case report and literature review.",
    "year": "2025",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41393974/"
   },
   {
    "pmid": "33152817",
    "title": "[Clinicopathological features of polymorphous low-grade neuroepithelial tumor of the young].",
    "year": "2020",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/33152817/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 9
 },
 {
  "entity": "Glioma angiocêntrico",
  "synonyms": "angiocentric glioma MYB QKI",
  "age_group": "crianças e adultos jovens",
  "biomarker": "MYB::QKI fusion; MYB alteration",
  "state": "fusão/rearranjo MYB::QKI",
  "role": "diagnóstico molecular",
  "direction": "favorável/indolente",
  "outcome": "É tipicamente um glioma de baixo grau associado a epilepsia farmacorresistente, com comportamento indolente.",
  "treatment_context": "Ressecção cirúrgica é o tratamento principal quando factível; biomarcador ajuda a distinguir de outros gliomas epileptogênicos.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "angiocentric glioma MYB QKI fusion",
  "pmid": "22955233",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=angiocentric+glioma+MYB+QKI+fusion",
  "pubmed_records": [
   {
    "pmid": "36592415",
    "title": "MYB/MYBL1::QKI fusion-positive diffuse glioma.",
    "year": "2023",
    "pubtype": [
     "Review",
     "Case Reports",
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/36592415/"
   },
   {
    "pmid": "26829751",
    "title": "MYB-QKI rearrangements in angiocentric glioma drive tumorigenicity through a tripartite mechanism.",
    "year": "2016",
    "pubtype": [
     "Journal Article",
     "Meta-Analysis",
     "Research Support, N.I.H., Extramural",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/26829751/"
   },
   {
    "pmid": "32589128",
    "title": "MYB-QKI rearrangement in angiocentric glioma.",
    "year": "2020",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/32589128/"
   },
   {
    "pmid": "40702569",
    "title": "The malignant transformation of an atypical angiocentric glioma, MYB-altered.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Case Reports"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40702569/"
   },
   {
    "pmid": "39098857",
    "title": "Clinical characteristics and detection of MYB-QKI fusions in patients with angiocentric glioma.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39098857/"
   },
   {
    "pmid": "41260607",
    "title": "MYB Alterations in Angiocentric Gliomas.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Systematic Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41260607/"
   },
   {
    "pmid": "39569742",
    "title": "MYB::QKI fusion-positive diffuse glioma of the cerebellum: A case report.",
    "year": "2025",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39569742/"
   },
   {
    "pmid": "28803398",
    "title": "Brainstem angiocentric gliomas with MYB-QKI rearrangements.",
    "year": "2017",
    "pubtype": [
     "Case Reports",
     "Letter"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/28803398/"
   },
   {
    "pmid": "28776091",
    "title": "Angiocentric glioma with MYB-QKI fusion located in the brainstem, rather than cerebral cortex.",
    "year": "2017",
    "pubtype": [
     "Case Reports",
     "Letter"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/28776091/"
   },
   {
    "pmid": "41288759",
    "title": "Angiocentric glioma: a single center experience and literature review.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Review",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41288759/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Glioma leptomeníngeo difuso glioneuronal",
  "synonyms": "diffuse leptomeningeal glioneuronal tumor DLGNT 1p deletion KIAA1549 BRAF",
  "age_group": "crianças e jovens",
  "biomarker": "1p deletion; 1p/19q; KIAA1549::BRAF; 1p loss with 1q gain",
  "state": "perda de 1p, frequentemente com alteração MAPK",
  "role": "diagnóstico e prognóstico",
  "direction": "heterogêneo; 1q gain e classe molecular podem ser desfavoráveis",
  "outcome": "Apresenta disseminação leptomeníngea e pode ter nódulos intraparenquimatosos; o diagnóstico requer integração radiológica, citológica e molecular.",
  "treatment_context": "Não há padrão universal; quimioterapia e terapias dirigidas são usadas conforme idade, subtipo e progressão.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "diffuse leptomeningeal glioneuronal tumor 1p deletion KIAA1549 BRAF",
  "pmid": "28754547; 31888977",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=diffuse+leptomeningeal+glioneuronal+tumor+1p+deletion+KIAA1549+BRAF",
  "pubmed_records": [
   {
    "pmid": "40788548",
    "title": "Diffuse leptomeningeal glioneuronal tumor (DLGNT): a comprehensive clinical and molecular analysis.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40788548/"
   },
   {
    "pmid": "35867118",
    "title": "Prognostic factors in diffuse leptomeningeal glioneuronal tumor (DLGNT): a systematic review.",
    "year": "2022",
    "pubtype": [
     "Journal Article",
     "Systematic Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35867118/"
   },
   {
    "pmid": "32912870",
    "title": "Diffuse Leptomeningeal Glioneuronal Tumor of Childhood.",
    "year": "2020",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/32912870/"
   },
   {
    "pmid": "41137932",
    "title": "Diffuse leptomeningeal glioneuronal tumor.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41137932/"
   },
   {
    "pmid": "35272977",
    "title": "Diffuse leptomeningeal glioneuronal tumor: A review of diagnosis and management with an illustrative case.",
    "year": "2022",
    "pubtype": [
     "Review",
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35272977/"
   },
   {
    "pmid": "35922601",
    "title": "Diffuse leptomeningeal glioneuronal tumor in an 8-year-old girl: case report and review of the literature.",
    "year": "2023",
    "pubtype": [
     "Review",
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35922601/"
   },
   {
    "pmid": "38795167",
    "title": "Understanding diffuse leptomeningeal glioneuronal tumors.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38795167/"
   },
   {
    "pmid": "34977973",
    "title": "Diffuse leptomeningeal glioneuronal tumor without KIAA1549-BRAF fusion and 1p detection: a case report and review of literature.",
    "year": "2022",
    "pubtype": [
     "Case Reports",
     "Journal Article",
     "Research Support, Non-U.S. Gov't",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/34977973/"
   },
   {
    "pmid": "41899517",
    "title": "Diffuse Leptomeningeal Glioneuronal Tumor: A Systematic Review Highlighting Molecular Heterogeneity and Survival Outcome.",
    "year": "2026",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41899517/"
   },
   {
    "pmid": "37197736",
    "title": "Diffuse leptomeningeal glioneuronal tumor in a child masquerading as an intramedullary spinal pilocytic astrocytoma.",
    "year": "2023",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37197736/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Tumor glioneuronal mixoide",
  "synonyms": "myxoid glioneuronal tumor MGT PDGFRA",
  "age_group": "adultos",
  "biomarker": "PDGFRA alteration; methylation class",
  "state": "alteração de PDGFRA e classe de metilação característica",
  "role": "diagnóstico molecular",
  "direction": "geralmente indolente, mas com recorrência possível",
  "outcome": "Entidade recentemente definida, frequentemente septal/periventricular; a classe de metilação evita confusão com outras lesões glioneuronais.",
  "treatment_context": "Ressecção e acompanhamento; evidência sobre terapias sistêmicas ainda é limitada.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "myxoid glioneuronal tumor PDGFRA methylation",
  "pmid": "33298425",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=myxoid+glioneuronal+tumor+PDGFRA+methylation",
  "pubmed_records": [
   {
    "pmid": "31609499",
    "title": "Myxoid glioneuronal tumor, PDGFRA p.K385-mutant: clinical, radiologic, and histopathologic features.",
    "year": "2020",
    "pubtype": [
     "Journal Article",
     "Research Support, N.I.H., Extramural"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/31609499/"
   },
   {
    "pmid": "34297434",
    "title": "Myxoid glioneuronal tumor, PDGFRA p.K385L-mutant, arising in midbrain tectum with multifocal CSF dissemination.",
    "year": "2022",
    "pubtype": [
     "Letter",
     "Research Support, N.I.H., Extramural",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/34297434/"
   },
   {
    "pmid": "36764090",
    "title": "Myxoid glioneuronal tumor: Histopathologic, neuroradiologic, and molecular features in a single center series.",
    "year": "2023",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/36764090/"
   },
   {
    "pmid": "35562106",
    "title": "Temporal lobe myxoid glioneuronal tumor, PDGFRA p.K385L-mutant with DNA methylation confirmation.",
    "year": "2022",
    "pubtype": [
     "Letter"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35562106/"
   },
   {
    "pmid": "38532028",
    "title": "PDGFRA K385 mutants in myxoid glioneuronal tumors promote receptor dimerization and oncogenic signaling.",
    "year": "2024",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38532028/"
   },
   {
    "pmid": "41243515",
    "title": "Myxoid glioneuronal tumor with PDGFRA p.K385 mutation in the periventricular white matter: a rare case and literature insights.",
    "year": "2025",
    "pubtype": [
     "Letter"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41243515/"
   },
   {
    "pmid": "41475017",
    "title": "Myxoid glioneuronal tumors can harbor unusual PDGFRA alterations.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41475017/"
   },
   {
    "pmid": "41276218",
    "title": "Myxoid glioneuronal tumor with PDGFRA p.K385 mutation: Radiological insights from two cases.",
    "year": "2026",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41276218/"
   },
   {
    "pmid": "41036425",
    "title": "Myxoid Glioneuronal Tumours with PDGFRA p.K385 Mutations Causing Hydrocephalus and Successfully Treated with Neuroendoscopic Surgery: A Case Report and Literature Review.",
    "year": "2025",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41036425/"
   },
   {
    "pmid": "39655782",
    "title": "Are PDFGRA Dinucleotide Alterations Definitional for Myxoid Glioneuronal Tumor? Report of PDFRA p. K385L Mutation in a Neonatal High-Grade Glioma.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Case Reports"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39655782/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Ganglioglioma",
  "synonyms": "ganglioglioma BRAF V600E epilepsy-associated tumor",
  "age_group": "crianças, adolescentes e adultos jovens",
  "biomarker": "BRAF V600E; FGFR1; MAPK pathway",
  "state": "alteração ativadora da via MAPK em subgrupo",
  "role": "diagnóstico e alvo terapêutico",
  "direction": "geralmente favorável; anaplasia é rara e desfavorável",
  "outcome": "Tumor glioneuronal geralmente de baixo grau, associado a epilepsia; BRAF V600E pode auxiliar na classificação e abrir possibilidade de terapia dirigida em casos selecionados.",
  "treatment_context": "Ressecção do foco epileptogênico é central; tratamento sistêmico é reservado para doença irressecável/recorrente.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "ganglioglioma BRAF V600E FGFR1 molecular study",
  "pmid": "24038610; 29572364",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=ganglioglioma+BRAF+V600E+FGFR1+molecular+study",
  "pubmed_records": [
   {
    "pmid": "33394641",
    "title": "BRAF V600E-Mutated Ganglioglioma of the Optic Pathway: A Case Report and Review of the Literature.",
    "year": "2021",
    "pubtype": [
     "Case Reports",
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/33394641/"
   },
   {
    "pmid": "40186496",
    "title": "BRAF V600E Mutation in Ganglioglioma: Impact on Epileptogenicity and Implications for Surgical Strategy.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40186496/"
   },
   {
    "pmid": "32879641",
    "title": "Detection of BRAF V600E Mutation in Ganglioglioma and Pilocytic Astrocytoma by Immunohistochemistry and Real-Time PCR-Based Idylla Test.",
    "year": "2020",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/32879641/"
   },
   {
    "pmid": "34895740",
    "title": "Transformation of ganglioglioma to epithelioid glioblastoma, both with BRAF V600E mutation.",
    "year": "2022",
    "pubtype": [
     "Letter"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/34895740/"
   },
   {
    "pmid": "27149188",
    "title": "[Atypical ganglioglioma with BRAF V600E mutation: a case report and review of the literature].",
    "year": "2016",
    "pubtype": [
     "Case Reports",
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/27149188/"
   },
   {
    "pmid": "23435618",
    "title": "Mutant BRAF V600E protein in ganglioglioma is predominantly expressed by neuronal tumor cells.",
    "year": "2013",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/23435618/"
   },
   {
    "pmid": "23822828",
    "title": "BRAF V600E expression and distribution in desmoplastic infantile astrocytoma/ganglioglioma.",
    "year": "2014",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/23822828/"
   },
   {
    "pmid": "36686797",
    "title": "Implications of BRAF V600E mutation in gliomas: Molecular considerations, prognostic value and treatment evolution.",
    "year": "2022",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/36686797/"
   },
   {
    "pmid": "27984673",
    "title": "Co-occurrence of histone H3 K27M and BRAF V600E mutations in paediatric midline grade I ganglioglioma.",
    "year": "2018",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/27984673/"
   },
   {
    "pmid": "29902580",
    "title": "Desmoplastic non-infantile astrocytoma/ganglioglioma: rare low-grade tumor with frequent BRAF V600E mutation.",
    "year": "2018",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/29902580/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Astrocitoma subependimário de células gigantes",
  "synonyms": "subependymal giant cell astrocytoma SEGA TSC1 TSC2",
  "age_group": "crianças, adolescentes e adultos com esclerose tuberosa",
  "biomarker": "TSC1/TSC2; mTOR pathway",
  "state": "inativação TSC1/TSC2 e ativação mTOR",
  "role": "diagnóstico, prognóstico e alvo terapêutico",
  "direction": "crescimento controlável; risco clínico depende de hidrocefalia e progressão",
  "outcome": "Associado à esclerose tuberosa; crescimento pode causar obstrução ventricular. Inibidores de mTOR reduzem volume tumoral e podem evitar cirurgia em pacientes selecionados.",
  "treatment_context": "Vigilância por RM; everolimo é opção baseada em ensaio clínico quando há crescimento, hidrocefalia ou risco cirúrgico.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "subependymal giant cell astrocytoma everolimus EXIST-1 TSC",
  "pmid": "22762394; 28065688",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=subependymal+giant+cell+astrocytoma+everolimus+EXIST-1+TSC",
  "pubmed_records": [
   {
    "pmid": "21806479",
    "title": "Everolimus tablets for patients with subependymal giant cell astrocytoma.",
    "year": "2011",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/21806479/"
   },
   {
    "pmid": "22136276",
    "title": "Everolimus: in patients with subependymal giant cell astrocytoma associated with tuberous sclerosis complex.",
    "year": "2012",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/22136276/"
   },
   {
    "pmid": "35907444",
    "title": "Subependymal giant-cell astrocytoma: A surgical review in the modern era of mTOR inhibitors.",
    "year": "2022",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35907444/"
   },
   {
    "pmid": "30069763",
    "title": "Everolimus.",
    "year": "2018",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/30069763/"
   },
   {
    "pmid": "24756805",
    "title": "Everolimus.",
    "year": "2014",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/24756805/"
   },
   {
    "pmid": "23231513",
    "title": "Everolimus (RAD001): first systemic treatment for subependymal giant cell astrocytoma associated with tuberous sclerosis complex.",
    "year": "2012",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/23231513/"
   },
   {
    "pmid": "30222273",
    "title": "",
    "year": "2017",
    "pubtype": [
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/30222273/"
   },
   {
    "pmid": "39030575",
    "title": "Radiotherapy for subependymal giant cell astrocytoma: time to challenge a historical ban? A case report and review of the literature.",
    "year": "2024",
    "pubtype": [
     "Case Reports",
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39030575/"
   },
   {
    "pmid": "32338549",
    "title": "Pharmacological treatment strategies for subependymal giant cell astrocytoma (SEGA).",
    "year": "2020",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/32338549/"
   },
   {
    "pmid": "37953906",
    "title": "Neoadjuvant Therapy with Everolimus for Subependymal Giant Cell Astrocytoma: A Case Report.",
    "year": "2023",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37953906/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Astroblastoma, MN1-alterado",
  "synonyms": "astroblastoma MN1-altered",
  "age_group": "crianças e adultos jovens",
  "biomarker": "MN1 rearrangement; BEND2 fusion; methylation class",
  "state": "rearranjo MN1 ou classe molecular correspondente",
  "role": "diagnóstico molecular",
  "direction": "heterogêneo; comportamento depende da classe e ressecção",
  "outcome": "A alteração MN1 define um grupo molecular distinto de tumores com pseudorosetas perivasculares; a classificação epigenética é útil em casos morfologicamente ambíguos.",
  "treatment_context": "Ressecção máxima segura; radioterapia individualizada conforme grau integrado, idade e recorrência.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "astroblastoma MN1 rearrangement methylation study",
  "pmid": "30487631",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=astroblastoma+MN1+rearrangement+methylation+study",
  "pubmed_records": [
   {
    "pmid": "31111274",
    "title": "MN1 rearrangement in astroblastoma: study of eight cases and review of literature.",
    "year": "2019",
    "pubtype": [
     "Case Reports",
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/31111274/"
   },
   {
    "pmid": "39857696",
    "title": "MicroRNAs Expression Profile in MN1-Altered Astroblastoma.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39857696/"
   },
   {
    "pmid": "40369078",
    "title": "Oncogenic fusions converge on shared mechanisms in initiating astroblastoma.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40369078/"
   },
   {
    "pmid": "28990708",
    "title": "Astroblastoma: a distinct tumor entity characterized by alterations of the X chromosome and MN1 rearrangement.",
    "year": "2018",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/28990708/"
   },
   {
    "pmid": "30238518",
    "title": "Brainstem astroblastoma with MN1 translocation.",
    "year": "2018",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/30238518/"
   },
   {
    "pmid": "38007157",
    "title": "PATZ1-Rearranged Tumors of the Central Nervous System: Characterization of a Pediatric Series of Seven Cases.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38007157/"
   },
   {
    "pmid": "38857191",
    "title": "Astroblastoma With a Novel YAP1::BEND2 Fusion: A Case Report.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Case Reports"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38857191/"
   },
   {
    "pmid": "34313881",
    "title": "Spinal cord astroblastoma with EWSR1-BEND2 fusion classified as HGNET-MN1 by methylation classification: a case report.",
    "year": "2021",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/34313881/"
   },
   {
    "pmid": "42550886",
    "title": "MN1 rearrangement detected by FISH analysis in a neuroepithelial tumor with EWSR1::PATZ1 demonstrating ependymoma-like and astroblastoma-like histology: A diagnostic pitfall.",
    "year": "2026",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/42550886/"
   },
   {
    "pmid": "40503962",
    "title": "Soft tissue sarcoma with MN1 gene fusions: a report of three cases with aggressive clinical behavior.",
    "year": "2025",
    "pubtype": [
     "Journal Article",
     "Case Reports",
     "Research Support, Non-U.S. Gov't",
     "Research Support, N.I.H., Extramural"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/40503962/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Glioma cordoide",
  "synonyms": "chordoid glioma PRKCA DICER1",
  "age_group": "adultos",
  "biomarker": "PRKCA p.D463H; methylation class",
  "state": "mutação recorrente PRKCA e classe de metilação",
  "role": "diagnóstico molecular",
  "direction": "geralmente grau baixo, mas localização pode gerar morbidade importante",
  "outcome": "Tumor raro da região anterior do terceiro ventrículo; PRKCA p.D463H apoia o diagnóstico integrado.",
  "treatment_context": "Cirurgia é complexa pela localização; radioterapia pode ser considerada em resíduo/recorrência, com decisão individualizada.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "chordoid glioma PRKCA D463H molecular",
  "pmid": "28935667",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=chordoid+glioma+PRKCA+D463H+molecular",
  "pubmed_records": [
   {
    "pmid": "41187221",
    "title": "The chordoid glioma PRKCA D463H mutation is a kinase inactive, gain-of-function allele that induces early-onset chondrosarcoma in mice.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/41187221/"
   },
   {
    "pmid": "37675487",
    "title": "Suprasellar masquerader: Chordoid glioma.",
    "year": "2024",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37675487/"
   },
   {
    "pmid": "33085976",
    "title": "PRKCA D463H Mutation in Chordoid Glioma of the Third Ventricle: A Cohort of 16 Cases, Including Two Cases Harboring BRAFV600E Mutation.",
    "year": "2020",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/33085976/"
   },
   {
    "pmid": "34344068",
    "title": "[Chordoid glioma: a clinicopathological study].",
    "year": "2021",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/34344068/"
   },
   {
    "pmid": "29476136",
    "title": "A recurrent kinase domain mutation in PRKCA defines chordoid glioma of the third ventricle.",
    "year": "2018",
    "pubtype": [
     "Journal Article",
     "Research Support, N.I.H., Extramural"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/29476136/"
   },
   {
    "pmid": "39970814",
    "title": "Chordoid glioma with uncommon papillary and fusiform structures.",
    "year": "2025",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39970814/"
   },
   {
    "pmid": "29915258",
    "title": "A recurrent point mutation in PRKCA is a hallmark of chordoid gliomas.",
    "year": "2018",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/29915258/"
   },
   {
    "pmid": "30148717",
    "title": "Molecular classification of adult gliomas: recent advances and future perspectives.",
    "year": "2018",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/30148717/"
   },
   {
    "pmid": "42441840",
    "title": "Pseudokinase-converting mutation in protein kinase C alpha drives chordoid glioma by pathway rewiring.",
    "year": "2026",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/42441840/"
   },
   {
    "pmid": "34040630",
    "title": "Occurrence of Chordoid Glioma With Sodium Ion Metabolism Disorder 5 Years After Meningioma Surgery and Whole-Exome Sequencing: A Case Report and Literature Review.",
    "year": "2021",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/34040630/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 },
 {
  "entity": "Tumor glioneuronal formador de rosetas",
  "synonyms": "rosette-forming glioneuronal tumor RGNT PIK3CA",
  "age_group": "adolescentes e adultos jovens",
  "biomarker": "PIK3CA; FGFR1; methylation class",
  "state": "alteração da via PI3K/MAPK em subgrupo",
  "role": "diagnóstico molecular e prognóstico",
  "direction": "geralmente favorável; disseminação/recorrência são incomuns",
  "outcome": "Neoplasia glioneuronal geralmente indolente, frequentemente do quarto ventrículo; alterações de PIK3CA/FGFR1 apoiam a classificação.",
  "treatment_context": "Ressecção ou descompressão conforme localização; acompanhamento é importante devido a recorrência ocasional.",
  "evidence_level": "estudos PubMed ampliados: estudos primários, coortes, ensaios, revisões sistemáticas e meta-análises",
  "pubmed_query": "rosette-forming glioneuronal tumor PIK3CA FGFR1 molecular",
  "pmid": "29909849",
  "source": "PubMed E-utilities; consultas ampliadas e deduplicadas por PMID",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/?term=rosette-forming+glioneuronal+tumor+PIK3CA+FGFR1+molecular",
  "pubmed_records": [
   {
    "pmid": "35293634",
    "title": "Rosette-forming glioneuronal tumours are midline, FGFR1-mutated tumours.",
    "year": "2022",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/35293634/"
   },
   {
    "pmid": "39167187",
    "title": "FGFR1 wild-type rosette-forming glioneuronal tumours.",
    "year": "2024",
    "pubtype": [
     "Case Reports",
     "Letter",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39167187/"
   },
   {
    "pmid": "37870758",
    "title": "Diffusely invasive supratentorial rosette-forming glioneuronal tumor: illustrative case.",
    "year": "2023",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/37870758/"
   },
   {
    "pmid": "38388383",
    "title": "Clinicopathological analysis of rosette-forming glioneuronal tumors.",
    "year": "2024",
    "pubtype": [
     "Review",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/38388383/"
   },
   {
    "pmid": "34498065",
    "title": "Rosette-Forming Glioneuronal Tumor in the Pineal Region: A Series of 6 Cases and Literature Review.",
    "year": "2021",
    "pubtype": [
     "Case Reports",
     "Journal Article",
     "Research Support, Non-U.S. Gov't",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/34498065/"
   },
   {
    "pmid": "30790744",
    "title": "Rosette-Forming Glioneuronal Tumor in Opticochiasmatic Region-Novel Entity in New Location.",
    "year": "2019",
    "pubtype": [
     "Case Reports",
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/30790744/"
   },
   {
    "pmid": "24806303",
    "title": "FGFR1 mutations in Rosette-forming glioneuronal tumors of the fourth ventricle.",
    "year": "2014",
    "pubtype": [
     "Journal Article"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/24806303/"
   },
   {
    "pmid": "31250151",
    "title": "Rosette-forming glioneuronal tumors share a distinct DNA methylation profile and mutations in FGFR1, with recurrent co-mutation of PIK3CA and NF1.",
    "year": "2019",
    "pubtype": [
     "Journal Article",
     "Research Support, Non-U.S. Gov't"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/31250151/"
   },
   {
    "pmid": "32859279",
    "title": "Comprehensive analysis of diverse low-grade neuroepithelial tumors with FGFR1 alterations reveals a distinct molecular signature of rosette-forming glioneuronal tumor.",
    "year": "2020",
    "pubtype": [
     "Journal Article",
     "Research Support, N.I.H., Extramural"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/32859279/"
   },
   {
    "pmid": "39457636",
    "title": "The Clinical and Molecular Landscape of Rosette-Forming Glioneuronal Tumors.",
    "year": "2024",
    "pubtype": [
     "Journal Article",
     "Review"
    ],
    "url": "https://pubmed.ncbi.nlm.nih.gov/39457636/"
   }
  ],
  "extraction_fields": "PMID; DOI; tipo de publicação; desenho; n; idade; entidade WHO; biomarcador e método; intervenção/comparador; OS/PFS; HR/RR/OR e IC95%; seguimento; limitações; conflito de interesse",
  "pubmed_record_count": 10
 }
];

const STUDIES = [
 {
  "entity": "Astrocitoma, IDH-mutante",
  "study": "[Astrocytoma, IDH-Mutant].",
  "pmid": "37743331",
  "year": "2023",
  "publication_types": "Journal Article; Review; English Abstract",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37743331/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma, IDH-mutante",
  "study": "Protein-based classification reveals an immune-hot subtype in IDH mutant astrocytoma with worse prognosis.",
  "pmid": "40939590",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40939590/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma, IDH-mutante",
  "study": "Evolutionary trajectories of IDH-mutant astrocytoma identify molecular grading markers related to cell cycling.",
  "pmid": "40830455",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40830455/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma, IDH-mutante",
  "study": "Integrative spatial analysis reveals a multi-layered organization of glioblastoma.",
  "pmid": "38653236",
  "year": "2024",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't; Research Support, N.I.H., Extramural",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38653236/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma, IDH-mutante",
  "study": "Primary mismatch repair deficient IDH-mutant astrocytoma (PMMRDIA) is a distinct type with a poor prognosis.",
  "pmid": "33216206",
  "year": "2021",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/33216206/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma, IDH-mutante",
  "study": "Novel, improved grading system(s) for IDH-mutant astrocytic gliomas.",
  "pmid": "29687258",
  "year": "2018",
  "publication_types": "Journal Article; Multicenter Study; Research Support, Non-U.S. Gov't",
  "n_patients": "estudo com desenho quantitativo (ensaio/meta-análise/revisão sistemática) — dados ainda não verificados nesta rodada",
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Candidato prioritário para a próxima rodada de extração (tipo de publicação indica que provavelmente reporta HR/IC95%, mas ainda não foi lido/confirmado).",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/29687258/",
  "data_status": "pendente de verificação (alta prioridade)"
 },
 {
  "entity": "Astrocitoma, IDH-mutante",
  "study": "Multi-scale signaling and tumor evolution in high-grade gliomas.",
  "pmid": "38981438",
  "year": "2024",
  "publication_types": "Journal Article; Research Support, N.I.H., Extramural; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38981438/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma, IDH-mutante",
  "study": "Vebreltinib for Previously Treated Astrocytoma, IDH-Mutant, Grade 4, and Glioblastoma, IDH Wild-Type with PTPRZ1-MET Fusion Gene: A Multicenter, Phase III Randomized, Open-Label Trial.",
  "pmid": "41821581",
  "year": "2026",
  "publication_types": "Journal Article; Multicenter Study; Randomized Controlled Trial; Clinical Trial, Phase III",
  "n_patients": "estudo com desenho quantitativo (ensaio/meta-análise/revisão sistemática) — dados ainda não verificados nesta rodada",
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Candidato prioritário para a próxima rodada de extração (tipo de publicação indica que provavelmente reporta HR/IC95%, mas ainda não foi lido/confirmado).",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41821581/",
  "data_status": "pendente de verificação (alta prioridade)"
 },
 {
  "entity": "Astrocitoma, IDH-mutante",
  "study": "Grading of IDH-mutant astrocytoma using diffusion, susceptibility and perfusion-weighted imaging.",
  "pmid": "35644621",
  "year": "2022",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35644621/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma, IDH-mutante",
  "study": "Molecular landscape of IDH-mutant primary astrocytoma Grade IV/glioblastomas.",
  "pmid": "33692446",
  "year": "2021",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/33692446/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
  "study": "Glioma.",
  "pmid": "38724526",
  "year": "2024",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38724526/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
  "study": "Oligodendroglioma, IDH-mutant and 1p/19q-codeleted-prognostic factors, standard of care and chemotherapy, and future perspectives with neoadjuvant strategy.",
  "pmid": "38564040",
  "year": "2024",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38564040/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
  "study": "CODEL: phase III study of RT, RT + TMZ, or TMZ for newly diagnosed 1p/19q codeleted oligodendroglioma. Analysis from the initial study design.",
  "pmid": "32678879",
  "year": "2021",
  "publication_types": "Clinical Trial, Phase III; Journal Article; Randomized Controlled Trial; Research Support, N.I.H., Extramural",
  "n_patients": 36,
  "hr": 3.12,
  "ci_low": 1.26,
  "ci_high": 7.69,
  "os_level": 3,
  "evidence_level": 4,
  "notes": "Ensaio fase III CODEL (desenho inicial), n=36: PFS pior com TMZ isolada vs RT (HR 3,12; IC95% 1,26-7,69; p=0,014); OS não diferiu significativamente entre braços (comparação subdimensionada pelo tamanho amostral). O HR reportado refere-se a PFS, não a OS.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/32678879/",
  "data_status": "verificado nesta rodada (busca + leitura do resumo)"
 },
 {
  "entity": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
  "study": "Survival Outcomes Associated With First-Line Procarbazine, CCNU, and Vincristine or Temozolomide in Combination With Radiotherapy in IDH-Mutant 1p/19q-Codeleted Grade 3 Oligodendroglioma.",
  "pmid": "39356975",
  "year": "2025",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39356975/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
  "study": "Brainstem oligodendroglioma, IDH-mutant, and 1P/19Q-codeleted: A potential diagnostic pitfall.",
  "pmid": "37812786",
  "year": "2023",
  "publication_types": "Letter",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37812786/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
  "study": "A review of adult-type diffuse gliomas in the WHO CNS5 classification with special reference to Astrocytoma, IDH-mutant and Oligodendroglioma, IDH-mutant and 1p/19q codeleted.",
  "pmid": "35562130",
  "year": "2022",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35562130/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
  "study": "Unlocking new horizons: advances in treating IDH-mutant, 1p/19q-codeleted oligodendrogliomas.",
  "pmid": "40448901",
  "year": "2025",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40448901/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
  "study": "Loss of global DNA hypermethylation is prognostic in IDH-mutant and 1p/19q-codeleted oligodendrogliomas.",
  "pmid": "41299137",
  "year": "2025",
  "publication_types": "Letter",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41299137/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
  "study": "[Oligodendroglioma, IDH Mutation and 1p/19q Codeletion].",
  "pmid": "37743332",
  "year": "2023",
  "publication_types": "English Abstract; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37743332/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
  "study": "World Health Organization 2021 Classification of Central Nervous System Tumors and Implications for Therapy for Adult-Type Gliomas: A Review.",
  "pmid": "36006639",
  "year": "2022",
  "publication_types": "Review; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/36006639/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioblastoma, IDH-wildtype",
  "study": "MGMT gene silencing and benefit from temozolomide in glioblastoma.",
  "pmid": "15758010",
  "year": "2005",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/15758010/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioblastoma, IDH-wildtype",
  "study": "Deciphering glioblastoma: Unveiling imaging markers for predicting MGMT promoter methylation status.",
  "pmid": "39531875",
  "year": "2025",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39531875/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioblastoma, IDH-wildtype",
  "study": "MGMT promoter methylation testing to predict overall survival in people with glioblastoma treated with temozolomide: a comprehensive meta-analysis based on a Cochrane Systematic Review.",
  "pmid": "34467991",
  "year": "2021",
  "publication_types": "Journal Article; Meta-Analysis; Research Support, Non-U.S. Gov't; Systematic Review",
  "n_patients": "3474 pacientes em 32 coortes independentes (comparação entre métodos de teste de MGMT, não um HR único)",
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": 4,
  "notes": "Revisão sistemática Cochrane (McAleenan/Brandner 2021): NÃO reporta um HR único agregado — compara métodos de teste de MGMT (pirosequenciamento vs PCR metilação-específica vs imuno-histoquímica) quanto à capacidade prognóstica; PSQ e MSP tiveram melhor desempenho que IHC.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/34467991/",
  "data_status": "verificado nesta rodada (busca + leitura do resumo)"
 },
 {
  "entity": "Glioblastoma, IDH-wildtype",
  "study": "MGMT promoter methylation status testing to guide therapy for glioblastoma: refining the approach based on emerging evidence and current challenges.",
  "pmid": "30189035",
  "year": "2019",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/30189035/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioblastoma, IDH-wildtype",
  "study": "MGMT and Whole-Genome DNA Methylation Impacts on Diagnosis, Prognosis and Therapy of Glioblastoma Multiforme.",
  "pmid": "35806153",
  "year": "2022",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35806153/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioblastoma, IDH-wildtype",
  "study": "The significance of MGMT methylation in Glioblastoma Multiforme prognosis.",
  "pmid": "30317322",
  "year": "2018",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/30317322/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioblastoma, IDH-wildtype",
  "study": "MGMT promoter methylation and glioblastoma prognosis: a systematic review and meta-analysis.",
  "pmid": "23608672",
  "year": "2013",
  "publication_types": "Journal Article; Meta-Analysis; Systematic Review",
  "n_patients": "24 estudos incluídos (n de pacientes agregados não informado no resumo)",
  "hr": 0.48,
  "ci_low": 0.35,
  "ci_high": 0.65,
  "os_level": 4,
  "evidence_level": 4,
  "notes": "Meta-análise (Zhao et al. 2013): MGMT metilado associado a melhor OS (HR 0,48; IC95% 0,35-0,65) e PFS (HR 0,43; IC95% 0,32-0,56); 22 estudos avaliaram OS.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/23608672/",
  "data_status": "verificado nesta rodada (busca + leitura do resumo)"
 },
 {
  "entity": "Glioblastoma, IDH-wildtype",
  "study": "The prognostic value of MGMT promoter methylation in glioblastoma: A meta-analysis of clinical trials.",
  "pmid": "28266716",
  "year": "2018",
  "publication_types": "Journal Article; Meta-Analysis; Review",
  "n_patients": "estudo com desenho quantitativo (ensaio/meta-análise/revisão sistemática) — dados ainda não verificados nesta rodada",
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Candidato prioritário para a próxima rodada de extração (tipo de publicação indica que provavelmente reporta HR/IC95%, mas ainda não foi lido/confirmado).",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/28266716/",
  "data_status": "pendente de verificação (alta prioridade)"
 },
 {
  "entity": "Glioblastoma, IDH-wildtype",
  "study": "Predominance of MGMT promoter methylation among Pakistani glioblastoma patients.",
  "pmid": "38520591",
  "year": "2024",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38520591/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioblastoma, IDH-wildtype",
  "study": "Assessing MGMT methylation status and its current impact on treatment in glioblastoma.",
  "pmid": "25586425",
  "year": "2015",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/25586425/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso de linha média, H3 K27-alterado",
  "study": "Adult diffuse midline gliomas H3 K27-altered: review of a redefined entity.",
  "pmid": "35567713",
  "year": "2022",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35567713/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso de linha média, H3 K27-alterado",
  "study": "A review of current therapeutics targeting the mitochondrial protease ClpP in diffuse midline glioma, H3 K27-altered.",
  "pmid": "37589388",
  "year": "2024",
  "publication_types": "Journal Article; Review; Research Support, Non-U.S. Gov't; Research Support, N.I.H., Extramural",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37589388/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso de linha média, H3 K27-alterado",
  "study": "H3 K27M-altered glioma and diffuse intrinsic pontine glioma: Semi-systematic review of treatment landscape and future directions.",
  "pmid": "38102230",
  "year": "2024",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38102230/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso de linha média, H3 K27-alterado",
  "study": "H3(K27)-Altered Diffuse Glioma of the Spinal Cord in Adult Patients: A Qualitative Systematic Review and Peculiarity of Radiological Findings.",
  "pmid": "38792513",
  "year": "2024",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38792513/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso de linha média, H3 K27-alterado",
  "study": "Bench-to-bedside investigations of H3 K27-altered diffuse midline glioma: drug targets and potential pharmacotherapies.",
  "pmid": "37897190",
  "year": "2023",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37897190/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso de linha média, H3 K27-alterado",
  "study": "H3 K27-altered diffuse midline glioma presenting as massive cerebellopontine hemorrhage.",
  "pmid": "36867241",
  "year": "2023",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/36867241/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso de linha média, H3 K27-alterado",
  "study": "A new subtype of diffuse midline glioma, H3 K27 and BRAF/FGFR1 co-altered: a clinico-radiological and histomolecular characterisation.",
  "pmid": "38066305",
  "year": "2023",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38066305/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso de linha média, H3 K27-alterado",
  "study": "Paediatric-type diffuse high-grade gliomas in the 5th CNS WHO Classification.",
  "pmid": "36534421",
  "year": "2022",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/36534421/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso de linha média, H3 K27-alterado",
  "study": "Molecular Characterization and Treatment Approaches for Pediatric H3 K27-Altered Diffuse Midline Glioma: Integrated Systematic Review of Individual Clinical Trial Participant Data.",
  "pmid": "37444588",
  "year": "2023",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37444588/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso de linha média, H3 K27-alterado",
  "study": "Adult H3 K27-altered, H3.3 K27-mutant diffuse midline glioma affecting the conus medullaris: illustrative case.",
  "pmid": "40354758",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40354758/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico difuso, H3 G34-mutante",
  "study": "Diffuse hemispheric glioma, H3 G34-mutant: defining the clinical picture through a single institution case series and literature analysis.",
  "pmid": "40402198",
  "year": "2025",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40402198/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico difuso, H3 G34-mutante",
  "study": "Neuroimaging features of diffuse hemispheric glioma, H3 G34-mutant: A case series and systematic review.",
  "pmid": "34632671",
  "year": "2022",
  "publication_types": "Journal Article; Systematic Review",
  "n_patients": "estudo com desenho quantitativo (ensaio/meta-análise/revisão sistemática) — dados ainda não verificados nesta rodada",
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Candidato prioritário para a próxima rodada de extração (tipo de publicação indica que provavelmente reporta HR/IC95%, mas ainda não foi lido/confirmado).",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/34632671/",
  "data_status": "pendente de verificação (alta prioridade)"
 },
 {
  "entity": "Glioma hemisférico difuso, H3 G34-mutante",
  "study": "Epigenetics to clinicopathological features: a bibliometric analysis of H3 G34-mutant diffuse hemispheric glioma literature.",
  "pmid": "38613587",
  "year": "2024",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38613587/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico difuso, H3 G34-mutante",
  "study": "A review of diffuse hemispheric glioma, H3 G34-mutant disease development, DNA repair, microenvironment, and treatments on the horizon.",
  "pmid": "40813437",
  "year": "2025",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40813437/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico difuso, H3 G34-mutante",
  "study": "A scoping review of diffuse hemispheric glioma, H3 G34-mutant: Epigenetic and molecular profiles, clinicopathology, and treatment avenues.",
  "pmid": "39759262",
  "year": "2024",
  "publication_types": "Journal Article; Scoping Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39759262/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico difuso, H3 G34-mutante",
  "study": "Characteristics of diffuse hemispheric gliomas, H3 G34-mutant in adults.",
  "pmid": "34056608",
  "year": "2021",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/34056608/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico difuso, H3 G34-mutante",
  "study": "Anatomic Staging of H3 G34-Mutant Diffuse Hemispheric Glioma.",
  "pmid": "40638885",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40638885/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico difuso, H3 G34-mutante",
  "study": "Diffuse Hemispheric Glioma, H3 G34-Mutant With Prominent Perivascular Invasion in a Middle-Aged Man: A Case Report and Literature Review of Middle-Aged and Elderly Cases.",
  "pmid": "40696267",
  "year": "2025",
  "publication_types": "Journal Article; Case Reports; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40696267/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico difuso, H3 G34-mutante",
  "study": "Pediatric diffuse hemispheric glioma H3 G34-mutant with gains of the BRAF locus: An illustrative case.",
  "pmid": "37056711",
  "year": "2023",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37056711/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
  "study": "Pediatric-Type Diffuse Low Grade Glioma.",
  "pmid": "41198334",
  "year": "2025",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41198334/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
  "study": "Pediatric-type diffuse low-grade gliomas.",
  "pmid": "38926169",
  "year": "2024",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38926169/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
  "study": "The 2021 WHO Classification of Tumors of the Central Nervous System: An update on pediatric low-grade gliomas and glioneuronal tumors.",
  "pmid": "35218102",
  "year": "2022",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35218102/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
  "study": "Comprehensive analysis of MYB/MYBL1-altered pediatric-type diffuse low-grade glioma.",
  "pmid": "38466086",
  "year": "2024",
  "publication_types": "Journal Article; Research Support, N.I.H., Extramural; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38466086/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
  "study": "Review on neuroimaging in pediatric-type diffuse low-grade gliomas.",
  "pmid": "37920791",
  "year": "2023",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37920791/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
  "study": "Pediatric-Type Diffuse Low-Grade Gliomas: A Subgroup Defined by Peculiar Molecular Features and Distinct Prognostic Outcomes.",
  "pmid": "40861626",
  "year": "2025",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40861626/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
  "study": "Pediatric-type diffuse low grade gliomas: Histomolecular profile and practical approach to their integrated diagnosis according to the WHO CNS5 classification.",
  "pmid": "35562133",
  "year": "2022",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35562133/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
  "study": "Recent updates in pediatric diffuse glioma classification: insights and conclusions from the WHO 5(th) edition.",
  "pmid": "39440342",
  "year": "2024",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39440342/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
  "study": "Illuminating radiogenomic signatures in pediatric-type diffuse gliomas: insights into molecular, clinical, and imaging correlations. Part II: low-grade group.",
  "pmid": "40668344",
  "year": "2025",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40668344/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
  "study": "Pediatric low-grade epilepsy-associated tumors (LEATS): neuroimaging review and genetics update.",
  "pmid": "41591436",
  "year": "2026",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41591436/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
  "study": "cIMPACT-NOW update 11: Proposal on adaptation of diagnostic criteria for IDH- and H3-wildtype diffuse high-grade gliomas and for posterior fossa ependymal tumors.",
  "pmid": "40887057",
  "year": "2026",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40887057/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
  "study": "[Pediatric-Type Diffuse High-Grade Gliomas].",
  "pmid": "37743339",
  "year": "2023",
  "publication_types": "English Abstract; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37743339/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
  "study": "Diffuse pediatric high-grade glioma of methylation-based RTK2A and RTK2B subclasses present distinct radiological and histomolecular features including Gliomatosis cerebri phenotype.",
  "pmid": "39558399",
  "year": "2024",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39558399/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
  "study": "Pediatric-type high-grade gliomas with PDGFRA amplification in adult patients with Li-Fraumeni syndrome: clinical and molecular characterization of three cases.",
  "pmid": "38605367",
  "year": "2024",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38605367/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
  "study": "Diffuse pediatric-type high-grade glioma, H3-wildtype and IDH-wildtype, of the adult cerebellum: a report of 2 cases.",
  "pmid": "42295620",
  "year": "2026",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/42295620/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
  "study": "Refinement of diagnostic criteria for pediatric-type diffuse high-grade glioma, IDH- and H3-wildtype, MYCN-subtype including histopathology, TP53, MYCN and ID2 status.",
  "pmid": "37875973",
  "year": "2023",
  "publication_types": "Letter",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37875973/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
  "study": "Single-Cell Profiling of Pediatric High-Grade Gliomas Reveals OPC-Like Subpopulations Driving Tumorigenic Lineage Transitions.",
  "pmid": "41036308",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41036308/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
  "study": "Emerging and Biological Concepts in Pediatric High-Grade Gliomas.",
  "pmid": "39273062",
  "year": "2024",
  "publication_types": "Journal Article; Review; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39273062/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
  "study": "Illuminating radiogenomic signatures in pediatric-type diffuse gliomas: insights into molecular, clinical, and imaging correlations. Part I: high-grade group.",
  "pmid": "40853542",
  "year": "2025",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40853542/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
  "study": "Pediatric high-grade gliomas, H3-wildtype, IDH-wildtype: Refining diagnostic criteria and exploring clinical associations.",
  "pmid": "41798129",
  "year": "2026",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41798129/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico infantil, tipo infantil",
  "study": "An Infant-Type Hemispheric Glioma With SOX5::ALK: A Novel Fusion.",
  "pmid": "38394779",
  "year": "2024",
  "publication_types": "Case Reports; Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38394779/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico infantil, tipo infantil",
  "study": "Infant-Type Hemispheric Glioma in a Chinese Girl: A Newly Defined Entity.",
  "pmid": "35404193",
  "year": "2023",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35404193/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico infantil, tipo infantil",
  "study": "Infant-Type Hemispheric Gliomas: A Review of Clinical, Radiologic, Histopathologic, and Molecular Features.",
  "pmid": "41213248",
  "year": "2025",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41213248/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico infantil, tipo infantil",
  "study": "A systematic study of molecular diagnosis, treatment, and prognosis in infant-type hemispheric glioma: An individual patient data meta-analysis of 164 patients.",
  "pmid": "41206756",
  "year": "2026",
  "publication_types": "Journal Article; Meta-Analysis",
  "n_patients": 164,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": 4,
  "evidence_level": 4,
  "notes": "Meta-análise de dados individuais de pacientes (IPD), n=164: OS em 3 anos de 79,6% (IC95% 72,1-87,9%) e EFS em 3 anos de 49,5% (IC95% 40,7-60,2%). Não reporta HR comparativo — é uma análise descritiva de sobrevida, não um estudo comparativo entre grupos.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41206756/",
  "data_status": "verificado nesta rodada (busca + leitura do resumo)"
 },
 {
  "entity": "Glioma hemisférico infantil, tipo infantil",
  "study": "Challenges in diagnostics and treatment of infant-type hemispheric gliomas.",
  "pmid": "41122676",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41122676/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico infantil, tipo infantil",
  "study": "Infant-Type Hemispheric Glioma With NTRK Fusion Responds to Larotrectinib.",
  "pmid": "42701716",
  "year": "2026",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/42701716/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico infantil, tipo infantil",
  "study": "Lorlatinib for ALK-fused, infant-type hemispheric glioma with lung metastasis: a case report.",
  "pmid": "37000961",
  "year": "2023",
  "publication_types": "Case Reports; Research Support, Non-U.S. Gov't; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37000961/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico infantil, tipo infantil",
  "study": "Case report: ATIC-ALK fusion in infant-type hemispheric glioma and response to lorlatinib.",
  "pmid": "36910660",
  "year": "2023",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/36910660/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma hemisférico infantil, tipo infantil",
  "study": "[Infant-type hemispheric glioma with EEF1G-ROS1 fusion: report of a case].",
  "pmid": "36973207",
  "year": "2023",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/36973207/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pilocítico",
  "study": "Evaluation of KIAA1549::BRAF fusions and clinicopathological insights of pilocytic astrocytomas.",
  "pmid": "38733671",
  "year": "2024",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38733671/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pilocítico",
  "study": "Pilocytic astrocytoma harboring a novel GNAI3-BRAF fusion.",
  "pmid": "36786200",
  "year": "2023",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/36786200/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pilocítico",
  "study": "Rare adult pilocytic astrocytoma of the septum pellucidum with novel RIN2::BRAF fusion.",
  "pmid": "36520196",
  "year": "2023",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/36520196/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pilocítico",
  "study": "Concomitant KIAA1549-BRAF fusion and IDH mutation in Pediatric spinal cord astrocytoma: a case report and literature review.",
  "pmid": "33641074",
  "year": "2021",
  "publication_types": "Case Reports; Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/33641074/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pilocítico",
  "study": "Pilocytic astrocytomas.",
  "pmid": "26948364",
  "year": "2016",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/26948364/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pilocítico",
  "study": "Pediatric low-grade glioma in the era of molecular diagnostics.",
  "pmid": "32164789",
  "year": "2020",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/32164789/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pilocítico",
  "study": "The potential of liquid biopsy for detection of the KIAA1549-BRAF fusion in circulating tumor DNA from children with pilocytic astrocytoma.",
  "pmid": "38371226",
  "year": "2024",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38371226/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pilocítico",
  "study": "Detection of the KIAA1549-BRAF fusion gene in cells forming microvascular proliferations in pilocytic astrocytoma.",
  "pmid": "31329636",
  "year": "2019",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/31329636/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pilocítico",
  "study": "SNP-based detection of allelic imbalance: A novel approach for identifying KIAA1549-BRAF fusion in pilocytic astrocytoma using DNA sequencing.",
  "pmid": "33626378",
  "year": "2021",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/33626378/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pilocítico",
  "study": "KIAA1549: BRAF Gene Fusion and FGFR1 Hotspot Mutations Are Prognostic Factors in Pilocytic Astrocytomas.",
  "pmid": "26083571",
  "year": "2015",
  "publication_types": "Journal Article; Research Support, N.I.H., Extramural; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/26083571/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma de alto grau com características piloides",
  "study": "High-grade astrocytoma with piloid features: a single-institution case series and literature review.",
  "pmid": "40270074",
  "year": "2025",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40270074/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma de alto grau com características piloides",
  "study": "High-grade astrocytoma with piloid features: case report and systematic review.",
  "pmid": "40183620",
  "year": "2025",
  "publication_types": "Journal Article; Systematic Review; Case Reports; English Abstract",
  "n_patients": "estudo com desenho quantitativo (ensaio/meta-análise/revisão sistemática) — dados ainda não verificados nesta rodada",
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Candidato prioritário para a próxima rodada de extração (tipo de publicação indica que provavelmente reporta HR/IC95%, mas ainda não foi lido/confirmado).",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40183620/",
  "data_status": "pendente de verificação (alta prioridade)"
 },
 {
  "entity": "Astrocitoma de alto grau com características piloides",
  "study": "High-Grade Astrocytoma With Piloid Features: Case Series and Review of a Recently Described Brain Tumor Entity.",
  "pmid": "39848278",
  "year": "2025",
  "publication_types": "Journal Article; Review; Case Reports",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39848278/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma de alto grau com características piloides",
  "study": "High-grade astrocytoma with piloid features resected with an exoscopic supracerebellar infratentorial approach: illustrative case.",
  "pmid": "40921096",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40921096/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma de alto grau com características piloides",
  "study": "Pediatric High-Grade Astrocytoma With Piloid Features: A Comprehensive Literature Review.",
  "pmid": "41549586",
  "year": "2026",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41549586/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma de alto grau com características piloides",
  "study": "High-grade astrocytoma with piloid features: MRI findings associated with a novel entity.",
  "pmid": "39380837",
  "year": "2024",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39380837/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma de alto grau com características piloides",
  "study": "High-grade astrocytoma with piloid features in the conus medullaris: a rare presentation of a new World Health Organization diagnosis. Illustrative case.",
  "pmid": "39467315",
  "year": "2024",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39467315/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma de alto grau com características piloides",
  "study": "High-Grade Astrocytoma with Piloid Features: A Dual Institutional Review of Imaging Findings of a Novel Entity.",
  "pmid": "38485198",
  "year": "2024",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38485198/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma de alto grau com características piloides",
  "study": "Anaplastic astrocytoma with piloid features, a novel molecular class of IDH wildtype glioma with recurrent MAPK pathway, CDKN2A/B and ATRX alterations.",
  "pmid": "29564591",
  "year": "2018",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/29564591/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma de alto grau com características piloides",
  "study": "High-grade astrocytoma with piloid features: A case report and review of literature.",
  "pmid": "40041064",
  "year": "2025",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40041064/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pleomórfico xanthoastrocytoma",
  "study": "Cerebellar Pleomorphic Xanthoastrocytoma with BRAF V600E Mutation.",
  "pmid": "32348888",
  "year": "2020",
  "publication_types": "Case Reports; Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/32348888/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pleomórfico xanthoastrocytoma",
  "study": "Impact of Grade on Survival in Pleomorphic Xanthoastrocytoma and Low Prevalence of BRAF V600E Mutation.",
  "pmid": "35618235",
  "year": "2022",
  "publication_types": "Journal Article; Review; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35618235/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pleomórfico xanthoastrocytoma",
  "study": "BRAF V600E in a preclinical model of pleomorphic Xanthoastrocytoma: Analysis of the tumor microenvironment and immune cell infiltration dynamics in vivo.",
  "pmid": "38784952",
  "year": "2024",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38784952/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pleomórfico xanthoastrocytoma",
  "study": "Dabrafenib plus trametinib in patients with BRAF(V600E)-mutant low-grade and high-grade glioma (ROAR): a multicentre, open-label, single-arm, phase 2, basket trial.",
  "pmid": "34838156",
  "year": "2022",
  "publication_types": "Clinical Trial, Phase II; Journal Article; Multicenter Study; Research Support, N.I.H., Extramural; Research Support, Non-U.S. Gov't",
  "n_patients": "estudo com desenho quantitativo (ensaio/meta-análise/revisão sistemática) — dados ainda não verificados nesta rodada",
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Candidato prioritário para a próxima rodada de extração (tipo de publicação indica que provavelmente reporta HR/IC95%, mas ainda não foi lido/confirmado).",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/34838156/",
  "data_status": "pendente de verificação (alta prioridade)"
 },
 {
  "entity": "Astrocitoma pleomórfico xanthoastrocytoma",
  "study": "Pleomorphic xanthoastrocytoma in the brainstem with BRAF V600E mutation: A case report.",
  "pmid": "36977615",
  "year": "2023",
  "publication_types": "Case Reports; Letter",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/36977615/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pleomórfico xanthoastrocytoma",
  "study": "MRI characteristics predict BRAF V600E status in gangliogliomas and pleomorphic xanthoastrocytomas and provide survival prognostication.",
  "pmid": "37401109",
  "year": "2024",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37401109/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pleomórfico xanthoastrocytoma",
  "study": "Noninvasive prediction of BRAF V600E mutation status of pleomorphic xanthoastrocytomas with MRI morphologic features and diffusion-weighted imaging.",
  "pmid": "39160463",
  "year": "2024",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39160463/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pleomórfico xanthoastrocytoma",
  "study": "BRAF/MEK Dual Inhibitors Therapy in Progressive and Anaplastic Pleomorphic Xanthoastrocytoma: Case Series and Literature Review.",
  "pmid": "36351333",
  "year": "2022",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/36351333/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pleomórfico xanthoastrocytoma",
  "study": "Drug-resistant BRAF V600E-mutant recurrent pleomorphic xanthoastrocytoma, CNS WHO Grade 3 successfully resolved with incidental discontinuation of combined BRAF and MEK inhibitor therapy.",
  "pmid": "39640311",
  "year": "2024",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39640311/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma pleomórfico xanthoastrocytoma",
  "study": "The distribution of BRAF gene fusions in solid tumors and response to targeted therapy.",
  "pmid": "26314551",
  "year": "2016",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/26314551/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
  "study": "Polymorphous Low-Grade Neuroepithelial Tumor of the Young (PLNTY): Scoping Review of Case Reports and Case Series.",
  "pmid": "38974443",
  "year": "2024",
  "publication_types": "Journal Article; Scoping Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38974443/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
  "study": "Polymorphous low-grade neuroepithelial tumour of young (PLNTY): the new kid on the block.",
  "pmid": "37796295",
  "year": "2024",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37796295/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
  "study": "Polymorphous low-grade neuroepithelial tumor of the young.",
  "pmid": "40837310",
  "year": "2025",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40837310/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
  "study": "Polymorphous Low-Grade Neuroepithelial Tumor of the Young (PLNTY): Molecular Profiling Confirms Frequent MAPK Pathway Activation.",
  "pmid": "34363682",
  "year": "2021",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/34363682/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
  "study": "[Clinicopathological features of polymorphous low-grade neuroepithelial tumor of the young].",
  "pmid": "35785835",
  "year": "2022",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35785835/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
  "study": "Radiological and surgical aspects of polymorphous low-grade neuroepithelial tumor of the young (PLNTY).",
  "pmid": "36894761",
  "year": "2023",
  "publication_types": "Meta-Analysis; Case Reports; Journal Article; Systematic Review",
  "n_patients": "estudo com desenho quantitativo (ensaio/meta-análise/revisão sistemática) — dados ainda não verificados nesta rodada",
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Candidato prioritário para a próxima rodada de extração (tipo de publicação indica que provavelmente reporta HR/IC95%, mas ainda não foi lido/confirmado).",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/36894761/",
  "data_status": "pendente de verificação (alta prioridade)"
 },
 {
  "entity": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
  "study": "Polymorphous Low-Grade Neuroepithelial Tumor of the Young (PLNTY): A Newly Described Entity of Special Radiological Significance.",
  "pmid": "37811183",
  "year": "2023",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37811183/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
  "study": "Polymorphous low-grade neuroepithelial tumor of the young: case report and literature review.",
  "pmid": "41393974",
  "year": "2025",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41393974/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
  "study": "[Clinicopathological features of polymorphous low-grade neuroepithelial tumor of the young].",
  "pmid": "33152817",
  "year": "2020",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/33152817/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma angiocêntrico",
  "study": "MYB/MYBL1::QKI fusion-positive diffuse glioma.",
  "pmid": "36592415",
  "year": "2023",
  "publication_types": "Review; Case Reports; Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/36592415/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma angiocêntrico",
  "study": "MYB-QKI rearrangements in angiocentric glioma drive tumorigenicity through a tripartite mechanism.",
  "pmid": "26829751",
  "year": "2016",
  "publication_types": "Journal Article; Meta-Analysis; Research Support, N.I.H., Extramural; Research Support, Non-U.S. Gov't",
  "n_patients": "estudo com desenho quantitativo (ensaio/meta-análise/revisão sistemática) — dados ainda não verificados nesta rodada",
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Candidato prioritário para a próxima rodada de extração (tipo de publicação indica que provavelmente reporta HR/IC95%, mas ainda não foi lido/confirmado).",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/26829751/",
  "data_status": "pendente de verificação (alta prioridade)"
 },
 {
  "entity": "Glioma angiocêntrico",
  "study": "MYB-QKI rearrangement in angiocentric glioma.",
  "pmid": "32589128",
  "year": "2020",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/32589128/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma angiocêntrico",
  "study": "The malignant transformation of an atypical angiocentric glioma, MYB-altered.",
  "pmid": "40702569",
  "year": "2025",
  "publication_types": "Journal Article; Case Reports",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40702569/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma angiocêntrico",
  "study": "Clinical characteristics and detection of MYB-QKI fusions in patients with angiocentric glioma.",
  "pmid": "39098857",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39098857/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma angiocêntrico",
  "study": "MYB Alterations in Angiocentric Gliomas.",
  "pmid": "41260607",
  "year": "2025",
  "publication_types": "Journal Article; Systematic Review",
  "n_patients": "estudo com desenho quantitativo (ensaio/meta-análise/revisão sistemática) — dados ainda não verificados nesta rodada",
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Candidato prioritário para a próxima rodada de extração (tipo de publicação indica que provavelmente reporta HR/IC95%, mas ainda não foi lido/confirmado).",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41260607/",
  "data_status": "pendente de verificação (alta prioridade)"
 },
 {
  "entity": "Glioma angiocêntrico",
  "study": "MYB::QKI fusion-positive diffuse glioma of the cerebellum: A case report.",
  "pmid": "39569742",
  "year": "2025",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39569742/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma angiocêntrico",
  "study": "Brainstem angiocentric gliomas with MYB-QKI rearrangements.",
  "pmid": "28803398",
  "year": "2017",
  "publication_types": "Case Reports; Letter",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/28803398/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma angiocêntrico",
  "study": "Angiocentric glioma with MYB-QKI fusion located in the brainstem, rather than cerebral cortex.",
  "pmid": "28776091",
  "year": "2017",
  "publication_types": "Case Reports; Letter",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/28776091/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma angiocêntrico",
  "study": "Angiocentric glioma: a single center experience and literature review.",
  "pmid": "41288759",
  "year": "2025",
  "publication_types": "Journal Article; Review; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41288759/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma leptomeníngeo difuso glioneuronal",
  "study": "Diffuse leptomeningeal glioneuronal tumor (DLGNT): a comprehensive clinical and molecular analysis.",
  "pmid": "40788548",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40788548/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma leptomeníngeo difuso glioneuronal",
  "study": "Prognostic factors in diffuse leptomeningeal glioneuronal tumor (DLGNT): a systematic review.",
  "pmid": "35867118",
  "year": "2022",
  "publication_types": "Journal Article; Systematic Review",
  "n_patients": "estudo com desenho quantitativo (ensaio/meta-análise/revisão sistemática) — dados ainda não verificados nesta rodada",
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Candidato prioritário para a próxima rodada de extração (tipo de publicação indica que provavelmente reporta HR/IC95%, mas ainda não foi lido/confirmado).",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35867118/",
  "data_status": "pendente de verificação (alta prioridade)"
 },
 {
  "entity": "Glioma leptomeníngeo difuso glioneuronal",
  "study": "Diffuse Leptomeningeal Glioneuronal Tumor of Childhood.",
  "pmid": "32912870",
  "year": "2020",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/32912870/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma leptomeníngeo difuso glioneuronal",
  "study": "Diffuse leptomeningeal glioneuronal tumor.",
  "pmid": "41137932",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41137932/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma leptomeníngeo difuso glioneuronal",
  "study": "Diffuse leptomeningeal glioneuronal tumor: A review of diagnosis and management with an illustrative case.",
  "pmid": "35272977",
  "year": "2022",
  "publication_types": "Review; Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35272977/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma leptomeníngeo difuso glioneuronal",
  "study": "Diffuse leptomeningeal glioneuronal tumor in an 8-year-old girl: case report and review of the literature.",
  "pmid": "35922601",
  "year": "2023",
  "publication_types": "Review; Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35922601/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma leptomeníngeo difuso glioneuronal",
  "study": "Understanding diffuse leptomeningeal glioneuronal tumors.",
  "pmid": "38795167",
  "year": "2024",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38795167/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma leptomeníngeo difuso glioneuronal",
  "study": "Diffuse leptomeningeal glioneuronal tumor without KIAA1549-BRAF fusion and 1p detection: a case report and review of literature.",
  "pmid": "34977973",
  "year": "2022",
  "publication_types": "Case Reports; Journal Article; Research Support, Non-U.S. Gov't; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/34977973/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma leptomeníngeo difuso glioneuronal",
  "study": "Diffuse Leptomeningeal Glioneuronal Tumor: A Systematic Review Highlighting Molecular Heterogeneity and Survival Outcome.",
  "pmid": "41899517",
  "year": "2026",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41899517/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma leptomeníngeo difuso glioneuronal",
  "study": "Diffuse leptomeningeal glioneuronal tumor in a child masquerading as an intramedullary spinal pilocytic astrocytoma.",
  "pmid": "37197736",
  "year": "2023",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37197736/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal mixoide",
  "study": "Myxoid glioneuronal tumor, PDGFRA p.K385-mutant: clinical, radiologic, and histopathologic features.",
  "pmid": "31609499",
  "year": "2020",
  "publication_types": "Journal Article; Research Support, N.I.H., Extramural",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/31609499/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal mixoide",
  "study": "Myxoid glioneuronal tumor, PDGFRA p.K385L-mutant, arising in midbrain tectum with multifocal CSF dissemination.",
  "pmid": "34297434",
  "year": "2022",
  "publication_types": "Letter; Research Support, N.I.H., Extramural; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/34297434/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal mixoide",
  "study": "Myxoid glioneuronal tumor: Histopathologic, neuroradiologic, and molecular features in a single center series.",
  "pmid": "36764090",
  "year": "2023",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/36764090/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal mixoide",
  "study": "Temporal lobe myxoid glioneuronal tumor, PDGFRA p.K385L-mutant with DNA methylation confirmation.",
  "pmid": "35562106",
  "year": "2022",
  "publication_types": "Letter",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35562106/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal mixoide",
  "study": "PDGFRA K385 mutants in myxoid glioneuronal tumors promote receptor dimerization and oncogenic signaling.",
  "pmid": "38532028",
  "year": "2024",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38532028/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal mixoide",
  "study": "Myxoid glioneuronal tumor with PDGFRA p.K385 mutation in the periventricular white matter: a rare case and literature insights.",
  "pmid": "41243515",
  "year": "2025",
  "publication_types": "Letter",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41243515/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal mixoide",
  "study": "Myxoid glioneuronal tumors can harbor unusual PDGFRA alterations.",
  "pmid": "41475017",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41475017/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal mixoide",
  "study": "Myxoid glioneuronal tumor with PDGFRA p.K385 mutation: Radiological insights from two cases.",
  "pmid": "41276218",
  "year": "2026",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41276218/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal mixoide",
  "study": "Myxoid Glioneuronal Tumours with PDGFRA p.K385 Mutations Causing Hydrocephalus and Successfully Treated with Neuroendoscopic Surgery: A Case Report and Literature Review.",
  "pmid": "41036425",
  "year": "2025",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41036425/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal mixoide",
  "study": "Are PDFGRA Dinucleotide Alterations Definitional for Myxoid Glioneuronal Tumor? Report of PDFRA p. K385L Mutation in a Neonatal High-Grade Glioma.",
  "pmid": "39655782",
  "year": "2025",
  "publication_types": "Journal Article; Case Reports",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39655782/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Ganglioglioma",
  "study": "BRAF V600E-Mutated Ganglioglioma of the Optic Pathway: A Case Report and Review of the Literature.",
  "pmid": "33394641",
  "year": "2021",
  "publication_types": "Case Reports; Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/33394641/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Ganglioglioma",
  "study": "BRAF V600E Mutation in Ganglioglioma: Impact on Epileptogenicity and Implications for Surgical Strategy.",
  "pmid": "40186496",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40186496/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Ganglioglioma",
  "study": "Detection of BRAF V600E Mutation in Ganglioglioma and Pilocytic Astrocytoma by Immunohistochemistry and Real-Time PCR-Based Idylla Test.",
  "pmid": "32879641",
  "year": "2020",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/32879641/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Ganglioglioma",
  "study": "Transformation of ganglioglioma to epithelioid glioblastoma, both with BRAF V600E mutation.",
  "pmid": "34895740",
  "year": "2022",
  "publication_types": "Letter",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/34895740/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Ganglioglioma",
  "study": "[Atypical ganglioglioma with BRAF V600E mutation: a case report and review of the literature].",
  "pmid": "27149188",
  "year": "2016",
  "publication_types": "Case Reports; Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/27149188/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Ganglioglioma",
  "study": "Mutant BRAF V600E protein in ganglioglioma is predominantly expressed by neuronal tumor cells.",
  "pmid": "23435618",
  "year": "2013",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/23435618/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Ganglioglioma",
  "study": "BRAF V600E expression and distribution in desmoplastic infantile astrocytoma/ganglioglioma.",
  "pmid": "23822828",
  "year": "2014",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/23822828/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Ganglioglioma",
  "study": "Implications of BRAF V600E mutation in gliomas: Molecular considerations, prognostic value and treatment evolution.",
  "pmid": "36686797",
  "year": "2022",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/36686797/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Ganglioglioma",
  "study": "Co-occurrence of histone H3 K27M and BRAF V600E mutations in paediatric midline grade I ganglioglioma.",
  "pmid": "27984673",
  "year": "2018",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/27984673/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Ganglioglioma",
  "study": "Desmoplastic non-infantile astrocytoma/ganglioglioma: rare low-grade tumor with frequent BRAF V600E mutation.",
  "pmid": "29902580",
  "year": "2018",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/29902580/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma subependimário de células gigantes",
  "study": "Everolimus tablets for patients with subependymal giant cell astrocytoma.",
  "pmid": "21806479",
  "year": "2011",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/21806479/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma subependimário de células gigantes",
  "study": "Everolimus: in patients with subependymal giant cell astrocytoma associated with tuberous sclerosis complex.",
  "pmid": "22136276",
  "year": "2012",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/22136276/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma subependimário de células gigantes",
  "study": "Subependymal giant-cell astrocytoma: A surgical review in the modern era of mTOR inhibitors.",
  "pmid": "35907444",
  "year": "2022",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35907444/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma subependimário de células gigantes",
  "study": "Everolimus.",
  "pmid": "30069763",
  "year": "2018",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/30069763/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma subependimário de células gigantes",
  "study": "Everolimus.",
  "pmid": "24756805",
  "year": "2014",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/24756805/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma subependimário de células gigantes",
  "study": "Everolimus (RAD001): first systemic treatment for subependymal giant cell astrocytoma associated with tuberous sclerosis complex.",
  "pmid": "23231513",
  "year": "2012",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/23231513/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma subependimário de células gigantes",
  "study": "Título não informado no resumo PubMed",
  "pmid": "30222273",
  "year": "2017",
  "publication_types": "Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/30222273/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma subependimário de células gigantes",
  "study": "Radiotherapy for subependymal giant cell astrocytoma: time to challenge a historical ban? A case report and review of the literature.",
  "pmid": "39030575",
  "year": "2024",
  "publication_types": "Case Reports; Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39030575/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma subependimário de células gigantes",
  "study": "Pharmacological treatment strategies for subependymal giant cell astrocytoma (SEGA).",
  "pmid": "32338549",
  "year": "2020",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/32338549/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astrocitoma subependimário de células gigantes",
  "study": "Neoadjuvant Therapy with Everolimus for Subependymal Giant Cell Astrocytoma: A Case Report.",
  "pmid": "37953906",
  "year": "2023",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37953906/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astroblastoma, MN1-alterado",
  "study": "MN1 rearrangement in astroblastoma: study of eight cases and review of literature.",
  "pmid": "31111274",
  "year": "2019",
  "publication_types": "Case Reports; Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/31111274/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astroblastoma, MN1-alterado",
  "study": "MicroRNAs Expression Profile in MN1-Altered Astroblastoma.",
  "pmid": "39857696",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39857696/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astroblastoma, MN1-alterado",
  "study": "Oncogenic fusions converge on shared mechanisms in initiating astroblastoma.",
  "pmid": "40369078",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40369078/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astroblastoma, MN1-alterado",
  "study": "Astroblastoma: a distinct tumor entity characterized by alterations of the X chromosome and MN1 rearrangement.",
  "pmid": "28990708",
  "year": "2018",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/28990708/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astroblastoma, MN1-alterado",
  "study": "Brainstem astroblastoma with MN1 translocation.",
  "pmid": "30238518",
  "year": "2018",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/30238518/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astroblastoma, MN1-alterado",
  "study": "PATZ1-Rearranged Tumors of the Central Nervous System: Characterization of a Pediatric Series of Seven Cases.",
  "pmid": "38007157",
  "year": "2024",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38007157/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astroblastoma, MN1-alterado",
  "study": "Astroblastoma With a Novel YAP1::BEND2 Fusion: A Case Report.",
  "pmid": "38857191",
  "year": "2024",
  "publication_types": "Journal Article; Case Reports",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38857191/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astroblastoma, MN1-alterado",
  "study": "Spinal cord astroblastoma with EWSR1-BEND2 fusion classified as HGNET-MN1 by methylation classification: a case report.",
  "pmid": "34313881",
  "year": "2021",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/34313881/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astroblastoma, MN1-alterado",
  "study": "MN1 rearrangement detected by FISH analysis in a neuroepithelial tumor with EWSR1::PATZ1 demonstrating ependymoma-like and astroblastoma-like histology: A diagnostic pitfall.",
  "pmid": "42550886",
  "year": "2026",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/42550886/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Astroblastoma, MN1-alterado",
  "study": "Soft tissue sarcoma with MN1 gene fusions: a report of three cases with aggressive clinical behavior.",
  "pmid": "40503962",
  "year": "2025",
  "publication_types": "Journal Article; Case Reports; Research Support, Non-U.S. Gov't; Research Support, N.I.H., Extramural",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/40503962/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma cordoide",
  "study": "The chordoid glioma PRKCA D463H mutation is a kinase inactive, gain-of-function allele that induces early-onset chondrosarcoma in mice.",
  "pmid": "41187221",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/41187221/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma cordoide",
  "study": "Suprasellar masquerader: Chordoid glioma.",
  "pmid": "37675487",
  "year": "2024",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37675487/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma cordoide",
  "study": "PRKCA D463H Mutation in Chordoid Glioma of the Third Ventricle: A Cohort of 16 Cases, Including Two Cases Harboring BRAFV600E Mutation.",
  "pmid": "33085976",
  "year": "2020",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/33085976/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma cordoide",
  "study": "[Chordoid glioma: a clinicopathological study].",
  "pmid": "34344068",
  "year": "2021",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/34344068/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma cordoide",
  "study": "A recurrent kinase domain mutation in PRKCA defines chordoid glioma of the third ventricle.",
  "pmid": "29476136",
  "year": "2018",
  "publication_types": "Journal Article; Research Support, N.I.H., Extramural",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/29476136/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma cordoide",
  "study": "Chordoid glioma with uncommon papillary and fusiform structures.",
  "pmid": "39970814",
  "year": "2025",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39970814/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma cordoide",
  "study": "A recurrent point mutation in PRKCA is a hallmark of chordoid gliomas.",
  "pmid": "29915258",
  "year": "2018",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/29915258/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma cordoide",
  "study": "Molecular classification of adult gliomas: recent advances and future perspectives.",
  "pmid": "30148717",
  "year": "2018",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/30148717/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma cordoide",
  "study": "Pseudokinase-converting mutation in protein kinase C alpha drives chordoid glioma by pathway rewiring.",
  "pmid": "42441840",
  "year": "2026",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/42441840/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Glioma cordoide",
  "study": "Occurrence of Chordoid Glioma With Sodium Ion Metabolism Disorder 5 Years After Meningioma Surgery and Whole-Exome Sequencing: A Case Report and Literature Review.",
  "pmid": "34040630",
  "year": "2021",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/34040630/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal formador de rosetas",
  "study": "Rosette-forming glioneuronal tumours are midline, FGFR1-mutated tumours.",
  "pmid": "35293634",
  "year": "2022",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/35293634/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal formador de rosetas",
  "study": "FGFR1 wild-type rosette-forming glioneuronal tumours.",
  "pmid": "39167187",
  "year": "2024",
  "publication_types": "Case Reports; Letter; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39167187/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal formador de rosetas",
  "study": "Diffusely invasive supratentorial rosette-forming glioneuronal tumor: illustrative case.",
  "pmid": "37870758",
  "year": "2023",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/37870758/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal formador de rosetas",
  "study": "Clinicopathological analysis of rosette-forming glioneuronal tumors.",
  "pmid": "38388383",
  "year": "2024",
  "publication_types": "Review; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/38388383/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal formador de rosetas",
  "study": "Rosette-Forming Glioneuronal Tumor in the Pineal Region: A Series of 6 Cases and Literature Review.",
  "pmid": "34498065",
  "year": "2021",
  "publication_types": "Case Reports; Journal Article; Research Support, Non-U.S. Gov't; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/34498065/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal formador de rosetas",
  "study": "Rosette-Forming Glioneuronal Tumor in Opticochiasmatic Region-Novel Entity in New Location.",
  "pmid": "30790744",
  "year": "2019",
  "publication_types": "Case Reports; Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/30790744/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal formador de rosetas",
  "study": "FGFR1 mutations in Rosette-forming glioneuronal tumors of the fourth ventricle.",
  "pmid": "24806303",
  "year": "2014",
  "publication_types": "Journal Article",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/24806303/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal formador de rosetas",
  "study": "Rosette-forming glioneuronal tumors share a distinct DNA methylation profile and mutations in FGFR1, with recurrent co-mutation of PIK3CA and NF1.",
  "pmid": "31250151",
  "year": "2019",
  "publication_types": "Journal Article; Research Support, Non-U.S. Gov't",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/31250151/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal formador de rosetas",
  "study": "Comprehensive analysis of diverse low-grade neuroepithelial tumors with FGFR1 alterations reveals a distinct molecular signature of rosette-forming glioneuronal tumor.",
  "pmid": "32859279",
  "year": "2020",
  "publication_types": "Journal Article; Research Support, N.I.H., Extramural",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/32859279/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 },
 {
  "entity": "Tumor glioneuronal formador de rosetas",
  "study": "The Clinical and Molecular Landscape of Rosette-Forming Glioneuronal Tumors.",
  "pmid": "39457636",
  "year": "2024",
  "publication_types": "Journal Article; Review",
  "n_patients": null,
  "hr": null,
  "ci_low": null,
  "ci_high": null,
  "os_level": null,
  "evidence_level": null,
  "notes": "Tipo de publicação (revisão, relato de caso, estudo molecular/de imagem, artigo de classificação) tipicamente não reporta HR/IC95% em nível populacional; use como referência bibliográfica/mecanística, não como fonte de estatística de sobrevida.",
  "pubmed_url": "https://pubmed.ncbi.nlm.nih.gov/39457636/",
  "data_status": "não aplicável (tipo de publicação sem desfecho quantitativo agregado)"
 }
];

const ENTITY_ALIASES = {
 "astrocitoma, idh-mutante": "Astrocitoma, IDH-mutante",
 "astrocytoma": "Astrocitoma subependimário de células gigantes",
 "idh-mutant": "Astrocitoma, IDH-mutante",
 "astrocitoma": "Astrocitoma, IDH-mutante",
 "difuso": "Astrocitoma, IDH-mutante",
 "oligodendroglioma, idh-mutante e 1p/19q-codeletado": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
 "oligodendroglioma": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
 "codeleted": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
 "glioblastoma, idh-wildtype": "Glioblastoma, IDH-wildtype",
 "glioblastoma": "Glioblastoma, IDH-wildtype",
 "wildtype": "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
 "glioma difuso de linha média, h3 k27-alterado": "Glioma difuso de linha média, H3 K27-alterado",
 "diffuse": "Glioma leptomeníngeo difuso glioneuronal",
 "midline": "Glioma difuso de linha média, H3 K27-alterado",
 "glioma": "Glioma cordoide",
 "k27-altered": "Glioma difuso de linha média, H3 K27-alterado",
 "h3k27m": "Glioma difuso de linha média, H3 K27-alterado",
 "dipg": "Glioma difuso de linha média, H3 K27-alterado",
 "glioma hemisférico difuso, h3 g34-mutante": "Glioma hemisférico difuso, H3 G34-mutante",
 "hemispheric": "Glioma hemisférico infantil, tipo infantil",
 "g34-mutant": "Glioma hemisférico difuso, H3 G34-mutante",
 "h3g34r": "Glioma hemisférico difuso, H3 G34-mutante",
 "glioma difuso pediátrico de baixo grau, alterado na via mapk": "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
 "pediatric-type": "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
 "low-grade": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
 "mapk": "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
 "altered": "Glioma difuso pediátrico de baixo grau, alterado na via MAPK",
 "glioma difuso pediátrico de alto grau, h3-wildtype e idh-wildtype": "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype",
 "high-grade": "Astrocitoma de alto grau com características piloides",
 "glioma hemisférico infantil, tipo infantil": "Glioma hemisférico infantil, tipo infantil",
 "infant-type": "Glioma hemisférico infantil, tipo infantil",
 "ntrk": "Glioma hemisférico infantil, tipo infantil",
 "ros1": "Glioma hemisférico infantil, tipo infantil",
 "astrocitoma pilocítico": "Astrocitoma pilocítico",
 "pilocytic": "Astrocitoma pilocítico",
 "kiaa1549": "Glioma leptomeníngeo difuso glioneuronal",
 "braf": "Ganglioglioma",
 "astrocitoma de alto grau com características piloides": "Astrocitoma de alto grau com características piloides",
 "with": "Astrocitoma de alto grau com características piloides",
 "piloid": "Astrocitoma de alto grau com características piloides",
 "features": "Astrocitoma de alto grau com características piloides",
 "hgap": "Astrocitoma de alto grau com características piloides",
 "astrocitoma pleomórfico xanthoastrocytoma": "Astrocitoma pleomórfico xanthoastrocytoma",
 "pleomorphic": "Astrocitoma pleomórfico xanthoastrocytoma",
 "xanthoastrocytoma": "Astrocitoma pleomórfico xanthoastrocytoma",
 "v600e": "Ganglioglioma",
 "tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (plnty)": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
 "plnty": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
 "polymorphous": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
 "neuroepithelial": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
 "tumor": "Tumor glioneuronal formador de rosetas",
 "young": "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)",
 "glioma angiocêntrico": "Glioma angiocêntrico",
 "angiocentric": "Glioma angiocêntrico",
 "glioma leptomeníngeo difuso glioneuronal": "Glioma leptomeníngeo difuso glioneuronal",
 "leptomeningeal": "Glioma leptomeníngeo difuso glioneuronal",
 "glioneuronal": "Tumor glioneuronal formador de rosetas",
 "dlgnt": "Glioma leptomeníngeo difuso glioneuronal",
 "deletion": "Glioma leptomeníngeo difuso glioneuronal",
 "tumor glioneuronal mixoide": "Tumor glioneuronal mixoide",
 "myxoid": "Tumor glioneuronal mixoide",
 "pdgfra": "Tumor glioneuronal mixoide",
 "ganglioglioma": "Ganglioglioma",
 "epilepsy-associated": "Ganglioglioma",
 "astrocitoma subependimário de células gigantes": "Astrocitoma subependimário de células gigantes",
 "subependymal": "Astrocitoma subependimário de células gigantes",
 "giant": "Astrocitoma subependimário de células gigantes",
 "cell": "Astrocitoma subependimário de células gigantes",
 "sega": "Astrocitoma subependimário de células gigantes",
 "tsc1": "Astrocitoma subependimário de células gigantes",
 "tsc2": "Astrocitoma subependimário de células gigantes",
 "astroblastoma, mn1-alterado": "Astroblastoma, MN1-alterado",
 "astroblastoma": "Astroblastoma, MN1-alterado",
 "mn1-altered": "Astroblastoma, MN1-alterado",
 "glioma cordoide": "Glioma cordoide",
 "chordoid": "Glioma cordoide",
 "prkca": "Glioma cordoide",
 "dicer1": "Glioma cordoide",
 "tumor glioneuronal formador de rosetas": "Tumor glioneuronal formador de rosetas",
 "rosette-forming": "Tumor glioneuronal formador de rosetas",
 "rgnt": "Tumor glioneuronal formador de rosetas",
 "pik3ca": "Tumor glioneuronal formador de rosetas",
 "gbm": "Glioblastoma, IDH-wildtype",
 "mgmt": "Glioblastoma, IDH-wildtype",
 "1p/19q": "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado",
 "h3 g34": "Glioma hemisférico difuso, H3 G34-mutante",
 "braf v600e": "Astrocitoma pleomórfico xanthoastrocytoma"
};

const INTENTS = {
 "biomarkers": [
  "biomarcador",
  "biomarcadores",
  "marcador",
  "molecular",
  "mutação",
  "alteração",
  "fusão",
  "metilação",
  "gene"
 ],
 "prognosis": [
  "prognóstico",
  "sobrevida",
  "sobrevida global",
  "os",
  "pfs",
  "recorrência",
  "risco"
 ],
 "treatment": [
  "tratamento",
  "terapia",
  "temozolomida",
  "pcv",
  "radioterapia",
  "everolimo",
  "inibidor",
  "cirurgia"
 ],
 "age": [
  "idade",
  "pediátrico",
  "pediátrica",
  "criança",
  "crianças",
  "idoso",
  "idosos",
  "adulto jovem",
  "lactente"
 ]
};

if (typeof module !== 'undefined') module.exports = { DATA, STUDIES, ENTITY_ALIASES, INTENTS };
