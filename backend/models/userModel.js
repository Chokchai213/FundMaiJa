const mongoose = require("mongoose");

//user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: [String],
  },
  email: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  favouriteFund: [
    {
      proj_id: {
        type: String,
      },
      proj_name_en: {
        type: String,
      },
      risk_spectrum: {
        type: String,
      },
      url_factsheet: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
