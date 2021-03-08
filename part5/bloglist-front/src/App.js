import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import Toggleable from "./components/Toggleable";
import CreateBlogForm from "./components/CreateBlogForm";

const Notification = ({ content }) => {
  if (!content) {
    return <div></div>;
  } else {
    return <div style={{ border: "1px black solid" }}>{content}</div>;
  }
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notif, setNotif] = useState(null);

  const blogFormRef = useRef();

  const logOut = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };

  const handleNewBlog = async (e) => {
    e.preventDefault();
    try {
      const newBlog = { title, author, url };
      const responseBlog = await blogService.create(newBlog);
      const newBlogs = blogs.concat(responseBlog);
      setBlogs(newBlogs);
      setNotif(`Created new blog ${newBlog.title} by ${newBlog.author}`);
      setTitle("");
      setAuthor("");
      setUrl("");
      blogFormRef.current.toggleVisible();
      setTimeout(() => {
        setNotif(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (error) {
      setNotif("Failed login");
      setTimeout(() => {
        setNotif(null);
      }, 5000);
    }
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (user === null) {
    return (
      <div>
        <Notification content={notif} />
        <h2>Log in</h2>
        <form id="loginForm" onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <input type="submit" value="LOG IN" />
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification content={notif} />
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
      <h4>Logged in as {user.name}</h4>
      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default App;
