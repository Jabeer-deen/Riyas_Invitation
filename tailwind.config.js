/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Deep Midnight Obsidian Royal Theme
        midnight: "#06000C",
        obsidian: "#0C0115",
        deep: "#12011F",
        royal: "#180228",
        velvet: "#220336",
        primary: "#D4AF37", // Primary gold
        lavender: "#EDE4F8", // Soft warm ivory-lavender
        gold: {
          DEFAULT: "#D4AF37",
          light: "#FDE68A",
          shimmer: "#FFF2A8",
          dark: "#B8860B",
        },
        cream: "#0A0113", // Dark velvet cream
        ink: "#F5EEDD", // Warm ivory text for high contrast reading
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Noto Sans Tamil"', "serif"],
        sans: ["Inter", '"Noto Sans Tamil"', "sans-serif"],
        tamil: ['"Noto Sans Tamil"', "sans-serif"],
        arabic: ["Amiri", "serif"],
      },
    },
  },
  plugins: [],
};
