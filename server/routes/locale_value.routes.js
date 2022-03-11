// importing modules and libraries
const { query_localization_add_or_edit_put } = require("../services");
const { locale_value_schema } = require("../validation");
const express = require("express");
const db = require("../models");

const router = express.Router();

// Getting all data
router.get("/", async (req, res) => {
  const locale_values = await db.locale_value.findAll({
    include: [db.localization],
  });
  return res.status(200).send(locale_values);
});

// Getting data by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const locale_value = await db.locale_value.findAll({
    where: { id },
    include: [db.localization],
  });
  if (!locale_value[0])
    return res
      .status(404)
      .send({ message: `locale value of id ${id} not found` });
  return res.status(200).send(locale_value[0]);
});

// Adding data
router.post("/", async (req, res) => {
  const { value, error } = locale_value_schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const locale_value = await db.locale_value.create(value);
  return res.status(201).send(locale_value);
});

// Editing data
router.put("/", async (req, res) => {
  await query_localization_add_or_edit_put(req, res, db, locale_value_schema);
});

// Deleting data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const locale_value = await db.locale_value.findAll({
    where: { id },
  });
  if (!locale_value[0])
    return res
      .status(404)
      .send({ message: `locale value of id ${id} not found` });
  await db.locale_value.destroy({ where: { id } });
  return res.status(200).send(locale_value[0]);
});

module.exports = router;
