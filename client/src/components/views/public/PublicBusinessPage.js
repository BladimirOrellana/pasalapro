import React, { useContext, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Avatar,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import { ThumbUp, Person } from "@mui/icons-material";
import axios from "axios";
import { AuthContext } from "../../firebase/AuthContext";

const PublicBusinessPage = () => {
  const { user } = useContext(AuthContext);
  // Fetch initial data to check for existing business
  useEffect(() => {
    axios
      .get(`/api/sponsors/sponsor/${user._id}`)
      .then((response) => {
        const data = response.data;
        console.log("data sponsor ", data);
      })
      .catch((error) => {
        console.error("Error fetching sponsor profile:", error);
      });
  }, []);
  return (
    <Container sx={{ mt: 5, maxWidth: "lg" }}>
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          backgroundColor: "background.paper",
          boxShadow: 3,
        }}
      >
        <Avatar
          alt="Business Logo"
          src="https://via.placeholder.com/150" // Replace with actual business logo URL
          sx={{ width: 150, height: 150, borderRadius: "50%" }}
        />
        <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2 }}>
          Business Name
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          A brief description of the business or its values goes here. This
          section will give visitors an overview of the business.
        </Typography>

        {/* Social Stats: Likes and Followers */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <IconButton sx={{ marginRight: 3 }}>
            <ThumbUp sx={{ fontSize: 30, color: "primary.main" }} />
          </IconButton>
          <Typography variant="body2" sx={{ marginRight: 6 }}>
            1,254 Likes
          </Typography>

          <IconButton sx={{ marginRight: 3 }}>
            <Person sx={{ fontSize: 30, color: "primary.main" }} />
          </IconButton>
          <Typography variant="body2">2,134 Followers</Typography>
        </Box>

        {/* Call to Action */}
        <Grid container spacing={3} sx={{ mt: 4, justifyContent: "center" }}>
          <Grid item>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: contact@business.com
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone: +123 456 789
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Visit Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              123 Business Street, City, Country
            </Typography>
          </Grid>
        </Grid>

        {/* Follow Button */}
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" sx={{ width: "100%" }}>
            Follow Business
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PublicBusinessPage;
