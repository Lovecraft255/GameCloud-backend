const Games = require("../models/Game");

async function uploadGame(req, res) {
  const { name, company, genres, precio } = req.body;

  console.log(
    "El nombre del juego es:",
    name,
    "\n La compania es",
    company,
    "\n Los generos son",
    genres,
    "\n Y el precio es",
    precio
  );

  return res.json({});
}

module.exports = {
  uploadGame,
};
