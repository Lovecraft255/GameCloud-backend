const { PORT } = require("./env");
const app = require("./app");
const User = require("./src/models/User");
const Game = require("./src/models/Game");

async function start() {
  await User.sync();
  await Game.sync();
}
app.listen(PORT, () => console.log("Puerto lanzado en:" + PORT));

start();
