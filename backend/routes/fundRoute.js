const express = require("express");
const fundController = require("../controllers/fundController");
const route = express.Router();

route.get("/geturlfund", fundController.getUrlFund);
route.get("/getallfund", fundController.getAllFund);
route.post("/getdetail/:proj_id", fundController.getdetailFund);
route.post("/addfavfund/:id", fundController.addFavFund);
route.delete("/removefavfund/:id", fundController.removeFavFund);
route.post("/update", fundController.updateFundDetail);

module.exports = route;
