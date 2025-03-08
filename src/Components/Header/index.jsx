import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/themeContext";

export const HeaderTitle = () => {
  const { toggleTheme, toggleIcon } = useContext(ThemeContext);
  return (
    <BgHeader>
      <Header>
        <Img src="./src/images/pocketcards-logo.png" alt="logo" />
        <h1>
          <i>Pocket Cards</i>
        </h1>
        <Button onClick={toggleTheme}>{toggleIcon} Change Theme</Button>
      </Header>
    </BgHeader>
  );
};
const BgHeader = styled.div`
  height: 150px;
  background: ${({ theme }) => theme.bgmain};
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bgheader};
  width: 100%;
  padding: 20px;
  gap: 30px;
  border: 4px solid ${({ theme }) => theme.color};
  border-radius: 20px;
  & h1 {
    font-size: 40px;
    font-weight: 900;
  }
  @media (max-width: 710px) {
    flex-direction: column;
  }
`;
const Img = styled.img`
  width: 160px;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 200px;
  height: 50px;
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.bgbutton};
  border: none;
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.color};
  &:hover {
    scale: 1.1;
  }
`;
