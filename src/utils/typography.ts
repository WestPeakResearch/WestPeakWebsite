import Typography from "typography"

const typography = new Typography({
  googleFonts: [{
    name: "Inter",
    styles: ["400", "500", "600", "700", "800"],
  }],
  headerFontFamily: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto",
  "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  "sans-serif"],
  bodyFontFamily: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto",
  "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  "sans-serif"],
})

export default typography
