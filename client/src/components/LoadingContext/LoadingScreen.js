// src/components/LoadingContext/LoadingScreen.js

import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // Ensure it overlays all content
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress color="primary" size={60} />
        <Typography variant="h6" color="white" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingScreen;
