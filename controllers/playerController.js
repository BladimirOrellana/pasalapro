const Player = require("../model/Player");
const User = require("../model/userModel"); // Import User model to associate with player

// Create a new player
exports.createPlayer = async (req, res) => {
  const { userId, position, team, bio, profilePicture } = req.body;

  try {
    const newPlayer = new Player({
      userId,
      position,
      team,
      bio,
      profilePicture,
    });

    await newPlayer.save();

    // Update the user's role to "Player"
    const user = await User.findById(userId);
    user.role = "Player";
    await user.save();

    res
      .status(201)
      .json({ message: "Player created successfully", player: newPlayer });
  } catch (error) {
    console.error("Error creating player:", error);
    res.status(500).json({ message: "Error creating player", error });
  }
};

// Get a player by ID
exports.getPlayerById = async (req, res) => {
  const { playerId } = req.params;

  try {
    const player = await Player.findById(playerId)
      .populate("team")
      .populate("userId");
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json(player);
  } catch (error) {
    console.error("Error fetching player:", error);
    res.status(500).json({ message: "Error fetching player", error });
  }
};

// Update player details
exports.updatePlayer = async (req, res) => {
  const { playerId } = req.params;
  const { position, team, bio, profilePicture } = req.body;

  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      { position, team, bio, profilePicture },
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res
      .status(200)
      .json({ message: "Player updated successfully", player: updatedPlayer });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ message: "Error updating player", error });
  }
};

// Delete a player by ID
exports.deletePlayer = async (req, res) => {
  const { playerId } = req.params;

  try {
    const deletedPlayer = await Player.findByIdAndDelete(playerId);
    if (!deletedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    res.status(500).json({ message: "Error deleting player", error });
  }
};
