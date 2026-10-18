// =====================================================================
// translations.js — GlioBio v2.8: overlay EN do conteúdo curado
// (entidades, regiões, biomarcadores, glossário e rótulos de módulos).
// O pt-BR permanece nos arquivos originais; em modo EN a interface lê
// deste overlay via TR.* com fallback automático para o pt.
// =====================================================================
window.TR = {
  levels: { 1: "Very low", 2: "Low", 3: "Moderate", 4: "High", 5: "Very high" },
  ask: {
    heading: "Most relevant evidence in the base:",
    none: "No related evidence was found in the current base.",
    sim: "similarity",
    nodata: "Not enough data in the base for"
  },
  gloss: [
    ["Glioma", "A tumor arising from the support cells of the nervous system (glia). Includes astrocytomas, oligodendrogliomas, glioblastomas and several rare tumors."],
    ["Biomarker", "A DNA alteration (or DNA chemical pattern) that identifies the tumor, indicates how it tends to behave and may point to a specific treatment."],
    ["OS (overall survival)", "Time from diagnosis to death from any cause. The most used endpoint to measure benefit in oncology."],
    ["Median survival", "The point at which half of the patients in a group are still alive. Not an individual prediction."],
    ["HR (hazard ratio)", "Risk ratio. HR 0.50 = half the risk of the comparison group; HR 2.00 = double the risk; HR 1.00 = no difference."],
    ["95% CI", "95% confidence interval: the range where the true value probably lies. If the CI of an HR crosses 1.00, the result is not statistically significant."],
    ["WHO grade", "A 1–4 classification estimating tumor aggressiveness. In WHO CNS5 (2021) the grade can also be defined by molecular alterations."],
    ["Evidence strength", "How trustworthy the study set is: computed ONLY over studies with aggregated outcomes (meta-analyses, systematic reviews and clinical trials), which weigh more than narrative reviews and case reports."],
    ["Prognostic × predictive", "Prognostic: indicates the expected outcome regardless of treatment. Predictive: indicates whether a specific treatment tends to work better."],
    ["Methylation class", "A chemical 'fingerprint' of tumor DNA compared with thousands of known cases. Today the most precise method to classify rare tumors."]
  ],
  ent: {
    "Astrocitoma, IDH-mutante": { plain: "Infiltrative tumor of young adults carrying an IDH gene mutation. Grows slowly at first but may progress to higher grades over the years.", fam: "Adult-type diffuse glioma", age: "30–50 years (median ~40)" },
    "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado": { plain: "Diffuse glioma defined by two combined markers (IDH mutation plus 1p/19q codeletion). Tends to respond well to chemotherapy and radiotherapy.", fam: "Adult-type diffuse glioma", age: "35–55 years (median ~45)" },
    "Glioblastoma, IDH-wildtype": { plain: "The most common and most aggressive adult glioma (WHO grade 4), with necrosis and/or microvascular proliferation and diffuse infiltration of the brain.", fam: "Adult-type diffuse glioma", age: "55–75 years (median ~64)" },
    "Glioma difuso de linha média, H3 K27-alterado": { plain: "High-grade glioma of the midline (pons, thalamus, spinal cord) defined by the H3 K27 alteration; mostly affects children and has a very poor prognosis.", fam: "Pediatric-type diffuse high-grade glioma", age: "Children and young adults (median ~7 y)" },
    "Glioma hemisférico difuso, H3 G34-mutante": { plain: "High-grade hemispheric glioma of adolescents/young adults defined by the H3 G34 mutation, often with cortical involvement and seizures.", fam: "Pediatric-type diffuse high-grade glioma", age: "Adolescents/young adults (median ~14 y)" },
    "Glioma difuso pediátrico de baixo grau, alterado na via MAPK": { plain: "Childhood diffuse low-grade glioma driven by MAPK-pathway alterations (e.g., BRAF fusions); indolent but infiltrative, rarely curable by surgery alone.", fam: "Pediatric-type diffuse low-grade glioma", age: "Children (median ~6 y)" },
    "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype": { plain: "Pediatric high-grade glioma without H3 or IDH alterations; heterogeneous group with intermediate-to-poor outcome.", fam: "Pediatric-type diffuse high-grade glioma", age: "Children and adolescents" },
    "Glioma hemisférico infantil, tipo infantil": { plain: "Rare infantile hemispheric glioma with receptor tyrosine-kinase fusions (ALK/ROS1/NTRK/MET); large tumor with relatively favorable outcome after targeted or surgical therapy.", fam: "Pediatric-type low-grade glioma (infantile)", age: "Infants (<1 year)" },
    "Astrocitoma pilocítico": { plain: "Circumscribed grade-1 glioma, typically cystic with a mural nodule, frequent in the cerebellum and optic pathways of children; excellent prognosis after resection.", fam: "Circumscribed low-grade glioma", age: "Children/young adults (median ~10 y)" },
    "Astrocitoma de alto grau com características piloides": { plain: "Recently described high-grade astrocytoma with piloid features and characteristic methylation profile; behaves more aggressively than pilocytic astrocytoma.", fam: "Circumscribed glioma (new entity)", age: "Adults (median ~40 y)" },
    "Astrocitoma pleomórfico xanthoastrocytoma": { plain: "Cortical, circumscribed astrocytoma with pleomorphic cells and reticulin-rich stroma, often causing seizures; usually grade 2–3 with favorable outcome.", fam: "Circumscribed low-grade glioma", age: "Children/young adults" },
    "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)": { plain: "Rare low-grade epilepsy-associated tumor with CD34 positivity and kinase fusions (BRAF/FGFR/NTRK); excellent seizure control after resection.", fam: "Circumscribed low-grade glioma", age: "Children/young adults" },
    "Glioma angiocêntrico": { plain: "Rare, indolent cortical glioma with perivascular growth and MYB alterations, typically presenting with refractory epilepsy.", fam: "Circumscribed low-grade glioma", age: "Children/young adults" },
    "Glioma leptomeníngeo difuso glioneuronal": { plain: "Rare glioneuronal tumor spreading along the leptomeninges, often with KIAA1549-BRAF fusion and oligodendroglial-like morphology; variable course.", fam: "Circumscribed low-grade glioma", age: "Children/adolescents" },
    "Tumor glioneuronal mixoide": { plain: "Rare low-grade glioneuronal tumor with myxoid stroma and DGKZ/FGFR alterations, usually cortical and associated with seizures.", fam: "Circumscribed low-grade glioma", age: "Children/young adults" },
    "Ganglioglioma": { plain: "Low-grade glioneuronal tumor with dysplastic ganglion cells, the most common cause of long-standing focal epilepsy; BRAF V600E frequent; excellent outcome after resection.", fam: "Circumscribed low-grade glioma", age: "Children/young adults" },
    "Astrocitoma subependimário de células gigantes": { plain: "Grade-1 tumor of the lateral ventricle associated with tuberous sclerosis (TSC1/TSC2); responds to mTOR inhibitors (everolimus).", fam: "Circumscribed low-grade glioma", age: "Children (tuberous sclerosis)" },
    "Astroblastoma, MN1-alterado": { plain: "Circumscribed astroblastic tumor defined by MN1 alterations (often MN1-BEND2 fusion); predominantly young females, variable behavior.", fam: "Circumscribed glioma (new entity)", age: "Children/young adults (F>M)" },
    "Glioma cordoide": { plain: "Rare CNS tumor with chordoid morphology and NF2/MERLIN or SMARCB1-related pathways; spinal and intracranial locations described.", fam: "Circumscribed glioma (new entity)", age: "Adults" },
    "Tumor glioneuronal formador de rosetas": { plain: "Rare low-grade glioneuronal tumor with rosette formation, typically in the fourth ventricle/brainstem region; indolent course.", fam: "Circumscribed low-grade glioma", age: "Children/adults" }
  },
  reg: {
    frontal: { label: "Frontal lobe", short: "Frontal", desc: "Front of the brain: movement, planning, behavior and speech (Broca).", func: "Voluntary movement (primary motor and premotor cortex), expressive speech (Broca's area, usually left hemisphere), planning, judgment, working memory, personality, behavior and initiative (prefrontal cortex).", deficit: "Weakness on the opposite side of the body (hemiparesis), speech difficulty (expressive aphasia), personality and behavior changes, apathy or loss of planning." },
    parietal: { label: "Parietal lobe", short: "Parietal", desc: "Top/back: sensation, spatial orientation and integration of stimuli.", func: "Integration of sensations (touch, pain, temperature, proprioception), body schema, spatial orientation, calculation, writing and gesture planning (praxis).", deficit: "Contralateral sensory loss, spatial disorientation, one-sided neglect, difficulty with calculation, writing and gestures (Gerstmann syndrome in the dominant hemisphere)." },
    temporal: { label: "Temporal lobe", short: "Temporal", desc: "Lateral and inferior: memory, language (Wernicke) and hearing; common focus of tumor epilepsy.", func: "Hearing, memory and learning (hippocampus and medial structures), language comprehension (Wernicke's area), emotion and recognition of faces and scenes.", deficit: "Temporal lobe seizures (epigastric auras, déjà-vu), memory loss, comprehension aphasia and visual field defect (contralateral superior quadrantanopia)." },
    occipital: { label: "Occipital lobe", short: "Occipital", desc: "Back of the brain: visual processing.", func: "Vision processing: detection of shape, color, motion and visual recognition (primary visual cortex and associative areas).", deficit: "Contralateral homonymous hemianopia (loss of half of the visual field), simple visual hallucinations and difficulty recognizing faces or objects (agnosias)." },
    insula: { label: "Insula", short: "Insula", desc: "Deep fold between frontal, temporal and parietal; gliomas here are delicate to resect.", func: "Interoception (perception of internal body state), pain and taste integration, visceral and autonomic control, emotion and empathy; part of the language network.", deficit: "Hard-to-control seizures, autonomic changes (heart rate, digestion), taste/pain alterations and risk to language when the dominant hemisphere is involved." },
    basal_ganglia: { label: "Basal ganglia", short: "Basal ganglia", desc: "Deep nuclei controlling movement; region of difficult surgical access.", func: "Modulation and initiation of movement (striatum and globus pallidus), motor and habit learning, reward and decision-making circuits.", deficit: "Parkinsonism, dystonia, involuntary movements (hemiballismus) and contralateral weakness from internal capsule compression." },
    thalamus: { label: "Thalamus", short: "Thalamus", desc: "Central sensory relay station; frequent site of midline glioma.", func: "Sensory and motor relay to the cortex, modulation of alertness and consciousness, memory and pain/emotion circuits.", deficit: "Contralateral sensory loss, thalamic pain (Dejerine-Roussy), tremor, drowsiness and hydrocephalus from third-ventricle obstruction." },
    hypothalamus: { label: "Hypothalamus / optic chiasm", short: "Hypothalamus", desc: "Hormonal, appetite and vision regulation; gliomas here cause endocrinopathies and visual loss.", func: "Control of the pituitary and hormones, hunger and thirst, temperature, sleep-wake cycle and autonomic responses; adjacent to the optic chiasm (vision).", deficit: "Endocrinopathies (growth deficit, diabetes insipidus, hypopituitarism), weight gain or loss, excessive sleepiness and visual loss (bitemporal hemianopia)." },
    corpus_callosum: { label: "Corpus callosum", short: "Callosum", desc: "Fiber bundle connecting the hemispheres; route of bilateral spread ('butterfly').", func: "Interhemispheric connection: transfer of sensory, motor and cognitive information between the two sides.", deficit: "Disconnection syndromes (interhemispheric disconnection), progressive cognitive decline and bilateral motor deficits with 'butterfly' growth." },
    midbrain: { label: "Midbrain", short: "Midbrain", desc: "Upper brainstem: ocular motility and alertness.", func: "Ocular motility and pupils (III and IV nuclei), ascending activating system, motor and sensory pathways in transit.", deficit: "Parinaud syndrome (upgaze palsy), double vision, pupillary changes, hydrocephalus and long-tract signs." },
    pons: { label: "Pons", short: "Pons", desc: "Middle brainstem: cranial nerves and vital pathways; typical site of DIPG.", func: "Cranial nerve nuclei (V–VIII), breathing and sleep circuits, corticospinal and sensory pathways in transit to the cerebellum and cord.", deficit: "Cranial nerve palsies (face, swallowing, eye movement), ataxia, long-tract weakness and respiratory dysfunction — the classic DIPG picture." },
    medulla: { label: "Medulla oblongata", short: "Medulla", desc: "Lower brainstem: vital autonomic centers.", func: "Cardiorespiratory and autonomic control, swallowing and vomiting centers, lower cranial nerves (IX–XII) and tract decussations.", deficit: "Swallowing and voice changes, tongue weakness, respiratory/cardiac dysregulation and quadriparesis in dorsal/ventral spread." },
    cerebellum: { label: "Cerebellum", short: "Cerebellum", desc: "Coordination and balance; common site of pediatric pilocytic astrocytoma and medulloblastoma-like tumors.", func: "Coordination, balance, motor learning and timing of movements; modulation of cognition and eye movements.", deficit: "Ataxia (uncoordinated gait and limbs), nystagmus, scanning speech and truncal instability; hydrocephalus from fourth-ventricle compression." },
    fourth_ventricle: { label: "Fourth ventricle", short: "4th ventricle", desc: "CSF cavity between brainstem and cerebellum; site of ependymomas.", func: "Circulation of cerebrospinal fluid between the aqueduct and the spinal canal; adjacent to brainstem nuclei.", deficit: "Obstructive hydrocephalus (headache, vomiting), ataxia and cranial-nerve signs from brainstem compression." },
    lat_ventricle: { label: "Lateral ventricle", short: "Lat. ventricle", desc: "Lateral CSF cavities; origin of SEGA and intraventricular tumors.", func: "CSF production and circulation; periventricular niche of neural stem cells.", deficit: "Intermittent or positional hydrocephalus, intracranial hypertension and, with SEGA, acute obstruction of the foramen of Monro." },
    third_ventricle: { label: "Third ventricle", short: "3rd ventricle", desc: "Midline CSF cavity between thalami; site of midline and hypothalamic tumors.", func: "CSF pathway between the foramina of Monro and the aqueduct; borders hypothalamus and thalamus.", deficit: "Obstructive hydrocephalus, endocrine and visual disturbances from hypothalamic-chiasmatic involvement." },
    septum: { label: "Septum pellucidum", short: "Septum", desc: "Midline membrane between lateral ventricles.", func: "Midline landmark separating the lateral ventricles; part of limbic circuits.", deficit: "Usually silent; large lesions cause hydrocephalus or behavioral changes." },
    spinal_cord: { label: "Spinal cord", short: "Spinal cord", desc: "Medullary axis: spinal gliomas (astrocytomas, ependymomas, DMG).", func: "Conduction of motor, sensory and autonomic signals between brain and body; segmental reflexes.", deficit: "Progressive weakness and sensory level below the lesion, sphincter dysfunction, pain and, in cervical tumors, quadriplegia." },
    leptomeninges: { label: "Leptomeninges", short: "Leptomeninges", desc: "Pia-arachnoid covering; route of dissemination and of rare diffuse glioneuronal tumors.", func: "Covering and CSF circulation around brain and cord; immune interface.", deficit: "Multifocal deficits, cranial-nerve palsies, radicular pain and intracranial hypertension from CSF-flow block (leptomeningeal spread)." },
    ng: { label: "Not applicable", short: "N/A", desc: "Region not applicable to this entity.", func: "—", deficit: "—" }
  },
  bio: {
    idh12: { name: "IDH1 / IDH2", plain: "The 'switch' that separates gliomas into two big groups. Those with the mutation usually live much longer.", test: "Immunohistochemistry (IDH1 R132H) and IDH1/IDH2 sequencing; confirmation by DNA methylation.", desc: "IDH1/IDH2 mutations produce 2-hydroxyglutarate and a G-CIMP phenotype, defining the IDH-mutant WHO CNS5 entities; the strongest single prognostic marker in adult diffuse gliomas and rare in children (<5%)." },
    codel: { name: "1p/19q codeletion", plain: "Loss of one copy of arms 1p and 19q together — the fingerprint of oligodendroglioma, with better response to chemo.", test: "FISH, PCR-based LOH or sequencing/CNV analysis showing whole-arm 1p/19q loss.", desc: "Whole-arm 1p/19q codeletion results from a t(1;19) translocation and, combined with IDH mutation, defines oligodendroglioma; predicts benefit from PCV chemotherapy plus radiotherapy (RTOG 9402, CODEL)." },
    tert: { name: "TERT promoter", plain: "A mutation that 're-lights' the telomerase enzyme, giving the tumor immortalizing capacity; typical of GBM and oligodendroglioma.", test: "Sequencing of the TERT promoter hotspot regions (C228T/C250T).", desc: "TERT promoter mutations reactivate telomerase; in IDH-wildtype tumors they support the GBM diagnosis and, with 1p/19q codeletion in IDH-mutants, define oligodendroglioma; prognostic impact depends on the IDH context." },
    mgmt: { name: "MGMT promoter methylation", plain: "A 'chemical lock' on the MGMT gene: when methylated, the tumor cannot repair the damage of chemotherapy (temozolomide) — and responds better.", test: "Methylation-specific PCR or pyrosequencing (quantitative %) of the MGMT promoter.", desc: "MGMT promoter methylation silences the DNA-repair enzyme and predicts benefit from alkylating chemotherapy (temozolomide), decisive in elderly GBM and in the IDH-mutant setting (NOA-08/EORTC 26981)." },
    tp53: { name: "TP53", plain: "The 'genome guardian' gene; when mutated, it loses the ability to eliminate defective cells — common in astrocytomas.", test: "Sequencing of TP53 plus p53 immunohistochemistry (overexpression or null pattern).", desc: "TP53 mutation with ATRX loss supports the astrocytic lineage in IDH-mutant gliomas and helps separate them from oligodendrogliomas; also frequent in pediatric high-grade gliomas." },
    atrx: { name: "ATRX loss", plain: "Loss of the ATRX protein points to the astrocytoma lineage (it is preserved in oligodendroglioma).", test: "ATRX immunohistochemistry (loss of nuclear expression in tumor cells).", desc: "ATRX loss (alternative lengthening of telomeres) is a lineage marker of IDH-mutant astrocytoma and is retained in oligodendroglioma; part of the CNS5 diagnostic algorithm." },
    cdkn2ab: { name: "CDKN2A/B homozygous deletion", plain: "When this 'brake' of cell division is fully deleted, an IDH-mutant astrocytoma becomes grade 4 — even without looking aggressive under the microscope.", test: "CNV analysis (sequencing/FISH/MLPA) showing homozygous CDKN2A/B deletion.", desc: "Homozygous CDKN2A/B deletion upgrades IDH-mutant astrocytoma to CNS5 grade 4 (cIMPACT-NOW 5) and is a key prognostic discriminator; also relevant in mesenchymal GBM and pediatric entities." },
    egfr: { name: "EGFR amplification", plain: "Amplification of the EGFR gene is a classic mark of glioblastoma and a target under study (vaccines, antibodies).", test: "CNV/sequencing for EGFR amplification and EGFRvIII detection.", desc: "EGFR amplification (often with EGFRvIII) is a defining feature of IDH-wildtype GBM; therapeutic targeting has so far failed in unselected patients, an acknowledged gap." },
    plus7minus10: { name: "+7/−10", plain: "Gain of chromosome 7 + loss of 10: the chromosomal signature of glioblastoma.", test: "Karyotype/CNV (sequencing, array) showing +7/−10.", desc: "Combined +7/−10 with TERT mutation and EGFR amplification allows the molecular diagnosis of IDH-wildtype GBM even without histological grade-4 features (cIMPACT-NOW/WHO CNS5)." },
    cic: { name: "CIC", plain: "CIC mutation reinforces the diagnosis of oligodendroglioma (together with IDH and the codeletion).", test: "CIC sequencing (or FUBP1 immunohistochemistry as surrogate).", desc: "CIC (and FUBP1) mutations are co-drivers of IDH-mutant 1p/19q-codeleted oligodendroglioma, supporting the diagnosis when morphology is ambiguous." },
    fubp1: { name: "FUBP1", plain: "Another gene on arm 1p that is frequently mutated in oligodendroglioma.", test: "FUBP1 sequencing or immunohistochemistry (loss).", desc: "FUBP1 loss accompanies CIC mutations in oligodendroglioma; a secondary lineage marker of the 1p/19q-codeleted entity." },
    h3k27: { name: "H3 K27 alteration", plain: "The H3 K27 mutation defines midline diffuse glioma (pons, thalamus, cord) — an aggressive tumor of children.", test: "Immunohistochemistry H3 K27M (mutation-specific) and/or sequencing of H3-3A/H3C2.", desc: "H3 K27-altered diffuse midline glioma is WHO grade 4 by definition; the mutation drives a specific epigenetic program and is a therapeutic target under trial (ONC201, immunotherapy)." },
    h3k27me3: { name: "H3K27me3 loss", plain: "Loss of the H3K27me3 mark on immunohistochemistry confirms the functional effect of the K27 mutation.", test: "H3K27me3 immunohistochemistry (global loss in tumor nuclei).", desc: "Loss of H3K27me3 trimethylation is the functional readout of H3 K27M and helps confirm diffuse midline glioma when sequencing is unavailable." },
    h3g34: { name: "H3 G34 mutation", plain: "The H3 G34 mutation defines a hemispheric high-grade glioma of adolescents/young adults.", test: "Immunohistochemistry H3 G34R/V (mutation-specific) and sequencing.", desc: "H3 G34-mutant diffuse hemispheric glioma is a distinct CNS5 entity of adolescents/young adults with poor but slightly better prognosis than K27 tumors." },
    brafv600e: { name: "BRAF V600E", plain: "A 'switched-on' BRAF mutation that activates the growth pathway — opens the door to targeted drugs (dabrafenib/trametinib).", test: "PCR/sequencing for BRAF V600E (or VE1 immunohistochemistry).", desc: "BRAF V600E occurs in ganglioglioma, PXA, epithelioid GBM and pediatric gliomas; the ROAR and TAPISTRY trials support dabrafenib+trametinib, a practice-changing target." },
    kiaa1549braf: { name: "KIAA1549-BRAF fusion", plain: "A BRAF fusion (KIAA1549-BRAF) typical of pilocytic astrocytoma — activates the pathway but responds to different inhibitors.", test: "Fusion detection by RNA sequencing/FISH; surrogate: absence of V600E with MAPK activation.", desc: "The KIAA1549-BRAF fusion is the hallmark of pilocytic astrocytoma; it activates MAPK but is resistant to type-I RAF inhibitors (paradox), guiding MEK-inhibitor strategies." },
    fgfr: { name: "FGFR alterations", plain: "FGFR alterations (fusions/mutations) appear in rare gliomas and are targetable (pemigatinib, futibatinib).", test: "RNA/DNA sequencing for FGFR1/2/3 fusions and mutations.", desc: "FGFR alterations define subsets of PLNTY, infantile hemispheric glioma and midline gliomas; FGFR inhibitors are active in fusion-positive tumors (RAGNAR, FIREFLY-type trials)." },
    ntrk: { name: "NTRK fusions", plain: "NTRK fusions are rare but transform the treatment: specific inhibitors (larotrectinib/entrectinib) can shrink the tumor for years.", test: "RNA sequencing (preferred) or pan-TRK immunohistochemistry as screen.", desc: "NTRK fusions occur in infantile hemispheric glioma and rare pediatric/adult gliomas; TRK inhibitors produce durable responses and are approved tissue-agnostically (STARTRK, NAVIGATE)." },
    rtkfusions: { name: "RTK fusions (ALK/ROS1/MET)", plain: "Fusions in tyrosine-kinase receptors (ALK, ROS1, MET) define the infantile hemispheric glioma and are drug targets.", test: "RNA sequencing/fusion panels for ALK/ROS1/NTRK/MET.", desc: "Infantile hemispheric glioma is defined by RTK fusions; crizotinib/entrectinib-type strategies can avoid mutilating surgery in infants." },
    myb: { name: "MYB/MYBL1", plain: "MYB/MYBL1 alterations mark indolent angiocentric and diffuse pediatric gliomas.", test: "CNV/fusion sequencing for MYB or MYBL1 rearrangements.", desc: "MYB/MYBL1 rearrangements characterize angiocentric glioma and subsets of pediatric low-grade glioma, supporting a benign course and seizure-centered management." },
    pdgfra: { name: "PDGFRA amplification", plain: "PDGFRA amplification appears in high-grade pediatric gliomas and in subsets of GBM — target under study.", test: "CNV/sequencing for PDGFRA amplification/mutations.", desc: "PDGFRA amplification is enriched in pediatric high-grade glioma (RTK-I subgroup) and proneural GBM; PDGFR inhibitors have not yet shown survival benefit — an open gap." },
    mycn: { name: "MYCN amplification", plain: "MYCN amplification identifies a very aggressive subgroup of pediatric high-grade glioma.", test: "CNV/sequencing for MYCN amplification.", desc: "MYCN amplification defines an aggressive infantile/pediatric high-grade subgroup with poor outcome and is a stratification factor in pediatric trials (SIOP/COG)." },
    nf1: { name: "NF1", plain: "Neurofibromatosis type 1 increases the risk of optic-pathway and brainstem gliomas, usually indolent.", test: "Clinical criteria + germline NF1 sequencing; MEK inhibitors for progressive cases.", desc: "NF1-associated gliomas (optic pathway, brainstem) are usually MAPK-driven low-grade tumors; selumetinib (MEK) is approved for plexiform neurofibroma and studied in glioma." },
    mapk: { name: "MAPK pathway", plain: "Activation of the MAPK pathway (BRAF, FGFR, NF1…) is the engine of most pediatric low-grade gliomas.", test: "Panel sequencing covering BRAF fusions/V600E, FGFR, NF1, KRAS.", desc: "MAPK-pathway alteration is the defining driver of pediatric-type diffuse low-grade glioma; MEK/BRAF inhibitors (TONE, FNLC) are changing first-line management." },
    mn1: { name: "MN1 alteration", plain: "MN1 alteration (fusion) defines astroblastoma — a rare circumscribed tumor.", test: "Fusion sequencing (MN1-BEND2) or methylation classification.", desc: "MN1-altered astroblastoma is a CNS5 entity defined by MN1 fusions; methylation profiling resolved this historical morphological category." },
    prkca: { name: "PRKCA fusion", plain: "PRKCA fusion (DUP-CD34…) — marker described in papillary craniopharyngioma-like/rare glioneuronal tumors.", test: "Fusion sequencing for PRKCA rearrangements.", desc: "PRKCA alterations appear in rare glioneuronal/neuroepithelial tumors and help separate them from mimics; clinical actionability is still unexplored." },
    pik3ca: { name: "PI3K/mTOR pathway", plain: "PI3K/mTOR pathway mutations (PIK3CA, PTEN) cooperate with other drivers and modulate aggressiveness.", test: "Panel sequencing for PIK3CA/PTEN/AKT/mTOR.", desc: "PI3K-pathway mutations co-occur with RTK and IDH alterations and are explored as resistance mechanisms and mTOR-inhibitor targets (everolimus in SEGA/TSC)." },
    del1p: { name: "Isolated 1p deletion", plain: "Isolated 1p deletion (without 19q) does not have the same value as the complete codeletion — beware of confusion.", test: "FISH/CNV distinguishing whole-arm from partial 1p loss.", desc: "Partial/isolated 1p deletion lacks the prognostic/predictive value of whole-arm 1p/19q codeletion; a classic pitfall in biomarker interpretation." },
    methylclass: { name: "Methylation class", plain: "Tumor 'methylation fingerprint' compared with thousands of cases — the most accurate classifier for rare tumors.", test: "Genome-wide methylation array (850k/EPIC) + Heidelberg classifier.", desc: "DNA-methylation classification discovered or confirmed most new CNS5 entities (HGAP-piloid, DLGNT, infantile hemispheric glioma) and is reference standard for rare/ambiguous tumors." },
    ezhip: { name: "EZH2/PRC2 marks", plain: "EZH2/PRC2-related marks: epigenetic target under investigation in H3-mutant gliomas.", test: "Research assays (IHC/ChIP) of H3K27me3/PRC2 components.", desc: "PRC2 inhibition and epigenetic reversal of the H3 K27M program are preclinical/early-clinical strategies — a frontier gap in midline glioma." }
  },
  effectLabels: { favoravel: "Presence = better prognosis", desfavoravel: "Presence = worse prognosis", definidor: "Defining criterion of the entity", neutro: "Lineage/classification marker" },
  misc: {
    bmDescTitle: "Biomarker description", klass: "Class", testT: "How it is tested", plainT: "In plain language", descT: "Full description", effectT: "Prognostic/predictive meaning", assocT: "Association with entities", refsT: "References",
    pickTitle: "Choose one or more biomarkers", pickHint: "Combined answer: “which gliomas are most associated with at least one of the selected markers, in percent?”",
    ringOs: "5-year OS (literature)", ringOsLvl: "OS level reported by studies", ringEv: "Evidence strength",
    howCalc: "How we calculate (transparency)", studiesTbl: "Indexed studies for this entity", metaBlock: "Entity-specific meta-analyses and systematic reviews", aiBlock: "Artificial Intelligence applied to this entity",
    viz3d: "See on the 3D map", compTitle: "Study composition", anatTitle: "Anatomical distribution",
    chartBm: "Typical prevalence of the alteration by associated glioma", chartHeat: "Estimated 5-year survival by age band × WHO grade",
    regionFunc: "Functions of this area:", regionDef: "If a neoplasm grows here:", regionNeo: "Neoplasms of this region:", clickHint: "Click a region to see functions, deficits and tumors.",
    agentInput: "Free-text description of the clinical case", agentRun: "Run Dr.Gliou", agentCases: "Example cases", agentClear: "Clear",
    askPlaceholder: "e.g., which biomarkers predict response to temozolomide?", askBtn: "Search the base",
    sobreT: "About & sources", gapT: "Medical gaps",
    searchRes: "results", noSel: "Select at least one biomarker to see the combined ranking.",
    famT: "Family", gradeT: "WHO grade", ageT: "Typical age",
    fichaT: "PATIENT CHART (extracted by the agent)", diagT: "INTEGRATED WHO 2021 DIAGNOSIS", progT: "ESTIMATED PROGNOSIS", planT: "THERAPEUTIC PLAN (international reference × SUS reality)", trialsT: "SUGGESTED CLINICAL TRIALS", xaiT: "EXPLAINABILITY OF DECISIONS", alertsT: "ALERTS AND CONTRAINDICATIONS", nextT: "RECOMMENDED NEXT STEPS",
    klassMap: { "Diagnóstico": "Diagnostic", "Prognóstico": "Prognostic", "Preditivo": "Predictive", "Classificação molecular": "Molecular classification" },
    levelLbl: { "Muito baixa": "Very low", "Baixa": "Low", "Moderada": "Moderate", "Alta": "High", "Muito alta": "Very high", "Não avaliável nesta base": "Not assessable in this base" },
    osNote: "Literature estimate of 5-year relative survival for this entity (cited source).",
    evNote: "Evidence strength computed ONLY over studies with aggregated outcomes.",
    covNote: "Coverage: how many studies entered each calculation."
  }
};

