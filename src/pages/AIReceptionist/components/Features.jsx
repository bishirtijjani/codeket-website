import React from "react";
import { motion } from "framer-motion";
import { MessageSquareText, CalendarCheck, UserRoundCheck } from "lucide-react";
import { FEATURES } from "../data";

const ICONS = [MessageSquareText, CalendarCheck, UserRoundCheck];

const Features = () => {
  return (
    <section className="py-20 md:py-24 px-6 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14 md:mb-16"
        >
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/60 mb-4">
            What it does
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-base-content">
            One bot, three jobs your front desk{" "}
            <span className="text-primary">can't do alone.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-base-200/60 border border-base-300 rounded-2xl p-7 md:p-8 flex flex-col"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6"
                  style={{
                    background:
                      "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-base-content mb-3 leading-snug">
                  {f.title}
                </h3>
                <p className="text-base-content/70 text-base leading-relaxed">
                  {f.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
