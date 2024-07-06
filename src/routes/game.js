const { Router } = require("express");
const {
  uploadGame,
  comprarJuego,
  getGame,
  modJuego,
  eliminarJuego,
  getAllGames,
} = require("../controllers/game");

const app = Router();

app.post("/uploadgame", uploadGame);
app.get("/getgames", getAllGames);
app.post("/comprarjuego/:name", comprarJuego);
app.get("/getgame/:name", getGame);
app.patch("/modjuego/:name", modJuego);
app.delete("/eliminarjuego/:name", eliminarJuego);

module.exports = app;
