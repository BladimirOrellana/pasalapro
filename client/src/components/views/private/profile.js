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
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { AuthContext } from "../../firebase/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";
import PlayerCard from "../public/PlayerCard"; // Assuming PlayerCard is a custom component

const ProfilePage = () => {
  const { user, logout, getToken } = useContext(AuthContext); // Access user and logout function from context
  const navigate = useNavigate();

  // Local state for role update
  const [role, setRole] = useState(user?.role || "Fan"); // Default to 'Fan' if no role is set
  const [error, setError] = useState(null);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login page if user is null
    }
  }, [user, navigate]); // The useEffect runs when the 'user' state changes

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from context
      navigate("/login"); // Redirect to login page after logout
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  const handleRoleChange = async (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);

    try {
      // Update user role in your backend or Firebase
      // Assuming you have a backend API to update the role
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
      // Optionally update the user in localStorage
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...user, role: selectedRole })
      );
    } catch (err) {
      console.error("Error updating role", err);
      setError("Failed to update role");
    }
  };

  if (!user) {
    return null; // Optionally return null while redirecting, to avoid rendering the profile page
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
              {user.email}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
              {user.email}
            </Typography>

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

            {/* Edit Profile Button */}
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<Edit />}
              sx={{ alignSelf: "flex-start", mt: 3 }}
              onClick={() => console.log("Edit Profile clicked")}
            >
              Edit Profile
            </Button>

            {/* Logout Button */}
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              sx={{ alignSelf: "flex-start", mt: 3 }}
              onClick={handleLogout} // Call logout function on click
            >
              Logout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
