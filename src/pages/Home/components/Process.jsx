import React from "react";
import { motion } from "framer-motion";
import { Search, Landmark, Zap, FlaskConical, TrendingUp } from "lucide-react";

const processes = [
  {
    title: "Business Analysis",
    icon: Search,
    description:
      "Our AI analyzes your business requirements and turns them into technical specifications.",
  },
  {
    title: "Architecture Design",
    icon: Landmark,
    description:
      "Intelligent systems design the optimal architecture considering scalability, performance, and security.",
  },
  {
    title: "Accelerated Development",
    icon: Zap,
    description:
      "AI-assisted coding with pre-built components accelerates development by 300%.",
  },
  {
    title: "Intelligent Testing",
    icon: FlaskConical,
    description:
      "Automated test generation and execution with predictive issue detection finds and fixes issues early.",
  },
  {
    title: "Continuous Optimization",
    icon: TrendingUp,
    description:
      "Real-time performance monitoring and AI-driven optimizations keeps your software running smoothly.",
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
            Our AI-Powered{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Process
            </span>
          </motion.h2>
          <motion.p
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Here's how we transform your business challenges into powerful
            software solutions 3x faster.
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
