// importing modules nad libraries
const { query_put, query_delete_by_id } = require("../services");
const { organization_schema } = require("../validation");
const express = require("express");
const db = require("../models");

const router = express.Router();

// Getting all data
router.get("/", async (req, res) => {
  const organizations = await db.organization.findAll({
    attributes: { exclude: ["apiKey"] },
    include: [
      {
        model: db.organization_product,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [{ model: db.product }],
      },
    ],
  });
  return res.status(200).send(organizations);
});

// Getting data by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const organization = await db.organization.findAll({
    where: { id },
    attributes: { exclude: ["apiKey"] },
    include: [
      {
        model: db.organization_product,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [{ model: db.product, attributes: ["id", "name", "image"] }],
      },
    ],
  });
  if (!organization[0])
    return res
      .status(404)
      .send({ message: `organization of id ${id} not found` });
  return res.status(200).send(organization[0]);
});

// Adding data
router.post("/", async (req, res) => {
  const { value, error } = organization_schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  value.apiKey = (Math.random() + 1).toString(36).substring(7);
  const organization = await db.organization.create(value);
  return res.status(201).send({
    id: organization.id,
    name: organization.name,
    updatedAt: organization.updatedAt,
    createdAt: organization.createdAt,
  });
});

// Editing data
router.put("/:id", async (req, res) => {
  await query_put(req, res, db.organization, organization_schema, "org");
});

// Deleting data
router.delete("/:id", async (req, res) => {
  await query_delete_by_id(req, res, db.organization, "organization");
});

module.exports = router;
