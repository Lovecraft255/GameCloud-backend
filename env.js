require("dotenv").config({ path: "${__dirname}/../.env" });

const PORT = process.env.PORT || 3001;

const USER = process.env.USER || "postgres";
const PASSWORD = process.env.PASSWORD || "postgres";
const HOST = process.env.HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "GameCloud";

module.exports = { PORT, USER, PASSWORD, HOST, DB_NAME };
