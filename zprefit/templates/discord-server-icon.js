/* templates/discord-server-icon.js
   Discord Server Icon template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "discord.server.icon",
    platform: "Discord",
    label: "Discord — Server Icon",
    description: "Square upload, displayed as a circle in most UI contexts",
    aspectRatio: 1 / 1,
    recommended: { w: 512, h: 512 },
    notes:
      "Discord server icons are uploaded as squares but rendered circular. Keep logos centered and avoid thin text near edges.",
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
      desktop: { x: 0.18, y: 0.18, w: 0.64, h: 0.64 }
    },
    preview: {
      type: "profile-circle"
    }
  });
})();
