import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { AuthContext } from "../../firebase/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#111111",
    color: "#fff",
    minHeight: "100vh",
    paddingTop: "5rem",
  },
  header: {
    fontWeight: 700,
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#fff",
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#f1f1f1",
  },
  paper: {
    padding: theme.spacing(4),
    backgroundColor: "#1f1f1f",
    borderRadius: "8px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: "50%",
  },
}));

const BusinessProfilePage = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [businessExists, setBusinessExists] = useState(false); // Flag for existing business
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [phone, setPhone] = useState("");
  const [typeOfBusiness, setTypeOfBusiness] = useState("");
  const [contactPerson, setContactPerson] = useState({ name: "", email: "" });
  const [logoUrl, setLogoUrl] = useState("");
  const [sponsorshipAmount, setSponsorshipAmount] = useState("");
  const [contractSigned, setContractSigned] = useState(false);
  const [sponsorshipType, setSponsorshipType] = useState("");
  const [target, setTarget] = useState("");

  // Fetch initial data to check for existing business
  useEffect(() => {
    axios
      .get(`/api/sponsors/sponsor/${user._id}`)
      .then((response) => {
        const data = response.data;
        console.log("data sponsor ", data);

        if (data && data.businessName) {
          // Business exists, populate fields
          setBusinessExists(true);
          setBusinessName(data.businessName);
          setAddress(data.address || {});
          setPhone(data.phone || "");
          setTypeOfBusiness(data.typeOfBusiness || "");
          setContactPerson(data.contactPerson || {});
          setLogoUrl(data.logoUrl || "");
          setSponsorshipAmount(data.sponsorshipAmount || "");
          setContractSigned(data.contractSigned || false);
          setSponsorshipType(data.sponsorshipType || "");
          setTarget(data.target || "");
        } else {
          setBusinessExists(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching sponsor profile:", error);
        setBusinessExists(false);
      });
  }, []);

  const handleSaveProfile = () => {
    const payload = {
      businessName,
      address,
      phone,
      typeOfBusiness,
      contactPerson,
      logoUrl,
      sponsorshipAmount,
      contractSigned,
      sponsorshipType,
      target,
    };

    axios
      .post("/api/sponsors/sponsor", payload)
      .then((response) => {
        console.log("Profile saved:", response.data);
        setBusinessExists(true); // Mark as existing after successful creation
      })
      .catch((error) => {
        console.error("Error saving profile:", error);
      });
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Box>
          <Typography variant="h4" className={classes.header}>
            {businessExists
              ? "Business Profile"
              : "Create Your Business Profile"}
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={4} textAlign="center">
              <Avatar
                alt="Business Logo"
                src={logoUrl || "https://via.placeholder.com/100"}
                className={classes.avatar}
              />
              <TextField
                label="Logo URL"
                variant="outlined"
                fullWidth
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className={classes.formControl}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Business Details
                </Typography>

                <TextField
                  label="Business Name"
                  variant="outlined"
                  fullWidth
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className={classes.formControl}
                />

                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={classes.formControl}
                />

                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Type of Business</InputLabel>
                  <Select
                    value={typeOfBusiness}
                    onChange={(e) => setTypeOfBusiness(e.target.value)}
                  >
                    <MenuItem value="Retail">Retail</MenuItem>
                    <MenuItem value="Services">Services</MenuItem>
                    <MenuItem value="Non-profit">Non-profit</MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="h6" className={classes.sectionTitle}>
                  Address
                </Typography>
                {["street", "city", "state", "zipCode", "country"].map(
                  (field) => (
                    <TextField
                      key={field}
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      variant="outlined"
                      fullWidth
                      value={address[field] || ""}
                      onChange={(e) =>
                        setAddress({ ...address, [field]: e.target.value })
                      }
                      className={classes.formControl}
                    />
                  )
                )}

                <Typography variant="h6" className={classes.sectionTitle}>
                  Contact Person
                </Typography>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={contactPerson.name || ""}
                  onChange={(e) =>
                    setContactPerson({ ...contactPerson, name: e.target.value })
                  }
                  className={classes.formControl}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={contactPerson.email || ""}
                  onChange={(e) =>
                    setContactPerson({
                      ...contactPerson,
                      email: e.target.value,
                    })
                  }
                  className={classes.formControl}
                />

                <Typography variant="h6" className={classes.sectionTitle}>
                  Sponsorship Details
                </Typography>
                <TextField
                  label="Sponsorship Amount"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={sponsorshipAmount}
                  onChange={(e) => setSponsorshipAmount(e.target.value)}
                  className={classes.formControl}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={contractSigned}
                      onChange={(e) => setContractSigned(e.target.checked)}
                    />
                  }
                  label="Contract Signed"
                />

                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Sponsorship Type</InputLabel>
                  <Select
                    value={sponsorshipType}
                    onChange={(e) => setSponsorshipType(e.target.value)}
                  >
                    <MenuItem value="Team">Team</MenuItem>
                    <MenuItem value="Event">Event</MenuItem>
                    <MenuItem value="League">League</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Target ID"
                  variant="outlined"
                  fullWidth
                  value={target || ""}
                  onChange={(e) => setTarget(e.target.value)}
                  className={classes.formControl}
                />

                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleSaveProfile}
                  fullWidth
                >
                  Save Profile
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default BusinessProfilePage;
