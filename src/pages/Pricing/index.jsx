import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import CallToAction from "../../components/Common/CallToAction";
import HeroSection from "./components/HeroSection";
import PricingPlans from "./components/PricingPlans";
import FAQ from "./components/FAQ";
import ComparisonTable from "./components/ComparisonTable";
import ContactForm from "../Contact/components/ContactForm";
import ContactInfo from "../Contact/components/ContactInfo";
import PaymentOptions from "./components/PaymentOptions";
import Guarantee from "./components/Guarantee";
import ClientLogos from "./components/ClientLogos";
import PricingModal from "./components/PricingModal";

// Main Pricing Component
const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="bg-base-100 text-base-content">
      <Helmet>
        <title>Pricing, Transparent Plans for Every Stage | Codeket</title>
        <meta
          name="description"
          content="Clear, transparent pricing for Codeket's web, mobile, and AI development services. Compare plans, view payment options, and find the right fit for your project."
        />
        <link rel="canonical" href="https://codeket.com/pricing" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codeket.com/pricing" />
        <meta property="og:title" content="Pricing, Transparent Plans for Every Stage | Codeket" />
        <meta
          property="og:description"
          content="Transparent pricing for Codeket's web, mobile, and AI development services."
        />
        <meta property="og:image" content="https://codeket.com/preview-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="">
        {/* Adjust for header height */}
        <HeroSection />
        <PricingPlans setSelectedPlan={setSelectedPlan} />
        <ComparisonTable />
        <Guarantee />
        <PaymentOptions />
        <ClientLogos />
        <FAQ />
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
        <CallToAction />
        {selectedPlan && (
          <PricingModal
            plan={selectedPlan}
            onClose={() => setSelectedPlan(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Pricing;
