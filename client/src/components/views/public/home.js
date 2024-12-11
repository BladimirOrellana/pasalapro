import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getToken } from "../../firebase/firebase";

const HomePage = () => {
  const [isTokenFound, setTokenFound] = useState(false);
  getToken(setTokenFound);
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
          background: "linear-gradient(90deg, #1976d2, #42a5f5)",
          color: "#fff",
        }}
      >
        <Container>
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            {isTokenFound ? "Push Avilable" : "No push"}
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            Empower Soccer Players with PasalaPro
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            PasalaPro helps soccer players monetize their talent, connect with
            fans, and unlock opportunities to thrive in their game and career.
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            PasalaPro helps soccer players monetize their talent, connect with
            fans, and unlock opportunities to thrive in their game and career.
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            PasalaPro helps soccer players monetize their talent, connect with
            fans, and unlock opportunities to thrive in their game and career.
          </Typography>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="secondary"
            size="large"
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* About Section */}
      <Container sx={{ my: 8 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}
        >
          What is PasalaPro?
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center", mb: 4 }}>
          PasalaPro is a platform built for soccer players to take control of
          their careers by providing tools to monetize their skills, receive
          support from fans, and collaborate with brands and teams. We empower
          athletes to thrive on and off the field.
        </Typography>
      </Container>

      {/* How it Works Section */}
      <Container sx={{ my: 8 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}
        >
          How It Works
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/300x200/?soccer"
                alt="Monetization"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monetize Your Talent
                </Typography>
                <Typography variant="body2">
                  Earn through features like "Buy Me a Coffee," advertising, and
                  exclusive content. Let your fans support you directly!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/300x200/?support"
                alt="Community"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Build a Supportive Community
                </Typography>
                <Typography variant="body2">
                  Connect with your supporters and fans, build a loyal
                  community, and receive direct encouragement to keep pushing
                  your limits.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/300x200/?teamwork"
                alt="Networking"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Collaborate and Network
                </Typography>
                <Typography variant="body2">
                  Partner with teams, brands, and other players. Unlock new
                  opportunities for collaboration and sponsorships.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Container sx={{ my: 8 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}
        >
          Benefits of Using PasalaPro
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Increased Visibility
                </Typography>
                <Typography variant="body2">
                  Get noticed by brands, teams, and sponsors who are eager to
                  support talented players like you.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Direct Fan Support
                </Typography>
                <Typography variant="body2">
                  Let your fans support you in meaningful ways. Whether it's
                  through donations, merchandise, or exclusive content, the
                  support is just a click away.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Opportunities for Growth
                </Typography>
                <Typography variant="body2">
                  Take your career to the next level by connecting with key
                  stakeholders, teams, and sponsors who align with your values
                  and goals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          backgroundColor: "#1976d2",
          color: "#fff",
          mt: 8,
        }}
      >
        <Typography variant="body1" gutterBottom>
          &copy; {new Date().getFullYear()} PasalaPro. All Rights Reserved.
        </Typography>
      </Box>
    </>
  );
};

export default HomePage;
