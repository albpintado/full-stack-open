const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");

blogsRouter.get("/", async (_, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  if (!blog.likes) blog.likes = 0;

  const newBlog = await blog.save();
  res.status(201).json(newBlog);
});

module.exports = blogsRouter;
