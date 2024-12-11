const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, // You can make it required or not based on your needs
    },
    lastName: {
      type: String,
      required: true, // You can make it required or not based on your needs
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
      enum: ["Player", "Fan", "Sponsor", "League"], // Role can be one of these
      default: "Fan", // Default role
    },
    profilePicture: {
      type: String, // URL or path to the user's profile picture
    },
    bio: {
      type: String, // For players, fans, or sponsors to add bio info
    },
    city: {
      type: String, // User's city
    },
    state: {
      type: String, // User's state
    },
    country: {
      type: String, // User's country
    },
    zipcode: {
      type: String, // User's zipcode
    },
    position: {
      type: String, // Position to play for players (e.g., "Forward", "Midfielder")
    },
    // Add any other necessary fields specific to your application
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
