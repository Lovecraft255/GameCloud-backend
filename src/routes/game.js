const { Router } = require("express");
const { uploadGame } = require("../controllers/game");

const app = Router();

app.post("/", uploadGame);

module.exports = app;
