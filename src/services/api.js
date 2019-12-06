import axios from 'axios';

const api = axios.create({
  baseURL: 'https://d3-crawler-backend.herokuapp.com',
});

export default api;
