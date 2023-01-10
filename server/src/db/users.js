const { Users } = require("../models/users");

module.exports = {
  create: async ({ email, password, name }) => {
    const user = new Users({
      email,
      name,
      password
    });

    return await user.save();
  },

  findOne: async (query) => {
    return await Users.findOne(query);
  }
};
