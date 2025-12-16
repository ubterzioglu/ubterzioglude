// File: zpaycheck.app.js
// DOM wiring + rendering for ZPAYCHECK
// No storage. No cookies (beyond GoatCounter). No localStorage/sessionStorage.

(function () {
  "use strict";

  const DATA = window.ZPAYCHECK_DATA;
  const LOGIC = window.ZPAYCHECK_LOGIC;

  // ---------------------------
  // DOM
  // ---------------------------

  const els = {
    form: document.getElementById("incomeForm"),
    netMonthly: document.getElementById("netMonthly"),
    currency: document.getElementById("currency"),
    btnReset: document.getElementById("btnReset"),
    btnDownloadPng: document.getElementById("btnDownloadPng"),

    monthlyAll: document.getElementById("monthlyAll"),
    yearlyAll: document.getElementById("yearlyAll"),
    fxTimestamp: document.getElementById("fxTimestamp"),

    trHeadline: document.getElementById("trHeadline"),
    trFacts: document.getElementById("trFacts"),
    trExplain: document.getElementById("trExplain"),

    deHeadline: document.getElementById("deHeadline"),
    deFacts: document.getElementById("deFacts"),
    deExplain: document.getElementById("deExplain"),

    worldHeadline: document.getElementById("worldHeadline"),
    worldFacts: document.getElementById("worldFacts"),
    worldExplain: document.getElementById("worldExplain"),

    factBlocks: document.getElementById("factBlocks"),
    sourcesList: document.getElementById("sourcesList")
  };

  // ---------------------------
  // Formatting
  // ---------------------------

  function fmtMoney(amount, currency) {
    if (amount == null || !isFinite(amount)) return "—";
    try {
      // TRY/EUR/USD supported. For PPP we label manually.
      if (currency === "USD_PPP") {
        return `${Math.round(amount).toLocaleString("en-US")} USD (PPP)`;
      }
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: currency === "TRY" ? 0 : 0
      }).format(amount);
    } catch {
      return `${Math.round(amount).toLocaleString("en-US")} ${currency}`;
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // ---------------------------
  // Rendering helpers
  // ---------------------------

  function renderFacts(container, items, computedFacts) {
    const lines = items.map((t) => `<div>• ${escapeHtml(t)}</div>`);

    // Append key numeric facts if present
    if (computedFacts) {
      if (computedFacts.median != null) {
        lines.push(
          `<div>• Median: <span class="muted">${escapeHtml(
            String(computedFacts.median)
          )}</span></div>`
        );
      }
      if (computedFacts.average != null) {
        lines.push(
          `<div>• Average: <span class="muted">${escapeHtml(
            String(computedFacts.average)
          )}</span></div>`
        );
      }
      if (computedFacts.approxGross != null) {
        lines.push(
          `<div>• Approx. gross (est.): <span class="muted">${escapeHtml(
            String(Math.round(computedFacts.approxGross))
          )}</span></div>`
        );
      }
    }

    container.innerHTML = lines.join("");
  }

  function renderExplain(container, lines) {
    container.innerHTML = lines.map((t) => `<div>• ${escapeHtml(t)}</div>`).join("");
  }

  function renderFactBlocks(regions, computed) {
    const blocks = [];

    // TR
    {
      const r = regions.TR;
      const c = computed.TR;
      blocks.push(`
        <div class="stat">
          <div class="stat__label">${escapeHtml(r.label)}</div>
          <div class="stat__value">
            Avg: ${fmtMoney(r.income.averageYearlyNet, "TRY")}<br/>
            Median: ${r.income.medianYearlyNet == null ? "Not published" : fmtMoney(r.income.medianYearlyNet, "TRY")}
          </div>
          <div class="muted" style="margin-top:6px;">
            • ${escapeHtml(r.factBlock.averageNote)}<br/>
            • ${escapeHtml(r.factBlock.medianNote)}
          </div>
        </div>
      `);
    }

    // DE
    {
      const r = regions.DE;
      blocks.push(`
        <div class="stat">
          <div class="stat__label">${escapeHtml(r.label)}</div>
          <div class="stat__value">
            Median: ${fmtMoney(r.income.medianYearlyGross, "EUR")} (gross)<br/>
            Avg: ${fmtMoney(r.income.averageYearlyGross, "EUR")} (gross)
          </div>
          <div class="muted" style="margin-top:6px;">
            • ${escapeHtml(r.factBlock.averageNote)}<br/>
            • ${escapeHtml(r.factBlock.medianNote)}
          </div>
        </div>
      `);
    }

    // WORLD
    {
      const r = regions.WORLD;
      blocks.push(`
        <div class="stat">
          <div class="stat__label">${escapeHtml(r.label)}</div>
          <div class="stat__value">
            Median: ${fmtMoney(r.income.medianYearlyPPP, "USD_PPP")}<br/>
            Avg: ${fmtMoney(r.income.averageYearlyPPP, "USD_PPP")}
          </div>
          <div class="muted" style="margin-top:6px;">
            • ${escapeHtml(r.factBlock.averageNote)}<br/>
            • ${escapeHtml(r.factBlock.medianNote)}
          </div>
        </div>
      `);
    }

    els.factBlocks.innerHTML = `<div class="factblocks">${blocks.join("")}</div>`;
  }

  function renderSources(data) {
    const items = [];

    const all = [
      ...data.regions.TR.sources.map((s) => ({ region: "Turkey", ...s })),
      ...data.regions.DE.sources.map((s) => ({ region: "Germany", ...s })),
      ...data.regions.WORLD.sources.map((s) => ({ region: "World", ...s })),
      ...data.fx.sources.map((s) => ({ region: "FX", ...s }))
    ];

    for (const s of all) {
      items.push(
        `<li><span class="muted">${escapeHtml(s.region)}:</span> <a href="${escapeHtml(
          s.url
        )}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)}</a></li>`
      );
    }

    els.sourcesList.innerHTML = items.join("");
  }

  // ---------------------------
  // Main compute+render
  // ---------------------------

  function computeAndRender() {
    const netMonthly = Number(els.netMonthly.value);
    const currency = String(els.currency.value);

    if (!isFinite(netMonthly) || netMonthly <= 0) {
      // Keep it simple: just do nothing until valid
      return;
    }

    const fx = LOGIC.getMockFxRates();
    els.fxTimestamp.textContent = fx.timestamp;

    // monthly + yearly in all currencies
    const yearly = LOGIC.monthlyToYearly(netMonthly);

    const monthlyEUR = LOGIC.convertCurrency(netMonthly, currency, "EUR", fx);
    const monthlyUSD = LOGIC.convertCurrency(netMonthly, currency, "USD", fx);
    const monthlyTRY = LOGIC.convertCurrency(netMonthly, currency, "TRY", fx);

    const yearlyEUR = LOGIC.monthlyToYearly(monthlyEUR);
    const yearlyUSD = LOGIC.monthlyToYearly(monthlyUSD);
    const yearlyTRY = LOGIC.monthlyToYearly(monthlyTRY);

    els.monthlyAll.textContent =
      `${fmtMoney(monthlyEUR, "EUR")} · ${fmtMoney(monthlyUSD, "USD")} · ${fmtMoney(monthlyTRY, "TRY")}`;

    els.yearlyAll.textContent =
      `${fmtMoney(yearlyEUR, "EUR")} · ${fmtMoney(yearlyUSD, "USD")} · ${fmtMoney(yearlyTRY, "TRY")}`;

    // Comparisons
    const regions = DATA.regions;

    const tr = LOGIC.compareTurkey(yearlyTRY, regions.TR);
    els.trHeadline.textContent = regions.TR.texts.headlineTemplate.replace("{bucket}", tr.bucket);
    renderFacts(els.trFacts, regions.TR.texts.facts, {
      average: fmtMoney(regions.TR.income.averageYearlyNet, "TRY"),
      median: "Not published"
    });
    renderExplain(els.trExplain, regions.TR.texts.explanation);

    const de = LOGIC.compareGermany(yearlyEUR, regions.DE);
    els.deHeadline.textContent = regions.DE.texts.headlineTemplate.replace("{bucket}", de.bucket);
    renderFacts(els.deFacts, regions.DE.texts.facts, {
      median: fmtMoney(regions.DE.income.medianYearlyGross, "EUR"),
      average: fmtMoney(regions.DE.income.averageYearlyGross, "EUR"),
      approxGross: de.facts.approxGross
    });
    renderExplain(els.deExplain, regions.DE.texts.explanation);

    // WORLD PPP: for now, we approximate USD PPP with USD nominal until PPP conversion is implemented
    const userYearlyUsdPPP = yearlyUSD; // placeholder
    const w = LOGIC.compareWorld(userYearlyUsdPPP, regions.WORLD);
    els.worldHeadline.textContent = regions.WORLD.texts.headlineTemplate.replace(
      "{percentile}",
      String(w.percentile)
    );
    renderFacts(els.worldFacts, regions.WORLD.texts.facts, {
      median: fmtMoney(regions.WORLD.income.medianYearlyPPP, "USD_PPP"),
      average: fmtMoney(regions.WORLD.income.averageYearlyPPP, "USD_PPP")
    });
    renderExplain(els.worldExplain, regions.WORLD.texts.explanation);

    renderFactBlocks(regions, { TR: tr, DE: de, WORLD: w });
    renderSources(DATA);

    // Enable PNG download button once results exist (feature wired later)
    els.btnDownloadPng.disabled = false;
  }

  function resetUI() {
    els.netMonthly.value = "";
    els.currency.value = "EUR";

    els.monthlyAll.textContent = "—";
    els.yearlyAll.textContent = "—";
    els.fxTimestamp.textContent = "—";

    els.trHeadline.textContent = "—";
    els.trFacts.innerHTML = "";
    els.trExplain.innerHTML = "";

    els.deHeadline.textContent = "—";
    els.deFacts.innerHTML = "";
    els.deExplain.innerHTML = "";

    els.worldHeadline.textContent = "—";
    els.worldFacts.innerHTML = "";
    els.worldExplain.innerHTML = "";

    els.factBlocks.innerHTML = `<p class="muted">—</p>`;
    els.sourcesList.innerHTML = `<li><span class="muted">—</span></li>`;

    els.btnDownloadPng.disabled = true;
  }

  // ---------------------------
  // Events
  // ---------------------------

  els.form.addEventListener("submit", (e) => {
    e.preventDefault();
    computeAndRender();
  });

  els.btnReset.addEventListener("click", () => resetUI());

  // Placeholder: PNG export wiring will be added later (minimal code + html-to-image).
  els.btnDownloadPng.addEventListener("click", () => {
    alert("PNG download will be enabled in the next step.");
  });

  // Initial render
  resetUI();
})();
