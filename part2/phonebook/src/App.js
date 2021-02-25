import React, { useState } from "react";

import Userform from "./Components/Userform";
import UserFilter from "./Components/UserFilter";
import UserList from "./Components/UserList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

  const filteredPersons = filter.length === 0 ? persons : persons.filter( person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <UserFilter filterValue={filter} handleFilter={handleFilterChange}/>
      <h3>Add new</h3>
        <Userform
          handleSubmit={addPerson}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          nameValue={newName}
          numberValue={newNumber}
        ></Userform>
      <h2>Numbers</h2>
      <UserList personList={filteredPersons}/>
    </div>
  );
};

export default App;
