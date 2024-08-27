const User = require("../models/User");
const bcrypt = require("bcrypt");
const jst = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../auth/generateTokens");
const Token = require("../models/Token");
const getUserInfo = require("../auth/getUserInfo");
const  jsonResponse = require("../auth/jsonResponse");

async function comparePassword(password, hash) {
  const same = await bcrypt.compare(password, hash);
  return same;
}

function createAccessToken() {
  return generateAccessToken(getUserInfo(User));
}

async function createRefreshToken(params) {
  const refreshToken = generateRefreshToken(getUserInfo(User));

  try {
    await new Token({ token: refreshToken }).save();

    return refreshToken;
  } catch (error) {
    console.log(error);
  }
}

async function singUp(req, res) {
  const { name, rol, password } = req.body;

  if (!name) throw new Error("Nombre de usuario no insertado");
  if (!rol) throw new Error("Rol no asignado");
  if (!password) throw new Error("Contraseña no ingresada");

  try {
    const newUser = await User.create({
      name: name,
      rol: rol,
      password: password,
    });

    res.json({
      user: newUser,
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

    const correctPass = comparePassword(password, user.password);

    if (!correctPass) res.status(401).json({ msg: "Contraseña incorrecta" });

    const accessToken = createAccessToken();
    const refreshToken = await createRefreshToken();

    console.log(accessToken);

    return res.json(
      jsonResponse(200, {
        accessToken,
        refreshToken,
        user: getUserInfo(user),
      })
    );
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function getUser(req, res) {
  const { name } = req.body;

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

async function getUserToken(req, res) {
  res.status(200).json(jsonResponse(200, req.user));
}

module.exports = {
  singUp,
  signIn,
  getUser,
  cargarSaldo,
  eliminarPerfil,
  updateUser,
  getUserToken,
};
