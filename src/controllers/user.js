const { where } = require("sequelize");
const User = require("../models/User");

async function createUser(req, res) {
  const { name, rol } = req.body;

  console.log(name, rol);

  const newUser = await User.create({
    name: name,
    rol: rol,
  });

  console.log(`Usuario creado: ${newUser}`);

  return res.json(newUser);
}

async function getUser(req, res) {
  const { id } = req.params;
  const user = await User.findOne({ where: { id: id } });

  if (user == null) throw new Error("Usuario no encontrado");

  return res.json(user);
}

async function cargarSaldo(req, res) {
  const { name } = req.params;
  const { saldo } = req.body;

  const user = await User.findOne({ where: { name: name } });

  if (user == null) throw new Error("Repositorio no encontrado");

  await User.increment({ saldo: saldo }, { where: { name: name } });

  return res.json(user);
}

module.exports = {
  createUser,
  getUser,
  cargarSaldo
};
