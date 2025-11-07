import React from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

const legals = [
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Terms of Service", link: "/terms-of-service" },
  { name: "Cookie Policy", link: "/cookie-policy" },
];

const socials = [
  {
    name: "LinkedIn",
    link: "https://linkedin.com/company/codeket",
    icon: <FaLinkedin className="text-xl" />,
  },
  {
    name: "Twitter/X",
    link: "https://x.com/codeketofficial",
    icon: <FaTwitter className="text-xl" />,
  },
];

const quickLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", to: "/about" },
      { name: "Services", to: "/services" },
      { name: "Blog", to: "#" },
      { name: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Case Studies", to: "/case-studies" },
      { name: "Help Center", to: "/contact" },
      { name: "Pricing", to: "/pricing" },
    ],
  },
];

const Footer = ({ theme }) => {
  return (
    <>
      <footer className="footer p-10 bg-neutral text-base-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-primary pt-16">
        <nav className="flex flex-col items-start">
          <Link to="/" className="link link-hover mb-4">
            <img
              src={
                theme === "codeketdark"
                  ? "./images/logo-white.png"
                  : "./images/logo.png"
              }
              className="w-[150px] h-auto mb-4"
              alt="Codeket Logo"
            />
          </Link>
          <p className="mb-6 max-w-md">
            Complex Challenges. Elegant Solutions. <br /> Limitless Potential.
          </p>
          <div className="grid grid-flow-col gap-4">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle hover:bg-primary/20 text-base-content/80"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </nav>

        {quickLinks.map((column, index) => (
          <nav key={index} className="flex flex-col items-start">
            <h6 className="footer-title text-lg font-bold text-primary mb-4">
              {column.title}
            </h6>
            {column.links.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="link link-hover text-base-content/80 hover:text-primary transition-colors mb-2"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        ))}

        <nav className="flex flex-col items-start">
          <h6 className="footer-title text-lg font-bold text-primary mb-4">
            Legal
          </h6>
          {legals.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="link link-hover text-base-content/80 hover:text-primary transition-colors mb-2"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col items-start">
          <h6 className="footer-title text-lg font-bold text-primary mb-4">
            Contact Us
          </h6>
          <a
            href="mailto:contact@codeket.com"
            className="text-base-content/80 flex items-center gap-2 mb-2"
          >
            <FaEnvelope className="text-primary" /> contact@codeket.com
          </a>
          <a
            href="tel:+2349068149540"
            className="text-base-content/80 flex items-center gap-2 mb-2"
          >
            <FaPhoneAlt className="text-primary" /> +234 906 814 9540
          </a>
          <p className="text-base-content/80 flex items-center gap-2">
            <FaClock className="text-primary" /> Mon - Fri: 9 AM - 5 PM
          </p>
        </nav>
      </footer>
      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Codeket
          </p>
        </aside>
      </div>
    </>
  );
};

export default Footer;
