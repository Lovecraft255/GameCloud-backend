const { PORT } = require("./env");
const app = require("./app");
const User = require("./src/models/User");
const Game = require("./src/models/Game");
const User_games = require("./src/models/User-games");

User.belongsToMany(Game, { through: User_games });
Game.belongsToMany(User, { through: User_games });

async function start() {
  await User.sync();
  await Game.sync();
  await User_games.sync();
}
app.listen(PORT, () => console.log("Puerto lanzado en:" + PORT));

start();
