import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#242424",
    },
    text: {
      primary: "#fffafa",
    },
  },
  typography: {
    fontFamily: "monospace",
    button: {
      fontWeight: "bold",
      letterSpacing: ".1rem",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fffafa",
    },
    text: {
      primary: "#242424",
    },
  },
  typography: {
    fontFamily: "monospace",
    button: {
      fontWeight: "bold",
      letterSpacing: ".1rem",
    },
  },
});
