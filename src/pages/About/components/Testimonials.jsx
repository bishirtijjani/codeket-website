import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { testimonials } from "../../../utils/testimonials";

const Testimonials = ({ activeTestimonial, setActiveTestimonial }) => {
  return (
    <div className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          What Our Clients Say
        </motion.h2>

        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex flex-col space-y-6">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-neutral-focus rounded-xl p-8 border border-neutral relative"
              >
                <FaQuoteLeft className="absolute top-8 left-8 text-3xl text-primary opacity-30" />
                <FaQuoteRight className="absolute bottom-8 right-8 text-3xl text-accent opacity-30" />

                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
                    <div className="w-24 h-24 rounded-full object-cover border-4 border-base-300 bg-primary flex items-center justify-center text-6xl font-bold text-white">
                {testimonials[activeTestimonial].name.charAt(0)}
              </div>
                  </div>
                  <div className="md:w-3/4 md:pl-8">
                    <p className="text-xl text-base-content/80 italic mb-6">
                      "{testimonials[activeTestimonial].quote}"
                    </p>
                    <h4 className="text-xl font-bold">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-primary">
                      {testimonials[activeTestimonial].position}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  activeTestimonial === index ? "bg-primary" : "bg-neutral-focus"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
