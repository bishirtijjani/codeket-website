import React, {useState} from "react";
import emailjs from "@emailjs/browser";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    services: [],
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    isError: false,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const serviceOptions = [
    "Custom Software Development",
    "AI & Machine Learning",
    "Cloud Infrastructure",
    "Mobile App Development",
    "UI/UX Design",
    "DevOps & Automation",
    "Cybersecurity",
    "Blockchain Solutions",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleCheckboxChange = (service) => {
    setFormData((prevData) => {
      const updatedServices = prevData.services.includes(service)
        ? prevData.services.filter((s) => s !== service)
        : [...prevData.services, service];

      return {
        ...prevData,
        services: updatedServices,
      };
    });
  };

  // Client-side validation before submission
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email";
      }
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_iwxa8rc",
        "template_rwyciy9",
        formData,
        "IUJbFrZ9oGYqVff3D"
      );

      // Successfully sent
      setFormStatus({
        submitted: true,
        isError: false,
        message: "Thanks for your message! We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        services: [],
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setFormStatus({
        submitted: true,
        isError: true,
        message:
          error.message || "Unable to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormStatus({
      submitted: false,
      isError: false,
      message: "",
    });
    setFormErrors({});
  };

  return (
    <div
      className="bg-neutral rounded-2xl p-8 border border-neutral-focus shadow-xl relative overflow-hidden"
      id="contact-form"
    >


      <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>

      {formStatus.submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${
            formStatus.isError
              ? "bg-error/30 border-error text-error-content"
              : "bg-success/30 border-success text-success-content"
          } border rounded-lg p-6 text-center`}
        >
          {formStatus.isError ? (
            <FaExclamationTriangle className="text-error text-5xl mx-auto mb-4" />
          ) : (
            <FaCheckCircle className="text-success text-5xl mx-auto mb-4" />
          )}
          <h3 className="text-2xl font-semibold mb-2">
            {formStatus.isError ? "Error" : "Message Sent!"}
          </h3>
          <p>{formStatus.message}</p>
          {formStatus.isError && (
            <button
              onClick={resetForm}
              className="mt-4 px-6 py-2 bg-error text-white rounded-lg hover:bg-error-focus transition-colors"
            >
              Try Again
            </button>
          )}
          {!formStatus.isError && (
            <button
              onClick={resetForm}
              className="mt-4 px-6 py-2 bg-success text-white rounded-lg hover:bg-success-focus transition-colors"
            >
              Send Another Message
            </button>
          )}
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block  mb-2">
                Your Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-neutral-focus text-primary border ${
                  formErrors.name ? "border-error" : "border-primary"
                } rounded-lg focus:outline-none focus:border-primary transition-colors`}
                placeholder="John Doe"
              />
              {formErrors.name && (
                <p className="text-error text-sm mt-1">{formErrors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block  mb-2">
                Email Address <span className="text-error">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-neutral-focus text-primary border ${
                  formErrors.email ? "border-error" : "border-primary"
                } rounded-lg focus:outline-none focus:border-primary transition-colors`}
                placeholder="john@example.com"
              />
              {formErrors.email && (
                <p className="text-error text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="company" className="block  mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-neutral-focus text-primary border border-primary rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="Your Company"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block  mb-2">
                Subject <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-neutral-focus text-primary border ${
                  formErrors.subject ? "border-error" : "border-primary"
                } rounded-lg focus:outline-none focus:border-primary transition-colors`}
                placeholder="Project Inquiry"
              />
              {formErrors.subject && (
                <p className="text-error text-sm mt-1">
                  {formErrors.subject}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block  mb-2">
              Services You're Interested In
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {serviceOptions.map((service, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`service-${index}`}
                    checked={formData.services.includes(service)}
                    onChange={() => handleCheckboxChange(service)}
                    className="w-4 h-4 mr-2 accent-primary"
                  />
                  <label
                    htmlFor={`service-${index}`}
                    className=" text-sm"
                  >
                    {service}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block  mb-2">
              Your Message <span className="text-error">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-neutral-focus text-primary border ${
                formErrors.message ? "border-error" : "border-primary"
              } rounded-lg focus:outline-none focus:border-primary transition-colors resize-none`}
              placeholder="Tell us about your project or inquiry..."
            ></textarea>
            {formErrors.message && (
              <p className="text-error text-sm mt-1">{formErrors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 bg-primary text-white font-semibold rounded-lg transition-all duration-300 shadow-md ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-accent"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-base-content"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
