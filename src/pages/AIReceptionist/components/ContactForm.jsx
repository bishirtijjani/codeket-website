import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";

/** Inline alternative-CTA form. Mirrors the emailjs pattern from HeroA. */
const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      subject: "AI Receptionist Inquiry",
      message: `Spa: ${form.spaName.value}\n\n${form.message.value}`,
    };

    try {
      await emailjs.send(
        "service_iwxa8rc",
        "template_rwyciy9",
        payload,
        "IUJbFrZ9oGYqVff3D",
      );
      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-24 px-6 bg-base-200">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-base-content mb-3">
            Prefer to send a message?
          </h2>
          <p className="text-base md:text-lg text-base-content/70">
            Tell us about your spa. We respond within 5 minutes during business hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-base-100 border border-base-300 rounded-2xl p-6 md:p-10 shadow-sm"
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-semibold text-base-content text-lg">
                Thanks, we'll be in touch shortly.
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
              <input
                type="text"
                name="spaName"
                required
                placeholder="Spa name"
                className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 text-base-content placeholder:text-base-content/40 focus:outline-none focus:border-primary transition-colors text-sm"
              />
              <textarea
                name="message"
                required
                rows="4"
                placeholder="What's the biggest gap in how your front desk handles inquiries today?"
                className="w-full px-4 py-3 rounded-lg bg-base-100 border border-base-300 text-base-content placeholder:text-base-content/40 focus:outline-none focus:border-primary transition-colors text-sm resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{
                  background:
                    "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                }}
              >
                {isSubmitting ? "Sending..." : "Send message"}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
              {error && (
                <p className="text-red-500 text-xs text-center mt-2">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
