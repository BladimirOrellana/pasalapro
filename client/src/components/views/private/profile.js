import React, { useContext, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Avatar,
  Paper,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { AuthContext } from "../../firebase/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";
import PlayerCard from "../public/PlayerCard";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout function from context
  const navigate = useNavigate();

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

  if (!user) {
    return null; // Optionally return null while redirecting, to avoid rendering the profile page
  }
  const playerData = {
    name: "Cristiano Ronaldo",
    team: "Manchester United",
    role: "Forward",
    jerseyNumber: "7",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Cristiano_Ronaldo_2018.jpg/800px-Cristiano_Ronaldo_2018.jpg", // Replace with actual image URL
  };

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
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
              Role: {user.role || "Fan"}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
              id: {user._id || "Fan"}
            </Typography>
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
