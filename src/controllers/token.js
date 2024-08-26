const express = require("express");
const { jsonResponse } = require("../auth/jsonResponse");
const { verifyRefreshToken } = require("../auth/verifytoken");
const { generateAccessToken } = require("../auth/generateTokens");
const getUserInfo = require("../lib/getUserInfo");
const Token = require("../models/Token");
const getToken = require("../auth/getToken");

async function generatToken(req, res, next) {
  const refreshToken = getToken(req.headers);
  if (refreshToken) {
    try {
      const found = await Token.findOne({ token: refreshToken });
      if (!found) {
        return res
          .status(401)
          .send(jsonResponse(401, { error: "Unauthorized" }));
      }
      const payload = verifyRefreshToken(found.token);
      if (payload) {
        const accessToken = generateAccessToken(payload);
        return res.status(200).json(jsonResponse(200, { accessToken }));
      } else {
        res.status(401).send(jsonResponse(401, { error: "Unauthorized" }));
      }
    } catch (error) {
      res.status(401).send(jsonResponse(401, { error: "Unauthorized" }));
    }
  } else {
    res.status(401).send(jsonResponse(401, { error: "Unauthorized" }));
  }

  res.send("refresh token");
}

module.exports = { generatToken };
