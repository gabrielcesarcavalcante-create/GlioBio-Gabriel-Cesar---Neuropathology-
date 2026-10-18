// =====================================================================
// biomarkers.js — Catálogo curado de biomarcadores
// Cada biomarcador traz: descrição em linguagem simples + técnica,
// classes de uso, efeito prognóstico e a associação percentual típica
// com cada glioma da base (prevalência da alteração na entidade).
// As porcentagens são faixas típicas da literatura (OMS CNS5, EANO,
// NCI PDQ, TCGA e coortes moleculares) e variam entre séries.
// =====================================================================

const BIOMARKERS = [
  {
    id: "idh12", name: "IDH1 / IDH2", short: "IDH",
    klass: ["Diagnóstico", "Prognóstico"],
    match: [/idh1/i, /idh2/i, /idh\s*mut/i, /idh-mutante/i],
    test: "Imuno-histoquímica (IDH1 R132H) e sequenciamento de IDH1/IDH2; confirmação por metilação de DNA.",
    plain: "É a 'chave' que separa os gliomas em dois grandes grupos. Quem tem a mutação costuma viver bem mais.",
    description: "Os genes IDH1 e IDH2 produzem uma enzima do metabolismo celular. Mutações nos códons R132 (IDH1) ou R172 (IDH2) fazem a enzima produzir 2-hidroxiglutarato, que altera a forma como o DNA é lido e desencadeia um programa tumoral característico (fenótipo G-CIMP). A presença da mutação define as entidades 'IDH-mutantes' da OMS CNS5 e é o marcador prognóstico individual mais forte nos gliomas difusos do adulto: pacientes com glioma IDH-mutante têm sobrevida significativamente maior do que os com tumor IDH-wildtype de aparência histológica semelhante. Em crianças e adolescentes, mutações de IDH são raras (<5% dos gliomas pediátricos).",
    effect: "favoravel", effectLabel: "Presença = melhor prognóstico",
    assoc: [
      { entity: "Astrocitoma, IDH-mutante", pct: 100, level: "definidor", note: "Critério obrigatório da entidade" },
      { entity: "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado", pct: 100, level: "definidor", note: "Critério obrigatório junto com a codeleção 1p/19q" },
      { entity: "Glioblastoma, IDH-wildtype", pct: 0, level: "ausente", note: "Por definição IDH-wildtype; tumores IDH-mutantes de alto grau hoje são 'astrocitoma IDH-mutante grau 4'" },
      { entity: "Glioma hemisférico difuso, H3 G34-mutante", pct: 0, level: "ausente", note: "IDH-wildtype por definição" },
      { entity: "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype", pct: 0, level: "ausente", note: "IDH-wildtype por definição" }
    ],
    refs: ["WHO CNS5 (2021)", "EANO — painel de marcadores diagnósticos", "TCGA Glioma (NEJM 2015)", "Base interna: PMIDs 26061753; 34797757"]
  },
  {
    id: "codel", name: "Codeleção 1p/19q", short: "1p/19q",
    klass: ["Diagnóstico", "Prognóstico", "Preditivo"],
    match: [/1p\/19q/i, /codele/i],
    test: "FISH, hibridização comparativa, LOH por PCR ou perfil de metilação/CNV.",
    plain: "É a perda de dois pedaços inteiros dos cromossomos 1 e 19. Quando aparece junto com IDH mutado, confirma oligodendroglioma — o glioma de melhor prognóstico.",
    description: "A codeleção 1p/19q resulta de uma translocação desbalanceada t(1;19) seguida da perda dos braços 1p e 19q. É requisito molecular para o diagnóstico de oligodendroglioma IDH-mutante e 1p/19q-codeletado na OMS CNS5. Além de diagnóstica, é fortemente prognóstica e preditiva: nos ensaios RTOG 9402 e EORTC 26951, apenas os tumores codeletados tiveram benefício duradouro da associação de radioterapia com quimioterapia PCV, com mediana de sobrevida global em torno de 14,7 anos nesse subgrupo. A presença de codeleção torna muito improvável a linhagem astrocitária (que se caracteriza por perda de ATRX e mutação de TP53).",
    effect: "favoravel", effectLabel: "Presença = melhor prognóstico e benefício de RT+PCV",
    assoc: [
      { entity: "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado", pct: 100, level: "definidor", note: "Critério obrigatório; perda de braços inteiros (não deleções parciais)" },
      { entity: "Astrocitoma, IDH-mutante", pct: 0, level: "ausente", note: "Mutuamente excludente com a linhagem astrocitária (ATRX/TP53)" }
    ],
    refs: ["Buckner NEJM 2016 (RTOG 9402)", "Cairncross JCO 2014 (EORTC 26951)", "WHO CNS5 (2021)"]
  },
  {
    id: "tert", name: "Promotor de TERT", short: "TERTp",
    klass: ["Diagnóstico", "Prognóstico"],
    match: [/tert/i],
    test: "Sequenciamento Sanger/NGS da região promotora (C228T, C250T).",
    plain: "Mutações que 'religam' a enzima que mantém os telômeros, permitindo que a célula tumoral se divida para sempre.",
    description: "Mutações no promotor de TERT (principalmente C228T e C250T) aumentam a expressão da telomerase e conferem imortalidade replicativa. Têm valor diagnóstico decisivo: ocorrem em cerca de 70% dos glioblastomas IDH-wildtype (critério molecular de malignidade na OMS CNS5, mesmo sem anaplasia histológica) e em mais de 95% dos oligodendrogliomas 1p/19q-codeletados. Em contraste, são raras (~6%) no astrocitoma IDH-mutante — a ausência de mutação de TERT, na presença de IDH mutado, favorece fortemente o diagnóstico de astrocitoma. O significado prognóstico depende do contexto: no oligodendroglioma acompanha um tumor de bom prognóstico; no glioma IDH-wildtype acompanha biologia agressiva.",
    effect: "misto", effectLabel: "Depende do contexto molecular (favorável no oligodendroglioma, desfavorável no glioma IDH-wildtype)",
    assoc: [
      { entity: "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado", pct: 96, level: "definidor", note: "> 95% (EANO); coortes relatam até 100%" },
      { entity: "Glioblastoma, IDH-wildtype", pct: 70, level: "frequente", note: "≈70%; um dos três critérios moleculares de GBM IDH-wt" },
      { entity: "Astrocitoma, IDH-mutante", pct: 6, level: "ocasional", note: "≈6%; quando presente, revisar diagnóstico (possível oligodendroglioma)" }
    ],
    refs: ["EANO — TERTp em ~70% dos GBM e >95% dos oligodendrogliomas", "Sci Rep 2023;13 (perfis genômicos de gliomas IDH-mutantes)", "WHO CNS5 (2021)"]
  },
  {
    id: "mgmt", name: "Metilação do promotor de MGMT", short: "MGMT",
    klass: ["Preditivo", "Prognóstico"],
    match: [/mgmt/i],
    test: "PCR metilação-específica (MSP), pirosequenciamento ou arrays de metilação; cutoffs variam entre laboratórios.",
    plain: "Quando o gene MGMT está 'desligado' por metilação, o tumor não consegue reparar o dano causado pela quimioterapia — e o tratamento funciona melhor.",
    description: "MGMT codifica uma enzima de reparo que remove as lesões causadas por agentes alquilantes, como a temozolomida. A metilação do promotor silencia o gene e torna o tumor mais sensível à quimioterapia. No glioblastoma IDH-wildtype, o promotor está metilado em cerca de 30–45% dos casos (algumas séries até 60%, dependendo do método e do cutoff). No estudo de Hegi (NEJM 2005), pacientes com MGMT metilado tratados com temozolomida tiveram mediana de sobrevida de 21,7 meses contra 15,3 meses dos não metilados — é o principal biomarcador preditivo usado na prática. Em gliomas IDH-mutantes, a metilação de MGMT é muito mais frequente (>90%) como parte do fenótipo G-CIMP, o que reduz seu valor discriminativo nesse grupo. A diretriz do College of American Pathologists recomenda testar MGMT em todo glioblastoma IDH-wildtype.",
    effect: "favoravel", effectLabel: "Metilado = maior benefício com temozolomida",
    assoc: [
      { entity: "Glioblastoma, IDH-wildtype", pct: 40, level: "frequente", note: "≈30–45% (faixa 30–60% conforme método/cutoff)" },
      { entity: "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado", pct: 95, level: "definidor", note: "≈96% — reflexo do fenótipo G-CIMP dos gliomas IDH-mutantes" },
      { entity: "Astrocitoma, IDH-mutante", pct: 88, level: "frequente", note: "Frequente por G-CIMP; menor valor preditivo isolado" }
    ],
    refs: ["Hegi NEJM 2005 (PMID 15758010)", "Cancer Drug Resist 2020 (PMC7315323): 30–60% dos GBM", "Sci Rep 2023;13: 95,9% nos oligodendrogliomas", "CAP/EANO"]
  },
  {
    id: "tp53", name: "TP53", short: "TP53",
    klass: ["Diagnóstico", "Prognóstico"],
    match: [/tp53/i],
    test: "Imuno-histoquímica (superexpressão ou ausência total) e sequenciamento.",
    plain: "O 'guardião do genoma'. Quando está mutado, a célula perde o freio que a impediria de virar tumor.",
    description: "TP53 é o supressor tumoral mais frequentemente mutado em cânceres humanos. Nos gliomas, sua mutação é característica da linhagem astrocitária IDH-mutante, ocorrendo em cerca de 85–90% dos astrocitomas IDH-mutantes, quase sempre em conjunto com perda de ATRX. A combinação IDH mutado + TP53 mutado + ATRX perdido define o espectro astrocitário, enquanto a presença de codeleção 1p/19q com TP53 selvagem aponta para oligodendroglioma. Mutações de TP53 também são frequentes no glioma hemisférico difuso H3 G34-mutante. Isoladamente, TP53 tem valor prognóstico limitado; seu papel principal é de classificação diagnóstica.",
    effect: "neutro", effectLabel: "Marcador de linhagem astrocitária (valor prognóstico isolado limitado)",
    assoc: [
      { entity: "Astrocitoma, IDH-mutante", pct: 86, level: "definidor", note: "86,3% em coorte molecular (Sci Rep 2023)" },
      { entity: "Glioma hemisférico difuso, H3 G34-mutante", pct: 80, level: "frequente", note: "Frequente junto com perda de ATRX" },
      { entity: "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado", pct: 5, level: "ocasional", note: "Raro; sugere revisar o diagnóstico" }
    ],
    refs: ["Sci Rep 2023;13 (TP53 em 86,3% dos astrocitomas IDH-mutantes)", "NCCN/EANO", "WHO CNS5 (2021)"]
  },
  {
    id: "atrx", name: "ATRX (perda de expressão)", short: "ATRX",
    klass: ["Diagnóstico"],
    match: [/atrx/i],
    test: "Imuno-histoquímica: perda de expressão nuclear (com controle interno positivo).",
    plain: "A perda da proteína ATRX no núcleo é uma 'impressão digital' dos astrocitomas IDH-mutantes.",
    description: "ATRX é uma proteína de remodelação da cromatina. Sua perda nuclear por imuno-histoquímica indica mutação do gene e está presente em cerca de 80–90% dos astrocitomas IDH-mutantes, sendo praticamente ausente nos oligodendrogliomas 1p/19q-codeletados (as duas alterações são quase sempre mutuamente exclusivas). Segundo a EANO, a perda de ATRX em um glioma IDH-mutante é diagnóstica de linhagem astrocitária. A perda de ATRX também ocorre no glioma hemisférico difuso H3 G34-mutante e no astrocitoma de alto grau com características piloides (HGAP). A perda leva ao mecanismo alternativo de manutenção de telômeros (ALT).",
    effect: "neutro", effectLabel: "Marcador de linhagem astrocitária",
    assoc: [
      { entity: "Astrocitoma, IDH-mutante", pct: 82, level: "definidor", note: "82,1% em coorte molecular (Sci Rep 2023)" },
      { entity: "Glioma hemisférico difuso, H3 G34-mutante", pct: 85, level: "frequente", note: "Perda nuclear frequente" },
      { entity: "Astrocitoma de alto grau com características piloides", pct: 60, level: "frequente", note: "Perda frequente de ATRX/CDKN2A/B na classe HGAP" },
      { entity: "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado", pct: 2, level: "ausente", note: "Expressão nuclear preservada; perda sugere astrocitoma" }
    ],
    refs: ["EANO/NCCN — perda de ATRX em glioma IDH-mutante é diagnóstica de linhagem astrocitária", "Sci Rep 2023;13", "Reinhardt 2018 (HGAP)"]
  },
  {
    id: "cdkn2ab", name: "Deleção homozigótica CDKN2A/B", short: "CDKN2A/B",
    klass: ["Prognóstico", "Classificação molecular"],
    match: [/cdkn2a/i],
    test: "CNV por array/NGS ou perfil de metilação; p16 por imuno-histoquímica como rastreio.",
    plain: "Perda dos dois 'freios' do ciclo celular. Em um astrocitoma IDH-mutante, isso já basta para classificá-lo como grau 4.",
    description: "CDKN2A e CDKN2B codificam inibidores do ciclo celular (p16/p15). A deleção homozigótica (bialélica) remove esse freio e está associada a comportamento agressivo. Desde o cIMPACT-NOW update 5, incorporado à OMS CNS5, a deleção homozigótica de CDKN2A/B em um astrocitoma IDH-mutante atribui grau 4 à doença mesmo na ausência de necrose ou proliferação microvascular — mudando radicalmente o prognóstico estimado. Também é frequente em glioblastoma (~50–60%), no astrocitoma pleomórfico xantoastrocítico (inclusive como marcador de anaplasia), no HGAP e em gliomas pediátricos de alto grau.",
    effect: "desfavoravel", effectLabel: "Presença = pior prognóstico / eleva o grau",
    assoc: [
      { entity: "Astrocitoma, IDH-mutante", pct: 15, level: "ocasional", note: "10–20%; quando presente define grau 4 (cIMPACT-NOW 5)" },
      { entity: "Glioblastoma, IDH-wildtype", pct: 55, level: "frequente", note: "≈50–60%" },
      { entity: "Astrocitoma pleomórfico xanthoastrocytoma", pct: 55, level: "frequente", note: "Frequente; associada a anaplasia e maior risco" },
      { entity: "Astrocitoma de alto grau com características piloides", pct: 55, level: "frequente", note: "Perda frequente na classe de metilação HGAP" },
      { entity: "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype", pct: 50, level: "frequente", note: "Alterações de supressores tumorais em subgrupos" },
      { entity: "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)", pct: 10, level: "ocasional", note: "Rara; descrita em casos com comportamento mais agressivo" }
    ],
    refs: ["cIMPACT-NOW update 5", "EANO — CDKN2A/B como marcador de grau 4", "WHO CNS5 (2021)", "Reinhardt 2018"]
  },
  {
    id: "egfr", name: "Amplificação de EGFR / EGFRvIII", short: "EGFR",
    klass: ["Diagnóstico", "Prognóstico"],
    match: [/egfr/i],
    test: "FISH/CNV por NGS; EGFRvIII por RT-PCR ou sequenciamento de RNA.",
    plain: "Cópias em excesso de um gene que manda a célula proliferar. Ajuda a confirmar glioblastoma mesmo quando a biópsia parece 'pouco agressiva'.",
    description: "EGFR é um receptor de fatores de crescimento. Sua amplificação ocorre em cerca de 40–50% dos glioblastomas IDH-wildtype e, na OMS CNS5, é um dos três critérios moleculares que permitem diagnosticar glioblastoma grau 4 em um glioma difuso IDH-wildtype de aparência histológica menos agressiva (os outros são mutação do promotor de TERT e a assinatura +7/−10). A variante de deleção EGFRvIII é a mais comum e foi alvo de vacinas e terapias específicas, sem benefício consistente até o momento. Amplificação/mutação de EGFR também aparece em subgrupos de gliomas pediátricos de alto grau (RTK1).",
    effect: "desfavoravel", effectLabel: "Amplificação = biologia agressiva",
    assoc: [
      { entity: "Glioblastoma, IDH-wildtype", pct: 45, level: "frequente", note: "≈40–50% (EANO); critério molecular da entidade" },
      { entity: "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype", pct: 25, level: "ocasional", note: "Subgrupo RTK1 (alterações de EGFR/PDGFRA/MYCN)" }
    ],
    refs: ["EANO — EGFR ampl. em ~40–50% dos GBM IDH-wt", "WHO CNS5 (2021)", "TCGA GBM"]
  },
  {
    id: "plus7minus10", name: "Assinatura +7/−10", short: "+7/−10",
    klass: ["Diagnóstico"],
    match: [/\+7/, /chr 10 loss/i, /10 loss/i],
    test: "Perfil de CNV (array/SNP-array/NGS) ou inferida por perfil de metilação de DNA.",
    plain: "Ganho de todo o cromossomo 7 junto com perda de todo o cromossomo 10 — um padrão 'assinatura' do glioblastoma.",
    description: "A combinação de ganho do cromossomo 7 e perda do cromossomo 10 (+7/−10) é uma alteração cromossômica característica do glioblastoma IDH-wildtype e, isoladamente, já é suficiente como critério molecular de grau 4 na OMS CNS5 em um glioma difuso IDH-wildtype do adulto. Está presente na maioria dos glioblastomas (~70–80%) e é detectada de forma confiável por arrays de CNV ou por classificação baseada em metilação de DNA. Sua importância prática é permitir o diagnóstico de glioblastoma em biópsias com histologia de baixo grau, evitando subtratamento.",
    effect: "desfavoravel", effectLabel: "Critério molecular de glioblastoma grau 4",
    assoc: [
      { entity: "Glioblastoma, IDH-wildtype", pct: 75, level: "frequente", note: "≈70–80%; critério molecular suficiente para grau 4" }
    ],
    refs: ["EANO — assinatura +7/−10 como marcador de GBM IDH-wt", "WHO CNS5 (2021)", "cIMPACT-NOW update 3"]
  },
  {
    id: "cic", name: "CIC", short: "CIC",
    klass: ["Diagnóstico", "Prognóstico"],
    match: [/\bcic\b/i],
    test: "Sequenciamento (NGS) e imuno-histoquímica de apoio.",
    plain: "Gene supressor de tumor perdido com frequência no oligodendroglioma.",
    description: "CIC (capiccia) é um repressor transcricional cuja inativação é a segunda alteração mais comum no oligodendroglioma IDH-mutante e 1p/19q-codeletado, presente em cerca de 70–80% dos casos (75,7% em coorte molecular recente). Frequentemente ocorre em conjunto com mutação de FUBP1 — juntas, CIC e/ou FUBP1 são detectadas em mais de 90% dos oligodendrogliomas. Sua presença reforça o diagnóstico e, indiretamente, o perfil de bom prognóstico associado à entidade, embora o valor prognóstico independente ainda seja debatido.",
    effect: "neutro", effectLabel: "Reforça o diagnóstico de oligodendroglioma",
    assoc: [
      { entity: "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado", pct: 76, level: "frequente", note: "75,7% (Sci Rep 2023)" }
    ],
    refs: ["Sci Rep 2023;13 — CIC 75,7% / FUBP1 45,9%", "TCGA Lower-grade glioma (NEJM 2015)"]
  },
  {
    id: "fubp1", name: "FUBP1", short: "FUBP1",
    klass: ["Diagnóstico"],
    match: [/fubp1/i],
    test: "Sequenciamento (NGS).",
    plain: "Outro gene comumente mutado no oligodendroglioma; ajuda a fechar o diagnóstico molecular.",
    description: "FUBP1 (far-upstream element binding protein 1) é um regulador transcricional localizado em 1p. Sua mutação ocorre em cerca de 40–50% dos oligodendrogliomas IDH-mutantes e 1p/19q-codeletados e raramente em outros gliomas, o que lhe confere valor diagnóstico de apoio. Junto com CIC, forma o par de alterações mais característico da entidade após IDH e codeleção 1p/19q.",
    effect: "neutro", effectLabel: "Marcador de apoio diagnóstico",
    assoc: [
      { entity: "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado", pct: 46, level: "frequente", note: "45,9% (Sci Rep 2023)" }
    ],
    refs: ["Sci Rep 2023;13", "TCGA Lower-grade glioma (NEJM 2015)"]
  },
  {
    id: "h3k27", name: "H3 K27 (H3-3A K27M / EZHIP)", short: "H3 K27",
    klass: ["Diagnóstico", "Prognóstico"],
    match: [/k27m/i, /ezhip/i, /h3-3a/i, /hist1h3b/i],
    test: "IHC com anticorpo H3 K27M; sequenciamento de H3-3A/H3C2 (HIST1H3B/C); IHC de EZHIP; perda de H3K27me3.",
    plain: "Uma única troca de letra em um gene de histona — a proteína que empacota o DNA — muda completamente o comportamento do tumor na linha média do cérebro.",
    description: "A mutação K27M em genes de histona H3 (H3-3A, H3C2/HIST1H3B, H3C3) reduz globalmente a trimetilação de H3K27 e reprograma o desenvolvimento de células precursoras da glia. É a alteração definidora do glioma difuso de linha média H3 K27-alterado, entidade de grau 4 na OMS CNS5 qualquer que seja a aparência histológica. O termo 'K27-alterado' também inclui tumores com superexpressão de EZHIP (inibidor endógeno de PRC2) e gliomas com perda isolada de H3K27me3. A mutação está presente em cerca de 60–80% dos gliomas difusos de linha média pediátricos (ponte, tálamo, medula), incluindo a maior parte dos antigos DIPG, e confere prognóstico muito ruim, com mediana de sobrevida em torno de 9–12 meses.",
    effect: "desfavoravel", effectLabel: "Define entidade de grau 4 com prognóstico muito desfavorável",
    assoc: [
      { entity: "Glioma difuso de linha média, H3 K27-alterado", pct: 75, level: "definidor", note: "≈60–80% (H3 K27M); o restante por EZHIP/perda de H3K27me3" }
    ],
    refs: ["WHO CNS5 (2021)", "NCI PDQ — DMG em ponte, tálamo e medula", "Wu/Cancer Cell 2014 e Schwartzentruber 2012 (descoberta da K27M)"]
  },
  {
    id: "h3k27me3", name: "Perda de H3K27me3 (imuno-histoquímica)", short: "H3K27me3",
    klass: ["Diagnóstico"],
    match: [/h3k27me3/i],
    test: "Imuno-histoquímica com anticorpo anti-H3K27me3 (perda nuclear com controle interno positivo).",
    plain: "Exame de coloração que mostra se a marca química H3K27me3 sumiu do núcleo — sinal de que o tumor é 'K27-alterado'.",
    description: "A perda global da trimetilação de H3K27 (H3K27me3) é a consequência funcional da mutação K27M e da superexpressão de EZHIP. Por ser detectável em imuno-histoquímica de rotina, é um teste de triagem barato e rápido para gliomas de linha média suspeitos de DMG. A interpretação exige controle interno positivo (endotélio e linfócitos) para evitar falsos negativos, e a perda também pode ocorrer em tumores não relacionados (por exemplo, após radioterapia), exigindo correlação com sequenciamento e classe de metilação.",
    effect: "desfavoravel", effectLabel: "Triagem para glioma difuso de linha média H3 K27-alterado",
    assoc: [
      { entity: "Glioma difuso de linha média, H3 K27-alterado", pct: 85, level: "frequente", note: "Perda nuclear na maioria dos casos K27M e EZHIP-positivos" }
    ],
    refs: ["WHO CNS5 (2021)", "Davidson et al., Acta Neuropathol 2019 (validação do anticorpo H3K27me3)"]
  },
  {
    id: "h3g34", name: "H3-3A G34R/V", short: "H3 G34",
    klass: ["Diagnóstico", "Prognóstico"],
    match: [/g34/i],
    test: "Sequenciamento de H3-3A; IHC específica para G34R/V.",
    plain: "Outra mutação em histona, mas em uma posição diferente (G34) e nos hemisférios cerebrais de adolescentes e adultos jovens.",
    description: "As mutações G34R/G34V no gene H3-3A (H3F3A) definem o glioma hemisférico difuso H3 G34-mutante, entidade de grau 4 da OMS CNS5 que acomete tipicamente adolescentes e adultos jovens. Ao contrário da K27M, que reduz H3K27me3 globalmente, a G34 altera a regulação local da cromatina e costuma vir acompanhada de mutação de TP53 e perda de ATRX, além de frequentes ganhos de PDGFRA/MYCCN. São tumores grandes, corticais/subcorticais, com prognóstico ruim, mas que se beneficiam de ressecção máxima e radioterapia.",
    effect: "desfavoravel", effectLabel: "Define glioma hemisférico difuso de grau 4",
    assoc: [
      { entity: "Glioma hemisférico difuso, H3 G34-mutante", pct: 100, level: "definidor", note: "Critério obrigatório da entidade" }
    ],
    refs: ["WHO CNS5 (2021)", "EANO — G34R/V como característica definidora", "Sturm et al., Cell 2012"]
  },
  {
    id: "brafv600e", name: "BRAF V600E", short: "BRAF V600E",
    klass: ["Diagnóstico", "Preditivo"],
    match: [/braf v600e/i, /v600e/i],
    test: "IHC com anticorpo VE1 e/ou sequenciamento (NGS ou PCR).",
    plain: "Um 'interruptor ligado para sempre' no crescimento celular. O importante: existem remédios que desligam esse interruptor.",
    description: "A mutação V600E no gene BRAF ativa constitutivamente a via MAPK. É encontrada em 60–70% dos astrocitomas pleomórficos xantoastrocíticos, em 5–20% dos gangliogliomas, em uma fração dos PLNTY e dos gliomas difusos pediátricos de baixo grau, sendo rara nos gliomas difusos do adulto. Tem valor preditivo direto: a combinação de inibidor de BRAF (dabrafenibe, vemurafenibe) com inibidor de MEK (trametinibe) produz respostas objetivas duradouras em gliomas de baixo grau pediátricos BRAF V600E (estudo de fase 2 publicado no NEJM em 2022) e é recomendada como opção em casos progressivos ou de ressecção inviável.",
    effect: "favoravel", effectLabel: "Alvo terapêutico acionável (inibidores de BRAF/MEK)",
    assoc: [
      { entity: "Astrocitoma pleomórfico xanthoastrocytoma", pct: 65, level: "frequente", note: "≈60–70%" },
      { entity: "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)", pct: 25, level: "ocasional", note: "Subconjunto; o mais comum são fusões FGFR2/3" },
      { entity: "Glioma difuso pediátrico de baixo grau, alterado na via MAPK", pct: 15, level: "ocasional", note: "≈10–20% dos pLGG" },
      { entity: "Ganglioglioma", pct: 12, level: "ocasional", note: "≈5–20%" },
      { entity: "Astrocitoma pilocítico", pct: 8, level: "ocasional", note: "≈5–15%; a fusão KIAA1549::BRAF é muito mais comum" }
    ],
    refs: ["Kieran et al., NEJM 2023 (dabrafenibe + trametinibe em pLGG)", "NICE/EANO — teste de BRAF recomendado", "WHO CNS5 (2021)"]
  },
  {
    id: "kiaa1549braf", name: "Fusão KIAA1549::BRAF", short: "KIAA1549::BRAF",
    klass: ["Diagnóstico", "Preditivo"],
    match: [/kiaa1549/i],
    test: "FISH de quebra de BRAF, RT-PCR, sequenciamento de RNA ou perfil de metilação.",
    plain: "Dois genes colados um no outro por um erro de rearranjo. É a marca registrada do astrocitoma pilocítico do cerebelo.",
    description: "A fusão KIAA1549::BRAF resulta de duplicação em tandem no cromossomo 7q34 e é a alteração mais frequente do astrocitoma pilocítico, presente em 60–70% dos casos cerebelares (menor frequência em outras localizações). Mantém o domínio quinase de BRAF ativo e dependente de sinalização upstream, o que explica por que inibidores de BRAF de primeira geração (como vemurafenibe) podem paradoxalmente ativar a via — devendo-se preferir inibidores de MEK (selumetinibe, trametinibe) ou inibidores de BRAF de segunda geração. Também é detectada no tumor leptomeníngeo glioneuronal difuso, em geral com deleção de 1p.",
    effect: "favoravel", effectLabel: "Confirma entidade de baixo grau; alvo para inibidor de MEK",
    assoc: [
      { entity: "Astrocitoma pilocítico", pct: 65, level: "definidor", note: "≈60–70% nos pilocíticos cerebelares" },
      { entity: "Glioma leptomeníngeo difuso glioneuronal", pct: 70, level: "frequente", note: "Frequente, tipicamente com deleção isolada de 1p" }
    ],
    refs: ["Jones et al., Cancer Res 2008 (descoberta da fusão)", "Grossi/Ablain — inibidores de MEK em pLGG", "WHO CNS5 (2021)"]
  },
  {
    id: "fgfr", name: "FGFR1 / FGFR2 / FGFR3", short: "FGFR",
    klass: ["Diagnóstico", "Preditivo"],
    match: [/fgfr/i],
    test: "NGS de DNA/RNA (fusões e mutações) e perfil de metilação.",
    plain: "Receptores de fatores de crescimento alterados em vários tumores de baixo grau — também com medicamentos alvo disponíveis.",
    description: "Alterações em FGFR1 (mutações, ITD, fusões) caracterizam um espectro de tumores neuroepiteliomais de baixo grau, incluindo tumor glioneuronal formador de rosetas, ganglioglioma, gliomas difusos pediátricos de baixo grau e displasias. Fusões de FGFR2 e FGFR3 (por exemplo FGFR3::TACC3) são o achado molecular mais comum do PLNTY. Como a via converge para MAPK, inibidores de FGFR e de MEK são opções terapêuticas em casos progressivos ou inoperáveis.",
    effect: "favoravel", effectLabel: "Alvo acionável; típico de tumores de baixo grau",
    assoc: [
      { entity: "Tumor glioneuronal formador de rosetas", pct: 65, level: "frequente", note: "FGFR1 mutação/ITD em ~50–80%" },
      { entity: "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)", pct: 45, level: "frequente", note: "Fusões FGFR2/FGFR3 são a alteração mais comum" },
      { entity: "Glioma difuso pediátrico de baixo grau, alterado na via MAPK", pct: 20, level: "ocasional", note: "FGFR1 ITD/mutação em subgrupo" },
      { entity: "Ganglioglioma", pct: 15, level: "ocasional", note: "Alterações de FGFR1 em subconjunto" }
    ],
    refs: ["Huse et al., Acta Neuropathol 2017 (PLNTY)", "Jones/Sahm — FGFR1 em tumores de baixo grau", "WHO CNS5 (2021)"]
  },
  {
    id: "ntrk", name: "Fusões NTRK1/2/3", short: "NTRK",
    klass: ["Diagnóstico", "Preditivo"],
    match: [/ntrk/i],
    test: "IHC de pan-TRK, sequenciamento de RNA ou NGS; confirmação por FISH.",
    plain: "Fusões raras, mas muito importantes: existem medicamentos (larotrectinibe, entrectinibe) que funcionam em qualquer tumor que as tenha.",
    description: "Fusões envolvendo NTRK1, NTRK2 ou NTRK3 ativam constitutivamente a sinalização de TRK. No sistema nervoso central, são típicas do glioma hemisférico infantil (juntamente com fusões de ALK, ROS1 e MET) e aparecem em pequena fração dos gliomas de baixo grau pediátricos. Inibidores de TRK (larotrectinibe e entrectinibe) produzem respostas altas e duradouras nesses tumores, com benefício clínico especialmente relevante em lactentes, em que se busca evitar ou retardar radioterapia. É um exemplo clássico de biomarcador 'agnóstico de tumor'.",
    effect: "favoravel", effectLabel: "Alvo de larotrectinibe/entrectinibe (respostas duradouras)",
    assoc: [
      { entity: "Glioma hemisférico infantil, tipo infantil", pct: 35, level: "frequente", note: "Subtipo NTRK-alterado; fusões RTK totais em ~70–90% dos casos" },
      { entity: "Glioma difuso pediátrico de baixo grau, alterado na via MAPK", pct: 3, level: "ocasional", note: "≈2–3% dos pLGG" }
    ],
    refs: ["Dunker et al., JCO 2021 (glioma hemisférico infantil)", "Drilon et al., NEJM 2018 (larotrectinibe)", "WHO CNS5 (2021)"]
  },
  {
    id: "rtkfusions", name: "Fusões ALK / ROS1 / MET", short: "ALK·ROS1·MET",
    klass: ["Diagnóstico", "Preditivo"],
    match: [/\balk\b/i, /ros1/i, /met fusions/i, /\bmet\b/i],
    test: "Sequenciamento de RNA/NGS (painel de fusões); FISH de confirmação.",
    plain: "Assim como as fusões NTRK, são 'alvos prontos' — vários medicamentos aprovados para câncer de pulmão funcionam nesses tumores cerebrais infantis.",
    description: "O glioma hemisférico infantil é definido pela presença de fusões de receptores tirosina-quinase: NTRK1/2/3, ROS1, ALK ou MET. Esses tumores surgem no primeiro ano de vida, formam massas hemisféricas volumosas e, apesar da histologia de alto grau, têm desfecho relativamente favorável — sobretudo quando tratados com inibidores específicos (entrectinibe/larotrectinibe para NTRK-ROS1-ALK, crizotinibe/lorlatinibe para ALK-ROS1-MET, capmatinibe/tepotinibe para MET). O uso desses inibidores permitiu, em várias séries, adiar ou evitar radioterapia em lactentes, reduzindo sequelas cognitivas de longo prazo.",
    effect: "favoravel", effectLabel: "Alvos acionáveis com inibidores já disponíveis",
    assoc: [
      { entity: "Glioma hemisférico infantil, tipo infantil", pct: 55, level: "definidor", note: "Fusões ALK/ROS1/MET + NTRK definem a entidade (70–90% com fusão RTK)" }
    ],
    refs: ["Dunker et al., JCO 2021; Cancers 2019", "WHO CNS5 (2021)", "NCI PDQ — fusões RTK no glioma infantil"]
  },
  {
    id: "myb", name: "MYB / MYBL1 (fusão MYB::QKI)", short: "MYB",
    klass: ["Diagnóstico", "Prognóstico"],
    match: [/myb/i],
    test: "Sequenciamento de RNA/NGS, FISH de quebra de MYB, perfil de metilação.",
    plain: "Alterações nesses genes definem tumores muito indolentes, como o glioma angiocêntrico.",
    description: "MYB e MYBL1 são fatores de transcrição. Rearranjos envolvendo esses genes — em especial a fusão MYB::QKI — são a alteração característica do glioma angiocêntrico, presentes em cerca de 90% dos casos, e definem a entidade 'astrocitoma difuso MYB- ou MYBL1-alterado' (grau 1). Ambos os tumores são indolentes, associados a epilepsia de longa evolução e com excelente controle após ressecção cirúrgica. A identificação molecular evita tratamentos agressivos desnecessários.",
    effect: "favoravel", effectLabel: "Define entidades de grau 1 e comportamento indolente",
    assoc: [
      { entity: "Glioma angiocêntrico", pct: 90, level: "definidor", note: "Fusão MYB::QKI na grande maioria dos casos" },
      { entity: "Glioma difuso pediátrico de baixo grau, alterado na via MAPK", pct: 12, level: "ocasional", note: "Subgrupo MYB/MYBL1-alterado (comportamento de grau 1)" }
    ],
    refs: ["Wang et al., Acta Neuropathol 2005 (glioma angiocêntrico)", "Wefers et al., Acta Neuropathol 2020 (MYB/MYBL1)", "WHO CNS5 (2021)"]
  },
  {
    id: "pdgfra", name: "PDGFRA", short: "PDGFRA",
    klass: ["Diagnóstico", "Prognóstico"],
    match: [/pdgfra/i],
    test: "NGS (mutações pontuais e CNV/amplificação); FISH.",
    plain: "Receptor de fator de crescimento derivado de plaquetas; alterado em tumores de linha média, em gliomas pediátricos agressivos e em um tumor raro do septo pelúcido.",
    description: "PDGFRA é um receptor tirosina-quinase. Sua amplificação/mutação caracteriza o subgrupo RTK2 dos gliomas pediátricos difusos de alto grau H3/IDH-wildtype e aparece em parte dos gliomas hemisféricos difusos H3 G34-mutantes. De forma distinta, mutações recorrentes no domínio quinase (sobretudo p.K385I/L) são praticamente específicas do tumor glioneuronal mixoide — entidade de grau 1 localizada no septo pelúcido e na substância branca periventricular. O significado prognóstico depende totalmente do contexto: favorável no tumor mixoide, desfavorável nos gliomas de alto grau.",
    effect: "misto", effectLabel: "Desfavorável em gliomas de alto grau; marcador definidor no tumor glioneuronal mixoide",
    assoc: [
      { entity: "Tumor glioneuronal mixoide", pct: 90, level: "definidor", note: "Mutações PDGFRA (p.K385) na maioria dos casos" },
      { entity: "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype", pct: 30, level: "ocasional", note: "Subgrupo RTK2 (PDGFRA/EGFR/MYCN)" },
      { entity: "Glioma hemisférico difuso, H3 G34-mutante", pct: 25, level: "ocasional", note: "Ganho/alteração de PDGFRA descrita" }
    ],
    refs: ["Bale et al., Acta Neuropathol 2021 (tumor glioneuronal mixoide)", "Jones et al., Nature 2017 (subgrupos pHGG RTK1/RTK2/MYCN)", "WHO CNS5 (2021)"]
  },
  {
    id: "mycn", name: "MYCN", short: "MYCN",
    klass: ["Diagnóstico", "Prognóstico"],
    match: [/mycn/i],
    test: "FISH/CNV por NGS; classe de metilação.",
    plain: "Amplificação de um gene que acelera o crescimento tumoral; define um subtipo agressivo de glioma pediátrico.",
    description: "MYCN é um fator de transcrição amplificado em um subgrupo distinto de gliomas pediátricos difusos de alto grau H3/IDH-wildtype (subgrupo MYCN), definido por classe de metilação de DNA. Esses tumores são agressivos, com alta taxa de disseminação leptomeníngea e prognóstico reservado. A distinção entre os subgrupos RTK1, RTK2 e MYCN é feita principalmente por perfil de metilação e tem implicações para estratificação em ensaios clínicos.",
    effect: "desfavoravel", effectLabel: "Define subgrupo pediátrico agressivo",
    assoc: [
      { entity: "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype", pct: 12, level: "ocasional", note: "Subgrupo MYCN (amplificação) — um dos três subgrupos moleculares" }
    ],
    refs: ["Jones et al., Nature 2017", "WHO CNS5 (2021)"]
  },
  {
    id: "nf1", name: "NF1", short: "NF1",
    klass: ["Diagnóstico", "Preditivo"],
    match: [/\bnf1\b/i],
    test: "Sequenciamento germinativo/somático; diagnóstico clínico de neurofibromatose tipo 1.",
    plain: "Pessoas com neurofibromatose tipo 1 têm maior chance de desenvolver gliomas (sobretudo das vias ópticas) e podem responder a inibidores de MEK.",
    description: "A perda de função da neurofibromina (NF1), um inibidor de RAS, ativa a via MAPK. Cerca de 10–15% dos astrocitomas pilocíticos esporádicos têm alterações de NF1, e 15–20% das crianças com neurofibromatose tipo 1 desenvolvem glioma de vias ópticas. Nesses pacientes, inibidores de MEK (selumetinibe) demonstraram benefício com redução tumoral e melhora funcional, sendo aprovados para plexiformes e estudados em gliomas ópticos. A presença de NF1 orienta ainda o rastreamento oftalmológico e o aconselhamento genético familiar.",
    effect: "misto", effectLabel: "Ativa MAPK, mas é alvo de inibidores de MEK (selumetinibe)",
    assoc: [
      { entity: "Astrocitoma pilocítico", pct: 12, level: "ocasional", note: "≈10–15% esporádicos; muito maior em pacientes com NF1" },
      { entity: "Glioma difuso pediátrico de baixo grau, alterado na via MAPK", pct: 10, level: "ocasional", note: "Gliomas de vias ópticas em NF1" }
    ],
    refs: ["Gross et al., NEJM 2020 (selumetinibe)", "Loyola/NCI PDQ — gliomas de vias ópticas em NF1", "WHO CNS5 (2021)"]
  },
  {
    id: "mapk", name: "Ativação da via MAPK", short: "Via MAPK",
    klass: ["Diagnóstico", "Preditivo"],
    match: [/mapk/i],
    test: "Painel NGS + classe de metilação de DNA (assinatura MAPK-alterada).",
    plain: "É a 'avenida' de sinalização que quase todos os gliomas de baixo grau usam para crescer. Por isso, é também o alvo principal dos novos medicamentos.",
    description: "A via RAS/RAF/MEK/ERK (MAPK) é ativada por uma variedade de mecanismos — fusões (KIAA1549::BRAF, FGFR, MYB::QKI), mutações pontuais (BRAF V600E, FGFR1), deleções (NF1) — na grande maioria dos gliomas pediátricos de baixo grau e nos gliomas circunscritos (pilocítico, ganglioglioma, PLNTY, angiocêntrico). A convergência para uma mesma via explica por que inibidores de MEK (selumetinibe, trametinibe, mirdametinibe) e de BRAF/FGFR produzem respostas em entidades histológicas diferentes. Na prática, a ativação de MAPK é hoje o biomarcador terapêutico mais relevante dos gliomas de baixo grau.",
    effect: "favoravel", effectLabel: "Múltiplos alvos terapêuticos disponíveis",
    assoc: [
      { entity: "Astrocitoma pilocítico", pct: 95, level: "definidor", note: "Ativação de MAPK em quase todos os casos" },
      { entity: "Glioma difuso pediátrico de baixo grau, alterado na via MAPK", pct: 95, level: "definidor", note: "Critério definidor da entidade" },
      { entity: "Ganglioglioma", pct: 70, level: "frequente", note: "Alteração ativadora de MAPK em subgrupo expressivo" },
      { entity: "Astrocitoma de alto grau com características piloides", pct: 80, level: "frequente", note: "Alterações MAPK na classe de metilação HGAP" },
      { entity: "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)", pct: 90, level: "definidor", note: "Rearranjo de tirosina-quinase ativando MAPK" },
      { entity: "Glioma angiocêntrico", pct: 85, level: "definidor", note: "Fusão MYB::QKI ativa a via" },
      { entity: "Tumor glioneuronal formador de rosetas", pct: 70, level: "frequente", note: "Via FGFR1/PI3K-MAPK" },
      { entity: "Astrocitoma pleomórfico xanthoastrocytoma", pct: 70, level: "frequente", note: "BRAF V600E e outras alterações MAPK" }
    ],
    refs: ["Jones et al., Nat Genet 2013 (landscape genômico dos pLGG)", "Lassaletda et al., JCO 2017", "WHO CNS5 (2021)"]
  },
  {
    id: "tsc_mtor", name: "TSC1 / TSC2 · via mTOR", short: "TSC/mTOR",
    klass: ["Diagnóstico", "Preditivo"],
    match: [/tsc1/i, /tsc2/i, /mtor/i],
    test: "Sequenciamento germinativo/somático; contexto clínico de esclerose tuberosa.",
    plain: "Na esclerose tuberosa, os genes TSC1/TSC2 não freiam a via mTOR — e o everolimo (um inibidor de mTOR) consegue reduzir esses tumores.",
    description: "TSC1 e TSC2 formam um complexo que inibe mTORC1. Sua inativação (germinativa na esclerose tuberosa ou somática) leva à ativação constitutiva de mTOR e é o mecanismo central do astrocitoma subependimário de células gigantes (SEGA), que ocorre em 5–20% dos pacientes com esclerose tuberosa, tipicamente junto ao forame de Monro. O estudo EXIST-1 demonstrou que everolimo reduz o volume do SEGA em cerca de 35% dos pacientes, sendo alternativa válida à cirurgia, sobretudo em lesões múltiplas ou de alto risco. É um dos exemplos mais claros de biomarcador com terapia alvo aprovada em neuro-oncologia.",
    effect: "favoravel", effectLabel: "Alvo de everolimo (inibidor de mTOR) — resposta documentada",
    assoc: [
      { entity: "Astrocitoma subependimário de células gigantes", pct: 98, level: "definidor", note: "Quase sempre no contexto de esclerose tuberosa (TSC1/TSC2)" }
    ],
    refs: ["Krueger et al., J Clin Oncol 2013 (EXIST-1)", "WHO CNS5 (2021)", "Northrup et al. — consensus SEGA/TSC"]
  },
  {
    id: "mn1", name: "MN1 (rearranjo / fusão BEND2)", short: "MN1",
    klass: ["Diagnóstico", "Classificação molecular"],
    match: [/mn1/i, /bend2/i],
    test: "FISH/NGS de fusões (MN1::BEND2) e perfil de metilação de DNA.",
    plain: "Rearranjo que define o astroblastoma, um tumor raro, bem delimitado, mais comum em meninas e mulheres jovens.",
    description: "O rearranjo de MN1 (22q12.1), com parceiros como BEND2, é a alteração característica do astroblastoma MN1-alterado e o critério molecular exigido na OMS CNS5 para essa entidade. Tumores com morfologia de astroblastoma mas sem alteração de MN1 pertencem a outras classes de metilação e têm comportamento diferente. A classe de metilação é o teste mais confiável quando a análise de fusões não está disponível. A entidade ainda não tem grau definido: recidivas locais são frequentes, mas a sobrevida específica tende a ser favorável quando a ressecção é segura.",
    effect: "neutro", effectLabel: "Definidor da entidade; comportamento heterogêneo",
    assoc: [
      { entity: "Astroblastoma, MN1-alterado", pct: 95, level: "definidor", note: "Critério molecular da entidade (rearranjo MN1 ou classe de metilação correspondente)" }
    ],
    refs: ["Sturm et al., Cancer Cell 2016 (MN1-altered)", "Chen et al., 2020", "WHO CNS5 (2021)"]
  },
  {
    id: "prkca", name: "PRKCA p.D463H", short: "PRKCA",
    klass: ["Diagnóstico"],
    match: [/prkca/i],
    test: "Sequenciamento dirigido (a mutação é recorrente e quase patognomônica) ou perfil de metilação.",
    plain: "Uma mutação específica que aparece em quase todos os gliomas cordoides — ajuda a confirmar esse tumor raro.",
    description: "A mutação p.D463H no gene PRKCA (proteína quinase C alfa) é altamente recorrente no glioma cordoide, sendo considerada praticamente patognomônica dessa entidade de grau 2 localizada no terceiro ventrículo anterior/região hipotalâmica. Junto com a classe de metilação característica, permite separar o glioma cordoide de mimetizadores (como ependimoma e meningioma cordoide). O tumor cresce devagar, mas a localização crítica gera morbidade relevante; a ressecção completa é desafiadora e recidivas são possíveis.",
    effect: "neutro", effectLabel: "Marcador diagnóstico quase patognomônico",
    assoc: [
      { entity: "Glioma cordoide", pct: 92, level: "definidor", note: "Mutação PRKCA p.D463H na grande maioria dos casos" }
    ],
    refs: ["Highsmith et al., J Neuropathol Exp Neurol 2020", "Merkle et al., Acta Neuropathol 2021", "WHO CNS5 (2021)"]
  },
  {
    id: "pik3ca", name: "PIK3CA / via PI3K", short: "PIK3CA",
    klass: ["Diagnóstico"],
    match: [/pik3ca/i],
    test: "NGS (painel de mutações e CNV).",
    plain: "Mutações que ativam outra via de crescimento celular; comuns no tumor glioneuronal formador de rosetas.",
    description: "Mutações ativadoras de PIK3CA (e de outros componentes da via PI3K/AKT/mTOR) são frequentes no tumor glioneuronal formador de rosetas, muitas vezes em conjunto com alterações de FGFR1. A via PI3K é também um alvo terapêutico em investigação em gliomas de baixo grau e em tumores com ativação combinada MAPK/PI3K, situação associada a resistência a inibidores isolados de MEK.",
    effect: "neutro", effectLabel: "Alteração de apoio diagnóstico em tumor de grau 1",
    assoc: [
      { entity: "Tumor glioneuronal formador de rosetas", pct: 65, level: "frequente", note: "PIK3CA frequentemente associado a FGFR1" }
    ],
    refs: ["WHO CNS5 (2021)", "Sakaguchi et al. — RGNT molecular profile"]
  },
  {
    id: "del1p", name: "Deleção 1p isolada / ganho de 1q", short: "1p / 1q",
    klass: ["Prognóstico"],
    match: [/1p deletion/i, /1p loss/i, /1q gain/i],
    test: "CNV por array/NGS; FISH.",
    plain: "Perda só do 1p (sem o 19q) é diferente da codeleção completa: aparece no tumor leptomeníngeo e muda o prognóstico conforme o contexto.",
    description: "A deleção isolada de 1p — sem codeleção de 19q — é característica do tumor leptomeníngeo glioneuronal difuso (DLGNT), geralmente associada a fusão KIAA1549::BRAF. Nesse contexto, o ganho adicional de 1q e a classe molecular identificada por metilação de DNA separam casos de comportamento indolente de casos agressivos com disseminação e óbito precoce. É fundamental não confundir a deleção 1p isolada com a codeleção 1p/19q completa do oligodendroglioma, que tem significado diagnóstico e terapêutico completamente diferente.",
    effect: "misto", effectLabel: "Deleção 1p isolada típica de tumor indolente; ganho de 1q indica pior evolução",
    assoc: [
      { entity: "Glioma leptomeníngeo difuso glioneuronal", pct: 78, level: "definidor", note: "Deleção 1p isolada na maioria; ganho 1q em subgrupo desfavorável" }
    ],
    refs: ["Rodriguez et al., Acta Neuropathol 2012", "Chiang et al., Acta Neuropathol 2020 (classes de metilação DLGNT)", "WHO CNS5 (2021)"]
  },
  {
    id: "methylclass", name: "Classe de metilação de DNA", short: "Metilação (classe)",
    klass: ["Classificação molecular", "Diagnóstico"],
    match: [/methylation class/i, /perfil de metila/i, /classe de metila/i],
    test: "Array de metilação (EPIC/850k) + classificador do DKFZ (brain-tumour.molecularneuropathology.org).",
    plain: "É a 'identidade molecular' do tumor: compara o padrão químico do DNA dele com milhares de tumores conhecidos e diz a qual família ele pertence.",
    description: "O perfil de metilação de DNA é hoje o método de referência para classificar tumores do SNC difíceis ou raros, e em muitos casos redefine o diagnóstico histológico. É critério essencial ou de apoio para entidades como HGAP (astrocitoma de alto grau com características piloides), astroblastoma MN1-alterado, glioma cordoide, tumor glioneuronal mixoide, DLGNT, tumor formador de rosetas e os subgrupos de gliomas pediátricos de alto grau (RTK1, RTK2, MYCN). O classificador do DKFZ fornece ainda uma pontuação de correspondência e estimativas de CNV, permitindo inferir alterações como +7/−10 e deleção de CDKN2A/B mesmo sem painel genômico dedicado.",
    effect: "neutro", effectLabel: "Ferramenta de classificação; define subgrupos com prognóstico distinto",
    assoc: [
      { entity: "Astrocitoma de alto grau com características piloides", pct: 100, level: "definidor", note: "Entidade definida por classe de metilação" },
      { entity: "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype", pct: 100, level: "definidor", note: "Subgrupos RTK1/RTK2/MYCN definidos por metilação" },
      { entity: "Tumor glioneuronal mixoide", pct: 100, level: "definidor", note: "Classe de metilação específica" },
      { entity: "Glioma leptomeníngeo difuso glioneuronal", pct: 90, level: "definidor", note: "Classes de metilação separam comportamento indolente de agressivo" },
      { entity: "Astroblastoma, MN1-alterado", pct: 95, level: "definidor", note: "Usada quando a análise de fusão MN1 não está disponível" },
      { entity: "Glioma cordoide", pct: 95, level: "definidor", note: "Classe de metilação característica" },
      { entity: "Tumor glioneuronal formador de rosetas", pct: 95, level: "definidor", note: "Classe de metilação específica" },
      { entity: "Astrocitoma pleomórfico xanthoastrocytoma", pct: 80, level: "frequente", note: "Confirmação em casos atípicos" }
    ],
    refs: ["Capper et al., Nature 2018 (classificador DKFZ)", "Reinhardt 2018 (HGAP)", "WHO CNS5 (2021)"]
  },
  {
    id: "ezhip", name: "EZHIP (C19MC)", short: "EZHIP",
    klass: ["Diagnóstico"],
    match: [/ezhip/i],
    test: "Sequenciamento de RNA/NGS; inferência por perda de H3K27me3.",
    plain: "Proteína que desliga o mesmo sistema que a mutação K27M desliga — entra no grupo dos gliomas 'H3 K27-alterados'.",
    description: "EZHIP (anteriormente CXorf67) é um inibidor endógeno do complexo PRC2. Sua superexpressão, tipicamente por integração do locus C19MC, reproduz o efeito da mutação K27M: perda global de H3K27me3. Por isso, a OMS CNS5 passou a usar o termo 'H3 K27-alterado' em vez de 'H3 K27M-mutante', abrangendo os dois mecanismos. Gliomas com alteração de EZHIP também têm prognóstico ruim e são tratados como gliomas difusos de linha média de grau 4.",
    effect: "desfavoravel", effectLabel: "Mecanismo alternativo de glioma difuso de linha média grau 4",
    assoc: [
      { entity: "Glioma difuso de linha média, H3 K27-alterado", pct: 10, level: "ocasional", note: "Subconjunto dos DMG sem mutação K27M" }
    ],
    refs: ["Briener et al., Nat Genet 2017 (CXorf67/EZHIP)", "WHO CNS5 (2021)"]
  },
  {
    id: "histone_h3", name: "Histonas H3 (H3-3A / H3C2)", short: "Histonas H3",
    klass: ["Diagnóstico"],
    match: [/h3-3a/i, /hist1h3b/i],
    test: "Sequenciamento dirigido dos genes de histona H3-3A, H3C2 (HIST1H3B) e H3C3.",
    plain: "As histonas são os 'carretéis' onde o DNA se enrola. Uma troca de letra nesses genes muda o programa de desenvolvimento das células da glia.",
    description: "As mutações em genes de histona H3 (K27M e G34R/V) representam um paradigma da oncologia pediátrica: uma única substituição de aminoácido em uma proteína estrutural da cromatina reprograma células precursoras e gera tumores com comportamento e localização muito específicos. K27M predomina em estruturas de linha média (ponte, tálamo, medula) e G34R/V em hemisférios cerebrais de adolescentes e adultos jovens. Ambos definem entidades de grau 4 na OMS CNS5.",
    effect: "desfavoravel", effectLabel: "Definem duas entidades de grau 4 (DMG e DHG)",
    assoc: [
      { entity: "Glioma difuso de linha média, H3 K27-alterado", pct: 75, level: "definidor", note: "H3-3A/H3C2/H3C3 K27M" },
      { entity: "Glioma hemisférico difuso, H3 G34-mutante", pct: 100, level: "definidor", note: "H3-3A G34R/V" }
    ],
    refs: ["Wu et al., Nature 2012; Schwartzentruber et al., Nature 2012", "Sturm et al., Cell 2012", "WHO CNS5 (2021)"]
  }
];

const BIOMARKER_CLASS_COLORS = {
  "Diagnóstico": "#DBEAFE",
  "Prognóstico": "#DCFCE7",
  "Preditivo": "#EDE9FE",
  "Classificação molecular": "#FDE68A"
};

const BIOMARKER_LEVEL_LABEL = {
  definidor: "Definidor da entidade",
  frequente: "Frequente",
  ocasional: "Ocasional",
  ausente: "Ausente / critério de exclusão"
};

const BIOMARKER_LEVEL_COLOR = {
  definidor: "#15803D",
  frequente: "#1D4ED8",
  ocasional: "#B45309",
  ausente: "#57534E"
};
const BIOMARKER_LEVEL_SOFT = {
  definidor: "#DCFCE7",
  frequente: "#DBEAFE",
  ocasional: "#FEF3C7",
  ausente: "#E7E5E4"
};
