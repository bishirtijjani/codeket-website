import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import CaseStudies from "./pages/CaseStudies";
import Consultation from "./pages/Consultation";
import Pricing from "./pages/Pricing";
import AIReceptionist from "./pages/AIReceptionist";
import TermsOfService from "./components/TermsOfService";
// Files renamed from PrivacyPolicy/CookiePolicy so Brave Shields and other
// tracker blockers don't block the .jsx asset URL (those filenames match
// common cookie-consent / privacy-popup filter rules, which crashes the
// bundle and blanks every page).
import LegalPrivacy from "./components/LegalPrivacy";
import LegalCookies from "./components/LegalCookies";
import ScrollToTop from "./components/Common/ScrollToTop";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const DEFAULT_THEME = "codeketlight";

function Layout() {
  // Must match the server-rendered value on first client render, DO NOT read
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
      { path: "ai-receptionist", element: <AIReceptionist /> },
      // Old URL kept alive so existing links / shares don't 404.
      {
        path: "whatsapp-receptionist",
        element: <Navigate to="/ai-receptionist" replace />,
      },
      { path: "terms-of-service", element: <TermsOfService /> },
      { path: "privacy-policy", element: <LegalPrivacy /> },
      { path: "cookie-policy", element: <LegalCookies /> },
      { path: "404", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default Layout;
