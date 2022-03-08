import toast from "react-hot-toast";
import { CheckCircleFill } from "react-bootstrap-icons";

export const successToast = (sucess, theme, position = "bottom-right") => {
  return toast.success(sucess, {
    duration: 3000,
    icon: <CheckCircleFill color={theme.primary} />,
    position,
    style: {
      width: "auto",
      display: "grid",
      transition: "1s",
      borderRadius: "0px",
      color: `${theme.secondary}`,
      transform: "translate(400px)",
      gridTemplateColumns: "1.2fr 6fr 0.5fr",
      backgroundColor: `${theme.basic.light}`,
      borderLeft: `0.3rem solid ${theme.primary}`,
    },
  });
};

export const errorToast = (error, position = "bottom-right") => {
  toast.error(error, {
    duration: 3000,
    position,
    style: {
      display: "grid",
      transition: "1s",
      borderRadius: "0px",
      backgroundColor: "#ffffff",
      transform: "translate(400px)",
      borderLeft: "0.3rem solid #ff355b",
      gridTemplateColumns: "1.2fr 6fr 0.5fr",
    },
  });
};
