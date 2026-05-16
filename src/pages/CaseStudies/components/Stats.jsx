// components/CaseStudies/StatisticsSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaChartLine, FaBrain, FaServer } from "react-icons/fa";

const StatisticsSection = () => {
  return (
    <div className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">
              Our Impact by the Numbers
            </span>
          </h2>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            Results that speak for themselves across industries and
            technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-base-100 border border-base-300 rounded-2xl p-6 text-center shadow-sm"
          >
            <FaRocket className="mx-auto text-primary text-3xl mb-4" />
            <div className="text-4xl font-bold text-base-content mb-2">4+</div>
            <p className="text-base-content/70">Documented Case Studies</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-base-100 border border-base-300 rounded-2xl p-6 text-center shadow-sm"
          >
            <FaChartLine className="mx-auto text-accent text-3xl mb-4" />
            <div className="text-4xl font-bold text-base-content mb-2">5+</div>
            <p className="text-base-content/70">Industries Served</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-base-100 border border-base-300 rounded-2xl p-6 text-center shadow-sm"
          >
            <FaBrain className="mx-auto text-secondary text-3xl mb-4" />
            <div className="text-4xl font-bold text-base-content mb-2">2-12 wk</div>
            <p className="text-base-content/70">Typical Delivery Window</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-base-100 border border-base-300 rounded-2xl p-6 text-center shadow-sm"
          >
            <FaServer className="mx-auto text-success text-3xl mb-4" />
            <div className="text-4xl font-bold text-base-content mb-2">100%</div>
            <p className="text-base-content/70">In-House Development</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
