import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fbf4ea",
        blush: "#f8cfd8",
        rose: "#e88ba1",
        sage: "#9dbc98",
        mint: "#dfeee0",
        ink: "#27211f",
        cocoa: "#6e4d43"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(80, 53, 45, 0.12)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;
