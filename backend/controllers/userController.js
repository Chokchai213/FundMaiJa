const User = require("../models/userModel");
const Papa = require("papaparse");

// get specific user info
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Required id" });
    }
    const findUser = await User.findById({
      _id: id,
    });
    console.log(findUser);
    if (!!!findUser) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(findUser);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// edit user info
const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Required id" });
    } else if (!username || !email) {
      return res.status(400).json({ message: "Required username and email" });
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/;
      if (!emailPattern.test(email) || email.length > 254) {
        return res.status(400).json({ message: "Invalid email" });
      }
      const lowerEmail = email.toLowerCase();

      const findUserUpdate = await User.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          username: username,
          email: lowerEmail,
        },
        {
          new: true,
        }
      );
      // console.log(findUserUpdate);
      if (!findUserUpdate) {
        return res.status(400).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "Edit user info succesfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// export user favourite fund to csv file
const exportFavFund = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Required id" });
    }
    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const responses = [];
    findUser.favouriteFund.forEach((res) => {
      responses.push({
        proj_id: res.proj_id,
        proj_name_en: res.proj_name_en,
        risk_spectrum: res.risk_spectrum,
        url_factsheet: res.url_factsheet,
      });
    });

    const csvData = Papa.unparse(responses, {
      header: true,
      fields: ["proj_id", "proj_name_en", "risk_spectrum", "url_factsheet"],
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=FavFundData.csv"
    );

    return res.status(200).send(csvData); // Send the CSV data as response
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUser, exportFavFund, editUser };
