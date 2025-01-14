const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../libs/jwt");

async function singUp(req, res) {
  const { name, email, password } = req.body;

  if (!name) throw new Error("Nombre de usuario no insertado");
  if (!email) throw new Error("Email no ingresado");
  if (!password) throw new Error("Contraseña no ingresada");

  try {
    const userFound = await User.findOne({ where: { email } });
    if (userFound) return res.status(400).json(["esta email ya existe"]);
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hash,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved.dataValues.id });
    res.cookie("token", token);

    res.json({
      user: userSaved,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: "Email no insertado" });
  if (!password)
    return res.status(400).json({ message: "Contraseña no insertada" });

  try {
    const userFound = await User.findOne({ where: { email: email } });

    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: userFound.id });

    res.cookie("token", token);

    res.json({
      user: userFound,
    });
  } catch (error) {
    await res.status(500).json(error.message);
  }
}

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

async function profile(req, res) {
  console.log(req.user);
  const userFound = await User.findByPk(req.user.id);

  if (!userFound) res.status(400).json({ msg: "Usuario no encontrado" });
  console.log(userFound);

  return res.json({
    id: userFound.id,
    name: userFound.name,
    email: userFound.email,
    password: userFound.password,
  });
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
  singUp,
  signIn,
  getUser,
  cargarSaldo,
  eliminarPerfil,
  updateUser,
  loguOut,
  profile,
};
