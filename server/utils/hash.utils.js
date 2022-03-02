const bcrypt = require("bcrypt");

async function hash_password(value) {
  const salt = await bcrypt.genSalt(10);
  if (value?.password) {
    value.password = await bcrypt.hash(
      value?.password && value.password.toString(),
      salt
    );
  }
  return value?.password;
}

module.exports = { hash_password };
