/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        cart: "0 0 15px 5px #efefef",
        chat: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    // ...
  ],
};
