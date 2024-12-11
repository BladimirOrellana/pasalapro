import { createTheme } from "@mui/material/styles";

// Create a Sovryn-inspired theme
const sovrynTheme = createTheme({
  palette: {
    mode: "dark", // Dark mode for Sovryn-like aesthetic
    primary: {
      main: "#1a73e8", // Sovryn's blue-like primary color
    },
    secondary: {
      main: "#00bcd4", // Accent color (light cyan)
    },
    background: {
      default: "#121212", // Dark background
      paper: "#1e1e1e", // Slightly lighter background for cards/papers
    },
    text: {
      primary: "#ffffff", // White text for contrast
      secondary: "#a1a1a1", // Lighter text for secondary text
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Clean, modern font similar to Sovryn
    h1: {
      fontWeight: 600,
      fontSize: "2.5rem",
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
    },
  },
  spacing: 8, // Base spacing for layout
});

export default sovrynTheme;
