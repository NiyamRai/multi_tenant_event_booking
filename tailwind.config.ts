import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-max": "#FFA902",
        "primary-mid": "#FFA902B2",
        "primary-min": "#FFA90266",
        "text-main": "#404040",
        "text-secondary": "#868383",
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
