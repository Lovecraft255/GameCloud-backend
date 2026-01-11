const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth");
const { authError } = require("../Errors/authError");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return next(new authError.unauthorized("No se proporcionó ningún token"));
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return next(new authError.unauthorized("Token inválido o expirado"));
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = {
  verifyToken,
};
