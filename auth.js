// =====================================================================
// auth.js — GlioBio v2.7: cadastro/login LOCAL de médico (sem backend).
// Senhas com hash SHA-256 + salt via crypto.subtle; usuários e sessão em
// localStorage. AVISO: segurança de dispositivo único, educacional —
// não substitui autenticação hospitalar. Acesso público permanece para
// todo o conteúdo educativo; fila e Dr.Gliou exigem sessão.
// =====================================================================
(function () {
  "use strict";
  var UKEY = "gliobio_users_v1", SKEY = "gliobio_session_v1";
  var GATED = { fila: 1, agente: 1, imagem: 1 };
  function users() { try { return JSON.parse(localStorage.getItem(UKEY) || "[]"); } catch (e) { return []; } }
  function saveUsers(u) { localStorage.setItem(UKEY, JSON.stringify(u)); }
  function session() { try { return JSON.parse(localStorage.getItem(SKEY) || "null"); } catch (e) { return null; } }
  function setSession(s) { if (s) localStorage.setItem(SKEY, JSON.stringify(s)); else localStorage.removeItem(SKEY); paintSidebar(); document.dispatchEvent(new CustomEvent("gliobio:auth")); }
  function hash(pw, salt) {
    if (window.crypto && crypto.subtle) {
      var data = new TextEncoder().encode(salt + "::" + pw);
      return crypto.subtle.digest("SHA-256", data).then(function (b) {
        return Array.prototype.map.call(new Uint8Array(b), function (x) { return x.toString(16).padStart(2, "0"); }).join("");
      });
    }
    return Promise.resolve("djb2:" + (function (h) { var s = salt + "::" + pw; for (var i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return h; })(5381));
  }
  function esc(x) { return String(x == null ? "" : x).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function t(k) { return window.I18N ? I18N.t(k) : k; }

  function register(info, cb) {
    var u = users();
    if (u.filter(function (x) { return x.email === info.email; }).length) return cb({ err: t("auth.exists") });
    if (!info.pass || info.pass.length < 6) return cb({ err: t("auth.short") });
    if (info.pass !== info.pass2) return cb({ err: t("auth.mismatch") });
    var salt = "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    hash(info.pass, salt).then(function (h) {
      u.push({ name: info.name, crm: info.crm, email: info.email, salt: salt, hash: h, created: new Date().toISOString() });
      saveUsers(u);
      setSession({ name: info.name, crm: info.crm, email: info.email });
      cb({ ok: true });
    });
  }
  function login(email, pw, cb) {
    var u = users().filter(function (x) { return x.email === email; })[0];
    if (!u) return cb({ err: t("auth.bad") });
    hash(pw, u.salt).then(function (h) {
      if (h !== u.hash) return cb({ err: t("auth.bad") });
      setSession({ name: u.name, crm: u.crm, email: u.email });
      cb({ ok: true });
    });
  }
  function logout() { setSession(null); }
  function allowed(tab) { return !GATED[tab] || !!session(); }

  function paintSidebar() {
    var box = document.querySelector("#side-auth"); if (!box) return;
    var s = session();
    if (s) {
      box.innerHTML = '<div class="side-user">' + window.ICO("user") + '<div><strong>' + esc(s.name) + '</strong><span>' + esc(s.crm || s.email) + '</span></div>' +
        '<button class="icon-btn" id="side-logout" title="' + esc(t("auth.logout")) + '" type="button">' + window.ICO("logout") + '</button></div>';
      var lb = box.querySelector("#side-logout");
      if (lb) lb.addEventListener("click", function () { logout(); document.dispatchEvent(new CustomEvent("gliobio:auth")); });
    } else {
      box.innerHTML = '<button class="side-login" id="side-login" type="button">' + window.ICO("lock") + '<span>' + esc(t("auth.title")) + '</span></button>';
      box.querySelector("#side-login").addEventListener("click", function () { openLock("fila"); });
    }
  }

  function lockHtml(tab) {
    return '<div class="panel auth-card">' +
      '<div class="auth-head">' + window.ICO("lock", "ico-lg") + '<div><h3 style="margin:0">' + esc(t("auth.locked")) + '</h3>' +
      '<p class="hint" style="margin:4px 0 0">' + esc(t("auth.lockedmsg")) + '</p></div></div>' +
      '<div class="auth-tabs"><button class="chip-btn active" data-mode="login" type="button">' + esc(t("auth.have")) + '</button>' +
      '<button class="chip-btn" data-mode="reg" type="button">' + esc(t("auth.new")) + '</button></div>' +
      '<form class="auth-form" id="auth-form">' +
      '<div class="auth-reg" hidden><label>' + esc(t("auth.name")) + '<input class="text-input" name="name" autocomplete="name"></label>' +
      '<label>' + esc(t("auth.crm")) + '<input class="text-input" name="crm" autocomplete="off"></label></div>' +
      '<label>' + esc(t("auth.email")) + '<input class="text-input" name="email" type="email" required autocomplete="username"></label>' +
      '<label>' + esc(t("auth.pass")) + '<input class="text-input" name="pass" type="password" required autocomplete="current-password"></label>' +
      '<div class="auth-reg" hidden><label>' + esc(t("auth.pass2")) + '<input class="text-input" name="pass2" type="password" autocomplete="new-password"></label></div>' +
      '<p class="auth-err" hidden></p>' +
      '<button class="btn-primary" type="submit">' + window.ICO("check") + '<span class="auth-submit-label">' + esc(t("auth.login")) + '</span></button>' +
      '</form>' +
      '<p class="hint" style="margin-top:10px">' + esc(t("auth.subtitle")) + '</p>' +
      '</div>';
  }

  function bindLock(root, tab) {
    var mode = "login";
    var tabs = root.querySelectorAll(".auth-tabs .chip-btn");
    tabs.forEach(function (b) {
      b.addEventListener("click", function () {
        mode = b.getAttribute("data-mode");
        tabs.forEach(function (x) { x.classList.toggle("active", x === b); });
        root.querySelectorAll(".auth-reg").forEach(function (r) { r.hidden = mode !== "reg"; });
        root.querySelector(".auth-submit-label").textContent = mode === "reg" ? t("auth.new") : t("auth.login");
      });
    });
    root.querySelector("#auth-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.target, err = root.querySelector(".auth-err");
      var done = function (r) {
        if (r.err) { err.textContent = r.err; err.hidden = false; return; }
        document.dispatchEvent(new CustomEvent("gliobio:auth"));
        showTabForce(tab);
      };
      if (mode === "reg") register({ name: f.name.value.trim(), crm: f.crm.value.trim(), email: f.email.value.trim(), pass: f.pass.value, pass2: f.pass2.value }, done);
      else login(f.email.value.trim(), f.pass.value, done);
    });
  }
  function showTabForce(tab) {
    var btn = document.querySelector('.nav-item[data-tab="' + tab + '"]') || document.querySelector('.tab[data-tab="' + tab + '"]');
    if (btn) { window.__GLIOBIO_FORCE_TAB = true; btn.click(); }
  }
  function openLock(tab) {
    var panel = document.querySelector("#panel-" + tab); if (!panel) return;
    var host = panel.querySelector("#fila-root") || panel.querySelector("#agent-lock") || panel;
    if (host.id === "agent-lock") {
      host.hidden = false;
      var ab = panel.querySelector("#agent-body"); if (ab) ab.style.display = "none";
    }
    host.innerHTML = lockHtml(tab);
    bindLock(host, tab);
    var btn = document.querySelector('.nav-item[data-tab="' + tab + '"]') || document.querySelector('.tab[data-tab="' + tab + '"]');
    if (btn) { window.__GLIOBIO_FORCE_TAB = true; btn.click(); }
  }

  window.AUTH = {
    session: session, allowed: allowed, register: register, login: login, logout: logout,
    lockHtml: lockHtml, bindLock: bindLock, paintSidebar: paintSidebar, openLock: openLock, gated: GATED
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", paintSidebar);
  else paintSidebar();
  document.addEventListener("gliobio:lang", paintSidebar);
})();
