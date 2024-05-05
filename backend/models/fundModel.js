const mongoose = require("mongoose");

const fundSchema = new mongoose.Schema({
  unique_id: {
    type: String,
  },
  proj_name_th: {
    type: String,
  },
  proj_name_en: {
    type: String,
  },
  proj_id: {
    type: String,
  },
  proj_retail_type: {
    type: String,
  },
  last_upd_date: {
    type: String,
  },
  url_factsheet: {
    type: String,
  },
});

const Fund = mongoose.model("Fund", fundSchema);
module.exports = Fund;
