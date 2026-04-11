import React from "react";
import { useScroll, useTransform } from "framer-motion";
import HeroSection from "./components/HeroSection";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import CallToAction from "../../components/Common/CallToAction";
import FAQSection from "./components/FAQSection";

const Contact = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const faqs = [
    {
      question: "What information should I provide in my initial inquiry?",
      answer:
        "To help us respond effectively to your inquiry, please include details about your project scope, timeline, budget expectations, and any specific technical requirements or challenges you're facing.",
    },
    {
      question: "How quickly can I expect a response?",
      answer:
        "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please indicate this in your message subject line.",
    },
    {
      question: "Do you offer consultations before committing to a project?",
      answer:
        "Yes, we offer free initial consultations to discuss your project needs and determine if we're the right fit for your requirements. This can be conducted via video call, phone, or in person at one of our offices.",
    },
    {
      question: "What is your typical project timeline?",
      answer:
        "Project timelines vary based on scope and complexity. After our initial consultation, we'll provide a detailed project plan with milestones and expected delivery dates. We pride ourselves on transparent communication throughout the process.",
    },
    {
      question: "Do you work with clients internationally?",
      answer:
        "Absolutely! With offices in North America, Asia, and Europe, we serve clients globally. Our team is experienced in working across time zones and can adapt to your communication preferences.",
    },
  ];

  return (
    <div className="bg-base-100 text-base-content ">
      <HeroSection y={y} />
      <div className="max-w-7xl mx-auto px-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <ContactInfo />
          <ContactForm />
        </div>
        <FAQSection faqs={faqs} />
        <CallToAction />
      </div>
    </div>
  );
};

export default Contact;
