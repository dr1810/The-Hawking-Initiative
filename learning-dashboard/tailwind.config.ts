import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1320px"
      }
    },
    extend: {
      colors: {
        background: "hsl(45 38% 96%)",
        foreground: "hsl(220 20% 18%)",
        card: "hsl(0 0% 100%)",
        "card-foreground": "hsl(220 20% 18%)",
        muted: "hsl(36 42% 92%)",
        "muted-foreground": "hsl(219 16% 36%)",
        border: "hsl(33 25% 82%)",
        primary: "hsl(151 40% 28%)",
        "primary-foreground": "hsl(0 0% 100%)",
        secondary: "hsl(208 67% 45%)",
        "secondary-foreground": "hsl(0 0% 100%)",
        accent: "hsl(36 100% 57%)",
        "accent-foreground": "hsl(220 20% 18%)",
        success: "hsl(145 55% 35%)",
        danger: "hsl(7 65% 43%)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.4rem",
        "3xl": "1.8rem"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "sans-serif"]
      },
      boxShadow: {
        card: "0 12px 24px -18px hsl(150 34% 23% / 0.3)",
        floating: "0 24px 44px -30px hsl(208 70% 35% / 0.3)"
      },
      keyframes: {
        "slide-fade": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "slide-fade": "slide-fade 500ms ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;
