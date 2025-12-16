/* templates/instagram-banner.js
   Instagram Profile Header / Highlight-style Banner template for ZPREFIT
   (Instagram doesn’t have a true profile banner, this is a practical header-style preview)
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "instagram.header",
    platform: "Instagram",
    label: "Instagram — Profile Header (Visual)",
    description: "Wide visual used behind bio/highlights (conceptual preview)",
    aspectRatio: 3 / 1,
    recommended: { w: 1500, h: 500 },
    notes:
      "Instagram does not officially support profile banners. This preview helps you test wide visuals used behind highlights, pinned content, or external profile tools.",
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
      emphasizeMobile: true
    },
    safeZones: {
      desktop: { x: 0.12, y: 0.22, w: 0.76, h: 0.56 },
      mobile:  { x: 0.18, y: 0.25, w: 0.64, h: 0.50 }
    },
    preview: {
      type: "banner",
      showDesktop: true,
      showMobile: true
    }
  });
})();
