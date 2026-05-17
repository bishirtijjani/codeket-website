import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { FAQS } from "../data";

/** Accordion mirroring src/pages/Pricing/components/FAQ.jsx. */
const FAQ = () => {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="py-20 md:py-24 px-6 bg-base-100">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-base-content mb-4">
            Frequently asked questions
          </h2>
          <p className="text-base md:text-lg text-base-content/70">
            Everything we get asked on the first call.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((qa, i) => (
            <motion.div
              key={qa.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border border-base-300 rounded-xl overflow-hidden bg-base-100"
            >
              <button
                type="button"
                onClick={() => toggle(qa.id)}
                aria-expanded={openId === qa.id}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-base-200/60 transition-colors"
              >
                <h3 className="text-base md:text-lg font-semibold text-base-content pr-4">
                  {qa.question}
                </h3>
                <motion.div
                  animate={{ rotate: openId === qa.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-base-content/50 flex-shrink-0"
                >
                  <FaChevronDown className="w-3.5 h-3.5" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openId === qa.id ? "auto" : 0,
                  opacity: openId === qa.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 pt-1">
                  <p className="text-base-content/70 leading-relaxed">
                    {qa.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
