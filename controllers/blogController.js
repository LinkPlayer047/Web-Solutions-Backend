import Blog from "../models/blog.js";

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err.message });
  }
};

// GET SINGLE BLOG (BY SLUG)
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog" });
  }
};

// Add new blog
export const addBlog = async (req, res) => {
  const { title, subtitle, content, image, author, category, tags, featured } = req.body;
  try {
    const newBlog = await Blog.create({
      title,
      subtitle,
      content,
      image,
      author,
      category,
      tags,
      featured
    });
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ message: "Error creating blog", error: err.message });
  }
};


// Update blog
export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: "Error updating blog", error: err.message });
  }
};


// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog", error: err.message });
  }
};
