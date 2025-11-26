import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  content: { type: String, required: true },
  author: { type: String },
  category: { type: String },
  tags: { type: [String], default: [] },
  featured: { type: Boolean, default: false },
  image: { type: String },
  slug: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// Create slug automatically
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Blog", blogSchema);
