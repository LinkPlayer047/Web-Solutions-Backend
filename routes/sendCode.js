import nodemailer from "nodemailer";

const otpStore = {};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = code;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL, // correct env variable
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${code}`,
    });

    res.status(200).json({ message: "OTP sent successfully", code });
  } catch (err) {
    console.error("OTP send error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
}
