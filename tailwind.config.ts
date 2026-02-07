import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        subtle: "var(--subtle)",
        contrast: "var(--contrast)",
        // Ash white theme palette
        ash: {
          50: '#FAFAFA',
          100: '#F8F8F8',  // Primary ash white
          200: '#E8E8E8',
          300: '#D8D8D8',
          400: '#C8C8C8',
          500: '#A8A8A8',
          600: '#888888',
          700: '#686868',
          800: '#484848',
          900: '#2a2a2a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
