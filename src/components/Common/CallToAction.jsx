import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="m-8 ">
      <motion.div
        className="bg-base-200 rounded-2xl border border-base-300 p-8 lg:p-12 text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-base-content mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Business?
          </motion.h2>

          <motion.p
            className="text-base-content/80 text-xl md:text-2xl max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join the hundreds of organizations that have partnered with Codeket to
            drive innovation and achieve remarkable results.
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="px-10 py-5 cursor-pointer bg-primary text-white text-xl font-semibold rounded-xl shadow-md hover:bg-accent hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
            >
              <span>Contact Us</span>
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
              to="/case-studies"
              className="px-10 cursor-pointer py-5 bg-white border border-base-300 text-base-content text-xl font-semibold rounded-xl hover:bg-base-100 hover:border-primary/40 transition-all duration-300 flex items-center justify-center"
            >
              <span>View Case Studies</span>
              <svg
                className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CallToAction;
