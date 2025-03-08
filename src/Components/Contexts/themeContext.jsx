import React, { createContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { themes } from "../Contexts/themes";
import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(
    storedTheme === "light" ? themes.light : themes.dark
  );

  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.dark : themes.light;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme === themes.light ? "light" : "dark");
  };

  const toggleIcon = theme === themes.light ? <FaSun /> : <FaMoon />;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, toggleIcon }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
