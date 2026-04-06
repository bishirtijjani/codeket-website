import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaCode, FaUserClock, FaHandshake } from "react-icons/fa";

// Guarantee Section
const Guarantee = () => {
  return (
    <div className="py-24 px-6 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              The Codeket Guarantee
            </h2>
            <p className="text-xl text-base-content/80 mb-8">
              We're committed to excellence in every project we deliver. Our
              promise to you includes quality code, timely delivery, and ongoing
              support to ensure your complete satisfaction.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-success mt-1 mr-3">
                  <FaCode />
                </div>
                <div>
                  <p className="text-base-content font-medium">Quality Assurance</p>
                  <p className="text-base-content/80">
                    Rigorous testing before deployment ensures your software
                    works flawlessly
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-success mt-1 mr-3">
                  <FaUserClock />
                </div>
                <div>
                  <p className="text-base-content font-medium">Timely Delivery</p>
                  <p className="text-base-content/80">
                    We respect your timelines and deliver on schedule, every
                    time
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-success mt-1 mr-3">
                  <FaHandshake />
                </div>
                <div>
                  <p className="text-base-content font-medium">
                    30-Day Support Promise
                  </p>
                  <p className="text-base-content/80">
                    Free support and bug fixes for 30 days after project
                    completion
                  </p>
                </div>
              </div>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#pricing-plans"
              className="inline-block mt-10 px-8 py-4 bg-primary text-white font-semibold rounded-xl shadow-md hover:bg-accent transition-all duration-300"
            >
              Choose Your Solution
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <svg
                className="w-full h-auto max-w-md"
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="256"
                  cy="256"
                  r="248"
                  stroke="url(#paint0_linear)"
                  strokeWidth="16"
                />
                <path
                  d="M175 256L225 306L345 186"
                  stroke="url(#paint2_linear)"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="125"
                    y1="125"
                    x2="387"
                    y2="387"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="var(--p)" />
                    <stop offset="1" stopColor="var(--a)" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear"
                    x1="175"
                    y1="256"
                    x2="345"
                    y2="186"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="var(--p)" />
                    <stop offset="1" stopColor="var(--a)" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute -bottom-8 right-0 bg-neutral bg-opacity-60 backdrop-blur-sm rounded-xl border border-neutral p-6 shadow-xl max-w-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-success/20 p-2 rounded-full mr-4">
                    <FaCheck className="text-success" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">
                      Satisfaction Guarantee
                    </h4>
                    <p className="text-base-content text-sm">
                      If you're not completely satisfied with our deliverables,
                      we'll work with you until you are.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Guarantee;
