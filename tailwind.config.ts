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
        // bg: "#161b33",
        bg: "#25283D",
        mWhite: "#FCFFFC",
        mRed: "#EF476F",
        mYellow: "#FFD166",
        mGreen: "#06D6A0",
        mViolet: "#9d4edd",
        // primary: "#96C5F7",
        // primary: "#48ACF0",
        primary: "#3F8EFC",
      },
    },
  },
  plugins: [],
};
export default config;
