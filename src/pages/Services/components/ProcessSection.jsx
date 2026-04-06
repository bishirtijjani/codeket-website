// components/ProcessSection.js
import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineQuestionMarkCircle,
  HiOutlineLightBulb,
  HiOutlineCube,
  HiOutlineSparkles,
} from "react-icons/hi";
import { FaCode, FaTools, FaRocket } from "react-icons/fa";

const processSteps = [
  {
    id: 1,
    title: "Discovery",
    description:
      "We deeply analyze your business needs, technical environment, and user requirements to establish a solid foundation.",
    icon: <HiOutlineQuestionMarkCircle className="text-primary w-8 h-8" />,
  },
  {
    id: 2,
    title: "Strategy",
    description:
      "Our team collaborates with you to develop a comprehensive roadmap and technical approach tailored to your goals.",
    icon: <HiOutlineLightBulb className="text-accent w-8 h-8" />,
  },
  {
    id: 3,
    title: "Design",
    description:
      "We create detailed technical designs and architectures optimized for performance, security, and scalability.",
    icon: <HiOutlineCube className="text-success w-8 h-8" />,
  },
  {
    id: 4,
    title: "Development",
    description:
      "Our engineering teams build your solution using modern technologies and best practices with regular feedback cycles.",
    icon: <FaCode className="text-warning w-8 h-8" />,
  },
  {
    id: 5,
    title: "Testing",
    description:
      "Rigorous quality assurance processes ensure your solution is reliable, secure, and performs optimally.",
    icon: <FaTools className="text-error w-8 h-8" />,
  },
  {
    id: 6,
    title: "Deployment",
    description:
      "We implement your solution with minimal disruption, ensuring seamless integration with existing systems.",
    icon: <FaRocket className="text-info w-8 h-8" />,
  },
  {
    id: 7,
    title: "Support",
    description:
      "Our team provides ongoing maintenance, optimization, and support to ensure your solution evolves with your needs.",
    icon: <HiOutlineSparkles className="text-secondary w-8 h-8" />,
  },
];

const ProcessSection = () => {
  return (
    <div className="py-24 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">
              Our Process
            </span>
          </h2>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            We follow a proven methodology to deliver exceptional results for
            our clients, ensuring transparency and collaboration at every stage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              key={step.id}
              className="bg-base-100 border border-base-300 rounded-2xl p-6 relative overflow-hidden shadow-sm"
            >
              <div className="absolute -right-4 -top-4 text-6xl opacity-10">
                {step.id}
              </div>
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-base-content/80">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
