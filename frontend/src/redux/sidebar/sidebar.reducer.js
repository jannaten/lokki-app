import { initState } from "./sidebar.state";
import { SideBarTypes as TYPES } from "./sidebar.types";

const sideBarReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.HANDLE_CHANGE:
      const { value, name } = action.payload.target;
      return { ...state, [name]: value };
    case TYPES.HANDLE_ADD_LOCALE_KEY_MODAL:
      return { ...state, showAddTransKeyModal: !state.showAddTransKeyModal };
    case TYPES.SET_LOCALE_KEY:
      return { ...state, localeKey: "" };
    case TYPES.SET_LANGUAGES:
      return { ...state, language: "", abbreviation: "" };
    case TYPES.HANDLE_ADD_LANGUAGE_MODAL:
      return { ...state, showAddLanguageModal: !state.showAddLanguageModal };
    default:
      return state;
  }
};

export default sideBarReducer;
