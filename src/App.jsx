import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { PokemonDetails } from "./Pages/PokemonDetails";
import { createGlobalStyle } from "styled-components";
import { HeaderTitle } from "./Components/Header";
import { ThemeProvider } from "./Components/Contexts/themeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <GlobalStyled />
        <HeaderTitle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

const GlobalStyled = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Lato", sans-serif;
    text-decoration: none;
    color: ${({ theme }) => theme.color};
    transition: 0.3s;
  }
  ul{
    list-style: none;
  }
`;

export default App;
