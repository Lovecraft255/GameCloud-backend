const {verifySignUp} = require("../middleware");
const {singUp, signIn} = require("../controllers/auth");

const { Router } = require("express");
const app = Router();

app.post("/signup", verifySignUp.verificarMailoUsuarioduplicado, singUp);
app.post("/signin", signIn);

module.exports = app;
