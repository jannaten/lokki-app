require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// require("./start/config.start")();
require("./start/logging.start")();
require("./start/middlewares.start")(app);
require("./start/routes.start")(app);
require("./start/sequelize.start")();

const PORT = process.env.PORT || 5500;
const server = app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});

module.exports = server;
