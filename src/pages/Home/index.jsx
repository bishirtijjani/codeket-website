import React, { useRef } from "react";
import HeroSection from "./components/HeroSection";
import ProductsSection from "./components/ProductsSection";
import ProjectShowcase from "./components/ProjectShowcase";
import Testimonials from "./components/Testimonials";
import FinalCallToAction from "./components/FinalCallToAction";
import IntegrationPartners from "./components/IntegrationPartners";
import Process from "./components/Process";
import { testimonials } from "../../utils/testimonials";

const Home = () => {
  const heroRef = useRef(null);

  return (
    <div ref={heroRef} className="relative w-full min-h-screen bg-base-100">
      <div className="sticky top-0 z-[1000]"></div>
      <HeroSection />
      <div className="container px-6 relative mx-auto z-30 min-h-screen flex flex-col">
        <Process />
        <ProjectShowcase />
        <Testimonials testimonials={testimonials} />
        <ProductsSection />
        <IntegrationPartners />
        <FinalCallToAction />
      </div>
    </div>
  );
};

export default Home;
