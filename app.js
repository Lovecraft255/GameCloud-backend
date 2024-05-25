const express = require("express");

const app = express();

const userRoute = require("./src/routes/user");
const gameRoute = require("./src/routes/game");

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    message: "Runing",
  });
});

app.use("/user", userRoute);
app.use("/game", gameRoute);

module.exports = app;
