// pages/ServicePage.js
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import CallToAction from "../../components/Common/CallToAction";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/Stats";
import ServicesSection from "./components/ServicesSection";
import ProcessSection from "./components/ProcessSection";
import ProjectShowcase from "./components/ProjectShowcase";

const ServicePage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="bg-base-100 text-base-content ">
      <Helmet>
        <title>Services, Web, Mobile &amp; AI Development | Codeket</title>
        <meta
          name="description"
          content="Codeket's services: custom web apps, mobile development, AI integration, and product engineering. End-to-end delivery from design to deployment."
        />
        <link rel="canonical" href="https://codeket.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codeket.com/services" />
        <meta property="og:title" content="Services, Web, Mobile & AI Development | Codeket" />
        <meta
          property="og:description"
          content="Custom web apps, mobile development, AI integration, and product engineering."
        />
        <meta property="og:image" content="https://codeket.com/preview-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <HeroSection />
      <StatsSection />
      <ServicesSection setHoveredCard={setHoveredCard} />
      <ProcessSection />
      <ProjectShowcase />
      <CallToAction />
    </div>
  );
};

export default ServicePage;
