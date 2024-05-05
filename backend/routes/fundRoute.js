const express = require("express");
const fundController = require("../controllers/fundController");
const route = express.Router();

route.get("/geturlfund", fundController.getUrlFund);

module.exports = route;
