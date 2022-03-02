import { initState } from "./localization-value.state";
import { LocalizationTypes as TYPES } from "./localization-value.types";

const localizationValueReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.SET_ORG_PARAMS:
      return { ...state, orgParams: action.payload };
    case TYPES.SET_PRO_PARAMS:
      return { ...state, proParams: action.payload };
    case TYPES.REQUEST_PRODUCT_PENDING:
      return { ...state, isProductPending: true };
    case TYPES.REQUEST_PRODUCT_SUCCESS:
      return { ...state, isProductPending: false, product: action.payload };
    case TYPES.REQUEST_PRODUCT_FAILED:
      console.error(action.payload);
      return { ...state, isProductPending: false };
    case TYPES.HANDLE_EDIT_MODAL:
      return { ...state, showEditModal: !state.showEditModal };
    case TYPES.CLEAN_PRODUCTS:
      return { ...state, product: [] };
    default:
      return state;
  }
};

export default localizationValueReducer;
