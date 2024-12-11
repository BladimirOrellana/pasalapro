import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom"; // For routing
import { AuthContext } from "../firebase/AuthContext";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  // Toggle Drawer
  const toggleDrawer = (open) => {
    setOpen(open);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "white", boxShadow: 0, color: "black" }}
    >
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
            onClick={() => toggleDrawer(true)} // Open drawer on click
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
            Profile
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

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => toggleDrawer(false)} // Close drawer when clicked
          onKeyDown={() => toggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/features">
              <ListItemText primary="Features" />
            </ListItem>
            <ListItem button component={Link} to="/about">
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button component={Link} to="/contact">
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
          <Divider />
          {/* Call-to-Action for mobile */}
          {user ? (
            <Button
              component={Link}
              to="/profile"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: "20px", marginTop: "10px" }}
            >
              Profile
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: "20px", marginTop: "10px" }}
            >
              Login
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
