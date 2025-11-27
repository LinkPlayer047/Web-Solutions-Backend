import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import sendCodeRoutes from "./routes/sendCode.js";
import signupRoutes from "./routes/signup.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "https://admin-panel-six-vert.vercel.app",
    ],
    credentials: true,
  })
);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", adminRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/sendcode", sendCodeRoutes);
app.use("/api/signup", signupRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});


connectDB().then(() => {
  console.log("✅ MongoDB connected successfully");
  app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
});
