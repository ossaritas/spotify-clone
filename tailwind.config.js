module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        MyFont: ["Circular", "serif"], // Spotify font
        nunito: ["nunito", "sans-serif"],
      },
    },
    gridTemplateColumns: {
      "fill-c": "repeat(auto-fill, minmax(170px, 1fr))",
    },
  },
  plugins: [],
};
