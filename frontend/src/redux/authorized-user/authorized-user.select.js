import { createSelector } from "reselect";

const selectAuthorizedUser = (state) => state.authorizedUser;

export const selectFindedCompanyId = createSelector(
  [selectAuthorizedUser],
  (authorizedUser) => authorizedUser.findedCompanyId
);

export const selectAuthenticatedUser = createSelector(
  [selectAuthorizedUser],
  (authorizedUser) => authorizedUser.authenticatedUser
);
