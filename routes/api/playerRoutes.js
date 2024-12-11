const express = require("express");
const router = express.Router();
const {
  createPlayer,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} = require("../../controllers/playerController");

// Route to create a player
router.post("/create", createPlayer);

// Route to get a player by ID
router.get("/:playerId", getPlayerById);

// Route to update a player by ID
router.put("/:playerId", updatePlayer);

// Route to delete a player by ID
router.delete("/:playerId", deletePlayer);

module.exports = router;
