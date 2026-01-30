import { useState, useEffect } from "react";
import PersonForm from "../components/PersonForm";
import Persons from "../components/Persons";
import Title from "../components/Title";
import Filter from "../components/Filter";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [visiblePeople, setVisiblePeople] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const dataHook = () => {
    const promise = axios.get("http://localhost:3001/persons");
    promise.then((response) => {
      const serverPersons = response.data;
      setPersons(serverPersons);
      setVisiblePeople(serverPersons);
    });
  };

  useEffect(dataHook, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (PersonExist(newName, persons)) {
      alert(`${newName} has already been added to the phonebook`);
    } else {
      const newPersons = persons.concat({ name: newName, number: newNumber });
      setPersons(newPersons);
      setNewName("");
      setNewNumber("");
      updateVisiblePeople(newFilter, newPersons);
    }
  };

  function PersonExist(name, persons) {
    return persons.some((person) => person.name == name);
  }

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
        person.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <div>
      <Title text="Phonebook"></Title>
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
      <Persons persons={visiblePeople}></Persons>
    </div>
  );
};

export default App;
