import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroSection from "./components/HeroSection";
import VisionMission from "./components/VisionMission";
import CoreValues from "./components/CoreValues";
import Team from "./components/Team";
import Timeline from "./components/Timeline";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import CallToAction from "../../components/Common/CallToAction";

const About = () => {
  const { scrollYProgress } = useScroll();

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="bg-base-100 text-base-content ">
      <Helmet>
        <title>About Codeket — Our Story, Vision &amp; Team</title>
        <meta
          name="description"
          content="Meet the team behind Codeket. Learn our vision, mission, core values, and milestones — and why clients trust us to ship production-ready software."
        />
        <link rel="canonical" href="https://codeket.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codeket.com/about" />
        <meta property="og:title" content="About Codeket — Our Story, Vision & Team" />
        <meta
          property="og:description"
          content="Meet the team behind Codeket. Our vision, mission, core values, and milestones."
        />
        <meta property="og:image" content="https://codeket.com/preview-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <HeroSection />
      <VisionMission />
      <CoreValues />
      <Team />
      <Timeline />
      <Testimonials
        activeTestimonial={activeTestimonial}
        setActiveTestimonial={setActiveTestimonial}
      />
      <Stats />
      <CallToAction />
    </div>
  );
};

export default About;
