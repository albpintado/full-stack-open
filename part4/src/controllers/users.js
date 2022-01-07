const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.get("/", async (_, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  res.status(200).json(users).end();
});

usersRouter.post("/", async (req, res) => {
  const { body } = req;
  if (!body.username || !body.password) {
    res
      .status(400)
      .send({ error: "Username and password must be given." })
      .end();
    return;
  }
  if (body.password < 3) {
    res
      .status(400)
      .send({ error: "Password must be at least 3 characters long." })
      .end();
    return;
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(204).send(savedUser).end();
});

usersRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndRemove(id);
  res.status(204).end();
});

module.exports = usersRouter;
