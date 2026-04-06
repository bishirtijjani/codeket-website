import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaRobot,
  FaMobile,
  FaShieldAlt,
  FaChartLine,
  FaRegLightbulb,
} from "react-icons/fa";
import PlanCard from "./PlanCard";

const PricingPlans = ({ setSelectedPlan }) => {
  const [serviceType, setServiceType] = useState("development");

  const developmentPlans = [
    {
      id: "starter",
      name: "Starter",
      description: "Core functionality for startups and small businesses",
      price: 8999,
      icon: <FaCode className="text-2xl text-blue-400" />,
      iconBg: "bg-blue-900/30",
      features: [
        "Full-stack development",
        "Responsive design",
        "Admin dashboard",
        "Basic API integration",
        "2-month support & maintenance",
        "Weekly progress updates",
        "User documentation",
      ],
      limitedFeatures: [
        "Custom integrations",
        "Advanced analytics",
        "AI-powered features",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      description: "Comprehensive solution for scaling businesses",
      price: 19999,
      icon: <FaChartLine className="text-2xl text-purple-400" />,
      iconBg: "bg-purple-900/30",
      features: [
        "Everything in Starter",
        "Multiple platform deployment",
        "Advanced API integrations",
        "Custom reporting & analytics",
        "Database optimization",
        "Basic AI features",
        "4-months support & maintenance",
        "Staff training sessions",
        "Technical documentation",
      ],
      limitedFeatures: [
        "Microservices architecture",
        "Advanced security features",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Tailored solutions for large-scale business needs",
      price: 39999,
      icon: <FaRegLightbulb className="text-2xl text-teal-400" />,
      iconBg: "bg-teal-900/30",
      features: [
        "Everything in Growth",
        "Microservices architecture",
        "Advanced security features",
        "Custom integrations",
        "Scalable infrastructure",
        "Load testing & optimization",
        "6-months support & maintenance",
        "Comprehensive documentation",
        "Priority support",
        "Remote team training",
        "Dedicated project manager",
      ],
    },
  ];

  const mobileAppPlans = [
    {
      id: "basic-mobile",
      name: "Basic App",
      description: "Essential mobile app development for single platform",
      price: 12999,
      icon: <FaMobile className="text-2xl text-blue-400" />,
      iconBg: "bg-blue-900/30",
      features: [
        "Single platform (Android or iOS)",
        "User authentication",
        "Core app functionality",
        "Basic API integration",
        "App store submission",
        "3-month support",
        "Bug fixes & maintenance",
      ],
      limitedFeatures: [
        "Cross-platform development",
        "Advanced features",
        "Analytics integration",
      ],
    },
    {
      id: "premium-mobile",
      name: "Premium App",
      description: "Cross-platform app with advanced features",
      price: 24999,
      icon: <FaMobile className="text-2xl text-purple-400" />,
      iconBg: "bg-purple-900/30",
      features: [
        "Cross-platform (Android & iOS)",
        "Advanced user interface",
        "Push notifications",
        "Payment integration",
        "Analytics dashboard",
        "Offline functionality",
        "4-month support",
        "Performance optimization",
        "App store optimization",
      ],
      limitedFeatures: ["AI features", "AR/VR capabilities"],
    },
    {
      id: "enterprise-mobile",
      name: "Enterprise App",
      description: "Full-featured app solution with custom integrations",
      price: 45999,
      icon: <FaMobile className="text-2xl text-teal-400" />,
      iconBg: "bg-teal-900/30",
      features: [
        "Everything in Premium App",
        "AI-powered features",
        "AR/VR capabilities (if needed)",
        "Custom enterprise integrations",
        "Advanced security features",
        "High-performance optimization",
        "Scalable backend architecture",
        "White-label option",
        "6-month support & updates",
        "Dedicated project manager",
        "Complete app analytics",
      ],
    },
  ];

  const aiSolutionsPlans = [
    {
      id: "ai-starter",
      name: "AI Starter",
      description: "Basic AI integration for existing applications",
      price: 14999,
      icon: <FaRobot className="text-2xl text-blue-400" />,
      iconBg: "bg-blue-900/30",
      features: [
        "AI model integration",
        "Basic data processing",
        "Simple predictive features",
        "Chatbot implementation",
        "Standard API connections",
        "3-month support",
        "Basic documentation",
      ],
      limitedFeatures: [
        "Custom AI model training",
        "Advanced analytics",
        "Real-time processing",
      ],
    },
    {
      id: "ai-advanced",
      name: "AI Advanced",
      description: "Enhanced AI capabilities for business optimization",
      price: 29999,
      icon: <FaRobot className="text-2xl text-purple-400" />,
      iconBg: "bg-purple-900/30",
      features: [
        "Advanced AI implementation",
        "Multiple AI model integration",
        "Predictive analytics dashboard",
        "Natural language processing",
        "Computer vision capabilities",
        "Data pipeline setup",
        "4-month support & maintenance",
        "Technical documentation",
        "Team training sessions",
      ],
      limitedFeatures: [
        "Custom AI model development",
        "Real-time processing at scale",
      ],
    },
    {
      id: "ai-premium",
      name: "AI Premium",
      description: "Custom AI solution with specialized model development",
      price: 59999,
      icon: <FaRobot className="text-2xl text-teal-400" />,
      iconBg: "bg-teal-900/30",
      features: [
        "Custom AI model development",
        "Large-scale data processing",
        "Real-time AI processing",
        "Advanced analytics dashboard",
        "API development for AI services",
        "Complete system integration",
        "Continuous model improvement",
        "6-month support & maintenance",
        "Dedicated AI specialist",
        "Comprehensive documentation",
        "Knowledge transfer sessions",
      ],
    },
  ];

  const securityPlans = [
    {
      id: "security-basic",
      name: "Security Basic",
      description: "Essential security assessment and implementation",
      price: 9999,
      icon: <FaShieldAlt className="text-2xl text-blue-400" />,
      iconBg: "bg-blue-900/30",
      features: [
        "Security assessment",
        "Vulnerability scanning",
        "Basic penetration testing",
        "Security patches implementation",
        "User authentication review",
        "Data protection assessment",
        "Basic security documentation",
      ],
      limitedFeatures: [
        "Advanced penetration testing",
        "Continuous monitoring",
        "Security architecture redesign",
      ],
    },
    {
      id: "security-advanced",
      name: "Security Advanced",
      description: "Comprehensive security solution for sensitive applications",
      price: 19999,
      icon: <FaShieldAlt className="text-2xl text-purple-400" />,
      iconBg: "bg-purple-900/30",
      features: [
        "Everything in Security Basic",
        "Advanced penetration testing",
        "Security architecture review",
        "Encryption implementation",
        "Compliance assessment (GDPR, CCPA)",
        "Secure code review",
        "Security training for team",
        "Incident response planning",
        "3-month security monitoring",
      ],
      limitedFeatures: [
        "24/7 security monitoring",
        "Custom security architecture",
      ],
    },
    {
      id: "security-premium",
      name: "Security Premium",
      description: "Enterprise-grade security with continuous protection",
      price: 34999,
      icon: <FaShieldAlt className="text-2xl text-teal-400" />,
      iconBg: "bg-teal-900/30",
      features: [
        "Everything in Security Advanced",
        "Custom security architecture",
        "Advanced threat modeling",
        "24/7 security monitoring",
        "Full compliance implementation",
        "Security DevOps integration",
        "Regular security audits",
        "Advanced authentication system",
        "Comprehensive security documentation",
        "6-month ongoing support",
        "Security incident response team",
      ],
    },
  ];

  const activePlans =
    serviceType === "development"
      ? developmentPlans
      : serviceType === "mobile"
      ? mobileAppPlans
      : serviceType === "ai"
      ? aiSolutionsPlans
      : securityPlans;

  return (
    <div id="pricing-plans" className="py-24 px-6 bg-neutral">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            African Excellence, Global Delivery
          </h2>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            Leverage our talented African development teams to build your
            software at competitive rates without compromising on quality or
            communication.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setServiceType("development")}
            className={`px-6 py-3 rounded-full transition-all ${
              serviceType === "development"
                ? "bg-primary text-white"
                : "bg-base-200 border border-base-300 text-base-content/80 hover:bg-base-300"
            }`}
          >
            <span className="flex items-center">
              <FaCode className="mr-2" /> Custom Development
            </span>
          </button>
          <button
            onClick={() => setServiceType("mobile")}
            className={`px-6 py-3 rounded-full transition-all ${
              serviceType === "mobile"
                ? "bg-primary text-white"
                : "bg-base-200 border border-base-300 text-base-content/80 hover:bg-base-300"
            }`}
          >
            <span className="flex items-center">
              <FaMobile className="mr-2" /> Mobile Apps
            </span>
          </button>
          <button
            onClick={() => setServiceType("ai")}
            className={`px-6 py-3 rounded-full transition-all ${
              serviceType === "ai"
                ? "bg-primary text-white"
                : "bg-base-200 border border-base-300 text-base-content/80 hover:bg-base-300"
            }`}
          >
            <span className="flex items-center">
              <FaRobot className="mr-2" /> AI Solutions
            </span>
          </button>
          <button
            onClick={() => setServiceType("security")}
            className={`px-6 py-3 rounded-full transition-all ${
              serviceType === "security"
                ? "bg-primary text-white"
                : "bg-base-200 border border-base-300 text-base-content/80 hover:bg-base-300"
            }`}
          >
            <span className="flex items-center">
              <FaShieldAlt className="mr-2" /> Security Services
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activePlans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isPopular={index === 1}
              setSelectedPlan={setSelectedPlan}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-base-200 p-8 rounded-2xl border border-base-300"
        >
          <h3 className="text-2xl font-bold mb-4">
            Looking for a Custom Solution?
          </h3>
          <p className="text-base-content/80 mb-6 max-w-2xl mx-auto">
            Our pricing is flexible based on your project requirements. Our
            Africa-based development teams offer significant cost advantages
            without compromising on quality or communication.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="/consultation"
              className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-xl shadow-md hover:bg-accent transition-all duration-300"
            >
              Schedule Free Consultation
            </a>
            <a
              href="#custom-quote"
              className="inline-block px-8 py-4 bg-white border border-base-300 text-base-content font-semibold rounded-xl hover:bg-base-100 hover:border-primary/40 transition-all duration-300"
            >
              Get Custom Quote
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <div className="bg-neutral-focus/50 border border-neutral p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">US-Aligned Hours</h3>
            <p className="text-base-content/70">
              Our teams work in overlapping hours with US time zones to ensure
              smooth communication
            </p>
          </div>
          <div className="bg-neutral-focus/50 border border-neutral p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Fixed-Price Projects</h3>
            <p className="text-base-content/70">
              Know exactly what you're paying upfront with our detailed project
              scopes and fixed pricing
            </p>
          </div>
          <div className="bg-neutral-focus/50 border border-neutral p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Agile Development</h3>
            <p className="text-base-content/70">
              Weekly sprints and demos with flexible priorities to adapt to your
              changing business needs
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPlans;
