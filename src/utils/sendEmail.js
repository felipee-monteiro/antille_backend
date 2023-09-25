const { createTransport } = require("nodemailer");
const { config } = require("dotenv");

config();

module.exports = {
  transporter: function () {
    return createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  },
};