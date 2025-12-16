/* templates/discord-server-banner.js
   Discord Server Banner template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "discord.server.banner",
    platform: "Discord",
    label: "Discord — Server Banner",
    description: "Server banner shown on server profile (Nitro boosted servers)",
    aspectRatio: 16 / 9,
    recommended: { w: 960, h: 540 },
    notes:
      "Discord server banners are displayed in different sizes across desktop and mobile. Keep logos and text centered and away from edges.",
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
