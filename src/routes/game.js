const { Router } = require("express");
const { uploadGame, comprarJuego } = require("../controllers/game");

const app = Router();

app.post("/", uploadGame);
app.post("/:name", comprarJuego);

module.exports = app;
