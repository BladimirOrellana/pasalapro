const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Routes = require("./routes/index");
const connectDB = require("./utils/db");

dotenv.config(); // Load environment variables

const app = express();

// Enable CORS for all origins (for development)
app.use(cors()); // This allows your frontend (React) to talk to this backend (Express)

app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to Database
connectDB();

// API Routes
app.use(Routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
