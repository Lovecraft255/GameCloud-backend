const { Router } = require("express");
const { createUser, getUser, cargarSaldo } = require("../controllers/user");

const app = Router();

app.post("/", createUser);
app.get("/:id", getUser);
app.patch("/:name", cargarSaldo);

module.exports = app;
