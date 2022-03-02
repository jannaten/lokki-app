const winston = require("winston");

module.exports = function () {
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.exceptions.handle(
    new winston.transports.Console(),
    new winston.transports.File({ filename: "exceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
