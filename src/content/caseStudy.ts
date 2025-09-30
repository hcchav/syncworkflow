export const CASE_STUDY = {
  badge: "CASE STUDY",
  headline: "How SuperZoo Exhibitors Turned Booth Visitors into 3X More Qualified Leads",
  subheadline: "A proven spin-to-win workflow that drove $2 cost per qualified lead — now adapted for boat shows.",
  videoSrc: "/videos/customer_prize_wheel_vertical.mp4",
  stats: [
    { value: "3X", label: "More qualified leads", comparison: "vs traditional booth tactics" },
    { value: "87%", label: "Form completion rate", comparison: "vs 23% industry average" },
    { value: "$2", label: "Avg. cost per qualified lead", comparison: "vs $47 industry standard" },
  ],
  quotes: [
    {
      quote: "It was such a fun booth! I loved spinning the wheel and getting to celebrate!",
      author: "@thesaltysheps",
      role: "Verified Attendee",
      avatarUrl: "/images/attendees/sheps.jpg",
      verified: true
    },
    {
      quote: "Our booth stayed busy all day. The lead quality surprised us — actual buyers, not swag hunters.",
      author: "Marketing Manager",
      role: "Exhibitor",
      avatarUrl: "/images/attendees/exhibitor1.jpg",
      verified: true
    }
  ],
  socialProof: [
    {
      network: "instagram",
      handle: "@bark.with.it",
      content: "Calling all pet industry heroes! Scan the QR, fill the form, spin the wheel — win goodies!",
      timestamp: "Live from SuperZoo"
    }
  ],
  cta: {
    text: "Get Results Like This at Your Boat Show",
    subtext: "We'll set up the sign, validation, and prize wheel. You only pay $2 per qualified lead."
  },
  footnote: "Tested at SuperZoo 2024 (pet industry). Results depend on traffic and prize setup.",
  bridgeNote: "Battle-tested at SuperZoo (pet industry). We now apply the same playbook to boat shows so your booth converts casual visitors into high-intent prospects."
};

// JSON-LD Schema for SEO
export const CASE_STUDY_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "SuperZoo Case Study: 3X More Qualified Leads at $2 CPL",
  "about": "Interactive booth lead gen using spin-to-win with validation",
  "industry": "Trade Shows",
  "isBasedOn": "Pet industry activation",
  "audience": "Boat show exhibitors",
  "author": { 
    "@type": "Organization", 
    "name": "SyncWorkflow" 
  }
};
