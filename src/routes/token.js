const { Router } = require("express");

const { generatToken } = require("../controllers/token");

const app = Router();

app.post("/refresh_token", generatToken);

module.exports = app;
