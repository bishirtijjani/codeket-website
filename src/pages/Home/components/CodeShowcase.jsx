import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CodeShowcase = ({ codeSnippets }) => {
  const [activeSnippet, setActiveSnippet] = useState(0);

  return (
    <div className="my-8 p-8 bg-base-200 rounded-xl">
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Advanced Code Framework
        </motion.h2>
        <motion.p
          className="text-base-content/80 text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our AI-powered development framework gives you a head start with
          enterprise-grade code scaffolding for any technology stack.
        </motion.p>
      </div>

      {/* Code Tabs and Display */}
      <div className="grid md:grid-cols-5 gap-6 items-start">
        {/* Code language selector */}
        <div className="md:col-span-1 space-y-2">
          {codeSnippets.map((snippet, index) => (
            <motion.button
              key={index}
              className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                activeSnippet === index
                  ? `bg-primary text-white shadow-md`
                  : "bg-base-100/5 hover:bg-base-100/10 text-base-content/80"
              }`}
              onClick={() => setActiveSnippet(index)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <span className="text-2xl">{snippet.icon}</span>
              <span className="font-mono font-medium">{snippet.language}</span>
            </motion.button>
          ))}
        </div>

        {/* Code display */}
        <div className="md:col-span-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSnippet}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={`relative bg-neutral rounded-xl border border-neutral-focus shadow-2xl overflow-hidden`}
            >
              {/* Code header */}
              <div
                className={`px-4 py-3 bg-base-300 flex justify-between items-center`}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-2">
                    {codeSnippets[activeSnippet].icon}
                  </span>
                  <span className="font-medium text-base-content">
                    {codeSnippets[activeSnippet].language}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                </div>
              </div>

              {/* Code content */}
              <pre className="p-6 text-sm md:text-base font-mono text-base-content/80 overflow-x-auto">
                <code>{codeSnippets[activeSnippet].code}</code>
              </pre>

              {/* Floating copy button */}
              <button className="absolute top-14 right-4 bg-neutral/80 backdrop-blur-sm p-2 rounded text-base-content/80 hover:text-base-content hover:bg-neutral-focus transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CodeShowcase;
