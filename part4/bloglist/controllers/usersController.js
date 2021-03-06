const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");

  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!body.password) {
    response.status(400).json({ error: "Password not provided" });
    return;
  }

  if (!body.username) {
    response.status(400).json({ error: "Username not provided" });
    return;
  }

  if (body.password.length < 3) {
    response.status(400).json({ error: "Password too short" });
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

  response.json(savedUser);
});
module.exports = usersRouter;
