const query_find = async (req, res, model) => {
  const data = await model.findAll();
  return res.status(200).send(data);
};

const query_find_by_id = async (req, res, model, value) => {
  const { id } = req.params;
  const query = await model.findAll({ where: { id } });
  if (!query[0])
    return res.status(404).send({ message: `${value} of id ${id} not found` });
  return res.status(200).send(query[0]);
};

module.exports = {
  query_find_by_id,
  query_find,
};
