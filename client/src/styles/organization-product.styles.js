import styled from "styled-components";
import { Container } from "react-bootstrap";

export const OrganizationContainerStyle = styled(Container)`
  margin-top: 8rem;
`;

export const OrganizationTableHeaderStyle = styled.tr`
  border-bottom: ${({ theme }) => `0.1rem solid ${theme.basic.dark}`};
`;

export const OrganizationProductIconHolder = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
`;
