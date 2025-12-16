// File: zpaycheck.data.js (OPTIONAL UPDATE: clarifies WORLD PPP is fetched at runtime + adds OWID direct chart links)
// Data-only schema for ZPAYCHECK (browser global)
// NOTE: WORLD numeric median/mean are fetched at runtime (logic.js) from OWID/PIP series and overwrite these placeholders in-memory.

window.ZPAYCHECK_DATA = {
  meta: {
    toolName: "ZPAYCHECK",
    lastUpdated: "2025-12-16",
    notes: [
      "All figures are approximate and for context only.",
      "TR: median is not used in this MVP; we compare against an average-based benchmark.",
      "DE: StepStone figures are gross; net→gross is approximated in logic.js for comparison.",
      "WORLD PPP: median/mean benchmarks are fetched at runtime from OWID (World Bank PIP-based) daily series; placeholders below are fallback only."
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
      "https://ourworldindata.org/",
    WORLD_OWID_DAILY_MEDIAN:
      "https://ourworldindata.org/grapher/daily-median-income",
    WORLD_OWID_DAILY_MEAN:
      "https://ourworldindata.org/grapher/daily-mean-income"
  },

  regions: {
    TR: {
      key: "TR",
      label: "Turkey",
      currency: "TRY",
      referenceYear: 2024,

      income: {
        averageYearlyNet: 187728, // TRY
        medianYearlyNet: null
      },

      inflation: {
        manualMultiplier: 1.0,
        note: "Optional manual multiplier for inflation adjustment if you decide to compare older years."
      },

      comparisonModel: {
        type: "average-only",
        buckets: { top: 0.25, middle: [0.25, 0.75], bottom: 0.75 }
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
        medianYearlyGross: 45800, // EUR
        averageYearlyGross: 52300 // EUR
      },

      netGross: {
        note:
          "User input is net income. German benchmarks are gross; the tool uses a simplified net→gross approximation for context only.",
        approximation:
          "This is not a tax-accurate calculation; it’s a rough normalization to compare to gross benchmarks."
      },

      comparisonModel: {
        type: "median-and-average",
        buckets: { top: 0.3, middle: [0.3, 0.7], bottom: 0.7 }
      },

      texts: {
        headlineTemplate: "In Germany, you are roughly in the {bucket}.",
        facts: ["Median income (gross, yearly)", "Average income (gross, yearly)"],
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
        // FALLBACK ONLY — overwritten in-memory at runtime by logic.js → fetchWorldPppBenchmarksYearly()
        medianYearlyPPP: 9200,
        averageYearlyPPP: 18000
      },

      comparisonModel: {
        type: "percentile",
        buckets: { top: 0.1, middle: [0.1, 0.9], bottom: 0.9 }
      },

      texts: {
        headlineTemplate:
          "Globally, you are roughly in the top {percentile}% of income earners.",
        facts: [
          "PPP-adjusted median income (benchmarks fetched at runtime from OWID/PIP)",
          "PPP-adjusted average income (benchmarks fetched at runtime from OWID/PIP)"
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
        { label: "Our World in Data", url: "https://ourworldindata.org/" },
        { label: "OWID — Daily median income (World)", url: "https://ourworldindata.org/grapher/daily-median-income" },
        { label: "OWID — Daily mean income (World)", url: "https://ourworldindata.org/grapher/daily-mean-income" }
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
