const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth");
const { profile } = require("./user");

async function singUp(req, res) {
  const { name, email, password } = req.body;

  if (!name) throw new Error("Nombre de usuario no insertado");
  if (!email) throw new Error("Email no ingresado");
  if (!password) throw new Error("Contraseña no ingresada");

  try {
    const userFound = await User.findOne({ where: { email } });
    if (userFound) return res.status(400).json(["esta email ya existe"]);
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