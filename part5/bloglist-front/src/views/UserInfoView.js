import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserInfoView = () => {
  const userlist = useSelector((state) => state.userList);
  console.log(userlist);
  return (
    <div>
      <h2>User Info</h2>
      <table>
        <thead>
          <tr>
            <th>author</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userlist.map((user) => (
            <tr key={user.name}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfoView;
