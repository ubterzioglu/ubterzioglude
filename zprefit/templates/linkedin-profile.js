/* templates/linkedin-profile.js
   LinkedIn Profile Photo template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "linkedin.profile",
    platform: "LinkedIn",
    label: "LinkedIn — Profile Photo",
    description: "Circular profile photo preview",
    aspectRatio: 1 / 1,
    recommended: { w: 800, h: 800 },
    notes:
      "LinkedIn profile photos are displayed as a circle. Keep faces centered and avoid text near edges.",
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
      desktop: { x: 0.15, y: 0.15, w: 0.70, h: 0.70 }
    },
    preview: {
      type: "profile-circle",
      size: 180
    }
  });
})();
