import React, { useState } from "react";

import blogService from "../services/blogs";

import Like from "./Like";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
  display: "block",
};

const deletedStyle = {
  display: "none",
};

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [blogState, setBlog] = useState(blog);
  const [deleted, setDeleted] = useState(false);

  const isBlogUser =
    (JSON.parse(window.localStorage.getItem("loggedUser"))
      ? JSON.parse(window.localStorage.getItem("loggedUser")).username
      : "") === (blogState.user ? blogState.user.username : "");

  const handleClick = () => setVisible(!visible);

  const handleLike = async () => {
    const newLikes = blogState.likes + 1;
    console.log(blog);
    const blogToUpdate = {
      user: blog.user.id,
      likes: newLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    await blogService.update(blogToUpdate, blog.id);

    const newBlogState = JSON.parse(JSON.stringify(blogState));
    newBlogState.likes++;
    setBlog(newBlogState);
  };

  const handleRemove = async () => {
    if (
      window.confirm(`Removing blog ${blogState.title} by ${blogState.author}`)
    ) {
      setDeleted(true);
      await blogService.destroy(blogState.id);
    }
  };
  if (!visible) {
    return (
      <div style={deleted ? deletedStyle : blogStyle} className="defaultState blog">
        {blogState.title} {blogState.author}
        <button onClick={handleClick}>Details</button>
      </div>
    );
  } else if (isBlogUser) {
    return (
      <div style={deleted ? deletedStyle : blogStyle} className="blog">
        {blogState.title}{" "}
        <button onClick={handleClick} className="details-btn">
          hide
        </button>
        <div className="details-url">{blogState.url}</div>
        <div className="details-like">
          likes {blogState.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>{blogState.author}</div>
        <div>
          <button onClick={handleRemove}>remove</button>
        </div>
      </div>
    );
  } else {
    return (
      <div style={deleted ? deletedStyle : blogStyle} className="blog">
        {blogState.title} <button onClick={handleClick}>hide</button>
        <div className="details-url">{blogState.url}</div>
        <div className="details-like">
          <Like likes={blogState.likes} handleLike={handleLike} />
        </div>
        <div>{blogState.author}</div>
      </div>
    );
  }
};

export default Blog;
