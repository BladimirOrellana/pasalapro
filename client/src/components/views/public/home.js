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
import InstallBanner from "../../iosInstallBanner/iosInstallBanner";

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90vh",
          textAlign: "center",
          background: "linear-gradient(120deg, #1976d2, #42a5f5)",
          color: "#fff",
        }}
      >
        <Container>
          <Typography variant="h3" sx={{ mb: 4, fontWeight: "bold" }}>
            Welcome to PasalaPro
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Your Gateway to Growth, Opportunities, and Fan Support in Soccer.
          </Typography>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 5,
              py: 2,
              fontSize: "1.2rem",
              textTransform: "uppercase",
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>

      {/* About Section */}
      <Container sx={{ my: 8, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          What is PasalaPro?
        </Typography>
        <Typography
          variant="h6"
          sx={{
            lineHeight: 1.6,
            color: "#555",
            maxWidth: "800px",
            margin: "auto",
            mb: 6,
          }}
        >
          PasalaPro is a cutting-edge platform designed for soccer players who
          dream big. We empower athletes to take control of their careers by
          providing tools to monetize their skills, connect with fans, and
          attract sponsorships. Whether you’re looking to shine locally or
          globally, PasalaPro helps you unlock your true potential.
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
                  Use tools like “Buy Me a Coffee” and ad opportunities to earn
                  directly from your skills and fanbase.
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
                alt="Support"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Connect with Sponsors
                </Typography>
                <Typography variant="body2">
                  Attract local and international sponsors looking for talented
                  players to back. Your talent deserves recognition.
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
                  Build Your Community
                </Typography>
                <Typography variant="body2">
                  Engage with fans and teammates. Build a loyal community that
                  supports your growth on and off the field.
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
          Why Choose PasalaPro?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Discover Opportunities
                </Typography>
                <Typography variant="body2">
                  Gain exposure to brands, teams, and sponsors looking to invest
                  in promising athletes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Grow Your Network
                </Typography>
                <Typography variant="body2">
                  Collaborate with other players, sponsors, and coaches to grow
                  your career.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Get Direct Fan Support
                </Typography>
                <Typography variant="body2">
                  Receive financial support, merchandise sales, and
                  encouragement from your fans.
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
        <InstallBanner />
      </Box>
    </>
  );
};

export default HomePage;
