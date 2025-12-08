import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gemara: ["var(--font-gemara)", "serif"],
      },
      colors: {
        primary: {
          main: "#f59e0b",
          light: "#fbbf24",
          dark: "#d97706",
        },
        secondary: {
          main: "#2563eb",
          light: "#3b82f6",
          dark: "#1d4ed8",
        },
        dark: {
          DEFAULT: "#0f172a",
          medium: "#1e293b",
          light: "#334155",
        },
        muted: "#64748b",
      },
    },
  },
  plugins: [],
};

export default config;
