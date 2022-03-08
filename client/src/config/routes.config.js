export const routes = {
  home: "/",
  organizationByParamRoute: (orgId) => `/organization/:${orgId}`,
  organizationLocalizationByParamRoute: (orgId, proId) =>
    `/organization/:${orgId}/product/:${proId}`,
  organizationRoute: "organization",
  productRoute: "product",
};
