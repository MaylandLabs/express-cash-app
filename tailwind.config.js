/** @type {import("tailwindcss").Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ex: {
          primary: "#055B72",
          secondary: "#7AC92A",
          heading: "#333333",
          body: "#666666",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        poppins_regular: ['Poppins_400Regular', 'sans-serif'],
        poppins_semibold: ["Poppins_600SemiBold", "sans-serif"],
        poppins_bold: ["Poppins_700Bold", "sans-serif"],
        poppins_medium: ["Poppins_500Medium", "sans-serif"],
      },
      keyframes: {
        rotateClockwise: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        rotateCounterClockwise: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-250%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        padelinkInput: {
          "0%": {
            transform: "scale(1)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "100%": {
            transform: "scale(1000)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
      },
      animation: {
        rotateClockwise: "rotateClockwise 2s infinite linear",
        rotateCounterClockwise: "rotateCounterClockwise 2s infinite linear",
        bounce: "bounce 1s ease-out infinite",
        padelinkInput: "padelinkInput 1s ease-in-out forwards",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
  ],
};