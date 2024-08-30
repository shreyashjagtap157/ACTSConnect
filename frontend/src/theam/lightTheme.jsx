import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light", // This sets the theme to light mode
    primary: {
      main: "rgb(88,199,250)", // Customize the primary color
    },
    secondary: {
      main: "#5A20CB", // Customize the secondary color
    },
    background: {
      default: "#f5f5f5", // Background color for the body
      paper: "#ffffff", // Background color for paper components
    },
    text: {
      primary: "#111111", // Primary text color
      secondary: "#555555", // Secondary text color
    },
  },
});

export default lightTheme;
