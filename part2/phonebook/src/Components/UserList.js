import React from "react";




const UserList = ({ personList, handleDestroy }) => (
  <ul>
    {personList.map((person) => (
      <li key={person.id}>
        {person.name} {person.number} <button onClick={() => handleDestroy(person.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default UserList;
