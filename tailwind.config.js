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
        },
      },
      dropShadow: {
        premium: "0 2px 8px rgba(0, 0, 0, 0.10)",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "2rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        codeketlight: {
          primary: "#0F4C81",        // Deep Operational Blue
          secondary: "#E5E7EB",      // Crisp border gray
          accent: "#0369A1",         // Slightly lighter operational blue for hovers
          neutral: "#4B5563",        // Secondary text
          "base-100": "#FFFFFF",     // Pure white (primary surface)
          "base-200": "#F3F4F6",     // Card / section surface
          "base-300": "#E5E7EB",     // Border / dividers
          "base-content": "#111827", // Near-black text
          info: "#1D4ED8",
          success: "#15803D",
          warning: "#B45309",
          error: "#B91C1C",
        },
      },
      {
        codeketdark: {
          primary: "#3B82F6",        // Lightened brand blue for dark bg visibility
          secondary: "#27272A",      // Zinc card surface
          accent: "#60A5FA",         // Hover/focus state
          neutral: "#71717A",        // Muted text
          "base-100": "#18181B",     // Zinc-900 background
          "base-200": "#27272A",     // Zinc-800 card surface
          "base-300": "#3F3F46",     // Zinc-700 borders
          "base-content": "#F4F4F5", // Off-white text
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
