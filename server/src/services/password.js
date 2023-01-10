const { genSalt, hash, compare } = require("bcrypt");

module.exports = {
  async encrypt(password) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  },

  async compare(password, hash) {
    return await compare(password, hash);
  }
};
