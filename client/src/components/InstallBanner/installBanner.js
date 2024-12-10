import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";

const InstallBanner = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Listen for the 'beforeinstallprompt' event
    const handler = (event) => {
      event.preventDefault(); // Prevent the default install prompt
      setIsInstallable(true);
      setDeferredPrompt(event); // Save the event to trigger the install later
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  // Handle the install button click
  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the installation prompt
      const { outcome } = await deferredPrompt.userChoice; // Get user's response
      console.log(`User response to the install prompt: ${outcome}`);
      setIsInstallable(false); // Hide the banner after the prompt is shown
      setDeferredPrompt(null); // Reset deferredPrompt
    }
  };

  // Render the banner if the app is installable
  return (
    isInstallable && (
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#1976d2",
          color: "white",
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">
          Install PasalaPro to your home screen
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleInstall}
          sx={{ height: "36px" }}
        >
          Install
        </Button>
      </Box>
    )
  );
};

export default InstallBanner;
