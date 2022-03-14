// importing modules & libraries
const { query_find_by_id, query_find, query_post } = require("../services");
const { query_put, query_delete_by_id } = require("../services");
const { product_schema } = require("../validation");
const express = require("express");
const db = require("../models");

const router = express.Router();

// Getting all data
router.get("/", async (req, res) => {
  await query_find(req, res, db.product);
});

// Getting data by id
router.get("/:id", async (req, res) => {
  await query_find_by_id(req, res, db.product, "product");
});

// Adding data
router.post("/", async (req, res) => {
  await query_post(req, res, db.product, product_schema);
});

// Editing data
router.put("/:id", async (req, res) => {
  await query_put(req, res, db.product, product_schema, "product");
});

// Deleting data
router.delete("/:id", async (req, res) => {
  await query_delete_by_id(req, res, db.product, "product");
});

module.exports = router;
