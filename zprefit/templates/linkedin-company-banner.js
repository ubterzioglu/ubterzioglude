/* templates/linkedin-company-banner.js
   LinkedIn Company Page Banner template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "linkedin.company.banner",
    platform: "LinkedIn",
    label: "LinkedIn — Company Page Banner",
    description: "Company page header banner",
    aspectRatio: 1128 / 191, // ~5.9:1
    recommended: { w: 1128, h: 191 },
    notes:
      "Company page banners are very wide and short. Avoid text near edges and keep logos centered vertically.",
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
      desktop: { x: 0.08, y: 0.18, w: 0.84, h: 0.64 }
    },
    preview: {
      type: "banner",
      showDesktop: true,
      showMobile: false
    }
  });
})();
