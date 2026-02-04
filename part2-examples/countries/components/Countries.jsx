const Countries = ({
  countries,
  handleShowCountry,
  showCountries,
  tooManyCountries,
}) => {
  if (tooManyCountries) {
    return <p>Too many matches, try a different filter</p>;
  } else if (showCountries) {
    return countries.map((country) => (
      <div key={country.name.common}>
        <p>
          {country.name.common}
          <button onClick={() => handleShowCountry(country.name.common)}>
            Show
          </button>
        </p>
      </div>
    ));
  }
};

export default Countries;
