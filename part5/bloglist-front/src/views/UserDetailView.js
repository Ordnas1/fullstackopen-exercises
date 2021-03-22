import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserDetailView = () => {
  const id = useParams().id;
  const user = useSelector(
    (state) => state.userList.filter((user) => user.id === id)[0]
  );
  console.log(user);
  return user ? (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default UserDetailView;
