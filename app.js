const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: false })); //Esto es para formData
app.use(express.json());

/*var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
};*/

app.use(cors());

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
