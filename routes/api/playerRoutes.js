const express = require("express");
const {
  getAllPlayers,
  createPlayer,
} = require("../../controllers/playerController");
const router = express.Router();

// GET all players
router.get("/", getAllPlayers);

// POST a new player
router.post("/", createPlayer);

module.exports = router;
