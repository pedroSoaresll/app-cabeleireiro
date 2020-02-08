import axios from 'axios';

const baseURL = 'http://167.71.179.7';

const api = axios.create({
  baseURL,
});

export default api;
