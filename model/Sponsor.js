const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  phone: {
    type: String,
    required: true,
  },
  typeOfBusiness: {
    type: String,
    required: true,
    enum: ["Retail", "Services", "Non-profit", "Technology", "Other"],
  },
  contactPerson: {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
  },
  logoUrl: {
    type: String,
    required: false,
    // validate: {
    //   validator: function (v) {
    //     return /^(http|https):\/\/[^\s$.?#].[^\s]*$/i.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid URL for a logo!`,
    // },
  },
  sponsorshipAmount: {
    type: Number,
    required: true,
  },
  contractSigned: {
    type: Boolean,
    default: false,
  },
  sponsorshipType: {
    type: String,

    enum: ["Team", "Event", "League"], // This field specifies what is being sponsored
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "User", // Reference to the user who owns or manages the sponsor
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Sponsor = mongoose.model("Sponsor", sponsorSchema);

module.exports = Sponsor;
