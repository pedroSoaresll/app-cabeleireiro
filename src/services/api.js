import axios from 'axios';

const baseURL = __DEV__ ? 'http://192.168.0.40:3333' : 'http://167.71.179.7';

const api = axios.create({
  baseURL,
});

export default api;
