const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogList = await Blog.find({}).populate("user");
  response.json(blogList);
});

blogsRouter.post("/", async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  if (!request.body.likes) {
    request.body.likes = 0;
  }
  if (!request.body.title && !request.body.url) {
    response.status(400).json({ error: "url and title missing" });
    return;
  }

  const user = await User.findById(decodedToken.id);

  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user.id,
  };

  const blog = new Blog(newBlog);

  blog.user = user;
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === decodedToken.id) {
    await blog.remove();
    const newBlogs = user.blogs.filter(
      (blog) => blog.id.toString() != request.params.id
    );
    user.blogs = newBlogs;
    await user.save();
    return response.sendStatus(204);
  } else {
    return response.sendStatus(401);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog);

  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
