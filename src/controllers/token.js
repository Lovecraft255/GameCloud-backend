const jsonResponse = require("../auth/jsonResponse");
const { verifyRefreshToken } = require("../auth/verifytoken");
const { generateAccessToken } = require("../auth/generateTokens");
const Token = require("../models/Token");
const getToken = require("../auth/getToken");

async function generateToken(req, res, next) {
  const refreshToken = getToken(req.header.authorization);

  console.log(refreshToken);

  if (refreshToken) {
    try {
      const found = await Token.findOne({ token: refreshToken });
      console.log(found);

      if (!found) {
        return res
          .status(401)
          .send(jsonResponse(401, { error: "Unauthorized" }));
      }

      const payload = verifyRefreshToken(found.token);
      if (payload) {
        const accessToken = generateAccessToken(payload.user);
        return res.status(200).json(jsonResponse(200, { accessToken }));
      } else {
        return res
          .status(401)
          .send(jsonResponse(401, { error: "Unauthorized" }));
      }
    } catch (error) {
      return res.status(401).send(jsonResponse(401, { error: "Unauthorized" }));
    }
  } else {
    return res.status(401).send(jsonResponse(401, { error: "Unauthorized" }));
  }
}

module.exports = generateToken;
