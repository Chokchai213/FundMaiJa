const express = require("express");
const userController = require("../controllers/userController");

const route = express.Router();

route.post("/signup", userController.SignUp);
route.post("/signin", userController.SignIn);

module.exports = route;
