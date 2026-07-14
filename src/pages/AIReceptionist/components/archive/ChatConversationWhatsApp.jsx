import React from "react";
import { motion } from "framer-motion";

/**
 * ARCHIVED: WhatsApp-styled hero conversation mockup.
 *
 * The hero now uses the Instagram-styled ChatConversation. Keep this
 * around in case we want to swap back to the WhatsApp presentation.
 */
const ChatConversationWhatsApp = () => {
  const messages = [
    { from: "client", text: "Hi, saw your lip filler post on IG. Do you have anything Saturday? I know it's last minute 🙈", time: "10:47 PM" },
    { from: "bot", text: "Hi Sarah 👋 Not too last minute at all, Dr. Marin has Saturday 11:30 AM and 3:15 PM open. Both 45-min slots. Want me to hold one?", time: "10:47 PM" },
    { from: "client", text: "11:30 sounds good. Quick Q, is $650 really firm? Another spa quoted me $480", time: "10:48 PM" },
    { from: "bot", text: "Totally fair to ask. Our $650 is Juvéderm Ultra with a board-certified injector and a 20-min consult included.\n\nIf you'd like, I can book your slot at $650 *and* flag your message for Dr. Marin to call you tomorrow about a first-time package, she has discretion on welcome pricing. Sound good?", time: "10:48 PM" },
    { from: "client", text: "Yes please, that works", time: "10:49 PM" },
    { from: "bot", text: "Booked ✅\nSaturday, 11:30 AM with Dr. Marin\n\nConfirmation + intake form on the way. Dr. Marin will call you Friday before noon. See you Saturday, Sarah!", time: "10:49 PM" },
  ];

  return (
    <div
      className="relative mx-auto w-full max-w-[360px] rounded-[2.5rem] p-3 shadow-2xl"
      style={{
        background: "linear-gradient(155deg, #1f2937 0%, #0f172a 100%)",
        boxShadow:
          "0 30px 80px -20px rgba(15, 76, 129, 0.35), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Phone screen */}
      <div className="relative overflow-hidden rounded-[2rem] bg-[#e5ddd5]">
        {/* WhatsApp top bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 text-white"
          style={{ background: "#075E54" }}
        >
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
            G
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">Glow Aesthetic Spa</div>
            <div className="text-[11px] text-white/70">online · typing…</div>
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.5-.4-1-1-1z" />
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 13a2 2 0 100-4 2 2 0 000 4zm0 5a2 2 0 100-4 2 2 0 000 4zm0-12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
        </div>

        {/* Chat body */}
        <div
          className="relative px-3 py-4 space-y-2 max-h-[480px] overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "18px 18px, 22px 22px",
            backgroundPosition: "0 0, 9px 11px",
          }}
        >
          <div className="text-center">
            <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-white/70 text-neutral-600">
              Today
            </span>
          </div>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.from === "bot" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-[78%] px-3 py-2 rounded-lg text-[13px] leading-snug shadow-sm whitespace-pre-line ${
                  m.from === "bot"
                    ? "bg-[#DCF8C6] text-neutral-900 rounded-tr-sm"
                    : "bg-white text-neutral-900 rounded-tl-sm"
                }`}
              >
                <span>{m.text}</span>
                <span className="block text-right text-[9px] text-neutral-500 mt-1">
                  {m.time}
                  {m.from === "bot" && (
                    <span className="ml-1 text-[#34B7F1]">✓✓</span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp input bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#f0f0f0] border-t border-black/5">
          <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-neutral-400">
            Message
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white"
            style={{ background: "#075E54" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 11l18-8-8 18-2-8-8-2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating "Booked" pill, visible on all screens */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute -left-2 sm:-left-4 md:-left-10 top-1/3 bg-base-100 border border-base-300 rounded-2xl px-3 py-2.5 md:px-4 md:py-3 shadow-xl flex items-center gap-2.5 md:gap-3"
      >
        <div
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)" }}
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div className="text-[11px] md:text-xs font-semibold text-base-content leading-tight">Appointment booked</div>
          <div className="text-[10px] md:text-[11px] text-base-content/60">Saturday · 11:30 AM</div>
        </div>
      </motion.div>

      {/* Floating "Response time" pill, visible on all screens */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute -right-2 sm:-right-4 md:-right-10 bottom-12 md:bottom-16 bg-base-100 border border-base-300 rounded-2xl px-3 py-2.5 md:px-4 md:py-3 shadow-xl"
      >
        <div className="text-[9px] md:text-[10px] uppercase tracking-wider text-base-content/60 font-semibold">
          Avg. response
        </div>
        <div className="text-base md:text-lg font-bold text-base-content leading-none mt-1">
          11<span className="text-xs md:text-sm text-base-content/60 font-medium"> seconds</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatConversationWhatsApp;
