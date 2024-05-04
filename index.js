const { PORT } = require("./env");
const app = require("./app");
const User = require("./src/models/User");

async function start() {
  await User.sync();
}
app.listen(PORT, () => console.log("Puerto lanzado en:" + PORT));

start();
