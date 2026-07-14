import React from "react";
import { motion } from "framer-motion";

/**
 * A messaging conversation mockup, rendered in pure CSS.
 *
 * Styled after an Instagram DM thread as one representative channel, the
 * AI receptionist also runs on WhatsApp and other inboxes. The previous
 * WhatsApp-styled version is archived at
 * ./archive/ChatConversationWhatsApp.jsx.
 *
 * Use this as the default visual in the hero. When the real screenshot
 * is ready, drop it in at /images/ai-receptionist/demo-conversation.png
 * and replace this component's usage in Hero.jsx with a plain <img>.
 */
const IG_GRADIENT =
  "linear-gradient(45deg, #FED373 0%, #F15245 30%, #D92E7F 55%, #9B36B7 80%, #515BD4 100%)";

const ChatConversation = () => {
  const messages = [
    { from: "client", text: "Hi, saw your lip filler post. Do you have anything Saturday? I know it's last minute 🙈", time: "10:47 PM" },
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
      <div className="relative overflow-hidden rounded-[2rem] bg-white">
        {/* Instagram DM top bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-neutral-200">
          <svg
            className="w-5 h-5 text-neutral-900 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* Avatar with story ring */}
          <div
            className="w-9 h-9 rounded-full p-[2px] flex-shrink-0"
            style={{ background: IG_GRADIENT }}
          >
            <div className="w-full h-full rounded-full bg-white p-[2px]">
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                }}
              >
                G
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-neutral-900 truncate">
              glowaestheticspa
            </div>
            <div className="text-[11px] text-neutral-500">Active now</div>
          </div>
          <div className="flex items-center gap-3 text-neutral-900">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.5-.4-1-1-1z" />
            </svg>
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="2.5" y="6" width="13" height="12" rx="2.5" />
              <path d="M15.5 10.5l5-3v9l-5-3" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Chat body */}
        <div className="relative px-3 py-4 space-y-1.5 max-h-[480px] overflow-hidden bg-white">
          <div className="text-center pb-1">
            <span className="inline-block text-[10px] text-neutral-400 font-medium">
              Today 10:47 PM
            </span>
          </div>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-end gap-1.5 ${
                m.from === "bot" ? "justify-end" : "justify-start"
              }`}
            >
              {m.from === "client" && (
                <div className="w-6 h-6 rounded-full bg-neutral-300 flex items-center justify-center text-[9px] font-bold text-neutral-600 flex-shrink-0">
                  S
                </div>
              )}
              <div
                className={`relative max-w-[78%] px-3.5 py-2 text-[13px] leading-snug whitespace-pre-line ${
                  m.from === "bot"
                    ? "text-white rounded-[18px] rounded-br-md"
                    : "bg-[#efefef] text-neutral-900 rounded-[18px] rounded-bl-md"
                }`}
                style={
                  m.from === "bot"
                    ? {
                        background:
                          "linear-gradient(135deg, #7638FA 0%, #B02EC9 60%, #D300C5 100%)",
                      }
                    : undefined
                }
              >
                <span>{m.text}</span>
              </div>
            </div>
          ))}
          <div className="flex justify-end pr-1 pt-0.5">
            <span className="text-[10px] text-neutral-400">Seen 10:49 PM</span>
          </div>
        </div>

        {/* Instagram input bar */}
        <div className="px-3 py-2 bg-white border-t border-neutral-100">
          <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white pl-1.5 pr-3 py-1.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ background: IG_GRADIENT }}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <div className="flex-1 text-xs text-neutral-400">Message...</div>
            <div className="flex items-center gap-2.5 text-neutral-700">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                <path d="M19 10v2a7 7 0 01-14 0v-2" strokeLinecap="round" />
                <path d="M12 19v3" strokeLinecap="round" />
              </svg>
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
                <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
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

export default ChatConversation;
