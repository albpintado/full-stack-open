const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");

blogsRouter.get("/", async (_, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  if (!blog.likes) blog.likes = 0;
  if (!blog.title || !blog.url) {
    res.status(400).end();
  } else {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (blog) {
    await Blog.findByIdAndUpdate(id, { likes: blog.likes + 1 }, { new: true });
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndRemove(id);
  res.status(204).end();
});

module.exports = blogsRouter;
