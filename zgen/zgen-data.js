/* =========================================================
   ZGEN – zgen-data.js
   Path: /zgen/zgen-data.js

   CHANGE (avatars):
   - Use image placeholders instead of emoji so Canva visuals can be real.
   - Put your generated images under: /img/
     Example filenames:
       gen_silent_image.png
       gen_boomer_image.png
       gen_genx_image.png
       gen_geny_image.png
       gen_genz_image.png
       gen_alpha_image.png
       gen_beta_image.png

   Directional compatibility:
   compat[youGenId][otherGenId] => { dos: [5], donts: [5], joke: "..." }
   ========================================================= */

const ZGEN_DATA = {
  generations: [
    {
      id: "silent",
      name: "Silent Generation",
      range: [1928, 1945],
      avatarImg: "/img/gen_silent_image.png",
      avatarAlt: "Silent Generation avatar"
    },
    {
      id: "boomer",
      name: "Baby Boomers",
      range: [1946, 1964],
      avatarImg: "/img/gen_boomer_image.png",
      avatarAlt: "Baby Boomers avatar"
    },
    {
      id: "genx",
      name: "Gen X",
      range: [1965, 1980],
      avatarImg: "/img/gen_genx_image.png",
      avatarAlt: "Gen X avatar"
    },
    {
      id: "geny",
      name: "Millennials (Gen Y)",
      range: [1981, 1996],
      avatarImg: "/img/gen_geny_image.png",
      avatarAlt: "Millennials avatar"
    },
    {
      id: "genz",
      name: "Gen Z",
      range: [1997, 2012],
      avatarImg: "/img/gen_genz_image.png",
      avatarAlt: "Gen Z avatar"
    },
    {
      id: "alpha",
      name: "Gen Alpha",
      range: [2013, 2025],
      avatarImg: "/img/gen_alpha_image.png",
      avatarAlt: "Gen Alpha avatar"
    },
    {
      id: "beta",
      name: "Gen Beta",
      range: [2026, 2100],
      avatarImg: "/img/gen_beta_image.png",
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

function placeholderDos() {
  return ["Do #1 (placeholder)","Do #2 (placeholder)","Do #3 (placeholder)","Do #4 (placeholder)","Do #5 (placeholder)"];
}
function placeholderDonts() {
  return ["Don’t #1 (placeholder)","Don’t #2 (placeholder)","Don’t #3 (placeholder)","Don’t #4 (placeholder)","Don’t #5 (placeholder)"];
}
function placeholderJoke() {
  return "Placeholder joke (optional).";
}
