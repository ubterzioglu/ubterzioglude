/* templates/youtube-channel-art.js
   YouTube Channel Art (Banner) template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "youtube.channel.art",
    platform: "YouTube",
    label: "YouTube — Channel Art",
    description: "Channel banner with multi-device safe zones (TV/Desktop/Mobile)",
    aspectRatio: 2560 / 1440, // ~16:9
    recommended: { w: 2560, h: 1440 },
    notes:
      "YouTube channel art is shown differently on TV, desktop, and mobile. Keep all critical content inside the center safe zone.",
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
      // Center safe area (~1546x423) scaled to 2560x1440
      desktop: { x: 0.198, y: 0.353, w: 0.604, h: 0.294 },
      // Mobile is similar to desktop center, slightly tighter horizontally
      mobile:  { x: 0.23,  y: 0.36,  w: 0.54,  h: 0.28 }
    },
    preview: {
      type: "banner",
      showDesktop: true,
      showMobile: true
    }
  });
})();
