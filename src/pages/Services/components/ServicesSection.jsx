// components/ServicesSection.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaRocket,
  FaCode,
  FaLayerGroup,
  FaMobile,
  FaDatabase,
  FaCloud,
  FaLaptopCode,
  FaChartLine,
  FaLock,
  FaTools,
  FaBrain,
  FaServer,
} from "react-icons/fa";

import {
  HiOutlineLightBulb,
  HiOutlineChip,
  HiOutlineGlobe,
  HiOutlineArrowRight,
  HiOutlineArrowDown,
  HiOutlineCube,
  HiOutlineQuestionMarkCircle,
  HiOutlineSparkles,
} from "react-icons/hi";

const categories = [
  { id: "all", name: "All Services" },
  { id: "development", name: "Development" },
  { id: "cloud", name: "Cloud & AI" },
  { id: "automation", name: "Automation" },
  { id: "consulting", name: "Consulting" },
];

const services = [
  {
    id: 1,
    title: "Enterprise Software Development",
    category: "development",
    icon: <FaCode className="text-primary" />,
    bgColor: "from-primary/20 to-info/20",
    accentColor: "primary",
    description:
      "Custom enterprise-grade software solutions designed to automate processes, integrate systems, and scale with your business growth.",
    features: [
      "Custom Web Applications",
      "Legacy System Modernization",
      "Internal Tools & Dashboards",
      "API Development & Integration",
    ],
    useCase: {
      scenario: "Logistics Operations Management",
      challenge: "Outdated systems causing operational delays and data silos",
      solution:
        "Custom logistics management platform with real-time tracking and system integration",
      potentialOutcome:
        "Up to 40% increase in operational efficiency with potential annual savings of $1M+",
      image: "/images/enterprise-software.jpg",
    },
  },
  {
    id: 2,
    title: "Inventory Management System",
    category: "development",
    icon: <FaLayerGroup className="text-accent" />,
    bgColor: "from-accent/20 to-secondary/20",
    accentColor: "accent",
    description:
      "AI-powered inventory management system that predicts stock needs, automates ordering, and optimizes warehouse operations.",
    features: [
      "Real-time Inventory Tracking",
      "Predictive Stock Management",
      "Supplier Management Portal",
      "Multi-location Support",
    ],
    useCase: {
      scenario: "Retail Inventory Optimization",
      challenge:
        "Inventory discrepancies leading to stockouts and overstock situations",
      solution:
        "AI inventory forecasting and management system with multi-location support",
      potentialOutcome:
        "Potential to reduce stockouts by 70-80% and increase inventory turns by 20-25%",
      image: "/images/inventory-dev.jpg",
    },
  },
  {
    id: 3,
    title: "Mobile App Development",
    category: "development",
    icon: <FaMobile className="text-success" />,
    bgColor: "from-success/20 to-secondary/20",
    accentColor: "success",
    description:
      "Native and cross-platform mobile applications with stunning UIs, seamless performance, and robust backend integration.",
    features: [
      "iOS & Android Development",
      "React Native Solutions",
      "Mobile UX/UI Design",
      "App Store Optimization",
    ],
    useCase: {
      scenario: "Healthcare Patient Engagement",
      challenge: "Patients struggling to manage health data and appointments",
      solution:
        "Patient-centered mobile app with wearable integration and intuitive interface",
      potentialOutcome:
        "Typically achieves 100,000+ downloads with 4.5+ star ratings and improved patient outcomes",
      image: "/images/mobile-dev.jpg",
    },
  },
  {
    id: 4,
    title: "AI-Driven Cloud Solutions",
    category: "cloud",
    icon: <FaCloud className="text-secondary" />,
    bgColor: "from-secondary/20 to-primary/20",
    accentColor: "secondary",
    description:
      "Intelligent cloud architectures that leverage AI and machine learning to optimize costs, scale dynamically, and enhance security.",
    features: [
      "Cloud Migration Strategy",
      "Multi-cloud Optimization",
      "Serverless Architecture",
      "AI Resource Management",
    ],
    useCase: {
      scenario: "Financial Services Transaction Processing",
      challenge:
        "Scaling issues during high-transaction periods causing slowdowns",
      solution:
        "AI-driven elastic cloud architecture with predictive scaling capabilities",
      potentialOutcome:
        "Can achieve 99.99% uptime with up to 45% reduction in cloud costs",
      image: "/images/cloud-dev.jpg",
    },
  },
  {
    id: 5,
    title: "Data Analytics & BI",
    category: "cloud",
    icon: <FaChartLine className="text-warning" />,
    bgColor: "from-warning/20 to-error/20",
    accentColor: "warning",
    description:
      "Transform your raw data into actionable insights with advanced analytics, interactive dashboards, and predictive modeling.",
    features: [
      "Business Intelligence Dashboards",
      "Predictive Analytics Models",
      "Data Warehouse Design",
      "Real-time Analytics Pipelines",
    ],
    useCase: {
      scenario: "Manufacturing Equipment Management",
      challenge: "Reactive maintenance leading to costly downtime and repairs",
      solution:
        "Predictive maintenance analytics system with IoT sensor integration",
      potentialOutcome:
        "Typically reduces downtime by 60-70% and maintenance costs by up to 40%",
      image: "/images/business-intel.jpg",
    },
  },
  {
    id: 6,
    title: "Cybersecurity Services",
    category: "cloud",
    icon: <FaLock className="text-error" />,
    bgColor: "from-error/20 to-warning/20",
    accentColor: "error",
    description:
      "Comprehensive security solutions including threat detection, vulnerability assessments, and secure architecture design.",
    features: [
      "Security Architecture Design",
      "Penetration Testing",
      "Compliance Assessment",
      "Security Training & Awareness",
    ],
    useCase: {
      scenario: "Financial Data Protection",
      challenge:
        "Increasing sophistication of threats to sensitive financial data",
      solution:
        "End-to-end security architecture with AI-powered threat detection",
      potentialOutcome:
        "Can significantly reduce breach risk with improved threat response times",
      image: "/images/cybersecurity.jpg",
    },
  },
  {
    id: 7,
    title: "Process Automation",
    category: "automation",
    icon: <FaTools className="text-info" />,
    bgColor: "from-info/20 to-accent/20",
    accentColor: "info",
    description:
      "Streamline operations with intelligent automation that eliminates repetitive tasks and optimizes complex business processes.",
    features: [
      "Robotic Process Automation (RPA)",
      "Workflow Optimization",
      "Document Processing Automation",
      "Business Process Modeling",
    ],
    useCase: {
      scenario: "Insurance Claims Processing",
      challenge:
        "Manual claims handling causing delays and customer dissatisfaction",
      solution:
        "Automated claims processing with machine learning document analysis",
      potentialOutcome:
        "Can reduce processing times from days to minutes and improve accuracy",
      image: "/images/process-automation.jpg",
    },
  },
  {
    id: 8,
    title: "AI & Machine Learning",
    category: "cloud",
    icon: <FaBrain className="text-accent" />,
    bgColor: "from-accent/20 to-primary/20",
    accentColor: "accent",
    description:
      "Harness the power of artificial intelligence and machine learning to extract insights, automate decisions, and create intelligent products.",
    features: [
      "Predictive Modeling",
      "Natural Language Processing",
      "Computer Vision Solutions",
      "Recommendation Systems",
    ],
    useCase: {
      scenario: "Precision Agriculture",
      challenge:
        "Inefficient crop management leading to resource waste and suboptimal yields",
      solution:
        "ML-powered precision agriculture platform with satellite imagery analysis",
      potentialOutcome:
        "Potential 20%+ increase in crop yields with 25-30% reduced resource usage",
      image: "/images/ai.jpg",
    },
  },
  {
    id: 9,
    title: "Custom API Development",
    category: "development",
    icon: <FaLaptopCode className="text-secondary" />,
    bgColor: "from-secondary/20 to-primary/20",
    accentColor: "secondary",
    description:
      "Design and develop secure, high-performance APIs that connect your systems, services, and applications seamlessly.",
    features: [
      "RESTful API Design",
      "GraphQL Implementation",
      "API Gateway Development",
      "API Security & Authentication",
    ],
    useCase: {
      scenario: "Fintech Platform Integration",
      challenge:
        "Legacy systems preventing integration with modern platforms and partners",
      solution:
        "Modern API layer with comprehensive security and authentication",
      potentialOutcome:
        "Enables seamless integration with multiple platforms, potentially increasing revenue streams",
      image: "/images/api-dev.jpg",
    },
  },
  {
    id: 10,
    title: "Digital Transformation Consulting",
    category: "consulting",
    icon: <FaRocket className="text-warning" />,
    bgColor: "from-warning/20 to-warning/20",
    accentColor: "warning",
    description:
      "Strategic guidance to navigate your organization's digital journey, from roadmap development to implementation and beyond.",
    features: [
      "Digital Strategy Development",
      "Technology Stack Assessment",
      "Implementation Roadmap",
      "Change Management",
    ],
    useCase: {
      scenario: "Healthcare Network Digitalization",
      challenge: "Fragmented digital experience across multiple facilities",
      solution:
        "Comprehensive digital transformation strategy with phased implementation",
      potentialOutcome:
        "Potential to create unified patient experience with millions in operational savings",
      image: "/images/consultancy.jpg",
    },
  },

  {
    id: 11,
    title: "Technology Innovation Workshops",
    category: "consulting",
    icon: <HiOutlineLightBulb className="text-warning" />,
    bgColor: "from-warning/20 to-warning/20",
    accentColor: "warning",
    description:
      "Collaborative workshops that help teams identify challenges, explore innovative solutions, and create action plans for implementation.",
    features: [
      "Design Thinking Sessions",
      "Innovation Sprints",
      "Technology Feasibility Analysis",
      "Prototype Development",
    ],
    useCase: {
      scenario: "Media Company Transformation",
      challenge:
        "Declining engagement in traditional channels and content formats",
      solution:
        "Innovation workshops leading to new digital product concepts and strategies",
      potentialOutcome:
        "Can lead to multiple new revenue streams and increased digital audience engagement",
      image: "/images/workshop.jpg",
    },
  },
];

const ServicesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  // Filter services based on selected category
  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  return (
    <div id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" id="services">
            <span className="text-primary">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            Comprehensive technology solutions tailored to transform your
            business operations, enhance efficiency, and drive growth in the
            digital age.
          </p>
        </motion.div>

        {/* Service Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-base-200 border border-base-300 text-base-content/80 hover:bg-base-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="bg-base-200 border border-base-300 rounded-2xl h-full hover:border-primary/40 transition-colors duration-300"
              >
                <div className="bg-base-100 rounded-2xl p-8 h-full flex flex-col">
                  <div className="text-4xl mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-base-content/80 mb-6 flex-grow">
                    {service.description}
                  </p>
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className={`text-${service.accentColor} mr-2`}>
                          •
                        </span>
                        <span className="text-base-content/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`text-${service.accentColor} flex items-center font-semibold hover:underline mt-auto`}
                    onClick={() => setActiveProject(service)}
                  >
                    View Use Case
                    <HiOutlineArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Use Case Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 bg-neutral-focus rounded-full p-2 z-10"
                onClick={() => setActiveProject(null)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto max-h-[80vh]">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="mr-4 text-4xl">{activeProject?.icon}</div>
                    <h3 className="text-2xl font-bold">
                      {activeProject?.title}
                    </h3>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2">Scenario</h4>
                    <p className="text-base-content/80">
                      {activeProject?.useCase?.scenario}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2">Challenge</h4>
                    <p className="text-base-content/80">
                      {activeProject?.useCase?.challenge}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2">Solution</h4>
                    <p className="text-base-content/80">
                      {activeProject?.useCase?.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">
                      Potential Outcome
                    </h4>
                    <p className="text-base-content/80">
                      {activeProject?.useCase?.potentialOutcome}
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-focus  flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={activeProject?.useCase?.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesSection;
