/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        bg_color: '#259EE2',
        sub_bg_color: '#F6F1F1',
        btn_color: '#3C22D9',
        text_color: '#B0B0B0'
      },
    },
  },
  plugins: [],
}

