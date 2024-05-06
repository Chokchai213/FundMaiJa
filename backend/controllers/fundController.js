const Fund = require("../models/fundModel");
const User = require("../models/userModel");

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

const getAllFund = async (req, res) => {
  try {
    const getFund = await Fund.find(
      {},
      { proj_id: 1, proj_name_th: 1, proj_name_en: 1 }
    );
    return res.status(200).json(getFund);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

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

const addFavFund = async (req, res) => {
  try {
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
      url_factsheet: finddetail.url_factsheet,
    });

    await findUser.save();

    return res.status(200).json(findUser);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const removeFavFund = async (req, res) => {
  try {
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
      { $pull: { "favouriteFund.proj_id": { proj_id } } }
    );

    return res.status(200).json(removeFav);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  getUrlFund,
  getAllFund,
  getdetailFund,
  addFavFund,
  removeFavFund,
};
