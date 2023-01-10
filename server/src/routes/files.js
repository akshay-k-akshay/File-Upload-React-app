const express = require("express");

const controller = require("../controllers/files-controller");
const authenticator = require("../middlewares/authenticator");
const { uploadFile } = require("../middlewares/fileUploader");
const Files = new express.Router();

Files.post("/", authenticator, uploadFile, controller.upload);
Files.get("/", authenticator, controller.list);
Files.get("/:id", authenticator, controller.getFile);

module.exports = { Files };
