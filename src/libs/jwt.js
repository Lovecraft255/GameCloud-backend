const { SECRET_TOKEN } = require("../../config");
const jwt = require("jsonwebtoken");

function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_TOKEN, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);

      resolve(token);
    });
  });
}

module.exports = { createAccessToken };
