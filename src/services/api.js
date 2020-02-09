import axios from 'axios';

const baseURL = 'https://hairdressersnear.com';

const api = axios.create({
  baseURL,
});

export default api;
