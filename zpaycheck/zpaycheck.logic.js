// File: zpaycheck.logic.js (UPDATED: adds OWID/PIP WORLD PPP fetch + fallback)
// Pure calculation & comparison logic for ZPAYCHECK
// No DOM access. No storage.

// ---------------------------
// Helpers
// ---------------------------

function round(value, decimals = 2) {
  const f = Math.pow(10, decimals);
  return Math.round(value * f) / f;
}

function monthlyToYearly(netMonthly) {
  return netMonthly * 12;
}

// ---------------------------
// FX
// ---------------------------

function getMockFxRates() {
  // Base: EUR
  return {
    base: "EUR",
    timestamp: new Date().toISOString(),
    rates: { EUR: 1, USD: 1.08, TRY: 35 },
    source: "mock"
  };
}

async function fetchFxRates(options = {}) {
  const { base = "EUR", symbols = ["EUR", "USD", "TRY"], timeoutMs = 6000 } = options;

  const url =
    `https://api.exchangerate.host/latest?base=${encodeURIComponent(base)}` +
    `&symbols=${encodeURIComponent(symbols.join(","))}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: { accept: "application/json" }
    });
    if (!res.ok) throw new Error(`FX HTTP ${res.status}`);

    const json = await res.json();
    if (!json || !json.rates) throw new Error("FX invalid response");

    const rates = {};
    for (const s of symbols) {
      if (s === base) {
        rates[s] = 1;
        continue;
      }
      const v = Number(json.rates[s]);
      if (!isFinite(v) || v <= 0) throw new Error(`FX missing/invalid rate for ${s}`);
      rates[s] = v;
    }

    const timestamp = json.date ? new Date(json.date).toISOString() : new Date().toISOString();

    return { base, timestamp, rates, source: "exchangerate.host" };
  } catch {
    return getMockFxRates();
  } finally {
    clearTimeout(timer);
  }
}

function convertCurrency(amount, from, to, fx) {
  if (from === to) return amount;

  const inBase = from === fx.base ? amount : amount / fx.rates[from];
  return to === fx.base ? inBase : inBase * fx.rates[to];
}

// ---------------------------
// WORLD PPP (OWID / World Bank PIP via OWID Grapher)
// Goal: fetch "World" latest daily median + mean (int-$ 2021 PPP), convert to yearly.
// Uses CSV endpoints and falls back to existing placeholders if blocked.
// ---------------------------

function parseOwidCsv(csvText) {
  // OWID CSV is typically: Entity,Code,Year,<valueColumn>
  // We parse with a minimal CSV parser that handles quoted values.
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const header = splitCsvLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const parts = splitCsvLine(lines[i]);
    if (parts.length < 4) continue;

    const obj = {};
    for (let c = 0; c < header.length; c++) obj[header[c]] = parts[c] ?? "";
    rows.push(obj);
  }
  return rows;
}

function splitCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      // handle escaped quote
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }

    cur += ch;
  }
  out.push(cur);
  return out;
}

function getValueColumnName(headerRow) {
  // header includes Entity,Code,Year, then a long column name
  // pick the last column as the value column
  const keys = headerRow;
  return keys[keys.length - 1];
}

async function fetchOwidWorldLatestDaily(url, options = {}) {
  const { timeoutMs = 8000 } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: { accept: "text/csv" }
    });
    if (!res.ok) throw new Error(`OWID HTTP ${res.status}`);

    const csv = await res.text();
    const rows = parseOwidCsv(csv);
    if (!rows.length) throw new Error("OWID CSV empty");

    const headerLine = csv.trim().split(/\r?\n/)[0];
    const header = splitCsvLine(headerLine);
    const valueCol = getValueColumnName(header);

    // filter to World only
    const worldRows = rows.filter((r) => r.Entity === "World");
    if (!worldRows.length) throw new Error("OWID no World rows");

    // pick max Year
    let best = null;
    for (const r of worldRows) {
      const y = Number(r.Year);
      const v = Number(r[valueCol]);
      if (!isFinite(y) || !isFinite(v)) continue;
      if (!best || y > best.year) best = { year: y, value: v };
    }
    if (!best) throw new Error("OWID World parse failed");

    return {
      year: best.year,
      dailyValue: best.value
    };
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWorldPppBenchmarksYearly(fallbackYearly = { median: null, mean: null }) {
  // Use OWID Grapher CSV "tab=chart" endpoints (smaller than full downloads in many cases).
  // Note: OWID uses international-$ in 2021 prices (PPP).
  const medianUrl = "https://ourworldindata.org/grapher/daily-median-income.csv?tab=chart";
  const meanUrl = "https://ourworldindata.org/grapher/daily-mean-income.csv?tab=chart";

  const daysPerYear = 365;

  try {
    const [median, mean] = await Promise.all([
      fetchOwidWorldLatestDaily(medianUrl),
      fetchOwidWorldLatestDaily(meanUrl)
    ]);

    return {
      source: "OWID (World Bank PIP)",
      pppBase: "international-$ (2021 prices)",
      year: Math.min(median.year, mean.year), // conservative
      medianYearlyPPP: median.dailyValue * daysPerYear,
      averageYearlyPPP: mean.dailyValue * daysPerYear,
      note: "Derived from daily series × 365."
    };
  } catch {
    // fallback to whatever is embedded in data.js today
    return {
      source: "fallback (embedded placeholders)",
      pppBase: "international-$ (2021 prices) (intended)",
      year: null,
      medianYearlyPPP: fallbackYearly.median,
      averageYearlyPPP: fallbackYearly.mean,
      note: "Could not fetch OWID; using embedded values."
    };
  }
}

// ---------------------------
// Bucket logic (top / middle / bottom)
// ---------------------------

function resolveBucket(ratio, model) {
  const { buckets } = model;
  if (ratio >= 1 / buckets.top) return "top group";
  if (ratio >= 1 / buckets.middle[1]) return "middle group";
  return "bottom group";
}

// ---------------------------
// Percentile logic (WORLD) - still heuristic
// ---------------------------

function estimatePercentile(userValue, median, average) {
  if (userValue <= median) return round((userValue / median) * 50);

  const upperSpan = average - median;
  if (upperSpan <= 0) return 50;

  const relative = (userValue - median) / upperSpan;
  return Math.min(99, round(50 + relative * 30));
}

// ---------------------------
// Region Comparisons
// ---------------------------

function compareTurkey(userYearlyTRY, regionData) {
  const avg = regionData.income.averageYearlyNet * (regionData.inflation?.manualMultiplier ?? 1.0);
  const ratio = userYearlyTRY / avg;

  const bucket = resolveBucket(ratio, regionData.comparisonModel);

  return {
    bucket,
    facts: { average: avg, median: null }
  };
}

function compareGermany(userYearlyEUR, regionData) {
  const NET_TO_GROSS_FACTOR = 1.35;
  const approxGross = userYearlyEUR * NET_TO_GROSS_FACTOR;

  const median = regionData.income.medianYearlyGross;
  const average = regionData.income.averageYearlyGross;

  const ratio = approxGross / median;
  const bucket = resolveBucket(ratio, regionData.comparisonModel);

  return {
    bucket,
    facts: { median, average, approxGross }
  };
}

function compareWorld(userYearlyUsdPPP, regionData) {
  const median = regionData.income.medianYearlyPPP;
  const average = regionData.income.averageYearlyPPP;

  const percentile = estimatePercentile(userYearlyUsdPPP, median, average);

  return { percentile, facts: { median, average } };
}

// ---------------------------
// Public API
// ---------------------------

window.ZPAYCHECK_LOGIC = {
  monthlyToYearly,

  // FX
  getMockFxRates,
  fetchFxRates,
  convertCurrency,

  // WORLD PPP fetch
  fetchWorldPppBenchmarksYearly,

  // comparisons
  compareTurkey,
  compareGermany,
  compareWorld
};
