// templates/linkedin-banner.js
// LinkedIn — Personal Profile Banner (commonly 1584×396, ~4:1)
// Data-only template: push into window.ZPREFIT_TEMPLATES without overwriting.

window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];
window.ZPREFIT_TEMPLATES.push({
  id: "linkedin-banner",
  label: "LinkedIn — Profile Banner",
  platform: "LinkedIn",
  type: "linkedin.banner",

  // 1584 / 396 = 4.0
  aspectRatio: 4,

  recommended: {
    width: 1584,
    height: 396
  },

  // Safe zones are "practical" guides (not pixel-perfect).
  // Coordinates are normalized: 0..1 relative to the full banner.
  safeZones: [
    {
      id: "safe-main",
      label: "Safe zone (keep text/face here)",
      x: 0.06,
      y: 0.18,
      w: 0.88,
      h: 0.64
    },
    {
      id: "mobile-crop",
      label: "Mobile emphasis (center-weighted)",
      x: 0.12,
      y: 0.18,
      w: 0.76,
      h: 0.64,
      emphasis: "mobile"
    }
  ],

  controls: {
    zoom: true,
    fitmode: true,
    safezone: true,
    drag: true
  },

  defaults: {
    zoom: 100,
    fitMode: "cover",      // cover = "Fill"
    showSafe: true,
    emphasizeMobile: false,
    panX: 0,
    panY: 0
  },

  hint: "Recommended: 1584×396. Keep key content in the safe zone; edges may crop on smaller screens.",
  footnote: "Practical preview. LinkedIn may adjust UI and cropping over time."
});
