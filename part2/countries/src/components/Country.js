import React, { useState, useEffect } from "react";
import countriesServices from "../services/countriesServices";

const Country = ({ country }) => {
  const [showContent, setShowContent] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({});

  useEffect(() => {
    countriesServices
      .getCountryWeather(country.capital)
      .then((initialWeather) => setCurrentWeather(initialWeather));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowContent = () => {
    if (!showContent) {
      countriesServices
        .getCountryWeather(country.capital)
        .then((temperature) => setCurrentWeather(temperature));
    }

    const newShowContentState = !showContent;
    setShowContent(newShowContentState);
  };

  const contentToShow = showContent ? (
    <div>
      <h1>{country.name}</h1>
      <button onClick={handleShowContent}>Show</button>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="" width="150px" height="150px" />
      <h2>Weather in {country.name}</h2>
      <p>
        <strong>
          Temperature: {currentWeather.current.temperature} Celcius
        </strong>
      </p>
      <img src={currentWeather.current.weather_icons} alt="Weather icon" />
      <p>
        <strong>Wind: </strong> {currentWeather.current.wind_speed} mpf
        direction {currentWeather.current.wind_dir}
      </p>
    </div>
  ) : (
    <div>
      <p>{country.name}</p>
      <button onClick={handleShowContent}>Show</button>
    </div>
  );

  return contentToShow;
};

export default Country;
