const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const numberOfTotalLikes = blogs.reduce((acc, blog) => acc + blog.likes, 0);
  return numberOfTotalLikes;
};

const favoriteBlog = (blogs) => {
  const sortedBlogs = blogs.sort(
    (firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes
  );
  const blogWithMostLikes = sortedBlogs[0];
  return blogWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
