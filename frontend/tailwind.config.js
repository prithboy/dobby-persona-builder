/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f5f6fa",
        card: "#eaeaea",
        text: "#1a1a1a",
      },
    },
  },
  plugins: [],
};
