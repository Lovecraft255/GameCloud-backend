const { Router } = require("express");
const {
  uploadGame,
  comprarJuego,
  getGame,
  modJuego,
  eliminarJuego
} = require("../controllers/game");

const app = Router();

app.post("/", uploadGame);
app.post("/:id", comprarJuego);
app.get("/:id", getGame);
app.patch("/:id", modJuego);
app.delete("/:id", eliminarJuego)

module.exports = app;
