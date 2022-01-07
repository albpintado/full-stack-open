const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../src/app");
const Blog = require("../../src/models/Blog");
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

const initialBlogs = [
  {
    title: "Blog de prueba",
    author: "Pepe Cuenca",
    url: "blog-de-prueba",
    likes: 0,
  },
  {
    title: "ABCDEF",
    author: "Alberto",
    url: "abcdef",
    likes: 0,
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  const usersToSave = initialUsers.map((user) => new User(user));
  const promiseArrayOfUsers = usersToSave.map((user) => user.save());
  await Promise.all(promiseArrayOfUsers);

  await Blog.deleteMany({});
  const blogsToSave = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogsToSave.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("API", () => {
  test("get the two blogs in DB in JSON", async () => {
    const blogsInDb = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(blogsInDb.body).toHaveLength(2);
  });

  test("check that id property exists", async () => {
    const blogsInDb = await api.get("/api/blogs");
    const firstBlog = blogsInDb.body[0];
    expect(firstBlog.id).toBeDefined();
  });

  test("create a new blog", async () => {
    const newBlogObject = {
      title: "Blog de prueba",
      author: "Pepe Cuenca",
      url: "blog-de-prueba",
      likes: 0,
      id: "61968bf0e763e37ca419dbff",
    };
    await api
      .post("/api/blogs")
      .send(newBlogObject)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsInDb = await api.get("/api/blogs");
    const newBlogFromDb = blogsInDb.body[2];

    expect(blogsInDb.body).toHaveLength(3);
    expect(newBlogFromDb.title).toContain(newBlogObject.title);
    expect(newBlogFromDb.user.username).toContain("alberto");
  });

  test("check validity of likes property", async () => {
    const newBlogObject = {
      title: "Blog de prueba",
      author: "Pepe Cuenca",
      url: "blog-de-prueba",
      id: "61968bf0e763e37ca419dbff",
    };
    await api.post("/api/blogs").send(newBlogObject);

    const blogsInDb = await api.get("/api/blogs");
    expect(blogsInDb.body[2].likes).toBeDefined();
    expect(blogsInDb.body[2].likes).toBe(0);
  });

  test("throws 400 status when title or url are missing", async () => {
    const newBlogObject = {
      title: "New blog",
      author: "Someone",
      url: "new-blog",
      id: "61968bf0e763e37ca419dbff",
    };
    const newBlogObjectWithoutTitle = {
      author: "Pepe Cuenca",
      url: "blog-de-prueba",
      id: "61968bf0e763e37ca419dbff",
    };
    const newBlogObjectWithoutUrl = {
      title: "Blog de prueba",
      author: "Pepe Cuenca",
      id: "61968bf0e763e37ca419dbff",
    };

    await api.post("/api/blogs").send(newBlogObject).expect(201);
    await api.post("/api/blogs").send(newBlogObjectWithoutTitle).expect(400);
    await api.post("/api/blogs").send(newBlogObjectWithoutUrl).expect(400);

    const blogsInDb = await api.get("/api/blogs");
    expect(blogsInDb.body).toHaveLength(3);
  });

  test("succesfully delete a blog", async () => {
    const blogsAtStart = await api.get("/api/blogs");
    const blogToDelete = blogsAtStart.body[0];

    await api.del(`/api/blogs/${blogToDelete.id}`).expect(204);

    const getAtEndResponse = await api.get("/api/blogs");
    const blogsAtEnd = getAtEndResponse.body.map((blog) => blog.title);

    expect(blogsAtEnd).toHaveLength(1);
    expect(blogsAtEnd).not.toContain("ABCDEF");
  });

  test("increase likes by 1", async () => {
    const blogsAtStart = await api.get("/api/blogs");
    const blogToUpdate = blogsAtStart.body[0];

    await api.put(`/api/blogs/${blogToUpdate.id}`);

    const blogsAtEnd = await api.get("/api/blogs");
    const blogUpdated = blogsAtEnd.body[0];

    expect(blogUpdated.likes).toBe(1);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
