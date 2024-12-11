const League = require("../models/League");

// Create a new league
exports.createLeague = async (req, res) => {
  const { name, description, country, establishedYear, logo } = req.body;

  try {
    const newLeague = new League({
      name,
      description,
      country,
      establishedYear,
      logo,
    });

    await newLeague.save();
    res
      .status(201)
      .json({ message: "League created successfully", league: newLeague });
  } catch (error) {
    console.error("Error creating league:", error);
    res.status(500).json({ message: "Error creating league", error });
  }
};

// Get a league by ID
exports.getLeagueById = async (req, res) => {
  const { leagueId } = req.params;

  try {
    const league = await League.findById(leagueId).populate("teams"); // Populate teams if needed
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }

    res.status(200).json(league);
  } catch (error) {
    console.error("Error fetching league:", error);
    res.status(500).json({ message: "Error fetching league", error });
  }
};

// Get all leagues
exports.getAllLeagues = async (req, res) => {
  try {
    const leagues = await League.find();
    res.status(200).json(leagues);
  } catch (error) {
    console.error("Error fetching leagues:", error);
    res.status(500).json({ message: "Error fetching leagues", error });
  }
};

// Update league by ID
exports.updateLeague = async (req, res) => {
  const { leagueId } = req.params;
  const { name, description, country, establishedYear, logo } = req.body;

  try {
    const updatedLeague = await League.findByIdAndUpdate(
      leagueId,
      { name, description, country, establishedYear, logo },
      { new: true } // Return the updated league
    );

    if (!updatedLeague) {
      return res.status(404).json({ message: "League not found" });
    }

    res
      .status(200)
      .json({ message: "League updated successfully", league: updatedLeague });
  } catch (error) {
    console.error("Error updating league:", error);
    res.status(500).json({ message: "Error updating league", error });
  }
};

// Delete league by ID
exports.deleteLeague = async (req, res) => {
  const { leagueId } = req.params;

  try {
    const deletedLeague = await League.findByIdAndDelete(leagueId);
    if (!deletedLeague) {
      return res.status(404).json({ message: "League not found" });
    }

    res.status(200).json({ message: "League deleted successfully" });
  } catch (error) {
    console.error("Error deleting league:", error);
    res.status(500).json({ message: "Error deleting league", error });
  }
};
