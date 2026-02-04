const Weather = ({ showWeather, weatherData, countryData }) => {
  if (weatherData == null) return;

  if (showWeather) {
    return (
      <div>
        <h2>Weather in {countryData.capital}</h2>
        <p>Temperature: {weatherData.main.temp} celcius</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        />
        <p>Wind: {weatherData.wind.speed} m/s</p>
      </div>
    );
  }
};
export default Weather;
