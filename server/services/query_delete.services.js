const query_delete_by_id = async (req, res, model, value) => {
  const { id } = req.params;
  const query = await model.findAll({
    where: { id },
  });
  if (!query[0])
    return res.status(404).send({ message: `${value} of id ${id} not found` });
  await model.destroy({ where: { id } });
  return res.status(200).send(query[0]);
};

module.exports = { query_delete_by_id };
