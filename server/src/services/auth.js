const Users = require("../db/users");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError
} = require("../errors");
const PasswordService = require("../services/password");
const JwtService = require("../services/jwt");

module.exports = {
  signUp: async (data) => {
    if (!data.email) {
      throw new BadRequestError("email should not be empty");
    }
    if (!data.name) {
      throw new BadRequestError("name should not be empty");
    }
    if (!data.password) {
      throw new BadRequestError("password should not be empty");
    }
    const existingUser = await Users.findOne({ email: data.email });
    if (existingUser) {
      throw new BadRequestError("User Already Exist with this Email");
    }
    data.password = await PasswordService.encrypt(data.password);
    const user = await Users.create(data);
    return JwtService.generateToken(user);
  },

  signIn: async (email, password) => {
    if (!email) {
      throw new BadRequestError("email should not be empty");
    }
    if (!password) {
      throw new BadRequestError("password should not be empty");
    }
    const user = await Users.findOne({ email });
    if (!user) {
      throw new NotFoundError("user not exist with this email");
    }
    const isValid = await PasswordService.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedError("Invalid password");
    }
    return JwtService.generateToken(user);
  }
};
