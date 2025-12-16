// File: zpaycheck.logic.js
// Pure calculation & comparison logic for ZPAYCHECK
// No DOM access. No side effects. No storage.

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
// FX (mock for now)
// Real FX fetching will be added later.
// ---------------------------

function getMockFxRates() {
  // Base: EUR
  return {
    base: "EUR",
    timestamp: new Date().toISOString(),
    rates: {
      EUR: 1,
      USD: 1.08,
      TRY: 35
    }
  };
}

function convertCurrency(amount, from, to, fx) {
  if (from === to) return amount;

  // convert from → EUR → to
  const inEur = from === "EUR" ? amount : amount / fx.rates[from];
  return to === "EUR" ? inEur : inEur * fx.rates[to];
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
// Percentile logic (WORLD)
// ---------------------------

function estimatePercentile(userValue, median, average) {
  // Very rough heuristic:
  // median ≈ 50th percentile, average ≈ ~65–70th in skewed distributions
  if (userValue <= median) {
    return round((userValue / median) * 50);
  }

  const upperSpan = average - median;
  if (upperSpan <= 0) return 50;

  const relative = (userValue - median) / upperSpan;
  return Math.min(99, round(50 + relative * 30));
}

// ---------------------------
// Region Comparisons
// ---------------------------

function compareTurkey(userYearlyTRY, regionData) {
  const avg = regionData.income.averageYearlyNet;
  const ratio = userYearlyTRY / avg;

  const bucket = resolveBucket(ratio, regionData.comparisonModel);

  return {
    bucket,
    facts: {
      average: avg,
      median: null
    }
  };
}

function compareGermany(userYearlyEUR, regionData) {
  // crude net → gross uplift for context only
  const NET_TO_GROSS_FACTOR = 1.35;
  const approxGross = userYearlyEUR * NET_TO_GROSS_FACTOR;

  const median = regionData.income.medianYearlyGross;
  const average = regionData.income.averageYearlyGross;

  const ratio = approxGross / median;
  const bucket = resolveBucket(ratio, regionData.comparisonModel);

  return {
    bucket,
    facts: {
      median,
      average,
      approxGross
    }
  };
}

function compareWorld(userYearlyUsdPPP, regionData) {
  const median = regionData.income.medianYearlyPPP;
  const average = regionData.income.averageYearlyPPP;

  const percentile = estimatePercentile(
    userYearlyUsdPPP,
    median,
    average
  );

  return {
    percentile,
    facts: {
      median,
      average
    }
  };
}

// ---------------------------
// Public API (used by app.js)
// ---------------------------

window.ZPAYCHECK_LOGIC = {
  monthlyToYearly,
  getMockFxRates,
  convertCurrency,
  compareTurkey,
  compareGermany,
  compareWorld
};
