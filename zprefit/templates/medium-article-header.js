/* templates/medium-article-header.js
   Medium Article Header / Cover Image template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "medium.article.header",
    platform: "Medium",
    label: "Medium — Article Header",
    description: "Article cover image shown at the top of Medium stories",
    aspectRatio: 16 / 9,
    recommended: { w: 1400, h: 788 },
    notes:
      "Medium article headers are responsive and can be cropped on smaller screens. Keep titles and focal elements centered.",
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
      mobile:  { x: 0.18, y: 0.24, w: 0.64, h: 0.52 }
    },
    preview: {
      type: "banner",
      showDesktop: true,
      showMobile: true
    }
  });
})();
