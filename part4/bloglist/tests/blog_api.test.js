const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/Blog");
const User = require("../models/User");
const testHelper = require("../utils/test_helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

beforeEach(async () => {
  // prepare blogs
  await Blog.deleteMany({});
  const blogsObject = testHelper.blogs.map((blog) => new Blog(blog));
  const promiseArray = blogsObject.map((blog) => blog.save());
  await Promise.all(promiseArray);

  // prepare users
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });
  await user.save();
});

describe("Viewing blogs:", () => {
  test("blogs returns as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("Endpoint returns the correct number of blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(testHelper.blogs.length);
  });

  test("Blog's id property is defined", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("Creating new blogs:", () => {
  test("A valid blog can be sent", async () => {
    const user = await User.findOne({ username: "root" });
    const userToken = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userToken, process.env.SECRET);

    /* const token = testHelper.createToken(); */
    const newBlog = {
      title: "Angular patterns",
      author: "Michael Channero",
      url: "https://reactpatterns.com/",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs/");
    expect(response.body).toHaveLength(testHelper.blogs.length + 1);
  });

  test("A POST request with no likes property will default to 0", async () => {
    const user = await User.findOne({ username: "root" });
    const userToken = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userToken, process.env.SECRET);

    const newBlog = {
      title: "Testing patterns",
      author: "Reedselo Channero",
      url: "https://reactpatterns.com/",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog);

    expect(response.body.likes).toBe(0);
  });

  test("A POST request with no title and URL will return a 400 status code ", async () => {
    const user = await User.findOne({ username: "root" });
    const userToken = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userToken, process.env.SECRET);

    const newBlog = {
      author: "Michael Channero",
      likes: 7,
    };

    const validBlog = {
      title: "Testing patterns",
      author: "Reedselo Channero",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(validBlog)
      .expect(201);
  });

  test("A POST request without token should return a 401 status code", async () => {
    const newBlog = {
      title: "Angular patterns",
      author: "Michael Channero",
      url: "https://reactpatterns.com/",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });
});

describe("Deleting a blog:", () => {
  test("Successfully returns a 204 status code", async () => {
    await api.delete("/api/blogs/603c6d92e113969d66841744").expect(204);

    const response = await api.get("/api/blogs");
    expect(response.body.map((blog) => blog.id)).not.toContain(
      "603c6d92e113969d66841744"
    );
  });
});

describe("Updating an entry", () => {
  test("successfully updates an entry", async () => {
    const response = await api.get("/api/blogs/");
    const blogId = response.body[0].id;
    console.log(blogId);

    const updatedBlog = {
      title: "Updated patterns",
      author: "Update Channero",
      url: "https://updpatterns.com/",
      likes: 70,
    };

    const updatedResponse = await api
      .put(`/api/blogs/${blogId}`)
      .send(updatedBlog)
      .expect(200);

    expect(updatedResponse.body.likes).toBe(updatedBlog.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
