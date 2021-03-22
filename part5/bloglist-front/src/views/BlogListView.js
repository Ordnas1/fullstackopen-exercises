import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Toggleable from "../components/Toggleable";
import CreateBlogForm from "../components/CreateBlogForm";
import Blog from "../components/Blog";
import Notification from "../components/Notification";
import { initializeBlogs, createBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogListView = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);

  const blogFormRef = useRef();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleNewBlog = async (e) => {
    e.preventDefault();
    try {
      const newBlog = { title, author, url };
      dispatch(createBlog(newBlog));
      dispatch(
        setNotification(
          `Created new blog ${newBlog.title} by ${newBlog.author}`,
          3
        )
      );
      setTitle("");
      setAuthor("");
      setUrl("");
      blogFormRef.current.toggleVisible();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <Notification content={notification} />
      <Toggleable buttonLabel="New Blog" ref={blogFormRef}>
        <CreateBlogForm
          handleSubmit={handleNewBlog}
          titleValue={title}
          authorValue={author}
          urlvalue={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
        />
      </Toggleable>

      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogListView;
