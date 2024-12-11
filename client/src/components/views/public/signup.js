import React, { useContext, useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../firebase/AuthContext";

const Signup = () => {
  const { user } = useContext(AuthContext); // Access the authenticated user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // If the user is already logged in, redirect to the profile page
  useEffect(() => {
    if (user) {
      navigate("/profile"); // Redirect to profile if user is logged in
    }
  }, [user, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Firebase sign-up
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Send necessary data to the backend (avoid sending password)
      const userData = {
        email: firebaseUser.email,
        firstName,
        lastName,
        city,
        state,
        country,
        zipcode,
        password, // The password is necessary for authentication but not stored in plain text
        role: "Fan", // Default role is 'fan'
      };

      // Send to backend to store in MongoDB
      await axios.post("/api/users/register", userData);

      // Redirect to profile page after successful signup
      navigate("/profile");
    } catch (err) {
      console.error("Error during signup:", err);
      setError("Error: " + err.message); // Set error message if something goes wrong
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error} {/* Display any error that occurred during signup */}
        </Typography>
      )}
      <TextField
        fullWidth
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Zip Code"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        margin="normal"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSignup}
        sx={{ mt: 2 }}
      >
        Signup
      </Button>
      <Button
        fullWidth
        variant="text"
        color="primary"
        component={Link}
        to={"/login"}
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Signup;
