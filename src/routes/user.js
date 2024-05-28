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
app.patch("/:name", cargarSaldo);
app.delete("/:name", eliminarPerfil);

module.exports = app;
