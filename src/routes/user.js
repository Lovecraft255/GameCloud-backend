const { Router } = require("express");

const {
  singUp,
  signIn,
  cargarSaldo,
  eliminarPerfil,
  updateUser,
  loguOut,
  profile,
  verifyToken,
} = require("../controllers/user");

const { authRequired } = require("../middleware/validateToken");

const app = Router();

app.post("/signup", singUp);
app.post("/singin", signIn);
app.post("/logout", loguOut);
app.patch("/updateuser/:name", updateUser);
app.patch("/cargarsaldo/:name", cargarSaldo);
app.delete("/eliminarperfil", eliminarPerfil);
app.get("/profile", authRequired, profile);
app.get("/verify", verifyToken);

module.exports = app;
