const db = require("../models");
const winston = require("winston");

module.exports = function () {
  // db.sequelize.sync({ force: true }).then(() => {
  db.sequelize.sync({ alter: true }).then(() => {
    // db.sequelize.sync().then(() => {
    winston.info("Database is connected");
  });
};
// module.exports = function (app) {
//   const PORT = process.env.PORT || 5500;
//   // db.sequelize.sync({ force: true }).then(() => {
//   // db.sequelize.sync({ alter: true }).then(() => {
//   db.sequelize.sync().then(() => {
//     app.listen(PORT, () => {
//       winston.info("Database is connected");
//       console.log(`listening to port ${PORT}`);
//     });
//   });
// };
