// File: zpaycheck.data.js (FULL / UPDATED)
// Data-only schema for ZPAYCHECK
// IMPORTANT: This project uses a browser global (window.ZPAYCHECK_DATA), not ES modules.

window.ZPAYCHECK_DATA = {
  meta: {
    toolName: "ZPAYCHECK",
    lastUpdated: "2025-12-16",
    notes: [
      "All figures are approximate and for context only.",
      "TR: median is not used in this MVP; we compare against an average-based benchmark.",
      "DE: StepStone figures are gross; net→gross is approximated in logic.js for comparison.",
      "WORLD PPP: still placeholder in this MVP (next pass will replace with OWID/PIP numeric series)."
    ]
  },

  sources: {
    TR_TUIK_2024:
      "https://data.tuik.gov.tr/Bulten/Index?p=Gelir-Dagilimi-Istatistikleri-2024-53712",
    DE_STEPSTONE_GEHALT_DE:
      "https://www.stepstone.de/e-recruiting/gehalt-deutschland/",
    WORLD_PIP:
      "https://pip.worldbank.org/",
    WORLD_OWID:
      "https://ourworldindata.org/"
  },

  regions: {
    TR: {
      key: "TR",
      label: "Turkey",
      currency: "TRY",
      referenceYear: 2024,

      income: {
        // TÜİK 2024 bulletin headline-style “per person (equivalised) disposable income” average.
        // We use this as baseline for comparison.
        averageYearlyNet: 187728, // TRY
        medianYearlyNet: null
      },

      inflation: {
        // Keep manual control. Default no uplift.
        manualMultiplier: 1.0,
        note: "Optional manual multiplier for inflation adjustment if you decide to compare older years."
      },

      comparisonModel: {
        // Until we have distribution percentiles, we keep a simple bucket model.
        type: "average-only",
        buckets: {
          // interpreted by resolveBucket() heuristic in logic.js
          top: 0.25,
          middle: [0.25, 0.75],
          bottom: 0.75
        }
      },

      texts: {
        headlineTemplate: "In Turkey, you are roughly in the {bucket}.",
        facts: [
          "Benchmark uses TÜİK: average equivalised disposable income per person (annual)",
          "Median is not used in this MVP for Turkey"
        ],
        explanation: [
          "Benchmark is based on TÜİK income distribution statistics (2024).",
          "We compare your yearly net (converted to TRY) to an average per-person equivalised disposable income figure.",
          "A manual inflation multiplier can be applied later if you want to adjust older benchmarks.",
          "Official statistics can differ by definition (household vs per-person, net vs gross, etc.)."
        ]
      },

      factBlock: {
        averageLabel: "Average yearly income (per person, equivalised)",
        medianLabel: "Median yearly income",
        averageNote: "Average income is pulled upward by high earners.",
        medianNote: "Median is not used here for Turkey in this MVP."
      },

      sources: [
        {
          label: "TÜİK — Gelir Dağılımı İstatistikleri, 2024 (Bulletin 53712)",
          url:
            "https://data.tuik.gov.tr/Bulten/Index?p=Gelir-Dagilimi-Istatistikleri-2024-53712"
        }
      ]
    },

    DE: {
      key: "DE",
      label: "Germany",
      currency: "EUR",
      referenceYear: 2024,

      income: {
        // StepStone Gehaltsreport 2025 (Germany, values shown for 2024)
        medianYearlyGross: 45800, // EUR
        averageYearlyGross: 52300 // EUR
      },

      netGross: {
        note:
          "User input is net income. German benchmarks are gross; the tool uses a simplified net→gross approximation for context only.",
        approximation:
          "This is not a tax-accurate calculation; it’s a rough normalization to compare to gross benchmarks."
      },

      // Optional anchors for a future “percentile-like” messaging in Germany (not used by current logic.js yet)
      percentileAnchorsGrossYearly: {
        note:
          "Optional anchors (gross yearly) for future refinement. Not used in current MVP logic.",
        // Leave nulls if you don’t want to claim exact thresholds yet.
        p90: null,
        p95: null,
        p99: null
      },

      comparisonModel: {
        type: "median-and-average",
        buckets: {
          top: 0.3,
          middle: [0.3, 0.7],
          bottom: 0.7
        }
      },

      texts: {
        headlineTemplate: "In Germany, you are roughly in the {bucket}.",
        facts: [
          "Median income (gross, yearly)",
          "Average income (gross, yearly)"
        ],
        explanation: [
          "Median income represents the typical earner.",
          "Average income is higher due to top earners.",
          "Your net income is converted and approximated to gross for comparison.",
          "This is not a tax-accurate calculation."
        ]
      },

      factBlock: {
        averageLabel: "Average yearly income (gross)",
        medianLabel: "Median yearly income (gross)",
        averageNote: "Average income is influenced by high earners.",
        medianNote: "Median income reflects the typical person."
      },

      sources: [
        {
          label: "StepStone — Gehaltsreport / Gehalt in Deutschland",
          url: "https://www.stepstone.de/e-recruiting/gehalt-deutschland/"
        }
      ]
    },

    WORLD: {
      key: "WORLD",
      label: "World",
      currency: "USD_PPP",
      referenceYear: 2021,

      income: {
        // PLACEHOLDERS (next pass: replace with OWID/PIP PPP series values)
        medianYearlyPPP: 9200,   // USD (PPP) placeholder
        averageYearlyPPP: 18000  // USD (PPP) placeholder
      },

      comparisonModel: {
        type: "percentile",
        buckets: {
          top: 0.1,
          middle: [0.1, 0.9],
          bottom: 0.9
        }
      },

      texts: {
        headlineTemplate:
          "Globally, you are roughly in the top {percentile}% of income earners.",
        facts: [
          "PPP-adjusted median income",
          "PPP-adjusted average income"
        ],
        explanation: [
          "PPP (Purchasing Power Parity) adjusts for cost-of-living differences.",
          "This allows more meaningful global comparison.",
          "Median reflects the typical person worldwide.",
          "Average is higher due to inequality."
        ]
      },

      factBlock: {
        averageLabel: "World average income (PPP)",
        medianLabel: "World median income (PPP)",
        averageNote: "Global average is pulled up by high-income countries.",
        medianNote: "Global median reflects the typical person worldwide."
      },

      sources: [
        { label: "World Bank — PIP", url: "https://pip.worldbank.org/" },
        { label: "Our World in Data", url: "https://ourworldindata.org/" }
      ]
    }
  },

  fx: {
    base: "EUR",
    supported: ["EUR", "USD", "TRY"],
    note: "Exchange rates are fetched dynamically at runtime (logic.js).",
    sources: [
      { label: "ECB (reference rates)", url: "https://www.ecb.europa.eu/stats/eurofxref/" },
      { label: "exchangerate.host (API)", url: "https://exchangerate.host/" }
    ]
  }
};
