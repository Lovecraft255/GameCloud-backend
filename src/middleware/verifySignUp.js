const User = require("../models/User");

verificarMailoUsuarioduplicado = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user)
      return res.status(400).json({ message: "El email ya está en uso." });

    usar = await User.findOne({ where: { name: req.body.name } });
    if (usar)
      return res.status(400).json({ message: "El nombre de usuario ya está en uso." });
    next();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const verifySignUp = {
  verificarMailoUsuarioduplicado: verificarMailoUsuarioduplicado,
};

module.exports = verifySignUp;