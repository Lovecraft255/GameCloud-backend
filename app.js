const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 3000");
});

const userRoute = require("./src/routes/user");

const gameRoute = require("./src/routes/game");
const authRoute = require("./src/routes/auth");

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({
    message: "Runing",
  });
});

app.use("/user", userRoute);
app.use("/game", gameRoute);
app.use("/auth", authRoute);

module.exports = app;
