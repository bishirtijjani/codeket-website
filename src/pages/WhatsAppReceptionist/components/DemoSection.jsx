import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, MessageCircle } from "lucide-react";
import LoomModal from "./LoomModal";
import {
  LOOM_URL,
  WHATSAPP_DEMO_LINK,
  WHATSAPP_DEMO_NUMBER,
} from "../data";

const DemoSection = () => {
  const [loomOpen, setLoomOpen] = useState(false);
  const loomIsPlaceholder = LOOM_URL && LOOM_URL.startsWith("[");

  return (
    <section className="py-20 md:py-24 px-6 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 md:mb-14"
        >
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/60 mb-4">
            Live demo
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-base-content">
            See it answer, book, and follow up.
          </h2>
        </motion.div>

        {/* Try it yourself, promoted ABOVE the Loom so prospects who'd rather
            text than watch convert. Live interaction beats video any day. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-base-100 border-2 border-primary/30 rounded-2xl p-6 md:p-8 shadow-sm"
        >
          <div>
            <div className="inline-block text-[11px] uppercase tracking-[0.18em] text-primary font-semibold mb-2">
              Try it live, right now
            </div>
            <div className="font-display text-xl md:text-2xl font-bold text-base-content mb-1">
              Text the demo bot yourself.
            </div>
            <div className="text-sm text-base-content/70">
              Send{" "}
              <span className="font-semibold text-base-content">
                {WHATSAPP_DEMO_NUMBER}
              </span>{" "}
              the message <span className="font-mono text-base-content bg-base-200 px-1.5 py-0.5 rounded">join pot-sport</span>, then chat. Demo data only.
            </div>
          </div>
          <a
            href={WHATSAPP_DEMO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap"
            style={{ background: "#25D366" }}
          >
            <MessageCircle className="w-4 h-4" />
            Try it on WhatsApp
          </a>
        </motion.div>

        {/* Loom embed. Recording is portrait (phone screen), so container is
            narrow + tall, centered, with the correct ~228% padding-bottom. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative w-full max-w-[360px] mx-auto rounded-2xl overflow-hidden border border-base-300 bg-[#0B1628] shadow-xl"
          style={{ paddingBottom: "228.03%" }}
        >
          {loomIsPlaceholder ? (
            <button
              type="button"
              onClick={() => setLoomOpen(true)}
              className="absolute inset-0 w-full h-full flex items-center justify-center group"
              aria-label="Play 90-second demo"
            >
              {/* Subtle orange glow */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(234,88,12,0.35) 0%, transparent 60%)",
                }}
              />
              <div className="relative flex flex-col items-center text-white px-6 text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110"
                  style={{
                    background:
                      "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                  }}
                >
                  <Play className="w-8 h-8 ml-1 fill-white" />
                </div>
                <div className="mt-6 font-semibold text-lg">
                  Watch the 45-second demo
                </div>
                <div className="text-sm text-white/50 mt-1">
                  Loom embed appears here once <code className="text-white/70">LOOM_URL</code> is set
                </div>
              </div>
            </button>
          ) : (
            <iframe
              src={LOOM_URL}
              title="WhatsApp AI Receptionist, full demo"
              frameBorder="0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )}
        </motion.div>

      </div>

      <LoomModal open={loomOpen} onClose={() => setLoomOpen(false)} url={LOOM_URL} />
    </section>
  );
};

export default DemoSection;
