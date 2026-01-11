const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { appError } = require("../Errors/appError");

function loguOut(req, res) {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
}

async function getUser(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) throw new appError("Usuario no encontrado", 404);

    return res.json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res) {
  const { email } = req.params;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) throw new appError("Usuario no encontrado", 404);

    await User.update({ ...req.body }, { where: { email: email } });

    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function cargarSaldo(req, res) {
  const { email } = req.params;
  const { saldo } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) throw new appError("Usuario no encontrado", 404);

    await User.increment({ saldo: saldo }, { where: { email: email } });

    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function eliminarPerfil(req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) throw new appError("Usuario no encontrado", 404);

    await User.destroy({ where: { email: email } });

    res.json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUser,
  cargarSaldo,
  eliminarPerfil,
  updateUser,
  loguOut,
};
