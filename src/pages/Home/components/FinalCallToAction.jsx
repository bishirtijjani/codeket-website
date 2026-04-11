import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCallToAction = () => {
  return (
    <section className="py-28 px-6 bg-[#0B1628] relative overflow-hidden">
      {/* Subtle gold glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #C2410C 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Build Smarter, Faster, and More Scalable{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Solutions?
          </span>
        </motion.h2>

        <motion.p
          className="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Let our AI-powered platform deliver enterprise-grade software 3x
          faster with exceptional quality and precision.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/consultation"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 cursor-pointer text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
            }}
          >
            <span>Get a Custom Solution</span>
            <svg
              className="w-6 h-6 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 cursor-pointer border-2 border-white/20 text-white text-lg font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            <span>Explore SaaS Solutions</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalCallToAction;
