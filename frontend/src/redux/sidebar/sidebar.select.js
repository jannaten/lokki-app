import { createSelector } from "reselect";

const selectSideBar = (state) => state.sideBar;

export const selectSideBarLocale = createSelector(
  [selectSideBar],
  (sidebar) => sidebar.locale
);
export const selectSideBarlanguage = createSelector(
  [selectSideBar],
  (sidebar) => sidebar.language
);
export const selectSideBarLocaleKey = createSelector(
  [selectSideBar],
  (sidebar) => sidebar.localeKey
);
export const selectSideBarAbbreviation = createSelector(
  [selectSideBar],
  (sidebar) => sidebar.abbreviation
);
export const selectSideBarShowAddLanguageModal = createSelector(
  [selectSideBar],
  (sidebar) => sidebar.showAddLanguageModal
);
export const selectSideBarShowAddTrasKeyModal = createSelector(
  [selectSideBar],
  (sidebar) => sidebar.showAddTransKeyModal
);
