import axios from "axios";
import { BACKEND_URL_SPRING_ } from "../../constant";
import { authorizedUserTypes as TYPES } from "./authorized-user.types";

export const getAuthenticatedUser = () => async (dispatch) => {
  dispatch({ type: TYPES.REQUEST_AUTHORIZED_USER_PENDING });
  try {
    const { data } = await axios.get(
      `${BACKEND_URL_SPRING_}/authenticated-user`
    );
    dispatch({ type: TYPES.REQUEST_AUTHORIZED_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TYPES.REQUEST_AUTHORIZED_USER_FAILD,
      payload: error.message,
    });
  }
};
