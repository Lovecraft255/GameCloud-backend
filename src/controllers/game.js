const Games = require("../models/Game");

async function uploadGame(req, res) {
  const { name, company, precio } = req.body;

  if (name == undefined) throw new Error("Nombre de usuario no insertado");
  if (company == undefined) throw new Error("Compania no insertada");
  if (precio == undefined) throw new Error("Precio no insertado");

  const newGame = await Games.create({
    name: name,
    company: company,
    precio: precio,
  });

  console.log(`Juego nuevo creado: ${newGame}`);

  return res.json(newGame);
}

async function comprarJuego(req, res) {
  const { id } = req.body;
  const { name } = req.params;

  const game = await Games.findOne({ where: { name: name } });

  await game.addUser(id);

  return res.json({});
}

module.exports = {
  uploadGame,
  comprarJuego,
};
