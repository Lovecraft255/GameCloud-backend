const { PORT } = require("./env");
const app = require("./app");
const User = require("./src/models/User");
const Game = require("./src/models/Game");

User.belongsToMany(Game, { through: "UserGame"});
Game.belongsToMany(User, { through: "UserGame"});

async function start() {
  await User.sync({force:true});

  await Game.sync({force:true});
}
app.listen(PORT, () => console.log("Puerto lanzado en:" + PORT));

start();
