import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import LoomModal from "./LoomModal";
import { LOOM_URL } from "../data";

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

        {/* Loom embed, portrait phone aspect, centered with max-width.
            Live bot demo is reserved for discovery calls with serious
            prospects, not exposed on the public page. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden border border-base-300 bg-[#0B1628] shadow-xl"
        >
          {loomIsPlaceholder ? (
            <button
              type="button"
              onClick={() => setLoomOpen(true)}
              className="w-full flex items-center justify-center group py-16"
              aria-label="Play demo"
            >
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
                  Watch the demo
                </div>
              </div>
            </button>
          ) : (
            <iframe
              src={LOOM_URL}
              title="WhatsApp AI Receptionist demo"
              frameBorder="0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowFullScreen
              className="w-full block aspect-[9/16]"
            />
          )}
        </motion.div>

      </div>

      <LoomModal open={loomOpen} onClose={() => setLoomOpen(false)} url={LOOM_URL} />
    </section>
  );
};

export default DemoSection;
