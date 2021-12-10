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
  test("get the two notes in DB in JSON", async () => {
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
  });

  test.only("check validity of likes property", async () => {
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

  afterAll(() => {
    mongoose.connection.close();
  });
});
