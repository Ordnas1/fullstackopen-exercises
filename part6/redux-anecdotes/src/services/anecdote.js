import axios from "axios";

const SUBJECT = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(SUBJECT);
	return response.data
};


const create = async (data) => {
	const response = await axios.post(SUBJECT, data)
	return response.data
}

const update = async (data,id) => {
	const response = await axios.patch(`${SUBJECT}/${id}`, data)
	return response.data
}
const anecdoteService = { getAll, create, update }

export default anecdoteService