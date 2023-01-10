const { StatusCodes } = require("http-status-codes");

const authService = require("../services/auth");

module.exports = {
  signIn: async (req, res, next) => {
    try {
      const token = await authService.signIn(req.body.email, req.body.password);
      return res.status(StatusCodes.OK).json({
        message: "User Logged in Successfully",
        data: { token }
      });
    } catch (error) {
      next(error);
    }
  },

  signUp: async (req, res, next) => {
    try {
      const token = await authService.signUp(req.body);
      return res.status(StatusCodes.OK).json({
        message: "User Registerd Successfully",
        data: { token }
      });
    } catch (error) {
      next(error);
    }
  }
};
