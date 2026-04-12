import React from "react";
import { motion } from "framer-motion";
import { Search, Landmark, Zap, FlaskConical, TrendingUp } from "lucide-react";

const processes = [
  {
    title: "Discovery & Strategy",
    icon: Search,
    description:
      "We learn your business inside out — goals, users, pain points — then map out a clear plan with timelines and deliverables.",
  },
  {
    title: "Architecture & Design",
    icon: Landmark,
    description:
      "Our team designs the system architecture and UI/UX with scalability, performance, and your users in mind from day one.",
  },
  {
    title: "Build & Iterate",
    icon: Zap,
    description:
      "We develop in focused sprints, shipping working features regularly so you can see progress and give feedback early.",
  },
  {
    title: "Testing & QA",
    icon: FlaskConical,
    description:
      "Rigorous manual and automated testing at every stage ensures your product is reliable, secure, and production-ready.",
  },
  {
    title: "Launch & Support",
    icon: TrendingUp,
    description:
      "We handle deployment, monitor performance, and provide ongoing support to keep your software running smoothly as you grow.",
  },
];

const Process = () => {
  return (
    <section className="py-28 px-6 bg-[#0B1628] text-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How We{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Work
            </span>
          </motion.h2>
          <motion.p
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From first call to launch day — a straightforward process built
            around your goals.
          </motion.p>
        </div>

        {/* Process timeline */}
        <div className="max-w-4xl mx-auto">
          {processes.map((step, index) => (
            <motion.div
              key={index}
              className="flex relative pb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Timeline connector */}
              {index < 4 && (
                <div className="absolute inset-0 flex items-center justify-center w-6 h-full">
                  <div className="h-full w-0.5 bg-base-300 pointer-events-none"></div>
                </div>
              )}

              {/* Timeline node */}
              <div
                className="relative z-10 flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                }}
              >
                <step.icon className="w-5 h-5 text-white" />
              </div>

              {/* Content */}
              <div className="ml-6">
                <h3 className="flex text-2xl font-bold text-white mb-2">
                  {step.title}
                  <span className="ml-2 text-orange-500/60 font-mono">
                    0{index + 1}
                  </span>
                </h3>
                <p className="text-slate-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
