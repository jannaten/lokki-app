export const routes = {
  home: "/",
  organizationByParamRoute: (orgId) => `/organization/:${orgId}`,
  organizationLocalizationByParamRoute: (orgId, proId) =>
    `/organization/:${orgId}/product/:${proId}`,
  organizationRoute: "organization",
  productRoute: "product",
};
// export const routes = {
//   home: "/",
//   login: "/login",
//   blogs: "/blogs",
//   ss: "school-search",
//   cs: "company-search",
//   register: "/register",
//   userInfo: "/user_info",
//   notFound: "/not-found",
//   os: "organization-search",
//   allResults: "/all-results",
//   createBlog: "/create_blog",
//   schoolSearch: "/school-search",
//   companySearch: "/company-search",
//   aboutPlatform: "/about-platform",
//   blogsById: (blogId) => `/blogs/${blogId}`,
//   setRoute: (value, id) => `/${value}/${id}`,
//   organizationSearchById: (organizationId) =>
//     `/organization-search/${organizationId}`,
//   organizationSearch: "/organization-search",
//   schoolSearchById: (schoolId) => `/school-search/${schoolId}`,
//   companySearchById: (companyId) => `/company-search/${companyId}`,
// };
