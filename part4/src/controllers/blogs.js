const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");
const User = require("../models/User");

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get("/", async (_, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    res.status(401).send({ error: "Token missing or invalid." });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({ ...req.body, user: user._id });
  if (!blog.likes) blog.likes = 0;
  if (!blog.title || !blog.url) res.status(400).end();
  else {
    const newBlog = await blog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();
    res.status(201).json(newBlog);
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (blog) {
    // @ts-ignore
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
