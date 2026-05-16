import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaChevronDown } from "react-icons/fa";

// Feature Comparison Table
const ComparisonTable = () => {
  const [expandedSection, setExpandedSection] = useState("core");

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const featureSections = [
    {
      id: "core",
      name: "Core Features",
      features: [
        {
          name: "AI-powered features",
          starter: false,
          growth: "Basic",
          enterprise: "Advanced",
        },
        {
          name: "Team members",
          starter: "Up to 5",
          growth: "Up to 20",
          enterprise: "Unlimited",
        },
        {
          name: "Analytics dashboard",
          starter: "Basic",
          growth: "Advanced",
          enterprise: "Enterprise",
        },
        {
          name: "Uptime guarantee",
          starter: "99.5%",
          growth: "99.9%",
          enterprise: "99.99%",
        },
      ],
    },
    {
      id: "support",
      name: "Support & Services",
      features: [
        {
          name: "Support window",
          starter: "2 months",
          growth: "4 months",
          enterprise: "6 months",
        },
        {
          name: "Onboarding session",
          starter: false,
          growth: "2 hours",
          enterprise: "8 hours",
        },
        {
          name: "Dedicated project manager",
          starter: false,
          growth: false,
          enterprise: true,
        },
        {
          name: "Staff training sessions",
          starter: false,
          growth: true,
          enterprise: true,
        },
      ],
    },
    {
      id: "security",
      name: "Security & Compliance",
      features: [
        {
          name: "Data encryption",
          starter: true,
          growth: true,
          enterprise: true,
        },
        {
          name: "Single sign-on (SSO)",
          starter: false,
          growth: true,
          enterprise: true,
        },
        {
          name: "Role-based access",
          starter: "Basic",
          growth: "Advanced",
          enterprise: "Custom",
        },
        {
          name: "Compliance support",
          starter: "Standard",
          growth: "Industry-standard (e.g., HIPAA-ready)",
          enterprise: "Custom (HIPAA, GDPR, SOC 2)",
        },
      ],
    },
    {
      id: "integrations",
      name: "Integrations & API",
      features: [
        {
          name: "API integrations",
          starter: "Basic",
          growth: "Advanced",
          enterprise: "Unlimited",
        },
        {
          name: "Custom integrations",
          starter: false,
          growth: true,
          enterprise: true,
        },
        {
          name: "Microservices architecture",
          starter: false,
          growth: false,
          enterprise: true,
        },
        {
          name: "Load testing & optimization",
          starter: false,
          growth: false,
          enterprise: true,
        },
      ],
    },
  ];

  return (
    <div className="py-24 px-6 bg-neutral">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Compare Plans</h2>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            See which plan has the features that are right for your business.
          </p>
        </motion.div>

        <div className="space-y-6">
          {featureSections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="border border-neutral-focus rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-neutral hover:bg-neutral-focus transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold">{section.name}</h3>
                <motion.div
                  animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: expandedSection === section.id ? "auto" : 0,
                  opacity: expandedSection === section.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral/50">
                      <tr>
                        <th className="py-4 px-6 text-left text-base-content/80 font-medium">
                          Feature
                        </th>
                        <th className="py-4 px-6 text-center text-base-content/80 font-medium">
                          Starter
                        </th>
                        <th className="py-4 px-6 text-center text-base-content/80 font-medium">
                          Growth
                        </th>
                        <th className="py-4 px-6 text-center text-base-content/80 font-medium">
                          Enterprise
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-focus">
                      {section.features.map((feature, idx) => (
                        <tr key={idx} className="hover:bg-neutral/30">
                          <td className="py-4 px-6 text-left">
                            {feature.name}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {typeof feature.starter === "boolean" ? (
                              feature.starter ? (
                                <FaCheck className="mx-auto text-success" />
                              ) : (
                                <FaTimes className="mx-auto text-base-content/70" />
                              )
                            ) : (
                              <span className="text-base-content/80">
                                {feature.starter}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {typeof feature.growth === "boolean" ? (
                              feature.growth ? (
                                <FaCheck className="mx-auto text-success" />
                              ) : (
                                <FaTimes className="mx-auto text-base-content/70" />
                              )
                            ) : (
                              <span className="text-base-content/80">
                                {feature.growth}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {typeof feature.enterprise === "boolean" ? (
                              feature.enterprise ? (
                                <FaCheck className="mx-auto text-success" />
                              ) : (
                                <FaTimes className="mx-auto text-base-content/70" />
                              )
                            ) : (
                              <span className="text-base-content/80">
                                {feature.enterprise}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
