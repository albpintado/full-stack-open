import React, { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Header from "./components/Header";
import Search from "./components/Search";
import Form from "./components/Form";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [matchedPersons, setMatchedPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  useEffect(() => setMatchedPersons(persons), [persons]);

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
    personService.addPerson({ name: newName, number: newNumber });
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
