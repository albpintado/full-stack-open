import { useEffect, useState } from "react";
import Country from "./components/Country";
import countriesServices from "./services/countriesServices";

function App() {
  const [countries, setCountries] = useState([]);
  const [matchedCountries, setMatchedCountries] = useState([]);

  useEffect(() => {
    countriesServices
      .getAll()
      .then((initialCountries) => setCountries(initialCountries));
  }, []);

  // useEffect(() => setMatchedCountries(countries), [countries]);

  const countryFilter = (event) => {
    return countries.filter(
      (country) =>
        country.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >=
        0
    );
  };

  const handleSearch = (event) => {
    setMatchedCountries(countryFilter(event));
  };

  const countriesToShow =
    matchedCountries.length === 1
      ? matchedCountries.map((country) => (
          <Country key={country.name} country={country} />
        ))
      : matchedCountries.map((country) => (
          <p key={country.name}>{country.name}</p>
        ));

  return (
    <>
      <label htmlFor="search">Find countries&nbsp;</label>
      <input name="search" onChange={handleSearch} />
      {matchedCountries.length >= 10 ? (
        <p>Too many matches</p>
      ) : (
        countriesToShow
      )}
    </>
  );
}

export default App;
