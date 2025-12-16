/* templates/x-header.js
   X (Twitter) Header / Banner template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "x.header",
    platform: "X",
    label: "X — Header (Banner)",
    description: "Profile header banner",
    aspectRatio: 3 / 1,
    recommended: { w: 1500, h: 500 },
    notes:
      "X headers are cropped differently across devices and UI states. Keep important content centered and away from edges.",
    controls: {
      zoom: true,
      fitMode: true,
      safeZone: true,
      mobileEmphasis: true
    },
    defaults: {
      mode: "fill",
      zoom: 1.0,
      showSafe: true,
      emphasizeMobile: false
    },
    safeZones: {
      desktop: { x: 0.12, y: 0.20, w: 0.76, h: 0.60 },
      mobile:  { x: 0.18, y: 0.22, w: 0.64, h: 0.56 }
    },
    preview: {
      type: "banner",
      showDesktop: true,
      showMobile: true
    }
  });
})();
