import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";

const InstallBanner = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Check if the user is on iOS
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      setIsIos(true); // Set state if iOS
    }

    // Listen for the 'beforeinstallprompt' event for Android and Desktop
    const handler = (event) => {
      event.preventDefault(); // Prevent the default install prompt
      setIsInstallable(true);
      setDeferredPrompt(event); // Save the event to trigger the install later
      console.log("beforeinstallprompt event triggered"); // Log to check if it's firing
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the installation prompt
      const { outcome } = await deferredPrompt.userChoice; // Get user's response
      console.log(`User response to the install prompt: ${outcome}`);
      setIsInstallable(false); // Hide the banner after the prompt is shown
      setDeferredPrompt(null); // Reset deferredPrompt
    }
  };

  return (
    <>
      {isIos ? (
        // Custom banner for iOS with instructions to add to the home screen
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
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1">
            To install PasalaPro, tap the Share button and select "Add to Home
            Screen".
          </Typography>
        </Box>
      ) : (
        // Banner for Android or Desktop, where install prompt works
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
      )}
    </>
  );
};

export default InstallBanner;
