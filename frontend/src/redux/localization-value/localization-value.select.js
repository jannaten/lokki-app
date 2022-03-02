import { createSelector } from "reselect";

const selectLocalizationValue = (state) => state.localizationValue;

export const selectLocalizationValueProduct = createSelector(
  [selectLocalizationValue],
  (localizationValue) => localizationValue.product
);
export const selectLocalizationValueOrgParams = createSelector(
  [selectLocalizationValue],
  (localizationValue) => localizationValue.orgParams
);
export const selectLocalizationValueProParams = createSelector(
  [selectLocalizationValue],
  (localizationValue) => localizationValue.proParams
);
export const selectLocalizationValueShowEditModel = createSelector(
  [selectLocalizationValue],
  (localizationValue) => localizationValue.showEditModal
);
export const selectLocalizationValueIsProductPending = createSelector(
  [selectLocalizationValue],
  (localizationValue) => localizationValue.isProductPending
);
