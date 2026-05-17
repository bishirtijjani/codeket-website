import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import technologies from "../../../utils/technologies.jsx";

const HeroSection = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-base-100 grain">
      {/* Animated gradient mesh blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Primary navy blob, top left */}
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #0F4C81 0%, transparent 70%)",
            animation: "blobDrift1 18s ease-in-out infinite alternate",
          }}
        />
        {/* Gold accent blob, bottom right */}
        <div
          className="absolute -bottom-40 -right-20 w-[550px] h-[550px] rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, #C2410C 0%, transparent 70%)",
            animation: "blobDrift2 22s ease-in-out infinite alternate",
          }}
        />
        {/* Subtle navy blob, top right */}
        <div
          className="absolute top-10 right-0 w-[350px] h-[350px] rounded-full opacity-10 blur-2xl"
          style={{
            background: "radial-gradient(circle, #0F4C81 0%, transparent 70%)",
            animation: "blobDrift2 14s ease-in-out infinite alternate",
          }}
        />
        {/* Subtle dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0F4C81 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 py-20">
        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight text-base-content mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <span className="block text-primary">Smart Software</span>
          <span className="block mt-2">
            for Growing{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Businesses.
            </span>
          </span>
        </motion.h1>

        {/* Punchy subtext */}
        <motion.div
          className="max-w-2xl mx-auto mb-14 space-y-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
        >
          <p className="text-base-content/70 text-xl md:text-2xl font-medium leading-relaxed">
            Codeket builds modern, intuitive tools that power real growth. From
            custom enterprise solutions to SaaS products, AI-driven apps, and
            automation systems, we deliver software that works fast, scales
            effortlessly, and stays easy to use.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link
            to="/consultation"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl text-lg font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
            }}
          >
            <span>Get a Free Quote</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <Link
            to="/case-studies"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            See Our Work
          </Link>
        </motion.div>

        {/* Technology pills */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          {technologies.slice(0, 5).map((tech, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-base-300 bg-base-100/80 backdrop-blur-sm text-base-content/70 text-sm font-medium hover:border-orange-600/40 hover:text-base-content transition-all duration-200"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span className="text-base">{tech.icon}</span>
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Keyframe animations injected inline */}
      <style>{`
        @keyframes blobDrift1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(60px, 40px) scale(1.08); }
          100% { transform: translate(20px, -30px) scale(0.95); }
        }
        @keyframes blobDrift2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(-40px, 30px) scale(1.06); }
          100% { transform: translate(30px, -20px) scale(0.97); }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
