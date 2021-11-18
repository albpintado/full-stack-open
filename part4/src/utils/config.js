require("dotenv").config();

const { MONGO_URL } = process.env;
const { PORT } = process.env;

module.exports = { PORT, MONGO_URL };
