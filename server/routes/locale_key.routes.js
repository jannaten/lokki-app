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
  const defaultOrganizationId = 1;
  const { orgId, proId } = req.params;
  const notDefault = defaultOrganizationId !== Number(orgId);
  const defaultLocalization = await db.localization.findAll({
    where: { organizationId: defaultOrganizationId, productId: proId },
  });
  let nonDefaultLocalization = [];
  let removedLocalization = [...defaultLocalization];
  if (notDefault) {
    nonDefaultLocalization = await db.localization.findAll({
      where: { organizationId: orgId, productId: proId },
    });
    removedLocalization = [...defaultLocalization].filter((el) => {
      let locale =
        nonDefaultLocalization.find((locale) => locale.locale) &&
        nonDefaultLocalization.find((locale) => locale.locale).locale;
      return el.locale !== locale;
    });
  }
  const localization = [...removedLocalization, ...nonDefaultLocalization];
  const locale_keys = await db.locale_key.findAll(
    !notDefault
      ? {
          where: { productId: proId },
          include: [
            {
              model: db.locale_value,
              include: [
                { model: db.localization, where: { organizationId: orgId } },
              ],
            },
          ],
          limit: 50,
        }
      : {
          where: { productId: proId },
          include: [
            {
              model: db.locale_value,
              include: [{ model: db.localization }],
            },
          ],
          limit: 50,
        }
  );

  const modified_value = [...locale_keys];
  const keyValueArray = [];
  for (let i = 0; i < modified_value.length; i++) {
    let keyValueObject = {};
    keyValueObject.id = modified_value[i].id;
    keyValueObject.key = modified_value[i].key;
    keyValueObject.productId = modified_value[i].productId;
    let locale_values = {};
    for (let j = 0; j < localization.length; j++) {
      locale_values[localization[j].locale] = null;
      for (let k = 0; modified_value[i].locale_values[k]; k++) {
        if (
          modified_value[i].locale_values[k].localization.locale ===
          localization[j].locale
        ) {
          const { id, value, localeKeyId, localizationId } =
            modified_value[i].locale_values[k];
          locale_values[localization[j].locale] = {
            id,
            value,
            localeKeyId,
            localizationId,
            // fromDefault: defaultLocalization.some(() => {
            //   if (notDefault) return true;
            //   return false;
            // }),
          };
        }
      }
    }
    keyValueObject.locale_values = locale_values;
    keyValueArray.push(keyValueObject);
  }
  return res.status(200).send(keyValueArray);
});

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

// let toni = [];
// for (let l = 0; l < modifiedLocalization.length; l++) {
//   for (let m = 0; m < nonDefaultLocalization.length; m++) {
//     if (modifiedLocalization[l].locale === nonDefaultLocalization[m].locale) {
//       toni.push(modifiedLocalization[l]);
//     }
//   }
// }
// let newArr = [...defaultLocalization].filter((el) => {
//   let id =
//     toni.find((val) => val && val.id === el.id) &&
//     toni.find((val) => val && val.id === el.id).id;
//   return el.id !== id;
// });
// let combinedLocalizations = [
//   ...defaultLocalization,
//   ...nonDefaultLocalization,
// ];

// const newLocalizations = [];
// combinedLocalizations.forEach((i) => {
//   const found = nonDefaultLocalization.find((j) => j.locale === i.locale);
//   const found2 = defaultLocalization.find((j) => j.locale === i.locale)
//   if (found) {
//     newLocalizations.push(found);
//   } else {
//     newLocalizations.push(i);
//   }
// });

// const myArrayFiltered = combinedLocalizations.filter((el) => {
//   return nonDefaultLocalization.some((f) => {
//     return f.locale !== el.locale;
//   });
// });
