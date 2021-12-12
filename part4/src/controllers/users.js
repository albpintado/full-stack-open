const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.get("/", async (_, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

usersRouter.post("/", async (req, res) => {
  const { body } = req;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(204).send(savedUser);
});

module.exports = usersRouter;
