import React, { useState, useEffect } from "react";

import Userform from "./Components/Userform";
import UserFilter from "./Components/UserFilter";
import UserList from "./Components/UserList";

import personsService from "./Services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => personsService.getAll().then((data) => setPersons(data)), []);
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

  const handleDestroy = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      personsService.destroy(id).then((data) => {
        const newPersons = [...persons];
        const newFiltered = newPersons.filter((person) => person.id !== id);
        setPersons(newFiltered);
      });
    } else {
      return;
    }
  };

  const handleUpdate = (id, data) => {
    personsService.update(id, data).then((data) => {
      const newPersons = [...persons];
      const updateIndex = newPersons.findIndex((person) => person.id === id);
      console.log("updating data with index", updateIndex, data)
      newPersons[updateIndex] = data;
      setPersons(newPersons);
    });
  };

  const addPerson = (e) => {
    e.preventDefault();

    const nameList = persons.map((person) => person.name.toLowerCase());

    if (nameList.includes(newName.toLowerCase())) {
      if (
        window.confirm(`${newName} alredy exists. Replace old phone number?`)
      ) {
        const personId = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id;
        console.log(personId)
        const newPerson = {
          name: newName,
          number: newNumber,
        };
        handleUpdate(personId, newPerson);
        return;
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    personsService
      .createPerson(newPerson)
      .then((data) => setPersons(persons.concat(data)));
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
      <UserList personList={filteredPersons} handleDestroy={handleDestroy} />
    </div>
  );
};

export default App;
