/* =========================================================
  FILE: /zpaycheck/zpaycheck-data.js
  PURPOSE:
  - Keep all numbers + source text here (easy to swap later)
  - V1 = placeholder values (replace with StepStone + TÜİK + World)
========================================================= */

window.ZPAYCHECK_DATA = {
  meta: {
    updated: "2025-12-16",
    note:
      "V1 uses placeholder values. Replace medians/averages/percentiles with real data once finalized."
  },

  sources: {
    DE: [
      "Germany: StepStone Gehaltsreport (median/average) — replace numbers with exact report figures.",
      "Optional: Statistisches Bundesamt / Destatis for official wage stats if needed."
    ],
    TR: [
      "Türkiye: TÜİK / TurkStat earnings statistics — replace numbers with official series you select.",
      "Note: later add inflation-adjusted view (CPI) for readability."
    ],
    WORLD: [
      "World: World Bank PIP via Our World in Data (median/mean income or consumption per day, PPP)."
    ]
  },

  // Percentiles are simple bands for UI.
  // Format: yearly amounts in native currency for DE/TR, and PPP-year for WORLD.
  regions: {
    DE: {
      label: "Germany",
      currency: "EUR",
      unit: "gross yearly",
      median: 52000,   // TODO replace with StepStone value
      average: 60000,  // TODO replace with StepStone value
      // p10, p25, p50, p75, p90
      percentiles: { p10: 32000, p25: 42000, p50: 52000, p75: 70000, p90: 95000 }
    },

    TR: {
      label: "Türkiye",
      currency: "TRY",
      unit: "gross yearly",
      median: 480000,   // TODO replace (and decide yearly vs monthly)
      average: 600000,  // TODO replace
      percentiles: { p10: 240000, p25: 360000, p50: 480000, p75: 720000, p90: 1100000 }
    },

    WORLD: {
      label: "World",
      currency: "PPP",
      unit: "PPP yearly per person",
      // For World: you’ll compute these from OWID/World Bank PIP (daily * 365).
      median: 0,   // TODO replace
      average: 0,  // TODO replace
      percentiles: { p10: 0, p25: 0, p50: 0, p75: 0, p90: 0 }
    }
  }
};
