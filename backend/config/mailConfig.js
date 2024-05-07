const nodemailer = require("nodemailer");
require("dotenv").config();

const sendingMail = async ({ from, replyTo, to, subject, text }) => {
  try {
    const mailOptions = {
      from,
      replyTo,
      to,
      subject,
      text,
    };

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendingMail;
