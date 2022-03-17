import styled from "styled-components";

export const SideBarHolderStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #e9ecef;
  border: 0.2rem solid #e9ecef;
  padding: 2rem 0.5rem 0rem 0.6rem;
`;

export const SideBarButtomButtonStyle = styled.div`
  margin-top: 45vh;
`;

export const SideBarLinkStyle = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => `${theme.basic.bright}`};
  height: ${({ width }) => (width < 575 ? "100%" : "4rem")};
  padding-left: ${({ width }) => (width > 1100 ? "2rem" : "")};
  justify-content: ${({ width }) => (width < 1100 ? "center" : "")};
  background-color: ${({ theme, pressed }) =>
    pressed ? `${theme.primary}99` : theme.secondary};
  &:hover {
    text-align: center;
    background-color: ${({ theme }) => `${theme.primary}66`};
    border-bottom: ${({ width, theme }) =>
      width < 575 && `0.5rem solid ${theme.basic.bright}66`};
  }
`;

export const LogoTitleStyle = styled.div`
  color: ${({ theme }) => theme.basic.bright};
  font-size: 2rem;
`;

export const LogoSubtitleStyle = styled.div`
  color: ${({ theme }) => theme.basic.bright};
  margin-left: 0.5rem;
  margin-bottom: 1.2rem;
`;

export const SideBarLinkHolder = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  padding-top: ${({ width }) => (width > 575 ? "3rem" : "0")};
  height: ${({ width }) => (width > 575 ? "90.9vh" : "10vh")};
  display: ${({ width }) => width < 575 && "flex"};
  flex-direction: ${({ width }) => width < 575 && "row"};
  justify-content: ${({ width }) => width < 575 && "space-between"};
`;

// import styled from "styled-components";

// export const SideBarLinkStyle = styled.div`
//   width: 100%;
//   display: flex;
//   cursor: pointer;
//   font-size: 1rem;
//   transition: 0.3s;
//   flex-direction: row;
//   align-items: center;
//   color: ${({ theme }) => `${theme.basic.bright}`};
//   height: ${({ width }) => (width < 575 ? "100%" : "4rem")};
//   padding-left: ${({ width }) => (width > 1100 ? "2rem" : "")};
//   justify-content: ${({ width }) => (width < 1100 ? "center" : "")};
//   background-color: ${({ theme, pressed }) =>
//     pressed ? `${theme.primary}99` : theme.secondary};
//   &:hover {
//     text-align: center;
//     background-color: ${({ theme }) => `${theme.primary}66`};
//     border-bottom: ${({ width, theme }) =>
//       width < 575 && `0.5rem solid ${theme.basic.bright}66`};
//   }
// `;

// export const SideBarLogoHolderStyle = styled.div`
//   height: 6rem;
//   display: flex;
//   cursor: pointer;
//   align-items: center;
//   flex-direction: row;
//   justify-content: center;
//   background-color: ${({ theme }) => theme.primary};
// `;

// export const LogoTitleStyle = styled.div`
//   color: ${({ theme }) => theme.basic.bright};
//   font-size: 2rem;
// `;

// export const LogoSubtitleStyle = styled.div`
//   color: ${({ theme }) => theme.basic.bright};
//   margin-left: 0.5rem;
//   margin-bottom: 1.2rem;
// `;

// export const SideBarLinkHolder = styled.div`
//   background-color: ${({ theme }) => theme.secondary};
//   padding-top: ${({ width }) => (width > 575 ? "3rem" : "0")};
//   height: ${({ width }) => (width > 575 ? "90.9vh" : "10vh")};
//   display: ${({ width }) => width < 575 && "flex"};
//   flex-direction: ${({ width }) => width < 575 && "row"};
//   justify-content: ${({ width }) => width < 575 && "space-between"};
// `;
