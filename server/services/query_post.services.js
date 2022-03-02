const query_post = async (req, res, model, schema) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const type = await model.create(value);
  res.status(200).send(type);
};

module.exports = { query_post };
