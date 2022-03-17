import styled from "styled-components";
import { Navbar } from "react-bootstrap";

export const NavBarHolderStyle = styled(Navbar)`
  z-index: 7;
  width: 100%;
  position: fixed;
  margin-top: 0rem;
  background-color: ${({ theme }) => theme.primary};
`;

export const ThemePalleteStyle = styled.div`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  border-radius: 10%;
  margin-top: 0.3rem;
  margin-left: 0.5rem;
  margin-right: 0.3rem;
  border: 0.25rem solid #ffffff7f;
  box-shadow: 0rem 0rem 0.25rem #ffffff7f;
  background-color: ${({ theme, themeColor, bright }) =>
    bright ? themeColor : theme.primary};
`;
