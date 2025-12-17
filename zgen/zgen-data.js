/* =========================================================
   ZGEN – zgen-data.js
   Path: /zgen/zgen-data.js

   AVATARS (male + female)
   You will place PNGs under: /img/

   Required filenames:
     /img/gen_silent_m.png
     /img/gen_silent_f.png
     /img/gen_boomer_m.png
     /img/gen_boomer_f.png
     /img/gen_genx_m.png
     /img/gen_genx_f.png
     /img/gen_geny_m.png
     /img/gen_geny_f.png
     /img/gen_genz_m.png
     /img/gen_genz_f.png
     /img/gen_alpha_m.png
     /img/gen_alpha_f.png
     /img/gen_beta_m.png
     /img/gen_beta_f.png

   Optional fallbacks:
     /img/gen_placeholder_m.png
     /img/gen_placeholder_f.png

   Compatibility is DIRECTIONAL:
   compat[youGenId][otherGenId] => { dos: [5], donts: [5], joke: "..." }
   ========================================================= */

const ZGEN_DATA = {
  generations: [
    {
      id: "silent",
      name: "Silent Generation",
      range: [1928, 1945],
      avatars: { m: "/img/gen_silent_m.png", f: "/img/gen_silent_f.png" },
      avatarAlt: "Silent Generation avatar"
    },
    {
      id: "boomer",
      name: "Baby Boomers",
      range: [1946, 1964],
      avatars: { m: "/img/gen_boomer_m.png", f: "/img/gen_boomer_f.png" },
      avatarAlt: "Baby Boomers avatar"
    },
    {
      id: "genx",
      name: "Gen X",
      range: [1965, 1980],
      avatars: { m: "/img/gen_genx_m.png", f: "/img/gen_genx_f.png" },
      avatarAlt: "Gen X avatar"
    },
    {
      id: "geny",
      name: "Millennials (Gen Y)",
      range: [1981, 1996],
      avatars: { m: "/img/gen_geny_m.png", f: "/img/gen_geny_f.png" },
      avatarAlt: "Millennials avatar"
    },
    {
      id: "genz",
      name: "Gen Z",
      range: [1997, 2012],
      avatars: { m: "/img/gen_genz_m.png", f: "/img/gen_genz_f.png" },
      avatarAlt: "Gen Z avatar"
    },
    {
      id: "alpha",
      name: "Gen Alpha",
      range: [2013, 2025],
      avatars: { m: "/img/gen_alpha_m.png", f: "/img/gen_alpha_f.png" },
      avatarAlt: "Gen Alpha avatar"
    },
    {
      id: "beta",
      name: "Gen Beta",
      range: [2026, 2100],
      avatars: { m: "/img/gen_beta_m.png", f: "/img/gen_beta_f.png" },
      avatarAlt: "Gen Beta avatar"
    }
  ],

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
      alpha: { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() },
      beta:  { dos: placeholderDos(), donts: placeholderDonts(), joke: placeholderJoke() }
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
