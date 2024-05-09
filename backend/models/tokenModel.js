const mongoose = require("mongoose");

//token schema using for verify account
const tokenSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
