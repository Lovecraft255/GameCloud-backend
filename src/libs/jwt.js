const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration, jwtRefreshExpiration} = require("../../config");

const tryPaths = [
  '../auth/config/auth',
  '../config/auth',
  '../../auth/config/auth',
  './auth/config/auth'
];

let lastErr;
for (const p of tryPaths) {
  try {
    authConfig = require(p);
    break;
  } catch (e) {
    lastErr = e;
  }
}




function generateAccessToken(payload) {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration || '15m' });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtRefreshExpiration || '7d' });
}

function verifyToken(token) {
  try {
    return { valid: true, decoded: jwt.verify(token, jwtSecret) };
  } catch (err) {
    return { valid: false, error: err };
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
  