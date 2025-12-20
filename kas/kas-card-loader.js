/* =====================================================
   KasGuide — kas-card-loader.js
   - Modular cards (Kas-scoped)
   - Renders from window.KASGUIDE (kas-data.js)
   ===================================================== */

(() => {
  const registry = Object.create(null);

  function escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function missingCard(name) {
    return `
      <div class="detail-card card-color-3">
        <h2>Missing card: ${escapeHtml(name)}</h2>
        <p>Template is not registered in kas-card-loader.js</p>
      </div>
    `;
  }

  function register(name, templateFn) {
    registry[name] = templateFn;
  }

  function renderInto(rootId, cardNames) {
    const root = document.getElementById(rootId);
    if (!root) return;
    root.innerHTML = cardNames
      .map((n) => (registry[n] ? registry[n]() : missingCard(n)))
      .join("\n");
  }

  function requireData() {
    if (!window.KASGUIDE || !window.KASGUIDE.sections) {
      console.warn("KASGUIDE data missing. Did kas-data.js load?");
      return { meta: { name: "KasGuide", tagline: "", subtitle: "" }, sections: [] };
    }
    return window.KASGUIDE;
  }

  /* =====================================================
     CARD: HERO
     ===================================================== */
  register("heroKasGuide", () => {
    const { meta } = requireData();
    return `
      <section class="card hero-card" aria-label="KasGuide Hero">
        <div class="hero-content">
          <h1 class="hero-title">${escapeHtml(meta.name)}</h1>
          <p class="hero-subtitle">${escapeHtml(meta.subtitle)}</p>

          <div class="hero-actions">
            <a class="hero-chip" href="#start"><span class="dot"></span>Start here</a>
            <a class="hero-chip" href="#coves"><span class="dot"></span>Coves</a>
            <a class="hero-chip" href="#food"><span class="dot"></span>Food</a>
            <a class="hero-chip" href="#transport"><span class="dot"></span>Transport</a>
          </div>

          <div class="note" style="margin-top:14px;">
            <strong>${escapeHtml(meta.tagline)}</strong>
            <div style="opacity:0.85;">Built slowly. Published when it’s actually useful.</div>
          </div>
        </div>
      </section>
    `;
  });

  /* =====================================================
     CARD: SECTION (from data)
     ===================================================== */
  function sectionCard(s) {
    const bullets = (s.bullets || [])
      .map((b) => `<li>${escapeHtml(b)}</li>`)
      .join("");
    const notes = (s.notes || [])
      .map(
        (n) => `
        <div class="note" style="margin-top:10px;">
          <strong>${escapeHtml(n.title)}</strong>
          <div>${escapeHtml(n.text)}</div>
        </div>
      `
      )
      .join("");

    const pills = (s.pills || [])
      .map((p) => `<span class="pill ${escapeHtml(p.kind)}">${escapeHtml(p.label)}</span>`)
      .join("");

    return `
      <article class="detail-card ${escapeHtml(s.colorClass || "")}" id="${escapeHtml(s.id)}">
        <div class="mini-kicker">${escapeHtml(s.kicker || "")}</div>
        <h2>${escapeHtml(s.title)}</h2>
        ${bullets ? `<ul style="margin-top:10px; padding-left:18px; line-height:1.6;">${bullets}</ul>` : ""}
        ${pills ? `<div class="pill-row">${pills}</div>` : ""}
        ${notes}
      </article>
    `;
  }

  register("kasAllSections", () => {
    const { sections } = requireData();
    return sections.map(sectionCard).join("\n");
  });

  /* =====================================================
     Boot
     ===================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    renderInto("hero-root", ["heroKasGuide"]);
    renderInto("cards-root", ["kasAllSections"]);
  });
})();
