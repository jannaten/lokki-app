// importing modules & libraries
const { product_schema } = require("../validation");
const express = require("express");
const db = require("../models");

const router = express.Router();

// Getting all data
router.get("/", async (req, res) => {
  const products = await db.product.findAll();
  return res.status(200).send(products);
});

// Getting data by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await db.product.findAll({ where: { id } });
  if (!product[0])
    return res.status(404).send({ message: `product of id ${id} not found` });
  return res.status(200).send(product[0]);
});

// Adding data
router.post("/", async (req, res) => {
  const { value, error } = product_schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const product = await db.product.create(value);
  return res.status(201).send(product);
});

// Editing data
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { value, error } = product_schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const productExist = await db.product.findAll({ where: { id } });
  if (!productExist[0])
    return res.status(404).send({ message: `product of id ${id} not found` });
  await db.product.update(value, { where: { id } });
  const query = await db.product.findAll({ where: { id } });
  return res.status(200).send(query[0]);
});

// Deleting data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await db.product.findAll({
    where: { id },
  });
  if (!product[0])
    return res.status(404).send({ message: `product of id ${id} not found` });
  await db.product.destroy({ where: { id } });
  return res.status(200).send(product[0]);
});

module.exports = router;
