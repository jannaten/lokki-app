// importing modules and libraries
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
  const { value, error } = locale_value_schema.validate({
    value: req.body.value,
    localeKeyId: req.body.localeKeyId,
    localizationId: req.body.localizationId,
  });
  if (error) return res.status(400).send({ message: error.details[0].message });
  const respond = await db.localization.findAll({
    where: { id: value.localizationId },
  });
  if (respond[0].organizationId === 1) {
    if (req.body.id === null) {
      const data = await db.locale_value.create({
        localizationId: value.localizationId,
        localeKeyId: value.localeKeyId,
        value: value.value,
      });
      return res.status(201).send({
        id: data.id,
        value: data.value,
        localeKeyId: data.localeKeyId,
        localizationId: data.localizationId,
      });
    } else if (req.body.id !== null) {
      const localeValueExist = await db.locale_value.findAll({
        where: { id: req.body.id },
      });
      if (!localeValueExist[0])
        return res
          .status(404)
          .send({ message: `locale value of id ${req.body.id} not found` });
      await db.locale_value.update(
        { value: value.value },
        {
          where: {
            id: req.body.id,
            localizationId: value.localizationId,
            localeKeyId: value.localeKeyId,
          },
        }
      );
      const query = await db.locale_value.findAll({
        where: {
          id: req.body.id,
          localizationId: value.localizationId,
          localeKeyId: value.localeKeyId,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      return res.status(200).send(query[0]);
    }
  } else if (respond[0].organizationId !== 1) {
    if (req.body.id === null) {
      const data = await db.locale_value.create({
        localizationId: req.body.localizationId,
        localeKeyId: req.body.localeKeyId,
        value: req.body.value,
      });
      return res.status(201).send({
        id: data.id,
        value: data.value,
        localeKeyId: data.localeKeyId,
        localizationId: data.localizationId,
      });
    } else if (req.body.id !== null) {
      const localeValueExist = await db.locale_value.findAll({
        where: {
          id: req.body.id,
          localizationId: req.body.localizationId,
          localeKeyId: req.body.localeKeyId,
        },
      });
      if (!localeValueExist[0]) {
        const data = await db.locale_value.create({
          localizationId: req.body.localizationId,
          localeKeyId: req.body.localeKeyId,
          value: req.body.value,
        });
        return res.status(201).send({
          id: data.id,
          value: data.value,
          localeKeyId: data.localeKeyId,
          localizationId: data.localizationId,
        });
      } else {
        const localeValueExist = await db.locale_value.findAll({
          where: {
            id: req.body.id,
            localizationId: req.body.localizationId,
            localeKeyId: req.body.localeKeyId,
          },
        });
        if (!localeValueExist[0])
          return res
            .status(404)
            .send({ message: `locale value of id ${req.body.id} not found` });
        await db.locale_value.update(
          { value: value.value },
          {
            where: {
              id: req.body.id,
              localizationId: req.body.localizationId,
              localeKeyId: req.body.localeKeyId,
            },
          }
        );
        const query = await db.locale_value.findAll({
          where: {
            id: req.body.id,
            localizationId: value.localizationId,
            localeKeyId: value.localeKeyId,
          },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return res.status(200).send(query[0]);
      }
    }
  }
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
