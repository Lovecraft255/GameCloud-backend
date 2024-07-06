const Game = require("../models/Game");

async function uploadGame(req, res) {
  const { name, company, precio } = req.body;

  if (!name) throw new Error("Nombre de usuario no insertado");
  if (!company) throw new Error("Compania no insertada");
  if (!precio) throw new Error("Precio no insertado");

  try {
    const newGame = await Game.create({
      name: name,
      company: company,
      precio: precio,
    });

    console.log(`Juego nuevo creado: ${newGame}`);

    return res.json(newGame);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function getAllGames(req, res) {
  try {
    const games = await Game.findAll();

    if (!games) res.status(404).json({ msg: "Juego no encontrado" });

    return res.json(games);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function getGame(req, res) {
  try {
    const { name } = req.params;

    const game = await Game.findOne({ where: { name: name } });

    if (!game) res.status(404).json({ msg: "Juego no encontrado" });

    return res.json(game);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function modJuego(req, res) {
  try {
    const { name } = req.params;

    const game = await Game.findOne({ where: { name: name } });

    if (!game) res.status(404).json({ msg: "Juego no encontrado" });

    await Game.update({ ...req.body }, { where: { name: name } });

    return res.json(game);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function eliminarJuego(req, res) {
  try {
    const { name } = req.params;

    const game = await Game.findOne({ where: { name: name } });

    if (!game) res.status(404).json({ msg: "Juego no encontrado" });

    await Game.destroy({ where: { name: name } });

    return res.json(game);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function comprarJuego(req, res) {
  try {
    const { id } = req.body;
    const { name } = req.params;

    const game = await Game.findOne({ where: { name: name } });

    if (!game) res.status(404).json({ msg: "Juego no encontrado" });

    await game.addUser(id);

    return res.json({});
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  uploadGame,
  comprarJuego,
  getGame,
  modJuego,
  eliminarJuego,
  getAllGames,
};
