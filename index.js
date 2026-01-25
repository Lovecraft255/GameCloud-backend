require("dotenv").config();
const app = require("./app");
const sequelize = require("./src/config/db");
const User = require("./src/models/User");
const Juego = require("./src/models/Game");

const PORT = process.env.PORT || 3001;

User.belongsToMany(Juego, { through: "UserGame" });
Juego.belongsToMany(User, { through: "UserGame" });

async function start() {
  try {
    await sequelize.sync();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(` Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error(" Error al iniciar servidor:", error);
  }
}

start();
