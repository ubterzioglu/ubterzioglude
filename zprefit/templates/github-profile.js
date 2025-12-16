/* templates/github-profile.js
   GitHub Profile Avatar template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "github.profile",
    platform: "GitHub",
    label: "GitHub — Profile Avatar",
    description: "Square avatar, often displayed small and circular in UI",
    aspectRatio: 1 / 1,
    recommended: { w: 500, h: 500 },
    notes:
      "GitHub avatars are square uploads but often displayed as circles. Keep faces/logos centered and avoid text near edges.",
    controls: {
      zoom: true,
      fitMode: true,
      safeZone: true,
      mobileEmphasis: false
    },
    defaults: {
      mode: "fill",
      zoom: 1.0,
      showSafe: true,
      emphasizeMobile: false
    },
    safeZones: {
      desktop: { x: 0.20, y: 0.20, w: 0.60, h: 0.60 }
    },
    preview: {
      type: "profile-circle"
    }
  });
})();
