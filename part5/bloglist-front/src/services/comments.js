import axios from "axios";

let blogId;
let baseUrl;

const setBaseUrl = () => {
  baseUrl = `/api/blogs/${blogId}/comments`;
};

export const setBlogId = (id) => {
  blogId = id;
  setBaseUrl();
};

const getAll = async () => {
  console.log(baseUrl);
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (data) => {
  const response = await axios.post(baseUrl, data);
  return response.data;
};

const commentsService = { getAll, create };

export default commentsService;
