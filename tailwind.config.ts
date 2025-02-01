import type { Config } from "tailwindcss";

const baseFontSize = 10;

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-yellow": "#FFDD00",
        "main-orange": "#FBB034",
        "light-orange": "#FEF1D4",
        "main-red": "#D00404",
        "dark-blue": "#313873",
        grey: {
          100: "#fff",
          200: "#F8F8F8",
          400: "#EDEDED",
          500: "#DADADA",
          600: "#C2C2C2",
          700: "#999999",
          800: "#9A9A9A",
          900: "#000000",
        },
      },
      borderRadius: {
        small: ".4rem",
      },
      boxShadow: {
        regular: "0px 0px 30px rgba(0, 0, 0, 0.03)",
        border: "0 0 1px 1px rgba(0,0,0,.2)",
      },
      zIndex: {
        negative: "-1",
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(20rem, 1fr))",
      },
      spacing: () => ({
        ...Array.from({ length: 96 }, (_, index) => index * 0.5)
          .filter((i) => i)
          .reduce(
            (acc, i) => ({ ...acc, [i]: `${i / (baseFontSize / 4)}rem` }),
            {}
          ),
      }),
      fontSize: {
        xs: [
          `${(16 * 0.75) / baseFontSize}rem` /* 12px */,
          {
            lineHeight: `${(16 * 1) / baseFontSize}rem` /* 16px */,
          },
        ],
        sm: [
          `${(16 * 0.875) / baseFontSize}rem` /* 14px */,
          {
            lineHeight: `${(16 * 1.25) / baseFontSize}rem` /* 20px */,
          },
        ],
        base: [
          `${(16 * 1) / baseFontSize}rem` /* 16px */,
          {
            lineHeight: `${(16 * 1.5) / baseFontSize}rem` /* 24px */,
          },
        ],
        lg: [
          `${(16 * 1.125) / baseFontSize}rem` /* 18px */,
          {
            lineHeight: `${(16 * 1.75) / baseFontSize}rem` /* 28px */,
          },
        ],
        xl: [
          `${(16 * 1.25) / baseFontSize}rem` /* 20px */,
          {
            lineHeight: `${(16 * 1.75) / baseFontSize}rem` /* 28px */,
          },
        ],
        "2xl": [
          `${(16 * 1.5) / baseFontSize}rem` /* 24px */,
          {
            lineHeight: `${(16 * 2) / baseFontSize}rem` /* 32px */,
          },
        ],
        "3xl": [
          `${(16 * 1.875) / baseFontSize}rem` /* 30px */,
          {
            lineHeight: `${(16 * 2.25) / baseFontSize}rem` /* 36px */,
          },
        ],
        "4xl": [
          `${(16 * 2.25) / baseFontSize}rem` /* 36px */,
          {
            lineHeight: `${(16 * 2.5) / baseFontSize}rem` /* 40px */,
          },
        ],
        "5xl": [
          `${(16 * 3) / baseFontSize}rem` /* 48px */,
          {
            lineHeight: `${(16 * 1) / baseFontSize}rem`,
          },
        ],
        "6xl": [
          `${(16 * 3.75) / baseFontSize}rem` /* 60px */,
          {
            lineHeight: `${(16 * 1) / baseFontSize}rem`,
          },
        ],
        "7xl": [
          `${(16 * 4.5) / baseFontSize}rem` /* 72px */,
          {
            lineHeight: `${(16 * 1) / baseFontSize}rem`,
          },
        ],
        "8xl": [
          `${(16 * 6) / baseFontSize}rem` /* 96px */,
          {
            lineHeight: `${(16 * 1) / baseFontSize}rem`,
          },
        ],
        "9xl": [
          `${(16 * 8) / baseFontSize}rem` /* 128px */,
          {
            lineHeight: `${(16 * 1) / baseFontSize}rem`,
          },
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
