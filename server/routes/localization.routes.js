// importing modules and libraries
const { localization_schema } = require("../validation");
const express = require("express");
const db = require("../models");

const router = express.Router();

// Getting all data
router.get("/", async (req, res) => {
  const localizations = await db.localization.findAll();
  return res.status(200).send(localizations);
});

// Getting data by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const localization = await db.localization.findAll({ where: { id } });
  if (!localization[0])
    return res
      .status(404)
      .send({ message: `localization of id ${id} not found` });
  return res.status(200).send(localization[0]);
});

// Getting data by organization & products
router.get("/org/:orgId/pro/:proId", async (req, res) => {
  const { orgId, proId } = req.params;
  const localizations = await db.localization.findAll({
    where: { organizationId: orgId, productId: proId },
  });
  return res.status(200).send(localizations);
});

// Adding data
router.post("/", async (req, res) => {
  const { value, error } = localization_schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const ifLocaleExist = await db.localization.findAll({
    where: {
      organizationId: value.organizationId,
      productId: value.productId,
      locale: value.locale,
    },
  });
  if (ifLocaleExist[0])
    return res
      .status(400)
      .send({ message: `${value.locale} locale already exist` });
  const localization = await db.localization.create(value);
  return res.status(201).send(localization);
});

// Editing data
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { value, error } = localization_schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const localizationExist = await db.localization.findAll({ where: { id } });
  if (!localizationExist[0])
    return res
      .status(404)
      .send({ message: `localization of id ${id} not found` });
  await db.localization.update(value, { where: { id } });
  const query = await db.localization.findAll({ where: { id } });
  return res.status(200).send(query[0]);
});

// Deleting data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const localization = await db.localization.findAll({
    where: { id },
  });
  if (!localization[0])
    return res
      .status(404)
      .send({ message: `localization of id ${id} not found` });
  await db.localization.destroy({ where: { id } });
  return res.status(200).send(localization[0]);
});

module.exports = router;
