import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      maxWidth: ({ theme }) => theme("width"),
      maxHeight: ({ theme }) => theme("height"),
    },
  },
  plugins: [],
};

export default config;
