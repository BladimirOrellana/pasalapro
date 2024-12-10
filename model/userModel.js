// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Player", "Fan", "Sponsor"], // Role can be one of these
      default: "Fan", // Default role
    },
    // You can add more fields specific to each role if necessary
    profilePicture: {
      type: String, // URL or path to the user's profile picture
    },
    bio: {
      type: String, // For players, fans, or sponsors to add bio info
    },
    // Additional fields can go here
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
