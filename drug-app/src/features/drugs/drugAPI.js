import axios from 'axios';

const baseURL = import.meta.env.VITE_BASEURL;

export default {
  fetchDrugs: async () => (await axios.get(baseURL)).data,
  createDrug: async (data) => (await axios.post(baseURL, data)).data,
  updateDrug: async ({ id, ...data }) => (await axios.put(`${baseURL}/${id}`, data)).data,
  deleteDrug: async (id) => {
    await axios.delete(`${baseURL}/${id}`);
    return id;
  },
  searchDrugs: async (name) => (await axios.get(`${baseURL}?name=${name}`)).data,
};