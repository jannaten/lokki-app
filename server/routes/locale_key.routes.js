// importing modules & libraries
const { locale_key_schema } = require("../validation");
const express = require("express");
const db = require("../models");

const router = express.Router();

// Getting all data
router.get("/", async (req, res) => {
  const locale_keys = await db.locale_key.findAll({
    include: [
      { model: db.locale_value, include: [{ model: db.localization }] },
    ],
  });
  return res.status(200).send(locale_keys);
});

// Getting data by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const locale_key = await db.locale_key.findAll({
    where: { id },
    include: [
      { model: db.locale_value, include: [{ model: db.localization }] },
    ],
  });
  if (!locale_key[0])
    return res
      .status(404)
      .send({ message: `locale key of id ${id} not found` });
  return res.status(200).send(locale_key[0]);
});

// Getting data by organization & products
router.get("/org/:orgId/pro/:proId", async (req, res) => {
  const { orgId, proId } = req.params;
  const localization = await db.localization.findAll({
    where: { organizationId: orgId, productId: proId },
  });
  const locale_keys = await db.locale_key.findAll({
    where: { productId: proId },
    include: [
      { model: db.locale_value, include: [{ model: db.localization }] },
    ],
    limit: 50,
  });
  const modified_value = [...locale_keys];
  const arr = [];
  for (let i = 0; i < modified_value.length; i++) {
    let obj = {};
    obj.id = modified_value[i].id;
    obj.key = modified_value[i].key;
    obj.productId = modified_value[i].productId;
    let locale_values = {};
    for (let j = 0; j < localization.length; j++) {
      locale_values[localization[j].locale] = null;
      for (let k = 0; modified_value[i].locale_values[k]; k++) {
        if (
          modified_value[i].locale_values[k].localizationId ===
          localization[j].id
        ) {
          const { id, value, localeKeyId, localizationId } =
            modified_value[i].locale_values[k];
          locale_values[localization[j].locale] = {
            id,
            value,
            localeKeyId,
            localizationId,
          };
        }
      }
    }
    obj.locale_values = locale_values;
    arr.push(obj);
  }
  return res.status(200).send(arr);
});

// Getting data by organization & products
// router.get("/pro/:proId", async (req, res) => {
//   const { proId } = req.params;
//   const locale_keys = await db.locale_key.findAll({
//     where: { productId: proId },
//     include: [
//       { model: db.locale_value, include: [{ model: db.localization }] },
//     ],
//     limit: 50,
//   });
//   return res.status(200).send(locale_keys);
// });

// Adding data
router.post("/", async (req, res) => {
  const { value, error } = locale_key_schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const locale_key = await db.locale_key.create(value);
  res.status(201).send(locale_key);
});

// Editing data
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { value, error } = locale_key_schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const localeKeyExist = await db.locale_key.findAll({ where: { id } });
  if (!localeKeyExist[0])
    return res
      .status(404)
      .send({ message: `locale key of id ${id} not found` });
  await db.locale_key.update(value, { where: { id } });
  const query = await db.locale_key.findAll({ where: { id } });
  res.status(200).send(query[0]);
});

// Deleting data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const locale_key = await db.locale_key.findAll({
    where: { id },
  });
  if (!locale_key[0])
    return res
      .status(404)
      .send({ message: `locale key of id ${id} not found` });
  await db.locale_key.destroy({ where: { id } });
  return res.status(200).send(locale_key[0]);
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const db = require("../models");
// const data = require("../data/localizevalue.json");

// router.get("/all", async (req, res) => {
// //   for (let i = 0; i < data.length; i++) {
// //     await db.locale_value.create(data[i]);
// //   }
//   return res.status(200).send(data);
// });

// module.exports = router;
