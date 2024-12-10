import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to home page
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{ fontSize: "150px", fontWeight: "bold", color: "#000" }}
        >
          404
        </Typography>
        <Typography variant="h5" color="textSecondary" sx={{ mb: 3 }}>
          Oops! The page you are looking for doesn’t exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ padding: "10px 20px", fontSize: "16px", fontWeight: "bold" }}
          onClick={handleGoHome}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
