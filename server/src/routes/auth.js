const express = require("express");
const controller = require("../controllers/auth-controller");

const Auth = new express.Router();

Auth.post("/signup", controller.signUp);
Auth.post("/signin", controller.signIn);

module.exports = { Auth };
