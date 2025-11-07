/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        codeket: {
          deepBlue: "#1E2A38",
          electricBlue: "#007AFF",
          midnightNavy: "#0A182E",
          neonCyan: "#00E6E6",
          ai: "#1B1E7A",
          silver: "#E0E0E0",
        },
      },
      dropShadow: {
        premium: "0 10px 30px rgba(0, 122, 255, 0.25)",
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
        codeketdark: {
          primary: "#007AFF", // Electric Blue
          secondary: "#00E6E6", // Neon Cyan
          accent: "#1B1E7A", // AI Purple
          neutral: "#0A182E", // Midnight Navy
          "base-100": "#0F172A", // Dark Surface
          "base-content": "#E0E0E0", // Light Text
          info: "#8AB4F8",
          success: "#34D399",
          warning: "#FBBF24",
          error: "#F87171",
        },
      },
      {
        codeketlight: {
          primary: "#1E2A38", // Deep Blue
          secondary: "#00E6E6", // Neon Cyan
          accent: "#1B1E7A", // AI Purple
          neutral: "#f8fafc", // Light Neutral
          "base-100": "#ffffff",
          "base-content": "#1E2A38",
          info: "#3B82F6",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
    ],
    darkTheme: "codeketdark",
  },
};
