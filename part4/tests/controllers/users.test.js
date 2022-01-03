const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/User");

const api = supertest(app);

const initialUsers = [
  {
    username: "alberto",
    name: "Alberto",
    passwordHash:
      "$2a$10$B7CP18PUpvtaOpULYy0jVunXgZTvPi8DXuQZY1XClJ2gJ4wApo/GO",
  },
  {
    username: "luis",
    name: "Luis",
    passwordHash:
      "$2a$10$NMrYVG76nU5ypHsPPa.pK.1b44k89k6L2B8fRrHvMKXwIVhLE9tXm",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  const usersToSave = initialUsers.map((user) => new User(user));
  const savedUsers = usersToSave.map((user) => user.save());
  await Promise.all(savedUsers);
});

describe("get users", () => {
  test("users are in json", async () => {
    const users = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(users.body).toHaveLength(2);
  });
});

describe("add user", () => {
  test("body is correct", async () => {
    const user = {
      username: "juanmi",
      name: "Juan Miguel",
      password: "ohjuanmigue",
    };
    await api.post("/api/users").send(user).expect(204);

    const users = await api.get("/api/users");

    expect(users.body).toHaveLength(3);
    expect(users.body[2].username).toBe(user.username);
  });

  test("username is not unique", async () => {
    const user = {
      username: "luis",
      name: "José Luis",
      password: "soyjuanluis",
    };
    await api.post("/api/users").send(user).expect(400);

    const users = await api.get("/api/users");

    expect(users.body).toHaveLength(2);
    expect(users.body[1].name).not.toBe(user.name);
  });

  test("username is less than 3 characters", async () => {
    const user = {
      username: "lu",
      name: "José Luis",
      password: "soyjuanluis",
    };
    await api.post("/api/users").send(user).expect(400).expect({
      error:
        "User validation failed: username: Path `username` (`lu`) is shorter than the minimum allowed length (3).",
    });

    const users = await api.get("/api/users");

    expect(users.body).toHaveLength(2);
    expect(users.body[1].name).not.toBe(user.name);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
