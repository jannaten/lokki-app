// importing modules & libraries
const { organization_product_schema } = require("../validation");
const express = require("express");
const db = require("../models");

const router = express.Router();

// Getting all data
router.get("/", async (req, res) => {
  const organization_products = await db.organization_product.findAll({
    include: [db.organization, db.product],
  });
  return res.status(200).send(organization_products);
});

// Getting data by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const organization_product = await db.organization_product.findAll({
    where: { id },
    include: [db.organization, db.product],
  });
  if (!organization_product[0])
    return res
      .status(404)
      .send({ message: `organization product of id ${id} not found` });
  return res.status(200).send(organization_product[0]);
});

// Adding data
router.post("/", async (req, res) => {
  const { value, error } = organization_product_schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const getOrganization = await db.organization.findAll({
    where: { id: value.organizationId },
    include: [
      {
        model: db.organization_product,
        include: [{ model: db.product }],
      },
    ],
  });
  productExist = getOrganization[0].organization_products.find(
    (pro) => pro.product.id === value.productId
  );
  if (productExist)
    return res
      .status(400)
      .send({ error: "Organization can't add the same product" });
  const organization_product = await db.organization_product.create(value);
  res.status(201).send(organization_product);
});

// Editing data
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { value, error } = organization_product_schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const organizationProductExist = await db.organization_product.findAll({
    where: { id },
  });
  if (!organizationProductExist[0])
    return res
      .status(404)
      .send({ message: `organization product of id ${id} not found` });
  await db.organization_product.update(value, { where: { id } });
  const query = await db.organization_product.findAll({ where: { id } });
  res.status(200).send(query[0]);
});

// Deleting data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const organization_product = await db.organization_product.findAll({
    where: { id },
  });
  if (!organization_product[0])
    return res
      .status(404)
      .send({ message: `organization product of id ${id} not found` });
  await db.organization_product.destroy({ where: { id } });
  return res.status(200).send(organization_product[0]);
});

module.exports = router;
