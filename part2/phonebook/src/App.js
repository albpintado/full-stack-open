// Imports
import React, { useEffect, useState } from "react";
import personService from "./services/personService";
import Header from "./components/Header";
import Notification from "./components/Notification";
import Form from "./components/Form";
import Persons from "./components/Persons";
import "./App.css";

// Static functions
const searchPersons = (person, filterQuery) => {
  return person.name.toLowerCase().includes(filterQuery.toLowerCase());
};

const updateWindowConfirmation = (newPerson) => window.confirm(
  `${newPerson.name} is already added to the phonebook, replace the old number with the new one?`
  );

  // App component
const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const filteredPersons = persons.filter((person) => searchPersons(person, filterQuery));
  const [newPerson, setNewPerson] = useState({"name": "", "number": ""});
  const [message, setMessage] = useState({
    text: null,
    class: "",
  });

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons)).catch((error) => console.log("Error: ", error.message));
  }, []);

  const isNameAlreadyAdded = () =>
    persons.find((person) => person.name === newPerson.name) ? true : false;

  const addOrUptatePerson = (event) => {
    event.preventDefault();
    isNameAlreadyAdded() && updateWindowConfirmation(newPerson.name) ? updateNumber() : addPerson();
  }

  const addPerson = () => {
    personService.addPerson({ name: newPerson.name, number: newPerson.number });
    setPersons([...persons, { name: newPerson.name, number: newPerson.number }]);
    handleMessage(`Added ${newPerson.name}`, "info");
    setNewPerson({"name": "", "number": ""});
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id);
    }
    const newPersons = persons.filter(personFromState => personFromState.id !== person.id);
    setPersons(newPersons);
    handleMessage(`Information of ${newPerson.name} has already been removed from server`, "error");
  };

  const updateNumber = () => {
    const person = persons.find((person) => person.name === newPerson.name);
    personService.updatePhone(person.id, newPerson.name, newPerson.number).catch(() => {
      handleMessage(`Information of ${newPerson.name} has been updated from server`, "info");
    });
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  };

  const handleMessage = (messageText, messageClass) => {
    setMessage({
      text: messageText,
      class: messageClass
    });
    setTimeout(() => {
      setMessage({
        text: null,
        class: "",
      });
    }, 3000);
  }

  return (
    <>
      <Header setFilterQuery={setFilterQuery} />
      <Notification message={message} />
      <Form
        newPerson={newPerson}
        setNewPerson={setNewPerson}
        onSubmit={addOrUptatePerson}
      />
      <Persons persons={filteredPersons} deleteFunction={deletePerson} />
    </>
  );
};

export default App;
