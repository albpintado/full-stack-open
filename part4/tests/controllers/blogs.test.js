const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../src/app");
const Blog = require("../../src/models/Blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Blog de prueba",
    author: "Pepe Cuenca",
    url: "blog-de-prueba",
    likes: 0,
    id: "61968bf0e763e37ca419dbff",
  },
  {
    title: "ABCDEF",
    author: "Alberto",
    url: "abcdef",
    likes: 0,
    id: "61a922708e8122081d28451b",
  },
];

describe("API", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogsToSave = initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogsToSave.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });
  test.only("get the two notes in DB in JSON", async () => {
    const result = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(result.body).toHaveLength(2);
  });

  test.only("check that id property exists", async () => {
    const result = await api.get("/api/blogs");
    const firstBlog = result.body[0];
    expect(firstBlog.id).toBeDefined();
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
