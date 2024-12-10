const bcrypt = require("bcryptjs"); // Import bcryptjs
const User = require("./../model/userModel");

exports.registerUser = async (req, res) => {
  console.log("req.body ", req.body);
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("user ", existingUser);
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds (can be adjusted)

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword, // Store the hashed password
      role: role || "fan", // Default role is 'fan' if not provided
    });
    console.log("user ", newUser);
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
