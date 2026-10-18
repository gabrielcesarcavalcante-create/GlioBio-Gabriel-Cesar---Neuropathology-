// =====================================================================
// knowledge.js — Camada de conhecimento clínico curado
// Complementa data.js (que permanece intacto) com:
//   • grau OMS CNS5, faixa etária típica e família de cada entidade
//   • perfil de distribuição anatômica (para o visualizador 3D)
//   • referências de sobrevida da literatura (com fonte)
//   • modelo documentado de prognóstico por IDADE x GRAU
// Fontes principais: WHO CNS5 (2021); NCI PDQ Childhood Astrocytomas;
// EANO; Stupp 2005 (NEJM); Buckner 2016 (NEJM); CBTRUS; Hegi 2005.
// =====================================================================

// ---------------------------------------------------------------
// Regiões cerebrais — coordenadas em mm, sistema tipo Talairach
//   x+: hemisfério esquerdo | y+: anterior (fronte) | z+: superior
// ---------------------------------------------------------------
const BRAIN_REGIONS = [
  { id: "frontal",        label: "Lobo frontal",                 short: "Frontal",        c: [0, 48, 26],   r: [58, 44, 44], group: "supratentorial", desc: "Frente do cérebro: movimento, planejamento, comportamento e fala (área de Broca)." , func: "Movimento voluntário (córtex motor primário e pré-motor), fala expressiva (área de Broca, em geral no hemisfério esquerdo), planejamento, juízo, memória de trabalho, personalidade, comportamento e iniciativa (córtex pré-frontal).", deficit: "Fraqueza do lado oposto do corpo (hemiparesia), dificuldade para falar (afasia expressiva), mudanças de personalidade e comportamento, apatia ou perda de planejamento." },
  { id: "parietal",       label: "Lobo parietal",                short: "Parietal",       c: [0, -14, 56],  r: [54, 40, 34], group: "supratentorial", desc: "Topo/atrás: sensibilidade, orientação espacial e integração de estímulos." , func: "Integração das sensações (tato, dor, temperatura, propriocepção), esquema corporal, orientação espacial, cálculo, escrita e planejamento de gestos (praxias).", deficit: "Perda sensitiva contralateral, desorientação espacial, negligência de um lado, dificuldade com cálculo, escrita e gestos (síndrome de Gerstmann no hemisfério dominante)." },
  { id: "temporal",       label: "Lobo temporal",                short: "Temporal",       c: [0, -4, -18],  r: [64, 40, 26], group: "supratentorial", desc: "Laterais e inferiores: memória, linguagem (Wernicke) e audição; foco comum de epilepsia tumoral." , func: "Audição, memória e aprendizado (hipocampo e estruturas mediais), compreensão da linguagem (área de Wernicke), emoções e reconhecimento de faces e cenas.", deficit: "Crises epilépticas temporais (auras epigástricas, déjà-vu), perda de memória, afasia de compreensão e falha de campo visual (quadrantanopsia superior contralateral)." },
  { id: "occipital",      label: "Lobo occipital",               short: "Occipital",      c: [0, -70, 14],  r: [40, 28, 34], group: "supratentorial", desc: "Parte de trás: processamento da visão." , func: "Processamento da visão: detecção de forma, cor, movimento e reconhecimento visual (córtex visual primário e áreas associativas).", deficit: "Hemianopsia homônima contralateral (perda de metade do campo visual), alucinações visuais simples e dificuldade de reconhecer faces ou objetos (agnosias)." },
  { id: "insula",         label: "Ínsula",                       short: "Ínsula",         c: [0, 6, 4],     r: [30, 24, 20], group: "supratentorial", desc: "Dobra profunda entre frontal, temporal e parietal; gliomas aqui são de ressecção delicada." , func: "Interocepção (percepção do estado interno do corpo), integração de dor e paladar, controle visceral e autonômico, emoções e empatia; participa da rede de linguagem.", deficit: "Crises epilépticas de difícil controle, alterações autonômicas (frequência cardíaca, digestivas), alterações de paladar/dor e risco à linguagem quando o hemisfério dominante é acometido." },
  { id: "basal_ganglia",  label: "Gânglios da base",             short: "G. da base",     c: [0, 4, 12],    r: [22, 18, 15], group: "profundo",       desc: "Núcleos profundos que controlam movimento; região de difícil acesso cirúrgico." , func: "Modulação e iniciação do movimento (estriado e globo pálido), aprendizado motor e de hábitos, circuitos de recompensa e tomada de decisão.", deficit: "Parkinsonismo, distonia, movimentos involuntários (hemibalismo) e fraqueza contralateral pela compressão da cápsula interna." },
  { id: "thalamus",       label: "Tálamo",                       short: "Tálamo",         c: [0, -22, 6],   r: [18, 15, 12], group: "profundo",       desc: "Estação central de retransmissão sensitiva; sede frequente de glioma de linha média." , func: "Reestação sensitiva e motora para o córtex, modulação de alerta e consciência, memória e circuitos de dor e emoção.", deficit: "Perda sensitiva contralateral, dor talâmica (Dejerine-Roussy), tremor, sonolência e hidrocefalia por obstrução do terceiro ventrículo." },
  { id: "hypothalamus",   label: "Hipotálamo / quiasma óptico",  short: "Hipotálamo",     c: [0, 6, -10],   r: [13, 13, 9],  group: "profundo",       desc: "Regulação hormonal, apetite e visão; gliomas aqui causam endocrinopatias e perda visual." , func: "Controle da hipófise e dos hormônios, fome e sede, temperatura, ciclo vigília-sono e respostas autonômicas; vizinho ao quiasma óptico (visão).", deficit: "Endocrinopatias (déficit de crescimento, diabete insípido, hipopituitarismo), ganho ou perda de peso, sonolência excessiva e perda visual (hemianopsia bitemporal)." },
  { id: "corpus_callosum",label: "Corpo caloso",                 short: "C. caloso",      c: [0, 8, 32],    r: [9, 44, 8],   group: "profundo",       desc: "Ponte de fibras entre os dois hemisférios; tumores que a atravessam formam o 'glioma borboleta'." , func: "Maior feixe de fibras comissurais do cérebro: integra informações motoras, sensitivas e cognitivas entre os dois hemisférios.", deficit: "Síndromes de desconexão (apraxia da mão esquerda, dificuldade de transferência entre hemisférios), declínio cognitivo rápido; tumores que o atravessam formam o 'glioma borboleta'." },
  { id: "septum",         label: "Septo pelúcido / periventricular", short: "Septo pelúcido", c: [0, 10, 20], r: [4, 13, 9],  group: "ventricular",   desc: "Lâmina entre os ventrículos laterais; local típico do tumor glioneuronal mixoide." , func: "Parede medial dos ventrículos laterais; vizinho aos núcleos septais, ligados a recompensa, aversão e integração autonômico-límbica.", deficit: "Predomina o efeito de massa: hidrocefalia obstrutiva e hipertensão intracraniana (cefaleia, vômitos, papiledema)." },
  { id: "lat_ventricle",  label: "Ventrículo lateral (forame de Monro)", short: "Ventr. lateral", c: [0, 6, 24], r: [26, 34, 12], group: "ventricular", desc: "Cavidade de líquor; o SEGA cresce junto ao forame de Monro e pode causar hidrocefalia." , func: "Cavidade de líquor que produz e circula o LCR; o forame de Monro a conecta ao terceiro ventrículo; abriga a zona subventricular (células-tronco neurais).", deficit: "Hidrocefalia obstrutiva e hipertensão intracraniana, com cefaleia positional, náuseas e alterações visuais." },
  { id: "third_ventricle",label: "Terceiro ventrículo",          short: "3º ventrículo",  c: [0, -12, -2],  r: [6, 11, 9],   group: "ventricular",    desc: "Cavidade central; sede característica do glioma cordoide." , func: "Cavidade central de líquor entre tálamos e hipotálamo; parte do circuito ventricular até o aqueduto cerebral.", deficit: "Hidrocefalia obstrutiva e compressão de tálamo/hipotálamo: alterações sensitivas, visuais e endócrinas." },
  { id: "fourth_ventricle",label: "Quarto ventrículo",           short: "4º ventrículo",  c: [0, -46, -22], r: [11, 9, 11],  group: "ventricular",    desc: "Cavidade na fossa posterior; local típico do tumor glioneuronal formador de rosetas." , func: "Cavidade de líquor da fossa posterior, entre tronco e cerebelo; drena o LCR pelos forames de Luschka e Magendie.", deficit: "Hidrocefalia obstrutiva, ataxia, nistagmo, vômitos e acometimento de nervos cranianos pela compressão do tronco." },
  { id: "midbrain",       label: "Mesencéfalo",                  short: "Mesencéfalo",    c: [0, -32, -8],  r: [10, 10, 10], group: "tronco",         desc: "Parte alta do tronco cerebral: visão, alerta e vias motoras." , func: "Movimento ocular e pupilas (NC III e IV, colículos), vias motoras e sensitivas ascendentes/descendentes, alerta (formação reticular) e dopamina (substância negra).", deficit: "Paralisia de movimentos oculares, diplopia, hemiparesia contralateral, ataxia e sonolência; hidrocefalia por compressão do aqueduto." },
  { id: "pons",           label: "Ponte",                        short: "Ponte",          c: [0, -42, -20], r: [15, 15, 13], group: "tronco",         desc: "Centro do tronco; sede clássica do glioma difuso intrínseco da ponte (DIPG/DMG)." , func: "Ponte entre córtex, cerebelo e medula: núcleos dos NC V–VIII, olhar horizontal (NC VI), respiração, sono e coordenação motora fina.", deficit: "Déficits progressivos de nervos cranianos, estrabismo e diplopia, fraqueza facial e dos membros, ataxia e alteração respiratória — quadro clássico do DIPG/DMG." },
  { id: "medulla",        label: "Bulbo",                        short: "Bulbo",          c: [0, -50, -33], r: [10, 9, 9],   group: "tronco",         desc: "Parte baixa do tronco: respiração, deglutição e frequência cardíaca." , func: "Centros vitais autonômicos (respiração, frequência cardíaca, pressão arterial), deglutição, vômito e nervos cranianos IX–XII; vias motoras e sensitivas.", deficit: "Disfagia, disartria, soluços, irregularidade respiratória e cardíaca e déficit de nervos cranianos baixos." },
  { id: "cerebellum",     label: "Cerebelo",                     short: "Cerebelo",       c: [0, -62, -32], r: [44, 28, 25], group: "infratentorial", desc: "Coordenação e equilíbrio; local mais comum de glioma na infância (astrocitoma pilocítico)." , func: "Coordenação, equilíbrio, ajuste fino do movimento, tônus e aprendizado motor; participa de cognição e afeto (síndrome cognitivo-afetiva cerebelar).", deficit: "Ataxia de marcha e de membros, tremor intencional, dismetria, nistagmo, fala escandida e hidrocefalia por compressão do quarto ventrículo." },
  { id: "spinal_cord",    label: "Medula espinhal",              short: "Medula",         c: [0, -56, -60], r: [7, 7, 22],   group: "espinhal",       desc: "Gliomas medulares são raros, mas DMG H3 K27-alterado e ganglioglioma podem ocorrer aí." , func: "Conduz comandos motores e sensações entre cérebro e corpo; reflexos segmentares e controle autonômico de bexiga, intestino e pressão arterial.", deficit: "Fraqueza progressiva ou paraparesia, nível sensitivo, disfunção esfincteriana e dor neuropática." },
  { id: "leptomeninges",  label: "Leptomeninges (superfície)",   short: "Leptomeninges",  c: [0, 0, 0],     r: [0, 0, 0],    group: "superficie", shell: true, desc: "Membranas que envolvem cérebro e medula; o tumor leptomeníngeo difuso se espalha por elas." , func: "Pia-máter e aracnoide: envolvem e protegem o SNC, circulam o líquor na superfície e contêm os espaços perivasculares.", deficit: "Disseminação leptomeníngea: déficits múltiplos de nervos cranianos e raízes espinhais, hipertensão intracraniana e dor radicular." }
];

