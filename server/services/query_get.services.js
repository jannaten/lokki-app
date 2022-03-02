const query_find = async (req, res, model) => {
  const data = await model.findAll();
  return res.status(200).send(data);
};

const query_find_user = async (req, res, model, refOne, refTwo) => {
  const users = await model.findAll({
    attributes: { exclude: ["password"] },
    include: [{ model: refOne, include: [refTwo] }],
  });
  return res.status(200).send(users);
};

const query_find_by_id = async (req, res, model) => {
  const { id } = req.params;
  const query = await model.findAll({ where: { id } });
  if (!query[0])
    return res.status(404).send({ message: `data of id ${id} not found` });
  return res.status(200).send(query[0]);
};

const query_find_by_id_user = async (req, res, model, refOne, refTwo) => {
  const { id } = req.params;
  const users = await model.findAll({
    where: { id },
    attributes: { exclude: ["password"] },
    include: [{ model: refOne, include: [refTwo] }],
  });
  return res.status(200).send(users[0]);
};

module.exports = {
  query_find_by_id_user,
  query_find_by_id,
  query_find_user,
  query_find,
};
