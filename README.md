---
title: 'GlioBio: a dependency-free, browser-based platform for evidence-based visualization of glioma biomarkers, molecular classification and neuro-oncology education'
tags:
  - neuro-oncology
  - glioma
  - biomarkers
  - molecular classification
  - scientific visualization
  - medical education
  - evidence-based medicine
authors:
  - name: Gabriel César
    affiliation: 1
affiliations:
  - name: Independent Researcher in Neuropathology, Brasília, Brazil
    index: 1
date: 22 October 2026
bibliography: paper.bib
---

# Summary

GlioBio is an open, browser-based platform that organizes and visualizes the
molecular landscape of human gliomas for a non-specialist and clinical
audience. Built entirely in plain HTML, CSS and JavaScript with **zero
runtime dependencies and no backend**, it runs offline or on any static host
(e.g., Hugging Face Spaces) and executes 100% of its analysis client-side,
which makes it usable in privacy-sensitive and low-connectivity settings.
The platform encodes the WHO CNS5 classification (20 entities) [@Louis2021],
32 biomarkers with diagnostic, prognostic, predictive and molecular-class
roles, and an indexed evidence base of 10,941 PubMed records — including
2,238 meta-analyses/systematic reviews and 7,393 artificial-intelligence-
related publications — collected and curated by the author. On top of this
base, GlioBio provides: per-entity analysis panels (literature 5-year
overall survival, study-reported OS level, and evidence strength computed
*only* over studies with aggregated outcomes); interactive SVG charts
(donuts, rings, horizontal and range bars, age×grade heatmaps, sparkbars);
a WebGL 3D brain atlas (FreeSurfer `fsaverage` mesh decoded in-browser)
that maps where each glioma entity typically arises and what each region
does [@Fischl2012]; a gated educational image-analysis module that extracts
18 quantitative descriptors from uploaded MRI/histology images and ranks
entities by calibrated similarity; a clinical waiting-list simulator; and
*Dr.Gliou*, a deterministic, rule-based tumor-board consultant that returns
an integrated WHO 2021 diagnosis, prognosis, a two-column therapeutic plan
(international reference × Brazilian public-system reality), trial
suggestions and explainability for every recommendation. The interface is
fully bilingual (pt-BR/EN) via a translation overlay and follows an
academic light theme. Extensive safety framing is embedded: permanent
disclaimers that the tool never replaces physician judgment, gating of
patient-level modules behind a local-only account, explicit flagging of
missing molecular data, and a rule that no trial is ever invented.

# Statement of need

The 2021 WHO CNS5 classification made molecular markers (IDH, 1p/19q, MGMT,
CDKN2A/B, H3 K27/K27M, EGFR, TERT and others) definitional for glioma
diagnosis and therapy selection [@Louis2021; @Weller2021], yet the resulting
knowledge is scattered across paywalled guidelines, trial reports
[@Stupp2005; @Hegi2005; @Cairncross2013; @vandenBent2013; @vandenBent2017;
@Mellinghoff2023] and large genomic portals that assume bioinformatics
literacy. Students, early-career clinicians, researchers from adjacent
fields and — critically — patients and families lack a single, auditable,
language-accessible view of *which marker means what, in which tumor, with
which strength of evidence*. GlioBio addresses this gap: it is designed for
(i) the general public seeking understandable neuro-oncology information,
(ii) students and residents learning molecular classification, and
(iii) researchers who need a fast visual workbench to explore prevalence,
prognosis and evidence quality per entity and biomarker. Unlike
server-dependent alternatives, every percentage shown is traceable to the
indexed study set, and every narrative ends with a plain-language
description, making the reasoning transparent rather than opaque.

# State of the field

cBioPortal [@Cerami2012] and OncoKB [@Chakravarty2017] are the reference
open resources for cancer genomics and variant interpretation; both are
server-backed, require dataset selection and target expert users, and
neither provides population-level prognosis visualization, educational
narratives or bilingual public access. Commercial clinical references
(e.g., UpToDate) are paywalled and closed. Radiology teaching sites curate
images but are not open-source software and do not quantify evidence.
GlioBio complements rather than competes with these resources: it is the
only tool in this space that (a) ships as a static, dependency-free bundle
that runs entirely in the browser, (b) couples a curated evidence base with
explicit, recomputable evidence-strength metrics, (c) offers an interactive
3D anatomical atlas linked to entities, and (d) enforces educational safety
guards (disclaimers, gating, no invented trials) by construction.

# Software design

GlioBio preserves an original search core (`data.js`, TF-IDF + cosine
similarity engine in `app.js` [@Salton1983]) byte-identical and layers 15
modules above it: `ui.js` (rendering and i18n overlay), `charts.js`
(dependency-free SVG grammar), `brain3d.js` (WebGL renderer with quantized
`fsaverage` meshes, heat-mapping and label decluttering on a 2D overlay),
`analytics.js`/`knowledge.js`/`biomarkers.js` (evidence metrics and curated
clinical layer), `imagerec.js` (hand-crafted descriptor extraction and
nearest-neighbour ranking calibrated on 44 real MRI/H&E images),
`queue.js`, `auth.js` (local-only, disclosed as single-device),
`neuroonco.js` (trial knowledge) and `translations.js`/`i18n.js`
(PT/EN overlay). Determinism is a design principle: the tumor-board agent
is a rule pipeline, so identical inputs always yield identical outputs and
every recommendation carries its triggering rule. Correctness is checked by
headless DOM smoke tests (all tabs, all entities, all biomarkers, both
languages), syntax gates on every module, and scripted visual captures.

# Research impact statement

GlioBio is the instrument of an ongoing evidence-synthesis effort on glioma
biomarkers: its curated layer encodes the collection and manual verification
of 2,238 meta-analyses/systematic reviews and outcome data for 2,919
studies, and the platform's computations accompany a technical report
(included in the distribution) documenting methodology, calibration and
validation. The author uses the platform as a curation workbench for this
base and as an educational demonstration in neuropathology outreach; its
bilingual public layer is designed for adoption by teaching hospitals and
patient-advocacy groups.

# AI usage disclosure

Conversational AI assistance (Arena.ai agent mode) was used during
development for code scaffolding, refactoring and interface iteration. All
clinical content, data curation, calibration decisions and validation were
performed and verified by the author against primary literature. At runtime
the platform uses no large language models: narratives and the consultant
output are deterministic templates over the curated base.

# Acknowledgements

The author thanks PubMed/NCBI for bibliographic data, the FreeSurfer project
for the `fsaverage` surfaces (via the nilearn OSF mirror), and Wikimedia
Commons contributors for real MRI/H&E calibration images. No external funding
was received.

# References
