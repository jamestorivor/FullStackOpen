import "./App.css";
import countryService from "../services/countries";
import { useState, useEffect } from "react";
import Countries from "../components/Countries";
import weatherService from "../services/weather";
import CountryInfo from "../components/CountryInfo";
import Weather from "../components/Weather";

function App() {
  const [countries, setCountries] = useState([]);
  const [text, setText] = useState("");
  const [visibleCountries, setVisibleCountries] = useState(countries);
  const [tooManyCountries, setTooManyCountries] = useState(true);
  const [showCountries, setShowCountries] = useState(false);
  const [showSingleCountry, setShowSingleCountry] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const dataHook = () => {
    countryService.getAll().then((countries) => {
      setCountries(countries);
      setVisibleCountries(countries);
    });
  };

  useEffect(dataHook, []);

  const weatherDataHook = () => {
    if (showSingleCountry) {
      console.log(visibleCountries[0]);
      const capitalInfo = visibleCountries[0].capitalInfo;
      const lat = capitalInfo.latlng[0],
        lon = capitalInfo.latlng[1];
      console.log("fetching weather data");
      weatherService.getWeather(lat, lon).then((data) => {
        setWeatherData(data);
        console.log(data);
      });
    }
  };

  useEffect(weatherDataHook, [showSingleCountry]);

  const handleShowCountry = (countryName) => {
    setVisibleCountries(
      countries.filter((country) => country.name.common == countryName)
    );
    setTooManyCountries(false);
    setShowCountries(false);
    setShowSingleCountry(true);
  };

  const inputHandler = (event) => {
    const text = event.target.value;
    setText(text);
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(text.toLowerCase())
    );
    setVisibleCountries(filteredCountries);
    if (filteredCountries.length > 10) {
      setTooManyCountries(true);
      setShowCountries(false);
      setShowSingleCountry(false);
    } else if (filteredCountries.length == 1) {
      setTooManyCountries(false);
      setShowCountries(false);
      setShowSingleCountry(true);
    } else {
      setTooManyCountries(false);
      setShowCountries(true);
      setShowSingleCountry(false);
    }
  };

  return (
    <div>
      find countries
      <input type="text" onChange={inputHandler} value={text}></input>
      <Countries
        countries={visibleCountries}
        handleShowCountry={handleShowCountry}
        showCountries={showCountries}
        tooManyCountries={tooManyCountries}
      ></Countries>
      <CountryInfo
        countryData={visibleCountries}
        showSingleCountry={showSingleCountry}
      ></CountryInfo>
      <Weather
        weatherData={weatherData}
        showWeather={showSingleCountry}
        countryData={visibleCountries}
      ></Weather>
    </div>
  );
}

export default App;
