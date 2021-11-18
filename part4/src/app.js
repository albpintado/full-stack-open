const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const blogsRouter = require("./controllers/blogs");
const config = require("./utils/config");
const logger = require("./utils/logger");

const app = express();

const mongoUrl = config.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => logger.info(`Connected to ${mongoUrl} DB.`))
  .catch((error) =>
    logger.error(`Error connecting to ${mongoUrl} DB: ${error.message}`)
  );

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
