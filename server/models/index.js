"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};

let sequelize;

sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_ROOT_USER,
  process.env.DATABASE_ROOT_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_CONTAINER_PORT,
    dialect: "mysql",
    logging: false,
    // pool: {
    //   max: 90,
    //   // min: 0,
    //   // acquire: 30000,
    //   // idle: 10000
    // },
    // define: { underscored: true },
    // define: {
    //   charset: "utf8",
    //   collate: "utf8_general_ci",
    //   timestamps: true,
    // },
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// {
//   "id": 8,
//   "key": "welcome",
//   "hidden": 0,
//   "deleted": 0,
//   "createdAt": "2022-02-28T10:35:15.000Z",
//   "updatedAt": "2022-02-28T10:35:15.000Z",
//   "productId": 1,
//   "locale_values": [
//       {
//           "id": 2,
//           "value": "Welcome",
//           "createdAt": "2022-02-28T10:35:53.000Z",
//           "updatedAt": "2022-02-28T10:35:53.000Z",
//           "localeKeyId": 8,
//           "localizationId": 1,
//           "localization": {
//               "id": 1,
//               "locale": "en_EN",
//               "name": "English",
//               "createdAt": "2022-02-28T10:34:44.000Z",
//               "updatedAt": "2022-02-28T10:34:44.000Z",
//               "organizationId": 1,
//               "productId": 1
//           }
//       },
//       {
//           "id": 3,
//           "value": "TerveTuloa",
//           "createdAt": "2022-02-28T10:35:53.000Z",
//           "updatedAt": "2022-02-28T10:35:53.000Z",
//           "localeKeyId": 8,
//           "localizationId": 2,
//           "localization": {
//               "id": 2,
//               "locale": "fi_FI",
//               "name": "Finnish",
//               "createdAt": "2022-02-28T10:34:44.000Z",
//               "updatedAt": "2022-02-28T10:34:44.000Z",
//               "organizationId": 1,
//               "productId": 1
//           }
//       },
//       {
//           "id": 19,
//           "value": "Takk",
//           "createdAt": "2022-02-28T10:35:53.000Z",
//           "updatedAt": "2022-02-28T10:35:53.000Z",
//           "localeKeyId": 8,
//           "localizationId": 3,
//           "localization": {
//               "id": 3,
//               "locale": "sv_SV",
//               "name": "Swedish",
//               "createdAt": "2022-02-28T10:34:44.000Z",
//               "updatedAt": "2022-02-28T10:34:44.000Z",
//               "organizationId": 1,
//               "productId": 1
//           }
//       }
//   ]
// },
