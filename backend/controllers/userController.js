const User = require("../models/userModel");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Required username" });
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

module.exports = { getUser };
