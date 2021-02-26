import React, { useState, useEffect } from "react";
import axios from "axios";

import Userform from "./Components/Userform";
import UserFilter from "./Components/UserFilter";
import UserList from "./Components/UserList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const PERSONS_ENDPOINT = "http://localhost:3001/persons";
  const personsHook = () => {
    axios.get(PERSONS_ENDPOINT).then((res) => setPersons(res.data));
  };

  useEffect(personsHook, []);
  // Input handlers

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();

    const nameList = persons.map((person) => person.name.toLowerCase());

    if (nameList.includes(newName.toLowerCase())) {
      alert(`${newName} alredy exists`);
      setNewName("");
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const filteredPersons =
    filter.length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <UserFilter filterValue={filter} handleFilter={handleFilterChange} />
      <h3>Add new</h3>
      <Userform
        handleSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber}
      ></Userform>
      <h2>Numbers</h2>
      <UserList personList={filteredPersons} />
    </div>
  );
};

export default App;
