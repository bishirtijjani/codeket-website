import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import CaseStudies from "./pages/CaseStudies";
import Consultation from "./pages/Consultation";
import Pricing from "./pages/Pricing";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CookiePolicy from "./components/CookiePolicy";
import ScrollToTop from "./components/Common/ScrollToTop";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const DEFAULT_THEME = "codeketlight";

function Layout() {
  // Must match the server-rendered value on first client render — DO NOT read
  // localStorage or prefers-color-scheme here. That goes in the effect below.
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [hydrated, setHydrated] = useState(false);

  // After hydration, resolve the user's actual preferred theme.
  useEffect(() => {
    const saved = localStorage.getItem("codeket-theme");
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("codeketdark");
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (hydrated) {
      localStorage.setItem("codeket-theme", theme);
    }
  }, [theme, hydrated]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "codeketdark" ? "codeketlight" : "codeketdark",
    );
  };

  return (
    <div className="relative">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <ScrollToTop />
      <Outlet />
      <Footer theme={theme} />
    </div>
  );
}

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "services", element: <Services /> },
      { path: "case-studies", element: <CaseStudies /> },
      { path: "consultation", element: <Consultation /> },
      { path: "pricing", element: <Pricing /> },
      { path: "terms-of-service", element: <TermsOfService /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "cookie-policy", element: <CookiePolicy /> },
      { path: "404", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default Layout;
