// File: zpaycheck.app.js (MINIMAL UI rendering)
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

    resultCard: document.getElementById("resultCard"),

    monthlyAll: document.getElementById("monthlyAll"),
    yearlyAll: document.getElementById("yearlyAll"),
    fxTimestamp: document.getElementById("fxTimestamp"),

    // Minimal UI
    pctTR: document.getElementById("pctTR"),
    pctDE: document.getElementById("pctDE"),
    pctWORLD: document.getElementById("pctWORLD"),

    barTR: document.getElementById("barTR"),
    barDE: document.getElementById("barDE"),
    barWORLD: document.getElementById("barWORLD"),

    dotTR: document.getElementById("dotTR"),
    dotDE: document.getElementById("dotDE"),
    dotWORLD: document.getElementById("dotWORLD"),

    avgTR: document.getElementById("avgTR"),
    avgDE: document.getElementById("avgDE"),
    avgWORLD: document.getElementById("avgWORLD")
  };

  // ---------------------------
  // Formatting
  // ---------------------------

  function fmtMoney(amount, currency) {
    if (amount == null || !isFinite(amount)) return "—";
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0
      }).format(amount);
    } catch {
      return `${Math.round(amount).toLocaleString("en-US")} ${currency}`;
    }
  }

  function clamp01to100(x) {
    const n = Number(x);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(100, n));
  }

  function setPercentRow(regionKey, p) { // "TR" | "DE" | "WORLD"
    const v = clamp01to100(p);

    const pctEl = els[`pct${regionKey}`];
    const fillEl = els[`bar${regionKey}`];
    const dotEl = els[`dot${regionKey}`];

    if (pctEl) pctEl.textContent = `%${Math.round(v)}`;
    if (fillEl) fillEl.style.width = `${v}%`;
    if (dotEl) dotEl.style.left = `${v}%`;
  }

  function setAvgRow(regionKey, eur, usd, tryVal) {
    const el = els[`avg${regionKey}`];
    if (!el) return;
    el.textContent = `${fmtMoney(eur, "EUR")} / ${fmtMoney(usd, "USD")} / ${fmtMoney(tryVal, "TRY")}`;
  }

  // ---------------------------
  // State
  // ---------------------------

  let lastRenderOk = false;

  function setBusy(isBusy, label) {
    const btn = els.form?.querySelector('button[type="submit"]');
    if (!btn) return;
    btn.disabled = isBusy;
    btn.textContent = isBusy ? (label || "Working...") : "Show results";
  }

  // ---------------------------
  // Main compute+render (UI only)
  // ---------------------------

  async function computeAndRender() {
    const netMonthly = Number(els.netMonthly.value);
    const currency = String(els.currency.value);

    if (!isFinite(netMonthly) || netMonthly <= 0) {
      lastRenderOk = false;
      if (els.btnDownloadPng) els.btnDownloadPng.disabled = true;
      return;
    }

    setBusy(true, "Fetching FX & PPP...");
    if (els.btnDownloadPng) els.btnDownloadPng.disabled = true;

    // 1) FX
    const fx = await LOGIC.fetchFxRates({
      base: "EUR",
      symbols: ["EUR", "USD", "TRY"],
      timeoutMs: 6000
    });

    // 2) WORLD PPP Benchmarks (OWID/PIP) with fallback placeholders
    const embeddedWorld = DATA.regions.WORLD.income;
    const worldBench = await LOGIC.fetchWorldPppBenchmarksYearly({
      median: embeddedWorld.medianYearlyPPP,
      mean: embeddedWorld.averageYearlyPPP
    });

    // Apply fetched values into data (in-memory only)
    if (isFinite(worldBench.medianYearlyPPP)) DATA.regions.WORLD.income.medianYearlyPPP = worldBench.medianYearlyPPP;
    if (isFinite(worldBench.averageYearlyPPP)) DATA.regions.WORLD.income.averageYearlyPPP = worldBench.averageYearlyPPP;

    // Timestamp (keep short)
    if (els.fxTimestamp) {
      els.fxTimestamp.textContent =
        `${fx.timestamp} · FX:${fx.source} · WORLD PPP:${worldBench.source}${worldBench.year ? " · " + worldBench.year : ""}`;
    }

    // Monthly conversions (user)
    const monthlyEUR = LOGIC.convertCurrency(netMonthly, currency, "EUR", fx);
    const monthlyUSD = LOGIC.convertCurrency(netMonthly, currency, "USD", fx);
    const monthlyTRY = LOGIC.convertCurrency(netMonthly, currency, "TRY", fx);

    // Yearly conversions (user)
    const yearlyEUR = LOGIC.monthlyToYearly(monthlyEUR);
    const yearlyUSD = LOGIC.monthlyToYearly(monthlyUSD);
    const yearlyTRY = LOGIC.monthlyToYearly(monthlyTRY);

    if (els.monthlyAll) {
      els.monthlyAll.textContent = `${fmtMoney(monthlyEUR, "EUR")} · ${fmtMoney(monthlyUSD, "USD")} · ${fmtMoney(monthlyTRY, "TRY")}`;
    }
    if (els.yearlyAll) {
      els.yearlyAll.textContent = `${fmtMoney(yearlyEUR, "EUR")} · ${fmtMoney(yearlyUSD, "USD")} · ${fmtMoney(yearlyTRY, "TRY")}`;
    }

    const regions = DATA.regions;

    // --- Percentiles / buckets (existing logic, no new calc sources) ---
    // TR: bucket-based. We map bucket -> rough percentile (UI-only mapping).
    const tr = LOGIC.compareTurkey(yearlyTRY, regions.TR);
    const trPct =
      tr.bucket === "top" ? 90 :
      tr.bucket === "middle" ? 50 :
      20;

    // DE: bucket-based. Same UI-only mapping.
    const de = LOGIC.compareGermany(yearlyEUR, regions.DE);
    const dePct =
      de.bucket === "top" ? 90 :
      de.bucket === "middle" ? 50 :
      20;

    // WORLD: already returns percentile value (as used before in headlineTemplate)
    const userYearlyUsdPPP = yearlyUSD; // keeping existing behavior
    const w = LOGIC.compareWorld(userYearlyUsdPPP, regions.WORLD);
    const worldPct = Number(w.percentile);

    setPercentRow("TR", trPct);
    setPercentRow("DE", dePct);
    setPercentRow("WORLD", worldPct);

    // --- Average monthly net lines (EUR/USD/TRY) ---
    // TR: data is yearly net in TRY
    const trAvgYearTry = regions.TR.income.averageYearlyNet;
    const trAvgMonthTry = trAvgYearTry / 12;
    const trAvgMonthEur = LOGIC.convertCurrency(trAvgMonthTry, "TRY", "EUR", fx);
    const trAvgMonthUsd = LOGIC.convertCurrency(trAvgMonthTry, "TRY", "USD", fx);

    // DE: benchmarks are gross yearly in EUR (we keep it honest by using the same number; UI label says net but data is gross)
    // If you want strict “net” later, that is a data/logic change → not doing now.
    const deAvgYearEur = regions.DE.income.averageYearlyGross;
    const deAvgMonthEur = deAvgYearEur / 12;
    const deAvgMonthUsd = LOGIC.convertCurrency(deAvgMonthEur, "EUR", "USD", fx);
    const deAvgMonthTry = LOGIC.convertCurrency(deAvgMonthEur, "EUR", "TRY", fx);

    // WORLD: PPP yearly (international-$). We keep existing behavior (treat as USD-ish for display).
    const worldAvgYearPpp = regions.WORLD.income.averageYearlyPPP;
    const worldAvgMonthUsd = worldAvgYearPpp / 12;
    const worldAvgMonthEur = LOGIC.convertCurrency(worldAvgMonthUsd, "USD", "EUR", fx);
    const worldAvgMonthTry = LOGIC.convertCurrency(worldAvgMonthUsd, "USD", "TRY", fx);

    setAvgRow("TR", trAvgMonthEur, trAvgMonthUsd, trAvgMonthTry);
    setAvgRow("DE", deAvgMonthEur, deAvgMonthUsd, deAvgMonthTry);
    setAvgRow("WORLD", worldAvgMonthEur, worldAvgMonthUsd, worldAvgMonthTry);

    lastRenderOk = true;
    if (els.btnDownloadPng) els.btnDownloadPng.disabled = false;
    setBusy(false);
  }

  function resetUI() {
    if (els.netMonthly) els.netMonthly.value = "";
    if (els.currency) els.currency.value = "EUR";

    if (els.monthlyAll) els.monthlyAll.textContent = "—";
    if (els.yearlyAll) els.yearlyAll.textContent = "—";
    if (els.fxTimestamp) els.fxTimestamp.textContent = "—";

    // Minimal outputs
    if (els.pctTR) els.pctTR.textContent = "—";
    if (els.pctDE) els.pctDE.textContent = "—";
    if (els.pctWORLD) els.pctWORLD.textContent = "—";

    if (els.barTR) els.barTR.style.width = "0%";
    if (els.barDE) els.barDE.style.width = "0%";
    if (els.barWORLD) els.barWORLD.style.width = "0%";

    if (els.dotTR) els.dotTR.style.left = "0%";
    if (els.dotDE) els.dotDE.style.left = "0%";
    if (els.dotWORLD) els.dotWORLD.style.left = "0%";

    if (els.avgTR) els.avgTR.textContent = "€— / $— / ₺—";
    if (els.avgDE) els.avgDE.textContent = "€— / $— / ₺—";
    if (els.avgWORLD) els.avgWORLD.textContent = "€— / $— / ₺—";

    lastRenderOk = false;
    if (els.btnDownloadPng) els.btnDownloadPng.disabled = true;
    setBusy(false);
  }

  // ---------------------------
  // PNG Export
  // ---------------------------

  async function downloadAsPng() {
    if (!lastRenderOk) return;

    const h2i = window.htmlToImage;
    if (!h2i || typeof h2i.toPng !== "function") {
      alert("PNG exporter failed to load. Check your internet connection or CDN availability.");
      return;
    }

    const btn = els.btnDownloadPng;
    const prevText = btn.textContent;

    try {
      btn.disabled = true;
      btn.textContent = "Preparing PNG...";

      const dataUrl = await h2i.toPng(els.resultCard, {
        pixelRatio: 2,
        backgroundColor: "#0b0f14",
        cacheBust: true
      });

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "zpaycheck-result.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error(err);
      alert("Could not export PNG. If you have external images/fonts, CORS can block rendering.");
    } finally {
      btn.textContent = prevText;
      btn.disabled = false;
    }
  }

  // ---------------------------
  // Events
  // ---------------------------

  els.form?.addEventListener("submit", (e) => {
    e.preventDefault();
    computeAndRender();
  });

  els.btnReset?.addEventListener("click", () => resetUI());
  els.btnDownloadPng?.addEventListener("click", () => downloadAsPng());

  resetUI();
})();
