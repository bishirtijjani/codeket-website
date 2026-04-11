import React, { useState, useEffect, useRef } from "react";
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
