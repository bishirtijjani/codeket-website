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
        <div className="bg-primary p-3 rounded-lg">
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
        <div className="bg-accent p-3 rounded-lg">
          <FaPhoneAlt className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-1">Call Us</h3>
          <p className="text-base-content/80 mb-2">Main Office:</p>
          <a
            href="tel:+2349068149540"
            className="text-primary hover:text-primary-focus transition-colors"
          >
            +(234) 9068-149-540
          </a>
          <p className="text-base-content/80 mt-2 mb-2">Support Hotline (24/7)</p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div className="bg-success p-3 rounded-lg">
          <FaClock className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-1">Business Hours</h3>
          <p className="text-base-content/80">
            Monday - Friday: 9AM - 6PM (Local Time)
          </p>
          <p className="text-base-content/80">Saturday: 10AM - 2PM (By Appointment)</p>
          <p className="text-base-content/80">Support Team: 24/7</p>
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
        <div className="flex space-x-4">
          <a
            href="https://linkedin.com/company/codeket"
            className="bg-base-200 hover:bg-primary p-3 rounded-lg transition-colors"
          >
            <FaLinkedin className="text-base-content/80 text-xl" />
          </a>
          <a
            href="https://twitter.com/codeketofficial"
            className="bg-base-200 hover:bg-primary-focus p-3 rounded-lg transition-colors"
          >
            <FaTwitter className="text-base-content/80 text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
