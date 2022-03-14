// importing modules and libraries
const { query_find_by_id, query_find, query_put } = require("../services");
const { localization_schema } = require("../validation");
const { query_delete_by_id } = require("../services");
const express = require("express");
const db = require("../models");

const router = express.Router();

// Getting all data
router.get("/", async (req, res) => {
  await query_find(req, res, db.localization);
});

// Getting data by id
router.get("/:id", async (req, res) => {
  await query_find_by_id(req, res, db.localization, "localization");
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
  await query_put(req, res, db.localization, localization_schema, "locale");
});

// Deleting data
router.delete("/:id", async (req, res) => {
  await query_delete_by_id(req, res, db.localization, "localization");
});

module.exports = router;
