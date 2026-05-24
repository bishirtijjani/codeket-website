import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { CALENDLY_URL, WHATSAPP_DEMO_LINK, WHATSAPP_DEMO_NUMBER } from "../data";

const FinalCTA = () => {
  return (
    <section className="py-24 md:py-28 px-6 bg-[#0B1628] relative overflow-hidden">
      {/* Subtle orange glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #C2410C 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.05] tracking-tight">
          Stop losing leads to your{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            front desk.
          </span>
        </h2>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Book a 15-minute demo. Walk away with a free inquiry-loss audit either
          way.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 cursor-pointer text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
            }}
          >
            <span>Book the demo</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={WHATSAPP_DEMO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-white text-base font-semibold border border-white/15 hover:bg-white/5 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            Or text the bot first
          </a>
        </div>

        <p className="text-slate-500 text-xs mt-6">
          Not ready to book? Text <span className="text-slate-300">{WHATSAPP_DEMO_NUMBER}</span> with <span className="font-mono text-slate-300">join pot-sport</span> and try the demo bot yourself, no email required.
        </p>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
