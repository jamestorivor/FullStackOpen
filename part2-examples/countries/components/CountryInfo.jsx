const CountryInfo = ({ countryData, showSingleCountry }) => {
  if (showSingleCountry) {
    const country = countryData[0];
    const languages = country.languages;
    return (
      <>
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>Area Code : {country.area}</p>

          <h2>Languages</h2>
          <ul>
            {Object.values(languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png}></img>
        </div>
      </>
    );
  }
};

export default CountryInfo;
