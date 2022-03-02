const Joi = require("joi");

const product_schema = Joi.object({
  id: Joi.number(),
  name: Joi.string().min(2).max(255).required(),
});

const organization_schema = Joi.object({
  id: Joi.number(),
  name: Joi.string().min(2).max(255).required(),
  apiKey: Joi.string().min(2).max(255),
});

const organization_product_schema = Joi.object({
  id: Joi.number(),
  productId: Joi.number().required(),
  organizationId: Joi.number().required(),
});

const localization_schema = Joi.object({
  id: Joi.number(),
  locale: Joi.string().min(2).max(32).required(),
  productId: Joi.number().required(),
  organizationId: Joi.number().required(),
  name: Joi.string().min(2).max(64).required(),
});

const locale_value_schema = Joi.object({
  id: Joi.number(),
  value: Joi.string().min(2).max(1024).required(),
  localeKeyId: Joi.number().required(),
  localizationId: Joi.number(),
});

const locale_key_schema = Joi.object({
  id: Joi.number(),
  key: Joi.string().min(2).max(1024).required(),
  productId: Joi.number().required(),
  hidden: Joi.number(),
  deleted: Joi.number(),
});

module.exports = {
  organization_product_schema,
  organization_schema,
  localization_schema,
  locale_value_schema,
  locale_key_schema,
  product_schema,
};
