const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth");
const { profile } = require("./user");
const { validationError } = require("../Errors/validationErrors");
const { appError } = require("../Errors/appError");

async function singUp(req, res) {
  const { name, email, password } = req.body;

  if (!name) throw new validationError("Nombre no ingresado");
  if (!email) throw new validationError("Email no ingresado");
  if (!password) throw new validationError("Contraseña no ingresada");

  try {
    const userFound = await User.findOne({ where: { email } });
    if (userFound) throw new validationError("El email ya está en uso");
    const passhash = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: passhash,
    });

    res.json({
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email) throw new validationError("Email no ingresado");
  if (!password) throw new validationError("Contraseña no ingresada");

  try {
    const userFound = await User.findOne({ where: { email: email } });

    if (!userFound)
      throw new appError("No se encontró ningún usuario con ese email", 404);

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      throw new validationError("La contraseña ingresada es incorrecta");

    const token = jwt.sign({ id: userFound.id }, jwtSecret, {
      expiresIn: 86400,
    });

    res.status(200).send({
      id: userFound.id,
      name: userFound.name,
      password: userFound.password,
      email: userFound.email,
      profilePhoto: userFound.profilePhoto,
      saldo: userFound.saldo,
      gamesAmmount: userFound.gamesAmmount,
      accesToken: token,
    });
  } catch (error) {
    await res.status(500).json(error.message);
  }
}

module.exports = { singUp, signIn };
