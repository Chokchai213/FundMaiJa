const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const https = require("https");

const SignUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Required username and password" });
    } else {
      const findUser = await User.findOne({
        username: username,
      });
      if (findUser) {
        return res.status(400).json({ message: "Please change your username" });
      }

      const hashPass = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

      console.log(hashPass);
      const saveUser = await User({
        username: username,
        password: hashPass,
      });

      console.log(saveUser);

      await saveUser.save();
      return res.status(200).json({ message: "Signup successfully" });
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

const SignIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Required username and password" });
    }

    const hashPass = crypto.createHash("sha256").update(password).digest("hex");

    const findUser = await User.findOne({
      username: username,
      password: hashPass,
    });

    if (!findUser) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const newaccessToken = jwt.sign(
      { username: username },
      process.env.SECRET_ACCESS_TOKEN,
      { expiresIn: "12h" }
    );

    findUser.accessToken = newaccessToken;

    await findUser.save();

    return res.status(200).json({
      message: "Sign in successfully",
      accessToken: newaccessToken,
    });
  } catch (err) {
    console.error("Error signing in:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

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

module.exports = { SignUp, SignIn, getUser };
