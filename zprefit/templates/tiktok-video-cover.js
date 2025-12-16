/* templates/tiktok-video-cover.js
   TikTok Video Cover / Thumbnail template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "tiktok.video.cover",
    platform: "TikTok",
    label: "TikTok — Video Cover",
    description: "Vertical video cover (important content can be cropped in grid view)",
    aspectRatio: 9 / 16,
    recommended: { w: 1080, h: 1920 },
    notes:
      "TikTok covers are shown full-screen in playback but heavily cropped in profile grids. Keep key text and faces centered vertically.",
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
      // Central vertical safe area (approx grid-safe)
      desktop: { x: 0.10, y: 0.25, w: 0.80, h: 0.50 },
      mobile:  { x: 0.15, y: 0.28, w: 0.70, h: 0.44 }
    },
    preview: {
      type: "banner",
      showDesktop: true,
      showMobile: true
    }
  });
})();
