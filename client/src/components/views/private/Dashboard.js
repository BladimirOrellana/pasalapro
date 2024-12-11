import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/AuthContext"; // Correct path for AuthContext
import { Button, Box, Typography, Grid } from "@mui/material"; // Material UI components
import { Link } from "react-router-dom"; // Link component for routing

const Dashboard = () => {
  const { user } = useContext(AuthContext); // Get user data from context
  const [roleContent, setRoleContent] = useState(null);

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "Fan":
          setRoleContent(
            <>
              <Typography variant="h6" align="center" gutterBottom>
                Welcome, Fan! You can view teams and leagues.
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/teams"
                  >
                    View Teams
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/leagues"
                  >
                    View Leagues
                  </Button>
                </Grid>
              </Grid>
            </>
          );
          break;
        case "Player":
          setRoleContent(
            <>
              <Typography variant="h6" align="center" gutterBottom>
                Player Dashboard
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/player-profile"
                  >
                    View Profile
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/player-matches"
                  >
                    View Matches
                  </Button>
                </Grid>
              </Grid>
            </>
          );
          break;
        case "Team":
          setRoleContent(
            <>
              <Typography variant="h6" align="center" gutterBottom>
                Team Dashboard
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/team-roster"
                  >
                    View Roster
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/team-schedule"
                  >
                    View Schedule
                  </Button>
                </Grid>
              </Grid>
            </>
          );
          break;
        case "League":
          setRoleContent(
            <>
              <Typography variant="h6" align="center" gutterBottom>
                League Dashboard
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/league-info"
                  >
                    View League Info
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/league-teams"
                  >
                    View Teams
                  </Button>
                </Grid>
              </Grid>
            </>
          );
          break;
        case "Sponsor":
          setRoleContent(
            <>
              <Typography variant="h6" align="center" gutterBottom>
                Sponsor Dashboard
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/sponsor-details"
                  >
                    View Sponsorship Details
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/sponsor-teams"
                  >
                    View Sponsored Teams
                  </Button>
                </Grid>
                <Grid item>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/sponsors/sponsor/${user._id}`}
                    >
                      Edit Business Page
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/business-name"
                  >
                    View Public Page
                  </Button>
                </Grid>
              </Grid>
            </>
          );
          break;
        default:
          setRoleContent(
            <Typography variant="body1" align="center">
              Role not recognized
            </Typography>
          );
      }
    }
  }, [user]);

  return (
    <Box sx={{ p: 3, textAlign: "center", maxWidth: "800px", mx: "auto" }}>
      {roleContent}
    </Box>
  );
};

export default Dashboard;
