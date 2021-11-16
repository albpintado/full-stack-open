import React, { useEffect, useState } from "react";
import Persons from "./components/Persons";
import HeaderOne from "./components/HeaderOne";
import HeaderTwo from "./components/HeaderTwo";
import Search from "./components/Search";
import Form from "./components/Form";
import Notification from "./components/Notification";
import personService from "./services/personService";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [matchedPersons, setMatchedPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState({
    text: null,
    class: "",
  });

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons)).catch((error) => console.log("Error: ", error.message));
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
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .then(() => {
        setMessage({
          text: `Added ${newName}`,
          class: "info",
        });
        setTimeout(() => {
          setMessage({
            text: null,
            class: "",
          });
        }, 3000);
      });
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
    personService.updatePhone(person.id, newName, newNumber).catch(() => {
      setMessage({
        text: `Information of ${newName} has already been removed from server`,
        class: "error",
      });
      setTimeout(() => {
        setMessage({
          text: null,
          class: "",
        });
      }, 3000);
    });
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
    <>
      <header>
        <HeaderOne text="Phonebook" />
        <Search text="search" function={personsHandler} />
      </header>
      <HeaderTwo text="Add a person to phonebook" />
      <Notification message={message} />
      <Form
        functionOne={nameHandler}
        valueOne={newName}
        functionTwo={numberHandler}
        valueTwo={newNumber}
        functionThree={addPerson}
      />
      <HeaderTwo text="Persons in phonebook" />
      <Persons persons={matchedPersons} deleteFunction={deletePerson} />
    </>
  );
};

export default App;
