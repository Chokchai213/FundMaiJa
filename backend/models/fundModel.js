const mongoose = require("mongoose");

//fund schema
const fundSchema = new mongoose.Schema({
  proj_name_th: {
    type: String,
  },
  proj_name_en: {
    type: String,
  },
  proj_id: {
    type: String,
  },
  proj_abbr_name: {
    type: String,
  },
  last_upd_date: {
    type: Date,
  },
  policy_desc: {
    type: String,
  },
  investment_policy_desc: {
    type: String,
  },
  management_style: {
    type: String,
  },
  risk_spectrum: {
    type: String,
  },
  spec_code: {
    type: String,
  },
  url_factsheet: {
    type: String,
  },
});

const Fund = mongoose.model("Fund", fundSchema);
module.exports = Fund;
