const Blog = require("../models/Blog");
// eslint-disable-next-line no-unused-vars
const Comment = require("../models/Comment");

const commentsRouter = require("express").Router({ mergeParams: true });

commentsRouter.get("/", async (request, response) => {
  const id = request.params.blogsId;
  const blog = await Blog.findById(id).populate("comments");
  response.status(200).send(blog.comments);
});

commentsRouter.post("/", async (request, response) => {
  const blogId = request.params.blogsId;
  const newComment = {
    comment: request.body.comment,
  };

  const blog = await Blog.findById(blogId);
  const comment = new Comment(newComment);
  const savedComment = await comment.save();

  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = commentsRouter;
