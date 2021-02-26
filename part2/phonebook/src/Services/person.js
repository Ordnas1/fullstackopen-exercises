import axios from "axios";

const PERSONS_ENDPOINT = "http://localhost:3001/persons";

const getAll = () => axios.get(PERSONS_ENDPOINT).then((res) => res.data);
const createPerson = (person) =>
  axios.post(PERSONS_ENDPOINT, person).then((res) => res.data);
const destroy = (id) =>
  axios.delete(`${PERSONS_ENDPOINT}/${id}`).then((res) => res.data);

const update = (id, data) => axios.put(`${PERSONS_ENDPOINT}/${id}`, data).then(res => res.data)

const personsService = { getAll, createPerson, destroy, update};

export default personsService;
