import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom"; // For routing
import { AuthContext } from "../firebase/AuthContext";
import InstallBanner from "../InstallBanner/installBanner";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "white", boxShadow: 0, color: "black" }}
    >
      <InstallBanner />
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 20px" }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
          PasalaPro
        </Typography>

        {/* Desktop Navbar Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: "30px" }}>
          <Button component={Link} to="/" color="black">
            Home
          </Button>
          <Button component={Link} to="/features" color="black">
            Features
          </Button>
          <Button component={Link} to="/about" color="black">
            About
          </Button>
          <Button component={Link} to="/contact" color="black">
            Contact
          </Button>
        </Box>

        {/* Mobile Navbar */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
          <IconButton
            edge="start"
            color="black"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
        </Box>

        {/* Call-to-Action Button */}
        {user ? (
          <Button
            component={Link}
            to={"/profile"}
            variant="contained"
            color="primary"
            sx={{ borderRadius: "20px" }}
          >
            profile
          </Button>
        ) : (
          <Button
            component={Link}
            to={"/login"}
            variant="contained"
            color="primary"
            sx={{ borderRadius: "20px" }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
