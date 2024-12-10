const Player = require("../model/playerModel");

// Fetch all players
const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new player
const createPlayer = async (req, res) => {
  const { name, position, age } = req.body;

  try {
    const newPlayer = await Player.create({ name, position, age });
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: "Error creating player", error });
  }
};

module.exports = { getAllPlayers, createPlayer };
