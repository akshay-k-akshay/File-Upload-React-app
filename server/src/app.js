const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { morganOption, dbConfig } = require("./config");
const { errorHandler } = require("./middlewares");
const { Auth } = require("./routes/auth");
const { Files } = require("./routes/files");

const app = express();

//db connection
dbConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());
app.use(morgan("combined", morganOption));

// routes
app.use("/auth", Auth);
app.use("/files", Files);

// custom middleware
app.use(errorHandler);

module.exports = { app };
