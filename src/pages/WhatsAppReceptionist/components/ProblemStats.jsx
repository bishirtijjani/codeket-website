import React from "react";
import { motion } from "framer-motion";
import { PROBLEM_STATS } from "../data";

const ProblemStats = () => {
  return (
    <section className="py-20 md:py-24 px-6 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14 md:mb-16"
        >
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/60 mb-4">
            The problem
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-base-content">
            The leads your front desk{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              is missing.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {PROBLEM_STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-base-100 border border-base-300 rounded-2xl p-7 md:p-8 flex flex-col"
            >
              <div
                className="font-display text-5xl md:text-6xl font-extrabold leading-none tracking-tight mb-4"
                style={{
                  background:
                    "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <div className="text-base font-semibold text-base-content mb-2">
                {s.label}
              </div>
              <div className="text-sm text-base-content/60 leading-relaxed">
                {s.detail}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl text-base md:text-lg text-base-content/70 leading-relaxed"
        >
          Front desks were never built to triage WhatsApp DMs, Instagram messages,
          missed calls and forms in real time. The volume keeps going up; the
          shifts stay the same. Every after-hours inquiry that waits till
          morning is a treatment you didn't book.
        </motion.p>
      </div>
    </section>
  );
};

export default ProblemStats;
