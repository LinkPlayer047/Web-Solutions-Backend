import express from "express";
import { submitContact } from "../controllers/contactController.js";

const router = express.Router();

app.get("/", (req, res) => {
  res.send("Backend is running");
});
router.post("/submit", submitContact);

export default router;
