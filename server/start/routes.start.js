const express = require("express");
const { error } = require("../middlewares");
const productRoute = require("../routes/product.routes");
const localeKeyRoute = require("../routes/locale_key.routes");
const localeValueRoute = require("../routes/locale_value.routes");
const organizationRoute = require("../routes/organization.routes");
const localizationRoute = require("../routes/localization.routes");
const organizationProductRoute = require("../routes/organization_product.routes");

module.exports = function (app) {
  const BASE = "/api";
  app.use(express.static("public"));
  app.use(`${BASE}/product`, productRoute);
  app.use(`${BASE}/locale_key`, localeKeyRoute);
  app.use(`${BASE}/locale_value`, localeValueRoute);
  app.use(`${BASE}/organization`, organizationRoute);
  app.use(`${BASE}/localization`, localizationRoute);
  app.use(`${BASE}/organization_product`, organizationProductRoute);
  app.use(`${BASE}/attachments/icons`, express.static("./public/icons"));
  app.use(error);
};
