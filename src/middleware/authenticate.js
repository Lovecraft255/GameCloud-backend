const getToken = require("../auth/getToken");
const { verifyAccessToken } = require("../auth/verifytoken");
const jsonResponse = require("../auth/jsonResponse");

function authenticate(req, res, next) {
  const token = getToken(req.headers);

  if (token) {
    const decoded = verifyAccessToken(token);
    if (decoded) {
      req.user = { ...decoded.user };
      next();
    } else {
      res.status(401).json(jsonResponse(401, { error: "No token provided" }));
    }
  } else {
    res.status(401).json(jsonResponse(401, { error: "No token provided" }));
  }
}

module.exports = authenticate;
