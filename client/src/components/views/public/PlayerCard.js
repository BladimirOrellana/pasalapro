import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  Box,
} from "@mui/material";

const PlayerCard = ({ player }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "10px",
        boxShadow: 3,
        bgcolor: "#ffffff",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        {/* Avatar with profile picture */}
        <Avatar
          alt={player.name}
          src={player.image}
          sx={{
            width: 120,
            height: 120,
            margin: "0 auto",
            border: "4px solid #ff9800", // Border color to make it stand out
          }}
        />

        {/* Player Name */}
        <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
          {player.name}
        </Typography>

        {/* Player Team Name */}
        <Typography variant="body1" color="textSecondary" sx={{ marginTop: 1 }}>
          Team: {player.team}
        </Typography>

        {/* Player Role and Jersey Number */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 1,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Role: {player.role}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            # {player.jerseyNumber}
          </Typography>
        </Box>

        {/* Button to simulate action (e.g., view stats) */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            marginTop: 3,
            padding: "10px",
            borderRadius: "5px",
            textTransform: "capitalize",
          }}
        >
          View Stats
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
