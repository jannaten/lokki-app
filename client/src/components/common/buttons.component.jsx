import { Button, Image } from "react-bootstrap";
import { useTheme } from "styled-components";
import Tooltip from "react-bootstrap/Tooltip";
import { PencilFill, Plus } from "react-bootstrap-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export const OverlayRestoreButton = ({ onClick, text, toolkit }) => {
  const theme = useTheme();
  return (
    <OverlayTrigger
      key="right"
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip id="button-tooltip">{toolkit}</Tooltip>}
    >
      <Button
        variant=""
        style={{
          border: "0",
          borderRadius: "0",
          marginLeft: "0.5rem",
          color: theme.basic.bright,
          backgroundColor: theme.secondary,
        }}
        onClick={onClick}
      >
        {text}
      </Button>
    </OverlayTrigger>
  );
};

export const EditButton = ({ onClick, text }) => {
  const theme = useTheme();
  return (
    <Button
      variant=""
      style={{
        border: "none",
        display: "flex",
        borderRadius: "0",
        alignItems: "center",
        flexDirection: "row",
        color: theme.basic.bright,
        justifyContent: "space-around",
        backgroundColor: theme.secondary,
      }}
      onClick={onClick}
    >
      <PencilFill className="me-2 mb-1" /> {text}
    </Button>
  );
};

export const AddButton = ({ onClick }) => {
  const theme = useTheme();
  return (
    <Button
      className="mt-1"
      variant=""
      style={{
        border: "0",
        borderRadius: "0",
        color: theme.basic.bright,
        backgroundColor: theme.primary,
      }}
      onClick={onClick}
    >
      <Plus width={25} height={25} />
    </Button>
  );
};

export const CustomButton = ({
  isOutline = false,
  onClick,
  text,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Button
      variant=""
      style={
        !isOutline
          ? {
              borderRadius: "0",
              color: theme.basic.bright,
              backgroundColor: theme.primary,
            }
          : {
              borderRadius: "0",
              color: theme.basic.secondary,
              border: `0.1rem solid ${theme.primary}`,
            }
      }
      onClick={onClick}
      {...props}
    >
      {text}
    </Button>
  );
};

export const IconButton = ({ onClick, src, text }) => {
  const theme = useTheme();
  return (
    <Button
      style={{
        display: "flex",
        padding: "0.5rem",
        borderRadius: "0",
        marginRight: "1rem",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        border: `0.06rem solid ${theme.secondary}`,
      }}
      onClick={onClick}
      variant=""
    >
      <Image src={src} width={30} height={30} className="me-1" />
      <p className="my-1">{text}</p>
    </Button>
  );
};

export const ToggleButton = ({ text, onClick, toggleOff, ...props }) => {
  const theme = useTheme();
  return (
    <Button
      variant=""
      className="mt-3 me-3"
      style={
        toggleOff
          ? {
              borderRadius: "0",
              bakgroundColor: "none",
              color: theme.secondary,
              border: `0.1rem solid ${theme.secondary}`,
            }
          : {
              borderRadius: "0",
              color: theme.basic.bright,
              backgroundColor: theme.secondary,
            }
      }
      onClick={onClick}
      {...props}
    >
      {text}
    </Button>
  );
};
