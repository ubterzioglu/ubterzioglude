/* templates/reddit-banner.js
   Reddit Profile Banner template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "reddit.banner",
    platform: "Reddit",
    label: "Reddit — Profile Banner",
    description: "Profile banner/header shown above posts",
    aspectRatio: 10 / 3, // common Reddit profile banner ratio
    recommended: { w: 1920, h: 576 },
    notes:
      "Reddit profile banners are wide and can be cropped differently across devices. Keep important content centered and avoid edges.",
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
      desktop: { x: 0.10, y: 0.20, w: 0.80, h: 0.60 },
      mobile:  { x: 0.15, y: 0.22, w: 0.70, h: 0.56 }
    },
    preview: {
      type: "banner",
      showDesktop: true,
      showMobile: true
    }
  });
})();
