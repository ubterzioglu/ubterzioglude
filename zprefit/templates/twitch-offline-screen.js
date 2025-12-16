/* templates/twitch-offline-screen.js
   Twitch Offline Screen template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "twitch.offline.screen",
    platform: "Twitch",
    label: "Twitch — Offline Screen",
    description: "Full-screen image shown when the channel is offline",
    aspectRatio: 16 / 9,
    recommended: { w: 1920, h: 1080 },
    notes:
      "Offline screens are viewed on many devices. Keep key text and logos centered with generous margins.",
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
      desktop: { x: 0.12, y: 0.18, w: 0.76, h: 0.64 },
      mobile:  { x: 0.18, y: 0.22, w: 0.64, h: 0.56 }
    },
    preview: {
      type: "banner",
      showDesktop: true,
      showMobile: true
    }
  });
})();
