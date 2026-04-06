import React, { useState, useEffect, useRef } from "react";
import HeroSection from "./components/HeroSection";
import ProductsSection from "./components/ProductsSection";
import ProjectShowcase from "./components/ProjectShowcase";
import Testimonials from "./components/Testimonials";
import FinalCallToAction from "./components/FinalCallToAction";
import IntegrationPartners from "./components/IntegrationPartners";
import Process from "./components/Process";
import { testimonials } from "../../utils/testimonials";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTech, setActiveTech] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const heroRef = useRef(null);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Track scroll progress
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScrollable = docHeight - winHeight;
      const scrollProgress = Math.min(scrollTop / totalScrollable, 1);
      setScrollProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Loading and rotation effects
  useEffect(() => {
    // Handle initial loading animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-screen bg-base-100"
    >
      <div className="sticky top-0 z-[1000]"></div>
      <HeroSection />
      <div className="container  px-6 relative mx-auto z-30 min-h-screen flex flex-col">
        <ProductsSection />
        <ProjectShowcase />
        <Testimonials testimonials={testimonials} />
        <IntegrationPartners />
        <Process />
        <FinalCallToAction />
      </div>
    </div>
  );
};

export default Home;
