/* templates/medium-profile.js
   Medium Profile Photo template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "medium.profile",
    platform: "Medium",
    label: "Medium — Profile Photo",
    description: "Circular profile photo used on articles and author pages",
    aspectRatio: 1 / 1,
    recommended: { w: 600, h: 600 },
    notes:
      "Medium profile photos are displayed as circles and often quite small next to articles. Keep faces/logos centered and avoid fine details.",
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
