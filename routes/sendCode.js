import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const otpStore = {};

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = code;


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });


    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${code}`,
    });


    res.status(200).json({ message: "OTP sent successfully", code });
  } catch (err) {
    console.error("OTP send error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});


router.post("/verify-code", (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) return res.status(400).json({ message: "Email and code required" });

  if (otpStore[email] && otpStore[email] === code) {
    delete otpStore[email]; 
    return res.status(200).json({ message: "OTP verified successfully" });
  }

  res.status(400).json({ message: "Invalid OTP" });
});

export default router;
