import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const questions = [
    {
      id: 1,
      question: "How does payment work?",
      answer:
        "Pricing is project-based, not subscription. After a free scoping call, we send a fixed-price quote. Larger projects are split into milestones (typically a 40% deposit to kick off, then payments at agreed milestones, with the balance on final delivery).",
    },
    {
      id: 2,
      question: "What if my project scope changes mid-build?",
      answer:
        "Small adjustments inside the original scope are absorbed without extra cost. Significant additions (new features, new integrations, design overhauls) are handled with a change order — quoted and agreed separately so you're never surprised on the invoice.",
    },
    {
      id: 3,
      question: "Who owns the code after delivery?",
      answer:
        "You do. Full IP and source code transfer on final payment. We retain rights only to reusable infrastructure and design patterns built across multiple projects — never to anything specific to your business.",
    },
    {
      id: 4,
      question: "What's included in the support window?",
      answer:
        "Bug fixes, security patches, minor adjustments, and email support during the included support period (2 months for Starter, 4 for Growth, 6 for Enterprise). New features, design changes, or scope expansion aren't included but can be added as a separate engagement or via a monthly retainer.",
    },
    {
      id: 5,
      question: "What payment methods do you accept?",
      answer:
        "USD wire transfer via Wise or Grey, credit card via Stripe, and direct bank transfer for clients in Nigeria and Africa. Enterprise contracts can be structured around your procurement process.",
    },
    {
      id: 6,
      question:
        "Do you offer discounts for non-profits, early-stage startups, or African businesses?",
      answer:
        "Case-by-case. Mention your situation in the inquiry form and we'll let you know what's possible. We also occasionally take on case-study partnerships at reduced cost in exchange for a published case study and testimonial.",
    },
  ];

  const toggleQuestion = (id) => {
    if (openQuestion === id) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(id);
    }
  };

  return (
    <div className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            Find answers to common questions about our pricing and plans.
          </p>
        </motion.div>

        <div className="space-y-4">
          {questions.map((qa) => (
            <motion.div
              key={qa.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: qa.id * 0.1 }}
              viewport={{ once: true }}
              className="border border-neutral-focus rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(qa.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-neutral hover:bg-neutral-focus transition-colors duration-300 text-left"
              >
                <h3 className="text-lg font-medium">{qa.question}</h3>
                <motion.div
                  animate={{ rotate: openQuestion === qa.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openQuestion === qa.id ? "auto" : 0,
                  opacity: openQuestion === qa.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-neutral/20">
                  <p className="text-base-content/80">{qa.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
