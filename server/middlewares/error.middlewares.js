const winston = require("winston");

function error(err, req, res, next) {
  winston.error(err.message, err);
  res.status(500).send({ message: err.message });
  console.error(err.message);
}

module.exports = { error };
