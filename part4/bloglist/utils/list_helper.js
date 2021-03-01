// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList) => {
  if (blogList.length === 0) return 0;

  const result = blogList
    .map((blog) => blog.likes)
    .reduce((acc, totalLikes) => acc + totalLikes, 0);

  return result;
};

const favoriteBlog = (blogList) => {
  if (blogList.length === 0) return {};

  const maxLikes = Math.max(...blogList.map((blog) => blog.likes));
  const favoriteBlog = blogList.find((blog) => Number(blog.likes) === maxLikes);
  return favoriteBlog;
};

const mostBlogs = (blogList) => {
  if (blogList.length === 0) return {};

  const nameList = blogList.map((blog) => blog.author);
  const nameCount = nameList.reduce((count, author) => {
    if (!count[author]) {
      count[author] = 1;
    } else {
      ++count[author];
    }

    return count;
  }, {});

  var max = 0;
  var maxName = "";

  for (const name in nameCount) {
    if (nameCount[name] > max) {
      max = nameCount[name];
      maxName = name;
    }
  }

  return { author: maxName, blogs: max };
};

const mostLikes = (blogList) => {
  if (blogList.length === 0) return {};

  const likesList = blogList.map((blog) => {
    return { author: blog.author, likes: blog.likes };
  });

  const likesCount = likesList.reduce((count, author) => {
    if (!count[author.author]) {
      count[author.author] = author.likes;
    } else {
      count[author.author] += author.likes;
    }
    return count;
  }, {});

  var max = 0;
  var maxName = "";

  for (const name in likesCount) {
    if (likesCount[name] > max) {
      max = likesCount[name];
      maxName = name;
    }
  }

  return { author: maxName, likes: max };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
