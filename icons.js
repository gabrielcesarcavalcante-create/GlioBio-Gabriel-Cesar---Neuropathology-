// =====================================================================
// icons.js — GlioBio v2.7: conjunto de símbolos minimalistas (traço 1.7,
// currentColor) que substituem os emojis em toda a interface.
// =====================================================================
(function () {
  "use strict";
  var P = {
    home: '<path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5"/>',
    dna: '<path d="M8 3c8 5 8 13 0 18M16 3c-8 5-8 13 0 18M9 7.5h6M9 12h6M9 16.5h6"/>',
    flask: '<path d="M9.5 3h5M10.5 3v5.2L5.4 17a4 4 0 0 0 3.6 5.8h6A4 4 0 0 0 18.6 17L13.5 8.2V3M8 14.5h8"/>',
    chart: '<path d="M4 4v16h16M8.5 16v-4.5M12.5 16V7.5M16.5 16v-6"/>',
    brain: '<path d="M12 4.5a3.8 3.8 0 0 0-3.8 3.8 3.4 3.4 0 0 0-1.9 6 3.4 3.4 0 0 0 2.9 4.7h5.6a3.4 3.4 0 0 0 2.9-4.7 3.4 3.4 0 0 0-1.9-6A3.8 3.8 0 0 0 12 4.5zM12 4.5v14.5"/>',
    image: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4.5 17.5 9.5 12.5l3.5 3.5 2.5-2.5 4 4"/>',
    queue: '<path d="M4 6h9M4 12h6M4 18h6"/><circle cx="17" cy="14.5" r="4.2"/><path d="M17 12.3v2.2l1.6 1.6"/>',
    stetho: '<path d="M6.5 3.5v5a4 4 0 0 0 8 0v-5M10.5 12.5V16a5 5 0 0 0 10 0v-1.2"/><circle cx="20.5" cy="12.5" r="1.9"/>',
    chat: '<path d="M4 5h16v10.5H9.5L4 19.5z"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.2M12 7.8h.01"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c3.2 3.6 3.2 13.4 0 17M12 3.5c-3.2 3.6-3.2 13.4 0 17"/>',
    user: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20c1.5-4 4-5.6 7-5.6s5.5 1.6 7 5.6"/>',
    lock: '<rect x="5.5" y="10.5" width="13" height="9" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
    camera: '<path d="M4 8h3.2L9 5.5h6L16.8 8H20v11H4z"/><circle cx="12" cy="13" r="3.2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    upload: '<path d="M12 16V5M7.5 9.5 12 5l4.5 4.5M4.5 19h15"/>',
    logout: '<path d="M14 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2M10 12h10M17 9l3 3-3 3"/>',
    check: '<path d="M5 12.5 10 17.5 19 7"/>',
    alert: '<path d="M12 4 21 19H3zM12 10v4M12 16.6h.01"/>',
    doc: '<path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h6M10 16h6"/>',
    scan: '<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16M8 12h8"/>',
    gap: '<path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7.5a4.5 4.5 0 1 0 4.5 4.5"/><path d="M12 3v4.5M21 12h-4.5"/>',
    pin: '<path d="M12 21s-6.5-6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/>'
  };
  window.ICO = function (name, cls) {
    return '<svg class="ico' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || P.info) + '</svg>';
  };
  window.ICO_NAMES = Object.keys(P);
})();
