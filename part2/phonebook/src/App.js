import React, { useState } from "react";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    console.log();
    if (isNameAlreadyAdded()) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  const isNameAlreadyAdded = () => {
    return persons.find((person) => person.name === newName);
  };

  const nameHandler = (event) => setNewName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <label htmlFor="name">Name </label>
          <input name="name" onChange={nameHandler} value={newName} />
          <button onClick={addPerson}>Add</button>
        </div>
        <div></div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
