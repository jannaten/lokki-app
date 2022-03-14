const query_put = async (req, res, model, schema, val) => {
  const { id } = req.params;
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const queryExist = await model.findAll({ where: { id } });
  if (!queryExist[0])
    return res.status(404).send({ message: `${val} of id ${id} not found` });
  await model.update(value, { where: { id } });
  const query = await model.findAll({ where: { id } });
  res.status(200).send(query[0]);
};

module.exports = { query_put };
