const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transport.sendMail({
      from: `"MarketGo" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email Sent:", info.response);
  } catch (error) {
    console.log("❌ Email Error:", error);
    throw error;
  }
};

module.exports = sendEmail;