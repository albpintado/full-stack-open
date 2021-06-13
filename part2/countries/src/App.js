import { useEffect, useState } from "react";
import Country from "./components/Country";
import Input from "./components/Input";
import countriesServices from "./services/countriesServices";

function App() {
  const [countries, setCountries] = useState([]);
  const [matchedCountries, setMatchedCountries] = useState([]);

  useEffect(() => {
    countriesServices
      .getAll()
      .then((initialCountries) => setCountries(initialCountries));
  }, []);

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

  const countriesToShow = matchedCountries.map((country) => (
    <Country key={country.name} country={country} />
  ));

  return (
    <>
      <Input label="search" text="Find countries" function={handleSearch} />
      {matchedCountries.length >= 10 ? (
        <p>Too many matches</p>
      ) : (
        countriesToShow
      )}
    </>
  );
}

export default App;
