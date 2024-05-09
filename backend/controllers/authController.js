const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const sendingMail = require("../config/mailConfig");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

//sign up with username, password and email, then sending email to verify account
const SignUp = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log(username);
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Required username, password and email" });
    } else {
      const findUser = await User.findOne({
        username: username,
      });
      if (findUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const hashPass = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/;
      if (!emailPattern.test(email) || email.length > 254) {
        return res.status(400).json({ message: "Invalid email" });
      }
      const lowerEmail = email.toLowerCase();

      const saveUser = await User({
        username: username,
        password: hashPass,
        email: lowerEmail,
      });

      const newUser = await saveUser.save();
      try {
        const setToken = await Token.create({
          userId: saveUser.id,
          token: crypto.randomBytes(16).toString("hex"),
        });
        console.log("before IF");
        if (setToken && newUser) {
          console.log("sending...");
          sendingMail({
            from: `FUNDMAIJA Admin <${process.env.EMAIL}>`,
            replyTo: "noreply@gmail.com",
            to: `${saveUser.email}`,
            subject: "Account Verification Link",
            text: `Hello, ${saveUser.username} Please verify your email by http://localhost:5000/verify-email/${saveUser.id}/${setToken.token} `,
          });
        }

        return res.status(200).json({ message: "Signup successfully" });
      } catch (err) {
        res.status(400).json({ message: "Register fail" });
      }
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// signin with username and password. (should verify your account before)
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
    } else if (!!!findUser.isVerified) {
      return res.status(400).json({ message: "Please verified your email" });
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
      username: username,
      email: findUser.email,
    });
  } catch (err) {
    console.error("Error signing in:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//verify account
const verifyEmail = async (req, res) => {
  try {
    const { token, id } = req.params;
    const verifyToken = await Token.findOne({
      token: token,
      userId: id,
    }).exec();

    if (!verifyToken) {
      return res
        .status(400)
        .json({ message: "Your verification is not valid." });
    } else {
      const findUser = await User.findById({
        _id: id,
      });

      if (!findUser) {
        return res.status(400).json({ message: "User not found" });
      } else if (findUser.isVerified) {
        return res
          .status(400)
          .json({ message: "Account has been already verified." });
      } else {
        findUser.isVerified = true;
        await findUser.save();
        const deleteToken = await Token.deleteMany({
          userId: id,
        }).exec();
        return res
          .status(200)
          .json({ message: "Your account has been successfully verified." });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//change user password
const changePassword = async (req, res) => {
  try {
    const { username } = req.params;
    const { old_pass, new_pass } = req.body;

    if (!username || !old_pass || !new_pass) {
      return res
        .status(400)
        .json({ message: "Required username, old password and new password" });
    } else {
      const hashOldPass = crypto
        .createHash("sha256")
        .update(old_pass)
        .digest("hex");
      const findUser = await User.findOne({
        username: username,
        password: hashOldPass,
      });

      if (!!!findUser) {
        return res
          .status(400)
          .json({ message: "Invalid username or old password" });
      } else if (!findUser.isVerified) {
        return res.status(400).json({ message: "Please verify your account" });
      } else {
        const hashNewPass = crypto
          .createHash("sha256")
          .update(new_pass)
          .digest("hex");

        findUser.password = hashNewPass;
        await findUser.save();
        return res
          .status(200)
          .json({ message: "Change password successfully." });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { SignUp, SignIn, verifyEmail, changePassword };
