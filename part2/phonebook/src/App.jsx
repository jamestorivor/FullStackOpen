import { useState } from "react";
import PersonForm from "../components/PersonForm";
import Persons from "../components/Persons";
import Title from "../components/Title";
import Filter from "../components/Filter"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [visiblePeople, setVisiblePeople] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (PersonExist(newName, persons)) {
      alert(`${newName} has already been added to the phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber}));
      setNewName("");
      setNewNumber("");
    }
  };

  function PersonExist(name, persons) {
    return persons.some((person) => person.name == name);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
    updateVisiblePeople(event.target.value, persons);
  }

  const updateVisiblePeople = (text, persons) => {
    setVisiblePeople(Object.values(persons).filter(person => person.name.toLowerCase().includes(text.toLowerCase())))
  }

  return (
    <div>
      <Title text="Phonebook"></Title>
      <Filter handleFilterChange={handleFilterChange} filterText={newFilter} ></Filter>
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
