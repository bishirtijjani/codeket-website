import React from "react";
import { motion } from "framer-motion";
import { STEPS } from "../data";

/**
 * Mirrors src/pages/Home/components/Process.jsx, dark navy section,
 * orange gradient numbered nodes, vertical timeline.
 */
const HowItWorks = () => {
  return (
    <section className="py-20 md:py-24 px-6 bg-[#0B1628] text-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400 mb-4"
          >
            How it works
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-white"
          >
            From kickoff to live bot in{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              14 days.
            </span>
          </motion.h2>
        </div>

        <div className="max-w-4xl">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              className="flex relative pb-10 last:pb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-px bg-white/10 pointer-events-none" />
              )}

              {/* Numbered node */}
              <div
                className="relative z-10 flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full shadow-md text-white font-display font-bold text-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                }}
              >
                {i + 1}
              </div>

              <div className="ml-6">
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
