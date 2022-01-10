const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const blogsRouter = require("./controllers/blogs");
const config = require("./utils/config");
const logger = require("./utils/logger");
require("express-async-errors");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const loginRouter = require("./controllers/login");

const app = express();

const mongoUrl = config.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => logger.info(`Connected to ${mongoUrl} DB.`))
  .catch((error) =>
    logger.error(`Error connecting to ${mongoUrl} DB: ${error.message}`)
  );

app.use(middleware.requestLogger);
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
