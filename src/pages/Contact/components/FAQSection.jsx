import React from "react";
import { motion } from "framer-motion";

const FAQSection = ({ faqs }) => {
  return (
    <div className="mb-32">
      <h2 className="text-4xl font-bold text-center mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-xl text-base-content/80 text-center mb-16 max-w-3xl mx-auto">
        Get quick answers to common questions about working with us.
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-base-200/60 rounded-xl p-6 border border-base-300/60"
            >
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-base-content/80">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
