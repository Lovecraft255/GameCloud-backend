const express = require("express");
const cors = require("cors");

const userRoute = require("./src/routes/user");
const gameRoute = require("./src/routes/game");
const authRoute = require("./src/routes/auth");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://games-cloud-front.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Running" });
});

app.use("/user", userRoute);
app.use("/game", gameRoute);
app.use("/auth", authRoute);

module.exports = app;
