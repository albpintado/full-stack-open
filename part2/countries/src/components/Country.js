import React, { useState } from "react";

const Country = ({ country }) => {
  const [showContent, setShowContent] = useState(false);

  const handleShowContent = () => {
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
