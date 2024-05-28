const { Router } = require("express");
const { uploadGame, comprarJuego, getGame } = require("../controllers/game");

const app = Router();

app.post("/", uploadGame);
app.post("/:name", comprarJuego);
app.get("/:id", getGame);

module.exports = app;
