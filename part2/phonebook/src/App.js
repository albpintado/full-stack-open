import React, { useState } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Form from "./components/Form";

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
      <Header text="Phonebook" />
      <Search text="search" function={personsHandler} />
      <Header text="Add a new one" />
      <Form
        functionOne={nameHandler}
        valueOne={newName}
        functionTwo={numberHandler}
        valueTwo={newNumber}
        functionThree={addPerson}
      />
      <Header text="Numbers" />
      <Persons persons={matchedPersons} />
    </div>
  );
};

export default App;
