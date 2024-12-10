const express = require("express");
const User = require("./../../model/userModel");
const bcrypt = require("bcryptjs");
const userController = require("./../../controllers/userController");
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/:email", userController.getUserByEmail);
// POST route to update the user role
router.post("/updaterole", userController.updateUserRole);
module.exports = router;