const REGION_GROUP_LABEL = {
  supratentorial: "Supratentorial (hemisférios)",
  profundo: "Estruturas profundas",
  ventricular: "Sistema ventricular",
  tronco: "Tronco cerebral",
  infratentorial: "Fossa posterior",
  espinhal: "Medula espinhal",
  superficie: "Superfície / meninges"
};

// ---------------------------------------------------------------
// Metadados por entidade (chaves = nomes exatos usados em data.js)
// ---------------------------------------------------------------
const ENTITY_META = {
  "Astrocitoma, IDH-mutante": {
    family: "adulto-difuso", familyLabel: "Glioma difuso do adulto",
    grade: "2–4", gradeNum: 3, gradeNote: "Grau 4 quando há deleção homozigótica de CDKN2A/B (cIMPACT-NOW 5 / OMS CNS5).",
    ageTypical: "30–50 anos (mediana ~40)", ageBand: "adulto",
    plain: "Tumor infiltrante de adultos jovens que carrega mutação no gene IDH. Cresce devagar no início, mas pode evoluir para graus maiores ao longo dos anos.",
    locations: { frontal: 0.95, insula: 0.6, temporal: 0.6, parietal: 0.5, basal_ganglia: 0.2, thalamus: 0.12, corpus_callosum: 0.12, occipital: 0.15, spinal_cord: 0.05, pons: 0.03, cerebellum: 0.02 },
    locationNote: "Predileção pelo lobo frontal e ínsula; raramente fossa posterior.",
    survival: { text: "Grau 2: mediana ~7 anos · Grau 3: ~4–6 anos · Grau 4 (CDKN2A/B deletado): ~5,5 anos", os5y: "50–75%", src: "Coesão de coortes moleculares (Sci Rep 2025; Buckner 2016)" },
    prognosis: "Melhor que o glioblastoma IDH-wildtype; a deleção CDKN2A/B é o principal fator de piora."
  },
  "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado": {
    family: "adulto-difuso", familyLabel: "Glioma difuso do adulto",
    grade: "2–3", gradeNum: 2, gradeNote: "Grau 3 quando há anaplasia histológica.",
    ageTypical: "35–55 anos (mediana ~45)", ageBand: "adulto",
    plain: "O glioma de melhor prognóstico entre os difusos do adulto. Exige duas alterações juntas: mutação de IDH e perda dos braços 1p e 19q.",
    locations: { frontal: 1.0, insula: 0.5, temporal: 0.5, parietal: 0.42, basal_ganglia: 0.22, thalamus: 0.06, occipital: 0.12, corpus_callosum: 0.08 },
    locationNote: "Clássica predileção frontal; frequentemente cortical/subcortical e calcificado.",
    survival: { text: "Com RT + PCV: mediana ~14,7 anos (1p/19q-codeletado)", os5y: "75–90%", src: "Buckner et al., NEJM 2016 (RTOG 9402); EORTC 26951" },
    prognosis: "Mais favorável; a codeleção prediz benefício duradouro da quimioterapia PCV associada à radioterapia."
  },
  "Glioblastoma, IDH-wildtype": {
    family: "adulto-difuso", familyLabel: "Glioma difuso do adulto",
    grade: "4", gradeNum: 4, gradeNote: "Sempre grau 4; critérios moleculares (EGFR ampl., +7/−10, TERT) permitem o diagnóstico mesmo sem anaplasia.",
    ageTypical: "55–75 anos (mediana ~64)", ageBand: "adulto-idoso",
    plain: "O tumor cerebral primário maligno mais comum e mais agressivo do adulto. Cresce rápido e infiltra o cérebro ao redor, o que dificulta a remoção completa.",
    locations: { frontal: 0.9, temporal: 0.88, parietal: 0.62, insula: 0.5, basal_ganglia: 0.38, thalamus: 0.32, corpus_callosum: 0.38, occipital: 0.3, pons: 0.08, midbrain: 0.06, cerebellum: 0.05, spinal_cord: 0.03 },
    locationNote: "Hemisférios cerebrais (frontal e temporal lideram); pode cruzar o corpo caloso ('glioma borboleta').",
    survival: { text: "RT + temozolomida: mediana 14,6 meses · MGMT metilado ~18–22 meses · MGMT não metilado ~12–14 meses", os5y: "5–7%", src: "Stupp et al., NEJM 2005; Hegi et al., NEJM 2005; CBTRUS" },
    prognosis: "Desfavorável; idade, extensão da ressecção, desempenho clínico e MGMT são os principais modificadores."
  },
  "Glioma difuso de linha média, H3 K27-alterado": {
    family: "pediatrico-alto", familyLabel: "Glioma difuso pediátrico de alto grau",
    grade: "4", gradeNum: 4, gradeNote: "Grau 4 por definição molecular, independentemente da histologia.",
    ageTypical: "5–12 anos (também adultos)", ageBand: "pediatrico",
    plain: "Tumor de estruturas da linha média (ponte, tálamo, medula). O antigo DIPG está aqui. Cirurgia ampla costuma ser impossível pelo local.",
    locations: { pons: 1.0, thalamus: 0.92, spinal_cord: 0.6, midbrain: 0.55, medulla: 0.4, hypothalamus: 0.18, cerebellum: 0.12, frontal: 0.05 },
    locationNote: "Ponte, tálamo e medula espinhal; qualquer estrutura de linha média.",
    survival: { text: "Mediana ~9–12 meses", os5y: "<5%", src: "NCI PDQ; coortes DIPG/DMG" },
    prognosis: "Muito desfavorável; o tratamento padrão é radioterapia, com papel limitado da cirurgia."
  },
  "Glioma hemisférico difuso, H3 G34-mutante": {
    family: "pediatrico-alto", familyLabel: "Glioma difuso pediátrico de alto grau",
    grade: "4", gradeNum: 4, gradeNote: "Grau 4 mesmo sem necrose ou proliferação microvascular.",
    ageTypical: "10–25 anos (mediana ~15)", ageBand: "adolescente",
    plain: "Glioma agressivo dos hemisférios cerebrais de adolescentes e adultos jovens, definido pela mutação H3 G34R/V.",
    locations: { parietal: 0.85, frontal: 0.8, temporal: 0.75, insula: 0.5, occipital: 0.35, basal_ganglia: 0.3, thalamus: 0.18 },
    locationNote: "Grandes massas hemisféricas corticais/subcorticais, frequentemente temporoparietais.",
    survival: { text: "Mediana ~1–2 anos (séries pequenas)", os5y: "10–20%", src: "WHO CNS5; séries DMG/DHG" },
    prognosis: "Agressivo; ressecção máxima e radioterapia são a base, com quimioterapia de benefício incerto."
  },
  "Glioma difuso pediátrico de baixo grau, alterado na via MAPK": {
    family: "pediatrico-baixo", familyLabel: "Glioma difuso pediátrico de baixo grau",
    grade: "não atribuído", gradeNum: 1, gradeNote: "A OMS CNS5 não atribui grau definitivo; comportamento de baixo grau.",
    ageTypical: "0–14 anos", ageBand: "pediatrico",
    plain: "Grupo de gliomas infantis que crescem devagar e quase sempre têm uma alteração ativando a via MAPK — hoje um alvo de tratamento específico.",
    locations: { hypothalamus: 0.9, cerebellum: 0.72, pons: 0.6, midbrain: 0.55, thalamus: 0.5, frontal: 0.32, temporal: 0.3, spinal_cord: 0.35, basal_ganglia: 0.3, medulla: 0.2 },
    locationNote: "Vias ópticas/hipotálamo, tronco, tálamo e cerebelo; também hemisférios.",
    survival: { text: "Sobrevida em 10 anos > 90%", os5y: "90–95%", src: "NCI PDQ; coortes de pLGG" },
    prognosis: "Favorável em sobrevida, mas com risco de sequelas visuais/hormonais e necessidade de tratamentos repetidos."
  },
  "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype": {
    family: "pediatrico-alto", familyLabel: "Glioma difuso pediátrico de alto grau",
    grade: "4", gradeNum: 4, gradeNote: "Grau 4; subdividido em RTK1, RTK2 e MYCN pela classe de metilação.",
    ageTypical: "3–17 anos", ageBand: "pediatrico",
    plain: "Gliomas agressivos de crianças e adolescentes sem mutação de H3 nem de IDH. O subtipo molecular (RTK1, RTK2 ou MYCN) muda o comportamento.",
    locations: { frontal: 0.75, parietal: 0.65, temporal: 0.62, thalamus: 0.32, basal_ganglia: 0.28, occipital: 0.3, cerebellum: 0.15, spinal_cord: 0.18, pons: 0.1 },
    locationNote: "Predominantemente cerebrais/hemisféricos; ocasionalmente outras localizações (NCI PDQ).",
    survival: { text: "Mediana ~1,5–2 anos", os5y: "15–25%", src: "NCI PDQ; SIOPE" },
    prognosis: "Desfavorável, mas melhor que no adulto idoso; depende da classe de metilação."
  },
  "Glioma hemisférico infantil, tipo infantil": {
    family: "pediatrico-alto", familyLabel: "Glioma difuso pediátrico de alto grau",
    grade: "não atribuído", gradeNum: 3, gradeNote: "OMS CNS5 não atribui grau por falta de dados prospectivos; histologia de alto grau.",
    ageTypical: "0–3 anos (maioria < 1 ano)", ageBand: "lactente",
    plain: "Tumor grande de hemisfério cerebral em bebês. Parece muito agressivo ao microscópio, mas costuma responder bem quando tem fusão de ALK, ROS1, NTRK ou MET — que pode ser tratada com medicamentos alvo.",
    locations: { frontal: 0.95, temporal: 0.85, parietal: 0.75, insula: 0.5, occipital: 0.45, basal_ganglia: 0.32, thalamus: 0.18 },
    locationNote: "Massas hemisféricas volumosas no lactente.",
    survival: { text: "Relativamente favorável; respostas duradouras com inibidores de TRK/ALK/ROS1", os5y: "50–70%", src: "NCI PDQ; Miller/Dunker 2019-2021" },
    prognosis: "Heterogêneo, porém melhor que o esperado pela histologia quando há fusão acionável."
  },
  "Astrocitoma pilocítico": {
    family: "circunscrito", familyLabel: "Glioma circunscrito",
    grade: "1", gradeNum: 1, gradeNote: "Grau 1; ressecção completa costuma ser curativa.",
    ageTypical: "5–15 anos (também adultos)", ageBand: "pediatrico",
    plain: "O tumor cerebral mais comum da infância. Cresce devagar, é bem delimitado e frequentemente tem um cisto com um nódulo. Muitas vezes a cirurgia resolve.",
    locations: { cerebellum: 1.0, hypothalamus: 0.85, midbrain: 0.5, pons: 0.45, thalamus: 0.38, spinal_cord: 0.3, frontal: 0.12, temporal: 0.12, medulla: 0.2 },
    locationNote: "Cerebelo é o sítio mais comum; também vias ópticas/hipotálamo e tronco.",
    survival: { text: "Sobrevida em 10 anos > 90–95%", os5y: ">95%", src: "CBTRUS; NCI PDQ" },
    prognosis: "Geralmente favorável; o resultado depende sobretudo de localização e do quanto foi possível remover."
  },
  "Astrocitoma de alto grau com características piloides": {
    family: "circunscrito", familyLabel: "Glioma circunscrito",
    grade: "não atribuído", gradeNum: 3, gradeNote: "Sem grau definitivo na OMS CNS5; comportamento intermediário (histologicamente alto grau).",
    ageTypical: "20–50 anos (mediana ~35)", ageBand: "adulto",
    plain: "Entidade definida por assinatura de metilação. Mistura aspecto de tumor pilocítico com comportamento mais agressivo; muitos casos surgem após radioterapia prévia.",
    locations: { cerebellum: 0.95, spinal_cord: 0.5, pons: 0.45, midbrain: 0.4, thalamus: 0.3, hypothalamus: 0.25, medulla: 0.2 },
    locationNote: "Predomínio na fossa posterior e na medula espinhal.",
    survival: { text: "Sobrevida em 5 anos ~50%", os5y: "~50%", src: "Reinhardt et al., Acta Neuropathol 2018" },
    prognosis: "Intermediário a desfavorável e heterogêneo; metilação de MGMT não se mostrou prognóstica."
  },
  "Astrocitoma pleomórfico xanthoastrocytoma": {
    family: "circunscrito", familyLabel: "Glioma circunscrito",
    grade: "2 (anaplásico: 3)", gradeNum: 2, gradeNote: "Grau 2; a variante anaplásica é grau 3.",
    ageTypical: "10–30 anos", ageBand: "adolescente",
    plain: "Tumor superficial de jovens que costuma causar crises epilépticas. Geralmente bem delimitado, com cisto e nódulo, e frequentemente com mutação BRAF V600E — alvo de medicação específica.",
    locations: { temporal: 1.0, frontal: 0.6, parietal: 0.5, insula: 0.42, occipital: 0.25, cerebellum: 0.15, spinal_cord: 0.1, thalamus: 0.1 },
    locationNote: "Superficial, cortical e com envolvimento meníngeo; lobo temporal é o mais comum.",
    survival: { text: "Sobrevida em 5 anos ~70–80% (grau 2)", os5y: "70–80%", src: "Séries de PXA; WHO CNS5" },
    prognosis: "Relativamente favorável; anaplasia e deleção CDKN2A/B indicam maior risco."
  },
  "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)": {
    family: "glioneuronal", familyLabel: "Tumor glioneuronal / neuronal",
    grade: "1", gradeNum: 1, gradeNote: "Grau 1 na OMS CNS5.",
    ageTypical: "5–25 anos", ageBand: "adolescente",
    plain: "Tumor de baixo grau associado a epilepsia de longa data, frequentemente calcificado. Definido por rearranjos de FGFR2/FGFR3 ou BRAF V600E.",
    locations: { temporal: 1.0, frontal: 0.6, insula: 0.38, parietal: 0.4, occipital: 0.2 },
    locationNote: "Supratentorial, com predileção pelo lobo temporal (tumores associados à epilepsia).",
    survival: { text: "Sobrevida em 5 anos ~86% · livre de progressão ~79%", os5y: "~86%", src: "Huse et al., Acta Neuropathol 2017; revisão Karger 2023" },
    prognosis: "Geralmente indolente; a recorrência depende sobretudo da extensão da ressecção."
  },
  "Glioma angiocêntrico": {
    family: "glioneuronal", familyLabel: "Tumor glioneuronal / neuronal",
    grade: "1", gradeNum: 1, gradeNote: "Grau 1.",
    ageTypical: "2–20 anos", ageBand: "pediatrico",
    plain: "Tumor raro e muito indolente que causa epilepsia de difícil controle. A remoção cirúrgica costuma eliminar as crises.",
    locations: { frontal: 0.85, parietal: 0.8, temporal: 0.62, insula: 0.45, occipital: 0.3, lat_ventricle: 0.35 },
    locationNote: "Cortical/subcortical supratentorial, com arranjo perivascular e periventricular.",
    survival: { text: "Excelente; >90% livres de progressão após ressecção", os5y: ">95%", src: "Wang et al., Acta Neuropathol 2005; séries de epilepsia" },
    prognosis: "Favorável/indolente; a questão clínica central é o controle da epilepsia."
  },
  "Glioma leptomeníngeo difuso glioneuronal": {
    family: "glioneuronal", familyLabel: "Tumor glioneuronal / neuronal",
    grade: "não atribuído", gradeNum: 2, gradeNote: "Sem grau definido; comportamento variável.",
    ageTypical: "3–15 anos", ageBand: "pediatrico",
    plain: "Tumor que se espalha pelas membranas que revestem cérebro e medula, em vez de formar uma massa única. O comportamento varia bastante entre pacientes.",
    locations: { leptomeninges: 1.0, spinal_cord: 0.85, cerebellum: 0.42, pons: 0.32, hypothalamus: 0.3, thalamus: 0.22, midbrain: 0.25 },
    locationNote: "Realce leptomeníngeo difuso, com predileção pela fossa posterior e medula espinhal.",
    survival: { text: "Muito heterogêneo; casos com deleção 1p isolada tendem a evoluir melhor", os5y: "60–80%", src: "Rodriguez et al., Acta Neuropathol 2012; WHO CNS5" },
    prognosis: "Heterogêneo; ganho de 1q e classe molecular desfavorável indicam pior evolução."
  },
  "Tumor glioneuronal mixoide": {
    family: "glioneuronal", familyLabel: "Tumor glioneuronal / neuronal",
    grade: "1", gradeNum: 1, gradeNote: "Grau 1 pelo desfecho favorável.",
    ageTypical: "20–45 anos", ageBand: "adulto",
    plain: "Entidade nova, muito rara, que nasce quase sempre no septo pelúcido (entre os ventrículos laterais) e tem comportamento indolente.",
    locations: { septum: 1.0, lat_ventricle: 0.72, corpus_callosum: 0.3, frontal: 0.18, thalamus: 0.15 },
    locationNote: "Septo pelúcido e substância branca periventricular profunda.",
    survival: { text: "Indolente; recidiva local possível", os5y: ">90%", src: "WHO CNS5; Bale & Rosenblum 2022" },
    prognosis: "Geralmente indolente, com bom desfecho após ressecção."
  },
  "Ganglioglioma": {
    family: "glioneuronal", familyLabel: "Tumor glioneuronal / neuronal",
    grade: "1 (anaplásico: 3)", gradeNum: 1, gradeNote: "Grau 1; a forma anaplásica é grau 3 e rara.",
    ageTypical: "5–25 anos", ageBand: "adolescente",
    plain: "Tumor misto (neurônios + glia) que é uma das causas mais comuns de epilepsia tumoral em jovens. A cirurgia costuma controlar as crises.",
    locations: { temporal: 1.0, frontal: 0.5, parietal: 0.38, cerebellum: 0.28, spinal_cord: 0.38, pons: 0.3, midbrain: 0.28, thalamus: 0.18, hypothalamus: 0.15, medulla: 0.15 },
    locationNote: "Cérebro (lobo temporal) e tronco cerebral; ocasionalmente medula (NCI PDQ).",
    survival: { text: "Sobrevida em 5–10 anos > 90%", os5y: ">90%", src: "Séries de tumores associados à epilepsia" },
    prognosis: "Geralmente favorável; anaplasia é rara e piora o risco."
  },
  "Astrocitoma subependimário de células gigantes": {
    family: "circunscrito", familyLabel: "Glioma circunscrito",
    grade: "1", gradeNum: 1, gradeNote: "Grau 1.",
    ageTypical: "0–20 anos (esclerose tuberosa)", ageBand: "pediatrico",
    plain: "Tumor de grau 1 que ocorre em pessoas com esclerose tuberosa, crescendo perto do forame de Monro. Pode bloquear a circulação do líquor e causar hidrocefalia — e responde a inibidores de mTOR.",
    locations: { lat_ventricle: 1.0, septum: 0.45, basal_ganglia: 0.32, thalamus: 0.15 },
    locationNote: "Parede do ventrículo lateral, junto ao forame de Monro.",
    survival: { text: "Excelente com cirurgia ou everolimo", os5y: ">95%", src: "Krueger et al. (EXIST-1); WHO CNS5" },
    prognosis: "Crescimento controlável; o risco clínico vem da hidrocefalia e da progressão local."
  },
  "Astroblastoma, MN1-alterado": {
    family: "circunscrito", familyLabel: "Glioma circunscrito",
    grade: "não estabelecido", gradeNum: 2, gradeNote: "OMS CNS5: grau definitivo não estabelecido (recidiva local frequente, sobrevida específica favorável).",
    ageTypical: "5–25 anos (mais comum em mulheres)", ageBand: "adolescente",
    plain: "Tumor raro e bem delimitado, mais comum em meninas e mulheres jovens, definido por rearranjo do gene MN1. Cresce na superfície dos hemisférios.",
    locations: { parietal: 0.85, frontal: 0.82, temporal: 0.6, occipital: 0.42, lat_ventricle: 0.35, cerebellum: 0.1, pons: 0.08, spinal_cord: 0.1 },
    locationNote: "Supratentorial, superficial/periventricular; casos de tronco e medula relatados.",
    survival: { text: "Recidiva local frequente, mas sobrevida específica favorável quando a ressecção é segura", os5y: "70–90%", src: "Brehar et al./Chen 2020; WHO CNS5" },
    prognosis: "Heterogêneo; depende da classe molecular e da extensão da ressecção."
  },
  "Glioma cordoide": {
    family: "circunscrito", familyLabel: "Glioma circunscrito",
    grade: "2", gradeNum: 2, gradeNote: "Grau 2 na OMS CNS5 (a designação 'do terceiro ventrículo' foi omitida).",
    ageTypical: "40–60 anos", ageBand: "adulto",
    plain: "Tumor raro de crescimento lento que nasce na frente do terceiro ventrículo. Por ficar numa área crítica, pode causar problemas hormonais e de memória mesmo sendo de baixo grau.",
    locations: { third_ventricle: 1.0, hypothalamus: 0.95, thalamus: 0.22, septum: 0.18 },
    locationNote: "Terceiro ventrículo anterior / região hipotalâmica.",
    survival: { text: "Crescimento lento; morbidade ligada à localização e à cirurgia", os5y: "70–90%", src: "WHO CNS5; séries de glioma cordoide" },
    prognosis: "Geralmente baixo grau, mas a localização pode gerar morbidade importante."
  },
  "Tumor glioneuronal formador de rosetas": {
    family: "glioneuronal", familyLabel: "Tumor glioneuronal / neuronal",
    grade: "1", gradeNum: 1, gradeNote: "Grau 1.",
    ageTypical: "10–40 anos (mediana ~30)", ageBand: "adolescente",
    plain: "Tumor raro e de crescimento lento, típico da linha média da fossa posterior (quarto ventrículo e cerebelo), com alterações em FGFR1 e PIK3CA.",
    locations: { fourth_ventricle: 1.0, cerebellum: 0.88, midbrain: 0.2, pons: 0.22, thalamus: 0.15, hypothalamus: 0.12, spinal_cord: 0.18 },
    locationNote: "Quarto ventrículo e vermis cerebelar; pode ocorrer em outras linhas médias.",
    survival: { text: "Favorável; disseminação e recorrência são incomuns", os5y: ">90%", src: "WHO CNS5; séries de RGNT" },
    prognosis: "Geralmente favorável após ressecção."
  }
};

