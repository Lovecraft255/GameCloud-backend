const { appError } = require("../Errors/appError");
const { validationError } = require("../Errors/validationErrors");
const Game = require("../models/Game");

async function uploadGame(req, res) {
  const { name, company, precio } = req.body;

  if (!name) throw new validationError("Nombre no ingresado");
  if (!company) throw new validationError("Compañia no ingresada");
  if (!precio) throw new validationError("Precio no insertado");

  try {
    const newGame = await Game.create({
      name: name,
      company: company,
      precio: precio,
    });

    console.log(`Juego nuevo creado: ${newGame}`);

    return res.json(newGame);
  } catch (error) {
    next(error);
  }
}

async function getAllGames(req, res) {
  try {
    const games = await Game.findAll();

    if (!games) throw new appError("Juegos no encontrados", 404);

    return res.json(games);
  } catch (error) {
    next(error);
  }
}

async function getGame(req, res) {
  try {
    const { name } = req.params;

    const game = await Game.findOne({ where: { name: name } });

    if (!game) throw new appError("Juego no encontrado", 404);

    return res.json(game);
  } catch (error) {
    next(error);
  }
}

async function modJuego(req, res) {
  try {
    const { name } = req.params;

    const game = await Game.findOne({ where: { name: name } });

    if (!game) throw new appError("Juego no encontrado", 404);

    await Game.update({ ...req.body }, { where: { name: name } });

    return res.json(game);
  } catch (error) {
    next(error);
  }
}

async function eliminarJuego(req, res) {
  try {
    const { name } = req.params;

    const game = await Game.findOne({ where: { name: name } });

    if (!game) throw new appError("Juego no encontrado", 404);

    await Game.destroy({ where: { name: name } });

    return res.json(game);
  } catch (error) {
    next(error);
  }
}

async function comprarJuego(req, res) {
  try {
    const { id } = req.body;
    const { name } = req.params;

    const game = await Game.findOne({ where: { name: name } });

    if (!game) throw new appError("Juego no encontrado", 404);

    await game.addUser(id);

    return res.json({});
  } catch (error) {
    next(error);
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
