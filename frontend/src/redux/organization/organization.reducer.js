import { initState } from "./organization.state";
import { getCompanyValue } from "./organization.utils";
import { organizationActionTypes as TYPES } from "./organization.types";

const organizationReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.GET_COMPANY_PRODUCT_PENDING:
      return { ...state, isCompanyProductPending: true };

    case TYPES.GET_COMPANY_PRODUCT_SUCCESS:
      return {
        ...state,
        isCompanyProductPending: false,
        companyProduct: action.payload,
      };

    case TYPES.GET_COMPANY_PRODUCT_FAILED:
      console.error(action.payload);
      return { ...state, isCompanyProductPending: false };

    case TYPES.COMPANY_SEARCH:
      return {
        ...state,
        currentPage: 1,
        selectedComs: null,
        searchField: action.payload,
      };

    case TYPES.HANDLE_PAGE_CHANGE:
      return { ...state, currentPage: action.payload };

    case TYPES.GET_COMPANY_VALUE:
      return { ...state, companyProduct: getCompanyValue(action, state) };

    case TYPES.GET_PRODUCT_PENDING:
      return { ...state, isProductPending: true };

    case TYPES.GET_PRODUCT_SUCCESS:
      return { ...state, products: action.payload, isProductPending: false };

    case TYPES.GET_PRODUCT_FAILED:
      console.error(action.payload);
      return { ...state, isProductPending: false };

    case TYPES.HANDLE_ADD_ORGANIZATION_MODAL:
      return {
        ...state,
        showAddOrganizationModal: !state.showAddOrganizationModal,
      };

    case TYPES.HANDLE_ORGANIZATION_CHANGE:
      const { name, value } = action.payload.target;
      return {
        ...state,
        [name]: value,
      };

    case TYPES.ADD_ORGANIZATION_PEDING:
      return { ...state, isAddOrganizationPending: true };

    case TYPES.ADD_ORGANIZATION_FAILED:
      console.error(action.payload);
      return { ...state, status: {}, isAddOrganizationPending: false };

    case TYPES.SET_STATUS:
      return {
        ...state,
        data: action.extra,
        status: action.payload,
        showAddOrganizationModal: false,
        isAddOrganizationPending: false,
      };

    default:
      return state;
  }
};

export default organizationReducer;
