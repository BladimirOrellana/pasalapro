const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Link to User model
    position: { type: String, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" }, // Reference to the team
    bio: { type: String },
    age: { type: Number, required: true },
    profilePicture: { type: String }, // URL or path to player's profile picture
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", playerSchema);
