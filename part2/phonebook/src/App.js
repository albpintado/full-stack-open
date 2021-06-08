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
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [matchedPersons, setMatchedPersons] = useState(persons);

  const addPerson = (event) => {
    event.preventDefault();
    if (isNameAlreadyAdded()) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setMatchedPersons(
      matchedPersons.concat({ name: newName, number: newNumber })
    );
    setNewName("");
    setNewNumber("");
    console.log(persons);
  };

  const isNameAlreadyAdded = () => {
    return persons.find((person) => person.name === newName);
  };

  const nameHandler = (event) => setNewName(event.target.value);
  const numberHandler = (event) => setNewNumber(event.target.value);

  const personsHandler = (event) => {
    const personsFiltered = persons.filter(
      (person) =>
        person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0
    );
    setMatchedPersons(personsFiltered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <label htmlFor="search">Search name </label>
      <input name="search" onChange={personsHandler} />
      <h2>Add a new one</h2>
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
      <Persons persons={matchedPersons} />
    </div>
  );
};

export default App;
