// components/HeroSection.js
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { motion } from "framer-motion";
import scrollToSection from "../../../utils/scrollToSection";

const HeroSection = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Background gradient animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[80%] h-[80%] bg-primary rounded-full filter blur-[160px] opacity-5 animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[70%] h-[70%] bg-primary rounded-full filter blur-[160px] opacity-5 animate-blob animation-delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
            <span className="text-primary">
              Software Solutions That Power Growth
            </span>
          </h1>
          <p className="text-xl md:text-2xl  mt-6 max-w-3xl mx-auto">
            Choose the technology solutions that will drive your business
            forward, from custom development to AI-powered software.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection("pricing-plans")}
            className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-xl shadow-md hover:bg-accent transition-all duration-300"
          >
            Explore Solutions
          </button>
          <a
            href="/consultation"
            className="px-8 py-4 bg-white border border-base-300 text-base-content font-semibold rounded-xl hover:bg-base-100 hover:border-primary/40 transition-all duration-300"
          >
            Get Custom Quote
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <p className="text-base-content/70 mb-2">Scroll down to discover</p>
          <div className="w-8 h-12 rounded-full border-2 border-base-content flex justify-center">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
            >
              <FaArrowAltCircleDown className="w-10 h-10" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
