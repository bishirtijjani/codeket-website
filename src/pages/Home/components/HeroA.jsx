import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";

/**
 * HERO A — "Split Hero with Inline Form"
 *
 * Left: headline + subtext + phone link
 * Right: compact inline contact form (name, email, message, submit)
 *
 * The form IS the CTA. No extra clicks, no separate page required.
 */

const HeroA = () => {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      subject: "Hero Quick Quote",
      message: form.message.value,
    };

    try {
      await emailjs.send(
        "service_iwxa8rc",
        "template_rwyciy9",
        formData,
        "IUJbFrZ9oGYqVff3D",
      );
      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-base-100">
      {/* Subtle background accent */}
      <div
        className="absolute top-0 right-0 w-[60%] h-full opacity-[0.03]"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, #0F4C81 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-base-content mb-6">
            Smart Software
            <br />
            <span className="text-primary">for Growing</span>{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Businesses.
            </span>
          </h1>

          <p className="text-base-content/60 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Codeket builds modern, intuitive tools that power real growth. From
            custom enterprise solutions to SaaS products, AI-driven apps, and
            automation systems, we deliver software that works fast, scales
            effortlessly, and stays easy to use.
          </p>
        </motion.div>

        {/* Right — inline form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <div className="bg-base-200/60 backdrop-blur-sm border border-base-300/60 rounded-2xl p-8 md:p-10 shadow-xl">
            <p className="text-base-content/50 text-sm mb-8">
              we respond within 5 Minutes.
            </p>
            {/* Quick contact links */}
            <div className="flex items-center gap-4 mb-6">
              <a
                href="mailto:contact@codeket.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-base-300 bg-base-100 hover:border-primary/40 hover:shadow-sm transition-all text-sm text-base-content/70 hover:text-base-content"
              >
                <img src="/images/Gmail.svg" alt="Gmail" className="w-5 h-5" />
                Email Us
              </a>
              <a
                href="https://wa.me/2349063503232"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-base-300 bg-base-100 hover:border-green-500/40 hover:shadow-sm transition-all text-sm text-base-content/70 hover:text-base-content"
              >
                <img
                  src="/images/WhatsApp.svg"
                  alt="WhatsApp"
                  className="w-5 h-5"
                />
                Chat on WhatsApp
              </a>
            </div>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-base-300"></div>
              <span className="text-xs font-medium tracking-wider text-base-content/40">
                Or Send Us A Message Directly
              </span>
              <div className="flex-1 h-px bg-base-300"></div>
            </div>

            <h2 className="font-display text-2xl font-bold text-base-content mb-1">
              Get a Free Quote
            </h2>
            <p className="text-base-content/50 text-sm mb-8">
              Tell us what you need.
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="font-semibold text-base-content text-lg">
                  Thanks! We'll be in touch soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 text-base-content placeholder:text-base-content/40 focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 text-base-content placeholder:text-base-content/40 focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
                <textarea
                  name="message"
                  required
                  rows="3"
                  placeholder="Briefly describe your project..."
                  className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 text-base-content placeholder:text-base-content/40 focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
                {error && (
                  <p className="text-red-500 text-xs text-center mt-2">
                    Something went wrong. Please try again or use WhatsApp/email
                    above.
                  </p>
                )}
              </form>
            )}

            <p className="text-xs text-base-content/30 mt-4 text-center">
              Or{" "}
              <Link to="/contact" className="underline hover:text-primary">
                visit our full contact page
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroA;
