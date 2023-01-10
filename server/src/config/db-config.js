const mongoose = require("mongoose");

const { config } = require("./app-config");
const { logger } = require("./winston");

// dbUrl and credentials
const dbUrl = config.get("db.url");

module.exports = {
  dbConfig: () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(`${dbUrl}`, { useNewUrlParser: true });

    mongoose.connection.on("connected", function () {
      logger.info(`DB has been connected to ${dbUrl}`);
    });
  }
};
