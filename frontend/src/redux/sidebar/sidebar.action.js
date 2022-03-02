import { SideBarTypes as TYPES } from "./sidebar.types";

export const handleChange = (state) => ({
  type: TYPES.HANDLE_CHANGE,
  payload: state,
});

export const handleAddLocaleKeyModal = () => ({
  type: TYPES.HANDLE_ADD_LOCALE_KEY_MODAL,
});

export const handleAddLanguageModal = () => ({
  type: TYPES.HANDLE_ADD_LANGUAGE_MODAL,
});

export const setLocaleKey = () => ({
  type: TYPES.SET_LOCALE_KEY,
});

export const setLanguage = () => ({
  type: TYPES.SET_LANGUAGES,
});
