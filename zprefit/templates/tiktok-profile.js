/* templates/tiktok-profile.js
   TikTok Profile Photo template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "tiktok.profile",
    platform: "TikTok",
    label: "TikTok — Profile Photo",
    description: "Circular profile photo shown small in feeds and comments",
    aspectRatio: 1 / 1,
    recommended: { w: 720, h: 720 },
    notes:
      "TikTok profile photos are displayed as circles and often very small. Keep faces/logos centered and avoid thin text.",
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
