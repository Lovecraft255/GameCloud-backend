const { Router } = require("express");
const authenticate = require("../middleware/authenticate")
const {
  singUp,
  signIn,
  getUser,
  cargarSaldo,
  eliminarPerfil,
  updateUser,
  getUserToken,
} = require("../controllers/user");

const app = Router();

app.post("/signup", singUp);
app.post("/singin", signIn);
app.patch("/updateuser/:name", updateUser);
app.get("/getuser", getUser);
app.get("/usertoken",authenticate, getUserToken);
app.patch("/cargarsaldo/:name", cargarSaldo);
app.delete("/eliminarperfil", eliminarPerfil);

module.exports = app;
