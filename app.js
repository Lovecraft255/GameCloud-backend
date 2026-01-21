const express = require("express");
const cors = require("cors");

const userRoute = require("./src/routes/user");
const gameRoute = require("./src/routes/game");
const authRoute = require("./src/routes/auth");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://games-cloud-front.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
    
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Running" });
});

app.use("/user", userRoute);
app.use("/game", gameRoute);
app.use("/auth", authRoute);

module.exports = app;