TR.names = {
  "Astrocitoma, IDH-mutante": "Astrocytoma, IDH-mutant",
  "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado": "Oligodendroglioma, IDH-mutant and 1p/19q-codeleted",
  "Glioblastoma, IDH-wildtype": "Glioblastoma, IDH-wildtype",
  "Glioma difuso de linha média, H3 K27-alterado": "Diffuse midline glioma, H3 K27-altered",
  "Glioma hemisférico difuso, H3 G34-mutante": "Diffuse hemispheric glioma, H3 G34-mutant",
  "Glioma difuso pediátrico de baixo grau, alterado na via MAPK": "Diffuse pediatric low-grade glioma, MAPK-altered",
  "Glioma difuso pediátrico de alto grau, H3-wildtype e IDH-wildtype": "Diffuse pediatric high-grade glioma, H3-wildtype and IDH-wildtype",
  "Glioma hemisférico infantil, tipo infantil": "Infant-type hemispheric glioma",
  "Astrocitoma pilocítico": "Pilocytic astrocytoma",
  "Astrocitoma de alto grau com características piloides": "High-grade astrocytoma with piloid features",
  "Astrocitoma pleomórfico xanthoastrocytoma": "Pleomorphic xanthoastrocytoma",
  "Tumor neuroepitelial polimorfo de baixo grau com rearranjo de tirosina-quinase (PLNTY)": "Polymorphous low-grade neuroepithelial tumor of the young (PLNTY)",
  "Glioma angiocêntrico": "Angiocentric glioma",
  "Glioma leptomeníngeo difuso glioneuronal": "Diffuse leptomeningeal glioneuronal tumor",
  "Tumor glioneuronal mixoide": "Myxoid glioneuronal tumor",
  "Ganglioglioma": "Ganglioglioma",
  "Astrocitoma subependimário de células gigantes": "Subependymal giant cell astrocytoma",
  "Astroblastoma, MN1-alterado": "Astroblastoma, MN1-altered",
  "Glioma cordoide": "Chordoid glioma",
  "Tumor glioneuronal formador de rosetas": "Rosette-forming glioneuronal tumor",
  "Histopatologia (H&E): glioma de alto grau": "Histopathology (H&E): high-grade glioma",
  "Histopatologia (H&E): glioma de baixo grau": "Histopathology (H&E): low-grade glioma"
};
TR.why = {
  "Glioblastoma, IDH-wildtype": "Signature trained on 16 real GBM MRIs + literature: heterogeneous pattern with central necrosis (dark areas) and irregular ring enhancement: high variance, strong bimodality, numerous edges and high ring index.",
  "Astrocitoma, IDH-mutante": "Signature trained on 3 real IDH-mutant astrocytoma MRIs + literature: poorly delimited infiltrative lesion, relatively homogeneous with little enhancement: lower variance, texture and ring index.",
  "Oligodendroglioma, IDH-mutante e 1p/19q-codeletado": "Signature trained on 3 real oligodendroglioma MRIs + literature: calcifications (very bright foci) and cortical cystic component: bright fraction and pvb above the real mean.",
  "Astrocitoma pilocítico": "Well-delimited cyst (large uniform dark region) + enhancing mural nodule: dark fraction and skewness far above the real mean.",
  "Glioma difuso de linha média, H3 K27-alterado": "Diffuse expansile brainstem/midline lesion, homogeneous with little enhancement: minimal variance, bimodality and entropy.",
  "Ependimoma": "Heterogeneous intraventricular lesion with cysts, calcification and bleeding: dark and bright fractions above the mean.",
  "Histopatologia (H&E): glioma de alto grau": "Signature trained on 3 real GBM H&E slides + literature: hypercellular H&E slide (dense purple nuclei), necrosis and vascular proliferation: very high texture and entropy.",
  "Histopatologia (H&E): glioma de baixo grau": "Paucicellular H&E slide with monotonous bright background: lower texture, entropy and skewness."
};
TR.states = {
  "mutado": "mutated", "não informado": "not reported", "não aplicável": "not applicable",
  "não estabelecido": "not established", "não atribuído": "not assigned", "presente": "present",
  "ausente": "absent", "wildtype": "wildtype", "codeletado": "codeleted", "não codeletado": "not codeleted"
};
window.ST = function (x) { return (window.I18N && I18N.lang === "en" && TR.states[x]) ? TR.states[x] : x; };
window.ENAM = function (n) { return (window.I18N && I18N.lang === "en" && TR.names[n]) ? TR.names[n] : n; };
window.EWHY = function (s8) { return (window.I18N && I18N.lang === "en" && TR.why[s8.entity]) ? TR.why[s8.entity] : s8.why; };

