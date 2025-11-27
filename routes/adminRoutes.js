import express from "express";
import { adminLogin, createAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);

router.post("/createAdmin", createAdmin);

export default router;
