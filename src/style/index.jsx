import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
        },
      },
    },
  },
  palette: {
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
    primary: {
      main: "#1A7CFF", // button normal
      // light: '#F45452', // ????
      light: "#8cbdff",
      dark: "#0049A9", // button clicked
    },
    warning: {
      main: "#F45452",
    },
    grey: {
      50: "#F8F8F8",
      100: "#EEEEEE",
      200: "#DDDDDD",
      300: "#BBBBBB",
      400: "#777777",
      500: "#222222",
    },
  },
  shape: {
    borderRadius: 3, // default
    headerMarginTop: 5,
  },
  typography: {
    fontWeight: "700",
    h1: {
      fontSize: "3rem",
      fontWeight: "700",
    },
    subtitle1: {
      fontSize: "2rem",
      fontWeight: "400",
    },
    subtitle2: {
      fontSize: "2.3rem",
      fontWeight: "600",
    },
    description: {
      fontSize: "1.2rem",
    },
    button: {
      fontFamily: "Noto Sans CJK KR",
    },
    bigButton: {
      fontSize: "1.2rem",
    },
  },

  indicator: {
    backgroundColor: "red",
  },
});

export default theme;
