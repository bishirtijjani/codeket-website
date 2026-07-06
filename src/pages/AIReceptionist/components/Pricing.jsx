import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import { PRICING_PLANS, CALENDLY_URL } from "../data";

const Price = ({ plan }) => {
  if (plan.setup === 0 && plan.monthly === 0) {
    return (
      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-5xl font-extrabold text-base-content tracking-tight">
            $0
          </span>
          <span className="text-base-content/60 text-sm">{plan.setupLabel}</span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-display text-2xl font-bold text-base-content">
            $0
          </span>
          <span className="text-base-content/60 text-sm">
            {plan.monthlyLabel}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-5xl font-extrabold text-base-content tracking-tight">
          ${plan.setup.toLocaleString()}
        </span>
        <span className="text-base-content/60 text-sm">{plan.setupLabel}</span>
      </div>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="font-display text-2xl font-bold text-base-content">
          ${plan.monthly}
        </span>
        <span className="text-base-content/60 text-sm">
          {plan.monthlyLabel}
        </span>
      </div>
    </div>
  );
};

const Pricing = () => {
  return (
    <section className="py-20 md:py-24 px-6 bg-base-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14 md:mb-16"
        >
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/60 mb-4">
            Pricing
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-base-content">
            Simple, transparent pricing.
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-base-100 rounded-2xl overflow-hidden border md:grid md:grid-cols-2 ${
                plan.highlight
                  ? "border-primary shadow-md shadow-primary/10"
                  : "border-base-300"
              }`}
            >
              {/* Left: identity, price, CTA */}
              <div className="p-8 md:p-10 flex flex-col">
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-base-content mb-1">
                  {plan.name}
                </h3>
                <p className="text-base-content/60 text-sm mb-8">
                  {plan.tagline}
                </p>

                <div className="mb-3">
                  <Price plan={plan} />
                </div>
                {plan.anchor && (
                  <p className="text-xs md:text-sm text-base-content/60 mb-8 leading-relaxed">
                    {plan.anchor}
                  </p>
                )}

                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 px-6 rounded-xl font-semibold mt-auto transition-all duration-300 flex items-center justify-center ${
                    plan.highlight
                      ? "text-white hover:-translate-y-0.5 hover:shadow-lg"
                      : "bg-primary text-white hover:bg-accent hover:shadow-md"
                  }`}
                  style={
                    plan.highlight
                      ? {
                          background:
                            "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                        }
                      : undefined
                  }
                >
                  {plan.ctaLabel}
                  <FaArrowRight className="ml-2 w-3 h-3" />
                </a>
              </div>

              {/* Right: what's included */}
              <div className="p-8 md:p-10 space-y-3 bg-base-200/40 border-t md:border-t-0 md:border-l border-base-300">
                <p className="font-semibold text-base-content text-sm uppercase tracking-wider mb-3">
                  What's included:
                </p>
                {plan.features.map((f, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="text-success mt-1 mr-3 flex-shrink-0">
                      <FaCheck className="w-3 h-3" />
                    </div>
                    <p className="text-base-content/80 text-sm leading-relaxed">
                      {f}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm text-base-content/60 mt-8"
        >
          14-day money-back on the Pilot. Cancel anytime after.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
