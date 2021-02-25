import React from "react";

const UserList = ({ personList }) => (
  <ul>
    {personList.map((person) => (
      <li key="person.name">
        {person.name} {person.number}
      </li>
    ))}
  </ul>
);

export default UserList;
