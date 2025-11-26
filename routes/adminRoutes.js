import express from "express";
import { adminLogin, createAdmin } from "../controllers/adminController.js";

const router = express.Router();

// Admin login
router.post("/login", adminLogin);

// Optional: create admin
router.post("/createAdmin", createAdmin);

export default router;
