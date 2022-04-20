import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#A2D2FF",
      light: "#BDE0FE",
    },
    background: {
      default: "#FDFFFC",
    },
  },

  typography: {
    fontFamily: [
      "Nunito", "-apple-system", "sans-serif"
    ].join(",")
  }
});

export default theme;
