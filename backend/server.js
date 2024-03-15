const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
require("dotenv").config();

const app = express();

connectDB(process.env.MONGODB_URL);
const PORT = process.env.PORT || 8000;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
