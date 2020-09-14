const express = require("express");
const TankController = require("./controllers/tanks");
const PlayerController = require("./controllers/players");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/api/:rg/tanks", TankController.getTanks);
app.get("/api/:rg/players/search/:name", PlayerController.searchPlayers);
app.get("/api/:rg/player/:id", PlayerController.getPlayer);
app.get("/api/:rg/player/tanks/:id", TankController.getPlayerTanks);

module.exports = app;
