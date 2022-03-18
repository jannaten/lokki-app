// importing modules & libraries
const { locale_key_schema, locale_value_schema } = require("../validation");
const { query_put, query_delete_by_id } = require("../services");
const express = require("express");
const db = require("../models");

const router = express.Router();

// const data = require("../data/organizationproduct.json");

// router.get("/add", async (req, res) => {
//   for (let i = 0; i < data.length; i++) {
//     await db.organization_product.create(data[i]);
//   }
//   res.send(data);
// });

// Get all data
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
      // Both line work somehow the same way -- I don't know how
      // for (let k = 0; modified_value[i].locale_values[k]; k++) {
      for (let k = 0; k < modified_value[i].locale_values.length; k++) {
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
            fromDefault: defaultLocalization.some((el) => {
              if (Number(orgId) !== 1) {
                return el.id === localizationId;
              } else if (Number(orgId) !== 1) {
                return false;
              }
            }),
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
  const t = await db.sequelize.transaction();
  const { productId, key, localizations, valueList } = req.body;
  const { value, error } = locale_key_schema.validate({
    productId,
    key,
  });
  if (error) return res.status(400).send({ message: error.details[0].message });
  const locale_key = await db.locale_key.create(value, { transaction: t });
  if (locale_key) {
    let modifiedLocaleKey = {
      id: locale_key.id,
      key: locale_key.key,
      productId: locale_key.productId,
    };
    let locale_values = {};
    for (let i = 0; i < localizations.length; i++) {
      if (valueList.length !== 0) {
        const { value: locale_value_check, error: locale_value_error } =
          locale_value_schema.validate({
            localeKeyId: locale_key.id,
            localizationId: valueList.filter(
              (el) => el.localizationId === localizations[i].id
            )[0].localizationId,
            value: valueList.filter(
              (el) => el.localizationId === localizations[i].id
            )[0].value,
          });
        if (locale_value_error)
          return res
            .status(400)
            .send({ message: locale_value_error.details[0].message });
        const localize_value = await db.locale_value.create(
          locale_value_check,
          { transaction: t }
        );
        locale_values[localizations[i].locale] = {
          localizationId: localize_value.localizationId,
          localeKeyId: localize_value.localeKeyId,
          value: localize_value.value,
          id: localize_value.id,
          fromDefault: false,
        };
      } else {
        locale_values[localizations[i].locale] = null;
      }
      modifiedLocaleKey.locale_values = locale_values;
    }
    return res.status(201).send(modifiedLocaleKey);
  }
  await t.commit();
});

// Editing data
router.put("/:id", async (req, res) => {
  await query_put(req, res, db.locale_key, locale_key_schema, "locale key");
});

// Deleting data
router.delete("/:id", async (req, res) => {
  await query_delete_by_id(req, res, db.locale_key, "locale key");
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

// const data = require("../data/localizevalue.json");
// Getting all data
// router.get("/add", async (req, res) => {
//   for (let i = 0; i < data.length; i++) {
//     await db.locale_value.create(data[i]);
//   }
//   res.send(data);
// });
