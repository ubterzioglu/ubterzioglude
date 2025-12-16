/* templates/twitch-panel-image.js
   Twitch Panel Image template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "twitch.panel.image",
    platform: "Twitch",
    label: "Twitch — Panel Image",
    description: "Image used in channel panels below the stream",
    aspectRatio: 320 / 90, // common panel size
    recommended: { w: 320, h: 90 },
    notes:
      "Twitch panel images are very small and narrow. Avoid detailed graphics and keep text large and centered.",
    controls: {
      zoom: true,
      fitMode: true,
      safeZone: true,
      mobileEmphasis: false
    },
    defaults: {
      mode: "fit",
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
