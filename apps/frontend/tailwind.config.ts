// ============================================================
// FX - CONFIGURAÇÃO DO TAILWIND CSS
// ============================================================

import type { Config } from "tailwindcss";

const config: Config = {
  // ----------------------------------------------------------
  // TEMA ESCURO CONTROLADO PELA CLASSE .dark
  // ----------------------------------------------------------
  darkMode: "class",

  // ----------------------------------------------------------
  // ARQUIVOS QUE O TAILWIND DEVE ANALISAR
  // ----------------------------------------------------------
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // ----------------------------------------------------------
  // EXTENSÕES VISUAIS DO FX
  // ----------------------------------------------------------
  theme: {
    extend: {
      colors: {
        fx: {
          background: "#0f131a",
          surface: "#171c24",
          elevated: "#1d2430",
          border: "#2b3442",

          primary: "#3b82f6",
          primaryHover: "#2563eb",

          text: "#f4f6f8",
          muted: "#9ca6b5",
        },
      },
    },
  },

  plugins: [],
};

export default config;