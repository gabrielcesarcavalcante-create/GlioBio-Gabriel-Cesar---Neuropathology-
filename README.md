---
title: GlioBio
author: Gabriel César - Neuropathology Researcher 
---

# GlioBio — biomarcadores de gliomas e neuro-oncologia baseada em evidências.

A base de dados original (**`data.js`**: 20 entidades da OMS CNS5 + 197 estudos indexados no PubMed) e o motor de busca (**`app.js`**: TF-IDF + similaridade de cosseno) foram **preservados sem alteração**. Sobre eles, esta versão acrescenta uma camada de análise visual pensada para o público geral.

## O que há de novo (v2.12)

- **Tema acadêmico claro:** fundo branco levemente amarelado (#FBF7EC), cartões em creme/papel, **todos os textos em preto** e **fonte serifada acadêmica** (Georgia/Times) em toda a interface; paleta de destaque **azul e verde** (#1D4ED8, #15803D) com tintas suaves para pílulas, avisos e escalas de dados.
- **Mapa 3D adaptado ao papel:** palco pergaminho, cérebro com base pergamino e rampa de calor azul→verde→âmbar→vermelho comprimida, pílulas de rótulo com anti-sobreposição e legenda de escala visível.
- **Correções lógicas e de tradução:** H1 do hero restaurado no tema claro; glossário com termo/definição em linhas próprias; option padrão do seletor de entidade do 3D restaurada no overlay PT/EN; ícones SVG sem regra de tamanho contidos (catch-all `:where`); avisos profissionais como blocos; cores de escalas (sobrevida, evidência, graus, composição) re-centradas para contraste sobre papel.
- **Ajustes de proporção dos gráficos:** donuts de composição de estudos (Início e Análise por tumor) reduzidos à metade da largura; anéis de "Sobrevida global (OS) e força da evidência — em porcentagem dos estudos" ampliados para 190 px, lado a lado.
- **Verificação página a página:** 16 capturas PT/EN de todas as abas (públicas e área do médico) sem sobreposição de elementos e sem campos escuros; smokes jsdom PT/EN com 0 erros.

## O que há de novo (v2.11)

- **Ícones contidos em toda a interface:** bloco de contenção limita SVGs de UI a 16–20 px (agentes/estados vazios 18–30 px), isentando apenas gráficos e a marca; sparkbars dentro de cartões-botão restaurados a 100%×42 px.
- **Números e campos corrigidos:** tile enganoso "200 pacientes" (soma de só 2 estudos) substituído por "19 regiões mapeadas no cérebro 3D"; nomes e classes dos biomarcadores voltam a traduzir no modo EN (BLOC/KL); ~40 valores da ficha do Dr.Gliou traduzidos (Methylated, Gross-total resection, Public system (SUS), Phenytoin, "Internal base", "2nd line and beyond"); contraste dos textos secundários elevado (--steel-400 #A6B4CA e rótulos de gráfico).
- **Espaçamento reequilibrado:** mais respiro em hero, cartões, células de tabela e canvas de visualização; menos vazio improdutivo em rails, gaps duplos e paddings de painel (grid 258/1fr/236, toolbar 56 px, hero clamp 44–92 px).

## O que há de novo (v2.10)
1. **Inglês integral**: ao mudar para EN, TODO o conteúdo funcional traduz — inclusive o Dr.Gliou (ficha, diagnóstico, prognóstico, plano ideal × SUS, ensaios, explicabilidade, alertas e próximos passos), o painel Sobre/fontes, os casos-exemplo, placeholders e títulos restantes (overlay `TR.agent`/`TR.cases`/campos `en`).
2. **Polish visual**: ícones de seção contidos, textos em branco frio (melhor contraste) e escala tipográfica reequilibrada (nada gigante nem minúsculo).
3. **Mapa 3D readaptado ao dark**: fundo do canvas transparente sobre gradiente ink, pílulas de rótulo escuras legíveis, palco com altura responsiva e vignette.

## O que há de novo (v2.9)
1. **Identidade visual dark acadêmica** (design system `framer-layout-style.json`): ink navy `#080C16`, azul institucional `#4C7DF0`, serifa display no hero/títulos, mono em labels, grid + noise sutis, navbar sticky com blur, hero central com H1 em gradiente e o painel como **app frame flutuante** com glow azul (toolbar + left rail de abas + canvas + right rail de contexto).
2. **Crédito de desenvolvimento**: rodapé global, cartão no right rail e painel Sobre — *Desenvolvido por Gabriel César, Pesquisador em Neuropatologia*.

## O que há de novo (v2.8)
1. **Análise de imagem na ÁREA DO MÉDICO** — agora exige cadastro/login local (como fila e Dr.Gliou); as abas educativas continuam públicas.
2. **Análise de imagem muito mais rica e precisa** — 18 descritores quantitativos (brilho, desvio, bimodalidade Otsu, frações escura/clara, bordas, contraste/homogeneidade/energia/correlação GLCM, saturação, entropia de Shannon, assimetria, curtose, índice de realce anelar, focos muito brilhantes, anisotropia H×V e percentis 10/90), retreinada com **44 imagens reais** de glioma (29 RM + 15 H&E rotuladas, Wikimedia Commons). Validação leave-in: **16/26 top-1** no subconjunto rotulado de RM (GBM 14/16; antes: 5/22). A distância de compatibilidade é ponderada por **pesos discriminativos** por descritor (variância entre entidades ÷ variância dentro, medida nas imagens de treino). A interface exibe todos os descritores extraídos e os 5 que mais sustentam o 1º lugar, com avisos honestos de baixa confiança. Sem rede neural e sem envio de dados: tudo roda no navegador.
3. **Inglês em TODAS as funções** — o overlay `translations.js` traduz nomes e descrições dos 32 biomarcadores, fichas das 20 entidades, regiões do cérebro 3D, fila, análise de imagem, lacunas, glossário, presets, placeholders e cabeçalhos de painel — sem alterar `data.js`/`app.js`. Apenas algumas narrativas clínicas curadas do Dr.Gliou permanecem em pt-BR (aviso no topo quando EN ativo).
4. **Nova seção pública "Lacunas médicas em neuro-oncologia"** — cobertura objetiva de desfecho por entidade calculada da própria base (entidades em 0% = lacuna mensurável) + 14 lacunas curadas da literatura e do cenário de ensaios clínicos, em tratamento, diagnóstico, acesso e pediatria.

Arquivos novos: `translations.js` (overlay PT→EN) e `gaps.js` (seção de lacunas).


1. **Sobrevida global (OS) e Força da evidência em porcentagem, em relação aos estudos**
   - *Sobrevida em 5 anos (OS)* — estimativa de sobrevida relativa da literatura para cada entidade (com fonte citada).
   - *OS — nível reportado pelos estudos* — média dos escores qualitativos `os_level` (1–5) dos estudos verificados, normalizada em 100%, sempre acompanhada da **cobertura** (quantos estudos entraram no cálculo).
   - *Força da evidência* — nível de evidência por estudo (curado, ou derivado do tipo de publicação: meta-análise/ensaio randomizado = 5 … carta = 1), média sobre **todos** os estudos da entidade, normalizada em 100%.
   - Composição dos estudos por tipo de publicação (rosca) e status de verificação.

2. **Análise por biomarcador** — um gráfico para cada um dos 32 biomarcadores do catálogo, mostrando a frequência típica da alteração em cada glioma associado; e um **campo de seleção múltipla** que responde *"quais gliomas estão mais associados a estes biomarcadores, em porcentagem?"* (modelo `1 − Π(1 − pᵢ)`, com ressalva de independência). Cada análise termina com a **descrição clínica completa** do biomarcador (o que é, como é detectado, papel diagnóstico/prognóstico/preditivo e referências).

3. **Prognóstico (idade) × grau do glioma** — mapa de calor de sobrevida estimada em 5 anos cruzando 5 faixas etárias com os graus OMS (1, 2, 3, 4 e "sem grau definido"), calibrado nas cifras publicadas de sobrevida do glioblastoma por idade (CBTRUS/revisões), além do HR por faixa etária e da mediana de OS por idade.

4. **Visualizador 3D do cérebro** — motor próprio em `<canvas>` (projeção 3D + painter's algorithm, sem three.js) que mostra a **concentração dos gliomas nas regiões cerebrais** (frontal, temporal, parietal, occipital, ínsula, tálamo, gânglios da base, tronco, cerebelo, ventrículos, medula, leptomeninges), com pesos derivados da OMS CNS5, do NCI PDQ e de séries de neuroimagem. Gire com o mouse/dedo, zoom com scroll/pinça, presets de vista, ranking de regiões em % e destaque por clique.

5. **Layout para o público geral** — linguagem simples em todas as seções, glossário, explicações "como calculamos", avisos de segurança e navegação lateral.

6. **Interface clínica v2.7** — tema claro hospitalar-acadêmico (branco/ciano-suave, acento teal, títulos serifados), **navegação lateral fixa** com símbolos SVG minimalistas (sem emojis), **idioma PT/EN** com persistência, **cadastro/login local do médico** (senha com hash SHA-256; somente neste navegador) exigido apenas para a fila de pacientes e o Dr.Gliou com casos reais — todo o conteúdo educativo continua público.
7. **Fila com descrição e foto (v2.7)** — ao adicionar um paciente é possível escrever a descrição clínica completa e anexar foto (redimensionada e salva no navegador), com miniatura na tabela e linha expansível.
8. **Análise de imagem treinada em imagens reais (v2.7)** — 37 imagens reais rotuladas de glioma (22 RM + 15 H&E, Wikimedia Commons) calibram os descritores e as assinaturas por entidade (GBM, astrocitoma IDH-mutante, oligodendroglioma e H&E de alto grau); uma RM real de GBM é ranqueada como glioblastoma com ~91% de compatibilidade. Continua sendo ferramenta educacional de padrão visual, não diagnóstico.

## Estrutura de arquivos

| Arquivo | Papel |
|---|---|
| `index.html` | estrutura, navegação lateral (sidebar) e áreas pública/médica |
| `style.css` | identidade visual clínica clara (v2.7) + temas anteriores |
| `data.js` | **base original intacta** (20 entidades + 197 estudos, com PMID) |
| `studies_extra.js` | expansão v2.1: +134 estudos **reais** coletados do PubMed via E-utilities |
| `studies_meta.js` | expansão v2.2: **2.238 meta-análises/revisões sistemáticas reais** do PubMed (total 2.569 estudos) |
| `studies_ai.js` | expansão v2.4: **7.393 estudos reais do PubMed sobre IA aplicada a gliomas** (121 meta-análises/revisões de IA + DL, radiômica, NLP/LLM; total 9.962 estudos) |
| `studies_desfecho.js` | expansão v2.6: **979 estudos com desfecho agregado** (metas/SR/ECRs/ensaios) coletados por entidade; alimentam o indicador de força da evidência (total 10.941 estudos) |
| `neuroonco.js` | Dr.Gliou: consultor de Tumor Board virtual (pipeline de 6 passos, 100% no navegador) |
| `queue.js` | v2.7: fila educacional com priorização por gravidade, **descrição clínica livre e foto do paciente** (localStorage) |
| `imagerec.js` | v2.7: análise educacional de imagem — descritores quantitativos × assinaturas **treinadas em 37 imagens reais rotuladas** |
| `icons.js` | v2.7: 23 símbolos SVG minimalistas (traço fino, currentColor) que substituem os emojis |
| `i18n.js` | v2.7: dicionários PT-BR/EN + troca de idioma persistida |
| `auth.js` | v2.7: cadastro/login LOCAL do médico (SHA-256+salt) com gate das abas fila/Dr.Gliou |
| `brain3d.js` | v2.3: cérebro anatômico em **WebGL puro** com malha cortical REAL; clique na área → funções + déficits + neoplasias; fallback procedural/2D sem WebGL |
| `brainmesh.js` | v2.3: malha anatômica **real** embutida — superfície pial fsaverage (FreeSurfer/MRI) decimada (28,5k vértices) + cerebelo/tronco/medula em MNI; gzip+base64, decodificada no navegador |
| `app.js` | **motor de busca original intacto** (TF-IDF, intenções, entidades) |
| `knowledge.js` | camada clínica curada: graus OMS, idades, distribuição anatômica, âncoras de sobrevida, fontes |
| `biomarkers.js` | catálogo dos 32 biomarcadores: descrições, prevalências típicas por glioma, referências |
| `charts.js` | gráficos em SVG puro (barras, roscas, heatmap, anéis, faixas) |
| `analytics.js` | cálculos derivados (porcentagens em relação aos estudos, associação combinada, matriz idade×grau) |
| `ui.js` | ligação entre interface, dados e gráficos |

## Origem dos dados e da camada clínica

- **Base primária (inalterada):** classificação OMS CNS5 (2021), ensaios de referência (EORTC 26951, RTOG 9402, CATNON, Stupp/Hegi/Perry) e publicações indexadas no PubMed com PMID/DOI.
- **Camada clínica curada:** OMS CNS5 (graus e entidades), NCI PDQ (localizações típicas e desfechos pediátricos), EANO (papel diagnóstico dos marcadores), Stupp 2005 e Hegi 2005 (MGMT/temozolomida), Buckner 2016 (RTOG 9402), Reinhardt 2018 (HGAP), CBTRUS e revisões populacionais (sobrevida por idade), TCGA/coortes moleculares (prevalências de IDH, TP53, ATRX, TERT, CIC, FUBP1).

## Aviso

⚠️ Ferramenta de pesquisa e educação. Não realiza diagnóstico, não prevê desfechos individuais e não substitui avaliação médica. Prevalências e estimativas de sobrevida são médias de literatura e variam entre séries, populações e métodos laboratoriais.
