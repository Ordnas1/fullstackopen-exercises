const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const testHelper = require("../utils/test_helpers");

describe("When there's one user in the database", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  test("creation succeeds with a new username", async () => {
    const usersAtStart = await testHelper.usersInDB();
    const newUser = {
      name: "Sandro Peirano",
      username: "speirano",
      password: "test",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const usersAtEnd = await testHelper.usersInDB();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe("When there are multiple users in the database", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    let passwordHash = await bcrypt.hash("sekret", 10);
    let user = new User({ username: "root", passwordHash });
    await user.save();

    passwordHash = await bcrypt.hash("secreto", 10);
    user = new User({ username: "admin", passwordHash });
    await user.save();
  });

  test("you can fetch every user from the endpoint", async () => {
    const users = await testHelper.usersInDB();

    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const result = await api.get("/api/users");

    expect(result.body.length).toBe(users.length);
  });
});
describe("Creating bad users", () => {
  test("Both password and username must be given", async () => {
    const noPassUser = {
      username: "badHombre",
      name: "Testy McTest",
    };
    let usersBefore = await testHelper.usersInDB();
    await api
      .post("/api/users")
      .send(noPassUser)
      .expect(400)
      .expect({ error: "Password not provided" });
    let usersAfter = await testHelper.usersInDB();

    expect(usersAfter.length).not.toBe(usersBefore.length + 1);

    const noUsernameUser = {
      password: "badHombre",
      name: "Testy McTest",
    };

    usersBefore = await testHelper.usersInDB();
    await api
      .post("/api/users")
      .send(noUsernameUser)
      .expect(400)
      .expect({ error: "Username not provided" });
    usersAfter = await testHelper.usersInDB();
    expect(usersAfter.length).not.toBe(usersBefore.length + 1);
  });

  test("Both username and password must be at least 3 character long", async () => {
    const shortUsername = {
      name: "Sandro Peirano",
      username: "sp",
      password: "test",
    };
    let usersBefore = await testHelper.usersInDB();
    await api.post("/api/users").send(shortUsername).expect(400);
    let usersAfter = await testHelper.usersInDB();
    expect(usersAfter.length).not.toBe(usersBefore.length + 1);

    const shortPassword = {
      name: "Sandro Peirano",
      username: "speirano",
      password: "te",
    };
    usersBefore = await testHelper.usersInDB();
    await api.post("/api/users").send(shortPassword).expect(400);
    usersAfter = await testHelper.usersInDB();
    expect(usersAfter.length).not.toBe(usersBefore.length + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