// ---------------------------------------------------------------
// Faixas etárias e âncoras de sobrevida publicadas
// ---------------------------------------------------------------
const AGE_BANDS = [
  { id: "0-14",   label: "0–14 anos",  short: "0–14",  note: "Crianças" },
  { id: "15-39",  label: "15–39 anos", short: "15–39", note: "Adolescentes e adultos jovens" },
  { id: "40-64",  label: "40–64 anos", short: "40–64", note: "Adultos" },
  { id: "65-74",  label: "65–74 anos", short: "65–74", note: "Idosos jovens" },
  { id: "75+",    label: "75 anos ou mais", short: "75+", note: "Idosos" }
];

// Sobrevida relativa em 5 anos (%) — âncoras da literatura por grau/família
const GRADE_BASELINES = [
  { id: "g1", label: "Grau 1", note: "Pilocítico, SEGA, ganglioglioma, PLNTY, angiocêntrico, RGNT, tumor mixoide", base: 93, lo: 88, hi: 97, color: "#15803D",
    src: "CBTRUS/NCI PDQ: sobrevida em 10 anos > 90% nos gliomas de baixo grau pediátricos" },
  { id: "g2", label: "Grau 2", note: "Astrocitoma IDH-mutante G2, oligodendroglioma G2, PXA, glioma cordoide", base: 72, lo: 58, hi: 86, color: "#1D4ED8",
    src: "Astrocitoma IDH-mut G2: mediana ~83 meses; oligodendroglioma 5 anos ~80% (Sci Rep 2025)" },
  { id: "g3", label: "Grau 3", note: "Astrocitoma IDH-mutante G3, oligodendroglioma G3, PXA anaplásico, HGAP", base: 47, lo: 35, hi: 62, color: "#B45309",
    src: "HGAP 5 anos ~50% (Reinhardt 2018); astrocitoma IDH-mut G3 ~4–6 anos de mediana" },
  { id: "g4", label: "Grau 4", note: "Glioblastoma IDH-wt, DMG H3 K27, DHG H3 G34, pHGG, astrocitoma IDH-mut G4", base: 8, lo: 2, hi: 25, color: "#B91C1C",
    src: "GBM 5 anos ~7% (CBTRUS/Stupp); DMG < 5%; astrocitoma IDH-mut G4 ~30–40%" },
  { id: "ng", label: "Sem grau definido", note: "pLGG MAPK-alterado, glioma hemisférico infantil, DLGNT, astroblastoma MN1", base: 68, lo: 45, hi: 95, color: "#A78BFA",
    src: "pLGG > 90% em 10 anos; glioma infantil hemisférico com fusão acionável tem desfecho favorável" }
];

