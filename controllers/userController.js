const bcrypt = require("bcryptjs"); // Import bcryptjs
const User = require("./../model/userModel");

exports.registerUser = async (req, res) => {
  console.log("req.body ", req.body);
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    city,
    state,
    country,
    zipcode,
    position,
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds (can be adjusted)

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store the hashed password
      role: role || "Fan", // Default role is 'Fan' if not provided
      city,
      state,
      country,
      zipcode,
      position,
    });

    // Save the new user
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("error ", error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Controller to get user by email
exports.getUserByEmail = async (req, res) => {
  console.log("body ", req.body);
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user by email:", err);
    res.status(500).json({ message: "Error fetching user details" });
  }
};

// Controller to update user profile
exports.updateUserProfile = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    city,
    state,
    country,
    zipcode,
    position,
    role,
  } = req.body;
  console.log("body ", req.body);
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the fields that are provided in the request body
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (city) user.city = city;
    if (state) user.state = state;
    if (country) user.country = country;
    if (zipcode) user.zipcode = zipcode;
    if (position) user.position = position;
    if (role) user.role = role;

    // Save the updated user
    await user.save();

    res
      .status(200)
      .json({ message: "User profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user profile", error });
  }
};

// Controller to update user role
exports.updateUserRole = async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ message: "Email and role are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update user role
    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user role", error });
  }
};
