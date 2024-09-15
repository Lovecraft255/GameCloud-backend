const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});

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
