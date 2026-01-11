const { Router } = require("express");

const {
  cargarSaldo,
  eliminarPerfil,
  getUser,
  updateUser,
  loguOut,

} = require("../controllers/user");

const app = Router();

app.post("/logout", loguOut);
app.get("/getuser", getUser);
app.patch("/updateuser/:name", updateUser);
app.patch("/cargarsaldo/:name", cargarSaldo);
app.delete("/eliminarperfil", eliminarPerfil);


module.exports = app;

