/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        codeket: {
          bgBase: "#FFFFFF",
          bgCard: "#F3F4F6",
          bgBorder: "#E5E7EB",
          primary: "#0F4C81",
          textMain: "#111827",
          textSub: "#4B5563",
          orange: "#C2410C",
          orangeLight: "#EA580C",
          dark: "#0B1628",
        },
      },
      fontFamily: {
        display: ["'Montserrat'", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["'Roboto'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      dropShadow: {
        premium: "0 2px 8px rgba(0, 0, 0, 0.10)",
        orange: "0 4px 24px rgba(194, 65, 12, 0.25)",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "2rem",
      },
      backgroundImage: {
        "orange-gradient": "linear-gradient(135deg, #C2410C 0%, #EA580C 100%)",
        "navy-gradient": "linear-gradient(135deg, #0B1628 0%, #0F4C81 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        codeketlight: {
          primary: "#0F4C81", // Deep Navy Blue
          secondary: "#E5E7EB", // Crisp border gray
          accent: "#C2410C", // Burnt Orange
          neutral: "#4B5563", // Secondary text
          "base-100": "#FFFFFF", // Pure white
          "base-200": "#F3F4F6", // Card / section surface
          "base-300": "#E5E7EB", // Border / dividers
          "base-content": "#111827",
          info: "#1D4ED8",
          success: "#15803D",
          warning: "#F59E0B",
          error: "#B91C1C",
        },
      },
      {
        codeketdark: {
          primary: "#3B82F6", // Brand blue lightened for dark bg
          secondary: "#0F1E35", // Deep navy card surface
          accent: "#EA580C", // Burnt Orange — lighter on dark
          neutral: "#94A3B8", // Muted slate text
          "base-100": "#0B1628", // Deep navy background
          "base-200": "#0F1E35", // Slightly lighter navy card
          "base-300": "#1E3A5F", // Navy borders
          "base-content": "#F1F5F9",
          info: "#3B82F6",
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
    ],
    darkTheme: "codeketdark",
    lightTheme: "codeketlight",
  },
};
