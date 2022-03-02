import axios from "axios";
import { BACKEND_URL_SPRING_ } from "../../constant";
import { successToast } from "../../Components/Reusable-Components/";
import { organizationActionTypes as TYPES } from "./organization.types";
import { getProductUrl, getOrganizationUrl } from "./organization.utils";

export const getOganizationProduct = () => async (dispatch) => {
  dispatch({ type: TYPES.GET_COMPANY_PRODUCT_PENDING });
  axios
    .get(`${BACKEND_URL_SPRING_}/organization`)
    .then((res) => {
      dispatch({ type: TYPES.GET_COMPANY_PRODUCT_SUCCESS, payload: res.data });
    })
    .catch((e) =>
      dispatch({ type: TYPES.GET_COMPANY_PRODUCT_FAILED, payload: e.message })
    );
};

export const handleCompanySearch = (query) => ({
  type: TYPES.COMPANY_SEARCH,
  payload: query,
});

export const handlePageChange = (page) => ({
  type: TYPES.HANDLE_PAGE_CHANGE,
  payload: page,
});

export const getCompanyValue = (value, comId) => ({
  type: TYPES.GET_COMPANY_VALUE,
  value,
  comId,
});

export const getProduct = () => async (dispatch) => {
  dispatch({ type: TYPES.GET_PRODUCT_PENDING });
  await fetch(getProductUrl)
    .then((response) => response.json())
    .then((promise) =>
      dispatch({ type: TYPES.GET_PRODUCT_SUCCESS, payload: promise })
    )
    .catch((e) =>
      dispatch({ type: TYPES.GET_PRODUCT_FAILED, payload: e.message })
    );
};

export const handleOrganizationChange = (event) => ({
  type: TYPES.HANDLE_ORGANIZATION_CHANGE,
  payload: event,
});

export const addOrganization = (name) => async (dispatch) => {
  dispatch({ type: TYPES.ADD_ORGANIZATION_PEDING });
  try {
    const response = await axios.post(
      getOrganizationUrl(name),
      { name },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    await dispatch({
      type: TYPES.SET_STATUS,
      payload: { value: response.status },
      extra: response.data,
    });
    successToast(`${name} organization has created`);
  } catch (e) {
    dispatch({ type: TYPES.ADD_ORGANIZATION_FAILED, payload: e.message });
  }
};

export const handleAddOrganization = () => ({
  type: TYPES.HANDLE_ADD_ORGANIZATION_MODAL,
});
