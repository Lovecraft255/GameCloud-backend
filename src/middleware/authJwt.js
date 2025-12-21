const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth");
const User = require("../models/User");
const { authError } = require("../Errors/authError");

verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];

    if (!token) {
      throw new authError.unauthorized("No se proporcionó ningún token");
    }

    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        throw new authError.unauthorized("Token inválido o expirado");
      }
      req.UserId = decoded.id;
      next();
    });
    2;
  } catch (error) {
    next(error);
  }
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
