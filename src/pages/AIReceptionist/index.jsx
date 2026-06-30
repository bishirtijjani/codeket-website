import React from "react";
import { Helmet } from "react-helmet-async";

import Hero from "./components/Hero";
import ProblemStats from "./components/ProblemStats";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import DemoSection from "./components/DemoSection";
import WhyCodeket from "./components/WhyCodeket";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import { FAQS } from "./data";

const PAGE_TITLE =
  "AI Receptionist for Med Spas, Live in 14 Days | Codeket";
const PAGE_DESCRIPTION =
  "AI receptionist for med spas on WhatsApp, Instagram, and more. Answers every inquiry, books appointments, follows up, 24/7. Live in 14 days. Built by Codeket.";
const PAGE_URL = "https://codeket.com/ai-receptionist";
const PAGE_OG_IMAGE = "https://codeket.com/preview-image.jpg";

// JSON-LD structured data, helps Google, Bing, and LLM search surface the
// page accurately. Service schema describes the offer; FAQPage schema lets
// Google render the FAQ as rich results.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Receptionist for Med Spas",
  serviceType: "AI Customer Service Automation",
  provider: {
    "@type": "Organization",
    name: "Codeket",
    url: "https://codeket.com",
  },
  areaServed: "Worldwide",
  description: PAGE_DESCRIPTION,
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "1497",
    url: PAGE_URL,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((qa) => ({
    "@type": "Question",
    name: qa.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: qa.answer,
    },
  })),
};

const AIReceptionist = () => {
  return (
    <div className="bg-base-100 text-base-content">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={PAGE_OG_IMAGE} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={PAGE_OG_IMAGE} />

        {/* Structured data, Service offer + FAQ */}
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Hero />
      <ProblemStats />
      <Features />
      <HowItWorks />
      <DemoSection />
      {/* Trust BEFORE price, buyers decide trust before they decide cost. */}
      <WhyCodeket />
      <Pricing />
      <FAQ />
      <ContactForm />
    </div>
  );
};

export default AIReceptionist;
