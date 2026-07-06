// Data for the AI Receptionist landing page.
// Kept in its own module so the section components stay focused on layout.

export const PRIMARY_CTA_LABEL = "Book a 15-min demo";
export const SECONDARY_CTA_LABEL = "Watch 45-sec demo";

// Replace these with real URLs / numbers before launch.
export const CALENDLY_URL = "https://calendly.com/bishirtijjani247/30min";
// Use the /embed/ URL (not /share/) — required for iframe embedding.
// The /share/ URL renders fine in a browser but Loom blocks it inside iframes.
export const LOOM_URL = "https://www.loom.com/embed/dd158bac0eb94a2393d74ce45e0b376c";
// Twilio WhatsApp sandbox. The wa.me link pre-fills the join code so a tap
// auto-registers the visitor to the sandbox and they can start chatting.
// If they message manually, they need to send "join pot-sport" first.
export const WHATSAPP_DEMO_LINK = "https://wa.me/14155238886?text=join%20pot-sport";
export const WHATSAPP_DEMO_NUMBER = "+1 (415) 523-8886";
export const BISHIR_LINKEDIN_URL = "https://linkedin.com/in/bishirtijjani";

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
      "Captures the booking, confirms with the client, and either writes it straight to your calendar or hands your team a ready-to-book slot with all the details — no double-bookings, no lost leads.",
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
      "Booking capture + handoff on any system; direct calendar integration for Square, Acuity, Calendly (others quoted as an add-on)",
      "Human-handoff rules customised to your team",
      "Conversation analytics dashboard",
      "Monthly retainer covers monitoring + up to 4 hours of prompt/copy changes",
      "14-day money-back guarantee on setup",
    ],
    ctaLabel: "Book a 15-min demo",
    highlight: false,
  },
];

export const TRUST_PILLARS = [
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
      linkedin: BISHIR_LINKEDIN_URL,
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
    question: "What if my staff already uses WhatsApp or Instagram DMs?",
    answer:
      "The bot integrates with WhatsApp Business and Instagram directly, your team and the bot coexist in the same inbox. Staff see every conversation, can jump in any time, and the bot quietly hands off whenever they take over.",
  },
  {
    id: 3,
    question: "Which booking systems do you support?",
    answer:
      "Direct calendar integration is available today for Square, Acuity, and Calendly. For Boulevard, Vagaro, Mindbody, Zenoti, and Aesthetic Record we integrate where the platform's API allows — set up as a follow-on once access is approved. Everything else runs on smart capture + handoff, so no lead is lost whatever software you use.",
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
