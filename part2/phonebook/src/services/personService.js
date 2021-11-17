import axios from "axios";
// Dev env
const baseUrl = "http://localhost:3001/api/persons";

// Prod env
// const baseUrl = "https://cryptic-river-73645.herokuapp.com/api/persons";

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

const updatePhone = (personId, personName, personNumber) => {
  const request = axios.put(`${baseUrl}/${personId}`, {
    name: personName,
    number: personNumber,
  });
  return request.then((response) => response.data);
};

const personService = { getAll, addPerson, deletePerson, updatePhone };

export default personService;
