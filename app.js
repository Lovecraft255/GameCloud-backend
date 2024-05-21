const express = require("express");

const app = express();

const userRoute = require("./src/routes/user");

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    message: "Runing",
  });
});

app.use("/user", userRoute);

module.exports = app;
