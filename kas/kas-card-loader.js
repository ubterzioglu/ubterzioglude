/* =====================================================
   KasGuide — kas-card-loader.js
   Purpose:
   - Render the NEW modular notes system inside the .kas-scope area only
   - Do NOT touch / override the old homepage layout (menu, categories, highlights)
   Dependencies:
   - kas-data.js must define: window.kasData (array) or const kasData (global)
   ===================================================== */

(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizeCategory(cat) {
    const c = String(cat || "").toLowerCase();
    if (c.includes("plaj") || c.includes("koy") || c.includes("beach") || c.includes("cove")) return "coves";
    if (c.includes("yeme") || c.includes("içme") || c.includes("food") || c.includes("coffee") || c.includes("rest")) return "food";
    if (c.includes("ulaş") || c.includes("transport") || c.includes("yol") || c.includes("otogar") || c.includes("marina") || c.includes("liman") || c.includes("pratik")) return "transport";
    if (c.includes("tarih") || c.includes("antik") || c.includes("müze") || c.includes("history")) return "tips"; // show as "tips" section for now
    return "tips";
  }

  function buildHero(scope) {
    const heroRoot = $("#hero-root", scope);
    if (!heroRoot) return;

    const data = ((window.kasData || globalThis.kasData || (typeof kasData!=='undefined'?kasData:undefined)) || []).slice();
    const total = data.length;

    const cats = {};
    data.forEach((x) => {
      const k = String(x.category || "Other").trim() || "Other";
      cats[k] = (cats[k] || 0) + 1;
    });

    const topCats = Object.entries(cats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k, v]) => `${escapeHtml(k)} (${v})`)
      .join(" • ");

    heroRoot.innerHTML = `
      <div class="card hero-card" id="start">
        <div class="mini-kicker">New module</div>
        <h1 class="hero-title">KasGuide Notes</h1>
        <p class="hero-subtitle">
          Eski layout korunur. Aşağıdaki kartlar yeni “modüler rehber” sistemidir.
          Şu an toplam <strong>${total}</strong> kayıt var. ${topCats ? `Kategoriler: ${topCats}.` : ""}
        </p>

        <div class="hero-actions">
          <a class="hero-chip" href="#coves"><span class="dot"></span> Coves & beaches</a>
          <a class="hero-chip" href="#food"><span class="dot"></span> Food & coffee</a>
          <a class="hero-chip" href="#transport"><span class="dot"></span> Transport & roads</a>
          <a class="hero-chip" href="#tips"><span class="dot"></span> Tiny tips</a>
          <a class="hero-chip" href="#status"><span class="dot"></span> Build status</a>
        </div>
      </div>
    `;
  }

  function buildSectionShell(id, title, subtitle) {
    return `
      <section class="kas-section" id="${id}">
        <div class="card detail-card">
          <div class="mini-kicker">${escapeHtml(subtitle || "")}</div>
          <h2 class="section-title">${escapeHtml(title || "")}</h2>
          <div class="kas-items"></div>
        </div>
      </section>
    `;
  }

  function renderItem(item, idx) {
    const colorIdx = (idx % 5) + 1;
    const title = escapeHtml(item.title);
    const desc = escapeHtml(item.description);
    const cat = escapeHtml(item.category || "");
    const ig = item.instagram ? String(item.instagram).trim() : "";
    const maps = item.googleMaps ? String(item.googleMaps).trim() : "";
    const img = item.image ? String(item.image).trim() : "";

    const actions = `
      <div class="kas-actions">
        ${maps ? `<a class="pill ok" href="${escapeHtml(maps)}" target="_blank" rel="noopener">📍 Google Maps</a>` : `<span class="pill lock" title="Link yok">📍 Maps yok</span>`}
        ${ig ? `<a class="pill wip" href="${escapeHtml(ig)}" target="_blank" rel="noopener">📸 Instagram</a>` : `<span class="pill lock" title="Link yok">📸 IG yok</span>`}
        ${cat ? `<span class="pill">${cat}</span>` : ``}
      </div>
    `;

    const imageBlock = img
      ? `<div class="kas-image card-color-${colorIdx}"><div class="kas-image-label">Image placeholder</div><div class="kas-image-text">${escapeHtml(img)}</div></div>`
      : ``;

    return `
      <article class="kas-item card card-color-${colorIdx}">
        <h3 class="kas-item-title">${title}</h3>
        <p class="kas-item-desc">${desc}</p>
        ${imageBlock}
        ${actions}
      </article>
    `;
  }

  function buildCards(scope) {
    const root = $("#cards-root", scope);
    if (!root) return;

    const data = ((window.kasData || globalThis.kasData || (typeof kasData!=='undefined'?kasData:undefined)) || []).slice();

    const buckets = {
      coves: [],
      food: [],
      transport: [],
      tips: []
    };

    data.forEach((item) => {
      const b = normalizeCategory(item.category);
      (buckets[b] || buckets.tips).push(item);
    });

    root.innerHTML = `
      ${buildSectionShell("coves", "Coves & beaches", "🏝️ Swim, chill, repeat")}
      ${buildSectionShell("food", "Food & coffee", "🍽️ Bite-sized notes (add more later)")}
      ${buildSectionShell("transport", "Transport & roads", "🚗 Practical notes")}
      ${buildSectionShell("tips", "Tiny tips", "💡 Quick notes & history bits")}
      ${buildSectionShell("status", "Build status", "🧱 What exists / what's next")}
    `;

    // fill items
    const fill = (id, items) => {
      const section = $("#" + id, root);
      const container = $(".kas-items", section);
      if (!container) return;

      if (!items.length) {
        container.innerHTML = `<div class="note"><strong>Henüz içerik yok</strong><div>Bu bölüme yeni kayıtlar eklendikçe otomatik görünecek.</div></div>`;
        return;
      }

      container.innerHTML = `
        <div class="kas-grid">
          ${items.map((it, i) => renderItem(it, i)).join("")}
        </div>
      `;
    };

    fill("coves", buckets.coves);
    fill("food", buckets.food);
    fill("transport", buckets.transport);

    // tips: show remaining + a static tips note
    const tipsExtra = [
      {
        title: "Gün batımı",
        description: "Antiphellos Tiyatrosu gün batımı için klasik. Yazın kalabalık olur, biraz erken gidin.",
        category: "Tiny tips",
        image: "placeholder: sunset over ancient theater",
        instagram: "",
        googleMaps: ""
      },
      {
        title: "Deniz ayakkabısı",
        description: "Çoğu koy taşlık. Deniz ayakkabısı = daha az küfür.",
        category: "Tiny tips",
        image: "placeholder: sea shoes on pebbles",
        instagram: "",
        googleMaps: ""
      }
    ];

    fill("tips", buckets.tips.concat(tipsExtra));

    // status section (static)
    const status = $("#status .kas-items", root);
    if (status) {
      status.innerHTML = `
        <div class="pill-row">
          <span class="pill ok">Old layout: preserved</span>
          <span class="pill ok">Scoped CSS: active</span>
          <span class="pill wip">Content: in progress</span>
          <span class="pill lock">Images: placeholders</span>
        </div>
        <div class="note" style="margin-top:12px;">
          <strong>Next steps</strong>
          <div>1) kas-data.js büyüt (gerçek mekanlar + linkler)</div>
          <div>2) Image placeholder → gerçek <code>&lt;img&gt;</code> sistemi</div>
          <div>3) Kategori filtre / arama (kas-scope içinde)</div>
        </div>
      `;
    }
  }

  function init() {
    const scope = document.querySelector(".kas-scope");
    if (!scope) return;
    if (!Array.isArray(window.kasData)) {
      // tolerate "const kasData" global
      if (Array.isArray(window.kasData) === false && typeof kasData !== "undefined" && Array.isArray(kasData)) {
        window.kasData = kasData;
      }
    }
    buildHero(scope);
    buildCards(scope);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
