import styled from "styled-components";
import { Button, InputGroup } from "react-bootstrap";

export const OverLayTriggerButtonStyle = styled(Button)`
  border: 0;
  border-radius: 0;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.basic.bright};
  background-color: ${({ theme }) => theme.secondary};
`;

export const EditButtonStyle = styled(Button)`
  border: none;
  display: flex;
  border-radius: 0;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  color: ${({ theme }) => theme.basic.bright};
  background-color: ${({ theme }) => theme.secondary};
`;

export const AddButtonStyle = styled(Button)`
    border: 0;
    border-radius: 0;
    color: ${({ theme }) => theme.basic.bright}
    background-color: ${({ theme }) => theme.primary}
`;

export const InputGroupTextStyle = styled(InputGroup.Text)`
  color: ${({ theme }) => theme.basic.bright};
  background-color: ${({ theme }) => theme.primary};
`;

export const SuccessToastStyle = (theme) => {
  return {
    width: "auto",
    display: "grid",
    transition: "1s",
    borderRadius: "0px",
    color: `${theme.secondary}`,
    transform: "translate(400px)",
    gridTemplateColumns: "1.2fr 6fr 0.5fr",
    backgroundColor: `${theme.basic.light}`,
    borderLeft: `0.3rem solid ${theme.primary}`,
  };
};

export const ErrorToastStyle = {
  display: "grid",
  transition: "1s",
  borderRadius: "0px",
  backgroundColor: "#ffffff",
  transform: "translate(400px)",
  borderLeft: "0.3rem solid #ff355b",
  gridTemplateColumns: "1.2fr 6fr 0.5fr",
};
