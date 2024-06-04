const { Router } = require("express");
const {
  createUser,
  getUser,
  cargarSaldo,
  eliminarPerfil,
  updateUser,
} = require("../controllers/user");

const app = Router();

app.post("/", createUser);
app.patch("/:id", updateUser);
app.get("/:id", getUser);
app.patch("/:id", cargarSaldo);
app.delete("/:id", eliminarPerfil);

module.exports = app;
