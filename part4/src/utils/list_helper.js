const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const numberOfTotalLikes = blogs.reduce((acc, blog) => acc + blog.likes, 0);
  return numberOfTotalLikes;
};

module.exports = {
  dummy,
  totalLikes,
};
