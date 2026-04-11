import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = ({ theme, toggleTheme }) => {
  const location = useLocation();

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-300/50 sticky top-0 z-[999]">
      <div className="navbar-start">
        {/* Mobile hamburger */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 border border-base-300 rounded-2xl w-56"
          >
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={
                    isActive(to)
                      ? "text-orange-700 font-semibold"
                      : "text-base-content"
                  }
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                to="/consultation"
                className="font-semibold text-white rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
                }}
              >
                Start a Project
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl">
          <img
            src={
              theme === "codeketdark"
                ? "./images/logo-white.png"
                : "./images/logo.png"
            }
            alt="codeket-logo"
            className="w-[130px] h-auto"
          />
        </Link>
      </div>

      {/* Desktop nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={
                  isActive(to)
                    ? "text-orange-700 font-semibold bg-orange-50 rounded-lg"
                    : "text-base-content/70 hover:text-base-content font-medium"
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side actions */}
      <div className="navbar-end gap-2">
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle hover:bg-base-200/50"
          aria-label="Toggle theme"
        >
          {theme === "codeketdark" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <Link
          to="/consultation"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
          }}
        >
          Start a Project
        </Link>
      </div>
    </div>
  );
};

export default Header;
