/* =========================================================
   ZGEN – zgen-data.js
   Paste-only data file (keeps HTML clean)
   Path: /zgen/zgen-data.js

   Directional compatibility:
   compat[youGenId][otherGenId] => { dos: [5], donts: [5], joke: "..." }

   NOTE: This file contains ONLY data.
   ========================================================= */

const ZGEN_DATA = {
  generations: [
    { id: "silent", name: "Silent Generation", range: [1928, 1945], avatar: "🕰️" },
    { id: "boomer", name: "Baby Boomers", range: [1946, 1964], avatar: "📞" },
    { id: "genx",   name: "Gen X", range: [1965, 1980], avatar: "🧩" },
    { id: "geny",   name: "Millennials (Gen Y)", range: [1981, 1996], avatar: "☕" },
    { id: "genz",   name: "Gen Z", range: [1997, 2012], avatar: "⚡" },
    { id: "alpha",  name: "Gen Alpha", range: [2013, 2025], avatar: "🤖" },
    { id: "beta",   name: "Gen Beta", range: [2026, 2100], avatar: "🧠" }
  ],

  /* =========================================================
     42 directional scenarios (7 * 6)
     Fill ONLY what you want; missing entries fallback to placeholders.
     ========================================================= */
  compat: {
    silent: {
      boomer: { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      genx:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      geny:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      genz:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      alpha:  { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      beta:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() }
    },

    boomer: {
      silent: { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      genx:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      geny:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      genz:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      alpha:  { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      beta:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() }
    },

    genx: {
      silent: { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      boomer: { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      geny:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      genz:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      alpha:  { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      beta:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() }
    },

    geny: {
      silent: { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      boomer: { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      genx:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },

      /* Example filled entry (directional): Gen Y -> Gen Z */
      genz: {
        dos: [
          "Do keep it short and clear",
          "Do explain the why",
          "Do give autonomy",
          "Do respect boundaries",
          "Do adapt to new tools"
        ],
        donts: [
          "Don’t write long emails",
          "Don’t micromanage",
          "Don’t dismiss ideas quickly",
          "Don’t force old habits",
          "Don’t expect blind loyalty"
        ],
        joke: "If your message needs scrolling, Gen Z already moved on."
      },

      alpha:  { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      beta:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() }
    },

    genz: {
      silent: { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      boomer: { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      genx:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      geny:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      alpha:  { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      beta:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() }
    },

    alpha: {
      silent: { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      boomer: { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      genx:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      geny:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      genz:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      beta:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() }
    },

    beta: {
      silent: { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      boomer: { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      genx:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      geny:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      genz:   { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      alpha:  { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() }
    }
  }
};

/* =========================================================
   PLACEHOLDER HELPERS (to keep compat skeleton compact)
   You can delete these helpers later and paste real arrays.
   ========================================================= */
function placeholderDos() {
  return [
    "Do #1 (placeholder)",
    "Do #2 (placeholder)",
    "Do #3 (placeholder)",
    "Do #4 (placeholder)",
    "Do #5 (placeholder)"
  ];
}

function placeholderDonts() {
  return [
    "Don’t #1 (placeholder)",
    "Don’t #2 (placeholder)",
    "Don’t #3 (placeholder)",
    "Don’t #4 (placeholder)",
    "Don’t #5 (placeholder)"
  ];
}

function placeholderJoke() {
  return "Placeholder joke (optional).";
}
