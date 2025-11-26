import express from "express";
import {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  getBlogBySlug
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);   // ⭐ NEW
router.post("/", addBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
