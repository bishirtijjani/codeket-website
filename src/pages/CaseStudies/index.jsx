import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import HeroSection from "./components/HeroSection";
import Filters from "./components/Filters";
import CaseStudyCard from "./components/CaseStudyCard";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction.jsx";
import CaseStudyModal from "./components/CaseStudyModal";
import {
  caseStudies,
  industries,
  services,
} from "../../utils/caseStudiesData.jsx"; // Import data

const CaseStudiesPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter case studies
  const filteredCaseStudies = caseStudies.filter((study) => {
    const matchesIndustry =
      selectedIndustry === "all" || study.industry === selectedIndustry;
    const matchesService =
      selectedService === "all" || study.services.includes(selectedService);
    const matchesSearch =
      searchQuery === "" ||
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.clientName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesIndustry && matchesService && matchesSearch;
  });

  return (
    <div className="bg-base-100 text-base-content ">
      <Helmet>
        <title>Case Studies — Real Projects, Real Results | Codeket</title>
        <meta
          name="description"
          content="Explore Codeket's case studies across industries and services. See how we've delivered measurable results for clients with web, mobile, and AI solutions."
        />
        <link rel="canonical" href="https://codeket.com/case-studies" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codeket.com/case-studies" />
        <meta property="og:title" content="Case Studies — Real Projects, Real Results | Codeket" />
        <meta
          property="og:description"
          content="Explore Codeket's case studies. Real projects, measurable results."
        />
        <meta property="og:image" content="https://codeket.com/preview-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <HeroSection />

      {/* Main Case Studies Section */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Filters
            industries={industries}
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
            services={services}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />

          {/* Case Studies Grid */}
          {filteredCaseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredCaseStudies.map((caseStudy) => (
                  <CaseStudyCard
                    key={caseStudy.id}
                    caseStudy={caseStudy}
                    setHoveredCard={setHoveredCard}
                    setActiveCaseStudy={setActiveCaseStudy}
                    hoveredCard={hoveredCard}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20">
              <HiOutlineQuestionMarkCircle className="mx-auto text-5xl text-base-content/70 mb-4" />
              <h3 className="text-xl font-medium text-base-content/80 mb-2">
                No matching case studies
              </h3>
              <p className="text-base-content/70">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      <Stats />
      <Testimonials caseStudies={caseStudies} />
      <CallToAction />

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        activeCaseStudy={activeCaseStudy}
        setActiveCaseStudy={setActiveCaseStudy}
      />
    </div>
  );
};

export default CaseStudiesPage;
