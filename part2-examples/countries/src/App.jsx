import "./App.css";
import countryService from "../services/countires";
import { useState, useEffect } from "react";
function App() {
  const [countries, setCountries] = useState(null);
  const [text, setText] = useState("");
  const [visibleCountries, setVisibleCountries] = useState(countries);

  const dataHook = () => {
    countryService.getByName(text).then((countries) => {
      setCountries(countries);
    });
  };

  useEffect(dataHook, []);

  const inputHandler = (event) => {
    const text = event.target.value;
    setText(text);
  };

  const handleDisplayCountries = (countries) => {
    if (length(countries) > 10) {
      setVisibleCountries(null);
    }
  };

  if (countries == null) {
    return null;
  }
  return (
    <div>
      find countries
      <input type="text" onChange={inputHandler} value={text}></input>
      {countries.map((country) => {
        const countryName = country.name.common;
        return countryName.toLowerCase().includes(text.toLowerCase()) ? (
          <p key={countryName}>{countryName}</p>
        ) : null;
      })}
    </div>
  );
}

export default App;
