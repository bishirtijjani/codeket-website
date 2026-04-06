// components/CaseStudies/CaseStudyCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";

const CaseStudyCard = ({
  caseStudy,
  setHoveredCard,
  setActiveCaseStudy,
  hoveredCard,
}) => {
  return (
    <motion.div
      key={caseStudy.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      onMouseEnter={() => setHoveredCard(caseStudy.id)}
      onMouseLeave={() => setHoveredCard(null)}
      className={`bg-gradient-to-br ${caseStudy.bgColor} p-1 rounded-2xl h-full`}
    >
      <div className="bg-base-100 rounded-2xl h-full flex flex-col overflow-hidden">
        <div className="h-48 bg-base-200 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={caseStudy.image} alt="" className="h-full w-full" />
          </div>
          <div className="absolute top-4 left-4 bg-black/70 rounded-full p-2">
            <div className="text-2xl">{caseStudy.icon}</div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-base-200 rounded-full text-base-content/80 text-xs mb-2">
              {caseStudy.industry}
            </span>
            <h3 className="text-xl font-bold mb-2">{caseStudy.title}</h3>
            <p className="text-base-content/60 text-sm">{caseStudy.clientName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {caseStudy.stats.slice(0, 2).map((stat, index) => (
              <div
                key={index}
                className="bg-base-200 rounded-lg p-3 text-center"
              >
                <div
                  className={`text-lg font-bold text-${caseStudy.accentColor} mb-1`}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-base-content/70">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex-grow">
            <p className="text-base-content/80 text-sm line-clamp-3 mb-4">
              {caseStudy.challengeDescription.substring(0, 120)}...
            </p>
          </div>

          <motion.button
            onClick={() => setActiveCaseStudy(caseStudy)}
            className={`mt-auto w-full py-3 px-4 rounded-lg hover:bg-${caseStudy.accentColor}/50 border border-${caseStudy.accentColor}/30 text-primary font-medium transition-all duration-300 flex items-center justify-center`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Case Study <HiOutlineArrowRight className="ml-2" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;
