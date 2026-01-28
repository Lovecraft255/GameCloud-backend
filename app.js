const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoute = require("./src/routes/user");
const gameRoute = require("./src/routes/game");
const authRoute = require("./src/routes/auth");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://games-cloud-front.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // 👈 PRIMERO
app.options("*", cors(corsOptions)); // 👈 CLAVE
app.use(cookieParser()); // 👈 ANTES de routes
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Running" });
});

app.use("/auth", authRoute); // 👈 DESPUÉS
app.use("/user", userRoute);
app.use("/game", gameRoute);

module.exports = app;
