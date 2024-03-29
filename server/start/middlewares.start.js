const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");

module.exports = function (app) {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  if (app.get("env") == "production") {
    app.use(
      morgan("common", {
        skip: function (req, res) {
          return res.statusCode < 400;
        },
        stream: __dirname + "/../morgan.log",
      })
    );
  } else {
    app.use(morgan("dev"));
  }
};
