/* templates/reddit-profile.js
   Reddit Profile Avatar template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "reddit.profile",
    platform: "Reddit",
    label: "Reddit — Profile Avatar",
    description: "Square avatar shown small; often masked circularly in UI",
    aspectRatio: 1 / 1,
    recommended: { w: 512, h: 512 },
    notes:
      "Reddit avatars are usually displayed small and sometimes circular. Keep faces/logos centered and avoid thin text.",
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
