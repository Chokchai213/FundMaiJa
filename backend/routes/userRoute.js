const express = require("express");
const userController = require("../controllers/userController");

const route = express.Router();

route.post("/getuser/:username", userController.getUser);
route.patch("/edituser/:id", userController.editUser);
route.get("/export-file/:id", userController.exportFavFund);

module.exports = route;
