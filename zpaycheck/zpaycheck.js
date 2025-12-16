/* =========================================================
  FILE: /zpaycheck/zpaycheck.js
  PURPOSE:
  - Sidebar view switching
  - Mobile hamburger overlay (sb-open)
  - Salary check: normalize input -> yearly -> compare -> render
========================================================= */

(function () {
  const $ = (id) => document.getElementById(id);

  const data = window.ZPAYCHECK_DATA;
  const navButtons = Array.from(document.querySelectorAll(".sb-item"));
  const views = {
    check: $("view-check"),
    about: $("view-about"),
    sources: $("view-sources")
  };

  /* =========================================================
    NAV / VIEWS
  ========================================================== */
  function setView(key) {
    navButtons.forEach((b) => b.classList.toggle("is-active", b.dataset.view === key));
    Object.keys(views).forEach((k) => views[k].classList.toggle("is-active", k === key));
    document.body.classList.remove("sb-open");
  }

  navButtons.forEach((b) => {
    b.addEventListener("click", () => setView(b.dataset.view));
  });

  /* =========================================================
    MOBILE SIDEBAR
  ========================================================== */
  const hamb = $("hamb");
  hamb.addEventListener("click", () => document.body.classList.toggle("sb-open"));

  // close when clicking the dim overlay area
  document.addEventListener("click", (e) => {
    if (!document.body.classList.contains("sb-open")) return;
    const sb = $("sidebar");
    const isClickInsideSidebar = sb.contains(e.target);
    const isHamb = hamb.contains(e.target);
    if (!isClickInsideSidebar && !isHamb) document.body.classList.remove("sb-open");
  });

  /* =========================================================
    SOURCES VIEW
  ========================================================== */
  function renderSources() {
    const el = $("sourcesList");
    const rows = [];
    rows.push(`• Updated: ${data?.meta?.updated || "—"}`);
    rows.push(`• Note: ${data?.meta?.note || "—"}`);
    rows.push("");
    rows.push("• Germany (DE):");
    (data.sources.DE || []).forEach((s) => rows.push(`  - ${s}`));
    rows.push("");
    rows.push("• Türkiye (TR):");
    (data.sources.TR || []).forEach((s) => rows.push(`  - ${s}`));
    rows.push("");
    rows.push("• World:");
    (data.sources.WORLD || []).forEach((s) => rows.push(`  - ${s}`));

    el.innerHTML = rows.map((r) => `<div>${escapeHtml(r)}</div>`).join("");
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  renderSources();

  /* =========================================================
    CHECK LOGIC
  ========================================================== */
  const countryEl = $("country");
  const roleEl = $("role");
  const amountEl = $("amount");
  const periodEl = $("period");
  const typeEl = $("type");
  const currencyEl = $("currency");

  const btnCheck = $("btnCheck");
  const btnReset = $("btnReset");

  const resultCard = $("resultCard");
  const resultSubtitle = $("resultSubtitle");
  const kpiMedian = $("kpiMedian");
  const kpiAverage = $("kpiAverage");
  const kpiYou = $("kpiYou");
  const kpiBand = $("kpiBand");
  const barFill = $("barFill");
  const barHint = $("barHint");
  const explainBox = $("explainBox");

  function fmtMoney(n, cur) {
    if (!Number.isFinite(n)) return "—";
    if (cur === "PPP") return `${Math.round(n).toLocaleString()} Int-$ / year`;
    return `${Math.round(n).toLocaleString()} ${cur} / year`;
  }

  function toYearly(value, period) {
    if (!Number.isFinite(value)) return NaN;
    return period === "month" ? value * 12 : value;
  }

  function bandFromPercentiles(x, p) {
    // returns { label, pctApprox } for bar
    if (!Number.isFinite(x)) return { label: "—", pctApprox: 0 };

    if (x < p.p10) return { label: "< P10", pctApprox: 5 };
    if (x < p.p25) return { label: "P10–P25", pctApprox: 18 };
    if (x < p.p50) return { label: "P25–P50", pctApprox: 38 };
    if (x < p.p75) return { label: "P50–P75", pctApprox: 62 };
    if (x < p.p90) return { label: "P75–P90", pctApprox: 82 };
    return { label: "≥ P90", pctApprox: 95 };
  }

  btnCheck.addEventListener("click", () => {
    const regionKey = countryEl.value;
    const region = data?.regions?.[regionKey];
    if (!region) return;

    const raw = Number(amountEl.value);
    const yearly = toYearly(raw, periodEl.value);

    if (!Number.isFinite(yearly) || yearly <= 0) {
      resultCard.style.display = "block";
      resultSubtitle.textContent = "Enter a valid salary amount.";
      explainBox.textContent = "Tip: use numbers only (e.g., 65000).";
      kpiMedian.textContent = "—";
      kpiAverage.textContent = "—";
      kpiYou.textContent = "—";
      kpiBand.textContent = "—";
      barFill.style.width = "0%";
      barHint.textContent = "—";
      return;
    }

    const youCur = currencyEl.value;
    const regCur = region.currency;

    // V1 rule: require matching currency per region (keeps it simple).
    // Later: add conversion (EUR<->TRY) and PPP conversion.
    if (youCur !== regCur) {
      resultCard.style.display = "block";
      resultSubtitle.textContent = "Currency mismatch for this region.";
      explainBox.innerHTML =
        `This region uses <b>${regCur}</b>. Switch currency to <b>${regCur}</b> (V1 is intentionally simple).`;
      kpiMedian.textContent = fmtMoney(region.median, regCur);
      kpiAverage.textContent = fmtMoney(region.average, regCur);
      kpiYou.textContent = fmtMoney(yearly, youCur);
      kpiBand.textContent = "—";
      barFill.style.width = "0%";
      barHint.textContent = "—";
      return;
    }

    const band = bandFromPercentiles(yearly, region.percentiles);

    const roleTxt = roleEl.value.trim();
    const typeTxt = typeEl.value === "net" ? "net" : "gross";
    const regionTxt = region.label;

    resultCard.style.display = "block";
    resultSubtitle.textContent =
      `${regionTxt} · ${typeTxt} · ${periodEl.value} → normalized to yearly${roleTxt ? ` · role: ${roleTxt}` : ""}`;

    kpiMedian.textContent = fmtMoney(region.median, regCur);
    kpiAverage.textContent = fmtMoney(region.average, regCur);
    kpiYou.textContent = fmtMoney(yearly, regCur);
    kpiBand.textContent = band.label;

    barFill.style.width = `${band.pctApprox}%`;
    barHint.textContent = `approx. ${band.pctApprox}th percentile`;

    const vsMedian = yearly >= region.median ? "above" : "below";
    const vsAvg = yearly >= region.average ? "above" : "below";

    explainBox.innerHTML = `
      <b>Quick read:</b> You are <b>${vsMedian}</b> the median and <b>${vsAvg}</b> the average for this region (based on V1 dataset).<br><br>
      <span class="muted">
        V1 note: This is a simplified banding model (P10/P25/P50/P75/P90). Later we can add role-level filtering and richer distributions.
      </span>
    `;
  });

  btnReset.addEventListener("click", () => {
    amountEl.value = "";
    roleEl.value = "";
    periodEl.value = "year";
    typeEl.value = "gross";
    // keep selected country
    resultCard.style.display = "none";
  });

  /* =========================================================
    DEFAULTS
    - keep currency aligned with region on region change
  ========================================================== */
  countryEl.addEventListener("change", () => {
    const region = data?.regions?.[countryEl.value];
    if (!region) return;
    currencyEl.value = region.currency;
    resultCard.style.display = "none";
  });

  // initial alignment
  (function init() {
    const region = data?.regions?.[countryEl.value];
    if (region) currencyEl.value = region.currency;
  })();
})();
