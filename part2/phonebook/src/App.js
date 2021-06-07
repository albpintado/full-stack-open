import React, { useState } from "react";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} - {person.number}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "691821038" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    console.log();
    if (isNameAlreadyAdded()) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  const isNameAlreadyAdded = () => {
    return persons.find((person) => person.name === newName);
  };

  const nameHandler = (event) => setNewName(event.target.value);
  const numberHandler = (event) => setNewNumber(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <label htmlFor="name">Name </label>
        <input name="name" onChange={nameHandler} value={newName} />
        <br />
        <label htmlFor="number">Number </label>
        <input name="number" onChange={numberHandler} value={newNumber} />
        <br />
        <button onClick={addPerson}>Add</button>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
