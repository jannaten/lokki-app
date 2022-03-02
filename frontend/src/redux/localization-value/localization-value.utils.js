import { BACKEND_URL_SPRING_ } from "../../constant";

export const getComProUrl = (orgParams) =>
  `${BACKEND_URL_SPRING_}/organization-products/` + orgParams;
