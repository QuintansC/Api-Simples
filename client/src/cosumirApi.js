import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/', //Endereço da api, ou seja Localhost:Porta da Api ou Endereço web:Porta
});

export default api;