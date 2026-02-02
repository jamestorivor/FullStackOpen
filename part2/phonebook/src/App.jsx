import { useState, useEffect } from "react";
import PersonForm from "../components/PersonForm";
import Persons from "../components/Persons";
import Title from "../components/Title";
import Filter from "../components/Filter";
import personServices from "./services/persons";
import Notification from "../components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [visiblePeople, setVisiblePeople] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const dataHook = () => {
    personServices.getAll().then((serverPersons) => {
      setPersons(serverPersons);
      setVisiblePeople(serverPersons);
    });
  };

  useEffect(dataHook, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personToAdd = { name: newName, number: newNumber };
    if (PersonExist(newName, persons)) {
      if (
        window.confirm(
          `${newName} has already been added to the phonebook, do you want to replace the old number with the new one?`,
        )
      ) {
        const personId = getIdFromName(personToAdd.name, persons);
        updateNumber(personId, personToAdd);
      }
    } else {
      personServices.create(personToAdd).then((returnedPerson) => {
        const newPersons = persons.concat(returnedPerson);
        setPersons(newPersons);
        updateVisiblePeople(newFilter, newPersons);
        displayNotification(`${personToAdd.name} added to phonebook`);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const displayNotification = (message) => {
    setError(false);
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const displayErrorMessage = (message) => {
    setError(true);
    setMessage(message);
    setTimeout(() => {
      setError(false);
      setMessage(null);
    }, 5000);
  };

  const getIdFromName = (name, persons) => {
    return persons.find((person) => person.name == name).id;
  };

  function PersonExist(name, persons) {
    return persons.some((person) => person.name == name);
  }

  const updateNumber = (id, samePerson) => {
    personServices
      .update(id, samePerson)
      .then((returnedPerson) => {
        const newPersons = persons.map((person) =>
          person.id == id ? returnedPerson : person,
        );
        setPersons(newPersons);
        setVisiblePeople(newPersons);
        setNewName("");
        setNewNumber("");
      })
      .catch((response) => {
        displayErrorMessage(
          `${samePerson.name}'s information has already been deleted from the server`,
        );
        const remainingPersons = persons.filter((person) => person.id !== id);
        setPersons(remainingPersons);
        updateVisiblePeople(newFilter, remainingPersons);
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    updateVisiblePeople(event.target.value, persons);
  };

  const updateVisiblePeople = (text, persons) => {
    setVisiblePeople(
      Object.values(persons).filter((person) =>
        person.name.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      personServices.remove(id).then((data) => {
        const remainingPersons = persons.filter((person) => person.id !== id);
        setPersons(remainingPersons);
        updateVisiblePeople(newFilter, remainingPersons);
      });
    }
  };

  return (
    <div>
      <Title text="Phonebook"></Title>
      <Notification error={error} message={message}></Notification>
      <Filter
        handleFilterChange={handleFilterChange}
        filterText={newFilter}
      ></Filter>
      <Title text="Add a new entry"></Title>
      <PersonForm
        name={newName}
        onSubmit={addPerson}
        onChangeName={handleNameChange}
        number={newNumber}
        onChangeNumber={handleNumberChange}
      ></PersonForm>
      <Title text="Numbers"></Title>
      <Persons persons={visiblePeople} deletePerson={deletePerson}></Persons>
    </div>
  );
};

export default App;
