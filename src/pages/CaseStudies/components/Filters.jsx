// components/CaseStudies/Filters.jsx
import React from "react";
import { motion } from "framer-motion";
import { HiOutlineFilter } from "react-icons/hi";

const Filters = ({
  industries,
  selectedIndustry,
  setSelectedIndustry,
  services,
  selectedService,
  setSelectedService,
}) => {
  return (
    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Industry filter */}
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <HiOutlineFilter className="mr-2" /> Filter by Industry
        </h3>
        <div className="flex flex-wrap gap-3">
          {industries.map((industry) => (
            <motion.button
              key={industry.id}
              onClick={() => setSelectedIndustry(industry.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                selectedIndustry === industry.id
                  ? "bg-primary text-white"
                  : "bg-base-200 border border-base-300 text-base-content/80 hover:bg-base-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {industry.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Service filter */}
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <HiOutlineFilter className="mr-2" /> Filter by Service
        </h3>
        <div className="flex flex-wrap gap-3">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                selectedService === service.id
                  ? "bg-primary text-white"
                  : "bg-base-200 border border-base-300 text-base-content/80 hover:bg-base-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {service.name}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
