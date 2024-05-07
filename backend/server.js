const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const cors = require("cors");
require("dotenv").config();

const app = express();

connectDB(process.env.MONGODB_URL);
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/auth", require("./routes/authRoute"));

app.use("/user", require("./routes/userRoute"));
app.use("/fund", require("./routes/fundRoute"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
