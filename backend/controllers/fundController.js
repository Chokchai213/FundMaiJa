const Fund = require("../models/fundModel");
const getUrlFund = async (req, res) => {
  try {
    // const { unique_id } = req.params;
    const response = await fetch(
      `https://api.sec.or.th/FundFactsheet/fund/amc/${process.env.SCB_ID}`,
      {
        method: "GET",
        // Request headers
        headers: {
          "Cache-Control": "no-cache",
          "Ocp-Apim-Subscription-Key": process.env.OCP_API,
        },
      }
    );

    if (!response) {
      return res.status(400).json({ message: "Fund not found" });
    }
    const projArr = [];
    const selectProjArr = [];

    const resData = await response.json();
    resData.forEach((element) => {
      projArr.push({
        proj_id: element.proj_id,
        proj_name_th: element.proj_name_th,
        proj_name_en: element.proj_name_en,
      });
    });

    for (let i = 0; i < projArr.length; i++) {
      const element = projArr[i];

      const proj_res = await fetch(
        `https://api.sec.or.th/FundFactsheet/fund/${element.proj_id}/project_type`,
        {
          method: "GET",
          // Request headers
          headers: {
            "Cache-Control": "no-cache",
            "Ocp-Apim-Subscription-Key": process.env.OCP_API,
          },
        }
      );
      await sleep(200);
      const selectData = await proj_res.json();

      if (selectData.proj_retail_type == "R") {
        console.log(selectData.proj_retail_type);
        selectProjArr.push({
          proj_id: element.proj_id,
          proj_retail_type: selectData.proj_retail_type,
          proj_name_th: element.proj_name_th,
          proj_name_en: element.proj_name_en,
        });
      }
    }
    for (let i = 0; i < selectProjArr.length; i++) {
      const element = selectProjArr[i];
      const url_proj = await fetch(
        `https://api.sec.or.th/FundFactsheet/fund/${element.proj_id}/URLs`,
        {
          method: "GET",
          // Request headers
          headers: {
            "Cache-Control": "no-cache",
            "Ocp-Apim-Subscription-Key": process.env.OCP_API,
          },
        }
      );
      await sleep(200);

      const urlData = await url_proj.json();
      const proj_id = element.proj_id;
      const proj_retail_type = element.proj_retail_type;
      const proj_name_th = element.proj_name_th;
      const proj_name_en = element.proj_name_en;
      const unique_id = process.env.SCB_ID;

      const last_upd_date = urlData.last_upd_date;
      const url_factsheet = urlData.url_factsheet;

      const saveFund = new Fund({
        proj_id: proj_id,
        proj_retail_type: proj_retail_type,
        proj_name_th: proj_name_th,
        proj_name_en: proj_name_en,
        unique_id: unique_id,
        last_upd_date: last_upd_date,
        url_factsheet: url_factsheet,
      });

      await saveFund.save();
    }

    // const responseURL = await resUrl.json();
    return res.status(200).json({ message: "Yeah" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { getUrlFund };
