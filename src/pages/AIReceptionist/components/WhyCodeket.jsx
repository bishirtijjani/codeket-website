import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Linkedin } from "lucide-react";
import { TRUST_PILLARS } from "../data";

const WhyCodeket = () => {
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
            Why Codeket
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-base-content">
            A studio that ships, and stays.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRUST_PILLARS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-base-100 border border-base-300 rounded-2xl p-7 md:p-8 flex flex-col"
            >
              <h3 className="font-display text-xl md:text-2xl font-bold text-base-content mb-4 leading-snug">
                {p.title}
              </h3>
              <p className="text-base-content/70 text-base leading-relaxed mb-6">
                {p.body}
              </p>

              {p.links && p.links.length > 0 && (
                <ul className="space-y-2 mt-auto">
                  {p.links.map((l, idx) => (
                    <li key={idx}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        {l.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {p.person && (
                <div className="mt-auto pt-2 flex items-center gap-4">
                  {/* Avatar placeholder, swap with <img src=".../bishir.jpg"> when ready */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #0F4C81 0%, #1e6bb8 100%)",
                    }}
                    aria-hidden="true"
                  >
                    BT
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-base-content text-sm">
                      {p.person.name}
                    </div>
                    <div className="text-xs text-base-content/60 mb-1">
                      {p.person.role}
                    </div>
                    <a
                      href={p.person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                    >
                      <Linkedin className="w-3 h-3" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCodeket;