// Fator de ajuste por idade (multiplicador sobre a sobrevida de base do grau).
// Calibrado nas cifras publicadas de sobrevida em 5 anos do GBM por faixa etária:
// 0–14: 20,1% · 15–39: 28,5% · 40–64: ~8% · 65–74: 2,4% · 75+: 1,1% (CBTRUS/revisões).
const AGE_FACTORS = {
  g1: { "0-14": 1.03, "15-39": 1.02, "40-64": 1.00, "65-74": 0.95, "75+": 0.88 },
  g2: { "0-14": 1.05, "15-39": 1.06, "40-64": 1.00, "65-74": 0.88, "75+": 0.74 },
  g3: { "0-14": 1.08, "15-39": 1.10, "40-64": 1.00, "65-74": 0.82, "75+": 0.65 },
  g4: { "0-14": 2.51, "15-39": 3.20, "40-64": 1.05, "65-74": 0.30, "75+": 0.14 },
  ng: { "0-14": 1.10, "15-39": 1.05, "40-64": 0.98, "65-74": 0.85, "75+": 0.72 }
};

// Risco relativo (HR) por idade no glioblastoma — referência < 50 anos
// Fonte: Cancers (MDPI) 2022;14(13):3161 — HR 1,70 (50–59), 3,53 (60–69), 4,82 (70+)
const AGE_HR_GBM = [
  { band: "< 50 anos", hr: 1.00, lo: 1.00, hi: 1.00, label: "referência" },
  { band: "50–59 anos", hr: 1.70, lo: 1.26, hi: 2.30, label: "+70% de risco" },
  { band: "60–69 anos", hr: 3.53, lo: 2.65, hi: 4.70, label: "3,5× mais risco" },
  { band: "≥ 70 anos", hr: 4.82, lo: 3.54, hi: 6.56, label: "4,8× mais risco" }
];

