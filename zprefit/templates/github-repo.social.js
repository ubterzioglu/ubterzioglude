/* templates/github-repo-social.js
   GitHub Repository Social Preview (OpenGraph image) for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "github.repo.social",
    platform: "GitHub",
    label: "GitHub — Repo Social Preview",
    description: "OpenGraph image shown when sharing a repository link",
    aspectRatio: 1280 / 640, // 2:1
    recommended: { w: 1280, h: 640 },
    notes:
      "GitHub social preview images are shown in link previews across platforms. Keep titles centered and avoid edges.",
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
      desktop: { x: 0.10, y: 0.20, w: 0.80, h: 0.60 }
    },
    preview: {
      type: "banner",
      showDesktop: true,
      showMobile: false
    }
  });
})();
