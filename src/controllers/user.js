const { where } = require("sequelize");
const User = require("../models/User");

async function createUser(req, res) {
  const { name, rol } = req.body;

  console.log(name, rol);

  if (name == undefined) throw new Error("Nombre de usuario no insertado");

  if (rol == undefined) throw new Error("Rol no asignado");

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

async function updateUser(req, res) {
  const { id } = req.params;

  const user = await User.findOne({ where: { id: id } });

  if (user == null) throw new error("Usuario no encontrado");

  await User.update({ ...req.body }, { where: { id: id } });

  return res.json(user);
}

async function cargarSaldo(req, res) {
  const { id } = req.params;
  const { saldo } = req.body;

  const user = await User.findOne({ where: { id: id } });

  if (user == null) throw new Error("Usuario no encontrado");

  await User.increment({ saldo: saldo }, { where: { id: id } });

  return res.json(user);
}

async function eliminarPerfil(req, res) {
  const { id } = req.body;

  const user = await User.findOne({ where: { id: id } });

  if (user == null) throw new error("Usuario no encontrado");

  await User.destroy({ where: { id: id } });
  return res.json(user);
}

module.exports = {
  createUser,
  getUser,
  cargarSaldo,
  eliminarPerfil,
  updateUser,
};
