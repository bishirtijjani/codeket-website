import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";
import HeroA from "./components/HeroA";
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
      <Helmet>
        <title>Codeket, Complex Challenges. Elegant Solutions.</title>
        <meta
          name="description"
          content="Codeket is a software studio turning complex business challenges into elegant, production-ready software. Web, mobile, and AI solutions delivered with care."
        />
        <link rel="canonical" href="https://codeket.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codeket.com/" />
        <meta
          property="og:title"
          content="Codeket, Complex Challenges. Elegant Solutions."
        />
        <meta
          property="og:description"
          content="Software studio turning complex business challenges into elegant, production-ready software."
        />
        <meta property="og:image" content="https://codeket.com/preview-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Codeket, Complex Challenges. Elegant Solutions." />
        <meta
          name="twitter:description"
          content="Software studio turning complex business challenges into elegant, production-ready software."
        />
        <meta name="twitter:image" content="https://codeket.com/preview-image.jpg" />
      </Helmet>
      <div className="sticky top-0 z-[1000]"></div>
      <HeroA />
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
