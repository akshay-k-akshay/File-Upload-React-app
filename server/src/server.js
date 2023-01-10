const { app } = require("./app");
const { config, logger } = require("./config");

const port = config.get("app.port");

app.listen(port, () => {
  logger.info(`App listening at http://localhost:${port}`);
});
