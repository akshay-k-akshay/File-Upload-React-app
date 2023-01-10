const jwt = require("jsonwebtoken");
const { config } = require("../config");

const JWT_SECRET = config.get("jwt.secret");
const JWT_EXPIRES_IN = config.get("jwt.expiresIn");

module.exports = {
  generateToken(user) {
    const payload = {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  },

  verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
  }
};
