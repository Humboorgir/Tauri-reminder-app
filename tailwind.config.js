/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      animation: {
        modalJumpIn: "modalJumpIn 150ms ease-out",
      },
    },
  },
  plugins: [],
};
