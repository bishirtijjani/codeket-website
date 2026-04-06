// components/Stats.js
import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "35+", label: "Projects Delivered" },
  { value: "8+", label: "Years of Industry Experience" },
  { value: "94%", label: "Client Retention" },
  { value: "100%", label: "Client Satisfaction" },
];

const Stats = () => {
  return (
    <div className="relative py-20 border-t border-neutral-focus">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <p className="text-xl text-base-content/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
