const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt");
const { SECRET_TOKEN } = require("../../config");

function loguOut(req, res) {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
}

async function getUser(req, res) {
  const { email } = req.params;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) res.status(404).json({ msg: "Usuario no encontrado" });

    return res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function updateUser(req, res) {
  const { email } = req.params;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) res.status(404).json({ msg: "Usuario no encontrado" });

    await User.update({ ...req.body }, { where: { email: email } });

    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function cargarSaldo(req, res) {
  const { email } = req.params;
  const { saldo } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) res.status(404).json({ msg: "Usuario no encontrado" });

    await User.increment({ saldo: saldo }, { where: { email: email } });

    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function eliminarPerfil(req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) res.status(404).json({ msg: "Usuario no encontrado" });

    await User.destroy({ where: { email: email } });

    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  getUser,
  cargarSaldo,
  eliminarPerfil,
  updateUser,
  loguOut,
};
