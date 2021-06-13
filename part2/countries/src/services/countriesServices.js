import axios from "axios";

const getAll = () => {
  const request = axios.get("https://restcountries.eu/rest/v2/all");
  return request.then((response) => response.data);
};

const getCountryWeather = (capital) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const request = axios.get(
    `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}&units=m`
  );
  return request.then((response) => response.data);
};

const countriesServices = { getAll, getCountryWeather };

export default countriesServices;
