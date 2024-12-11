import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Avatar,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AuthContext } from "../../firebase/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "../public/Dashboard";

const ProfilePage = () => {
  const { user, logout, getToken } = useContext(AuthContext); // Access user and logout function from context
  const navigate = useNavigate();

  // Local state for user profile details
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [city, setCity] = useState(user?.city || "");
  const [state, setState] = useState(user?.state || "");
  const [country, setCountry] = useState(user?.country || "");
  const [zipcode, setZipcode] = useState(user?.zipcode || "");
  const [position, setPosition] = useState(user?.position || "");
  const [role, setRole] = useState(user?.role || "Fan");
  const [error, setError] = useState(null);

  // State for Modal visibility
  const [openModal, setOpenModal] = useState(false);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login page if user is null
    }
  }, [user, navigate]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from context
      navigate("/login"); // Redirect to login page after logout
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  // Handle Role Change
  const handleRoleChange = async (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);

    try {
      const token = await getToken();
      await fetch("/api/users/updaterole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          role: selectedRole,
        }),
      });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...user, role: selectedRole })
      );
    } catch (err) {
      console.error("Error updating role", err);
      setError("Failed to update role");
    }
  };

  // Handle Profile Save
  const handleProfileSave = async () => {
    try {
      const token = await getToken(); // Assuming getToken() returns a valid JWT token

      // Make an Axios POST or PUT request to update the user profile
      const response = await axios.put(
        "/api/users/updateProfile", // Your API endpoint for updating profile
        {
          email: user.email,
          firstName,
          lastName,
          city,
          state,
          country,
          zipcode,
          position,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in headers
          },
        }
      );
      console.log("response ", response.data);
      // If the request is successful, display a success message
      alert("Profile updated successfully!");
      setOpenModal(false); // Close the modal after successful update
    } catch (err) {
      console.error("Error updating profile", err);
      setError("Failed to update profile");
    }
  };

  // Open Modal
  const handleOpenModal = () => setOpenModal(true);

  // Close Modal
  const handleCloseModal = () => setOpenModal(false);

  if (!user) {
    return null;
  }

  return (
    <Container sx={{ mt: 5, maxWidth: "lg" }}>
      <Grid container spacing={4}>
        {/* Profile Section */}
        <Grid
          item
          xs={12}
          sm={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Avatar
            alt={user.email}
            src={user.profilePicture || "https://via.placeholder.com/150"}
            sx={{ width: 150, height: 150, borderRadius: "50%" }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
              {user.email}
            </Typography>

            {/* Open Edit Profile Modal */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleOpenModal}
            >
              Edit Profile
            </Button>

            {/* Logout Button */}
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              sx={{ alignSelf: "flex-start", mt: 3 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <Dashboard />
      {/* Modal to Edit Profile */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="State"
            variant="outlined"
            fullWidth
            value={state}
            onChange={(e) => setState(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Country"
            variant="outlined"
            fullWidth
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Zip Code"
            variant="outlined"
            fullWidth
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Position to Play"
            variant="outlined"
            fullWidth
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Role Selection */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              value={role}
              onChange={handleRoleChange}
              label="Role"
            >
              <MenuItem value="Player">Player</MenuItem>
              <MenuItem value="Sponsor">Sponsor</MenuItem>
              <MenuItem value="League">League</MenuItem>
              <MenuItem value="Fan">Fan</MenuItem>
            </Select>
          </FormControl>

          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleProfileSave} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
