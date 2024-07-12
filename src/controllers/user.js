const { where } = require("sequelize");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jst = require("jsonwebtoken");
const authConfig = require("../../auth");

async function singUp(req, res) {
  const { name, rol, password } = req.body;

  if (!name) throw new Error("Nombre de usuario no insertado");
  if (!rol) throw new Error("Rol no asignado");
  if (!password) throw new Error("Contraseña no ingresada");

  const hashedPassword = bcrypt.hashSync(
    password,
    Number.parseInt(authConfig.rounds)
  );

  try {
    const newUser = await User.create({
      name: name,
      rol: rol,
      password: hashedPassword,
    });

    const token = jst.sign({ user: newUser }, authConfig.secret, {
      expiresIn: authConfig.expires,
    });

    res.json({
      user: newUser,
      token: token,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function signIn(req, res) {
  let { name, password } = req.body;

  console.log(name);

  try {
    let user = await User.findOne({ where: { name: name } });

    if (!user) res.status(404).json({ msg: "Usuario no encontrado" });

    if (bcrypt.compareSync(password, user.password)) {
      const token = jst.sign({ user: user }, authConfig.secret, {
        expiresIn: authConfig.expires,
      });

      res.json({
        user: user,
        token: token,
      });
    } else {
      res.status(401).json({ msg: "Contraseña incorrecta" });
    }
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
