const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoute = require("./src/routes/user");
const gameRoute = require("./src/routes/game");
const authRoute = require("./src/routes/auth");

const app = express();

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://games-cloud-front.vercel.app", // producción (ajusta si tu dominio es otro)
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl) OR if origin is in the allowlist
    if (!origin || ALLOWED_ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS: Origin not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware
app.use(cors(corsOptions));
// Ensure preflight requests are handled
app.options("*", cors(corsOptions));

// Extra safety: set CORS headers explicitly and add Vary header to help caches
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", corsOptions.methods.join(","));
  res.setHeader(
    "Access-Control-Allow-Headers",
    corsOptions.allowedHeaders.join(","),
  );
  res.setHeader("Vary", "Origin");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Running" });
});

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/game", gameRoute);

module.exports = app;
