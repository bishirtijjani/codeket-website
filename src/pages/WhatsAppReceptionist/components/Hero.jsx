import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import WhatsAppConversation from "./WhatsAppConversation";
import LoomModal from "./LoomModal";
import { CALENDLY_URL, LOOM_URL } from "../data";

const Hero = () => {
  const [loomOpen, setLoomOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-base-100 pt-28 pb-20 md:pt-32 md:pb-24">
      {/* Subtle background accent, same pattern as HeroA */}
      <div
        className="absolute top-0 right-0 w-[60%] h-full opacity-[0.04] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, #0F4C81 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Left, copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.05] tracking-tight text-base-content mb-6">
            AI Receptionist on WhatsApp,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              built for Med Spas.
            </span>
          </h1>

          <p className="text-base-content/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            Recover the bookings your front desk is missing after 6 PM. Answers
            every inquiry, books appointments, follows up, 24/7. Live in 14
            days.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
              }}
            >
              Book a 15-min demo
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setLoomOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-base-300 bg-base-100 text-base-content font-semibold hover:border-primary/40 hover:shadow-sm transition-all"
            >
              <Play className="w-4 h-4" />
              Watch 90-sec demo
            </button>
          </div>

          <p className="text-base-content/50 text-sm">
            We'll build it on your actual services, pricing, and FAQs, not a generic script.
          </p>
        </motion.div>

        {/* Right, WhatsApp conversation */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          {/* CSS mockup. When the real screenshot is ready, replace with:
              <img src="/images/whatsapp-receptionist/demo-conversation.png"
                   alt="WhatsApp conversation with the Codeket AI receptionist"
                   className="mx-auto w-full max-w-[360px]" /> */}
          <WhatsAppConversation />
        </motion.div>
      </div>

      <LoomModal
        open={loomOpen}
        onClose={() => setLoomOpen(false)}
        url={LOOM_URL}
      />
    </section>
  );
};

export default Hero;
