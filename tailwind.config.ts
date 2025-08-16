import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-primary": {
          50: "var(--brand-primary-50)",
          100: "var(--brand-primary-100)",
          200: "var(--brand-primary-200)",
          300: "var(--brand-primary-300)",
          400: "var(--brand-primary-400)",
          500: "var(--brand-primary-500)",
          600: "var(--brand-primary-600)",
          700: "var(--brand-primary-700)",
          800: "var(--brand-primary-800)",
          900: "var(--brand-primary-900)",
        },
        "brand-secondary": {
          50: "var(--brand-secondary-50)",
          100: "var(--brand-secondary-100)",
          200: "var(--brand-secondary-200)",
          300: "var(--brand-secondary-300)",
          400: "var(--brand-secondary-400)",
          500: "var(--brand-secondary-500)",
          600: "var(--brand-secondary-600)",
          700: "var(--brand-secondary-700)",
          800: "var(--brand-secondary-800)",
          900: "var(--brand-secondary-900)",
        },
        "brand-items": {
          50: "var(--brand-items-50)",
          100: "var(--brand-items-100)",
          200: "var(--brand-items-200)",
          300: "var(--brand-items-300)",
          400: "var(--brand-items-400)",
          500: "var(--brand-items-500)",
          600: "var(--brand-items-600)",
          700: "var(--brand-items-700)",
          800: "var(--brand-items-800)",
          900: "var(--brand-items-900)",
        },
      },
      borderRadius: {
        10: "0.625rem",
        14: "0.875rem",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(-4%)" },
          "100%": { transform: "translateX(-201%)" },
        },
      },

      animation: {
        scroll: "scroll 10s linear infinite",
      },
      screens: {
        xxs: "320px",
        xs: "480px",
        mxl: "1442px",
      },
      letterSpacing: {
        sm28: "0.28px",
        md32: "0.32px",
        lg36: "0.36px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
} satisfies Config;
