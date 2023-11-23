/** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./index.html"],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("daisyui")],
// };

export default {
  purge: ["./src/**/*.jsx"],
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "bumblebee", "forest"],
  },
};
