import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ecosystem-red": "#c41e3a",
        "venda-gold": "#c9a227",
        "venda-cream": "#f5f0e6",
        "venda-charcoal": "#1a1a1a",
        "venda-dark": "#0d0d0d",
      },
    },
  },
  plugins: [],
};

export default config;
