const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../../config");

function authRequired(req, res, next) {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: "No token, no autorizado" });

  jwt.verify(token, SECRET_TOKEN, (err, user) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    console.log(user);
    req.user = user;
    next();
  });
}

module.exports = { authRequired };
