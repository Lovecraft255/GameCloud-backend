const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../libs/jwt");
const { validationError } = require("../Errors/validationErrors");
const { appError } = require("../Errors/appError");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // secure sólo en producción (Render usa HTTPS)
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // none en prod, lax en dev
  path: "/", // importante: que sea '/' para que la cookie se incluya en todas las rutas proxeadas
};

async function singUp(req, res) {
  const { name, email, password } = req.body;

  if (!name) throw new validationError("Nombre no ingresado");
  if (!email) throw new validationError("Email no ingresado");
  if (!password) throw new validationError("Contraseña no ingresada");

  try {
    const userFound = await User.findOne({ where: { email } });
    if (userFound) throw new validationError("El email ya está en uso");
    const passhash = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: passhash,
    });

    res.json({
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
}
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new validationError("Email y contraseña son requeridos");

    const user = await User.findOne({ where: { email } });
    if (!user) throw new appError("No se encontro el usuario", 404);

    const passwordMatches = await bcrypt.compare(password, user.password || "");
    if (!passwordMatches) throw new validationError("COntraseña incorrecta");

    const payload = { id: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    // Dentro de src/controllers/auth.js, modifica las opciones de cookie por ejemplo así:

    // en login() usa:
    res.cookie("refreshToken", refreshToken, cookieOptions);

    // en refreshToken() usa:

    return res.json({
      accessToken,
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    return next(err);
  }
}

async function refreshToken(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new validationError("Refresh token is required");

    const { valid, decoded } = verifyToken(refreshToken);
    if (!valid) throw new validationError("Invalid refresh token");

    const user = await User.findByPk(decoded.id);
    if (!user || user.refreshToken !== refreshToken)
      throw new validationError("Invalid refresh token");

    const payload = { id: user.id, email: user.email };
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    res.cookie("refreshToken", newRefreshToken, cookieOptions);

    user.refreshToken = newRefreshToken;
    await user.save();
    res.cookie("refreshToken", newRefreshToken, cookieOptions);
    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    return next(err);
  }
}

async function logout(req, res, next) {
  try {
    const userId = req.body.userId || (req.user && req.user.id);
    if (!userId) throw new validationError("User ID is required for logout");
    const user = await User.findByPk(userId);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    return res.json({ message: "Logged out" });
  } catch (err) {
    return next(err);
  }
}

async function checkAuthStatus(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) return res.status(401).json({ authenticated: false });

    const { valid, decoded } = verifyToken(token);
    if (!valid) return res.status(401).json({ authenticated: false });

    return res.json({ authenticated: true, user: decoded });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  login,
  refreshToken,
  logout,
  checkAuthStatus,
  singUp,
};
