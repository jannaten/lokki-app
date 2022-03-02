const query_delete_by_id = async (
  req,
  res,
  model,
  bool = { isUser: false }
) => {
  const { isUser } = bool;
  const { id } = req.params;
  const type = await model.findAll({
    attributes: isUser && { exclude: ["password"] },
    where: { id },
  });
  if (type[0]) {
    await model.destroy({ where: { id } });
    return res.status(200).send(type[0]);
  } else {
    return res.status(404).send({ message: `type of id ${id} not found` });
  }
};

module.exports = { query_delete_by_id };
