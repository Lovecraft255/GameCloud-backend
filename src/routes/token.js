const { Router } = require("express");

const  generateToken = require("../controllers/token");

const app = Router();

app.post("/refresh_token", generateToken);

module.exports = app;
