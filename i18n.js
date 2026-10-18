// =====================================================================
// i18n.js — GlioBio v2.7: idioma PT-BR / EN. Dicionário de interface +
// conteúdo educativo essencial; textos clínicos curados longos permanecem
// em pt-BR (sinalizado na interface quando EN está ativo).
// =====================================================================
(function () {
  "use strict";
  var D = {
    pt: {
      "ag.lead": "Agente especialista em neuro-oncologia molecular que lê a <strong>descrição livre do caso</strong> e devolve: ficha estruturada, diagnóstico integrado OMS 2021, prognóstico, plano terapêutico em duas colunas (<strong>referência internacional × realidade do SUS</strong>), ensaios clínicos, explicabilidade de cada recomendação e alertas. Executa 100% no seu navegador.",
      "ag.prof": "<strong>Uso profissional.</strong> Ferramenta de apoio à decisão para médicos. Nunca substitui o julgamento clínico. Esta análise é gerada por IA e deve ser validada por um neuro-oncologista. Não constitui prescrição médica.",
      "ag.label": "Descrição livre do caso clínico", "ag.ph": "Ex.: Homem, 62 anos, KPS 80, cefaleia e crise focal há 2 meses. RM: lesão frontal esquerda 4,8 cm com realce em anel e necrose. Ressecção subtotal. IDH wildtype, MGMT metilado, TERT promoter mutado, EGFR amplificado, sem codeleção 1p/19q, ATRX retido. Usa fenitoína. Atendido pelo SUS.",
      "ag.c0": "Caso 1 · GBM idoso (SUS)", "ag.c1": "Caso 2 · Oligodendroglioma G2 (privada)", "ag.c2": "Caso 3 · DMG H3 K27M pediátrico", "ag.clear": "Limpar", "ag.run": "Analisar caso (pipeline de 6 passos)",
      "home.typesnote": "Cada estudo indexado foi classificado pelo tipo de publicação (PubMed). Isto mostra a força da evidência disponível.", "graf.g5": "Sobrevida em 5 anos por grau", "graf.g5note": "Faixa clara = intervalo estimado entre as diferentes entidades do mesmo grau.", "graf.idade": "O peso da idade no glioblastoma", "graf.idadenote": "Risco relativo (HR) por faixa etária, tomando menores de 50 anos como referência (= 1,00).", "graf.graus": "Quais tumores pertencem a cada grau", "map.h2b": "Mapa 3D — concentração dos gliomas nas regiões do cérebro", "sobre.h2": "Sobre esta base", "sobre.met": "Método dos cálculos", "sobre.fontes": "Fontes", "sobre.aviso": "Aviso",
      "hero.h1": "Neuro-oncologia baseada em evidências", "hero.cta1": "Explorar biomarcadores", "hero.cta2": "Ver lacunas médicas", "hero.trust": "Sem envio de dados · executa 100% no seu navegador · não substitui o julgamento médico",
      "cred.by": "Desenvolvido por", "cred.note": "Concepção, curadoria clínica e desenvolvimento da plataforma GlioBio.", "cred.role": "Pesquisador em Neuropatologia", "cred.dev": "Desenvolvimento",
      "rail.ctx": "Contexto rápido", "rail.ctxbody": "Cada porcentagem exibida deriva dos estudos indexados (PubMed/OMS). Entidades sem desfecho agregado aparecem sinalizadas como lacuna de evidência.", "rail.l1": "Gráficos de prognóstico", "rail.l2": "Mapa 3D do cérebro", "rail.l3": "Fontes e métodos",
      "hdr.kicker": "Plataforma acadêmica de neuro-oncologia · baseada em evidências",
      "hdr.sub": "Biomarcadores, evidência e neuro-oncologia visual em linguagem acessível: mapa 3D do cérebro, fila de priorização clínica, análise de imagens e o consultor Dr.Gliou.",
      "nav.inicio": "Início", "nav.biomarcadores": "Biomarcadores", "nav.tumores": "Análise por tumor",
      "nav.graficos": "Gráficos", "nav.mapa3d": "Mapa 3D do cérebro", "nav.imagem": "Análise de imagem",
      "nav.fila": "Fila de espera", "nav.agente": "Dr.Gliou", "nav.perguntar": "Perguntar", "nav.sobre": "Sobre e fontes", "nav.lacunas": "Lacunas médicas",
      "gaps.h2": "Lacunas médicas em neuro-oncologia", "gaps.lead": "Onde a medicina ainda não tem resposta: lacunas medidas na própria base (cobertura de desfecho por entidade) e lacunas curadas da literatura e do cenário de ensaios clínicos — tratamento, diagnóstico, acesso e pediatria.",
      "nav.sec.publico": "Acesso público", "nav.sec.prof": "Área do médico",
      "auth.title": "Área do médico", "auth.subtitle": "Cadastro local (neste navegador) para acessar fila de pacientes e o consultor Dr.Gliou com casos reais. O conteúdo educativo permanece público.",
      "auth.login": "Entrar", "auth.register": "Cadastrar", "auth.logout": "Sair",
      "auth.name": "Nome completo", "auth.crm": "CRM / registro profissional", "auth.email": "E-mail",
      "auth.pass": "Senha (mín. 6)", "auth.pass2": "Confirmar senha", "auth.have": "Já tenho cadastro",
      "auth.new": "Criar cadastro", "auth.asvisitor": "Continuar como visitante (conteúdo público)",
      "auth.locked": "Conteúdo profissional", "auth.lockedmsg": "Esta área exige cadastro médico local (armazenado somente neste navegador, com senha hasheada). Não é um sistema hospitalar: não armazene dados sensíveis de pacientes reais em dispositivos compartilhados.",
      "auth.bad": "Credenciais inválidas ou cadastro inexistente.", "auth.mismatch": "As senhas não conferem.",
      "auth.short": "Senha muito curta (mín. 6).", "auth.exists": "Este e-mail já está cadastrado neste navegador.",
      "auth.welcome": "Sessão ativa:",
      "home.h2": "O que este painel faz",
      "bm.h2": "Selecione um ou mais biomarcadores", "home.pan": "Panorama da base", "home.types": "Que tipos de estudo sustentam a base?", "home.gloss": "Mini glossário", "home.imp": "Importante",
      "home.lead": "Um <strong>glioma</strong> é um tumor que nasce nas células de suporte do cérebro (a glia). Hoje, além do nome e do grau, cada glioma é identificado por <strong>biomarcadores</strong> — alterações no DNA que dizem como ele se comporta e quais tratamentos podem funcionar. Este painel organiza essas informações em gráficos simples.",
      "graf.one": "Um gráfico para cada biomarcador", "graf.one.lead": "Cada cartão mostra a frequência típica do biomarcador nos gliomas em que ele aparece. <strong>Clique</strong> para abrir a análise completa e a descrição.",
      "graf.prog": "Prognóstico: idade × grau do glioma", "graf.prog.lead": "Sobrevida estimada em 5 anos (%), cruzando a <strong>faixa de idade no diagnóstico</strong> com o <strong>grau OMS</strong> do tumor. Quanto mais quente a cor, melhor o prognóstico esperado.",
      "map.lead": "Escolha um tumor (ou um grupo) para ver onde ele costuma se concentrar. O tamanho e a cor de cada ponto indicam a <strong>frequência relativa</strong> descrita na literatura médica (OMS CNS5, NCI PDQ e séries de neuroimagem).",
      "img.lead": "Envie uma foto de exame (ressonância/TOM computadorizada) ou de lâmina de histopatologia. O GlioBio extrai <strong>descritores quantitativos</strong> da imagem (brilho, contraste, textura, bordas, padrões císticos/necróticos e calcificações) e compara com as <strong>assinaturas visuais curadas</strong> de cada tipo de glioma no banco de dados, devolvendo o ranking de compatibilidade.",
      "ask.h2": "Pergunte à base", "ask.hint": "Busca em linguagem natural sobre os dados indexados (TF-IDF + similaridade, executados no seu navegador).", "ask.ph": "Ex.: Qual o prognóstico do MGMT no glioblastoma?", "bm.lead": "O painel mostra <strong>quais gliomas estão mais associados</strong> a eles, em porcentagem, e termina com a <strong>descrição completa</strong> de cada biomarcador escolhido.", "bm.search": "Buscar biomarcador… (ex.: IDH, MGMT, BRAF)",
      "bm.pre1": "IDH + 1p/19q", "bm.pre2": "MGMT", "bm.pre3": "Alvos terapêuticos", "bm.pre4": "Histonas H3", "bm.clear": "Limpar seleção",
      "tum.h2": "Análise por tipo de glioma", "tum.gen": "Gerar análise", "tum.lead": "Escolha uma entidade da classificação OMS (2021) para ver sobrevida global (OS) e força da evidência em porcentagem, calculadas a partir dos estudos indexados.",
      "graf.h2": "Gráficos", "map.h2": "Mapa 3D do cérebro", "map.lead": "Onde cada glioma costuma aparecer: gire, dê zoom e clique nas regiões para ver funções, déficits e neoplasias.",
      "ask.h2": "Perguntar à base", "ask.lead": "Busca em linguagem natural sobre os estudos indexados (TF-IDF): pergunte e receba as evidências mais relacionadas.",
      "home.stats.ent": "entidades da OMS CNS5 catalogadas", "home.stats.studies": "estudos indexados no PubMed",
      "home.stats.bio": "biomarcadores com descrição clínica", "home.stats.reg": "regiões mapeadas no cérebro 3D", "home.stats.pat": "pacientes com n verificado na base",
      "home.stats.ev": "força média da evidência (somente estudos com desfecho agregado)",
      "home.stats.desf": "estudos com desfecho agregado usados nesse cálculo (meta-análises/SR/ensaios)",
      "home.stats.os": "estudos com escore de sobrevida (OS) verificado",
      "home.stats.meta": "meta-análises/revisões sistemáticas do PubMed na base",
      "home.stats.ia": "estudos de IA aplicada a gliomas no PubMed (inclui meta-análises/revisões de IA)",
      "fila.h2": "Fila de espera por prioridade clínica",
      "fila.lead": "Cadastre pacientes aguardando avaliação/cirurgia com descrição clínica e foto, e acompanhe a fila ordenada pela gravidade. Os dados ficam salvos somente neste navegador.",
      "fila.id": "Identificação (iniciais ou código)", "fila.age": "Idade", "fila.ent": "Hipótese diagnóstica (OMS CNS5)",
      "fila.status": "Situação", "fila.desc": "Descrição clínica do paciente (sintomas, exames, contexto)",
      "fila.photo": "Foto do paciente ou do exame (opcional)", "fila.add": "Adicionar à fila",
      "fila.waiting": "aguardando agora", "fila.avgdays": "dias médios em espera", "fila.very": "prioridade muito alta",
      "fila.total": "cadastros totais", "fila.col.pos": "#", "fila.col.pat": "Paciente", "fila.col.age": "Idade",
      "fila.col.ent": "Hipótese diagnóstica", "fila.col.grade": "Grau", "fila.col.sev": "Gravidade",
      "fila.col.score": "Pontuação", "fila.col.wait": "Espera", "fila.col.status": "Situação",
      "fila.st.wait": "Aguardando", "fila.st.called": "Convocado", "fila.st.treat": "Em tratamento",
      "fila.notes": "Descrição:", "fila.how": "Como calculamos a prioridade (transparência)",
      "img.h2": "Análise de imagem — qual o tipo de glioma mais provável?",
      "img.drop": "Clique ou arraste uma imagem de exame (RM/TC em tons de cinza ou lâmina H&E)",
      "img.dropsub": "JPG/PNG · processada localmente, nada é enviado a servidores · analisador calibrado com 37 imagens reais rotuladas de glioma",
      "img.run": "Analisar padrão visual", "img.compat": "compatibilidade", "img.goto": "Ver análise completa da entidade →",
      "agent.h2": "Dr.Gliou — consultor de Tumor Board virtual",
      "lang.label": "Idioma", "lang.pt": "Português", "lang.en": "English",
      "common.disclaimer": "Esta análise é gerada por IA e deve ser validada por um neuro-oncologista. Não constitui prescrição médica.",
      "badge.ent": "entidades OMS", "badge.stud": "estudos indexados", "badge.bio": "biomarcadores", "badge.meta": "meta-análises", "badge.ai": "estudos de IA"
    },
    en: {
      "ag.lead": "A molecular neuro-oncology specialist agent that reads the <strong>free-text case description</strong> and returns: structured chart, integrated WHO 2021 diagnosis, prognosis, a two-column treatment plan (<strong>international reference × SUS reality</strong>), clinical trials, explainability for each recommendation and alerts. Runs 100% in your browser.",
      "ag.prof": "<strong>Professional use.</strong> Decision-support tool for physicians. Never replaces clinical judgment. This analysis is AI-generated and must be validated by a neuro-oncologist. It is not a medical prescription.",
      "ag.label": "Free-text clinical case description", "ag.ph": "E.g.: Male, 62 years, KPS 80, headache and focal seizure for 2 months. MRI: 4.8 cm left frontal lesion with ring enhancement and necrosis. Subtotal resection. IDH wildtype, MGMT methylated, TERT promoter mutated, EGFR amplified, no 1p/19q codeletion, ATRX retained. On phenytoin. Treated in the public system.",
      "ag.c0": "Case 1 · Elderly GBM (SUS)", "ag.c1": "Case 2 · Oligodendroglioma G2 (private)", "ag.c2": "Case 3 · Pediatric DMG H3 K27M", "ag.clear": "Clear", "ag.run": "Analyze case (6-step pipeline)",
      "home.typesnote": "Each indexed study was classified by publication type (PubMed). This shows the available evidence strength.", "graf.g5": "5-year survival by grade", "graf.g5note": "Light band = estimated range across the different entities of the same grade.", "graf.idade": "The weight of age in glioblastoma", "graf.idadenote": "Relative risk (HR) by age band, taking under-50 as reference (= 1.00).", "graf.graus": "Which tumors belong to each grade", "map.h2b": "3D map — glioma concentration across brain regions", "sobre.h2": "About this base", "sobre.met": "Calculation method", "sobre.fontes": "Sources", "sobre.aviso": "Disclaimer",
      "hero.h1": "Evidence-based neuro-oncology", "hero.cta1": "Explore biomarkers", "hero.cta2": "See medical gaps", "hero.trust": "No data leaves your device · runs 100% in your browser · never replaces physician judgment",
      "cred.by": "Developed by", "cred.note": "Concept, clinical curation and development of the GlioBio platform.", "cred.role": "Neuropathology Researcher", "cred.dev": "Development",
      "rail.ctx": "Quick context", "rail.ctxbody": "Every percentage shown derives from the indexed studies (PubMed/WHO). Entities without aggregated outcomes are flagged as evidence gaps.", "rail.l1": "Prognosis charts", "rail.l2": "3D brain map", "rail.l3": "Sources & methods",
      "hdr.kicker": "Academic neuro-oncology platform · evidence-based",
      "hdr.sub": "Biomarkers, evidence and visual neuro-oncology in accessible language: 3D brain map, clinical priority queue, image analysis and the Dr.Gliou consultant.",
      "nav.inicio": "Home", "nav.biomarcadores": "Biomarkers", "nav.tumores": "Tumor analysis",
      "nav.graficos": "Charts", "nav.mapa3d": "3D brain map", "nav.imagem": "Image analysis",
      "nav.fila": "Waiting list", "nav.agente": "Dr.Gliou", "nav.perguntar": "Ask", "nav.sobre": "About & sources", "nav.lacunas": "Medical gaps",
      "gaps.h2": "Medical gaps in neuro-oncology", "gaps.lead": "Where medicine still has no answer: gaps measured in the base itself (outcome coverage per entity) and curated gaps from the literature and trial landscape — treatment, diagnosis, access and pediatrics.",
      "nav.sec.publico": "Public access", "nav.sec.prof": "Physician area",
      "auth.title": "Physician area", "auth.subtitle": "Local registration (this browser only) to access the patient queue and Dr.Gliou with real cases. Educational content remains public.",
      "auth.login": "Sign in", "auth.register": "Register", "auth.logout": "Sign out",
      "auth.name": "Full name", "auth.crm": "Medical license / professional ID", "auth.email": "E-mail",
      "auth.pass": "Password (min. 6)", "auth.pass2": "Confirm password", "auth.have": "I already have an account",
      "auth.new": "Create account", "auth.asvisitor": "Continue as visitor (public content)",
      "auth.locked": "Professional content", "auth.lockedmsg": "This area requires local physician registration (stored only in this browser, password hashed). It is not a hospital system: do not store sensitive real-patient data on shared devices.",
      "auth.bad": "Invalid credentials or account not found.", "auth.mismatch": "Passwords do not match.",
      "auth.short": "Password too short (min. 6).", "auth.exists": "This e-mail is already registered in this browser.",
      "auth.welcome": "Active session:",
      "home.h2": "What this panel does",
      "bm.h2": "Select one or more biomarkers", "home.pan": "Base overview", "home.types": "Which study types support the base?", "home.gloss": "Mini-glossary", "home.imp": "Important",
      "home.lead": "A <strong>glioma</strong> is a tumor arising from the brain's support cells (the glia). Today, beyond name and grade, each glioma is identified by <strong>biomarkers</strong> — DNA alterations that tell how it behaves and which treatments may work. This panel organizes that information into simple charts.",
      "graf.one": "One chart per biomarker", "graf.one.lead": "Each card shows the typical frequency of the biomarker in the gliomas where it appears. <strong>Click</strong> to open the full analysis and description.",
      "graf.prog": "Prognosis: age × glioma grade", "graf.prog.lead": "Estimated 5-year survival (%), crossing <strong>age at diagnosis</strong> with the tumor's <strong>WHO grade</strong>. The warmer the color, the better the expected prognosis.",
      "map.lead": "Choose a tumor (or a group) to see where it tends to concentrate. Point size and color indicate the <strong>relative frequency</strong> described in the medical literature (WHO CNS5, NCI PDQ and neuroimaging series).",
      "img.lead": "Upload an exam photo (MRI/CT) or a histopathology slide. GlioBio extracts <strong>quantitative descriptors</strong> from the image (brightness, contrast, texture, edges, cystic/necrotic patterns and calcifications) and compares them with the <strong>visual signatures trained on real glioma images</strong>, returning a compatibility ranking.",
      "ask.h2": "Ask the database", "ask.hint": "Natural-language search over the indexed data (TF-IDF + similarity, running in your browser).", "ask.ph": "E.g.: What is the prognostic value of MGMT in glioblastoma?", "bm.lead": "The panel shows <strong>which gliomas are most associated</strong> with them, in percentage, and ends with the <strong>full description</strong> of each chosen biomarker.", "bm.search": "Search biomarker… (e.g.: IDH, MGMT, BRAF)",
      "bm.pre1": "IDH + 1p/19q", "bm.pre2": "MGMT", "bm.pre3": "Therapeutic targets", "bm.pre4": "Histones H3", "bm.clear": "Clear selection",
      "tum.h2": "Analysis by glioma type", "tum.gen": "Generate analysis", "tum.lead": "Choose a WHO (2021) entity to see overall survival (OS) and evidence strength as percentages, computed from the indexed studies.",
      "graf.h2": "Charts", "map.h2": "3D brain map", "map.lead": "Where each glioma tends to appear: rotate, zoom and click regions to see functions, deficits and neoplasms.",
      "ask.h2": "Ask the base", "ask.lead": "Natural-language search over the indexed studies (TF-IDF): ask and receive the most related evidence.",
      "home.stats.ent": "WHO CNS5 entities catalogued", "home.stats.studies": "studies indexed in PubMed",
      "home.stats.bio": "biomarkers with clinical description", "home.stats.reg": "regions mapped in the 3D brain", "home.stats.pat": "patients with verified n in the base",
      "home.stats.ev": "mean evidence strength (only studies with aggregated outcomes)",
      "home.stats.desf": "studies with aggregated outcomes used in this calculation (meta-analyses/SRs/trials)",
      "home.stats.os": "studies with verified survival (OS) score",
      "home.stats.meta": "PubMed meta-analyses/systematic reviews in the base",
      "home.stats.ia": "AI studies on gliomas in PubMed (incl. AI meta-analyses/reviews)",
      "fila.h2": "Waiting list by clinical priority",
      "fila.lead": "Register patients awaiting evaluation/surgery with clinical description and photo, and follow the queue ordered by severity. Data is stored only in this browser.",
      "fila.id": "Identification (initials or code)", "fila.age": "Age", "fila.ent": "Diagnostic hypothesis (WHO CNS5)",
      "fila.status": "Status", "fila.desc": "Clinical description (symptoms, exams, context)",
      "fila.photo": "Patient or exam photo (optional)", "fila.add": "Add to queue",
      "fila.waiting": "currently waiting", "fila.avgdays": "mean days waiting", "fila.very": "very high priority",
      "fila.total": "total registrations", "fila.col.pos": "#", "fila.col.pat": "Patient", "fila.col.age": "Age",
      "fila.col.ent": "Diagnostic hypothesis", "fila.col.grade": "Grade", "fila.col.sev": "Severity",
      "fila.col.score": "Score", "fila.col.wait": "Waiting", "fila.col.status": "Status",
      "fila.st.wait": "Waiting", "fila.st.called": "Called", "fila.st.treat": "In treatment",
      "fila.notes": "Description:", "fila.how": "How priority is computed (transparency)",
      "img.h2": "Image analysis — which glioma type is most likely?",
      "img.drop": "Click or drag an exam image (grayscale MRI/CT or H&E slide)",
      "img.dropsub": "JPG/PNG · processed locally, nothing is uploaded · analyzer calibrated on 37 labeled real glioma images",
      "img.run": "Analyze visual pattern", "img.compat": "compatibility", "img.goto": "See full entity analysis →",
      "agent.h2": "Dr.Gliou — virtual Tumor Board consultant",
      "lang.label": "Language", "lang.pt": "Português", "lang.en": "English",
      "common.disclaimer": "This analysis is AI-generated and must be validated by a neuro-oncologist. It is not a medical prescription.",
      "badge.ent": "WHO entities", "badge.stud": "indexed studies", "badge.bio": "biomarkers", "badge.meta": "meta-analyses", "badge.ai": "AI studies"
    }
  };
  var lang = "pt";
  try { lang = localStorage.getItem("gliobio_lang") || "pt"; } catch (e) { }
  function t(key) { return (D[lang] && D[lang][key]) || D.pt[key] || key; }
  function apply() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("#entity-select option, #viz-entity option").forEach(function (o2) { if (!o2.value) { o2.textContent = (window.ENon && ENon()) ? "\u2014 or a specific entity \u2014" : "\u2014 ou uma entidade espec\u00edfica \u2014"; return; } o2.textContent = window.ENAM ? ENAM(o2.value) : o2.value; });
    document.querySelectorAll("[id-ph]").forEach(function (el) { el.placeholder = t(el.getAttribute("id-ph")); });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    document.dispatchEvent(new CustomEvent("gliobio:lang", { detail: lang }));
  }
  function set(l) { lang = l; try { localStorage.setItem("gliobio_lang", l); } catch (e) { } apply(); }
  window.I18N = { t: t, apply: apply, set: set, get lang() { return lang; } };
})();
