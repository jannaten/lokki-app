const { isNumber } = require("../utils");

function idNumber(req, res, next) {
  const { id } = req.params;
  if (isNumber(id) === false)
    return res.status(400).send({ message: "Please provide a valid id" });
  next();
}

module.exports = { idNumber };
