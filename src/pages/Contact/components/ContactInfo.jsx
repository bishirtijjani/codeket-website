import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="space-y-8" id="contact-info">
      <div className="flex items-start space-x-4">
        <div
          className="p-3 rounded-lg"
          style={{
            background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
          }}
        >
          <FaEnvelope className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-1">Email Us</h3>

          <a
            href="mailto:contact@codeket.com"
            className="text-primary hover:text-primary-focus transition-colors"
          >
            contact@codeket.com
          </a>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div
          className="p-3 rounded-lg"
          style={{
            background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
          }}
        >
          <FaPhoneAlt className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-1">Call Us</h3>
          <p className="text-base-content/80 mb-2">Main Office:</p>
          <a
            href="tel:+2349063503232"
            className="text-primary hover:text-primary-focus transition-colors"
          >
            +(234) 9063-503-232
          </a>
          <p className="text-base-content/80 mt-2 mb-2">
            Support Hotline (24/7)
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div
          className="p-3 rounded-lg"
          style={{
            background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
          }}
        >
          <FaClock className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-1">Business Hours</h3>
          <p className="text-base-content/80">
            Monday - Friday: 9AM - 6PM (Local Time)
          </p>
          <p className="text-base-content/80">
            Saturday: 10AM - 2PM (By Appointment)
          </p>
          <p className="text-base-content/80">Support Team: 24/7</p>
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
        <div className="flex space-x-4">
          <a
            href="https://linkedin.com/company/codeket"
            className="bg-base-200 hover:bg-orange-600 p-3 rounded-lg transition-colors group"
          >
            <FaLinkedin className="text-base-content/80 group-hover:text-white text-xl" />
          </a>
          <a
            href="https://twitter.com/codeketofficial"
            className="bg-base-200 hover:bg-orange-600 p-3 rounded-lg transition-colors group"
          >
            <FaTwitter className="text-base-content/80 group-hover:text-white text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
