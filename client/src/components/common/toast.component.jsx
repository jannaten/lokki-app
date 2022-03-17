import toast from "react-hot-toast";
import { CheckCircleFill } from "react-bootstrap-icons";
import { SuccessToastStyle, ErrorToastStyle } from "../../styles";

export const successToast = (sucess, theme, position = "bottom-right") => {
  return toast.success(sucess, {
    duration: 3000,
    icon: <CheckCircleFill color={theme.primary} />,
    position,
    style: SuccessToastStyle(theme),
  });
};

export const errorToast = (error, position = "bottom-right") => {
  toast.error(error, {
    duration: 3000,
    position,
    style: ErrorToastStyle,
  });
};
