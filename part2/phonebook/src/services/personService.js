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

const updatePhone = (personId, personName, personNumber) => {
  axios.put(`${baseUrl}/${personId}`, {
    name: personName,
    number: personNumber,
  });
};

const personService = { getAll, addPerson, deletePerson, updatePhone };

export default personService;
