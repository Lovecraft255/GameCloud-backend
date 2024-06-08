const { Router } = require("express");
const {
  uploadGame,
  comprarJuego,
  getGame,
  modJuego,
  eliminarJuego,
} = require("../controllers/game");

const app = Router();

app.post("/uploadgame", uploadGame);
app.post("/comprarjuego/:name", comprarJuego);
app.get("/getgame", getGame);
app.patch("/modjuego/:name", modJuego);
app.delete("/eliminarjuego/:name", eliminarJuego);

module.exports = app;
