import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        content: "1200px",
      },
      spacing: {
        gutter: "24px",
        section: "120px",
      },
      boxShadow: {
        /** DESIGN.md — tonal lift, ~15% opacity diffuse */
        elevated: "0 12px 32px -8px hsl(174 14% 11% / 0.12)",
        soft: "0 4px 20px hsl(174 14% 11% / 0.07)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        chip: {
          DEFAULT: "hsl(var(--chip))",
          foreground: "hsl(var(--chip-foreground))",
        },
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        /** Playfair headline scale — DESIGN.md */
        "display-xl": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-2xl": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["2.5rem", { lineHeight: "1.2", fontWeight: "600" }],
        "headline-md": ["1.75rem", { lineHeight: "1.3", fontWeight: "600" }],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
