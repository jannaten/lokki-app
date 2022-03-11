const query_localization_add_or_edit_put = async (req, res, model, schema) => {
  const { value, error } = schema.validate({
    value: req.body.value,
    localeKeyId: req.body.localeKeyId,
    localizationId: req.body.localizationId,
  });
  if (error) return res.status(400).send({ message: error.details[0].message });
  const respond = await model.localization.findAll({
    where: { id: value.localizationId },
  });
  if (respond[0].organizationId === 1) {
    if (req.body.id === null) {
      const data = await model.locale_value.create({
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
      const localeValueExist = await model.locale_value.findAll({
        where: { id: req.body.id },
      });
      if (!localeValueExist[0])
        return res
          .status(404)
          .send({ message: `locale value of id ${req.body.id} not found` });
      await model.locale_value.update(
        { value: value.value },
        {
          where: {
            id: req.body.id,
            localizationId: value.localizationId,
            localeKeyId: value.localeKeyId,
          },
        }
      );
      const query = await model.locale_value.findAll({
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
      const data = await model.locale_value.create({
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
      const localeValueExist = await model.locale_value.findAll({
        where: {
          id: req.body.id,
          localizationId: req.body.localizationId,
          localeKeyId: req.body.localeKeyId,
        },
      });
      if (!localeValueExist[0]) {
        const data = await model.locale_value.create({
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
        const localeValueExist = await model.locale_value.findAll({
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
        await model.locale_value.update(
          { value: value.value },
          {
            where: {
              id: req.body.id,
              localizationId: req.body.localizationId,
              localeKeyId: req.body.localeKeyId,
            },
          }
        );
        const query = await model.locale_value.findAll({
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
};

module.exports = { query_localization_add_or_edit_put };
