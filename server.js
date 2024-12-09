const express = require("express");
const dotenv = require("dotenv");
const playerRoutes = require("./routes/playerRoutes");
const connectDB = require("./utils/db");

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Connect to Database
connectDB();

// API Routes
app.use("/api/players", playerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
