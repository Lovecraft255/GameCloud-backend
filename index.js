const { PORT } = require("./env");
const app = require("./app");
const User = require("./src/models/User");
const Game = require("./src/models/Game");
const sequelize = require("./src/config/db");


User.belongsToMany(Game, { through: "UserGame" });
Game.belongsToMany(User, { through: "UserGame" });

async function start() {
  await sequelize.sync({
    alter: true,
  });

  app.listen(PORT, () => console.log("Puerto lanzado en:" + PORT));
}

start();
