require("dotenv").config();

const MONGO_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const { PORT } = process.env;

module.exports = { PORT, MONGO_URL };
