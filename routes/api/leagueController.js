const express = require("express");
const router = express.Router();
const {
  createLeague,
  getLeagueById,
  getAllLeagues,
  updateLeague,
  deleteLeague,
} = require("../../controllers/leagueController");

// Route to create a league
router.post("/create", createLeague);

// Route to get a league by its ID
router.get("/:leagueId", getLeagueById);

// Route to get all leagues
router.get("/", getAllLeagues);

// Route to update a league by its ID
router.put("/:leagueId", updateLeague);

// Route to delete a league by its ID
router.delete("/:leagueId", deleteLeague);

module.exports = router;
