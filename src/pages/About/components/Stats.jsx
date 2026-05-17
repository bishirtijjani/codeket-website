import React from "react";
import { motion } from "framer-motion";
import { stats } from "../../../utils/stats";

// Individual stat card with count-up for numeric values
const StatCard = ({ stat, index }) => {
  // Extract numeric part if present (e.g. "50+" → 50, "100%" → 100, "3" → 3)
  const numericMatch = stat.value.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : null;
  const suffix = numericMatch ? stat.value.slice(numericMatch[1].length) : null;

  const [count, setCount] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true);
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  React.useEffect(() => {
    if (!hasStarted || numericValue === null) return;
    let startTime = null;
    const duration = 1600 + index * 150;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericValue));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [hasStarted, numericValue, index]);

  const displayValue = numericValue !== null ? `${count}${suffix}` : stat.value;

  return (
    <motion.div
      ref={ref}
      key={index}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="text-center p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-orange-600/30 hover:bg-white/10 transition-all duration-300"
    >
      <div className="flex justify-center mb-4">
        <stat.Icon className="w-9 h-9 text-orange-500" strokeWidth={1.75} />
      </div>
      <div
        className="text-5xl font-extrabold mb-2 tabular-nums"
        style={{
          background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {displayValue}
      </div>
      <div className="text-slate-400 font-medium">{stat.label}</div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="py-28 px-6 bg-[#0B1628]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-4"
        >
          Codeket by the{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Numbers
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-slate-400 text-center text-lg mb-16 max-w-xl mx-auto"
        >
          Results that speak for themselves.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
