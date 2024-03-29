const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./utils/config");
const { errorHandler, tokenExtractor } = require("./utils/middleware");

const blogsRouter = require("./controllers/blogsController");
const usersRouter = require("./controllers/usersController");
const loginRouter = require("./controllers/loginControlle");
const commentsRouter = require("./controllers/commentsController");

const mongoUrl = config.MONGO_URL;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/blogs/:blogsId/comments", commentsRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "test") {
  console.info("[TEST ENV] api reset endpoint enabled");
  const testRouter = require("./controllers/testController");
  app.use("/api/reset", testRouter);
}

app.use(errorHandler);

module.exports = app;
