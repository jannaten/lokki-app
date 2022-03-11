const ORIGIN = "http://localhost:5500";
const BACKEND_URL = "api";

export const endPoints = {
  addLocalizationUrl: `${ORIGIN}/${BACKEND_URL}/localization`,
  addLocaleKeyValuesUrl: `${ORIGIN}/${BACKEND_URL}/locale_key`,
  deleteLocalizeValueUrl: (id) => `${ORIGIN}/${BACKEND_URL}/locale_value/${id}`,
  getImage: (source) => `${ORIGIN}/${BACKEND_URL}/attachments/icons/${source}`,
  getLocalizationByOrgProUrl: (orgId, proId) =>
    `${ORIGIN}/${BACKEND_URL}/localization/org/${orgId}/pro/${proId}`,
  editLocalizeValueUrl: `${ORIGIN}/${BACKEND_URL}/locale_value`,
  getLocaleKeyValuePairByOrgIdProIdUrl: (orgId, proId) =>
    `${ORIGIN}/${BACKEND_URL}/locale_key/org/${orgId}/pro/${proId}`,
  addProductUrl: `${ORIGIN}/${BACKEND_URL}/organization_product`,
  getOrganizationsUrl: `${ORIGIN}/${BACKEND_URL}/organization`,
  addOrganizationUrl: `${ORIGIN}/${BACKEND_URL}/organization`,
  getProductsUrl: `${ORIGIN}/${BACKEND_URL}/product`,
  getOrganizationByParamsUrl: (id) =>
    `${ORIGIN}/${BACKEND_URL}/organization/${id}`,
};
