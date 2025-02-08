// httpClient.js
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://e-learning-nvak.onrender.com',
  withCredentials: true, // Include cookies in all requests
});

export default httpClient;