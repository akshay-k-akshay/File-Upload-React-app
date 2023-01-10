const users = require("../db/users");
const { UnauthorizedError } = require("../errors");
const { verifyToken } = require("../services/jwt");

function getToken(req) {
  let token = req.headers.authorization;
  if (!token) {
    throw new UnauthorizedError("No token provided");
  }
  token = token.split(" ").pop();
  if (!token) {
    throw new UnauthorizedError("No token provided");
  }
  return token;
}

async function authenticate(req, _res, next) {
  try {
    const token = getToken(req);
    const payload = verifyToken(token);
    req.user = await users.findOne({ email: payload.email });
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authenticate;
