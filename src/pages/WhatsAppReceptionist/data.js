// Data for the WhatsApp Receptionist landing page.
// Kept in its own module so the section components stay focused on layout.

export const PRIMARY_CTA_LABEL = "Book a 15-min demo";
export const SECONDARY_CTA_LABEL = "Watch 90-sec demo";

// Replace these with real URLs / numbers before launch.
export const CALENDLY_URL = "[CALENDLY_URL_PLACEHOLDER]";
export const LOOM_URL = "[LOOM_URL_PLACEHOLDER]";
export const WHATSAPP_DEMO_LINK = "[WHATSAPP_DEMO_LINK_PLACEHOLDER]";
export const WHATSAPP_DEMO_NUMBER = "[WHATSAPP_DEMO_NUMBER]";
// TODO: replace with Bishir's real LinkedIn URL
export const BISHIR_LINKEDIN_URL = "[BISHIR_LINKEDIN_PLACEHOLDER]";

// Directional stats, phrased so they remain true without exact citations.
export const PROBLEM_STATS = [
  {
    value: "After 6 PM",
    label: "is when most new med spa inquiries land",
    detail: "Evenings, weekends, lunch breaks, exactly when your front desk is gone.",
  },
  {
    value: "$300–500",
    label: "average revenue per booked treatment",
    detail: "Every inquiry that waits till morning is roughly a booking that didn't happen.",
  },
  {
    value: "Minutes",
    label: "is how fast a new lead picks a competitor",
    detail: "If your reply lands tomorrow morning, the next spa already booked them.",
  },
];

export const FEATURES = [
  {
    title: "Answers every inquiry instantly",
    body:
      "Trained on your services, prices, hours, and policies. Customers get an accurate, on-brand reply in seconds, at 11 PM on a Sunday or in the middle of a busy Saturday.",
  },
  {
    title: "Books appointments directly",
    body:
      "Integrates with Boulevard, Vagaro, Mindbody, and Calendly. The bot holds the slot, confirms with the client, and writes it straight to your calendar, no double-bookings.",
  },
  {
    title: "Qualifies and escalates",
    body:
      "Handles routine questions on its own. When a conversation needs a human (pricing edge cases, complaints, sensitive consults), it pulls in your team with the full context already gathered.",
  },
];

export const STEPS = [
  {
    title: "15-min discovery call",
    body:
      "We learn your services, hours, booking system, and the questions your front desk hears all day.",
  },
  {
    title: "We build it on your data",
    body:
      "10 days to train the bot on your spa: services, pricing, FAQs, and your booking system integration.",
  },
  {
    title: "4-day testing with you",
    body:
      "You and your team review every conversation. We tune the tone, fix edge cases, and lock the handoff rules.",
  },
  {
    title: "Go live + ongoing tuning",
    body:
      "We flip it on. From day one we monitor conversations and tighten responses based on real customer traffic.",
  },
];

export const PRICING_PLANS = [
  {
    id: "pilot",
    name: "Pilot",
    tagline: "The standard engagement",
    setup: 1497,
    monthly: 297,
    setupLabel: "one-time setup",
    monthlyLabel: "/ month after launch",
    // Defensible ROI anchor: ~5 bookings × $300 = $1,500 ≈ setup cost.
    anchor: "Pays for itself with 5 booked treatments in the first month.",
    features: [
      "14-day delivery, signed contract to live bot",
      "Trained on your services, prices, hours, and policies",
      "Booking integration (Boulevard, Vagaro, Mindbody, or Calendly)",
      "Human-handoff rules customised to your team",
      "Conversation analytics dashboard",
      "Monthly retainer covers monitoring + up to 4 hours of prompt/copy changes",
      "14-day money-back guarantee on setup",
    ],
    ctaLabel: "Book a 15-min demo",
    highlight: false,
    slots: null,
  },
  {
    id: "founders-pilot",
    name: "Founder's Pilot",
    tagline: "Free in exchange for a published case study",
    setup: 0,
    monthly: 0,
    setupLabel: "setup",
    monthlyLabel: "/ month for 90 days",
    anchor: "Limited to 3 founders this quarter.",
    features: [
      "Everything in the Pilot plan",
      "Zero cost for 90 days while we build the case study together",
      "Required: 5–10 min recorded video testimonial",
      "Required: written case study with real before/after metrics",
      "Required: 1 introduction in your professional network (non-competing OK)",
      "Required: name + logo usage rights on codeket.com",
      "After 90 days: continue at the standard Pilot rate or walk away",
    ],
    ctaLabel: "Apply for a slot",
    highlight: true,
    slots: "2 of 3 slots remaining",
  },
];

export const TRUST_PILLARS = [
  {
    title: "We've shipped 3 full SaaS products",
    body: "Real production apps, real users, not just decks and demos.",
    links: [
      { label: "restaurant.codeket.com", href: "https://restaurant.codeket.com" },
      { label: "school.codeket.com", href: "https://school.codeket.com" },
      { label: "inventory.codeket.com", href: "https://inventory.codeket.com" },
    ],
  },
  {
    title: "100% in-house team",
    body:
      "Nigeria-based engineering and ops. USD billing via Wise or Grey. No agencies, no offshore middlemen, no surprises.",
    links: [],
  },
  {
    title: "The founder signs off on every bot",
    body:
      "Every kickoff, every go-live, every weekly review, Bishir is on the call. You'll always know exactly who's accountable.",
    links: [],
    person: {
      name: "Bishir TM",
      role: "Founder, Codeket",
      // TODO: replace with Bishir's real LinkedIn URL
      linkedin: "[BISHIR_LINKEDIN_PLACEHOLDER]",
    },
  },
];

export const FAQS = [
  {
    id: 1,
    question: "How long does setup take?",
    answer: "14 days from signed contract to live bot.",
  },
  {
    id: 2,
    question: "What if my staff already uses WhatsApp Business?",
    answer:
      "The bot integrates with WhatsApp Business directly, your team and the bot coexist in the same inbox. Staff see every conversation, can jump in any time, and the bot quietly hands off whenever they take over.",
  },
  {
    id: 3,
    question: "Which booking systems do you support?",
    answer:
      "Boulevard, Vagaro, Mindbody, Aesthetic Record, Calendly, or anything with an API. If your system has a public API, we can integrate it inside the 14-day window.",
  },
  {
    id: 4,
    question: "What's included in the $297/month retainer?",
    answer:
      "Live monitoring, prompt tuning based on real conversations, monthly performance report, and up to 4 hours of copy or behaviour changes. Larger changes (new integrations, new flows) are quoted separately so there are no surprises. Cancel any time, no lock-in.",
  },
  {
    id: 5,
    question: "Where are you based?",
    answer:
      "Nigerian-founded studio serving clients globally. USD billing via Wise or Grey. Working hours overlap a normal US/UK/AU business day. Communication via Slack, email, or Zoom, whatever fits how you already work.",
  },
  {
    id: 6,
    question: "Can I see it run on my own business?",
    answer:
      "Yes, book a 15-min demo and we'll set up a sandbox bot on your actual services, pricing, and FAQ data before you commit to anything.",
  },
];
