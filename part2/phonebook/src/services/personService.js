import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addPerson = (person) => {
  axios.post(baseUrl, person);
  return;
};

const deletePerson = (personId) => {
  axios.delete(`${baseUrl}/${personId}`);
  return;
};

const personService = { getAll, addPerson, deletePerson };

export default personService;
