const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt");

async function singUp(req, res) {
  const { name, rol, password } = req.body;

  if (!name) throw new Error("Nombre de usuario no insertado");
  if (!rol) throw new Error("Rol no asignado");
  if (!password) throw new Error("Contraseña no ingresada");

  try {
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      rol: rol,
      password: hash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);

    res.json({
      user: userSaved,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function signIn(req, res) {
  const { name, password } = req.body;

  if (!name) throw new Error("Nombre de usuario no insertado");
  if (!password) throw new Error("Contraseña no ingresada");

  try {
    const userFound = await User.findOne({ name });

    if (!userFound) res.status(400).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) res.status(400).json({ message: "incorrect password" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);

    res.json({
      user: userFound,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
async function getUser(req, res) {
  const { name } = req.params;

  try {
    const user = await User.findOne({ where: { name: name } });

    if (!user) res.status(404).json({ msg: "Usuario no encontrado" });

    return res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function updateUser(req, res) {
  const { name } = req.params;

  try {
    const user = await User.findOne({ where: { name: name } });

    if (!user) res.status(404).json({ msg: "Usuario no encontrado" });

    await User.update({ ...req.body }, { where: { name: name } });

    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function cargarSaldo(req, res) {
  const { name } = req.params;
  const { saldo } = req.body;

  try {
    const user = await User.findOne({ where: { name: name } });

    if (!user) res.status(404).json({ msg: "Usuario no encontrado" });

    await User.increment({ saldo: saldo }, { where: { name: name } });

    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function eliminarPerfil(req, res) {
  const { name } = req.body;

  try {
    const user = await User.findOne({ where: { name: name } });

    if (!user) res.status(404).json({ msg: "Usuario no encontrado" });

    await User.destroy({ where: { name: name } });

    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  singUp,
  signIn,
  getUser,
  cargarSaldo,
  eliminarPerfil,
  updateUser,
};
