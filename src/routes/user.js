const { Router } = require("express");
const { createUser, getUser } = require("../controllers/user");

const app = Router();

app.post("/", createUser);
app.get("/:id", getUser);

module.exports = app;
