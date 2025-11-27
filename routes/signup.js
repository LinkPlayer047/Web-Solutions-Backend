import express from "express";
import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Signup successful", email: newAdmin.email });
  } catch (err) {
    res.status(500).json({ message: "Signup error" });
  }
});

export default router;
