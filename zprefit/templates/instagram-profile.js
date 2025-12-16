/* templates/instagram-profile.js
   Instagram Profile Photo template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "instagram.profile",
    platform: "Instagram",
    label: "Instagram — Profile Photo",
    description: "Circular profile photo preview (shown small in UI)",
    aspectRatio: 1 / 1,
    recommended: { w: 1080, h: 1080 },
    notes:
      "Instagram profile photos appear as a circle and are often displayed small. Keep faces/logos centered and avoid thin text near edges.",
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
      desktop: { x: 0.18, y: 0.18, w: 0.64, h: 0.64 }
    },
    preview: {
      type: "profile-circle"
    }
  });
})();
