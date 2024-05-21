const { where } = require("sequelize");
let User = require("../models/User");

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

  if (user == null) {
    console.log("Usuario no encontrado");
  } //throw new Error("Usuario no encontrado");

  return res.json(user);
}

module.exports = {
  createUser,
  getUser,
};