// ---- v2.10: overlay EN do NeuroOnco-Agent (Dr.Gliou) ----
TR.agent = {
  "Cirurgia": "Surgery", "Radioterapia": "Radiotherapy", "QT 1ª linha": "1st-line chemotherapy", "Terapia-alvo / imunoterapia": "Targeted therapy / immunotherapy",
  "Ressecção máxima segura com mapeamento cortical/monitorização quando eloquente; 5-ALA para guiar ressecção em GBM; repetir imagem em 24–72 h.": "Maximal safe resection with cortical mapping/monitoring when eloquent; 5-ALA to guide GBM resection; repeat imaging in 24–72 h.",
  "Ressecção/biópsia disponível na rede; 5-ALA e mapeamento avançado limitados a poucos centros de referência (HC-FMUSP, INCA, A.C.Camargo, HB-Brasília).": "Resection/biopsy available in the public network; 5-ALA and advanced mapping limited to a few reference centers (HC-FMUSP, INCA, A.C.Camargo, HB-Brasília).",
  "60 Gy/30 frações (IMRT/VMAT) concomitante a TMZ; hipofracionado 40 Gy/15 fx se ≥ 65 anos ou KPS baixo.": "60 Gy/30 fractions (IMRT/VMAT) concurrent with TMZ; hypofractionated 40 Gy/15 fx if ≥ 65 years or low KPS.",
  "59,4–60 Gy/30 fx com QT concomitante/adjuvante conforme protocolo": "59.4–60 Gy/30 fx with concurrent/adjuvant chemotherapy per protocol",
  "Observar ou RT 50,4–54 Gy/28–30 fx conforme risco/residual": "Observe or RT 50.4–54 Gy/28–30 fx per risk/residual",
  "Evitar RT em < 3 anos; quando indicada, conformacional com proteção de estruturas nobres (SIOP/COG).": "Avoid RT under 3 years; when indicated, conformal with protection of critical structures (SIOP/COG).",
  "Conformacional/IMRT conforme entidade e grau.": "Conformal/IMRT per entity and grade.",
  "RT 3D-CRT amplamente disponível; IMRT/VMAT em centros de referência; hipofracionamento (40 Gy/15 fx ou 25 Gy/5 fx em idosos frágeis) é prática aceita e custo-efetiva.": "3D-CRT widely available; IMRT/VMAT at reference centers; hypofractionation (40 Gy/15 fx or 25 Gy/5 fx in frail elderly) is accepted, cost-effective practice.",
  "Observação ou RT+PCV/TMZ conforme risco": "Observation or RT+PCV/TMZ per risk",
  "Quimioterapia conforme protocolo SIOP/COG; evitar RT em lactentes.": "Chemotherapy per SIOP/COG protocols; avoid RT in infants.",
  "Conforme entidade histológica e grau molecular.": "Per histological entity and molecular grade.",
  "Temozolomida disponível no SUS para GBM (CEAF/PCDT vigente — confirmar critérios e fase de tratamento).": "Temozolomide available in the SUS for GBM (current CEAF/PCDT — confirm criteria and treatment phase).",
  "PCV de difícil reprodução no SUS (procarbazina sem fornecimento regular); lomustina em centros de referência; TMZ como alternativa prática amplamente usada.": "PCV hard to reproduce in the SUS (procarbazine without regular supply); lomustine at reference centers; TMZ as a widely used practical alternative.",
  "TMZ disponível em centros de referência para graus 3–4; graus 2 de baixo risco podem ser observados.": "TMZ available at reference centers for grades 3–4; low-risk grade 2 may be observed.",
  "Protocolos pediátricos em centros de referência (SIOP/COG adaptados).": "Pediatric protocols at reference centers (adapted SIOP/COG).",
  "Conforme PCDT/CEAF vigente e protocolo do centro de referência.": "Per current PCDT/CEAF and reference-center protocol.",
  "Sem alvo acionável identificado com o painel informado.": "No actionable target identified with the reported panel.",
  "Na progressão: reoperação se exequível, re-irradiação, lomustina/bevacizumabe ou ensaio clínico conforme perfil.": "At progression: reoperation if feasible, re-irradiation, lomustine/bevacizumab or clinical trial per profile.",
  "TTFields NÃO disponível no SUS. Bevacizumabe não incorporado para glioma — acesso por judicialização em alguns estados na recidiva; lomustina em centros de referência.": "TTFields NOT available in the SUS. Bevacizumab not incorporated for glioma — access via litigation in some states at recurrence; lomustine at reference centers.",
  "Bevacizumabe via judicialização (recidiva); lomustina e re-irradiação em centros de referência.": "Bevacizumab via litigation (recurrence); lomustine and re-irradiation at reference centers.",
  "Concluído, positivo — approval FDA 2024": "Completed, positive — FDA approval 2024", "Concluído, positivo — approval FDA 2022": "Completed, positive — FDA approval 2022",
  "Concluído — approval FDA 2018 (tumores NTRK)": "Completed — FDA approval 2018 (NTRK tumors)", "Concluído — approval FDA 2019 (tumores NTRK)": "Completed — FDA approval 2019 (NTRK tumors)",
  "Concluído — approval FDA (MSI-H/TMB-alto)": "Completed — FDA approval (MSI-H/TMB-high)", "Concluído — base de diretriz EANO 2024": "Completed — EANO 2024 guideline basis",
  "Concluído — base de diretriz NCCN v2025": "Completed — NCCN v2025 guideline basis", "Concluído, positivo — approval FDA 2015": "Completed, positive — FDA approval 2015",
  "Concluído — base para uso em recidiva": "Completed — basis for use at recurrence",
  "Glioma IDH-mutante grau 2, pós-cirurgia, sem RT/QT prévia": "IDH-mutant grade 2 glioma, post-surgery, no prior RT/CT",
  "Glioma pediátrico de baixo grau com alteração de BRAF/fusão ou RAF1": "Pediatric low-grade glioma with BRAF alteration/fusion or RAF1",
  "Dabrafenibe + Trametinibe": "Dabrafenib + Trametinib", "Tumores raros com BRAF V600E, incluindo gliomas de alto grau": "Rare tumors with BRAF V600E, including high-grade gliomas",
  "Tumor sólido com fusão de NTRK1/2/3": "Solid tumor with NTRK1/2/3 fusion", "Tumor sólido com fusão NTRK/ROS1/ALK": "Solid tumor with NTRK/ROS1/ALK fusion",
  "Tumor MSI-H/dMMR ou TMB alto previamente tratado": "Previously treated MSI-H/dMMR or TMB-high tumor", "TMZ adjuvante/concomitante": "Adjuvant/concurrent TMZ",
  "Astrocitoma anaplásico 1p/19q não codeletado": "Anaplastic astrocytoma, non-codeleted 1p/19q", "Oligodendroglioma 1p/19q-codeletado": "1p/19q-codeleted oligodendroglioma",
  "TTFields + temozolomida": "TTFields + temozolomide", "Glioblastoma recém-diagnosticado após RT/QT concomitante": "Newly diagnosed glioblastoma after concurrent RT/CT",
  "Bevacizumabe + lomustina": "Bevacizumab + lomustine", "Glioblastoma em primeira recidiva": "Glioblastoma at first recurrence", "TMZ adjuvante após RT": "Adjuvant TMZ after RT",
  "TMZ causa lesões O6-metilguanina; a RT soma dano de DNA duplo-fita. Sem MGMT funcional (promotor metilado), o tumor não repara o dano.": "TMZ causes O6-methylguanine lesions; RT adds double-strand DNA damage. Without functional MGMT (methylated promoter), the tumor cannot repair the damage.",
  "Stupp et al., NEJM 2005; Hegi et al., NEJM 2005": "Stupp et al., NEJM 2005; Hegi et al., NEJM 2005",
  "Benefício reduzido com MGMT não metilado — ainda assim padrão em pacientes aptos; ponderar ensaio clínico": "Reduced benefit with unmethylated MGMT — still standard in fit patients; consider a clinical trial",
  "Em ≥ 70 anos ou KPS baixo, preferir RT hipofracionada ± TMZ (benefício mantido no subgrupo MGMT metilado)": "In ≥ 70 years or low KPS, prefer hypofractionated RT ± TMZ (benefit maintained in the MGMT-methylated subgroup)",
  "Mielossupressão grau 3–4; pneumonite rara": "Grade 3–4 myelosuppression; rare pneumonitis",
  "Campos elétricos alternados perturbam o fuso mitótico em células em divisão.": "Alternating electric fields disrupt the mitotic spindle in dividing cells.",
  "EF-14 (NCT00916409), JAMA 2017": "EF-14 (NCT00916409), JAMA 2017",
  "Indisponível no SUS; dermatite de contato; exige adesão ≥ 18 h/dia": "Unavailable in the SUS; contact dermatitis; requires ≥ 18 h/day adherence",
  "A codeleção 1p/19q marca tumores com sensibilidade duradoura a alquilantes; o benefício emerge após 8–10 anos.": "1p/19q codeletion marks tumors with durable alkylator sensitivity; benefit emerges after 8–10 years.",
  "RTOG 9402 (Buckner NEJM 2016); EORTC 26951 (Cairncross JCO 2014)": "RTOG 9402 (Buckner NEJM 2016); EORTC 26951 (Cairncross JCO 2014)",
  "Mielotoxicidade cumulativa; procarbazina indisponível no SUS — adaptar regime": "Cumulative myelotoxicity; procarbazine unavailable in the SUS — adapt regimen",
  "No grau 3 IDH-mutante 1p/19q não codeletado, a TMZ adjuvante melhorou OS.": "In grade 3 IDH-mutant non-codeleted 1p/19q, adjuvant TMZ improved OS.",
  "CATNON, Lancet Oncol 2021": "CATNON, Lancet Oncol 2021", "Grau 2 de baixo risco: benefício não estabelecido": "Low-risk grade 2: benefit not established",
  "Fenitoína/carbamazepina/fenobarbital induzem CYP3A4 e reduzem a exposição de várias terapias-alvo (inibidores de BRAF/MEK, TRK).": "Phenytoin/carbamazepine/phenobarbital induce CYP3A4 and reduce exposure to several targeted therapies (BRAF/MEK, TRK inhibitors).",
  "Interações farmacocinéticas documentadas; NCCN v2025": "Documented pharmacokinetic interactions; NCCN v2025",
  "Preferir levetiracetam ou lacosamida quando possível": "Prefer levetiracetam or lacosamide when possible",
  "OMS CNS5: mutação H3-3A G34R/V em glioma difuso hemisférico de criança/adulto jovem define entidade de grau 4.": "WHO CNS5: H3-3A G34R/V mutation in diffuse hemispheric glioma of child/young adult defines a grade 4 entity.",
  "OMS CNS5: glioma hemisférico de alto grau celular no lactente com fusão de RTK (NTRK/ROS1/ALK/MET); grau definitivo não atribuído por falta de dados de desfecho.": "WHO CNS5: cellular high-grade hemispheric glioma in infants with RTK fusion (NTRK/ROS1/ALK/MET); definitive grade not assigned for lack of outcome data.",
  "Em crianças, gliomas difusos IDH-wildtype exigem painel MAPK/H3 e classe de metilação para subclassificação (OMS CNS5).": "In children, IDH-wildtype diffuse gliomas require MAPK/H3 panel and methylation class for subclassification (WHO CNS5).",
  "OMS CNS5: IDH mutado + codeleção 1p/19q de braços inteiros = oligodendroglioma; grau 2 ou 3 pela histologia (anaplasia).": "WHO CNS5: IDH mutation + whole-arm 1p/19q codeletion = oligodendroglioma; grade 2 or 3 by histology (anaplasia).",
  "IDH-wildtype sem critérios moleculares completos: solicitar TERT, EGFR e CNV (+7/−10); se positivos, glioblastoma grau 4": "IDH-wildtype without complete molecular criteria: request TERT, EGFR and CNV (+7/−10); if positive, glioblastoma grade 4",
  "Diagnóstico integrado não concluído": "Integrated diagnosis not concluded",
  "Dados moleculares insuficientes para aplicar as regras da OMS CNS5. Complete o painel mínimo antes de qualquer decisão terapêutica.": "Insufficient molecular data to apply WHO CNS5 rules. Complete the minimal panel before any therapeutic decision.",
  "14,6 meses com RT+temozolomida (Stupp); ~8–9 meses em registros populacionais": "14.6 months with RT+temozolomide (Stupp); ~8–9 months in population registries",
  "Stupp NEJM 2005; Hegi NEJM 2005; Cancers 2022;14:3161": "Stupp NEJM 2005; Hegi NEJM 2005; Cancers 2022;14:3161",
  "Grau 2: ~7–8 anos · Grau 3: ~4–6 anos · Grau 4: ~5,5 anos": "Grade 2: ~7–8 years · Grade 3: ~4–6 years · Grade 4: ~5.5 years",
  "menos discriminativo neste grupo": "less discriminative in this group",
  "Coeses moleculares (Sci Rep 2025); CATNON (Lancet Oncol 2021)": "Molecular cohorts (Sci Rep 2025); CATNON (Lancet Oncol 2021)",
  "Com RT+PCV: mediana ~14,7 anos": "With RT+PCV: median ~14.7 years",
  "prediz benefício duradouro de RT+PCV": "predicts durable benefit from RT+PCV",
  "Buckner NEJM 2016 (RTOG 9402); EORTC 26951": "Buckner NEJM 2016 (RTOG 9402); EORTC 26951",
  "Relativamente favorável; respostas duradouras com inibidores de TRK/ALK/ROS1 quando há fusão": "Relatively favorable; durable responses with TRK/ALK/ROS1 inhibitors when a fusion is present",
  "Sobrevida em 10 anos > 90–95%; ressecção completa costuma ser curativa": "10-year survival > 90–95%; complete resection is usually curative",
  "Grau 2: sobrevida em 5 anos ~70–80%": "Grade 2: 5-year survival ~70–80%",
  "Depende da entidade e do grau — consulte a aba 'Análise por tumor'": "Depends on entity and grade — see the 'Tumor analysis' tab",
  "Idade < 50 anos": "Age < 50 years", "Idade ≥ 65 anos": "Age ≥ 65 years", "Ressecção total (GTR)": "Gross-total resection (GTR)", "Ressecção total": "Total resection",
  "Biópsia apenas": "Biopsy only", "Somente biópsia (doença residual volumosa)": "Biopsy only (bulky residual disease)",
  "MGMT não metilado (menor benefício de alquilantes)": "Unmethylated MGMT (lower benefit from alkylators)", "MGMT metilado": "Methylated MGMT",
  "Deleção homozigótica de CDKN2A/B": "Homozygous CDKN2A/B deletion", "Codeleção 1p/19q": "1p/19q codeletion",
  "Recidiva/progressão": "Recurrence/progression", "KPS ≥ 70": "KPS ≥ 70", "KPS < 70": "KPS < 70",
  "Paciente pediátrico: protocolos devem seguir diretrizes SIOP/COG; evitar radioterapia em < 3 anos sempre que exequível.": "Pediatric patient: protocols should follow SIOP/COG guidelines; avoid radiotherapy under 3 years whenever feasible.",
  "Idoso: considerar RT hipofracionada (40 Gy/15 fx ou 25 Gy/5 fx) e avaliar MGMT para decidir por TMZ isolada.": "Elderly: consider hypofractionated RT (40 Gy/15 fx or 25 Gy/5 fx) and assess MGMT to decide for TMZ alone.",
  "KPS < 70: benefício de tratamento intensivo incerto; priorizar suporte, RT hipofracionada ou ensaio clínico.": "KPS < 70: benefit of intensive treatment uncertain; prioritize support, hypofractionated RT or clinical trial.",
  "MGMT não metilado: benefício limitado de alquilantes; ensaio clínico deve ser priorizado desde a 1ª linha.": "Unmethylated MGMT: limited benefit from alkylators; a clinical trial should be prioritized from 1st line.",
  "Esta análise é gerada por IA e deve ser validada por um neuro-oncologista. Não constitui prescrição médica.": "This analysis is AI-generated and must be validated by a neuro-oncologist. It is not a medical prescription.",
  "Definir e registrar a extensão de ressecção (biópsia × parcial × total) com imagem pós-operatória.": "Define and record the extent of resection (biopsy × partial × total) with postoperative imaging.",
  "Registrar KPS ou ECOG para estratificação de protocolo.": "Record KPS or ECOG for protocol stratification.",
  "Discutir o caso em Tumor Board multidisciplinar (neurocirurgia, neuro-oncologia, radioterapia, neuropatologia).": "Discuss the case in a multidisciplinary Tumor Board (neurosurgery, neuro-oncology, radiotherapy, neuropathology).",
  "Checar elegibilidade e centros ativos dos ensaios listados em ClinicalTrials.gov e ReBEC.": "Check eligibility and active centers for the listed trials on ClinicalTrials.gov and ReBEC.",
  "Documentar consentimento e plano de seguimento com RM a cada 2–3 meses no primeiro ano.": "Document consent and follow-up plan with MRI every 2–3 months in the first year.",
  "alta": "high", "média": "medium", "baixa": "low", "Fase 3": "Phase 3", "Fase 2": "Phase 2", "Fase 1": "Phase 1", "RT ± TMZ": "RT ± TMZ", "Feminino": "Female", "Masculino": "Male",
  "IDH1/IDH2 (imunohistoquímica R132H + sequenciamento)": "IDH1/IDH2 (R132H immunohistochemistry + sequencing)",
  "Metilado": "Methylated", "Não metilado": "Unmethylated", "Mutado": "Mutated", "Wildtype": "Wildtype", "Presente": "Present", "Ausente": "Absent",
  "Sim": "Yes", "Não": "No", "Ressecção subtotal": "Subtotal resection", "Ressecção total": "Gross-total resection", "Biópsia": "Biopsy",
  "Atendido pelo SUS": "Treated in the SUS (public system)", "Particular": "Private insurance", "Fenitoína": "Phenytoin", "Carbamazepina": "Carbamazepine",
  "Fenobarbital": "Phenobarbital", "Frontal esquerda": "Left frontal", "Frontal direita": "Right frontal", "Temporal direita": "Right temporal",
  "Temporal esquerda": "Left temporal", "Ponte": "Pons", "Linha média": "Midline", "Cerebelo": "Cerebellum", "Tálamo": "Thalamus", "Insular": "Insular",
  "Parietal": "Parietal", "Occipital": "Occipital", "Cefaleia": "Headache", "Crises focais": "Focal seizures", "Crise focal": "Focal seizure",
  "Déficit motor": "Motor deficit", "Vômitos": "Vomiting", "Paralisia do VI nervo craniano": "Sixth cranial nerve palsy", "Recidiva": "Recurrence",
  "Primário": "Primary", "Não informado": "Not reported", "Há 2 meses": "For 2 months", "Há 1 ano": "For 1 year", "Há 3 semanas": "For 3 weeks", "Base interna": "Internal base", "2ª linha e além": "2nd line and beyond", "QT 2ª linha": "2nd-line chemotherapy"
};
TR.agentFields = {
  "Idade": "Age", "Sexo": "Sex", "Desempenho (KPS)": "Performance (KPS)", "Desempenho (ECOG)": "Performance (ECOG)",
  "Localização (imagem)": "Location (imaging)", "Maior diâmetro": "Largest diameter", "Sintomas": "Symptoms",
  "Tempo de evolução": "Time since onset", "Status cirúrgico": "Surgical status", "Achados de RM": "MRI findings",
  "IDH1/IDH2": "IDH1/IDH2", "MGMT (promotor)": "MGMT (promoter)", "Codeleção 1p/19q": "1p/19q codeletion", "ATRX": "ATRX",
  "TERT promoter": "TERT promoter", "EGFR": "EGFR", "CDKN2A/B": "CDKN2A/B", "BRAF": "BRAF", "Histona H3": "Histone H3",
  "Fusão RTK (NTRK/ALK/ROS1/MET)": "RTK fusion (NTRK/ALK/ROS1/MET)", "TMB": "TMB", "MMR/MSI": "MMR/MSI",
  "Contexto de acesso": "Access context", "Situação": "Status", "Anticonvulsivante indutor enzimático": "Enzyme-inducing anticonvulsant",
  "Desempenho (KPS/ECOG)": "Performance (KPS/ECOG)"
};
TR.agentRE = [
  ["^Dados moleculares críticos ausentes: (.+)\\. O diagnóstico integrado não pode ser concluído\\.$", "Critical molecular data missing: $1. The integrated diagnosis cannot be concluded."],
  ["^Contexto SUS: verifique PCDT/CEAF vigente e centros de referência \\((.+)\\)\\.$", "SUS context: check the current PCDT/CEAF and reference centers ($1)."],
  ["^Em uso de (.+): indutor de CYP3A4 — revisar antes de iniciar terapia-alvo\\.$", "On $1: CYP3A4 inducer — review before starting targeted therapy."],
  ["^Solicitar: (.+)$", "Request: $1"],
  ["^(.+) anos$", "$1 years"]
];
window.AGT = function (s8) {
  if (!s8 || !(window.I18N && I18N.lang === "en")) return s8;
  if (TR.agent[s8]) return TR.agent[s8];
  for (var i8 = 0; i8 < TR.agentRE.length; i8++) {
    var rx8 = new RegExp(TR.agentRE[i8][0]);
    var m8 = s8.match(rx8);
    if (m8) return TR.agentRE[i8][1].replace("$1", m8[1] != null && TR.agent[m8[1]] ? TR.agent[m8[1]] : (m8[1] || ""));
  }
  return s8;
};
window.AGF = function (s8) { return (window.I18N && I18N.lang === "en" && TR.agentFields[s8]) ? TR.agentFields[s8] : s8; };
TR.cases = [
  "Male, 62 years, KPS 80, headache and focal seizure for 2 months. MRI: 4.8 cm left frontal lesion with ring enhancement, central necrosis and perilesional edema. Subtotal resection. Immunohistochemistry and sequencing: IDH wildtype, MGMT methylated, TERT promoter mutated, EGFR amplified, no 1p/19q codeletion, ATRX retained. On phenytoin for seizures. Treated in the SUS (Brazilian public system).",
  "Female, 34 years, ECOG 0, complex partial seizures for 1 year. MRI: 3.5 cm right temporal lesion, no enhancement, no necrosis. Total resection. Molecular: IDH1 mutated, 1p/19q codeletion present, ATRX retained, TERT wildtype, CDKN2A/B intact. Private insurance.",
  "Child, 7 years, morning headache, vomiting and sixth nerve palsy for 3 weeks. MRI: diffuse expansile pontine lesion, no enhancement, no necrosis. Biopsy: H3 K27M positive, H3K27me3 loss. No prior treatment."
];
