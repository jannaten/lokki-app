import { Col } from "react-bootstrap";
import styled from "styled-components";

export const SideBarColHolderStyle = styled(Col)`
  width: ${({ width }) => width > 575 && "13vw"};
  position: ${({ width }) => width > 575 && "fixed"};
  margin-top: ${({ width }) => width > 575 && "3.5rem"};
  z-index: 6;
`;

export const TableColHolderStyle = styled(Col)`
  width: 87vw;
  margin-left: auto;
  margin-top: 5.5rem;
  padding-left: 2rem;
`;
