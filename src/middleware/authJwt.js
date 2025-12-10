const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth");
const User = require("../models/User");

verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized!" });
      }
      req.UserId = decoded.id;
      next();
    });
  } catch (error) {}
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
