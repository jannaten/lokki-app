import { createSelector } from "reselect";

const selectOrganization = (state) => state.organization;

export const selectOrganizationName = createSelector(
  [selectOrganization],
  (organization) => organization.name
);
export const selectOrganizationData = createSelector(
  [selectOrganization],
  (organization) => organization.data
);
export const selectOrganizationStatus = createSelector(
  [selectOrganization],
  (organization) => organization.status
);
export const selectOrganizationPageSize = createSelector(
  [selectOrganization],
  (organization) => organization.pageSize
);
export const selectOrganizationProducts = createSelector(
  [selectOrganization],
  (organization) => organization.products
);
export const selectOrganizationCurrentPage = createSelector(
  [selectOrganization],
  (organization) => organization.currentPage
);
export const selectOrganizationSearchField = createSelector(
  [selectOrganization],
  (organization) => organization.searchField
);
export const selectOrganizationCompanyProduct = createSelector(
  [selectOrganization],
  (organization) => organization.companyProduct
);
export const selectOrganizationShowAddOrganizationModal = createSelector(
  [selectOrganization],
  (organization) => organization.showAddOrganizationModal
);