// Mediana de sobrevida global no GBM por faixa etária (meses) — séries populacionais
const AGE_OS_GBM = [
  { band: "18–44",  os: 28.0, note: "Inclui muitos tumores IDH-mutantes em séries históricas" },
  { band: "45–54",  os: 19.0, note: "" },
  { band: "55–64",  os: 13.4, note: "" },
  { band: "65–74",  os: 9.5,  note: "Sobrevida em 5 anos ~2,4%" },
  { band: "75+",    os: 7.3,  note: "Sobrevida em 5 anos ~1,1%" }
];

// ---------------------------------------------------------------
// Fontes citadas na interface
// ---------------------------------------------------------------
const SOURCES = [
  { tag: "OMS CNS5", en: "WHO Classification of Tumours of the Central Nervous System, 5th ed. (2021) — entities, diagnostic criteria and grades.", text: "WHO Classification of Tumours of the Central Nervous System, 5ª ed. (2021) — entidades, critérios diagnósticos e graus.", url: "https://www.iarc.who.int/" },
  { tag: "Stupp 2005", text: "Stupp R. et al. Radiotherapy plus concomitant and adjuvant temozolomide for glioblastoma. N Engl J Med 2005;352:987–96. Mediana de OS 14,6 meses.", url: "https://pubmed.ncbi.nlm.nih.gov/15758009/" },
  { tag: "Hegi 2005", text: "Hegi ME. et al. MGMT gene silencing and benefit from temozolomide in glioblastoma. N Engl J Med 2005;352:997–1003.", url: "https://pubmed.ncbi.nlm.nih.gov/15758010/" },
  { tag: "Buckner 2016", text: "Buckner JC. et al. Radiation plus procarbazine, CCNU and vincristine in low-grade glioma (RTOG 9402). N Engl J Med 2016;374:1344–55. OS mediana 14,7 anos nos 1p/19q-codeletados.", url: "https://pubmed.ncbi.nlm.nih.gov/27050206/" },
  { tag: "EORTC 26951", text: "Cairncross G. et al. Benefit from procarbazine, lomustine, and vincristine in oligodendroglial tumors is associated with mutation of IDH. J Clin Oncol 2014.", url: "https://pubmed.ncbi.nlm.nih.gov/24516019/" },
  { tag: "CATNON", text: "van den Bent MJ. et al. Adjuvant and concurrent temozolomide in 1p/19q non-codeleted anaplastic glioma (CATNON). Lancet Oncol 2021.", url: "https://pubmed.ncbi.nlm.nih.gov/34116802/" },
  { tag: "NCI PDQ", en: "Childhood Astrocytomas and Other Gliomas Treatment (PDQ) — WHO grades, typical locations and outcomes.", text: "Childhood Astrocytomas and Other Gliomas Treatment (PDQ) — graus OMS, localizações típicas e desfechos por entidade.", url: "https://www.cancer.gov/types/brain/hp/child-astrocytoma-glioma-treatment-pdq" },
  { tag: "EANO", en: "European Association for Neuro-Oncology — diagnostic role of IDH, 1p/19q, ATRX, TERT and CDKN2A/B markers.", text: "European Association for Neuro-Oncology — papel diagnóstico dos marcadores IDH, 1p/19q, ATRX, TERT, CDKN2A/B, EGFR e MGMT.", url: "https://www.eano.eu/" },
  { tag: "Reinhardt 2018", text: "Reinhardt A. et al. Anaplastic astrocytoma with piloid features — HGAP. Acta Neuropathol 2018;136:931–951.", url: "https://pubmed.ncbi.nlm.nih.gov/29644433/" },
  { tag: "Idade & HR", en: "Survival Outcomes and Prognostic Factors in Glioblastoma. Cancers 2022;14(13):3161 — HR by age band.", text: "Survival Outcomes and Prognostic Factors in Glioblastoma. Cancers 2022;14(13):3161 — HR por faixa etária.", url: "https://www.mdpi.com/2072-6694/14/13/3161" },
  { tag: "GBM idosos", en: "Management of glioblastoma in elderly patients: a review — hypofractionated radiotherapy.", text: "Management of glioblastoma in elderly patients: a review. Technical Innovations & Patient Support in Oncology, 2024 — sobrevida em 1 e 5 anos por idade.", url: "https://www.sciencedirect.com/science/article/pii/S2405630824000387" },
  { tag: "MGMT", en: "MGMT status as a clinical biomarker in glioblastoma. Cancer Drug Resist 2020 — 30–60% of GBM carry a methylated promoter.", text: "MGMT status as a clinical biomarker in glioblastoma. Cancer Drug Resist 2020 — 30–60% dos GBM têm promoter metilado.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7315323/" }
];
