const mongoose = require("mongoose");

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
  risk_spectrum: {
    type: String,
  },
  spec_code: {
    type: Number,
  },
  url_factsheet: {
    type: String,
  },
});

const Fund = mongoose.model("Fund", fundSchema);
module.exports = Fund;
