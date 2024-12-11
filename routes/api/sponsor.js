const express = require("express");
const router = express.Router();
const sponsorController = require("../../controllers/sponsorController");

// Create a new sponsor
router.post("/sponsor", sponsorController.createSponsor);

// Get all sponsors
router.get("/sponsor", sponsorController.getAllSponsors);

// Get sponsor by ID
router.get("/sponsor/:userId", sponsorController.getSponsorById);

// Update sponsor details
router.put("/sponsor/:id", sponsorController.updateSponsor);

// Delete sponsor
router.delete("/sponsor/:id", sponsorController.deleteSponsor);

module.exports = router;
