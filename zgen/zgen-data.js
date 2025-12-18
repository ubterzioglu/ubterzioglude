/* =========================================================
   ZGEN – zgen-data.js
   Path: /zgen/zgen-data.js

   AVATARS (male + female)
   Place PNGs under: /img/

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

/* -----------------------
   PLACEHOLDER HELPERS
------------------------ */
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

/* -----------------------
   MAIN DATA
------------------------ */
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

  /* ===== Profiles: traits + vibes (used in Card 2) ===== */
  profiles: {
    silent: {
      traits: [
        "Duty-first, feelings-later",
        "Polite disagreement as a sport",
        "Trust earned slowly, kept forever",
        "Prefers proven tools over shiny apps",
        "Reads the room before speaking",
        "Thrifty by reflex, not trend",
        "Loyal to institutions, cautious with change",
        "Understates success, overdelivers quietly",
        "Respects expertise and seniority",
        "Communicates with calm precision"
      ],
      vibes: [
        "Quiet competence, loud results",
        "Respect the process",
        "Less talk, more done",
        "Don’t waste; make it last",
        "Steady hands, steady plans"
      ]
    },

    boomer: {
      traits: [
        "Optimistic about hard work paying off",
        "Meetings as a legitimate productivity unit",
        "Phone calls beat long message threads",
        "Network-minded and relationship-driven",
        "Values titles, milestones, and clear ladders",
        "Confident presenter, comfortable leading the room",
        "Prefers big-picture narratives over micro-updates",
        "Expects reliability and punctuality",
        "Likes consensus, but wants closure",
        "Practical problem-solver with a can-do reflex"
      ],
      vibes: [
        "Let’s align and move",
        "Call me; we’ll sort it",
        "Strong handshake energy",
        "Make it official",
        "Work hard, then relax"
      ]
    },

    genx: {
      traits: [
        "Skeptical, but not cynical—usually",
        "Independent problem-solver, low-maintenance teammate",
        "Prefers autonomy over applause",
        "Allergic to corporate fluff",
        "Direct communicator with dry humor",
        "Values competence more than enthusiasm",
        "Efficient multitasker from pre-tab chaos era",
        "Trusts actions, questions promises",
        "Adapts fast, complains quietly",
        "Likes clear goals and minimal oversight"
      ],
      vibes: [
        "Show me the point",
        "Do it right, not loud",
        "I’ve seen worse",
        "Keep it simple, please",
        "Results over drama"
      ]
    },

    geny: {
      traits: [
        "Purpose-driven, but deadline-aware",
        "Feedback-friendly and growth-oriented",
        "Collaborative by default, hates silos",
        "Comfortable with change, expects context",
        "Prefers async clarity over surprise meetings",
        "Values flexibility as a productivity tool",
        "Asks “why” before “how”",
        "Balances ambition with burnout detection",
        "Wants managers who coach, not command",
        "Turns tools into systems and workflows"
      ],
      vibes: [
        "Explain the why",
        "Let’s improve the process",
        "Sync quickly, then ship",
        "Flexible, not flaky",
        "Meaning plus momentum"
      ]
    },

    genz: {
      traits: [
        "Fast scanner of information, low tolerance for fluff",
        "Prefers short messages and clear asks",
        "Comfortable challenging ideas early",
        "Values authenticity over formality",
        "Learns by tutorials, experiments, and iteration",
        "Expects tools to be intuitive and immediate",
        "Strong boundary setting around time and energy",
        "Socially aware, risk-aware, brand-aware",
        "Thrives with transparency and quick feedback loops",
        "Turns side projects into portfolios"
      ],
      vibes: [
        "Say it in one line",
        "Show receipts, not vibes",
        "Ship, learn, repeat",
        "Keep it real",
        "Respect the boundary"
      ]
    },

    alpha: {
      traits: [
        "Touch-first intuition; manuals feel optional",
        "AI-assisted thinking is normal, not fancy",
        "Expects personalization everywhere",
        "Learns visually and interactively",
        "Short attention span, sharp pattern spotting",
        "Gamifies progress without being asked",
        "Naturally multi-modal: voice, video, text",
        "Comfortable co-creating rather than consuming",
        "Impatient with slow interfaces and slow decisions",
        "Needs guardrails because speed outruns judgment"
      ],
      vibes: [
        "Instant, interactive, intuitive",
        "Make it playable",
        "Swipe to solve",
        "Co-create the answer",
        "If it’s boring, it’s broken"
      ]
    },

    beta: {
      traits: [
        "Born into ambient AI and smart environments",
        "Defaults to delegation: “system, handle it”",
        "Expects seamless identity and privacy controls",
        "Comfortable with synthetic media as everyday content",
        "High standards for UX and low patience for friction",
        "Uses agents and automation like utilities",
        "Values verification as much as creativity",
        "Thinks in prompts, workflows, and orchestration",
        "Collaboration includes humans and tools equally",
        "Treats learning as continuous, personalized streaming"
      ],
      vibes: [
        "Agent-first lifestyle",
        "Friction is a bug",
        "Verify, then vibe",
        "Orchestrate everything",
        "Personalized by default"
      ]
    }
  },

  /* ===== Compatibility (directional) ===== */
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
