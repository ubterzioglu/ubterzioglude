/* templates/twitch-profile-banner.js
   Twitch Profile Banner template for ZPREFIT
*/

(function () {
  window.ZPREFIT_TEMPLATES = window.ZPREFIT_TEMPLATES || [];

  window.ZPREFIT_TEMPLATES.push({
    id: "twitch.profile.banner",
    platform: "Twitch",
    label: "Twitch — Profile Banner",
    description: "Channel profile banner (wide, can crop on different screens)",
    aspectRatio: 1200 / 480, // 2.5:1
    recommended: { w: 1200, h: 480 },
    notes:
      "Twitch banners are displayed in multiple layouts and can crop on narrower screens. Keep logos and text centered and away from edges.",
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
      desktop: { x: 0.10, y: 0.20, w: 0.80, h: 0.60 },
      mobile:  { x: 0.16, y: 0.24, w: 0.68, h: 0.52 }
    },
    preview: {
      type: "banner",
      showDesktop: true,
      showMobile: true
    }
  });
})();
