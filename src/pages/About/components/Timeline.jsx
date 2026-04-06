import React from "react";
import { motion } from "framer-motion";
import { timeline } from "../../../utils/timeline";

const Timeline = () => {
  return (
    <div className="py-24 px-6 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Our Journey
        </motion.h2>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-accent"></div>

          <div className="space-y-20">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex flex-col md:flex-row items-center"
              >
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0
                      ? "md:text-right md:pr-16"
                      : "md:order-2 md:pl-16"
                  }`}
                >
                  <div
                    className={`bg-base-100 rounded-xl p-6 border border-base-300 shadow-sm ${
                      index % 2 === 0 ? "ml-auto" : ""
                    }`}
                  >
                    <h3 className="text-2xl font-bold mb-1 text-primary">
                      {item.year}
                    </h3>
                    <h4 className="text-xl font-bold mb-3">{item.event}</h4>
                    <p className="text-base-content/80">{item.description}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold border-4 border-base-200">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
