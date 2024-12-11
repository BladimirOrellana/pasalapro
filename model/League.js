const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensure league name is unique
    },
    description: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    establishedYear: {
      type: Number,
      required: true,
    },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }], // Referencing teams related to this league
    logo: {
      type: String, // URL or path to logo image
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("League", leagueSchema);
