const express = require("express");
const authController = require("../controllers/authController");

const route = express.Router();

route.post("/signup", authController.SignUp);
route.post("/signin", authController.SignIn);
route.post("/change-pwd/:username", authController.changePassword);
route.post("/verify-email/:id/:token", authController.verifyEmail);

module.exports = route;
