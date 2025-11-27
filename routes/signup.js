import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";

connectDB(); // ensure DB connected per request (or use global cached connection)

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { username, email, password } = req.body;
  try {
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "Signup successful", email: newAdmin.email });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup error" });
  }
}
