// =====================================================================
// queue.js — GlioBio v2.7: fila de espera com priorização clínica
// transparente (grau OMS + critérios de gravidade + tempo), descrição
// clínica estendida e foto do paciente/exame. Persistência somente no
// navegador (localStorage). Não é sistema de regulação: não substitui
// critérios oficiais de priorização.
// =====================================================================
(function () {
  "use strict";
  var KEY = "gliobio_fila_v1";
  var CRIT = [
    { id: "deficit", label: "Déficit neurológico progressivo", en: "Progressive neurological deficit", pts: 15 },
    { id: "hic", label: "Hipertensão intracraniana / hidrocefalia", en: "Intracranial hypertension / hydrocephalus", pts: 15 },
    { id: "crises", label: "Crises epilépticas refratárias", en: "Refractory epileptic seizures", pts: 10 },
    { id: "eloq", label: "Localização eloquente / tronco encefálico", en: "Eloquent location / brainstem", pts: 10 },
    { id: "cresc", label: "Crescimento radiológico entre exames", en: "Radiological growth between scans", pts: 10 }
  ];
  function t(k) { return window.I18N ? I18N.t(k) : k; }
  function en() { return window.I18N && I18N.lang === "en"; }
  function esc(x) { return String(x == null ? "" : x).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function save(l) { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) { } }
  function critLabel(c) { return en() ? c.en : c.label; }
  function gradeInfo(entity) {
    var m = (typeof ENTITY_META !== "undefined") ? ENTITY_META[entity] : null;
    var gn = m && m.gradeNum ? m.gradeNum : 2;
    var pts = { 1: 10, 2: 20, 3: 30, 4: 40 }[gn] || 15;
    return { gn: gn, pts: pts, grade: m ? m.grade : "—" };
  }
  function scoreOf(p) {
    var days = Math.max(0, Math.floor((Date.now() - new Date(p.created).getTime()) / 86400000));
    var time = Math.min(15, Math.floor(days / 7));
    var crit = (p.crit || []).reduce(function (a, id) { var c = CRIT.filter(function (x) { return x.id === id; })[0]; return a + (c ? c.pts : 0); }, 0);
    return { score: gradeInfo(p.entity).pts + crit + time, days: days, time: time, crit: crit };
  }
  function prioOf(s) {
    if (s >= 70) return ["muitoalta", en() ? "Very high" : "Muito alta"];
    if (s >= 50) return ["alta", en() ? "High" : "Alta"];
    if (s >= 30) return ["moderada", en() ? "Moderate" : "Moderada"];
    return ["baixa", en() ? "Low" : "Baixa"];
  }
  function root() { return document.querySelector("#fila-root"); }

  // Foto: redimensiona para ≤200px e guarda como dataURL JPEG (~qualidade .72)
  function fileToThumb(file, cb) {
    if (!file || !/^image\//.test(file.type)) return cb(null);
    var fr = new FileReader();
    fr.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 200, k = Math.min(1, max / Math.max(img.width, img.height));
        var cv = document.createElement("canvas");
        cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        cb(cv.toDataURL("image/jpeg", 0.72));
      };
      img.onerror = function () { cb(null); };
      img.src = fr.result;
    };
    fr.onerror = function () { cb(null); };
    fr.readAsDataURL(file);
  }

  var pendingPhoto = null;

  function render() {
    var el = root(); if (!el) return;
    var list = load();
    var rows = list.map(function (p) { return { p: p, s: scoreOf(p) }; })
      .sort(function (a, b) { return (b.s.score - a.s.score) || (b.s.days - a.s.days); });
    var waiting = rows.filter(function (r) { return r.p.status === "aguardando"; });
    var avgDays = waiting.length ? Math.round(waiting.reduce(function (a, r) { return a + r.s.days; }, 0) / waiting.length) : 0;
    var nVery = waiting.filter(function (r) { return r.s.score >= 70; }).length;

    var ents = (typeof ENTITY_META !== "undefined") ? Object.keys(ENTITY_META) : [];
    el.innerHTML =
      '<div class="panel" style="padding:16px;background:var(--line-soft)">' +
      '<h3 style="margin:0 0 10px">' + (en() ? "Register a patient in the queue" : "Cadastrar paciente na fila") + '</h3>' +
      '<div class="fila-form">' +
      '<div><label for="fq-id">' + esc(t("fila.id")) + '</label><input id="fq-id" class="text-input" style="width:100%" placeholder="' + (en() ? "e.g.: A.B.S. or #EDF2FA" : "ex.: A.B.S. ou #EDF2FA") + '" maxlength="40"></div>' +
      '<div><label for="fq-age">' + esc(t("fila.age")) + '</label><input id="fq-age" class="text-input" style="width:100%" type="number" min="0" max="110" value="45"></div>' +
      '<div><label for="fq-ent">' + esc(t("fila.ent")) + '</label><select id="fq-ent" class="select" style="width:100%">' + ents.map(function (e) { return '<option value="' + esc(e) + '">' + esc(window.ENAM ? ENAM(e) : e) + '</option>'; }).join("") + '</select></div>' +
      '<div><label for="fq-status">' + esc(t("fila.status")) + '</label><select id="fq-status" class="select" style="width:100%"><option value="aguardando">' + esc(t("fila.st.wait")) + '</option><option value="convocado">' + esc(t("fila.st.called")) + '</option><option value="tratamento">' + esc(t("fila.st.treat")) + '</option></select></div>' +
      '</div>' +
      '<div class="fila-form-2col">' +
      '<div><label for="fq-notes">' + esc(t("fila.desc")) + '</label>' +
      '<textarea id="fq-notes" class="text-input" rows="4" style="width:100%" placeholder="' + (en() ? "Symptoms, imaging findings, molecular status, comorbidities, social context…" : "Sintomas, achados de imagem, status molecular, comorbidades, contexto social…") + '" maxlength="1200"></textarea></div>' +
      '<div><label for="fq-photo">' + esc(t("fila.photo")) + '</label>' +
      '<div class="fq-photo-box" id="fq-photo-box">' +
      '<button class="fq-photo-btn" id="fq-photo-btn" type="button">' + (window.ICO ? ICO("camera") : "") + '<span>' + (en() ? "Attach photo" : "Anexar foto") + '</span></button>' +
      '<img id="fq-photo-prev" class="fq-photo-prev" alt="" hidden>' +
      '<button class="fq-photo-clear icon-btn" id="fq-photo-clear" type="button" title="' + (en() ? "Remove photo" : "Remover foto") + '" hidden>' + (window.ICO ? ICO("x") : "✕") + '</button>' +
      '<input id="fq-photo" type="file" accept="image/*" hidden>' +
      '</div></div>' +
      '</div>' +
      '<div class="fila-crit">' + CRIT.map(function (c) { return '<label><input type="checkbox" class="fq-crit" value="' + c.id + '"> ' + esc(critLabel(c)) + ' (+' + c.pts + ')</label>'; }).join("") + '</div>' +
      '<div class="fila-actions"><button class="btn-primary" id="fq-add" type="button">' + (window.ICO ? ICO("plus") : "＋") + '<span>' + esc(t("fila.add")) + '</span></button></div>' +
      '<p class="hint" style="margin:6px 0 0">' + (en() ?
        "Score = WHO grade (G1 +10 … G4 +40) + clinical criteria above + waiting time (+1 per week, max +15). Data saved only in this browser." :
        "Pontuação = grau OMS (G1 +10 … G4 +40) + critérios clínicos acima + tempo de espera (+1 por semana, máx. +15). Dados salvos apenas neste navegador.") + '</p>' +
      '</div>' +
      '<div class="stat-grid" style="margin-top:14px">' +
      '<div class="stat"><span class="num">' + waiting.length + '</span><span class="num-label">' + esc(t("fila.waiting")) + '</span></div>' +
      '<div class="stat amber"><span class="num">' + avgDays + '</span><span class="num-label">' + esc(t("fila.avgdays")) + '</span></div>' +
      '<div class="stat" style="--x:0"><span class="num" style="color:var(--red)">' + nVery + '</span><span class="num-label">' + esc(t("fila.very")) + '</span></div>' +
      '<div class="stat green"><span class="num">' + rows.length + '</span><span class="num-label">' + esc(t("fila.total")) + '</span></div>' +
      '</div>' +
      (rows.length ?
        '<table class="fila-table"><thead><tr><th>' + esc(t("fila.col.pos")) + '</th><th>' + esc(t("fila.col.pat")) + '</th><th>' + esc(t("fila.col.age")) + '</th><th>' + esc(t("fila.col.ent")) + '</th><th>' + esc(t("fila.col.grade")) + '</th><th>' + esc(t("fila.col.sev")) + '</th><th>' + esc(t("fila.col.score")) + '</th><th>' + esc(t("fila.col.wait")) + '</th><th>' + esc(t("fila.col.status")) + '</th><th></th></tr></thead><tbody>' +
        rows.map(function (r, i) {
          var pr = prioOf(r.s.score);
          var det = (r.p.notes || r.p.photo) ?
            '<tr class="fq-detail" data-for="' + esc(r.p.id) + '" hidden><td colspan="10">' +
            '<div class="fq-detail-in">' +
            (r.p.photo ? '<img class="fq-detail-photo" src="' + esc(r.p.photo) + '" alt="">' : "") +
            '<div><b>' + esc(t("fila.notes")) + '</b><p>' + (r.p.notes ? esc(r.p.notes).replace(/\n/g, "<br>") : (en() ? "No description." : "Sem descrição.")) + '</p></div>' +
            '</div></td></tr>' : "";
          return '<tr data-id="' + esc(r.p.id) + '">' +
            '<td class="fila-pos">' + (i + 1) + 'º</td>' +
            '<td><button class="fq-pat" type="button" title="' + (en() ? "See description/photo" : "Ver descrição/foto") + '">' +
            (r.p.photo ? '<img class="fq-thumb" src="' + esc(r.p.photo) + '" alt="">' : '<span class="fq-thumb fq-thumb-ph">' + (window.ICO ? ICO("user") : "") + '</span>') +
            '<strong>' + esc(r.p.label) + '</strong></button></td>' +
            '<td>' + esc(r.p.age) + '</td>' +
            '<td>' + esc(window.ENAM ? ENAM(r.p.entity) : r.p.entity) + '</td>' +
            '<td>G' + gradeInfo(r.p.entity).gn + '</td>' +
            '<td><span class="prio-pill prio-' + pr[0] + '">' + pr[1] + '</span></td>' +
            '<td><div style="display:flex;align-items:center;gap:8px"><span style="font-weight:700">' + r.s.score + '</span><span class="prio-bar" style="flex:1"><i style="width:' + Math.min(100, r.s.score) + '%"></i></span></div></td>' +
            '<td>' + r.s.days + ' d</td>' +
            '<td><select class="select fq-status">' + ["aguardando", "convocado", "tratamento"].map(function (st) { return '<option value="' + st + '"' + (r.p.status === st ? " selected" : "") + '>' + (st === "aguardando" ? t("fila.st.wait") : st === "convocado" ? t("fila.st.called") : t("fila.st.treat")) + '</option>'; }).join("") + '</select></td>' +
            '<td><button class="chip-btn fq-del" type="button" title="' + (en() ? "Remove from queue" : "Remover da fila") + '">' + (window.ICO ? ICO("x") : "✕") + '</button></td>' +
            '</tr>' + det;
        }).join("") +
        '</tbody></table>'
        : '<div class="panel panel-warn inline" style="margin-top:14px"><p>' + (en() ? "No patients in the queue yet. Register the first one above — ordering by severity score is automatic." : "Nenhum paciente na fila ainda. Cadastre o primeiro acima — a ordenação é automática pela pontuação de gravidade.") + '</p></div>') +
      '<details class="how-calc" style="margin-top:14px"><summary>' + esc(t("fila.how")) + '</summary>' +
      '<ul style="margin:8px 0 0;padding-left:20px;color:var(--ink-2);font-size:.92rem">' +
      '<li><strong>' + (en() ? "WHO grade of the diagnostic hypothesis:" : "Grau OMS da hipótese diagnóstica:") + '</strong> G1 = +10, G2 = +20, G3 = +30, G4 = +40.</li>' +
      CRIT.map(function (c) { return '<li><strong>' + esc(critLabel(c)) + ':</strong> +' + c.pts + (en() ? " points." : " pontos.") + '</li>'; }).join("") +
      '<li><strong>' + (en() ? "Waiting time:" : "Tempo de espera:") + '</strong> ' + (en() ? "+1 point per full week waiting, capped at +15 (temporal equity)." : "+1 ponto por semana completa aguardando, limitado a +15 (equidade temporal).") + '</li>' +
      '<li>' + (en() ? "Classification: ≥70 very high · 50–69 high · 30–49 moderate · &lt;30 low." : "Classificação: ≥70 muito alta · 50–69 alta · 30–49 moderada · &lt;30 baixa.") + '</li>' +
      '<li>' + (en() ? "EDUCATIONAL queue: does not replace official regulation, institutional risk criteria or clinical judgment." : "Fila EDUCACIONAL: não substitui regulação oficial, critérios de risco institucional nem julgamento clínico.") + '</li>' +
      '</ul></details>';

    // --- foto do formulário ---
    var pbtn = el.querySelector("#fq-photo-btn"), pfile = el.querySelector("#fq-photo"),
      pprev = el.querySelector("#fq-photo-prev"), pclear = el.querySelector("#fq-photo-clear");
    function paintPhoto() {
      if (pendingPhoto) { pprev.src = pendingPhoto; pprev.hidden = false; pbtn.style.display = "none"; pclear.hidden = false; }
      else { pprev.hidden = true; pbtn.style.display = ""; pclear.hidden = true; }
    }
    paintPhoto();
    pbtn.addEventListener("click", function () { pfile.click(); });
    pfile.addEventListener("change", function () { fileToThumb(pfile.files[0], function (d) { pendingPhoto = d; paintPhoto(); }); });
    pclear.addEventListener("click", function () { pendingPhoto = null; pfile.value = ""; paintPhoto(); });

    el.querySelector("#fq-add").addEventListener("click", function () {
      var label = (el.querySelector("#fq-id").value || "").trim();
      if (!label) { el.querySelector("#fq-id").focus(); return; }
      var crit = [].slice.call(el.querySelectorAll(".fq-crit:checked")).map(function (c) { return c.value; });
      var list2 = load();
      list2.push({
        id: "p" + Date.now(), label: label,
        age: parseInt(el.querySelector("#fq-age").value, 10) || null,
        entity: el.querySelector("#fq-ent").value,
        status: el.querySelector("#fq-status").value,
        notes: (el.querySelector("#fq-notes").value || "").trim(),
        photo: pendingPhoto || null,
        crit: crit, created: new Date().toISOString()
      });
      pendingPhoto = null;
      save(list2); render();
    });
    [].slice.call(el.querySelectorAll("tr[data-id]")).forEach(function (tr) {
      var id = tr.getAttribute("data-id");
      tr.querySelector(".fq-status").addEventListener("change", function (e) {
        var l = load(); var p = l.filter(function (x) { return x.id === id; })[0];
        if (p) { p.status = e.target.value; save(l); render(); }
      });
      tr.querySelector(".fq-del").addEventListener("click", function () {
        save(load().filter(function (x) { return x.id !== id; })); render();
      });
      var pat = tr.querySelector(".fq-pat");
      if (pat) pat.addEventListener("click", function () {
        var d = el.querySelector('.fq-detail[data-for="' + id + '"]');
        if (d) d.hidden = !d.hidden;
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
  document.addEventListener("gliobio:lang", render);
  window.GLIOBIO_FILA = { render: render, scoreOf: scoreOf };
})();
