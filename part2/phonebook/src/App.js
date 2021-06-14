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
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        updateNumber();
      }
      return;
    }
    personService.addPerson({ name: newName, number: newNumber });
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id);
    }
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  };

  const isNameAlreadyAdded = () =>
    persons.find((person) => person.name === newName);

  const updateNumber = () => {
    const person = persons.find((person) => person.name === newName);
    personService.updatePhone(person.id, newName, newNumber);
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
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
      <Persons persons={matchedPersons} deleteFunction={deletePerson} />
    </div>
  );
};

export default App;
