import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // This sets the theme to dark mode
    primary: {
      main: "rgb(88,199,250)", // Customize the primary color
    },
    secondary: {
      main: "#5A20CB", // Customize the secondary color
    },
    background: {
      default: "#212534", // Background color for the body
      paper: "#212534", // Background color for paper components
    },
    text: {
      primary: "#ffffff", // Primary text color
      secondary: "#bbbbbb", // Secondary text color
    },
  },
});

export default darkTheme;
