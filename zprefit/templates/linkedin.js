/* templates/linkedin.js
   LinkedIn templates for ZPREFIT
   (registry-only file; no DOM access here)
*/

(function () {
  // Ensure global registry exists
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  // ---- LinkedIn: Banner (Background Photo) ----
  window.ZPREFIT_TEMPLATES.push({
    id: "linkedin.banner",
    platform: "LinkedIn",
    label: "LinkedIn — Banner",
    description: "Personal profile background image",
    aspectRatio: 4 / 1,
    recommended: { w: 1584, h: 396 },
    notes:
      "This is an approximate preview. LinkedIn may change UI and crop rules. Keep important content centered and within the safe zone.",
    controls: {
      zoom: true,
      fitMode: true,
      safeZone: true,
      mobileEmphasis: true
    },
    defaults: {
      mode: "fill",     // fill (cover) | fit (contain)
      zoom: 1.0,
      showSafe: true,
      emphasizeMobile: false
    },
    safeZones: {
      desktop: { x: 0.10, y: 0.18, w: 0.80, h: 0.64 },
      mobile:  { x: 0.17, y: 0.18, w: 0.66, h: 0.64 }
    },
    preview: {
      type: "banner",  // used by app.js renderer
      showDesktop: true,
      showMobile: true
    }
  });

  // Future additions go here:
  // - linkedin.profilePhoto
  // - linkedin.companyBanner
})();
