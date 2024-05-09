const Fund = require("../models/fundModel");
const User = require("../models/userModel");

//prepare data save in database
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

//update prepare data
const updateFundDetail = async (req, res) => {
  try {
    const checkArr = ["PN", "AN", "AM", "BH", "SM", "OT", "PM"];
    const findProj = await Fund.find({});
    const projArr = [];

    findProj.forEach((fund) => {
      projArr.push({ proj_id: fund.proj_id });
    });

    for (let i = 0; i < projArr.length; i++) {
      const element = projArr[i];

      try {
        const proj_res = await fetch(
          `https://api.sec.or.th/FundFactsheet/fund/${element.proj_id}/policy`,
          {
            method: "GET",
            headers: {
              "Cache-Control": "no-cache",
              "Ocp-Apim-Subscription-Key": process.env.OCP_API,
            },
          }
        );

        const urlData = await proj_res.json();
        let management_style = "";
        const decodedString = Buffer.from(
          urlData.investment_policy_desc,
          "base64"
        ).toString("utf-8");
        const cleanedString = decodedString.replace(/<[^>]*>/g, "");
        const investment_policy_desc = cleanedString.replace(/&nbsp;/g, "");

        switch (urlData.management_style) {
          case checkArr[0]:
            management_style =
              "กองทุนไทยมุ่งหวังให้ผลประกอบการเคลื่อนไหวตามกองทุนหลัก ส่วนกองทุนหลักมุ่งหวังให้ผลประกอบการเคลื่อนไหวตามดัชนีชี้วัด (passive management)";
            break;
          case checkArr[1]:
            management_style =
              "กองทุนไทยมุ่งหวังให้ผลประกอบการเคลื่อนไหวตามกองทุนหลัก ส่วนกองทุนหลักมุ่งหวังให้ผลประกอบการสูงกว่าดัชนีชี้วัด (active management)";
            break;
          case checkArr[2]:
            management_style =
              "มุ่งหวังให้ผลประกอบการสูงกว่าดัชนีชี้วัด (active management)";
            break;
          case checkArr[3]:
            management_style = "มีกลยุทธ์การลงทุนครั้งเดียว (buy-and-hold)";
            break;
          case checkArr[4]:
            management_style =
              "มุ่งหวังให้ผลประกอบการเคลื่อนไหวตามดัชนีชี้วัด และในบางโอกาสอาจสร้างผลตอบแทนสูงกว่าดัชนีชี้วัด";
            break;
          case checkArr[5]:
            management_style =
              "มุ่งหวังให้ผลประกอบการเคลื่อนไหวตามดัชนีชี้วัด (passive management/index tracking)";
            break;
          default:
            management_style = "อื่น ๆ";
            break;
        }
        // console.log(urlData.last_upd_date);
        // console.log(urlData.policy_desc);
        const saveFund = await Fund.findOneAndUpdate(
          {
            proj_id: element.proj_id,
          },
          {
            last_upd_date: urlData.last_upd_date,
            policy_desc: urlData.policy_desc,
            investment_policy_desc: investment_policy_desc,
            management_style: management_style,
          },
          {
            new: true,
          }
        );
      } catch (err) {
        console.error(
          `Error fetching data for proj_id ${element.proj_id}: ${err.message}`
        );
        continue; // Skip to the next iteration of the loop
      }
    }

    return res.status(200).json({ message: "Finish Update" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
// get all fund
const getAllFund = async (req, res) => {
  try {
    const getFund = await Fund.find({});
    return res.status(200).json(getFund);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//get specific fund detail
const getdetailFund = async (req, res) => {
  try {
    const { proj_id } = req.params;
    if (!proj_id) {
      return res.status(400).json({ message: "required id" });
    }

    const finddetail = await Fund.find({ proj_id: proj_id });
    return res.status(200).json(finddetail);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//add specific fund to favourite fund
const addFavFund = async (req, res) => {
  try {
    //id = userid
    const { id } = req.params;
    const { proj_id } = req.body;
    if (!id || !proj_id) {
      return res.status(400).json({ message: "required userid and proj_id" });
    }

    const findUser = await User.findById(
      {
        _id: id,
      },
      {
        favouriteFund: 1,
      }
    ).exec();

    const finddetail = await Fund.findOne({ proj_id: proj_id });
    if (!!!finddetail) {
      return res.status(400).json({ message: "Fund not found" });
    }

    const isAlreadyFav = findUser.favouriteFund.some(
      (favFund) => favFund.proj_id === proj_id
    );

    // If the fund is already in the favouriteFund array, return a message
    if (isAlreadyFav) {
      return res
        .status(400)
        .json({ message: "Fund already added to favourites" });
    }

    // Add the new fund to the user's favouriteFund array
    findUser.favouriteFund.push({
      proj_id: proj_id,
      proj_name_en: finddetail.proj_name_en,
      risk_spectrum: finddetail.risk_spectrum,
      url_factsheet: finddetail.url_factsheet,
    });

    await findUser.save();

    return res.status(200).json({ message: "Add favourite fund successfully" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//remove fund from favourite fund
const removeFavFund = async (req, res) => {
  try {
    //id = userid

    const { id } = req.params;
    const { proj_id } = req.body;
    if (!id || !proj_id) {
      return res.status(400).json({ message: "required userid and proj_id" });
    }

    const removeFav = await User.findOne({
      _id: id,
      "favouriteFund.proj_id": proj_id,
    });

    if (!!!removeFav) {
      return res.status(400).json({ message: "This fund is not in favourite" });
    }

    const rm = await User.updateOne(
      { _id: id },
      { $pull: { favouriteFund: { proj_id } } }
    );

    return res
      .status(200)
      .json({ message: "Remove favourite fund successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

//time sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  getUrlFund,
  getAllFund,
  getdetailFund,
  addFavFund,
  removeFavFund,
  updateFundDetail,
};
