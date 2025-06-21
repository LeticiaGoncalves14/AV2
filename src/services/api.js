import axios from 'axios';

const api = axios.create({
  baseURL: 'http://leoproti.com.br:8004/produtos-view'
});

export default api;
