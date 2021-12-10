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

const mostBlogs = (blogs) => {
  const numberOfBlogsPerAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = acc[blog.author] ? acc[blog.author] + 1 : 1;
    return acc;
  }, {});
  const arrayFromBlogAuthorsObject = [numberOfBlogsPerAuthor];
  const sortedAuthors = arrayFromBlogAuthorsObject.sort(
    (firstAuthor, secondAuthor) => secondAuthor - firstAuthor
  );
  return sortedAuthors;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
