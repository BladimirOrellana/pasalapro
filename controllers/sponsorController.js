const Sponsor = require("../model/Sponsor");
const User = require("../model/userModel"); // Assuming you have a User model to manage users

// Create a new sponsor
exports.createSponsor = async (req, res) => {
  try {
    const {
      businessName,
      address,
      phone,
      typeOfBusiness,
      contactPerson,
      logoUrl,
      sponsorshipAmount,
      sponsorshipType,
      target,
      userId,
    } = req.body;
    console.log("body s ", req.body);
    // Check if user exists

    const newSponsor = new Sponsor({
      businessName,
      address,
      phone,
      typeOfBusiness,
      contactPerson,
      logoUrl,
      sponsorshipAmount,
      sponsorshipType,
      target,
      userId,
    });

    // Save the new sponsor to the database
    await newSponsor.save();

    return res.status(201).json(newSponsor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all sponsors
exports.getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find().populate("userId", "name email"); // Populate user details for each sponsor
    return res.status(200).json(sponsors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
// Get sponsor by ID
exports.getSponsorById = async (req, res) => {
  const { userId } = req.params; // Destructure userId from request params
  console.log("Fetching sponsor by ID:", userId);

  try {
    // Find the sponsor by ID and populate the referenced fields
    const sponsor = await Sponsor.findById(userId).populate("userId"); // Replace "userId" with the field to populate
    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }
    return res.status(200).json(sponsor); // Return the sponsor data
  } catch (error) {
    console.error("Error fetching sponsor:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update sponsor details
exports.updateSponsor = async (req, res) => {
  try {
    const {
      businessName,
      address,
      phone,
      typeOfBusiness,
      contactPerson,
      logoUrl,
      sponsorshipAmount,
      sponsorshipType,
      target,
      userId,
    } = req.body;

    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update sponsor details
    sponsor.businessName = businessName || sponsor.businessName;
    sponsor.address = address || sponsor.address;
    sponsor.phone = phone || sponsor.phone;
    sponsor.typeOfBusiness = typeOfBusiness || sponsor.typeOfBusiness;
    sponsor.contactPerson = contactPerson || sponsor.contactPerson;
    sponsor.logoUrl = logoUrl || sponsor.logoUrl;
    sponsor.sponsorshipAmount = sponsorshipAmount || sponsor.sponsorshipAmount;
    sponsor.sponsorshipType = sponsorshipType || sponsor.sponsorshipType;
    sponsor.target = target || sponsor.target;
    sponsor.userId = userId || sponsor.userId;

    await sponsor.save();
    return res.status(200).json(sponsor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete sponsor
exports.deleteSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByIdAndDelete(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }
    return res.status(200).json({ message: "Sponsor deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
