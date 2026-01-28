import { useState } from "react";
import PersonForm from "../components/PersonForm";
import Persons from "../components/Persons";
import Title from "../components/Title";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (PersonExist(newName, persons)) {
      alert(`${newName} has already been added to the phonebook`);
    } else {
      setPersons(persons.concat({ name: newName }));
      setNewName("");
    }
  };

  function PersonExist(name, persons) {
    return persons.some((person) => person.name == name);
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <Title text="Phonebook"></Title>
      <PersonForm
        value={newName}
        onSubmit={addPerson}
        onChange={handleNoteChange}
      ></PersonForm>
      <Title text="Numbers"></Title>
      <Persons persons={persons}></Persons>
    </div>
  );
};

export default App;
