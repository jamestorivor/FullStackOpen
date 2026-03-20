import axios from "axios";
const baseUrl = "api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getbyId = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const remove = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => console.log("Deleted successfully~"));
};

export default { create, update, getAll, remove, getbyId };
