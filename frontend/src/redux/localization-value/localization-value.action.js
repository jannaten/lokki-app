import axios from "axios";
import { getComProUrl } from "./localization-value.utils";
import { LocalizationTypes as TYPES } from "./localization-value.types";
export const setOrgParams = (orgParams) => ({
  type: "SET_ORG_PARAMS",
  payload: orgParams,
});

export const setProParams = (proParams) => ({
  type: "SET_PRO_PARAMS",
  payload: proParams,
});

export const handleEditModal = () => ({
  type: "HANDLE_EDIT_MODAL",
});

export const setProduct = (orgParams) => async (dispatch) => {
  dispatch({ type: TYPES.REQUEST_PRODUCT_PENDING });
  try {
    const Respond = await axios.get(getComProUrl(orgParams));
    dispatch({ type: TYPES.REQUEST_PRODUCT_SUCCESS, payload: Respond.data });
  } catch (e) {
    dispatch({
      type: TYPES.REQUEST_PRODUCT_FAILED,
      payload: e.message,
    });
  }
};

export const cleanProduct = () => ({
  type: "CLEAN_PRODUCTS",
});
