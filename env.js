require("dotenv").config({ path: "${__dirname}/../.env" });

const PORT = process.env.PORT || 3001;

const USER = process.env.USER || "raiden";
const PASSWORD = process.env.PASSWORD || "dante";
const HOST = process.env.HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "gamecloud";
const JWT_SECRET = process.env.JWT_SECRET || "mmikuslovejs";

module.exports = { PORT, USER, PASSWORD, HOST, DB_NAME, JWT_SECRET };
