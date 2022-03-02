const { image_auth } = require("./image-auth.middlewares");
const { image_save } = require("./image-save.middlewares");
const { idNumber } = require("./id-number.middlewares");
const { blog_provider } = require("./blog.middleware");
const { admin } = require("./admin.middlewares");
const { error } = require("./error.middlewares");
const { auth } = require("./auth.middlewares");
module.exports = {
  blog_provider,
  image_auth,
  image_save,
  idNumber,
  admin,
  error,
  auth,
};
