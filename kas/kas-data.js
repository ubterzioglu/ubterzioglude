/* =====================================================
   KasGuide — kas-data.js
   Content only (no UI logic)
   ===================================================== */

window.KASGUIDE = {
  meta: {
    name: "KasGuide",
    tagline: "No hype. Just Kaş.",
    subtitle:
      "A small, honest guide to Kaş (Turkey). Built slowly, published when it’s actually useful."
  },

  sections: [
    {
      id: "start",
      title: "Start here",
      colorClass: "card-color-1",
      kicker: "What this is / what this is not",
      bullets: [
        "Not a sponsored list. No paid placements.",
        "Short notes that prevent avoidable mistakes.",
        "If something is ‘pretty but painful’, it will be written as-is.",
        "This page is still being built — it is intentionally not indexed yet."
      ],
      notes: [
        {
          title: "How to use this",
          text: "Skim the section headers, then open only what matches your trip style: calm coves, food, or driving realities."
        }
      ]
    },

    {
      id: "coves",
      title: "Coves & beaches",
      colorClass: "card-color-2",
      kicker: "Sea time, minus surprises",
      bullets: [
        "Quick reality checks (crowds, shade, stairs, access).",
        "Where you need cash, water shoes, or a plan B.",
        "What’s great in the morning vs. late afternoon."
      ],
      notes: [
        {
          title: "Coming soon",
          text: "Limanağzı, Kaputaş, Akçagerme, and ‘quiet cove’ heuristics."
        }
      ]
    },

    {
      id: "food",
      title: "Food & coffee",
      colorClass: "card-color-3",
      kicker: "Worth it vs. pure view tax",
      bullets: [
        "How to spot ‘view tax’ pricing fast.",
        "What to pick when the menu is 8 pages long.",
        "Simple rules for choosing places in Kaş center."
      ],
      notes: [
        {
          title: "Coming soon",
          text: "Short lists: one-liners, not essays. ‘Go / maybe / skip’ style."
        }
      ]
    },

    {
      id: "transport",
      title: "Transport & roads",
      colorClass: "card-color-4",
      kicker: "Reality-based routing",
      bullets: [
        "Parking and ‘walkability’ reality checks.",
        "When a short distance becomes a long effort.",
        "Boat vs. car: when each one makes sense."
      ],
      notes: [
        {
          title: "Coming soon",
          text: "Road notes, common bottlenecks, and ‘don’t do this at 19:00’ reminders."
        }
      ]
    },

    {
      id: "tips",
      title: "Tiny tips",
      colorClass: "card-color-5",
      kicker: "Small details that save the day",
      bullets: [
        "Shade matters more than you think.",
        "Wind changes the whole experience.",
        "Always have a ‘second spot’ in mind.",
        "Don’t trust ‘5 minutes away’ without checking elevation."
      ],
      notes: [
        {
          title: "Tone rule",
          text: "No drama, no influencer talk. Just practical notes."
        }
      ]
    },

    {
      id: "status",
      title: "Build status",
      colorClass: "card-color-1",
      kicker: "Not launched yet",
      bullets: [
        "Search engines: blocked (noindex).",
        "Content: in progress.",
        "Design: inherits UBT base; Kas overrides are minimal."
      ],
      pills: [
        { label: "SEO scaffolding: OK", kind: "ok" },
        { label: "Content: WIP", kind: "wip" },
        { label: "Images: WIP", kind: "wip" },
        { label: "Indexing: LOCKED", kind: "lock" }
      ],
      notes: [
        {
          title: "When we flip to LIVE",
          text: "We remove noindex, add a real OG image, and lock the first 5–8 sections with real notes."
        }
      ]
    }
  ]
};
