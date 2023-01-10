const { config } = require("./app-config");
const { dbConfig } = require("./db-config");
const { logger, morganOption } = require("./winston");

module.exports = {
  config,
  logger,
  morganOption,
  dbConfig
};
