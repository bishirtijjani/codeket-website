import React from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaLinkedin,
  FaTwitter,
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
    icon: <FaLinkedin className="text-lg" />,
  },
  {
    name: "Twitter/X",
    link: "https://x.com/codeketofficial",
    icon: <FaTwitter className="text-lg" />,
  },
];

const quickLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", to: "/about" },
      { name: "Services", to: "/services" },
      { name: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Case Studies", to: "/case-studies" },
      { name: "Pricing", to: "/pricing" },
      { name: "Help Center", to: "/contact" },
    ],
  },
];

const Footer = ({ theme }) => {
  return (
    <footer className="bg-[#0B1628] text-slate-300">
      {/* CTA strip */}
      <div className="border-b border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white text-2xl font-bold leading-tight">
              Ready to build something great?
            </p>
            <p className="text-slate-400 mt-1">
              Let's turn your idea into production-ready software.
            </p>
          </div>
          <Link
            to="/consultation"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-base whitespace-nowrap transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
            }}
          >
            Start a Project →
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="flex flex-col">
          <Link to="/" className="mb-5">
            <img
              src="./images/logo-white.png"
              className="w-[140px] h-auto"
              alt="Codeket Logo"
            />
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Complex Challenges. Elegant Solutions.
            <br />
            Limitless Potential.
          </p>
          <div className="flex gap-3">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/15 text-slate-400 hover:text-orange-400 hover:border-orange-600/40 transition-all duration-200"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick link columns */}
        {quickLinks.map((column, index) => (
          <nav key={index} className="flex flex-col">
            <h6 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
              {column.title}
            </h6>
            {column.links.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="text-slate-400 hover:text-orange-400 transition-colors mb-2.5 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        ))}

        {/* Contact column */}
        <nav className="flex flex-col">
          <h6 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
            Contact
          </h6>
          <a
            href="mailto:contact@codeket.com"
            className="text-slate-400 hover:text-orange-400 flex items-center gap-2 mb-3 text-sm transition-colors"
          >
            <FaEnvelope className="text-orange-600 flex-shrink-0" />
            contact@codeket.com
          </a>
          <a
            href="tel:+2349068149540"
            className="text-slate-400 hover:text-orange-400 flex items-center gap-2 mb-3 text-sm transition-colors"
          >
            <FaPhoneAlt className="text-orange-600 flex-shrink-0" />
            +234 906 814 9540
          </a>
          <p className="text-slate-400 flex items-center gap-2 text-sm">
            <FaClock className="text-orange-600 flex-shrink-0" />
            Mon – Fri: 9 AM – 5 PM
          </p>
          <div className="mt-6 border-t border-white/10 pt-5">
            <h6 className="text-white font-semibold mb-3 text-sm tracking-wide uppercase">
              Legal
            </h6>
            {legals.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="block text-slate-400 hover:text-orange-400 transition-colors mb-2 text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Codeket. All rights reserved.</p>
          <p>Built with precision. Delivered with care.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
