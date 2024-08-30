// ThemeContext.js
import React, { createContext, useContext, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import darkTheme from "./darkTheme";
import lightTheme from "./lightTheme";

const ThemeContext = createContext();

export const ThemeProviderComponent = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");

  const theme = createTheme(themeMode === "dark" ? darkTheme : lightTheme);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
